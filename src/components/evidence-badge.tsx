import type { EvidenceLevel } from "@/lib/schema";

const config: Record<
  EvidenceLevel,
  { text: string; className: string; tooltip: string }
> = {
  A: {
    text: "A · 教科书级事实",
    className: "bg-evidence text-white",
    tooltip: "教科书级、广泛接受的解剖/生理事实",
  },
  B: {
    text: "B · 综述/队列",
    className: "bg-information text-white",
    tooltip: "综述、队列或仍在讨论的机制",
  },
  C: {
    text: "C · 传统理论",
    className: "bg-relationship text-white",
    tooltip: "传统理论的表述，非现代医学共识",
  },
  D: {
    text: "D · 概念类比",
    className: "bg-muted text-white",
    tooltip: "概念类比，用于组织叙事，不构成医学结论",
  },
};

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const c = config[level];
  return (
    <span
      title={c.tooltip}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${c.className}`}
    >
      {c.text}
    </span>
  );
}