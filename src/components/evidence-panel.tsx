import type {
  ImpactEdge,
  ImpactLevel,
  ImpactRelation,
} from "@/content/impact-graph";
import { impactNodes } from "@/content/impact-graph";
import { EvidenceBadge } from "@/components/evidence-badge";
import { organBySlug } from "@/content/organs";
import type { Source } from "@/lib/schema";

/**
 * 证据等级的人话解释。徽标（字母 + 颜色）复用 evidence-badge，这里补一句“这等级到底意味着什么”。
 * 等级含义对齐 .clinerules：C = 传统理论/专家意见，D = 假说/概念类比。
 */
const EVIDENCE_LABEL: Record<ImpactLevel, { short: string; plain: string }> = {
  A: { short: "A 级", plain: "教科书或指南层面的共识" },
  B: { short: "B 级", plain: "有观察性研究支持，机制清楚但人群证据有限" },
  C: { short: "C 级", plain: "传统理论、专家意见或机制推测" },
  D: { short: "D 级", plain: "假说或概念类比，只作思考框架" },
};

const RELATION_LABEL: Record<ImpactRelation, string> = {
  affects: "影响",
  modulates: "调节",
  manifests: "表现为",
};

const nodeNameById = new Map(impactNodes.map((node) => [node.id, node.nameCn]));

/** 来源链接：有 url 用 url，否则有 doi 就拼 doi.org，都没有就不渲染链接。 */
function sourceHref(source: Source): string | null {
  if (source.url) return source.url;
  if (source.doi) return `https://doi.org/${source.doi}`;
  return null;
}

const PANEL_CLASS =
  "fixed z-20 border-line bg-paper-2 shadow-lg " +
  "inset-x-0 bottom-0 max-h-[60vh] overflow-y-auto border-t p-5 " +
  "md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-80 md:border-l md:border-t-0";

type EvidencePanelProps = {
  edge: ImpactEdge | null;
  organSlug: string;
  onClose: () => void;
};

export function EvidencePanel({ edge, organSlug, onClose }: EvidencePanelProps) {
  if (!edge) {
    return (
      <aside className={PANEL_CLASS}>
        <p className="text-sm text-muted">点图上的连线，看这一段是怎么来的。</p>
      </aside>
    );
  }

  const fromName = nodeNameById.get(edge.from) ?? edge.from;
  const toName = nodeNameById.get(edge.to) ?? edge.to;
  const relationLabel = RELATION_LABEL[edge.relation];
  const levelLabel = EVIDENCE_LABEL[edge.evidenceLevel];

  const organ = organBySlug.get(organSlug);
  const sources = organ
    ? edge.sourceIds
        .map((id) => organ.sources.find((s) => s.id === id))
        .filter((s): s is Source => s !== undefined)
    : [];

  return (
    <aside className={PANEL_CLASS}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-lg font-bold text-ink">这一段怎么看</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭证据面板"
          className="rounded-full border border-line px-2.5 py-1 text-xs text-muted hover:text-ink"
        >
          关闭
        </button>
      </div>

      {/* 关系行 */}
      <p className="mt-4 text-sm text-ink">
        <span className="font-medium">{fromName}</span>
        <span className="text-muted"> —{relationLabel}→ </span>
        <span className="font-medium">{toName}</span>
      </p>

      {/* 机制 */}
      <section className="mt-4">
        <h3 className="text-xs font-medium text-muted">机制</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink">{edge.mechanism}</p>
      </section>

      {/* 证据 */}
      <section className="mt-4">
        <h3 className="text-xs font-medium text-muted">证据</h3>
        <div className="mt-2">
          <EvidenceBadge level={edge.evidenceLevel} />
        </div>
        <p className="mt-1 text-sm text-muted">
          {levelLabel.short} · {levelLabel.plain}
        </p>
      </section>

      {/* 需要注意 */}
      <section className="mt-4">
        <h3 className="text-xs font-medium text-muted">需要注意</h3>
        <div className="mt-2 rounded-lg border border-line bg-paper p-3">
          <p className="text-sm leading-relaxed text-ink">{edge.caveat}</p>
        </div>
      </section>

      {/* 来源 */}
      <section className="mt-4">
        <h3 className="text-xs font-medium text-muted">来源</h3>
        {sources.length === 0 ? (
          <p className="mt-2 text-sm text-muted">来源信息待补</p>
        ) : (
          <ol className="mt-2 space-y-2">
            {sources.map((source) => {
              const href = sourceHref(source);
              const label = `${source.authors?.length ? `${source.authors.join(", ")}. ` : ""}${source.title}. ${source.year}`;
              return (
                <li key={source.id} className="text-sm leading-relaxed text-ink">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-structure underline underline-offset-2 hover:text-information"
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </aside>
  );
}
