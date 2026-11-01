import Link from "next/link";

const nav = [
  { href: "/explore", label: "探索" },
  { href: "/method", label: "方法" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-serif text-lg font-semibold text-ink"
        >
          <span aria-hidden>◈</span>
          <span>人体棱镜</span>
          <span className="text-sm font-normal text-muted">Body Prism</span>
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-6 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative sm:hidden">
          <summary className="list-none cursor-pointer text-sm text-ink [&::-webkit-details-marker]:hidden">
            菜单
          </summary>
          <nav
            aria-label="移动端导航"
            className="absolute right-0 top-9 z-10 flex w-40 flex-col gap-1 rounded-xl border border-line bg-paper-2 p-2 shadow-sm"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-ink hover:bg-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}