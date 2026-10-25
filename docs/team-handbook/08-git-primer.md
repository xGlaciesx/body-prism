# Git / GitHub / Gitee 零基础入门：先懂概念，再敲命令

> 读者：大一新生，第一次用 Git。
> 系统：女孩 Windows 11（Windows PowerShell），男孩 macOS 27（Terminal/zsh）；命令本身两个系统一样，Windows 一次运行一条。
> 定位：这是 **02 协同 SOP 的“概念补充”**。先读这一份，知道 commit、branch、pull、push 到底是什么，再去看 02 的操作步骤，就不会只会抄命令。

---

## 0. 先记住三句话

1. **Git 是本地版本管理工具**，它把每一次修改存成一张“快照”，存在你自己的电脑里。
2. **GitHub / Gitee 是网站**，它们托管 Git 仓库；`push` 是把本地快照上传到网站，`pull` 是把网站上的更新拿回本地。
3. **两个人协作的核心不是命令，而是习惯**：小步提交、先拉后推、通过分支和 PR 合并，不直接改 `main`。

> 一句话类比：Git 是“游戏存档 + 平行宇宙”，GitHub/Gitee 是“云存档网站”。你可以在本地存很多档、开很多条平行时间线，最后选一条合并回主线。

---

## 1. Git 到底在管什么：三个房间 + 一条时间线

Git 把文件分成三个区域，再加一个远端：

```text
你的文件夹            暂存区              本地仓库              远端仓库
(工作区)              (staging)           (.git)                (GitHub/Gitee)
   │                    │                   │                     │
   │  git add           │  git commit       │  git push           │
   ├───────────────────>├──────────────────>├────────────────────>│
   │                    │                   │                     │
   │<───────────────────┴───────────────────┴─────────────────────┤
   │                    git pull / git fetch / git clone          │
```

| 区域 | 是什么 | 对应命令 |
|---|---|---|
| 工作区 | 你现在能看见、能编辑的文件 | 直接改文件 |
| 暂存区 | 你“准备这次提交”的改动清单 | `git add` |
| 本地仓库 | 已经存好的历史快照 | `git commit` |
| 远端仓库 | GitHub / Gitee 上的副本 | `git push` / `git pull` |

**关键理解：**

- `git add` 不是“上传”，只是“把改动放进这次提交的篮子”。
- `git commit` 不是“上传”，只是“在本地存一个档”。
- **只有 `git push` 才是上传。**
- 改完文件没 `add`，commit 不会包含它；commit 了没 `push`，队友看不到。

---

## 2. 六个核心概念

| 概念 | 英文 | 一句话解释 | 生活类比 |
|---|---|---|---|
| 仓库 | repository / repo | 一个被 Git 管理的项目文件夹 | 一本带自动存档的相册 |
| 提交 | commit | 一次快照，带说明、作者、时间、父提交 | 游戏存档 |
| 分支 | branch | 一条独立的开发时间线，本质是指向某个提交的指针 | 平行宇宙 |
| 主干 | main（旧名 master） | 默认的主分支，应该永远能运行 | 正式版主线 |
| HEAD | HEAD | “你现在站在哪条分支、哪个提交上” | 游戏里当前存档位 |
| 远端 | remote（通常叫 origin） | 本地仓库对应的网站仓库 | 云存档 |

再补三个常用词：

- **merge（合并）**：把一条分支的历史合进另一条。
- **PR / MR（Pull Request / Merge Request）**：不是命令，是 GitHub/Gitee 上的“请把我的分支合并进 main”的申请，附带讨论和代码审查。
- **冲突（conflict）**：两个人改了同一文件的同一区域，Git 不知道该听谁的，交给你决定。

---

## 3. 主干和分支：为什么不能两个人直接改 `main`

### 3.1 `main` 是“随时能演示”的那条线

比赛项目最重要的资产不是代码量，而是**随时能跑**。如果两个人都直接往 `main` 提交：

- 一个人写崩了，另一个人也跑不起来；
- 没有代码审查，错误直接进主线；
- 出了问题不知道是谁、哪次提交引入的；
- 评委看提交历史，只看到一团乱麻。

所以规则是：

```text
main：只接受经过 PR 的合并，永远可运行
 ├─ feat/navbar        女孩：做导航
 ├─ content/heart      男孩：写心脏内容
 └─ fix/chat-timeout   谁遇到谁修
```

### 3.2 分支怎么命名

| 前缀 | 用途 | 例子 |
|---|---|---|
| `feat/` | 新功能 | `feat/organ-page` |
| `content/` | 医学/文案内容 | `content/heart-evidence` |
| `art/` | 美术、3D、图片 | `art/heart-plate` |
| `fix/` | 修 bug | `fix/mobile-nav` |
| `docs/` | 文档 | `docs/medical-disclaimer` |
| `test/` | 测试 | `test/chat-schema` |

一条分支只做一件事。分支名用小写英文和连字符，不要用中文、空格。

### 3.3 一条分支的完整生命周期

```text
1. 从最新 main 开分支
2. 在分支上改代码、commit（可以多次）
3. push 到远端
4. 开 PR，请对方 review
5. CI 通过、review 通过
6. 合并进 main（比赛项目建议 Squash merge）
7. 删除这条分支
8. 本地切回 main，pull 最新代码
```

---

## 4. `pull`、`push`、`fetch`、`clone`、`merge`、`rebase` 到底差在哪

这是新手最容易混的一组词。先看方向：

```text
远端 GitHub/Gitee                        你的电脑
       │                                    │
       │  clone（第一次，整个搬下来）        │
       ├───────────────────────────────────>│
       │                                    │
       │  fetch（只取更新，不动你的文件）    │
       ├───────────────────────────────────>│
       │                                    │
       │  pull（fetch + merge/rebase）       │
       ├───────────────────────────────────>│
       │                                    │
       │  push（把你的 commit 传上去）       │
       │<───────────────────────────────────┤
```

| 命令 | 方向 | 会不会改你的文件 | 会不会改远端 | 什么时候用 |
|---|---|---|---|---|
| `git clone` | 远端 → 本地 | 会（新建整个目录） | 不会 | 第一次拿到项目 |
| `git fetch` | 远端 → 本地 | 不会（只更新远端跟踪分支） | 不会 | 想先看看远端有什么变化 |
| `git pull` | 远端 → 本地 | 会（合并进当前分支） | 不会 | 每天开工、push 前 |
| `git push` | 本地 → 远端 | 不会 | 会 | 提交完成、想让队友看到 |
| `git merge` | 分支 → 当前分支 | 会 | 不会 | 把功能分支合进 main，或 PR 合并 |
| `git rebase` | 把当前分支的提交“搬”到另一条分支后面 | 会（改写提交历史） | 不会 | 只建议用 `git pull --rebase`；新手不要手工 rebase 公共分支 |

### 4.1 四个最常见误解

| 误解 | 事实 |
|---|---|
| “我 commit 了，队友就能看到” | 不能。commit 只在本地，必须 `push`。 |
| “push 就是备份” | 是备份的一部分，但 push 会把历史公开给队友；密钥误提交后 push 了才算真泄露。 |
| “pull 会覆盖我还没提交的代码” | 一般不会。Git 会拒绝合并并提示你先提交或暂存；但 `git reset --hard` 会真的丢。 |
| “merge 和 rebase 差不多，随便用” | 不一样。merge 保留分叉历史，rebase 改写历史。**已经 push 的公共分支不要 rebase。** |

### 4.2 `pull --rebase` 是什么

`git pull` 默认是 `fetch + merge`，会产生一个“合并提交”。两个人频繁协作时，历史会变得很乱。

`git pull --rebase` 的意思是：先把远端的新提交取下来，再把你本地还没 push 的提交“挪到”它们后面，历史是一条直线。

```bash
git pull --rebase origin main
```

比赛项目建议：**日常同步 main 用 `pull --rebase`；功能分支合并进 main 用 PR 的 Squash merge。**

如果 rebase 中途冲突：

```bash
# 解决冲突后
git add <冲突文件>
git rebase --continue

# 不想继续了，回到 rebase 之前
git rebase --abort
```

---

## 5. 每天必用的 12 条命令

> 两个系统命令一样。Windows PowerShell 里**一次运行一条**，不要用 `&&` 串联。

| # | 命令 | 作用 | 场景 |
|---|---|---|---|
| 1 | `git status` | 看当前分支、改了哪些文件、有没有 staged | 每次动手前、commit 前 |
| 2 | `git branch --show-current` | 只看当前分支名 | 防止在错误分支上写 |
| 3 | `git switch main` | 切到 main | 开工、合并后 |
| 4 | `git switch -c feat/xxx` | 从当前分支新建并切过去 | 开始一个新任务 |
| 5 | `git pull --rebase` | 拉远端更新并把自己的提交接在后面 | 每天开工、push 前 |
| 6 | `git add <文件>` | 把指定文件放进暂存区 | 精确提交 |
| 7 | `git add .` | 把当前目录所有改动放进暂存区 | 确认没有密钥/垃圾文件后 |
| 8 | `git commit -m "feat: ..."` | 存一个本地快照 | 完成一个小步骤 |
| 9 | `git push -u origin <分支>` | 把分支传到远端并建立跟踪 | 第一次 push 这条分支 |
| 10 | `git push` | 后续 push | 已建立跟踪后 |
| 11 | `git log --oneline --graph --decorate -10` | 看最近 10 条提交和分支图 | 看历史、找问题 |
| 12 | `git diff` | 看还没暂存的改动 | commit 前自查 |

### 5.1 三条“红榜”命令，新手不要碰

| 命令 | 为什么危险 |
|---|---|
| `git reset --hard` | 直接丢掉工作区和暂存区的改动，找不回来 |
| `git push --force` | 覆盖远端历史，队友的提交可能消失 |
| `git clean -fd` | 删除所有未跟踪文件，包括你刚写还没 add 的 |

不是永远不能用，而是**在大一阶段、没有把握时不要用**。真要撤销，先用 `git status`、`git diff` 看清，再问 AI 或队友。

### 5.2 两个安全撤销

```bash
# 撤销某个文件还没暂存的修改（危险，会丢内容）
git restore <文件>

# 把某个文件从暂存区拿出来，但保留工作区内容
git restore --staged <文件>
```

`git restore` 会真的丢掉未提交内容。用之前先 `git diff` 看一眼。

---

## 6. 两个人的完整协作演练

假设仓库已经建好：女孩是 owner，男孩是 collaborator。下面按时间线走一遍。

### 6.1 Day 0：女孩建仓库，男孩克隆

女孩（Windows PowerShell）：

```powershell
cd $env:USERPROFILE\Projects\body-prism
git init
git branch -M main
git add .
git commit -m "chore: scaffold Next.js app"
git remote add origin git@github.com:xGlaciesx/body-prism.git
git push -u origin main
```

男孩（macOS）：

```bash
cd ~/Projects
git clone git@github.com:xGlaciesx/body-prism.git
cd body-prism
npm install
```

### 6.2 Day 1：女孩做一个导航，走完 PR

女孩：

```powershell
cd $env:USERPROFILE\Projects\body-prism
git switch main
git pull --rebase
git switch -c feat/navbar

# 改代码……

git status
git add src/components/site-nav.tsx
git commit -m "feat(nav): add responsive site navigation"
git push -u origin feat/navbar
```

然后去 GitHub 网页：

1. 打开仓库，会出现 **Compare & pull request**；
2. 标题写 `feat(nav): add responsive site navigation`；
3. 描述里写：做了什么、为什么、怎么测试、截图；
4. 指定男孩为 reviewer；
5. 等 CI 通过、男孩 approve；
6. 点 **Squash and merge**；
7. 删除远端分支。

男孩 review 时只看三件事：

- 有没有把 `.env.local`、`node_modules` 提交进来；
- 代码有没有明显错误；
- 描述和截图能不能让评委看懂。

### 6.3 Day 2：男孩基于最新 main 开发

男孩：

```bash
cd ~/Projects/body-prism
git switch main
git pull --rebase
git switch -c content/heart-evidence

mkdir -p content/organs
# 写 content/organs/heart.mdx……

git status
git add content/organs/heart.mdx
git commit -m "content(heart): add evidence-graded heart content"
git push -u origin content/heart-evidence
```

去 GitHub 开 PR，女孩 review 后 Squash merge。

### 6.4 Day 3：两个人改了同一个文件，冲突了

场景：女孩在 `feat/navbar` 改了 `src/app/layout.tsx`，男孩在 `content/heart` 也改了同一个文件。男孩先合并进了 `main`。女孩开 PR 时，GitHub 提示：

```text
This branch has conflicts that must be resolved
```

有两种处理方式：

- **网页解决**：PR 页面点 **Resolve conflicts**，在网页里编辑；适合小冲突；
- **本地解决**：把最新 `main` 合进自己的分支，能跑测试；推荐这种。

本地处理：

```bash
git switch feat/navbar
git fetch origin
git merge origin/main
```

Git 会停下来告诉你哪些文件冲突：

```text
CONFLICT (content): Merge conflict in src/app/layout.tsx
```

打开文件，会看到：

```text
<<<<<<< HEAD
import { SiteNav } from "@/components/site-nav";
=======
import { HeartProvider } from "@/components/heart-provider";
>>>>>>> content/heart
```

这表示：

- `HEAD` 到 `=======` 之间：你当前分支的版本；
- `=======` 到 `>>>>>>>` 之间：对方分支的版本。

你要做的是**人工决定最终长什么样**。如果两个 import 都要：

```tsx
import { SiteNav } from "@/components/site-nav";
import { HeartProvider } from "@/components/heart-provider";
```

然后删掉 `<<<<<<<`、`=======`、`>>>>>>>` 三行标记，保存：

```bash
git add src/app/layout.tsx
git commit -m "merge: resolve layout conflict with main"
git push
```

如果搞乱了，想回到合并之前：

```bash
git merge --abort
```

**冲突不是代码丢了。** 两边的版本都还在，只是需要你选一个合并结果。

---

## 7. 冲突处理的通用步骤

不管是 merge 还是 rebase，冲突处理都是五步：

```text
1. git status                 看哪些文件冲突
2. 打开文件                   找 <<<<<<< ======= >>>>>>>
3. 改成你想要的最终版本        删掉三行标记
4. git add <文件>             标记为已解决
5. git commit / git rebase --continue
```

### 7.1 VSCode 里的四个按钮

在 VSCode 打开冲突文件，会看到：

- **Accept Current Change**：只保留你这边；
- **Accept Incoming Change**：只保留对方；
- **Accept Both Changes**：两边都保留（顺序要自己调）；
- **Compare Changes**：并排看差异。

四个按钮只是帮你快速编辑，**最终仍然要自己读一遍**，确认逻辑对。

### 7.2 什么时候该找对方

- 两个人改了同一段业务逻辑，不确定谁对；
- 冲突文件超过 3 个；
- 冲突里出现你不认识的代码；
- rebase 进行到一半，你已经慌了。

先 `git rebase --abort` 回到安全状态，再找对方一起看。**不要在慌乱中乱点。**

---

## 8. commit message 怎么写

比赛评委真的会看提交历史。一个好的历史能证明“这两个人是一步步做出来的”，而不是最后一天上传一大包。

### 8.1 格式

```text
<type>(<scope>): <一句话说明>

可选：为什么改、影响什么
```

| type | 用途 |
|---|---|
| `feat` | 新功能 |
| `fix` | 修 bug |
| `content` | 医学/文案内容 |
| `art` | 图片、3D、视觉资产 |
| `docs` | 文档 |
| `test` | 测试 |
| `chore` | 脚手架、依赖、配置 |

### 8.2 好例子与坏例子

| 坏 | 好 |
|---|---|
| `update` | `feat(organ): add evidence badge to heart page` |
| `改了一下` | `fix(nav): keep menu usable on 375px screens` |
| `final` | `content(brain): add three claims with sources` |
| `aaa` | `docs: add medical disclaimer and review policy` |

一条 commit 只做一件事。不要把“改导航 + 写心脏内容 + 升级依赖”塞进同一个 commit。

---

## 9. `.gitignore`：哪些东西永远不要提交

项目根目录的 `.gitignore` 至少要有：

```gitignore
# 依赖
node_modules/

# Next.js 构建产物
.next/
out/

# 环境变量与密钥
.env
.env.local
.env*.local

# 系统垃圾
.DS_Store
Thumbs.db

# 原始大文件
*.psd
*.procreate
*.obj
*.fbx
raw/
```

### 9.1 已经提交了怎么办

如果发现 `.env.local` 已经被 commit：

```bash
git rm --cached .env.local
git commit -m "chore: stop tracking .env.local"
```

注意：**这不会把历史里的密钥删掉。** 只要 push 过，就必须立刻去平台吊销这个 Key，换一个新的。历史里的旧 Key 仍然算泄露。

### 9.2 提交前 10 秒检查

```bash
git status
```

看三件事：

1. 有没有 `.env.local`、`node_modules`、`.next`；
2. 有没有你不想提交的原始素材（PSD、OBJ、视频）；
3. 改动文件列表是不是你这次想做的范围。

---

## 10. GitHub 和 Gitee 怎么分工

| | GitHub | Gitee |
|---|---|---|
| 角色 | 主仓库、PR、Actions、Issue | 国内镜像、备份、比赛链接 |
| 优势 | 生态完整、CI 免费、评委熟悉 | 国内访问快、中文界面 |
| 注意 | 国内偶尔访问慢 | 功能少于 GitHub，Actions 生态不同 |

### 10.1 推荐做法

1. **GitHub 是唯一主仓**：所有分支、PR、review、CI 都在 GitHub。
2. **Gitee 做镜像**：定期把 `main` 推过去，保证国内能打开。
3. **不要两边各自合并**：否则历史会分叉，最后对不上。

### 10.2 镜像的两种方式

**方式 A：加一个 remote，手动推 main**

```bash
git remote add gitee git@gitee.com:<你的Gitee用户名>/body-prism.git
git push gitee main
```

以后每次 GitHub 合并完：

```bash
git switch main
git pull --rebase
git push gitee main
```

**方式 B：Gitee 网页“从 GitHub 导入”**

Gitee 新建仓库时选择“导入已有仓库”，填 GitHub 地址。适合一次性迁移，但后续同步仍要手动或定时。

### 10.3 如果比赛要求提交 Gitee 链接

- 以 Gitee 上的 `main` 为准做一次最终检查；
- 确认 README、LICENSE、截图都在；
- 确认没有 `.env.local`；
- 在 README 里同时放 GitHub 和 Gitee 两个地址，注明哪个是主仓。

---

## 11. 四周学习计划

不需要先学完 Git 再开始做项目。边做边学，按下面顺序：

| 周 | 目标 | 做什么 | 资源 |
|---|---|---|---|
| 第 1 周 | 懂概念 | 看完本文件第 1–4 节；玩一遍 Learn Git Branching 前 4 关 | Learn Git Branching 中文 |
| 第 2 周 | 会日常命令 | 每天用自己的仓库练 `status / add / commit / push / pull` | Pro Git 第 2 章 |
| 第 3 周 | 会分支和 PR | 和队友走一遍“分支 → push → PR → review → 合并” | GitHub Skills |
| 第 4 周 | 会处理冲突 | 故意制造一次冲突，按第 7 节解决；读 Pro Git 第 3 章 | Pro Git 第 3 章 |

### 11.1 优质资源

| 资源 | 适合 | 链接 |
|---|---|---|
| Pro Git 中文版 | 系统学习，官方书 | https://git-scm.com/book/zh/v2 |
| Learn Git Branching 中文 | 交互式，最适合新手 | https://learngitbranching.js.org/?locale=zh_CN |
| GitHub Skills | 官方短课，边做边学 | https://skills.github.com/ |
| GitHub Docs 中文 | 查具体功能 | https://docs.github.com/zh |
| Gitee 帮助中心 | Gitee 的 PR、镜像、仓库设置 | https://help.gitee.com/ |
| 廖雪峰 Git 教程 | 中文快速入门 | https://liaoxuefeng.com/wiki/896043488029600 |
| Oh My Git! | 游戏化学习 Git | https://ohmygit.org/ |
| Git Flight Rules 中文 | 出事了查“我该怎么办” | https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md |
| Conventional Commits 中文 | 提交信息规范 | https://www.conventionalcommits.org/zh-hans/ |

### 11.2 建议的练习方式

不要只看视频。每学一个概念，立刻在自己的练习仓库里做一次：

```bash
mkdir git-practice
cd git-practice
git init
echo "第一行" > note.txt
git add note.txt
git commit -m "docs: add first note"
git log --oneline
```

然后故意改坏、故意冲突、故意撤销。**在练习仓库里犯错，比在比赛仓库里犯错便宜得多。**

---

## 12. 一页速查卡

```text
【每天开工】
git switch main
git pull --rebase
git switch -c feat/今天的事

【写代码时】
git status
git diff

【提交】
git add <文件>
git commit -m "feat(scope): 一句话"

【上传】
git push -u origin <分支>      # 第一次
git push                       # 以后

【合并】
去 GitHub 开 PR → review → Squash merge → 删除分支

【回到主线】
git switch main
git pull --rebase

【出事了】
git status                     # 先看
git rebase --abort             # rebase 卡住
git merge --abort              # merge 卡住
不要 git reset --hard
不要 git push --force
```

> **记住：commit 是存档，push 是上传，PR 是请别人检查后再合并。**
> 先把这三件事分清，剩下的命令都是在这三件事上做变体。
