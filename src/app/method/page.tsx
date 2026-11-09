import type { Metadata } from "next";
import Link from "next/link";
import { impactEdges, impactNodes, NOT_DIAGNOSIS_NOTICE } from "@/content/impact-graph";
import { organs } from "@/content/organs";
import { RED_FLAG_KEYWORDS, RED_FLAG_NOTICE } from "@/content/medical-disclaimer";

export const metadata: Metadata = {
  title: "方法与证据",
  description:
    "证据分级 A/B/C/D、AI 的边界、红旗拦截、已知局限与素材许可。",
};

/** 四个等级的口径（与 src/components/evidence-badge.tsx、evidence-panel.tsx 保持一致）。 */
const levels = [
  {
    key: "A",
    name: "教科书级事实",
    className: "border-l-evidence",
    dot: "bg-evidence",
    can: "可以当作解剖、生理上的既定事实来读。",
    cannot: "只能说明「是什么」，不能说明「你有问题」。",
  },
  {
    key: "B",
    name: "综述 / 队列研究",
    className: "border-l-information",
    dot: "bg-information",
    can: "可以说明「机制上大概是这样」，并允许存在不同解释。",
    cannot: "不能单独用来判断个体的病情或预后。",
  },
  {
    key: "C",
    name: "传统理论的表述",
    className: "border-l-relationship",
    dot: "bg-relationship",
    can: "可以说明中医是怎么描述身体关系的，作为一套自成体系的解释。",
    cannot: "不能当作现代医学的机制或结论，也不能与解剖结构一一对应。",
  },
  {
    key: "D",
    name: "概念类比",
    className: "border-l-muted",
    dot: "bg-muted",
    can: "可以作为一种理解框架，帮助把复杂的事讲清楚。",
    cannot: "不能当作任何医学依据；类比成立不等于结论成立。",
  },
] as const;

const aiRules = [
  "只能沿着站内人工标注的影响链走：模型能用的每一步，都先从图谱里取子图交给它，图上没有的路它走不出来。",
  "回答里的每一步路径都要回传，服务端逐条核对节点与来源；对不上的整段作废，不做「部分采信」。",
  "模型不可用、超时或校验失败时，退回人工撰写并审核过的兜底答案，界面上明确标出这是兜底。",
  "红旗（急症信号）在本地规则层判定，不交给模型判断；命中就直接给就医提示，根本不会调用模型。",
  "不做诊断、不判断「你可能得了什么病」、不给药名、不给剂量。",
  "回答按纯文本渲染，不使用 dangerouslySetInnerHTML，避免模型输出被当成页面内容执行。",
];

function countByLevel() {
  const map: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const edge of impactEdges) map[edge.evidenceLevel] += 1;
  return map;
}

function countClaimsByLevel() {
  const map: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const organ of organs) {
    for (const claim of organ.claims) map[claim.evidenceLevel] += 1;
  }
  return map;
}

export default function MethodPage() {
  const edgeCounts = countByLevel();
  const claimCounts = countClaimsByLevel();
  const organCount = impactNodes.filter((n) => n.kind === "organ").length;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="border-b border-line pb-6">
        <p className="text-sm font-medium tracking-widest text-muted">
          方法与证据
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
          它凭什么这么说
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/90">
          通用大模型给的是结论。这一页说明我们给的每一条结论，
          <strong className="font-semibold">凭什么</strong>、能用到哪一步、到哪一步就不该再往下用。
        </p>
      </header>

      {/* 一、四个等级 */}
      <section aria-labelledby="levels-heading" className="mt-12">
        <h2 id="levels-heading" className="font-serif text-2xl font-semibold">
          一、证据分级：A / B / C / D
        </h2>
        <p className="mt-3 leading-relaxed text-ink/90">
          站内每一条结论、影响链上的每一条边，都带一个等级。等级回答的不是「重要不重要」，
          而是
          <strong className="font-semibold">「这句话凭什么被说出来」</strong>。
        </p>

        <ul className="mt-6 space-y-4">
          {levels.map((level) => (
            <li
              key={level.key}
              className={`rounded-xl border border-line border-l-4 bg-paper-2 p-5 ${level.className}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold text-white ${level.dot}`}
                >
                  {level.key}
                </span>
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {level.name}
                </h3>
              </div>
              <dl className="mt-3 space-y-1 text-sm leading-relaxed">
                <div className="flex gap-2">
                  <dt className="shrink-0 text-evidence">能用来</dt>
                  <dd className="text-ink/90">{level.can}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-danger">不能用来</dt>
                  <dd className="text-muted">{level.cannot}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-xl border border-line bg-paper-2 p-5">
          <p className="leading-relaxed text-ink/90">
            <strong className="font-semibold">一个容易被误读的地方：</strong>
            A 到 D 不是一条「可靠程度」的高低线。A/B 是西医主线的证据强度；
            C 是另一种证据制度（传统理论，它的效力来自体系内部的长期实践，而不是随机对照试验）；
            D 是类比，本身不主张医学有效性。
            <span className="text-muted">
              把 C 和 D 排进 A→B→C→D 的梯子里，等于用西医的尺子量另外两套语言——
              那是我们没有做的事。
            </span>
          </p>
        </div>
      </section>

      {/* 二、每条边有什么 */}
      <section aria-labelledby="edge-heading" className="mt-12">
        <h2 id="edge-heading" className="font-serif text-2xl font-semibold">
          二、每一条关系都要交代三件事
        </h2>
        <ul className="mt-4 space-y-3 leading-relaxed text-ink/90">
          <li>
            <strong className="font-semibold">机制</strong>——说清「怎么过去的」，而不是直接给结论。
          </li>
          <li>
            <strong className="font-semibold">证据等级与来源</strong>——这条机制的依据是什么，
            点得开、查得回去。
          </li>
          <li>
            <strong className="font-semibold">caveat（限定条件）</strong>——每条边都必须写，
            至少包括「关联不等于因果」或「存在个体差异」，缺一条就构建失败。
          </li>
        </ul>

        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
            <dt className="text-xs text-muted">器官</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">{organCount}</dd>
          </div>
          <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
            <dt className="text-xs text-muted">图谱节点</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">
              {impactNodes.length}
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
            <dt className="text-xs text-muted">关系（边）</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">
              {impactEdges.length}
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
            <dt className="text-xs text-muted">逐条医学审核</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold">
              {impactEdges.length} 条
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          边上的等级分布：A {edgeCounts.A} 条 · B {edgeCounts.B} 条 · C{" "}
          {edgeCounts.C} 条 · D {edgeCounts.D} 条。器官正文里的论断分布：A{" "}
          {claimCounts.A} 条 · B {claimCounts.B} 条 · C {claimCounts.C} 条 · D{" "}
          {claimCounts.D} 条。
        </p>
      </section>

      {/* 三、AI 的边界 */}
      <section aria-labelledby="ai-heading" className="mt-12">
        <h2 id="ai-heading" className="font-serif text-2xl font-semibold">
          三、AI 在这里能做什么、不能做什么
        </h2>
        <p className="mt-3 leading-relaxed text-ink/90">
          本站的「棱镜策展人」不是医疗问答机器人。它的角色更接近向导：只能说图上有的话，
          而且必须说出它是怎么走过去的。
        </p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed text-ink/90">
          {aiRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          这套做法对应机器学习领域常说的「图约束生成 + 神经符号分离」：
          让语言模型负责把话说顺，让确定性的代码负责判断「这一步能不能成立」。
          我们只借鉴这个思路，没有做对照实验，也不声称达到了文献里的效果。
        </p>
      </section>

      {/* 四、红旗 */}
      <section aria-labelledby="redflag-heading" className="mt-12">
        <h2 id="redflag-heading" className="font-serif text-2xl font-semibold">
          四、红旗优先于一切
        </h2>
        <p className="mt-3 leading-relaxed text-ink/90">
          问句里出现下列信号时，程序在调用模型之前就停下，只给就医提示：
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {RED_FLAG_KEYWORDS.map((kw) => (
            <li
              key={kw}
              className="rounded-full border border-danger/40 bg-paper-2 px-3 py-1 text-sm text-danger"
            >
              {kw}
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl border border-danger/30 bg-paper-2 p-4 text-sm leading-relaxed text-ink/90">
          {RED_FLAG_NOTICE}
        </p>
      </section>

      {/* 五、局限 */}
      <section aria-labelledby="limits-heading" className="mt-12">
        <h2 id="limits-heading" className="font-serif text-2xl font-semibold">
          五、我们知道自己的局限
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-ink/90">
          <li>
            覆盖有限：{organCount} 个器官、{impactEdges.length} 条关系，是从
            「能讲清楚」出发做的切片，不是完整的医学知识库。
          </li>
          <li>
            审核是一个人做的：内容由临床医学专业的队友逐条审核并签字，
            不等于同行评议，也不等于任何指南背书。
          </li>
          <li>
            证据等级是自评：没有采用完整的 GRADE 流程，等级的边界在少数条上会偏主观，
            意见不同时我们倾向于往低标。
          </li>
          <li>
            三维视图尚未上线：当前用表格与影响链图进入，空间感弱于原计划。
          </li>
          <li>
            信息之镜只是类比：它能帮你建立直觉，但它不是模型，也不产生任何预测。
          </li>
        </ul>
      </section>

      {/* 六、许可 */}
      <section aria-labelledby="license-heading" className="mt-12">
        <h2 id="license-heading" className="font-serif text-2xl font-semibold">
          六、素材与许可
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
          <li>
            解剖数据：BodyParts3D, © The Database Center for Life Science,
            licensed under CC Attribution 4.0 International。
          </li>
          <li>
            站内文字与插图：本团队原创，或由 AIGC 辅助生成后人工修改；
            AIGC 使用范围与生成记录见仓库 `ATTRIBUTION.md`。
          </li>
          <li>代码：MIT（仅适用于代码，不覆盖文字与图像内容）。</li>
          <li>未使用医图库、教材插图或论文配图。</li>
        </ul>
      </section>

      <p className="mt-12 border-t border-line pt-6 text-sm leading-relaxed text-muted">
        {NOT_DIAGNOSIS_NOTICE}
      </p>

      <p className="mt-4 text-sm">
        <Link href="/chain?organ=kidney" className="text-information hover:underline">
          回去看一条链 →
        </Link>
      </p>
    </main>
  );
}
