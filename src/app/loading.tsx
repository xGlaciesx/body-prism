/**
 * 全站加载骨架。
 *
 * 不做转圈圈：转圈圈只说明「在等」，骨架说明「马上要出现什么」。
 * 尺寸和正文页对齐，加载完切换时不会跳一下。
 */
export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-4xl px-6 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="sr-only">正在加载</p>
      <div className="h-3 w-28 animate-pulse rounded bg-line/70" />
      <div className="mt-6 h-12 w-3/5 animate-pulse rounded bg-line/70" />
      <div className="mt-5 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-line/50" />
        <div className="h-4 w-11/12 animate-pulse rounded bg-line/50" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-line/50" />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-line bg-paper-2"
          />
        ))}
      </div>
    </div>
  );
}
