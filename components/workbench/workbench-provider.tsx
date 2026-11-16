"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { useMessages } from "@/components/i18n/locale-provider";
import { workbenchMessages } from "@/lib/i18n/messages/workbench";
import { matchPartIds } from "@/lib/finder/projects-data";
import type { FinderResult } from "@/lib/finder/match";
import { MAX_WORKBENCH_PARTS, WORKBENCH_KEY, cleanPartIds, clearLocalWorkbench, readLocalWorkbench, writeLocalWorkbench } from "@/lib/workbench";

type WorkbenchCtx = {
  /** False until the guest list or the account rows are loaded. */
  ready: boolean;
  /** Parts-catalog ids, in the order they were added. */
  parts: string[];
  /** "account" when signed in (public.user_parts), else "device" (local storage). */
  where: "account" | "device";
  add: (ids: readonly string[]) => void;
  remove: (id: string) => void;
  replace: (ids: readonly string[]) => void;
};

const WorkbenchContext = createContext<WorkbenchCtx | null>(null);

export function useWorkbench(): WorkbenchCtx {
  const ctx = useContext(WorkbenchContext);
  if (!ctx) throw new Error("useWorkbench must be used inside <WorkbenchProvider>");
  return ctx;
}

/** What the workbench builds: null until it is loaded or while it is empty. */
export function useWorkbenchMatches(): FinderResult | null {
  const { ready, parts } = useWorkbench();
  return useMemo(() => (ready && parts.length ? matchPartIds(parts) : null), [ready, parts]);
}

/**
 * Keeps the workbench in step with where it lives. Guests: local storage. Signed in: public.user_parts, where RLS
 * limits every read and write to the signed-in maker and a trigger caps the list (0003). Parts collected while
 * signed out move into the account on sign-in. Changes show at once and are written in order; a failed write is
 * rolled back in the UI.
 */
export function WorkbenchProvider({ children }: { children: ReactNode }) {
  const { ready: authReady, userId } = useAuth();
  const toast = useToast();
  const t = useMessages(workbenchMessages);
  const [state, setState] = useState<{ ready: boolean; parts: string[]; where: "account" | "device" }>({ ready: false, parts: [], where: "device" });
  const partsRef = useRef<string[]>([]);
  const ownerRef = useRef<string | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const messages = useRef(t);
  useEffect(() => { messages.current = t; }, [t]);

  const show = useCallback((parts: string[], where: "account" | "device", ready = true) => {
    partsRef.current = parts;
    setState({ ready, parts, where });
  }, []);

  useEffect(() => {
    if (!authReady) return;
    if (!userId) {
      ownerRef.current = null;
      show(readLocalWorkbench(), "device");
      // Another tab of a guest changed the list.
      const onStorage = (e: StorageEvent) => { if (e.key === null || e.key === WORKBENCH_KEY) show(readLocalWorkbench(), "device"); };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
    ownerRef.current = userId;
    show([], "account", false);
    let cancelled = false;
    void (async () => {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("user_parts").select("part_id").eq("user_id", userId)
        .order("created_at", { ascending: true }).limit(MAX_WORKBENCH_PARTS);
      if (cancelled) return;
      // PGRST205 / 42P01: the table is missing until migration 0003 runs. Keep a working workbench on this device meanwhile.
      if (error && (error.code === "PGRST205" || error.code === "42P01")) { ownerRef.current = null; show(readLocalWorkbench(), "device"); return; }
      if (error) { show([], "account"); toast(messages.current.loadError); return; }
      let parts = cleanPartIds((data ?? []).map((r: { part_id: unknown }) => r.part_id));
      const guest = readLocalWorkbench().filter((id) => !parts.includes(id)).slice(0, Math.max(0, MAX_WORKBENCH_PARTS - parts.length));
      if (guest.length) {
        const { error: moveError } = await supabase.from("user_parts")
          .upsert(guest.map((part_id) => ({ user_id: userId, part_id })), { onConflict: "user_id,part_id", ignoreDuplicates: true });
        if (cancelled) return;
        if (!moveError) { parts = cleanPartIds([...parts, ...guest]); clearLocalWorkbench(); }
      }
      show(parts, "account");
    })();
    return () => { cancelled = true; };
  }, [authReady, userId, show, toast]);

  /** Shows the new list now; for an account, queues the write and undoes the change if it fails. */
  const commit = useCallback((next: string[], write?: (uid: string) => PromiseLike<{ error: unknown }>, undo?: () => string[]) => {
    const owner = ownerRef.current;
    show(next, owner ? "account" : "device");
    if (!owner) { writeLocalWorkbench(next); return; }
    if (!write || !undo) return;
    // The queue never rejects, so one failed write cannot skip the ones after it.
    queue.current = queue.current.then(async () => {
      try {
        const { error } = await write(owner);
        if (error) throw error;
      } catch {
        if (ownerRef.current === owner) { show(undo(), "account"); toast(messages.current.saveError); }
      }
    });
  }, [show, toast]);

  const add = useCallback((ids: readonly string[]) => {
    const before = partsRef.current;
    const next = cleanPartIds([...before, ...ids]);
    const added = next.filter((id) => !before.includes(id));
    if (!added.length) return;
    commit(next,
      (uid) => getSupabaseBrowserClient().from("user_parts")
        .upsert(added.map((part_id) => ({ user_id: uid, part_id })), { onConflict: "user_id,part_id", ignoreDuplicates: true }),
      () => partsRef.current.filter((id) => !added.includes(id)));
  }, [commit]);

  const remove = useCallback((id: string) => {
    if (!partsRef.current.includes(id)) return;
    commit(partsRef.current.filter((x) => x !== id),
      (uid) => getSupabaseBrowserClient().from("user_parts").delete().eq("user_id", uid).eq("part_id", id),
      () => cleanPartIds([...partsRef.current, id]));
  }, [commit]);

  const replace = useCallback((ids: readonly string[]) => {
    const before = partsRef.current;
    const next = cleanPartIds(ids);
    const added = next.filter((id) => !before.includes(id));
    const removed = before.filter((id) => !next.includes(id));
    if (!added.length && !removed.length) {
      if (next.join() !== before.join()) commit(next);   // same parts, new order: nothing to write
      return;
    }
    commit(next,
      async (uid) => {
        const supabase = getSupabaseBrowserClient();
        if (removed.length) {
          const { error } = await supabase.from("user_parts").delete().eq("user_id", uid).in("part_id", removed);
          if (error) return { error };
        }
        if (added.length) {
          return supabase.from("user_parts").upsert(added.map((part_id) => ({ user_id: uid, part_id })), { onConflict: "user_id,part_id", ignoreDuplicates: true });
        }
        return { error: null };
      },
      () => cleanPartIds([...partsRef.current.filter((id) => !added.includes(id)), ...removed]));
  }, [commit]);

  const value = useMemo<WorkbenchCtx>(() => ({ ...state, add, remove, replace }), [state, add, remove, replace]);
  return <WorkbenchContext.Provider value={value}>{children}</WorkbenchContext.Provider>;
}
