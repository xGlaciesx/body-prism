# VSCode 实战手册：打开项目、和 AI 结对、用 Git 提交

> 读者：大一新生，第一次用 VSCode 做完整项目。
> 系统：女孩 Windows 11（PowerShell），男孩 macOS 27（zsh）；快捷键和路径分别标注。
> 目标：从“双击图标”开始，到每天能独立完成“拉取 → 改代码 → 提交 → 推送 → 开 PR”。
> 配套：Git 概念看 **08**，协同规则看 **02**，Cline 安装在 **01**。
> 第一次从零写代码：先看 **14**（完整一天，含文档包怎么放、AGENTS.md 怎么填）；每天开工收工看 **15**；写页面的顺序看 **16**。

---

## 0. 你将学会

1. 第一次正确打开项目，不把 VSCode 用成记事本；
2. 认识界面和 12 个必会快捷键；
3. 每天开工/收工的固定动作；
4. 用 `start` / `stop` / `plan` 三句口令，让 AI 跨天记住项目；
5. 让 Cline 做一个小任务，并且看得懂它改了什么；
6. 在 VSCode 里完成 pull、merge、push、开 PR；
7. 冲突了怎么处理，改坏了怎么退。

---

## 1. 第一次打开项目

### 1.1 确认项目在哪

| 系统 | 默认路径 |
|---|---|
| Windows 11 | `C:\Users\<用户名>\Projects\body-prism` |
| macOS 27 | `/Users/<用户名>/Projects/body-prism` |

如果不确定，先在终端里确认：

Windows PowerShell：

```powershell
cd $env:USERPROFILE\Projects\body-prism
Get-Location
```

macOS 27 Terminal：

```bash
cd ~/Projects/body-prism
pwd
```

### 1.2 用“打开文件夹”，不要单个拖文件

1. 打开 VSCode；
2. 菜单 **File → Open Folder...**（macOS 也是 **File → Open Folder...**）；
3. 选中 `body-prism` 这个**文件夹**，不是里面的某个文件；
4. 如果弹出 **Do you trust the authors of the files in this folder?**，选 **Yes, I trust the authors**；
5. 左侧出现文件树，标题栏显示 `body-prism`，说明打开对了。

> 常见错误：直接双击 `page.tsx` 打开。这样 VSCode 没有把整个项目当工作区，终端、Git、Cline 都可能不工作。

### 1.3 打开终端

- Windows：`Ctrl + \``（反引号，Tab 键上方）
- macOS：`Cmd + \``

或者菜单 **Terminal → New Terminal**。

终端右下角会显示当前 shell：

- Windows 应该是 **PowerShell**；
- macOS 应该是 **zsh**。

如果 Windows 显示的是 `cmd`，点终端右上角的下拉箭头 → **Select Default Profile** → 选 **Windows PowerShell** → 关掉终端重开。

### 1.4 第一次跑起来

```bash
npm install
npm run dev
```

看到：

```text
▲ Next.js
- Local: http://localhost:3000
```

按住 `Ctrl`（macOS 是 `Cmd`）点击链接，浏览器打开。看到页面就成功了。

停止：在终端按 `Ctrl + C`。

### 1.5 推荐扩展

打开左侧扩展图标（四个方块），搜索并安装：

| 扩展 | 作用 | 是否必需 |
|---|---|---|
| Chinese (Simplified) Language Pack | 中文界面 | 可选 |
| ESLint | 实时标出代码问题 | 必需 |
| Prettier - Code formatter | 统一格式 | 必需 |
| Tailwind CSS IntelliSense | Tailwind 类名补全 | 强烈建议 |
| GitLens | 看每行是谁改的 | 建议 |
| Error Lens | 行内显示报错 | 建议 |
| Cline | AI 结对开发 | 必需 |
| GitHub Pull Requests and Issues | 在 VSCode 里开 PR、review | 建议 |

安装完如果没生效：`Ctrl+Shift+P` / `Cmd+Shift+P` → 输入 **Reload Window** → 回车。

---

## 2. 界面导览

```text
┌────┬──────────────────────────────┬──────────────┐
│活动│  编辑器（代码）               │ Cline 侧栏    │
│栏  │                              │              │
│    │                              │  对话 / 计划  │
│ 📁 │                              │              │
│ 🔍 │                              │              │
│ 🌿 │                              │              │
│ ▶  │                              │              │
│ 🧩 │                              │              │
├────┴──────────────────────────────┴──────────────┤
│ 终端 / 问题 / 输出 / 调试控制台                    │
└───────────────────────────────────────────────────┘
```

| 图标 | 名称 | 用途 |
|---|---|---|
| 📁 | Explorer | 文件树 |
| 🔍 | Search | 全局搜索 |
| 🌿 | Source Control | Git 改动、提交、分支 |
| ▶ | Run and Debug | 调试（本项目少用） |
| 🧩 | Extensions | 插件 |
| Cline 图标 | Cline | AI 对话 |

**右下角状态栏**很重要：

- 分支名（比如 `main`）：点它可以切换/新建分支；
- 错误/警告数量：点开看问题；
- 行尾符（LF/CRLF）：两边不一致时会出现；
- 语言模式：TypeScript / Markdown。

---

## 3. 12 个必会快捷键

| 操作 | Windows | macOS |
|---|---|---|
| 命令面板（最重要） | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| 快速打开文件 | `Ctrl+P` | `Cmd+P` |
| 全局搜索 | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| 打开终端 | `Ctrl+\`` | `Cmd+\`` |
| 源代码管理 | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| 保存 | `Ctrl+S` | `Cmd+S` |
| 全部保存 | `Ctrl+K S` | `Cmd+Option+S` |
| 格式化文档 | `Shift+Alt+F` | `Shift+Option+F` |
| 注释/取消注释 | `Ctrl+/` | `Cmd+/` |
| 多光标 | `Alt+Click` | `Option+Click` |
| 显示/隐藏侧栏 | `Ctrl+B` | `Cmd+B` |
| 分屏 | `Ctrl+\` | `Cmd+\` |

> 只记一个也行：**命令面板**。记不住快捷键时，`Ctrl/Cmd+Shift+P`，输入你想做的事，比如 “terminal”“format”“git pull”。

---

## 4. 每天开工 6 步 / 收工 6 步

### 4.1 开工

```text
1. 打开 VSCode，确认左下角是 main
2. 终端：git switch main
3. 终端：git pull --rebase
4. 新建今天的分支：git switch -c feat/今天的事
5. 打开 Cline，输入 start（或“开始”）
6. 看它复述的目标和 3 步计划，确认后再动手
```

### 4.2 收工

```text
1. 终端：npm run lint
2. 终端：npm run build
3. Source Control 里看 diff，确认没有密钥/垃圾文件
4. 写 commit message，提交
5. Push（第一次点 Publish Branch）
6. 对 Cline 说 stop（或“今天结束”），让它写日志
```

**顺序不要反。** 先验证，再提交；先提交，再让 AI 写日志。这样日志里记录的 commit 是真实存在的。

---

## 5. AI 协作协议：`start` / `stop` / `plan`

### 5.1 为什么需要协议

AI 没有真正的“长期记忆”。新开一个对话，它不记得昨天做了什么；上下文太长，它也会忘掉前面的细节。

但**仓库里的文件不会忘**。所以正确做法是：

```text
把“记忆”写进仓库，而不是指望模型记住。
```

三层记忆：

| 文件 | 存什么 | 谁维护 | 多久变一次 |
|---|---|---|---|
| `AGENTS.md` | 项目规则、技术栈、红线、会话协议 | 两个人共同 | 很少 |
| `docs/DECISIONS.md` | 已经拍板的决策（为什么用 Supabase、为什么不做 3D） | 谁决策谁写 | 每周 |
| `docs/SESSION_LOG.md` | 每天做了什么、没做完什么、明天第一件事 | 每天收工写 | 每天 |

### 5.2 三句口令

| 口令 | AI 的动作 | 禁止 |
|---|---|---|
| `start` / `开始` | 读规则和日志 → 看 `git status` → 复述 → 给 3 步计划 → 等确认 | 不许直接改代码 |
| `stop` / `今天结束` | 更新 `SESSION_LOG.md` → 列改动 → 建议 commit → 提醒验证 | 不许自动 commit/push |
| `plan` / `讨论明天` | 只讨论，输出明天 3 件事和风险 | 不许改文件 |

### 5.3 可直接粘贴的 `AGENTS.md` 片段

把下面这段加到项目根目录 `AGENTS.md` 的末尾：

```md
## 会话协议

### start / 开始
当用户说 `start` 或 `开始`：
1. 读 AGENTS.md、README.md、docs/SESSION_LOG.md 最后 3 条；
2. 运行 `git status` 和 `git branch --show-current`；
3. 用 5 行以内复述：当前分支、上次做到哪、今天目标；
4. 给出不超过 3 步的计划；
5. 等用户确认后再改代码。

### stop / 今天结束
当用户说 `stop` 或 `今天结束`：
1. 停止新功能，不继续改代码；
2. 更新 docs/SESSION_LOG.md：
   - 今天做了什么
   - 改了哪些文件
   - 没做完什么
   - 明天第一件事
   - 遇到的问题
3. 列出本次改动文件和建议的 commit message；
4. 不自动 commit、不自动 push；
5. 提醒用户分别运行 `npm run lint` 和 `npm run build`。

### plan / 讨论明天
当用户说 `plan` 或 `讨论明天`：
- 只讨论，不修改任何文件；
- 输出明天的 3 件事、每件事的验收标准、可能的风险；
- 等用户确认后，再把计划写入 docs/SESSION_LOG.md。

### 记忆规则
- 记忆分三层：AGENTS.md（长期规则）、docs/DECISIONS.md（已定决策）、docs/SESSION_LOG.md（每日进展）。
- 不把密钥、隐私、患者信息写进任何记忆文件。
- 不确定的事实写“待确认”，不要编。
```

### 5.4 `docs/SESSION_LOG.md` 模板

新建 `docs/SESSION_LOG.md`，把下面内容粘进去，每天在**最上面**加一条：

```md
# 项目日志

> 新的在最上面。每条包含：日期、谁、分支、目标、完成、改动、未完成、明天第一件事。

## 2026-10-21 · 女孩 · feat/organ-page

- 目标：器官页能读到 heart.mdx，并显示证据等级
- 完成：
  - 新增 `src/components/evidence-badge.tsx`
  - `/heart` 页面接入了 contentlayer 读取
- 改动文件：
  - `src/components/evidence-badge.tsx`（新增）
  - `src/app/heart/page.tsx`
- 没做完：
  - 移动端 375px 下徽章会换行，明天修
- 明天第一件事：
  - 修 `evidence-badge` 的响应式，补一张 375px 截图
- 卡住/风险：
  - 不确定证据等级 D 的配色，等男孩确认
```

### 5.5 `docs/DECISIONS.md` 模板

```md
# 已定决策

| 日期 | 决策 | 原因 | 谁定的 | 什么时候可能重看 |
|---|---|---|---|---|
| 2026-10-19 | 用 Supabase，不自建后端 | 免费层够用，省时间 | 两人 | 数据量超免费层 |
| 2026-10-20 | 3D 先做 2.5D 降级方案 | 低端设备性能不稳 | 两人 | 3D spike 跑通后 |
| 2026-10-21 | 医学内容必须 REVIEWER 审核 | 比赛合规与准确性 | 男孩 | 不重看 |
```

### 5.6 一次真实对话示例

```text
你：start

AI：
- 当前分支：feat/organ-page
- 上次（10-21）：完成 evidence-badge，heart 页接入 MDX；未完成移动端换行
- 今天目标：修 375px 响应式，并补截图
- 计划：
  1. 读 evidence-badge.tsx 和 heart/page.tsx，确认布局
  2. 只改 badge 的 flex-wrap 和间距，不动数据逻辑
  3. 跑 lint/build，给出 375px/768px 两张截图建议
- 确认后我开始第 1 步。

你：确认，只做第 1 步，先给计划不要改。

AI：（读文件，给出改动计划）

你：可以，改吧。

（AI 改完，你打开 Source Control 看 diff）

你：stop

AI：
- 已更新 docs/SESSION_LOG.md
- 改动：src/components/evidence-badge.tsx
- 建议 commit：`fix(organ): prevent evidence badge overflow on 375px`
- 请先跑 npm run lint 和 npm run build
- 未自动提交
```

### 5.7 三条纪律

1. **AI 不改，你不看，就不提交。** 每次提交前必须看 diff。
2. **AI 说“完成”不算完成。** 以 lint、build、浏览器实际效果为准。
3. **密钥不进对话。** 不要把自己的 API Key 粘给 AI，也不要把 `.env.local` 内容贴进去。

---

## 6. 让 Cline 做第一个小任务

### 6.1 任务：给器官页加“证据等级”徽章

不要一上来让 AI“做一个网站”。从一个 30 分钟能验收的小任务开始。

### 6.2 提示词模板

```text
目标：在器官详情页显示证据等级徽章（A/B/C/D）。
范围：
- 只新增 src/components/evidence-badge.tsx
- 只改 src/app/heart/page.tsx 的标题区域
- 不改数据结构，不改其他页面
验收：
- 四个等级颜色不同，文字分别是“证据 A/B/C/D”
- 375px 和 768px 不溢出
- npm run lint 和 npm run build 通过
禁止：
- 不新增依赖
- 不改 globals.css
- 不删除现有内容
先给计划，不要直接改。
```

### 6.3 过程

```text
1. 发提示词
2. 看它列的文件和风险
3. 确认后让它改
4. 打开 Source Control，逐个文件看 diff
5. 有问题的 hunk 点 “Discard Change”，不要整份接受
6. 终端跑 lint、build
7. 浏览器看 375px / 768px
8. 自己 commit
```

### 6.4 改坏了怎么退

**只退一个文件：**

```bash
git restore src/components/evidence-badge.tsx
```

**退掉所有未提交改动（危险，先确认没有你想保留的内容）：**

```bash
git restore .
```

**已经 commit 但没 push：**

```bash
git reset --soft HEAD~1
```

这会把最后一次 commit 撤回到暂存区，代码还在。

> 不要用 `git reset --hard`，除非你明确知道会丢什么。

---

## 7. 在 VSCode 里和 GitHub / Gitee 交互

### 7.1 三种方式

| 方式 | 适合 | 优点 | 缺点 |
|---|---|---|---|
| 源代码管理面板 | 日常 90% 操作 | 直观、能看 diff | 复杂冲突还是要终端 |
| 终端命令 | 精确控制、脚本化 | 和文档一致、可复制 | 要记命令 |
| GitHub Pull Requests 扩展 | 开 PR、review | 不用切网页 | 需要登录 GitHub |

**建议：日常用面板，遇到问题用终端，开 PR 用扩展或网页。**

### 7.2 图形化：提交、拉取、推送

#### 第一步：看改动

1. 点左侧 **Source Control** 图标（分支形状），或 `Ctrl+Shift+G` / `Cmd+Shift+G`；
2. 列出所有改动文件：
   - `M` = 修改；
   - `A` = 新增；
   - `D` = 删除；
   - `U` = 未跟踪（新文件）。
3. 点文件名，右侧打开 diff：左边旧，右边新。

#### 第二步：暂存

- 单个文件：鼠标移到文件上，点 **+**；
- 全部：点 **Changes** 右边的 **+**；
- 不想提交某个文件：右键 → **Discard Changes**（会丢内容，先看 diff）。

#### 第三步：提交

1. 在消息框输入 commit message，例如 `feat(organ): add evidence badge`；
2. 点 **Commit**（对勾）；
3. 如果有 staged 和 unstaged 混合，VSCode 可能问是否 stage all and commit，按需要选择。

#### 第四步：推送

- 第一次这条分支：按钮显示 **Publish Branch**，点它，选择 `origin`；
- 以后：按钮显示 **Sync Changes**，点它 = 先 pull 再 push；
- 只想 push：点 `...` 菜单 → **Push**；
- 只想 pull：`...` 菜单 → **Pull**。

> **Sync Changes 不是“只上传”。** 它会先拉取远端，再推送本地。冲突时会停下来让你处理。

### 7.3 图形化：分支

1. 看**左下角状态栏**，显示当前分支名（如 `main`）；
2. 点它，弹出分支列表；
3. **Create new branch...**：输入 `feat/organ-page`，回车；
4. 选一个已有分支：点列表里的名字；
5. 删除本地分支：`...` 菜单 → **Branch → Delete Branch**。

> 新建分支前，先切回 `main` 并 pull，保证从最新代码开分支。

### 7.4 图形化：合并

比赛项目**不建议在本地直接 merge 功能分支**，而是走 PR。原因：

- PR 有记录、有 review、有 CI；
- Squash merge 让 main 历史干净；
- 评委能看到协作过程。

如果确实要在本地合并：

```text
1. 切到 main
2. Pull
3. ... 菜单 → Branch → Merge...
4. 选择要合进来的分支
5. 解决冲突（如果有）
6. Push
```

### 7.5 图形化：开 PR

**方式 A：GitHub Pull Requests and Issues 扩展**

1. 安装扩展；
2. 命令面板 → **GitHub Pull Requests: Sign in**；
3. 按提示在浏览器授权；
4. 推送分支后，Source Control 上方会出现 **Create Pull Request**；
5. 填标题、描述、reviewer；
6. 创建后在 VSCode 里能看到 checks、comments，也能合并。

**方式 B：网页**

push 后终端会输出一个链接，类似：

```text
remote: Create a pull request for 'feat/organ-page' on GitHub by visiting:
remote:      https://github.com/xGlaciesx/body-prism/pull/new/feat/organ-page
```

按住 `Ctrl/Cmd` 点击，或复制到浏览器。

**Gitee：**

VSCode 没有 GitHub 那样官方同等的 PR 扩展。用终端 push 后，去 Gitee 网页：

```text
仓库 → Pull Requests → 新建 Pull Request → 选择源分支和目标分支 → 提交
```

### 7.6 一次完整演练：男孩基于女孩刚合并的 main 开发

**背景：** 女孩刚把 `feat/navbar` 合并进 `main`，男孩要在此基础上写肝脏内容。

#### 图形化步骤

```text
1. 打开 VSCode 的 body-prism
2. 左下角点当前分支（可能是 content/heart）→ 选 main
3. Source Control → ... → Pull（或点 Sync Changes）
4. 左下角点 main → Create new branch → 输入 content/liver
5. 改 content/organs/liver.mdx
6. Source Control → 文件旁 + → 写 commit message → Commit
7. 点 Publish Branch → 选 origin
8. GitHub 扩展 → Create Pull Request → 选 reviewer 女孩 → 创建
```

#### 终端等价步骤

```bash
git switch main
git pull --rebase
git switch -c content/liver

# 改文件……

git status
git add content/organs/liver.mdx
git commit -m "content(liver): add evidence-graded liver content"
git push -u origin content/liver
```

#### 女孩 review 后

1. GitHub 网页或扩展里点 **Squash and merge**；
2. 删除远端分支；
3. 男孩本地：

```bash
git switch main
git pull --rebase
git branch -d content/liver
```

### 7.7 三个人都容易忽略的点

- **push 前先 pull**：减少冲突；
- **一次分支只做一件事**：PR 更好 review；
- **合并后删分支**：避免堆积；
- **每天至少 push 一次**：否则队友看不到你的进度，也没有备份；
- **不要直接在 GitHub 网页改 main**：除非是改 README 错别字，也要走 PR。

---

## 8. 冲突处理（VSCode 版）

### 8.1 冲突长什么样

Source Control 里文件标 `C`（conflict），编辑器里出现：

```text
<<<<<<< HEAD
你的版本
=======
对方版本
>>>>>>> branch-name
```

### 8.2 四个按钮

光标放在冲突块里，会出现：

| 按钮 | 作用 |
|---|---|
| Accept Current Change | 只保留你的 |
| Accept Incoming Change | 只保留对方的 |
| Accept Both Changes | 两边都保留 |
| Compare Changes | 并排比较 |

**没有“自动正确”按钮。** 选完要自己读一遍逻辑。

### 8.3 解决步骤

```text
1. 打开冲突文件
2. 逐块选择/手改，删掉 <<<<<<< ======= >>>>>>>
3. 保存
4. Source Control 里点文件旁 +
5. 如果是在 merge：Commit
   如果是在 rebase：终端 git rebase --continue
6. Push
```

### 8.4 不想解了，想回到安全状态

```bash
# merge 冲突
git merge --abort

# rebase 冲突
git rebase --abort
```

回到操作之前，代码不会丢。

### 8.5 更大的冲突：用 Merge Editor

VSCode 提供三栏合并编辑器：

1. 命令面板 → **Git: Open Merge Editor**；
2. 左：Incoming；右：Current；下：Result；
3. 勾选要保留的块，或直接编辑 Result；
4. 完成后点 **Complete Merge**。

---

## 9. 每天 / 每周检查清单

### 9.1 每天收工前

- [ ] `git status` 没有意外文件；
- [ ] `npm run lint` 通过；
- [ ] `npm run build` 通过；
- [ ] 改动已 commit；
- [ ] 分支已 push；
- [ ] Cline 已执行 `stop`，`SESSION_LOG.md` 已更新；
- [ ] 明天第一件事写清楚了。

### 9.2 每周

- [ ] 所有功能分支都已合并或关闭；
- [ ] `main` 是最新的，CI 是绿的；
- [ ] 删除已合并的本地/远端分支；
- [ ] 看一次 GitHub Actions 有没有警告；
- [ ] 更新 `DECISIONS.md`；
- [ ] 把 Gitee 镜像同步一次；
- [ ] 备份原始素材（不要放 Git）。

---

## 10. 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| Source Control 是空的 | 打开的不是仓库根目录 | File → Open Folder 选 `body-prism` |
| 提示 “Git: not found” | Git 没装 / PATH 没生效 | 重装 Git，重启 VSCode |
| 终端里 `npm` 找不到 | Node 没装 / 没重开终端 | 重装 Node，关掉 VSCode 重开 |
| 点 Publish Branch 没反应 | 没登录 / 没远端 | 检查 `git remote -v`，登录 GitHub |
| Push 被拒绝（rejected） | 远端有你没有的提交 | `git pull --rebase` 后再 push |
| 每次都要输密码 | 凭据没保存 | Windows 用 Git Credential Manager；macOS 用 osxkeychain |
| 文件整份显示被修改 | 行尾 CRLF/LF 不一致 | 两边设 `git config --global core.autocrlf input` |
| 冲突解决完还显示 C | 没 `git add` | Stage 文件后再 commit/continue |
| Cline 不显示 | 扩展没装/没登录 | 重装、Reload Window、检查 API Key |
| Cline 改了不该改的文件 | 提示词范围不清 | 撤销 diff，重发带“只改 X”的提示词 |
| `npm run dev` 端口被占用 | 另一个进程在用 3000 | `npm run dev -- -p 3001` |
| Windows 报 `npx.ps1 cannot be loaded` | 执行策略 | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| macOS 报 `xcrun: error` | 没装命令行工具 | `xcode-select --install` |

---

## 11. 一页速查

```text
打开：File → Open Folder → 选项目根目录 → Trust
终端：Ctrl+` / Cmd+`
提交：Source Control → + → 写 message → Commit
上传：Publish Branch（第一次）/ Sync Changes（以后）
分支：点左下角分支名 → Create new branch
拉取：... → Pull，或 Sync Changes
开 PR：GitHub 扩展 → Create Pull Request，或网页
冲突：打开文件 → 选/改 → 删标记 → + → Commit/Continue
AI 开工：start
AI 收工：stop
AI 只讨论：plan
```

> **VSCode 只是工具。真正决定项目质量的，是每天那 6 步有没有走完。**
