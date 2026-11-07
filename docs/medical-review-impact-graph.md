# 影响链医学审核记录

> 审核人：张子昂（临床医学）　审核日期：2026-11-06
> 审核范围：`src/content/impact-graph.ts` 全部 56 条边（44 个节点）
> 说明：本文结构校验（字段完整性、来源悬空、等级合法性）由 AI 完成；
> 「医学机制是否教科书级、证据等级是否恰当」为初审意见，最终结论需张子昂逐条签字。

---

## 0. 结构校验结论（AI 客观完成，已通过）

- 边数：56 ✅（`grep -c 'id: "E-'` = 56）
- 节点数：44 ✅（organ 11 + function 14 + manifestation 19）
- 证据等级分布：A 35 条 / B 16 条 / C 5 条 / D 0 条
- 无悬空 sourceId ✅（`npm run test` 的 `validateContent` 已覆盖）
- mechanism 全部非空 ✅、caveat 全部非空 ✅
- 5 条中医表里边全部标注「传统理论，非现代医学共识」✅

---

## 1. 发现的问题（需临床医学成员决策）

| # | 严重度 | 位置 | 问题 | 建议 |
|---|---|---|---|---|
| 1 | **已解决（方案 A）** | 5 条 `E-TCM-*` 边 | 原标 D 级，与 `.clinerules`「中医内容证据等级一律 C」冲突 | 已按方案 A 把 5 条边改为 C 级，与 `.clinerules` 一致 |
| 2 | 中 | `E-ALB-ASCITES`（A） | 机制只写「白蛋白低→胶体渗透压下降→腹水」，但肝硬化腹水的主因是门脉高压，白蛋白低是协同因素；caveat 提了心源性/肾源性/肿瘤，但没提门脉高压。 | 建议补 caveat「肝硬化腹水以门脉高压为主因」，或机制补一句。 |
| 3 | 中 | `E-KID-NOCTURIA`（A） | 机制「浓缩能力下降→夜间尿量增多」成立，但夜尿鉴别诊断极广（前列腺、膀胱、饮水、利尿剂、睡眠），caveat 只有 `CAVEAT_INDIVIDUAL` 偏弱，A 级可能偏高。 | 建议补强 caveat，或降为 B。 |
| 4 | 低 | `E-HEART-PALP`（A） | 机制成立，caveat 已较充分（焦虑/咖啡因/贫血/甲亢），建议保留。 | 保留即可，无强制修改。 |

---

## 2. 56 条边审核表

| 边 id | 原证据等级 | 审核结论 | 修改说明 |
|---|---|---|---|
| E-KID-BP | A | 保留 | — |
| E-BP-KID | A | 保留 | — |
| E-KID-VOL | A | 保留 | — |
| E-KID-EPO | A | 保留 | — |
| E-EPO-ANEMIA | A | 保留 | — |
| E-KID-EDEMA | A | 保留 | — |
| E-KID-NOCTURIA | A | 建议复核 | 见问题 3：夜尿鉴别诊断广，caveat 偏弱 |
| E-KID-FATIGUE | B | 保留 | — |
| E-HEART-BP | A | 保留 | — |
| E-BP-HEART | A | 保留 | — |
| E-HEART-DYSPNEA | A | 保留 | — |
| E-HEART-EDEMA | A | 保留 | — |
| E-HEART-PALP | A | 保留 | 见问题 4：caveat 已充分，保留 |
| E-HEART-FATIGUE | B | 保留 | — |
| E-LUNG-O2 | A | 保留 | — |
| E-LUNG-DYSPNEA | A | 保留 | — |
| E-LUNG-COUGH | A | 保留 | — |
| E-LUNG-HEART | B | 保留 | — |
| E-O2-BRAIN | B | 保留 | — |
| E-LIVER-COAG | A | 保留 | — |
| E-COAG-BLEED | A | 保留 | — |
| E-LIVER-ALB | A | 保留 | — |
| E-ALB-ASCITES | A | 建议复核 | 见问题 2：补门脉高压 caveat |
| E-LIVER-BILI | A | 保留 | — |
| E-BILI-JAUNDICE | A | 保留 | — |
| E-LIVER-GLUCOSE | A | 保留 | — |
| E-LIVER-BRAIN | B | 保留 | — |
| E-STOMACH-HEARTBURN | A | 保留 | — |
| E-STOMACH-ANEMIA | B | 保留 | — |
| E-BRAIN-AUTONOMIC | A | 保留 | — |
| E-AUTONOMIC-HEART | A | 保留 | — |
| E-AUTONOMIC-BP | A | 保留 | — |
| E-BRAIN-SLEEP | A | 保留 | — |
| E-BRAIN-CONFUSION | A | 保留 | — |
| E-SPLEEN-IMMUNE | A | 保留 | — |
| E-IMMUNE-INFECTION | B | 保留 | — |
| E-SPLEEN-ANEMIA | B | 保留 | — |
| E-LIVER-GB | A | 保留 | — |
| E-GB-ABSORPTION | A | 保留 | — |
| E-GB-RUQ | B | 保留 | — |
| E-GB-JAUNDICE | B | 保留 | — |
| E-SI-ABSORPTION | A | 保留 | — |
| E-ABSORPTION-WEIGHT | B | 保留 | — |
| E-SI-DIARRHEA | B | 保留 | — |
| E-LI-WATER | A | 保留 | — |
| E-LI-CONSTIPATION | B | 保留 | — |
| E-LI-DIARRHEA | B | 保留 | — |
| E-KID-BLADDER | A | 保留 | — |
| E-BLADDER-STORAGE | A | 保留 | — |
| E-BLADDER-FREQ | B | 保留 | — |
| E-BLADDER-HEMATURIA | B | 保留 | — |
| E-TCM-HEART-SI | C | 保留 | 已由 D 改为 C（方案 A，符合 .clinerules） |
| E-TCM-LIVER-GB | C | 保留 | 已由 D 改为 C（方案 A，符合 .clinerules） |
| E-TCM-SPLEEN-ST | C | 保留 | 已由 D 改为 C（方案 A，符合 .clinerules） |
| E-TCM-LUNG-LI | C | 保留 | 已由 D 改为 C（方案 A，符合 .clinerules） |
| E-TCM-KIDNEY-BLADDER | C | 保留 | 已由 D 改为 C（方案 A，符合 .clinerules） |

---

## 3. 签字

- 结构校验：✅ 已由 AI 完成（56 边 / 44 节点，无悬空来源）
- 医学初审：✅ 已由 AI 给出初审意见（51 条保留、2 条建议复核、5 条待口径统一）
- 医学终审：☐ 待张子昂（临床医学）逐条签字
- 结论：☐ 全部通过　☐ 修改后通过（修改条目数：____）　☐ 需重写（器官/边：________）
