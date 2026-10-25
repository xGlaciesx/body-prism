# Body Prism 项目规则

## 项目
人体棱镜 Body Prism：AI 驱动的身体信息三镜图谱。
三种读法：结构之镜、关系之镜、信息之镜。
目标：2026 传智杯 AI WEB 网页开发挑战赛。
团队：2 人，大一新生。

## 技术栈
- Next.js App Router + TypeScript strict
- Tailwind CSS + shadcn/ui
- React Three Fiber + three.js（第二阶段才装）
- Vercel AI SDK（第二阶段才装）
- Zod
- npm

## 终端
- 两台开发机：Windows 11 + Windows PowerShell 5.1（女孩），macOS 27 Golden Gate + zsh（男孩）。
- Windows PowerShell 5.1 不支持 `&&`；需要连续执行时，一次只给一条命令。
- 不要默认给 `tail`、`head`、`sed`、`awk`、`grep`；必须用时同时给 PowerShell 等价写法。
- 路径统一用 `/`；Windows 绝对路径用 `$env:USERPROFILE`。
- 不执行 `rm -rf`、`git reset --hard`、`git push --force`；要删除先说明影响。
- 不读取、不打印 `.env.local` 或任何环境变量。

## 目录
- src/app：页面与路由
- src/components：组件
- src/content/organs：器官内容（先本地 TS 文件）
- src/lib：schema、内容读取、工具函数
- public：图片、模型
- docs：团队手册、日志、决策

## 编码规则
- 默认 Server Component；只有需要状态、事件、浏览器 API、3D 时才写 `"use client"`。
- 不擅自新增依赖；先说明理由和替代方案，等确认。
- 所有外部输入用 Zod 校验。
- 不用 `any`；未知类型用 `unknown` 再收窄。
- 文件名、变量名用英文；面向用户的中文放内容文件或常量里。
- 样式用 Tailwind；不在组件里写大段 CSS。
- 每个页面要有 loading、empty、error 三态。

## AI 规则
- 所有模型调用放在服务端（route handler 或 server action）。
- 密钥只从 `process.env` 读取；不打印；不写进前端。
- 模型输出必须符合 schema；解析失败要有回退。
- 回答必须带 claim/source 引用；没有来源就明说“知识库暂无可靠来源”。
- 不做诊断、不开药、不给剂量；遇到急症红旗先建议就医。
- 中医内容标“传统理论”；信息论内容标“概念类比”。
- 不把假说写成共识；证据等级 A/B/C/D 要标清楚。

## Git
- 不直接 push main；开分支 + PR。
- commit 类型：feat / fix / docs / content / art / test / chore。
- 提交前跑 `npm run lint` 和 `npm run build`。
- 不提交 `.env.local`、`node_modules`、`.next`、原始 OBJ/PSD/Procreate 文件。
- 不对 main 使用 `git push --force`。

## 会话协议
- 用户说 `start` / `开始`：
  1. 读 AGENTS.md、README.md、docs/SESSION_LOG.md 最后 3 条；
  2. 运行 `git status` 和 `git branch --show-current`；
  3. 用 5 行以内复述：当前分支、上次做到哪、今天目标；
  4. 给不超过 3 步的计划，等用户确认后再改代码。
- 用户说 `stop` / `今天结束`：
  1. 停止新功能；
  2. 更新 docs/SESSION_LOG.md（做了什么、改了哪些文件、没做完什么、明天第一件事）；
  3. 建议 commit message，但不自动 commit / push；
  4. 提醒用户分别运行 `npm run lint` 和 `npm run build`。
- 用户说 `plan` / `讨论明天`：
  - 只讨论，不改文件；输出明天的 3 件事和风险。
- 记忆分三层：AGENTS.md（长期规则）、docs/DECISIONS.md（已定决策）、docs/SESSION_LOG.md（每天进展）。
- 不把密钥、隐私、患者信息写进任何记忆文件。

## 给 AI 的回答要求
- 改代码前先给计划：要改哪些文件、为什么、风险是什么。
- 一次只做一个功能。
- 改完解释关键代码，假设读者是大一新生。
- 不确定就问，不要编 API、字段、医学结论。
- 不要为了让代码跑起来而删除测试或吞掉错误。