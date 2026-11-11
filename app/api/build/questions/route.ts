import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { completeOpenRouter } from "@/lib/assistant/openrouter";
import { redactSecrets } from "@/lib/assistant/redact";
import { isCrossSiteRequest, isJsonRequest } from "@/lib/request-guard";
import { DEFAULT_QUESTIONS, parseQuestions, questionsPrompt } from "@/lib/build/questions";
import { MAX_IDEA_CHARS, QuestionsRequestSchema } from "@/lib/build/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BODY_CHARS = MAX_IDEA_CHARS * 4 + 200;
const BUILD_MODELS = process.env.OPENROUTER_BUILD_MODEL || process.env.OPENROUTER_MODEL;
const json = (body: unknown, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * POST /api/build/questions { locale, idea } → { questions, fallback }.
 * A few clarifying questions for this idea, asked before the project is generated. Short and cheap, so it does
 * not count against the daily quota, but it is signed-in only and rate limited. Any model trouble falls back to
 * a fixed set of questions, so the flow never stops here.
 */
export async function POST(req: NextRequest) {
  if (isCrossSiteRequest(req)) return json({ error: "forbidden" }, 403);
  if (!isJsonRequest(req)) return json({ error: "unsupported_media_type" }, 415);

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ error: "unauthorized" }, 401);

  const limit = rateLimit(`build-questions:${user.id}`, 6, 60_000);
  if (!limit.ok) return json({ error: "rate_limited", retryAfter: limit.retryAfter }, 429);

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_CHARS) return json({ error: "payload_too_large" }, 413);
  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_CHARS) return json({ error: "payload_too_large" }, 413);
    raw = JSON.parse(text);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  const body = QuestionsRequestSchema.safeParse(raw);
  if (!body.success) return json({ error: "invalid_request" }, 422);
  const { locale, idea } = body.data;

  if (process.env.OPENROUTER_API_KEY) {
    try {
      const reply = await completeOpenRouter([
        { role: "system", content: questionsPrompt(locale) },
        { role: "user", content: `Project idea:\n<idea>\n${redactSecrets(idea)}\n</idea>` },
      ], req.signal, 1200, BUILD_MODELS);
      const questions = parseQuestions(reply.text);
      if (questions.length >= 2) return json({ questions, fallback: false }, 200);
    } catch (err) {
      if (req.signal.aborted) return json({ error: "aborted" }, 499);
      console.error("build questions failed", { detail: String(err).slice(0, 120), userId: user.id });
    }
  }
  return json({ questions: DEFAULT_QUESTIONS[locale], fallback: true }, 200);
}
