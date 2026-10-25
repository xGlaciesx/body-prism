# 第一天写代码：从空文件夹到浏览器里的第一个页面

> 给谁：第一次用 VSCode、第一次让 AI 改代码、第一次在真实项目里走“分支 + PR”的两个大一学生。
> 前提：已经按 **00** 装好 Node 22、Git、VSCode、Cline，并且 GitHub 上已经有一个建好的 `body-prism` 仓库（00 会建好并推第一次）。
> 今天目标：**3–4 小时内**，让首页在浏览器里显示“人体棱镜”，并且这个改动通过一个 Pull Request 进入 `main`。
> 今天**不碰**：3D、数据库、Supabase、登录、AI 接口、支付。谁先碰，谁今天做不完。

> **四份文档怎么分工，别重复做**
> | 文档 | 管什么 | 什么时候看 |
> |---|---|---|
> | **00 起步手册** | 装环境、配身份、建仓库、加协作者、保护 main、配 CI、第一个 PR | **只做一次**，第一天之前 |
> | **14（本篇）** | 第一天把项目跑起来、把文档放进仓库、提交一次改动 | 第一天 |
> | **15 每天的 Git 节奏** | 之后每天开工/收工、开分支、合并、删分支 | 第二天起 |
> | **16 MVP 实施** | 先写哪个文件、每个文件放什么 | 跑通之后 |
>
> 00 里已经做过的动作，本篇会明确写“**跳过**”，不会让你再跑一遍。

**今天会反复出现的 8 个词，先扫一眼**（完整 15 个词见 **00 §1.5**）：

| 词 | 一句话作用 |
|---|---|
| 仓库 repo | 项目在 GitHub 上的存放处 |
| main（主干） | 永远能打开、能演示的那一版 |
| branch（分支） | 从主干岔出来的工作台，改坏了不影响 main |
| commit（提交） | 给当前改动拍一张存档快照 |
| push（上传） | 把本地提交送到 GitHub |
| pull（下载并合并） | 把 GitHub 上的新提交拿回本地 |
| PR（Pull Request，合并申请） | 请求把分支并进 main，顺便让人 review |
| 保护 main | 给主干上锁：不能直接 push，必须走 PR + CI |

---

## 0. 先分清三样东西，不然一定乱

很多同学第一天就卡住，不是因为命令难，而是把三样东西混在一起了：

| 东西 | 是什么 | 放在哪 | 要不要提交到 Git |
|---|---|---|---|
| **文档包**（这个 zip） | 说明书、菜谱、参考资料 | 项目里的 `docs/team-handbook/` | 要，团队共享 |
| **项目 `body-prism`** | 真正会变成网站的代码 | `~/Projects/body-prism` 或 `C:\Users\<你>\Projects\body-prism` | 要 |
| **Cline** | 在 VSCode 里帮你改代码的 AI | VSCode 左侧边栏 | 不是文件，不用提交 |

一句话：

> **文档包不是项目，别把 zip 里的 HTML 当成网站源码；Cline 也不是项目，它只是帮你改项目文件的人。**

还有一个最容易犯的错：

> **不要把 `01-cline-deepseek-setup.md` 改名成 `AGENTS.md`。**
> `01` 是给人看的安装说明；`AGENTS.md` 是给 AI 看的项目规则，内容不一样。本文第 4 步会给你一份可直接粘贴的 `AGENTS.md`。

---

## 1. 今天的顺序（照着做，不要跳）

```text
第 1 步  确认环境（5 分钟）
第 2 步  创建 Next.js 项目（10 分钟）
第 3 步  把文档包复制进项目（5 分钟）
第 4 步  建 4 个“记忆文件”：AGENTS.md / README.md / SESSION_LOG.md / DECISIONS.md（15 分钟）
第 5 步  第一次 commit + push（10 分钟）
第 6 步  配置 Cline，做一次“只读测试”（15 分钟）
第 7 步  让 AI 做第一个真实任务：首页（60–90 分钟）
第 8 步  收工：lint、build、commit、push、PR、合并（30 分钟）
```

**第 2 步一定要在第 3 步之前。** `create-next-app` 要求目标文件夹是空的；先把文档复制进去，它会拒绝创建。

---

## 2. 第 1 步：确认环境

打开 VSCode，按 `` Ctrl + ` ``（反引号，Tab 键上方）打开集成终端。Windows 用 **PowerShell**，macOS 用 **zsh**。

分别输入：

```bash
# 看 Node.js 版本（要 20 以上，推荐 22）
node -v

# 看 npm 版本（Node 自带）
npm -v

# 看 Git 版本（能输出版本号就说明装好了）
git --version
```

应该看到类似：

```text
v22.x.x
10.x.x
git version 2.x.x
```

三条都有版本号才继续。任何一条报“找不到命令”：

- Windows：关掉 VSCode 重开；还不行，回到 **00** 重装 Node，安装时勾选 **Add to PATH**。
- macOS：关掉 Terminal/VSCode 重开；还不行，回到 **00** 用 `.pkg` 重装 Node。

再确认 Git 身份（**00 已经配过，这里只复核，不要重复设置**）：

```bash
# 查这台电脑上 Git 记的名字（只查，不改）
git config --global user.name

# 查 Git 记的邮箱（只查，不改）
git config --global user.email
```

应该分别输出：

| 谁 | user.name | user.email |
|---|---|---|
| 女孩 | `xGlaciesx` | `lisa.lrx@qq.com` |
| 男孩 | `ziangzhang07` | `1248696312@qq.com` |

如果输出为空或不对，回到 **00**：女孩看“第 3 步：配置 Git 身份（Windows，女孩）”，男孩看“第 2 步：配置 Git 身份（macOS，男孩）”。不要在这里重新发明一套值，否则提交作者会一会儿一个名字。

---

## 3. 第 2 步：创建项目

> **先看这一句，避免重复建项目：**
> - 女孩如果已经按 **00 女孩第 4 步**跑过 `create-next-app`，项目已经存在，**直接跳到 §3.3 确认能跑**，不要重复执行 §3.1–3.2；
> - 男孩如果已经按 **00 男孩第 4 步**（macOS）`git clone` 过，也**直接跳到 §3.3**；`create-next-app` 只给“还没建过项目”的人用。
> - 重复跑 `create-next-app` 会多套一层 `body-prism/body-prism/`，后面所有路径都会对不上。

### 3.1 先建一个放项目的文件夹（仅没建过项目的人）

Windows（女孩）：

```powershell
# 回到用户主目录（C:\Users\你的用户名）
cd $env:USERPROFILE

# 新建 Projects 文件夹（-Force：已存在也不报错）
New-Item -ItemType Directory -Force -Path Projects | Out-Null

# 进入 Projects
cd Projects
```

macOS（男孩）：

```bash
# 回到用户主目录
cd ~

# 新建 Projects 文件夹（已存在也不会报错）
mkdir -p Projects

# 进入 Projects
cd Projects
```

`Projects` 以后就专门放代码，不要放在桌面或下载文件夹里——路径里有中文、空格、OneDrive 同步，后面都容易出怪问题。

### 3.2 生成 Next.js 项目（仅没建过项目的人）

**两个系统同一条命令，必须是一整行：**

```bash
# 用官方脚手架生成 Next.js 项目，参数含义见下表
npx create-next-app@latest body-prism --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

如果它仍然逐项提问，按这张表回答：

| 问题 | 选什么 | 为什么 |
|---|---|---|
| Would you like to use TypeScript? | **Yes** | 本项目全程 TS |
| Would you like to use ESLint? | **Yes** | 提前发现低级错误 |
| Would you like to use Tailwind CSS? | **Yes** | 页面全靠它 |
| Would you like your code inside a `src/` directory? | **Yes** | 和文档里的目录一致 |
| Would you like to use App Router? | **Yes** | 本项目只用 App Router |
| Would you like to use Turbopack for `next dev`? | **Yes**（如果报错就选 No） | 开发时更快；不稳定就退回 |
| Would you like to customize the import alias? | **No** | 保持 `@/*` |

看到 `Success! Created body-prism` 就成功了。

### 3.3 跑起来

```bash
# 进入刚创建的项目
cd body-prism

# 启动开发服务器；改代码会自动刷新
npm run dev
```

终端出现：

```text
▲ Next.js ...
- Local: http://localhost:3000
```

按住 `Ctrl`（macOS 是 `Command`）点这个链接，或自己在浏览器输入 `http://localhost:3000`。应该看到 Next.js 的默认欢迎页。

看到页面后，回到终端按 `Ctrl + C` 停止。**以后每次改完代码，`npm run dev` 保持开着，浏览器会自动刷新。**

> 如果 3000 端口被占用：先确认没有另一个终端还在跑 `npm run dev`。确实没有，就用 `npm run dev -- -p 3001`，浏览器改开 `http://localhost:3001`。

### 3.4 确认 Git 状态

`create-next-app` 通常已经帮你执行了 `git init` 并做了第一个 commit。输入：

```bash
# 看当前在哪个分支、有没有未提交的改动
git status

# 看最近 3 条提交（每条一行，方便确认脚手架有没有自动提交）
git log --oneline -3
```

- 如果看到 `On branch main` 和至少一条 commit：很好，跳到第 4 步。
- 如果看到 `not a git repository`：执行下面四行。

```bash
# 把当前文件夹初始化成 Git 仓库（只需第一次）
git init

# 把所有文件放进待提交区
git add .

# 存成第一个存档点
git commit -m "chore: scaffold Next.js app"

# 把当前分支改名为 main（Git 默认可能是 master）
git branch -M main
```

> 不要在这时 `git add` 任何 `.env.local`。现在还没有这个文件，后面也不提交。

---

## 4. 第 3 步：把文档包复制进项目

### 4.1 先解压，放在项目外面

把 `body-prism-docs.zip` 解压到：

- Windows：`C:\Users\<你>\Downloads\body-prism-docs\`
- macOS：`~/Downloads/body-prism-docs/`

解压后应该能看到 `00-start-here.md` 到 `16-mvp-implementation.md`，以及对应的 `.html`。

### 4.2 项目里到底该放什么？

先记住一个原则：

> **项目仓库只放“代码 + 团队协作需要的文本 + 配置模板”。安装包、视频课、教材 PDF、截图、zip 原包，都不要放进去。**

| 类别 | 具体东西 | 放不放 |
|---|---|---|
| **必须放** | `src/`、`public/`、`package.json`、`package-lock.json`、`tsconfig.json`、`next.config.*`、ESLint 配置 | ✅ 代码本体 |
| **必须放** | `AGENTS.md`、`README.md`、`.env.example`、`.gitignore`、`ATTRIBUTION.md` | ✅ 团队和 AI 的说明书 |
| **必须放** | `.github/workflows/ci.yml` | ✅ 自动检查配置 |
| **必须放** | `docs/SESSION_LOG.md`、`docs/DECISIONS.md` | ✅ 每天的进度和决定 |
| **建议放** | `00`–`16` 的 **`.md`**，放进 `docs/team-handbook/` | ✅ AI 能读、能搜索、新人能看 |
| **可以不放** | 对应的 `.html`（约 500KB） | ⭕ 只是给人看的排版版，放在 Downloads 里双击看即可 |
| **可以不放** | 文档包自带的 `README.md`（文档索引）、`build_docs.py`、`build_index.py`、`__pycache__/` | ❌ 文档包自己的工具，项目里用不到；项目自己的 `README.md` 在第 5 步另写 |
| **绝对不放** | `node_modules/`、`.next/`、`.env.local`、任何 Key/密码 | ❌ 仓库会爆炸或泄密 |
| **绝对不放** | Node/VSCode 安装包、课程视频、教材 PDF、PSD/OBJ 原文件、zip 原包 | ❌ Git 不适合大二进制文件 |

所以回答你的问题：

- **不是把所有文件都拷过去。** 生产代码当然要进项目，但学习资料不必全进。
- **配置环境的东西不需要放进项目。** Node、VSCode、Cline 是装在电脑上的软件；项目里只放 `.env.example` 这种“变量名模板”，真实值放本机 `.env.local`，永不提交。
- **学习资料只放 `.md` 文本**，因为 AI 能读、Git 合并也轻松；HTML、视频、PDF 留在项目外。
- **是复制文件，不是把整个解压文件夹拖进去。** 正确做法是新建 `docs/team-handbook/`，把 17 个 `.md` 复制进去。直接把 `body-prism-docs` 文件夹拖进项目，会出现 `body-prism/body-prism-docs/body-prism-docs/...` 这种套娃路径。

如果你确实想整个文件夹放进去，也可以：把解压后的文件夹移动到 `docs/` 下，改名为 `team-handbook`，然后删掉里面的 `build_*.py` 和 `__pycache__`。但第一天不推荐，容易多一层目录。

### 4.3 复制命令（只复制 `.md`）

Windows（女孩）——在 **项目根目录** 打开 PowerShell：

```powershell
# 进入项目根目录
cd $env:USERPROFILE\Projects\body-prism

# 新建存放团队手册的文件夹（-Force 表示已存在也不报错）
New-Item -ItemType Directory -Force -Path docs\team-handbook | Out-Null

# 复制 00–09 的 Markdown
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs\0*.md" docs\team-handbook\

# 复制 10–16 的 Markdown
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs\1*.md" docs\team-handbook\
```

macOS（男孩）：

```bash
# 进入项目根目录
cd ~/Projects/body-prism

# 新建存放团队手册的文件夹（已存在也不报错）
mkdir -p docs/team-handbook

# 复制 00–09 的 Markdown
cp ~/Downloads/body-prism-docs/0*.md docs/team-handbook/

# 复制 10–16 的 Markdown
cp ~/Downloads/body-prism-docs/1*.md docs/team-handbook/
```

### 4.4 验证

```bash
# 列出文件夹内容，数一下是不是 17 个 .md
ls docs/team-handbook
```

Windows PowerShell 也可以用 `Get-ChildItem docs\team-handbook`。

应该看到 **17 个 `.md`**（`00` 到 `16`），没有 `.html`、没有 `build_*.py`。想读排版版时，回到 Downloads 里双击 `body-prism-docs/index.html` 即可。

> 这 17 份 `.md` 会进入 public 仓库，这是故意的：比赛要求能看见协作过程，团队手册也是项目的一部分。里面**没有密钥**，可以公开。

---

## 5. 第 4 步：建 4 个“记忆文件”

AI 每次新对话都会失忆。你要用文件替它记住：

| 文件 | 作用 | 谁更新 |
|---|---|---|
| `AGENTS.md` | 长期规则：技术栈、禁区、终端差异 | 两人，很少改 |
| `README.md` | 项目是什么、怎么启动 | 女孩主写 |
| `docs/SESSION_LOG.md` | 每天做到哪、明天第一件事 | 每天收工由 AI 起草 |
| `docs/DECISIONS.md` | 已经拍板的决定，防止反复摇摆 | 每次做决定时追加 |

### 5.1 `AGENTS.md`（项目根目录，直接复制）

在项目根目录新建 `AGENTS.md`，粘贴：

```md
# Body Prism 项目规则

## 项目
人体棱镜 Body Prism：AI 驱动的身体信息三镜图谱。
三种读法：结构之镜、关系之镜、信息之镜。
目标：2026 传智杯 AI WEB 网页开发挑战赛。
团队：2 人，大一新生。

## 技术栈
- Next.js App Router + TypeScript strict
- Tailwind CSS + shadcn/ui
- React Three Fiber + three.js（第二阶段才装）
- Vercel AI SDK（第二阶段才装）
- Zod
- npm

## 终端
- 两台开发机：Windows 11 + Windows PowerShell 5.1（女孩），macOS 27 Golden Gate + zsh（男孩）。
- Windows PowerShell 5.1 不支持 `&&`；需要连续执行时，一次只给一条命令。
- 不要默认给 `tail`、`head`、`sed`、`awk`、`grep`；必须用时同时给 PowerShell 等价写法。
- 路径统一用 `/`；Windows 绝对路径用 `$env:USERPROFILE`。
- 不执行 `rm -rf`、`git reset --hard`、`git push --force`；要删除先说明影响。
- 不读取、不打印 `.env.local` 或任何环境变量。

## 目录
- src/app：页面与路由
- src/components：组件
- src/content/organs：器官内容（先本地 TS 文件）
- src/lib：schema、内容读取、工具函数
- public：图片、模型
- docs：团队手册、日志、决策

## 编码规则
- 默认 Server Component；只有需要状态、事件、浏览器 API、3D 时才写 `"use client"`。
- 不擅自新增依赖；先说明理由和替代方案，等确认。
- 所有外部输入用 Zod 校验。
- 不用 `any`；未知类型用 `unknown` 再收窄。
- 文件名、变量名用英文；面向用户的中文放内容文件或常量里。
- 样式用 Tailwind；不在组件里写大段 CSS。
- 每个页面要有 loading、empty、error 三态。

## AI 规则
- 所有模型调用放在服务端（route handler 或 server action）。
- 密钥只从 `process.env` 读取；不打印；不写进前端。
- 模型输出必须符合 schema；解析失败要有回退。
- 回答必须带 claim/source 引用；没有来源就明说“知识库暂无可靠来源”。
- 不做诊断、不开药、不给剂量；遇到急症红旗先建议就医。
- 中医内容标“传统理论”；信息论内容标“概念类比”。
- 不把假说写成共识；证据等级 A/B/C/D 要标清楚。

## Git
- 不直接 push main；开分支 + PR。
- commit 类型：feat / fix / docs / content / art / test / chore。
- 提交前跑 `npm run lint` 和 `npm run build`。
- 不提交 `.env.local`、`node_modules`、`.next`、原始 OBJ/PSD/Procreate 文件。
- 不对 main 使用 `git push --force`。

## 会话协议
- 用户说 `start` / `开始`：
  1. 读 AGENTS.md、README.md、docs/SESSION_LOG.md 最后 3 条；
  2. 运行 `git status` 和 `git branch --show-current`；
  3. 用 5 行以内复述：当前分支、上次做到哪、今天目标；
  4. 给不超过 3 步的计划，等用户确认后再改代码。
- 用户说 `stop` / `今天结束`：
  1. 停止新功能；
  2. 更新 docs/SESSION_LOG.md（做了什么、改了哪些文件、没做完什么、明天第一件事）；
  3. 建议 commit message，但不自动 commit / push；
  4. 提醒用户分别运行 `npm run lint` 和 `npm run build`。
- 用户说 `plan` / `讨论明天`：
  - 只讨论，不改文件；输出明天的 3 件事和风险。
- 记忆分三层：AGENTS.md（长期规则）、docs/DECISIONS.md（已定决策）、docs/SESSION_LOG.md（每天进展）。
- 不把密钥、隐私、患者信息写进任何记忆文件。

## 给 AI 的回答要求
- 改代码前先给计划：要改哪些文件、为什么、风险是什么。
- 一次只做一个功能。
- 改完解释关键代码，假设读者是大一新生。
- 不确定就问，不要编 API、字段、医学结论。
- 不要为了让代码跑起来而删除测试或吞掉错误。
```

> 这份是**精简版**，够用到第一周结束。开始做登录、数据库、后台时，用 **01 §6** 的完整版替换它（多出数据库、权限、后台、医学内容几节）。

### 5.2 `README.md`（项目根目录，覆盖默认的）

`create-next-app` 生成的 README 全是英文模板，直接换成（外层用四个反引号，你复制中间的内容即可）：

````md
# 人体棱镜 Body Prism

同一具身体，三种读法：结构之镜、关系之镜、信息之镜。

## 本地启动

先运行 `npm install`，再运行 `npm run dev`，打开 http://localhost:3000。

## 常用命令

- `npm run lint`
- `npm run build`

## 目录

- `src/app`：页面
- `src/components`：组件
- `src/content/organs`：器官内容
- `docs/team-handbook`：团队手册
- `docs/SESSION_LOG.md`：每日进展
- `docs/DECISIONS.md`：已定决策

## 内容边界

本项目用于健康科普与竞赛展示，不提供诊断、处方或剂量建议。
中医内容标注“传统理论”，信息论内容标注“概念类比”。

## 素材许可

见 `ATTRIBUTION.md`。
````

### 5.3 `docs/SESSION_LOG.md`

新建，先写第一条：

```md
# 开发日志

## 2026-10-21 · 女孩 · feat/home-hero

**今天完成**
- 创建 Next.js 项目并跑通
- 复制团队手册到 docs/team-handbook
- 建立 AGENTS.md / README / 日志 / 决策文件

**改了哪些文件**
- 项目脚手架、docs/、AGENTS.md、README.md

**没做完**
- 首页还没开始

**明天第一件事**
- 用 Cline 做首页 hero 和三镜卡片

**阻塞 / 需要对方**
- 男孩确认三个镜的一句话文案
```

日期、名字、分支名改成自己的。以后每天让 AI 在 `stop` 时追加一条，不要覆盖旧记录。

### 5.4 `docs/DECISIONS.md`

```md
# 已定决策

> 只记“已经拍板、以后不再反复讨论”的事。每条写：决定、原因、日期。

## D-001 首页先做静态，不做 3D
- 日期：2026-10-21
- 原因：3D 风险高，先把页面和信息架构跑通；3D 放到第二个纵切面。
```

### 5.5 `.env.example`

现在还没有密钥，但先把“需要哪些变量”写下来，防止以后忘：

```text
# 复制为 .env.local 后填真实值；.env.local 永远不提交
DEEPSEEK_APP_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

> `SUPABASE_SERVICE_ROLE_KEY` 只能在服务端使用，绝不要加 `NEXT_PUBLIC_` 前缀。

### 5.6 确认 `.gitignore`

打开项目根目录的 `.gitignore`，确认至少有：

```text
node_modules/
.next/
.env
.env.local
.env*.local
*.log
.DS_Store
```

`create-next-app` 一般已经包含前几项。没有就补上。

---

## 6. 第 5 步：把文档和记忆文件提交并推到 GitHub

> **这一节和 00 有重叠，先分清：**
> - **00 女孩第 6 步**已经做过“建空仓库 + 第一次 push 脚手架”；
> - **本节**做的是“复制完团队手册、建好 AGENTS.md 之后的第二次提交”；
> - 所以女孩**不要**再执行 `git remote add origin`（会报 `remote origin already exists`），直接跑 `git status / git add / git commit / git push`；
> - 男孩如果已按 **00 男孩第 4 步**克隆过，**不要**再 `git clone`，否则会多一层文件夹；直接 `cd` 进项目。

### 6.1 女孩：提交团队手册和记忆文件

如果 **00 女孩第 6 步**已经建过 `body-prism` 仓库并 push 过，跳过“建仓库”和 `git remote add`；只做下面的提交与 push。还没建过的人，才需要先在 GitHub 网页建 **public** 仓库（不要勾 README / .gitignore / license）。

然后：

```bash
# 看当前分支和未提交的改动
git status

# 把所有改动放进待提交区
git add .

# 关键：再看一眼，确认没有 .env.local / node_modules / .next
git status
```

**第二次 `git status` 一定要看**：确认列表里没有 `.env.local`、没有 `node_modules/`、没有 `.next/`。有，就停下来检查 `.gitignore`。

确认后：

```bash
# 先以当前 main 为起点新建分支并切换过去（改动会跟着过去）
git switch -c chore/team-handbook

# 在分支上存一个提交：团队手册 + 记忆文件
git commit -m "chore: add team handbook and agent memory files"

# 第一次推送这条分支，-u 让本地分支记住远程分支
git push -u origin chore/team-handbook
```

> 注意顺序：**先建分支再 commit**。如果先 commit，提交会落在本地 `main` 上，之后同步时会多一步处理。

> **为什么不直接推 main？** 00 已经给 main 开了保护，直接 `git push origin main` 会被拒绝。推分支、开 PR、男孩 Approve、再 Squash and merge——流程和 00 第 3 章「第 8 步」（8.1–8.5）完全一样，照那个走一遍即可。

**只有还没做 00 女孩第 6 步的人**，才需要先补建仓库和远程地址：

```bash
# 给 GitHub 上的空仓库起别名 origin（只需一次）
git remote add origin git@github.com:xGlaciesx/body-prism.git

# 第一次推送 main，并建立跟踪关系
git push -u origin main
```

如果 `remote origin already exists`，说明已经加过，不要重复 `add`，改用：

```bash
# 不新增，只改 origin 的地址
git remote set-url origin git@github.com:xGlaciesx/body-prism.git

# 查看确认
git remote -v
```

### 6.2 男孩：同步到最新代码

**已经按 00 男孩第 4 步克隆过的人，跳过 `git clone`**，直接：

```bash
# 进入已有的项目文件夹（00 克隆下来的那个）
cd ~/Projects/body-prism

# 切回 main，并拉下女孩刚合并的提交
git switch main
git pull

# 依赖有更新时才需要重新跑；第一次必须跑
npm install

# 启动本地开发服务器，浏览器打开 http://localhost:3000
npm run dev
```

**还没克隆过的人**，先补这一步：

```bash
# 回到放项目的上级目录
cd ~/Projects

# 把 GitHub 上的仓库整个下载到本地（第一次用 clone，之后用 pull）
git clone git@github.com:xGlaciesx/body-prism.git

# 进入刚下载下来的项目文件夹
cd body-prism
```

看到首页就成功。**不要**再跑 `create-next-app`，否则会多出一层嵌套文件夹。

### 6.3 两个人都要确认

```bash
# 看最近 3 条提交，确认历史在
git log --oneline -3

# 看远程地址，确认 origin 指向 GitHub
git remote -v
```

`git remote -v` 应该看到 `origin` 指向 `github.com`。如果看到的是 `https://...` 也可以，只是每次 push 可能要输令牌。

---

## 7. 第 6 步：配置 Cline，先做“只读测试”

### 7.1 安装与配置

1. VSCode 左侧点扩展图标（四个方块），搜索 **Cline**，认准作者是 Cline 团队，安装；
2. 点 Cline 图标打开侧栏 → 齿轮 **Settings**；
3. 按 **01 §2** 填：Provider 选 `DeepSeek`（没有就选 `OpenAI Compatible`，Base URL `https://api.deepseek.com/v1`），Model `deepseek-chat`，Key 用自己的 `DEEPSEEK_DEV_KEY`；
4. **关闭** Terminal auto-approve、File write auto-approve、Browser auto-approve。

> 不要同时装 Cline 和 Roo Code，两个 Agent 会互相抢文件。

### 7.2 第一条消息：只读，不改代码

在 Cline 输入框里粘贴：

```text
start

先不要改任何代码。请阅读：
- AGENTS.md
- README.md
- package.json
- src/app/page.tsx
- src/app/layout.tsx
- src/app/globals.css
- docs/SESSION_LOG.md 最后 3 条

然后用大一新生能懂的话回答：
1. 这个项目怎么启动；
2. 页面入口在哪个文件；
3. Tailwind 是怎么生效的；
4. 如果我要把首页标题改成“人体棱镜 Body Prism”，最少要改哪个文件；
5. 当前分支是什么，工作区是否干净。

最后给我一个不超过 3 步的计划，等我回复“可以”再动手。
```

### 7.3 怎么判断它靠不靠谱

合格的回答应该：

- 说得出 `npm run dev` 和 `http://localhost:3000`；
- 指出 `src/app/page.tsx` 是首页；
- 说 Tailwind 通过 `globals.css` 里的 `@import "tailwindcss"`（或 `@tailwind` 指令）和 `layout.tsx` 引入生效；
- 明确指出“只改标题只需改 `page.tsx`”；
- 主动说“我先不改代码，等你确认”。

如果它一上来就改文件、装依赖、删东西：

1. 立刻点 Cline 的 **Cancel**；
2. 终端执行 `git status`，如果有改动，`git restore .`；
3. 把任务说得更小，再试一次。

> Cline 是副驾驶，不是代驾。它给的每个命令，你都要看懂“这条命令会改什么”。

---

## 8. 第 7 步：让 AI 做第一个真实任务——首页

### 8.1 先明确“做完什么样”

只做一屏，不接 3D、不接 AI、不用图片：

- 顶部一行小字：`2026 传智杯 · AI WEB`
- 主标题：`人体棱镜`
- 副标题：`同一具身体，三种读法`
- 一句说明：`把结构、关系与信息放在同一具身体上对照阅读。`
- 三张卡片：`结构之镜`、`关系之镜`、`信息之镜`，每张一句 20 字以内的说明
- 一个按钮：`开始探索`，先链接到 `/explore`（这个页面可以暂时是空白占位）
- 底部一行：`健康科普与竞赛展示，不提供诊断或处方建议。`

视觉要求：暖白纸感背景、深色正文、暗红色强调、标题用衬线字体（系统自带即可）、手机上一列、桌面三列。

### 8.2 给 Cline 的提示词（整段复制）

```text
现在做第一个真实任务：只改首页，不安装任何依赖。

目标：把 src/app/page.tsx 改成“人体棱镜”的静态首页。
要求：
1. 只改 src/app/page.tsx；如果确实需要，可以新增 src/components/lens-card.tsx，但不要改 layout.tsx、globals.css、package.json。
2. 不安装依赖，不引入图片，不写 3D，不调用 AI，不连接数据库。
3. 文案：
   - 顶部小字：2026 传智杯 · AI WEB
   - 主标题：人体棱镜
   - 副标题：同一具身体，三种读法
   - 说明：把结构、关系与信息放在同一具身体上对照阅读。
   - 三张卡片：结构之镜 / 关系之镜 / 信息之镜，各配一句不超过 20 字的说明
   - 按钮：开始探索，链接到 /explore
   - 底部：健康科普与竞赛展示，不提供诊断或处方建议。
4. 样式：
   - 用 Tailwind，不要写大段自定义 CSS；
   - 暖白背景 #f7f2e8 附近，深色正文，暗红色 #a6474f 作强调；
   - 标题用衬线字体（font-serif 即可）；
   - 桌面三列，手机一列；
   - 尊重 prefers-reduced-motion，不要做花哨动画。
5. 可访问性：标题层级正确；按钮是真链接；颜色对比度够；不要只用颜色表达信息。

先给我：
- 要改哪些文件；
- 页面结构（用 10 行以内的伪代码）；
- 你认为可能出错的地方。
等我回复“可以”再改。
```

它给计划后，回复：

```text
可以，开始。一次只改一个文件，改完告诉我改了哪里。
```

### 8.3 改完怎么验收

1. 终端 `npm run dev`，浏览器看 `http://localhost:3000`；
2. 把窗口拖窄到手机宽度（或用开发者工具 `Ctrl + Shift + M` / `Cmd + Shift + M`），确认三列变一列；
3. 点“开始探索”，如果 404，是正常的——`/explore` 还没建；但链接不能是 `#`；
4. 终端另开一个标签，运行 `npm run lint`，必须 0 error；
5. `npm run build`，必须成功；
6. 看 `git status`，确认只改了预期文件。

> 如果 `npm run build` 报错，把**完整报错**贴给 Cline，并加一句：“只修这个错误，不要顺手改别的文件。”

### 8.4 觉得不好看怎么办

不要让它“整体再好看一点”，这种指令会让它大改。改成具体的一条：

```text
只调整标题和副标题的间距：主标题和副标题之间再紧一点，副标题和说明之间再松一点。
不要改颜色、字体、布局和文案。
```

一次只调一个维度：间距 → 字号 → 颜色 → 圆角。每调一次，看一次浏览器。

---

## 9. 第 8 步：收工，把首页合并进 main

### 9.1 先建分支，再写代码

`main` 已经被保护，**不能直接 push**。所以第 7 步让 Cline 改代码之前，就应该先建分支：

```bash
# 从当前 main 切出一条新分支，并立刻切换过去
git switch -c feat/home-hero
```

如果你已经忘了、已经在 main 上提交了，也别慌，提交还在本地、没推上去：

```bash
# 以当前提交为起点新建分支并切换过去（刚才的提交会跟着过来）
git switch -c feat/home-hero

# 把本地 main 指针退回 GitHub 上 main 的位置；提交已安全地在 feat 分支上
git branch -f main origin/main
```

然后正常提交：

```bash
# 看改了哪些文件
git status

# 只把首页文件放进待提交区
git add src/app/page.tsx

# 存一个提交
git commit -m "feat(home): add static hero and three lens cards"
```

> 从今天起，**每天开工第一件事就是建分支**，不要在 main 上改。完整节奏见 **15**。

### 9.2 收工前检查

```bash
# 代码检查：必须 0 error
npm run lint

# 生产构建：必须成功
npm run build

# 确认工作区干净、没有漏提交的文件
git status

# 对比本分支和 main 的差异，确认只改了预期文件
git diff --stat main...HEAD
```

- lint / build 必须过；
- `git status` 必须是 `nothing to commit, working tree clean`；
- `git diff --stat` 只应出现你预期的文件。

### 9.3 推到 GitHub

第一次推这个分支：

```bash
# 把本地 feat/home-hero 上传到 GitHub（-u 记住对应关系，只需第一次）
git push -u origin feat/home-hero
```

以后同一个分支再推，只要：

```bash
# 上传当前分支的新提交（因为已经用 -u 关联过）
git push
```

### 9.4 开 PR 并合并

详细图文步骤见 **00 第 3 章「第 8 步」下的 8.1–8.5**，这里只列顺序：

1. 打开 GitHub 仓库网页，点黄色条 **Compare & pull request**；没有黄色条就点 **Pull requests → New pull request**，base 选 `main`、compare 选 `feat/home-hero`；
2. 标题：`feat(home): add static hero and three lens cards`；
3. 描述写三行：做了什么、怎么验证、截图（可选）；
4. 右侧 **Reviewers** 选男孩；
5. 点 **Create pull request**；
6. 看 PR 页面底部的 **Checks**：黄色 = 还在跑，绿色 = 过了，红色 = 点 **Details** 看日志；
7. 等男孩点 **Approve**（GitHub 不允许作者批准自己的 PR，女孩不能自己批）；
8. **CI 绿 + 已 Approve** 后，点 **Squash and merge** → **Confirm squash and merge**；
9. 点 **Delete branch**（删除的是 GitHub 上的远端分支）。

> 男孩不在线时，**不要关掉保护硬合**；PR 先开着，等他 Approve。比赛期间可以约定每天固定两个时间互相 review。

### 9.5 回到本地，同步 main

```bash
# 切回主干 main
git switch main

# 从 GitHub 下载并合并 main 的最新内容（含刚合并的 PR）
git pull origin main

# 删除本地的 feat/home-hero 分支（已合并才能删）
git branch -d feat/home-hero
```

如果 `git branch -d` 提示 “not fully merged”，是因为 squash merge 后 Git 看不到原来的提交。**确认 PR 已经合并**后，用：

```bash
# 强制删除本地分支（大写 -D；只在确认 PR 已合并时用）
git branch -D feat/home-hero
```

最后确认：

```bash
# 看最近 5 条提交，应该能看到 squash 后的那条
git log --oneline -5

# 列出本地分支，应该只剩 main（带 * 的是当前分支）
git branch
```

应该看到 `main` 上有你的 squash 提交，本地只剩 `main`。

### 9.6 让 AI 写今天的日志

对 Cline 说：

```text
stop
```

它会读今天的改动，起草 `docs/SESSION_LOG.md`。你看一遍，改成真实情况，然后走分支提交：

```bash
# 从 main 切出文档分支
git switch -c docs/session-log

# 只把日志文件放进待提交区
git add docs/SESSION_LOG.md

# 存一个提交
git commit -m "docs: update session log for day 1"

# 上传分支
git push -u origin docs/session-log
```

然后到 GitHub 网页：**Compare & pull request → Create pull request → Squash and merge → Delete branch**，再回到本地：

```bash
# 切回 main
git switch main

# 拉取刚合并的日志
git pull origin main

# 删除已合并的本地文档分支
git branch -d docs/session-log
```

> 日志能直接推 main 吗？**不能**——main 已保护，GitHub 会拒绝。所有改动（包括文档）都走分支 + PR。

---

## 10. 今天结束时，你应该拥有

- [ ] `http://localhost:3000` 显示“人体棱镜 / 同一具身体，三种读法”；
- [ ] 三张镜片卡片，手机宽度下变一列；
- [ ] `npm run lint` 和 `npm run build` 都通过；
- [ ] 项目里有 `AGENTS.md`、`README.md`、`docs/SESSION_LOG.md`、`docs/DECISIONS.md`、`.env.example`；
- [ ] `docs/team-handbook/` 里有 00–16 共 17 份 `.md` 文档；
- [ ] GitHub `main` 上有至少 3 条提交：脚手架、团队手册、首页；
- [ ] 至少完成过 1 个 PR，并且分支已删除；
- [ ] 男孩的电脑上 `git clone` + `npm install` + `npm run dev` 也能看到同一个首页。

**只要这 8 条都打勾，第一天就是成功的。** 不要因为“首页还不够惊艳”继续熬夜改；明天再迭代。

---

## 11. 第一天最容易卡住的 12 个地方

| 现象 | 原因 | 怎么办 |
|---|---|---|
| `create-next-app` 说目录非空 | 先把文档复制进去了 | 换一个空目录重新跑，或把文档先移走 |
| `npx.ps1 cannot be loaded` | PowerShell 执行策略 | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`，输 `Y` |
| `node` 找不到 | PATH 没生效 | 关掉 VSCode / 终端重开；还不行重装 Node |
| `npm install` 很慢 | 默认源在境外 | `npm config set registry https://registry.npmmirror.com`，然后重跑 |
| `EADDRINUSE: 3000` | 端口被占 | 关掉另一个 dev server，或 `npm run dev -- -p 3001` |
| `'&&' is not a valid statement separator` | PowerShell 5.1 不支持 | 拆成两行，一条一条跑 |
| Cline 连不上模型 | Base URL / Key / 模型名错 | 按 01 §2 重填；确认 Key 没空格 |
| Cline 一次改 10 个文件 | 任务太大 | Cancel → `git restore .` → 把任务缩到“只改一个文件” |
| 页面白屏 | 运行时错误 | 看终端和浏览器 Console 的第一条红字，整段贴给 Cline |
| `useState` 报错 | 在 Server Component 里用了 Hook | 让 Cline 在文件第一行加 `"use client"`，或把交互拆成子组件 |
| `npm run build` 过不了 | 类型 / ESLint 错误 | 先修第一条，不要一次修十条 |
| 推送被拒 `failed to push some refs` | 远端有你没有的提交 | `git pull origin main` 后再推；不要 force |

---

## 12. 一句话记住今天

> **先让一个页面真的在浏览器里跑起来，再谈 3D 和 AI。**
> 今天的目标不是“做完产品”，是“打通一条从想法到 main 的完整路径”：改代码 → 本地验证 → 提交 → PR → 合并。

明天开始，按 **15 每天的 Git 节奏** 走；要写第二个页面，按 **16 MVP 开发实施手册** 的纵切面顺序做。
