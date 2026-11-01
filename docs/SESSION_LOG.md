# 开发日志

## 2026-10-21 · 女孩 · feat/home-hero

**今天完成**
- 创建 Next.js 项目并跑通
- 复制团队手册到 docs/team-handbook
- 建立 AGENTS.md / README / 日志 / 决策文件

**改了哪些文件**
- 项目脚手架、docs/、AGENTS.md、README.md

**没做完**
- 首页还没开始

**明天第一件事**
- 用 Cline 做首页 hero 和三镜卡片

**阻塞 / 需要对方**
- 男孩确认三个镜的一句话文案

## 2026-10-28 · 女孩 · feat/home-landing

**今天完成**
- 完成首页静态版：重写 src/app/page.tsx，新增 src/components/lens-card.tsx（三镜卡片）
- 暖白背景 #f7f2e8 + 暗红强调 #a6474f，桌面三列 / 手机一列，含 metadata、焦点样式、prefers-reduced-motion
- npm run lint 和 npm run build 均通过
- 提交 commit f38136c 到分支 feat/home-landing，已 push 到 origin
- 尝试用 gh 建 PR（未完成：gh 未登录 + 到 github.com 的 HTTPS 网络抖动）

**改了哪些文件**
- src/app/page.tsx、src/components/lens-card.tsx（已提交并推送）

**没做完**
- PR 还没建（需浏览器手动建，或 gh auth login 成功后由 Cline 建）
- PRD 全站实现还没开始（已定计划：① 设计系统 + Header/Footer + 补全首页；② /explore 静态版；③ /organ/heart）；globals.css / layout.tsx 尚未改
- /explore 路由不存在，首页「开始探索」按钮暂 404

**明天第一件事**
- 按既定顺序做第 ① 项：落地设计 tokens（globals.css）+ SiteHeader / FooterAttribution + 补全首页剩余区块（tokens、导航、四行 footer、心脏/实验室/证据徽章/边界声明等区块，纯静态）

**阻塞 / 需要对方**
- PR：浏览器手动建，或完成 gh auth login

## 2026-11-01 · 女孩 · feat/home-and-organ

**今天完成**
- 手册 v2 同步：覆盖 00/02/14/15/16，新增 START-HERE.md + content-pack 审核文档（已合进 main）
- 内容包落地：六器官 TS 数据 + curator-fallback.ts + schema.ts（已合进 main）
- 切片 1 外壳：设计 tokens（globals.css）、SiteHeader/SiteFooter、首页器官入口、/explore /method /about
- 切片 2 详情页：/organ/[slug]（三镜 tabs + A/B/C/D 证据徽章 + 误区 + 来源，6 个器官静态生成）
- 切片 4 AI 策展人：右下角抽屉；先 Mock 后接 DeepSeek 真实模型（失败回退兜底）
- 方法页 / 关于页补成正式内容
- npm run lint、npm run build 均通过；推送到 feat/home-and-organ

**改了哪些文件**
- docs/team-handbook/*、src/content/organs/*、src/lib/{schema,content,curator,curator-fallback}.ts
- src/app/{layout.tsx,page.tsx,globals.css}、src/app/{explore,method,about,organ/[slug],api/curator}
- src/components/{site-header,site-footer,lens-card,lens-tabs,evidence-badge,source-list,ai-curator-panel}.tsx
- 新增依赖：zod、ai、@ai-sdk/deepseek

**没做完**
- D4 心脏 3D（React Three Fiber + three.js，留给队友）
- DEEPSEEK_APP_KEY 未配（.env.local 未建），未配时走预生成兜底
- 男孩对六器官 claims 的医学审核未完成（docs/team-handbook/content-pack/REVIEW.md）
- feat/home-and-organ 还没开 PR

**明天第一件事**
- 开 PR 合并 feat/home-and-organ；配 DEEPSEEK_APP_KEY 验证真实模型
- 男孩按 REVIEW.md 逐条审器官内容

**阻塞 / 需要对方**
- 男孩：医学审核 + D4 3D
