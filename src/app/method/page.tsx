import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "方法与证据",
  description: "证据分级 A/B/C/D、AI 边界、中医与信息论声明。",
};

export default function MethodPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">方法与证据</h1>
      <p className="mt-4 text-muted">
        本页正在建设中。证据分级 A/B/C/D、AI 边界、免责声明与素材许可将在这里完整说明。
      </p>
    </main>
  );
}