# 人体棱镜 Body Prism

> 通用大模型告诉你「可能是什么」，我们说清「凭什么」。
> 一个把每条身体结论的推理链摊开、每一步都标着证据强度的身体科普站。

## 它能回答什么问题

选一个器官（11 个：心、脑、肺、肝、肾、胃、脾、胆、小肠、大肠、膀胱），会看到三种并排的读法：它长什么样（结构之镜）、它和谁连着、互相影响（关系之镜）、它传递什么信号（信息之镜）。每一条结论都带证据等级（A/B/C/D）和来源。

## 在线演示

（待部署，部署说明见 `docs/plan/submission/DEPLOY-ONLINE-DEMO.md`）

## 技术栈与依赖清单

| 依赖 | 版本 | 用途 |
|---|---|---|
| Next.js（App Router） | 16.4.2 | 页面与路由、服务端渲染 |
| React / React DOM | 19.3.0 | UI 框架 |
| TypeScript | 5 | 类型约束 |
| Tailwind CSS | 4 | 样式与设计系统 |
| ESLint | 9 | 代码检查 |

计划引入（依赖白名单）：`zod`（运行时校验）、`vitest`（测试）、`@google/model-viewer`（三维入口）。

## 本地运行

```bash
git clone https://github.com/xGlaciesx/body-prism.git
cd body-prism
npm ci
# Windows: copy .env.example .env.local
# macOS / Linux: cp .env.example .env.local
npm run dev
```

打开 http://localhost:3000。常用命令：`npm run lint`、`npm run test`、`npm run build`；起服务后可跑冒烟测试 `bash scripts/smoke.sh http://localhost:3000`（会依次打 6 个器官的影响链页和 AI 接口，全部 200 才通过）。

## 目录结构

```text
src/
├─ app/              页面与路由（首页 / 探索 / 器官详情 / 关于 / 方法）
├─ components/       展示组件（三镜卡片、证据徽章、来源列表等）
├─ content/organs/   器官内容数据（人工审核，AI 不生成医学事实）
└─ lib/              纯逻辑：schema.ts（校验）、content.ts（读取）、curator-fallback.ts（兜底）
docs/
├─ plan/             唯一执行计划与任务卡
└─ team-handbook/    团队手册（历史资料）
```

## AI 部分是怎么做的

AI 只被允许沿着站内标注过的「影响链」作答：能走的每一步都先经服务端校验，走不通就退回已审核的兜底答案。约束换来可核对。

## 内容可信度说明

每条结论按 A/B/C/D 四级标注证据强度并附来源，C 级为传统理论、D 级为概念类比，不混为一谈。本站不提供诊断、处方或剂量建议。

## 团队与分工

参赛单位：西安交通大学 · 团队名称：昂昂若驹

| 成员 | 专业 | 分工 |
|---|---|---|
| 李若溪（xGlaciesx） | 电子信息工程 | 前端、架构、部署、AI 集成 |
| 张子昂（ziangzhang07） | 临床医学 | 医学内容审核、证据分级、答辩口径 |

## 许可

- 代码：MIT（见 `LICENSE`，仅适用于代码）
- 站内文字与图像内容：版权归作者所有，不随代码授权
- 第三方素材：遵循各自许可，见 `ATTRIBUTION.md`
