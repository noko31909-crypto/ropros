"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { useMessages } from "@/components/i18n/locale-provider";
import { common } from "@/lib/i18n/messages/common";
import { MAX_SAVED, SAVED_KEY, cleanSlugs, clearLocalSaved, readLocalSaved, writeLocalSaved } from "@/lib/saved";

type SavedCtx = {
  /** Saved guide slugs, oldest first. Empty until loaded. */
  saved: string[];
  ready: boolean;
  /** "account" when signed in (public.saved_builds), else "device" (local storage). */
  where: "account" | "device";
  isSaved: (slug: string) => boolean;
  /** Saves or unsaves a guide; returns true when it is now saved. */
  toggle: (slug: string) => boolean;
};

const SavedContext = createContext<SavedCtx | null>(null);

export function useSavedBuilds(): SavedCtx {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSavedBuilds must be used inside <SavedProvider>");
  return ctx;
}

/**
 * Saved builds follow the maker: public.saved_builds when signed in (RLS: own rows only, capped by a trigger),
 * local storage for guests, and guest bookmarks move into the account on sign-in. Changes show at once and are
 * written in order; a failed write is undone in the UI.
 */
export function SavedProvider({ children }: { children: ReactNode }) {
  const { ready: authReady, userId } = useAuth();
  const toast = useToast();
  const t = useMessages(common);
  const [state, setState] = useState<{ ready: boolean; saved: string[]; where: "account" | "device" }>({ ready: false, saved: [], where: "device" });
  const savedRef = useRef<string[]>([]);
  const ownerRef = useRef<string | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const errorText = useRef(t.nav.savedError);
  useEffect(() => { errorText.current = t.nav.savedError; }, [t]);

  const show = useCallback((saved: string[], where: "account" | "device", ready = true) => {
    savedRef.current = saved;
    setState({ ready, saved, where });
  }, []);

  useEffect(() => {
    if (!authReady) return;
    if (!userId) {
      ownerRef.current = null;
      show(readLocalSaved(), "device");
      const onStorage = (e: StorageEvent) => { if (e.key === null || e.key === SAVED_KEY) show(readLocalSaved(), "device"); };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
    ownerRef.current = userId;
    show([], "account", false);
    let cancelled = false;
    void (async () => {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("saved_builds").select("slug").eq("user_id", userId)
        .order("created_at", { ascending: true }).limit(MAX_SAVED);
      if (cancelled) return;
      // PGRST205 / 42P01: the table is missing until migration 0004 runs. Keep saving on this device meanwhile.
      if (error && (error.code === "PGRST205" || error.code === "42P01")) { ownerRef.current = null; show(readLocalSaved(), "device"); return; }
      if (error) { show([], "account"); return; }
      let saved = cleanSlugs((data ?? []).map((r: { slug: unknown }) => r.slug));
      const guest = readLocalSaved().filter((s) => !saved.includes(s)).slice(0, Math.max(0, MAX_SAVED - saved.length));
      if (guest.length) {
        const { error: moveError } = await supabase.from("saved_builds")
          .upsert(guest.map((slug) => ({ user_id: userId, slug })), { onConflict: "user_id,slug", ignoreDuplicates: true });
        if (cancelled) return;
        if (!moveError) { saved = cleanSlugs([...saved, ...guest]); clearLocalSaved(); }
      }
      show(saved, "account");
    })();
    return () => { cancelled = true; };
  }, [authReady, userId, show]);

  const toggle = useCallback((slug: string): boolean => {
    const before = savedRef.current;
    const has = before.includes(slug);
    const next = has ? before.filter((s) => s !== slug) : cleanSlugs([...before, slug]);
    if (!has && !next.includes(slug)) return false;   // invalid slug or the list is full
    const owner = ownerRef.current;
    show(next, owner ? "account" : "device");
    if (!owner) { writeLocalSaved(next); return !has; }
    queue.current = queue.current.then(async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const { error } = has
          ? await supabase.from("saved_builds").delete().eq("user_id", owner).eq("slug", slug)
          : await supabase.from("saved_builds").upsert({ user_id: owner, slug }, { onConflict: "user_id,slug", ignoreDuplicates: true });
        if (error) throw error;
      } catch {
        if (ownerRef.current !== owner) return;
        show(has ? cleanSlugs([...savedRef.current, slug]) : savedRef.current.filter((s) => s !== slug), "account");
        toast(errorText.current);
      }
    });
    return !has;
  }, [show, toast]);

  const isSaved = useCallback((slug: string) => state.saved.includes(slug), [state.saved]);
  const value = useMemo<SavedCtx>(() => ({ ...state, isSaved, toggle }), [state, isSaved, toggle]);
  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}
