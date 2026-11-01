import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "方法与证据",
  description: "证据分级 A/B/C/D、AI 边界、中医与信息论声明。",
};

export default function MethodPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="border-b border-line pb-6">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">方法与证据</h1>
        <p className="mt-3 text-muted">
          每一条说法的可信度，我们都用 A/B/C/D 分级标注，并附来源。
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">证据分级</h2>
        <ul className="mt-4 space-y-3">
          <li className="rounded-xl border border-line bg-paper-2 p-4">
            <p className="font-medium text-ink">A · 教科书级事实</p>
            <p className="mt-1 text-sm text-muted">
              教科书级、广泛接受的解剖/生理事实，如四腔四瓣、肺泡气体交换、肾单位结构。
            </p>
          </li>
          <li className="rounded-xl border border-line bg-paper-2 p-4">
            <p className="font-medium text-ink">B · 综述 / 队列</p>
            <p className="mt-1 text-sm text-muted">
              综述、队列或仍在讨论的机制，如肠—脑轴、神经元计数。
            </p>
          </li>
          <li className="rounded-xl border border-line bg-paper-2 p-4">
            <p className="font-medium text-ink">C · 概念类比</p>
            <p className="mt-1 text-sm text-muted">
              本项目的概念类比、模型，如“信息节点”“预测机器”“缓冲器”，页面会明确标注。
            </p>
          </li>
          <li className="rounded-xl border border-line bg-paper-2 p-4">
            <p className="font-medium text-ink">D · 传统理论</p>
            <p className="mt-1 text-sm text-muted">
              传统理论（如中医概念），必须标注“传统理论，非现代医学共识”。
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">AI 边界</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
          <li>不做诊断、不开药、不给剂量；</li>
          <li>出现胸痛、呼吸困难、意识改变、大出血等急症，一律先建议就医；</li>
          <li>中医内容标注“传统理论”；信息论内容标注“概念类比”；</li>
          <li>每条回答带来源引用；没有可靠来源就明说。</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">免责声明</h2>
        <p className="mt-3 leading-relaxed text-muted">
          本网站用于健康信息素养教育与竞赛展示，不提供诊断、治疗或用药建议，也不能替代医生。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">素材许可</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>解剖数据：BodyParts3D, © The Database Center for Life Science, CC BY 4.0。</li>
          <li>部分视觉由 AIGC 辅助生成，过程与署名见「关于」页。</li>
        </ul>
      </section>
    </main>
  );
}