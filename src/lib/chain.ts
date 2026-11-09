/**
 * 影响链纯函数层。
 *
 * 把「选中了什么 → 页面上谁亮谁暗」从组件里抽出来，做成三个能单独测试的纯函数：
 * 只吃参数、只返回结果，不读 process.env、不发网络请求、不 import React。
 * 这样 T5 写页面时组件里只剩画图，布局和证据线型的逻辑不会埋进 JSX 里。
 */

import type {
  ImpactEdge,
  ImpactLevel,
  ImpactNode,
  ImpactNodeKind,
} from "@/content/impact-graph";

/** 一次选择：要么只点了一个器官，要么给了一条具体路径，要么什么都没有。 */
export type ChainSelection = {
  organId: string | null;
  path: { from: string; to: string }[] | null;
};

export type ChainRenderState = {
  nodeOpacity: Record<string, number>;
  edgeState: Record<string, "idle" | "active" | "dimmed">;
  visibleNodeIds: string[];
};

export type ChainLayout = Record<string, { x: number; y: number }>;

export type EdgeDashStyle = {
  strokeWidth: number;
  dash?: string;
  opacity: number;
};

/**
 * 边用 from+to 拼 key 做精确匹配。方向不对就当不匹配，
 * 不做「补方向」的猜测——那应该由服务端校验去拒绝，而不是在这里自作聪明。
 */
function edgeKey(from: string, to: string): string {
  return `${from}|${to}`;
}

export function getChainRenderState(
  sel: ChainSelection,
  nodes: ImpactNode[],
  edges: ImpactEdge[],
): ChainRenderState {
  const nodeOpacity: Record<string, number> = {};
  const edgeState: Record<string, "idle" | "active" | "dimmed"> = {};
  // 不隐藏任何节点，只调透明度：布局稳定，图不会因为选择而跳动。
  const visibleNodeIds = nodes.map((n) => n.id);

  const path = sel.path ?? [];
  const hasPath = path.length > 0;

  // 情况 a：给了具体路径，只精确点亮 path 上的边，其余全部压暗。
  if (hasPath) {
    const pathKeys = new Set(path.map((p) => edgeKey(p.from, p.to)));
    for (const e of edges) {
      edgeState[e.id] = pathKeys.has(edgeKey(e.from, e.to))
        ? "active"
        : "dimmed";
    }
    const highlight = new Set<string>();
    for (const p of path) {
      highlight.add(p.from);
      highlight.add(p.to);
    }
    for (const n of nodes) {
      nodeOpacity[n.id] = highlight.has(n.id) ? 1 : 0.15;
    }
    return { nodeOpacity, edgeState, visibleNodeIds };
  }

  // 情况 b：只选中一个器官，点亮它和它的一阶邻居。
  if (sel.organId !== null) {
    const organId = sel.organId;
    const direct = edges.filter((e) => e.from === organId || e.to === organId);
    const directKeys = new Set(direct.map((e) => edgeKey(e.from, e.to)));
    for (const e of edges) {
      edgeState[e.id] = directKeys.has(edgeKey(e.from, e.to))
        ? "active"
        : "dimmed";
    }
    const highlight = new Set<string>([organId]);
    for (const e of direct) {
      highlight.add(e.from);
      highlight.add(e.to);
    }
    for (const n of nodes) {
      nodeOpacity[n.id] = highlight.has(n.id) ? 1 : 0.3;
    }
    return { nodeOpacity, edgeState, visibleNodeIds };
  }

  // 情况 c：什么都没选中，全部点亮、全部 idle。
  for (const n of nodes) nodeOpacity[n.id] = 1;
  for (const e of edges) edgeState[e.id] = "idle";
  return { nodeOpacity, edgeState, visibleNodeIds };
}

const X_BY_KIND: Record<ImpactNodeKind, number> = {
  organ: 0.1,
  function: 0.5,
  manifestation: 0.9,
};

const KINDS: ImpactNodeKind[] = ["organ", "function", "manifestation"];

export function layoutChain(nodes: ImpactNode[]): ChainLayout {
  const layout: ChainLayout = {};

  // 三列布局：x 由 kind 决定，y 在同一列内按数组出现顺序均分到 [0.10, 0.90]。
  // 用比例而不是像素，具体尺寸交给画图的组件去乘。
  for (const kind of KINDS) {
    const column = nodes.filter((n) => n.kind === kind);
    const step = column.length > 1 ? 0.8 / (column.length - 1) : 0;
    column.forEach((n, i) => {
      layout[n.id] = { x: X_BY_KIND[kind], y: 0.1 + i * step };
    });
  }

  return layout;
}

const EDGE_DASH_STYLE: Record<ImpactLevel, EdgeDashStyle> = {
  A: { strokeWidth: 2.2, opacity: 1 },
  B: { strokeWidth: 1.6, opacity: 0.9 },
  C: { strokeWidth: 1.6, dash: "6 4", opacity: 0.8 },
  D: { strokeWidth: 1.4, dash: "2 4", opacity: 0.7 },
};

export function edgeDash(level: ImpactLevel): EdgeDashStyle {
  return EDGE_DASH_STYLE[level];
}
