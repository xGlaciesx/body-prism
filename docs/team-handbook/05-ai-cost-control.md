# 大学生 AI 低成本开发方案（30 天 ¥0–¥300）

> 项目：人体棱镜 Body Prism——AI 驱动的身体信息三镜图谱。
> 目标：**既满足比赛的 AI 技术要求，又不让 API 账单失控。**
> 原则：**免费额度优先，付费只买“不可替代”，开发期用 Mock，演示期用缓存。**

---

## 0. 先给结论

推荐给两个大一新生的组合：

| 环节 | 推荐方案 | 30 天成本 | 备注 |
|---|---|---|---|
| 写代码 | GitHub Copilot Student（免费）+ Cline + DeepSeek | ¥50–100 | Cline 本身免费，费用来自模型 API |
| 产品主模型 | DeepSeek `deepseek-chat` | ¥50–100 | 只在真实问答时调用 |
| 复杂问题 | `deepseek-reasoner` 仅限开发期分析 | ¥0–20 | 不放进产品运行时 |
| 向量检索 | BM25 + 可选 BGE-M3 API | ¥0–20 | 6 个器官，不需要昂贵向量库 |
| 重排 | RRF 分数融合，不调用重排 API | ¥0 | 省掉一笔持续费用 |
| 向量库 | Supabase pgvector / 本地 pgvector / 内存 JSON | ¥0 | 数据量很小 |
| 图片理解 | Qwen-VL 免费额度/低价调用 | ¥0–30 | 每张图只调一次，缓存结果 |
| 语音 | 浏览器 Web Speech API | ¥0 | ASR/TTS 都免费 |
| 3D | BodyParts3D + Blender | ¥0 | CC BY 4.0，署名即可 |
| 美术 | AIGC 免费额度 + Procreate | ¥0–50 | 不买素材包 |
| 部署 | Vercel Hobby + Neon/Supabase 免费层 | ¥0 | 不买服务器 |
| 登录/后台 | Supabase Auth + RLS + Storage | ¥0 | 免费层；不买 Auth0/Clerk |
| 域名 | 可选 | ¥0–50 | 用 `vercel.app` 也能参赛 |

**30 天推荐总预算：¥150–300；硬上限：¥500。**

> 价格会变，具体单价以 DeepSeek / 硅基流动控制台账单为准。本文给的是“怎么花得少”的架构和上限，不是报价单。

---

## 1. 三条成本原则

### 1.1 免费额度先跑通

- GitHub Student Pack → Copilot Pro 免费（如果学校/账号符合）；
- Vercel Hobby、Neon/Supabase 免费层（Auth + Postgres + Storage + RLS）；
- 硅基流动新用户额度；
- 即梦/通义万相每日免费积分；
- BodyParts3D、Blender、glTF-Transform 全免费；
- 浏览器 Web Speech API 免费。

**先用免费额度把流程跑通，再决定要不要充钱。**

### 1.2 付费只买“不可替代”

值得花钱的只有三件事：

1. **写代码的 Agent**：Cline + DeepSeek，能省大量时间；
2. **产品主模型**：DeepSeek，负责展签、问答、结构化输出；
3. **可选的视觉模型**：只有做图片解释时才用。

不值得花钱的：

- GPU 服务器；
- 付费向量数据库；
- 付费 TTS/ASR；
- 付费监控平台；
- 付费 3D 模型/解剖素材；
- 付费 CMS / Auth0 / Clerk 企业版（Supabase 免费层够用）；
- 数字人、AI 视频、AI 配音；
- 为了“看起来高级”而加的多 Agent 框架。

### 1.3 开发期不调用真实 API

这是最容易被忽略的省钱点。

- 80% 的界面开发用 `AI_MOCK=1`，返回固定 JSON；
- 只有联调、评测、录 Demo 时才打开真实 API；
- 真实回答录成 fixtures，测试和演示可重放；
- 缓存命中时不再调用模型。

**不要一边改 CSS 一边让 Agent 反复调用大模型。**

---

## 2. 三档预算方案

| 档位 | 30 天成本 | 适合 | 组合 | 风险 |
|---|---|---|---|---|
| **0 元档** | ¥0–50 | 先验证想法、学校网络/支付不便 | Copilot Student + Mock + BM25 + 预生成展签 + Vercel 免费层 | 现场实时问答弱，依赖预生成内容 |
| **推荐档** | ¥150–300 | 正常参赛 | DeepSeek 开发 ¥100 + 运行 ¥100 + 免费 Embedding/美术 | 需要控制 Agent 反复读文件 |
| **稳妥档** | ¥300–400 | 想留余量、做多模态 | 推荐档 + 视觉 ¥30 + 美术 ¥50 + 域名 ¥50 | 仍低于 ¥500，但别开多 Agent |

**建议选推荐档。** 0 元档作为备份，稳妥档只在确有需要时加。

---

## 3. 成本地图：钱花在哪

| 项目 | 推荐做法 | 30 天上限 | 省钱关键 |
|---|---|---|---|
| Cline 开发 | `deepseek-chat` 为主 | ¥100 | 小任务、指定文件、别整库读 |
| 产品问答 | `deepseek-chat` | ¥100 | 限流、缓存、max tokens |
| 复杂分析 | `deepseek-reasoner` | ¥20 | 只在开发期卡住时用 |
| Embedding | BGE-M3 API 或本地模型 | ¥20 | 只嵌入查询；文档在建库时嵌入一次 |
| Rerank | RRF，不调 API | ¥0 | 省掉持续调用 |
| 向量库 | Supabase/本地 pgvector 免费层 | ¥0 | 6 个器官不需要付费向量库 |
| 视觉 | Qwen-VL | ¥30 | 1 张图、1 次调用、缓存 |
| 语音 | Web Speech API | ¥0 | 浏览器原生 |
| 3D | BodyParts3D | ¥0 | CC BY 4.0 |
| 美术 | 免费积分 + Procreate | ¥50 | 一版风格，不无限重抽 |
| 部署 | Vercel + Neon/Supabase | ¥0 | 无服务器 |
| 登录/后台 | Supabase Auth + RLS + Storage | ¥0 | 免费层，不买付费 CMS |
| 域名 | 可选 | ¥50 | 不是必需 |
| 监控 | Postgres/JSONL 自己记 | ¥0 | 不买 SaaS |

---

## 4. 模型路由：不是所有任务都用同一个模型

| 任务 | 用什么 | 参数建议 | 说明 |
|---|---|---|---|
| 意图分类 | **规则/关键词** | — | 不调用 LLM，省一次请求 |
| 检索查询改写 | 可跳过 | — | 6 个器官，原问题通常够用 |
| 生成展签 | `deepseek-chat` | `temperature 0.3`, `max_tokens 900` | 结构化 JSON |
| 回答追问 | `deepseek-chat` | `temperature 0.2`, `max_tokens 800` | 必须带 sourceIds |
| 复杂架构/报错 | `deepseek-reasoner` | 仅开发期 | 不放进产品运行时 |
| Embedding | BGE-M3 / 本地 BGE-small | 批量 | 文档只嵌入一次 |
| 图片解释 | Qwen-VL | `max_tokens 500` | 只处理上传图，不爬图 |
| TTS/ASR | Web Speech API | — | 免费，浏览器支持即可 |

**产品运行时不要用 `deepseek-reasoner`。** 它更慢、更贵，而且工具调用支持要以官方文档为准。Agent 模式优先 `deepseek-chat`。

---

## 5. 单次问答的 token 预算

把每次请求控制在：

| 部分 | 预算 |
|---|---|
| 系统提示 + 规则 | 800 tokens |
| 检索到的 4–6 个片段 | 1,600 tokens |
| 用户问题 | 200 tokens |
| 工具返回 | 800 tokens |
| 输出 JSON / 回答 | 700–900 tokens |
| **合计** | **约 4k 输入 + 800 输出** |

在代码里写死上限：

```ts
export const AI_LIMITS = {
  maxInputTokens: 6000,
  maxOutputTokens: 900,
  maxSteps: 3,
  maxToolCalls: 6,
  timeoutMs: 25_000,
};
```

一天 20 次问答、连续 30 天，大约 600 次请求、240 万输入 token、48 万输出 token。**按控制台单价代入，通常远低于 ¥100。** 真正烧钱的不是正常问答，而是：

- Agent 反复读整个仓库；
- 把大段文件粘进上下文；
- 多轮自我反思/多 Agent 互相辩论；
- 每次问答都重新嵌入整个知识库；
- 图片/语音无限次重试。

---

## 6. RAG 省钱架构：6 个器官不需要昂贵向量库

### 6.1 推荐架构

```text
content/organs/*.mdx
   ↓ 构建时切块（300–500 字）
data/chunks.json
   ↓
BM25（MiniSearch）  +  可选向量（BGE-M3）
   ↓ RRF 融合
Top 5 片段
   ↓
DeepSeek 生成回答 + sourceIds
   ↓
Zod 校验
```

### 6.2 具体选择

| 方案 | 什么时候用 | 成本 |
|---|---|---|
| **BM25 only** | 先跑通、内容少于 200 块 | ¥0 |
| **BM25 + 向量** | 关键词检索不够好 | ¥0–20 |
| **pgvector** | 需要 SQL 过滤、部署到 Supabase/Neon | ¥0（免费层） |
| **云向量数据库** | 不推荐 | 不要买 |

### 6.3 关键省钱点

- **文档只嵌入一次**：构建时生成 `data/embeddings.json`，不要每次启动重算；
- **查询 embedding 缓存**：同一个问题 7 天内不重复嵌入；
- **不调用重排 API**：BM25 分数 + 向量分数做 RRF，Top 20 → Top 5；
- **不把整篇文档塞进上下文**：只给 Top 5 片段，每段 300–500 字；
- **引用强制**：LLM 返回 `sourceIds`，Zod 校验；没有来源就回答“没有找到可靠来源”。

> 6 个器官、100–200 个 chunk，用内存 JSON + BM25 就够。等数据超过 1,000 块再考虑 pgvector 优化。

---

## 7. Agent 省钱架构：单 Agent + 固定流程

比赛要的是“Agent/workflow 能力”，不是“Agent 数量”。

```text
解析意图
  → 定位器官/系统
  → 并行取三镜内容
  → 证据检查
  → 生成 ExhibitSpec
  → 驱动 3D + 追问
```

限制：

- **1 个 Orchestrator**，不要多个 Agent 辩论；
- **最多 2 轮工具调用**；
- **最多 6 次工具调用**；
- **每次工具返回截断到 1,500 字**；
- **证据够 3 条就停止**；
- **Zod 校验失败只重试 1 次**，不要让 LLM 反复自我批评；
- **超时 25 秒**，超时返回缓存/预生成展签。

这些限制既是省钱，也是稳定性，答辩时可以直接讲。

---

## 8. 三层缓存：把重复问题变成 0 成本

### 8.1 第一层：预生成展签

6 个器官的“今日展签”在构建时生成，存成 JSON：

```text
content/generated/heart-exhibit.json
content/generated/brain-exhibit.json
...
```

首页和默认器官页直接读 JSON，不调用 LLM。

### 8.2 第二层：问题缓存

```sql
create table ai_cache (
  question_hash text primary key,
  question text not null,
  answer_json jsonb not null,
  source_ids text[] not null,
  created_at timestamptz default now(),
  expires_at timestamptz not null
);
```

- key：问题 + 器官 + 语言 的 SHA-256；
- TTL：7 天；
- 命中直接返回，不调用模型；
- 演示前把 10 个高频问题跑一遍，现场更稳。

### 8.3 第三层：Mock / Replay

最稳的做法是写进 `.env.local`，两个系统都一样：

```bash
# .env.local
AI_MOCK=1
```

然后正常启动：

```bash
npm run dev
```

如果要在命令行临时指定：

```bash
# macOS / Linux
AI_MOCK=1 npm run dev
```

```powershell
# Windows PowerShell
$env:AI_MOCK="1"; npm run dev
```

> Windows PowerShell 5.1 不支持 `AI_MOCK=1 npm run dev` 这种前置变量写法，也不支持 `&&`；照上面分开写。

- Mock：返回固定 JSON，开发 UI 用；
- Replay：读取 `fixtures/ai/*.json`，测试/演示用；
- Real：只有 `AI_ENABLE_REAL=1` 才调用真实 API。

```ts
const mode = process.env.AI_MOCK === "1"
  ? "mock"
  : process.env.AI_REPLAY === "1"
    ? "replay"
    : "real";
```

---

## 9. 开发期怎么让 Cline 少烧 token

| 做法 | 效果 |
|---|---|
| 用 Copilot Student 做行内补全 | 日常补全不花 DeepSeek 钱 |
| Cline 只做多文件修改/重构/报错 | 把付费留给难题 |
| 一次只给 1–3 个文件 | 避免整库读入 |
| 用 `@file` 指定文件，不粘贴整篇 | 减少输入 token |
| 先让 Cline 给计划，再改代码 | 避免它乱试 |
| CSS/文案/小改动用免费补全 | 不值得开 Agent |
| 不让 Cline 生成图片/长文 | 用专门工具更便宜 |
| 每周看一次 token 账单 | 发现异常调用 |

### 9.1 好任务 vs 坏任务

```text
坏：把整个项目读一遍，帮我优化。
好：只读 src/components/three/HeartViewer.tsx 和 src/app/explore/page.tsx，
    修复点击高亮不生效的问题，先给 3 步计划，不要改其他文件。
```

### 9.2 两个 Key + 预算上限

| Key | 用途 | 30 天上限 |
|---|---|---|
| `DEEPSEEK_DEV_KEY` | Cline 写代码 | ¥100 |
| `DEEPSEEK_APP_KEY` | 网站运行时 | ¥100 |

在 DeepSeek 控制台设置预算/余额提醒；不要一次充太多。

### 9.3 错峰与批量

- 如果控制台仍有错峰折扣，把批量评测、长文档生成放到优惠时段；
- 不要为了折扣熬夜；可以写好脚本，第二天早上跑；
- 把同类任务合并成一次请求，减少来回对话；
- 不要让 Agent 在后台无限重试；设置最大重试次数。

---

## 10. 运行时预算守卫

### 10.1 环境变量

```bash
AI_MOCK=0
AI_ENABLE_REAL=1
AI_PROVIDER=deepseek
DEEPSEEK_APP_KEY=sk-...
AI_MAX_INPUT_TOKENS=6000
AI_MAX_OUTPUT_TOKENS=900
AI_DAILY_BUDGET_CNY=5
AI_DAILY_REQUESTS=50
```

### 10.2 用量表

```sql
create table ai_usage (
  id bigserial primary key,
  day date not null,
  route text not null,
  input_tokens int not null,
  output_tokens int not null,
  cost_cny numeric(10,4) not null,
  cache_hit boolean default false,
  created_at timestamptz default now()
);
```

### 10.3 守卫逻辑

```ts
const budget = Number(process.env.AI_DAILY_BUDGET_CNY ?? 5);

export async function canCallAI() {
  const spent = await getTodaySpend();
  return spent < budget;
}
```

超预算时：

1. 返回缓存答案；
2. 没有缓存就返回预生成展签；
3. 页面提示“今日 AI 体验额度已用完，请查看展签”；
4. 不报错、不白屏。

### 10.4 限流

- 每个 IP/会话每天 20 次问答；
- 每分钟最多 3 次；
- 单次超时 25 秒；
- 同一问题 10 秒内只允许 1 次在途请求。

---

## 11. 视觉、语音、3D 的省钱做法

| 能力 | 花钱做法 | 省钱做法 |
|---|---|---|
| 解剖图 | 买素材包/请画师 | BodyParts3D 渲染 + AIGC 风格 + Procreate 修正 |
| 风格图 | 无限重抽 | 固定提示词，每个器官最多 4 张，选 1 张 |
| 器官插画 | 每张都手绘 | AIGC 做量，手绘只做 1–2 张签名 |
| 语音 | 云 TTS/ASR | 浏览器 Web Speech API |
| 图片理解 | 每张图多轮调用 | 缩到 1024px，1 张图 1 次，按 hash 缓存 |
| 3D | 买模型/云渲染 | BodyParts3D + Blender + glTF-Transform |
| 视频 | AI 视频/数字人 | 屏幕录制 + Procreate 延时 + 剪映 |

### 11.1 AIGC 免费额度怎么用

- 即梦/通义万相：每天免费积分，先做 6 个器官的风格测试；
- 选 1 个风格后，批量生成 6 张，不要每天换风格；
- 失败图不要删，放 `docs/art-process/rejects/`，答辩可讲迭代；
- 需要更高分辨率时，优先用 Procreate 放大/修正，不重复抽卡。

---

## 12. 部署省钱：不买服务器

推荐：

```text
Vercel Hobby（免费）
  + Neon/Supabase Postgres 免费层（pgvector）
  + 浏览器 Web Speech API
  + 静态 JSON 展签
  + 仅 AI 路由为动态函数
```

- 内容页用 SSG/ISR，不每次都跑函数；
- AI 路由单独做，设置 `maxDuration`；
- 不存个人健康数据，减少数据库和合规成本；
- 不上 GPU、不上常驻服务器；
- 国内访问慢时，先录 Demo，不急着买香港服务器。

> 比赛要求的是公开仓库、视频、PDF；在线 Demo 是加分项，不是必须项。不要为了一个链接先花几百块。

---

## 13. 30 天预算表

| 项目 | 推荐 | 硬上限 |
|---|---|---|
| DeepSeek 开发 Key | ¥100 | ¥150 |
| DeepSeek 运行 Key | ¥100 | ¥150 |
| 视觉模型 | ¥20 | ¥30 |
| Embedding | ¥10 | ¥20 |
| AIGC 美术 | ¥30 | ¥50 |
| 域名（可选） | ¥0 | ¥50 |
| 服务器 | ¥0 | ¥0 |
| 登录/后台（Supabase） | ¥0 | ¥0 |
| 向量数据库 | ¥0 | ¥0 |
| TTS/ASR | ¥0 | ¥0 |
| 监控 | ¥0 | ¥0 |
| **合计** | **¥260** | **¥450** |

留 ¥50 缓冲，总硬上限 **¥500**。

---

## 14. 成本估算公式

```text
单次成本 =
  输入 token / 1,000,000 × 输入单价
  + 输出 token / 1,000,000 × 输出单价
```

不要背价格，按控制台账单代入。建议在 `docs/cost.md` 记录：

```md
# 成本记录

## 2026-10-xx
- 调用次数：
- 输入 token：
- 输出 token：
- 当日费用：
- 缓存命中率：
- 备注：
```

每周截一次账单图，放进答辩 PDF。**“成本可控”本身就是工程能力。**

---

## 15. 比赛答辩怎么讲

不要说“我们用了很多模型”，要说：

> “我们用单 Agent + 混合检索 + 结构化输出 + 三层缓存，把单次问答控制在 4k 输入、800 输出 token；开发期用 Mock，演示期用缓存，运行时有预算守卫和降级方案。AI 是核心，但成本可控、可解释、可复现。”

这段话同时覆盖：

- Agent/workflow；
- RAG；
- AI 安全；
- 工程化；
- 实用性/商业潜力。

---

## 16. 检查清单

- [ ] GitHub Copilot Student 已领取（如果符合）
- [ ] Cline 只用于多文件/难题，日常补全用免费工具
- [ ] `DEEPSEEK_DEV_KEY` 和 `DEEPSEEK_APP_KEY` 分开
- [ ] 两个 Key 都设置了预算/余额提醒
- [ ] `AI_MOCK=1` 可用于日常开发
- [ ] 6 个器官展签已预生成 JSON
- [ ] RAG 先用 BM25，向量可选
- [ ] 不调用付费 rerank API
- [ ] 不买云向量数据库
- [ ] 语音用 Web Speech API
- [ ] 图片理解限制 1 张/次、3 次/天
- [ ] `maxInputTokens=6000`、`maxOutputTokens=900`
- [ ] `maxSteps=3`、`maxToolCalls=6`
- [ ] 有每日预算守卫和降级
- [ ] 有 `ai_usage` 用量记录
- [ ] 30 天总支出 < ¥300（硬上限 ¥500）
- [ ] 答辩 PDF 有成本表和缓存命中率

---

## 17. 一句话

> **省钱不是少做 AI，而是把 AI 放在刀刃上：该用模型的地方用模型，该用规则的地方用规则，该缓存的地方不重复调用。**
