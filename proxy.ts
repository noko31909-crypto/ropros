import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { AUTH_COOKIE_OPTIONS, supabasePublicConfig } from "@/lib/supabase/public-config";
import { TURNSTILE_ORIGIN } from "@/lib/turnstile";
import { GUIDE_SLUG_LIST } from "@/content/guides/slugs";

// Guide covers are served from this CDN (content/covers.json).
const COVER_CDN = "https://d2ol7oe51mr4n9.cloudfront.net";

/**
 * Per-request Content-Security-Policy. Scripts run only with this request's nonce (Next.js adds it to its own
 * scripts) or when loaded by such a script ('strict-dynamic'), so injected markup cannot execute code.
 * Styles keep 'unsafe-inline' because React renders style attributes.
 */
function contentSecurityPolicy(nonce: string, supabaseUrl: string): string {
  const dev = process.env.NODE_ENV === "development";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${TURNSTILE_ORIGIN}${dev ? " 'unsafe-eval'" : ""}`,
    `frame-src ${TURNSTILE_ORIGIN}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${supabaseUrl} ${COVER_CDN} https://images.unsplash.com`,
    "font-src 'self'",
    `connect-src 'self' ${supabaseUrl} ${supabaseUrl.replace(/^https:/, "wss:")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

/**
 * Refreshes the Supabase auth session on every request so server code (e.g. /api/progress)
 * sees a valid JWT, and sets the Content-Security-Policy. Does not make authorization decisions:
 * route handlers still call getUser().
 */
const GUIDE_PATH = /^\/projects\/([^/]+)\/?$/;
const KNOWN_GUIDES: ReadonlySet<string> = new Set(GUIDE_SLUG_LIST);

export async function proxy(request: NextRequest) {
  const { url, anon } = supabasePublicConfig();
  const nonce = btoa(crypto.randomUUID());
  const csp = contentSecurityPolicy(nonce, url);

  // A guide page that does not exist answers a real 404 (the page itself streams, which would lock in a 200).
  const guide = GUIDE_PATH.exec(request.nextUrl.pathname)?.[1];
  const missing = guide !== undefined && !KNOWN_GUIDES.has(guide);

  // Rebuilt after a session refresh so server components see the new auth cookies and the nonce.
  const forward = () => {
    const headers = new Headers(request.headers);
    headers.set("x-nonce", nonce);
    headers.set("Content-Security-Policy", csp);
    return missing
      ? NextResponse.rewrite(new URL("/guide-not-found", request.url), { request: { headers } })
      : NextResponse.next({ request: { headers } });
  };
  let response = forward();

  const supabase = createServerClient(url, anon, {
    cookieOptions: AUTH_COOKIE_OPTIONS,
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = forward();
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  await supabase.auth.getUser();
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)"],
};
