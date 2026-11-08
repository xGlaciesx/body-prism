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
      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium tracking-widest text-muted">
              2026 传智杯 · AI WEB
            </p>
            <h1 className="mt-6 font-serif text-5xl font-bold leading-tight sm:text-6xl">
              人体棱镜
              <span className="mt-3 block font-sans text-xl font-normal tracking-wide text-muted sm:text-2xl">
                Body Prism
              </span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed sm:text-2xl">
              通用大模型告诉你「可能是什么」，我们说清「凭什么」。
            </p>

            <ol className="mt-8 list-decimal space-y-3 pl-5 text-base leading-relaxed text-ink/90">
              <li>身体不舒服时，越来越多人不再搜索，而是直接问 AI。</li>
              <li>但 AI 给的是一个结论——它不说这一步从哪来，也无从核对。</li>
              <li>人体棱镜把每条身体结论的推理链摊开：每一步都能点开，都标着证据强度。</li>
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/chain?organ=kidney"
                className="rounded-full bg-structure px-6 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
              >
                看一条链
              </Link>
              <Link
                href="/method"
                className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-structure"
              >
                它凭什么这么说
              </Link>
            </div>

            <p className="mt-8 text-xs text-muted">
              本站为科普作品，不提供诊断或治疗建议。急症请拨打 120。
            </p>
          </div>

          {/* 右侧留空：T14 的三维入口放这里，先占住 5 栏栅格避免返工。 */}
          <div className="lg:col-span-5" aria-hidden="true" />
        </div>
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

