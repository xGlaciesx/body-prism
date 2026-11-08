import type { Metadata } from "next";
import Link from "next/link";
import { ChainView } from "@/components/chain-view";
import {
  impactEdges,
  impactNodes,
  NOT_DIAGNOSIS_NOTICE,
  type ImpactNode,
} from "@/content/impact-graph";

export const metadata: Metadata = {
  title: "影响链",
  description: "选一个器官，看它会影响什么、出问题时可能波及什么。",
};

// 页面读 searchParams（?organ=…），查询参数在构建期不可知，需动态渲染。
// cacheComponents 开启时用 instant=false 走阻塞式渲染，仍输出完整 HTML。
export const instant = false;

/** 只保留带 organSlug 的器官节点，用于顶部选择链接。 */
function isOrganNode(
  node: ImpactNode,
): node is ImpactNode & { organSlug: string } {
  return node.kind === "organ" && typeof node.organSlug === "string";
}

const organNodes = impactNodes.filter(isOrganNode);
const organSlugs = new Set(organNodes.map((node) => node.organSlug));

export default async function ChainPage({
  searchParams,
}: {
  searchParams: Promise<{ organ?: string | string[] }>;
}) {
  const { organ } = await searchParams;
  const requested = typeof organ === "string" ? organ : "";
  // 缺失或无效的 organ 回退到 heart，避免选中一个图上不存在的节点。
  const slug = organSlugs.has(requested) ? requested : "heart";

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="border-b border-line pb-6">
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">影响链</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/90">
          选一个器官，看它会影响什么、出问题时可能波及什么。
        </p>
      </header>

      <nav aria-label="选择器官" className="mt-8 flex flex-wrap gap-2">
        {organNodes.map((node) => {
          const active = node.organSlug === slug;
          return (
            <Link
              key={node.id}
              href={`/chain?organ=${node.organSlug}`}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-structure bg-structure text-white"
                  : "border-line bg-paper-2 text-ink hover:border-structure"
              }`}
            >
              {node.nameCn}
            </Link>
          );
        })}
      </nav>

      <section aria-label="提问与影响链图" className="mt-8">
        <ChainView
          key={slug}
          nodes={impactNodes}
          edges={impactEdges}
          organSlug={slug}
        />
      </section>

      <p className="mt-6 border-t border-line pt-6 text-sm leading-relaxed text-muted">
        {NOT_DIAGNOSIS_NOTICE}
      </p>
    </main>
  );
}
