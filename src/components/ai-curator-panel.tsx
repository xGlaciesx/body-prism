"use client";

import { useState } from "react";
import {
  curatorFallback,
  pickFallback,
  type CuratorAnswer,
} from "@/lib/curator-fallback";
import type { OrganContent, Source } from "@/lib/schema";

export function AiCuratorPanel({ organ }: { organ: OrganContent }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof pickFallback> | null>(
    null,
  );

  // 3 条预置问题：本器官的 2 条固定问答 + 1 条红旗演示。
  const presets = [
    ...curatorFallback
      .filter((a) => a.organSlug === organ.slug)
      .map((a) => a.question),
    "我胸痛怎么办？",
  ];

  const ask = (question: string) => {
    setResult(pickFallback(question));
  };

  const resolveSources = (answer: CuratorAnswer): Source[] => {
    const sourceIds = new Set<string>();
    for (const claimId of answer.sourceClaimIds) {
      const claim = organ.claims.find((c) => c.id === claimId);
      claim?.sourceIds.forEach((sid) => sourceIds.add(sid));
    }
    return organ.sources.filter((s) => sourceIds.has(s.id));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="curator-panel"
        className="fixed bottom-6 right-6 z-20 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper-2 shadow-sm transition-colors hover:bg-black/80"
      >
        <span aria-hidden>◆</span>
        问策展人
      </button>

      {open ? (
        <div
          id="curator-panel"
          role="dialog"
          aria-label="AI 策展人"
          className="fixed bottom-20 right-6 z-20 flex w-[calc(100vw-3rem)] max-w-sm flex-col gap-4 rounded-2xl border border-line bg-paper-2 p-5 shadow-lg"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-serif text-lg font-semibold">AI 策展人</h2>
            <span className="shrink-0 rounded-full border border-line bg-paper px-2.5 py-0.5 text-xs text-muted">
              演示模式 · 固定回答
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {presets.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-ink transition-colors hover:border-information"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = input.trim();
              if (q.length >= 2) ask(q);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="问一个关于身体的问题…"
              className="min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-information focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-information px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-information/90"
            >
              提问
            </button>
          </form>

          {result ? (
            result.kind === "urgent" ? (
              <div className="rounded-xl border border-danger bg-danger/10 p-4">
                <p className="text-sm font-semibold text-danger">⚠ 请先就医</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {result.urgentMessage}
                </p>
              </div>
            ) : result.kind === "answer" && result.answer ? (
              <AnswerView
                answer={result.answer}
                sources={resolveSources(result.answer)}
                onNavigate={() => setOpen(false)}
              />
            ) : (
              <div className="rounded-xl border border-line bg-paper p-4 text-sm leading-relaxed text-muted">
                这个问题超出了站内六个器官的范围。换个问法，或去「方法与证据」页了解我们的证据分级。
              </div>
            )
          ) : null}
        </div>
      ) : null}
    </>
  );
}

function AnswerView({
  answer,
  sources,
  onNavigate,
}: {
  answer: CuratorAnswer;
  sources: Source[];
  onNavigate: () => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <p className="text-sm leading-relaxed text-ink">{answer.answer}</p>
      {sources.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>来源：</span>
          {sources.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={onNavigate}
              className="font-mono text-information hover:underline"
            >
              {s.id}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}