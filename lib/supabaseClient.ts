import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AUTH_COOKIE_OPTIONS, supabasePublicConfig } from "@/lib/supabase/public-config";

/**
 * Shared Supabase client factories. Both use the public anon key only; every query is limited by RLS.
 * Never put the service-role key here: this module is importable from client components.
 */
function env() {
  return supabasePublicConfig();
}

let browserClient: SupabaseClient | undefined;

/** Singleton browser client for client components (session lives in cookies managed by @supabase/ssr). */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (!browserClient) {
    const { url, anon } = env();
    browserClient = createBrowserClient(url, anon, { cookieOptions: AUTH_COOKIE_OPTIONS });
  }
  return browserClient;
}

export type CookieAdapter = {
  getAll: () => { name: string; value: string }[];
  set: (name: string, value: string, options: CookieOptions) => void;
};

/**
 * Per-request server client bound to a cookie store (e.g. `await cookies()` from next/headers).
 * Use `createSupabaseServerClient()` from `@/lib/supabase/server` in route handlers and server components.
 */
export function createSupabaseServerClientFromCookies(store: CookieAdapter): SupabaseClient {
  const { url, anon } = env();
  return createServerClient(url, anon, {
    cookieOptions: AUTH_COOKIE_OPTIONS,
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); }
        catch { /* called from a Server Component: the session refresh in proxy/middleware handles it */ }
      },
    },
  });
}
