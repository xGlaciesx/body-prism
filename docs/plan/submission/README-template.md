# 人体棱镜 Body Prism

> 同一具身体，三种读法。
> 一个把「每条说法有多可信」直接标在页面上的身体科普站。

[在线演示](https://your-demo.vercel.app) · [技术文档](docs/技术文档.pdf) · [演示视频](https://你的视频链接)

---

## 1. 项目简介

**人体棱镜**是一个面向大学生与年轻职场人的身体认知网站。用户选择一个器官（11 个：心、脑、肺、肝、肾、胃、脾、胆、小肠、大肠、膀胱），会看到三种并排的读法：

| 镜片 | 回答的问题 | 内容类型 |
|---|---|---|
| **结构之镜** | 它长什么样？ | 解剖与组织学事实 |
| **关系之镜** | 它和谁连着、互相影响？ | 生理调节与系统交互 |
| **信息之镜** | 它传递什么信号？ | **概念类比**，明确标注 |

与常见科普站不同的是：**每一条结论都带证据等级（A/B/C/D）和来源**。A 级是教科书事实，C 级是项目的叙事类比，D 级是传统理论——三者不混为一谈。

此外提供：

- **误区纠正**：常见说法 + 纠正 + 来源；
- **AI 策展人**：基于站内内容的问答，回答必须带引用；越界问题引导就医；
- **方法页**：公开证据分级规则、免责声明、素材许可与 AIGC 说明。

### 不做什么

本项目是科普与信息素养演示，**不提供诊断、不提供用药建议、不给剂量**。出现胸痛、呼吸困难、意识改变、大出血等急症信号，页面一律先建议立即就医。

---

## 2. 核心功能

| 功能 | 路由 | 说明 |
|---|---|---|
| 首页 | `/` | 三镜概念、11 个器官入口、可旋转的人体 |
| 探索页 | `/explore` | 器官列表 / 身体示意图，支持键盘操作 |
| 器官详情 | `/organ/[slug]` | 三镜标签、证据徽章、来源、误区、追问 |
| 三维入口 | `/` 首屏右侧 | 可旋转的人体模型，点器官进影响链；加载失败自动降级为静态图 |
| AI 策展人 | 器官页抽屉 | 带引用的问答；模型失败回退预生成答案 |
| 方法页 | `/method` | 证据分级、免责声明、素材许可、AIGC 记录 |
| 关于页 | `/about` | 团队、技术栈、数据来源 |

---

## 3. 技术架构

```text
┌─────────────────────────────────────────────┐
│  浏览器（React 19 / Next.js App Router）      │
│  首页 · 探索 · 器官详情 · 方法 · 关于          │
└───────────────┬─────────────────────────────┘
                │ Server Components / Route Handlers
┌───────────────▼─────────────────────────────┐
│  Next.js（TypeScript）                        │
│  ├─ src/content/organs/*.ts   结构化内容       │
│  ├─ src/lib/schema.ts         Zod 校验         │
│  ├─ src/lib/curator.ts        提示词与引用校验  │
│  └─ /api/curator              服务端调用模型    │
└───────────────┬─────────────────────────────┘
                │ HTTPS（密钥仅服务端）
┌───────────────▼─────────────────────────────┐
│  DeepSeek（OpenAI 兼容接口）                   │
│  仅接收当前器官的 claims/sources 作为上下文     │
└─────────────────────────────────────────────┘
```

### 技术选型

| 层 | 选择 | 理由 |
|---|---|---|
| 框架 | Next.js 15（App Router） | 服务端渲染利于 SEO；Route Handler 可安全持有密钥 |
| 语言 | TypeScript | 内容结构有类型约束，减少字段错配 |
| 样式 | Tailwind CSS | 快速统一设计系统，避免样式漂移 |
| 校验 | Zod | 运行时校验内容与模型输出，构建期即可暴露错误 |
| 3D | `<model-viewer>`（Google Web Component） | 只做"转一转 + 点热点"，一个 HTML 标签就够；按需动态加载，约 300 KB |
| 模型 | DeepSeek（OpenAI 兼容） | 中文表现稳定、成本低、支持函数调用 |
| 部署 | Vercel | 与 Next.js 原生集成，环境变量托管 |

### 目录结构

```text
src/
├─ app/
│  ├─ page.tsx                 首页
│  ├─ explore/page.tsx         探索页
│  ├─ organ/[slug]/page.tsx    器官详情
│  ├─ method/page.tsx          方法页
│  ├─ about/page.tsx           关于页
│  └─ api/curator/route.ts     AI 问答接口
├─ components/                 证据徽章、镜片标签、问答抽屉等
├─ content/organs/             11 个器官的结构化内容
└─ lib/
   ├─ schema.ts                Zod schema
   ├─ content.ts               读取与校验
   └─ curator.ts               提示词、引用过滤、降级
```

---

## 4. 本地运行

### 4.1 环境要求

| 依赖 | 版本 |
|---|---|
| Node.js | 20 或 22 LTS |
| npm | 10+ |
| Git | 2.40+ |

### 4.2 安装与启动

```bash
# 克隆
git clone https://github.com/xGlaciesx/body-prism.git
cd body-prism

# 安装依赖（按 package-lock.json 精确安装）
npm ci

# 复制环境变量模板
cp .env.example .env.local      # Windows: copy .env.example .env.local

# 启动开发服务器
npm run dev
```

打开 <http://localhost:3000>。

### 4.3 环境变量

| 变量 | 必填 | 作用 | 是否暴露到浏览器 |
|---|---|---|---|
| `DEEPSEEK_API_KEY` | 是（启用 AI 时） | 服务端调用 DeepSeek | 否 |
| `DEEPSEEK_BASE_URL` | 否 | 默认 `https://api.deepseek.com/v1` | 否 |
| `DEEPSEEK_MODEL` | 否 | 默认 `deepseek-chat` | 否 |
| `NEXT_PUBLIC_SITE_URL` | 否 | 站点绝对地址，用于分享卡片 | 是（非敏感） |

> **安全规则**：密钥只从 `process.env` 读取，只在服务端使用，**不加 `NEXT_PUBLIC_` 前缀**；`.env.local` 已在 `.gitignore` 中。仓库里只提交 `.env.example`。

### 4.4 常用命令

```bash
npm run dev      # 开发
npm run lint     # 代码检查
npm run build    # 生产构建
npm run start    # 本地跑生产构建
```

---

## 5. 内容与数据

| 来源 | 用途 | 许可 |
|---|---|---|
| Gray's Anatomy for Students | 解剖学事实 | 引用，不复制图 |
| Guyton and Hall Textbook of Medical Physiology | 生理学事实 | 引用，不复制图 |
| Robbins & Cotran Pathologic Basis of Disease | 病理学事实 | 引用，不复制图 |
| BodyParts3D（DBCLS） | 3D 解剖数据的几何来源 | CC BY 4.0，页面标注署名 |
| Z-Anatomy（LluisV/Z-Anatomy） | 3D 解剖网格 | CC BY-SA 4.0，衍生部分同许可分发 |
| 团队原创图 / AIGC 辅助图 | 视觉资产 | 见 `ATTRIBUTION.md` |

**三维资产署名**：BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International. / 3D mesh assets derived from Z-Anatomy (https://github.com/LluisV/Z-Anatomy), licensed under CC BY-SA 4.0; the 3D assets in this project are distributed under CC BY-SA 4.0, and no CC BY-NC structures are included.

**内容边界**：

- 中医相关内容一律标注「传统理论，非现代医学共识」；
- 信息论相关内容一律标注「概念类比」；
- 不复制 DK、图库、论文中的图片；
- AIGC 图片记录生成工具、时间、提示词摘要，见 `ATTRIBUTION.md`。

---

## 6. 部署

### Vercel（推荐）

1. Fork / 导入本仓库到 Vercel；
2. Framework Preset 自动识别 Next.js；
3. 在 **Settings → Environment Variables** 添加 `DEEPSEEK_API_KEY`（Production / Preview 均勾选）；
4. Deploy；
5. 在 **Domains** 绑定域名（可选）。

> 环境变量只存在 Vercel 服务端，不会进入前端 bundle。

### 其他平台

任何支持 Node.js 20+ 的平台均可：Cloudflare Pages（需适配）、阿里云函数计算、腾讯云托管。要求：

- 构建命令 `npm run build`，启动 `npm run start`；
- 必须配置 `DEEPSEEK_API_KEY`；
- 若模型不可用，站点仍可完整浏览（AI 抽屉回退预生成答案）。

---

## 7. 测试与质量

```bash
npm run lint     # ESLint
npm run build    # 类型检查 + 生产构建
```

GitHub Actions 在每次 PR 运行 `lint + build`，未通过不能合并。

人工验收清单见 [docs/team-handbook/START-HERE.md](docs/team-handbook/START-HERE.md) §8。

---

## 8. 团队

参赛单位：西安交通大学 · 团队名称：昂昂若驹

| 成员 | 专业 | 分工 |
|---|---|---|
| 李若溪（xGlaciesx） | 电子信息工程 | 前端、架构、部署、AI 集成 |
| 张子昂（ziangzhang07） | 临床医学 | 医学内容审核、证据分级、答辩口径 |

指导老师：（如有）

---

## 9. 开发过程

本项目保留完整 Git 历史，按纵向切片推进，每个功能一个分支、一个 PR：

```text
chore: scaffold Next.js app
docs: add team handbook and agent memory files
feat(home): add three-lens landing page
feat(organ): add organ detail with evidence badges
feat(home): add 3d body viewer with fallback
feat(curator): add AI curator with citations
docs: add method page and attribution
```

分支保护：`main` 需 PR + CI 通过；合并方式为 Squash and merge。

---

## 10. 免责声明

本站内容用于科普与信息素养教育，**不构成医疗建议，不能替代专业诊断与治疗**。如有不适，请及时就医；急症请拨打 120。

中医内容标注为传统理论，信息论内容标注为概念类比；证据等级说明见 `/method`。

---

## 11. 许可

- 代码：MIT
- 文字内容：CC BY-NC-SA 4.0（注明来源与项目名）
- 第三方数据与素材：遵循各自许可，见 `ATTRIBUTION.md`
