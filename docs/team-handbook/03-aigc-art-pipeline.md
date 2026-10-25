# AIGC 美术管线与六器官资产包

> 项目：人体棱镜 Body Prism——AI 驱动的身体信息三镜图谱。
> 适用对象：有 iPad/Procreate、会一点画画、但时间紧张的两个学生。
> 目标：用 **AIGC 做量和氛围，3D 做准确，手绘做签名，人工做标注**，在 3 周内做完 6 个器官的视觉资产。

---

## 1. 先定分工原则

| 任务 | 用什么 | 原因 |
|---|---|---|
| 解剖结构准确性 | **3D 渲染** | AI 经常画错结构、多画血管 |
| 风格、氛围、底图 | **AIGC** | 快、便宜、风格可统一 |
| 线稿修正、上色 | **Procreate** | 人工把关，避免“AI 味” |
| 标签、引线、热点 | **Figma / HTML** | AI 写中文必糊，必须真文字 |
| 信息图、数据图 | **SVG / 代码** | 精确、可交互、可访问 |
| 经络、穴位 | **参考图 + Figma/Procreate** | 不能让 AI 瞎编穴位 |
| 签名视觉 | **手绘 1–2 张** | 原创证据、视频记忆点 |

一句话：

> **AIGC 负责“量和氛围”，3D 负责“准确”，手绘负责“签名”，人负责“标注和审核”。**

---

## 2. 工具组合

| 工具 | 用途 | 备注 |
|---|---|---|
| **即梦 AI** | 概念图、氛围图、视频转场 | 中文提示词友好，有免费额度 |
| **通义万相** | 图像生成、风格参考 | 国内访问稳定 |
| **LiblibAI** | Stable Diffusion、ControlNet、风格一致性 | 适合做系列图，需学一点 |
| **可灵 AI** | 图生视频、墨迹/粒子转场 | 只做 3–5 秒片头，不依赖 |
| **Procreate** | 描线、修正、上色、timelapse | iPad，适合做“手绘感” |
| **Photoshop / Photopea** | 修图、合成、去背景 | Photopea 免费网页版 |
| **Figma** | 标签、引线、排版、热点 | 两人协作方便 |
| **Recraft** | 矢量图标、统一风格 | 可选 |

建议主栈：

```text
即梦/通义万相出概念
   → LiblibAI 做系列一致性
   → Procreate 修正
   → Figma 标注
```

---

## 3. 推荐管线：3D 打底，AI 出风格，人来修

```text
3D 模型同角度渲染 2048px
   ↓
AIGC 风格参考 / ControlNet 生成 4 张
   ↓
Procreate 以 3D 渲染为底，描线 + 修正解剖 + 淡彩
   ↓
Figma 加编号、引线、中文标签、热点
   ↓
导出 WebP 2x / SVG
```

### 3.1 为什么一定要 3D 打底

AI 画解剖图经常出现：

- 多一条血管、少一个心房；
- 手指数量不对；
- 心脏四腔变三腔；
- 标签乱码；
- 左右肺叶数错；
- 肾的皮质/髓质位置错。

3D 渲染提供准确比例，AI 只负责“墨线 + 水彩 + 旧纸”的风格。这样既快又不会被医学生一眼看出错误。

### 3.2 如果 ControlNet 太难

直接让 AI 生成一张“风格参考图”，放在 Procreate 旁边，以 3D 截图为底描线。每张 1–1.5 小时，足够 6 个器官。

### 3.3 时间盒

- 每张底图：60–90 分钟；
- 超过 2 小时就停，先用 3D 渲染 + 简单标注顶上；
- 不要让美术阻塞代码开发。

---

## 4. 视觉风格指南

### 4.1 关键词

**博物学手账 × 解剖图谱 × 信息可视化。**

不是可爱风，是“19 世纪博物学家手账上长出了数字信号层”。

### 4.2 色板

| 名称 | 色值 | 用途 |
|---|---|---|
| 纸白 | `#F4EFE4` | 背景 |
| 墨黑 | `#1C1A17` | 线稿/正文 |
| 解剖玫瑰 | `#A6474F` | 结构层、强调 |
| 赭石 | `#C98A3E` | 结构层、暖色 |
| 信号青 | `#2FA8B8` | 信息层、交互 |
| 信号金 | `#D9B45B` | 信息层、高亮 |
| 经络朱砂 | `#B23A2E` | 关系层、经络 |
| 玉灰 | `#5E8C6A` | 辅助色 |

### 4.3 三镜视觉

| 镜片 | 视觉处理 |
|---|---|
| 结构之镜 | 墨线 + 玫瑰/赭石淡彩，编号引线，解剖图谱式标注 |
| 关系之镜 | 宣纸底、朱砂经络线、竖排小注、印章式标签 |
| 信息之镜 | 同一张墨线底图上叠加青金信号线、节点、波形、粒子 |

### 4.4 线条

- 外轮廓：2–3px；
- 内部结构：1–1.5px；
- 标注引线：0.75–1px；
- 同一张图里不要混用粗细相近但风格不同的线。

### 4.5 纸张

- 淡米色纸纹，透明度 10–15%；
- 不要用强颗粒，避免脏；
- 所有图统一加同一层纸纹，风格才齐。

### 4.6 标注

- 编号用 18–22px 圆圈；
- 中文标签 12–14px，拉丁名 10–12px；
- 一张图最多 5 个主要标注，避免引线交叉；
- 标签放在器官外侧，引线不要穿过重要结构；
- 所有文字在 Figma/HTML 里加，不让 AI 画字。

### 4.7 构图

- 器官占画面 60–70%，留出标注空间；
- 光源统一左上；
- 背景干净，不要复杂场景；
- 六张器官图用同一视角逻辑：心/肺/肠/肾正面，脑矢状，筋膜侧前方。

### 4.8 三镜叠加

- 底图只画一次；
- 结构层：编号 + 引线 + 标签；
- 关系层：朱砂线 + 印章 + 竖排注；
- 信息层：青金线 + 节点 + 波形；
- 切换时做透明度交叉淡入，不要硬切。

### 4.9 导出

| 资产 | 尺寸 | 格式 |
|---|---|---|
| 器官底图 | 1600×2000 | WebP，质量 80–85 |
| 首页 Hero | 2400×1600 | WebP |
| 分享卡 OG | 1200×630 | WebP/PNG |
| 分享卡社交 | 1080×1440 | WebP/PNG |
| 信息图 | 任意 | SVG |
| 图标 | 24/48 | SVG |

所有图片配 alt 文本。

---

## 5. 提示词库

### 5.1 通用底图

```text
19th-century naturalist anatomical illustration,
ink line drawing with muted watercolor washes,
aged off-white paper texture, precise anatomy,
three-quarter view, soft studio lighting,
museum catalog aesthetic, high detail,
no text, no labels, no watermark
```

### 5.2 负面提示词

```text
text, letters, Chinese characters, labels, watermark,
signature, logo, extra organs, deformed anatomy,
cartoon, 3D render, neon, oversaturated,
collage, frame, border, low contrast
```

### 5.3 六器官主体描述

在通用底图后面加一句：

| 器官 | 追加描述 |
|---|---|
| 心 | anterior view of a human heart, four chambers, aorta, pulmonary trunk, coronary arteries |
| 脑 | sagittal section of a human brain, cerebrum, cerebellum, brainstem, corpus callosum |
| 肺 | anterior view of human lungs, trachea, bronchi, lobes |
| 肠 | small and large intestine, coiled, mesentery, anterior view |
| 肾 | longitudinal section of a kidney, cortex, medulla, renal pelvis, ureter |
| 筋膜 | connective tissue network, fascia bands, body outline, lateral view |

### 5.4 TCM 背景

```text
Chinese rice paper texture, subtle ink wash,
faint aged paper fibers, off-white and warm beige,
empty center for diagram, no text, no symbols,
no acupuncture points, no figures
```

经络线和穴位在 Figma/Procreate 里画，不要让 AI 生成。

### 5.5 UI 空状态

```text
minimal ink illustration, single small object,
off-white background, muted palette,
lots of negative space, no text, no watermark
```

### 5.6 分享卡背景

```text
abstract ink wash background, soft paper texture,
muted rose ochre and cyan accents, generous negative space,
no text, no logos, elegant editorial style
```

### 5.7 视频转场

用可灵/即梦图生视频，3–5 秒：

```text
ink diffusing slowly in water, soft particles,
off-white background, slow motion, elegant,
no text, no logos
```

---

## 6. 六器官资产表

### 6.1 六器官一句话

| 器官 | 首页问题 | 信息之镜切入 | 关系之镜切入 |
|---|---|---|---|
| 心 | 为什么熬夜会心慌？ | 自主神经、HRV、信号噪声 | 心主神明/心肾相交（传统） |
| 脑 | 为什么刷手机会累？ | 预测编码、注意力带宽 | 髓海/神明（传统） |
| 肺 | 为什么焦虑时呼吸浅？ | 呼吸节律、迷走神经 | 肺主气/悲忧伤肺（传统） |
| 肠 | 为什么紧张会肚子疼？ | 肠脑轴、菌群信号 | 脾胃/思伤脾（传统） |
| 肾 | 为什么熬夜后腰酸/血压高？ | 血压、体液、红细胞生成 | 肾藏精/水液（传统） |
| 筋膜 | 为什么按一按会酸胀？ | 本体感觉、张力信号 | 经络/经筋（争议假说） |

### 6.2 目录结构

```text
public/art/
├─ organs/
│  ├─ heart-plate.webp
│  ├─ heart-structure.svg
│  ├─ heart-relationship.svg
│  ├─ heart-information.svg
│  ├─ heart-hotspots.json
│  ├─ brain-plate.webp
│  ├─ brain-structure.svg
│  ├─ brain-relationship.svg
│  ├─ brain-information.svg
│  ├─ brain-hotspots.json
│  ├─ lung-plate.webp
│  ├─ ...
│  ├─ gut-plate.webp
│  ├─ ...
│  ├─ kidney-plate.webp
│  ├─ ...
│  └─ fascia-plate.webp
├─ diagrams/
│  ├─ info-shannon.svg
│  ├─ info-predictive-loop.svg
│  ├─ info-network.svg
│  ├─ info-complexity.svg
│  ├─ tcm-meridian-overview.svg
│  ├─ tcm-same-name.svg
│  └─ tcm-zangxiang.svg
├─ ui/
│  ├─ empty-search.webp
│  ├─ empty-error.webp
│  └─ share-card-bg.webp
└─ hero/
   └─ landing-hero.webp
```

### 6.3 器官资产表

| 器官 | 底图 | 医学审核重点 | 信息层关键词 |
|---|---|---|---|
| 心 | `heart-plate.webp` | 四腔、瓣膜、主动脉/肺动脉、冠脉不要乱加 | 自主神经、HRV、信号噪声 |
| 脑 | `brain-plate.webp` | 脑干、胼胝体、小脑比例 | 预测编码、注意力带宽 |
| 肺 | `lung-plate.webp` | 左右肺叶数、气管分支 | 呼吸节律、迷走神经 |
| 肠 | `gut-plate.webp` | 小肠/大肠区分、阑尾位置 | 肠脑轴、菌群信号 |
| 肾 | `kidney-plate.webp` | 皮质/髓质/肾盂、肾动静脉 | 血压、体液、红细胞生成 |
| 筋膜 | `fascia-plate.webp` | 不画成经络；标“结缔组织示意” | 本体感觉、张力信号 |

### 6.4 工时估算

| 资产 | 数量 | 单件时间 | 合计 |
|---|---|---|---|
| 器官底图 | 6 | 1–1.5h | 6–9h |
| 三镜叠加层 | 18 | 15–20min | 5–6h |
| 信息图 | 4 | 1–2h | 6h |
| TCM 图 | 3 | 1h | 3h |
| UI 插画/图标 | 6–10 | 20min | 4h |
| 手绘签名 | 1–2 | 3–4h | 6–8h |
| **合计** | | | **30–35h** |

两个人分摊，每天各 30–60 分钟，三周内能完成。

---

## 7. 3D 渲染步骤

目的：给手绘/AIGC 提供**准确底图**。

### 7.1 Blender 流程

1. 打开 Blender，导入压缩后的 GLB；
2. 只显示目标器官，隐藏其他结构；
3. 选正交相机（Orthographic）；
4. 心/肺/肠/肾用正面，脑用矢状面，筋膜用侧前方；
5. 相机对准器官，`Frame Selected`；
6. 渲染设置：
   - 引擎：EEVEE；
   - 分辨率：2048×2560；
   - Film → Transparent；
   - Samples：32；
   - 环境光：中性灰；
   - 主光左上，补光右侧；
7. 渲染 PNG，存到 `docs/art-process/renders/heart.png`；
8. 如果会用 ControlNet，再导一张深度图/线稿图；不会就只用 PNG 当底。

### 7.2 没有 Blender 怎么办

直接在 R3F 页面里把 DPR 调到 2，隐藏 UI，截图，也能用。准确度不如 Blender，但够做底图。

### 7.3 相机角度表

| 器官 | 角度 |
|---|---|
| 心 | 正面，略偏左 |
| 脑 | 矢状面 |
| 肺 | 正面 |
| 肠 | 正面 |
| 肾 | 冠状/纵切 |
| 筋膜 | 侧前方 |

---

## 8. Procreate 修图步骤

1. 新建画布 2048×2560，300dpi；
2. 导入 3D 渲染图，透明度 30%，锁定；
3. 新建“线稿”层，用技术笔/墨水笔描线；
4. 描的时候顺手修正解剖错误；
5. 新建“淡彩”层，用湿水彩笔，限制在色板内；
6. 淡彩层用正片叠底，保留纸白；
7. 新建“纸纹”层，透明度 10–15%；
8. 隐藏底图，导出 PNG；
9. 导出 timelapse，留作原创证据。

### 8.1 时间盒

- 每张 60–90 分钟；
- 超过 2 小时就停，先用 3D 渲染 + 简单标注顶上；
- 男孩负责解剖校正，女孩负责风格统一。

---

## 9. Figma 标注与热点

1. 新建 Frame 1600×2000；
2. 放入底图；
3. 加编号圆圈、引线、中文标签；
4. 标签用真实文字，不用图片字；
5. 导出 PNG 2x，再用 Squoosh/ImageOptim 转 WebP；
6. 记录热点坐标，写成 JSON。

### 9.1 热点 JSON

```json
{
  "organ": "heart",
  "image": "/art/organs/heart-plate.webp",
  "width": 1600,
  "height": 2000,
  "hotspots": [
    {
      "id": "right-atrium",
      "x": 42.5,
      "y": 31.2,
      "structureId": "FMA7088",
      "label": "右心房",
      "lens": "structure"
    },
    {
      "id": "left-ventricle",
      "x": 55.1,
      "y": 48.0,
      "structureId": "FMA9462",
      "label": "左心室",
      "lens": "structure"
    }
  ]
}
```

坐标用百分比：Figma 里的 X 除以 1600，Y 除以 2000，保留 1 位小数。

### 9.2 纸片到像素

- 悬停纸面标注 → 3D 模型对应结构高亮；
- 点击 3D 结构 → 纸面标注点脉冲；
- 点击标注 → 打开该器官的三镜卡片。

这是手绘 + 3D 组合最值得做的签名交互。

---

## 10. AIGC 过程记录

`docs/art-process/prompts.md`：

```md
# AIGC 过程记录

| 日期 | 资产 | 工具 | 模型 | Prompt 摘要 | Seed | 人工修改 | 审核 |
|---|---|---|---|---|---|---|---|
| 2026-10-20 | heart-plate | LiblibAI | SDXL | naturalist anatomy, ink+wash | 12345 | 描线、修正三腔、加标签 | 男孩 |
```

保留：

- 生成图原图；
- 选中的 4 张候选；
- 线稿/色稿；
- timelapse；
- 最终图。

这些是“原创/人工参与”的证据。

---

## 11. AIGC 披露模板

放在 README/About：

```md
## AIGC 使用说明

本项目的部分插画由 AIGC 工具辅助生成风格底图，最终线稿、解剖校正、中文标注和交互热点均由团队成员人工完成。

- 解剖结构以 BodyParts3D 渲染为底图；
- 临床医学成员逐张校正解剖错误；
- 中医经络图为示意，非解剖结构；
- 所有医学结论均标注来源与证据等级；
- 生成工具、提示词、seed 和人工修改记录见 `docs/art-process/`。
```

建议去比赛 QQ 群问一句并截图：

> “请问比赛是否允许使用 AIGC 生成插画/纹理？是否需要披露工具和提示词？”

如果主办方不允许，备选方案：

```text
3D 渲染 + 手绘线稿 + SVG 信息图
AIGC 只做灵感参考，不进入最终资产
```

---

## 12. 美术 QA 清单

每张图交付前检查：

- [ ] 解剖结构正确（男孩签字）
- [ ] 标签指向正确
- [ ] 没有 AI 生成的中文/乱码
- [ ] 线宽、色板、纸纹与其他图一致
- [ ] 引线不交叉、不穿结构
- [ ] 有 alt 文本
- [ ] WebP < 300KB，SVG 已压缩
- [ ] 手机尺寸裁切正常
- [ ] 热点坐标已记录
- [ ] 过程图/提示词已存档
- [ ] BodyParts3D 署名在 About/README

---

## 13. 版权与署名

- BodyParts3D 数据：CC BY 4.0；
- 署名写：

```text
BodyParts3D, © The Database Center for Life Science
licensed under CC Attribution 4.0 International
```

- 字体：思源宋体/黑体、霞鹜文楷、Inter，均为 SIL OFL；
- 图标：Lucide（ISC）或自己画；
- 不使用 DK 扫描图、图库图、Pinterest 参考图；
- 不使用“in the style of 某在世画家/某品牌/某动画”的提示词；
- 不使用 AI 生成看起来像真实患者的医学图像，统一标“示意插画”；
- 音乐用 royalty-free 或原创，视频里署名。

---

## 14. 最后：先做一张样张

不要一上来做 6 张。先做 **heart-plate** 一张完整样张：

```text
3D 渲染心脏
 → AI 出风格参考
 → Procreate 描线/修正
 → Figma 加 3 个标签
 → 导出 WebP
 → 写 hotspots.json
 → 放进页面看效果
```

这张样张通过后，再批量做另外五个器官。这样不会做完 6 张才发现风格不对。

---

## 15. 一句话总结

> **AI 出图很快，但解剖不能错；手绘很慢，但只画两张就够。**
> 把时间花在“3D 底图 + 人工修正 + 正确标注”上，比抽 100 张 AI 图更划算。
