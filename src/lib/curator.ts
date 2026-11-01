import { generateText, Output } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { z } from "zod";
import { getOrgan } from "@/lib/content";
import { pickFallback, type CuratorResult } from "@/lib/curator-fallback";
import type { OrganContent } from "@/lib/schema";

export const curatorRequestSchema = z.object({
  organSlug: z.string().min(1),
  question: z.string().min(2).max(200),
});

const curatorOutputSchema = z.object({
  answer: z.string().min(1),
  sourceIds: z.array(z.string()),
});

const SYSTEM_PROMPT = `你是「人体棱镜」的 AI 策展人，用中文回答关于器官的健康科普问题。
规则：
1. 只回答与下面提供的器官内容相关的问题；超出范围就回答"超出范围"。
2. 不诊断、不开药、不给剂量；出现胸痛、呼吸困难、意识改变、大出血等急症，一律先建议立即就医。
3. 每条结论都要对应下面某一条 claim，并把该 claim 的 source id 放进 sourceIds。
4. sourceIds 只能取下面"可用来源"里出现的 id。
5. 中医内容标"传统理论"；信息论内容标"概念类比"。`;

function buildPrompt(organ: OrganContent, question: string): string {
  const claims = organ.claims
    .map(
      (c) =>
        `- [${c.id}] (${c.evidenceLevel}) ${c.text}  sourceIds: ${c.sourceIds.join(", ")}`,
    )
    .join("\n");
  const sources = organ.sources
    .map((s) => `- ${s.id}: ${s.title}`)
    .join("\n");

  return `器官：${organ.nameCn}（${organ.nameEn}）
摘要：${organ.summary}

可用结论（claim）：
${claims}

可用来源（source）：
${sources}

问题：${question}`;
}

function resolveSourceIds(claimIds: string[], organ: OrganContent): string[] {
  const sourceIds = new Set<string>();
  for (const claimId of claimIds) {
    const claim = organ.claims.find((c) => c.id === claimId);
    claim?.sourceIds.forEach((sid) => sourceIds.add(sid));
  }
  return organ.sources.filter((s) => sourceIds.has(s.id)).map((s) => s.id);
}

function fallbackToResult(
  fallback: ReturnType<typeof pickFallback>,
  organ: OrganContent,
): CuratorResult {
  if (fallback.kind === "answer" && fallback.answer) {
    return {
      kind: "answer",
      answer: fallback.answer.answer,
      sourceIds: resolveSourceIds(fallback.answer.sourceClaimIds, organ),
    };
  }
  return { kind: "default" };
}

export async function askCurator(
  organSlug: string,
  question: string,
): Promise<CuratorResult> {
  const organ = getOrgan(organSlug);
  if (!organ) return { kind: "default" };

  // 红旗问题本地判断，不调模型
  const fallback = pickFallback(question);
  if (fallback.kind === "urgent") {
    return { kind: "urgent", urgentMessage: fallback.urgentMessage ?? "" };
  }

  const apiKey = process.env.DEEPSEEK_APP_KEY;
  if (!apiKey) {
    return fallbackToResult(fallback, organ);
  }

  try {
    const model = createDeepSeek({ apiKey })("deepseek-flash");
    const result = await generateText({
      model,
      output: Output.object({ schema: curatorOutputSchema }),
      system: SYSTEM_PROMPT,
      prompt: buildPrompt(organ, question),
    });
    const { answer, sourceIds } = result.output;
    const validSourceIds = sourceIds.filter((id) =>
      organ.sources.some((s) => s.id === id),
    );
    return { kind: "answer", answer, sourceIds: validSourceIds };
  } catch {
    return fallbackToResult(fallback, organ);
  }
}