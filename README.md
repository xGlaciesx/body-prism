# 人体棱镜 Body Prism

> 通用大模型告诉你「可能是什么」，我们说清「凭什么」。
> 一个把每条身体结论的推理链摊开、每一步都标着证据强度的身体科普站。

## 为什么做这个

身体不舒服时，越来越多人不再搜索，而是直接问 AI。它给一个结论，说得流畅、说得确定，但不说这一步从哪来，也无从核对。

AI 取走的其实不是答案，是**追问的能力**。两个人对身体看法不同，本来能吵起来，因为他们各自都有出处；现在两个人问同一个模型，得到同一个答案，看起来统一了，只是把分歧外包给了一个不透明的东西。

所以我们做的不是「更准的 AI」，而是一个**让每条结论都能被追问的界面**：每一步都能点开，都标着证据强度，都写清它到哪儿为止。同一具身体，西医讲结构与功能，中医讲关系与整体，信息论讲信号与噪声——三种说法并置，不是要证明「都对」，是让各自负责到什么程度露出来。

依据与边界见站内 `/method` 页。

## 它能回答什么问题

选一个器官（11 个：心、脑、肺、肝、肾、胃、脾、胆、小肠、大肠、膀胱），会看到三种并排的读法：它长什么样（结构之镜）、它和谁连着、互相影响（关系之镜）、它传递什么信号（信息之镜）。每一条结论都带证据等级（A/B/C/D）和来源。

## 在线演示

（待部署，部署说明见 [`docs/DEPLOY.md`](docs/DEPLOY.md)）

## 技术栈与依赖清单

| 依赖 | 版本 | 用途 |
|---|---|---|
| Next.js（App Router） | 16.4.2 | 页面与路由、服务端渲染 |
| React / React DOM | 19.3.0 | UI 框架 |
| TypeScript | 5 | 类型约束 |
| Tailwind CSS | 4 | 样式与设计系统 |
| ESLint | 9 | 代码检查 |
| zod | 4 | 接口与内容的运行时校验 |
| vitest | 4 | 纯函数与内容完整性测试 |
| @google/model-viewer | 4.4.0 | 首页三维人体；用 Web Component 而不是自己搭一套 three.js 场景 |

依赖刻意保持最少：没有 UI 组件库、没有状态管理库、没有额外的三维引擎（model-viewer 内部自带的 three.js 不算进我们的构建产物体积，它按需加载）。

三维模型 `public/models/body.glb` 是 **meshopt 压缩**的，`model-viewer` 默认不解码。少一个文件就**不报错、只是空白**：`public/meshopt/meshopt_decoder.js`（meshoptimizer 0.24.0）必须存在，且版本不能升到 1.x（新版本只发 ESM，而 model-viewer 是用 `<script src>` 加载它的）。

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
├─ app/              页面与路由（首页 / 探索 / 器官详情 / 影响链 / 关于 / 方法）
├─ components/       展示组件（三镜卡片、证据徽章、三维身体、来源列表等）
├─ content/organs/   器官内容数据（人工审核，AI 不生成医学事实）
├─ data/             三维热点的世界坐标（由 body.glb 逐个网格实测得出）
└─ lib/              纯逻辑：schema.ts（校验）、content.ts（读取）、curator-fallback.ts（兜底）
public/
├─ models/body.glb   合并后的三维模型（2.79 MB，11 个器官）
└─ meshopt/          meshopt 解码器（少它模型不显示）
docs/                技术文档、视频脚本、答辩材料、AIGC 记录
```

## AI 部分是怎么做的

AI 只被允许沿着站内标注过的「影响链」作答：能走的每一步都先经服务端校验，走不通就退回已审核的兜底答案。约束换来可核对。

## 内容可信度说明

每条结论按 A/B/C/D 四级标注并附来源：

| 等级 | 含义 | 不能用来做什么 |
|---|---|---|
| **A** | 教科书级事实 | 只能说明「是什么」，不能说明「你有问题」 |
| **B** | 综述 / 队列研究 | 不能判断个体病情或预后 |
| **C** | 传统理论的表述（中医） | 不能当作现代医学机制，也不能与解剖一一对应 |
| **D** | 概念类比（信息论） | 不构成任何医学依据 |

A→D 不是一条「可靠程度」的梯子：A/B 是西医主线的证据强度，C 和 D 是另外两种语言，各有各的效力来源。完整口径、AI 边界与已知局限见站内 `/method` 页。

本站不提供诊断、处方或剂量建议。

## 团队与分工

参赛单位：西安交通大学 · 团队名称：昂昂若驹

| 成员 | 专业 | 分工 |
|---|---|---|
| 李若溪（xGlaciesx） | 电子信息工程 | 前端、架构、部署、AI 集成 |
| 张子昂（ziangzhang07） | 临床医学 | 医学内容审核、证据分级、答辩口径 |

## 许可

本站三类内容分开授权，互不覆盖，完整条文见 `ATTRIBUTION.md`：

| 内容 | 许可 |
|---|---|
| 代码（`src/`） | MIT，见 `LICENSE` |
| 站内文字与原创插图 | CC BY-NC-SA 4.0（署名—非商业—相同方式共享） |
| 三维模型（`public/models/body.glb`） | CC BY-SA 4.0（基于 Z-Anatomy 整理，几何源自 BodyParts3D） |
