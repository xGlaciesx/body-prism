# 客户 / 管理员权限与内容后台方案（RBAC）

> 项目：人体棱镜 Body Prism——AI 驱动的身体信息三镜图谱。
> 目标：**客户只能浏览已发布内容；管理员登录后才能管理内容；权限在服务端和数据库两层生效。**
> 适用：两个大一新生、Next.js App Router、Postgres、预算优先。

---

## 0. 先给结论

推荐方案：

```text
公开站（无需登录，只读）
  + /admin 后台（登录 + 角色）
  + Supabase Auth（登录）
  + Supabase Postgres（内容 + 版本 + 审计）
  + Supabase Storage（图片）
  + Row Level Security（数据库层兜底）
```

角色只设四个：

| 角色 | 谁 | 能做什么 |
|---|---|---|
| **VIEWER / 客户** | 匿名访客 | 只能看已发布内容、问 AI、看来源 |
| **EDITOR / 编辑** | 内容编辑 | 建草稿、改草稿、提交审核、上传媒体 |
| **REVIEWER / 审核** | 临床医学同学 | 编辑权限 + 医学审核通过/退回 |
| **ADMIN / 管理员** | 项目负责人 | 发布/下线、管用户、管媒体、看审计、改 AI 设置 |

两个人可以这样分：

- 女孩：`ADMIN`，负责工程、发布、用户、部署；
- 男孩：`REVIEWER`，负责医学内容、审核、来源；
- 两人都可以有 `EDITOR` 能力，但 **发布只有 ADMIN 能做**。

> 客户不需要注册。MVP 不做“客户账号/收藏/历史”，先保证公开站零门槛。
> 以后要加收藏，再把 `VIEWER` 升级成可登录客户即可。

---

## 1. 业界怎么做：借四个模式，不照搬任何一家

| 产品/方案 | 角色模型 | 内容流 | 值得借鉴 | 不照搬的原因 |
|---|---|---|---|---|
| **WordPress** | Administrator / Editor / Author / Contributor / Subscriber | 草稿 → 待审 → 发布 | 角色简单、编辑与发布分离 | 插件多、历史包袱重 |
| **Strapi** | Admin RBAC + API Token | Draft & Publish | 内容类型、角色、发布流 | 对两人项目太重 |
| **Shopify** | 前台客户 vs 后台管理员 | 前台只读，后台管理 | **客户/后台彻底分离**的心智模型 | 电商逻辑不适用 |
| **GitHub** | Read / Triage / Write / Maintain / Admin | PR → Review → Merge | **评审后再合并**的工作流 | 不适合非技术编辑 |
| **Contentful / Sanity** | 组织/空间/角色/环境 | 草稿、预览、发布 | 预览与版本 | 企业级复杂度 |
| **Supabase** | Auth + Postgres RLS | 数据库策略即权限 | **数据库层兜底** | 需要理解 RLS |
| **Clerk / Auth0** | 托管登录 | 只解决“你是谁” | 登录体验好 | 不解决内容权限，且多一个付费点 |
| **TinaCMS / Decap** | Git 后端编辑 | 改 MDX → 提交 → 重建 | 内容进 Git 历史 | 发布有构建延迟，后台能力弱 |

**本项目采用的组合：**

> Shopify 的“前台/后台分离” + WordPress 的“角色” + GitHub 的“评审后发布” + Supabase 的“RLS 兜底”。

这也是答辩时最好讲的一句话：

> “我们不是把编辑按钮藏起来，而是让匿名请求在数据库层就读不到草稿。”

### 1.1 为什么默认 Supabase，不默认 Auth.js

| 维度 | Supabase Auth + RLS | Auth.js v5 + Prisma |
|---|---|---|
| 登录 | 自带，含邮箱验证/重置 | 自己接 provider、邮件、session |
| 数据库权限 | RLS 数据库层兜底 | Prisma 用数据库账号，通常绕过 RLS，只能靠应用层 |
| 文件存储 | 自带 Storage | 自己接 S3/R2/本地 |
| 上手成本 | 低，适合大一 | 中高，要理解 session/JWT/CSRF |
| 厂商锁定 | 有，但可导出 Postgres | 无 |
| 适合场景 | 两人、30 天、要快 | 老师要求完全自建/长期产品 |

**结论：** 比赛项目默认 Supabase；如果学校明确要求“不能使用 BaaS”，再换 Auth.js + Prisma，并把权限检查全部放在 Server Action/Route Handler，同时补更重的集成测试。

---

## 2. 权限矩阵

| 能力 | 客户/匿名 | EDITOR | REVIEWER | ADMIN |
|---|---:|---:|---:|---:|
| 浏览已发布内容 | ✓ | ✓ | ✓ | ✓ |
| 向 AI 提问 | ✓（限流） | ✓ | ✓ | ✓ |
| 查看草稿 | ✗ | 自己的/全部草稿 | ✓ | ✓ |
| 新建草稿 | ✗ | ✓ | ✓ | ✓ |
| 编辑草稿 | ✗ | ✓ | ✓ | ✓ |
| 提交审核 | ✗ | ✓ | ✓ | ✓ |
| 审核通过/退回 | ✗ | ✗ | ✓ | ✓ |
| 发布/下线 | ✗ | ✗ | ✗ | ✓ |
| 上传/删除媒体 | ✗ | ✓ | ✓ | ✓ |
| 管理用户/角色 | ✗ | ✗ | ✗ | ✓ |
| 查看审计日志 | ✗ | ✗ | ✗ | ✓ |
| 修改 AI 预算/模型 | ✗ | ✗ | ✗ | ✓ |

规则：

- `REVIEWER` 继承 `EDITOR` 的所有编辑权限；
- `ADMIN` 继承全部权限；
- 任何角色都不能把 `role` 改成比自己高的角色；
- 只有 `ADMIN` 能改 `status` 为 `PUBLISHED`；
- 客户永远没有写权限，连“编辑”按钮都不渲染。

---

## 3. 内容状态机

```text
DRAFT ──提交──> IN_REVIEW ──通过──> APPROVED ──发布──> PUBLISHED
  ↑                 │                                  │
  └──退回修改───────┘                                  │
                                                       ↓
                                                   ARCHIVED
```

| 状态 | 公开可见 | 谁能改 | 说明 |
|---|---:|---|---|
| `DRAFT` | ✗ | EDITOR/REVIEWER/ADMIN | 草稿，可反复改 |
| `IN_REVIEW` | ✗ | REVIEWER/ADMIN | 锁定正文，审核中 |
| `APPROVED` | ✗ | ADMIN | 审核通过，待发布 |
| `PUBLISHED` | ✓ | ADMIN | 公开站和 RAG 只读这个版本 |
| `ARCHIVED` | ✗ | ADMIN | 下线，保留历史 |

**关键规则：**

1. 已发布内容被编辑时，不直接改线上版本，而是复制出一个新 `DRAFT`；
2. 发布时把 `published_revision_id` 指向审核通过的 revision；
3. 公开站和 AI RAG 只读 `PUBLISHED` 的 revision；
4. 下线用 `ARCHIVED`，不物理删除；
5. 每次状态变化写审计日志。

---

## 4. 数据库设计

### 4.1 角色与用户

```sql
create type public.app_role as enum ('VIEWER', 'EDITOR', 'REVIEWER', 'ADMIN');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role public.app_role not null default 'VIEWER',
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'DISABLED')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Supabase 新用户自动建 profile，默认 VIEWER
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'VIEWER'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
```

新用户默认 `VIEWER`，**不要**让客户端自己写 `role`。
管理员在后台或 Supabase Dashboard 里改角色；改角色必须走服务端/数据库函数。

### 4.2 内容主表

```sql
create table public.content_entries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  type text not null check (type in ('organ', 'article', 'page')),
  title_cn text not null,
  title_en text,
  status text not null default 'DRAFT'
    check (status in ('DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED')),
  version int not null default 1,
  current_revision_id uuid,
  published_revision_id uuid,
  author_id uuid references public.profiles(id),
  reviewer_id uuid references public.profiles(id),
  published_by uuid references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 4.3 内容版本表

```sql
create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.content_entries(id) on delete cascade,
  version int not null,
  body jsonb not null,
  change_note text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (entry_id, version)
);
```

`body` 存结构化内容：

```json
{
  "summary": "心脏不只是一台泵……",
  "lenses": {
    "structure": "...",
    "relationship": "...",
    "information": "..."
  },
  "misconceptions": ["..."],
  "evidence": ["..."],
  "sources": [
    {"id": "SRC-001", "title": "...", "year": 2023, "type": "review", "level": "B"}
  ],
  "followups": ["..."]
}
```

用 Zod 校验，**不要**把任意 HTML 直接存进去。

### 4.4 审计日志

```sql
create table public.audit_logs (
  id bigserial primary key,
  actor_id uuid references public.profiles(id),
  actor_role public.app_role,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  diff jsonb,
  ip_hash text,
  created_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;

create policy "admin reads audit"
on public.audit_logs for select
to authenticated
using (public.is_admin());
```

只允许 ADMIN 读；**不要**给 INSERT/UPDATE/DELETE 策略，保持追加写。
审计由 `security definer` 的 RPC 写入，客户端不能直接伪造。

记录这些动作：

- `content.create`
- `content.update`
- `content.submit_review`
- `content.approve`
- `content.request_changes`
- `content.publish`
- `content.archive`
- `media.upload`
- `user.role_change`
- `ai.generate`（模型、prompt hash、输出 hash）

### 4.5 媒体表

```sql
create table public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  alt text not null,
  credit text,
  license text,
  aigc boolean not null default false,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
```

图片必须有 `alt`；AIGC 图必须有 `aigc=true` 和过程记录链接。

---

## 5. RLS：数据库层的“最后一道门”

### 5.1 判断角色的安全函数

```sql
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'ADMIN'
      and status = 'ACTIVE'
  );
$$;
```

```sql
create or replace function public.has_role(roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = any(roles)
      and status = 'ACTIVE'
  );
$$;
```

`security definer` 是为了避免 RLS 递归；函数只读 `profiles`，不暴露数据。

### 5.2 内容策略

```sql
alter table public.content_entries enable row level security;
alter table public.content_revisions enable row level security;

-- 所有人只能读已发布
create policy "public read published entries"
on public.content_entries for select
to anon, authenticated
using (status = 'PUBLISHED');

create policy "public read published revisions"
on public.content_revisions for select
to anon, authenticated
using (
  exists (
    select 1 from public.content_entries e
    where e.published_revision_id = content_revisions.id
      and e.status = 'PUBLISHED'
  )
);

-- 编辑/审核/管理员能读全部
create policy "staff read entries"
on public.content_entries for select
to authenticated
using (public.has_role(array['EDITOR','REVIEWER','ADMIN']::public.app_role[]));

-- 编辑只能建草稿
create policy "editors create drafts"
on public.content_entries for insert
to authenticated
with check (
  public.has_role(array['EDITOR','REVIEWER','ADMIN']::public.app_role[])
  and status = 'DRAFT'
  and author_id = auth.uid()
);

-- 编辑只能改草稿/审核中的内容，不能直接改成 PUBLISHED
create policy "editors update drafts"
on public.content_entries for update
to authenticated
using (
  public.has_role(array['EDITOR','REVIEWER','ADMIN']::public.app_role[])
  and status in ('DRAFT', 'IN_REVIEW')
)
with check (status in ('DRAFT', 'IN_REVIEW'));

-- 管理员全部权限
create policy "admin all entries"
on public.content_entries for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- 编辑/审核/管理员能读全部版本
create policy "staff read revisions"
on public.content_revisions for select
to authenticated
using (public.has_role(array['EDITOR','REVIEWER','ADMIN']::public.app_role[]));

-- 编辑只能以自己的身份建 revision
create policy "staff create revisions"
on public.content_revisions for insert
to authenticated
with check (
  public.has_role(array['EDITOR','REVIEWER','ADMIN']::public.app_role[])
  and created_by = auth.uid()
);

-- 管理员全部版本权限
create policy "admin all revisions"
on public.content_revisions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
```

> 多个 permissive policy 是 OR 关系；管理员策略覆盖全部。
> 编辑即使伪造请求把 `status` 改成 `PUBLISHED`，也会被 `with check` 拒绝。
>
> `content_entries` 里还有 `published_revision_id`、`version` 等列。MVP 可以靠 RPC + 代码约束；如果要做严，给这些列加 trigger，禁止普通编辑直接改，只允许 `publish_content` 这类 `security definer` 函数改。

### 5.3 用户资料策略

```sql
create policy "read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "admin reads profiles"
on public.profiles for select
to authenticated
using (public.is_admin());
```

**不要**给普通用户 `UPDATE profiles` 策略；尤其不能允许改 `role`。
改角色用服务端 RPC 或 Supabase Dashboard。

### 5.4 媒体策略

```sql
alter table public.media enable row level security;

create policy "public read media rows"
on public.media for select
to anon, authenticated
using (true);

create policy "staff manage media rows"
on public.media for all
to authenticated
using (public.has_role(array['EDITOR','REVIEWER','ADMIN']::public.app_role[]))
with check (public.has_role(array['EDITOR','REVIEWER','ADMIN']::public.app_role[]));

-- 假设 bucket 名为 public-media
create policy "public read media files"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'public-media');

create policy "staff upload media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'public-media'
  and public.has_role(array['EDITOR','REVIEWER','ADMIN']::public.app_role[])
);
```

---

## 6. Next.js 接入

### 6.1 目录结构

```text
src/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx
│  │  ├─ explore/page.tsx
│  │  └─ organ/[slug]/page.tsx
│  ├─ (admin)/
│  │  └─ admin/
│  │     ├─ layout.tsx        # 服务端 requireRole
│  │     ├─ page.tsx          # 仪表盘
│  │     ├─ content/page.tsx
│  │     ├─ content/[id]/page.tsx
│  │     ├─ review/page.tsx
│  │     ├─ media/page.tsx
│  │     ├─ users/page.tsx
│  │     └─ audit/page.tsx
│  ├─ api/
│  │  └─ health/route.ts
│  └─ layout.tsx
├─ lib/
│  ├─ supabase/
│  │  ├─ server.ts
│  │  ├─ client.ts
│  │  └─ middleware.ts
│  ├─ auth/
│  │  └─ require-role.ts
│  └─ content/
│     ├─ schema.ts
│     └─ queries.ts
└─ components/
   ├─ public/
   └─ admin/
```

### 6.1.1 环境变量

```bash
# .env.local（不进 Git）
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# 可选
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- `NEXT_PUBLIC_*` 会进浏览器包，只能放公开信息；
- `SUPABASE_SERVICE_ROLE_KEY` **只在服务端**用，用来邀请用户/管理账号，绝不能出现在客户端组件；
- 提交仓库时只提交 `.env.example`，值留空。

### 6.1.2 middleware 只刷新会话

```ts
// middleware.ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

`updateSession` 只做一件事：刷新 Supabase 会话 cookie。
**不要在这里写“是不是管理员”的唯一判断**；真正的角色检查在 layout / Server Action / Route Handler。

### 6.2 Supabase 服务端客户端

```ts
// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component 里不能写 cookie，交给 middleware 刷新
          }
        },
      },
    }
  );
}
```

### 6.3 权限守卫

```ts
// src/lib/auth/require-role.ts
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Role = "VIEWER" | "EDITOR" | "REVIEWER" | "ADMIN";

export async function requireRole(allowed: Role[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, status, display_name")
    .eq("id", user.id)
    .single();

  if (
    !profile ||
    profile.status !== "ACTIVE" ||
    !allowed.includes(profile.role as Role)
  ) {
    notFound();
  }

  return { supabase, user, profile };
}
```

要点：

- 用 `getUser()`，不要用 `getSession()` 做授权判断；
- 权限判断在 **Server Component / Server Action / Route Handler** 里做；
- `middleware` 只负责刷新会话，不作为唯一防线；
- 未授权返回 404 或 403，按页面策略决定；API 用 403。

### 6.4 后台布局

```tsx
// src/app/(admin)/admin/layout.tsx
import { requireRole } from "@/lib/auth/require-role";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole(["EDITOR", "REVIEWER", "ADMIN"]);
  return (
    <div data-role={profile.role}>
      {children}
    </div>
  );
}
```

### 6.5 发布 Server Action

```ts
"use server";

import { revalidateTag } from "next/cache";
import { requireRole } from "@/lib/auth/require-role";

export async function publishEntry(entryId: string, expectedVersion: number) {
  const { supabase } = await requireRole(["ADMIN"]);

  const { error } = await supabase.rpc("publish_content", {
    p_entry_id: entryId,
    p_expected_version: expectedVersion,
  });

  if (error) {
    return { ok: false, message: "发布失败或版本冲突，请刷新后重试" };
  }

  revalidateTag(`content:${entryId}`);
  return { ok: true };
}
```

### 6.6 发布 RPC（原子操作）

```sql
create or replace function public.publish_content(
  p_entry_id uuid,
  p_expected_version int
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'forbidden';
  end if;

  update public.content_entries
     set status = 'PUBLISHED',
         published_revision_id = current_revision_id,
         published_by = auth.uid(),
         published_at = now(),
         version = version + 1,
         updated_at = now()
   where id = p_entry_id
     and version = p_expected_version
     and status = 'APPROVED';

  if not found then
    raise exception 'conflict';
  end if;

  insert into public.audit_logs
    (actor_id, actor_role, action, entity_type, entity_id, diff)
  values
    (auth.uid(), 'ADMIN', 'content.publish', 'content_entry', p_entry_id,
     jsonb_build_object('expected_version', p_expected_version));
end;
$$;
```

> 这段可以让 Cline 帮你写，但必须能逐行解释：为什么检查 `APPROVED`、为什么带 `version`、为什么写审计。

---

## 7. 后台页面与交互

| 路由 | 功能 | 角色 |
|---|---|---|
| `/admin/login` | 邮箱密码登录（可选 GitHub OAuth） | 公开 |
| `/admin` | 待审数量、最近发布、最近审计 | 全部后台角色 |
| `/admin/content` | 内容列表、搜索、状态筛选 | EDITOR+ |
| `/admin/content/[id]` | 三镜编辑器、来源、误区、预览 | EDITOR+ |
| `/admin/review` | 审核队列、diff、通过/退回 | REVIEWER+ |
| `/admin/media` | 图片上传、alt、credit、license | EDITOR+ |
| `/admin/users` | 邀请、改角色、禁用 | ADMIN |
| `/admin/audit` | 按人/动作/时间筛选、导出 CSV | ADMIN |
| `/admin/settings/ai` | 模型、温度、每日预算 | ADMIN |

### 7.1 编辑器表单

- 三个标签：结构之镜 / 关系之镜 / 信息之镜；
- 每个 claim 必须绑定 `sourceIds`；
- 证据等级 A/B/C/D 必填；
- 中医内容自动加“传统理论”标记；
- 信息论内容自动加“概念类比”标记；
- 保存草稿不校验“必须有来源”，提交审核时才强制校验；
- 预览用 `/admin/content/[id]/preview`，带“草稿预览”水印。

### 7.2 审核页

- 左：当前版本；右：上一发布版本；
- 高亮新增/删除；
- 显示来源数量、证据等级、红旗检查；
- 按钮：通过 / 退回并写理由；
- 审核通过后状态变 `APPROVED`，等待 ADMIN 发布。

### 7.3 发布后

1. 更新 `published_revision_id`；
2. 写审计；
3. `revalidateTag('content:<slug>')`；
4. 触发 RAG 重新索引（只索引 PUBLISHED）；
5. 公开页 60 秒内可见。

---

## 8. 公开站怎么保证“只能浏览”

| 措施 | 做法 |
|---|---|
| 不渲染编辑入口 | 公开 layout 不引入 admin 组件 |
| 不暴露草稿 API | 公开查询只查 `status='PUBLISHED'` |
| RLS 兜底 | 匿名只能 select 已发布 |
| 直连 URL 防护 | `/admin/*` 服务端 `requireRole` |
| 搜索引擎 | `/admin` 设 `noindex`，`robots.txt` disallow |
| 写操作 | 只在 Server Action/Route Handler，全部先鉴权 |
| 错误信息 | 不返回“你是谁/你缺什么权限”的细节 |
| 速率限制 | 登录、AI 问答、媒体上传分别限流 |

**不要用“前端隐藏按钮”当权限。** 任何人打开 DevTools 都能直接发请求。

---

## 9. 安全清单（按 OWASP）

| 风险 | 本项目对策 |
|---|---|
| A01 权限失控 | 服务端 `requireRole` + RLS + 对象级检查 |
| A02 加密失败 | 登录交给 Supabase；全站 HTTPS；不自己存密码 |
| A03 注入 | 参数化查询；内容用结构化 JSON + Zod；不渲染裸 HTML |
| A04 设计缺陷 | 最小权限；草稿/审核/发布分离；默认拒绝 |
| A05 配置错误 | `SUPABASE_SERVICE_ROLE_KEY` 只在 server；不开公网调试 |
| A07 认证失败 | 登录限流、会话刷新、可选 MFA、禁用离职账号 |
| A08 数据完整性 | 版本号乐观锁、审计日志、AIGC 来源记录 |
| A09 日志失败 | 审计 + AI 用量日志；不记录密码/密钥/个人健康数据 |
| A10 SSRF | 不随意抓取用户提供的 URL；图片只走上传 |

额外：

- `SUPABASE_SERVICE_ROLE_KEY` 绝不能加 `NEXT_PUBLIC_`；
- 客户端只用 `NEXT_PUBLIC_SUPABASE_ANON_KEY`；
- 管理后台单独 layout，加 `noindex`；
- 登录失败 5 次锁定 15 分钟（按 IP + 账号）；
- 管理员会话空闲 8 小时过期；
- 角色变更后，要求重新登录或强制刷新会话；
- 所有发布/下线操作写审计，审计表不允许 UPDATE/DELETE。

---

## 10. 测试矩阵

| 场景 | 期望 |
|---|---|
| 匿名访问 `/admin` | 302 到 `/admin/login` |
| 匿名调用发布 Server Action | 401/403，不执行 |
| EDITOR 点发布 | 403，按钮不渲染 |
| REVIEWER 审核通过 | 状态变 `APPROVED` |
| REVIEWER 直接发布 | 403 |
| ADMIN 发布 `APPROVED` 内容 | 成功，公开页更新 |
| EDITOR 修改已发布内容 | 生成新 DRAFT，线上不变 |
| 匿名请求草稿 API | 404/403 |
| 匿名直接查 `content_revisions` 草稿 | RLS 返回空 |
| 把 role 从 ADMIN 改成 VIEWER | 下一次请求被拒绝 |
| 发布时版本号过期 | 409/冲突提示 |
| 内容里带 `<script>` | 被清理/转义，不执行 |
| 登录连续失败 | 429/锁定 |
| 发布后看审计 | 有 actor/action/entity/diff |
| 发布后问 AI | 只引用新发布版本 |

---

## 11. 三天实施排期

### Day 1：数据库与登录

- 建 Supabase 项目；
- 建 `profiles`、`content_entries`、`content_revisions`、`audit_logs`、`media`；
- 开 RLS，写 `is_admin()` / `has_role()`；
- 关闭公开注册；
- 建两个账号：女孩 ADMIN，男孩 REVIEWER；
- 把 MDX 种子导入 DB（先全部 PUBLISHED）；
- `/admin/login` 能登录，`/admin` 能按角色显示。

### Day 2：后台编辑

- 后台 layout + 导航；
- 内容列表、状态筛选；
- 三镜编辑器、Zod 校验、保存草稿；
- 草稿预览；
- 媒体上传 + alt/credit/license；
- 公开页改为读 DB 已发布版本。

### Day 3：审核与发布

- 提交审核；
- 审核队列、diff、通过/退回；
- ADMIN 发布 RPC；
- 审计日志页；
- `revalidateTag` + RAG 重新索引；
- 跑测试矩阵；
- 录 2 分钟后台演示。

**总计：女孩 2.5–3 天，男孩 1 天内容迁移 + 审核测试。**

---

## 12. 与现有内容的迁移

之前的内容是 `content/organs/*.mdx`。现在这样处理：

```text
content/organs/*.mdx        → 种子 + Git 备份
        ↓ npm run db:seed
content_entries + content_revisions（PUBLISHED v1）
        ↓ 后台编辑
新 DRAFT → 审核 → 发布
        ↓
公开站 + RAG 只读 PUBLISHED
```

- `npm run db:seed` 解析 MDX frontmatter，Zod 校验后 upsert；
- 已存在的内容不重复插入；
- 每次发布生成新 revision；
- 每周 `npm run content:export` 把已发布内容导出为 MDX 快照，提交到 Git；
- 这样既有数据库的实时后台，又有 Git 的完整历史。

**数据库不要越加越多：**

```text
内容表 + 版本表 + 审计表 + 媒体表  → Supabase Postgres
RAG 的 chunk / embedding          → 同一个 Supabase Postgres 的 pgvector
本地开发                          → Supabase CLI 本地栈，或 Docker Postgres
```

如果本地不想跑 Supabase CLI，可以先用托管免费层开发；RAG 数据量很小时也可以先用内存 JSON + BM25，等发布前再迁到 pgvector。**不要同时维护两套内容库。**

> **本地 Docker 的两个系统差异：**
> - 女孩（Windows 11）：装 **Docker Desktop for Windows**，安装时启用 **WSL 2**；第一次启动后确认 Docker 图标是绿色。PowerShell 里运行 `docker --version` 验证。
> - 男孩（macOS）：装 **Docker Desktop for Mac**（Apple Silicon 选 Apple Silicon 版）；Terminal 里运行 `docker --version` 验证。
> - 如果 Docker 装不起来，不要硬扛：直接用 Supabase 托管免费层，本地只写代码。比赛不要求本地数据库。

> 比赛要求“完整 Git 历史”，代码历史在 Git；内容历史在 revision + audit；每周导出快照，答辩时两边都能展示。

---

## 13. 成本

| 项目 | 方案 | 成本 |
|---|---|---|
| 登录 | Supabase Auth | ¥0（免费层） |
| 数据库 | Supabase Postgres | ¥0（免费层） |
| 图片 | Supabase Storage | ¥0（免费层） |
| 后台 | 自己写 Next.js | ¥0 |
| 邮件 | Supabase 自带额度 | ¥0 |
| 付费 Auth/CMS | 不需要 | ¥0 |

**不要买 Auth0/Clerk 的企业版，也不要用付费 CMS。** 免费层对本项目足够，具体额度以官网为准。

---

## 14. 答辩怎么讲

> “公开站是零登录的只读体验；后台是四角色 RBAC。编辑只能建草稿，审核通过后管理员才能发布。权限不靠隐藏按钮，而是服务端守卫 + Postgres RLS 双层拦截。每次发布有版本号、审计日志，AI 只索引已发布内容。”

演示顺序：

1. 匿名打开公开站，只能浏览；
2. 直接访问 `/admin`，被重定向登录；
3. 用 EDITOR 登录，改一段内容，提交审核；
4. 用 REVIEWER 登录，审核通过；
5. 用 ADMIN 登录，发布；
6. 回到公开站，内容已更新；
7. 打开审计日志，看到谁在什么时候改了什么；
8. 匿名调用发布接口，返回 403。

---

## 15. 验收清单

- [ ] 公开站无需登录，只读
- [ ] `/admin` 未登录跳转登录
- [ ] 四个角色权限符合矩阵
- [ ] EDITOR 不能发布
- [ ] REVIEWER 不能发布
- [ ] ADMIN 能发布/下线
- [ ] 已发布内容编辑生成新草稿
- [ ] 草稿不出现在公开站
- [ ] 草稿不进 RAG 索引
- [ ] RLS 已开启，匿名读不到草稿
- [ ] `service_role` key 不在客户端
- [ ] `/admin` 有 `noindex`
- [ ] 审计日志记录发布/审核/改角色
- [ ] 发布有版本冲突保护
- [ ] 登录有限流
- [ ] 测试矩阵全部通过
- [ ] 有 2 分钟后台演示视频

---

## 16. 常见坑

| 坑 | 正确做法 |
|---|---|
| 只用 middleware 鉴权 | middleware 只刷新会话，页面/动作里再查角色 |
| 前端传 `role` 字段 | 服务端从数据库读角色，永不信任客户端 |
| 用 `getSession()` 授权 | 用 `getUser()` 验证 JWT |
| 把 `service_role` 放前端 | 只在 server 环境变量；客户端只用 anon key |
| 管理员能改自己的角色 | 禁止；角色变更走独立 RPC + 审计 |
| 发布没有版本号 | 用 `version` 乐观锁，冲突返回 409 |
| 草稿被 AI 引用 | RAG 只查 `PUBLISHED` |
| 删除即消失 | 用 `ARCHIVED` 软下线，保留 revision |
| 审计日志可改 | 只追加，不给 UPDATE/DELETE 策略 |
| 公开注册 | MVP 关闭；账号由 ADMIN 邀请 |

---

## 17. 一句话

> **客户看到的是内容，管理员看到的是工作流；权限不是按钮，是服务端和数据库共同守住的边界。**
