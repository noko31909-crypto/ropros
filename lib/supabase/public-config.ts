/**
 * Public Supabase settings. Both values are public by design (they ship to every browser);
 * the database is protected by Row Level Security, not by hiding these.
 * Env vars override them only when they are a valid anon key for a project URL, so a mistyped
 * dashboard value cannot break sign-in. Never put the service-role / sb_secret key here.
 */
const DEFAULT_URL = "https://jwmaapbmsxzekbdnfbxf.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3bWFhcGJtc3h6ZWtiZG5mYnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1NTgxODksImV4cCI6MjEwODEzNDE4OX0.8IO8g65Yvwdwm3f3sWtG9Fxr_xEoNgSJPRRoGMe_waI";

/**
 * Auth cookie flags for every Supabase client (merged over @supabase/ssr defaults, which omit Secure).
 * HttpOnly stays off because the browser client reads the session; the CSP in proxy.ts guards against XSS.
 */
export const AUTH_COOKIE_OPTIONS = { path: "/", sameSite: "lax", secure: process.env.NODE_ENV === "production" } as const;

// Pasted values often carry invisible characters; URLs and JWTs are plain ASCII.
const clean = (v: string | undefined) => v?.replace(/[^\x21-\x7E]/g, "") || undefined;

function anonRef(key: string): string | null {
  try {
    const part = key.split(".")[1];
    if (!part) return null;
    const json = JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/"))) as { ref?: string; role?: string };
    return json.role === "anon" && json.ref ? json.ref : null;
  } catch { return null; }
}

export function supabasePublicConfig(): { url: string; anon: string } {
  // Literal process.env access so Next.js inlines NEXT_PUBLIC_ values into the browser bundle.
  const url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anon = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const ref = url?.match(/^https:\/\/([a-z0-9]+)\.supabase\.co\/?$/)?.[1];
  if (url && anon && ref && anonRef(anon) === ref) return { url: url.replace(/\/$/, ""), anon };
  return { url: DEFAULT_URL, anon: DEFAULT_ANON_KEY };
}
