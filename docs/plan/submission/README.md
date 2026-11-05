# 参赛材料包 · 使用顺序

> 大赛要求五类材料：代码仓库、演示视频、技术文档、在线演示（可选）、提交注意事项。
> 这里给出可直接用的模板与清单，按下面顺序做。

| 顺序 | 文件 | 什么时候用 | 产出 |
|---|---|---|---|
| 1 | `README-template.md` | 功能基本完成后 | 复制到仓库根目录，替换占位符 |
| 2 | `TECH-DOC.md` / `人体棱镜-技术文档.pdf` | 提交前一周 | 技术文档，≤30 页 |
| 3 | `DEMO-VIDEO-SCRIPT.md` | 录视频前 | 5–8 分钟成片 |
| 4 | `DEPLOY-ONLINE-DEMO.md` | 提交前 3 天 | 公网演示地址 |
| 5 | `SUBMISSION-CHECKLIST.md` | 全程 | 逐项打勾，双人复核 |

## 三条硬要求

1. **仓库里不能有密钥**：只提交 `.env.example`；提交前跑 `git grep -n "sk-"`，必须无输出；
2. **Git 历史要像真做的**：按切片提交，不要最后一天一次性上传；
3. **提交后不能改**：先打 tag `v1.0-submit`，记下 commit SHA，再点提交。

## 需要替换的占位符

- `README-template.md` 里的 `your-demo.vercel.app`、视频链接、指导老师；
- `TECH-DOC.md` 里的团队姓名与日期（如与实际不符）；
- `SUBMISSION-CHECKLIST.md` §6 的表单信息。
