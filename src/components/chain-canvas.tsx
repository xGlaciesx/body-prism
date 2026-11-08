"use client";

import type { ImpactEdge, ImpactNode } from "@/content/impact-graph";
import {
  edgeDash,
  getChainRenderState,
  layoutChain,
} from "@/lib/chain";

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
};

export function ChainCanvas({ nodes, edges, organId }: ChainCanvasProps) {
  const layout = layoutChain(nodes);
  const renderState = getChainRenderState(
    { organId, path: null },
    nodes,
    edges,
  );

  const innerW = W - PAD * 2;
  const innerH = H - PAD * 2;
  const nameById = new Map(nodes.map((node) => [node.id, node.nameCn]));

  // 同一起点的多条边会完全重合，这里按“该起点下第几条”给控制点递增偏移。
  const seenFrom = new Map<string, number>();

  return (
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
        const color = active ? "var(--color-structure)" : "var(--color-line)";
        const fromName = nameById.get(edge.from) ?? edge.from;
        const toName = nameById.get(edge.to) ?? edge.to;

        return (
          <g
            key={edge.id}
            role="button"
            tabIndex={0}
            aria-label={`从「${fromName}」到「${toName}」的关系`}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                // T6 证据面板接入点：回车/空格应打开这条边的证据面板。
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
              strokeWidth={style.strokeWidth}
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
        return <g key={node.id}>{body}</g>;
      })}
    </svg>
  );
}
