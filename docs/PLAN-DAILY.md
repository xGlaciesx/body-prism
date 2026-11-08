# 人体棱镜 · 每日开发计划（PLAN-DAILY）

> 唯一执行计划是 `docs/plan/PLAN-V4-implementation.md`。这份文件是「今天该干哪张卡」的滚动版：D1–D7 两人的提示词块已全部预生成；每天收工后同步一次，只重写「明天及以后」，今天和以前的不动。

**状态概览：** 第 5 天 / 7 · 已完成 9 / 15 张卡（T0、T1、T2、T4、T5、T6、T7、T8、T10）+ S1 AI 章节、README 文字对齐 · 剩余 2 天 · 截止日期 2026-11-12

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
| 2026-11-08 | AI（Cline） | D3 收工：李若溪 T5（/chain 页面 + ChainCanvas SVG 画布）完成；张子昂 T8 步骤 1–10 全部完成（含接 DeepSeek + 校验降级）；T3 终审签字未完成，顺延 D4 | T5 build 通过、?organ=heart 能渲染；T8 已推 feat/d3-张子昂 分支 |
| 2026-11-08 | AI（Cline） | 守恒检查：T0/T1/T2/T4/T5/T8/T10 已完成，T3 终审 + T6/T7/T9/T12/T13 排 D4–D7，T11/T14 已砍 | 无卡片凭空消失 |
| 2026-11-08 | AI（Cline） | 事务记录：T8 的提问框红旗判断临时用 curator-fallback.ts 的 urgentPatterns（4 类）；红旗词表正式实现属 T7（red-flag-gate.tsx 的 needUrgentHelp + medical-disclaimer.ts 的 RED_FLAG_KEYWORDS），词表更全。T7 做完后 route.ts 要改 import needUrgentHelp 统一 | 避免 T7 产生第二套不一致的红旗词表 |
| 2026-11-08 | AI（Cline） | D3 张子昂提前完成 T10（缓存 30min/200条 + 一行 JSON 日志 + 429 直降）；并修复 T8 埋的 bug：subgraphToPrompt 给模型看中文名、却要求返回英文 id，导致 path 校验恒失败，已改为 buildSubgraphText 输出「中文名(英文id)」 | 已配 key 实测 ai 路径通过、缓存命中 cacheHit:true |
| 2026-11-09 | AI（Cline） | D4 收工（李若溪部分）：T6 证据面板 + T7 红旗拦截完成，T7 事务收口（route.ts 已改 import needUrgentHelp，红旗词表统一，不再用 urgentPatterns）；张子昂 T3 终审签字未完成，顺延 D5（T10 已由张子昂提前完成） | 李若溪提前完成周一任务，lint/test/build 全绿 |
| 2026-11-09 | AI（Cline） | 守恒检查：T0/T1/T2/T4/T5/T6/T7/T8/T10 已完成，T3 终审 + T9/T12/T13 排 D4–D7，T11/T14 已砍 | 无卡片凭空消失 |
| 2026-11-10 | AI（Cline） | D5 张子昂：S1 技术文档 AI 章节完成（图约束生成 + 逐边校验 + 缓存日志）；README 文字对齐（开头两句与首页副标题一致）；全库口径统一（C=传统理论/D=概念类比、11 器官）；T3 医学终审签字未完成，顺延 D6 | T13 的 README 部分提前完成，A 线首页首屏叙事仍待做 |
| 2026-11-10 | AI（Cline） | 守恒检查：T0/T1/T2/T4/T5/T6/T7/T8/T10 已完成，T3 终审 + T9/T12/T13（首页首屏）排 D6–D7，T11/T14 已砍；S1 AI 章节已完成 | 无卡片凭空消失 |

---

## D1 · 2026-11-06（周五）

**状态：** ⚠️ 部分完成 —— T0、T2 已完成；T1 缺 `.env.example`（护栏 5 个文件只建了 4 个）；T3 影响链数据已落地（impact-graph + 5 扩展器官），但 56 条边的医学审核未做

### 李若溪（A 线 · 工程）

- **任务卡：** ✅ P2 · T0（环境自检）、✅ P2 · T1（仓库护栏）
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

- **任务卡：** ✅ P2 · T0、✅ P2 · T1、✅ P2 · T2（内容完整性校验 + 测试框架）
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

- **任务卡：** ✅ P2 · T1 收尾（.env.example）、✅ P2 · T4（影响链的三个纯函数）
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

**状态：** ⚠️ 部分完成 —— 李若溪 T5（/chain 页面 + ChainCanvas SVG 画布）已完成；张子昂 T8 步骤 1–10 已完成（含接 DeepSeek + 校验降级）；T3 终审签字未完成，顺延 D4

### 李若溪（A 线 · 工程）

- **任务卡：** ✅ P2 · T5（`/chain` 页面骨架）
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

- **任务卡：** P2 · T3（医学终审签字 · 收尾）、✅ P2 · T8（AI 策展人接口，步骤 1–10）
- **做三件事：**
  1. ① T3：本人逐条终审 56 条边并签字（重点 2 条「建议复核」边 E-ALB-ASCITES、E-KID-NOCTURIA）
  2. ② T8：建 `src/app/api/curator/route.ts`（POST 接口）：zod 校验 → 红旗判断 → 取子图 → 接 DeepSeek → 校验 path/sourceIds → fallback
  3. ③ T8：`npm run build` + curl 验证降级路径（无 key 走 fallback，红旗词走就医引导，非法器官 400）
- **完成标志：** T3 审核记录「医学终审 / 结论」两栏填齐并签字；`curl -X POST /api/curator` 返回 `{ mode, answer, path, sourceIds, notice }`，红旗词不调模型、无 key 走 fallback
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

**状态：** ⚠️ 部分完成 —— 李若溪 T6（证据面板）+ T7（红旗拦截 + 红旗词表统一）已完成并提前收工；张子昂 T10（缓存/日志）已提前完成、T3 终审签字未完成，顺延 D5

### 李若溪（A 线 · 工程）

- **任务卡：** ✅ P2 · T6（证据面板）、✅ P2 · T7（红旗拦截）
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
先读：src/components/chain-canvas.tsx（T5 已产出）—— 边的 <g role="button" tabIndex={0} onKeyDown> 里已留 T6 接入点（当前回车/空格是占位）；redFlag 节点已画红环。
T4 已定稿接口（直接用，不要重写）：getChainRenderState(sel, nodes, edges)、layoutChain(nodes)、edgeDash(level)。
只改：新建 src/components/evidence-panel.tsx、src/content/medical-disclaimer.ts、src/components/red-flag-gate.tsx；修改 src/components/chain-canvas.tsx（把边的点击/键盘接入证据面板、redFlag 节点点击先弹拦截层）。
不许改：impact-graph.ts 数据、NOT_DIAGNOSIS_NOTICE 原文；不给诊断/药名/剂量；不装依赖。
【红旗词表事务（重要）】T8 已经在 src/app/api/curator/route.ts 里用 curator-fallback.ts 的 urgentPatterns（4 类）做了提问框红旗判断。你这份 T7 的 RED_FLAG_KEYWORDS（含剧烈头痛、突然说不出话、止不住血等，更全）是红旗词表的正式实现；做完后需要：① needUrgentHelp 用 RED_FLAG_KEYWORDS 判定；② 把 route.ts 里的 urgentPatterns 判断改成 import needUrgentHelp，统一词表，别留两套。
做完跑：npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T3（医学终审签字 · 收尾，顺延自 D3）
- **做三件事：**
  1. ① T3：本人逐条终审 56 条边并签字（重点 2 条「建议复核」边 E-ALB-ASCITES、E-KID-NOCTURIA）
  2. ② T3：对 2 条「建议复核」边给出最终结论（保留 / 补 caveat / 降级 / 删除）
  3. ③ T3：在 `docs/medical-review-impact-graph.md` 填「医学终审 / 结论」两栏并签字
- **完成标志：** T3 审核记录「医学终审 / 结论」两栏填齐并签字
- **收工命令：**
  ```bash
  npm run test
  ```
- **卡住先看：** P2 · T3、content-pack/REVIEW.md

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T3 医学终审签字，目标是把 56 条边的最终审核结论落到 docs/medical-review-impact-graph.md。
（这是张子昂本人的活：逐条签字、给 2 条「建议复核」边下结论。Cline 只协助整理，不做医学判断。）
只改：docs/medical-review-impact-graph.md。
不许改：src/content/ 医学表述、docs/plan/ 原件。
做完跑：npm run test（确认校验仍绿）。
做完停下来，把终审结论汇总告诉我，不要更新 PLAN-DAILY.md
```

---

## D5 · 2026-11-10（周二）

**状态：** ⚠️ 部分完成 —— 张子昂 S1 技术文档 AI 章节完成、README 文字对齐完成、全库口径统一（C=传统理论/D=概念类比、11 器官）；李若溪 T9 前端接入 AI 未开始（顺延）；张子昂 T3 医学终审签字未完成（顺延）

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
先读：src/app/api/curator/route.ts（T8 已定稿：POST /api/curator 返回 { mode: "ai"|"fallback", answer, path: { from, to }[], sourceIds, notice }，path 用节点 id 如 organ:kidney / fn:blood-pressure / man:dyspnea）、src/components/chain-canvas.tsx（T5–T7 已产出：props 为 { nodes, edges, organId }，内部已管理证据面板 + 红旗弹层）。
只改：新建 src/components/curator-box.tsx、chain-view.tsx；修改 src/components/chain-canvas.tsx、src/app/chain/page.tsx。
已定稿接口（不要重写）：getChainRenderState(sel, nodes, edges)，sel = { organId, path }（path: { from, to }[] | null）；ChainCanvas 需新增可选 path prop 传给 getChainRenderState 做高亮。
不许改：/api/curator 的实现、impact-graph 数据；key 不进前端；不用 dangerouslySetInnerHTML 渲染回答；不装依赖。
做完跑：npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T3（医学终审签字 · 收尾，顺延自 D4）、✅ S1（技术文档初稿 · AI 章节）
- **做三件事：**
  1. ① T3：本人逐条终审 56 条边并签字（重点 2 条「建议复核」边 E-ALB-ASCITES、E-KID-NOCTURIA）
  2. ② S1：写技术文档「AI 部分怎么做」一节（图约束生成 + 逐边校验 + 降级）
  3. ③ S1：说明红旗判断留在本地规则层、模型不参与红旗判定，并记录系统提示词约束（不判断患病、不给诊断/药物/剂量、path 逐字取自节点 id）
- **完成标志：** T3 审核记录签字齐；技术文档 AI 章节初稿可读
- **收工命令：**
  ```bash
  npm run build
  ```
- **卡住先看：** P2 · T3、P2 · T8、S1（TECH-DOC）

**提示词块（整块复制给 Cline）：**

```text
今天做 S1 技术文档 AI 章节，目标是把 /api/curator 的设计讲清楚。
（T3 医学终审是张子昂本人的活，不在这条提示词里；Cline 只做文档，不做医学结论。）
先读：src/app/api/curator/route.ts（T8+T10 已定稿：含缓存/日志，红旗判断已统一用 needUrgentHelp，来自 src/components/red-flag-gate.tsx）。
只改：docs/ 下技术文档相关文件（S1）。
不许改：功能代码、医学表述、docs/plan/ 原件。
依据（照实写，别编）：图约束生成（getImpactSubgraph/buildSubgraphText）、逐边校验（verifyPath/verifySourceIds）、红旗本地判定（needUrgentHelp，模型不参与）、失败降级 fallback、缓存与日志（cacheKey/cacheGet/cacheSet/logCurator）。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

---

## D6 · 2026-11-11（周三）

**状态：** ⬜ 未开始

### 李若溪（A 线 · 工程）

- **任务卡：** P2 · T9（前端接入 AI，顺延自 D5）、P2 · T13（首页首屏叙事）
- **做三件事：**
  1. ① T9：建 `src/components/curator-box.tsx` + `chain-view.tsx`，`chain-canvas.tsx` 接收 path 参数高亮对应边
  2. ② T9：输入「肾不好为什么会气短」能看到回答 + 图上高亮链
  3. ③ T13：改 `src/app/page.tsx` 首屏（三段式 + 两按钮 + 免责小字，与 README/视频第一镜口径一致）
- **完成标志：** AI 回答在图上高亮链；首页首屏三段式可读、手机一屏可见
- **收工命令：**
  ```powershell
  npm run test
  npm run build
  ```
- **卡住先看：** P2 · T9、P2 · T8、P2 · T13、D07 §3

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T9 + T13，目标是把 AI 回答接到影响链页面（问一句图上亮起模型走过的路），并把首页首屏改写成三段式叙事。
先读：src/app/api/curator/route.ts（T8 已定稿：POST /api/curator 返回 { mode: "ai"|"fallback", answer, path: { from, to }[], sourceIds, notice }，path 用节点 id 如 organ:kidney / fn:blood-pressure / man:dyspnea）、src/components/chain-canvas.tsx（props 为 { nodes, edges, organId }，已管理证据面板 + 红旗弹层）。
只改：新建 src/components/curator-box.tsx、chain-view.tsx；修改 src/components/chain-canvas.tsx（新增可选 path prop 传给 getChainRenderState 做高亮）、src/app/chain/page.tsx、src/app/page.tsx。
已定稿接口（不要重写）：getChainRenderState(sel, nodes, edges)，sel = { organId, path }。
不许改：/api/curator 实现、impact-graph 数据、src/content 器官正文；key 不进前端；不用 dangerouslySetInnerHTML 渲染回答；不装依赖。
T13 口径：一句话定位「同一具身体，三种读法」+ 三镜入口 + 免责小字，与 README 和视频第一镜一致。
做完跑：npm run test；npm run build。
做完停下来，把改了哪些文件告诉我，不要更新 PLAN-DAILY.md
```

### 张子昂（B 线 · 内容）

- **任务卡：** P2 · T3（医学终审签字 · 收尾，顺延自 D5）
- **做三件事：**
  1. ① T3：本人逐条终审 56 条边并签字（重点 2 条「建议复核」边 E-ALB-ASCITES、E-KID-NOCTURIA）
  2. ② T3：对 2 条「建议复核」边给出最终结论（保留 / 补 caveat / 降级 / 删除）
  3. ③ T3：在 `docs/medical-review-impact-graph.md` 填「医学终审 / 结论」两栏并签字
- **完成标志：** T3 审核记录「医学终审 / 结论」两栏填齐并签字
- **收工命令：**
  ```bash
  npm run test
  ```
- **卡住先看：** P2 · T3、content-pack/REVIEW.md

**提示词块（整块复制给 Cline）：**

```text
今天做 P2 · T3 医学终审签字，目标是把 56 条边的最终审核结论落到 docs/medical-review-impact-graph.md。
（这是张子昂本人的活：逐条签字、给 2 条「建议复核」边下结论。Cline 只协助整理，不做医学判断。）
只改：docs/medical-review-impact-graph.md。
不许改：src/content/ 医学表述、docs/plan/ 原件。
做完跑：npm run test（确认校验仍绿）。
做完停下来，把终审结论汇总告诉我，不要更新 PLAN-DAILY.md
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



