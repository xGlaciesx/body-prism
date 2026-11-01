import { NextResponse } from "next/server";
import { askCurator, curatorRequestSchema } from "@/lib/curator";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = curatorRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const { organSlug, question } = parsed.data;
  const result = await askCurator(organSlug, question);
  return NextResponse.json(result);
}