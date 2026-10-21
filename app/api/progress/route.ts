import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  projectId: z.string().uuid(),
  action: z.enum(["start", "simulate", "complete"]),
}).strict();

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * POST /api/progress   { "projectId": "<uuid>", "action": "simulate" | "complete" | "start" }
 * Saves the signed-in user's progress. The user id comes from the verified session,
 * never from the request body, and the database function enforces the rest.
 */
export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) return json({ error: "unsupported_media_type" }, 415);

  const supabase = await createSupabaseServerClient();
  // getUser() validates the JWT with Supabase Auth (getSession() alone only reads the cookie).
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return json({ error: "unauthorized" }, 401);

  const limit = rateLimit(`progress:${user.id}`, 20, 60_000);
  if (!limit.ok) return json({ error: "rate_limited" }, 429);

  let parsed;
  try { parsed = Body.safeParse(await req.json()); } catch { return json({ error: "invalid_json" }, 400); }
  if (!parsed.success) return json({ error: "invalid_request", issues: parsed.error.issues.map((i) => i.message) }, 422);

  const { data, error } = await supabase
    .rpc("record_progress", { p_project: parsed.data.projectId, p_action: parsed.data.action })
    .single<{ status: string; is_completed: boolean; xp: number; level: number }>();

  if (error) {
    if (error.code === "P0002") return json({ error: "project_not_found" }, 404);
    if (error.code === "28000") return json({ error: "unauthorized" }, 401);
    console.error("record_progress failed", { code: error.code, userId: user.id });   // no request body in logs
    return json({ error: "server_error" }, 500);
  }
  return json({ progress: data });
}
