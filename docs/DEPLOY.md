# 在线演示部署与评审期保障

> 目标：拿到一个**公网可访问、评审期间稳定、密钥不泄露**的地址。
> 推荐 Vercel；国内访问不稳时用备用方案（§5）。

---

## 1 先决条件

- [ ] 代码已合并到 GitHub `main`，CI 绿
- [ ] `npm run build` 本地通过
- [ ] `.env.example` 已提交，`.env.local` 未提交（`git status` 里不该出现它）
- [ ] DeepSeek Key 可用，账户有余额
- [ ] 11 个器官页面都能打开

---

## 2 Vercel 部署（约 10 分钟）

### 2.1 导入项目

1. 打开 <https://vercel.com>，用 GitHub 账号登录；
2. **Add New → Project**；
3. 选择 `xGlaciesx/body-prism`；
4. Framework Preset 应自动识别为 **Next.js**；
5. Root Directory 保持默认（仓库根目录）。

### 2.2 配置环境变量

变量名以 `.env.example` 为准，**不要自己另造名字**：

| Name | Value | 环境 |
|---|---|---|
| `DEEPSEEK_API_KEY` | 你的 Key | Production、Preview |
| `DEEPSEEK_BASE_URL` | `https://api.deepseek.com`（留空即用此默认值，**不要加 `/v1`**，代码会自己拼 `/chat/completions`） | Production、Preview |
| `AI_MODEL` | `deepseek-chat`（留空即用默认值） | Production、Preview |
| `SITE_URL` | 部署后得到的域名，如 `https://body-prism.vercel.app` | Production |

> 只勾选需要的环境。**任何变量都不要加 `NEXT_PUBLIC_` 前缀**——加上就等于把它打进前端包，
> `NEXT_PUBLIC_DEEPSEEK_*` 这类变量名一出现就是事故。`SITE_URL` 也不需要前缀，它只在服务端生成分享卡片时用。

### 2.3 部署

点 **Deploy**，等 1–3 分钟，得到 `https://body-prism-xxxx.vercel.app`。

打开后逐个检查：

- [ ] 首页首屏右侧的三维人体能加载（加载中是骨架，加载完出现人体；**如果一直空白**，先看 `/meshopt/meshopt_decoder.js` 是否 200）
- [ ] 点「肾」热点，镜头飞近，卡片出现，能进 `/organ/kidney`
- [ ] `/organ/heart` 三个标签可切换
- [ ] `/chain?organ=kidney` 三列影响链可读，点边弹出机制与证据等级
- [ ] AI 提问能返回带路径的回答，返回的 `mode` 是 `ai` 而不是 `fallback`（环境变量配错时这里最先暴露）
- [ ] 问「我胸痛怎么办」会提示就医，且**不发模型请求**
- [ ] 手机宽度无横向滚动

### 2.4 绑定域名（可选）

**Settings → Domains → Add**，按提示配 DNS。绑定后把 `SITE_URL` 改成正式域名并重新部署。

---

## 3 评审期保障

| 事项 | 做法 |
|---|---|
| 服务可用 | Vercel 免费版函数会冷启动，首次问答可能慢 1–2 秒，属正常；评审开始前访问一次「热身」 |
| 额度 | 在 DeepSeek 控制台设月度预算；余额不足时站点仍可浏览，AI 回退到兜底答案 |
| 变更冻结 | 评审期**不合并新功能**；只修阻断性 bug，并记进 `SESSION_LOG.md` |
| 监控 | 每天打开一次首页 + 提一个问题，记录时间与结果 |
| 回滚 | Vercel **Deployments → 选上一个 → Promote to Production** |
| 密钥轮换 | 怀疑泄露就立刻在 DeepSeek 控制台吊销重建，再更新 Vercel 变量并重新部署 |

---

## 4 体验账号

本项目**没有登录功能**，不需要提供测试账号。评委问起就这样答：

> 本站是公开只读科普站，无需注册登录；所有内容可直接浏览，AI 问答也不需要账号。

---

## 5 备用部署方案

### 5.1 Cloudflare Pages

对国内访问更友好，但 Route Handler 要适配：装 `@cloudflare/next-on-pages`，构建命令改成 `npx @cloudflare/next-on-pages`，在控制台配同名环境变量，先在预览环境验证 AI 接口。

### 5.2 国内云（阿里云 / 腾讯云）

1. 买最低配的 Node 应用托管或轻量服务器；
2. `npm ci && npm run build && npm run start`；
3. Nginx 反代 3000 端口，配 HTTPS；
4. 环境变量写进系统环境（**不提交**）；
5. pm2 / systemd 做进程守护。

### 5.3 纯静态降级

如果评审期 AI 实在不可用，可把 AI 抽屉固定为「演示模式」（只返回预生成答案），保证核心内容可访问。这是可接受的降级，不算功能缺失。

---

## 6 上线前 30 分钟检查表

- [ ] `main` 是最新，CI 绿
- [ ] 生产环境变量齐全，且没有任何 `NEXT_PUBLIC_DEEPSEEK_*`
- [ ] `/`、11 个 `/organ/*`、`/chain`、`/method`、`/about` 全部 200
- [ ] 三维模型加载正常（不是空白），热点可点
- [ ] AI 正常回答 1 次（`mode: ai`），兜底回答 1 次（`mode: fallback`）
- [ ] 红旗问题 1 次（胸痛）
- [ ] 手机访问 1 次
- [ ] 分享链接到微信，标题与摘要正常（`SITE_URL` 配错时这里会露馅）
- [ ] 记录演示地址、部署时间、Git commit
- [ ] 把地址填进大赛提交表单

---

## 7 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| 构建失败 `npm ci` | 缺 `package-lock.json` | 本地 `npm install` 后提交 lock |
| 页面 500 | 环境变量缺失 | Vercel → Settings → Environment Variables |
| AI 一直回退 | Key 无效 / 余额不足 / DeepSeek 不可达 | 看 Functions 日志；核对 `DEEPSEEK_BASE_URL` 是否多了 `/v1` |
| 三维区域一片空白 | meshopt 解码器没加载到 | 确认 `public/meshopt/meshopt_decoder.js` 已部署且返回 200 |
| 国内访问慢 | 网络 | 用备用方案，或绑自定义域名 |
| 函数超时 | 模型响应慢 | 超时设为 12s，超时即回退，别拖死请求 |
