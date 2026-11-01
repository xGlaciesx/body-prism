import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "人体棱镜 Body Prism 团队、技术栈与数据来源。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="border-b border-line pb-6">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">关于</h1>
        <p className="mt-3 text-muted">人体棱镜 Body Prism：同一具身体，三种读法。</p>
      </header>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">项目</h2>
        <p className="mt-3 leading-relaxed text-muted">
          人体棱镜是一个 AI 驱动的身体信息三镜图谱：结构之镜看形态与位置，关系之镜看器官之间的协作，信息之镜用概念类比解释信号流动。每条说法都标上证据等级和来源。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">团队</h2>
        <p className="mt-3 leading-relaxed text-muted">
          两名大一新生：一人负责工程（信息工程方向），一人负责内容与医学审核（临床医学方向）。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">技术栈</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Next.js（App Router）+ TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Zod + Vercel AI SDK（DeepSeek）</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">数据来源</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>教科书：Gray&apos;s Anatomy、Guyton and Hall、Robbins 等；</li>
          <li>综述与原始文献（按条目标注 DOI）；</li>
          <li>传统理论文献（标注“传统理论，非现代医学共识”）。</li>
        </ul>
      </section>
    </main>
  );
}