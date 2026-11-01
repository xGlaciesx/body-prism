# 内容包：六个器官 + AI 兜底答案

> 这是给「人体棱镜」用的现成内容，**不是最终医学定稿**。
> 用法：复制进项目 → 跑通页面 → 男孩逐条审核 → 把审核结果记在 `REVIEW.md`。

---

## 1. 包里有什么

| 文件 | 内容 |
|---|---|
| `organs/heart.ts` | 心脏：3 张镜片、5 条 claim、2 条误区、4 个追问、4 个来源 |
| `organs/brain.ts` | 脑 |
| `organs/lung.ts` | 肺 |
| `organs/liver.ts` | 肝 |
| `organs/kidney.ts` | 肾 |
| `organs/stomach.ts` | 胃 |
| `organs/index.ts` | 汇总导出 `organs` / `organBySlug` |
| `curator-fallback.ts` | 12 条预生成答案 + 4 类红旗问题 |
| `REVIEW.md` | 审核清单（打印或直接改） |

每个器官都遵循同一个结构：

```text
3 张镜片（结构 / 关系 / 信息）
  └── 每张镜片引用 1–2 条 claim
claims：每条一句结论 + 证据等级 A/B/C/D + 来源 id
misconceptions：常见误区 + 纠正 + 来源
followups：3–4 个可继续追问的问题
sources：教科书 / 综述 / 传统文献 / 本项目说明
```

---

## 2. 怎么放进项目

假设项目在 `body-prism/`，内容包在文档包的 `content-pack/`：

**Windows PowerShell**

```powershell
# 在项目根目录执行
New-Item -ItemType Directory -Force src\content\organs | Out-Null
Copy-Item ..\body-prism-docs\content-pack\organs\*.ts src\content\organs\
Copy-Item ..\body-prism-docs\content-pack\curator-fallback.ts src\lib\
```

**macOS**

```bash
# 在项目根目录执行
mkdir -p src/content/organs src/lib
cp ../body-prism-docs/content-pack/organs/*.ts src/content/organs/
cp ../body-prism-docs/content-pack/curator-fallback.ts src/lib/
```

然后：

```bash
npm run build
```

如果报 `Cannot find module '@/lib/schema'`，说明还没按 16 §3.1 建 `src/lib/schema.ts`，先建它。

---

## 3. 证据等级怎么用

| 等级 | 含义 | 本项目里放什么 |
|---|---|---|
| **A** | 教科书级、广泛接受的解剖/生理事实 | 四腔四瓣、肺泡气体交换、肾单位结构 |
| **B** | 综述、队列或仍在讨论的机制 | 肠—脑轴、神经元计数 |
| **C** | 本项目的概念类比、模型 | “信息节点”“预测机器”“缓冲器” |
| **D** | 传统理论 | 中医概念，必须标“传统理论，非现代医学共识” |

**硬规则**：

1. 每条 claim 至少 1 个来源，且来源 id 必须真实存在于同文件的 `sources`；
2. C 级必须写 `caveat`，页面上要显示“概念类比”；
3. D 级必须写“传统理论”，不得与 A 级事实混在一句话里；
4. 不写诊断、不写药名、不写剂量；
5. 出现胸痛、呼吸困难、意识改变、大出血，一律先建议就医。

---

## 4. 男孩要做的审核（约 2 小时）

对每个器官过一遍 `REVIEW.md` 的表：

1. **事实**：这句话在教科书里站得住吗？
2. **等级**：标 A 的是不是真的 A？标 C 的有没有写“类比”？
3. **措辞**：有没有暗示诊断或治疗？“可能”“通常”用得对不对？
4. **来源**：书名、版次、年份对不对？有没有把综述标成教科书？
5. **缺口**：有没有该说而没说的限定条件？

发现问题的处理顺序：

- 小问题（措辞）→ 直接改 `.ts`，提交 `docs(content): ...`；
- 大问题（事实/等级）→ 先在该条 claim 上写 `caveat`，再查资料，别硬留；
- 拿不准 → **删掉这条 claim**，比留着错的安全。

---

## 5. 页面怎么用这些数据

```ts
// 列表页
import { organs } from "@/content/organs";

// 详情页
import { organBySlug } from "@/content/organs";
const organ = organBySlug.get(params.slug);
```

证据徽章直接读 `claim.evidenceLevel`；来源列表用 `sourceIds` 去 `organ.sources` 里查。

AI 兜底：

```ts
import { pickFallback } from "@/lib/curator-fallback";

const result = pickFallback(question);
if (result.kind === "urgent") return result.urgentMessage;
if (result.kind === "answer") return result.answer.answer;
// default：引导去看方法页或换一个问题
```

---

## 6. 这份内容包的边界

- 它是**教学演示内容**，不是医学建议，也不能替代医生；
- 书目信息按常见版次填写，**男孩必须按手里实际版本核对**；
- 所有 C 级内容都是叙事类比，不构成研究结论；
- 所有 D 级内容都是传统理论，不构成现代医学共识。
