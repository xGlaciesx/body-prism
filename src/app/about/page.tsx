import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "人体棱镜 Body Prism 团队、技术栈与数据来源。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">关于</h1>
      <p className="mt-4 text-muted">
        本页正在建设中。团队、技术栈与数据来源将在这里说明。
      </p>
    </main>
  );
}