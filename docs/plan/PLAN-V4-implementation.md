# 实施手册 v4：把「可核对的影响链」做出来

> 15 张任务卡。每张卡包含：改哪个文件、能直接粘进 Cline 的提示词、一条验收命令、这个任务最容易踩的坑。
> 一次只做一张卡，做完先验收再提交。两个人的活已经切开，各走一条线，每天晚上合并一次。

---

## 0 这份文档怎么用

### 0.1 给老师

这是一份**可逐条验收**的学生实施计划，不是创意方案。创意和执行逻辑在《参赛方案 v3》，这一份只解决一个问题：两个大一学生，用 Cline + DeepSeek，在一周内能不能真的把东西做出来。

所以每一张任务卡都写成三件事：

1. **可粘贴的提示词**——孩子不需要会写代码，但必须能判断 AI 写得对不对；
2. **一条验收命令**——跑不过就是没过，不靠"感觉差不多了"；
3. **三个常见坑**——都是这类任务里第一次做必然遇到的。

请老师重点看 **第 10 章**，那里列了五个我们可以改但拿不准的地方，以及每个任务对应训练了什么能力。

### 0.2 给孩子

按这个顺序读，不要通读：

0. **第一次做项目的话，先读 `RUNBOOK.md`（P8）§0–§3**——它把下面这些拆成了"点哪个文件、敲哪条命令、屏幕该出现什么"，还有跟 Cline 说话的五个句式和一张 20 条的故障表；
1. 第 1 章「最后要交什么」——知道终点；
2. 第 3 章「仓库长什么样」——知道东西放哪；
3. **第 0.4 节 → 第 0.5 节**——先把文档放好、`.clinerules` 放根目录，再做一次现状对账。**这两步做完再碰代码**；
4. 第 7 章「给 Cline 的规矩」——确认 `.clinerules` 生效；
5. 然后按第 6 章的分工表，从自己那条线的第一张卡开始。

Windows 的看第 0.7 节，手册里的命令要换写法。

**先划清一件事**：文档包里的 `04 第一周每日任务卡` 和 `16 MVP 实施手册` 是旧排期，**不包含影响链和 AI 接口**，`04` 里写的 3D 是"自己做三维模型"的旧做法，已经废掉。两篇开头都加了"已被取代"的提示，看到就别照着做。当前只有这一份是执行计划；三维这一块的新口径单独写在 **D17 · 三维器官视图**，任务卡是 **T14**。

**铁律三条：**

- 一次只做一张卡。做完跑验收命令，通过了才 `commit`。
- 不要直接把整份文档粘给 Cline。**只粘当前那张卡的提示词**，加上第 7.2 节那句话。
- Cline 说"完成了"不算完成，`npm run build` 和 `npm run test` 都绿了才算。

### 0.3 给 Cline / DeepSeek

第 7 章的 `.clinerules` 是给模型的长期约束，写在仓库根目录，Cline 每次会话自动读取。本手册的其他部分**不要**一次性喂给模型——上下文太长，模型会开始"顺手重构"。

### 0.4 文档包怎么落地（开工第一个动作）

**不要直接跟 Cline 说"请读这个文件夹"，它会读爆。** 先手动把文件放好，位置定死：

```text
body-prism/                     ← 仓库根目录
├─ .clinerules                  ← 由 Cline 按 §2 的要求新建/更新，必须在根目录，不要放进 docs/
├─ docs/
│  ├─ medical-disclaimer.md     ← 已有（空文件，T1 要填）
│  └─ plan/                     ← 把整个 body-prism-docs/ 改名放进来
│     ├─ PLAN-V4-implementation.md      ← 唯一的执行依据
│     ├─ PLAN-V3-competitive.md         ← 为什么这么做
│     ├─ content-pack/                  ← T2/T3 要复制的内容与影响链数据
│     ├─ starter-assets/                ← T14 要复制的模型、坐标、署名模板
│     │  ├─ models/body.glb             ← 2.79 MB，复制进 public/models/
│     │  └─ anatomy-hotspots.ts         ← 复制进 src/data/
│     └─ submission/                    ← 提交材料模板
│        （包里的 .html / .pdf 不要拷进来：那是同一份 .md 的网页版和给老师看的印版，
│          AI 只读 .md；拷进来会多几 MB 提交历史，还会让 AI 读重复内容）
```

**为什么放 `docs/plan/` 而不是盖掉 `docs/team-handbook/`**：`team-handbook` 里的 00–16 是过程文档，仓库历史里留着有价值；新的执行计划和它是上下层关系，不是替代关系。

**路径规则**：本手册里所有 `content-pack/…`、`submission/…` 的写法，落地后都要在前面加 `docs/plan/`。例如：

| 手册里写的 | 实际路径 |
|---|---|
| `content-pack/impact-graph.ts` | `docs/plan/content-pack/impact-graph.ts` |
| `submission/README-template.md` | `docs/plan/submission/README-template.md` |
| `submission/DEMO-VIDEO-SCRIPT.md` | `docs/plan/submission/DEMO-VIDEO-SCRIPT.md` |
| `starter-assets/models/body.glb` | `docs/plan/starter-assets/models/body.glb`（复制目标是 `public/models/body.glb`） |

**提交这一批文档**（不要让 Cline 做，手动更稳；纯鼠标的点法见 `RUNBOOK.md` §3.6）：

```bash
git switch -c docs/plan-v4
# 复制文件后
git add docs/plan .clinerules
git commit -m "docs(plan): 加入 v4 实施手册与影响链数据包"
git push -u origin docs/plan-v4
# 到 GitHub 开 PR 合并进 main
```

**`docs/plan/` 要跟着代码一起进仓库**：另一个队友不拷文件，靠 `git pull` 拿这份方案；本手册里"T5 见第 5 章"这类指路全靠它。做完这一周之前不要删。

**两个容易搞错的地方：**

1. `.clinerules` 必须以**仓库根目录**的形式存在，由 Cline 新建/更新即可（文档包里没有这个文件）。放进 `docs/plan/` 里 Cline 读不到，等于没写。
2. 仓库根目录已经有 `AGENTS.md`。两份规则文件不会打架，但**以 `.clinerules` 为准**；如果两边要求不一致，改 `.clinerules`，别删 `AGENTS.md`。

### 0.5 开工前必须做的对账（D0，30 分钟）

**这一步不能省。** 本手册的缺口清单是按 **2026-11-01 的 `main`** 写的。如果这几天有人合并了新东西，你照着清单去补一个已经存在的东西，会白做，还可能把别人的代码盖掉。

而且这件事**最适合让 AI 做**：它只读不改，产出是一张表，你来判断。这也是它第一次真正展示"能扫代码但不能替你决定"的边界。

**粘贴这段（只读，不改代码）：**

```text
【任务】D0 现状对账，只读不改
【硬规则】
1. 不要创建、修改、删除任何文件。这一步只盘点。
2. 只读 docs/plan/PLAN-V4-implementation.md 的第 1.3 节（缺口对照表）。
   docs/plan 下的 .html 文件不要读，它们是同一内容的网页版，读了纯浪费。
3. 每一项都要给出证据：文件路径 + 行号，或命令输出。没有证据的项写"未确认"。

【要盘的 10 项】逐项回答，最后输出一张四列表：检查项 / 现状 / 证据 / 结论
1. src/app/api/curator/route.ts 是否存在
2. .env.example 是否存在
3. ATTRIBUTION.md 是否存在
4. LICENSE 是否存在
5. docs/medical-disclaimer.md 有多少字节（0 字节 = 空文件）
6. package.json 里有没有 zod、vitest
7. README.md 有多少行
8. src/content/impact-graph.ts 是否存在
9. 仓库里有没有 *.test.ts 文件
10. src/app/page.tsx 首屏现在写的是什么（原样贴出前 20 行）

【最后回答三个问题】
a. 哪些缺口已经有人补了？
b. 哪些缺口和本手册描述的不一样（比如影响链已经做了一半）？
c. 结论：可以直接开始 T1，还是需要先停下来问清楚？

【再次强调】这一轮不许改任何文件。等我说"可以开始"再动手。
```

**拿到表之后，按三种情况处理：**

| 对账结果 | 怎么办 |
|---|---|
| 10 项全缺，和手册一致 | 直接按 T1 往下走 |
| 部分已有（比如 `.env.example` 已经建了） | **跳过那一小步**，别做第二遍；其余照旧 |
| 有和手册冲突的东西（比如别人已经在做影响链） | **立刻停下来**，在群里问清楚，不要覆盖 |

**对账结果保存一份**：把那张表贴进 `docs/DECISIONS.md`，标题写"D0 现状对账 · 11-04"。答辩时这就是"我们真的盘过"的证据。

### 0.6 "请读这个文件夹"这句话为什么不能直接说

文档包解开是 **1.5 MB**，转成 token 大约 **40 万**。DeepSeek 的上下文是 **64K token**。

差 6 倍。

结果不会报错，而是更糟的情况：Cline 会读到一半自动截断，然后**基于不完整的理解开始编**——编一个不存在的文件名、编一个手册里没写的接口、把 T8 的校验逻辑说成"已经有了"。

**正确做法，按场景查表：**

| 你要它做什么 | 让它读什么 | 绝对不要 |
|---|---|---|
| 开工前对账 | `docs/plan/PLAN-V4-implementation.md` 的 §1.3 + 仓库源码 | 读任何 `.html` |
| 做某一张任务卡 | 该卡的提示词 + 卡里【先读】列出的那几个源文件 | 读整份 PLAN-V4 |
| 它写错了要返工 | 你手上那个报错原文 + 它刚改的那一个文件 | 重新读一遍文档 |
| 让它自查 | 只读 `.clinerules` + 它自己改过的文件 | 让它"回顾整个项目" |

一句话：**手册是给你看的，不是给它看的。给它的永远只是"这一张卡 + 这几个文件"。**

### 0.7 Windows 和 macOS 的命令不一样

手册里的验收命令大多按 bash 写。**李若溪在 Windows PowerShell 里直接跑会报错**，尤其 `curl`——PowerShell 里 `curl` 是 `Invoke-WebRequest` 的别名，参数完全不同，会卡很久。

两条规则：**PowerShell 里一律写 `curl.exe`**；下面这张表照抄。

- **列文件**：bash `ls -a | grep clinerules` → PowerShell `Get-ChildItem -Force -Name | Select-String "clinerules"`
- **搜内容**：`grep -rn "sk-" README.md` → `Select-String -Path README.md -Pattern "sk-"`
- **数匹配行**：`grep -c "id: \"E-" src/content/impact-graph.ts` → `(Select-String -Path src/content/impact-graph.ts -Pattern 'id: "E-' -AllMatches).Count`
- **看文件大小**：`wc -c docs/medical-disclaimer.md` → `(Get-Item docs/medical-disclaimer.md).Length`
- **看前几行**：`head -1 LICENSE` → `Get-Content LICENSE -TotalCount 1`；`head -30` → `Get-Content 文件名 -TotalCount 30`
- **发请求**：`curl -s -X POST ...` → **`curl.exe -s -X POST ...`**（必须带 `.exe`，否则走的是 PowerShell 别名）
- **看环境变量文件**：`cat .env.example` → `Get-Content .env.example`
- **计时**：`time curl ...` → `Measure-Command { curl.exe ... }`

`git`、`npm`、`node` 两边完全一样，不用改。

> macOS 的 zsh 和手册里的命令基本兼容，`grep`、`curl`、`wc` 都直接可用，不用看这张表。

---

## 1 最后要交什么

### 1.1 交付物清单

| # | 交付物 | 形式 | 谁负责 | 验收 |
|---|---|---|---|---|
| 1 | 可访问的线上站点 | Vercel 公网 URL | A 线 | 手机和电脑都能打开首页 |
| 2 | 影响链页面 `/chain` | 页面 | A 线 | 点器官 → 看到三列链 → 点边看证据 |
| 3 | AI 策展人 `/api/curator` | API 路由 | B 线 | 提问返回路径，且路径在图上真实存在 |
| 4 | 11 个器官内容页 | 已有 | B 线维护 | 每条 claim 都有 sourceIds |
| 5 | 技术文档 PDF | ≤30 页 | 共同 | 结构完整，含 AI 选型理由 |
| 6 | 演示视频 | 5–8 分钟 1080p | 共同 | 能一镜到底演完"肾→气短"那条链 |
| 7 | 仓库 README | Markdown | B 线 | 陌生人照着能跑起来 |
| 8 | 开源声明 `ATTRIBUTION.md` + `LICENSE` | Markdown | B 线 | 素材能追到许可；代码与内容授权分开写明 |
| 9 | 首页首屏（背景叙事） | 页面 | A 线 | 不滚动就能看到那三句话 |
| 10 | 三维器官入口（可选） | 首页右侧 | A 线 | 12 个热点都能点进链、相机能飞近、无 WebGL 时回退静态图 |

### 1.2 评分维度对照

| 评委看什么 | 我们的对应物 | 在哪一章做 |
|---|---|---|
| 应用场景是否真实 | 搜症状 → 问 AI 的转变 + "通用模型给结论不给推理" | 文档里讲，代码体现为"必须有路径" |
| AI 用得是否合理 | 图约束生成：模型只能在给定子图上走 | T8 |
| 是否只是调了个 API | 输出逐边校验 + 失败降级 + 红旗前置拦截 | T8、T10 |
| 工程质量 | 类型、单测、内容完整性校验进 CI | T2、T4 |
| 医学严谨性 | 证据分级标到"边"上，每条边强制 caveat | T3、T6 |
| 完成度 | 有线上地址、有视频、有文档 | T12 |

---

### 1.3 逐条对账：每个缺口由哪张卡补

《参赛方案 v3》§5 列了 8 条现状缺口，老师提了 2 条建议，大赛文件有 6 项硬性要求。全部落到卡上，没有一条悬空：

| 来源 | 缺口 / 要求 | 补它的卡 |
|---|---|---|
| v3 §5-1 | AI 接口不存在，核心亮点无法演示 | T8 |
| v3 §5-2 | `.env.example` 缺失（大赛硬性失分项） | T1 |
| v3 §5-3 | `ATTRIBUTION.md` 缺失，但 README 引用了它 | T1 |
| v3 §5-4 | `docs/medical-disclaimer.md` 是 0 字节空文件 | T1 |
| v3 §5-5 | 没有 Zod，技术文档写了却代码里没有 | T2（装）+ T8（用） |
| v3 §5-6 | README 只有 700 字，不满足四项要求 | T1 |
| v3 §5-7 | 无测试 | T2、T4 |
| v3 §5-7 | 无 LICENSE | T1 |
| v3 §5-8 | 影响链完全没有（核心增量） | T3 → T9 |
| 老师建议① | 把项目背景讲清楚 | **T13**（落到首页首屏，不是只写进文档） |
| 老师建议② | 器官—影响什么—有什么表现，形象化 | T5、T6（三列图 + 点开看证据）；**T14**（三维入口，视觉层） |
| 大赛·代码 | 结构清晰、注释规范、Git 历史完整 | T1 `.clinerules`、全程 PR 流程 |
| 大赛·README | 介绍 / 架构 / 安装 / 团队 | T1 |
| 大赛·环境 | 环境变量模板 + 依赖清单 | T1 |
| 大赛·视频 | 5–8 分钟、1080p | T12 + `submission/DEMO-VIDEO-SCRIPT.md` |
| 大赛·文档 | PDF ≤30 页、含 AI 选型与创新点 | `submission/TECH-DOC.md`（已按 v3 改写） |
| 大赛·演示 | 公网地址、评审期可用 | T12 |

> 这张表是给老师看的：如果哪一行您认为补得不够，直接点那一行的卡号。

---

## 2 技术栈锁定

### 2.1 已有的，不要动

```
Next.js 16.4.2（App Router）
React 19.3
TypeScript 5
Tailwind CSS 4（@tailwindcss/turbopack）
ESLint 9
```

### 2.2 只允许新增这三个依赖

```bash
npm i zod
npm i -D vitest
npm i @google/model-viewer   # 只在 T14 装，走不通就卸掉
```

- `zod`：校验 AI 返回的 JSON。**这是本项目的核心防线**，没有它"可核对"就是一句空话。
- `vitest`：跑纯函数测试和内容完整性校验。
- `@google/model-viewer`：T14 的三维器官视图。**它只做"转一转 + 点热点"**，不是 3D 引擎。如果 T14 由任何原因没做成，`npm uninstall` 掉，不影响其它任何一张卡。

### 2.3 明确不许引入

| 不许 | 原因 |
|---|---|
| three.js / react-three-fiber | T14 只用 `model-viewer`。自己搭场景、相机、材质灯光是另一件事，一周做不完，也不解决任何问题 |
| 任何 3D 引擎、物理引擎、粒子库 | 同上。三维在这个项目里的作用是"第一眼"，不是"技术展示" |
| 任何 UI 组件库（shadcn、antd、MUI） | 现在这套 Tailwind 配色已经成型，换库等于重做 |
| 任何状态管理库（zustand、redux） | 影响链页只有一个 `useState` |
| openai SDK | DeepSeek 兼容 OpenAI 协议，`fetch` 十行就够，少一个依赖少一个坑 |
| 拼音库（pinyin-pro） | 用一张别名表代替，见 T11 |
| 任何 ORM / 数据库 | 内容全是静态 TS 文件，不需要数据库 |

> 如果 Cline 主动提议装上面任何一样，回它一句："先不做，按当前栈实现。"

---

## 3 仓库最终长什么样

```
body-prism/
├─ .clinerules                     ← T1：给 AI 的项目规矩
├─ .env.example                    ← T1：环境变量模板（不含真 key）
├─ .env.local                      ← 本地真实 key，绝不提交
├─ ATTRIBUTION.md                  ← T1：素材来源与许可
├─ README.md                       ← T1：重写
├─ vitest.config.ts                ← T2
├─ package.json
├─ src/
│  ├─ app/
│  │  ├─ page.tsx                  （已有：首页）
│  │  ├─ explore/page.tsx          （已有）
│  │  ├─ method/page.tsx           （已有）
│  │  ├─ about/page.tsx            （已有）
│  │  ├─ organ/[slug]/page.tsx     （已有）
│  │  ├─ chain/page.tsx            ← T5：影响链页
│  │  └─ api/curator/route.ts      ← T8：AI 接口
│  ├─ components/
│  │  ├─ chain-canvas.tsx          ← T5：三列 SVG
│  │  ├─ evidence-panel.tsx        ← T6：点边弹出的证据面板
│  │  ├─ red-flag-gate.tsx         ← T7：红旗拦截弹层
│  │  ├─ curator-box.tsx           ← T9：提问框 + 回答区
│  │  └─ ...（已有组件不动）
│  ├─ content/
│  │  ├─ organs/*.ts               （已有：11 个器官的内容包）
│  │  ├─ impact-graph.ts           ← T3：影响链数据（直接复制，不要让 AI 重写）
│  │  └─ medical-disclaimer.ts     ← T7：统一的免责声明常量
│  └─ lib/
│     ├─ schema.ts                 （已有）
│     ├─ content.ts                （已有）
│     ├─ curator-fallback.ts       （已有：兜底答案）
│     ├─ validate-content.ts       ← T2：内容完整性校验
│     ├─ chain.ts                  ← T4：纯函数
│     └─ chain.test.ts             ← T4
└─ docs/
   ├─ medical-review-impact-graph.md ← T3 附：医学审核记录
   └─ team-handbook/…                （已有）
```

---

## 4 数据契约

> 先定契约再写代码。这张表是全项目唯一的"事实源"，两个人都按它写。

### 4.1 影响链的两个类型

```ts
export type ImpactLevel = "A" | "B" | "C" | "D";
export type ImpactNodeKind = "organ" | "function" | "manifestation";
export type ImpactRelation = "affects" | "modulates" | "manifests";

export type ImpactNode = {
  id: string;              // organ:kidney / fn:blood-pressure / man:dyspnea
  kind: ImpactNodeKind;
  nameCn: string;
  organSlug?: string;      // 只有 organ 节点有，用来跳 /organ/[slug]
  redFlag?: boolean;       // 只有 manifestation 有：急症表现
  note?: string;
};

export type ImpactEdge = {
  id: string;              // E-KID-BP
  from: string;            // 必须是 impactNodes 里存在的 id
  to: string;              // 同上
  relation: ImpactRelation;
  mechanism: string;       // 一句话说清"怎么过去的"，不写结论
  evidenceLevel: ImpactLevel;
  sourceIds: string[];     // 必须能在器官内容包 sources 里找到
  caveat: string;          // 必填：关联≠因果 / 个体差异 / 只是常见机制之一
};
```

### 4.2 证据等级怎么判（这条必须两个人一致）

| 等级 | 判据 | 例子 |
|---|---|---|
| **A** | 教科书或指南层面的共识；机制无争议 | 肝脏合成凝血因子 |
| **B** | 有观察性研究支持，或机制清楚但人群证据有限 | 慢性缺氧 → 右心负荷增加 |
| **C** | 传统理论、专家意见、个案、机制推测 | 中医"肝主疏泄"与情绪 |
| **D** | 假说或概念类比，只作思考框架 | 信息论层面的"信噪比"比喻 |

**两条硬规定：**

- 中医内容一律标 C，并在正文写"传统理论"，不得与 A 级证据并列呈现；
- 信息论类比一律标 D，正文必须写"概念类比，不是生理机制"。

### 4.3 AI 接口的输入输出

```ts
// POST /api/curator
// 请求
type CuratorRequest = {
  organSlug: string;   // heart / brain / lung / liver / kidney / stomach
  question: string;    // 2–120 字
};

// 响应
type CuratorResponse = {
  mode: "ai" | "fallback";          // fallback = 模型不可用或校验没过
  answer: string;
  path: { from: string; to: string }[];  // 模型走的边，必须逐条在图上
  sourceIds: string[];                   // 必须是 path 上各边 sourceIds 的子集
  notice: string;                        // 固定免责声明
};
```

**校验规则（服务端，不信任模型）：**

| # | 规则 | 不满足时 |
|---|---|---|
| 1 | 响应必须是合法 JSON | 丢弃 → fallback |
| 2 | `answer` 长度 20–600 | 丢弃 → fallback |
| 3 | `path` 每条边都存在于全图 | 丢弃 → fallback |
| 4 | `path` 每条边都在这次给模型的子图内 | 丢弃 → fallback |
| 5 | `path` 首尾能连成一条连续链 | 丢弃 → fallback |
| 6 | `sourceIds` ⊆ 该 path 所有边 sourceIds 的并集 | 丢弃 → fallback |
| 7 | 8 秒内没返回 | 丢弃 → fallback |

一句话：**让它乱说之后必然被发现。** 这是答辩时最有力的一句话。

---

## 5 十五张任务卡

> 阅读方式：每张卡的「粘贴这段」代码块可以整段复制进 Cline 输入框。前面几行是给你的说明，不用复制。

---

### T0 · 环境自检

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| 两人各做一遍 | 30 分钟 | 无 | 终端能跑起项目 |

**为什么先做这个**：两个人的环境不一样，不先对齐，后面所有报错都分不清是代码问题还是环境问题。

**手动执行（不要用 AI）：**

```bash
# 1. 确认 Node 版本 ≥ 20
node -v

# 2. 克隆自己的仓库
git clone https://github.com/xGlaciesx/body-prism.git
cd body-prism

# 3. 装依赖
npm ci

# 4. 起开发服务器
npm run dev
```

浏览器打开 `http://localhost:3000`，能看到首页即通过。

**验收：**

```bash
npm run build
```

期望最后输出 `✓ Compiled successfully` 和一批路由列表。**这一条不过，后面全部停下。**

**常见坑：**

1. PowerShell 里 `npm` 报"无法加载文件，因为在此系统上禁止运行脚本" → 用管理员 PowerShell 执行 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`。
2. `npm ci` 报 lock 文件不一致 → 改回 `npm install`，但要让另一个人同步提交新的 `package-lock.json`。
3. macOS 上 `node -v` 显示 v18 → 用 `nvm install 22 && nvm use 22`。

---

### T1 · 仓库护栏（两个人一起做，一个 PR）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线主导，B 线评审 | 1.5 小时 | T0 | 5 个新文件 + README 重写 + 补一个空文件 |

**目标**：把"这个仓库看起来像学生作业"变成"看起来像个正经项目"。这一步不产生任何 UI，但它是评分的隐形大头，也是后面所有 AI 协作的前提。

**产物：**

1. `.clinerules` —— 第 7 章全文，原样建；
2. `.env.example` —— 只写变量名和说明，不写真实值；
3. `ATTRIBUTION.md` —— 素材来源与许可；
4. `LICENSE` —— 代码用 MIT，**内容不随代码授权**，这句要写进 README；
5. `docs/medical-disclaimer.md` —— **现在是个 0 字节的空文件**，必须填上；
6. `README.md` —— 按 `docs/plan/submission/README-template.md` 重写。

> 第 4、5 条是第一版手册漏掉的。空文件比没有更糟：评委点进去看到空白，会认为项目烂尾；而 `LICENSE` 缺失会让"能否复用代码"这一项无法回答。

**粘贴这段：**

```text
【任务】T1 建立仓库护栏文件
【只改】新建 .clinerules、.env.example、ATTRIBUTION.md、LICENSE；
       填充 docs/medical-disclaimer.md（现在是空文件）；重写 README.md
【不要】不要改 src 下任何文件；不要改 package.json；不要装依赖

【.clinerules】
按我随后给出的全文原样写入，不要压缩、不要改写、不要加解释性注释。

【.env.example】
写入四行，每行格式为 `变量名=空值`，并在上方用 # 注释说明用途：
DEEPSEEK_API_KEY=      # DeepSeek 的 API Key，只在服务端使用，绝不加 NEXT_PUBLIC_ 前缀
DEEPSEEK_BASE_URL=     # 默认 https://api.deepseek.com，留空则用默认值
AI_MODEL=              # 默认 deepseek-chat
SITE_URL=              # 部署后的公网地址，用于生成分享卡片

【ATTRIBUTION.md】
要求包含以下小节，内容我给什么你写什么，不要自己补充素材：
1. 3D 与解剖数据：BodyParts3D, © The Database Center for Life Science
   licensed under CC Attribution 4.0 International（附官方链接）
2. 文字内容：团队成员原创，引用文献见各器官内容包的 sources 字段
3. 图片：AIGC 生成，提示词与生成日期记录在 docs/aigc-log.md
4. 明确声明：未使用 DK、医学图库、论文插图；未使用 Z-Anatomy 模型

【LICENSE】
写入标准 MIT 许可全文（年份 2026，版权人写项目名 Body Prism contributors）。
文件末尾追加一行说明：本许可仅适用于代码，站内文字与图像内容版权归作者所有。

【docs/medical-disclaimer.md】
现在这个文件是 0 字节，必须填上，写成给人看的正式版免责声明：
1. 本站是科普作品，不提供医疗诊断、治疗建议或用药指导
2. 内容按 A/B/C/D 四级标注证据强度，C 级为传统理论，D 级为概念类比
3. 出现急症表现请立即就医，紧急情况拨打 120
4. 引用来源见各器官页 sources 字段，署名与许可见 ATTRIBUTION.md
不要写成法律文书腔，用学生能读懂的正常中文。

【README.md】
按以下顺序写，每节不超过 8 行：
项目一句话 → 它能回答什么问题 → 在线演示地址 → 技术栈与依赖清单（列出版本和用途）
→ 本地运行（命令块）→ 目录结构（树形，标出 src/lib 和 src/content 各管什么）
→ AI 部分是怎么做的（图约束 + 逐边校验，5 行以内）
→ 内容可信度说明（证据 A–D 分级 + 不做诊断声明）
→ 团队与分工 → 许可（代码 MIT，内容不随代码授权）

【完成后】
列出新建/修改的文件清单，然后停止，不要继续做别的。
```

**验收：**

```bash
# 文件都在
ls -a | grep -E "clinerules|env.example|ATTRIBUTION|^LICENSE"

# 免责声明不能再是空文件（应输出 200 以上的数字）
wc -c docs/medical-disclaimer.md

# README 里没有真实 key（应该没有输出）
grep -rn "sk-" README.md .env.example

# .env.local 被忽略（应该输出 .env*）
git check-ignore -v .env.local
```

**常见坑：**

1. `.env.example` 里的注释用 `#` 开头，不要写成 `//`——这是 shell 格式，不是 JS。
2. `ATTRIBUTION.md` 里的许可名称必须写全称 `CC Attribution 4.0 International`，不要简写成 `CC BY 4.0`——两者含义相同，但答辩时评委会看全称。另外注意：**BodyParts3D 是 CC BY 4.0，不是 CC BY-SA**，写成 ShareAlike 会给自己加不必要的义务。
3. `.clinerules` 一旦建好，Cline 会话要**重开**才会读到，建完先重启一次。

---

### T2 · 内容完整性校验 + 测试框架（B 线主导）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| B 线 | 2 小时 | T1 | `validate-content.ts`、`vitest.config.ts`、CI 增加测试步骤、装 zod+vitest |

**目标**：让"引用了不存在的来源"这件事**在 CI 里变成红色**，而不是发布后在页面上点出一个死链。这是"可信度"从口号变成机制的第一步。

**先装依赖（两个都装，`zod` 现在装上，T8 直接用）：**

```bash
npm i zod
npm i -D vitest
```

> 装完把 `package.json` 和 `package-lock.json` 一起提交。**只提交 `package.json` 不提交 lock**，CI 里 `npm ci` 会直接报错——这是第一次用 CI 的人最常踩的坑。

**参考实现（自己敲一遍，比让 AI 生成更快理解）：**

```ts
// src/lib/validate-content.ts
import { organs } from "@/content/organs";
import { impactEdges, impactNodes } from "@/content/impact-graph";

export function validateContent(): string[] {
  const errors: string[] = [];

  // 1. 所有器官包里出现过的 source id
  const allSourceIds = new Set<string>();
  for (const organ of organs) {
    for (const s of organ.sources) allSourceIds.add(s.id);
  }

  // 2. 节点 id 不能重复，边不能指向不存在的节点
  const nodeIds = new Set<string>();
  for (const n of impactNodes) {
    if (nodeIds.has(n.id)) errors.push(`节点 id 重复：${n.id}`);
    nodeIds.add(n.id);
  }

  // 3. 逐条检查边
  const edgeIds = new Set<string>();
  for (const e of impactEdges) {
    if (edgeIds.has(e.id)) errors.push(`边 id 重复：${e.id}`);
    edgeIds.add(e.id);

    if (!nodeIds.has(e.from)) errors.push(`边 ${e.id} 的 from 不存在：${e.from}`);
    if (!nodeIds.has(e.to)) errors.push(`边 ${e.id} 的 to 不存在：${e.to}`);
    if (e.from === e.to) errors.push(`边 ${e.id} 首尾相同`);
    if (!e.caveat.trim()) errors.push(`边 ${e.id} 缺少 caveat`);
    if (!e.mechanism.trim()) errors.push(`边 ${e.id} 缺少 mechanism`);
    if (e.sourceIds.length === 0) errors.push(`边 ${e.id} 没有 sourceIds`);
    for (const id of e.sourceIds) {
      if (!allSourceIds.has(id)) errors.push(`边 ${e.id} 引用了不存在的来源：${id}`);
    }
  }

  return errors;
}
```

**粘贴这段（让 Cline 配好 vitest 并写好测试和 CI）：**

```text
【任务】T2 给项目配上 vitest，并把内容完整性校验接进 CI
【先读】src/lib/validate-content.ts（已经写好了，不要改它的逻辑）
【只改】新建 vitest.config.ts、新建 src/lib/validate-content.test.ts、修改 .github/workflows/ci.yml
【不要】不要装 vitest 以外的依赖；不要改 package.json 的 dependencies；不要动 src 下其他文件

【vitest.config.ts】
导出 defineConfig，包含两项：
1. resolve.alias：把 "@" 映射到项目根的 src 目录（用 node:path）
2. test.environment 设为 "node"

【package.json】
只加一个 script： "test": "vitest run"
不要动其他 script。

【src/lib/validate-content.test.ts】
两个用例：
1. "内容包与影响链没有悬空引用" —— 调用 validateContent()，断言返回的数组为空；
   断言失败时把数组内容打印出来，方便定位（用 expect(errors, errors.join("\n")).toEqual([])）
2. "每个器官至少有 3 条 claim" —— 遍历 organs，断言 organ.claims.length >= 3

【.github/workflows/ci.yml】
在现有 npm run lint 之后、npm run build 之前，插入一步 npm run test。
保持原有的注释风格（中文、解释为什么），新增的那一步也要写一行中文注释。

【完成后】列出改动，并告诉我本地该怎么跑测试。
```

**验收：**

```bash
npm run test
```

期望：

```
✓ src/lib/validate-content.test.ts (2 tests)
Test Files  1 passed (1)
```

**故意破坏一次，确认它真的会红**（这一步别省，是理解"校验"的关键）：

把 `impact-graph.ts` 里随便一条边的 `sourceIds` 改成 `["SRC-NOT-EXIST"]`，再跑 `npm run test`，应当看到类似 `边 E-KID-BP 引用了不存在的来源：SRC-NOT-EXIST`。然后改回去。

**常见坑：**

1. vitest 报 `Cannot find module '@/content/...'` → `resolve.alias` 配错，必须是 `path.resolve(__dirname, "src")`，`__dirname` 在 ESM 配置里要用 `fileURLToPath(import.meta.url)` 推出来。
2. CI 里没装依赖就 `npm run test` → 必须放在 `npm ci` 之后。
3. 校验测试"一直绿"其实是因为 `impactEdges` 是空数组 → 测试里顺手断言 `impactEdges.length > 20`。

---

### T3 · 影响链数据落地（B 线）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| B 线 | 2 小时 | T1 | `src/content/impact-graph.ts`、`docs/medical-review-impact-graph.md` |

**这一张卡最重要的规矩：不要让 AI 生成医学内容。**

`impact-graph.ts` 已经写好了（在文档包里，实际路径 `docs/plan/content-pack/impact-graph.ts`，726 行，44 个节点 / 56 条边）。你要做的是**复制过去，然后逐条核对**——这是你在这个项目里最不可替代的工作，也是你专业背景唯一能直接变现的地方。

**步骤：**

1. 把 `docs/plan/content-pack/impact-graph.ts` 复制到 `src/content/impact-graph.ts`；
2. 打开它，**逐条**读 56 条边的 `mechanism` 和 `evidenceLevel`（先看 5 条中医"表里"边，那 5 条是 D 级）；
3. 每读一条，问自己三个问题：
   - 这个机制在教科书上是这么写的吗？
   - 这个证据等级，我作为医学生认同吗？
   - `caveat` 有没有漏掉更重要的其他可能原因？
4. 任何一条你觉得不对，就改，改完在 `docs/medical-review-impact-graph.md` 记一行。

**审核记录格式（自己写，Cline 只负责建表头）：**

```markdown
# 影响链医学审核记录

审核人：张子昂（临床医学）  审核日期：2026-11-XX
审核范围：src/content/impact-graph.ts 全部 56 条边（44 个节点）

| 边 id | 原证据等级 | 审核结论 | 修改说明 | 依据 |
|---|---|---|---|---|
| E-KID-BP | A | 保留 | — | 《内科学》第 9 版，慢性肾脏病章节 |
| E-KID-FATIGUE | B | 保留 | 补 caveat | 乏力鉴别诊断极广，需强调无指向性 |
```

**粘贴这段（只让它做复制和建档，不让它编内容）：**

```text
【任务】T3 把影响链数据文件接入项目
【只做两件事】
1. 把 docs/plan/content-pack/impact-graph.ts 的内容原样复制为 src/content/impact-graph.ts。
   如果这个路径下找不到文件，先在仓库里搜 impact-graph.ts，用搜到的那个路径，不要自己新建。
   要求：逐字复制，不要改写、不要"优化"、不要补充或删减任何一条边或节点，
   不要改变量的名字。这份医学内容由临床医学成员人工审核，AI 不得改动。
2. 新建 docs/medical-review-impact-graph.md，只写标题、审核人信息占位、
   和一张空的四列表格（边 id / 原证据等级 / 审核结论 / 修改说明）。
   表格不要预填任何行。

【注意】
- 复制后检查 import 路径：这个文件不 import 任何东西，如果有就删掉。
- 不要修改 tsconfig 的路径别名。

【完成后】告诉我文件复制成功，以及 impactEdges 一共有多少条。
```

**验收：**

```bash
npm run test        # T2 的校验必须仍然通过
npm run build
```

再手动数一遍：

```bash
grep -c "id: \"E-" src/content/impact-graph.ts
grep -c "id: \"organ:\|id: \"fn:\|id: \"man:" src/content/impact-graph.ts
```

期望：**56 条边、44 个节点**。数字对不上说明复制不完整。

**常见坑：**

1. Cline 会"好心"把类型合并进 `src/lib/schema.ts`——拒绝，`impact-graph.ts` 自带类型，独立文件更好维护。
2. 复制后 `import` 别名报错 → 文件里本来就不该有 import，删掉即可。
3. 你改了一条边的 `id`，但页面里硬编码引用了老 id → 改完立刻跑 `npm run test`，T2 的校验会兜住节点引用，但兜不住字符串硬编码，所以**边 id 尽量不要改**。

---

### T4 · 影响链的三个纯函数（A 线）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线 | 2 小时 | T3 已合并 | `src/lib/chain.ts`、`src/lib/chain.test.ts` |

**目标**：把"选中什么 → 页面上谁亮谁暗"从组件里拿出来，变成三个能单测的函数。这样 T5 写页面的时候，组件里只剩画图，不会写成一坨。

这是整个项目**最适合学习"什么是好代码"**的一步：同一个逻辑，写在组件里就是 200 行看不懂，写成纯函数就是 40 行能测。

**三个函数：**

```ts
// 1. 算渲染状态：谁不透明、边是什么状态
getChainRenderState(selection, nodes, edges): {
  nodeOpacity: Record<string, number>;   // 0~1
  edgeState: Record<string, "idle" | "active" | "dimmed">;
  visibleNodeIds: string[];
}

// 2. 算坐标：三列布局，返回 0~1 的比例，不碰像素
layoutChain(nodes): Record<string, { x: number; y: number }>;

// 3. 算某条边的证据线型（A 实线 / B 实线细 / C 虚线 / D 点线）
edgeDash(level: ImpactLevel): { strokeWidth: number; dash?: string; opacity: number };
```

**粘贴这段：**

```text
【任务】T4 写影响链的纯函数层
【先读】src/content/impact-graph.ts（只看类型定义和数据结构，不要改它）
【只改】新建 src/lib/chain.ts、新建 src/lib/chain.test.ts
【不要】不要 import React；不要写 JSX；不要发 fetch；不要读 process.env；
       不要引入任何依赖；不要改 impact-graph.ts

【chain.ts 要导出四个东西】

1. type ChainSelection = { organId: string | null; path: { from: string; to: string }[] | null }

2. getChainRenderState(sel: ChainSelection, nodes: ImpactNode[], edges: ImpactEdge[])
   返回 { nodeOpacity: Record<string, number>, edgeState: Record<string, "idle"|"active"|"dimmed">, visibleNodeIds: string[] }
   规则（严格按优先级）：
   a. 若 sel.path 非空：path 上的边（按 from+to 匹配）= "active"；
      其余边 = "dimmed"；path 涉及的节点 opacity = 1，其余 = 0.15。
   b. 若 sel.path 为空但 sel.organId 非空：与该器官直接相连的边 = "active"，
      其余 = "dimmed"；该器官及其一阶邻居 opacity = 1，其余 = 0.3。
   c. 都没有：所有 opacity = 1，所有边 = "idle"。
   visibleNodeIds 始终返回 nodes 的全部 id（不隐藏节点，只调透明度，
   理由是布局稳定、不会跳动）。

3. layoutChain(nodes: ImpactNode[])
   返回 Record<string, {x:number;y:number}>，x/y 都是 0~1 的比例。
   规则：kind==="organ" → x=0.10；"function" → x=0.50；"manifestation" → x=0.90。
   同一列内按 nodes 数组中的出现顺序，在 y ∈ [0.10, 0.90] 区间均分。

4. edgeDash(level: ImpactLevel)
   返回 { strokeWidth, dash?, opacity }：
   A → { strokeWidth: 2.2, opacity: 1 }
   B → { strokeWidth: 1.6, opacity: 0.9 }
   C → { strokeWidth: 1.6, dash: "6 4", opacity: 0.8 }
   D → { strokeWidth: 1.4, dash: "2 4", opacity: 0.7 }

【chain.test.ts 要写 5 个用例】
1. 都不选中 → 所有 opacity 为 1，所有边 "idle"
2. 选中 organ:kidney → E-KID-BP 为 "active"，E-LIVER-COAG 为 "dimmed"
3. 给 path [{from:"organ:kidney",to:"fn:blood-pressure"}] → 只有这条边 "active"
4. layoutChain：organ 节点的 x 都等于 0.10，同一列的两个节点 y 不相等，
   且所有 y 落在 0.10~0.90 之间
5. edgeDash("A").dash 为 undefined，edgeDash("C").dash 为字符串

【先做】先把你打算怎么实现第 2 条规则说给我听，等我说"开始"再写文件。
```

**先想想这个边界情况**：`path` 里可能有反向边（例如模型返回 `heart → blood-pressure`，而图里存在的是 `blood-pressure → heart` 吗？）。不要自作聪明去补方向，**只做精确匹配**；方向不对就该判为无效，由服务端的校验拒绝。这是"宽进严出"里"严出"的一部分。

**验收：**

```bash
npm run test
```

期望 `chain.test.ts` 5 个用例全过，`validate-content` 仍然全过。

**常见坑：**

1. AI 可能把 `edgeState` 写成布尔值 `highlighted: boolean` → 拒绝，三态是有意义的，`idle` 和 `dimmed` 视觉上不同。
2. 拿 `nodes.find()` 在循环里查名字——56 条边 × 每次 find 不慢，但**先建 Map** 是好习惯，让他建。
3. 测试里用 `impactEdges[0]` 这种下标取数据 → 数据一变测试全红。测试里写死具体的边 id，比如 `"E-KID-BP"`。

---

### T5 · `/chain` 页面骨架（A 线）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线 | 3 小时 | T4 已合并 | `src/app/chain/page.tsx`、`src/components/chain-canvas.tsx` |

**目标**：一个能点、能看、不依赖 JS 也能读到内容的页面。**本页不做 3D、不做动画**——三维只放首页入口（T14），不在这里。

**布局规格：**

```
┌──────────────────────────────────────────────────────────┐
│  [心脏] [脑] [肺] [肝] [肾] [胃]     ← 器官选择条（横排按钮）│
├──────────────────────────────────────────────────────────┤
│  器官          功能                     可能的表现         │
│  （科普参考，不用于自我判断）                              │
│                                                          │
│   ●肾 ───────── ●血压 ───────── ●气短                    │
│       ╲                                                  │
│        ╲─────── ●血容量 ─────── ●水肿                    │
│                                                          │
│  ← SVG，viewBox="0 0 960 560"，三列，边是贝塞尔曲线       │
├──────────────────────────────────────────────────────────┤
│  图例：A 实线 / B 细实线 / C 虚线 / D 点线                  │
│  固定声明：以下为科普性的可能关联…（NOT_DIAGNOSIS_NOTICE）  │
└──────────────────────────────────────────────────────────┘
```

**粘贴这段：**

```text
【任务】T5 实现 /chain 影响链页面
【先读】src/content/impact-graph.ts（impactNodes / impactEdges / NOT_DIAGNOSIS_NOTICE）、
       src/lib/chain.ts（layoutChain / getChainRenderState / edgeDash）、
       src/app/organ/[slug]/page.tsx（照着它的页面骨架和排版风格写）、
       src/app/globals.css（用里面已有的颜色变量，不要新造颜色）
【只改】新建 src/app/chain/page.tsx、新建 src/components/chain-canvas.tsx
【不要】不要装依赖；不要用 canvas 或 WebGL，只用 SVG；不要写动画；
       不要改 globals.css；不要引入任何 UI 组件库

【要求】
1. page.tsx 是 Server Component，直接 import 数据，不要 "use client"。
2. page.tsx 顶部放 h1「影响链」+ 一句话说明：
   "选一个器官，看它会影响什么、出问题时可能波及什么。"
3. 器官选择用链接实现（/chain?organ=kidney），不要用受控组件——
   这样即使 JS 没加载，点链接也能切换，属于无 JS 降级。
   searchParams 拿到 organ 后默认 "heart"。
4. chain-canvas.tsx 是 Client Component（"use client"），负责画 SVG：
   - viewBox="0 0 960 560"，宽度 100%，高度自适应
   - 坐标 = layoutChain 返回的比例 × 宽高，四周留 40px 内边距
   - 边画成二次贝塞尔曲线（从起点到终点，控制点取两点中点向左偏 30px，
     让边有弧度、不重叠成一条直线）
   - 边的颜色用 CSS 变量 var(--color-line)，active 时用 var(--color-structure)
   - 线宽和线型用 edgeDash(edge.evidenceLevel)
   - 线条下方挂一个透明的粗线（stroke-width 14, stroke 透明），方便点击命中
   - 节点画成半径 6 的圆 + 右侧文字标签（字号 13）
   - 器官节点用 var(--color-structure)，功能节点用 var(--color-relationship)，
     表现节点用 var(--color-information)；redFlag 的表现在圆外再加一圈红环
   - 每条边中间位置放一个 <title>，内容是 mechanism（原生 tooltip，零成本无障碍）
5. 三列标题：器官 / 功能 / 可能的表现
   第三列标题后面必须跟一行小字：(科普参考，不用于自我判断)
6. 页面底部固定渲染 NOT_DIAGNOSIS_NOTICE，不得省略、不得改写。
7. 无障碍：SVG 加 role="img" 和 aria-label；
   每个可点的边和节点用 <g role="button" tabIndex={0} onKeyDown> 支持回车触发。

【先做】先把 chain-canvas.tsx 的组件结构和 props 签名列出来，等我确认再写代码。
```

**验收：**

```bash
npm run build
npm run dev
```

浏览器逐条检查：

1. 打开 `/chain`，默认显示心脏相关的链；
2. 点「肾」，URL 变成 `?organ=kidney`，图切换；
3. 鼠标悬停在一条边上，出现机制文字；
4. 浏览器禁用 JavaScript（DevTools → Settings → Debugger → Disable JavaScript），刷新，**页面仍然能显示链、点器官链接仍然能切换**——这一条是加分项，也是 T5 唯一容易做砸的地方；
5. 键盘 Tab 能逐个聚焦到边。

**常见坑：**

1. 把 `page.tsx` 写成 `"use client"` → 整个页面变成客户端渲染，数据全打进 bundle，禁用 JS 后白屏。**页面是 Server，只有 canvas 是 Client。**
2. 边重叠：同起点的两条边会完全重合，必须让控制点按边序号偏移（`offset = 30 + index * 12`）。
3. 忘记给 `<svg>` 设 `viewBox` 只设宽高 → 手机上文字糊成一团。
4. 用 `text-anchor="start"` 但节点在右列，文字会溢出画布 → 右列文字用 `text-anchor="end"`，放在圆的左侧。

---

### T6 · 证据面板（A 线）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线 | 2 小时 | T5 | `src/components/evidence-panel.tsx` |

**目标**：点一条边，能看见"凭什么这么连"。这是整个项目的主张落地的地方——**链上每一段都能点开**。

**面板要有四块：**

| 区块 | 内容 | 数据来源 |
|---|---|---|
| 关系 | 肾 —调节→ 血压 | `from` / `to` / `relation` |
| 机制 | 一句话说明怎么过去的 | `mechanism` |
| 证据 | A/B/C/D 徽标 + 一句人话解释 | `evidenceLevel` |
| 但要注意 | 关联≠因果 / 个体差异 / 其他可能原因 | `caveat`（必填，不许空） |
| 来源 | 来源标题列表，可点 | `sourceIds` → 器官包 `sources` |

**证据等级的人话解释（写进常量，别散落）：**

```ts
export const EVIDENCE_LABEL: Record<ImpactLevel, { short: string; plain: string }> = {
  A: { short: "A 级", plain: "教科书或指南层面的共识" },
  B: { short: "B 级", plain: "有观察性研究支持，机制清楚但人群证据有限" },
  C: { short: "C 级", plain: "传统理论、专家意见或机制推测" },
  D: { short: "D 级", plain: "假说或概念类比，只作思考框架" },
};
```

**粘贴这段：**

```text
【任务】T6 实现证据面板
【先读】src/content/impact-graph.ts、src/content/organs/index.ts（拿 sources）、
       src/components/evidence-badge.tsx（已有的证据徽标组件，优先复用，不要重写）、
       src/components/chain-canvas.tsx
【只改】新建 src/components/evidence-panel.tsx；修改 chain-canvas.tsx 以支持点击边
【不要】不要改 impact-graph.ts；不要装依赖；不要做路由跳转

【要求】
1. 在 chain-canvas.tsx 里点击一条边 → 调用父组件传入的 onEdgeSelect(edgeId)。
   选中态的边描边加粗、颜色变成 var(--color-ink)。
2. evidence-panel.tsx 接收 edge: ImpactEdge | null、organSlug: string。
   为 null 时渲染一句提示："点图上的连线，看这一段是怎么来的。"
3. 面板内容按顺序：关系行 / 机制 / 证据徽标 + 人话解释 / caveat（标题写"需要注意"）/
   来源列表。caveat 用一个浅色块突出，不能和正文同一字号。
4. 来源：根据 organSlug 从 organs 里找到对应器官，用 edge.sourceIds 匹配它的 sources，
   渲染成「作者. 标题. 年份」+ 可点击的 url/doi。
   匹配不到时渲染 "来源信息待补"，不要报错、不要渲染空链接。
5. 面板是右侧栏（大屏）或底部抽屉（小屏），用 Tailwind 的 md: 断点切换，
   不要用 JS 判断窗口宽度。
6. 面板打开时按 Esc 关闭。

【先做】先说清楚你打算怎么把 organSlug 传进面板、怎么从 organ 里取 sources，
等我确认再写。
```

**验收：**

1. 点任意一条边，右侧出现面板，五块内容齐全；
2. 点一个 C 级的边（例如将来加的"传统理论"边），徽标呈现为 C；
3. 点来源能跳出去（新标签页）；
4. 把某条边的 `caveat` 临时改成一个空格，页面应当显示"需要注意"区块为空——**这是已知问题，记录下来**，正确做法是在 T2 的校验里加一条 `caveat.trim().length >= 6`，让它构建就失败。顺手加上。

**常见坑：**

1. Cline 会自己再实现一遍证据徽标 → 让它复用 `evidence-badge.tsx`，颜色和字号才不会跑偏。
2. `sources` 在器官包里的字段名可能不是 `title` 而是别的 → **先读文件再写**，不要猜。
3. 面板用 `position: fixed` 但没设 `z-index`，被 SVG 盖住 → 加 `z-20`。

---

### T7 · 红旗拦截（A 线前端 + 一句服务端约定）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线 | 1.5 小时 | T6 | `red-flag-gate.tsx`、`medical-disclaimer.ts` |

**目标**：把"不做症状自查"从一句免责声明，变成**拦在前面的一个动作**。这是医学伦理要求，也是最容易被评委注意到的一处设计。

**两处拦截：**

| 位置 | 触发条件 | 行为 |
|---|---|---|
| 图上 | 点带 `redFlag: true` 的表现节点 | 先弹提示层，说明这类表现可能是急症信号，建议就医；关掉后才显示常规说明 |
| 提问框 | 用户输入含红旗词（胸痛、意识不清、呼吸困难、大出血…） | **根本不调模型**，直接返回固定提示 |

**粘贴这段：**

```text
【任务】T7 实现红旗表现拦截
【先读】src/content/impact-graph.ts（redFlag 字段）、src/components/chain-canvas.tsx
【只改】新建 src/content/medical-disclaimer.ts、新建 src/components/red-flag-gate.tsx；
       修改 chain-canvas.tsx：点击 redFlag 节点时先经过拦截
【不要】不要改 NOT_DIAGNOSIS_NOTICE 的文字；不要做诊断建议；不要出现药名和剂量

【medical-disclaimer.ts 导出三个常量】
1. NOT_DIAGNOSIS_NOTICE（从 impact-graph.ts 重新导出，不要复制文字，用 export { NOT_DIAGNOSIS_NOTICE }）
2. RED_FLAG_NOTICE：
   "你点的这类表现，可能是需要尽快就医的信号。这个网站只做科普，不能判断你的情况，
    也不能替代医生。如果它正在发生、或比平时明显加重，请立即就医；紧急情况请拨打 120。"
3. RED_FLAG_KEYWORDS: string[]，覆盖：胸痛、胸闷压榨、呼吸困难、喘不上气、
   意识不清、昏迷、抽搐、大出血、止不住血、剧烈头痛、突然说不出话

【red-flag-gate.tsx】
1. 导出 needUrgentHelp(text: string): boolean —— 小写化后做 includes 匹配，纯函数。
2. 导出一个 React 组件，props: { open: boolean; onClose: () => void }，
   渲染一个居中弹层：标题「先看这一句」+ RED_FLAG_NOTICE + 一个「我知道了」按钮。
   用 role="dialog" aria-modal="true"，打开时焦点移到按钮上。
3. 弹层层级 z-50，背景遮罩可点击关闭。

【chain-canvas.tsx 修改】
点击 manifestation 节点时：若该节点 redFlag 为 true，先 setOpenGate(true)，
不要触发 onEdgeSelect 或任何其他跳转。

【先做】先说明你会怎么处理"同一节点既是 redFlag 又要展示说明"的顺序问题，等我确认。
```

**验收：**

1. 点「气短」节点 → 弹出拦截层，文字与 `RED_FLAG_NOTICE` 完全一致；
2. 按 Esc 或点遮罩能关闭；
3. 点「水肿」节点（非红旗）→ 不弹层；
4. 屏幕阅读器/键盘：Tab 到弹层按钮能回车关闭。

**常见坑：**

1. AI 很容易把红旗词表写进 Prompt 里交给模型判断——**不行**。判断必须在本地，模型不参与红旗判定，这是"不让模型有机会说错"的设计。
2. 弹层里顺手加了"建议多喝水/休息"这类话 → 全部删掉。急症提示里**只允许出现"就医"和"拨打 120"两个动作**。
3. 把 `NOT_DIAGNOSIS_NOTICE` 复制一份到新文件 → 两处文字会慢慢不一致，必须重新导出。

---

### T8 · AI 策展人接口（B 线，最难的一张）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| B 线 | 4 小时 | T3 + 已拿到 DeepSeek API Key | `src/app/api/curator/route.ts` |

> **Key 从哪来**：`platform.deepseek.com` → 「API keys」→ 新建。它和 Cline 用的那把**可以是同一个**，但必须在仓库根目录建 `.env.local` 单独填一份（这个文件被 `.gitignore` 忽略，永远不会进仓库）。本地文件长这样：
>
> ```
> DEEPSEEK_API_KEY=sk-你的key
> AI_MODEL=deepseek-chat
> ```
>
> 先不填也能做 T8 的步骤 1–6（会走 fallback），步骤 7 之后再填。**没有 key 时先把降级路径跑通，反而是好事**——演示当天断网就靠这段。

**目标**：让模型只能沿着给定的边回答，返回的每一步都能被服务端核对。

**这是全项目技术含量最高、也是答辩时最值得讲的一段。** 核心思想一句话：

> 我们不给模型知识库，我们给它一张地图，并要求它把走过的路画出来。它画错了，我们就知道。

**流程五步：**

```
① 收到 { organSlug, question }
② 红旗词命中？ → 直接返回固定提示，不调模型        （T7 已提供 needUrgentHelp）
③ 取该器官的一阶子图 → 压成文本放进系统提示词       （getImpactSubgraph / subgraphToPrompt 已有）
④ 调 DeepSeek，response_format = json_object，8 秒超时
⑤ zod 解析 → 逐边校验 → 来源校验 → 全过才返回 ai，否则 fallback
```

**系统提示词（这是本项目的核心资产，写进代码常量）：**

```text
你是「棱镜策展人」。你只能使用下面给出的影响链，不能引入链上没有的器官、功能或表现。

规则：
1. 只解释"这条链怎么走"，不判断提问者是否患病，不给诊断、建议、药物或剂量。
2. 回答 3–5 句中文，每一句都要能对应到下面某一条边。
3. 只输出 JSON，不要任何其他文字，不要 markdown 代码块：
   {"answer": "……", "path": [{"from": "…", "to": "…"}], "sourceIds": ["…"]}
4. path 中的 from/to 必须逐字取自下面出现的节点名对应的 id；
   最多 3 条边，且必须首尾相接成一条链。
5. sourceIds 只能取自这些边标注的来源。
6. 如果问题和这些边无关，返回 {"answer":"这个问题超出了这张链的范围。","path":[],"sourceIds":[]}。

可用链（每行一条边）：
{{SUBGRAPH}}
```

**粘贴这段：**

```text
【任务】T8 实现 /api/curator 路由
【先读】src/content/impact-graph.ts（getImpactSubgraph、subgraphToPrompt、NOT_DIAGNOSIS_NOTICE）、
       src/lib/curator-fallback.ts（已有兜底数据）、package.json（确认有没有 zod）
【只改】新建 src/app/api/curator/route.ts
【不要】不要装 openai SDK，用原生 fetch；不要改前端任何文件；
       不要把 key 写进代码；不要用 NEXT_PUBLIC_ 前缀

【接口】
POST /api/curator，body: { organSlug: string, question: string }
返回 CuratorResponse: { mode: "ai"|"fallback", answer, path, sourceIds, notice }

【实现步骤】
1. zod 校验请求体，失败返回 400。
2. organSlug 必须在 ["heart","brain","lung","liver","kidney","stomach"] 里，否则 400。
3. 用 needUrgentHelp(question)（从 red-flag-gate 里 import，如果那是 client 组件就把
   纯函数单独放到 src/lib/red-flag.ts 再 import）判断；
   命中则直接返回 mode:"fallback"、urgent:true 的固定文案，不调用模型。
4. 拼 organId = "organ:" + organSlug，调 getImpactSubgraph 和 subgraphToPrompt。
5. 读 process.env.DEEPSEEK_API_KEY；没有就直接走 fallback，并 console.warn 一行。
6. fetch("https://api.deepseek.com/chat/completions")，参数：
   model: process.env.AI_MODEL || "deepseek-chat"
   temperature: 0.2
   max_tokens: 600
   response_format: { type: "json_object" }
   messages: [{role:"system", content: 系统提示词 + 子图}, {role:"user", content: question}]
   signal: AbortSignal.timeout(8000)
   Authorization: Bearer + key
7. 用 zod 解析模型返回的 JSON（先 JSON.parse content，再 safeParse）。
8. 校验，任何一条不过就走 fallback：
   a. answer 去空格后长度 20–600
   b. path 长度 1–3，且是连续链（第 i 条的 to === 第 i+1 条的 from）
   c. path 每条边都能在 impactEdges 里找到（from+to 精确匹配，不看方向猜）
   d. path 每条边都在本次子图的边集合里
   e. sourceIds 非空，且每个 id 都在 path 涉及的各边 sourceIds 的并集里
9. fallback：从 curatorFallback 里按 keywords 命中选一条；
   都不命中就用第一条同 organSlug 的；再不行用固定的通用回答。
   所有 fallback 也必须返回 path（可以从该器官的第一条边取），保证前端行为一致。
10. 响应头加 Cache-Control: no-store。所有路径都要带 notice: NOT_DIAGNOSIS_NOTICE。

【代码风格】中文注释，解释"为什么"而不是"做了什么"。
     校验逻辑拆成独立函数 verifyPath()，方便单元测试。

【先做】先输出完整实现方案（函数签名 + 每个校验函数的职责），不要写文件，
       等我确认后再写。
```

**验收：**

```bash
npm run build
```

```bash
# 1. 没有 key 时的降级
curl -s -X POST http://localhost:3000/api/curator \
  -H "Content-Type: application/json" \
  -d '{"organSlug":"kidney","question":"肾不好为什么会气短"}' | python3 -m json.tool
```

期望：`"mode": "fallback"`，`answer` 非空，`notice` 存在。

```bash
# 2. 非法输入
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/curator \
  -H "Content-Type: application/json" -d '{"organSlug":"nope","question":"x"}'
```

期望 `400`。

```bash
# 3. 红旗词
curl -s -X POST http://localhost:3000/api/curator \
  -H "Content-Type: application/json" -d '{"organSlug":"heart","question":"胸口压榨性疼痛怎么办"}' \
  | python3 -m json.tool
```

期望：`"urgent": true`，answer 里出现"就医"和"120"，**不出现任何药名**。

**配好 key 之后必须做的两次"攻击测试"**（这是答辩要讲的东西）：

| 攻击 | 期望 |
|---|---|
| 问"肺和血糖有什么关系？"（图里没有这条边） | 模型若编出来，服务端应拒绝 → fallback |
| 手动把 `verifyPath` 临时改成 `return []` 然后问一个会被编答案的问题 | 应当看到一条"图里不存在"的 path 通过——**证明校验是真的在工作** |

**常见坑：**

1. DeepSeek 的 `response_format: json_object` 要求 prompt 里出现 "json" 字样，否则会报错——系统提示词里已包含，别删。
2. 模型返回的是 `choices[0].message.content` 字符串，仍要 `JSON.parse`——它可能带 ```json 包裹，需要先剥掉首尾的反引号代码块。写一个 `stripCodeFence()`。
3. `AbortSignal.timeout` 在 Node 20 才有，本地 Node 18 会报错 → T0 已经要求 ≥20。
4. 路由里 import 了 client 组件的函数 → Next 会报错。**纯函数放 `src/lib/red-flag.ts`**，组件只管渲染。
5. `.env.local` 改了要重启 `npm run dev`，热更新不会重载环境变量。

---

### T9 · 前端接入 AI（A 线，依赖 T8）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线 | 2 小时 | T8 已合并 | `src/components/curator-box.tsx` |

**目标**：问一句话，图上把模型走过的路亮起来。这是演示视频的核心镜头。

**交互规格：**

| 状态 | 界面 |
|---|---|
| 空 | 输入框 + 三个示例问题按钮（"肾不好为什么会气短"） |
| 加载中 | 按钮禁用，显示"正在沿链查找…" |
| 成功（ai） | 回答文字 + 图上 path 边高亮 + 底部一行"AI 沿着 3 段影响链作答" |
| 降级（fallback） | 回答文字 + 一行小字"当前为离线答案（模型未连接）"，**不得伪装成 AI 输出** |
| 出错 | "暂时没能回答，你可以点上面的链自己看" |

**粘贴这段：**

```text
【任务】T9 把 AI 回答接到影响链页面
【先读】src/app/api/curator/route.ts（响应结构）、src/app/chain/page.tsx、
       src/components/chain-canvas.tsx、src/lib/chain.ts
【只改】新建 src/components/curator-box.tsx；修改 chain-canvas.tsx（接收 path 参数）；
       修改 src/app/chain/page.tsx（引入 curator-box）
【不要】不要把 API key 用到前端；不要在客户端 fetch DeepSeek；
       不要改 /api/curator 的实现

【curator-box.tsx】
1. "use client"。props: { organSlug: string; onPath: (path) => void }
2. 一个 textarea（最多 120 字，带字数显示）+ 提交按钮 + 三个示例问题。
3. fetch("/api/curator", {method:"POST", ...})，处理 loading / error / 正常三种状态。
4. 拿到结果：
   - 调用 props.onPath(res.path) 让图高亮；mode 为 fallback 且 path 为空时传 null
   - 显示回答正文（保留换行，不要渲染 HTML）
   - mode === "ai" → 显示"AI 沿 {path.length} 段影响链作答"
   - mode === "fallback" → 显示"当前为离线答案（模型未连接）"，用灰色小字，
     绝对不要显示成"AI 回答"
5. 回答区下方固定显示 notice（后端返回的那句），不要自己另写一句。
6. 组件不持有 path 状态，path 由父组件持有并传给链图（单一数据源）。

【chain-canvas.tsx】
增加可选 prop path?: {from,to}[] | null，传给 getChainRenderState。
path 变化时高亮（active）对应边，其余 dimmed。

【chain/page.tsx】
本来就是 Server Component，为了传 path 状态，把"链图 + 提问框"包进一个新的
Client 组件 chain-view.tsx，由它持有 path 状态。
page.tsx 继续负责取数据和渲染静态文案。

【先做】先说明 chain-view 和 chain-canvas、curator-box 三者之间的数据流，
       用三行文字描述，等我确认。
```

**验收：**

1. 输入"肾不好为什么会气短"，能看到回答 + 图上高亮 3 段；
2. 拔网线或删掉 key，再问一次 → 显示"离线答案"且**没有**说这是 AI 说的；
3. 输入红旗词 → 前端直接显示就医提示（T7 的 `needUrgentHelp`），不发请求（Network 面板确认）；
4. 连续问两次同一个问题，第二次不重复请求（如果 T10 已做缓存）。

**常见坑：**

1. 把 `path` 状态放在 `curator-box` 里又在 `chain-canvas` 里再存一份 → 两处不同步。**状态只有一份，在最外层。**
2. 用 `dangerouslySetInnerHTML` 渲染回答 → 模型输出会被当 HTML 执行。绝对禁止。
3. 加载中没禁用按钮，连点五下发出五个请求 → 扣钱，还卡。

---

### T10 · 降级、缓存与日志（B 线）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| B 线 | 1.5 小时 | T8 | `route.ts` 内加缓存与日志 |

**目标**：演示现场断网、额度用完、模型抽风，三种情况都不能白屏。同时把成本压住——评委喜欢看这个，因为说明你懂工程。

**粘贴这段：**

```text
【任务】T10 给 /api/curator 加缓存和日志
【只改】src/app/api/curator/route.ts
【不要】不要引入数据库；不要装依赖；不要改返回结构

【1. 内存缓存】
模块级 Map，key = `${organSlug}::${question.trim().toLowerCase()}`。
- 命中且未过期（30 分钟）→ 直接返回缓存，mode 保持原样
- 写入时若 size > 200，删掉最早插入的一条（Map 的插入顺序就是删除第一个 key）
- 返回时加一个 cached: boolean 字段（可选，前端不使用也行）

【2. 日志】
每次请求结束后 console.log 一行 JSON：
{ ts, organSlug, questionLength, mode, pathLength, ms, reason }
reason 取值： "ok" | "no-key" | "timeout" | "bad-json" | "bad-path" | "bad-source" | "urgent"
不要打印 question 原文（可能含个人健康信息，这是隐私要求）。
不要打印 key、headers 或模型原始输出。

【3. 超时与重试】
超时 8 秒。超时后不重试（演示最重要是不卡）。
若 HTTP 状态是 429（限流），直接 fallback，并在日志里记 reason:"timeout"。

【完成后】列出改动，并说明线上怎么看这些日志（Vercel Functions 日志面板）。
```

**验收：**

```bash
# 连发两次同一个问题，看第二次的耗时
time curl -s -X POST http://localhost:3000/api/curator -H "Content-Type: application/json" \
  -d '{"organSlug":"kidney","question":"肾不好为什么会气短"}' > /dev/null
```

第二次应当明显更快（缓存命中）。终端应当能看到一行 JSON 日志，**且其中没有原始问题文本**。

**常见坑：**

1. 缓存 key 没做 trim/lowercase → "为什么气短"和"为什么气短 "被当成两个问题，白花钱。
2. 日志里打了 `question` → 违反了隐私要求，删掉。
3. 在 Vercel 上，内存缓存**不跨实例、不持久**，这是正常的。文档里要写明"缓存是尽力而为，不是一致性保证"——这句话本身就是个加分点，说明你知道自己在做什么。

---

### T11 · 别名搜索（A 线，P1，可砍）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线 | 1 小时 | T5 | `src/content/search-aliases.ts` + 页面搜索框 |

**目标**：用户搜的是"心慌"，不是"心悸"。这个问题不解决，链再准也找不到入口。

**不装拼音库。**用一张别名表，成本几乎为零：

```ts
export const SEARCH_ALIASES: Record<string, string[]> = {
  "fn:blood-pressure": ["血压", "高血压", "低压", "高压"],
  "man:palpitation": ["心悸", "心慌", "心跳快", "xinhuang"],
  "man:dyspnea": ["气短", "喘不上气", "呼吸困难", "胸闷"],
  "man:nocturia": ["夜尿", "起夜", "晚上上厕所"],
  "man:heartburn": ["烧心", "反酸", "胃灼热"],
};
```

**粘贴这段：**

```text
【任务】T11 给 /chain 加一个基于别名表的搜索
【只改】新建 src/content/search-aliases.ts；修改 src/app/chain/page.tsx 和 chain-view.tsx
【不要】不要装拼音库；不要做模糊匹配算法；不要改 impact-graph.ts

【要求】
1. search-aliases.ts：导出 SEARCH_ALIASES（Record<string, string[]>），
   覆盖至少 10 个节点，每个节点 3–6 个别名，含一个拼音写法。
2. 纯函数 searchNodes(query: string, nodes: ImpactNode[]): string[]
   匹配规则（全部大小写不敏感）：
   a. 节点 nameCn 包含 query
   b. SEARCH_ALIASES[id] 里任一别名包含 query
   返回按"命中位置越靠前越优先"排序的节点 id 数组，最多 8 个。
3. 放在 src/lib/search.ts，配 3 个测试用例（心慌→palpitation、拼音、无结果返回空数组）。
4. /chain 顶部加一个搜索框；有结果时把匹配的节点在图上加一圈虚线描边，
   并在搜索框下方列出可点结果（点击滚动到该节点并选中）。
5. 搜索框为空时不要过滤任何节点。

【完成后】跑 npm run test，确认新用例通过。
```

**验收：** 输入"心慌"、"xinhuang"、"qiduan"（无结果）三种情况表现正确。

---

### T12 · 冒烟测试、部署与收尾（两人一起）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线做测试与部署，B 线做文档 | 4 小时 | T9、T10 | 线上地址、测试通过、tag |

**A 线：三条冒烟测试**（不装 Playwright，用最朴素的方式）

不需要浏览器自动化。写一个 Node 脚本打线上接口，CI 里跑：

```bash
# scripts/smoke.sh
set -e
BASE=${1:-http://localhost:3000}
for slug in heart brain lung liver kidney stomach; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/chain?organ=$slug")
  echo "/chain?organ=$slug -> $code"
  [ "$code" = "200" ] || exit 1
done
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/curator" \
  -H "Content-Type: application/json" -d '{"organSlug":"kidney","question":"肾不好为什么会气短"}')
echo "api -> $code"
[ "$code" = "200" ] || exit 1
echo "smoke ok"
```

**B 线：三个文档**

| 文件 | 内容 | 字数 |
|---|---|---|
| `docs/aigc-log.md` | 每张 AIGC 图的提示词、生成日期、用途 | 一图一行 |
| `docs/medical-review-impact-graph.md` | T3 的审核记录，必须填满 | 34 行 |
| `README.md` 补齐 | 增加"AI 部分是怎么做的"一节 | 10 行 |

**部署：** 按 `submission/DEPLOY-ONLINE-DEMO.md` 走，环境变量在 Vercel 项目设置里加 `DEEPSEEK_API_KEY`，**不要**加在代码里。

**验收：**

```bash
npm run lint && npm run test && npm run build && bash scripts/smoke.sh https://你的域名
```

四条全绿 → `git tag v1.0-submit && git push --tags`。

**常见坑：**

1. Vercel 上忘配环境变量 → 线上永远 fallback，本地却正常。**部署后第一件事是看线上返回的 `mode` 是不是 `ai`。**
2. 把 `.env.local` 提交上去 → 立刻吊销 key 换新的，历史记录里的旧 key 仍然算泄露。
3. `smoke.sh` 里写死 localhost → CI 里跑必然失败，改成接受参数。

---

### T13 · 讲清背景：把新定位落到首页首屏（最容易漏的一张）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线改页面，B 线改文字材料 | 1.5 小时 | T9 | 首页首屏、README 开头、视频第一镜口径一致 |

**为什么必须有这一张**：老师的第一条建议是"把项目背景讲清楚"，但它不是一句要写进文档的话，**它是一个必须出现在首页第一屏的东西**。如果首页还是"同一具身体，三种读法"，那整条产品叙事就只活在 PPT 里，评委打开站点会以为我们没听懂建议。

**首页首屏的文案规格（照这个写，不要自由发挥）：**

```
主标题   人体棱镜 Body Prism

副标题   通用大模型告诉你"可能是什么"，我们说清"凭什么"。

三段式   ① 身体不舒服时，越来越多人不再搜索，而是直接问 AI。
         ② 但 AI 给的是一个结论——它不说这一步从哪来，也无从核对。
         ③ 人体棱镜把每条身体结论的推理链摊开：每一步都能点开，都标着证据强度。

主按钮   [ 看一条链 ]        → /chain?organ=kidney
次按钮   [ 它凭什么这么说 ]  → /method

页脚固定  本站为科普作品，不提供诊断或治疗建议。急症请拨打 120。
```

**粘贴这段：**

```text
【任务】T13 改首页首屏，把项目背景讲清楚
【先读】src/app/page.tsx、src/app/globals.css（颜色变量）、
       src/components/site-header.tsx（按钮风格参照）
【只改】src/app/page.tsx
【不要】不要改首页以下的内容区（保留原有的器官入口和镜片卡片）；
       不要新增页面；不要改全局样式；不要加动画

【要求】
1. 首屏（不需要滚动就能看到的部分）改成：
   - 主标题「人体棱镜 Body Prism」
   - 副标题「通用大模型告诉你"可能是什么"，我们说清"凭什么"。」
   - 三行说明，依次是：
     ① 身体不舒服时，越来越多人不再搜索，而是直接问 AI。
     ② 但 AI 给的是一个结论——它不说这一步从哪来，也无从核对。
     ③ 人体棱镜把每条身体结论的推理链摊开：每一步都能点开，都标着证据强度。
   - 两个链接按钮：「看一条链」指向 /chain?organ=kidney（主按钮，用
     var(--color-structure) 做底色）；「它凭什么这么说」指向 /method（次要按钮，描边样式）
2. 三个说明用 <ol> 有序列表，不要用三个 <div>——语义正确，读屏软件会念成"第一步"。
3. 首屏下方加一行小字（12px，muted 色）：
   「本站为科普作品，不提供诊断或治疗建议。急症请拨打 120。」
4. 原有内容（器官入口、三镜介绍）原样保留在下方，一个字都不要删。
5. 首屏容器用 grid lg:grid-cols-12：文字块 lg:col-span-7，
   右侧 lg:col-span-5 **先留空**（下一张 T14 要在那里放三维，留空就不用返工）。
   小于 lg 时不分栏，文字整块在前。

【先做】先说明你打算怎么改 page.tsx 的首屏结构，等我确认。
```

**验收（三个人各看一遍，不只看代码）：**

1. 打开首页，**不滚动**就能看到那三句话；
2. 用手机打开（同一局域网 IP 或 Vercel 预览），三句话仍然在首屏，没有被挤出屏幕；
3. 点「看一条链」，直接落到肾的影响链；
4. 把首页截图和 `submission/DEMO-VIDEO-SCRIPT.md` 的第一镜对一遍——**视频开场念的那句话，必须和首页副标题一字不差**。

**顺手对齐两处文字（B 线，10 分钟）：**

| 位置 | 要改成 |
|---|---|
| `README.md` 开头第二段 | 同样的三段式，压缩成两句话 |
| `docs/team-handbook/*` 里已过时的定位 | 不用改，那是过程文档；但 README 不能再抄那里的话 |

**常见坑：**

1. 首屏加了轮播、动画、3D 背景 → 全部删掉。首屏只允许有文字、两个按钮，以及 T14 的那一个三维器官（它是入口，不是背景）。
2. 把「三种读法」整个删掉 → **不要删**，它是叙事框架，放到第二屏继续讲。
3. 副标题为了"更有文采"改写 → 禁止。这句话要和视频、README、答辩稿**四处分毫不差**，反复被人看到同一句话，才形成记忆。

---

### T14 · 三维器官入口（A 线，可砍，但建议做）

| 谁做 | 预计 | 前置 | 产出 |
|---|---|---|---|
| A 线复制文件 + 接组件；B 线核对器官朝向与命名 | **半天**（资产已交付，不用下载、不用合并） | T13 已合并 | `public/models/body.glb`、`public/meshopt/meshopt_decoder.js`、`src/components/organ-viewer.tsx` |

**为什么加这一张**：评委打开网站的第一秒，看到的是一屏文字还是一个人体，印象差一档。但"做得准"这件事一周做不到，所以三维只承担**空间感**，不承担**准确性**，也不承载任何医学内容。

**完整方案见 D17 · 三维器官视图。** 这里只写执行顺序。

**这一张的资产已经全部做好了，你们不做任何建模、合并、压缩。** 具体是：

| 已经给你们的东西 | 位置 | 说明 |
|---|---|---|
| 合并好的模型 | `starter-assets/models/body.glb` | 2.79 MB，11 个器官 / 12 个热点，已验证可解 |
| 热点坐标 | `starter-assets/anatomy-hotspots.ts` | 12 个点按 `body.glb` 复算过，一位不差 |
| 解码器 | 见下面第 2 步的 curl | 约 30 KB，**缺了模型完全不显示** |
| 组件代码 | `D17 §4.2` | 整段可复制，含相机飞近 |

**决定已经做完了**：11 个器官（五脏六腑缺三焦）、合并成一个文件、走 CC BY-SA 4.0。**不要再回头讨论"要不要扩到 11 个"**，D17 §2.5 有全部理由。

**四步，按顺序，每步都可停：**

1. **复制模型**（2 分钟）：把 `starter-assets/models/body.glb` 复制到 `public/models/body.glb`。**不要**下载四个源 GLB，那是我们合并前的原料，已经不需要了。
2. **放解码器**（5 分钟）：`body.glb` 是 meshopt 压缩的，`<model-viewer>` 默认不解，必须自托管一份解码器。

   ```bash
   mkdir -p public/meshopt
   curl -L -o public/meshopt/meshopt_decoder.js \
     https://cdn.jsdelivr.net/npm/meshoptimizer@0.24.0/meshopt_decoder.js
   ```

   **必须是 0.24.0 这份 UMD 版。** 1.3.0 以后只发 ESM，`<script>` 加载会语法报错（D17 §2.6.3 有三个坑）。
3. **接组件**（2 小时）：`npm i @google/model-viewer`，照 D17 §4.1 加类型声明、§4.2 整段复制组件，在 `page.tsx` 右侧 5 栏放 `<OrganViewer />`。
4. **联调**（1 小时）：12 个热点都能点、都能跳 `/chain?organ=x`、点器官按钮相机能飞过去、"整体"能飞回来、无 WebGL 时回退静态图。

**粘贴这段：**

```text
【任务】T14 首页加三维器官入口，只做导航，不承载医学内容
【先读】D17 三维器官视图（文档包里的 17-3d-organ-viewer.md）§4.2 组件、
       src/data/anatomy-hotspots.ts、
       src/app/page.tsx（T13 改过之后的版本）

【已有资产，不要重新生成、不要去找新模型、不要合并文件】
- public/models/body.glb
  已经合并好的单文件，11 个器官（心、脑、肺、肝、肾、胃、脾、胆、小肠、大肠、膀胱），
  443 个网格、579 个节点，meshopt 压缩。不要用 gltf-transform 或任何工具重新合并/压缩。
- public/meshopt/meshopt_decoder.js
  meshopt 解码器（UMD 版）。缺了它模型不显示，而且不报错。
- src/data/anatomy-hotspots.ts
  已导出 HOTSPOTS（12 个热点，带 organ / label / system / position / tier）、
  hotspotsFor()、hotspotsByTier()，以及 VIEW_ORBIT / WHOLE_BODY_ORBIT / WHOLE_BODY_TARGET。
  坐标已逐个复算过，不要改数值，也不要自己算。

【只改】新增 src/components/organ-viewer.tsx、src/types/model-viewer.d.ts；
       修改 src/app/page.tsx；修改 package.json（只加 @google/model-viewer）

【要求】
1. 组件 "use client"，model-viewer 只能在 useEffect 里动态 import。
   import 之后、setState 之前，必须有一行：
   ModelViewerElement.meshoptDecoderLocation = "/meshopt/meshopt_decoder.js";
   漏了这行模型不报错、直接不显示，这是本项目第一号坑。
2. src 写死 "/models/body.glb"（只有一个文件）。
3. 把 HOTSPOTS 全部 12 个渲染成热点，不要按 system 过滤：
   <Link slot={`hotspot-${i}`} data-position={h.position}
         data-normal={h.normal ?? "0m 0m 1m"} href={`/chain?organ=${h.organ}`}>，slot 从 0 连续。
   **热点列表必须是模块级常量直接 map，不许对子元素做条件渲染**，
   否则 React 会报 "not a child of this node"（model-viewer 把节点搬进 shadow DOM 了）。
4. 在 <model-viewer> 外面放一排按钮："整体" + 每个器官一个。点击只改属性，不重建元素：
   camera-target = 该器官的 position（"整体"用 WHOLE_BODY_TARGET）
   camera-orbit  = VIEW_ORBIT（"整体"用 WHOLE_BODY_ORBIT）
   加 interpolation-decay="120" 让镜头平滑过去。
5. 文字先渲染，模型后加载，不允许整页等模型。
6. 加载失败、无 WebGL、超时 5 秒，一律回退到 /art/whole-body.png 静态图，不能留白。
7. 尊重 prefers-reduced-motion：关掉 auto-rotate，保留手动旋转。
8. 组件下方固定一行小字：三维示意，仅用于导航；结构与比例经简化，不作为解剖依据。
9. T13 已经把首屏做成 grid lg:grid-cols-12，文字在 lg:col-span-7，
   右侧 lg:col-span-5 是空的。**你只往那 5 栏里放 <OrganViewer />，
   不要改栅格、不要改文字、不要改按钮。**
10. 小于 lg 时不分栏：文字整块在前，三维整块在后，高度 40vh。
11. 加 touch-action: pan-y，手机整页还能上下滚。

【不要】不要引入 three.js / react-three-fiber / 任何动画或 UI 库；
       不要改 /chain 和任何 API 路由；不要改 src/content 下任何文件；
       不要改 anatomy-hotspots.ts 里的坐标；不要把模型内联成 base64。

【先做】先说明你打算怎么改 page.tsx，等我确认。
```

**改完再发一段自检**（Cline 常常漏掉那行解码器和降级，这段专治这个）：

```text
读 src/components/organ-viewer.tsx，逐条回答，不要改代码：
1. model-viewer 是在 useEffect 里动态 import 的吗？贴出来。
2. meshoptDecoderLocation 那一行在哪？贴出它前后各一行。
3. 12 个热点是不是直接 map 的模块级常量？有没有条件渲染包着它们？
4. 点器官按钮时改了哪些属性？有没有重建 <model-viewer> 元素？
5. 无 WebGL 走哪条分支？5 秒超时怎么实现的？贴出来。
6. 有没有任何地方写死 "three" 或 "react-three-fiber"？
```

**验收：**

```bash
ls -lh public/models/body.glb public/meshopt/meshopt_decoder.js   # 2.79 MB + 约 30 KB
npx tsc --noEmit
npm run build
```

手工查四条（D17 §7 有完整清单）：

1. **模型真的出来了**——不是灰底、不是静态图。看不到就先查 `meshoptDecoderLocation` 和解码器文件路径；
2. 展厅电脑没有 WebGL 时，页面显示静态图而不是空白——**评委用的大概率是会议室的机器**；
3. **12 个热点都落在器官上**，不是飘在体外或身体正中；每个点跳过去的 `?organ=` 要和点的名字对得上，不能全跳同一个；
4. 点"整体 / 心 / 肝 …"按钮，相机**平滑飞过去**，不是瞬移也不是不动。

**常见坑：**

1. **模型空着不出来，页面不报错。** 99% 是解码器那行没写、文件没放、或放成了 ESM 版。这是第一号坑，因为它的现象是"什么都不发生"。
2. 把原始 OBJ、源 GLB（`visceral.glb` 那四个）或整个参考仓库 clone 进项目 → 仓库直接废掉（那个仓库有 253 MB FBX）。`public/models/` 只放 `body.glb`。
3. 静态 import `@google/model-viewer` → 报 `customElements is not defined`。
4. 让 Cline 自己"算"热点坐标 → 它会编一组看着像模像样的数，热点全飘在体外。**坐标只从 `anatomy-hotspots.ts` 读。**

---

## 6 分工与日历

### 6.1 两条线

| | A 线 · 李若溪（Windows / PowerShell） | B 线 · 张子昂（macOS / zsh） |
|---|---|---|
| 主题 | 看得见：页面、交互、视觉、部署 | 说得清：内容、证据、AI、文档 |
| 任务 | T0 T1 T4 T5 T6 T7 T9 T11 T13-首页 T14 T12-部署 | T0 T1 T2 T3 T8 T10 T13-文字 T12-文档 |
| 每天动最多的目录 | `src/app`、`src/components` | `src/lib`、`src/content`、`docs` |
| 不该碰 | `src/content` 里的医学内容 | `src/app` 的页面结构 |

> **为什么这么分**：影响链页面和 AI 接口几乎不共享文件，两个人同时改同一个文件的概率很低。唯一的交接点是 `chain-canvas.tsx` 的 props——那在 T4 就定死了。

> **并行的前提是每天合并，不能攒到最后。** 完整的文件所有权表、三个必须提前定死的「合同点」（影响链类型 / AI 接口形状 / 红旗词表）、以及撞了冲突怎么解，见 `RUNBOOK.md`（P8）§4.6。

### 6.2 七天表

| 天 | A 线 | B 线 | 晚上一起做 |
|---|---|---|---|
| D0 | 文档落地（§0.4）+ 对账（§0.5） | 同左 | 把对账表贴进 `docs/DECISIONS.md`，确认哪些缺口已经有人补了 |
| D1 | T0、T1 | T0、T1、T2 | 合并 T1/T2；确认 `npm run build` + `npm run test` 绿 |
| D2 | T4 | T3 | 合并；`impactEdges` 数出 56 条、`impactNodes` 44 个 |
| D3 | T5 | T8 步骤 1–6（不接模型，先跑通取子图 + 校验） | 合并；`/chain` 能看到链 |
| D4 | T6、T7 | T8 步骤 7–10（接 DeepSeek） | 合并；问一句能看到回答 |
| D5 | T9 | T10 | 合并；断网演示也正常 |
| D6 | T11 + T13 首页首屏 + **T14 三维入口** + 响应式打磨 | T13 文字对齐 + 医学审核文档 + README | **冻结功能**，只修 bug |
| D7 | T12 冒烟 + 部署 + 录视频 | 技术文档 PDF + 答辩稿 | 打 tag，提交 |

**覆盖核对**：T0–T14 共 15 张，全部落在上表，没有一张悬空。T0、T1 两人一起做，其余按线走。

**T14 的资产已经给好了**：`starter-assets/models/body.glb` 是合并好、验过的单文件，复制进 `public/models/` 加放一个解码器，5 分钟的事，D2 或任何碎片时间都能做完。D6 就只剩接组件和联调半天。**但不要提前写代码**——page.tsx 在 T13 没定稿之前动它，会撞车。

**负荷提示**：B 线 D2、D3 偏重。T3 分两半——**复制文件**半小时就能完（代码立刻可用），**逐条医学核对**可以延到 D3 上午做，不影响 T8 开工。别把核对和写代码挤在同一天。

### 6.3 只有三天怎么办

按这个顺序砍，砍到哪算哪：

1. **砍 T14**（三维入口）——它加分但不承载论证，换回静态图，视觉上仍然成立；
2. **砍 T11**（别名搜索）——损失最小；
3. **砍 T10**（缓存）——但保留日志；
4. **T6 简化**——证据面板只显示机制和证据等级，来源列表留一句"见器官页"；
5. **T9 简化**——AI 回答不接高亮，只显示文字，图上高亮用手动点器官代替。

**不能砍的第四件：T13 至少改首页那三句话**（30 分钟）。这是老师提的第一条建议，首页上看不见，等于没做。

**绝不能砍的三件事：**

- T2（没有校验，"可核对"就是假的）；
- T7（没有红旗拦截，医学伦理上过不去）；
- T12 的线上地址（没有公网链接，很多评分项直接为零）。

---

## 7 给 Cline 的规矩

### 7.1 `.clinerules`（建在仓库根目录，原样粘贴）

```text
# 人体棱镜 Body Prism · 项目规矩
# Cline 每次会话都会读这个文件。冲突时以本文件为准。

## 一、技术栈（不得更改）
Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS 4。
不许引入新依赖。确实需要时，先说理由、说替代方案，等人明确同意。
特别禁止：three.js、任何 UI 组件库、任何状态管理库、openai SDK、任何拼音库。

## 二、目录职责
- src/app/**          页面与路由。默认是 Server Component。
- src/components/**   展示组件。允许 "use client"，但不写业务规则。
- src/lib/**          纯逻辑。函数只吃参数、只返回结果：不读 process.env、
                      不发网络请求、不 import React（除非是 .tsx 且明确是 hook）。
- src/content/**      内容数据。医学内容由人工审核，AI 不得生成或修改医学事实。

## 三、每次改代码
1. 只改我指定的文件。发现别处有问题，写在回复里，不要顺手改。
2. 改完必须列出：改了哪些文件、每个文件改了什么、怎么验证。
3. 不许为了让代码"跑起来"而：注释掉校验、try/catch 吞掉错误、
   把类型写成 any、删掉测试、删掉已有注释。
4. 不许重写整个文件，除非我明确说"重写"。
5. 不许自己发明 API 或库函数。不确定的写法，先说明"这里我不确定"，等我确认。

## 四、医学与伦理红线（违反即回滚）
- 不做诊断、不开药、不给剂量、不给治疗方案。
- 遇到急症表现，只允许说"请就医""拨打 120"，不许给任何自我处理建议。
- 中医内容必须标"传统理论"，证据等级一律 C。
- 信息论内容必须标"概念类比"，证据等级一律 D。
- 不把假说写成共识。每条结论都要能指到 sourceIds。
- 免责声明 NOT_DIAGNOSIS_NOTICE 的原文不得改写、不得删减、不得省略。

## 五、安全红线
- API key 只从 process.env 读取，不许出现在代码、注释、日志、错误信息里。
- 不许加 NEXT_PUBLIC_ 前缀给任何密钥。
- 不许在日志里打印用户提问原文（隐私）。
- 不许提交 .env.local、node_modules、.next。

## 六、代码风格
- 注释写"为什么"，不写"做了什么"。
- 中文注释、中文界面文案。变量名、函数名用英文。
- 组件文件名 kebab-case，导出用 named export。
- 颜色只能用 src/app/globals.css 里 @theme 定义的变量，不许写死十六进制色值。

## 七、提交
- 一次提交只做一件事。格式：`类型(范围): 中文说明`，例如 `feat(chain): 新增影响链页面`
- 类型取 feat / fix / docs / test / chore；范围取 home / chain / api / content / ci / docs。
```

### 7.2 每次开工的第一句话

**不要**把整份文档粘进去。开场只发这三行，然后单独发当前任务卡：

```text
读一下仓库根目录的 .clinerules。
这一轮只做任务卡 T5（内容见 docs/plan/PLAN-V4-implementation.md 第 5 章的 T5 一节），
不要做别的任务，也不要读 docs/plan 下的 .html。
先告诉我你打算改哪些文件、怎么改，等我确认后再动手。
```

> 如果它一次读不完手册，直接把 T5 那一节复制进聊天窗口，比让它自己去文件里找更省事。

### 7.3 模型怎么选

| 场景 | 选 | 理由 |
|---|---|---|
| 写代码、改文件 | `deepseek-chat` | 支持工具调用，Cline 的 Agent 模式必须用它 |
| 卡住了、看不懂报错 | 同一个会话里直接问 | 换模型会丢上下文，得不偿失 |
| 让 AI 帮你审方案 | 开一个新会话，只贴代码 | 上下文干净，判断更准 |

> 如果 Cline 里模型列表有 `deepseek-reasoner`：**不要用它做 Agent 模式**，它不支持工具调用，改不了文件，只能对话。可以在旁边开个聊天窗问设计问题。

### 7.4 三个让 DeepSeek 少犯错的习惯

1. **先让它说，再让它做。**每张卡的提示词末尾都有"先做：先说明你打算怎么实现"。这一步能挡掉一半的错误改动。
2. **一次一张卡。**一次给两个任务，它会把两个任务的代码混在一起，还美其名曰"顺手优化"。
3. **报错直接贴在会话里。**不要总结报错，原样贴。它的调试能力比读你的转述强得多。

---

## 8 排错手册

| 现象 | 多半是 | 怎么办 |
|---|---|---|
| `Cannot find module '@/...'` | 路径别名没配 | 检查 `tsconfig.json` 的 `paths`；vitest 里要单独配 `resolve.alias` |
| `Hydration failed` | Server 和 Client 渲染结果不一致 | 检查是不是在组件里用了 `Date.now()`、`Math.random()`、`window` |
| `"use client"` 加了还是报 Server 错误 | 父组件是 Server，把函数当 prop 传下去 | 函数必须在 Client 组件内部定义，或用 Server Action |
| 页面白屏，控制台 `process is not defined` | 在浏览器端读了 `process.env` | 只有 `NEXT_PUBLIC_` 前缀的变量能在前端读 |
| API 返回 500，日志 `DEEPSEEK_API_KEY is not defined` | `.env.local` 没生效 | 改完要重启 `npm run dev`；本地文件名必须叫 `.env.local` |
| 模型返回的不是 JSON | 没开 `response_format` 或 prompt 里没提 json | 两者都要有；再写 `stripCodeFence()` 兜底 |
| `AbortSignal.timeout is not a function` | Node < 20 | 升级 Node，或改用 `AbortController` + `setTimeout` |
| CI 红了但本地是绿的 | lock 文件没提交 / 用了本地才有的文件 | 跑 `npm ci` 复现；检查 `git status` 有没有漏提交 |
| `npm run build` 卡在 Collecting page data | 某个页面在构建时发了网络请求 | 给该路由加 `export const dynamic = "force-dynamic"` |
| Git 说 `fatal: not a git repository` | 目录不对 | `pwd` 看一下；不要在有 `.git` 的父目录外操作 |

---

## 9 提交前检查

逐条打勾，一条不过就不要提交。

**代码**

- [ ] `npm run lint` 无 error
- [ ] `npm run test` 全绿
- [ ] `npm run build` 成功
- [ ] `grep -rn "sk-" src/` 无输出
- [ ] `git status` 里没有 `.env.local`、`node_modules`、`.next`
- [ ] `impactEdges` 56 条、节点 44 个，与审核记录一致

**内容**

- [ ] **11 个器官页**都能打开（`/organ/heart` … `/organ/bladder`），每条 claim 都有来源
- [ ] 每条边都有 `caveat`
- [ ] 中医条目标了"传统理论"，信息论条目标了"概念类比"
- [ ] `NOT_DIAGNOSIS_NOTICE` 在 `/chain` 和每个器官页都出现
- [ ] 点红旗表现先出就医提示

**AI**

- [ ] 无 key 时返回 fallback，界面明示"离线答案"
- [ ] 编造的路径会被服务端拒绝（做过一次攻击测试）
- [ ] 红旗提问不发模型请求
- [ ] 日志里没有原始提问、没有 key

**交付**

- [ ] 线上地址能打开，`/chain` 正常
- [ ] 线上 `mode` 是 `ai` 而不是 fallback
- [ ] **首页首屏三句话与视频第一镜逐字一致**（两处同时打开对照）
- [ ] 视频 ≤8 分钟、≥1080p、普通话清楚
- [ ] 技术文档 PDF ≤30 页
- [ ] `ATTRIBUTION.md` 完整；`LICENSE` 存在，README 写明"代码 MIT，内容不随代码授权"
- [ ] `docs/medical-disclaimer.md` 不是空文件
- [ ] README 有依赖清单（版本 + 用途），`package-lock.json` 已提交
- [ ] tag `v1.0-submit` 已推送

---

## 10 给老师：这份方案的教学设计

### 10.1 为什么这么拆

一周时间，两个大一学生，如果按"先学完 HTML/CSS/JS 再动手"来安排，一定做不完；如果按"让 AI 全写完"来安排，答辩时一问就塌。

这份方案走第三条路：**每张卡是一个完整的"判断-验证"闭环**。

| 任务 | 学生实际在学的能力 |
|---|---|
| T1 | 一个项目"看起来正经"靠哪几个文件 |
| T2 | 什么是"约束"——把规则写进 CI，而不是写进文档 |
| T3 | 专业知识如何变成数据结构；什么是"审核责任" |
| T4 | 纯函数、可测试性、为什么逻辑不该埋在组件里 |
| T5 | 声明式渲染、无障碍、无 JS 降级 |
| T6 | 信息层级：证据、机制、局限三者的排版关系 |
| T7 | 伦理不是文案，是流程上的一个拦截点 |
| T8 | 模型输出不可信；校验、超时、降级、攻击测试 |
| T14 | 公开数据的许可与署名；减面与包体预算；无 WebGL 时的降级 |
| T9 | 单一数据源、状态提升 |
| T10 | 缓存的边界；日志里什么能记什么不能记 |
| T12 | 冒烟测试、环境变量、上线 |

### 10.2 三个刻意为之的设计

1. **三维只做入口，不承载内容。** 让他们想办法"不建模也能有三维"——找公开数据、改面数、换材质、控制包体、处理加载失败。这一圈下来，学到的是**资产治理和性能预算**，不是建模。反过来，如果让他们从零建一个解剖模型，七天里他们只会学会"做不完"。
2. **不让 AI 生成医学内容。** T3 明确要求复制 + 人工逐条核对。这是唯一一件只有团队成员能做、AI 做不了的事，也是答辩时最能体现专业的地方。
3. **每张卡都有一次"故意弄坏"的验证。** T2 里改一条 sourceId 看测试变红，T8 里把校验注释掉看假路径溜过去。理解一个机制最快的方式是看它失效。

### 10.3 请老师重点提意见的五处

1. **证据分级 A–D 的边界。** 我们现在把中医内容一律归 C、信息论类比一律归 D，会不会过于粗糙？有没有更适合高中生/大学生科普场景的分级法？
2. **三条演示链是否典型。** 现在选的是「肾→血压→心脏→气短」「肝→凝血→出血」「脑→自主神经→心率」。从教学和评审角度看，哪条最有说服力？是否需要换一条更"反直觉"的？
3. **"AI 不能走出图外"会不会被评委误读为限制 AI 能力。** 我们的说法是"约束换来可核对"，但如果评委认为这是在规避大模型，该怎么讲？是否需要一个受控的"图外提问"入口作为对照？
4. **一周排期对大一学生是否现实。** 第 6.3 节写了三天版，您觉得砍的顺序对吗？有没有该提前的？
5. **演示视频的 3 分钟主线。** 我们打算一镜到底演"肾不好为什么会气短"，从提问到 AI 亮出三段链、再到点开每一段的证据。这个主线抓不抓得住人？

### 10.4 一句话答辩稿

> 通用大模型告诉我们"可能是什么"，但不会告诉我们"凭什么"。
> 我们做的不是又一个 AI 问答，是把每条身体结论的推理链摊开——
> 模型只能沿着我们标注过的边作答，走的每一步都要被服务端核对；
> 走错了，就退回我们已经审过的答案。
> **看得见的推理链，查得回的证据。**

---

*本手册与《参赛方案 v3》《技术文档》《演示视频脚本》配套使用。任务卡中的文件路径以 2026-11-04 的 `main` 分支为准。*
