# 在线演示部署与评审期保障

> 目标：拿到一个**公网可访问、评审期间稳定、密钥不泄露**的地址。
> 推荐 Vercel；如果访问不稳，用备用方案（见本文 §5）。

---

## 1. 先决条件

- [ ] 代码已合并到 GitHub `main`
- [ ] `npm run build` 本地通过
- [ ] `.env.example` 已提交，`.env.local` 未提交
- [ ] DeepSeek Key 可用，且账户有余额
- [ ] 11 个器官页面都能打开

---

## 2. Vercel 部署（推荐，约 10 分钟）

### 2.1 导入项目

1. 打开 <https://vercel.com>，用 GitHub 账号登录；
2. 点 **Add New → Project**；
3. 选择 `xGlaciesx/body-prism`；
4. Framework Preset 应自动识别为 **Next.js**；
5. Root Directory 保持默认（仓库根目录）。

### 2.2 配置环境变量

在 **Environment Variables** 里逐条添加：

| Name | Value | Environments |
|---|---|---|
| `DEEPSEEK_API_KEY` | 你的 Key | Production、Preview |
| `DEEPSEEK_BASE_URL` | `https://api.deepseek.com/v1` | Production、Preview |
| `DEEPSEEK_MODEL` | `deepseek-chat` | Production、Preview |
| `NEXT_PUBLIC_SITE_URL` | 部署后得到的域名 | Production |

> 只勾选需要的环境；**不要把 Key 写进代码、README 或 `.env.example`**。

### 2.3 部署

点 **Deploy**，等 1–3 分钟。成功后得到：

```text
https://body-prism-xxxx.vercel.app
```

打开首页，逐个检查：

- [ ] 首页首屏（不滚动）能看到那三句背景说明和「看一条链」按钮
- [ ] `/organ/heart` 三个标签可切换
- [ ] `/chain?organ=kidney` 能看到三列影响链，点边弹出机制与证据等级
- [ ] 点「气短」这类红旗表现，先出就医提示，而不是直接展开内容
- [ ] AI 提问能返回带路径的回答，且路径在图上高亮
- [ ] 返回的 `mode` 是 `ai` 而不是 `fallback`（环境变量配错时这里最先暴露）
- [ ] 问"我胸痛怎么办"会提示就医，且不发模型请求
- [ ] 手机宽度无横向滚动

### 2.4 绑定域名（可选）

**Settings → Domains → Add**，按提示配置 DNS。绑定后把 `NEXT_PUBLIC_SITE_URL` 改成正式域名并重新部署。

---

## 3. 评审期保障

| 事项 | 做法 |
|---|---|
| 服务可用 | Vercel 免费版函数会冷启动，首次问答可能慢 1–2 秒，属正常；提前在评审开始前访问一次"热身" |
| 额度 | 在 DeepSeek 控制台设置月度预算；余额不足时站点仍可浏览，AI 回退兜底答案 |
| 变更冻结 | 评审期间**不合并新功能**；只允许修阻断性 bug，并记录 |
| 监控 | 每天打开一次首页 + 提一个问题；记录时间与结果 |
| 回滚 | Vercel **Deployments → 选上一个 → Promote to Production** |
| 密钥轮换 | 如怀疑泄露，立刻在 DeepSeek 控制台吊销并新建，然后在 Vercel 更新变量并重新部署 |

---

## 4. 体验账号

本项目**没有登录功能**，不需要提供测试账号。若评委问起，回答：

> 本站为公开只读科普站，无需注册登录；所有内容可直接浏览，AI 问答无需账号。

如果后续加了后台，必须单独创建一个只读评审账号，并在提交材料里注明账号/密码（不要写进公开仓库 README，放在提交表单的"体验账号"字段）。

---

## 5. 备用部署方案

### 5.1 Cloudflare Pages

适合国内访问，但 Next.js 的 Route Handler 需要适配：

1. 安装 `@cloudflare/next-on-pages`；
2. 构建命令改为 `npx @cloudflare/next-on-pages`；
3. 在 Cloudflare 控制台配置同名环境变量；
4. 注意 Node 运行时兼容性，先在预览环境验证 AI 接口。

### 5.2 国内云（阿里云 / 腾讯云）

1. 购买最低配 Node 应用托管或轻量服务器；
2. `npm ci && npm run build && npm run start`；
3. 用 Nginx 反代 3000 端口，配 HTTPS 证书；
4. 环境变量写进系统环境或 `.env.production`（**不提交**）；
5. 设置进程守护（pm2 / systemd）。

### 5.3 纯静态降级

如果评审期 AI 实在不可用，可临时把 AI 抽屉固定为"演示模式"（只返回预生成答案），保证核心内容可访问。这是可接受的降级，不算功能缺失。

---

## 6. 上线前 30 分钟检查表

- [ ] `main` 是最新，CI 绿
- [ ] 生产环境变量齐全，且没有 `NEXT_PUBLIC_DEEPSEEK_*`
- [ ] 首页、11 个器官、方法页、关于页、影响链页全部 200
- [ ] AI 正常回答 1 次（`mode: ai`），兜底回答 1 次（`mode: fallback`）
- [ ] 红旗问题 1 次（胸痛）
- [ ] 手机访问 1 次
- [ ] 分享链接到微信，确认标题与摘要正常
- [ ] 记录演示地址、部署时间、版本号（Git commit）
- [ ] 把地址填进大赛提交表单

---

## 7. 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| 构建失败 `npm ci` | 缺 `package-lock.json` | 本地 `npm install` 后提交 lock 文件 |
| 页面 500 | 环境变量缺失 | Vercel → Settings → Environment Variables 检查 |
| AI 一直回退 | Key 无效 / 余额不足 / 超时 | 看 Vercel Functions 日志；换 Key 或充值 |
| 国内访问慢 | 网络 | 用备用方案，或绑定自定义域名 |
| 部署后样式错乱 | Tailwind 未扫描新目录 | 检查 `tailwind.config` 的 `content` 路径 |
| 函数超时 | 模型响应慢 | 把超时设为 12s，超时即回退，避免拖死 |
