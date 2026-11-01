import type { Source, SourceType } from "@/lib/schema";
import { EvidenceBadge } from "@/components/evidence-badge";

const typeLabels: Record<SourceType, string> = {
  guideline: "临床指南",
  "systematic-review": "系统综述",
  rct: "随机对照试验",
  cohort: "队列研究",
  textbook: "教科书",
  review: "综述",
  traditional: "传统理论文献",
  other: "其他",
};

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ol className="mt-5 space-y-3">
      {sources.map((s) => (
        <li
          key={s.id}
          id={s.id}
          className="scroll-mt-24 rounded-xl border border-line bg-paper-2 p-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted">{s.id}</span>
            <EvidenceBadge level={s.level} />
          </div>
          <p className="mt-2 font-medium text-ink">{s.title}</p>
          <p className="mt-1 text-sm text-muted">
            {s.authors?.length ? `${s.authors.join(", ")} · ` : ""}
            {s.year} · {typeLabels[s.type]}
          </p>
          {s.note ? <p className="mt-2 text-sm text-muted">{s.note}</p> : null}
        </li>
      ))}
    </ol>
  );
}