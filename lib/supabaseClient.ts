import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Shared Supabase client factories. Both use the public anon key only; every query is limited by RLS.
 * Never put the service-role key here: this module is importable from client components.
 */
function env() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Supabase env vars are missing (see .env.example).");
  return { url, anon };
}

let browserClient: SupabaseClient | undefined;

/** Singleton browser client for client components (session lives in cookies managed by @supabase/ssr). */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (!browserClient) {
    const { url, anon } = env();
    browserClient = createBrowserClient(url, anon);
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
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); }
        catch { /* called from a Server Component: the session refresh in proxy/middleware handles it */ }
      },
    },
  });
}
