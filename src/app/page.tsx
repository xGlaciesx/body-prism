import type { Metadata } from "next";
import Link from "next/link";
import { LensCard, type Lens } from "@/components/lens-card";

export const metadata: Metadata = {
  title: "人体棱镜 Body Prism",
  description: "同一具身体，三种读法：结构之镜、关系之镜、信息之镜。",
};

const lenses: Lens[] = [
  {
    number: "01",
    title: "结构之镜",
    description: "器官的形态、位置与组成",
  },
  {
    number: "02",
    title: "关系之镜",
    description: "器官之间如何协作与调节",
  },
  {
    number: "03",
    title: "信息之镜",
    description: "信息如何在身体里流动",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-[#f7f2e8] text-[#1c1a17]">
      <header className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-12 pt-20 text-center sm:pb-16 sm:pt-28">
        <p className="text-sm font-medium tracking-widest text-[#6f675c]">
          2026 传智杯 · AI WEB
        </p>
        <h1 className="mt-6 font-serif text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
          人体棱镜
        </h1>
        <p className="mt-6 text-xl text-[#1c1a17] sm:text-2xl">
          同一具身体，三种读法
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6f675c]">
          把结构、关系与信息放在同一具身体上对照阅读。
        </p>
      </header>

      <section
        aria-labelledby="lenses-heading"
        className="mx-auto w-full max-w-5xl px-6 pb-12"
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

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-16">
        <Link
          href="/explore"
          className="inline-flex items-center justify-center rounded-full bg-[#a6474f] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#8f3b43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a6474f] motion-reduce:transition-none"
        >
          开始探索
        </Link>
      </div>

      <footer className="mt-auto border-t border-[#ded4c5] px-6 py-6 text-center text-sm text-[#6f675c]">
        健康科普与竞赛展示，不提供诊断或处方建议。
      </footer>
    </main>
  );
}

