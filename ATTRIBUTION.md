# 素材来源与许可

本站对不同类型的内容分别授权。**下面几项互不覆盖**：代码的许可不谈文字，文字的许可不谈三维模型。

---

## 1. 代码

MIT，见 `LICENSE`。

只覆盖 `src/` 下的源代码。不覆盖站内文字、插图与三维资产。

---

## 2. 站内文字与原创插图

CC BY-NC-SA 4.0（署名—非商业性使用—相同方式共享 4.0 国际）。

- 可以转载、引用、改写；
- 必须署名「人体棱镜 Body Prism」并标明来源；
- 不得用于商业目的；
- 改写后的作品须以相同许可分发。

各器官条目引用的教科书与文献见该器官 `sources` 字段，文献本身的版权归原作者与出版方。

---

## 3. 三维解剖模型

仓库里的 `public/models/body.glb` 是本站使用的人体三维资产。它的来源与义务如下：

```text
3D anatomy models
This project includes 3D mesh assets derived from Z-Anatomy
(https://github.com/LluisV/Z-Anatomy, "PC-Version" branch), licensed under
Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
Geometry originates from BodyParts3D, © The Database Center for Life Science
(DBCLS). The 3D assets in this project are distributed under CC BY-SA 4.0.
No CC BY-NC structures (inner ear; the separately referenced kidney model by
Lissie Cowley) are included.
```

中文说明：

- 三维网格基于 **Z-Anatomy**（CC BY-SA 4.0）整理，几何数据源自 **BodyParts3D**（© The Database Center for Life Science，DBCLS，CC BY 4.0）；
- 本站没有从零建模，只做了**选取、合并与压缩**；
- 因为 Z-Anatomy 是 ShareAlike 许可，**本站的三维资产同样以 CC BY-SA 4.0 分发**——你可以拿走 `body.glb` 使用和修改，条件是署名并保持相同的许可；
- 合并所用的四个 GLB 中不含内耳，也不含 Lissie Cowley 的单独参考肾脏模型（CC BY-NC）。这一条依据上游仓库 README 的声明。

**这项许可只覆盖三维资产本身，不影响第 1、2 两节的授权范围。**

---

## 4. AIGC 使用记录

当前版本**没有随仓库分发任何 AIGC 生成的图片**：站内视觉由 Tailwind 样式、SVG 图标与上节的三维模型构成。

如果后续加入 AIGC 图片，必须在 [`docs/aigc-log.md`](docs/aigc-log.md) 逐张登记工具、日期、提示词摘要，并在本文件补上对应条目。

---

## 5. 明确没有使用的东西

- 未使用 DK、医学图库、教材插图、论文配图；
- 未使用任何 CC BY-NC 结构（内耳，以及单独的参考肾脏模型）；
- 未使用患者的任何影像或病历数据。
