import { organs } from "@/content/organs";
import { impactEdges, impactNodes } from "@/content/impact-graph";

/**
 * 校验内容包与影响链的引用完整性。
 * 返回错误列表，空数组表示全部通过。
 *
 * 设计意图：让「引用了不存在的来源」在 CI 里变红，
 * 而不是发布后在页面上点出一个死链。
 */
export function validateContent(): string[] {
  const errors: string[] = [];

  // 1. 收集所有器官包里出现过的 source id，供边校验使用
  const allSourceIds = new Set<string>();
  for (const organ of organs) {
    for (const s of organ.sources) allSourceIds.add(s.id);
  }

  // 2. 节点 id 不能重复
  const nodeIds = new Set<string>();
  for (const n of impactNodes) {
    if (nodeIds.has(n.id)) errors.push(`节点 id 重复：${n.id}`);
    nodeIds.add(n.id);
  }

  // 3. 逐条检查边：id 不重复、首尾指向真实节点、字段非空、来源真实存在
  const edgeIds = new Set<string>();
  for (const e of impactEdges) {
    if (edgeIds.has(e.id)) errors.push(`边 id 重复：${e.id}`);
    edgeIds.add(e.id);

    if (!nodeIds.has(e.from)) errors.push(`边 ${e.id} 的 from 不存在：${e.from}`);
    if (!nodeIds.has(e.to)) errors.push(`边 ${e.id} 的 to 不存在：${e.to}`);
    if (e.from === e.to) errors.push(`边 ${e.id} 首尾相同`);
    if (!e.caveat.trim()) errors.push(`边 ${e.id} 缺少 caveat`);
    if (!e.mechanism.trim()) errors.push(`边 ${e.id} 缺少 mechanism`);
    if (e.sourceIds.length === 0) errors.push(`边 ${e.id} 没有 sourceIds`);
    for (const id of e.sourceIds) {
      if (!allSourceIds.has(id)) errors.push(`边 ${e.id} 引用了不存在的来源：${id}`);
    }
  }

  return errors;
}
