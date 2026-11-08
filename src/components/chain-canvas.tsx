"use client";

import { useEffect, useState } from "react";
import type { ImpactEdge, ImpactNode } from "@/content/impact-graph";
import {
  edgeDash,
  getChainRenderState,
  layoutChain,
} from "@/lib/chain";
import { EvidencePanel } from "@/components/evidence-panel";
import { RedFlagGate } from "@/components/red-flag-gate";

const W = 960;
const H = 560;
const PAD = 40;

/** 把 0~1 的比例坐标映射成 SVG 像素，四周留 PAD 内边距。 */
function toPx(ratio: number, span: number): number {
  return PAD + ratio * span;
}

const NODE_COLOR: Record<ImpactNode["kind"], string> = {
  organ: "var(--color-structure)",
  function: "var(--color-relationship)",
  manifestation: "var(--color-information)",
};

type ChainCanvasProps = {
  nodes: ImpactNode[];
  edges: ImpactEdge[];
  organId: string;
  /** 模型走过的影响链：非空时只点亮 path 上的边，其余压暗。 */
  path?: { from: string; to: string }[] | null;
};

export function ChainCanvas({ nodes, edges, organId, path = null }: ChainCanvasProps) {
  const layout = layoutChain(nodes);
  const renderState = getChainRenderState(
    { organId, path },
    nodes,
    edges,
  );

  const innerW = W - PAD * 2;
  const innerH = H - PAD * 2;
  const nameById = new Map(nodes.map((node) => [node.id, node.nameCn]));

  // T6/T7：选中边 + 红旗弹层都在画布组件内管理状态，page.tsx 是 Server Component 不碰这些。
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [redFlagOpen, setRedFlagOpen] = useState(false);

  const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId) ?? null;
  // 画布拿到的是 "organ:heart"，证据面板要用 slug 去 organs 里匹配 sources。
  const organSlug = organId.startsWith("organ:")
    ? organId.slice("organ:".length)
    : organId;

  // 证据面板和红旗弹层都按 Esc 关闭。
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedEdgeId(null);
        setRedFlagOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 同一起点的多条边会完全重合，这里按“该起点下第几条”给控制点递增偏移。
  const seenFrom = new Map<string, number>();

  return (
    <>
      <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="影响链图：器官、功能与可能表现之间的关系"
      className="h-auto w-full"
    >
      {/* 三列标题 */}
      <text
        x={toPx(0.1, innerW)}
        y={24}
        textAnchor="start"
        fill="var(--color-muted)"
        fontSize={13}
      >
        器官
      </text>
      <text
        x={toPx(0.5, innerW)}
        y={24}
        textAnchor="middle"
        fill="var(--color-muted)"
        fontSize={13}
      >
        功能
      </text>
      <text
        x={toPx(0.9, innerW)}
        y={24}
        textAnchor="end"
        fill="var(--color-muted)"
        fontSize={13}
      >
        可能的表现
      </text>
      <text
        x={toPx(0.9, innerW)}
        y={40}
        textAnchor="end"
        fill="var(--color-muted)"
        fontSize={11}
      >
        （科普参考，不用于自我判断）
      </text>

      {edges.map((edge) => {
        const from = layout[edge.from];
        const to = layout[edge.to];
        if (!from || !to) return null;

        const idx = seenFrom.get(edge.from) ?? 0;
        seenFrom.set(edge.from, idx + 1);

        const x1 = toPx(from.x, innerW);
        const y1 = toPx(from.y, innerH);
        const x2 = toPx(to.x, innerW);
        const y2 = toPx(to.y, innerH);
        // 控制点取中点并左偏，偏移量随同起点边的序号递增，避免重叠成直线。
        const offset = 30 + idx * 12;
        const cx = (x1 + x2) / 2 - offset;
        const cy = (y1 + y2) / 2;
        const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

        const style = edgeDash(edge.evidenceLevel);
        const active = renderState.edgeState[edge.id] === "active";
        // 选中态的边压过其它高亮：加粗 + 墨水色，让“这一段正在被解释”一眼可见。
        const selected = edge.id === selectedEdgeId;
        const color = selected
          ? "var(--color-ink)"
          : active
            ? "var(--color-structure)"
            : "var(--color-line)";
        const strokeWidth = selected ? style.strokeWidth + 1.5 : style.strokeWidth;
        const fromName = nameById.get(edge.from) ?? edge.from;
        const toName = nameById.get(edge.to) ?? edge.to;

        return (
          <g
            key={edge.id}
            role="button"
            tabIndex={0}
            aria-label={`从「${fromName}」到「${toName}」的关系`}
            aria-pressed={selected}
            className="cursor-pointer"
            onClick={() => setSelectedEdgeId(edge.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedEdgeId(edge.id);
              }
            }}
          >
            <title>{edge.mechanism}</title>
            {/* 透明的粗线只负责扩大命中区域，本身不显示。 */}
            <path
              d={d}
              stroke="transparent"
              strokeWidth={14}
              fill="none"
              pointerEvents="stroke"
            />
            <path
              d={d}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={style.dash}
              opacity={style.opacity}
              fill="none"
            />
          </g>
        );
      })}

      {nodes.map((node) => {
        const pos = layout[node.id];
        if (!pos) return null;

        const x = toPx(pos.x, innerW);
        const y = toPx(pos.y, innerH);
        const opacity = renderState.nodeOpacity[node.id] ?? 1;
        // 右列文字放圆左侧，避免溢出画布；左中两列放右侧。
        const onRight = node.kind === "manifestation";
        const labelX = onRight ? x - 10 : x + 10;

        const body = (
          <g opacity={opacity}>
            {node.redFlag ? (
              <circle
                cx={x}
                cy={y}
                r={9}
                fill="none"
                stroke="var(--color-danger)"
                strokeWidth={2}
              />
            ) : null}
            <circle cx={x} cy={y} r={6} fill={NODE_COLOR[node.kind]} />
            <text
              x={labelX}
              y={y}
              textAnchor={onRight ? "end" : "start"}
              dominantBaseline="central"
              fill="var(--color-ink)"
              fontSize={13}
            >
              {node.nameCn}
            </text>
          </g>
        );

        // 器官节点跳到器官详情页；功能与表现节点目前没有落地页，不可点。
        if (node.kind === "organ" && node.organSlug) {
          return (
            <a
              key={node.id}
              href={`/organ/${node.organSlug}`}
              aria-label={`查看${node.nameCn}详情`}
            >
              {body}
            </a>
          );
        }

        // 红旗表现：点击先弹就医提示层，不做跳转、也不打开证据面板（T7）。
        if (node.kind === "manifestation" && node.redFlag) {
          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-label={`${node.nameCn}：点击查看就医提示`}
              className="cursor-pointer"
              onClick={() => setRedFlagOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setRedFlagOpen(true);
                }
              }}
            >
              {body}
            </g>
          );
        }

        return <g key={node.id}>{body}</g>;
      })}
      </svg>

      <EvidencePanel
        edge={selectedEdge}
        organSlug={organSlug}
        onClose={() => setSelectedEdgeId(null)}
      />
      <RedFlagGate open={redFlagOpen} onClose={() => setRedFlagOpen(false)} />
    </>
  );
}
