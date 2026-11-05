# 前端 / 后端 / 全栈：零基础概念地图与学习资源

> 读者：大一新生，没有系统学过 Web 开发。
> 目标：读完能说清“浏览器里发生了什么、前端和后端各管什么、我们这个项目为什么选这套技术”，并且知道下一步该学什么。
> 配套：现成图片、3D、图标、字体等素材，集中在 **13 素材与参考资源**；VSCode 操作在 **11 VSCode 实战**。

---

## 0. 先建立一张地图

一个网站，粗分三层：

```text
┌─────────────────────────────────────────────┐
│  前端（Frontend）                            │
│  在用户浏览器里运行：HTML / CSS / JavaScript │
│  负责：看见什么、怎么交互                    │
└───────────────────┬─────────────────────────┘
                    │ HTTP 请求 / JSON
┌───────────────────▼─────────────────────────┐
│  后端（Backend）                             │
│  在服务器上运行：路由、业务逻辑、鉴权         │
│  负责：数据能不能给、能不能改、按什么规则     │
└───────────────────┬─────────────────────────┘
                    │ SQL
┌───────────────────▼─────────────────────────┐
│  数据库 / 存储（Database / Storage）         │
│  负责：把数据持久化，下次打开还在             │
└─────────────────────────────────────────────┘
```

一句话：

- **前端 = 用户看得见的部分**；
- **后端 = 用户看不见、但不能乱给的部分**；
- **数据库 = 记住东西的地方**。

“全栈”不是三个人，而是同一个项目里前后端都做。你们两个人就是一个小型全栈团队。

---

## 1. 从输入网址到看见页面，发生了什么

以打开 `https://body-prism.vercel.app` 为例：

| 步骤 | 发生了什么 | 用到的技术 |
|---|---|---|
| 1 | 浏览器问 DNS：这个域名对应哪个 IP | DNS |
| 2 | 和服务器建立加密连接 | TCP / TLS / HTTPS |
| 3 | 浏览器发 HTTP 请求：我要这个页面 | HTTP |
| 4 | 服务器（Next.js）决定怎么响应 | 路由、Server Component |
| 5 | 需要数据时，服务器查数据库 | SQL / Supabase |
| 6 | 服务器返回 HTML（或 JSON） | HTML / JSON |
| 7 | 浏览器解析 HTML，构建 DOM | HTML |
| 8 | CSS 决定长什么样，JS 决定怎么动 | CSS / JavaScript |
| 9 | 图片、字体、3D 模型陆续加载 | 静态资源 |
| 10 | 用户点击，触发交互，可能再发请求 | 事件 / fetch |

### 1.1 静态页面和动态页面

- **静态**：服务器直接把同一个 HTML 发给所有人。快、便宜、好缓存。
- **动态**：根据用户、时间、数据库内容生成不同的 HTML/JSON。比如登录后的后台、AI 回答。

Next.js 的价值，是让你在同一个项目里同时写静态页和动态接口，而不是二选一。

---

## 2. 前端三件套

### 2.1 HTML：结构

HTML 用标签描述“这是什么”：

```html
<main>
  <h1>人体棱镜 Body Prism</h1>
  <p>同一具身体，三种读法。</p>
  <button>进入身体地图</button>
</main>
```

- 标签告诉浏览器：这是标题、段落、按钮、图片。
- 语义化标签（`header`、`nav`、`main`、`article`、`footer`）对无障碍和 SEO 有好处。

### 2.2 CSS：样式

CSS 决定颜色、间距、字体、布局、动画：

```css
.hero-title {
  font-size: 48px;
  color: #1c1a17;
  letter-spacing: -0.02em;
}
```

新手最容易卡在三件事：

1. **盒模型**：内容、内边距、边框、外边距；
2. **Flexbox**：一维排列，导航、按钮组最常用；
3. **Grid**：二维网格，卡片列表、页面布局最常用。

Tailwind CSS 把这些写成类名，例如 `flex items-center gap-4`。它没有改变 CSS 本身，只是把样式写进 `class` 里，减少在多个文件之间跳来跳去。

### 2.3 JavaScript：行为

JavaScript 让页面能响应事件、发请求、改 DOM：

```js
button.addEventListener("click", () => {
  console.log("用户点击了按钮");
});
```

必须理解的六个概念：

| 概念 | 一句话 |
|---|---|
| 变量与类型 | `const` / `let`，字符串、数字、布尔、数组、对象 |
| 函数 | 输入参数，返回结果；箭头函数是简写 |
| 数组方法 | `map` 转换、`filter` 筛选、`find` 查找 |
| 对象与解构 | `const { title } = organ` |
| 异步 | `async` / `await`，等网络请求回来 |
| 模块 | `import` / `export`，把代码拆成文件 |

### 2.4 浏览器里的 DOM 和事件

- **DOM**：浏览器把 HTML 解析成一棵树，JS 可以读写它。
- **事件**：点击、输入、滚动、键盘。
- **`fetch`**：浏览器发 HTTP 请求的内置函数。

React 出现的原因，是手动操作 DOM 在复杂页面里很容易乱。React 让你描述“在这个状态下，界面应该长什么样”，由框架去更新 DOM。

---

## 3. React 和 Next.js：为什么不是直接写 HTML

### 3.1 React 的心智模型

```text
UI = f(state)
```

- **组件（Component）**：一个可复用的界面单元，本质是返回 JSX 的函数。
- **props**：父组件传给子组件的数据，只读。
- **state**：组件自己会变化的数据，用 `useState` 管理。
- **副作用**：请求数据、订阅事件、操作浏览器 API，用 `useEffect` 或框架提供的能力。

一个最小组件：

```tsx
type BadgeProps = {
  level: "A" | "B" | "C" | "D";
  children: React.ReactNode;
};

export function EvidenceBadge({ level, children }: BadgeProps) {
  return (
    <span className={`badge badge-${level}`}>
      证据 {level} · {children}
    </span>
  );
}
```

### 3.2 Next.js 解决了什么

如果只用 React，你还要自己决定：路由、打包、服务端渲染、图片优化、API 放哪。Next.js 把这些做成约定：

| 能力 | 说明 |
|---|---|
| 文件路由 | `src/app/heart/page.tsx` 自动对应 `/heart` |
| Server Component | 默认在服务器渲染，能直接读数据库，不把密钥发到浏览器 |
| Client Component | 文件顶部写 `"use client"`，才能用 `useState`、事件、浏览器 API |
| Route Handler | `src/app/api/chat/route.ts` 写后端接口 |
| 图片优化 | `next/image` 自动处理尺寸和格式 |
| 构建与部署 | `next build`，部署到 Vercel |

**你们项目里最重要的判断：**

- 展示内容、读数据库 → 默认 Server Component；
- 3D、滑块、聊天输入框、需要 `useState` 的 → 才加 `"use client"`。

### 3.3 TypeScript：提前发现错误

```ts
type Organ = {
  slug: string;
  name: string;
  evidenceLevel: "A" | "B" | "C" | "D";
};

function getOrgan(slug: string): Organ | null {
  // ...
}
```

TypeScript 不能保证运行结果一定对，但能在你保存文件时就告诉你“这个字段可能不存在”。对新手最大的好处是：**AI 生成的代码如果字段写错，编辑器会立刻标红。**

### 3.4 Tailwind 和 shadcn/ui

- **Tailwind**：用类名写样式，适合快速迭代、保持设计一致。
- **shadcn/ui**：不是组件库依赖，而是把组件源码复制进你的项目，你可以直接改。适合需要“看起来专业、又不想从零写”的比赛项目。

---

## 4. 后端到底是什么

### 4.1 一次后端请求的路径

```text
浏览器
  │  POST /api/chat  { "message": "心脏有哪些结构？" }
  ▼
Next.js Route Handler
  │  1. 校验输入（Zod）
  │  2. 检查登录/角色
  │  3. 查知识库（Supabase / 向量检索）
  │  4. 调模型（DeepSeek）
  ▼
返回 JSON 或流式文本
```

后端要回答四个问题：

1. **你是谁？**（认证）
2. **你能做什么？**（授权）
3. **数据从哪来、怎么存？**（数据库）
4. **出错怎么办？**（错误处理、日志）

### 4.2 API 是什么

API 是前后端之间的合同：

```http
GET /api/organs/heart
```

```json
{
  "slug": "heart",
  "name": "心脏",
  "summary": "……",
  "evidenceLevel": "A"
}
```

常见状态码：

| 状态码 | 含义 |
|---|---|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 请求格式不对 |
| 401 | 没登录 |
| 403 | 登录了但没权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

### 4.3 认证和授权不是一回事

- **认证（Authentication）**：你是谁。登录、验证邮箱、第三方登录。
- **授权（Authorization）**：你能干什么。客户只能看，管理员能发布。

你们项目的四个角色：

```text
VIEWER    只看公开内容
EDITOR    建草稿、改内容
REVIEWER  审核医学内容
ADMIN     发布、下线、改角色
```

**前端隐藏按钮不等于权限控制。** 真正的检查必须在服务端（Server Action / Route Handler / 数据库 RLS）再做一次。

### 4.4 数据库最小知识

| 概念 | 一句话 |
|---|---|
| 表（table） | 一类数据，比如 `organs` |
| 行（row） | 一条记录，比如“心脏” |
| 列（column） | 字段，比如 `name`、`slug` |
| 主键（primary key） | 唯一标识一行 |
| 外键（foreign key） | 指向另一张表的行 |
| 索引（index） | 加快查询，但会占空间 |
| 迁移（migration） | 用 SQL 文件记录表结构变化 |

最小 SQL 四句：

```sql
SELECT name, summary FROM organs WHERE slug = 'heart';
INSERT INTO organs (slug, name) VALUES ('liver', '肝脏');
UPDATE organs SET summary = '……' WHERE slug = 'liver';
DELETE FROM organs WHERE slug = 'liver';
```

### 4.5 你们项目的后端为什么是 Supabase + Next.js

- **Supabase** 提供 Postgres 数据库、登录、文件存储、行级安全（RLS），免费层够比赛用；
- **Next.js Route Handler** 写 AI 接口、发布接口，密钥留在服务端；
- 不需要自己买服务器、配 Nginx、写 Java/Spring 或 Python/Django。

这不是“偷懒”，而是把有限时间放在内容和交互上。比赛看的是作品完整度和协作，不是后端框架有多重。

---

## 5. 你们项目的架构

```text
浏览器
  │
  ├─ 公开页面（Server Component）
  │    首页 / 身体地图 / 器官详情 / 信息负荷实验室 / 争议地图
  │         │
  │         ├─ 读 content/organs/*.mdx（构建时）
  │         └─ 读 Supabase 的 PUBLISHED 内容（运行时）
  │
  ├─ 管理后台（/admin，需登录 + 角色）
  │    草稿 / 审核 / 发布 / 审计日志
  │
  └─ API
       ├─ /api/chat      → RAG 检索 + DeepSeek 流式回答
       ├─ /api/publish   → 校验角色 + 写数据库 + 审计
       └─ /api/health    → 健康检查

服务端
  ├─ Supabase Auth / Postgres / Storage / RLS
  └─ DeepSeek API（只在服务端调用）
```

### 5.1 一条内容从草稿到公开

```text
EDITOR 建草稿（DRAFT）
   ↓
REVIEWER 审核（IN_REVIEW → APPROVED）
   ↓
ADMIN 发布（PUBLISHED）
   ↓
公开页和 RAG 才能读到
```

**草稿绝不进入公开页，也不进入 RAG。** 这是比赛里很容易被问到的点。

### 5.2 为什么密钥不能进前端

浏览器里的代码，用户可以打开开发者工具看到。任何写进 `NEXT_PUBLIC_` 的值都是公开的。

```text
✅ 服务端：process.env.DEEPSEEK_API_KEY
❌ 前端：NEXT_PUBLIC_DEEPSEEK_API_KEY
❌ 仓库：.env.local
```

---

## 6. 这套技术栈，每项到底学多少

| 技术 | 解决什么问题 | 最低学习量 | 可以晚点学 |
|---|---|---|---|
| HTML / CSS | 页面结构和样式 | 能看懂常见标签、Flex/Grid | 高级动画、CSS Houdini |
| JavaScript | 交互和请求 | 变量、函数、数组方法、async/await | 原型链、事件循环深层 |
| TypeScript | 提前发现类型错误 | 类型标注、联合类型、可选属性 | 泛型高级用法、类型体操 |
| React | 组件化 UI | 组件、props、state、列表渲染、事件 | 性能优化、Server Component 深入 |
| Next.js | 路由、渲染、API | 文件路由、layout、page、Route Handler | 缓存策略、middleware 深入 |
| Tailwind | 快速写样式 | 常用类名、响应式前缀 | 自定义插件 |
| shadcn/ui | 现成高质量组件 | 会安装、会改 props | 自己写 variants |
| React Three Fiber | 3D 器官 | 加载 GLB、相机、灯光、点击 | 着色器、后处理 |
| Supabase | 数据库、登录、存储 | 建表、查询、RLS 基础 | 实时订阅、边缘函数 |
| Zod | 校验输入 | `z.object`、`safeParse` | 复杂 transform |
| Vercel AI SDK | 流式 AI 回答 | `streamText`、消息格式 | Agent 工具调用 |

**不要试图一次学完。** 每做一个小功能，只学这个功能需要的那一列。

---

## 7. 三档能力目标

### 7.1 能看懂

- 知道 `src/app` 下每个文件夹对应哪个网址；
- 能认出什么是组件、什么是 props、什么是 state；
- 能看懂 `fetch` / `await` 在等什么；
- 能看懂报错的前两行和文件路径。

### 7.2 能改

- 改文案、改颜色、改间距；
- 复制一个现有组件，改成一个新卡片；
- 加一个字段，从数据库读到页面；
- 按 02 的流程提交、开 PR。

### 7.3 能查

- 把报错原文粘进搜索；
- 知道去 MDN、Next.js 官方文档、Supabase 文档查；
- 问 AI 时带上：目标、文件路径、完整报错、已经试过什么；
- 改完能自己验证，而不是“看起来对了”。

> 大一阶段，**能看懂 + 能改 + 能查** 已经足够做完这个比赛。原理可以后面补。

---

## 8. 四周学习路径（和项目并行）

每天 60–90 分钟，不要先学完再动手。

| 周 | 学什么 | 动手做什么 | 对应项目任务 |
|---|---|---|---|
| 第 1 周 | HTML 常用标签、CSS 盒模型/Flex/Grid、JS 变量/函数/数组 | 用纯 HTML/CSS 做一个器官卡片 | 首页静态版 |
| 第 2 周 | React 组件、props、state、列表、事件 | 把卡片改成 React 组件 | 身体地图卡片 |
| 第 3 周 | Next.js 文件路由、layout、Server/Client Component | 建 `/heart` 页面，读本地 MDX | 器官详情页 |
| 第 4 周 | Supabase 建表/查询、Route Handler、部署 | 做一个只读 API，部署到 Vercel | 内容后台只读版 |

### 8.1 每天的学习结构

```text
30 分钟：读官方文档或看一节视频
30 分钟：关掉视频，自己敲一遍
15 分钟：写 5 行笔记（今天学了什么、哪里不懂）
```

**只看不敲，等于没学。** 代码是手上功夫。

---

## 9. 优质学习资源

### 9.1 中文入门

| 资源 | 适合 | 链接 |
|---|---|---|
| MDN Web 文档（中文） | HTML/CSS/JS 的权威参考 | https://developer.mozilla.org/zh-CN/ |
| 现代 JavaScript 教程 | JS 系统入门，例子好 | https://zh.javascript.info/ |
| React 中文文档 | 官方教程，从“井字棋”开始 | https://zh-hans.react.dev/learn |
| Next.js Learn | 官方一步步做完整应用 | https://nextjs.org/learn |
| TypeScript 中文文档 | 类型基础 | https://www.typescriptlang.org/zh/docs/ |
| 阮一峰 ES6 教程 | ES6+ 语法速查 | https://es6.ruanyifeng.com/ |
| 廖雪峰 JavaScript 教程 | 中文系统教程 | https://liaoxuefeng.com/books/javascript/ |
| freeCodeCamp 中文 | 交互式练习 | https://www.freecodecamp.org/chinese/ |
| 计算机教育中缺失的一课 | 命令行、Git、编辑器 | https://missing-semester-cn.github.io/ |
| CS50（哈佛） | 计算机科学通识 | https://cs50.harvard.edu/x/ |

### 9.2 官方文档（做项目时最该查的）

| 资源 | 用途 | 链接 |
|---|---|---|
| Next.js Docs | 路由、渲染、部署 | https://nextjs.org/docs |
| Tailwind CSS Docs | 类名速查 | https://tailwindcss.com/docs |
| shadcn/ui | 组件安装与示例 | https://ui.shadcn.com/ |
| Supabase Docs | 数据库、Auth、RLS | https://supabase.com/docs |
| Vercel AI SDK | 流式回答、工具调用 | https://ai-sdk.dev/docs |
| React Three Fiber | 3D 场景 | https://r3f.docs.pmnd.rs/ |
| Three.js | 3D 底层 API | https://threejs.org/docs/ |
| Zod | 输入校验 | https://zod.dev/ |

### 9.3 练习与灵感

| 资源 | 用途 | 链接 |
|---|---|---|
| Frontend Mentor | 用真实设计稿练前端 | https://www.frontendmentor.io/ |
| Web.dev Learn | Google 的前端课程 | https://web.dev/learn |
| CodePen | 看别人怎么做交互 | https://codepen.io/ |
| Awwwards | 看优秀网站的设计 | https://www.awwwards.com/ |

---

## 10. 现成素材：不用从零画

比赛时间紧，能用的现成资源就用，但必须看清授权。完整的医学/3D 素材清单在 **13 素材与参考资源**，这里只列 UI 层最常用的。

| 类型 | 资源 | 授权 | 怎么用 |
|---|---|---|---|
| 图标 | Lucide https://lucide.dev/ | ISC | React 图标组件，风格统一 |
| 图标 | Heroicons https://heroicons.com/ | MIT | Tailwind 官方配套 |
| 插画 | unDraw https://undraw.co/ | 可免费商用，需查当前条款 | 改主色后用于空状态、介绍页 |
| 插画 | Storyset https://storyset.com/ | 免费需署名 | 人物/场景插画 |
| UI 组件 | shadcn/ui https://ui.shadcn.com/ | MIT | 复制源码进项目 |
| 无头组件 | Radix UI https://www.radix-ui.com/ | MIT | 弹窗、下拉、标签页 |
| 字体 | Google Fonts https://fonts.google.com/ | OFL 等 | Noto Serif SC / Noto Sans SC |
| 配色 | Radix Colors https://www.radix-ui.com/colors | MIT | 可访问性好的色阶 |
| 配色 | Coolors https://coolors.co/ | 工具免费 | 生成配色灵感 |
| 动效 | LottieFiles https://lottiefiles.com/ | 逐个看 | 加载、空状态 |
| 动效 | Rive https://rive.app/ | 免费层 | 交互式动画 |

### 10.1 三条铁律

1. **先看授权，再下载。** 免费 ≠ 可商用 ≠ 不用署名。
2. **不确定就不用。** 比赛作品被质疑版权，比少一张图严重。
3. **AIGC 图也要记录**：工具、提示词、日期、后处理，写进 `docs/art-provenance.md`。

---

## 11. 遇到报错怎么查（五步）

```text
1. 读完整报错：最后一行通常是原因，上面是调用栈
2. 找文件路径和行号：src/app/heart/page.tsx:42
3. 复制原句去搜：不要只搜“报错了”
4. 问 AI：带上目标、文件、完整报错、已试过什么
5. 修完写一行笔记：这个错以后怎么避免
```

### 11.1 问 AI 的模板

```text
目标：让 /heart 页面能读到 content/organs/heart.mdx
环境：Next.js App Router + TypeScript，Windows PowerShell
文件：src/app/heart/page.tsx
报错（完整）：
……
已经试过：
1. ……
2. ……
要求：先判断原因，再给最小修改；不要重构其他文件。
```

**不要只说“帮我修一下”。** 信息越完整，AI 越不容易瞎猜。

---

## 12. 一页速查

```text
前端：HTML 结构 + CSS 样式 + JS 行为
框架：React 组件化，Next.js 管路由和渲染
后端：Route Handler 收请求 → 校验 → 查库 → 返回
数据库：表 / 行 / 列 / 主键 / 外键 / 索引
权限：认证=你是谁，授权=你能干什么
密钥：只在服务端，绝不 NEXT_PUBLIC_
默认：Server Component；需要交互才 "use client"
学习：能看懂 → 能改 → 能查，不要等学完再开始
```

> **先做出来，再弄懂；每弄懂一个点，就回去改一行代码。**
