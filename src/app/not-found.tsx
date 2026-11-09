import type { Metadata } from "next";
import Link from "next/link";

import { organs } from "@/content/organs";

export const metadata: Metadata = {
  title: "这一页不存在",
};

/**
 * 全站 404。
 *
 * 为什么值得单独写一页：默认的 Next.js 404 是英文的、样式全无，
 * 落在这样一个靠排版立住主题的站里，会让人怀疑后面每页都是半成品。
 * 这里顺手给出 11 个器官的入口——走到死路的人，应该一步就回到正题。
 */
export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="font-mono text-sm tracking-widest text-muted">404</p>
      <h1 className="mt-4 font-serif text-4xl font-bold">这一页不存在</h1>
      <p className="mt-5 max-w-xl leading-relaxed text-ink/90">
        可能是链接写错了，也可能是这个器官还没有收录。本站现在收录 11
        个器官，都在下面。
      </p>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link
          href="/"
          className="rounded-full bg-structure px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
        >
          回首页
        </Link>
        <Link
          href="/explore"
          className="rounded-full border border-line px-5 py-2.5 text-ink transition-colors hover:border-structure"
        >
          看全部器官
        </Link>
      </div>

      <ul className="mt-10 flex flex-wrap gap-2">
        {organs.map((organ) => (
          <li key={organ.slug}>
            <Link
              href={`/organ/${organ.slug}`}
              className="rounded-full border border-line bg-paper-2 px-4 py-2 text-sm text-ink transition-colors hover:border-structure"
            >
              {organ.nameCn}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
