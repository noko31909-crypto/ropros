/**
 * Minimal fixed-window limiter, per server instance.
 * Fine for one Node process; on serverless or multiple instances use a shared store (e.g. Redis/Upstash).
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 30, windowMs = 60_000): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  if (hits.size > 10_000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) { hits.set(key, { count: 1, resetAt: now + windowMs }); return { ok: true, retryAfter: 0 }; }
  entry.count += 1;
  return entry.count <= limit ? { ok: true, retryAfter: 0 } : { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
}
