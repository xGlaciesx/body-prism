# 主线手册：从零到第一次合并（GitHub 主库）

> 项目：人体棱镜 Body Prism——AI 驱动的身体信息三镜图谱。
> 读者：两个大一新生（女孩 Windows 11 / PowerShell，男孩 macOS 27 / zsh），第一次做完整 Web 项目。
> **这份文档是唯一操作主线**：从装环境到第一次 PR 合并，按真实开发顺序排好。照着从上往下做即可。
> 其他文档是这条主线上的**参考页**：卡住、想深入、要排错时再点开。

---

## 0. 这份文档怎么用

三条规则：

1. **只照“主线步骤”做。** 每一步都有命令和 ✅ 验收点；验收没过，不要往下走。
2. **看到「深入」或链接再点。** 那是可选的解释或排错，不影响主线继续。
3. **不要同时开两条线。** 如果你已经照旧版 00 / 02 / 14 做过一部分，先看 §3.3 对齐状态，再继续。

主线一共 12 步：

| # | 谁做 | 做什么 | 做完的标志 |
|---|---|---|---|
| 1 | 两人 | 定主库：GitHub（§2） | 一句话决定 |
| 2 | 女孩 | 建 GitHub 仓库（§3） | GitHub 上能看到仓库 |
| 3 | 女孩 | 把男孩加成 Write 协作者（§4） | 男孩能 push 分支 |
| 4 | 两人 | 装 Node / Git / VSCode / Cline（§5） | `node -v`、`git --version` 有输出 |
| 5 | 两人 | 配 Git 身份、连上 GitHub（§6） | `git config --global user.name` 正确 |
| 6 | 女孩 | 建 Next.js 项目，第一次提交并推到 GitHub（§7） | GitHub 上有脚手架代码 |
| 7 | 男孩 | 克隆、装依赖、跑起来（§8） | 两人都能开 `localhost:3000` |
| 8 | 女孩 | 保护 `main`（§9） | 直接 push main 被拒绝 |
| 9 | 两人 | 本地 lint / build 过关（§10） | 两条命令都成功 |
| 10 | 女孩 | 开第一个 PR，男孩合并（§11） | `main` 上多一条合并记录 |
| 11 | 两人 | 学会每天 20 分钟的节奏（§12） | 第二天能独立走一遍 |
| 12 | 女孩 | 配 Gitee 镜像（可选，§13） | Gitee 上能看到同一份代码 |

预计：第一次走完 **3–5 小时**（不含装软件下载时间）。拆成两天也正常。

---

## 1. 先认清两台电脑：命令不能混抄

| 项目 | 女孩（Windows 11） | 男孩（macOS 27） |
|---|---|---|
| 终端 | 开始菜单搜 **Windows PowerShell** | 启动台搜 **Terminal**（默认 zsh） |
| 家目录 | `C:\Users\<用户名>` | `/Users/<用户名>` |
| 进家目录 | `cd $env:USERPROFILE` | `cd ~` |
| 建目录 | `New-Item -ItemType Directory Projects` | `mkdir Projects` |
| 看文件 | `Get-ChildItem`（`ls` 也能用） | `ls` |
| 看文本 | `Get-Content 文件` | `cat 文件` |
| 一行多条命令 | 用 `;`，**不要用 `&&`** | `&&` 或 `;` |
| 复制 / 粘贴 | `Ctrl+C` / `Ctrl+V` | `Command+C` / `Command+V` |

四条硬规则：

1. **Windows PowerShell 5.1 不支持 `&&`。** 文档里凡是两条命令，Windows 都分两行跑。
2. **标了系统的块只给那个人抄。** 没标“Windows / macOS”的，两个系统一样。
3. **Git 里的路径统一用 `/`**，例如 `docs/medical-disclaimer.md`，Windows 也认。
4. **密钥只放 `.env.local`**，永远不要写进代码、不要提交。

### 1.1 先认 15 个词（30 秒版）

| 词 | 一句话 |
|---|---|
| 仓库 repository | 带时间机器的文件柜 |
| 本地 / 远程 | 你电脑上的副本 / GitHub 上的那份 |
| main | 主干，永远能演示 |
| branch 分支 | 从主干岔出来的工作台 |
| commit 提交 | 一次存档 |
| push | 上传 |
| pull | 下载并合并 |
| fetch | 只下载、不合并 |
| PR | “请把我的分支并进 main”的申请单 |
| merge | 合并 |
| review | 队友看一遍 |
| 保护 main | 主干上锁，只能走 PR |
| CI | 自动跑 lint + build 的质检员 |
| clone | 把远程仓库整个搬回家 |
| conflict 冲突 | 两人改同一行，Git 不敢替你决定 |

更多概念见 [08 Git 入门](08-git-primer.html)。

---

## 2. 第 1 步：定主库——GitHub 主，Gitee 做可选镜像

### 2.1 为什么必须有“一个主库”

代码必须有一个**主库**：每天 push、pull、开 PR 都以它为准。另一个只做**镜像**：定期推过去，留一个国内备份。

两个人同时维护两个“主库”，一定会出现“这边合了、那边没合”的分叉。所以只有一个 `origin`。

### 2.2 本项目当前的决定

> **GitHub 当 origin（主库）。** Gitee 暂时只当可选镜像；网络实在不稳时，再按 §13 手动同步，不做迁移。

| 维度 | GitHub（当前） | Gitee（备用镜像） |
|---|---|---|
| 日常操作 | 全部在这里 | 一周推一次 |
| 协作权限 | Write（见 §4 的真实情况） | 「开发者」，免费明确 |
| 强制 Approve | 可开，硬门禁 | 免费版弱 |
| CI | Actions，2000 分钟/月 | Gitee Go，可选 |
| 国内访问 | 可能超时 | 快 |

> 如果哪天 GitHub 完全打不开，先按 §13 把 Gitee 当临时备份；**真要换主库，再单独做一次迁移**，不要今天顺手改。

---

## 3. 第 2 步：建 GitHub 仓库

### 3.1 新建仓库

1. 右上角 `+` → **New repository**；
2. Repository name：`body-prism`；
3. 选 **Public**（比赛展示；也可以先 Private，后面再改）；
4. **不要**勾 “Add a README file”，**不要**选 `.gitignore` 和 license——本地已经有了；
5. 点 **Create repository**。

建完记下地址，形如：

```text
https://github.com/xGlaciesx/body-prism.git
```

### 3.2 如果仓库已经建过

直接跳到 §3.3 对齐状态。**不要重复建仓库、不要重复 `git remote add`。**

### 3.3 先确认你现在的状态

在**女孩的电脑**、项目根目录里执行：

```bash
# 看当前远程地址
git remote -v

# 看当前分支和改动
git status
```

三种结果：

| 看到什么 | 说明 | 下一步 |
|---|---|---|
| 没有输出 / `not a git repository` | 还没建项目或没初始化 | 去 §7 |
| `origin` 指向 `github.com` | 已经连上 GitHub | 去 §4 加人 |
| `origin` 指向别处，或有两个远程 | 之前折腾过 | 先只保留一个 GitHub `origin`，其余删掉或改名 |

✅ **验收**：`git remote -v` 里 `origin` 指向 `github.com/xGlaciesx/body-prism.git`（或 HTTPS 版本）。

---

## 4. 第 3 步：加合作者——把 Write 权限一次说清

### 4.1 邀请男孩

1. 用**建仓库的账号**打开 `https://github.com/xGlaciesx/body-prism` → **Settings**；
   - 看不到 Settings：当前登录的不是仓库管理员，先换账号；
2. 左侧 **Collaborators**（新版可能叫 **Collaborators and teams**）；
3. 点绿色 **Add people**；
4. 搜 **`ziangzhang07`**（GitHub 用户名，不是昵称、不是邮箱），点中他；
5. 点 **Add to repository** / **Send invitation**。

### 4.2 免费版到底有没有 Write

先把结论说清楚，避免在设置页里反复找：

| 仓库归属 | 免费版加 Write 的常见情况 |
|---|---|
| 个人账号 + 公开仓库 | 一般可以；"Add people" 弹窗可能不显示角色，默认加进来就是 Write |
| 个人账号 + 私有仓库 | 一般也可以，但界面上更容易只看到 `Read` |
| 组织账号（Organization） | **必须先把他加进组织**；免费组织对私有库、外部协作者限制更多，最容易出现“找不到 Write / 下拉是灰的” |

1. **GitHub 免费个人账号的公开仓库，通常是可以给队友 Write 的**；但新版界面在 “Add people” 弹窗里**不再提供角色下拉**，加进来默认就是 Write。所以“找不到 Write 选项”常见的原因是：它已经默认给了，或者你找错了位置。
2. 判断方法：**Settings → Collaborators**，看男孩那一行右侧的角色字样。
   - 写 `Write`：权限够了；
   - 写 `Read`：点那一行的角色下拉，改成 `Write`；
   - 下拉是灰的 / 提示升级 / 根本没有这个人：说明仓库在**组织**名下，或账号类型有限制。
3. **如果仓库属于组织**：免费组织要先把男孩加进组织（Organization → People → Invite），再给仓库权限。
4. **如果实测就是没有**（列表里只有 `Read`、下拉是灰的、或提示升级），**以你眼前看到的为准**，不要在设置页继续耗。用 §4.4 的 Fork 模式，任何免费账号都能协作。

> 角色名：`Read / Triage / Write / Maintain / Admin`。**Write** 才能 push 分支、开 PR；`Read` 只能看，push 会报 403。Settings 只有 Admin 能改，男孩不需要 Admin。

### 4.3 男孩接受邀请

男孩的 GitHub 邮箱 **1248696312@qq.com** 会收到邮件，或 GitHub 右上角有通知。点 **Accept invitation**。

女孩在 Collaborators 列表里看到状态从 **Pending invite** 变成 **Collaborator**，就说明接受成功。

### 4.4 验证权限真的生效

让男孩做一次“推一条空分支再删掉”的测试：

```bash
# 从 main 开一条测试分支
git switch main
git pull
git switch -c test/permission

# 推到 GitHub；成功就说明有写权限
git push -u origin test/permission
```

成功后在 GitHub 网页删掉这条分支（**Branches** 页面 → 垃圾桶图标），本地也删：

```bash
# 切回 main，删掉本地测试分支
git switch main
git branch -D test/permission
```

失败（403 / Permission denied）就回到 §4.2 检查角色，或走 §4.5。

### 4.5 兜底：Fork 模式（没有 Write 也能协作）

适用：男孩只有 Read 权限。原理：男孩把仓库“复制”一份到自己账号下，在自己的副本里随便推，然后向上游仓库发 PR。

**男孩：**

```bash
# 在 GitHub 网页打开女孩的仓库，点右上角 Fork，创建到自己的账号下
# 然后把“自己的 fork”克隆下来（注意用户名是 ziangzhang07）
cd ~/Projects
git clone https://github.com/ziangzhang07/body-prism.git

cd body-prism

# 把女孩的原始仓库加为 upstream，用来同步
git remote add upstream https://github.com/xGlaciesx/body-prism.git

# 确认 origin 是自己的 fork，upstream 是女孩的仓库
git remote -v
```

日常：

```bash
# 开分支、改代码
git switch -c feat/xxx

# 推到自己 fork（不需要任何特殊权限）
git push -u origin feat/xxx
```

然后在 GitHub 网页：自己的 fork → **Contribute** → **Open pull request** → base 选 `xGlaciesx/body-prism` 的 `main`。

**必须知道的代价**：GitHub 的分支保护只统计 **有 Write 及以上权限的人**的 Approve。男孩走 Fork 模式时没有 Write，他的 Approve **不算数**。所以 fork 模式下：

- 不要把保护规则设成“必须 1 人 Approve”，否则 PR 永远合不了；
- 改成“必须走 PR + CI 绿”，由女孩自己点合并；
- review 用评论完成，记录仍然留在 PR 里。

### 4.6 本项目怎么选

- 男孩有 Write → 正常协作者，Approve 有效（§11）；
- 男孩只有 Read → Fork 模式，女孩合并（§4.5）；
- 两种都能完成项目，不要卡在设置页。

✅ **验收**：男孩能推一条分支（§4.4），或已经成功 Fork 并推到自己仓库（§4.5）。

---

## 5. 第 4 步：两台电脑装环境

### 5.1 Windows（女孩）

装四个东西：

1. **Node.js 22 LTS**：https://nodejs.org/ → **Windows Installer (.msi)** → 64-bit；安装时保持 **Add to PATH** 勾选。
2. **Git for Windows**：https://git-scm.com/download/win
   - Default editor：**Use Visual Studio Code**
   - PATH：**Git from the command line and also from 3rd-party software**
   - HTTPS transport：**Use the OpenSSL library**
   - Line ending conversions：**Checkout as-is, commit Unix-style line endings**
   - Terminal emulator：**Use Windows' default console window**
3. **VSCode**：https://code.visualstudio.com/ → **Windows System Installer**，勾 **Add "Open with Code" action** 和 **Add to PATH**。
4. **Cline**：VSCode 里 `Ctrl+Shift+X` → 搜 **Cline** → Install。

装完把 PowerShell 和 VSCode 都关掉重开，PATH 才生效。

验证（PowerShell）：

```powershell
# 看 PowerShell 版本（5.1 或 7.x 都行）
$PSVersionTable.PSVersion

# 看 Node（要 20 以上）
node -v

# 看 npm
npm -v

# 看 Git
git --version
```

应看到 `v22.x.x`、`10.x.x`、`git version 2.x.x`。

如果 `npx` 报 **“running scripts is disabled”**：

```powershell
# 允许当前用户运行本地脚本（只影响当前用户，输 Y 确认）
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### 5.2 macOS（男孩）

```bash
# 装 Xcode Command Line Tools（弹窗点 Install，等它装完）
xcode-select --install
```

然后：

1. **Node.js 22 LTS**：https://nodejs.org/ → **macOS Installer (.pkg)**；Apple Silicon 选 **arm64**；
2. **VSCode**：https://code.visualstudio.com/ → macOS 版，拖进 Applications；
3. **Cline**：VSCode 里 `Command+Shift+X` → 搜 **Cline** → Install。

验证：

```bash
# 看 Git
git --version

# 看 Node
node -v

# 看 npm
npm -v
```

如果 `npm install` 很慢：

```bash
# 换成国内 npm 镜像（只影响 npm，不影响 Git）
npm config set registry https://registry.npmmirror.com
```

### 5.3 配 Cline

按 [01 Cline + DeepSeek 配置包](01-cline-deepseek-setup.html) 做：Provider 选 `DeepSeek`，模型 `deepseek-chat`，Key 用自己的开发 Key；**关闭** Terminal / File write / Browser 的 auto-approve。

> 密钥只放在 Cline 设置或 `.env.local` 里，永远不要贴进聊天、文档、代码。

✅ **验收**：两人都能跑出 `node -v` 和 `git --version`；Cline 能打开。

---

## 6. 第 5 步：配 Git 身份、连上 GitHub

### 6.1 女孩（Windows PowerShell）

```powershell
# 提交时显示的名字（用 GitHub 用户名）
git config --global user.name "xGlaciesx"

# 提交时显示的邮箱（用 GitHub 账号里的邮箱）
git config --global user.email "lisa.lrx@qq.com"

# 新仓库默认分支叫 main
git config --global init.defaultBranch main

# 统一换行符，避免和 macOS 队友互相看到“整份文件被改”
git config --global core.autocrlf input

# 解除 Windows 路径长度限制（node_modules 路径很深）
git config --global core.longpaths true

# HTTPS 推送时弹 GitHub 登录窗口，不用每次输密码
git config --global credential.helper manager

# 检查
git config --global --list
```

### 6.2 男孩（macOS）

```bash
# 提交时显示的名字
git config --global user.name "ziangzhang07"

# 提交时显示的邮箱
git config --global user.email "1248696312@qq.com"

# 新仓库默认分支叫 main
git config --global init.defaultBranch main

# 检查
git config --global user.name
git config --global user.email
```

### 6.3 连接 GitHub：HTTPS 或 SSH

**HTTPS（最省事，推荐先用）：**

第一次 push 会弹 **Git Credential Manager** 窗口，按提示在浏览器登录 GitHub。不要输 GitHub 登录密码；如果它要密码，用 **Personal Access Token（PAT）**：

1. GitHub → 头像 → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**；
2. 勾 `repo`，生成后复制；
3. push 时密码处粘贴令牌。

**SSH（一劳永逸，可选）：**

```bash
# 生成密钥（邮箱换成自己的）
ssh-keygen -t ed25519 -C "lisa.lrx@qq.com"

# 一路回车即可
```

查看公钥：

```powershell
# Windows
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

```bash
# macOS
cat ~/.ssh/id_ed25519.pub
```

复制整行，粘到 GitHub → **Settings** → **SSH and GPG keys** → **New SSH key**。

测试：

```bash
# 看到 Hi <用户名>! 就成功
ssh -T git@github.com
```

✅ **验收**：`git config --global user.name` 输出自己的用户名；HTTPS 能推或 `ssh -T git@github.com` 成功。

---

## 7. 第 6 步：女孩建项目、第一次提交、推到 GitHub

> 如果项目已经存在（之前跑过 `create-next-app`），**跳过 7.1**，直接从 7.2 开始。重复跑会多出一层 `body-prism/body-prism/`。

### 7.1 创建 Next.js 项目

```powershell
# 回到用户主目录
cd $env:USERPROFILE

# 没有 Projects 就新建
if (-not (Test-Path Projects)) { New-Item -ItemType Directory Projects | Out-Null }

# 进入 Projects
cd Projects

# 生成项目（一整行，直接复制；PowerShell 不认反斜杠换行）
npx create-next-app@latest body-prism --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

若提示 `Ok to proceed? (y)`，输入 `y`。

如果它逐项提问：

| 问题 | 选择 |
|---|---|
| Would you like to use Turbopack? | Yes（默认） |
| Would you like to use React Compiler? | No |
| Would you like to customize the import alias? | No |

启动：

```powershell
# 进入项目
cd body-prism

# 启动开发服务器
npm run dev
```

浏览器打开 `http://localhost:3000`，看到 Next.js 默认页即成功。停止用 `Ctrl+C`。

### 7.2 检查 `.gitignore`

确认项目根目录的 `.gitignore` 里有这三行（`create-next-app` 一般会生成）：

```text
.env.local
node_modules/
.next/
```

没有就补上。**这一步比后面所有 Git 命令都重要**：密钥和依赖目录一旦提交，清理起来很麻烦。

### 7.3 第一次提交

`npm run dev` 可以开着，**另开一个 PowerShell 窗口**：

```powershell
# 进入项目根目录（所有 git 命令都在这里跑）
cd $env:USERPROFILE\Projects\body-prism

# 看状态
git status

# 如果不是 git 仓库，初始化（只需第一次）
git init

# 分支名改成 main
git branch -M main

# 全部加入待提交区
git add .

# 关键：再看一眼，确认没有 .env.local / node_modules / .next
git status

# 存一个提交
git commit -m "chore: scaffold Next.js app"
```

第二次 `git status` 一定要看：列表里出现 `.env.local`、`node_modules/`、`.next/` 就停下来检查 `.gitignore`。

### 7.4 推到 GitHub

```powershell
# 添加 GitHub 远程（已加过会报 already exists，见下）
git remote add origin git@github.com:xGlaciesx/body-prism.git

# 确认地址
git remote -v

# 第一次推送 main，并建立跟踪关系
git push -u origin main
```

如果报 `remote origin already exists`：

```powershell
# 不重复添加，只改地址
git remote set-url origin git@github.com:xGlaciesx/body-prism.git

# 再推
git push -u origin main
```

如果 push 被拒（远端有你没有的提交）：

```powershell
# 先下载并合并远端 main（会多一个合并提交，不会丢东西）
git pull origin main

# 再推
git push -u origin main
```

> 用 HTTPS 就把地址换成 `https://github.com/xGlaciesx/body-prism.git`。

✅ **验收**：刷新 GitHub 仓库页，能看到 `src/`、`package.json`，默认分支是 `main`。

---

## 8. 第 7 步：男孩克隆并跑起来

```bash
# 回到家目录
cd ~

# 建 Projects（已存在不报错）
mkdir -p Projects

# 进入
cd Projects

# 克隆仓库（SSH 不通就用 https 地址）
git clone git@github.com:xGlaciesx/body-prism.git

# 进入项目
cd body-prism

# 安装依赖
npm install

# 启动
npm run dev
```

浏览器打开 `http://localhost:3000`。

✅ **验收**：男孩电脑上也能打开 `localhost:3000`，`git log --oneline -3` 能看到女孩的提交。

---

## 9. 第 8 步：保护 main

1. 仓库 → **Settings** → **Branches**；
2. 点 **Add branch protection rule**；
3. Branch name pattern：`main`；
4. 勾选：
   - [x] **Require a pull request before merging**
   - [x] **Require approvals**：`1` —— **仅当男孩有 Write 权限时勾**；Fork 模式下不要勾（他的 Approve 不算数，勾了永远合不了）
   - [x] Dismiss stale pull request approvals when new commits are pushed（可选）
   - [x] **Do not allow bypassing the above settings**
   - [ ] Require status checks（**先不勾**，等 CI 跑过一次再回来勾）
5. **Create**。

> 顺序很重要：**先把初始代码 push 上去，再开保护。** 否则第一次 push 就会被挡。

保护之后会发生的四件事：

1. 不能直接 `git push` 到 main，所有改动必须先到分支、再走 PR；
2. PR 至少 1 人 Approve（仅当规则勾了且对方有 Write）；
3. CI 不绿不能合并（勾了 status checks 之后）；
4. 管理员也不能绕过。

### 9.1 开 CI 之后回来补这一勾

等 §10 的 CI 跑过一次，回到 **Settings → Branches → Edit**：

1. 勾 **Require status checks to pass before merging**；
2. 搜索框输入 `lint-build`，选中 **`CI / lint-build`**；
3. 勾 **Require branches to be up to date before merging**（推荐）；
4. **Save changes**。

✅ **验收**：女孩本地试一下（会失败，这是对的）：

```bash
# 故意直接推 main，应该被拒绝
git push origin main
```

看到 `protected branch` 一类提示，就说明保护生效。

---

## 10. 第 9 步：本地检查 + CI

### 10.1 两个人都要会跑

每次开 PR 前，在项目根目录跑：

```powershell
# Windows：分两行，不要用 &&
npm run lint

npm run build
```

```bash
# macOS
npm run lint
npm run build
```

两条都成功，PR 里才有东西可 review。

### 10.2 加 GitHub Actions

> `.github` 目录默认不存在，需要手动新建；Windows 资源管理器默认不显示点开头的文件夹，用 VSCode 侧边栏最稳。

在 VSCode 里右键项目根目录 → **New File** → 文件名一次性输入：

```text
.github/workflows/ci.yml
```

粘入：

```yaml
# 工作流名字，显示在 Actions 页面
name: CI

# 什么时候跑：开 PR / 往 PR 推新提交 / 往 main 推
on:
  pull_request:
  push:
    branches: [main]

# 只读仓库内容，不允许它改代码
permissions:
  contents: read

jobs:
  # 任务 id；保护规则里选的就是这个名字
  lint-build:
    runs-on: ubuntu-latest
    steps:
      # 1. 把代码下载到虚拟机
      - uses: actions/checkout@v4
      # 2. 装 Node 22 并缓存依赖
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      # 3. 按 lock 文件精确安装
      - run: npm ci
      # 4. 代码检查
      - run: npm run lint
      # 5. 生产构建
      - run: npm run build
```

> `npm ci` 要求仓库里有 `package-lock.json`。本地跑一次 `npm install`，把它一起提交。

加完 CI 后走一次 PR（§11），让它跑第一次。

✅ **验收**：两人本地 `npm run lint`、`npm run build` 都成功；GitHub **Actions** 页面能看到一次运行。

---

## 11. 第 10 步：第一个 PR（完整走一遍）

### 11.1 为什么必须走 PR

- `main` 已保护，直接推会被拒；
- PR 留下“谁改了什么、谁看过”的记录，是比赛的协作证据；
- 出问题可以只回退一个 PR。

### 11.2 女孩：开分支、写文件、推分支

```bash
# 切回 main
git switch main

# 拉最新
git pull

# 开一条文档分支
git switch -c docs/medical-disclaimer
```

在 VSCode 里新建 `docs/medical-disclaimer.md`（`docs` 文件夹不存在就先建），写入免责声明。模板见 [14 第一天](14-first-code-day.html)。

```bash
# 只加这一个文件
git add docs/medical-disclaimer.md

# 提交
git commit -m "docs: add medical disclaimer"

# 推到 GitHub，第一次用 -u
git push -u origin docs/medical-disclaimer
```

### 11.3 开 PR（两种入口）

**入口 A：黄色提示条（最快）**

1. push 成功后 1–2 分钟，打开仓库首页；
2. 顶部出现 `docs/medical-disclaimer had recent pushes`；
3. 点右边绿色 **Compare & pull request**。

**入口 B：Pull requests 标签（永远可用）**

1. 点 **Pull requests** → **New pull request**；
2. **base** 选 `main`，**compare** 选 `docs/medical-disclaimer`；
3. 确认出现绿色 **Able to merge**，**Files changed** 里只有你改的文件；
4. 点 **Create pull request**。

### 11.4 填 PR 页面

- **Title**：`docs: add medical disclaimer`
- **描述**：

```text
## 做了什么
新增医学免责声明与内容审核规则。

## 为什么
明确内容边界，满足比赛与医学审核要求。

## 怎么验证
本地预览 Markdown，检查标题层级和链接。

## 风险
无代码改动，不影响构建。
```

- 右侧 **Reviewers** → 选男孩（如果他有 Write；没有就跳过）；
- 点 **Create pull request**。

### 11.5 男孩 review、Approve

1. 打开 PR → **Files changed**；
2. 重点看：有没有密钥、有没有诊断/用药承诺、有没有来源、有没有把中医写成解剖；
3. 没问题点 **Review changes** → **Approve** → **Submit review**；
4. 有问题选 **Request changes**，在行内写清楚。

> **女孩不能 Approve 自己的 PR**——GitHub 不允许作者批准自己。所以这一步必须由男孩做。
> 如果男孩只有 Read 权限（Fork 模式），他的 Approve 不计入保护规则；此时改为在评论里写“看过，可以合并”，由女孩点合并。

### 11.6 CI 在哪里看

PR 页面**最底部**有一块检查区：

| 显示 | 含义 | 怎么办 |
|---|---|---|
| 黄色圆圈 + `Some checks haven't completed yet` | 正在跑 | 等 1–3 分钟，刷新 |
| 绿色对勾 + `All checks have passed` | 绿了 | 可以合并 |
| 红色叉 + `Some checks have failed` | 失败 | 点 **Details** 看日志，把报错贴给 Cline |

也可以点 PR 顶部的 **Checks** 标签，或仓库顶部的 **Actions** 标签看历史。

> 如果 push 完一直没有检查：CI 文件可能没提交、没在默认分支、或仓库禁用了 Actions（Settings → Actions → General → Allow all actions）。

### 11.7 合并

**CI 绿 + 男孩已 Approve** 之后：

1. 点页面底部绿色 **Squash and merge**；
2. 在弹窗里确认提交信息，点 **Confirm squash and merge**；
3. 点 **Delete branch**（删的是 GitHub 上的远端分支）。

**Squash and merge 是灰的？** 鼠标放上去会显示原因：

| 提示 | 原因 | 怎么办 |
|---|---|---|
| `Review required` | 还没有 Approve | 等男孩点 Approve |
| `Required status check "lint-build" is expected` | CI 没跑或没配 | 等 CI；或先关掉 status check |
| `This branch has conflicts` | 和 main 冲突 | 本地 `git pull origin main` 解决后推上来 |
| `Merging is blocked` | 权限/规则 | 确认你是 Admin，且规则没禁止自己合并 |

> **不要为了合并去关保护。** 卡住就按上表处理，或先问对方。

### 11.8 合并后：两个人同步

**女孩（合并的人）：**

```bash
# 切回 main
git switch main

# 拉取刚合并的 PR
git pull

# 删除本地分支（已合并）
git branch -d docs/medical-disclaimer
```

如果提示 `not fully merged`（squash 合并后常见），**确认 PR 已合并**再：

```bash
# 强制删除本地分支（大写 -D，只在确认已合并时用）
git branch -D docs/medical-disclaimer
```

**男孩：**

```bash
# 切回 main 并拉取
git switch main
git pull
```

✅ **验收**：GitHub 上 PR 状态是 **Merged**；两人本地 `git log --oneline -3` 都能看到这次 squash 提交。

---

## 12. 第 11 步：从第二天起，每天 20 分钟

### 12.1 早上开工（5 分钟）

```bash
# 切回主干
git switch main

# 拉最新
git pull

# 开今天的分支
git switch -c feat/home-hero
```

然后对 Cline 说 `start`，让它复述今天的目标和 3 步计划。

### 12.2 白天（随手）

```bash
# 每完成一小块就提交
git add <改过的文件>
git commit -m "feat(home): add hero section"

# 至少 push 两次
git push
```

第一次推新分支要 `git push -u origin feat/home-hero`，之后直接 `git push`。

### 12.3 晚上收工（15 分钟）

```bash
# 1. 本地检查
npm run lint
npm run build

# 2. 让 Cline 说 stop，生成 SESSION_LOG 草稿

# 3. 提交日志
git add docs/SESSION_LOG.md
git commit -m "docs: update session log"

# 4. 推分支
git push
```

然后网页开 PR → 对方 review → 合并 → 删分支。

### 12.4 第二天

```bash
# 回到 main，拉最新，开新分支
git switch main
git pull
git switch -c feat/next-thing
```

昨天没合并的分支可以继续用，但先 `git pull` 再 `git merge origin/main`。

### 12.5 冲突了怎么办

1. `git status` 看哪几个文件冲突；
2. 在 VSCode 里打开，选“保留当前 / 保留传入 / 两者都要”；
3. `git add <解决后的文件>`；
4. `git commit`；
5. 再 `git push`。

完整图解见 [08 Git 入门](08-git-primer.html)。

### 12.6 代码先写哪个文件？——照这五个切片走

| 顺序 | 切片 | 做完能看到什么 | 详细步骤 |
|---|---|---|---|
| 1 | 外壳 + 首页 | 首页能打开，三镜概念和入口在 | [16 §4](16-mvp-implementation.html) |
| 2 | 器官内容 + 详情页 | `/organ/heart` 有三镜标签、证据徽章、来源 | 16 切片 2 |
| 3 | 探索页 + 心脏 3D | 器官列表能点，3D 能转、能降级 | 16 切片 3 |
| 4 | AI 策展人 | 器官页有带引用的问答抽屉 | 16 切片 4 |
| 5 | 方法页 + 实验室 + 收尾 | 免责声明、证据分级、关于页齐全 | 16 切片 5 |

每个切片都走同一条 Git 节奏：开分支 → 写 → 本地 lint/build → 提交 → push → PR → 合并 → 删分支。

✅ **验收**：两个人能在没有对方帮忙的情况下，独立走完“开分支 → 提交 → push → PR → 合并 → 删分支”。

---

## 13. 第 12 步（可选）：Gitee 镜像

GitHub 实在打不开时，用 Gitee 做**备份**，不改主库。

### 13.1 建 Gitee 仓库并加远程

1. https://gitee.com 注册 / 登录；公开仓库需要实名认证；
2. 新建仓库 `body-prism`，**不要**初始化 README；
3. 本地加一个叫 `gitee` 的远程：

```bash
# 添加 Gitee 远程（只加一次）
git remote add gitee https://gitee.com/<你的Gitee用户名>/body-prism.git

# 确认 origin=GitHub，gitee=Gitee
git remote -v

# 推 main 和 tag
git push gitee main --tags
```

### 13.2 什么时候同步

- 每周五收工前推一次；
- 或者 GitHub 连续打不开、需要给评委一个国内链接时临时推一次。

### 13.3 不要做的事

- **不要把 `origin` 改成 Gitee**——那会变成两个主库；
- **不要在 Gitee 上也开一套 PR 流程**——只同步代码，不双线协作；
- Gitee 镜像不需要男孩有权限。

✅ **验收**（如果做了）：Gitee 仓库能看到和 GitHub 一样的最近提交。

---

## 14. 出问题了，先查这张表

| 症状 | 最可能的原因 | 怎么办 | 深入 |
|---|---|---|---|
| `git: command not found` | Git 没装 / PATH 没生效 | 重装并勾 PATH，重开终端 | §5 |
| `node: command not found` | Node 没装 / 没重开终端 | 重装 Node，重开终端 | §5 |
| `running scripts is disabled` | PowerShell 执行策略 | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` | §5.1 |
| `not a git repository` | 不在项目目录 | `cd` 到有 `.git` 的目录 | §7.3 |
| `remote origin already exists` | 重复 `remote add` | `git remote set-url origin <地址>` | §7.4 |
| `Permission denied (publickey)` | SSH 没配好 | 改用 HTTPS，或配 SSH key | §6.3 |
| `Authentication failed` | 用了登录密码 | GitHub 用 PAT | §6.3 |
| `failed to push some refs` | 远端有你没有的提交 | `git pull` 后再推；不要 force | §7.4 |
| `protected branch` / 禁止推送 | main 已保护 | 开分支 → PR | §9、§11 |
| `CONFLICT (content)` | 两人改了同一行 | 手动合并 → `git add` → `git commit` | §12.5 |
| `npm ci` 失败（CI） | 没有 `package-lock.json` | 本地 `npm install`，提交 lock 文件 | §10.2 |
| `npm run build` 失败 | 类型/语法错误 | 把完整报错贴给 Cline | §10.1 |
| 3000 端口被占用 | 上一个 dev server 没关 | 关掉旧终端，或用提示的 3001 | §7.1 |
| `docs/...` 路径找不到 | `docs` 文件夹没建 | `mkdir docs`（Win 用 `New-Item`） | §11.2 |
| GitHub 打不开 / 超时 | 网络 | 用 Gitee 镜像备份；重试或换网络 | §13 |
| 合并按钮是灰的 | 缺 Approve / CI 红 / 冲突 | 看悬停提示，按 §11.7 处理 | §11.7 |
| `git branch -d` 提示未合并 | squash 合并 | 确认 PR 已合并后用 `-D` | §11.8 |
| 提交里出现 `.env.local` | `.gitignore` 没生效 | **立刻吊销密钥**，再从历史移除 | [02](02-git-collaboration-sop.html) |
| Approve 按钮点不了 | 作者不能批自己 / 没权限 | 让男孩批；Fork 模式用评论代替 | §11.5 |
| 网页看不到 CI | Actions 被禁用 / 文件没提交 | Settings → Actions 允许；确认 `.github/workflows/ci.yml` 在 main | §10.2 |

> 一条铁律：**任何情况下都不要 `git reset --hard`、不要 `git push --force` 到 main。** 先 `git status`、`git log --oneline -5`，把输出贴给 Cline 或对方。

---

## 15. 最终验收清单（两个人一起勾）

- [ ] 两个人电脑上都能打开 `http://localhost:3000`
- [ ] GitHub 上是主库，`main` 是默认分支
- [ ] 男孩是协作者（Write 或 Fork 模式），能推分支
- [ ] `main` 已保护，直接 push 会被拒
- [ ] 两人 `git config --global user.name` 各是自己的账号
- [ ] 第一个 PR 已合并，分支已删
- [ ] 两人都能 `git pull` 到最新 `main`
- [ ] `npm run lint` 和 `npm run build` 都通过
- [ ] GitHub Actions 跑过一次（如果配了 CI）
- [ ] 今天的 3 行日志已写进 `docs/SESSION_LOG.md`
- [ ] 没有任何密钥进入仓库（`.env.local` 在 `.gitignore` 里）

---

## 16. 文档地图：什么时候翻哪一份

| 文档 | 作用 | 什么时候看 |
|---|---|---|
| **00（本文）** | 唯一操作主线 | 从头到尾照着做 |
| [01 Cline + DeepSeek](01-cline-deepseek-setup.html) | AI 编程环境、Key、AGENTS.md | 装完环境后 |
| [02 Git 协同 SOP](02-git-collaboration-sop.html) | 冲突、rebase、提交规范、排错 | 主线卡住时查 |
| [08 Git 入门](08-git-primer.html) | 概念、12 条命令、完整演练 | 想弄懂“为什么”时 |
| [11 VSCode 实战](11-vscode-ai-workflow.html) | 在 VSCode 里点按钮完成 Git | 不想敲命令时 |
| [14 第一天写代码](14-first-code-day.html) | 第一天的详细版、Cline 第一句话 | 主线 §7–§11 的展开 |
| [15 每日节奏](15-daily-git-rhythm.html) | 两天的完整演练、可打印清单 | 主线 §12 的展开 |
| [16 MVP 实施](16-mvp-implementation.html) | 先写哪个文件、每个文件放什么 | 主线跑通、开始写功能时 |
| [07 页面设计](07-page-design.html) | 线框、组件、设计系统 | 做页面前 |
| [03 AIGC 美术](03-aigc-art-pipeline.html) | 视觉资产管线 | 做视觉前 |
| [05 成本控制](05-ai-cost-control.html) | 模型路由、缓存、预算 | 接 AI 前 |
| [06 权限后台](06-auth-and-admin.html) | RBAC、RLS、审计 | 做后台前 |
| [04 第一周任务](04-week1-daily-tasks.html) | 每天做什么 | 排期时 |

> 记住：**主线只有这一份。** 其他文档是“遇到问题再查”的手册，不需要按编号读完。

---

## 17. 一句话

> **一个主库、两个人、三条命令：`git switch -c` 开分支，`git add` + `git commit` 存档，`git push` + PR 合并。**
> 拿不准就回到这份文档从头对一遍。
