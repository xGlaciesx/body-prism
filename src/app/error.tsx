"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * 全局错误边界。
 *
 * 三件必须做的事：告诉用户出了什么事、给一个能自己走出去的按钮、
 * 把错误往控制台打一次方便排查（不打给用户看堆栈——那是我们的问题，不是他的）。
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="font-mono text-sm tracking-widest text-danger">出错了</p>
      <h1 className="mt-4 font-serif text-4xl font-bold">这一页没能打开</h1>
      <p className="mt-5 max-w-xl leading-relaxed text-ink/90">
        不是你的操作有问题，是页面自己出错了。可以重试一次；如果还是不行，
        回首页从器官列表进入，那条路不经过这里。
      </p>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-structure px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
        >
          重试
        </button>
        <Link
          href="/"
          className="rounded-full border border-line px-5 py-2.5 text-ink transition-colors hover:border-structure"
        >
          回首页
        </Link>
      </div>
    </main>
  );
}
