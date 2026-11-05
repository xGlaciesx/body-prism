# 参赛材料总清单与提交计划

> 用途：对照大赛要求逐项打勾，明确"谁做、放哪、什么算完成"。
> 原则：**要求里有的，一项都不能少；要求里没的，不要堆。**

---

## 1. 五类材料对照表

### 1.1 代码仓库

| 要求 | 本项目的做法 | 负责人 | 状态 |
|---|---|---|---|
| GitHub / Gitee，Public 或给评审权限 | GitHub `xGlaciesx/body-prism`，Public | 李若溪 | ☐ |
| 代码结构清晰、有注释、遵循规范 | `src/app` / `components` / `content` / `lib` 分层；ESLint + TypeScript | 李若溪 | ☐ |
| README：介绍、架构、安装运行、团队 | 用 `submission/README-template.md` 填好放仓库根目录 | 两人 | ☐ |
| 完整 Git 历史 | 每功能一分支一 PR；禁止一次性大提交；保留合并记录 | 两人 | ☐ |
| 环境配置：变量模板 + 依赖清单 | `.env.example` + `package.json` / `package-lock.json` | 李若溪 | ☐ |
| 开源声明与许可 | `ATTRIBUTION.md` + `LICENSE`（代码 MIT，**内容不随代码授权**） | 张子昂 | ☐ |
| 医学免责声明 | `docs/medical-disclaimer.md` 非空，且与 `src/content/medical-disclaimer.ts` 文字一致 | 张子昂 | ☐ |

**检查命令**：

```bash
# 环境变量模板存在且无真实值
cat .env.example

# 依赖锁定文件存在
ls package-lock.json

# 历史是否像真做的（至少 20 条、跨多天）
git log --oneline --date=short --pretty="%h %ad %s" | head -30
```

### 1.2 演示视频

| 要求 | 本项目的做法 | 负责人 | 状态 |
|---|---|---|---|
| 5–8 分钟 | 目标 6:30 | 两人 | ☐ |
| 项目介绍 + 核心功能 + AI 亮点 | 按 `DEMO-VIDEO-SCRIPT.md` 分镜 | 两人 | ☐ |
| MP4、≥1080p | 1920×1080、H.264、8–12 Mbps | 李若溪录、张子昂讲 | ☐ |
| 普通话、可配字幕 | 全程中文，建议配字幕 | 张子昂 | ☐ |

**成片自检**：

```text
时长 5:00–8:00
分辨率 1920×1080
能听清每一句
AI 演示段落完整（提问 → 引用 → 越界 → 兜底）
影响链段落完整（点器官 → 三列链 → 点边看证据 → 点红旗表现出就医提示）
第一镜念的那句话，与首页副标题一字不差
没有出现密钥、邮箱、个人信息
```

### 1.3 技术文档（PDF）

| 要求 | 本项目的做法 | 负责人 | 状态 |
|---|---|---|---|
| PDF，≤30 页 | `TECH-DOC.md` 导出 PDF | 李若溪 | ☐ |
| 项目概述 / 需求分析 / 架构 / AI 方案 / 核心实现 / 测试部署 / 总结展望 | 文档 §1–§7 | 两人 | ☐ |
| 重点讲 AI 选型、集成、优化 | §4 专章 | 李若溪 | ☐ |
| 明确列技术创新与应用创新 | §8 专章 | 两人 | ☐ |

**导出**：把 `TECH-DOC.md` 交给平台导出 PDF（A4 分页），检查页数 ≤30、图表不跨页断裂。

> 当前版本为 **24 页**（已含「影响链 ImpactGraph」§3.3.1、「影响链页面」§5.7、「图谱约束生成」§4.3 三处新增内容）。导出后请更新这一行，别让孩子对着过期页数以为漏了东西。

### 1.4 在线演示（可选加分）

| 要求 | 本项目的做法 | 负责人 | 状态 |
|---|---|---|---|
| 公网可访问 | Vercel 部署 | 李若溪 | ☐ |
| 首页首屏讲清背景 | 不滚动就能看到「搜症状→问 AI→但 AI 不给推理→我们给可核对的链」三句话 | 李若溪 | ☐ |
| 影响链页可用 | `/chain?organ=<11 个器官>` 全部 200，点边能看证据，点红旗表现先出就医提示 | 李若溪 | ☐ |
| AI 接口是真实调用 | 线上返回 `mode: "ai"`，不是 fallback（环境变量配错时最容易犯） | 张子昂 | ☐ |
| 评审期可用 | 每天巡检一次；不合并新功能 | 两人 | ☐ |
| 体验账号 | 无需登录，公开只读 | — | 不适用 |

### 1.5 提交注意事项

| 要求 | 做法 | 状态 |
|---|---|---|
| 截止前官网统一提交 | 提前 24 小时完成，留缓冲 | ☐ |
| 密钥不得出现在公开仓库 | `.env.local` 已忽略；提交前搜 `sk-`、`service_role` | ☐ |
| 提交后不得修改 | 提交前打 tag `v1.0-submit`，记录 commit SHA | ☐ |
| 材料不完整影响评审 | 用本清单逐项打勾，双人复核 | ☐ |

---

## 2. Git 历史怎么“看起来是真的”

大赛要看**真实开发过程**。不需要造假，只要别做这几件事：

❌ 最后一天把所有代码一次提交
❌ 提交信息全是 `update`、`1`、`fix`
❌ 所有提交集中在同一小时
❌ 提交里出现 `.env.local`、`node_modules`

✅ 推荐节奏（与七天排期一致）：

```text
D1  docs: 新增 .clinerules、README、ATTRIBUTION、LICENSE
D1  chore: 接入 vitest 与内容完整性校验，CI 增加测试步骤
D2  feat(chain): 新增影响链数据与 56 条边的证据标注
D2  test(chain): 补充三个纯函数的单测
D3  feat(chain): 新增三列影响链页面与无 JS 降级
D4  feat(chain): 新增证据面板与红旗表现拦截
D5  feat(api): 新增 /api/curator，图谱约束 + 逐边校验
D5  feat(api): 路径越界时拒绝并回退到离线答案
D6  feat(curator): AI 返回的路径在链图上高亮
D6  perf(api): 增加响应缓存与不含原始提问的日志
D7  feat(chain): 增加别名搜索
D7  docs: 首页首屏与 README 统一背景叙事
D7  chore: release v1.0-submit
```

> 这条序列与《实施手册 v4》的 15 张任务卡一一对应。**如果实际提交和它对不上，改这份清单，不要改代码去迁就清单。**

**提交信息格式**：

```text
<类型>(<范围>): <一句话>

类型：feat / fix / docs / chore / refactor / test
范围：home / organ / explore / curator / method / ci
```

**发布 tag**：

```bash
git switch main
git pull
git tag -a v1.0-submit -m "competition submission v1.0"
git push origin v1.0-submit
```

---

## 3. 材料命名与存放

建议在本地建一个 `submission-final/`（**不要提交进仓库**）：

```text
submission-final/
├─ body-prism-demo-1080p.mp4
├─ body-prism-tech-doc.pdf
├─ body-prism-source.zip          # 可选：仓库快照
├─ submission-info.md             # 仓库地址、演示地址、团队信息
└─ checksums.txt                  # 可选：文件校验和
```

命名规则：全小写、短横线、不带版本日期以外的中文，避免提交系统不认。

---

## 4. 提交前 24 小时时间表

| 时间 | 事项 | 谁 |
|---|---|---|
| T-24h | 功能冻结；只修阻断性 bug | 两人 |
| T-24h | 打 tag `v1.0-submit`，记录 commit SHA | 李若溪 |
| T-20h | 导出技术文档 PDF，检查页数 ≤30 | 李若溪 |
| T-18h | 录制成片，检查时长/分辨率/音量 | 两人 |
| T-16h | 填 README 团队信息，确认无个人信息泄露 | 两人 |
| T-12h | 部署在线演示，跑一遍上线检查表 | 李若溪 |
| T-8h | 双人对照本清单逐项打勾 | 两人 |
| T-4h | 官网提交，截图保存提交成功页 | 家长/老师 |
| T-2h | 复核材料可下载、视频可播放、链接可打开 | 两人 |

---

## 5. 双人复核（互相检查，不检查自己）

**李若溪检查张子昂的部分**：

- [ ] 视频里的医学表述没有诊断/用药/剂量
- [ ] 技术文档 §4 AI 部分没有夸大（不说"医学级""国内首个"）
- [ ] 误区纠正的措辞克制

**张子昂检查李若溪的部分**：

- [ ] 仓库里搜不到 `sk-`、`service_role`、真实邮箱
- [ ] `.env.example` 只有变量名，没有值
- [ ] README 的安装步骤在一台干净电脑上能跑通
- [ ] Git 历史不是一次性提交
- [ ] `LICENSE` 存在，且 README 写明"代码 MIT，内容不随代码授权"
- [ ] `docs/medical-disclaimer.md` 不是空文件
- [ ] 首页首屏三句话在手机上（不滚动）也看得见

---

## 6. 提交信息模板（填官网表单用）

```text
项目名称：人体棱镜 Body Prism
参赛单位：西安交通大学
团队名称：昂昂若驹
一句话简介：把每条身体结论的推理链摊开——器官影响什么功能、功能出问题可能有什么表现，每一步都标着证据强度。
仓库地址：https://github.com/xGlaciesx/body-prism
在线演示：https://your-demo.vercel.app
演示视频：<链接>
技术文档：<随表单上传>
团队：李若溪（电子信息工程）、张子昂（临床医学）
技术栈：Next.js 16 / React 19 / TypeScript / Tailwind CSS 4 / Zod / DeepSeek（图约束生成）
```

---

## 7. 最后一道自检（提交前 10 分钟）

```bash
# 1. 仓库干净
git status

# 2. 当前提交号（抄进 submission-info.md）
git rev-parse HEAD

# 3. 搜密钥（应无输出）
git grep -n -E "sk-[A-Za-z0-9]{16,}|service_role" -- . || echo "clean"

# 4. 确认 .env.local 未被跟踪（应无输出）
git ls-files | grep -E "^\.env\.local$" || echo "clean"
```

四项都通过，再点提交。
