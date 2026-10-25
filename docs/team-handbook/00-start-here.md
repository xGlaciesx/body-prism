# 从这里开始：拿到文档后的第一步

> 项目：人体棱镜 Body Prism——AI 驱动的身体信息三镜图谱。
> 读者：两个大一新生，第一次做完整 Web 项目。
> 系统：女孩 Windows 11（PowerShell），男孩 macOS 27 Golden Gate（Terminal）；命令已按系统分开写。
> 这一页只回答一个问题：**今天到底先做什么？**

---

## 0. 一句话

> **今天不要写业务代码。今天只把“两个人各自能跑、代码能提交、PR 能合并”跑通。**

这一步看起来慢，但它决定后面 30 天会不会互相覆盖、会不会最后一天才上传代码。

---

## 1. 先花 20 分钟，做三件事

### 1.1 确认比赛信息

- 打开比赛页面，确认报名截止、作品提交截止、组别（西安交大属于 A 组）；
- 在 QQ 群/官网确认： Provincial 截止和全国页面写的日期是否冲突；
- 把关键日期写进 `docs/deadlines.md`。

### 1.2 两个人对齐分工

| 人 | 主负责 | 今天的具体任务 |
|---|---|---|
| 女孩（信息工程，Windows 11） | 工程、Git、3D、AI 接入、部署 | 建仓库、跑通 Next.js、配 CI |
| 男孩（临床医学，macOS 27） | 医学内容、证据、审核 | 克隆仓库、写免责声明、建第一个 PR |

> 不是“女孩写全部代码，男孩只写文案”。男孩要能 clone/pull/PR；女孩要能看懂医学来源的基本结构。

### 1.3 两台电脑，两套命令

女孩用 **Windows 11**，男孩用 **macOS 27 Golden Gate**。同一个目标，终端命令不完全一样。先认清这一点，能少踩一半的坑。

| 项目 | 女孩（Windows 11） | 男孩（macOS 27） |
|---|---|---|
| 终端 | 开始菜单搜 **Windows PowerShell** | 启动台搜 **Terminal**（默认 zsh） |
| 家目录 | `C:\Users\<用户名>` | `/Users/<用户名>` |
| 进家目录 | `cd $env:USERPROFILE` | `cd ~` |
| 建目录 | `New-Item -ItemType Directory Projects` | `mkdir Projects` |
| 看文件 | `Get-ChildItem`（`ls` 也能用） | `ls` |
| 看文本 | `Get-Content 文件` | `cat 文件` |
| 临时环境变量 | `$env:AI_MOCK="1"` | `export AI_MOCK=1` |
| 一行多条命令 | 用 `;`，**不要用 `&&`** | `&&` 或 `;` |
| 命令续行 | 反引号，**不推荐** | 反斜杠 `\` |
| 复制/粘贴 | `Ctrl+C` / `Ctrl+V` | `Command+C` / `Command+V` |

四条规则：

1. **Windows PowerShell 5.1 不支持 `&&`。** 文档里如果出现两条命令，Windows 用户分两行运行。
2. **不要混抄。** 标“Windows”的给女孩，标“macOS”的给男孩；两边一样的命令会写“两个系统都一样”。
3. **Git 里的路径统一用 `/`。** 例如 `docs/medical-disclaimer.md`，Windows 也认。
4. **环境变量优先写进 `.env.local`。** 两个系统行为一致，不用记 `export` 和 `$env:` 的区别。

### 1.4 打开文档的顺序

```text
00 本页（今天）
→ 04 第一周每日任务卡（今天做什么）
→ 01 Cline + DeepSeek（装工具）
→ 02 Git 协同（建仓库、第一个 PR）
→ 07 页面设计（做页面前看）
→ 05 成本控制（接 AI 前看）
→ 06 权限后台（W2 末/W3 初看）
```

不要今天把六份文档全读完。**先做，再查。**

### 1.5 先认 15 个词：每个词括号里就是它的作用

第一次看 Git 文档，最容易懵的不是命令，是名词。先用生活里的东西对上号：

| 词 | 一句话作用 | 打个比方 |
|---|---|---|
| **仓库 repository** | 存放项目所有文件和历史版本的地方 | 一个带时间机器的文件柜 |
| **本地 / 远程** | 本地=你电脑上的副本；远程=GitHub 上的那份 | 本地是草稿，远程是云端备份 |
| **main（主干）** | 项目的“正式版”主线，任何时候都应该能打开、能演示 | 一棵树的主干，所有分支从它长出去 |
| **branch（分支）** | 从主干分出来的一条独立工作线，随便改不影响 main | 主干上分出来的岔路，走完再并回去 |
| **commit（提交）** | 把一次改动存成一个“存档点”，带说明 | 游戏存档，可以回来看每个节点 |
| **push（推送）** | 把本地的新提交**上传**到 GitHub | 把草稿发到云端 |
| **pull（拉取）** | 把 GitHub 上的新提交**下载并合并**到本地 | 把队友的新版本取回来 |
| **fetch（获取）** | 只下载远端信息，**先不合并** | 先看看信箱里有什么，不拆 |
| **PR（Pull Request）** | 正式请求“把我这条分支合并进 main”，附带 diff 和讨论 | 一张“请审批并入主干”的申请单 |
| **merge（合并）** | 把一条分支的改动并进另一条 | 岔路走完，接回主干 |
| **review（审阅）** | 队友看你的改动，提意见或点 Approve | 交卷前互相检查 |
| **保护 main（branch protection）** | 给主干上锁：不许直接 push，必须走 PR + 审核 + 检查 | 展品柜上锁，不能随手改 |
| **CI（持续集成）** | 每次 push/PR 自动跑 lint、build，失败就亮红灯 | 自动质检员，替你试一遍 |
| **clone（克隆）** | 把远程仓库完整复制到本地（含历史） | 把整个文件柜搬一份回家 |
| **conflict（冲突）** | 两个人改了同一行，Git 不知道该听谁的 | 两份稿子改在同一句，需要人来定 |

记住三句话就够开始：

1. **main 是主干，永远能演示；branch 是岔路，用来干活。**
2. **push 是上传，pull 是下载并合并，PR 是申请并入主干。**
3. **保护 main = 给主干上锁，谁都不能直接改，必须走 PR。**

---

## 2. 今天的完成标准

今天结束时，两个人一起确认：

- [ ] 两个人电脑上都能打开 `http://localhost:3000`
- [ ] GitHub 上是 **public** 仓库 `body-prism`
- [ ] 两个人都是 collaborator
- [ ] `main` 已保护：不能直接 push，必须 PR + 1 approval
- [ ] CI 跑过一次，`lint-build` 是绿色
- [ ] 第一个 PR 已合并
- [ ] 两个人都能 `git pull` 到最新 `main`
- [ ] Cline 能读懂项目并回答测试问题
- [ ] DeepSeek 两个 Key 已分开，开发 Key 设了预算上限
- [ ] 今天的 3 行日志已写

**只要这 10 条完成，今天就是成功的。** 首页长什么样，今天不重要。

---

## 3. 女孩的手把手 8 步（Windows 11 + PowerShell，附排错）

> 女孩的电脑是 **Windows 11**，下面所有命令都在 **Windows PowerShell** 里运行。
> 不要照抄文档里给男孩的 macOS 命令；两边不一样的地方，这一节会直接标出来。

#### 第 1 步：装四个东西（Windows）

1. **Node.js 22 LTS**：https://nodejs.org/  
   下载 **Windows Installer (.msi)**，选 **64-bit**。安装时保持 **Add to PATH** 勾选（默认已勾）。
2. **Git for Windows**：https://git-scm.com/download/win  
   安装选项按下面选，其余默认：
   - Default editor：**Use Visual Studio Code**
   - PATH：**Git from the command line and also from 3rd-party software**
   - HTTPS transport：**Use the OpenSSL library**
   - Line ending conversions：**Checkout as-is, commit Unix-style line endings**
   - Terminal emulator：**Use Windows' default console window**
3. **VSCode**：https://code.visualstudio.com/  
   选 **Windows System Installer**，勾选 **Add "Open with Code" action** 和 **Add to PATH**。
4. **Cline**：打开 VSCode → 扩展市场（`Ctrl+Shift+X`）→ 搜 **Cline** → **Install**。

> 装完把 PowerShell 和 VSCode 都关掉重开一次，PATH 才会生效。

#### 第 2 步：验证安装（PowerShell）

打开：开始菜单 → 输入 `PowerShell` → 点 **Windows PowerShell**。

先看版本：

```powershell
# 看当前 PowerShell 版本（5.1 或 7.x 都可以）
$PSVersionTable.PSVersion
```

`5.1` 是 Windows 自带的，够用；`7.x` 也可以。然后逐条运行：

```powershell
# 看 Node.js 版本（要 20 以上）
node -v

# 看 npm 版本
npm -v

# 看 Git 版本
git --version
```

应该看到：

```text
v22.x.x
10.x.x
git version 2.x.x
```

如果 `node` 或 `git` 找不到：

```powershell
# 查 node 命令装在哪里（找不到就说明 PATH 没配好）
Get-Command node

# 查 git 命令装在哪里
Get-Command git
```

- 命令不存在：重启终端；还不行就重装，并确认安装时勾了 “Add to PATH”。
- 如果后面运行 `npx` 报 **“running scripts is disabled”**，执行一次：

```powershell
# 允许当前用户运行本地脚本（只影响当前用户，输 Y 确认）
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

输入 `Y` 回车。这是 Windows 的脚本执行策略，不是病毒。

#### 第 3 步：配置 Git 身份（Windows，女孩）

> 女孩的 GitHub 账号是 **xGlaciesx**，邮箱 **lisa.lrx@qq.com**。下面直接填好了，照抄即可。

```powershell
# 提交时显示的名字（用 GitHub 用户名）
git config --global user.name "xGlaciesx"

# 提交时显示的邮箱（用 GitHub 账号里的邮箱）
git config --global user.email "lisa.lrx@qq.com"

# 新仓库默认分支叫 main，而不是 master
git config --global init.defaultBranch main

# 统一换行符，避免和 macOS 队友互相看到“整份文件被改”
git config --global core.autocrlf input

# 解除 Windows 路径长度限制（node_modules 路径很深）
git config --global core.longpaths true

# HTTPS 推送时弹 GitHub 登录窗口，不用每次输密码
git config --global credential.helper manager
```

其中后三行分别解决：

- `core.autocrlf input`：队友用 macOS，统一在仓库里存 LF，避免整份文件显示“被修改”；
- `core.longpaths true`：Windows 路径长度限制，Next.js 的 `node_modules` 容易超；
- `credential.helper manager`：用 HTTPS push 时弹出 GitHub 登录窗口，不用每次输密码。

检查：

```powershell
# 列出所有全局 Git 配置，确认刚设的值都在
git config --global --list
```

#### 第 4 步：创建 Next.js 项目（Windows）

先建一个放项目的文件夹：

```powershell
# 回到用户主目录（C:\Users\你的用户名）
cd $env:USERPROFILE

# 如果 Projects 不存在就新建（存在就跳过）
if (-not (Test-Path Projects)) { New-Item -ItemType Directory Projects | Out-Null }

# 进入 Projects
cd Projects
```

> `$env:USERPROFILE` 就是 `C:\Users\你的用户名`。不要混抄 macOS 的 `cd ~`；PowerShell 虽然也认 `~`，但初学时统一用这个更稳。

创建项目：

```powershell
# 用官方脚手架生成 Next.js 项目 body-prism（参数见下方表格）
npx create-next-app@latest body-prism --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

> **重点**：网上很多教程用反斜杠 `\` 换行，那是 macOS/Linux 写法，PowerShell 不认。上面是**一整行**，直接复制。  
> 如果提示 `Ok to proceed? (y)`，输入 `y` 回车。

如果它问问题，这样选：

| 问题 | 选择 |
|---|---|
| Would you like to use Turbopack? | Yes（默认） |
| Would you like to use React Compiler? | No（先不折腾） |
| Would you like to customize the import alias? | No |

启动：

```powershell
# 进入项目文件夹
cd body-prism

# 启动开发服务器，浏览器打开 http://localhost:3000
npm run dev
```

浏览器打开 `http://localhost:3000`，看到 Next.js 默认页就成功。停止用 `Ctrl+C`。

> 如果 3000 被占用，终端会给出另一个端口，比如 3001，用那个也行。

#### 第 5 步：第一次提交（Windows）

`npm run dev` 可以继续开着。**另开一个 PowerShell 窗口**：

```powershell
# 进入项目文件夹（后面所有 git 命令都要在项目根目录执行）
cd $env:USERPROFILE\Projects\body-prism

# 看当前 Git 状态：在哪个分支、改了哪些文件
git status
```

如果提示 `not a git repository`，就初始化：

```powershell
# 把当前文件夹变成一个 Git 仓库（只需第一次）
git init

# 把当前分支改名为 main（Git 默认分支名可能是 master）
git branch -M main
```

确认 `.gitignore` 存在，并且里面有 `.env.local`、`node_modules/`、`.next/`（`create-next-app` 一般会生成）。

```powershell
# 把当前目录下所有改动放进“待提交区”（暂存区）
git add .

# 再看一眼：确认没有 .env.local、node_modules、.next
git status

# 把暂存区的内容存成一个存档点，说明是“搭建 Next.js 脚手架”
git commit -m "chore: scaffold Next.js app"
```

> `git add .` 之后一定再看一眼 `git status`，确认没有 `.env.local`、没有 `node_modules`、没有 `.next`。有就说明 `.gitignore` 没生效，先停下来检查。

如果 Git 提示没有配置用户名/邮箱，回到第 3 步。

#### 第 6 步：建 GitHub 仓库并 push（Windows）

在 GitHub 网页：

1. 右上角 `+` → **New repository**
2. Repository name：`body-prism`
3. 选 **Public**
4. **不要**勾 “Add a README file”
5. **不要**选 `.gitignore` 和 license（本地已经有）
6. 点 **Create repository**

然后复制仓库地址。推荐 SSH：

```powershell
# 给本地仓库起一个远程地址的别名 origin（origin 就是“GitHub 上的那个仓库”）
git remote add origin git@github.com:xGlaciesx/body-prism.git

# 确认远程地址加对了
git remote -v

# 把本地 main 分支上传到 origin，并记住这个对应关系（-u 只需第一次）
git push -u origin main
```

如果 SSH 没配好，先用 HTTPS：

```powershell
# 用 HTTPS 地址添加远程仓库别名 origin
git remote add origin https://github.com/xGlaciesx/body-prism.git

# 上传 main 并建立跟踪关系
git push -u origin main
```

HTTPS 第一次会弹出 **Git Credential Manager** 窗口，按提示在浏览器登录 GitHub。  
如果它要求输入密码，**不要输 GitHub 登录密码**，要用 Personal Access Token（PAT）；或者改回 SSH。

如果刚才已经用 SSH 加过 `origin`，现在想换 HTTPS：

```powershell
# 把 origin 的地址改成 HTTPS
git remote set-url origin https://github.com/xGlaciesx/body-prism.git

# 再上传一次
git push -u origin main
```

如果提示 `remote origin already exists`：

```powershell
# 只改 origin 地址，不重复添加
git remote set-url origin git@github.com:xGlaciesx/body-prism.git
```

如果 push 被拒绝（远端有你没有的提交）：

```powershell
# 先下载并合并远端 main（会多一个合并提交，不会丢东西）
git pull origin main

# 再上传
git push -u origin main
```

> SSH 配置见文档 02 的“零基础第一遍”。今天可以先 HTTPS，明天再换 SSH。

#### 第 7 步：加 collaborator + 保护 main（网页操作，两个系统一样）

**加人（把 Write 权限选对）：**

1. 用**建仓库的那个账号**打开 `https://github.com/xGlaciesx/body-prism`，点右上角 **Settings**（齿轮图标）。
   - 看不到 **Settings**，说明当前登录的不是仓库管理员，先换账号；
   - 如果仓库在组织名下，还要有组织的 invite 权限。
2. 左侧栏点 **Collaborators**（新版可能叫 **Collaborators and teams**）。
3. 点绿色 **Add people**。
4. 弹窗里搜 **`ziangzhang07`**（男孩的 GitHub 用户名，不是昵称、不是邮箱），点中他。
5. 关键一步：弹窗底部有 **Choose a role**（选择角色）下拉，默认是 **Read**，点开改成 **Write**，再点 **Add to repository** / **Send invitation**。
   - **看不到这个下拉**：先点 **Add to repository** 把人加进去，回到 Collaborators 列表，找到男孩那一行；
   - 他名字右侧有一个角色下拉（可能显示 `Read`），点开选 **Write**，页面会自动保存。
6. 如果已经用 `Read` 发出邀请：不用撤回，直接在列表里把角色改成 **Write**；对方已接受也会立即生效。
7. 状态从 **Pending invite** 变成 **Collaborator**，就说明男孩已经接受。

> GitHub 的角色名是 `Read / Triage / Write / Maintain / Admin`。**Write** 才能 push 分支、开 PR；`Read` 只能看，push 会报 403。仓库设置（Settings）只有 Admin 能改，男孩不需要 Admin。

**保护 main 是干什么的？**

`main` 是主干，是你们随时要拿去演示、交作品的那一版。**保护 main = 给主干上锁**，让它不能被随手改坏。开启后会发生四件事：

1. **不能直接 `git push` 到 main**：所有改动必须先到分支，再走 PR；
2. **PR 至少要 1 个人 Approve**：两个人互相检查，避免把 `.env.local`、写错的医学结论、坏代码合进去；
3. **CI 不绿不能合并**：lint/build 失败时，GitHub 的 Merge 按钮是灰的；
4. **不能绕过规则**：连管理员也不能直接改，防止“就这一次，我直接推”。

没有这层保护，最容易发生的三件事是：有人直接 push 把 main 推坏、两个人同时改 main 互相覆盖、演示前发现 main 根本跑不起来。**所以今天的 10 条完成标准里，这一条不能省。**

**保护 main：**

1. **Settings** → **Branches**
2. **Add branch protection rule**
3. Branch name pattern：`main`
4. 勾选：
   - [x] Require a pull request before merging（合并前必须有 PR）
   - [x] Require approvals：`1`（至少 1 人批准）
   - [x] Dismiss stale pull request approvals when new commits are pushed（可选：有新提交时旧批准作废）
   - [x] Require conversation resolution before merging（所有评论要解决完）
   - [ ] Require status checks（**先不勾**，等 CI 跑过一次再勾）
   - [x] Do not allow bypassing the above settings（管理员也不能绕过）
5. **Create**

> 注意顺序：先把初始代码 push 上去，再开保护。否则第一次 push 就会被挡。
> 等第 8 步 CI 跑过一次后，回到这里把 **Require status checks** 勾上，并选中 `lint-build`，这样 build 失败就合不进去。

#### 第 8 步：加 CI，并让它跑一次（Windows）

> **`.github` 目录默认不存在，这是正常的，不是你哪一步做错了。**
> 它和 `src`、`public` 不一样，不是 `create-next-app` 生成的，需要你**手动新建**。
> 另外，Windows 资源管理器默认不显示以 `.` 开头的文件/文件夹；请在“查看 → 显示 → 隐藏的项目”里打开，或直接用 VSCode 的侧边栏看。

**最简单的做法（VSCode，推荐）：**

1. 在 VSCode 左侧“资源管理器”里，右键项目根目录（最上面一行 `BODY-PRISM`）；
2. 选 **New File**；
3. 在文件名输入框里**一次性输入完整路径**：

```text
.github/workflows/ci.yml
```

4. 按回车。VSCode 会自动把 `.github` 和 `workflows` 两层文件夹一起建好；
5. 把下面的 YAML 粘进去，`Ctrl + S` 保存。

**用 PowerShell 也可以：**

```powershell
# 确认自己在项目根目录，应该能看到 package.json
Get-Location

# 看当前目录里的文件，确认有 package.json
Get-ChildItem

# 一次性建两层目录
New-Item -ItemType Directory -Force -Path .github\workflows | Out-Null

# 建一个空的 ci.yml
New-Item -ItemType File -Force -Path .github\workflows\ci.yml | Out-Null

# 用 VSCode 打开这个文件（code 命令不存在就忽略，直接在 VSCode 里点开）
code .github\workflows\ci.yml
```

macOS 等价命令：

```bash
# 建两层目录（-p：父目录不存在也一起建）
mkdir -p .github/workflows

# 建一个空的 ci.yml
touch .github/workflows/ci.yml

# 用 VSCode 打开它
code .github/workflows/ci.yml
```

**验证目录真的建对了：**

```powershell
# -Force 才能看到以点开头的隐藏文件/文件夹
Get-ChildItem -Force .github\workflows
```

应该看到 `ci.yml`。如果看到的是 `ci.yml.txt`，说明 Windows 偷偷加了 `.txt` 后缀——在 VSCode 里重命名，或在资源管理器里打开“文件扩展名”后改掉。

然后把下面内容粘进 `ci.yml`：

```yaml
# 工作流的名字，会显示在 GitHub 仓库的 Actions 页面
name: CI

# “什么时候自动运行”
on:
  # 有人开 PR，或往已有 PR 里 push 新提交时，运行
  pull_request:

  # 有人往 main 分支 push 时也运行（合并 PR 后会触发一次）
  push:
    branches: [main]

# 给这个工作流最小权限：只读仓库内容，不允许它改代码
permissions:
  contents: read

# 下面定义“要做什么任务”
jobs:
  # 任务 id，叫 lint-build；后面保护 main 时会看到这个名字
  lint-build:
    # 用 GitHub 提供的最新 Ubuntu 虚拟机来跑，不用你的电脑
    runs-on: ubuntu-latest

    # 任务里的步骤，从上到下依次执行；任何一步失败，整个任务就红
    steps:
      # 第 1 步：把仓库代码下载到这台虚拟机上
      - uses: actions/checkout@v4

      # 第 2 步：安装 Node.js 22，并缓存 npm 依赖，下次运行更快
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      # 第 3 步：按 package-lock.json 精确安装依赖
      # 用 npm ci 而不是 npm install：CI 里要求版本完全一致、可重复
      - run: npm ci

      # 第 4 步：跑 ESLint；有错误就停在这里，PR 变红
      - run: npm run lint

      # 第 5 步：跑生产构建；有类型错误或构建错误就停在这里
      - run: npm run build
```

> 这些 `#` 注释是 YAML 的一部分，**不会影响运行**，可以原样保留。
> 五步分别在验证：代码拿得到（checkout）→ Node 装得上（setup-node）→ 依赖装得全（npm ci）→ 代码规范过得去（lint）→ 真能构建出来（build）。

> **CI 里用的是 `npm ci`，它要求仓库里有 `package-lock.json`。**
> 在项目根目录执行 `Get-ChildItem package-lock.json`（macOS 用 `ls package-lock.json`）确认。
> 如果没有，先在本地跑一次 `npm install`，把生成的 `package-lock.json` 一起提交，否则 CI 会在 `npm ci` 这一步失败。

main 已经保护，不能直接 push，所以开分支走 PR：

```powershell
# 从当前 main 开一条新分支 chore/ci（分支名意思是“杂项：CI”）
git switch -c chore/ci

# 只把 CI 这一个文件放进待提交区
git add .github/workflows/ci.yml

# 存一个提交，说明“加了 lint 和 build 的自动检查”
git commit -m "chore: add CI for lint and build"

# 把这条新分支上传到 GitHub，并记住对应关系（第一次需要 -u）
git push -u origin chore/ci
```

开 PR 之前，本地先跑一遍检查。Windows PowerShell 5.1 **不支持 `&&`**，所以分两条：

```powershell
# 代码检查：必须 0 error
npm run lint

# 生产构建：必须成功
npm run build
```

#### 8.1 怎么开 PR（两种入口，任选一种）

**入口 A：黄色提示条（最快）**

1. push 成功后 1–2 分钟内，打开仓库首页 `https://github.com/xGlaciesx/body-prism`；
2. 页面顶部会出现一条黄色提示：`chore/ci had recent pushes ...`；
3. 点右边的绿色 **Compare & pull request**。

> 黄色条过一段时间会消失，找不到就用入口 B。

**入口 B：Pull requests 标签（永远可用）**

1. 点仓库顶部 **Pull requests**；
2. 点绿色 **New pull request**；
3. 页面上有两个下拉：
   - **base** 选 `main`（要并进哪里）；
   - **compare** 选 `chore/ci`（拿哪条分支来并）；
   - 方向是 **main ← chore/ci**，别选反；
4. 确认页面出现绿色 **Able to merge**，下面的 **Files changed** 只有 `.github/workflows/ci.yml`；
5. 点 **Create pull request**。

#### 8.2 PR 页面怎么填

- **Title**：`chore: add CI for lint and build`
- **描述**：直接粘下面这段，按实际情况改：

```text
## 做了什么
- 新增 GitHub Actions CI，在 PR 和 main 更新时自动跑 lint + build

## 为什么
- 保证合并进 main 的代码一定能构建，减少“合并后才发现跑不起来”

## 怎么验证
- [x] 本地 npm run lint
- [x] 本地 npm run build
- [ ] GitHub Actions 变绿

## 风险 / 没做
- 还没有加测试；第一周只做 lint + build
```

- **右侧 Reviewers**：点齿轮，选男孩的 GitHub 用户名；
- 其他（Assignees、Labels、Projects）都可以不填；
- 最后点绿色 **Create pull request**。

#### 8.3 CI 在哪里看，什么叫“绿了”

PR 创建成功后，PR 页面**最下方**会出现一块检查区域：

| 你看到的 | 含义 | 要做什么 |
|---|---|---|
| 黄色圆圈 + `Some checks haven't completed yet` | CI 正在跑 | 等 1–3 分钟，刷新页面 |
| 绿色对勾 + `All checks have passed` / `1 successful check` | **CI 绿了** | 可以请男孩 Approve |
| 红色叉 + `Some checks have failed` | CI 失败 | 点 **Details** 看日志，把报错贴给 Cline |

**点开看细节的三种路径：**

1. PR 页面底部 → 点 **Details** → 进入这次运行 → 左侧 job **lint-build** → 展开红色步骤（`npm ci` / `npm run lint` / `npm run build`），看最后 20 行报错；
2. PR 顶部 **Checks** 标签 → 同样能看到每个检查；
3. 仓库顶部 **Actions** 标签 → 左侧 **CI** → 点最新一次运行 → job **lint-build**。

**“绿”具体代表什么：** 那台 GitHub 虚拟机上按顺序跑完了五步——取代码 → 装 Node 22 → `npm ci` → `npm run lint` → `npm run build`，五步全部退出码为 0。任何一步失败，整个 job 就是红叉。

**几个常见情况：**

- **PR 开了但一直没有检查**：正常，CI 由 `pull_request` 事件触发；只 push 分支、还没开 PR 时不会跑（`push` 只监听 main）。开 PR 或往 PR 里再 push 一次就会触发。
- **页面提示 `Approve and run workflows`**：男孩点一下这个按钮，CI 才会开始；这是 GitHub 对首次贡献者的保护。
- **Actions 页面提示 workflows 被禁用**：仓库 **Settings → Actions → General** → 选 **Allow all actions and reusable workflows** → Save。
- **CI 红了但本地是绿的**：多半是 `package-lock.json` 没提交，`npm ci` 找不到锁文件；本地 `npm install` 后把 `package-lock.json` 一起提交再 push。

#### 8.4 让男孩 Approve（女孩不能批自己的 PR）

GitHub 不允许 PR 作者批准自己的 PR，所以女孩的 PR 必须由男孩点 Approve。男孩的操作：

1. 登录自己的 GitHub，打开女孩发来的 PR 链接；
2. 点 **Files changed**，看一遍改了什么（这里只有 `ci.yml`）；
3. 点右上 **Review changes**；
4. 选 **Approve**，可以写一句 `LGTM`；
5. 点 **Submit review**。

> 如果男孩还没接受 collaborator 邀请，PR 页面会提示他没有权限；先回到第 7 步把邀请接受掉。

#### 8.5 合并

等 **CI 绿 + 男孩 Approve** 两个条件都满足：

1. PR 页面底部绿色 **Squash and merge** → **Confirm squash and merge**；
2. 合并后点 **Delete branch**（删的是 GitHub 上的远端分支）。

如果 **Squash and merge** 是灰的，把鼠标放上去会显示原因：

- `Review required`：男孩还没 Approve；
- `Required status check "lint-build" is expected`：CI 还没跑完或没过；
- `This branch has conflicts`：需要先解决冲突（见文档 02 / 15）。

合并后，回到本地：

```powershell
# 切回主干 main
git switch main

# 下载并合并远端 main
git pull origin main
```

**让 CI 成为合并的硬门槛（第一次 PR 合并后做一次）：**

1. 仓库 → **Settings** → 左侧 **Branches**；
2. 找到 `main` 那条规则，点右侧 **Edit**；
3. 勾选 **Require status checks to pass before merging**；
4. 下面的搜索框输入 `lint-build`，选中出现的 **`CI / lint-build`**；
5. 再勾 **Require branches to be up to date before merging**（可选但推荐）；
6. 点最下方 **Save changes**。

之后每个 PR 的 Merge 按钮都会等 `lint-build` 变绿才可用；红了就是灰的，点不动。

#### 第 9 步：Windows 常见报错（先看这里）

| 报错 | 原因 | 处理 |
|---|---|---|
| `npx.ps1 cannot be loaded because running scripts is disabled` | PowerShell 执行策略 | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| `The token '&&' is not a valid statement separator` | PowerShell 5.1 不支持 `&&` | 把两条命令分两行；或用 `;` |
| `ssh-add` 报 `Error connecting to agent` | ssh-agent 服务没启动 | 管理员 PowerShell 启动服务，见文档 02 的 0.2 |
| `git push` 要求输入密码 | HTTPS 不能用账号密码 | 用 PAT，或改用 SSH |
| `LF will be replaced by CRLF` | Windows 换行符提示 | 已设 `core.autocrlf input`，一般可忽略 |
| `'bash' is not recognized` | 在 PowerShell 里跑了 `.sh` | 不要跑 `.sh`；用 PowerShell 命令，或装 Git Bash |

---

## 4. 男孩的手把手 7 步（macOS 27，附排错）

> 男孩的电脑是 **macOS 27 Golden Gate**（2026 年 9 月发布，只支持 Apple Silicon）。下面命令都在 **Terminal**（默认 zsh）里运行。
> 不要照抄上一节给女孩的 PowerShell 命令；两边一样的命令会写“两个系统都一样”。

#### 第 1 步：装 Git + VSCode（macOS）

macOS 一般自带 Git，但第一次运行时会提示安装 **Command Line Tools**。先执行：

```bash
xcode-select --install
```

弹窗点 **Install**，等它装完。如果已经装过，会提示 `command line tools are already installed`。

然后安装：

1. **Node.js 22 LTS**：https://nodejs.org/  
   下载 **macOS Installer (.pkg)**。macOS 27 只支持 Apple Silicon（M1 及以后），选 **arm64** 即可；如果系统是 macOS 26 或更早的 Intel 机器，才选 **x64**。  
   不确定就点左上角苹果 → **关于本机**，看“芯片”那一行。
2. **VSCode**：https://code.visualstudio.com/  
   下载 **macOS** 版本，拖进 Applications。
3. **Cline**：打开 VSCode → 扩展市场（`Command+Shift+X`）→ 搜 **Cline** → **Install**。
4. 可选：**GitHub Desktop**：https://desktop.github.com/

验证：

```bash
# 看 Git 版本
git --version

# 看 Node.js 版本
node -v

# 看 npm 版本
npm -v
```

应该看到：

```text
git version 2.x.x
v22.x.x
10.x.x
```

如果提示 `xcrun: error: invalid active developer path`，重新运行 `xcode-select --install`。  
如果 `node` 找不到，重开 Terminal；还不行就重装 Node 的 `.pkg`。

#### 第 2 步：配置 Git 身份（macOS，男孩）

> 男孩的 GitHub 账号是 **ziangzhang07**，邮箱 **1248696312@qq.com**。先配置好，后面提交才会显示成你。

```bash
# 提交时显示的名字（用 GitHub 用户名）
git config --global user.name "ziangzhang07"

# 提交时显示的邮箱（用 GitHub 账号里的邮箱）
git config --global user.email "1248696312@qq.com"

# 检查是否设置成功
git config --global user.name
git config --global user.email
```

两行分别应输出 `ziangzhang07` 和 `1248696312@qq.com`。

#### 第 3 步：接受邀请（两个系统一样）

女孩（xGlaciesx）在仓库 **Settings → Collaborators** 里邀请 **ziangzhang07** 后，男孩的 GitHub 邮箱 **1248696312@qq.com** 会收到邮件，或者 GitHub 右上角有通知。

点 **Accept invitation**。接受后，女孩的 Collaborators 列表里男孩的状态会从 **Pending invite** 变成 **Collaborator**。

#### 第 4 步：克隆仓库（macOS）

```bash
# 回到用户主目录
cd ~

# 新建 Projects 文件夹（已存在也不报错）
mkdir -p Projects

# 进入 Projects
cd Projects

# 把 GitHub 上的仓库整个下载到本地
git clone git@github.com:xGlaciesx/body-prism.git

# 进入项目文件夹
cd body-prism

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

`~` 就是 `/Users/你的用户名`。看到 `http://localhost:3000` 就成功。

如果 SSH 报 `Permission denied (publickey)`：

- 先改用 HTTPS 克隆：
  ```bash
  # 改用 HTTPS 地址重新克隆（会新建一个 body-prism 文件夹）
  git clone https://github.com/xGlaciesx/body-prism.git
  ```
- 或者按文档 02 的 0.2 配 SSH key；
- 或者装 GitHub Desktop，登录后 Clone。

如果 `npm install` 很慢：

```bash
# 把 npm 下载源换成国内镜像（只影响 npm，不影响 Git）
npm config set registry https://registry.npmmirror.com

# 重新安装依赖
npm install
```

> 只改 npm 镜像，不要改 Git 仓库地址。

#### 第 5 步：开第一个分支（两个系统一样）

```bash
# 切回主干 main
git switch main

# 拉取并合并最新 main
git pull origin main

# 新建免责声明的文档分支
git switch -c docs/medical-disclaimer
```

#### 第 6 步：写免责声明（macOS）

在 VSCode 里打开项目，新建文件，保存为：

```text
docs/medical-disclaimer.md
```

如果 `docs` 文件夹不存在，先在 Terminal 里建：

```bash
# 建 docs 文件夹（已存在也不报错）
mkdir -p docs
```

然后再在 VSCode 里新建 `docs/medical-disclaimer.md`。

内容：

```md
# 医学内容免责声明与审核规则

## 免责声明

本网站用于健康信息素养教育，不提供诊断、治疗、用药或剂量建议。
如有胸痛、呼吸困难、意识障碍、严重过敏、自伤念头等急症表现，
请立即联系急救或前往急诊，不要依赖本网站。

## 内容边界

- 不根据用户描述做诊断；
- 不推荐处方药、剂量或停药方案；
- 不替代医生面诊；
- 不把假说写成共识；
- 不把中医经典理论写成解剖结构。

## 证据等级

- A：指南、系统综述、高质量 RCT
- B：单项 RCT、队列研究、权威教科书
- C：观察性研究、机制研究、专家共识
- D：传统理论、个案、待验证假说

## 标注规则

- 中医内容必须标“传统理论”；
- 信息论内容必须标“概念类比”；
- 有争议的内容必须并列呈现；
- 每条 claim 必须有 evidenceLevel 和 sourceIds。

## 审核

- 医学内容由临床医学成员审核；
- 审核人签字后才能合并；
- 发现错误，先下线，再修正。

## 紧急情况

胸痛、呼吸困难、突发无力/说话不清、严重过敏、自伤念头：
请立即拨打 120 或前往急诊。
```

#### 第 7 步：提交、推送、开 PR（macOS）

```bash
# 只把免责声明这一个文件放进待提交区
git add docs/medical-disclaimer.md

# 存一个提交
git commit -m "docs: add medical disclaimer and review policy"

# 上传分支并建立跟踪关系
git push -u origin docs/medical-disclaimer
```

打开 GitHub，应该看到 **Compare & pull request**：

1. 点它；
2. 标题：`docs: add medical disclaimer and review policy`
3. 描述里写：
   - 做了什么：新增医学免责声明与审核规则
   - 为什么：明确内容边界，满足比赛与医学审核要求
   - 怎么测试：本地预览 Markdown，检查链接/格式
   - 检查清单：勾选已做的
4. Reviewer 选女孩；
5. 点 **Create pull request**。

#### 第 8 步：macOS 常见报错（先看这里）

| 报错 | 原因 | 处理 |
|---|---|---|
| `xcrun: error: invalid active developer path` | 没装 Command Line Tools | `xcode-select --install` |
| `Permission denied (publickey)` | SSH key 没配好 | 先用 HTTPS，或按文档 02 的 0.2 配 |
| `command not found: node` | Node 没装或 PATH 不对 | 重装 Node `.pkg`，重开 Terminal |
| `zsh: command not found: code` | VSCode 没装 `code` 命令 | VSCode 里 `Command+Shift+P` → 搜 “Shell Command: Install 'code' command in PATH” |
| `npm install` 报 `EACCES` | 权限问题 | 不要用 `sudo`；重装 Node，或用 nvm |
| `fatal: not a git repository` | 不在项目目录 | `cd ~/Projects/body-prism` |

---

## 5. 第一个 PR 怎么合并

### 女孩 review

1. 打开 PR → **Files changed**
2. 看内容有没有问题：
   - 有没有诊断/用药承诺；
   - 有没有把中医写成解剖；
   - 有没有来源；
   - 有没有密钥。
3. 点 **Review changes** → **Approve** → **Submit review**。
4. 如果 CI 是绿的，点 **Squash and merge**。
5. 合并后点 **Delete branch**。

### 男孩同步

```bash
# 切回主干 main
git switch main

# 拉取刚合并的 PR
git pull origin main

# 强制删除本地文档分支（PR 已合并；squash 后 Git 可能提示未合并，所以用 -D）
git branch -D docs/medical-disclaimer
```

现在两个人都拥有：

- 一个 public 仓库；
- 一条真实 PR 记录；
- 一次 review；
- 一次 squash merge；
- 一条完整的 Git 历史。

**这就是比赛的“协作证据”起点。**

---

## 6. 配置 Cline（30 分钟）

按文档 01 做，核心只有五件事：

1. VSCode 安装 Cline；
2. API Provider 选 `OpenAI Compatible`；
3. Base URL：`https://api.deepseek.com/v1`；
4. Model：`deepseek-chat`；
5. 关闭 Terminal / File write 自动批准。

把文档 01 里的 `AGENTS.md` 放到项目根目录。

测试提示词：

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

如果它能准确回答，再让它改代码。

---

## 7. 预算先设上限（10 分钟）

1. 打开 DeepSeek 控制台；
2. 建两个 Key：
   - `DEEPSEEK_DEV_KEY`：给 Cline 写代码；
   - `DEEPSEEK_APP_KEY`：给网站运行时；
3. 两个 Key 都设月度预算上限；
4. 开发期默认 `AI_MOCK=1`，不要每次改 CSS 都调真实 API；
5. 截图保存预算设置，放进 `docs/cost.md`。

推荐先设：

```text
DEV Key：¥100/月
APP Key：¥100/月
总硬上限：¥500/30 天
```

详细方案见文档 05。

---

## 8. 每天 20 分钟的固定动作

> 下面这些 Git 命令两个系统一样。Windows PowerShell 里一次运行一条，不要用 `&&`。

### 早上开工

```bash
# 切回主干 main
git switch main

# 拉取最新 main
git pull origin main

# 从最新 main 新建今天的分支
git switch -c feat/今天要做的事
```

### 晚上收工

```bash
# 先 git status 确认没有密钥，再把今天改的文件逐个加进来
git add <今天改的文件>

# 存一个提交
git commit -m "feat(heart): add page skeleton"

# 上传分支（第一次用 -u，之后直接 git push）
git push -u origin feat/今天要做的事
```

然后开 PR，请对方 review。完整版（含 lint/build、合并、删分支、Gitee 镜像）见 **15**。

### 写 3 行日志

```md
## 2026-10-19
- 今天完成：
- 明天第一件事：
- 卡住的地方：
```

日志放在 `docs/daily/2026-10-19.md`，一起提交。评委能看到真实过程。

---

## 9. 今天不要做的事

- 不要做登录/管理后台（W2 末/W3 初再做）；
- 不要下载几百 MB 的原始 3D 数据；
- 不要一次性让 Cline “把整个网站写出来”；
- 不要买服务器、域名、付费数据库；
- 不要把 API Key 发到群里、截图里、commit 里；
- 不要直接 push `main`；
- 不要用 `git reset --hard` 解决不懂的问题；
- 不要提交 `node_modules`、`.next`、`.env.local`、原始 PSD/OBJ。

---

## 10. 卡住了怎么办

按这个顺序：

1. **先看完整报错**，不要只贴最后一行；
2. 运行：

```bash
# 看当前分支、改了哪些文件
git status

# 看最近 5 条提交
git log --oneline -5

# 看 Node 版本
node -v

# 看 npm 版本
npm -v
```

3. 问 Cline：

```text
先不要改代码。解释这个报错的原因，给我三个可能原因，
再给最小修复步骤。不要重构，不要删除文件。
```

4. 如果 45 分钟还卡着：
   - 把报错、你做了什么、期望什么，发给对方；
   - 或者先跳过，做下一件不依赖它的事；
   - 不要硬耗一整天。

5. 记住三条保命命令：

```bash
git status          # 我现在在哪、改了什么
git diff            # 我具体改了什么
git restore <文件>  # 放弃这个文件的未提交修改
```

> `git reset --hard` 会丢东西。不懂就不要用。

---

## 11. 今天结束后，下一步是什么

明天（Day 2）按文档 04 做：

1. 3D spike：BodyParts3D 下载一个器官 → Blender → GLB → R3F；
2. 首页静态版；
3. 确定内容 schema；
4. 建 Project 看板，把第一周任务拆成 Issue。

如果今天还有 30 分钟，建议接着读：

- **14 第一天写代码**：明天第一次真正写页面前，照着它做一遍——文档包放哪、AGENTS.md 怎么填、Cline 第一句话说什么、首页怎么进 main；
- **15 每天的 Git 节奏**：从明天起，每天早上拉 main、开分支，晚上合并、删分支；附两张可打印清单；
- **08 Git 入门**：把 commit / branch / pull / push 的概念补齐，明天开始就不会只会抄命令；
- **11 VSCode 实战**：学会在 VSCode 里打开项目、用 `start` / `stop` 和 AI 结对、点按钮完成拉取和上传；
- **09 Web 入门**：先建立前端/后端的地图，知道每个文件是干什么的；
- **16 MVP 实施手册**：开始写页面前看，按五个纵向切片的顺序做，不要先建十个空页面。

第一周结束时的目标不是“完整网站”，而是：

```text
首页能看
身体地图能点
心脏/脑/肠三个页面有内容
3D 决策已定：继续 3D 还是 2.5D
两个人能稳定 PR
```

---

## 12. 一句话

> **先把路修通，再开始跑。**
> 今天这 10 条完成，比写 500 行看不懂的代码更值钱。
