import { NextResponse, type NextRequest } from "next/server";
import { FinderRequestSchema } from "@/lib/finder/schema";
import { matchProjects } from "@/lib/finder/match";
import { PROJECTS } from "@/lib/finder/projects-data";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;
const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function clientKey(req: NextRequest): string {
  // Only trust x-forwarded-for when you run behind a proxy you control (Vercel, nginx, etc.).
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/**
 * POST /api/finder
 * Body: { "parts": ["Arduino Uno", "HC-SR04", "DC Motor"] }
 * Returns ready (owns 100%) and close_matches (missing 1–2 small parts; never a board or chassis).
 */
export async function POST(req: NextRequest) {
  const limit = rateLimit(`finder:${clientKey(req)}`);
  if (!limit.ok) return json({ error: "rate_limited", message: "Too many requests. Try again shortly." }, 429, { "Retry-After": String(limit.retryAfter) });

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "unsupported_media_type", message: "Send JSON with Content-Type: application/json." }, 415);
  }
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413);

  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ error: "invalid_json", message: "Body must be valid JSON." }, 400);
  }

  const parsed = FinderRequestSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "invalid_request", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) }, 422);
  }

  const result = matchProjects(PROJECTS, parsed.data.parts);
  return json({
    ready: result.ready,
    close_matches: result.close_matches,
    meta: {
      parts_received: parsed.data.parts.length,
      unrecognized_parts: result.unrecognized,
      projects_scanned: PROJECTS.length,
      rule: "close_matches = missing 1–2 parts, none of them a board or chassis",
    },
  });
}
