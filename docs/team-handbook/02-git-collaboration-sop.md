# GitHub / Gitee 两人协同 SOP

> 项目：人体棱镜 Body Prism——AI 驱动的身体信息三镜图谱。
> 适用对象：两个人、都是大一新生、第一次做完整项目。
> 系统：女孩 Windows 11（Windows PowerShell），男孩 macOS 27 Golden Gate（Terminal/zsh）；文中已分别标注。
> 配套：概念不清先读 **08 Git 入门**；想在 VSCode 里点按钮完成拉取/合并/上传，读 **11 VSCode 实战**。
> 目标：代码库从第一天就有完整历史；两个人不互相覆盖；评委能看出真实协作。

---

## 0. 零基础第一遍：从安装到第一个 PR（照着做）

> **先确认你走到哪一步：**
> - 如果已经按 **00 起步手册**做完（Git 装好、身份配好、仓库建好、协作者加好、main 保护开好、CI 绿灯、第一个 PR 已合并），**这一章的 0.1–0.10 只当参考资料看，不要再跑一遍**；
> - 00 是唯一“从零到第一个 PR”的操作主线；本章保留同样的步骤，是为了概念复习和排错；
> - 本章独有的内容：冲突处理、rebase/merge 选择、Gitee 镜像细节、提交信息规范、每周复盘——这些 00 不展开。
> - 判断标准：终端里 `git remote -v` 能看到 `origin`，GitHub 上能看到已合并的 PR，就说明你已经做过，**跳过重复命令**。
> - 拉取方式：**日常一律用普通 `git pull`**（00 和 15 都是这个口径）。本章后面出现的 `git pull --rebase` 是进阶内容，讲的是“怎么让历史保持一条直线”；第一次协作可以完全不用，等熟悉了再回来看。**不要两种混着用**。

> 这一章是“手把手”。后面的章节是“规则和参考”。第一次先照这一章做完，再回头看后面的。

### 0.0 先认清两台电脑：Windows 和 macOS 命令对照

| 项目 | 女孩（Windows 11） | 男孩（macOS 27） |
|---|---|---|
| 终端 | 开始菜单搜 **Windows PowerShell** | 启动台搜 **Terminal**（默认 zsh） |
| 芯片 | Intel / AMD | macOS 27 只支持 Apple Silicon（M1 及以后） |
| 家目录 | `C:\Users\<用户名>` | `/Users/<用户名>` |
| 进家目录 | `cd $env:USERPROFILE` | `cd ~` |
| 建目录 | `New-Item -ItemType Directory Projects` | `mkdir Projects` |
| 列文件 | `Get-ChildItem`（`ls` 也能用） | `ls` |
| 看文本 | `Get-Content 文件` | `cat 文件` |
| 临时环境变量 | `$env:AI_MOCK="1"` | `export AI_MOCK=1` |
| 一行多条命令 | 用 `;`，**不要用 `&&`** | `&&` 或 `;` |
| 命令续行 | 反引号，**不推荐** | 反斜杠 `\` |
| 复制/粘贴 | `Ctrl+C` / `Ctrl+V` | `Command+C` / `Command+V` |

四条规则：

1. **Windows PowerShell 5.1 不支持 `&&`。** 看到把两条 npm 命令用 `&&` 连起来的写法，Windows 用户要拆成两行。
2. **不要混抄。** 标“Windows”的给女孩，标“macOS”的给男孩；通用命令会写“两个系统都一样”。
3. **Git 里的路径统一用 `/`。** 例如 `docs/medical-disclaimer.md`，Windows 也认。
4. **环境变量优先写进 `.env.local`。** 两个系统行为一致，不用记 `export` 和 `$env:` 的区别。

### 0.1 安装与验证

#### Windows（女孩）

1. **Git for Windows**：https://git-scm.com/download/win  
   安装选项：
   - Default editor：**Use Visual Studio Code**
   - PATH：**Git from the command line and also from 3rd-party software**
   - HTTPS transport：**Use the OpenSSL library**
   - Line ending conversions：**Checkout as-is, commit Unix-style line endings**
   - Terminal emulator：**Use Windows' default console window**
2. **Node.js 22 LTS**：https://nodejs.org/ → **Windows Installer (.msi) 64-bit**，保持 **Add to PATH** 勾选。
3. **VSCode**：https://code.visualstudio.com/ → **Windows System Installer**，勾选 **Add to PATH**。
4. **GitHub Desktop**（可选，新手推荐）：https://desktop.github.com/

打开 **Windows PowerShell**（开始菜单搜索），验证：

```powershell
git --version
node -v
npm -v
```

如果 `npx` 报脚本被禁止：

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

配置身份：

```powershell
# 女孩的 GitHub 账号：xGlaciesx；邮箱：lisa.lrx@qq.com
git config --global user.name "xGlaciesx"
git config --global user.email "lisa.lrx@qq.com"
git config --global init.defaultBranch main
git config --global core.autocrlf input
git config --global core.longpaths true
git config --global credential.helper manager
```

检查：

```powershell
git config --global --list
```

#### macOS（男孩）

macOS 一般自带 Git，但第一次要装 Command Line Tools：

```bash
xcode-select --install
```

然后安装：

1. **Node.js 22 LTS**：https://nodejs.org/ → **macOS Installer (.pkg)**。  
   Apple Silicon 选 **arm64**，Intel 选 **x64**。
2. **VSCode**：https://code.visualstudio.com/ → **macOS**，拖进 Applications。
3. **GitHub Desktop**（可选）：https://desktop.github.com/

打开 **Terminal**，验证：

```bash
git --version
node -v
npm -v
```

配置身份：

```bash
# 男孩的 GitHub 账号：ziangzhang07；邮箱：1248696312@qq.com
git config --global user.name "ziangzhang07"
git config --global user.email "1248696312@qq.com"
git config --global init.defaultBranch main
git config --global core.autocrlf input
git config --global credential.helper osxkeychain
```

检查：

```bash
git config --global --list
```

> `core.autocrlf input` 两边都设，仓库里统一存 LF。否则 Windows 和 macOS 一改同一个文件，Git 会显示整份文件都变了。

---

### 0.2 配 SSH（推荐）或先用 HTTPS

> 这一步 Windows 和 macOS 差别最大。**按自己的系统做，不要混抄。**
> 如果今天配不好，不要卡住：先用 HTTPS 把仓库跑通，明天再换 SSH。

#### macOS（男孩）

1. 生成 key：

```bash
# 注释用男孩的 GitHub 邮箱
ssh-keygen -t ed25519 -C "1248696312@qq.com"
```

一路回车。passphrase 可以留空，也可以设一个（设了就记住）。

2. 启动 ssh-agent，并把 key 存进 macOS 钥匙串：

```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

> 旧版 macOS 如果不认识 `--apple-use-keychain`，改用 `ssh-add -K ~/.ssh/id_ed25519`。

3. 配置 `~/.ssh/config`，让 Terminal 每次自动加载：

```bash
mkdir -p ~/.ssh
cat >> ~/.ssh/config <<'EOF'
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519

Host gitee.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
EOF
chmod 600 ~/.ssh/config
```

> 如果 `~/.ssh/config` 里已经有 `Host github.com`，不要再追加一遍；用 VSCode 打开文件，把缺少的几行补进去即可。

4. 复制公钥：

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

（也可以 `cat ~/.ssh/id_ed25519.pub`，手动选中复制。）

#### Windows（女孩）

1. 确认 Windows 已安装 **OpenSSH Client**：

   设置 → 系统 → 可选功能 → 搜索 **OpenSSH Client**。  
   如果没有，用**管理员 PowerShell** 安装。打开方式：开始菜单搜索 `PowerShell` → 在 **Windows PowerShell** 图标上**右键** → 点 **以管理员身份运行**；窗口标题栏出现“管理员”字样才算成功。

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

2. 生成 key：

```powershell
# 注释用女孩的 GitHub 邮箱
ssh-keygen -t ed25519 -C "lisa.lrx@qq.com"
```

一路回车。默认保存到 `C:\Users\<用户名>\.ssh\id_ed25519`。

3. 启动 ssh-agent 服务：

```powershell
Get-Service ssh-agent
```

如果状态不是 `Running`：

```powershell
Set-Service -Name ssh-agent -StartupType Automatic
Start-Service ssh-agent
```

如果提示 **拒绝访问 / Access is denied**：  
开始菜单搜索 `PowerShell` → 在 **Windows PowerShell** 图标上右键 → **以管理员身份运行**（标题栏应显示“管理员”）→ 执行上面两行 → 关掉管理员窗口，回到普通窗口继续。

4. 把 key 加入 agent：

```powershell
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

如果报 `Error connecting to agent: No such file or directory`，说明第 3 步的服务没启动，回去重做。

5. 复制公钥到剪贴板：

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

#### 加到 GitHub / Gitee（两个系统一样）

复制的内容应该以 `ssh-ed25519` 开头、以邮箱结尾，是**一整行**。

- GitHub：右上角头像 → **Settings** → **SSH and GPG keys** → **New SSH key**  
  Title 随便写，例如 `Windows 女孩` / `Mac 男孩`；Key 粘贴 → **Add SSH key**。
- Gitee：头像 → **设置** → **SSH 公钥** → 粘贴 → 确定。

#### 测试（两个系统一样）

```bash
ssh -T git@github.com
ssh -T git@gitee.com
```

第一次会问：

```text
Are you sure you want to continue connecting (yes/no)?
```

输入 `yes` 回车。

看到下面这句就成功：

```text
Hi <用户名>! You've successfully authenticated, but GitHub does not provide shell access.
```

Gitee 看到 `Hi <用户名>! You've successfully authenticated...` 也算成功。

#### 还是失败怎么办

| 现象 | 先检查 |
|---|---|
| `Permission denied (publickey)` | 复制的是不是 `.pub` 文件；公钥有没有加到对应平台 |
| Windows `ssh-add` 连不上 agent | ssh-agent 服务没启动；用管理员 PowerShell 启动（图标右键 → 以管理员身份运行） |
| macOS 每次都问 passphrase | `ssh-add --apple-use-keychain` 是否执行；`~/.ssh/config` 是否写对 |
| `Bad permissions` | macOS 执行 `chmod 600 ~/.ssh/id_ed25519` |
| 公司/校园网拦截 22 端口 | 改用 HTTPS，或用 GitHub Desktop |

> 记住：SSH 只是“免密码登录”。今天配不好不影响写代码，HTTPS 一样能 push。

---

### 0.3 建 GitHub 仓库（女孩做）

网页操作：

1. GitHub 右上角 `+` → **New repository**
2. Repository name：`body-prism`
3. Description：`AI-native body information atlas with three lenses`
4. 选 **Public**
5. **不要**勾 “Add a README file”
6. **不要**选 `.gitignore` / license
7. **Create repository**

> 为什么不要勾：本地已经有 Next.js 生成的 README 和 `.gitignore`，勾了会产生一次“远端有提交、本地也有提交”的合并，新手容易卡住。

### 0.4 加 collaborator（女孩做）

1. 仓库 → **Settings** → **Collaborators**
2. **Add people**
3. 输入男孩的 GitHub 用户名/邮箱
4. 权限选 **Write**
5. 发送邀请

男孩在邮箱或 GitHub 通知里点 **Accept invitation**。

### 0.5 女孩：初始化项目并 push（Windows PowerShell 详细版 + macOS 对照）

> 这一节主角是女孩的 **Windows 11**。0.5.10 附 macOS 等价步骤，男孩或换电脑时参考。

#### 0.5.1 打开 PowerShell

开始菜单 → 输入 `PowerShell` → 点 **Windows PowerShell**（图标是一个蓝色 `>_` 窗口）。  
**不要**用管理员窗口：普通窗口就够。管理员窗口只用于安装系统组件——开始菜单搜 `PowerShell` → 在图标上**右键** → **以管理员身份运行**，标题栏会多出“管理员”三个字。

确认自己在哪：

```powershell
Get-Location
```

#### 0.5.2 检查 Node 和 npm

```powershell
node -v
npm -v
```

应该是 `v22.x.x` 和 `10.x.x`。如果 `npx` 报 **“running scripts is disabled”**：

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

输入 `Y` 回车。

#### 0.5.3 建项目目录

```powershell
cd $env:USERPROFILE
if (-not (Test-Path Projects)) { New-Item -ItemType Directory Projects | Out-Null }
cd Projects
Get-Location
```

最后一行应该显示 `C:\Users\你的用户名\Projects`。

#### 0.5.4 创建 Next.js 项目

**复制这一整行**，不要用反斜杠换行：

```powershell
npx create-next-app@latest body-prism --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

如果提示 `Ok to proceed? (y)`，输入 `y`。  
如果它问问题：

| 问题 | 选择 |
|---|---|
| Would you like to use Turbopack? | Yes |
| Would you like to use React Compiler? | No |
| Would you like to customize the import alias? | No |

> 为什么不能照抄网上带 `\` 的多行命令：反斜杠续行是 macOS/Linux 的写法。PowerShell 会把它当成普通字符，直接报错。PowerShell 的续行符是反引号，但新手最容易在这里出错，所以本文全部写成一行。

#### 0.5.5 启动，确认页面

```powershell
cd body-prism
npm run dev
```

浏览器打开 `http://localhost:3000`。看到 Next.js 默认页就成功。  
这个窗口保持运行，停止用 `Ctrl+C`。

#### 0.5.6 另开一个 PowerShell 窗口

开始菜单再开一个 **Windows PowerShell**：

```powershell
cd $env:USERPROFILE\Projects\body-prism
git status
```

如果提示 `not a git repository`：

```powershell
git init
git branch -M main
```

如果 `create-next-app` 已经初始化过 Git，会显示当前分支和未跟踪文件，这是正常的。

#### 0.5.7 首次提交

先确认 `.gitignore` 存在，并包含：

```text
node_modules/
.next/
.env.local
```

然后：

```powershell
git add .
git status
```

**一定要看 `git status` 的输出**。确认没有：

- `.env.local`
- `node_modules/`
- `.next/`

有的话说明 `.gitignore` 没生效，先停下检查，不要 commit。

确认没问题后：

```powershell
git commit -m "chore: scaffold Next.js app"
```

#### 0.5.8 关联远端并 push

> **00 已经建过仓库并 push 过？跳过这一小节。** `git remote -v` 里已有 `origin` 就说明做过了；重复 `git remote add` 只会报 `already exists`。

先在 GitHub 网页建好空仓库（0.3），然后：

```powershell
git remote add origin git@github.com:xGlaciesx/body-prism.git
git remote -v
git push -u origin main
```

`git remote -v` 应该显示两行：`fetch` 和 `push`，地址都对。

如果 SSH 还没配好，先用 HTTPS：

```powershell
git remote add origin https://github.com/xGlaciesx/body-prism.git
git push -u origin main
```

会弹出 **Git Credential Manager**，按提示在浏览器登录 GitHub。  
如果要求输入密码，**不要输 GitHub 账号密码**，要用 Personal Access Token（PAT）。

如果刚才已经用 SSH 加过 `origin`，现在想换 HTTPS：

```powershell
git remote set-url origin https://github.com/xGlaciesx/body-prism.git
git push -u origin main
```

#### 0.5.9 Windows 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| `npx.ps1 cannot be loaded` | PowerShell 执行策略 | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| `The token '&&' is not a valid statement separator` | PowerShell 5.1 不支持 `&&` | 两条命令分两行 |
| `git: command not found` | Git 没进 PATH | 重装 Git，选 “Git from the command line...” |
| `remote origin already exists` | 已经加过 origin | `git remote set-url origin <正确地址>` |
| `failed to push some refs` | 远端有本地没有的提交 | `git pull --rebase origin main` 后再 push |
| `Permission denied (publickey)` | SSH 没配好 | 先用 HTTPS，或回 0.2 |
| `LF will be replaced by CRLF` | 换行符提示 | 已设 `core.autocrlf input`，一般可忽略 |

#### 0.5.10 macOS 等价步骤（男孩 / 换机参考）

```bash
cd ~
mkdir -p Projects
cd Projects

npx create-next-app@latest body-prism --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd body-prism
npm run dev
```

另开一个 Terminal：

```bash
cd ~/Projects/body-prism
git status
# 如果不是 Git 仓库：
git init
git branch -M main

git add .
git status
git commit -m "chore: scaffold Next.js app"

git remote add origin git@github.com:xGlaciesx/body-prism.git
git push -u origin main
```

macOS 可以用反斜杠换行，但**为了和文档统一，也建议写成一整行**，减少复制出错。

---

### 0.6 保护 main（女孩做，push 之后）

**为什么要保护 main：** `main` 是主干（永远要能演示的那一版）。保护它 = 给主干上锁：谁都不能直接 `push`，所有改动必须先开分支、走 PR（Pull Request，合并申请），CI 跑绿、队友看过，才能并进来。这样一个人改坏了，也坏不到主干上。详见 **00** 的“保护 main 是干什么的？”。

1. 仓库 → **Settings** → **Branches**
2. **Add branch protection rule**
3. Branch name pattern：`main`
4. 勾选：
   - [x] Require a pull request before merging
   - [x] Require approvals：`1`
   - [x] Dismiss stale pull request approvals when new commits are pushed
   - [x] Require conversation resolution before merging
   - [ ] Require status checks（先不勾）
   - [x] Do not allow bypassing the above settings
5. **Create**

**顺序很重要：**

```text
先 push 初始代码
→ 再保护 main
→ 再在分支里提交 CI
→ CI 跑绿后，才勾 lint-build 状态检查
```

如果先勾了还不存在的 `lint-build`，之后所有 PR 都会卡住。

### 0.6.1 加 CI（女孩做，分支 + PR）

CI 文件内容见本文第 5 节。因为 `main` 已保护，不能直接 push：

```bash
git switch -c chore/ci
# 新建 .github/workflows/ci.yml，内容见第 5 节
git add .github/workflows/ci.yml
git commit -m "chore: add CI for lint and build"
git push -u origin chore/ci
```

在 GitHub 开 PR，**男孩 Approve** 后 squash merge。

本地也可以先自查（Windows 分两条，不要用 `&&`）：

```bash
npm run lint
npm run build
```

CI 跑绿后，回到 **Settings → Branches → 编辑 main 规则**：

- [x] Require status checks to pass before merging
- 搜索 `lint-build`，勾选出现的检查（可能显示为 `CI / lint-build`）
- [x] Require branches to be up to date before merging

### 0.7 男孩：克隆并跑起来（macOS 详细版 + Windows 对照）

#### 0.7.1 打开 Terminal

`Command + 空格` → 输入 `Terminal` → 回车。  
或者 VSCode 里按 `Control + 反引号` 打开集成终端。

确认位置：

```bash
pwd
```

应该显示 `/Users/你的用户名`。

#### 0.7.2 建目录并克隆

```bash
cd ~
mkdir -p Projects
cd Projects
git clone git@github.com:xGlaciesx/body-prism.git
```

如果 SSH 没配好：

```bash
git clone https://github.com/xGlaciesx/body-prism.git
```

如果提示 `Permission denied (publickey)`，回 0.2 配 SSH，或者今天先用 HTTPS。

#### 0.7.3 安装依赖并启动

```bash
cd body-prism
npm install
npm run dev
```

看到 `http://localhost:3000` 就成功。

如果 `npm install` 很慢：

```bash
npm config set registry https://registry.npmmirror.com
npm install
```

> 只改 npm 镜像，不要改 Git 仓库地址。

#### 0.7.4 macOS 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| `xcrun: error` | 没装 Command Line Tools | `xcode-select --install` |
| `command not found: node` | Node 没装 / PATH 不对 | 重装 Node `.pkg`，重开 Terminal |
| `Permission denied (publickey)` | SSH 没配好 | 回 0.2，或先用 HTTPS |
| `npm install` 报 `EACCES` | 权限问题 | 不要用 `sudo`；重装 Node，或用 nvm |
| `zsh: command not found: code` | VSCode 没装命令行工具 | VSCode 里安装 “Shell Command: Install 'code' command in PATH” |

#### 0.7.5 Windows 等价步骤（女孩 / 换机参考）

```powershell
cd $env:USERPROFILE
if (-not (Test-Path Projects)) { New-Item -ItemType Directory Projects | Out-Null }
cd Projects
git clone git@github.com:xGlaciesx/body-prism.git
cd body-prism
npm install
npm run dev
```

---

### 0.8 第一次 PR 演练（两个人一起做）

**男孩（macOS）：**

```bash
git switch main
git pull --rebase origin main
git switch -c docs/medical-disclaimer
```

如果 `docs` 文件夹不存在：

```bash
mkdir -p docs
```

在 VSCode 新建 `docs/medical-disclaimer.md`（内容见文档 00 第 4 节），然后：

```bash
git add docs/medical-disclaimer.md
git commit -m "docs: add medical disclaimer and review policy"
git push -u origin docs/medical-disclaimer
```

打开 GitHub，点 **Compare & pull request**：

- 标题：`docs: add medical disclaimer and review policy`
- 描述：做了什么 / 为什么 / 怎么测试 / 检查清单
- Reviewer：女孩
- **Create pull request**

**女孩：**

1. 打开 PR → **Files changed**
2. 逐行看：
   - 有没有“诊断/治愈/替代就医”这类承诺；
   - 有没有把中医写成解剖；
   - 有没有来源要求；
   - 有没有密钥。
3. 有问题：光标移到行号旁 → `+` → 写评论 → **Start a review** → **Request changes**。
4. 没问题：**Review changes** → **Approve** → **Submit review**。
5. CI 绿 + 1 approval 后：**Squash and merge** → **Confirm squash and merge**。
6. 点 **Delete branch**。

**男孩同步：**

```bash
git switch main
git pull --rebase origin main
git branch -D docs/medical-disclaimer   # PR 已合并；squash 合并后本地可能提示未合并，用 -D
```

到这里，你们已经有了：

- public 仓库；
- 保护 main；
- 真实 PR；
- 代码 review；
- squash merge；
- 完整历史。

### 0.9 第一次遇到冲突（照着做）

场景：两个人都改了 `README.md`。

```bash
git switch main
git pull --rebase origin main
git switch 你的分支
git rebase main
```

VSCode 会显示：

```text
<<<<<<< HEAD
女孩写的内容
=======
男孩写的内容
>>>>>>> 你的提交
```

处理：

1. 想清楚要保留哪段，或两段都保留；
2. 删除 `<<<<<<<`、`=======`、`>>>>>>>` 三行；
3. 保存；
4. 继续：

```bash
git add README.md
git rebase --continue
npm run lint
npm run build
git push --force-with-lease
```

规则：

- 只对自己的分支用 `--force-with-lease`；
- 永远不要对 `main` 用 `--force`；
- 冲突解决后必须 build；
- 看不懂就让 Cline 解释冲突，不要让它直接“帮你合并”然后提交。

**更简单的替代做法（初学者推荐）：** 如果 `rebase` 让你紧张，可以不用它。把上面的
`git rebase main` 换成 `git merge origin/main`，解决冲突后执行 `git add README.md`、
`git commit -m "merge: resolve README conflict with main"`，然后直接 `git push`。
这样**不需要 `--force-with-lease`**，历史里会多一个合并提交，但对两个人协作完全够用。
完整演练见 **08 Git 入门 §6.4**。等你熟悉了，再回来看本节理解 rebase 的好处。

### 0.10 Gitee 镜像（建库当天做一次）

1. Gitee 新建仓库 `body-prism`，**Public**，**不要**初始化 README；
2. 本地加 remote：

```bash
git remote add gitee git@gitee.com:<你的Gitee用户名>/body-prism.git
git remote -v
```

3. 首次推送：

```bash
git push gitee main --tags
```

4. 以后每次 `main` 合并后：

```bash
git push origin main --tags
git push gitee main --tags
```

5. 赛前检查：

- Gitee 仓库是 public；
- 有完整 commit 历史；
- 有 tag；
- README 能正常显示；
- 没有 `.env.local`。

> 如果 GitHub 网络太差，就反过来：Gitee 主库，GitHub 赛前镜像。不要两个平台各写各的。

### 0.11 不用命令行也行：GitHub Desktop

如果命令行实在卡住，可以用 GitHub Desktop 完成 80% 的日常操作。Windows 和 macOS 的菜单基本一样：

1. 打开 GitHub Desktop，登录 GitHub；
2. **File → Clone repository**；
3. 选 `body-prism`，选本地目录（Windows 例如 `C:\Users\<用户名>\Projects`，macOS 例如 `/Users/<用户名>/Projects`）；
4. 点 **Current branch** → **New branch**，先开分支，不要直接在 `main` 上改；
5. 修改文件后，左下角写 commit message → **Commit to <你的分支>**；
6. 点 **Push origin**；
7. 网页开 PR。

但**分支、PR、review、冲突**这四件事仍然要理解。比赛答辩可能会问。

> Windows 的菜单栏在窗口顶部；macOS 的菜单栏在屏幕顶部。找不到某个菜单时，先看屏幕最上面。

### 0.12 新手最常见 12 个错误

| 报错/现象 | 原因 | 处理 |
|---|---|---|
| `not a git repository` | 不在项目目录 | `cd body-prism`（Windows：`cd $env:USERPROFILE\Projects\body-prism`） |
| `Permission denied (publickey)` | SSH 没配好 | 先用 HTTPS，或检查公钥 |
| `failed to push some refs` | 远端有你没有的提交 | `git pull --rebase origin main` 后再 push |
| `Your branch is behind` | 本地落后 | `git pull --rebase` |
| `CONFLICT (content)` | 两人改了同一处 | 按 0.9 解决 |
| `detached HEAD` | 切到了某个 commit | `git switch -c rescue` 救出来 |
| `LF will be replaced by CRLF` | Windows 换行符 | 设 `core.autocrlf input`，一般可忽略 |
| `Updates were rejected because the protected branch` | 直接 push main | 开分支 + PR |
| `npx.ps1 cannot be loaded` | Windows PowerShell 执行策略 | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| `The token '&&' is not a valid statement separator` | PowerShell 5.1 不支持 `&&` | 两条命令分两行 |
| `xcrun: error: invalid active developer path` | macOS 没装命令行工具 | `xcode-select --install` |
| `command not found: node`（macOS） | Node 没装 / PATH 不对 | 重装 Node `.pkg`，重开 Terminal |

### 0.13 第一周只守四条规则

```text
1. main 永远可运行。
2. 每个任务一个分支。
3. 每个分支一个 PR，一个人 approve。
4. 合并后两个人当天都 pull 一次。
```

---

## 1. 先定选型

### 1.1 结论

**GitHub 主库 + Gitee 镜像。**

理由：

- GitHub Actions、Vercel、GitHub Student Pack、Copilot 学生版、Issues/Projects 都更好用；
- 评委对 GitHub 更熟悉；
- Gitee 国内访问快，作为备份和镜像，防止 GitHub 网络问题。

如果实测 GitHub clone/push 经常超过 30 秒或失败，就反过来：**Gitee 主库，GitHub 赛前镜像**。

不要只用一个平台且不做备份。比赛要求“公开仓库 + 完整 Git 历史”，仓库丢了或历史不全，直接扣分。

### 1.2 两分钟网络测试

```bash
git clone https://github.com/octocat/Hello-World.git /tmp/gh-test
cd /tmp/gh-test
git commit --allow-empty -m "test"
git push
```

- 如果 clone 和 push 都顺畅：GitHub 主库；
- 如果经常超时/失败：Gitee 主库。

---

## 2. 建库当天做什么

1. 建 **public** 仓库 `body-prism`；
2. 另一个账号加为 **Collaborator（Write 权限）**；
3. 保护 `main`：
   - 不允许直接 push；
   - 必须 PR；
   - 至少 1 人 approve；
   - CI（lint + build）通过才能合并；
4. 建 Project 看板：`Backlog / 本周 / 进行中 / 待审核 / 完成`；
5. 建标签：`P0`、`P1`、`content`、`3d`、`ai`、`art`、`bug`、`docs`、`blocked`；
6. 先把下面这些文件提交上去，再写业务代码：
   - `.gitignore`
   - `.gitattributes`
   - `.github/workflows/ci.yml`
   - `.github/pull_request_template.md`
   - `.github/ISSUE_TEMPLATE/task.md`
   - `.github/ISSUE_TEMPLATE/bug.md`
   - `.github/ISSUE_TEMPLATE/content.md`
   - `README.md`
   - `.env.example`
   - `LICENSE`
   - `ATTRIBUTION.md`
   - `docs/git-workflow.md`

---

## 3. `.gitignore`

```gitignore
# dependencies
node_modules/
.pnp
.pnp.js

# next
.next/
out/
dist/
build/

# env
.env
.env.local
.env.*.local
!.env.example

# logs
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# tests
coverage/
playwright-report/
test-results/

# os
.DS_Store
Thumbs.db

# editor
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json

# raw data / source art
data/raw/
public/art/raw/
*.obj
*.fbx
*.blend1
*.psd
*.procreate

# temp
*.zip
```

注意：

- `public/models/*.glb` 不要忽略，压缩后的模型要进仓库；
- 原始 OBJ 不进仓库；
- PSD/Procreate 源文件不进仓库，放网盘，仓库只放导出的 WebP/SVG；
- `package-lock.json` 要提交。

---

## 4. `.gitattributes`

```gitattributes
* text=auto eol=lf

*.png binary
*.jpg binary
*.jpeg binary
*.webp binary
*.avif binary
*.glb binary
*.woff2 binary
```

---

## 5. `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  lint-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

第一次要先用 `npm install` 生成并提交 `package-lock.json`，否则 `npm ci` 会失败。

---

## 6. `.github/pull_request_template.md`

```md
## 做了什么

## 为什么

## 关联 Issue
Closes #

## 怎么测试
1.
2.

## 截图 / 录屏

## 检查清单
- [ ] `npm run lint` 通过
- [ ] `npm run build` 通过
- [ ] 手机尺寸看过
- [ ] 没有提交密钥
- [ ] 医学内容已审核（内容 PR）
- [ ] 引用/证据已补（AI/内容 PR）
- [ ] 没有破坏别人的文件
```

---

## 7. Issue 模板

### 7.1 `.github/ISSUE_TEMPLATE/task.md`

```md
---
name: 任务
about: 一个可交付的小任务
title: "[任务] "
labels: ""
assignees: ""
---

## 目标

## 验收标准
- [ ]
- [ ]

## 负责人

## 截止时间

## 依赖

## 备注
```

### 7.2 `.github/ISSUE_TEMPLATE/bug.md`

```md
---
name: Bug
about: 记录一个可复现的问题
title: "[Bug] "
labels: "bug"
assignees: ""
---

## 现象

## 复现步骤
1.
2.

## 期望结果

## 实际结果

## 截图 / 报错

## 环境
- 浏览器：
- 设备：
- 分支/commit：
```

### 7.3 `.github/ISSUE_TEMPLATE/content.md`

```md
---
name: 医学内容
about: 一个器官/镜片的内容任务
title: "[内容] "
labels: "content"
assignees: ""
---

## 器官

## 镜片
- [ ] 结构
- [ ] 关系
- [ ] 信息

## 核心问题

## 3 条 claim（含证据等级）

## 来源

## 常见误区

## 3 个追问

## 医学审核
- [ ] 已审核
- 审核人：
```

---

## 8. `docs/git-workflow.md`

```md
# 两人 Git 协同 SOP

## 0. 一次性准备
- 安装 Git。
- 两个系统：女孩 Windows PowerShell（不支持 `&&`，命令分两行），男孩 macOS 27 Terminal。
- 配置用户名和邮箱：
  女孩：xGlaciesx / lisa.lrx@qq.com
  男孩：ziangzhang07 / 1248696312@qq.com
  git config --global core.autocrlf input
- 建 public 仓库，加 Collaborator。
- 保护 main：Require PR、1 approval、CI 通过。
- 建议装 GitHub Desktop（可视化提交）和 VSCode 的 GitLens。
- 配 SSH key，或者用 GitHub Desktop 登录。

## 1. 每天开始
git switch main
git pull --rebase origin main

## 2. 开分支
命名：
- feat/heart-page
- content/heart
- art/heart-plate
- fix/rag-empty
- docs/spike-3d

命令：
git switch -c feat/heart-page

## 3. 写代码并提交
git add .
git commit -m "feat(heart): add page skeleton"

commit 类型：
- feat：新功能
- fix：修 bug
- content：医学内容
- art：美术资产
- docs：文档
- test：测试
- chore：杂项

## 4. 推送
git push -u origin feat/heart-page

## 5. 开 PR
网页打开仓库，点 Compare & pull request。
写清楚：做了什么、为什么、怎么测试、截图。
关联 Issue：Closes #12。

## 6. Review
另一个人看：
- 能不能跑；
- 有没有密钥；
- 医学说法有没有来源；
- 有没有乱用 any；
- 有没有破坏别人的文件；
- 手机尺寸是否正常。

## 7. 合并
CI 通过 + 1 人 approve 后，用 Squash and merge。
合并后删除分支。

## 8. 回到 main 同步
git switch main
git pull --rebase origin main

## 9. 分支落后时
git switch feat/heart-page
git rebase main
# 解决冲突
git add .
git rebase --continue
npm run lint
npm run build
git push --force-with-lease

## 10. 发布标签
git tag -a v0.1.0 -m "week 1 demo"
git push origin v0.1.0 --tags
git push gitee main --tags

建议：
- W1：v0.1.0
- W2：v0.2.0
- W3：v0.3.0
- 提交：v1.0.0

## 11. Gitee 镜像
一次性：
git remote add gitee git@gitee.com:<你的Gitee用户名>/body-prism.git

每次 main 合并后：
git push origin main --tags
git push gitee main --tags

## 12. 禁止事项
- 不直接 push main。
- 不对 main 用 --force。
- 不提交 .env.local。
- 不提交 node_modules、.next、原始 OBJ/PSD/Procreate。
- 不提交自己看不懂的代码。
- 不静默重写对方代码；先开 Issue 说清楚。

## 13. 常见故障

### 提交到 main 了，还没 push
git switch -c fix/my-work
git switch main
git reset --hard origin/main
git switch fix/my-work

### 提交到 main 了，已经 push
不要 reset 远程 main。
开一个 revert PR，或者找老师帮忙；以后先开分支。

### 合并冲突
git switch main
git pull --rebase origin main
git switch 你的分支
git rebase main
在 VS Code 里逐块解决，然后：
git add .
git rebase --continue
npm run lint
npm run build
git push --force-with-lease

### 密钥提交了
1. 立刻去平台吊销 Key，换新 Key。
2. git rm --cached .env.local
3. 提交 .gitignore。
4. 历史里仍然有旧 Key，必须视为已泄露。

### 大文件推不上去
git rm --cached 大文件
把路径加进 .gitignore
提交后重新 push
如果历史里已经有大文件，找老师用 git filter-repo 处理，不要自己乱删。

### detached HEAD
git switch -c rescue
先把自己的改动救出来，再切回正确分支。
```

---

## 9. 每天的标准动作

```bash
# 1. 更新主分支
git switch main
git pull --rebase origin main

# 2. 开自己的分支
git switch -c feat/heart-page

# 3. 写代码/内容
git add .
git commit -m "feat(heart): add page skeleton"

# 4. 推上去
git push -u origin feat/heart-page
```

> Windows PowerShell 里一次运行一条；这些命令本身两个系统都一样。不要用 `&&` 连接。

然后在网页上开 PR，写清楚：

```md
## 做了什么
## 为什么
## 截图/GIF
## 怎么测试
## 检查清单
- [ ] npm run lint
- [ ] npm run build
- [ ] 手机尺寸看过
- [ ] 医学内容已审核（内容 PR）
- [ ] 没有提交密钥
```

另一个人 review，重点看：

- 能不能跑起来；
- 有没有硬编码密钥；
- 医学说法有没有来源；
- 有没有把 `any` 到处乱用；
- 有没有破坏别人的文件。

合并后删除分支，回到 main 再 pull。

---

## 10. 分支与提交规范

### 10.1 分支命名

| 类型 | 示例 |
|---|---|
| 功能 | `feat/heart-page` |
| 内容 | `content/heart` |
| 美术 | `art/heart-plate` |
| 修复 | `fix/rag-empty` |
| 文档 | `docs/spike-3d` |
| 测试 | `test/rag-eval` |

### 10.2 提交信息

| 类型 | 用途 | 示例 |
|---|---|---|
| `feat` | 新功能 | `feat(explore): add heart focus camera` |
| `fix` | 修 bug | `fix(rag): handle empty retrieval` |
| `content` | 医学内容 | `content(heart): add three-lens cards and sources` |
| `art` | 美术资产 | `art(heart): add ai-assisted plate and labels` |
| `docs` | 文档 | `docs: add 3D spike results` |
| `test` | 测试 | `test(rag): add 20 citation cases` |
| `chore` | 杂项 | `chore: update dependencies` |

### 10.3 PR 大小

- 一个 PR 只做一件事；
- 尽量不超过 400 行 diff；
- 内容 PR 可以大一些，但一次只做一个器官；
- 不要在一个 PR 里同时改 3D、AI、UI、内容。

---

## 11. 冲突怎么处理

两个人改到同一个文件很正常。不要慌：

```bash
git switch main
git pull --rebase origin main
git switch feat/heart-page
git rebase main
```

VS Code 会弹出冲突编辑器，逐块选“保留当前/保留传入/两者都保留”。改完：

```bash
git add .
git rebase --continue
npm run lint
npm run build
git push --force-with-lease
```

规则：

- 永远不要对 `main` 用 `--force`；
- 自己的分支可以用 `--force-with-lease`；
- 冲突解决后必须跑一次 build；
- 不要让 AI 自动“帮你合并冲突”后直接提交，必须自己看懂。

---

## 12. 大文件与密钥

### 12.1 不要提交

- `node_modules/`
- `.next/`
- `.env.local`
- BodyParts3D 原始 OBJ（可能几百 MB）
- Procreate/PSD 源文件
- 原始 4K 图片

### 12.2 要提交

- 压缩后的 GLB（目标 < 5MB）
- WebP/SVG 成品
- `docs/art-process/` 里的小尺寸过程图
- `scripts/download-data.sh`（macOS/Linux）和 `scripts/download-data.ps1`（Windows PowerShell），说明原始数据从哪下载
- `package-lock.json`

> Windows 不要直接双击 `.sh`，也不要在 PowerShell 里运行 `.sh`。要么用 Git Bash，要么让 Cline 写一个 `.ps1` 等价脚本。

如果单个文件超过 50MB，再考虑 Git LFS；但最好通过压缩避免。

### 12.3 密钥

- 只放 `.env.local`；
- `.env.example` 里只写占位符；
- 前端永远不出现 `NEXT_PUBLIC_DEEPSEEK_KEY`；
- 一旦误提交，立刻去平台吊销并换新 Key，历史记录里的旧 Key 仍然算泄露。

---

## 13. Gitee 镜像

```bash
# 一次性
git remote add gitee git@gitee.com:<你的Gitee用户名>/body-prism.git

# 每次 main 合并后
git push origin main --tags
git push gitee main --tags
```

不用每个 feature 分支都同步，合并到 main 后同步即可。赛前确认 Gitee 镜像包含完整历史。

---

## 14. 两人分工建议

| 区域 | 主负责人 | 另一个人的角色 |
|---|---|---|
| `src/app`、`src/components`、`src/lib` | 女孩 | Review、补测试、改文案 |
| `src/app/(admin)`、`src/lib/auth`、`supabase/migrations` | 女孩 | 男孩从审核流程角度 Review |
| `content/organs` | 男孩 | 女孩检查 schema/build |
| `public/art` | 两人 | 互相检查风格/解剖 |
| `docs` | 两人 | 各自写自己负责的部分 |
| 医学审核 | 男孩签字 | 女孩不能绕过 |
| Git/CI/部署 | 女孩 | 男孩学会 clone/pull/PR |

规则：**内容 PR 没有男孩审核，不合并；代码 PR 没有女孩看 build，不合并。**

后台权限相关 PR（`auth`、`RLS`、发布 RPC）必须两个人一起看，至少跑一遍“匿名访问 `/admin` 被拒绝”和“EDITOR 不能发布”两条测试。

---

## 15. 评委看什么

- 第一天就开始的 commit 历史，不是最后一次性上传；
- 有意义的 commit message；
- README 有截图、架构图、启动方式、环境变量、署名；
- Issues/PR 能看出两个人真的在协作；
- 有 `v0.1`、`v0.2`、`v1.0` 标签；
- 有 `docs/` 记录 3D 管线、AI 评测、美术过程。

这些比“代码写得多漂亮”更容易拿“工程规范”的分。

---

## 16. 一句话总结

> **main 永远可运行；每个功能一个分支；每个 PR 都能讲清楚。**
> 不要最后一天才上传代码，评委会看历史。
