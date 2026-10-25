# MVP 开发实施手册：从脚手架到可演示

> 这份文档解决“知道页面长什么样，但不知道先写哪个文件”的问题。
> **07 页面设计**回答“长什么样”；**这份**回答“按什么顺序写、每个文件放什么、做到什么算完成”。
> 适用：已经完成 **14 第一天写代码**，首页能在 `localhost:3000` 打开。
> 原则：**纵向切片**——每次做一个能独立演示的完整小功能，而不是“先把所有页面建空壳”。

> **前置与分工（这份文档不重复环境配置）**
> - 环境安装、Git 身份、建仓库、加协作者、保护 main、配 CI、**第一个 PR** → 全在 **00 起步手册**，这里**不再重做**；
> - 把项目跑起来、把团队手册放进仓库、第一次功能改动 → **14 第一天写代码**；
> - 每天开工/收工、分支与合并 → **15 每天的 Git 节奏**；
> - 这份文档只回答“**先写哪个文件、每个文件放什么、做到什么算完成**”。看到 `git commit` 示例，照抄提交信息即可，不要重新 `create-next-app`、也不要重新 `git init`。

---

## 0. 先定范围：MVP 只做这些

### 0.1 必须做（比赛演示能讲清）

| # | 能力 | 对应页面 | 优先级 |
|---|---|---|---|
| 1 | 首页：三镜概念 + 入口 | `/` | P0 |
| 2 | 探索页：器官列表/身体图 + 入口 | `/explore` | P0 |
| 3 | 器官详情：三镜标签 + 证据徽章 + 来源 | `/organ/[slug]` | P0 |
| 4 | 心脏 3D：能转、能点、能降级 | `/explore` 或器官页 | P1 |
| 5 | AI 策展人：带引用的问答抽屉 | 器官页 | P1 |
| 6 | 方法页：证据分级、免责声明、素材许可 | `/method` | P0 |
| 7 | 关于页：团队、技术、AIGC 说明 | `/about` | P2 |
| 8 | 信息负荷实验室：一个可玩的滑杆/对比 | `/lab/info-load` | P2 |
| 9 | 争议地图：二维坐标 + 卡片 | `/controversies` | P2 |

### 0.2 第一个月不做

- 用户注册、公开登录；
- 支付、会员；
- 管理后台完整 CRUD（先用本地内容文件）；
- 向量数据库 / RAG（先用关键词 + 预生成答案）；
- 多语言；
- 复杂动画、粒子、后处理；
- 移动端 App。

> 不是这些永远不做，而是**先让 P0 能演示**。P1 看第一周进度，P2 是加分项。

### 0.3 三条工程原则

1. **先本地数据，后数据库**：第一周所有器官内容放 `src/content/organs/*.ts`，不接 Supabase。页面先跑通，数据层以后再换。
2. **先降级，后增强**：3D 加载失败要有静态图/列表；AI 失败要有预生成展签。
3. **每个切片都能单独合并**：一个切片一个分支、一个 PR，合并后 main 仍可演示。

---

## 1. 依赖分阶段安装（不要一次装完）

每装一组依赖，单独提交一次 `chore:`，出问题容易回退。

### 阶段 0：脚手架自带（第一天）

`create-next-app` 已经带了：

- next、react、react-dom
- typescript、@types/*
- tailwindcss
- eslint、eslint-config-next

**不需要再装任何东西。**

### 阶段 1：UI 基础（做首页/器官页之前）

```bash
npx shadcn@latest init
```

按提示选择：

| 问题 | 建议 |
|---|---|
| Which style? | New York（或 Default，二选一，不影响功能） |
| Base color | Neutral |
| CSS variables? | Yes |

然后按需添加组件：

```bash
npx shadcn@latest add button card badge tabs accordion sheet dialog tooltip separator
```

图标：

```bash
npm install lucide-react
```

提交：

```bash
git add .
git commit -m "chore(ui): init shadcn and add base components"
```

> shadcn 会把组件源码复制到 `src/components/ui/`，这些文件可以改，属于你的项目。不要把它当成普通 npm 包。

### 阶段 2：3D（做心脏 viewer 之前）

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

提交：

```bash
git add package.json package-lock.json
git commit -m "chore(3d): add react-three-fiber and drei"
```

> 这三个包加起来不小，但只在用到 3D 的页面动态加载，不要放进首页首屏。

### 阶段 3：校验与 AI（做 AI 策展人之前）

```bash
npm install zod ai @ai-sdk/deepseek
```

提交：

```bash
git add package.json package-lock.json
git commit -m "chore(ai): add zod and vercel ai sdk"
```

> `@ai-sdk/deepseek` 是 provider，`ai` 是核心。不要在客户端组件里 import 它们。若安装时报版本冲突，把完整报错贴给 Cline，让它查当前官方文档，不要自己猜版本号。

### 阶段 4：Supabase（第二周，做登录/后台才装）

```bash
npm install @supabase/supabase-js @supabase/ssr
```

**第一周不要装。** 装了就会忍不住接，接了就会卡在 RLS、回调地址、环境变量上，首页反而做不完。

### 阶段 5：内容格式（可选，第一周不做）

如果你以后想把 `heart.ts` 换成 MDX：

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

**第一周不要做。** TS 文件有类型检查，AI 改起来更安全；MDX 多一层编译，出错信息不直观。

---

## 2. 目标目录结构

第一周结束时应接近这样（不是每个文件第一天就有）：

```text
body-prism/
├─ AGENTS.md
├─ README.md
├─ ATTRIBUTION.md
├─ .env.example
├─ .gitignore
├─ docs/
│  ├─ SESSION_LOG.md
│  ├─ DECISIONS.md
│  └─ team-handbook/
├─ public/
│  ├─ art/
│  │  └─ heart-fallback.webp
│  └─ models/
│     └─ heart.glb
└─ src/
   ├─ app/
   │  ├─ layout.tsx
   │  ├─ page.tsx
   │  ├─ globals.css
   │  ├─ not-found.tsx
   │  ├─ explore/
   │  │  └─ page.tsx
   │  ├─ organ/
   │  │  └─ [slug]/
   │  │     └─ page.tsx
   │  ├─ method/
   │  │  └─ page.tsx
   │  ├─ about/
   │  │  └─ page.tsx
   │  ├─ lab/
   │  │  └─ info-load/
   │  │     └─ page.tsx
   │  └─ api/
   │     └─ curator/
   │        └─ route.ts
   ├─ components/
   │  ├─ site-header.tsx
   │  ├─ site-footer.tsx
   │  ├─ lens-tabs.tsx
   │  ├─ lens-card.tsx
   │  ├─ evidence-badge.tsx
   │  ├─ source-list.tsx
   │  ├─ body-viewer.tsx
   │  ├─ organ-hotspot.tsx
   │  └─ ai-curator-panel.tsx
   ├─ content/
   │  └─ organs/
   │     ├─ heart.ts
   │     ├─ brain.ts
   │     ├─ lung.ts
   │     ├─ liver.ts
   │     ├─ kidney.ts
   │     ├─ stomach.ts
   │     └─ index.ts
   └─ lib/
      ├─ schema.ts
      ├─ content.ts
      └─ utils.ts
```

命名约定：

- 组件文件用 kebab-case（`lens-tabs.tsx`），组件名用 PascalCase（`LensTabs`）；
- 页面文件必须是 Next.js 规定的 `page.tsx` / `layout.tsx` / `route.ts`；
- 内容文件用器官英文小写（`heart.ts`）；
- 不建 `utils` 大杂烩，先只放 `cn()` 这类真正复用的函数。

---

## 3. 数据层：先写 schema，再写内容

### 3.1 `src/lib/schema.ts`

把 **07 §8** 的 TypeScript 接口变成 Zod schema。Zod 既做运行时校验，也能推导类型，避免“类型写了但数据是错的”。

```ts
import { z } from "zod";

export const lensIdSchema = z.enum(["structure", "relationship", "information"]);
export type LensId = z.infer<typeof lensIdSchema>;

export const evidenceLevelSchema = z.enum(["A", "B", "C", "D"]);
export type EvidenceLevel = z.infer<typeof evidenceLevelSchema>;

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  authors: z.array(z.string()).optional(),
  year: z.number().int().min(1900).max(2100),
  type: z.enum([
    "guideline",
    "systematic-review",
    "rct",
    "cohort",
    "textbook",
    "review",
    "traditional",
    "other",
  ]),
  url: z.string().url().optional(),
  doi: z.string().optional(),
  level: evidenceLevelSchema,
  note: z.string().optional(),
});
export type Source = z.infer<typeof sourceSchema>;

export const claimSchema = z.object({
  id: z.string().min(1),
  lens: lensIdSchema,
  text: z.string().min(1),
  evidenceLevel: evidenceLevelSchema,
  sourceIds: z.array(z.string()).min(1),
  caveat: z.string().optional(),
});
export type Claim = z.infer<typeof claimSchema>;

export const lensCardSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  claimIds: z.array(z.string()).min(1),
  visual: z.enum(["3d-layer", "network", "signal-flow", "timeline"]).optional(),
});
export type LensCard = z.infer<typeof lensCardSchema>;

export const organContentSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  nameCn: z.string().min(1),
  nameEn: z.string().min(1),
  system: z.string().min(1),
  summary: z.string().min(1),
  readingMinutes: z.number().int().positive(),
  camera: z.object({
    position: z.tuple([z.number(), z.number(), z.number()]),
    target: z.tuple([z.number(), z.number(), z.number()]),
    fov: z.number().optional(),
  }),
  lenses: z.object({
    structure: lensCardSchema,
    relationship: lensCardSchema,
    information: lensCardSchema,
  }),
  claims: z.array(claimSchema).min(1),
  misconceptions: z.array(
    z.object({
      myth: z.string().min(1),
      correction: z.string().min(1),
      sourceIds: z.array(z.string()).min(1),
    }),
  ),
  followups: z.array(z.string()).min(3).max(5),
  sources: z.array(sourceSchema).min(1),
  related: z.array(z.string()),
});
export type OrganContent = z.infer<typeof organContentSchema>;
```

规则：

- **`sourceIds` 里的每个 ID 必须真的存在于 `sources` 里**。后面写一个校验函数检查。
- **`claimIds` 同理**，必须存在于 `claims`。
- 不要为了让数据通过校验而放宽 schema（比如把 `min(1)` 改成 `optional`）。数据错了就改数据。

### 3.2 `src/content/organs/heart.ts`（可直接用的骨架）

```ts
import type { OrganContent } from "@/lib/schema";

export const heart: OrganContent = {
  id: "heart",
  slug: "heart",
  nameCn: "心脏",
  nameEn: "Heart",
  system: "circulatory",
  summary:
    "心脏不只是一台泵，它还是一个受自主神经和情绪调节的信息节点。",
  readingMinutes: 6,
  camera: {
    position: [0, 0, 3.2],
    target: [0, 0, 0],
    fov: 45,
  },
  lenses: {
    structure: {
      title: "结构之镜",
      body:
        "心脏有四个腔室、四组瓣膜和一套自己的电传导系统。瓣膜保证血液单向流动，传导系统让心肌按顺序收缩。",
      claimIds: ["C-HEART-STRUCT-1"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "心脏通过自主神经与脑、肺、肾、血管持续通信；情绪、睡眠和运动都会改变心率与心输出量。",
      claimIds: ["C-HEART-REL-1"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "心脏每天处理的是压力、化学信号和电信号，而不是“想法”。把它读成信息节点是一种类比，不是解剖结论。",
      claimIds: ["C-HEART-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-HEART-STRUCT-1",
      lens: "structure",
      text: "心脏由四个腔室和四组瓣膜组成，瓣膜维持血液单向流动。",
      evidenceLevel: "A",
      sourceIds: ["SRC-HEART-001"],
    },
    {
      id: "C-HEART-REL-1",
      lens: "relationship",
      text: "自主神经系统调节心率与心肌收缩力，交感与副交感作用相互拮抗。",
      evidenceLevel: "A",
      sourceIds: ["SRC-HEART-002"],
    },
    {
      id: "C-HEART-INFO-1",
      lens: "information",
      text: "把心脏描述为“信息节点”是概念类比，用于组织叙事，不是医学诊断依据。",
      evidenceLevel: "C",
      sourceIds: ["SRC-HEART-003"],
      caveat: "类比不等于机制；页面需标注“概念类比”。",
    },
  ],
  misconceptions: [
    {
      myth: "心脏只负责泵血，和情绪无关。",
      correction:
        "心脏的泵血功能是核心，但自主神经和激素会让情绪、压力、睡眠影响心率与血压；这不等于“情绪直接导致心脏病”。",
      sourceIds: ["SRC-HEART-002"],
    },
  ],
  followups: [
    "为什么心脏有自己的电传导系统？",
    "运动时心率为什么会变快？",
    "“心碎”有生理基础吗，还是只是比喻？",
  ],
  sources: [
    {
      id: "SRC-HEART-001",
      title: "Gray's Anatomy for Students",
      authors: ["Richard Drake", "Wayne Vogl", "Adam Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-HEART-002",
      title: "Guyton and Hall Textbook of Medical Physiology",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-HEART-003",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["brain", "lung"],
};
```

> 上面的书目和年份是**示例骨架**，正式提交前必须由男孩按实际版本核对页码/章节，并把 `type`、`level` 改准确。**不要直接把这个示例当最终医学内容。**

### 3.3 `src/content/organs/index.ts`

```ts
import { heart } from "./heart";
import type { OrganContent } from "@/lib/schema";

// 先只放 heart。每写完一个器官，再在这里加一行 import 和数组项。
export const organs: OrganContent[] = [heart];

export const organBySlug = new Map(organs.map((o) => [o.slug, o]));
```

**不要一次把六个器官都写进 import**：文件还不存在时会直接报 `Module not found`。一次只加一个器官，加一个就提交一次。

### 3.4 `src/lib/content.ts`：读取与校验

```ts
import { organContentSchema, type OrganContent } from "@/lib/schema";
import { organs, organBySlug } from "@/content/organs";

export function getAllOrgans(): OrganContent[] {
  return organs;
}

export function getOrgan(slug: string): OrganContent | undefined {
  return organBySlug.get(slug);
}

export function assertOrganIntegrity(organ: OrganContent): string[] {
  const errors: string[] = [];
  const sourceIds = new Set(organ.sources.map((s) => s.id));
  const claimIds = new Set(organ.claims.map((c) => c.id));

  for (const claim of organ.claims) {
    for (const id of claim.sourceIds) {
      if (!sourceIds.has(id)) errors.push(`claim ${claim.id} 引用了不存在的 source ${id}`);
    }
  }

  for (const lens of Object.values(organ.lenses)) {
    for (const id of lens.claimIds) {
      if (!claimIds.has(id)) errors.push(`lens ${lens.title} 引用了不存在的 claim ${id}`);
    }
  }

  const parsed = organContentSchema.safeParse(organ);
  if (!parsed.success) errors.push(...parsed.error.issues.map((i) => i.message));

  return errors;
}
```

在开发环境调用它：

```ts
if (process.env.NODE_ENV !== "production") {
  for (const organ of organs) {
    const errors = assertOrganIntegrity(organ);
    if (errors.length > 0) {
      console.error(`[content] ${organ.slug}`, errors);
    }
  }
}
```

> 这一步不是“多此一举”。AI 最容易编造 `sourceId`，这个校验能在构建前抓住它。

---

## 4. 五个纵向切片（按顺序做）

每个切片 = 一条分支 + 一个 PR + 一次合并。**不要同时开两条。**

### 切片 1：外壳 + 首页（第 1–2 天）

**目标**：任何页面都有统一导航、页脚、免责声明；首页能讲清三镜。

**文件**：

- `src/app/layout.tsx`（字体、metadata、Header/Footer）
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/app/page.tsx`
- `src/components/lens-card.tsx`

**Header 最小内容**：

- 左：`人体棱镜 Body Prism`
- 中/右：`探索`、`方法`、`关于`
- 手机：折叠菜单（先用 `<details>` 或 shadcn `Sheet`，不要自己写复杂 JS）

**Footer 最小内容**：

```text
健康科普与竞赛展示，不提供诊断、处方或剂量建议。
中医内容标注“传统理论”；信息论内容标注“概念类比”。
解剖数据：BodyParts3D, © The Database Center for Life Science, CC BY 4.0。
```

**给 Cline 的提示词**：

```text
做切片 1：全站外壳 + 首页。只改/新增这些文件：
- src/app/layout.tsx
- src/components/site-header.tsx
- src/components/site-footer.tsx
- src/components/lens-card.tsx
- src/app/page.tsx

不要安装依赖，不要做 3D，不要接 AI。
要求：
1. Header 在桌面横向、手机可展开；链接用 next/link。
2. Footer 必须包含免责声明、中医/信息论标注、BodyParts3D 署名。
3. 首页复用已有的 hero 和三张卡片，改成用 LensCard 组件渲染。
4. 所有颜色用 Tailwind token，不写内联 style。
5. 先给计划，等我确认。
```

**验收**：

- [ ] 桌面/手机导航都能用；
- [ ] 三个页面链接不 404（`/method`、`/about` 可以先占位）；
- [ ] Footer 三段文字完整；
- [ ] `npm run lint`、`npm run build` 通过。

**commit**：`feat(layout): add site shell and lens cards`

---

### 切片 2：器官内容 + 详情页（第 2–4 天）

**目标**：`/organ/heart` 能显示心脏的三镜、证据徽章、来源、误区、追问。

**文件**：

- `src/lib/schema.ts`
- `src/lib/content.ts`
- `src/content/organs/heart.ts`
- `src/content/organs/index.ts`
- `src/app/organ/[slug]/page.tsx`
- `src/components/lens-tabs.tsx`（client）
- `src/components/lens-card.tsx`（复用）
- `src/components/evidence-badge.tsx`
- `src/components/source-list.tsx`

**路由写法（App Router）**：

```tsx
// src/app/organ/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllOrgans, getOrgan } from "@/lib/content";

export function generateStaticParams() {
  return getAllOrgans().map((o) => ({ slug: o.slug }));
}

export default async function OrganPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const organ = getOrgan(slug);
  if (!organ) notFound();

  return (
    <main>
      <h1>{organ.nameCn}</h1>
      <p>{organ.summary}</p>
      {/* LensTabs / SourceList / Misconceptions */}
    </main>
  );
}
```

> **注意**：新版 Next.js 的 `params` 是 Promise，必须 `await params`。如果你用的版本类型提示不是 Promise，按编辑器提示改；不要同时写两种写法。

**LensTabs 的交互**：

- 三个标签：结构 / 关系 / 信息；
- 默认显示“结构”；
- 切换时更新 URL hash（`#structure`），刷新后保持；
- 键盘左右方向键可切换；
- 内容区用 `aria-live="polite"`。

**EvidenceBadge**：

| 等级 | 文案 | 颜色 | tooltip |
|---|---|---|---|
| A | A · 指南/系统综述 | 深绿 | 来自临床指南或系统综述 |
| B | B · 随机对照/队列 | 蓝 | 有对照研究支持 |
| C | C · 综述/教科书/类比 | 琥珀 | 间接证据或概念类比 |
| D | D · 传统理论/待验证 | 灰 | 传统理论或证据有限 |

> 不要只用颜色区分，必须同时有字母和文字。

**给 Cline 的提示词**：

```text
做切片 2：器官详情页，先用 heart 一个器官跑通。
只改/新增：
- src/lib/schema.ts
- src/lib/content.ts
- src/content/organs/heart.ts
- src/content/organs/index.ts
- src/app/organ/[slug]/page.tsx
- src/components/lens-tabs.tsx
- src/components/evidence-badge.tsx
- src/components/source-list.tsx

要求：
1. schema 严格按 07 文档第 8 节，不要放宽校验。
2. 页面必须支持 /organ/heart；不存在的 slug 调 notFound()。
3. LensTabs 是客户端组件，支持 hash 和键盘切换；其余保持 Server Component。
4. EvidenceBadge 同时显示字母、文字和 tooltip，不能只靠颜色。
5. 所有 claim 必须显示来源编号，点击能跳到 SourceList 对应条目。
6. 不要接数据库，不要接 AI。
先给计划。
```

**验收**：

- [ ] `/organ/heart` 显示三镜、至少 3 条 claim、3 条来源；
- [ ] 切换标签后 URL 带 hash，刷新不丢；
- [ ] 证据徽章有字母 + 文字；
- [ ] 不存在的 `/organ/xxx` 返回 404；
- [ ] `npm run build` 通过（说明静态参数正确）。

**commit**：`feat(organ): add heart detail page with lens tabs`

---

### 切片 3：探索页 + 心脏 3D（第 4–7 天）

**目标**：`/explore` 能看器官列表；心脏能转、能点；3D 失败有降级。

**先做无 3D 版本**（半天）：

- 六个器官卡片，显示中文名、英文名、系统、一句话；
- 点击进 `/organ/[slug]`；
- 手机一列，桌面三列。

**再做 3D**：

- `src/components/body-viewer.tsx`（client，动态导入）
- `public/models/heart.glb`（先放一个压缩过的小模型）
- `public/art/heart-fallback.webp`（降级图）

**动态导入写法**：

```tsx
"use client";

import dynamic from "next/dynamic";

const HeartScene = dynamic(() => import("./heart-scene"), {
  ssr: false,
  loading: () => <div className="aspect-square animate-pulse rounded-2xl bg-neutral-200" />,
});
```

**3D 组件最小要求**：

- 用 `<Canvas>` + `useFrame` 做缓慢自转；
- 支持鼠标拖拽旋转、滚轮缩放（OrbitControls）；
- 点击器官部位时回调 `onSelect(partId)`；
- 有 `Suspense` 和错误边界；
- 尊重 `prefers-reduced-motion`：关闭自转；
- 移动端降低像素比（`dpr={[1, 2]}`）；
- 没有 WebGL 时显示 fallback 图 + 列表。

**给 Cline 的提示词**：

```text
做切片 3：探索页 + 心脏 3D，但分两步。
第一步：先做无 3D 的 /explore，六个器官卡片，数据来自 getAllOrgans()。
第二步：等我确认后，再加 BodyViewer。

约束：
1. 3D 相关代码必须是客户端组件，用 dynamic(..., { ssr:false }) 引入。
2. 不能把 three.js 打进首页首屏。
3. 必须有 fallback 图和“不支持 3D 时看列表”的降级。
4. 不做后处理、不做粒子、不做复杂材质。
5. 先只给第一步的计划。
```

**验收**：

- [ ] 无 3D 时 `/explore` 也能用；
- [ ] 3D 能拖拽/缩放；
- [ ] 手机不卡到无法操作；
- [ ] 关闭 WebGL（浏览器设置或隐私模式）后仍有 fallback；
- [ ] 首屏 JS 没有因为 three 变大（看 `npm run build` 的 First Load JS）。

**commit**：`feat(explore): add organ grid and heart viewer`

---

### 切片 4：AI 策展人（第 7–10 天）

**目标**：器官页右下角一个“问策展人”按钮；回答带 `[S1]` 引用；失败有预生成答案。

**先做 Mock**（半天，不花钱）：

- 点击按钮打开抽屉；
- 显示 3 条预生成问题；
- 点问题显示预先写好的回答；
- 回答里的 `[S1]` 点击滚动到来源；
- 标注“演示模式：固定回答”。

**再做真实 API**：

- `src/app/api/curator/route.ts`
- `src/lib/curator.ts`（prompt 组装、schema 校验、回退）
- `src/components/ai-curator-panel.tsx`（client）

**Route Handler 最小结构**：

```ts
import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  organSlug: z.string().min(1),
  question: z.string().min(2).max(200),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // 1. 读取器官内容
  // 2. 只把该器官的 claims/sources 放进上下文
  // 3. 调用模型，要求输出 JSON
  // 4. 用 Zod 校验；失败则回退到预生成答案
  // 5. 过滤不存在的 sourceId
  return NextResponse.json({ answer: "...", citations: [] });
}
```

**四条硬规则**：

1. **密钥只在服务端**：`process.env.DEEPSEEK_APP_KEY`，不加 `NEXT_PUBLIC_`；
2. **只给模型该器官的内容**，不要“把整个知识库塞进去”；
3. **模型输出的 `sourceId` 必须存在于该器官的 `sources`**，不存在就丢弃；
4. **失败必须回退**：超时、限流、JSON 解析失败，都返回预生成展签，而不是 500 白屏。

**给 Cline 的提示词**：

```text
做切片 4：AI 策展人，先 Mock，后接 API。
第一步：只做 UI 抽屉 + 3 条预生成问答，不调用任何模型，不读环境变量。
第二步：等我确认 UI 后，再加 /api/curator。

约束：
1. 密钥只从 process.env 读，只在 route handler 里用。
2. 请求体用 Zod 校验；问题长度 2–200 字。
3. 模型输出必须是 JSON，并用 Zod 校验；失败回退到预生成答案。
4. 引用只能是该器官 sources 里存在的 ID。
5. 不做流式输出（第一版先简单），不做对话历史。
6. 先给第一步计划。
```

**验收**：

- [ ] 不配置 Key 时，Mock 模式完全可用；
- [ ] 配置 Key 后，回答带引用；
- [ ] 问“我胸痛怎么办”时，回答先建议就医，不做诊断；
- [ ] 断开网络/填错 Key，页面不崩，显示回退文案；
- [ ] 浏览器 Network 里看不到 Key。

**commit**：`feat(ai): add curator panel with citation fallback`

---

### 切片 5：方法页 + 实验室 + 收尾（第 10–14 天）

**方法页 `/method`** 必须有：

- 证据等级 A/B/C/D 的定义；
- 内容如何生产：谁写、谁审、多久更新；
- 中医内容边界；
- 信息论内容边界；
- 素材许可与 AIGC 说明；
- 免责声明。

**信息负荷实验室 `/lab/info-load`** 第一版只做：

- 一个“信息摄入”滑杆（0–100，概念值）；
- 三个固定场景（刷短视频 / 读论文 / 冥想）；
- 切换时显示不同的“信噪比示意”；
- 明确写：**这是概念演示，不是医学测量，不产生个人健康建议**。

不要做“测你的大脑带宽”这种伪测量。**滑杆是叙事工具，不是仪器。**

**争议地图 `/controversies`** 第一版：

- 二维坐标：证据强度 × 争议程度；
- 6–8 张卡片，点击展开“双方观点 + 来源”；
- 没有来源的争议不上图。

**给 Cline 的提示词**：

```text
做切片 5：方法页、信息负荷实验室、关于页、404。
要求：
1. 方法页必须包含证据等级定义、内容生产流程、中医/信息论边界、素材许可、免责声明。
2. 实验室只做概念演示，必须显著标注“非医学测量、不提供个人建议”。
3. 不做伪科学仪表：不要出现“你的大脑带宽是 XX%”这类个人结论。
4. 404 页面要有回首页和搜索入口。
5. 全站 metadata：title、description、og:image 占位。
先给计划。
```

**验收**：

- [ ] 方法页能独立回答“你们凭什么说这是真的”；
- [ ] 实验室有明确边界标注；
- [ ] 404 不生硬；
- [ ] Lighthouse 移动端 Performance ≥ 80（3D 页可单独放宽）；
- [ ] 全站无 `console.log` 遗留。

---

## 5. 第一周提交序列（可以直接当看板）

| # | commit message | 内容 | 切片 |
|---|---|---|---|
| 1 | `chore: scaffold project and add team handbook` | 脚手架 + 文档 | 0 |
| 2 | `docs: add AGENTS and session templates` | 记忆文件 | 0 |
| 3 | `feat(home): add hero and three lens cards` | 首页静态 | 1 |
| 4 | `feat(layout): add site shell and footer` | 导航/页脚 | 1 |
| 5 | `chore(ui): init shadcn and base components` | UI 依赖 | 1 |
| 6 | `feat(content): add organ schema and heart data` | schema + 心脏 | 2 |
| 7 | `feat(organ): add heart detail page` | 器官页 | 2 |
| 8 | `feat(organ): add lens tabs and evidence badge` | 交互 + 徽章 | 2 |
| 9 | `feat(explore): add organ grid` | 探索页无 3D | 3 |
| 10 | `chore(3d): add react-three-fiber` | 3D 依赖 | 3 |
| 11 | `feat(explore): add heart viewer with fallback` | 3D | 3 |
| 12 | `feat(ai): add curator panel mock` | AI UI | 4 |
| 13 | `feat(ai): add curator api with citations` | AI 接口 | 4 |
| 14 | `feat(method): add evidence and disclaimer page` | 方法页 | 5 |
| 15 | `feat(lab): add info-load concept demo` | 实验室 | 5 |
| 16 | `chore: add metadata and 404` | 收尾 | 5 |

> 不必严格 16 条；合并相邻的小提交很正常。**关键是每条都能独立运行、能回退。**

---

## 6. 每个页面的最小验收

| 页面 | 必须能 | 不能 |
|---|---|---|
| `/` | 讲清三镜、进入探索、手机正常 | 首屏加载 3D、自动播放声音 |
| `/explore` | 看到六个器官、点到详情 | 3D 失败就白屏 |
| `/organ/[slug]` | 三镜切换、证据徽章、来源、误区 | 没有来源的 claim |
| `/method` | 解释证据等级、边界、许可 | 把类比写成研究结论 |
| `/lab/info-load` | 滑杆有反馈、边界标注 | 输出个人健康结论 |
| `/controversies` | 看到分歧和来源 | 把有争议的说成共识 |
| `/about` | 团队、技术、AIGC 说明 | 真实姓名/学校/联系方式（除非确定要公开） |
| 404 | 回首页 | 空白页 |

---

## 7. 质量门（每个 PR 都过）

### 7.1 自动

```bash
npm run lint
npm run build
```

`build` 会同时做类型检查。任何一条失败，不合并。

### 7.2 人工

- [ ] 手机宽度 375px 没有横向滚动；
- [ ] 键盘 Tab 能走到主要按钮；
- [ ] 图片有 `alt`；
- [ ] 没有 `console.log`、没有 `debugger`；
- [ ] 没有 `any`（除非注释说明原因）；
- [ ] 没有把 `.env.local`、`node_modules`、`.next` 提交；
- [ ] 没有把未经审核的医学结论写成确定语气；
- [ ] 中医段落有“传统理论”，信息论段落有“概念类比”。

### 7.3 性能

- 3D 必须动态加载；
- 图片用 `next/image`，优先 WebP/AVIF；
- GLB 控制在 5MB 以内，超过就压缩/减面；
- 首页 First Load JS 尽量 < 200KB（3D 页单独算）。

---

## 8. 什么时候接数据库和后台

**顺序不能反**：

```text
P0 页面 + 本地内容
   ↓
3D + AI（仍然本地内容）
   ↓
能完整演示
   ↓
才接 Supabase（登录、草稿、发布、审计）
   ↓
才做管理后台
```

原因：

- 本地内容已经能让页面和 AI 跑通；
- 数据库会引入环境变量、RLS、迁移、回调地址，一天起步；
- 比赛评委看的是**演示效果和证据链**，不是“你有没有数据库”。

接 Supabase 时按 **06** 做，不要在这里临时发挥。

---

## 9. 常见坑

| 现象 | 原因 | 处理 |
|---|---|---|
| `useState` only works in Client Component | 在 Server Component 用了 Hook | 文件顶部加 `"use client"`，或把交互拆成子组件 |
| `params.slug` 是 undefined | 新版 Next 的 `params` 是 Promise | `const { slug } = await params` |
| 3D 报 `window is not defined` | three 在服务端执行了 | `dynamic(..., { ssr: false })` |
| 3D 页面首次加载很慢 | three 进了首屏 | 动态导入 + 单独路由 |
| 水合不一致（Hydration mismatch） | 服务端和客户端渲染结果不同 | 不在渲染中直接用 `Date.now()`、`Math.random()`、`localStorage` |
| `Module not found: @/...` | 路径别名没配 | 检查 `tsconfig.json` 的 `paths` |
| shadcn 组件样式不生效 | `globals.css` 没引入变量 | 按 shadcn init 的输出检查 |
| `npm run build` 在 `/organ/[slug]` 失败 | `generateStaticParams` 返回错 | 返回 `{ slug: o.slug }[]`，不要返回字符串数组 |
| AI 返回的引用不存在 | 模型编造 sourceId | 服务端过滤，只保留存在的 ID |
| 部署后 AI 500 | Vercel 没配环境变量 | 在 Project Settings → Environment Variables 配，重部署 |
| 部署后 Supabase 登录失败 | 回调 URL 没加 | Supabase Auth → URL Configuration 加生产域名 |

---

## 10. 完成定义（MVP Done）

全部打勾，才叫“MVP 可演示”：

- [ ] 首页、探索页、心脏详情页、方法页可在手机和桌面正常打开；
- [ ] 六个器官至少 3 个有完整三镜内容，每个 claim 有来源；
- [ ] 证据徽章 A/B/C/D 全站一致；
- [ ] 心脏 3D 可转、可点，失败有降级；
- [ ] AI 策展人可问 3 个预设问题，回答带引用，失败有回退；
- [ ] 方法页能解释证据等级和内容边界；
- [ ] 全站免责声明、中医/信息论标注、BodyParts3D 署名齐全；
- [ ] `npm run lint`、`npm run build` 全绿；
- [ ] Vercel 部署成功，环境变量齐全；
- [ ] README 能让陌生人 5 分钟跑起来；
- [ ] 3 分钟 Demo 脚本能从头讲到尾，不卡壳。

---

## 11. 一句话记住

> **先做一条能走通的路：首页 → 探索 → 心脏 → 三镜 → 来源；路通了，再加 3D 和 AI。**
> 不要先建十个空页面，再想怎么填。
