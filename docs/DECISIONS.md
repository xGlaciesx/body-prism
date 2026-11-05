# 已定决策

> 只记“已经拍板、以后不再反复讨论”的事。每条写：决定、原因、日期。

## D0 现状对账 · 11-05

> 采用 `docs/plan/`（v4 方案包）作为唯一执行计划；废弃旧三维口径（three / @react-three / R3F）。本节是升级前对账快照。

### 结论

项目是「六个器官 + 三镜 + 器官详情/探索/关于/方法页」的 Next 16 骨架：**没有三维残留，也没有 AI 接口、影响链、测试、Zod**。可直接从 T1 开始；内容差 5 个器官，AI/影响链整条链路待建。

### A. 项目里已有的

| 类别 | 明细 |
|---|---|
| 页面 | `/`（三镜 + 6 器官列表）、`/explore`（纯列表页，无 `<Canvas>`）、`/organ/[slug]`、`/about`、`/method` |
| 组件 | site-header / site-footer / lens-card / lens-tabs / evidence-badge / source-list |
| 内容 | `src/content/organs/` 6 个（brain/heart/kidney/liver/lung/stomach）；`src/lib/schema.ts`、`content.ts`、`curator-fallback.ts`（旧版 sourceIds） |
| 依赖 | next 16.4.2 / react 19.3.0 / react-dom 19.3.0 + tailwind/eslint/typescript；**无 test 脚本** |
| 配置 | `.env.example`、`.github/workflows/ci.yml`（lint+build，无 test）、`AGENTS.md`（旧口径）、`docs/medical-disclaimer.md`（0 字节） |

### B. 方案包要求、但项目里没有的

5 个器官内容（spleen/gallbladder/small-intestine/large-intestine/bladder）；`src/content/impact-graph.ts`；`src/data/anatomy-hotspots.ts`；`public/models/body.glb`；`public/meshopt/meshopt_decoder.js`；依赖 zod / vitest / @google/model-viewer；`src/app/chain`、`src/app/api/curator`；`src/lib/chain.ts`、`red-flag.ts`、`validate-content.ts`(+test)；`.clinerules`；`ATTRIBUTION.md`/`LICENSE`；README 扩写。

### C. 冲突项（旧三维残留）

| 检查项 | 结果 |
|---|---|
| three / @react-three/* 依赖 | 无 |
| `src/components/three/` | 不存在 |
| `public/models/heart.glb` | 不存在 |
| `<Canvas>` / `OrbitControls` | src 中零匹配 |
| 结论 | 无三维残留；`docs/team-handbook/` 旧三维写法属历史文档，标注「以 docs/plan 为准」即可 |

### §0.5 十项清单

| # | 检查项 | 现状 |
|---|---|---|
| 1 | `src/app/api/curator/route.ts` | 缺 |
| 2 | `.env.example` | 已有（173 字节） |
| 3 | `ATTRIBUTION.md` | 缺 |
| 4 | `LICENSE` | 缺 |
| 5 | `docs/medical-disclaimer.md` | 0 字节空文件 |
| 6 | package.json 里 zod / vitest | 缺 |
| 7 | README 行数 | 20 行，不足 |
| 8 | `src/content/impact-graph.ts` | 缺 |
| 9 | `*.test.ts` | 缺 |
| 10 | 首页首屏 | 三镜介绍 + 6 器官，缺背景叙事、缺三维 |

## D-001 首页先做静态，不做 3D
- 日期：2026-10-21
- 原因：3D 风险高，先把页面和信息架构跑通；3D 放到第二个纵切面。