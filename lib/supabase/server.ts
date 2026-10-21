import "server-only";
import { cookies } from "next/headers";
import { createSupabaseServerClientFromCookies } from "@/lib/supabaseClient";

/**
 * Per-request Supabase client bound to the user's auth cookies.
 * Uses the public anon key: every query is limited by Row Level Security.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createSupabaseServerClientFromCookies({
    getAll: () => cookieStore.getAll(),
    set: (name, value, options) => cookieStore.set(name, value, options),
  });
}
