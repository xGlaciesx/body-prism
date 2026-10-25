# 现成素材、竞赛参考与行业资源库

> 读者：要在一周内把视觉做出来、又不想侵权的两个人。
> 原则：**能用的现成资源就用，但每一张图都要能说清来源和授权。**
> 配套：AIGC 生产流程看 **03**，页面设计看 **07**，信息论扩展看 **12**。

---

## 0. 先看使用规则

### 0.1 四种授权，四种用法

| 授权 | 能不能商用 | 要不要署名 | 能不能改 | 备注 |
|---|---|---|---|---|
| CC0 / Public Domain | 可以 | 不强制 | 可以 | 最省心 |
| CC BY | 可以 | **必须** | 可以 | 比赛作品也要署名 |
| CC BY-SA | 可以 | 必须 | 可以，但衍生作品要同协议 | 传染性，慎用 |
| CC BY-NC | 通常不可以商用 | 必须 | 可以 | 比赛是否算商用要看规则，建议避开 |
| 保留所有权利 | 不可以 | 不适用 | 不可以 | 只能看，不能复制 |

> **“网上能搜到”不等于“能拿来用”。** Google 图片、Pinterest、小红书、论文插图，默认都不是免费素材。

### 0.2 三条铁律

1. **先看授权页，再下载。** 不要等做完才发现不能用。
2. **不确定就不用。** 少一张图不会输，侵权会。
3. **AIGC 也要记录。** 工具、提示词、日期、后处理，写进 `docs/art-provenance.md`。

### 0.3 统一署名格式

在页面底部或“方法与来源”页集中署名：

```text
本作品使用的部分 3D 数据来自 BodyParts3D, © The Database Center for Life Science,
licensed under CC Attribution 4.0 International.
部分医学插画来自 Servier Medical Art (https://smart.servier.com/),
licensed under CC BY 4.0.
```

每一张图在文件旁也要留一条记录：

```text
文件名：heart-plate-01.png
来源：BodyParts3D / Servier / 原创 / AIGC
授权：CC BY 4.0
署名：……
处理：Blender 渲染 + Photoshop 调色
日期：2026-10-21
```

---

## 1. 医学与解剖素材

| 资源 | 内容 | 授权 | 怎么用 | 链接 |
|---|---|---|---|---|
| BodyParts3D | 全身器官 3D 网格，可按解剖概念拆分 | CC BY 4.0 | 下载 OBJ，Blender 清理/渲染，导出 GLB | https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html |
| BodyParts3D 许可页 | 官方授权说明 | CC BY 4.0 | 署名依据 | https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html |
| Servier Medical Art | 医学插画、器官示意图 | CC BY 4.0 | 直接用于科普页，需署名 | https://smart.servier.com/ |
| OpenStax Anatomy & Physiology | 开放教科书，含插图 | CC BY 4.0 | 文字参考、部分图可用（逐图核对） | https://openstax.org/details/books/anatomy-and-physiology-2e |
| NIH 3D | 生物医学 3D 模型 | 逐个看（Public Domain / CC BY） | 下载前看每个模型的许可 | https://3d.nih.gov/ |
| Wikimedia Commons | 大量解剖图、历史图 | 逐图看（CC BY / CC BY-SA / PD） | 必须点开文件页看许可 | https://commons.wikimedia.org/ |
| Zygote Body | 3D 人体浏览器 | 仅参考 | 看交互和分层思路，不复制模型 | https://www.zygotebody.com/ |
| BioDigital Human | 3D 人体平台 | 仅参考/付费 API | 看产品设计，不盗用资产 | https://www.biodigital.com/ |
| Visible Body | 解剖学习产品 | 仅参考 | 看信息架构 | https://www.visiblebody.com/ |
| Complete Anatomy | 3D 解剖学习 | 仅参考 | 看图层和标注方式 | https://3d4medical.com/ |
| MSD Manuals | 医学参考 | 文字参考 | 不复制图片 | https://www.msdmanuals.com/ |
| MedlinePlus | 面向公众的健康信息 | 文字参考 | 不复制图片 | https://medlineplus.gov/ |

### 1.1 BodyParts3D 的正确署名

官方要求：

```text
BodyParts3D, © The Database Center for Life Science licensed under
CC Attribution 4.0 International
```

学术引用：

```text
Mitsuhashi, N., et al. (2009). BodyParts3D: 3D structure database for
anatomical concepts. Nucleic Acids Research, 37(Database issue), D782–D785.
https://doi.org/10.1093/nar/gkn613
```

### 1.2 使用 BodyParts3D 的常见坑

- OBJ 文件很大，不要直接进 Git；先减面、压缩成 GLB；
- 器官命名是英文/拉丁文，需要自己映射到中文；
- 原始网格可能需要清理（重复点、法线、材质）；
- 不要声称“我们建模的”，要写“基于 BodyParts3D 数据渲染”。

---

## 2. 3D、纹理与环境

| 资源 | 内容 | 授权 | 注意 | 链接 |
|---|---|---|---|---|
| Poly Haven | HDR 环境、材质、模型 | CC0 | 最适合做 3D 背景光 | https://polyhaven.com/ |
| ambientCG | PBR 材质 | CC0 | 纹理质量高 | https://ambientcg.com/ |
| Sketchfab | 大量 3D 模型 | 逐个看，可筛选 CC | 下载前确认许可 | https://sketchfab.com/ |
| Three.js Examples | 官方示例 | MIT | 学相机、灯光、后处理 | https://threejs.org/examples/ |
| glTF Sample Models | 标准测试模型 | 逐个看 | 测试加载器 | https://github.com/KhronosGroup/glTF-Sample-Models |
| Blender | 免费 3D 软件 | GPL | 清理、减面、渲染 | https://www.blender.org/ |

### 2.1 3D 资产的处理流程

```text
BodyParts3D OBJ
  → Blender 导入
  → 删除无关部件、合并、减面
  → 修正法线、材质
  → 导出 GLB（Draco 压缩）
  → 放 public/models/
  → R3F 加载
```

**不要**把原始 OBJ、PSD、Blend 文件提交进 Git。原始素材放网盘或 `raw/`（已在 `.gitignore`）。

---

## 3. UI、图标、插画、字体、配色

| 类型 | 资源 | 授权 | 用途 | 链接 |
|---|---|---|---|---|
| UI 组件 | shadcn/ui | MIT | 复制源码，改样式 | https://ui.shadcn.com/ |
| 无头组件 | Radix UI | MIT | 弹窗、下拉、标签页 | https://www.radix-ui.com/ |
| 图标 | Lucide | ISC | 统一线性图标 | https://lucide.dev/ |
| 图标 | Heroicons | MIT | Tailwind 配套 | https://heroicons.com/ |
| 插画 | unDraw | 免费可商用（以官网为准） | 空状态、介绍页 | https://undraw.co/ |
| 插画 | Storyset | 免费需署名 | 人物场景 | https://storyset.com/ |
| 字体 | Google Fonts | OFL/Apache 等 | Noto Serif SC / Noto Sans SC | https://fonts.google.com/ |
| 配色 | Radix Colors | MIT | 可访问性好的色阶 | https://www.radix-ui.com/colors |
| 配色 | Coolors | 工具免费 | 生成配色灵感 | https://coolors.co/ |
| 配色 | Happy Hues | 工具免费 | 看配色在真实页面里的效果 | https://www.happyhues.co/ |
| 动效 | LottieFiles | 逐个看 | 加载、空状态 | https://lottiefiles.com/ |
| 动效 | Rive | 免费层 | 交互式动画 | https://rive.app/ |

### 3.1 设计系统的最小集合

不要一开始就建庞大的设计系统。先定 6 个东西：

```text
1. 主色 1 个 + 辅色 2 个 + 中性色 5 档
2. 字体 2 个：标题衬线、正文无衬线
3. 间距 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64
4. 圆角 8 / 12 / 16 / 999
5. 阴影 1 档（不要多种）
6. 动效 150ms / 250ms 两档
```

你们已有的“纸感 + 三镜色”方向，可以直接落成 CSS 变量。

---

## 4. 数据与权威信息

做“争议地图”“证据等级”“流行病学数据”时，优先用这些来源：

| 来源 | 内容 | 授权/注意 | 链接 |
|---|---|---|---|
| WHO | 全球健康主题、事实清单 | 引用，不复制图 | https://www.who.int/ |
| IHME GBD | 全球疾病负担数据 | 引用，注意版本 | https://www.healthdata.org/research-analysis/gbd |
| Our World in Data | 可视化数据，很多可下载 | 逐图看 CC BY | https://ourworldindata.org/ |
| 国家卫生健康委 | 中国卫生政策、统计 | 引用 | http://www.nhc.gov.cn/ |
| 中国统计年鉴 | 人口、卫生、经济数据 | 引用 | https://www.stats.gov.cn/sj/ndsj/ |
| NICE | 英国临床指南 | 引用，不复制 | https://www.nice.org.uk/ |
| 中华医学会 | 中国临床指南 | 引用，注意版权 | https://www.cma.org.cn/ |

**论文图表默认不能直接复制。** 大多数期刊要求授权，CC BY 的开放获取论文才可能可用，且仍需署名。拿不准就自己做图。

---

## 5. 竞赛与同类产品参考

### 5.1 传智杯官方入口

| 用途 | 链接 |
|---|---|
| 大赛官网 | https://www.boxuegu.com/match/ |
| 报名入口 | http://dasai.ityxb.com/ |
| 西安交大教务处通知（校内） | http://jwc.xjtu.edu.cn/info/1172/10505.htm |

> 2026 年是第九届，全称“全国大学生计算机应用能力与数字素养大赛暨 2026 第九届传智杯全国大学生数智创新与AI应用大赛”。省赛一般在 11 月，国赛在 12 月。**具体时间、赛道规则、提交格式，以官网和校内通知为准**，不要只信二手信息。

### 5.2 同类产品：看它们怎么讲身体

| 产品 | 特点 | 可以学什么 | 链接 |
|---|---|---|---|
| BioDigital Human | 3D 人体、分层、标注 | 图层、器官聚焦、交互 | https://www.biodigital.com/ |
| Visible Body | 解剖学习、动画 | 信息分层、学习路径 | https://www.visiblebody.com/ |
| Zygote Body | 浏览器 3D 人体 | 轻量 3D 交互 | https://www.zygotebody.com/ |
| Complete Anatomy | 高精度 3D、课程 | 视觉质量、标注体系 | https://3d4medical.com/ |
| Kenhub | 解剖图 + 测验 | 图文结合、练习 | https://www.kenhub.com/ |
| Osmosis | 医学学习视频 | 短视频叙事 | https://www.osmosis.org/ |
| Innerbody | 人体系统图 | 大众科普的表达 | https://www.innerbody.com/ |
| Healthline Body Maps | 身体部位图 | 信息架构 | https://www.healthline.com/human-body-maps |

**注意：** 这些产品都受版权保护。可以看交互、信息架构、叙事方式，**不要复制图片、模型、文案**。

### 5.3 设计灵感

| 资源 | 看什么 | 链接 |
|---|---|---|
| Awwwards | 年度优秀网站，看排版和动效 | https://www.awwwards.com/ |
| Godly | 高质量网站收录 | https://godly.website/ |
| Dribbble | UI 细节、配色 | https://dribbble.com/ |
| Behance | 完整项目叙事 | https://www.behance.net/ |
| CodePen | 可运行的交互 demo | https://codepen.io/ |
| Frontend Mentor | 真实设计稿练习 | https://www.frontendmentor.io/ |
| Information is Beautiful | 信息可视化叙事 | https://informationisbeautiful.net/ |
| Pudding | 数据新闻的滚动叙事 | https://pudding.cool/ |
| NYT Graphics | 交互图表 | https://www.nytimes.com/section/graphics |
| Reuters Graphics | 新闻可视化 | https://graphics.reuters.com/ |

### 5.4 科学传播

| 资源 | 特点 | 链接 |
|---|---|---|
| Quanta Magazine | 数学、物理、生物深度科普 | https://www.quantamagazine.org/ |
| Aeon | 哲学、科学、文化长文 | https://aeon.co/ |
| Nautilus | 科学与人文学交叉 | https://nautil.us/ |
| 果壳 | 中文科普 | https://www.guokr.com/ |
| 知识分子 | 中文科学传播 | https://www.zhishifenzi.com/ |
| 返朴 | 物理、数学、科学史 | https://www.fpku.org/ |

---

## 6. 开源项目：可以借鉴的代码与结构

| 项目 | 能学什么 | 许可 | 链接 |
|---|---|---|---|
| Vercel AI Chatbot | Next.js + AI SDK 的完整聊天应用 | Apache/MIT（看仓库） | https://github.com/vercel/ai-chatbot |
| Next.js Examples | 官方示例集合 | MIT | https://github.com/vercel/next.js/tree/canary/examples |
| Supabase | 数据库、Auth、RLS 示例 | Apache 2.0 | https://github.com/supabase/supabase |
| React Three Fiber | 3D 场景与示例 | MIT | https://github.com/pmndrs/react-three-fiber |
| shadcn/ui | 组件源码 | MIT | https://github.com/shadcn-ui/ui |
| Three.js | 3D 底层与示例 | MIT | https://github.com/mrdoob/three.js |
| BodyParts3D 克隆 | 模型文件整理 | 看仓库说明 | https://github.com/Kevin-Mattheus-Moerman/BodyParts3D |

### 6.1 借鉴的边界

- **可以**：看目录结构、学写法、用 MIT/Apache 代码（保留许可）；
- **不可以**：把别人的项目改个名字提交；
- **必须**：在 README 里写清参考了哪个项目、用了什么许可；
- **比赛要求**：代码要能解释。你抄来的部分，必须能讲懂。

---

## 7. 比赛交付物参考

### 7.1 README 结构

```md
# 人体棱镜 Body Prism

> 同一具身体，三种读法。

## 是什么
## 为什么做
## 在线地址 / 演示视频
## 截图
## 技术栈
## 本地运行
## 项目结构
## 三镜方法
## 证据等级
## AI 使用说明（模型、RAG、成本）
## AIGC 声明
## 数据与素材来源
## 团队分工
## 已知限制
## License
```

### 7.2 3 分钟 Demo 视频脚本

| 时间 | 内容 |
|---|---|
| 0:00–0:20 | 一句话：身体不只有一种读法 |
| 0:20–0:50 | 首页 + 身体地图，点心脏 |
| 0:50–1:30 | 三镜切换：结构 / 关系 / 信息 |
| 1:30–2:10 | 信息负荷实验室：一个交互 |
| 2:10–2:40 | AI 策展人：带引用的回答 |
| 2:40–3:00 | 方法与证据等级、团队分工、结束 |

**录屏前：** 用缓存数据，避免现场等 API；把浏览器缩放调到 100%；关掉通知。

### 7.3 12 页 PPT 结构

```text
1. 封面
2. 问题：身体被单一视角解释
3. 洞察：同一具身体，三种读法
4. 产品：三镜 + 证据层
5. 演示：身体地图
6. 演示：器官页三镜
7. 亮点：信息负荷实验室
8. 亮点：AI 策展人（带引用）
9. 方法：证据等级与争议地图
10. 技术架构与成本控制
11. 协作：Git 历史、分工、Review
12. 总结与展望
```

### 7.4 答辩 5 问

1. 你们和现有解剖 App 有什么区别？
2. 中医内容怎么保证不误导？
3. AI 会不会胡说？怎么控制？
4. 两个人怎么协作？代码是谁写的？
5. 如果给你更多时间，下一步做什么？

每个答案准备 30 秒版本，不要背稿，讲人话。

---

## 8. 版权速查表

| 素材 | 能不能用 | 条件 |
|---|---|---|
| BodyParts3D | 能 | CC BY 4.0，署名 |
| Servier Medical Art | 能 | CC BY 4.0，署名 |
| OpenStax | 能 | CC BY 4.0，逐图核对 |
| Wikimedia Commons | 看单图 | 点开文件页看许可 |
| Poly Haven / ambientCG | 能 | CC0 |
| Sketchfab CC 模型 | 看单模型 | 下载页看许可 |
| Google 图片 | 不能默认 | 找到原始授权才行 |
| Pinterest / 小红书 | 不能默认 | 多数是转载，无授权 |
| DK / 国家地理 / 图库 | 不能 | 保留所有权利 |
| 论文插图 | 通常不能 | 需出版社授权；CC BY 论文也要署名 |
| AI 生成图 | 看平台条款 | 记录工具、提示词；避免模仿在世艺术家 |
| 比赛 Logo / 往届作品 | 不能 | 除非官方明确允许 |

### 8.1 常见误区

- “我改了颜色就不算侵权” → 改编仍可能侵权；
- “没加水印就能用” → 水印不是授权；
- “教学用途就可以” → 比赛是公开作品，不等于课堂教学例外；
- “AI 生成的就没有版权” → 平台条款、训练数据、风格模仿都有风险；
- “注明来源就可以” → 署名是条件之一，不是万能通行证。

---

## 9. AIGC 来源记录模板

新建 `docs/art-provenance.md`：

```md
# AIGC 与素材来源记录

| 文件 | 类型 | 工具/来源 | 提示词/原始链接 | 日期 | 处理后 | 授权/署名 |
|---|---|---|---|---|---|---|
| heart-plate-01.png | AIGC | Midjourney v7 | "anatomical heart, paper-cut style, ..." | 2026-10-20 | Photoshop 调色 | 平台商用条款 |
| brain-glow.glb | 3D | BodyParts3D | 原始 OBJ | 2026-10-21 | Blender 减面 | CC BY 4.0 |
| liver-icon.svg | 图标 | Lucide | `activity` 图标改造 | 2026-10-21 | 改色 | ISC |
```

**答辩时，这张表比任何解释都更有说服力。**

---

## 10. 资源总表（按用途）

| 我要…… | 先去 |
|---|---|
| 找 3D 器官 | BodyParts3D、NIH 3D |
| 找医学插画 | Servier Medical Art、OpenStax |
| 找 3D 背景/材质 | Poly Haven、ambientCG |
| 找图标 | Lucide、Heroicons |
| 找插画 | unDraw、Storyset |
| 找 UI 组件 | shadcn/ui、Radix |
| 找字体 | Google Fonts |
| 找配色 | Radix Colors、Coolors |
| 找交互灵感 | Awwwards、CodePen、Pudding |
| 看同类产品 | BioDigital、Visible Body、Zygote Body |
| 查比赛信息 | 传智杯官网、校内通知 |
| 查医学信息 | WHO、MSD Manuals、MedlinePlus |
| 查数据 | Our World in Data、IHME GBD、国家卫健委 |
| 学开源实现 | Vercel AI Chatbot、Next.js Examples、R3F |

---

## 11. 一页清单

```text
下载前：看授权页
使用前：存来源、存许可、存署名
提交前：确认没有大文件、没有密钥、没有未授权图
发布前：页面底部统一署名 + AIGC 声明
答辩前：能说出每张图从哪来
```

> **素材是借来的，作品要是自己的。**
> 借来的图可以撑场面，自己的方法、内容和协作历史才是评委记住你的原因。
