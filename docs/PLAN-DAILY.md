# 人体棱镜 · 每日开发计划（PLAN-DAILY）

> 唯一执行计划是 `docs/plan/PLAN-V4-implementation.md`。这份文件是「今天该干哪张卡」的滚动版：D1–D7 两人的提示词块已全部预生成；每天收工后同步一次，只重写「明天及以后」，今天和以前的不动。

**状态概览：** 第 2 天 / 7 · 已完成 4 / 15 张卡（T0、T1、T2、T4）· 剩余 5 天 · 截止日期 2026-11-12

## 更新记录

| 日期 | 谁改的 | 改了什么 | 为什么 |
|---|---|---|---|
| 2026-11-05 | AI（Cline） | 初版：预生成 D1–D7 七天计划与两人提示词块 | 升级到 v4，产出每日滚动计划 |
| 2026-11-06 | AI（Cline） | D1 收工：T0/T2 完成、T1 缺 .env.example、T3 数据已落地但医学审核未做；重排 D2–D7 | 女孩忘记更新，代更；进度偏慢 |
| 2026-11-06 | AI（Cline） | 砍 T11 别名搜索、T14 三维入口 | 均为 P1 可砍项，不阻塞核心演示链路，时间留给医学审核与 AI 链路 |
| 2026-11-06 | AI（Cline） | 守恒检查：T0–T14 共 15 卡，T0/T2 已完成，T1/T3 顺延 D2，T4–T10/T12/T13 排 D2–D7，T11/T14 已砍 | 无卡片凭空消失 |
| 2026-11-07 | AI（Cline） | D2 收工：T1 收尾（.env.example）、T4 三个纯函数+测试完成；T3 审核记录已生成（56 行、5 条中医边改 C），终审签字顺延 D3 | 女孩完成 A 线；T3 终审待张子昂本人签字 |
| 2026-11-07 | AI（Cline） | 守恒检查：T0/T1/T2/T4 已完成，T3 终审顺延 D3，T5–T10/T12/T13 排 D3–D7，T11/T14 已砍 | 无卡片凭空消失 |
| 2026-11-07 | AI（Cline） | D2 收工（张子昂视角）：T1 收尾 .env.example、T3 审核记录 56 行 + 中医等级统一 C 均由张子昂完成并同步主干；终审签字待本人顺延 D3 | 修正 .env.example 分工归属，确认男孩产出已上主干 |

---

## D1 · 2026-11-06（周五）

**状态：** ⚠️ 部分完成 —— T0、T2 已完成；T1 缺 `.env.example`（护栏 5 个文件只建了 4 个）；T3 影响链数据已落地（impact-graph + 5 扩展器官），但 56 条边的医学审核未做

### 李若溪（A 线 · 工程）

- **任务卡：** P2 · T0（环境自检）、P2 · T1（仓库护栏）
- **做三件事：**
  1. ① `node -v`（确认 ≥ 20）→ `npm ci` → `npm run dev`，本地首页能打开
  2. ② 建/更新根目录护栏：`.clinerules`、`.env.example`、`ATTRIBUTION.md`、`LICENSE`
  3. ③ 填 `docs/medical-disclaimer.md`（非空）+ 扩写 `README.md`（介绍 / 架构 / 安装 / 依赖清单）
- **完成标志：** `npm run build` 通过，且根目录多出 5 个护栏文件、免责声明非空
- **收工命令（PowerShell 一次一条）：**
  ```powershell
  npm run lint
  npm run build
  ```
- **卡住先看：** P2 · T0、P2 · T1、P2 §7（`.clinerules` 写法）

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T0、T1，目标是把环境自检跑通、把仓库护栏文件补齐。
只改：根目录 .clinerules、.env.example、ATTRIBUTION.md、LICENSE、docs/medical-disclaimer.md、README.md。
不许改：src/ 下的任何代码、docs/plan/ 原件、依赖白名单（zod / vitest / @google/model-viewer）之外的东西。
做完跑：npm run lint；npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T0、T1、T2（内容完整性校验 + 测试框架）
- **做三件事：**
  1. ① macOS 上 `node -v` → `npm ci` → `npm run dev` 跑通
  2. ② 复核 `.clinerules` 与免责声明文案，确认无诊断/剂量表述
  3. ③ `npm i zod` + `npm i -D vitest`，建 `vitest.config.ts`、`src/lib/validate-content.test.ts`，CI 加 test 步骤，`package.json` 加 `test` 脚本
- **完成标志：** `npm run build` + `npm run test` 都绿（`validate-content.test.ts` 两个用例通过）
- **收工命令（zsh）：**
  ```bash
  npm run test
  npm run build
  ```
- **卡住先看：** P2 · T2、D16 §3.3（schema）、content-pack/REVIEW.md

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T0、T1、T2，目标是把内容完整性校验接进 CI，让「引用不存在的来源」在 CI 里变红。
只改：新建 vitest.config.ts、src/lib/validate-content.ts（按 P2 · T2 参考实现）、src/lib/validate-content.test.ts；修改 .github/workflows/ci.yml、package.json（只加 test 脚本）。
不许改：医学表述（content-pack 正文只能我审核后改）、docs/plan/ 原件、dependencies 白名单之外的东西；package.json 和 lock 要一起提交。
做完跑：npm run test；npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

---

## D2 · 2026-11-07（周六）

**状态：** ⚠️ 部分完成 —— 李若溪 T4（src/lib/chain.ts 三个纯函数 + chain.test.ts，7/7 测试绿）完成；张子昂 T1 收尾（.env.example 已补）+ T3 审核记录已生成（56 行、中医等级统一 C），均已同步主干；医学终审签字未完成

### 李若溪（A 线 · 工程）

- **任务卡：** P2 · T1 收尾（.env.example）、P2 · T4（影响链的三个纯函数）
- **做三件事：**
  1. ① 补根目录 `.env.example`（只写 `DEEPSEEK_API_KEY=`，不填真值）
  2. ② 建 `src/lib/chain.ts`：`getSubgraph(organSlug)`、`getChainPaths(from,to)`、`getChainRenderState(organSlug)`
  3. ③ 建 `src/lib/chain.test.ts`，跑 `npm run test` 全绿
- **完成标志：** `.env.example` 存在且不填真值；`npm run test` 全绿
- **收工命令：**
  ```powershell
  npm run test
  ```
- **卡住先看：** P2 · T4、D16 §3.5（纯函数）、P2 · T3（B 线当天的数据）

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T1 收尾 + T4，目标是把 .env.example 补上、把影响链三个纯函数写完并配测试。
只改：新建 .env.example、src/lib/chain.ts、src/lib/chain.test.ts。
不许改：src/content/impact-graph.ts 的节点和边、医学表述、docs/plan/ 原件、不装依赖。
.env.example 内容：只写一行 DEEPSEEK_API_KEY=（空值），不填真实 key。
做完跑：npm run test；npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T3（影响链数据落地 · 医学审核收口）
- **做三件事：**
  1. ① 确认 `src/content/impact-graph.ts` 已就位（44 节点 / 56 边）
  2. ② 逐条核对全部 56 条边的 `mechanism` 与 `evidenceLevel`（重点 5 条中医 D 级「表里」边）
  3. ③ 把审核结果记进 `docs/medical-review-impact-graph.md`（四列表格，56 行）
- **完成标志：** `docs/medical-review-impact-graph.md` 有 56 行审核记录；5 条 D 级边都标「传统理论」
- **收工命令：**
  ```bash
  npm run test
  ```
- **卡住先看：** P2 · T3、D17 §2.5（器官口径）、content-pack/REVIEW.md

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T3 医学审核，目标是把 56 条边逐条核对并写成审核记录。
只改：新建 docs/medical-review-impact-graph.md（审核记录）。
不许改：src/content/impact-graph.ts 的机制和证据等级（数据已落地，只审核不改代码，发现问题先记进记录再单独处理）、docs/plan/ 原件。
审核格式：四列表格（边 id / 原证据等级 / 审核结论 / 修改说明），56 条边逐条一行。
重点：5 条中医「表里」边（D 级）必须标「传统理论」。
做完跑：npm run test（确认校验仍绿）。
做完停下来，把审核结论汇总告诉我，不要更新 PLAN-DAILY.md
```

---

## D3 · 2026-11-08（周日）

**状态：** ⬜ 未开始

### 李若溪（A 线 · 工程）

- **任务卡：** P2 · T5（`/chain` 页面骨架）
- **做三件事：**
  1. ① 建 `src/app/chain/page.tsx`（Server Component，取 organ + 数据）
  2. ② 建 `src/components/chain-canvas.tsx`（"use client"，用 `getChainRenderState` + `layoutChain` + `edgeDash` 画节点+边）
  3. ③ 接 `?organ=` 参数，验证 `/chain?organ=heart` 能渲染
- **完成标志：** 访问 `/chain?organ=heart` 能看到一条链（节点 + 连线），无 3D 依赖
- **收工命令：**
  ```powershell
  npm run build
  ```
- **卡住先看：** P2 · T5、P2 · T4、D07 §5（/chain 页面设计）

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T5，目标是搭出 /chain 页面骨架，让 ?organ=heart 能看到一条影响链。
先读：src/lib/chain.ts（T4 已定稿，直接用）、src/content/impact-graph.ts（类型与数据，不改）。
只改：新建 src/app/chain/page.tsx、src/components/chain-canvas.tsx。
不许改：src/lib/chain.ts 的逻辑、impact-graph 数据；画图用 SVG，不装 three / @react-three。
T4 已定稿的接口（不要重写）：
- getChainRenderState(sel, nodes, edges) → { nodeOpacity, edgeState: "idle"|"active"|"dimmed", visibleNodeIds }
- layoutChain(nodes) → Record<id, { x, y }>（x/y 都是 0~1 比例，乘容器尺寸得像素）
- edgeDash(level) → { strokeWidth, dash?, opacity }
- type ChainSelection = { organId: string | null, path: { from, to }[] | null }
做完跑：npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T3（医学终审签字 · 收尾）、P2 · T8（AI 策展人接口，步骤 1–6，先不接模型）
- **做三件事：**
  1. ① T3：本人逐条终审 56 条边并签字（重点 2 条「建议复核」边 E-ALB-ASCITES、E-KID-NOCTURIA）
  2. ② T8：建 `src/app/api/curator/route.ts`（POST 接口骨架），取 `organSlug` + `question` → `getImpactSubgraph` 取子图 → 校验路径/来源
  3. ③ T8：不接 DeepSeek，先用 fallback 返回，确认响应结构对
- **完成标志：** T3 审核记录「医学终审 / 结论」两栏填齐并签字；`curl -X POST /api/curator` 返回符合 schema 的 JSON（含 `mode`/`path`/`notice`），且不调模型
- **收工命令：**
  ```bash
  npm run build
  curl -X POST http://localhost:3000/api/curator -H "Content-Type: application/json" -d '{"organSlug":"heart","question":"运动时心率为什么变快"}'
  ```
- **卡住先看：** P2 · T3、P2 · T8、P2 · T4、D05 §5（成本/token 预算）

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T8（步骤 1–6），目标是把 /api/curator 接口骨架跑通：取子图、校验、返回结构，先不接模型。
（T3 医学终审是张子昂本人的活，不在这条提示词里；Cline 只做结构校验，不做医学结论。）
先读：src/content/impact-graph.ts 已导出的 getImpactSubgraph(organId)、subgraphToPrompt(organId)。
只改：新建 src/app/api/curator/route.ts。
不许改：前端页面、src/content 医学表述；不要把 API key 写进代码或前端。
接口要点：organId = "organ:" + organSlug，调 getImpactSubgraph 取子图，校验路径/来源，先返回 fallback。
做完跑：npm run build；再 curl POST /api/curator 确认返回 JSON 结构。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

---

## D4 · 2026-11-09（周一）

**状态：** ⬜ 未开始

### 李若溪（A 线 · 工程）

- **任务卡：** P2 · T6（证据面板）、P2 · T7（红旗拦截）
- **做三件事：**
  1. ① T6：建 `src/components/evidence-panel.tsx`，`chain-canvas.tsx` 支持点击边
  2. ② T7：建 `src/content/medical-disclaimer.ts` + `src/components/red-flag-gate.tsx`
  3. ③ T7：`chain-canvas.tsx` 点 `redFlag` 节点先弹拦截层，不触发跳转
- **完成标志：** 点边能看到「关系/机制/证据/caveat/来源」五块；点「气短」节点弹就医提示、不调模型
- **收工命令：**
  ```powershell
  npm run build
  ```
- **卡住先看：** P2 · T6、P2 · T7、P2 · T2（caveat 校验）

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T6、T7，目标是把证据面板和红旗拦截接上：每条边都能点开看「凭什么」，红旗节点先拦一道就医提示。
只改：新建 src/components/evidence-panel.tsx、src/content/medical-disclaimer.ts、src/components/red-flag-gate.tsx；修改 src/components/chain-canvas.tsx。
不许改：impact-graph.ts 数据、NOT_DIAGNOSIS_NOTICE 原文；不给诊断/药名/剂量；不装依赖。
做完跑：npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T8（步骤 7–10，接 DeepSeek）
- **做三件事：**
  1. ① 服务端接 DeepSeek（key 只从 `process.env` 读）
  2. ② 用 Zod 校验模型输出（必须符合 schema）
  3. ③ 解析失败回退 fallback，答案带 claim/source 引用
- **完成标志：** 问一句能看到带引用的回答；越界问题（胸痛）先建议就医
- **收工命令：**
  ```bash
  npm run build
  curl -X POST http://localhost:3000/api/curator -H "Content-Type: application/json" -d '{"organSlug":"kidney","question":"肾不好为什么会气短"}'
  ```
- **卡住先看：** P2 · T8、D01 §4（DeepSeek 配置）、P2 · T7（红旗约定）

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T8（步骤 7–10），目标是把 DeepSeek 接进 /api/curator：输出带引用，解析失败能回退。
只改：src/app/api/curator/route.ts。
不许改：前端、医学表述；key 只从 process.env 读、不打印、不进前端；输出必须用 zod 校验。
做完跑：npm run build；curl POST 一次确认回答带引用。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

---

## D5 · 2026-11-10（周二）

**状态：** ⬜ 未开始

### 李若溪（A 线 · 工程）

- **任务卡：** P2 · T9（前端接入 AI）
- **做三件事：**
  1. ① 建 `src/components/curator-box.tsx`（输入框 + 加载/成功/出错三态）
  2. ② 新建 `chain-view.tsx` 持有 path 状态，把链图 + 提问框包进去
  3. ③ `chain-canvas.tsx` 接收 path 参数并高亮对应边
- **完成标志：** 输入「肾不好为什么会气短」能看到回答 + 图上高亮 3 段
- **收工命令：**
  ```powershell
  npm run build
  ```
- **卡住先看：** P2 · T9、P2 · T8、P2 · T10

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T9，目标是把 AI 回答接到影响链页面：问一句，图上把模型走过的路亮起来。
只改：新建 src/components/curator-box.tsx、chain-view.tsx；修改 src/components/chain-canvas.tsx、src/app/chain/page.tsx。
不许改：/api/curator 的实现；不要把 key 用进前端；不要用 dangerouslySetInnerHTML 渲染回答；不装依赖。
做完跑：npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T10（降级、缓存与日志）
- **做三件事：**
  1. ① route.ts 加内存缓存（30 分钟，size > 200 淘汰最旧）
  2. ② 加日志（一行 JSON，不打印 question 原文 / key / 模型原始输出）
  3. ③ 超时 8 秒不重试；HTTP 429 直接 fallback
- **完成标志：** 断网/删 key 仍能演示（fallback）；连问两次第二次明显更快（缓存命中）
- **收工命令：**
  ```bash
  npm run build
  ```
- **卡住先看：** P2 · T10、D05 §5、P2 · T8

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T10，目标是把 /api/curator 加上缓存和日志，让断网/超时/限流都不白屏。
只改：src/app/api/curator/route.ts。
不许改：返回结构；不引入数据库、不装依赖；日志不打印 question 原文和 key。
做完跑：npm run build；curl 连发两次确认第二次命中缓存。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

---

## D6 · 2026-11-11（周三）

**状态：** ⬜ 未开始

### 李若溪（A 线 · 工程）

- **任务卡：** P2 · T13（首页首屏叙事）
- **做三件事：**
  1. ① 改 `src/app/page.tsx` 首屏（三段式 + 两按钮 + 免责小字）
  2. ② 与 README、视频第一镜口径对齐
  3. ③ 手机宽度不横向滚动
- **完成标志：** 首页首屏三段式可读、手机一屏可见
- **收工命令：**
  ```powershell
  npm run test
  npm run build
  ```
- **卡住先看：** P2 · T13、D07 §3

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T13，目标是把首页首屏改写成三段式叙事：一句话定位 + 三镜入口 + 免责小字，与 README 和视频第一镜口径一致。
只改：src/app/page.tsx。
不许改：/chain 页面的医学内容、src/content 下器官正文、docs/plan/ 原件；不装依赖。
做完跑：npm run test；npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T13（文字对齐）+ README
- **做三件事：**
  1. ① T13：README 开头三段式压缩成两句，与首页副标题口径一致
  2. ② README 补「AI 部分是怎么做的」一节
  3. ③ 复核 `docs/medical-review-impact-graph.md` 终审签字已齐（T3 顺延项，D3 完成）
- **完成标志：** README 首段与首页副标题口径一致；审核记录终审签字齐
- **收工命令：**
  ```bash
  npm run build
  ```
- **卡住先看：** P2 · T13、P2 · T3、S1（TECH-DOC）

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T13（文字对齐）+ README，目标是把 README、首页、视频第一镜口径对齐。
只改：README.md。
不许改：src/ 下的页面结构和器官正文（A 线今天的活）、docs/plan/ 原件、未经我审核的医学表述。
做完跑：npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

---

## D7 · 2026-11-12（周四）

**状态：** ⬜ 未开始

### 李若溪（A 线 · 工程）

- **任务卡：** P2 · T12（冒烟测试 + 部署 + 录视频）
- **做三件事：**
  1. ① 写 `scripts/smoke.sh`（6 个 organ 的 /chain + /api/curator 冒烟）
  2. ② 部署 Vercel，配 `DEEPSEEK_API_KEY`，验证线上 `mode` 是 `ai`
  3. ③ 录 3 分钟演示视频 + `git tag v1.0-submit`
- **完成标志：** `lint`/`test`/`build` 全绿 + 线上 smoke 通过 + 打 tag
- **收工命令：**
  ```powershell
  npm run lint
  npm run test
  npm run build
  ```
- **卡住先看：** P2 · T12、S4（DEPLOY）、S3（DEMO-VIDEO-SCRIPT）

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T12，目标是把冒烟测试、线上部署、演示视频收口，打 tag 提交。
只改：新建 scripts/smoke.sh；README 部署说明（如需要）。
不许改：功能代码、医学表述；不要提交 .env.local；key 只在 Vercel 环境变量里配。
做完跑：npm run lint；npm run test；npm run build；bash scripts/smoke.sh <线上地址>。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** S1（技术文档）、S3（答辩稿）、S2（提交清单）
- **做三件事：**
  1. ① 按 S1 把技术文档补齐、导出 PDF（≤ 30 页）
  2. ② 按 S3 对齐 3 分钟答辩稿
  3. ③ 按 S2 逐项打勾
- **完成标志：** 技术文档 PDF 生成；答辩稿与首页副标题一字不差；提交清单全勾
- **收工命令：** （无代码命令，导出 PDF 后对照 S2 打勾）
- **卡住先看：** S1、S2、S3、S5（README 模板）

**提示词块（整块复制给 Cline）：**

```text
今天做提交材料（S1 技术文档 + S3 答辩稿 + S2 清单），目标是把要交出去的材料收齐并逐项核对。
只改：docs/ 下提交材料相关文档、README.md。
不许改：功能代码、医学表述、docs/plan/ 原件。
做完：对照 S2 逐项打勾，导出 PDF（≤30 页），把答辩稿和首页副标题对一遍确保一字不差。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

---

## 人工备注

<!-- 人工备注开始 -->

> **AI 不得修改本区块。** 这里是孩子手动记录临时情况的地方（生病、电脑没装好、某天有课、临时改期等）。
>
> - （空）

<!-- 人工备注结束 -->

## 三条最容易翻车的地方

1. **首页报 `Cannot find module 'three'` 或 `@react-three/...`** → 依赖卸了但旧组件还 import 着 → 在 `src/` 里搜 `three` / `@react-three` / `<Canvas>` / `OrbitControls`，把旧三维组件整个删掉，不要「改一改继续用」。
2. **三维不出现，但控制台没有红色报错** → 漏了 meshopt 解码器，或版本不对（装了 1.x 的 ESM 版）→ Network 里看 `meshopt_decoder.js` 是不是 200；文件末尾应有 `self.MeshoptDecoder = MeshoptDecoder`（见 D17 §2.6.3）。
3. **`npm run test` 一直绿，但其实没测到东西** → `impactEdges` 是空数组（数据没复制进来）→ 测试里顺手断言 `impactEdges.length > 20`，或临时把某条边的 `sourceIds` 改成 `SRC-NOT-EXIST` 看会不会红。



