"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";

const cache = new Map<string, Promise<boolean>>();

/**
 * Whether the signed-in maker is a moderator (public.is_admin(), migration 0004). Only decides what the UI shows:
 * every moderation action is checked again by the database. False while loading, for guests, and before 0004 runs.
 */
export function useIsAdmin(): boolean {
  const { userId } = useAuth();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (!userId) { setAdmin(false); return; }
    let alive = true;
    let check = cache.get(userId);
    if (!check) {
      check = Promise.resolve(getSupabaseBrowserClient().rpc("is_admin")).then(({ data, error }) => !error && data === true, () => false);
      cache.set(userId, check);
    }
    void check.then((v) => { if (alive) setAdmin(v); });
    return () => { alive = false; };
  }, [userId]);
  return admin;
}
