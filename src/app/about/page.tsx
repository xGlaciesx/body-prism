import type { Metadata } from "next";
import Link from "next/link";
import { organs } from "@/content/organs";
import { impactEdges, impactNodes } from "@/content/impact-graph";

export const metadata: Metadata = {
  title: "关于",
  description: "人体棱镜 Body Prism 的团队、定位、技术栈与数据来源。",
};

const REPO_URL = "https://github.com/xGlaciesx/body-prism";

const team = [
  {
    name: "李若溪",
    major: "电子信息工程",
    role: "前端、架构、部署、AI 集成",
  },
  {
    name: "张子昂",
    major: "临床医学",
    role: "医学内容审核、证据分级、答辩口径",
  },
];

const stack = [
  ["Next.js 16（App Router）", "页面、路由、服务端渲染"],
  ["React 19 + TypeScript 5", "界面与类型约束"],
  ["Tailwind CSS 4", "样式与设计系统"],
  ["zod", "接口与内容的运行时校验"],
  ["vitest", "纯函数与内容完整性测试"],
  ["DeepSeek API", "策展人的语言生成（仅在图谱内行走）"],
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="border-b border-line pb-6">
        <p className="text-sm font-medium tracking-widest text-muted">关于</p>
        <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
          人体棱镜 Body Prism
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/90">
          同一具身体，三种读法。
        </p>
      </header>

      <section aria-labelledby="why-heading" className="mt-10">
        <h2 id="why-heading" className="font-serif text-2xl font-semibold">
          为什么做这个
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/90">
          <p>
            身体不舒服的时候，越来越多人不再去搜索，而是直接问 AI。
            它给一个结论，说得流畅、说得确定，但不说这一步从哪来，也无从核对。
          </p>
          <p>
            我们想做的不是「更准的 AI」——那是模型厂商的事。我们想做的是一个界面，
            让每条结论的推理链都摊在桌面上：每一步都能点开，都标着证据强度，
            都写清它到哪儿为止。
          </p>
          <p>
            同一具身体，西医讲结构与功能，中医讲关系与整体，信息论讲信号与噪声。
            三种语言并置，不是要证明「都对」，而是让每种说法各自的边界露出来——
            西医的主线最容易被检验，中医的表述明确标为传统理论，信息论的部分只是类比。
          </p>
        </div>
      </section>

      <section aria-labelledby="team-heading" className="mt-10">
        <h2 id="team-heading" className="font-serif text-2xl font-semibold">
          团队
        </h2>
        <p className="mt-3 leading-relaxed text-ink/90">
          西安交通大学 · 队名「昂昂若驹」· 参赛 2026 第九届传智杯 AI WEB 网页开发挑战赛。
        </p>
        <ul className="mt-5 space-y-3">
          {team.map((member) => (
            <li
              key={member.name}
              className="rounded-xl border border-line bg-paper-2 p-5"
            >
              <p className="font-serif text-lg font-semibold text-ink">
                {member.name}
                <span className="ml-2 font-sans text-sm font-normal text-muted">
                  {member.major}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="what-heading" className="mt-10">
        <h2 id="what-heading" className="font-serif text-2xl font-semibold">
          站上现在有什么
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
            <dt className="text-xs text-muted">器官</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">
              {organs.length}
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
            <dt className="text-xs text-muted">影响链节点</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">
              {impactNodes.length}
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
            <dt className="text-xs text-muted">关系</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">
              {impactEdges.length}
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
            <dt className="text-xs text-muted">证据等级</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">A/B/C/D</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          每个器官一页，三种读法并排；影响链可以沿着边点开看机制、证据与限定条件；
          AI 策展人只沿这些边走，并把走过的路径亮在图上。
        </p>
      </section>

      <section aria-labelledby="stack-heading" className="mt-10">
        <h2 id="stack-heading" className="font-serif text-2xl font-semibold">
          技术栈
        </h2>
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-paper-2">
          {stack.map(([name, purpose]) => (
            <li
              key={name}
              className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-mono text-sm text-ink">{name}</span>
              <span className="text-sm text-muted">{purpose}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          依赖刻意保持最少：没有三维引擎、没有 UI 组件库、没有状态管理库。
          少一个依赖，就少一处我们讲不清楚的地方。
        </p>
      </section>

      <section aria-labelledby="data-heading" className="mt-10">
        <h2 id="data-heading" className="font-serif text-2xl font-semibold">
          数据与素材
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/90">
          <li>
            <strong className="font-semibold">解剖数据：</strong>
            BodyParts3D, © The Database Center for Life Science licensed under
            CC Attribution 4.0 International。
          </li>
          <li>
            <strong className="font-semibold">文字内容：</strong>
            由本团队撰写，临床医学专业成员逐条审核并签字；
            依据列在每页的文末来源里。
          </li>
          <li>
            <strong className="font-semibold">AIGC 使用：</strong>
            仅用于辅助生成说明性插图与排版草稿，不用于生成医学事实；
            使用范围与生成记录见仓库 `ATTRIBUTION.md`。
          </li>
          <li>
            <strong className="font-semibold">第三方图片：</strong>
            未使用医图库、教材插图或论文配图。
          </li>
        </ul>
      </section>

      <section aria-labelledby="license-heading" className="mt-10">
        <h2 id="license-heading" className="font-serif text-2xl font-semibold">
          许可与源码
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/90">
          <li>代码：MIT 许可，仅适用于代码。</li>
          <li>站内文字与图像内容：版权归作者所有，不随代码授权。</li>
          <li>
            源码：
            <a
              href={REPO_URL}
              className="text-information hover:underline"
              rel="noreferrer noopener"
              target="_blank"
            >
              github.com/xGlaciesx/body-prism
            </a>
          </li>
        </ul>
      </section>

      <p className="mt-12 border-t border-line pt-6 text-sm leading-relaxed text-muted">
        本网站用于健康信息素养教育，不提供诊断、治疗或用药建议。
        如想了解每一条结论的依据，请看
        <Link href="/method" className="mx-1 text-information hover:underline">
          方法与证据
        </Link>
        一页。
      </p>
    </main>
  );
}
