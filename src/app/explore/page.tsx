import type { Metadata } from "next";
import Link from "next/link";
import { organs } from "@/content/organs";

export const metadata: Metadata = {
  title: "身体地图",
  description: `${organs.length} 个器官，三种读法。选择一个开始探索。`,
};

export default function ExplorePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="border-b border-line pb-6">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">身体地图</h1>
        <p className="mt-3 text-muted">
          {organs.length} 个器官，三种读法。选择一个开始，每条说法都会标上证据等级。
        </p>
      </header>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {organs.map((organ) => (
          <li key={organ.slug}>
            <Link
              href={`/organ/${organ.slug}`}
              className="flex h-full flex-col gap-1 rounded-xl border border-line bg-paper-2 p-5 transition-colors hover:border-structure"
            >
              <span className="font-serif text-2xl font-semibold text-ink">
                {organ.nameCn}
              </span>
              <span className="text-sm text-muted">
                {organ.nameEn} · {organ.system}
              </span>
              <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                {organ.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}