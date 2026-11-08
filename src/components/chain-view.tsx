"use client";

import { useState } from "react";
import type { ImpactEdge, ImpactNode } from "@/content/impact-graph";
import { ChainCanvas } from "@/components/chain-canvas";
import { CuratorBox } from "@/components/curator-box";

type ChainViewProps = {
  nodes: ImpactNode[];
  edges: ImpactEdge[];
  organSlug: string;
};

/**
 * path 状态的唯一来源：提问框把模型走过的 path 交到这里，
 * 再传给画布做高亮，避免 path 在多个组件里各存一份而不同步。
 */
export function ChainView({ nodes, edges, organSlug }: ChainViewProps) {
  const [path, setPath] = useState<{ from: string; to: string }[] | null>(null);

  return (
    <div className="space-y-6">
      <CuratorBox organSlug={organSlug} onPath={setPath} />
      <ChainCanvas
        nodes={nodes}
        edges={edges}
        organId={`organ:${organSlug}`}
        path={path}
      />
    </div>
  );
}
