# 三维资产的署名（A 路线）

> 用了参考项目 `aaron603/body-prism` 的 GLB，就必须写这段。
> **文档包里的 `starter-assets/models/body.glb` 就是那四个 GLB（内脏 / 心血管 / 神经 / 淋巴）的合并版**，署名要求一模一样——改了文件不改许可，别漏。
> 两个地方都要写：**项目根目录的 `ATTRIBUTION.md`** 和**网站页脚**（页脚可以简写，见 §3）。

---

## 1 英文原文（放 ATTRIBUTION.md，不要改）

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

> 上面这段是根据那个仓库 README 的声明整理的。**动手前打开它的 README 或 `ATTRIBUTION` 原文核对一遍**，有出入以原文为准。这一步花两分钟，但它是你唯一能证明"我确实看过"的动作。

---

## 2 中文版（放方法页 `/method` 的"素材许可"一节）

```text
三维解剖模型
本站的三维器官模型基于 Z-Anatomy 项目（CC BY-SA 4.0）整理，几何数据源自
BodyParts3D（© The Database Center for Life Science，DBCLS）。
本站的三维资产以 CC BY-SA 4.0 发布。
本站未使用任何 CC BY-NC 结构（内耳、以及单独的参考肾脏模型）。
```

---

## 3 页脚简写

页脚放不下一整段，用这一行 + 一个链接到 `/method`：

```text
三维模型：Z-Anatomy（CC BY-SA 4.0），几何源自 BodyParts3D（DBCLS）· 详见「方法」
```

页脚必须能点进 `/method`，`/method` 里要有完整版。

---

## 4 还要改一处：README 的许可一节

`submission/README-template.md` 第 11 节现在写的是：

```text
- 代码：MIT
- 文字内容：CC BY-NC-SA 4.0（注明来源与项目名）
- 第三方数据与素材：遵循各自许可，见 ATTRIBUTION.md
```

**内容不用改，但要确认第三条真的指向了 ATTRIBUTION.md，而且 ATTRIBUTION.md 里确实有上面那段。** 如果走了 B 路线（自己从 BodyParts3D 转），就把 §1 那段换成只有 BodyParts3D 的版本，去掉 Z-Anatomy 和 ShareAlike：

```text
3D anatomy models derived from BodyParts3D, © The Database Center for
Life Science licensed under CC Attribution 4.0 International (DBCLS).
```

（B 路线下官方许可页写的是 CC BY 4.0、只需署名、不带 ShareAlike。差别和理由见 D17 §2.4.3。）

---

## 5 检查清单

- [ ] `ATTRIBUTION.md` 里有 §1 那段
- [ ] `/method` 页面有 §2 那段
- [ ] 页脚有 §3 那行，且能点进 `/method`
- [ ] README 许可一节指向了 `ATTRIBUTION.md`
- [ ] 没有把内耳、参考肾脏模型放进 `public/models/`
