import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllOrgans, getOrgan } from "@/lib/content";
import { LensTabs } from "@/components/lens-tabs";
import { SourceList } from "@/components/source-list";
import { AiCuratorPanel } from "@/components/ai-curator-panel";

export function generateStaticParams() {
  return getAllOrgans().map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const organ = getOrgan(slug);
  if (!organ) return { title: "未找到" };
  return { title: organ.nameCn, description: organ.summary };
}

export default async function OrganPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const organ = getOrgan(slug);
  if (!organ) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <header className="border-b border-line pb-6">
        <p className="text-sm text-muted">
          {organ.nameEn} · {organ.system} · 阅读约 {organ.readingMinutes} 分钟
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">
          {organ.nameCn}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/90">
          {organ.summary}
        </p>
      </header>

      <LensTabs lenses={organ.lenses} claims={organ.claims} />

      <section aria-labelledby="misconceptions-heading" className="mt-12">
        <h2
          id="misconceptions-heading"
          className="font-serif text-2xl font-semibold"
        >
          常见误区
        </h2>
        <ul className="mt-5 space-y-4">
          {organ.misconceptions.map((m) => (
            <li
              key={m.myth}
              className="rounded-xl border border-line bg-paper-2 p-5"
            >
              <p className="font-medium text-ink">「{m.myth}」</p>
              <p className="mt-2 leading-relaxed text-muted">{m.correction}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span>来源：</span>
                {m.sourceIds.map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="font-mono text-xs text-information hover:underline"
                  >
                    {id}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="followups-heading" className="mt-12">
        <h2
          id="followups-heading"
          className="font-serif text-2xl font-semibold"
        >
          可以继续追问
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {organ.followups.map((q) => (
            <li
              key={q}
              className="rounded-full border border-line bg-paper-2 px-4 py-2 text-sm text-ink"
            >
              {q}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sources-heading" className="mt-12">
        <h2 id="sources-heading" className="font-serif text-2xl font-semibold">
          来源
        </h2>
        <SourceList sources={organ.sources} />
      </section>

      <AiCuratorPanel organ={organ} />
    </main>
  );
}