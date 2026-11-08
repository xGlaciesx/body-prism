import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  NOT_DIAGNOSIS_NOTICE,
  getImpactSubgraph,
  subgraphToPrompt,
  type ImpactEdge,
} from "@/content/impact-graph";
import { organBySlug } from "@/content/organs";
import { pickFallback, urgentPatterns } from "@/lib/curator-fallback";

/**
 * 请求体 schema：所有外部输入都要校验，脏数据不能进入取子图逻辑。
 * question 长度 2–200，避免空串和超长输入。
 */
const CuratorRequestSchema = z.object({
  organSlug: z.string().min(1),
  question: z.string().min(2).max(200),
});

/** 兜底回答的通用占位：既不诊断也不给建议，只引导去看影响链。 */
const DEFAULT_ANSWER =
  "这个问题可以到对应器官的「影响链」页面查看：每一段都能点开，看机制、证据强度和来源。";

/**
 * 系统提示词：让模型只能沿着给定子图作答。
 * {{SUBGRAPH}} 占位符在每次请求时用 subgraphToPrompt 的结果替换。
 * 核心约束：不判断患病、不给诊断/药物/剂量、path 必须逐字取自节点 id。
 */
const SYSTEM_PROMPT = `你是「棱镜策展人」。你只能使用下面给出的影响链，不能引入链上没有的器官、功能或表现。

规则：
1. 只解释"这条链怎么走"，不判断提问者是否患病，不给诊断、建议、药物或剂量。
2. 回答 3–5 句中文，每一句都要能对应到下面某一条边。
3. 只输出 JSON，不要任何其他文字，不要 markdown 代码块：
   {"answer": "……", "path": [{"from": "…", "to": "…"}], "sourceIds": ["…"]}
4. path 中的 from/to 必须逐字取自下面出现的节点名对应的 id；最多 3 条边，且必须首尾相接成一条链。
5. sourceIds 只能取自这些边标注的来源。
6. 如果问题和这些边无关，返回 {"answer":"这个问题超出了这张链的范围。","path":[],"sourceIds":[]}。

可用链（每行一条边）：
{{SUBGRAPH}}`;

/** 模型输出的 JSON 结构，用 zod 校验；字段缺失或类型不符都触发 fallback。 */
const CuratorAiSchema = z.object({
  answer: z.string(),
  path: z.array(z.object({ from: z.string(), to: z.string() })),
  sourceIds: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  // 解析请求体；JSON 不合法时无法安全取值，直接 400。
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体不是合法 JSON" }, { status: 400 });
  }

  const parsed = CuratorRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "参数不合法" }, { status: 400 });
  }
  const { organSlug, question } = parsed.data;

  // 只接受站内已有的器官；否则 organId 会指向不存在的节点。
  if (!organBySlug.has(organSlug)) {
    return NextResponse.json({ error: "未知器官" }, { status: 400 });
  }

  // 红旗词命中：不回答医学细节，只引导就医。
  // 判断必须留在本地规则层，不能交给模型——模型一旦参与，就没有「一定安全」的保证。
  const lower = question.toLowerCase();
  for (const pattern of urgentPatterns) {
    if (pattern.keywords.some((k) => lower.includes(k.toLowerCase()))) {
      return respond({
        mode: "fallback",
        answer: pattern.message,
        path: [],
        sourceIds: [],
      });
    }
  }

  // 取该器官的一阶子图：接模型后用于生成提示词，也给 fallback 提供真实边。
  const subgraph = getImpactSubgraph(`organ:${organSlug}`);

  // 步骤 7：读 key；没有就直接走 fallback，并 console.warn 一行（不打印 key 本身）。
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.warn("[curator] 未配置 DEEPSEEK_API_KEY，使用降级答案");
    return respondFallback(question, subgraph);
  }

  // 步骤 8：调 DeepSeek，8 秒超时；任何异常都走 fallback，不让接口崩。
  let rawAi: unknown;
  try {
    rawAi = await callDeepSeek(apiKey, question, organSlug);
  } catch {
    return respondFallback(question, subgraph);
  }

  // 步骤 9：解析 + 逐边校验，任何一条不过都走 fallback。
  const verified = verifyAiOutput(rawAi, subgraph.edges);
  if (!verified) {
    return respondFallback(question, subgraph);
  }

  return respond({
    mode: "ai",
    answer: verified.answer,
    path: verified.path,
    sourceIds: verified.sourceIds,
  });
}

/**
 * 统一出口：所有响应都带 notice，且不缓存（每个问题独立，不能复用）。
 */
function respond(payload: {
  mode: "ai" | "fallback";
  answer: string;
  path: { from: string; to: string }[];
  sourceIds: string[];
}) {
  return NextResponse.json(
    { ...payload, notice: NOT_DIAGNOSIS_NOTICE },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/** 子图类型：复用 getImpactSubgraph 的返回结构，避免手写重复类型。 */
type Subgraph = ReturnType<typeof getImpactSubgraph>;

/**
 * 剥掉模型可能包裹的 markdown 代码块（```json ... ```），再交给 JSON.parse。
 * 模型不总是规规矩矩只输出裸 JSON。
 */
function stripCodeFence(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("```")) {
    const firstNewline = trimmed.indexOf("\n");
    const lastFence = trimmed.lastIndexOf("```");
    if (firstNewline !== -1 && lastFence > firstNewline) {
      return trimmed.slice(firstNewline + 1, lastFence).trim();
    }
  }
  return trimmed;
}

/**
 * 校验模型给出的 path：长度 1–3、首尾相接成链、每条边都在子图里。
 * 任何一条不满足都返回 false，走 fallback——宁可降级，也不能展示编造的链路。
 */
function verifyPath(
  path: { from: string; to: string }[],
  subgraphEdges: ImpactEdge[],
): boolean {
  if (path.length < 1 || path.length > 3) return false;
  for (let i = 0; i < path.length - 1; i++) {
    if (path[i].to !== path[i + 1].from) return false;
  }
  return path.every((p) =>
    subgraphEdges.some((e) => e.from === p.from && e.to === p.to),
  );
}

/**
 * 校验 sourceIds：非空，且每个 id 都来自 path 涉及的边的来源并集。
 * 防止模型编造来源 id 或引用与结论无关的来源。
 */
function verifySourceIds(
  sourceIds: string[],
  path: { from: string; to: string }[],
  subgraphEdges: ImpactEdge[],
): boolean {
  if (sourceIds.length === 0) return false;
  const allowed = new Set<string>();
  for (const p of path) {
    const edge = subgraphEdges.find((e) => e.from === p.from && e.to === p.to);
    if (edge) edge.sourceIds.forEach((id) => allowed.add(id));
  }
  return sourceIds.every((id) => allowed.has(id));
}

/**
 * 调 DeepSeek：原生 fetch，8 秒超时，response_format 强制 JSON。
 * 返回 raw 对象，交给 verifyAiOutput 做结构校验。
 */
async function callDeepSeek(
  apiKey: string,
  question: string,
  organSlug: string,
): Promise<unknown> {
  const resp = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || "deepseek-chat",
      temperature: 0.2,
      max_tokens: 600,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT.replace(
            "{{SUBGRAPH}}",
            subgraphToPrompt(`organ:${organSlug}`),
          ),
        },
        { role: "user", content: question },
      ],
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!resp.ok) {
    throw new Error(`DeepSeek 返回 ${resp.status}`);
  }

  const data = (await resp.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("DeepSeek 响应缺少 content");
  }
  return JSON.parse(stripCodeFence(content));
}

/**
 * 校验模型输出：schema → answer 长度 → path 连续链 → 来源并集。
 * 任何一步失败返回 null，由调用方走 fallback。
 */
function verifyAiOutput(
  raw: unknown,
  subgraphEdges: ImpactEdge[],
): {
  answer: string;
  path: { from: string; to: string }[];
  sourceIds: string[];
} | null {
  const parsed = CuratorAiSchema.safeParse(raw);
  if (!parsed.success) return null;

  const { answer, path, sourceIds } = parsed.data;

  // answer 去空格后 20–600 字，太短或太长都不接受。
  const len = answer.replace(/\s/g, "").length;
  if (len < 20 || len > 600) return null;

  if (!verifyPath(path, subgraphEdges)) return null;
  if (!verifySourceIds(sourceIds, path, subgraphEdges)) return null;

  return { answer, path, sourceIds };
}

/**
 * 兜底回答：优先命中 keywords，否则用该器官第一条真实边，
 * 保证 path/sourceIds 结构完整，前端行为与 ai 模式一致。
 */
function respondFallback(question: string, subgraph: Subgraph) {
  const fallback = pickFallback(question);
  const answer =
    fallback.kind === "answer" && fallback.answer
      ? fallback.answer.answer
      : DEFAULT_ANSWER;

  const firstEdge = subgraph.edges[0];
  const path = firstEdge ? [{ from: firstEdge.from, to: firstEdge.to }] : [];
  const sourceIds = firstEdge ? firstEdge.sourceIds : [];

  return respond({ mode: "fallback", answer, path, sourceIds });
}
