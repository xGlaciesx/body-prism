import { describe, expect, it } from "vitest";
import { impactEdges, impactNodes } from "@/content/impact-graph";
import {
  edgeDash,
  getChainRenderState,
  layoutChain,
  type ChainSelection,
} from "@/lib/chain";

describe("影响链纯函数", () => {
  it("什么都不选中时，所有节点不透明、所有边 idle", () => {
    const sel: ChainSelection = { organId: null, path: null };
    const state = getChainRenderState(sel, impactNodes, impactEdges);

    for (const n of impactNodes) {
      expect(state.nodeOpacity[n.id], `节点 ${n.id}`).toBe(1);
    }
    for (const e of impactEdges) {
      expect(state.edgeState[e.id], `边 ${e.id}`).toBe("idle");
    }
    expect(state.visibleNodeIds).toEqual(impactNodes.map((n) => n.id));
  });

  it("选中 organ:kidney 时，E-KID-BP 为 active、E-LIVER-COAG 为 dimmed", () => {
    const sel: ChainSelection = { organId: "organ:kidney", path: null };
    const state = getChainRenderState(sel, impactNodes, impactEdges);

    expect(state.edgeState["E-KID-BP"]).toBe("active");
    expect(state.edgeState["E-LIVER-COAG"]).toBe("dimmed");
  });

  it("给一条 path 时，只有 path 上那条边是 active", () => {
    const sel: ChainSelection = {
      organId: "organ:kidney",
      path: [{ from: "organ:kidney", to: "fn:blood-pressure" }],
    };
    const state = getChainRenderState(sel, impactNodes, impactEdges);

    expect(state.edgeState["E-KID-BP"]).toBe("active");

    const activeEdges = impactEdges.filter(
      (e) => state.edgeState[e.id] === "active",
    );
    expect(activeEdges.map((e) => e.id)).toEqual(["E-KID-BP"]);
  });

  it("layoutChain：organ 的 x 都是 0.10，同列两个节点 y 不相等且都在 0.10~0.90 之间", () => {
    const layout = layoutChain(impactNodes);

    // y 都落在 0.10~0.90（浮点除法留一点误差余量）
    for (const n of impactNodes) {
      const pos = layout[n.id];
      expect(pos.y).toBeGreaterThanOrEqual(0.1 - 1e-9);
      expect(pos.y).toBeLessThanOrEqual(0.9 + 1e-9);
    }

    const organNodes = impactNodes.filter((n) => n.kind === "organ");
    for (const n of organNodes) {
      expect(layout[n.id].x).toBe(0.1);
    }

    // 器官列有 11 个节点，前两个的 y 应当不同
    expect(layout[organNodes[0].id].y).not.toBe(layout[organNodes[1].id].y);
  });

  it("edgeDash：A 没有 dash，C 的 dash 是字符串", () => {
    expect(edgeDash("A").dash).toBeUndefined();
    expect(typeof edgeDash("C").dash).toBe("string");
  });
});
