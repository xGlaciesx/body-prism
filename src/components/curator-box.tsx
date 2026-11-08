"use client";

import { useRef, useState, type FormEvent } from "react";
import { getImpactSubgraph } from "@/content/impact-graph";

const MAX_LEN = 120;

/** 后端 /api/curator 的响应形状：已由服务端用 Zod 校验，这里只做收窄读取。 */
type CuratorResponse = {
  mode: "ai" | "fallback";
  answer: string;
  path: { from: string; to: string }[];
  sourceIds: string[];
  notice: string;
};

type CuratorBoxProps = {
  organSlug: string;
  onPath: (path: { from: string; to: string }[] | null) => void;
};

/** 网络响应是 unknown，逐字段收窄，防止后端返回异常时白屏。 */
function isCuratorResponse(value: unknown): value is CuratorResponse {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (obj.mode !== "ai" && obj.mode !== "fallback") return false;
  if (typeof obj.answer !== "string") return false;
  if (!Array.isArray(obj.path)) return false;
  for (const item of obj.path) {
    if (typeof item !== "object" || item === null) return false;
    const edge = item as Record<string, unknown>;
    if (typeof edge.from !== "string" || typeof edge.to !== "string") {
      return false;
    }
  }
  if (!Array.isArray(obj.sourceIds)) return false;
  return typeof obj.notice === "string";
}

/**
 * 从当前器官的一阶子图里取最多 3 条出边，拼成示例问题。
 * 只拼接节点中文名，不新增任何医学事实。
 */
function buildExamples(organSlug: string): string[] {
  const organId = `organ:${organSlug}`;
  const subgraph = getImpactSubgraph(organId);
  const nameById = new Map(subgraph.nodes.map((n) => [n.id, n.nameCn]));
  const organName = nameById.get(organId) ?? organSlug;
  const outEdges = subgraph.edges.filter((e) => e.from === organId);
  const examples = outEdges
    .slice(0, 3)
    .map((e) => `${organName}和「${nameById.get(e.to) ?? e.to}」之间是什么关系？`);
  while (examples.length < 3) {
    examples.push(`${organName}在身体里主要影响什么？`);
  }
  return examples.slice(0, 3);
}

export function CuratorBox({ organSlug, onPath }: CuratorBoxProps) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CuratorResponse | null>(null);
  const [error, setError] = useState(false);
  const loadingRef = useRef(false);

  const examples = buildExamples(organSlug);

  async function ask(raw: string) {
    const q = raw.trim();
    if (q.length < 2 || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(false);
    setResult(null);
    // 提交新问题时先回到「只看器官」的默认高亮，避免旧路径残留在图上。
    onPath(null);

    try {
      const res = await fetch("/api/curator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organSlug, question: q }),
      });
      if (!res.ok) {
        setError(true);
        return;
      }
      const data: unknown = await res.json();
      if (!isCuratorResponse(data)) {
        setError(true);
        return;
      }
      setResult(data);
      onPath(data.path.length > 0 ? data.path : null);
    } catch {
      setError(true);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }

  // 用 path 是否为空区分「红旗拦截」和「普通降级」：后端只在红旗命中时才返回空 path。
  const kind =
    result === null
      ? null
      : result.mode === "ai"
        ? "ai"
        : result.path.length === 0
          ? "urgent"
          : "fallback";

  return (
    <section aria-label="提问" className="rounded-2xl border border-line bg-paper-2 p-5">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="curator-question"
          className="block font-serif text-lg font-semibold text-ink"
        >
          问一句，让图上的链亮起来
        </label>
        <textarea
          id="curator-question"
          value={question}
          maxLength={MAX_LEN}
          rows={2}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="问一个和这条链有关的问题"
          className="mt-3 w-full resize-none rounded-lg border border-line bg-paper p-3 text-sm leading-relaxed text-ink focus:border-structure focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted">
            {question.length}/{MAX_LEN}
          </span>
          <button
            type="submit"
            disabled={loading || question.trim().length < 2}
            className="rounded-full bg-structure px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            询问
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((q) => (
          <button
            key={q}
            type="button"
            disabled={loading}
            onClick={() => {
              setQuestion(q);
              ask(q);
            }}
            className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink hover:border-structure disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {loading && <p className="mt-4 text-sm text-muted">正在沿链查找…</p>}

        {!loading && error && (
          <p className="mt-4 text-sm text-muted">
            暂时没能回答，你可以点上面的链自己看。
          </p>
        )}

        {!loading && result !== null && (
          <div className="mt-5 rounded-xl border border-line bg-paper p-4">
            {kind === "urgent" && (
              <p className="text-xs font-medium text-danger">就医提示</p>
            )}
            <p
              className={`mt-2 whitespace-pre-line leading-relaxed ${
                kind === "urgent" ? "text-danger" : "text-ink"
              }`}
            >
              {result.answer}
            </p>

            {(kind === "ai" || kind === "fallback") && (
              <p className="mt-3 text-xs text-muted">
                {kind === "ai"
                  ? `AI 沿 ${result.path.length} 段影响链作答`
                  : "当前为离线答案（模型未连接）"}
              </p>
            )}

            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
              {result.notice}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

