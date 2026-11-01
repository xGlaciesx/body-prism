import type { Metadata } from "next";
import Link from "next/link";
import { LensCard, type Lens } from "@/components/lens-card";
import { organs } from "@/content/organs";

export const metadata: Metadata = {
  title: "人体棱镜 Body Prism",
  description: "同一具身体，三种读法：结构之镜、关系之镜、信息之镜。",
};

const lenses: Lens[] = [
  {
    number: "01",
    title: "结构之镜",
    description: "器官的形态、位置与组成",
    tone: "structure",
  },
  {
    number: "02",
    title: "关系之镜",
    description: "器官之间如何协作与调节",
    tone: "relationship",
  },
  {
    number: "03",
    title: "信息之镜",
    description: "信息如何在身体里流动",
    tone: "information",
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-12 pt-20 text-center sm:pb-16 sm:pt-28">
        <p className="text-sm font-medium tracking-widest text-muted">
          2026 传智杯 · AI WEB
        </p>
        <h1 className="mt-6 font-serif text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
          人体棱镜
        </h1>
        <p className="mt-6 text-xl sm:text-2xl">同一具身体，三种读法</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          把结构、关系与信息放在同一具身体上对照阅读，每一条说法都标上它有多可信。
        </p>
      </section>

      <section
        aria-labelledby="lenses-heading"
        className="mx-auto w-full max-w-5xl px-6 pb-14"
      >
        <h2 id="lenses-heading" className="sr-only">
          三种读法
        </h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {lenses.map((lens) => (
            <LensCard key={lens.number} lens={lens} />
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="organs-heading"
        className="mx-auto w-full max-w-5xl px-6 pb-20"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2
            id="organs-heading"
            className="font-serif text-2xl font-semibold sm:text-3xl"
          >
            选择一个器官
          </h2>
          <Link
            href="/explore"
            className="text-sm text-information hover:underline"
          >
            查看身体地图 →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {organs.map((organ) => (
            <li key={organ.slug}>
              <Link
                href={`/organ/${organ.slug}`}
                className="group flex h-full flex-col gap-1 rounded-xl border border-line bg-paper-2 p-5 transition-colors hover:border-structure"
              >
                <span className="font-serif text-xl font-semibold text-ink">
                  {organ.nameCn}
                </span>
                <span className="text-sm text-muted">{organ.nameEn}</span>
                <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                  {organ.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

