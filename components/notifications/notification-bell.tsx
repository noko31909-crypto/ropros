"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { Bell, CheckCheck, MessageCircle } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { LOCALE_TAG } from "@/lib/i18n/config";
import { notificationMessages } from "@/lib/i18n/messages/notifications";

type Item = { id: number; post_id: string; created_at: string; read_at: string | null; actor: { name: string } | null; post: { title: string } | null };
const POLL_MS = 90_000;

/**
 * Comments on your builds (public.notifications, written by a trigger in 0004; RLS shows only your own).
 * The unread count refreshes on load, on focus and every 90 s while the tab is visible.
 */
export function NotificationBell() {
  const t = useMessages(notificationMessages);
  const { locale } = useLocale();
  const { userId } = useAuth();
  const router = useRouter();
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const count = useCallback(async () => {
    if (!userId) return;
    const { count: n, error: e } = await getSupabaseBrowserClient().from("notifications")
      .select("id", { count: "exact", head: true }).eq("user_id", userId).is("read_at", null);
    if (!e) setUnread(n ?? 0);
  }, [userId]);

  useEffect(() => {
    if (!userId) { setUnread(0); setItems(null); return; }
    void count();
    const onFocus = () => { if (document.visibilityState === "visible") void count(); };
    const timer = setInterval(onFocus, POLL_MS);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => { clearInterval(timer); window.removeEventListener("focus", onFocus); document.removeEventListener("visibilitychange", onFocus); };
  }, [userId, count]);

  const load = useCallback(async () => {
    if (!userId) return;
    const { data, error: e } = await getSupabaseBrowserClient().from("notifications")
      .select("id, post_id, created_at, read_at, actor:users!notifications_actor_id_fkey(name), post:community_posts!notifications_post_id_fkey(title)")
      .eq("user_id", userId).order("created_at", { ascending: false }).limit(15);
    setError(!!e);
    setItems(e ? [] : ((data ?? []) as unknown as Item[]));
  }, [userId]);

  useEffect(() => {
    if (!open) return;
    void load();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open, load]);

  const markRead = async (ids?: number[]) => {
    if (!userId) return;
    let q = getSupabaseBrowserClient().from("notifications").update({ read_at: new Date().toISOString() }).eq("user_id", userId).is("read_at", null);
    if (ids) q = q.in("id", ids);
    const { error: e } = await q;
    if (e) return;
    setItems((list) => list?.map((n) => (!ids || ids.includes(n.id) ? { ...n, read_at: n.read_at ?? new Date().toISOString() } : n)) ?? null);
    void count();
  };

  const go = (n: Item) => {
    setOpen(false);
    if (!n.read_at) void markRead([n.id]);
    router.push(`/community?post=${encodeURIComponent(n.post_id)}`);
  };

  if (!userId) return null;
  const dateFmt = new Intl.DateTimeFormat(LOCALE_TAG[locale], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="true" aria-label={t.button(unread)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-ink-800 hover:text-fg lg:h-9 lg:w-9">
        <Bell className="h-[18px] w-[18px]" aria-hidden />
        {unread > 0 && (
          <span className="absolute right-1 top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-semibold leading-4 text-ink-950 lg:right-0 lg:top-0">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div role="dialog" aria-label={t.title}
          className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2.5rem))] animate-fade-up overflow-hidden rounded-2xl border border-line bg-ink-900/95 shadow-2xl backdrop-blur-xl motion-reduce:animate-none">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <p className="text-sm font-semibold text-fg">{t.title}{unread > 0 && <span className="ml-2 font-mono text-xs text-accent">{t.unread(unread)}</span>}</p>
            {unread > 0 && (
              <button type="button" onClick={() => void markRead()} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover">
                <CheckCheck className="h-3.5 w-3.5" aria-hidden />{t.markAll}
              </button>
            )}
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-1.5">
            {items === null ? (
              <div className="h-16 animate-pulse rounded-xl bg-ink-850 motion-reduce:animate-none" aria-hidden />
            ) : error ? (
              <p className="px-3 py-4 text-sm text-accent" role="alert">{t.loadError}</p>
            ) : items.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-fg-subtle">{t.empty}</p>
            ) : (
              <ul>
                {items.map((n) => (
                  <li key={n.id}>
                    <button type="button" onClick={() => go(n)}
                      className={clsx("flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ink-800", !n.read_at && "bg-accent-soft/60")}>
                      <MessageCircle className={clsx("mt-0.5 h-4 w-4 shrink-0", n.read_at ? "text-fg-subtle" : "text-accent")} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm leading-snug text-fg">{t.commented(n.actor?.name ?? "maker", n.post?.title ?? t.removedPost)}</span>
                        <span className="mt-0.5 block font-mono text-[11px] text-fg-subtle">{dateFmt.format(new Date(n.created_at))}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
