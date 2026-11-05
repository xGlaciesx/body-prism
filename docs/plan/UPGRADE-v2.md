# 升级到 v2：上一版已经在 main 上了，这一版怎么用

> 适用：上一版文档已经合并进 GitHub 的 `main`，项目能跑，`docs/team-handbook/` 里已有 00–16。
> 这一版**不是重来**，是在现有仓库上做两个 PR：一个更新手册，一个接入内容包。
> 所有命令都在**项目根目录**执行（有 `package.json` 的那一层）。

> ⚠️ **这是 v1 → v2 的升级说明，不是当前执行计划。**
> 新仓库、从零开始：**不要看这一页**，直接按 `START-HERE.md` → **P2（T0–T14）** 走。
> 这一页只解决"上一版文档已经躺在 `main` 上、现在要把内容包补进去"这一种情况。
> 它**不包含**三维资产（`starter-assets/models/body.glb`），也不管文档包放在哪。
> **项目已经在跑、只想把新方案包接进来 → 看 `UPGRADE-v4.md`（P7）**，那一页才有完整的对账、依赖清理和每日计划。

---

## 0. 这一版到底变了什么

| 文件 | 变化 | 要不要动 |
|---|---|---|
| `00-start-here.md` | 重写为 **GitHub 主库**版（撤掉 Gitee 主库方案，Gitee 只做可选镜像） | 覆盖 |
| `14-first-code-day.md` | §6 扩成完整实操：提交 → push → 开 PR → Approve → CI → 合并 → 同步 | 覆盖 |
| `15` / `02` / `16` | 去掉“Gitee 主库”口径，补内容包入口 | 覆盖 |
| `START-HERE.md` | **新增**：一页纸开工单（分工、七天排期、答辩脚本） | 新增 |
| `content-pack/` | **新增**：11 个器官的 TS 数据 + 影响链数据 + AI 兜底答案 + 审核清单 | 新增 |
| `index.html` / `README.md` | 目录页增加开工单入口 | 可选，项目里一般不放 |
| `01` / `03`–`13` | 无实质变化 | 可不动 |

**三条原则**：

1. **不要重新建仓库、不要重新 `create-next-app`、不要重新 `git init`**——上一版已经在 `main` 上了；
2. **文档和代码分两个 PR**：PR A 只改 `docs/`，PR B 只加 `src/` 的内容包；
3. **一次只做一个 PR**，合并完再开下一个，避免两个 PR 互相冲突。

---

## 1. 第一步：先把本地对齐到最新 main

```bash
# 切回主干
git switch main

# 拉下已经合并的上一版
git pull

# 确认工作区干净；有未提交改动就先处理，别带着改动开新分支
git status
```

再确认上一版文档确实在：

```bash
# 看手册目录里有哪些文件
ls docs/team-handbook
```

> Windows PowerShell 用 `Get-ChildItem docs\team-handbook`。
> 如果这个目录不存在，先找一下文档到底在哪：`git ls-files | grep 00-start`（Windows 用 `git ls-files | Select-String 00-start`）。

---

## 2. 第二步：把新版解压到项目外面

- Windows：解压到 `C:\Users\<你>\Downloads\body-prism-docs-v2\`
- macOS：解压到 `~/Downloads/body-prism-docs-v2/`

**不要解压到项目里面**，否则会把压缩包里的 `build_docs.py`、HTML、`__pycache__` 一起带进仓库。

确认能看到：

```text
00-start-here.md … 16-mvp-implementation.md
START-HERE.md
content-pack/organs/*.ts
content-pack/curator-fallback.ts
content-pack/README.md
content-pack/REVIEW.md
```

---

## 3. 第三步：PR A——更新团队手册

### 3.1 开分支

```bash
# 从最新 main 开一条只改文档的分支
git switch -c docs/handbook-v2
```

### 3.2 覆盖 17 份手册 + 新增开工单

**Windows（李若溪）**：

```powershell
# 覆盖 00–09
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\0*.md" docs\team-handbook\ -Force

# 覆盖 10–16
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\1*.md" docs\team-handbook\ -Force

# 新增开工单
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\START-HERE.md" docs\team-handbook\ -Force

# 审核清单也放一份到手册目录，方便张子昂直接改
New-Item -ItemType Directory -Force -Path docs\team-handbook\content-pack | Out-Null
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\content-pack\README.md" docs\team-handbook\content-pack\ -Force
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\content-pack\REVIEW.md" docs\team-handbook\content-pack\ -Force
```

**macOS（张子昂）**：

```bash
# 覆盖 00–09
cp ~/Downloads/body-prism-docs-v2/0*.md docs/team-handbook/

# 覆盖 10–16
cp ~/Downloads/body-prism-docs-v2/1*.md docs/team-handbook/

# 新增开工单
cp ~/Downloads/body-prism-docs-v2/START-HERE.md docs/team-handbook/

# 审核清单
mkdir -p docs/team-handbook/content-pack
cp ~/Downloads/body-prism-docs-v2/content-pack/README.md docs/team-handbook/content-pack/
cp ~/Downloads/body-prism-docs-v2/content-pack/REVIEW.md docs/team-handbook/content-pack/
```

> 只复制 `.md`。HTML、`build_docs.py`、`build_index.py`、`__pycache__` **都不要进项目**。

### 3.3 检查改动

```bash
# 看哪些文件被改了、哪些是新增
git status

# 看具体改了多少行
git diff --stat
```

预期结果：

- **modified**：`00`、`02`、`14`、`15`、`16`
- **new file**：`START-HERE.md`、`content-pack/README.md`、`content-pack/REVIEW.md`
- 其余 11 份可能显示 modified（只是重新生成，内容基本没变），也可能不显示

如果看到 `node_modules/`、`.next/`、`.env.local`，停下来检查 `.gitignore`。

### 3.4 提交、推送、开 PR

```bash
# 只加文档目录
git add docs/team-handbook

# 再确认一次
git status

# 提交
git commit -m "docs: update team handbook to v2 (GitHub main line + start guide)"

# 推分支
git push -u origin docs/handbook-v2
```

然后按 **14 §6.5–§6.8** 走：

1. 网页点 **Compare & pull request**（没有就 Pull requests → New pull request，base `main`、compare `docs/handbook-v2`）；
2. 标题：`docs: update team handbook to v2`；
3. 描述写三行：改了什么、为什么、怎么验证；
4. Reviewers 选张子昂；
5. 张子昂 Approve（没有 Write 就用评论）；
6. **Squash and merge** → **Delete branch**。

### 3.5 提交信息模板

```text
docs: update team handbook to v2

- 00 改为 GitHub 主库版，移除 Gitee 主库方案
- 14 §6 补充完整 PR 流程
- 新增 START-HERE 开工单与内容审核清单
- 15/02/16 同步口径

验证：本地检查 Markdown 链接与标题层级；无代码改动。
```

---

## 4. 第四步：PR B——接入器官内容包

> 先确认上一版已经按 **16 §3.1** 建了 `src/lib/schema.ts`。没有的话先建，否则 TS 会报 `Cannot find module '@/lib/schema'`。

### 4.1 开分支

```bash
# 先回到最新 main
git switch main
git pull

# 开内容分支
git switch -c feat/content-pack
```

### 4.2 复制 TS 数据

**Windows**：

```powershell
# 确保目录存在
New-Item -ItemType Directory -Force -Path src\content\organs | Out-Null

# 11 个器官 + 汇总入口
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\content-pack\organs\*.ts" src\content\organs\ -Force

# AI 兜底答案
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\content-pack\curator-fallback.ts" src\lib\ -Force
```

**macOS**：

```bash
mkdir -p src/content/organs
cp ~/Downloads/body-prism-docs-v2/content-pack/organs/*.ts src/content/organs/
cp ~/Downloads/body-prism-docs-v2/content-pack/curator-fallback.ts src/lib/
```

### 4.3 先构建，再提交

```bash
# 类型与构建检查
npm run lint
npm run build
```

构建通过后：

```bash
# 只加这两个目录
git add src/content/organs src/lib/curator-fallback.ts

# 看清单
git status

# 提交
git commit -m "feat(content): add six-organ content pack and curator fallback"

# 推送
git push -u origin feat/content-pack
```

然后同样走 PR：开 PR → 张子昂审内容 → Approve → Squash and merge → 删分支。

> **这个 PR 要重点看内容**：张子昂按 `docs/team-handbook/content-pack/REVIEW.md` 逐条过，重点看 A/B/C/D 等级和红旗问答。审核没完成不要合并。

### 4.4 如果现在还用不上内容包

可以先只做 PR A。内容包等 D2 做器官详情页时再合，不耽误。

---

## 5. 第五步：合并后两个人同步

**合并的人（李若溪）**：

```bash
# 切回 main
git switch main

# 拉下合并结果
git pull

# 确认新文件在
ls docs/team-handbook/START-HERE.md
ls src/content/organs

# 删本地分支（已合并）
git branch -d docs/handbook-v2
git branch -d feat/content-pack
```

**另一个人（张子昂）**：

```bash
# 进入项目
cd ~/Projects/body-prism

# 拉最新
git switch main
git pull

# 依赖没变就不用重装；不确定就跑一次
npm install

# 启动
npm run dev
```

---

## 6. 常见问题

| 现象 | 原因 | 怎么办 |
|---|---|---|
| 覆盖时提示“文件已存在” | 正常，上一版就在那 | 用 `-Force`（Win）或直接 `cp`（mac）覆盖 |
| `git status` 显示一堆 modified，但看不出改了什么 | 换行符或重新生成 | `git diff --stat` 看行数；只差空白可忽略，正常提交 |
| 找不到 `docs/team-handbook` | 上一版放在了别处 | `git ls-files \| grep 00-start` 找路径，按实际路径替换命令 |
| 上一版把 HTML 也提交了 | 之前没按 14 §4.2 过滤 | 可以留着不动；想清理就单独开一个 PR 删除，别混在本次 |
| 队友已经改过 00/14 | 手工改过手册 | 先 `git log --oneline -- docs/team-handbook/00-start-here.md` 看谁改的；冲突时以 v2 为主，但把队友的补充手工并回去 |
| `Cannot find module '@/lib/schema'` | 还没建 schema | 按 16 §3.1 建 `src/lib/schema.ts` |
| `npm run build` 报类型错 | 数据字段和 schema 不一致 | 把完整报错贴给 Cline，不要放宽 schema |
| 两个 PR 互相冲突 | 同时改了同一批文件 | 先合 PR A，再把 main 合进 PR B 的分支，解决后推上去 |
| 合并按钮灰 | 没 Approve / CI 红 / 冲突 | 按 14 §6.8 的表排查，不要关保护 |
| 误把 `.env.local` 提交了 | `.gitignore` 没生效 | **立即吊销 Key**，再从历史移除；旧 Key 仍算泄露 |

---

## 7. 一页命令速查

**Windows PowerShell**

```powershell
cd $env:USERPROFILE\Projects\body-prism
git switch main
git pull
git switch -c docs/handbook-v2
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\0*.md" docs\team-handbook\ -Force
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\1*.md" docs\team-handbook\ -Force
Copy-Item "$env:USERPROFILE\Downloads\body-prism-docs-v2\START-HERE.md" docs\team-handbook\ -Force
git add docs/team-handbook
git commit -m "docs: update team handbook to v2"
git push -u origin docs/handbook-v2
```

**macOS**

```bash
cd ~/Projects/body-prism
git switch main
git pull
git switch -c docs/handbook-v2
cp ~/Downloads/body-prism-docs-v2/0*.md docs/team-handbook/
cp ~/Downloads/body-prism-docs-v2/1*.md docs/team-handbook/
cp ~/Downloads/body-prism-docs-v2/START-HERE.md docs/team-handbook/
git add docs/team-handbook
git commit -m "docs: update team handbook to v2"
git push -u origin docs/handbook-v2
```

---

## 8. 做完之后

- `main` 上的手册就是 v2，`docs/team-handbook/START-HERE.md` 是新的开工单；
- 11 个器官的数据在 `src/content/organs/`，页面可以开始 import；
- 下一步按 **START-HERE 的 D2–D3** 做首页和器官详情页。
