# VSCode + Cline + DeepSeek 配置包

> 项目：人体棱镜 Body Prism——AI 驱动的身体信息三镜图谱。
> 适用对象：大一新生，第一次用 AI Agent 写完整项目。
> 目标：今天把“AI 能读代码、能改代码、能跑命令、能解释代码”这条链路跑通。

---

## 1. 安装顺序

1. 安装 **VSCode**；
2. 安装 **Node.js 22 LTS**；
3. 安装 **Git**；
4. 打开 VSCode 扩展市场，搜索 **Cline** 并安装；
5. 登录 GitHub，打开 VSCode 的 **Settings Sync**（可选，但建议）。

> 不要同时安装 Cline 和 Roo Code。两个 Agent 会互相抢文件、重复改代码。
> Continue 可以等 Cline 用顺了再加，不是第一天必需品。

### 1.1 两台电脑的终端不一样

- **女孩：Windows 11 + Windows PowerShell 5.1**。它**不支持 `&&`**，所以看到 `npm run lint && npm run build` 要拆成两条命令。
- **男孩：macOS 27 Golden Gate + Terminal（zsh）**。`&&`、`tail`、`cat` 都能用。
- Cline 默认使用 VSCode 的集成终端，所以它在你电脑上跑的命令，也会受对应系统限制。

> 在 `AGENTS.md` 里明确写了这一条，Cline 每次任务前会读到。详细命令对照见文档 02 的 0.0。

---

## 2. Cline 配置 DeepSeek

打开 Cline 侧栏 → Settings：

| 配置项 | 值 |
|---|---|
| API Provider | `OpenAI Compatible` |
| Base URL | `https://api.deepseek.com/v1` |
| API Key | DeepSeek Key |
| Model | `deepseek-chat` |
| Context Window | `64000` |
| Max Output Tokens | `8000` |
| Temperature | `0.2` |

如果 Cline 的供应商列表里已经有 **DeepSeek**，直接选它，不用填 Base URL。

### 2.1 模型怎么选

- 日常写代码、改文件、跑终端：`deepseek-chat`；
- 架构设计、复杂报错分析：可以切 `deepseek-reasoner`；
- 如果 Cline 提示该模型不支持工具调用，就只在普通对话里用它分析，不要用在 Agent 模式；
- Cline 的 Agent 模式优先用支持 function calling 的 `deepseek-chat`。

### 2.2 必须关闭自动批准

- Terminal auto-approve：关闭；
- File write auto-approve：关闭或逐次确认；
- Browser auto-approve：关闭。

### 2.3 两个 Key 分开

| Key | 用途 |
|---|---|
| `DEEPSEEK_DEV_KEY` | 给 Cline 写代码用 |
| `DEEPSEEK_APP_KEY` | 给网站产品运行时用 |

这样能分开看成本，也避免开发 Agent 把产品额度跑光。
DeepSeek 很便宜，但 Agent 会反复读文件、反复试错，仍然要在控制台设月度预算。

### 2.4 学生低成本模式

Cline 本身免费，费用来自模型 API。给大一新生的省钱配置：

- **日常补全用 GitHub Copilot Student**（如果符合学生认证），Cline 只做多文件修改、重构、复杂报错；
- **开发期默认 `AI_MOCK=1`**，界面开发不调用真实模型；
- **一次只让 Cline 读 1–3 个文件**，不要“把整个项目读一遍”；
- **`deepseek-reasoner` 只在卡住时用**，不要放进产品运行时；
- **两个 Key 都设预算上限**，每周看一次账单；
- **接入 AI 功能前先读第 5 份文档**：模型路由、缓存、预算守卫。

> 详细方案见 [05-ai-cost-control.md](05-ai-cost-control.md)：30 天 ¥0–¥300 的低成本 AI 架构。

---

## 3. `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "editor.quickSuggestions": {
    "strings": true
  }
}
```

如果 VSCode 提示 `source.fixAll.eslint` 的值不合法，把 `"explicit"` 改成 `true`。

---

## 4. `.vscode/extensions.json`

```json
{
  "recommendations": [
    "saoudrizwan.claude-dev",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "eamodio.gitlens",
    "mhutchie.git-graph",
    "usernamehw.errorlens",
    "christian-kohler.path-intellisense",
    "yoavbls.pretty-ts-errors",
    "ms-vsliveshare.vsliveshare",
    "ms-playwright.playwright",
    "humao.rest-client",
    "yzhang.markdown-all-in-one",
    "github.vscode-pull-request-github",
    "ms-azuretools.vscode-docker"
  ]
}
```

Cline 的扩展 ID 如果搜不到，直接在扩展市场搜 “Cline”，不要装名字相近的山寨插件。

### 4.1 插件用途

| 插件 | 用途 |
|---|---|
| Cline | AI Agent 主入口 |
| ESLint | 代码检查 |
| Prettier | 格式化 |
| Tailwind CSS IntelliSense | Tailwind 类名补全 |
| GitLens | 看每行是谁改的、什么时候改的 |
| Git Graph | 可视化分支历史 |
| Error Lens | 行内显示报错 |
| Path Intellisense | 路径补全 |
| Pretty TypeScript Errors | 把 TS 报错翻译成人话 |
| Live Share | 两个人实时协同编辑/调试 |
| Playwright Test | 端到端测试 |
| REST Client | 调 API |
| Markdown All in One | 写 README/文档 |
| GitHub Pull Requests | 在 VSCode 里看 PR |
| Docker | 本地数据库，后面再用 |

---

## 5. `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

---

## 6. `AGENTS.md`

放在项目根目录，Cline 每次任务前读。

```md
# Body Prism 项目规则

## 项目
人体棱镜 Body Prism：AI 原生的身体信息三镜图谱。
三种读法：结构之镜、关系之镜、信息之镜。
目标：2026 传智杯 AI WEB 网页开发挑战赛。
团队：2 人，大一新生。

## 技术栈
- Next.js App Router + TypeScript strict
- Tailwind CSS + shadcn/ui
- React Three Fiber + three.js
- Vercel AI SDK
- PostgreSQL + pgvector（本地 Docker）
- Supabase Auth + Postgres + Storage（后台与线上；免费层）
- Zod
- npm

## 常用命令
- npm run dev
- npm run lint
- npm run build
- npm run db:up
- npm run db:seed

## 终端
- 开发机有两台：Windows 11 + Windows PowerShell 5.1（女孩），macOS 27 Golden Gate + zsh（男孩）。
- Windows PowerShell 5.1 不支持 `&&`；需要连续执行时，一次只给一条命令，或写成两行。
- 不要默认使用 `tail`、`head`、`sed`、`awk`、`grep` 等 Unix 命令；必须用时，同时给出 Windows PowerShell 等价写法。
- 路径在 Git 和代码里统一用 `/`；Windows 本地绝对路径可以用 `$env:USERPROFILE`。
- 不执行 `rm -rf`、`git reset --hard`、`git push --force`；需要删除时先说明影响。
- 不读取、不打印 `.env.local` 或任何环境变量。

## 目录
- src/app/(public)：公开站，只读
- src/app/(admin)/admin：管理后台
- src/app/api：API
- src/components：组件
- src/lib：AI、RAG、数据库、schema、auth
- src/lib/auth：requireRole 等权限守卫
- content/organs：六器官 MDX 内容（种子 + Git 备份）
- supabase/migrations：数据库表、RLS、RPC
- public/art：插画成品
- public/models：压缩后的 GLB
- scripts：数据下载、种子、评测
- docs：架构、3D、AI、美术过程

## 编码规则
- 默认 Server Component；只有 3D、交互、浏览器 API 才用 "use client"。
- 不擅自新增依赖；需要先说明理由和替代方案。
- 所有外部输入用 Zod 校验。
- 不滥用 any；未知类型用 unknown，再收窄。
- 文件名、变量名用英文；面向用户的中文放在 content 或常量里。
- 样式用 Tailwind；不要在组件里写大段 CSS。
- 图片用 next/image；3D 用动态 import + Suspense。
- 每个页面要有 loading、empty、error 三态。

## AI 规则
- 所有模型调用放在 server（route handler 或 server action）。
- 密钥只从 process.env 读取；不打印；不写进前端。
- 模型输出必须符合 schema；解析失败要有回退。
- 回答必须带 claim/source 引用；没有来源就明说“知识库暂无可靠来源”。
- 不做诊断、不开药、不给剂量；遇到急症红旗先建议就医。
- 中医内容必须标“传统理论”；信息论内容必须标“概念类比”。
- 不把假说写成共识；证据等级 A/B/C/D 要标清楚。

## 权限与后台
- 公开站只读；客户不需要登录。
- 角色：VIEWER / EDITOR / REVIEWER / ADMIN；只有 ADMIN 能发布。
- 所有写操作在 Server Action / Route Handler 里先 requireRole；middleware 只刷新会话。
- 客户端角色只用于显示，不能作为授权依据。
- 草稿/审核中内容绝不进入公开页和 RAG；只索引 PUBLISHED。
- 发布、下线、改角色必须写 audit_logs。
- service_role key 只在服务端，不得加 NEXT_PUBLIC_。
- 管理员页面 noindex；公开注册默认关闭。
- 详细方案见 06-auth-and-admin.md。

## 医学内容
- 每个器官：一句话总结 + 三镜卡片 + 1 个常见误区 + 3 条来源 + 3 个追问。
- 每条 claim 必须有 evidenceLevel 和 sourceIds。
- 临床医学成员审核后才能合并。
- 不复制 DK、图库、论文里的图片；只用 BodyParts3D 数据、原创图、AIGC 辅助图。
- 经络图必须标“示意，非解剖结构”。

## Git
- 不直接 push main；开分支 + PR。
- commit 类型：feat / fix / docs / content / art / test / chore。
- 提交前跑 npm run lint 和 npm run build。
- 不提交 .env.local、node_modules、.next、原始 OBJ/PSD/Procreate 文件。
- 不对 main 使用 git push --force。

## 会话协议
- 用户说 `start` / `开始`：
  1. 读 AGENTS.md、README.md、docs/SESSION_LOG.md 最后 3 条；
  2. 运行 `git status` 和 `git branch --show-current`；
  3. 用 5 行以内复述：当前分支、上次做到哪、今天目标；
  4. 给不超过 3 步的计划，等用户确认后再改代码。
- 用户说 `stop` / `今天结束`：
  1. 停止新功能；
  2. 更新 docs/SESSION_LOG.md（做了什么、改了哪些文件、没做完什么、明天第一件事）；
  3. 建议 commit message，但**不自动** commit / push；
  4. 提醒用户分别运行 `npm run lint` 和 `npm run build`。
- 用户说 `plan` / `讨论明天`：
  - 只讨论，不改文件；输出明天的 3 件事和风险。
- 记忆分三层：AGENTS.md（长期规则）、docs/DECISIONS.md（已定的决策）、docs/SESSION_LOG.md（每天进展）。
- 不把密钥、隐私、患者信息写进任何记忆文件。

## 给 AI 的回答要求
- 改代码前先给计划：要改哪些文件、为什么、风险是什么。
- 一次只做一个功能。
- 改完解释关键代码，假设读者是大一新生。
- 不确定就问，不要编 API、字段、医学结论。
- 不要为了让代码跑起来而删除测试或吞掉错误。
```

---

## 7. `.clinerules`

```md
所有规则以 AGENTS.md 为准。
每次新任务开始，先读 AGENTS.md 和 README.md。
修改前先给计划；修改后解释关键代码。
不要自动执行终端命令；不要打印 .env.local。
```

---

## 8. `docs/cline-setup.md`

给孩子的操作说明，直接复制：

```md
# Cline + DeepSeek 使用说明

## 第一次
1. 打开 VSCode，安装 Cline。
2. Cline 设置里选 OpenAI Compatible。
3. Base URL 填 https://api.deepseek.com/v1
4. 填 DeepSeek Key。
5. Model 填 deepseek-chat。
6. Context 64000，Max Output 8000，Temperature 0.2。
7. 关闭 Terminal / File write 的自动批准。

## 每天怎么用
1. 先让 Cline 读 AGENTS.md。
2. 说清楚今天只做哪一个功能。
3. 让它先给计划，不要直接改。
4. 确认计划后，一次只改一个文件或一个组件。
5. 改完看 diff，跑 npm run lint 和 npm run build。
6. 通过后自己 git commit。
7. 如果改乱了，git restore 回退，不要继续打补丁。

## 好用的提问方式
- “先不要改代码。阅读 @src/app/page.tsx，用大一新生能懂的话解释这个页面怎么工作。”
- “只改这一个组件，不要动其他文件。先给我计划。”
- “这是完整报错：...。先判断原因，再给最小修复。”
- “用表格列出这次修改涉及的文件、风险和测试步骤。”
- “逐行解释你刚写的代码，标出哪些是 Next.js 固定写法。”

## 禁止
- 不要让 Cline 执行 rm -rf、git reset --hard、git push --force。
- 不要让 Cline 读取或打印 .env.local。
- 不要让 Cline 自动安装一堆依赖。
- 不要提交自己看不懂的代码。
```

---

## 9. 第一次测试任务

装好后，用这个提示词测试：

```text
先不要改代码。
阅读 package.json、src/app/page.tsx、src/app/globals.css，
用大一新生能懂的话告诉我：
1. 这个项目怎么启动；
2. 页面入口在哪里；
3. Tailwind 是怎么生效的；
4. 如果我要把首页标题改成“人体棱镜 Body Prism”，只需要改哪个文件。
最后给我一个不超过 3 步的修改计划。
```

如果它能准确回答，再开始正式开发。

---

## 10. 推荐工作流：一次只做一个小任务

```text
1. 新建 Cline 任务
2. 让它读 AGENTS.md
3. 用一句话说清楚今天只做什么
4. 让它先给计划（文件列表 + 风险）
5. 确认计划
6. 只改一个文件/组件
7. 看 diff
8. 依次跑 `npm run lint`、`npm run build`（Windows 分两条，不要用 `&&`）
9. 自己 git commit
10. 新任务，重复
```

### 10.1 好提示词 vs 坏提示词

| 坏提示词 | 好提示词 |
|---|---|
| “帮我做一个人体网站” | “只改 `src/app/page.tsx`，把首页标题换成‘人体棱镜 Body Prism’，不要动其他文件，先给计划。” |
| “修一下这个报错” | “这是完整报错：……。先判断原因，再给最小修复，不要重构。” |
| “把代码优化一下” | “只优化 `heart-plate.tsx` 的加载逻辑：加 Suspense 和 error fallback，不改 UI。” |
| “加一个 AI 功能” | “在 `src/app/api/chat/route.ts` 加一个流式回答接口，输入 message，输出 text stream，先不接 RAG。” |

### 10.2 每次必须问的一句

> “用大一新生能听懂的话，逐行解释这段代码；告诉我哪些是 Next.js 的固定写法，哪些是业务逻辑。”

比赛要求“所有代码可解释”，这一条必须从第一天执行。

### 10.3 用三句口令管住 AI：`start` / `stop` / `plan`

大一新生最容易犯的错，是把 AI 当搜索引擎：每次开一个新对话，前面说过什么全忘了；或者让 AI 一口气改十个文件，最后不知道哪一行是自己要的。

解决办法不是“更强的模型”，而是**固定的会话仪式**。把这个协议写进 `AGENTS.md`（上面的模板已经包含），每天照说三句话：

| 你说 | AI 应该做什么 | 你要检查什么 |
|---|---|---|
| `start` 或 `开始` | 读规则和昨天日志、看 `git status`、复述目标、给 3 步计划 | 它说的“昨天做到哪”对不对；计划是不是超过 3 步 |
| `stop` 或 `今天结束` | 更新 `docs/SESSION_LOG.md`、列改动文件、建议 commit message | 日志里有没有写“没做完什么”和“明天第一件事” |
| `plan` 或 `讨论明天` | 只讨论，不改代码，输出明天的 3 件事 | 它有没有偷偷改文件（看 `git status`） |

**为什么有效：**

1. AI 的上下文会丢，但仓库里的文件不会丢；把“记忆”写进 `docs/SESSION_LOG.md`，换一个对话、换一台电脑都能接上。
2. `start` 先看 `git status`，能防止在错误的分支上继续写。
3. `stop` 强制留下交接记录，两个人轮流开发时不用靠微信翻聊天记录。
4. `plan` 把“想”和“做”分开，避免 AI 边讨论边改代码。

完整模板、对话示例和 VSCode 操作见 **11 VSCode 实战** 第 5 节。

---

## 11. 安全红线

- Key 只放 Cline 设置和 `.env.local`；
- 不截图 Key，不把 Key 粘到聊天里；
- 产品和开发用两个 Key；
- DeepSeek 控制台设月度预算；
- 一旦误提交 Key，立刻吊销换新，历史记录里的旧 Key 仍然算泄露；
- 不让 Agent 执行 `rm -rf`、`git reset --hard`、`git push --force`；
- 不让 Agent 读取 `.env.local` 或打印环境变量；
- 不让 Agent 自动安装一堆依赖；
- 不提交自己看不懂的代码。

---

## 12. 常见问题

| 问题 | 处理 |
|---|---|
| 401 / Authentication Fails | Key 错了或过期；重新复制；注意不要带空格 |
| 429 / Rate Limit | 请求太频繁；等几分钟；降低并发 |
| Model not found | 模型名写错；用 `deepseek-chat`，不要自己编模型名 |
| Context too long | 新开任务；只 `@` 相关文件；不要让 Agent 读整个仓库 |
| Cline 改乱代码 | `git restore .` 回退；把任务拆小；先让它给计划 |
| 终端命令被卡住 | 关闭 auto-approve；手动确认；不要让 Agent 跑长任务 |
| 终端输出太长 | 只贴关键报错；macOS 用 `npm run build 2>&1` 接 `tail -50`；Windows PowerShell 用 `npm run build 2>&1` 接 `Select-Object -Last 50` |
| Windows 报 `&&` 不是有效语句分隔符 | PowerShell 5.1 不支持 `&&` | 把命令拆成两行，或让 Cline 一次只跑一条 |
| Windows 报 `npx.ps1 cannot be loaded` | PowerShell 执行策略 | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| 不知道选哪个模型 | 日常 `deepseek-chat`；难题单独开普通对话用 `deepseek-reasoner` |

---

## 13. 一句话总结

> **Cline 是副驾驶，不是代驾。**
> 它负责快，你们负责懂；它负责改，你们负责 review、测试、commit。
