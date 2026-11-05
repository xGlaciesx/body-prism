# 三维器官视图：用现成数据，不自己建模

> 文档编号 **D17** · 适用：李若溪（执行）、张子昂（审内容边界）
> 对应任务卡：**P2 · T14**。这份文档只解决一件事——三维怎么做才不至于把一周吃光。

---

## 0 先说结论

| 问题 | 结论 |
|---|---|
| 做不做三维 | **做**，但只做"入口级"：让人一进门看见身体，点器官进入影响链 |
| 自己做模型吗 | **不做**。要么用 BodyParts3D 的公开网格自己减面（§3），要么直接用参考项目减好的 GLB（§2.4） |
| 几个器官 | **11 个（五脏六腑缺三焦），12 个热点一屏全显示**。已定案，见 §2.5 |
| 模型里有多少器官 | **65 个结构**，不是 6 个。我们只用其中一部分，限制不在模型，在内容和审核（§2.5.1） |
| 整体和局部能不能兼得 | **能**：把 4 个 GLB 合并成一个 2.79 MB 的 `body.glb`，再用 `camera-target` 换机位。图层开关、透明度、剖面做不了，也不必做（§2.6） |
| 用什么加载 | `<model-viewer>`（推荐）或 `@react-three/fiber` |
| 工期 | 借现成 GLB：代码一天 + 联调半天 = **1.5 天**；自己减面：再加半天 = **2 天** |
| 借现成模型的代价 | 那批模型是 **CC BY-SA 4.0**，三维部分要跟着用同一许可发布（§2.4.3） |
| 承载医学内容吗 | **不承载**。图上只有器官名字和 2–4 个热点按钮，内容全在 `/chain` |
| 做不出来的退路 | 2.5D 分层视差（半天可完成），视觉上仍然"有层次"，不是平面图 |

一句话：**三维负责"第一眼"，二维影响链负责"凭什么"。两者不重叠，谁也不拖累谁。**

---

## 1 之前为什么砍了，现在为什么又捡起来

之前砍掉，理由写在 P2 §2.3：一周做不出能看的 3D，会把时间吃掉。

这个判断在今天仍然成立——**只要你想做的是"准确的解剖 3D"**。要让器官形状、相对位置、剖面都正确，涉及建模、拓扑、材质、动画，大一学生两周也做不完，做出来是个模糊的球。

但你说的那句是对的：视觉是人认识外部世界的主要通道。评委打开一个全是文字柱状图的网站，第一印象就低一档。所以真正要改的不是"做不做"，而是**三维承担什么**：

- 不要它承担**准确性**（它承担不了，做了就是负资产）；
- 让它承担**空间感**和**第一眼**（这是它擅长且便宜的）。

于是三维从"数据可视化"降级为"导航入口"。这个降级让它从 7 天变成了 2 天。降级不是妥协，是把资源放到它真正产生效果的地方。

---

## 2 可以直接拿来用的资源

### 2.1 已经核实过的（许可条款看过原文）

| 资源 | 是什么 | 许可 | 怎么用 | 坑 |
|---|---|---|---|---|
| **BodyParts3D**（NBDC / 日本 DBCLS） | 全身器官的三维网格，按解剖概念（FMA 编号）一个一个拆开，OBJ 格式 | **CC BY 4.0**，明确允许修改和再分发，条件只有署名 | 主力资产。下载需要的器官 → Blender 减面 → 导出 GLB | 文件大、单位与朝向要校；器官名是英文/拉丁文，要自己映射中文 |
| **NIH 3D**（3d.nih.gov） | 美国 NIH 的 3D 模型库，逐条标注许可（多为公有领域或 CC BY），新工作流直接产出 GLB | 逐条看 | BodyParts3D 下不到的器官，来这里补 | 模型质量参差，很多是教学用简模，形状不准 |
| **Servier Medical Art** | 医学插画（器官示意图、系统图），风格统一 | **CC BY 4.0** | 降级方案和静态图用，也是 3D 加载失败时的替代图 | 是 2D 插画，不是 3D |
| **Poly Haven / ambientCG** | HDR 环境光、PBR 材质，全部 CC0 | CC0 | 需要给模型打光时才用 | 这个项目**基本用不上**，HDRI 会让包体大好几 MB，直接用 `environment-image="neutral"` 就够 |

BodyParts3D 的署名文本，一个字都不能改：

```text
BodyParts3D, © The Database Center for Life Science licensed under
CC Attribution 4.0 International
```

许可页原文（2025-02-27 更新）写明允许"自由获取、自由再分发、自由创作和分发衍生作品"，条件是署名。**把减面后的 GLB 提交进仓库是允许的**，前提是 `ATTRIBUTION.md` 里写清楚。

### 2.2 需要你自己再核一遍的

| 资源 | 情况 | 怎么用 |
|---|---|---|
| **Sketchfab** | 大量解剖模型，可按"可下载 + CC 许可"筛选 | 只在 BodyParts3D 实在找不到时用。**逐个点开模型页看许可**，只接受 CC0 / CC BY 4.0；带 NC 的不要用，带 SA 的不要用 |
| **Z-Anatomy** | 开源解剖图谱，交互和图层组织很值得看 | 它的模型是 CC BY-SA 4.0，用了会带来 ShareAlike 义务。**不是"绝对不能用"，是"要付代价"**——已经有人把它转成网页能用的 GLB 了，具体怎么选见 **§2.4** |
| **BioDigital / Visible Body / Complete Anatomy** | 商业产品 | 只看设计，不用任何资产 |

### 2.3 加载器（选一个，别两个都上）

| 方案 | 包大小 | 上手难度 | 适合谁 |
|---|---|---|---|
| **`@google/model-viewer`**（推荐） | 约 300 KB（gzip），按需加载 | 低。它是一个 HTML 标签，不用懂 3D 编程 | 时间紧、只做"转一转 + 点热点" |
| `@react-three/fiber` + `drei` | 约 600 KB+ | 中。要懂场景、相机、材质 | 以后想加剖面、爆炸图、动画 |

**这个项目选 `model-viewer`。** 理由不是它更强，而是它做的事正好等于我们要做的事，多一分能力都用不上。

### 2.4 一个可以直接用的参考项目：`aaron603/body-prism`

```text
https://github.com/aaron603/body-prism
```

先说结论：**它的模型文件能用，它的代码不能直接用。** 用不用，取决于你能不能接受它的许可条件——这一节把账算给你看，别自己拍脑袋。

它是公开仓库，**不用登录、不用 Git、不用命令行**。好消息是：**你们已经不用去它那儿拿模型了**——合并好的 `body.glb` 就在文档包 `starter-assets/models/` 里（§2.4.5）。只有要自己加/减器官时才需要回这个仓库。

#### 2.4.1 它给了什么

| 东西 | 位置 | 大小 | 有用吗 |
|---|---|---|---|
| 7 个系统的 GLB | `public/models/*.glb` | 合计 5.6 MB | **最有用**，见下 |
| `manifest.json` | 同目录 | 23 KB | 每个结构的三角面数 + 包围盒（单位米、Y 轴朝上） |
| 转换管线 | `pipeline/tools/`（`convert.ts`、`extract.ts`、`nodeFilter.ts`、`bounds.mjs`） | — | FBX2glTF → 按系统抽取 → 减面 → meshopt |
| Three.js 查看器 | `src/viewer/AnatomyViewer.ts` | — | 只能当读物，别照搬 |
| Vue 3 + Vite 前端 | `src/**`、`vite.config.ts` | — | **用不上**，见 §2.4.7 |

从 `manifest.json` 直接读出来的结构清单（只看器官，不看骨骼肌肉血管）：

- `cardiovascular`：心（15519 面）、主动脉、颈动脉、肱动脉、股动脉、各级静脉
- `nervous`：脑（64542 面）、小脑、脊髓、臂丛、迷走神经、股神经、坐骨神经
- `visceral`：气管、支气管、左右肺、食管、胃、肝、胆囊、胰、小肠、大肠、双肾、输尿管、膀胱、前列腺、睾丸、垂体、甲状腺、肾上腺
- `lymphoid`：脾、胸腺

**你要的 11 个器官全在里面**：心、脑、肺、肝、肾、胃、脾、胆、小肠、大肠、膀胱。这不是"差不多能用"，是逐个对得上。

#### 2.4.2 它替你做掉了三件最费时间的事

1. **减面已经做完**。心脏 1.5 万面、肝 5.8 千面、肾 794 面、胃 1420 面——正是 §3 里"减到 3–5 万面以下"想要的结果。
2. **压缩已经做完**。七个系统合起来 5.6 MB，用了 meshopt。`model-viewer` 认这个格式，但**默认不解**——要多加一行配置指向解码器，具体见 **§2.6.3** 末尾那张表和修法。这是这一路上唯一一个"不做就完全不显示"的坑。
3. **热点坐标不用量了**。`manifest.json` 里每个器官都带世界坐标包围盒，热点位置 = 包围盒中心，**不用打开 Blender**。§8 第 5 个坑和 §4.2 第 2 条注意，在这一条面前直接消失。

第 3 条是最值钱的。原来一个热点要在 Blender 里量坐标、改一次看一次，三个器官能耗掉半天。

#### 2.4.3 但它的许可，你得先点头

一句话先分清：**这个仓库本身是家里自己的项目，代码随便用；但里面的模型不是它的，是从别处来的，那些条款改不了。** 所以下面讲的都是模型的那一半。

它 README 的原话（大意）：

> 模型来自 Z-Anatomy（`LluisV/Z-Anatomy`，`PC-Version` 分支），几何数据主要源自 BodyParts3D（DBCLS）。模型：Z-Anatomy，CC BY-SA 4.0；几何源自 BodyParts3D，CC BY-SA 2.1 JP。衍生作品须署名并以相同许可分发。
> 部分参考模型有额外条款：脑神经与孔道（Univ. of Dundee，CC BY 4.0）、内耳（CC BY-NC-SA 4.0）、肾脏（Lissie Cowley，CC BY-NC 4.0）。后两者仅限非商业使用。

三件事，说人话：

1. **ShareAlike 会传导。** 你把它的 GLB 放进你的项目，这部分三维资产就要跟着以 CC BY-SA 4.0 发布。你现在 README 写的是"代码 MIT、文字 CC BY-NC-SA 4.0"，加进来不冲突，但要在许可一节**单独写一行**，不能装作都是 MIT。
2. **两个 NC 结构要排除。** 注意：这里说的"肾脏"是它参考的**一份单独模型**，不是 `visceral` 里那对 `kidneys`。**我分不清 `visceral.kidneys` 用的是哪一个**——默认当作有风险，要么去它仓库里核实，要么这一版干脆不做肾的三维，换成胃。
3. **BodyParts3D 的许可有个前后矛盾，你要知道。** 官方许可页（2025-02-27 更新）写的是 **CC BY 4.0**，而这个 README 和不少旧资料写 **CC BY-SA 2.1 JP**。差别正好就是"要不要 ShareAlike"：
   - **你自己从 BodyParts3D 下载再转换** → 按官方页，CC BY 4.0，只需署名；
   - **直接拿这个仓库的 GLB** → 继承它声明的整条链，包着 Z-Anatomy 的 SA。

还有一件不是许可、但更重要的事：**大赛对原创性有没有要求？** 用别人整套模型，评委可能不认。这个问题**适合交给老师**，已经写进 **P3 §七 第 2 条** 和 **P4 的四件事**。

#### 2.4.4 两条路，选一条，别中途改

| | **A 路线：直接用它的 GLB** | **B 路线：自己从 BodyParts3D 转** |
|---|---|---|
| 工期 | 半天 | 2 天 |
| 许可 | CC BY-SA 4.0，带 ShareAlike | CC BY 4.0，只需署名 |
| 质量 | 已经调好，直接能看 | 取决于你减面和检查的水平 |
| 热点坐标 | manifest 直接给 | 要在 Blender 里量 |
| 主要风险 | 原创性可能被质疑；NC 结构要排除 | 做不出来，或者做出来是个模糊的球 |

**建议 A 路线先做出来。** 理由不是许可证不重要，而是：这是第一次参赛，先把"能看见身体"这件事拿到手，比许可条款纯粹要紧得多。而且 A 做完如果老师说不行，换 B 的时候**组件代码一行都不用改**——只换 `public/models/` 里的文件。

#### 2.4.5 A 路线已经交付好了，不用下载

**模型文件就在文档包里**：`starter-assets/models/body.glb`（2,794,276 字节，11 个器官合并在一起，已逐块解码验过）。
复制进 `public/models/` 就能用，**不需要访问 GitHub、不需要下载、不需要合并**。

| 要做的事 | 怎么做 |
|---|---|
| 拿模型 | `cp starter-assets/models/body.glb public/models/body.glb` |
| 拿热点坐标 | `cp starter-assets/anatomy-hotspots.ts src/data/anatomy-hotspots.ts` |
| 拿解码器 | 按 `starter-assets/README.md` §2 下载 `meshopt_decoder.js` 到 `public/meshopt/`（**唯一要联网下的一步**） |
| 署名 | 照 `starter-assets/ATTRIBUTION-3D.md` 抄进页脚和 `ATTRIBUTION.md` |

**什么时候才需要去上游仓库**：只有当你们决定**增加或删掉器官**、必须重新合并的时候。
那时才需要从 `https://github.com/aaron603/body-prism` 下五个文件（`visceral.glb`、`cardiovascular.glb`、`nervous.glb`、`lymphoid.glb`、`manifest.json`），
步骤见 `starter-assets/README.md` §4。**别点绿色 `Code` → `Download ZIP`**——那是 253 MB 的 FBX 源文件，用不上。
合并后的 `body.glb` 是 2.79 MB，在 §5 的 3 MB 单文件预算内。`skin.glb`（1.5 MB）和 `skeletal.glb`（1.1 MB）**不要**——会超预算，而且肋骨会挡住器官。

**另外两点别自己重做**：

- **不用转坐标**。它已经是 glTF 约定：单位米、+Y 朝上、面朝 +Z、人体右侧在 −X。§3.1 里那四个坑，它已经踩完了。
- **署名照抄**。放进页脚和 `ATTRIBUTION.md`，模板如下——**但要以它仓库里的 `ATTRIBUTION` 或 README 原文为准，别照我这个模板直接抄（我这是根据 README 转述的）**：

```text
三维解剖模型：Z-Anatomy（https://github.com/LluisV/Z-Anatomy），CC BY-SA 4.0
几何数据源自 BodyParts3D，© The Database Center for Life Science（DBCLS）
本项目的三维资产为上述作品的衍生/再分发，以 CC BY-SA 4.0 提供。
不含任何 CC BY-NC 结构（内耳、参考肾脏模型未使用）。
```

最后一行是给自己立的凭据：**用了 NC 结构就不能这么写**。所以要么真的排除，要么删掉这一行。

#### 2.4.6 热点坐标：已经算好了，不用你算

11 个器官、12 个点的位置全部算完了，就在 `starter-assets/anatomy-hotspots.ts` 里，复制进 `src/data/` 直接用。
**这些值是照着交付的 `body.glb` 逐个复算过的**（§2.6.3 末尾），完整表在 §2.5.8。

| 器官 | `data-position` | 备注 |
|---|---|---|
| 脑 | `0.000m 1.619m -0.009m` | |
| 右肺 | `-0.067m 1.300m 0.010m` | 左右各一个点，内容是一页 |
| 左肺 | `0.069m 1.299m 0.009m` | |
| 心 | `0.023m 1.291m 0.025m` | |
| 脾 | `0.085m 1.161m -0.004m` | 人体左侧 |
| 肝 | `-0.012m 1.175m 0.023m` | |
| 胆 | `-0.045m 1.137m 0.056m` | 正面会被肝挡住，正常 |
| 胃 | `0.038m 1.166m 0.036m` | |
| 肾 | `0.001m 1.103m -0.012m` | 一对器官的中心，落在两肾之间 |
| 小肠 | `0.009m 1.012m 0.043m` | 只含十二指肠 + 空肠 |
| 大肠 | `0.048m 1.003m -0.011m` | **用降结肠单块**，整段包围盒中心是空的 |
| 膀胱 | `0.000m 0.855m 0.000m` | |

**一个都不要自己改。** 只有当你决定再加器官（胰、甲状腺、前列腺——§2.5.9 说过别加）才需要自己算，函数在 `anatomy-hotspots.ts` 文件末尾的注释里：

```ts
import manifest from "@/data/anatomy-manifest.json";

export function hotspotFromManifest(system: string, structure: string): string {
  const s = (manifest as Record<string, { structures: Record<string, { bounds: { min: number[]; max: number[] } }> }>)[system]
    .structures[structure];
  const c = s.bounds.min.map((v, i) => ((v + s.bounds.max[i]) / 2).toFixed(3));
  return `${c[0]}m ${c[1]}m ${c[2]}m`;
}

hotspotFromManifest("visceral", "pancreas"); // 胰 → "0.010m 1.116m 0.022m"
```

两条要注意：

1. **只要你不重新居中模型，坐标就一直对得上。** 一旦在 Blender 里把原点挪到器官中心，坐标系就变了，这套算出来的值全部作废。
2. **`kidneys` 是一对器官的合集**，包围盒 X 从 −0.088 到 +0.090，中心落在脊柱正中——热点会飘在两肾之间。这不算错（"肾"本来就是个概念），但你要知道它为什么在那儿，别以为是 bug。

跑完把三个数抄进 `HOTSPOTS`，看一眼位置对不对，就完成了。**不用开 Blender。**

#### 2.4.7 不要借的三样

1. **技术栈**：Vue 3 + Vite + Pinia + Three.js，和 Next 16 完全不兼容。`AnatomyViewer.ts` 读一读能学到"图层和点选怎么组织"，但整段搬进来等于把 §2.3 选的 `model-viewer` 推翻，不划算，也来不及。
2. **仓库结构**：约 253 MB 的 `pipeline/source/fbx/` 原样提交在 Git 里——这正是 §8 第 1 条警告的反例。**别学，也别 clone。**
3. **它的解剖层级命名**（`.r`/`.l` 左右、`.g` 组、`.j` 关节、`=` 前缀只取自身网格）：看明白思路就够，你的项目不需要这套。

#### 2.4.8 一句话

**它把"做出看得见的人体"从 2 天压到 1.5 天，代价是三维部分要跟着用 CC BY-SA 4.0，并且要跟老师确认比赛认不认。** 这个交换值不值，取决于你怎么答 P4 里那个问题——但无论如何，**先做出来，别在许可证上卡三天**。

### 2.5 器官数量的最终决定：11 个（五脏六腑缺三焦）

> **这一节已经定案，不是评估了。** 结论：**做 11 个器官**，一个 `body.glb`，12 个热点全在一屏。
> 内容已经在 `content-pack/organs/` 里（11 个器官 + 1 个 `index.ts`），影响链 56 条边，坐标已经算好并实测过。
> 你要做的只有两件事：把文件复制进去、让张子昂过一遍审核清单。
>
> 下面保留原来的分析，是为了在被问"为什么是 11 个""为什么不是 20 个"时，你有答案。

这个问题的答案要劈成两半：**三维这一半几乎免费，内容那一半很贵。**

#### 2.5.1 先纠正一个前提：模型里是 65 个结构，不是 6 个

最早只用了 6 个器官，不是因为模型里没有别的（后来定到 11 个，见 §2.5.5）。把 `manifest.json` 全部数一遍：

| GLB | 字节 | 结构数 | 里面有什么 |
|---|---|---|---|
| `visceral.glb` | 864,440 | 19 | 气管、支气管、左右肺、食管、胃、肝、**胆囊**、**胰**、**小肠**、**大肠**、肾、输尿管、**膀胱**、前列腺、睾丸、垂体、甲状腺、肾上腺 |
| `cardiovascular.glb` | 280,460 | 8 | 心、主动脉、颈总动脉、肱动脉、股动脉、上下腔静脉、大隐静脉 |
| `nervous.glb` | 1,566,896 | 7 | 脑、小脑、脊髓、臂丛、迷走神经、股神经、坐骨神经 |
| `skeletal.glb` | 1,148,700 | 15 | 颅骨、下颌骨、脊柱、胸骨、肋骨、锁骨、肩胛骨、肱骨、桡骨、尺骨、髋骨、股骨、胫骨、腓骨、喉 |
| `muscular.glb` | 415,868 | 13 | 胸锁乳突肌、斜方肌、三角肌、胸大肌、**膈**、背阔肌、肱二头肌、肱三头肌、腹直肌、臀大肌、股四头肌、腘绳肌、腓肠肌 |
| `lymphoid.glb` | 80,376 | 2 | **脾**、胸腺 |
| `skin.glb` | 1,517,676 | 1 | 皮肤 |
| **合计** | **5,874,416** | **65** | |

5.6 MB，一张手机照片的量。合并进 `body.glb` 的是前三个加 `lymphoid.glb`（脾在这里），四个合计 2,792,172 字节 = **2.79 MB**。

所以"能不能更完整"不是模型够不够的问题，是**你愿意为多少个器官写内容**。

#### 2.5.2 三个"数量"要分开算

| 数量 | 由什么决定 | 加一个的代价 |
|---|---|---|
| **三维热点数** | manifest 里已经有包围盒 | 一行数据，**几乎免费** |
| **器官页数** | 三镜内容 + 证据 + 来源 + 审核 | **约 2 小时 / 个**（§2.5.4） |
| **影响链条数** | 每条边要机制 + 证据等级 + 来源 + caveat | 含在上面那 2 小时里 |

评委看到的"完整"是第三个数，不是第一个。首页有 20 个点、只有 6 个能点进去，比 12 个点全部能点进去差得多。

所以立一条硬规矩：**一个热点必须对应一篇能看的内容页，没有内容就不上图。** 点进去是空白或 404，是最伤的一种失败。

#### 2.5.3 现在最大的浪费，其实不在"器官少"

早先那版组件的签名是 `OrganViewer({ organ })`，一次只筛一个器官：

```tsx
const spots = HOTSPOTS.filter((h) => h.organ === organ);
```

也就是说：**不管坐标表里放了多少个点，首页那个三维只显示一个。**

改成按系统筛，一分钱不花，内脏视图立刻从 1 个点变成 5 个（左肺、右肺、肝、肾、胃）。

**但最终没有走"系统切换"这条路。** 四个系统要四个按钮、四个 `src`、四次网络请求，还得教人点两下才看见一个器官——这是把简单事做复杂了。

最后采用的是**合并**：把四个 GLB 合成一个 `body.glb`，12 个点一次全显示，点哪个飞哪个（§2.6）。合并后的文件已经放在 `starter-assets/models/body.glb`，你们直接复制，不用自己合并。

这样组件里就没有"按什么筛"这件事了——`HOTSPOTS` 有几条就渲染几个点。

#### 2.5.4 真正贵的那一半：每个器官 2 小时

| 要付的东西 | 一个器官 | 5 个 |
|---|---|---|
| 器官内容（3 镜 + 5 条 claim + 2 条误区 + 4 个追问 + 4 个来源） | 起草 40 min + 审 30 min | 6 h |
| 影响链：1 个节点 + 3 条边（每条要机制、证据等级、来源、caveat） | 30 min | 2.5 h |
| AI 兜底答案 | 10 min | 1 h |
| 审核记录写进 `REVIEW.md` | 15 min | 1.5 h |
| **合计** | **≈ 2 h** | **≈ 11 h** |

11 小时是什么概念：张子昂七天总共 14 小时，减去 11 个器官的复核、答辩稿、每天看 PR，**剩不下多少**。这就是为什么下面 §2.5.7 选 D 的时候，那 5 个器官的内容是被**替他们起草好的**——让张子昂从零写 5 个，一周就满了。

所以结论很硬：**加 5 个会把他的余量全部吃光，一点不剩；加 3 个，塞得进去。**

起草已经做完了（`content-pack/organs/` 里 11 个器官文件 + `index.ts`，字段与你的 schema 一致），**审核仍然只有张子昂能做**，这是唯一不能并行的环节。

#### 2.5.5 如果要加，加这 5 个：五脏六腑，缺一个三焦

不是随便挑五个"有名的器官"，而是有一套现成的结构直接套——中医的**五脏六腑**：

| | 现有 | 缺 |
|---|---|---|
| 五脏 | 心 ✓ 肝 ✓ 肺 ✓ 肾 ✓ | **脾**（在 `lymphoid.glb`） |
| 六腑 | 胃 ✓ | **胆**（胆囊）、**小肠**、**大肠**、**膀胱**，以及**三焦** |

补上这 5 个，得到 11 个器官，正好是"五脏 + 六腑减去三焦"。而且**每一对表里关系都能变成一条影响链的边**：

- 心 — 小肠
- 肝 — 胆
- 脾 — 胃
- 肺 — 大肠
- 肾 — 膀胱

这五条边比再多写几个器官的简介都值钱：它们让"关系之镜"有了第二根轴——西医看解剖相邻，中医看表里。这正好踩在"同一具身体，三种读法"的题目上。

**三焦没有对应结构**，模型里也没有。这不是缺憾，是两种读法分岔最明显的地方，在 `/method` 里写三行说明就够了，不用做成器官页。

#### 2.5.6 但这三个是"同名不同物"，必须标出来

| 加进来的 | 风险在哪 |
|---|---|
| **脾** | 中医的"脾"主运化，更接近消化吸收功能；解剖学的脾脏是免疫和储血器官。**把中医的脾直接画在脾脏上是错的** |
| **胆** | 中医"胆主决断"说的是情志，和解剖胆囊储存胆汁不是一回事 |
| **膀胱** | 中医"膀胱气化"与肾相表里，含义比"存尿的袋子"宽 |

这不是坑，这是**本项目的卖点**：三种读法的差异正好在这三个器官上最显眼。但每处都必须写成"西医：…… / 传统理论：……"，不能混着说。

对张子昂的要求也要说清：**他能审西医那半，审不了中医那半。** 中医内容一律标"传统理论"，只引教材级来源，证据等级给 C，不要给 A/B。

#### 2.5.7 三档，选一个

| 方案 | 器官 | 内容工时 | 三维 | 判断 |
|---|---|---|---|---|
| **A 退回旧写法** | 6 | 0 | 按器官筛，首页只显示 1 个点 | 别这么做，白扔了一个能用的三维 |
| **B 按系统显示** | 6 | 0 | 3 个 GLB / 2.7 MB，首页 5 个点 | 已废弃：一屏看不全，表里配对跨文件 |
| **C 推荐** | 9（+脾、胆、膀胱） | ≈ 6 h | +80 KB（脾要 `lymphoid.glb`） | 一周内塞得下 |
| **D 完整** | 11（五脏六腑缺三焦） | ≈ 11 h | 合并成 `body.glb`，12 个点一屏 | **✅ 已选定，已交付** |
| **E 全上** | 65 个结构 | 不可行 | 5.6 MB | 不做，理由见 §2.5.9 |

**选了 D，而且内容工时已经付掉了。** 五个扩展器官的三镜内容、证据等级、来源、误区、追问，全在 `content-pack/organs/` 里；
影响链从 34 条边扩到 56 条（多出来的 22 条里，5 条是五脏六腑的"表里"配对）。两个孩子要做的是**审核和集成**，不是从零写。

#### 2.5.8 坐标已经全部算好

11 个器官的 `data-position`（包围盒中心，算法同 §2.4.6），全在 `starter-assets/anatomy-hotspots.ts` 里。
**下面这 12 个值不是抄来的，是从合并后的 `body.glb` 里实测复算过的**（解码每个网格、按节点变换算世界坐标），和表里一位不差：

| 器官 | 系统 | `data-position` |
|---|---|---|
| 心 | cardiovascular | `0.023m 1.291m 0.025m` |
| 脑 | nervous | `0.000m 1.619m -0.009m` |
| 右肺 / 左肺 | visceral | `-0.067m 1.300m 0.010m` / `0.069m 1.299m 0.009m` |
| 肝 | visceral | `-0.012m 1.175m 0.023m` |
| 肾 | visceral | `0.001m 1.103m -0.012m` |
| 胃 | visceral | `0.038m 1.166m 0.036m` |
| **脾** | lymphoid | `0.085m 1.161m -0.004m` |
| **胆囊** | visceral | `-0.045m 1.137m 0.056m` |
| **小肠** | visceral | `0.009m 1.012m 0.043m` |
| **膀胱** | visceral | `0.000m 0.855m 0.000m` |
| **大肠** | visceral | `0.000m 0.969m 0.005m` ⚠️ 整段大肠的包围盒中心，落在空当里，**别用**；改用下面降结肠的 |

**大肠这个数不能用。** 包围盒中心落在腹腔正中——那儿正是大肠围起来的那圈空当，热点会标在肚子里指着一片空。

原因在网格本身：这个 GLB 里的"大肠"不是一整段，是**升结肠 / 横结肠 / 降结肠 / 乙状结肠四块**。取四块合并包围盒的中心，必然落到中间的空腔。肠子、血管、神经这类**空腔或弯曲的结构**，包围盒中心本来就没有意义；实心器官（心、肝、肾、脾、甲状腺）才准。

处理办法不是"往左下方偏一偏"，而是**取单块**。按降结肠单独算包围盒中心（这个数是从网格顶点实测的，不是估的）：

| 单块 | 中心 |
|---|---|
| 升结肠 `Ascending colon` | `-0.088m 1.018m 0.015m`（人体右侧） |
| 横结肠 `Transverse colon` | `0.006m 1.101m 0.044m` |
| **降结肠 `Descending colon`** | **`0.048m 1.003m -0.011m`**（人体左侧，选它） |
| 乙状结肠 `Sigmoid colon` | `0.005m 0.865m -0.047m` |

**大肠就写 `0.048m 1.003m -0.011m`。** 别让 Cline 去"算"整段大肠的中心，让它按单块节点名去取。小肠同理：这个 GLB 里的小肠只有**十二指肠 + 空肠**两块（没有回肠），`0.009m 1.012m 0.043m` 是这两块的中心，能用。

#### 2.5.9 不要做的三件事

1. **别加骨骼、肌肉、皮肤。** 骨骼 +1.1 MB、肌肉 +0.4 MB、皮肤 +1.5 MB，会把 §5 的 4 MB 预算顶穿；更要紧的是它们写不出"三镜"——"这块肌肉受谁影响"没有内容可写，只能是装饰。
2. **别为了凑数加没有中医对应的器官**（胰、甲状腺、前列腺）。它们能做，但每个都要额外解释"为什么中医里没有这个"，解释成本高于内容本身。
3. **别把左右拆成两个器官。** 左肺右肺在医学上不是两个器官，拆成两页会让评委觉得在灌水。`data-position` 上是两个点，内容上是一页——这个区别 §0 已经写了。

### 2.6 "整体 + 局部"：那套全身图能不能接进来

结论：**能，而且比想象中简单——但它的"高级效果"有一半你拿不到，也不必拿。**

#### 2.6.1 先看它到底怎么做的

它 README 里写的是：**"11 个系统独立开关和透明度，选中时淡化其他结构"**、"隐藏 / 单独显示 / 撤销"、"矢状 / 冠状 / 水平三种剖面"、"68 个结构"。

技术上是：**把 7 个 GLB 全加载进同一个 three.js 场景**，然后遍历场景图改 `visible` 和材质 `opacity`。

所以"整体有部分"不是模型自带的效果，是**查看器的能力**。这决定了我们能拿哪一半。

#### 2.6.2 能拿的 / 拿不到的

| 效果 | 它怎么实现的 | 我们能不能 |
|---|---|---|
| 全身器官同时可见 | 7 个 GLB 同场景 | **能**，已合并成 `body.glb`（§2.6.3） |
| 点器官，"飞"过去看局部 | 相机插值 | **能**，`camera-target` 原生支持，不用写 3D 代码（§2.6.4） |
| 系统图层开关 | 遍历 scene graph | 不能。`<model-viewer>` 不开放场景图 |
| 透明度 / 淡化其他结构 | 改材质 | 不能 |
| 矢状 / 冠状 / 水平剖面 | 裁剪平面 | 不能 |
| 点选任意结构高亮 | three-mesh-bvh | 不能，也不需要——我们只有 11 个热点，不是 68 个可点结构 |

三条"不能"的替代方案是同一句话：**把"图层"降级成"相机位置"**。观众真正想要的不是拨透明度，是"从全身看到肝"。而这件事 model-viewer 一条属性就能做。

**别为了图层和剖面去换 three.js。** 那是 P2 §2.3 的禁区，也是那个仓库能长到 200 MB 的原因。

#### 2.6.3 第一步：合并成一个文件（**已经合并好了，直接拿**）

`<model-viewer>` 一次只能加载一个 GLB，所以"全身"要先合成一个。

**这一步不用你们做。** 文件就是 `starter-assets/models/body.glb`：

| 项 | 值 |
|---|---|
| 体积 | 2,794,276 字节（2.79 MB） |
| 内容 | 443 个网格 / 579 个节点 / 11 个器官 |
| 压缩 | 1,054 个 meshopt 压缩块，解出来 3,148,628 字节 |
| 坐标 | 与 §2.5.8 的表**完全一致**（没有重新居中） |

```bash
# 项目根目录下
mkdir -p public/models
cp docs/plan/starter-assets/models/body.glb public/models/body.glb
```

（Windows PowerShell 用 `Copy-Item docs\plan\starter-assets\models\body.glb public\models\body.glb`。
文件在文档包 `starter-assets/models/` 里，也有网页版可单独下载，见 `starter-assets/README.md` §1。）

**为什么不能自己用 `gltf-transform merge` 重做一遍**：这批 GLB 是 meshopt 压缩的，常规合并工具会把压缩流解开、重新序列化，
体积、`extensionsRequired`、缓冲布局全都变，坐标也不保证。我们是用脚本把压缩块按字节直接拼起来的，才是 2.79 MB。
所以：**只有当你真的要加/减器官**才需要重做合并（§2.5.5 讨论过的那 3 个除外），具体步骤在 `starter-assets/README.md` §4。

**为什么合并一次就能对位**：这几个文件用的是**同一套世界坐标**——心在 y≈1.29 m，肝在 y≈1.18 m，都是按真实人体高度做的。合并只是把它们塞进一个场景，不动几何。**热点坐标一个都不用改。**

骨架（`skeletal.glb`，+1.1 MB）能不能一起加？**技术上能，别加**：肋骨会挡住器官，而且 3.9 MB 的首屏不值得。

**这件事已经验过了（2026-11-04）：能读，但不是开箱就能，要加一行配置。** 结论和依据都写在这里，看过可以跳过。

官方编辑器（`modelviewer.dev/editor`）能打开，**不代表你们的网页能打开**——那个编辑器自己挂了 meshopt 解码器。查过 `@google/model-viewer@4.4.0` 的源码：

| 压缩格式 | 默认解码器地址 | 不配置会怎样 |
|---|---|---|
| Draco | 有（`www.gstatic.com`） | 能用 |
| KTX2 贴图 | 有（`www.gstatic.com`） | 能用 |
| **meshopt（这批文件用的）** | **没有** | **模型不出现** |

这批 GLB 把 `EXT_meshopt_compression` 写在 `extensionsRequired`（"不支持就别显示"），所以不配解码器的报错是硬失败：

```text
THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files
```

修法是**一行代码 + 一个 30 KB 文件**：

```bash
# 放进项目的 public/meshopt/
curl -L -o public/meshopt/meshopt_decoder.js \
  https://cdn.jsdelivr.net/npm/meshoptimizer@0.24.0/meshopt_decoder.js
```

```ts
// 在 useEffect 里，动态 import 之后、创建 <model-viewer> 之前
const { ModelViewerElement } = await import("@google/model-viewer");
ModelViewerElement.meshoptDecoderLocation = "/meshopt/meshopt_decoder.js";
```

三个坑：

1. **必须用 0.24.0 那份 `meshopt_decoder.js`（UMD 版）。** meshoptimizer 从 1.3.0 起只发布 ESM 版（`.mjs`），而 model-viewer 是用 `<script src>` 去加载这个地址的，ESM 文件会直接语法报错。别去 npm 上抓"最新版"替换。
2. **先设地址，再创建 `<model-viewer>`。** 所以不能写成静态标签（`<model-viewer src=... />` 一挂载就开始加载，来不及插配置），必须按 **§4.2** 的顺序：`useEffect` 里 import → 设地址 → `appendChild`。
3. **别为了省这行配置改走 Draco。** `gltf-transform draco` 确实能零配置，但 Draco 的默认解码器在 `www.gstatic.com`，国内赛场不一定通，到时候还得再自托管一份，绕一圈工作量一样。

**已经核过的不止这些**：用 meshoptimizer 0.24 把交付的 `body.glb` 里 **1,054 个压缩块全部解了一遍**（解出 3,148,626 字节，与文件声明的 3,148,628 只差 2 字节对齐填充），
再按每个节点的 TRS 变换算世界坐标，11 个器官的中心与 **§2.5.8** 表里**一位不差**。
也就是说：文件没坏、解码器版本对得上、坐标可以放心用。**你们拿到的不是"应该能跑"，是逐块验过的。**

**别等 11 个器官的内容都写完才发现模型打不开。**

#### 2.6.4 第二步：`camera-target` 就是"整体 → 局部"

合并之后，"点器官飞过去"不需要任何 3D 编程，两个属性就够：

```tsx
<model-viewer
  src="/models/body.glb"
  camera-target={target}        // 选了器官就是它的 position，没选就是全身中心
  camera-orbit={focus ? "0deg 70deg 0.55m" : "0deg 75deg 2.4m"}
  interpolation-decay="120"     // 120 ms 到位，慢了像卡，快了像闪
  camera-controls
  …
>
```

`target` 直接复用 `HOTSPOTS` 里的 `position`，**不用另算一套坐标**。三个常量（`VIEW_ORBIT`、`WHOLE_BODY_ORBIT`、`WHOLE_BODY_TARGET`）已经在 `anatomy-hotspots.ts` 里了。

- `camera-target` = 镜头看哪儿；
- `camera-orbit` 第三个数 = 离多远。全身 `2.4m`，单器官 `0.55m`；
- 改这两个值，model-viewer 自己插值过去。`interpolation-decay` 控制快慢。

这就是全部原理。**§4.2 的组件已经是这个效果，不用再加任何代码。**

#### 2.6.5 代价：首屏模型从 1.1 MB 变成 2.79 MB

| | 四个文件分系统 | 合并版（**已交付**） |
|---|---|---|
| 首屏模型 | 最深的一屏 1.1 MB | 2.79 MB |
| 宽带下 | 1–2 秒 | 2–4 秒 |
| Slow 3G 下 | 约 6 秒 | 约 12 秒 |
| 一屏能看到几个器官 | 一个系统最多 7 个 | **11 个** |
| 你们的额外工作量 | — | 0（文件已给，代码已给） |

对策按顺序试：先让文字和布局 1.5 秒内可读（§4.4.4 的时序表不变），再给一个 `poster` 静态图顶着，最后才是模型淡入。真嫌慢就上分档（下面第 3 档）。

#### 2.6.6 三档，按时间选

| 档 | 做法 | 体积 | 时间 |
|---|---|---|---|
| 1 | 按系统显示，四个 tab | 4 个 GLB / 约 3.4 MB | 不用了（一屏看不全） |
| 2 | **合并 + 相机飞近** | 2.79 MB | **已交货**：文件给你们了，代码照抄 |
| 3 | 先下内脏，空闲时预取其余 | 同 2，分两次请求 | 不做，理由见下 |

**第 2 档已经做完并交付。** 合并后的 `body.glb` 在 `starter-assets/models/` 里（2,794,276 字节，443 个网格、579 个节点），
坐标也按它复算过。你们的第 2 档工作量只剩：复制文件 + 照抄 §4.2 的组件 + 接上 `camera-target`。

**为什么默认不上第 3 档（分层预取）**：2.79 MB 在宽带下 2–4 秒，慢网 10 秒以上，但页面文字是先渲染的，模型在后加载，读的人不会干等。
分层预取要多写一套加载状态机，出错概率换来的收益是"快 1 秒"——不值。真要优化，先给 `body.glb` 开 gzip/br，服务器一行配置的事。

**11 个器官分散在 4 个文件里时，心—小肠、肺—大肠这些"表里"配对正好跨文件，只有合并才能让它们同屏。** 这是选 D 之后"整体感"唯一的实现路径。

#### 2.6.7 一句话

**"整体 + 局部"要的不是更多代码，是先把 4 个文件合成 1 个，再把"点器官"翻译成"换个机位"。**

---

## 3 资产管线（B 路线：自己从 BodyParts3D 转，半天）

**走 A 路线（§2.4）就跳过这一节**，直接用它的 GLB。只有在你决定不接受 ShareAlike、或者老师明确要求模型必须自己做的时候，才走这里。

```text
BodyParts3D 下载（OBJ，可能几十 MB）
  → Blender 导入
  → 只留目标器官，删掉相邻结构
  → Decimate（减面）到 3–5 万面
  → 法线朝外（Shift+N），检查破面
  → 材质换成单色 + 一点粗糙度，不要贴图
  → 导出 GLB（勾选 Draco 压缩）
  → 放 public/models/liver.glb
```

**体积预算**：单器官 ≤ 1.5 MB，三个合计 ≤ 4 MB。超了就继续减面——这个项目不需要毛孔级的细节，观众看到的是轮廓。

**不要**把原始 OBJ、Blend 文件提交进 Git。原始文件放本地或网盘，`.gitignore` 里加 `raw/`、`*.obj`、`*.blend`。

### 3.1 坐标与朝向：一定会踩的坑

BodyParts3D 的网格来自医学影像，导出后在 Blender 里常见三种别扭：躺着的（Z 轴朝上）、左右反的、单位过大导致相机里只剩一个角。处理顺序固定下来：

1. 先看包围盒尺寸，把单位归一到"米"；
2. 旋转到 Y 轴朝上（glTF 约定）；
3. 检查左右：肝在人体右侧、心脏偏左，转完在 Blender 里对照解剖图确认一次；
4. 原点归到器官几何中心，这样旋转时不会跑出画面。

---

## 4 代码：`model-viewer` 路线

### 4.1 类型声明（不写这段，TS 会报错）

React 19 里 JSX 命名空间的合并方式变了，网上大多数教程给的是老写法。照下面这段写：

```ts
// src/types/model-viewer.d.ts
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
        Record<string, unknown>;
    }
  }
}
```

### 4.2 组件

**这是最终版，直接整段复制。** 一个 `body.glb`、全部 12 个热点、点按钮相机飞过去（§2.6.4 的效果），
不需要 `system` 参数，也不需要任何 3D 编程。

```tsx
// src/components/organ-viewer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  HOTSPOTS,
  VIEW_ORBIT,
  WHOLE_BODY_ORBIT,
  WHOLE_BODY_TARGET,
  type OrganSlug,
} from "@/data/anatomy-hotspots";

// 按钮顺序：每个器官取它第一个热点（肺有两个点，取右肺；想同时看两肺把 target 的 x 改成 0.000m）
const FOCUS = Array.from(new Map(HOTSPOTS.map((h) => [h.organ, h])).values());

export function OrganViewer({ title = "人体" }: { title?: string }) {
  const [state, setState] = useState<"loading" | "ready" | "fail">("loading");
  const [focus, setFocus] = useState<OrganSlug | null>(null);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("@google/model-viewer")
      .then(({ ModelViewerElement }) => {
        if (cancelled) return;
        // 这一行不能省：body.glb 是 meshopt 压缩的，不指解码器模型根本不出现。
        // 必须在元素开始加载之前设，所以放在 import 之后、setState 之前（§2.6.3）。
        ModelViewerElement.meshoptDecoderLocation = "/meshopt/meshopt_decoder.js";
        setState("ready");
        const el = ref.current;
        if (!el) return;
        const onError = () => setState("fail");
        el.addEventListener("error", onError);
        return () => el.removeEventListener("error", onError);
      })
      .catch(() => !cancelled && setState("fail"));

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "fail") {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-neutral-100">
        {/* 加载失败就用静态图，不留白屏 */}
        <img src="/art/whole-body.png" alt={`${title}示意图`} className="max-h-full max-w-full object-contain" />
      </div>
    );
  }

  const target = focus ? HOTSPOTS.find((h) => h.organ === focus)!.position : WHOLE_BODY_TARGET;

  return (
    <div className="relative aspect-square w-full">
      {state === "ready" && (
        <model-viewer
          ref={ref as never}
          src="/models/body.glb"
          alt={`${title}的三维示意，仅用于导航，不作为解剖依据`}
          camera-controls
          camera-target={target}
          camera-orbit={focus ? VIEW_ORBIT : WHOLE_BODY_ORBIT}
          interpolation-decay="120"
          auto-rotate
          auto-rotate-delay="2000"
          rotation-per-second="8deg"
          interaction-prompt="none"
          shadow-intensity="0.5"
          exposure="1"
          environment-image="neutral"
          loading="lazy"
          reveal="auto"
          touch-action="pan-y"
          style={{ width: "100%", height: "100%" }}
        >
          {/* 热点只做一件事：跳转（§4.4.2 第 2 条）。这里必须是静态列表，
              不能让 React 在运行中增删子元素——model-viewer 会把它们搬进 shadow DOM，
              React 再删就会报 "not a child of this node"。 */}
          {HOTSPOTS.map((h, i) => (
            <Link
              key={`${h.organ}-${i}`}
              slot={`hotspot-${i}`}
              data-position={h.position}
              data-normal={h.normal ?? "0m 0m 1m"}
              href={`/chain?organ=${h.organ}`}
              className="rounded-full bg-white/90 px-3 py-1 text-xs shadow"
            >
              {h.label}
            </Link>
          ))}
        </model-viewer>
      )}

      {/* 机位切换在这个 div 里，不在 <model-viewer> 里面 —— 改的是属性，不动子元素 */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setFocus(null)}
          className={`rounded-full px-3 py-1 text-xs ${focus === null ? "bg-neutral-900 text-white" : "bg-neutral-100"}`}
        >
          整体
        </button>
        {FOCUS.map((h) => (
          <button
            key={h.organ}
            type="button"
            onClick={() => setFocus(h.organ)}
            className={`rounded-full px-3 py-1 text-xs ${focus === h.organ ? "bg-neutral-900 text-white" : "bg-neutral-100"}`}
          >
            {h.label}
          </button>
        ))}
      </div>

      <p className="mt-2 text-center text-xs text-neutral-500">
        三维示意，仅用于导航；结构与比例经简化，不作为解剖依据。
      </p>
    </div>
  );
}
```

**五个必须注意的点：**

1. `import("@google/model-viewer")` 必须在 `useEffect` 里动态加载。写在文件顶部会让 Next 在服务端执行它，直接报 `customElements is not defined`。
2. **`meshoptDecoderLocation` 那一行不能删。** 删了页面不报红、不提示，就是模型空着不出来——最难查的一类错。原理和版本要求见 **§2.6.3** 末尾。
3. 热点的 `data-position` 是**模型世界坐标**，12 个值已经在 `src/data/anatomy-hotspots.ts` 里算好了（§2.5.8），**一个都不用量**。走 B 路线（自己建模型）才要在 Blender 里量。
4. 组件下面那句"不作为解剖依据"不是免责，是**真话**：减面后的模型确实不是解剖依据。写出来反而显得可信。
5. **`<model-viewer>` 的子元素不要做条件渲染。** 热点列表是模块级的 `HOTSPOTS.map(...)`，运行中永不变；机位切换用外面的按钮改属性。
   一旦你写成 `{someState && <Link slot="hotspot-0" …>}`，React 删节点时就会报
   `The node to be removed is not a child of this node` —— 因为那个节点已经被搬进 shadow DOM 了。

> 只需要三维、不要飞近效果的话，把 `camera-target` / `camera-orbit` / `interpolation-decay` 三行删掉，组件照样能跑。

### 4.3 这一行的排版约束

三维只放**首页第一屏的右侧**（或移动端的首屏下方），尺寸不超过视口高度。它右边/下面必须同时有那三句话和「看一条链」按钮。

**不允许**：三维占满全屏、首屏只有图没有字、进入页面强制等模型加载完才显示文字。文字先渲染，模型后加载。

### 4.4 三维放进来以后，页面和调用关系长什么样

加一个三维视图，动的不是"首页多一个组件"，而是**首屏的分栏**和**三个页面之间的入口关系**。这一节把三件事一次定死：谁在哪、谁调谁、先加载谁。

#### 4.4.1 五个页面各管什么

| 页面 | 一句话职责 | 有没有三维 | 进来以后去哪 |
|---|---|---|---|
| `/` 首页 | 说清"凭什么"这件事，给一个人体的第一眼 | **有**（唯一有的地方） | 点热点或器官 → `/chain?organ=x`；次按钮 → `/method` |
| `/explore` 探索页 | 全部器官的列表 / 索引，键盘可达（11 个，`getAllOrgans()` 有几条列几条，不用改代码） | **没有** | 点器官 → `/organ/[slug]` |
| `/chain?organ=x` | 影响链：器官 → 功能 → 表现，点边看证据 | **没有** | 点节点 → `/organ/[slug]`；侧栏问 AI |
| `/organ/[slug]` | 单个器官的三镜内容、证据、误区 | **没有** | 回 `/chain?organ=slug` |
| `/method` | 证据分级规则、免责、素材许可、AIGC 记录 | **没有** | 页脚常驻入口 |

**三维只出现在 `/` 上，其他三个页面一个都不许有。** 这不是省事，是让"三维 = 入口"这个定位成立：一旦 `/chain` 里也有可转的模型，观众就会以为三维是内容本身，然后去挑它准不准。

#### 4.4.2 调用关系

```text
                        ┌─────────────────────────┐
   浏览器地址栏  ──────▶ │  app/page.tsx  （首页）  │
                        │                         │
                        │  ├─ 首屏文字（T13）      │
                        │  └─ <OrganViewer>（T14） │
                        └───────────┬─────────────┘
                                    │ 渲染
                        ┌───────────▼─────────────┐
                        │ components/             │
                        │   organ-viewer.tsx      │
                        │   ├─ 读 data/anatomy-hotspots.ts
                        │   ├─ 动态 import("@google/model-viewer")
                        │   └─ src="/models/body.glb"
                        └───────────┬─────────────┘
                                    │ 点热点
                        ┌───────────▼─────────────┐
                        │  app/chain/page.tsx     │
                        │   ?organ=heart          │
                        │   （读 lib/chain.ts）    │
                        └───────────┬─────────────┘
                                    │ 点节点
                        ┌───────────▼─────────────┐
                        │ app/organ/[slug]/page   │
                        └─────────────────────────┘

  依赖方向只有一条：page → component → data / 静态文件。
  任何 component 都不许反过来 import page，也不许 import 彼此。
```

四条规矩：

1. **`organ-viewer.tsx` 只 import 两样东西**：`@/data/anatomy-hotspots` 和 `@google/model-viewer`。它不读 `src/content/`，不调 API，不碰 `/chain` 的数据。
2. **热点只做一件事：跳转。** 不在首页弹抽屉、不在三维上叠文字说明。点下去就到 `/chain`，那边才是内容。
3. **`/chain` 不知道三维存在。** 它只认 URL 上的 `?organ=`，从哪儿来的不管——这样首页、器官页、直接粘链接，三条路都走得通。
4. **模型文件只在首页加载。** `/chain` 和 `/organ` 的 js 包体积不受三维影响，首屏速度不因为三维变慢。

#### 4.4.3 首屏怎么分栏

**桌面（≥1024 px）**：12 栅格，文字 7 栏、三维 5 栏。

```text
┌──────────────────────────────────────────────────────────┐
│  人体棱镜 Body Prism                          [导航]      │
├───────────────────────────────────┬──────────────────────┤
│ 通用大模型告诉你"可能是什么"，     │                      │
│ 我们说清"凭什么"。                 │                      │
│                                   │      ┌────────┐      │
│ ① 身体不舒服时，越来越多人不再     │      │  三维   │      │
│    搜索，而是直接问 AI。           │      │  人体   │      │
│ ② 但 AI 给的是一个结论——它不说     │      │ (可转)  │      │
│    这一步从哪来，也无从核对。       │      └────────┘      │
│ ③ 人体棱镜把每条身体结论的推理链   │    ●心 ●肝 ●肾      │
│    摊开：每一步都能点开，都标着     │                      │
│    证据强度。                      │ 三维示意，仅用于导航 │
│                                   │                      │
│ [ 看一条链 ]  [ 它凭什么这么说 ]   │                      │
├───────────────────────────────────┴──────────────────────┤
│  页脚：科普作品，不提供诊断 · 急症请拨打 120 · 素材许可 →  │
└──────────────────────────────────────────────────────────┘
         ← 文字 7 栏（lg:col-span-7）→  ← 三维 5 栏（lg:col-span-5）→
```

**平板 / 手机（<1024 px）**：不分栏，**文字整块在前，三维整块在后**，三维高度 40vh，不抢首屏。

```text
┌──────────────────────┐
│ 标题 + 三行说明       │   ← 先渲染，不等模型
│ [ 看一条链 ]         │
├──────────────────────┤
│   ┌────────────┐     │
│   │   三维      │     │   ← 40vh，后加载
│   └────────────┘     │
│  ●心  ●肝  ●肾       │   ← 热点的文字版，永远在
│  三维示意，仅用于导航 │
└──────────────────────┘
```

**三处必须照做**：

- 首屏容器用 `grid lg:grid-cols-12`，文字 `lg:col-span-7`，三维 `lg:col-span-5`。**T13 做首屏时就要把右侧 5 栏先留空**，否则 T14 接进来要重排一次，容易把已经定稿的文案挤乱。
- 三维容器固定 `aspect-square`（或 `h-[60vh] max-h-[520px]`），**不许用百分比高度撑开父容器**，否则模型加载前后页面会跳。
- 热点在移动端另给一行**文字按钮**（心 / 肝 / 肾），因为小屏上球面上的热点点不准。

#### 4.4.4 加载时序（首屏不许等模型）

| 时刻 | 发生什么 | 观众看到 |
|---|---|---|
| 0 ms | 服务端渲染的 HTML 到达 | 标题、三行说明、按钮**立刻可读** |
| ~50 ms | 字体与样式生效 | 布局稳定，不跳 |
| 页面可交互后 | `useEffect` 里 `import("@google/model-viewer")` | 三维位置显示一个静态占位（灰底 + 淡图） |
| 模型下完 | `loaded` 事件 | 占位换成可转模型，淡入 200 ms |
| 5 s 未完成 / 出错 / 无 WebGL | 走 §6 降级 | 显示 `/art/whole-body.png`，文字照常 |

**判据**：把网络限速到 Slow 3G，首屏文字必须在 1.5 秒内读完。做不到就是三维抢了主线程或阻塞了渲染。

#### 4.4.5 T13 和 T14 的接口

这两张卡一前一后，最容易撞车。约定死了就不撞：

| | T13（先做） | T14（后做） |
|---|---|---|
| 改哪些文件 | 只改 `src/app/page.tsx` | 新增组件 + 在 `page.tsx` 的**右侧 5 栏**里放一行 `<OrganViewer />` |
| 首屏结构 | 建好 `grid lg:grid-cols-12`，右侧 5 栏**留空** | 填进那 5 栏，不改栅格 |
| 文案 | 定稿，之后不改 | 一个字都不碰 |
| 出问题怎么办 | — | 卸掉依赖、删掉组件，页面回到 T13 的样子，不能变丑 |

---

## 5 性能预算（做完自己量一次）

| 指标 | 上限 | 实测 | 怎么量 |
|---|---|---|---|
| 首屏文字可读时间 | < 1.5 s | — | Lighthouse |
| `body.glb` 单文件 | ≤ 3 MB | **2.79 MB** | `ls -lh public/models` |
| `public/models` 合计 | ≤ 4 MB | 2.79 MB | `du -sh public/models` |
| 模型加载完成 | < 5 s（4G 模拟） | — | DevTools Network 限速 |
| 移动端滚动 | 不卡顿 | — | 手机上摸一遍，尤其 iOS Safari |

超预算的处理顺序：开 gzip/br（服务器一行配置，通常降到 2 MB 以下）→ 继续减面 → 退回四个源文件分系统（§2.6.6 第 1 档）→ 换静态图。

---

## 6 降级：三维加载不出来的时候

三条降级路径，按顺序自动走：

1. **WebGL 不可用**（老机器、虚拟机、部分投屏电脑）→ 直接渲染 `public/art/whole-body.png`，`state` 初始就判一次；
2. **GLB 加载失败或超时**（超过 5 秒）→ `error` 事件触发，切静态图；
   注意：**没配 meshopt 解码器也会走这条路**，所以模型不出来先查 `meshoptDecoderLocation`（§2.6.3）；
3. **`prefers-reduced-motion`** → 关掉 `auto-rotate`，只保留手动旋转。

判断 WebGL 的一行：

```ts
const hasWebGL = (() => {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
})();
```

**评委打开你的网站时用的很可能是会议室的电脑或投屏。** 那台机器最容易没有 WebGL。所以静态图不是可选项，是必做项。

---

## 7 验收（T14 做完跑这个）

```bash
ls -lh public/models/body.glb public/meshopt/meshopt_decoder.js
npx tsc --noEmit
npm run build
npm run dev
```

**前两行必须都在**：`body.glb` 2.79 MB、`meshopt_decoder.js` 约 30 KB。少一个，模型就不出现。

手工检查清单：

- [ ] 首页首屏：文字 1 秒内可读，三维出现在文字之后
- [ ] **12 个热点全部可见**（脑、左右肺、心、脾、肝、胆、胃、肾、小肠、大肠、膀胱），转到背面不穿模、不掉面
- [ ] **模型真的出来了**——不是灰底也不是静态图。看不到就先查 `meshoptDecoderLocation`（§2.6.3）
- [ ] 每个热点都能跳到 `/chain?organ=xxx`，跳过去的器官和点的名字对得上（不是全跳同一个）
- [ ] 点"整体 / 心 / 肝 …"按钮，相机**平滑飞过去**，不是瞬移、不是不动（`camera-target` 生效）
- [ ] 点"整体"能飞回全身视角
- [ ] 在 DevTools 里把网络限速到 Slow 3G，页面不白屏，文字照样能读
- [ ] 关掉 WebGL（Chrome 启动参数 `--disable-webgl`）后，显示 `/art/whole-body.png` 而不是空白
- [ ] 手机上单指能转、页面能上下滚（不能整页被模型吃掉手势）
- [ ] 热点落在器官上，不是飘在体外（坐标来自 `anatomy-hotspots.ts`，飘了就是被改过）
- [ ] 页脚和 `/method` 页能看到署名，文本照 `starter-assets/ATTRIBUTION-3D.md`
- [ ] **12 个热点，12 条内容都能打开**——点进去不能有 404（内容已备齐，见 `content-pack/organs/`）

---

## 8 五个坑，按踩到的概率排序

1. **模型空着不出来，但页面不报错。** 99% 是 `meshoptDecoderLocation` 没设，或者 `public/meshopt/meshopt_decoder.js` 没放进去，或者放的是 1.3.0+ 的 ESM 版本。**这是本项目第一号坑**，因为它的现象是"什么都不发生"，最难联想。排查顺序：Network 面板里 `meshopt_decoder.js` 是不是 200 → 拼的路径是不是 `/meshopt/meshopt_decoder.js` → 文件头是不是 UMD（末尾有 `self.MeshoptDecoder = MeshoptDecoder`）。
2. **把原始 OBJ / FBX / 源 GLB 提交进 Git。** 一个器官几十 MB，仓库直接废掉，之后每次都慢。`.gitignore` 先写好再动手：`raw/`、`*.obj`、`*.fbx`、`*.blend`。`public/models/` 只放 `body.glb`。
3. **`customElements is not defined`。** 原因是 `model-viewer` 被服务端渲染了。只动态 import，别静态 import。
4. **`The node to be removed is not a child of this node`。** 你把 `<model-viewer>` 的子元素做成了条件渲染。model-viewer 会把 slotted 节点搬进 shadow DOM，React 再删就找不到。热点列表必须是模块级常量（§4.2 第 5 点）。
5. **模型躺着或者左右反。** 只有走 B 路线（自己建）才会踩。走 A 路线用现成 GLB，这个坑不存在。

---

## 9 给 Cline 的提示词（T14）

**先确认这三样已经在仓库里**（缺一样就别让 Cline 开始，它只会瞎猜）：

- [ ] `public/models/body.glb`（2.79 MB，从 `starter-assets/models/` 复制）
- [ ] `public/meshopt/meshopt_decoder.js`（约 30 KB，按 `starter-assets/README.md` §2 下载）
- [ ] `src/data/anatomy-hotspots.ts`（从 `starter-assets/` 复制过去的）

**然后粘这段：**

```text
任务：给首页加三维器官入口，只做导航，不承载任何医学内容。

【已有资产，不要重新生成、不要去找新模型、不要合并文件】
- public/models/body.glb
  这是一个已经合并好的单文件，里面有 11 个器官（心、脑、肺、肝、肾、胃、脾、胆、
  小肠、大肠、膀胱），共 443 个网格、579 个节点。文件是 meshopt 压缩的。
  你不需要、也不要试图用 gltf-transform 或其他工具重新合并或重新压缩它。
- public/meshopt/meshopt_decoder.js
  meshopt 解码器（UMD 版）。缺了它模型不显示，而且不报错。
- src/data/anatomy-hotspots.ts
  已导出 HOTSPOTS（12 个热点，带 organ / label / system / position / tier）、
  hotspotsFor()、hotspotsByTier()，以及三个机位常量 VIEW_ORBIT、
  WHOLE_BODY_ORBIT、WHOLE_BODY_TARGET。
  坐标是这个模型文件里的世界坐标，已经逐个复算过，**不要改任何一个数值**，
  也不要在 Blender 里核对，也不要自己算。

【只改这些文件】
- 新增 src/components/organ-viewer.tsx
- 新增 src/types/model-viewer.d.ts
- 修改 src/app/page.tsx（首屏右侧放组件；移动端放到首屏文字下方）
- 修改 package.json（只加一个依赖：@google/model-viewer）

【组件要求】
1. "use client"。@google/model-viewer 只能在 useEffect 里 await import()，
   写文件顶部会让服务端执行，报 customElements is not defined。
2. **import 之后、setState 之前**，必须有一行：
   ModelViewerElement.meshoptDecoderLocation = "/meshopt/meshopt_decoder.js";
   这一行不能省、不能改写、不能挪到别处。省了整个三维是空的，且不报错。
3. src 写死 "/models/body.glb"（只有一个文件）。
4. 把 HOTSPOTS 全部 12 个渲染成热点，不要按 system 过滤：
   <Link slot={`hotspot-${i}`} data-position={h.position}
         data-normal={h.normal ?? "0m 0m 1m"} href={`/chain?organ=${h.organ}`}>
   slot 是字符串，从 0 开始连续。
   **热点列表必须是模块级常量直接 map，不许对子元素做条件渲染**，
   否则 React 删除时会报 "not a child of this node"。
5. 组件外部（<model-viewer> 外面）放一排按钮："整体" + 每个器官一个。
   点击时只改两个属性的值，不要重建元素：
   camera-target = 该器官的 position（"整体"用 WHOLE_BODY_TARGET）
   camera-orbit  = 该器官用 VIEW_ORBIT（"整体"用 WHOLE_BODY_ORBIT）
   再加 interpolation-decay="120" 让镜头平滑过去。
6. 文字先渲染，模型后加载。不允许整页等待模型。
7. 失败回退到 /art/whole-body.png，不能留白：
   无 WebGL（创建 canvas 试 getContext("webgl2")）、模型 error 事件、5 秒超时。
8. 尊重 prefers-reduced-motion：关掉 auto-rotate，保留手动旋转。
9. 组件下方固定一行小字：三维示意，仅用于导航；结构与比例经简化，不作为解剖依据。
10. 三维高度不超过 60vh，不能占满全屏，不能让手机整页手势被模型吃掉
    （touch-action: pan-y）。

【不要做】
- 不要引入 three.js / @react-three/fiber / 任何动画库 / 任何 UI 组件库。
- 不要改 /chain 页面、任何 src/content 下的文件、任何 API 路由。
- 不要下载新的模型，不要调用任何外部 API。
- 不要把模型文件改成 base64 内联，就从 /models/ 读。
- 不要给 <model-viewer> 加任何我自己没要求的属性和插件。

【先做】先列出你打算改哪几行、page.tsx 里插在什么位置，等我确认后再动手。
```

**做完以后，把这段发给 Cline 自检**（它经常"看起来改完了"但漏了降级和那行解码器）：

```text
读你刚改的 src/components/organ-viewer.tsx，逐条回答：
1. model-viewer 是在 useEffect 里动态 import 的吗？贴出那几行。
2. meshoptDecoderLocation 那一行在哪？贴出它前后各一行，说明它为什么在 setState 之前。
3. 12 个热点是不是直接 map 的模块级常量？有没有任何条件渲染包着它们？贴出来。
4. 点器官按钮时代码改了哪些属性？贴出来。有没有重建 <model-viewer> 元素？
5. 无 WebGL 时代码走哪条分支？贴出来。5 秒超时是怎么实现的？
6. 有没有任何地方写死了 "three" 或 "react-three-fiber"？
不要改代码，只回答。
```

---

## 10 如果三天压缩版怎么办

三维**第一个砍**，换成静态图。理由：它加分但不承载论证，砍掉不影响作品成立。砍的顺序在 P2 §6.3 里已经排好，不必重新讨论。

不过先看一下：走 A 路线（§2.4）只花 1.5 天，其中资产那半天几乎省掉了。**把它挤到 1.5 天以内，通常比砍掉它划算。**
