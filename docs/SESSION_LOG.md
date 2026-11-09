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

## 2026-11-09 · 收口轮 · feat/3d-and-docs-audit

**今天完成**
- 首页接入三维人体：`<model-viewer>` + meshopt 压缩的 `body.glb`，11 个器官热点，
  点热点镜头飞近并出卡片，可直接进器官页或影响链。三维只回答「在哪」，不承载医学结论。
- 补四件站点基础设施：`not-found` / `error` / `loading` / `opengraph-image`，以及全站 metadata
  （`metadataBase`、OpenGraph、`SITE_URL`）。
- `/api/curator` 三处加固：降级答案不写缓存、按 IP 的滑动窗口限流（12 次/分钟）、
  `DEEPSEEK_BASE_URL` 可配置。
- 纠正一处**许可声明错误**：`ATTRIBUTION.md` 原写「未使用 Z-Anatomy 模型」，
  而仓库里放的正是它导出的 GLB。已补齐 Z-Anatomy（CC BY-SA 4.0）+ BodyParts3D（CC BY 4.0）
  的完整署名，方法页与页脚同步。
- 文档清理：移除开工期脚手架 `docs/plan/`、`docs/team-handbook/`、`docs/PLAN-DAILY.md`
  （共 80 个文件，已归档到仓库外），只留能对上线上功能的材料；
  部署指南重写为 `docs/DEPLOY.md`（修正了环境变量名）。
- 三维资产验过：GLB 内 1054 个 meshopt 压缩块全部解码通过，11 个器官节点均在。

**改了哪些文件**
- 新增：`src/components/body-viewer.tsx`、`src/data/anatomy-hotspots.ts`、`src/types/model-viewer.d.ts`、
  `public/models/body.glb`、`public/meshopt/meshopt_decoder.js`、`src/app/{not-found,error,loading,opengraph-image}.tsx`、
  `docs/DEPLOY.md`、`docs/aigc-log.md`、`docs/README.md`
- 修改：`src/app/page.tsx`、`src/app/method/page.tsx`、`src/app/layout.tsx`、`src/app/organ/[slug]/page.tsx`、
  `src/app/api/curator/route.ts`、`README.md`、`ATTRIBUTION.md`、`AGENTS.md`、`docs/{TECH-DOC,DEMO-VIDEO-SCRIPT,NARRATIVE-AND-QA,SUBMISSION-CHECKLIST,DECISIONS}.md`
- 删除：`docs/plan/`、`docs/team-handbook/`、`docs/PLAN-DAILY.md`、`public/` 下 Next 默认 SVG

**没做完**
- 在线演示还没部署（服务器在申请中），`docs/DEPLOY.md` 已备好
- 演示视频还没录（脚本 6:30 已定稿）
- 三维只做了整体一层，没有剖切、没有系统筛选，也没有低端机性能实测

**明天第一件事**
- 部署到 Vercel，按 `docs/DEPLOY.md` §6 走一遍上线前检查表

**阻塞 / 需要对方**
- 服务器审批结果（李若溪跟进）