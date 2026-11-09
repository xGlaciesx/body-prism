import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

/**
 * 站点公网地址。部署时在环境变量里配 SITE_URL，分享卡片的绝对地址靠它拼出来；
 * 没配就退回 localhost，预览环境也不会因为缺一个变量而构建失败。
 */
const siteUrl = process.env.SITE_URL || "http://localhost:3000";

const description =
  "通用大模型告诉你「可能是什么」，我们说清「凭什么」——每条身体结论的推理链都摊开，每一步都标着证据强度。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "人体棱镜 Body Prism",
    template: "%s · 人体棱镜 Body Prism",
  },
  description,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "人体棱镜 Body Prism",
    title: "人体棱镜 Body Prism",
    description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
