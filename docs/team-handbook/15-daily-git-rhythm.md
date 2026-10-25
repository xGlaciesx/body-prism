# 每天的 Git 节奏：开工、收工、第二天

> 这份文档只回答一件事：**两个人每天到底按什么顺序动 Git，才不会互相覆盖。**
> 适用：已经完成 **14 第一天写代码**，项目能 `npm run dev`，GitHub 上有 `main`。
> 一句话原则：**main 永远能演示；每天从 main 开分支；做完才合并；合并后删分支；第二天重新从 main 开。**

> **前置与边界（先看一眼，避免重复劳动）**
> - 装 Git、配身份、建仓库、加协作者、保护 main、配 CI，全部在 **00 起步手册**里**已经做过一次**，这份文档不再重做；
> - 第一次开 PR 的按钮位置、CI 绿灯在哪看、合并按钮为什么灰，见 **00 第 3 章「第 8 步」下的 8.1–8.5**；
> - 这份文档只负责“**每天**怎么动 Git”。如果某条命令你在 00 里已经跑过（比如 `git remote add origin`），这里不会再让你跑；
> - Gitee 镜像用你自己的 Gitee 用户名；它和 GitHub 用户名不一定相同，别照抄 `xGlaciesx`。

**术语速查**（完整表见 **00 §1.5**）：

| 词 | 作用 |
|---|---|
| main / 主干 | 展品，任何时候都能 `npm run dev` |
| branch / 分支 | 工作台，一条分支只做一件事 |
| commit | 存档点，一次只存一件事 |
| push | 上传到 GitHub（备份 + 让队友看见） |
| pull | 下载并合并（= fetch + merge） |
| fetch | 只下载、不合并 |
| PR / Pull Request | 合并申请：请队友看一遍，CI 跑一遍，再并进 main |
| merge | 把分支并进 main |
| 保护 main | 主干上锁，不能直接 push，只能走 PR |
| CI | GitHub 自动跑 lint + build，红了不许合并 |

---

## 0. 先给结论：一天长什么样

| 时间 | 动作 | Git 命令 | 产物 |
|---|---|---|---|
| 开工前 5 分钟 | 两人对一下今天各做什么 | — | 一句话分工 |
| 开工 5 分钟 | 回到 main，拉取最新 | `git switch main` + `git pull origin main` | 本地 main 和远端一致 |
| 开工 5 分钟 | 建今天的分支 | `git switch -c feat/xxx` | 一条新分支 |
| 开工 2 分钟 | 让 AI 进入状态 | 对 Cline 说 `start` | 它复述目标 + 3 步计划 |
| 白天 | 每完成一小块就提交；至少 push 两次 | `git add` + `git commit` + `git push` | 小提交、远端有备份 |
| 收工前 10 分钟 | 跑 lint / build | `npm run lint` + `npm run build` | 全绿 |
| 收工前 5 分钟 | 让 AI 写日志 | 对 Cline 说 `stop` | `SESSION_LOG.md` 草稿 |
| 收工 10 分钟 | 提交、push、开 PR | `git push` + 网页开 PR | 一个待合并 PR |
| 收工 10 分钟 | 队友 review、合并、删分支 | 网页 **Squash and merge** + **Delete branch** | main 前进一格 |
| 收工 5 分钟 | 本地同步 main、删本地分支 | `git switch main` + `git pull` + `git branch -d` | 本地干净 |
| 收工 2 分钟 | 同步 Gitee 镜像 | `git push gitee main --tags` | 国内备份更新 |
| 睡前 10 分钟 | 讨论明天 | 对 Cline 说 `plan` | 明天 3 件事 |

### 你最关心的四个问题，先直接回答

| 问题 | 答案 |
|---|---|
| 每天早上都要先拉 main 吗？ | **是。** 而且要先 `switch main` 再 `pull`，不要在旧分支上拉。 |
| 每天结束都要把分支合并回 main 吗？ | **只有“今天这件事做完 + lint/build 都过”才合并。** 没做完就 push 分支、不合并，明天接着做。 |
| 合并后要删分支吗？ | **要。** 远端在 PR 合并时点 **Delete branch**；本地 `git branch -d`。代码已经在 main 里，分支只是临时工作台。 |
| 第二天要在昨天分支上继续吗？ | **如果昨天已合并：不要，重新从 main 开新分支。** 如果昨天没合并：可以继续用同一条分支，但先 `git pull` 再 `git merge origin/main`。 |

---

## 1. 为什么是这个节奏

### 1.1 main 是展品，分支是工作台

```text
main        ●────●────────●────────●──────→  永远能打开、能演示
               \        /          /
feat/home       ●──●──●            /          做首页的三天
                                   /
content/heart                     ●──●──●     做心脏内容的三天
```

- **main**：评委、队友、你自己打开就能跑。任何时候 `npm run dev` 都不该白屏。
- **分支**：你随便试、随便改，改坏了不影响 main。
- **PR**：把工作台的东西搬回展品前的检查口。队友看一眼，CI 跑一遍，再合并。

### 1.2 为什么“每天小合并”比“一周大合并”好

| 每天合并 | 一周合并一次 |
|---|---|
| 冲突小，通常几分钟解决 | 冲突大，可能一下午 |
| 每天都有可演示的进度 | 最后一天才知道能不能跑 |
| 队友每天能看到你的代码 | 队友最后一天才 review，来不及改 |
| 出问题容易回退到昨天 | 一出问题整周白干 |

> 比赛时间紧，**“每天有一个能跑的 main”比“代码写得多”更重要**。

---

## 2. 早上：8 分钟开工

### 2.1 两个人各自做，不要互相等

**第 1 分钟：打开 VSCode，确认左下角分支**

左下角状态栏会显示当前分支。如果显示的不是 `main`，先点它 → 选 `main`。

**第 2–3 分钟：回到 main 并拉取**

```bash
# 切回主干 main（不切过去就 pull，会把 main 合进你昨天的旧分支）
git switch main

# 从 GitHub 下载 main 的最新提交并合并到本地 main
git pull origin main
```

> 本套文档**统一用普通 `git pull`**（下载 + 合并）。偶尔会多出一个“Merge branch...”提交，这是正常的，不会丢东西。
> 你可能在别的教程里看到 `git pull --rebase`：那是进阶写法，目的是让历史保持一条直线。**先不用管**，等 08/02 讲完 rebase 再考虑；两种混着用，才容易把自己绕晕。

正常输出类似：

```text
Already up to date.
```

或：

```text
Fast-forward
 src/app/page.tsx | 20 +++++++++++++++
 1 file changed, 20 insertions(+)
```

**第 4 分钟：确认工作区干净**

```bash
# 看当前分支、工作区是否干净
git status
```

必须是：

```text
On branch main
nothing to commit, working tree clean
```

如果有未提交的改动（昨天忘了提交），先停下来：

```bash
# 把未提交的改动临时收进抽屉，工作区变干净（下午用 git stash pop 取回）
git stash push -m "wip: 昨天的半成品"
```

然后继续拉取。下午做完后 `git stash pop` 取回来。**不要**带着一堆未提交改动直接 `pull`。

**第 5 分钟：看一眼最近发生了什么**

```bash
# 看最近 5 条提交（一行一条，确认队友昨天合并了什么）
git log --oneline -5
```

你应该能看懂每一条是谁昨天合并了什么。看不懂就问队友，或者让 Cline 解释。

**第 6 分钟：建今天的分支**

```bash
# 从 main 新建并切换到今天的任务分支（-c = create）
git switch -c feat/home-hero
```

命名规则：

| 前缀 | 用于 | 例子 |
|---|---|---|
| `feat/` | 新功能、新页面 | `feat/home-hero`、`feat/organ-page` |
| `fix/` | 修 bug | `fix/mobile-overflow` |
| `content/` | 器官内容、文案 | `content/heart` |
| `art/` | 图片、3D、视觉 | `art/heart-model` |
| `docs/` | 文档、日志 | `docs/session-log` |
| `chore/` | 配置、依赖、脚本 | `chore/install-r3f` |

规则：

- 全小写，用短横线，不用中文、空格；
- **一条分支只做一件事**；
- 分支名不要太长，`feat/home-hero` 比 `feat/做首页的hero区域和三个卡片` 好；
- 不确定叫什么，就问：“这条分支只做哪一件事？”答案就是名字。

**第 7 分钟：确认自己在正确的分支**

```bash
# 只打印当前分支名，防止在 main 上直接改
git branch --show-current
```

输出必须是 `feat/home-hero`，不是 `main`。

**第 8 分钟：对 Cline 说 `start`**

```text
start
```

它会读 `AGENTS.md`、`README.md`、`SESSION_LOG.md`，运行 `git status` 和 `git branch --show-current`，然后复述：

- 当前分支；
- 上次做到哪；
- 今天目标；
- 不超过 3 步的计划。

你看一遍，如果不对，直接纠正：

```text
不对，昨天没做完的是器官页的标签切换。今天只做标签切换，不做 3D。
重新给计划。
```

确认后回复：

```text
可以，按这个计划做。一次只改一个文件。
```

---

## 3. 白天：小步提交，至少 push 两次

### 3.1 什么时候提交

满足任意一条就提交：

- 完成了一个看得见的小块（“首页 hero 出来了”“标签能切换了”）；
- 修好了一个 bug；
- 要开始一个风险较大的改动前（先提交，改坏了能回来）；
- 中午吃饭前；
- 晚上收工前。

**不要**攒一天再提交。一次 commit 只做一件事，message 才写得清楚。

### 3.2 每次提交的标准动作

```bash
# 看改了哪些文件
git status

# 看每个文件改了多少行（不显示具体内容）
git diff --stat
```

确认改动文件是预期的，然后：

```bash
# 只把这一个文件放进待提交区（不要用 git add .）
git add src/app/page.tsx

# 存一个提交
git commit -m "feat(home): add hero section"
```

不要图省事 `git add .`——除非你已经 `git status` 确认没有密钥、没有垃圾文件。**`git add .` 是新手泄露 `.env.local` 的第一大原因。**

### 3.3 至少 push 两次

如果这条分支之前已经推过（建立了跟踪关系）：

```bash
# 把当前分支的新提交上传到 GitHub（之前已用 -u 关联过）
git push
```

第一次推一条新分支，要用：

```bash
# 第一次推这条分支：上传并记住 origin 对应关系（-u 只需第一次）
git push -u origin feat/home-hero
```

以后同一个分支直接 `git push`。

建议节奏：

- 午饭前 push 一次；
- 晚饭前 push 一次；
- 收工再 push 一次。

push 的意义：队友能看到、你有备份、电脑坏了不丢。

### 3.4 分支活了好几天，main 已经往前走了怎么办

比如你的 `feat/organ-page` 开了三天，队友已经往 main 合并了首页。你需要在**合并回 main 之前**，先把 main 的新东西拿进你的分支：

```bash
# 只下载远端最新提交，不改你的工作区
git fetch origin

# 把远端 main 合进你当前的分支（不切分支）
git merge origin/main
```

如果没冲突，直接继续；有冲突，按 **08 §6.4** 解决：

```bash
# 打开冲突文件，删掉 <<<<<<< ======= >>>>>>> 三行，保留想要的内容
# 把解决后的文件标记为已解决
git add <冲突文件>

# 完成这次合并提交
git commit -m "merge: resolve conflict with main"

# 上传解决结果
git push
```

**不要用 `git rebase` + `git push --force`**，除非你已经完全理解它在干什么。`merge` 会多一个合并提交，但对两个人协作完全够用，而且不会改写已经 push 的历史。

### 3.5 白天绝对不要做的四件事

| 不要 | 为什么 |
|---|---|
| 在 `main` 上直接改代码 | 一改坏，队友拉下去也坏 |
| `git push --force` 到 `main` | 会覆盖队友的提交，可能永久丢代码 |
| `git reset --hard` | 未提交的改动直接消失，找不回来 |
| 把 `.env.local`、`node_modules` 提交 | 泄露密钥、仓库爆炸 |

---

## 4. 晚上：20 分钟收工

### 4.1 顺序不能反

```text
1. npm run lint
2. npm run build
3. 对 Cline 说 stop，让它写日志
4. 看 git status / git diff，确认没有密钥
5. git add + git commit
6. git push
7. 网页开 PR
8. 队友 review + Approve
9. Squash and merge
10. Delete branch（远端）
11. 本地切回 main、pull、删本地分支
12. 同步 Gitee
13. 更新看板 / Issue
```

为什么先 lint/build 再提交？因为**提交进 main 的每一格都应该是能跑的**。为什么先提交再让 AI 写日志？因为日志要记录真实的 commit，不是计划。

### 4.2 第 1–2 步：验证

```bash
# 代码检查：必须 0 error
npm run lint

# 生产构建：必须成功
npm run build
```

两条都必须成功。任何一条失败：

- 不要合并；
- 把完整报错贴给 Cline，说“只修这个错误，不要改别的”；
- 修完重新跑两条；
- 还修不好，就把分支 push 上去，**不合并**，明天继续。

### 4.3 第 3 步：让 AI 写日志

```text
stop
```

它会在 `docs/SESSION_LOG.md` 追加一条。检查它有没有写错：

- 今天完成的事，是否真的完成；
- 改了哪些文件，是否和 `git diff --stat` 一致；
- 没做完什么；
- 明天第一件事；
- 有没有需要对方配合的。

AI 容易把“计划做”写成“已经做”。**你是负责人，日志必须你确认。**

### 4.4 第 4–5 步：提交

```bash
# 看改了哪些文件
git status

# 看每个文件改了多少行（不显示具体内容）
git diff --stat
```

确认没有 `.env.local`、没有 `node_modules/`、没有 `.next/`、没有大图片/PSD/OBJ。然后：

```bash
# 把这次改的文件逐个放进待提交区（不用 git add .）
git add src/app/page.tsx src/components/lens-card.tsx docs/SESSION_LOG.md

# 存一个提交
git commit -m "feat(home): add hero and lens cards"
```

commit message 格式：

```text
<类型>(<范围>): <一句话>

可选正文：为什么这么改，有什么取舍。
```

常用类型：

| 类型 | 用于 | 例子 |
|---|---|---|
| `feat` | 新功能 | `feat(organ): add lens tabs` |
| `fix` | 修 bug | `fix(home): prevent card overflow on mobile` |
| `content` | 医学内容 | `content(heart): add three lens cards` |
| `art` | 视觉资产 | `art(heart): add compressed glb` |
| `docs` | 文档 | `docs: update session log` |
| `chore` | 配置、依赖 | `chore: install react-three-fiber` |
| `test` | 测试 | `test: add schema validation cases` |

### 4.5 第 6–7 步：push 并开 PR

```bash
# 把当前分支的新提交上传到 GitHub（之前已用 -u 关联过）
git push
```

第一次推这个分支如果忘了 `-u`：

```bash
# 第一次推这条分支：上传并记住 origin 对应关系（-u 只需第一次）
git push -u origin feat/home-hero
```

然后打开 GitHub 仓库，点 **Compare & pull request**。

PR 标题和 commit 标题一致。描述模板：

```md
## 做了什么
- 首页 hero 和三张镜片卡片

## 怎么验证
- [x] npm run lint
- [x] npm run build
- [x] 手机宽度 375px 下三列变一列

## 截图
（贴一张）

## 风险 / 没做
- 还没接 3D，/explore 目前是占位页
```

右侧 **Reviewers** 选另一个人。如果两个人都没空，至少自己把清单勾完。

### 4.6 第 8–9 步：review 和合并

队友收到 PR 后，**30 分钟内**做完：

1. 点 **Files changed**，看一遍；
2. 重点看：有没有密钥、有没有 `console.log` 遗留、有没有删掉别人的代码、有没有 `any`；
3. 本地拉下分支跑一次（可选，但推荐）：

```bash
# 下载远端所有分支信息，但不改动本地文件
git fetch origin

# 切换到要 review 的分支
git switch feat/home-hero

# 只有 package.json 变了才需要装依赖
npm install

# 启动本地服务器，亲手点一遍
npm run dev
```

4. 没问题点 **Approve** → **Submit review**；
5. 点 **Squash and merge** → **Confirm squash and merge**；
6. 点 **Delete branch**。

> 只有两个人时，不要互相卡太久。规则：**author 自测通过 + reviewer 看完 diff + CI 绿 = 可以合并**。但 GitHub 不允许作者批准自己的 PR，main 又开了“至少 1 人 Approve”，所以 author **无法自己批自己合**。做法是约定每天两个固定 review 时间（午休、收工前），男孩用手机浏览器也能点 Approve；不要为了省事关掉保护。

### 4.7 第 10–11 步：本地同步并删分支

合并后，GitHub 上的分支已经没了，但你本地还在。执行：

```bash
# 切回主干 main
git switch main

# 拉取远端刚合并的那条 squash 提交
git pull origin main

# 删除本地已合并的分支
git branch -d feat/home-hero
```

如果提示：

```text
error: The branch 'feat/home-hero' is not fully merged.
```

这是因为 **Squash and merge** 把多个提交压成了一个新提交，Git 不认识原来的分支了。**确认 PR 已经合并**后，用：

```bash
# 强制删除本地分支（大写 -D；仅限确认 PR 已合并时）
git branch -D feat/home-hero
```

`-D` 是强制删除本地分支，不可恢复，但代码已经在 main 里，所以安全。**只在你亲眼确认 PR 已合并时用。**

最后确认：

```bash
# 列出本地分支，应该只剩 main
git branch

# 看最近 5 条提交，第一条应是刚合并的 squash 提交
git log --oneline -5
```

本地应该只剩 `main`，最近一条是刚才的 squash 提交。

### 4.8 第 12 步：同步 Gitee 镜像

如果已经按 **02 §0.10** 加过 `gitee` remote：

```bash
# 把 main 和所有 tag 推到 Gitee（只同步 main，不同步 feature 分支）
git push gitee main --tags
```

**只同步 main 和 tag，不要同步 feature 分支。** Gitee 是镜像和备份，不是第二个协作平台。

### 4.9 第 13 步：更新看板

- 把今天的 Issue 拖到 **Done**；
- 如果没做完，写一条评论：卡在哪、明天从哪继续；
- 不要在 Issue 里贴密钥、患者信息、未公开的医学资料。

---

## 5. 第二天：重复，但不要重复用旧分支

### 5.1 标准开场

```bash
# 切回主干
git switch main

# 拉今天的起点（昨天合并的内容都在这里）
git pull origin main

# 从最新 main 新建今天的分支
git switch -c feat/今天的新任务

# 确认已在今天的分支上，而不是 main
git branch --show-current
```

对 Cline：

```text
start
```

### 5.2 三种常见情况

#### 情况 A：昨天做完了，已经合并

- 昨天分支已删；
- 今天从最新 main 开新分支；
- **不要**在昨天的分支上继续，因为它已经完成使命。

#### 情况 B：昨天没做完，没有合并

- 昨天分支还在；
- 今天继续用它：

```bash
# 切回昨天没做完的分支
git switch feat/organ-page

# 拉取这条分支昨天的远端备份
git pull

# 下载远端最新信息（包含队友已合并进 main 的内容）
git fetch origin

# 把最新 main 合进当前分支，提前解决冲突
git merge origin/main
```

- 如果 `git pull` 提示没有 upstream，第一次推的时候忘了 `-u`：

```bash
# 补一次带 -u 的推送，建立本地分支和远端的对应关系
git push -u origin feat/organ-page
```

- 今天继续做完，再走收工流程合并。

#### 情况 C：昨天做坏了，想推倒重来

先确认有没有值得保留的东西：

```bash
# 看这条坏分支上都有哪些提交
git log --oneline -5

# 看它相对 main 改了哪些文件
git diff main...HEAD --stat
```

- 如果整个分支都不要了：在 GitHub 上关掉 PR（如果有），本地：

```bash
# 先离开要删的分支，切回 main
git switch main

# 强制删除本地坏分支（提交会被丢弃，确认不要了再用）
git branch -D feat/bad-branch

# 删除 GitHub 上的同名远端分支（如果 PR 关闭后它还在）
git push origin --delete feat/bad-branch
```

- 如果只是最后一个提交坏了：

```bash
# 生成一个反向提交，抵消那次坏提交（不改写历史，可以安全 push）
git revert <commit-hash>
```

不要用 `git reset --hard` 把已 push 的历史抹掉。

---

## 6. GitHub 和 Gitee 到底怎么分工

### 6.1 推荐：GitHub 主库，Gitee 镜像

| 事情 | GitHub | Gitee |
|---|---|---|
| 日常分支 | ✅ | ❌ |
| Pull Request | ✅ | ❌ |
| Code Review | ✅ | ❌ |
| main | ✅ 主 | ✅ 镜像 |
| tag / release | ✅ 主 | ✅ 镜像 |
| 国内访问备份 | 一般 | ✅ |

理由：GitHub 的 PR、Actions、Issues 更完整；Gitee 国内快，作为备份和赛前展示。**不要两个平台各写各的**，否则一定会出现“哪边才是最新”的灾难。

### 6.2 每天只多做一条命令

每次 main 合并后（main 已经由 PR 推到 GitHub 了，这里只补 tag）：

```bash
# 把 tag 推到 GitHub（main 已保护，不要直接 push main）
git push origin --tags

# 把 main 和 tag 镜像到 Gitee（Gitee 是镜像，可以直接推 main）
git push gitee main --tags
```

如果 `gitee` 还没加：

```bash
# 给 Gitee 仓库起别名 gitee
git remote add gitee git@gitee.com:<你的Gitee用户名>/body-prism.git

# 确认 origin 和 gitee 两个地址都在
git remote -v
```

### 6.3 Gitee 推送被拒怎么办

如果 `git push gitee main` 报 `rejected` / `non-fast-forward`：

1. **不要** `--force`；
2. 说明有人直接往 Gitee 写过东西，或者镜像曾经被手动改过；
3. 先看差异：

```bash
# 下载 Gitee 的最新状态（只下载，不合并）
git fetch gitee

# 看 Gitee 比本地 main 多哪些提交
git log --oneline main..gitee/main

# 看本地 main 比 Gitee 多哪些提交
git log --oneline gitee/main..main
```

4. 如果 Gitee 上多出来的提交不重要，和队友确认后，在 Gitee 网页删除仓库重建，再 `git push gitee main --tags`；
5. 如果 Gitee 上有重要提交，停下来，让 Cline 帮你分析怎么合并，不要强推。

### 6.4 如果 GitHub 太慢，想反过来

可以：**Gitee 主库，GitHub 赛前镜像**。但一旦决定，整个团队统一，不要把 PR 开在一个平台、代码推到另一个平台。

判断标准：连续三天 `git push` 超过 30 秒或经常失败 → 换主库。

---

## 7. 两个人同一天怎么不撞车

### 7.1 早上 5 分钟站会，只说三句

```text
我今天做什么：
我改哪些文件/目录：
我需要对方什么：
```

例子：

```text
女孩：今天做首页 hero，只改 src/app/page.tsx 和 src/components/lens-card.tsx。
男孩：今天写心脏三镜文案，只改 src/content/organs/heart.ts。
需要：女孩帮我看一下“信息之镜”那段有没有说过头。
```

### 7.2 文件分工建议

| 人 | 主责目录 | 尽量不碰 |
|---|---|---|
| 女孩（信息工程） | `src/app`、`src/components`、`src/lib` | `src/content` 的医学结论 |
| 男孩（临床医学） | `src/content`、`docs/医学资料`、`public/art` | `src/app` 的结构、`package.json` |

两个人都可能改的文件：

- `src/app/layout.tsx`（导航、字体、全局壳）
- `src/app/globals.css`（全局样式）
- `package.json` / `package-lock.json`（依赖）
- `README.md`

约定：**这些文件谁改，先在群里说一句；改完立刻 push + 合并，另一个人再拉。**

### 7.3 冲突发生了怎么办

冲突不是错误，是两个人改了同一行。处理顺序：

1. 不要慌，不要关 VSCode；
2. `git status` 看哪些文件冲突；
3. 打开文件，找到：

```text
<<<<<<< HEAD
你的版本
=======
对方的版本
>>>>>>> origin/main
```

4. 决定保留哪段、还是两段都要；
5. 删掉三行标记；
6. `git add <文件>`；
7. `git commit -m "merge: resolve conflict in <文件>"`；
8. `npm run lint` + `npm run build`；
9. `git push`。

看不懂就让 Cline 解释每一段在做什么，但**不要让它直接“帮你合并”然后自动提交**。合并结果必须你读一遍。

---

## 8. 一周节奏：周五演示，周日规划

| 时间 | 动作 |
|---|---|
| 周一到周四 | 每天按本文流程；每天至少一个 PR 合并 |
| 周五 | 下午 freeze：不再合并新功能；用 main 做一次 5 分钟 Demo；打 tag |
| 周六 | 缓冲：补没做完的、修 Demo 发现的 bug |
| 周日 | 复盘 30 分钟；定下周 3 件事；更新 `DECISIONS.md` |

### 8.1 周五打 tag

```bash
# 切回 main（打 tag 要在正确的提交上）
git switch main

# 确认 main 是最新的
git pull origin main

# 创建一个带说明的 tag（书签：这一版能演示）
git tag -a v0.1.0 -m "week 1 demo: home + heart + explore skeleton"

# 把 tag 推到 GitHub
git push origin v0.1.0

# 再把 main 和 tag 镜像到 Gitee
git push gitee main --tags
```

tag 是“这一版可以演示”的书签。比赛提交、录视频、答辩 PPT 都写清楚是哪个 tag。

### 8.2 周日清理

查看已经合并的分支：

```bash
# 列出已经并入 main 的本地分支（这些都可以删）
git branch --merged main
```

删除本地已合并分支（一个个删，不要批量脚本）：

```bash
# 删除一个已合并的本地分支（一次只删一个）
git branch -d feat/old-branch
```

查看远端分支：

```bash
# 列出远端分支（origin/xxx、gitee/xxx）
git branch -r
```

如果 GitHub 上还有没删的旧分支，在网页 **Branches** 页面删掉。

---

## 9. 两天完整演练（照着抄）

### 9.1 第一天：女孩做首页

**早上**

```bash
# 切回主干
git switch main

# 拉取最新 main
git pull origin main

# 新建今天的首页分支
git switch -c feat/home-hero

# 确认当前分支
git branch --show-current
```

输出：`feat/home-hero`

对 Cline：`start` → 确认计划 → 开始改 `src/app/page.tsx`。

**中午**

```bash
# 看改了哪些文件
git status

# 把首页文件放进待提交区
git add src/app/page.tsx

# 存一个提交
git commit -m "feat(home): add hero section"

# 第一次推分支，建立跟踪关系
git push -u origin feat/home-hero
```

**晚上**

```bash
# 代码检查：必须 0 error
npm run lint

# 生产构建：必须成功
npm run build
```

两条都过。对 Cline：`stop`，检查 `docs/SESSION_LOG.md`。

```bash
# 看改了哪些文件
git status

# 把这次改的三个文件放进待提交区
git add src/app/page.tsx src/components/lens-card.tsx docs/SESSION_LOG.md

# 存一个提交
git commit -m "feat(home): add hero and three lens cards"

# 上传分支（已建立跟踪关系）
git push
```

网页开 PR：`feat(home): add hero and three lens cards` → 选男孩 review。

男孩 20 分钟后 Approve。女孩点 **Squash and merge** → **Delete branch**。

**本地收尾**

```bash
# 切回 main
git switch main

# 拉取刚合并的首页
git pull origin main

# 删除本地已合并的首页分支
git branch -d feat/home-hero

# 把 main 和 tag 镜像到 Gitee
git push gitee main --tags

# 看最近 3 条提交，确认首页已在 main 上
git log --oneline -3
```

现在 main 上有首页。

### 9.2 第二天：男孩做心脏内容

**早上**

```bash
# 切回主干 main（不切过去就 pull，会把 main 合进你昨天的旧分支）
git switch main

# 从 GitHub 下载 main 的最新提交并合并到本地 main
git pull origin main
```

他应该能在 `git log` 里看到女孩昨天的提交。

```bash
# 从最新 main 新建心脏内容分支
git switch -c content/heart
```

对 Cline：

```text
start
今天只做一件事：按 src/content/organs/heart.ts 的现有结构，补全结构之镜、关系之镜、信息之镜三段文案，每段不超过 120 字，每条 claim 必须有 sourceIds。
不要改页面组件，不要安装依赖。
先给计划。
```

**白天**：改 `src/content/organs/heart.ts`，每完成一段提交一次。

```bash
# 把心脏内容文件放进待提交区
git add src/content/organs/heart.ts

# 存一个提交
git commit -m "content(heart): add structure lens"

# 第一次推这条分支，带上 -u 建立跟踪关系
git push -u origin content/heart
```

**晚上**

```bash
# 代码检查：必须 0 error
npm run lint

# 生产构建：必须成功
npm run build
```

对 Cline：`stop`。

```bash
# 把心脏内容和日志放进待提交区
git add src/content/organs/heart.ts docs/SESSION_LOG.md

# 存一个提交
git commit -m "content(heart): complete three lens cards"

# 上传分支
git push
```

网页开 PR → 女孩 review 医学表述和来源 → **Squash and merge** → **Delete branch**。

**本地收尾**

```bash
# 切回 main
git switch main

# 拉取刚合并的心脏内容
git pull origin main

# 删除本地已合并的内容分支
git branch -d content/heart

# 镜像到 Gitee
git push gitee main --tags
```

### 9.3 第三天：女孩继续做器官页

她从最新 main 开分支：

```bash
# 切回 main
git switch main

# 拉取男孩昨天合并的心脏内容
git pull origin main

# 从最新 main 新建器官页分支
git switch -c feat/organ-page
```

她的分支里自动包含男孩昨天的心脏内容——因为她是从最新 main 开的。**这就是“每天先拉 main”的意义。**

---

## 10. 常见问题

**Q1：每天合并会不会太碎，历史很乱？**
A：两个人、一个月，每天一个 PR 正好。Squash merge 会把一天的小提交压成一个，main 的历史很干净。真正乱的是“一周不合并，最后一天解 20 个冲突”。

**Q2：分支删了，代码会不会没了？**
A：不会。合并进 main 的代码在 main 的历史里。删的只是“工作台”，不是“展品”。

**Q3：远端分支删了，本地为什么还在？**
A：GitHub 的 **Delete branch** 只删远端。本地要自己 `git branch -d`。这是两个不同的地方。

**Q4：可不可以在 main 上改 README 错别字？**
A：技术上可以，但团队约定**一律走分支 + PR**。习惯一旦破，早晚会在 main 上改代码。

**Q5：两个人都从 main 开分支，会不会互相看不到对方的工作？**
A：会，直到对方合并。所以每天至少 push 一次，PR 里能看到；需要对方提前用你的代码，就让他 `git fetch origin` 后 `git switch <你的分支>`。

**Q6：PR 一定要对方 Approve 吗？**
A：**必须**。main 开了“至少 1 人 Approve”，而 GitHub 不允许作者批准自己的 PR，所以每条 PR 都要另一个人点 **Approve** 才能合并。约定固定 review 时间，别让 main 停摆。

**Q7：Gitee 上要不要也开分支、开 PR？**
A：不要。Gitee 只做 main 镜像。两套 PR 系统会让“哪边是最新”变得不可回答。

**Q8：今天没做完，但已经 push 了，明天要不要合并？**
A：不合并。push 只是备份。明天在同一个分支继续，做完再合并。

**Q9：合并后发现 main 坏了怎么办？**
A：不要慌，不要 `reset --hard`。在 GitHub 上找到刚才的 PR，点 **Revert**，它会生成一个反向 PR；review 后合并。或者本地走分支：

```bash
# 切回 main
git switch main

# 拉取包含坏提交的最新 main
git pull origin main

# 新建一条修复分支（不要在 main 上直接改）
git switch -c fix/revert-bad-merge

# 生成一个反向提交，抵消坏提交的改动
git revert <坏提交的hash>

# 上传修复分支
git push -u origin fix/revert-bad-merge

# 网页开 PR → review → Squash and merge → Delete branch

# 切回 main
git switch main

# 拉取刚合并的反向提交
git pull origin main

# 删除本地修复分支
git branch -d fix/revert-bad-merge
```

**不要直接 `git push origin main`**，main 有保护，而且绕过 PR 会让队友不知道发生了什么。

**Q10：可以一天开两条分支吗？**
A：可以，但新手不建议。一条分支只做一件事；如果两件事互不影响，做完一条合并一条，再开下一条。同时开两条，切换时容易搞混。

---

## 11. 两张可打印的卡片

### 11.1 早上 8 分钟

```text
□ 1. 打开 VSCode，左下角切到 main
□ 2. git switch main
□ 3. git pull origin main
□ 4. git status        → 必须 clean
□ 5. git log --oneline -5
□ 6. git switch -c feat/今天的事
□ 7. git branch --show-current → 确认不是 main
□ 8. 对 Cline 说 start，确认 3 步计划
```

### 11.2 晚上 20 分钟

```text
□ 1. npm run lint
□ 2. npm run build
□ 3. 对 Cline 说 stop，检查 SESSION_LOG
□ 4. git status / git diff --stat，确认没有密钥
□ 5. git add <具体文件>
□ 6. git commit -m "类型(范围): 一句话"
□ 7. git push
□ 8. 网页开 PR，选 reviewer
□ 9. 队友 Approve
□ 10. Squash and merge
□ 11. Delete branch（远端）
□ 12. git switch main
□ 13. git pull origin main
□ 14. git branch -d <分支>
□ 15. git push gitee main --tags
□ 16. 更新看板，对 Cline 说 plan
```

---

## 12. 一句话记住

> **早上从 main 出来，晚上回 main 里去；做完才回，没做完就留在分支上；回去之后把分支删掉，明天重新出来。**
