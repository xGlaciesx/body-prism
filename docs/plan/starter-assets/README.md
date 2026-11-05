# 三维资产怎么用（复制两个文件，不用建模、不用下载）

> 配套 **D17 · §2.6**。这一页只办一件事：**把 11 个器官的三维模型放进你们的项目，让它能转、能点、能飞近。**

---

## 0 你要的东西已经在这个文件夹里

**模型是合并好的，不用你们合并。** 就在下面这个位置：

```text
starter-assets/
├─ models/
│  └─ body.glb              ← 2.79 MB，11 个器官 / 12 个热点，已合并、已验证
├─ anatomy-hotspots.ts      ← 12 个热点的坐标，复制到 src/data/
└─ ATTRIBUTION-3D.md        ← 署名文本，抄进 ATTRIBUTION.md 和 /method 页
```

`body.glb` 里有什么：

| 项 | 值 |
|---|---|
| 体积 | 2,794,276 字节（2.79 MB） |
| 器官 | 11 个：心、脑、肺、肝、肾、胃、脾、胆、小肠、大肠、膀胱 |
| 网格 / 节点 | 443 / 579 |
| 压缩 | meshopt，1,054 个压缩块 |
| 坐标 | 人体真实比例，单位米，+Y 朝上，人体右侧在 −X |

**为什么只有一个文件**：`<model-viewer>` 一次只能加载一个 GLB。11 个器官分散在 4 个文件里时，"心—小肠""肺—大肠"这些表里配对永远不可能同屏（D17 §2.6.6）。合并之后，12 个热点一屏全显示，点哪个飞哪个。

---

## 1 复制进项目（三步，2 分钟）

```text
你的项目/
├─ public/
│  ├─ models/
│  │  └─ body.glb            2.79 MB   ← 从本目录 models/ 复制
│  └─ meshopt/
│     └─ meshopt_decoder.js  约 30 KB  ← 命令下载，见 §2
└─ src/
   └─ data/
      └─ anatomy-hotspots.ts            ← 从本目录复制（热点坐标，已算好）
```

下面的路径按 **P2 §0.4 的约定**：整个文档包放在项目的 `docs/plan/` 下。如果你把它放在别处，把 `docs/plan` 换成实际路径。

Windows PowerShell：

```powershell
New-Item -ItemType Directory -Force -Path public\models, public\meshopt, src\data | Out-Null
Copy-Item docs\plan\starter-assets\models\body.glb      public\models\body.glb
Copy-Item docs\plan\starter-assets\anatomy-hotspots.ts  src\data\anatomy-hotspots.ts
```

macOS / Linux：

```bash
mkdir -p public/models public/meshopt src/data
cp docs/plan/starter-assets/models/body.glb      public/models/body.glb
cp docs/plan/starter-assets/anatomy-hotspots.ts  src/data/anatomy-hotspots.ts
```

三件事：

1. **`public/models/` 要进 Git**。它是最终产物，不是原始素材——`public/` 下的文件会原样提供，所以 `/models/body.glb` 这个路径能直接访问。
2. **`anatomy-hotspots.ts` 的坐标一个都不要改。** 这 12 个值是从 `body.glb` 里逐个网格解码、按节点变换算出来的世界坐标（D17 §2.5.8），改一个就飘。
3. **不要**把源 GLB（`visceral.glb` 那四个）放进 `public/`。它们是合并前的原料，放了只是让包体变大。

---

## 2 还差一个文件：meshopt 解码器（漏了模型根本不出现）

`body.glb` 是 **meshopt 压缩**的，`<model-viewer>` **默认不解**。而且它不报错、不红屏——就是**空着不出来**。这是本项目第一号坑。

```bash
mkdir -p public/meshopt
curl -L -o public/meshopt/meshopt_decoder.js \
  https://cdn.jsdelivr.net/npm/meshoptimizer@0.24.0/meshopt_decoder.js
```

```ts
// 在 useEffect 里，动态 import 之后、创建 <model-viewer> 之前
const { ModelViewerElement } = await import("@google/model-viewer");
ModelViewerElement.meshoptDecoderLocation = "/meshopt/meshopt_decoder.js";
```

**版本必须是 0.24.0。** meshoptimizer 从 1.3.0 起只发 ESM 版（`.mjs`），而 model-viewer 是用 `<script src>` 去加载这个地址的，ESM 文件会直接语法报错。别去 npm 上抓"最新版"替换。

完整原理、三个坑和排查顺序在 **D17 §2.6.3**。

---

## 3 核对：有没有放对

```bash
ls -l public/models/body.glb public/meshopt/meshopt_decoder.js
```

| 文件 | 应该约等于 |
|---|---|
| `body.glb` | 2,794,276 字节 |
| `meshopt_decoder.js` | 25,000–35,000 字节（不同镜像略有差异） |

再验一次文件头（最准）：

```bash
head -c 4 public/models/body.glb     # 应该输出 glTF
```

**跑起来之后**，最快的验收是：模型出来了、能转、点器官按钮镜头飞过去。
如果**页面没报错但模型不出现**，按这个顺序查：`meshopt_decoder.js` 的 Network 状态是不是 200 → 代码里那行地址是不是 `/meshopt/meshopt_decoder.js` → 文件末尾是不是有 `self.MeshoptDecoder = MeshoptDecoder`（这是 UMD 版的标志）。

---

## 4 备用：只有要加/减器官时，才需要重新合并

**默认不做这一步。** 交付的 `body.glb` 就是最终文件，加不了东西也删不了东西——这正是它可靠的原因。
只有两种情况才需要动手：想加一个新器官（比如胰），或者删掉某个器官。

那时才去上游仓库：`https://github.com/aaron603/body-prism`（公开，网页点几下就下，不用 Git）。

| 要下的文件 | 用途 |
|---|---|
| `visceral.glb`（864 KB） | 消化、呼吸、泌尿器官 |
| `cardiovascular.glb`（280 KB） | 心脏、大血管 |
| `nervous.glb`（1.5 MB） | 脑、脊髓、周围神经 |
| `lymphoid.glb`（80 KB） | 脾、胸腺——**脾只在这里**，漏了它就没有脾 |
| `manifest.json`（23 KB） | 每个结构的三角面数和包围盒，重算热点位置要用 |

四个 GLB 合计 2,792,172 字节，合并后的 `body.glb` 是 2,794,276 字节（多出来的 2 KB 是合并时重写的 JSON 头）。

**别点绿色 `Code` → `Download ZIP`**：那会拉 253 MB 的 FBX 源文件，用不上。
`skin.glb`（1.5 MB）和 `skeletal.glb`（1.1 MB）也不要——会超 4 MB 预算，而且肋骨会挡住器官。

**下到哪里**：放到项目外的 `raw/` 目录，**不要进 Git**。`public/models/` 里永远只放一个合并好的 `body.glb`。

**合并怎么做**：不能直接 `gltf-transform merge`（它会把 meshopt 压缩流解开重新序列化，体积、`extensionsRequired`、缓冲布局全变，坐标也不保证）。
正确做法和脚本在 **D17 §2.6.3**，一句话概括：压缩块按字节拼接，跨文件的引用重排成 fallback buffer。

合并完必须做两件事：

1. 用 D17 §2.6.3 的校验脚本把 1,054 个块逐块解一遍（约 2 秒），对得上再放进 `public/`；
2. 热点坐标要重算——`anatomy-hotspots.ts` 末尾的注释里有 `hotspotFromManifest()`，但**只对实心器官准**，肠和血管要取单块节点重算（大肠就是这么处理的）。

如果你只是觉得"合并是不是该我重做一次"——不是，不用。

---

## 5 上游仓库里还有别的可以读的

除了模型，那几样东西值得**读一读**（读，不是照抄）：

| 位置 | 是什么 | 怎么用 |
|---|---|---|
| `public/models/manifest.json` | 每个器官的面数 + 包围盒 | 加新器官时算热点位置（D17 §2.4.6） |
| `pipeline/tools/extract.ts` | 从一个系统的 GLB 里抠出指定器官的脚本 | 想给 `nervous.glb` 减肥时看（脑只占一半，其余是神经线） |
| `pipeline/tools/convert.ts` | FBX → GLB 的完整流程 | **只在走 B 路线自己转换时**看 |
| `src/viewer/AnatomyViewer.ts` | Three.js 的图层、点选、剖面 | 只能当读物。**不要整段搬**，那会推翻你们选的 `model-viewer` |
| `src/content/structures/` | 器官的中英文名对照 | 做热点按钮文字时参考 |

**明确不要碰的**：`pipeline/source/fbx/`（253 MB 源文件）、`src/views/`（Vue 3 页面，跟 Next.js 不兼容）。

---

## 6 许可：用归用，署名要写

模型不是这个仓库原创的，它自己也是从别处来的：

- 模型来自 **Z-Anatomy**（`LluisV/Z-Anatomy`，`PC-Version` 分支），**CC BY-SA 4.0**；
- 几何数据主要源自 **BodyParts3D**（DBCLS）；
- 衍生作品须署名，并以**相同许可**分发 → 你们项目的三维资产部分要标 **CC BY-SA 4.0**。

**这不是"用一下没人管"**：页脚 `/method` 页和 `ATTRIBUTION.md` 里都要写。文本在 `ATTRIBUTION-3D.md`，照抄。

还有两个结构是 **CC BY-NC**（内耳、以及那份单独参考的肾脏模型），仅限非商业，**它们没有被合并进 `body.glb`**——但 `ATTRIBUTION-3D.md` 里那句"未使用任何 CC BY-NC 结构"别删，它是你们自己立的凭据。

**比赛对原创性有没有要求，要跟老师确认一次。** 已经写进 **P3 §七 第 2 条** 和 **P4 的四件事**。如果老师说不行，看下一节。

---

## 7 这个仓库用不了，去哪找替代

D17 §2.1 和 §2.2 有一张完整的表，这里只挑三条最可能用上的：

| 来源 | 地址 | 许可 | 说明 |
|---|---|---|---|
| **BodyParts3D** | `https://lifesciencedb.jp/bp3d/` | **CC BY 4.0**，只需署名，不带 ShareAlike | 官方原始数据。自己下 OBJ 用 Blender 减面，走 D17 §3 的 B 路线 |
| **NIH 3D** | `https://3d.nih.gov/` | 逐条看（多为公有领域 / CC BY） | 许多模型能直接下 GLB，省掉转换 |
| **Servier Medical Art** | `https://smart.servier.com/` | **CC BY 4.0** | 2D 插画，做三维失败时的降级图就用它 |

**Sketchfab**（`https://sketchfab.com/`）也能搜到大量解剖模型，但**必须逐个点开模型页看许可**：只接受 CC0 / CC BY 4.0；带 **NC** 的不用，带 **SA** 的先用 D17 §2.4.3 的账算一遍。

**BioDigital / Visible Body / Complete Anatomy** 是商业产品，只能看设计，一个资产都不要下。

**注意**：如果你们换掉了 `body.glb`，`anatomy-hotspots.ts` 里 12 个坐标**全部作废**，必须按新模型的 §4 第 2 条重算。这是换模型最大的隐性成本。

---

## 8 时间不够怎么办

先做静态图版（`/art/liver.png` 这类），把 T14 的时间让给 T13。**三维是加分项，不是命门。** D17 §10 也说了：砍的顺序里它是第一个。

那时 `body.glb` 和 `meshopt_decoder.js` 都不用放进项目，`public/models/` 整个目录可以不建。
