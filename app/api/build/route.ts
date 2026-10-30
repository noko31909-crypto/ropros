import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { completeOpenRouter, OpenRouterError } from "@/lib/assistant/openrouter";
import { redactSecrets } from "@/lib/assistant/redact";
import { isCrossSiteRequest, isJsonRequest } from "@/lib/request-guard";
import { generateProject } from "@/lib/build/generate";
import { BuildRequestSchema, MAX_IDEA_CHARS } from "@/lib/build/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Free models can take a minute per reply, and a repair round doubles that.
export const maxDuration = 180;

// Each generation counts against the same per-user daily assistant quota in Postgres (consume_assistant_quota).
const dailyEnv = Number(process.env.ASSISTANT_DAILY_LIMIT);
const DAILY_LIMIT = Number.isInteger(dailyEnv) && dailyEnv > 0 ? Math.min(dailyEnv, 1000) : 50;
const MAX_BODY_CHARS = MAX_IDEA_CHARS * 4 + 200;
const MAX_TOKENS = 14_000;
// A whole project is one long structured reply; small free models often fail it. OPENROUTER_BUILD_MODEL lets the
// generator use a stronger model list than the chat assistant; without it the assistant's list is used.
const BUILD_MODELS = process.env.OPENROUTER_BUILD_MODEL || process.env.OPENROUTER_MODEL;

const json = (body: unknown, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * POST /api/build { locale, idea } → { project, issues, repaired }.
 * Signed-in users only; rate limited per user (memory) and per day (Postgres); the idea is redacted before
 * it reaches the model provider, and the model's reply is validated (zod + circuit checker) before it is returned.
 */
export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) return json({ error: "generator_unavailable" }, 503);
  if (isCrossSiteRequest(req)) return json({ error: "forbidden" }, 403);
  if (!isJsonRequest(req)) return json({ error: "unsupported_media_type" }, 415);

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ error: "unauthorized" }, 401);

  const limit = rateLimit(`build:${user.id}`, 3, 60_000);
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
  const body = BuildRequestSchema.safeParse(raw);
  if (!body.success) return json({ error: "invalid_request" }, 422);

  const { data: allowed, error: quotaError } = await supabase.rpc("consume_assistant_quota", { p_daily_limit: DAILY_LIMIT });
  if (quotaError) {
    console.error("build quota check failed", { code: quotaError.code, userId: user.id });
    return json({ error: "generator_unavailable" }, 503);
  }
  if (allowed !== true) return json({ error: "daily_limit" }, 429);

  try {
    const result = await generateProject(redactSecrets(body.data.idea), body.data.locale,
      (messages) => completeOpenRouter(messages, req.signal, MAX_TOKENS, BUILD_MODELS));
    if (!result.ok) {
      console.error("build output invalid", { userId: user.id, problems: result.problems.slice(0, 5) });
      return json({ error: "invalid_output" }, 502);
    }
    return json({ project: result.project, issues: result.issues, repaired: result.repaired }, 200);
  } catch (err) {
    if (req.signal.aborted) return json({ error: "aborted" }, 499);
    const status = err instanceof OpenRouterError ? err.status : undefined;
    console.error("build generation failed", { status: status ?? String(err), userId: user.id });
    return json({ error: status === 429 ? "busy" : "provider_error" }, status === 429 ? 429 : 502);
  }
}
