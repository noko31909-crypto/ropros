"use client";

import { useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import { EyeOff, Flag, MessageCircle, ShieldAlert, UserX } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { LOCALE_TAG } from "@/lib/i18n/config";
import { moderationMessages } from "@/lib/i18n/messages/moderation";
import type { ReportReason } from "@/components/community/report-dialog";

type Named = { name: string } | null;
type ReportRow = {
  id: string; reason: ReportReason; note: string | null; created_at: string; post_id: string | null; comment_id: string | null;
  reporter: Named;
  post: { id: string; title: string; image_url: string; user_id: string; hidden: boolean; author: Named } | null;
  comment: { id: string; body: string; user_id: string; post_id: string; author: Named } | null;
};
type Target = { key: string; kind: "post" | "comment"; id: string; authorId: string; author: string; text: string; hidden?: boolean; image?: string; reports: ReportRow[] };
type HiddenPost = { id: string; title: string; created_at: string; users: Named };

const REPORTS = "id, reason, note, created_at, post_id, comment_id, reporter:users!content_reports_reporter_id_fkey(name), "
  + "post:community_posts!content_reports_post_id_fkey(id, title, image_url, user_id, hidden, author:users!community_posts_user_id_fkey(name)), "
  + "comment:post_comments!content_reports_comment_id_fkey(id, body, user_id, post_id, author:users!post_comments_user_id_fkey(name))";

/**
 * Moderators' page: open reports grouped by what they are about, hidden posts and banned makers.
 * Visible only to moderators, and every action goes through a database function that checks again (0004).
 */
export function AdminPanel() {
  const t = useMessages(moderationMessages);
  const a = t.admin;
  const { locale } = useLocale();
  const { ready, userId, openAuth } = useAuth();
  const toast = useToast();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [targets, setTargets] = useState<Target[] | null>(null);
  const [hidden, setHidden] = useState<HiddenPost[]>([]);
  const [banned, setBanned] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!userId) { setAllowed(false); return; }
    void Promise.resolve(getSupabaseBrowserClient().rpc("is_admin")).then(({ data, error: e }) => setAllowed(!e && data === true), () => setAllowed(false));
  }, [ready, userId]);

  const load = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    const [reports, hiddenPosts, bannedUsers] = await Promise.all([
      supabase.from("content_reports").select(REPORTS).eq("status", "open").order("created_at", { ascending: false }).limit(200),
      supabase.from("community_posts").select("id, title, created_at, users!community_posts_user_id_fkey(name)").eq("hidden", true).order("created_at", { ascending: false }).limit(100),
      supabase.rpc("admin_banned_users"),
    ]);
    if (reports.error) { setError(true); setTargets([]); return; }
    setError(false);
    const rows = (reports.data ?? []) as unknown as ReportRow[];
    const paths = [...new Set(rows.flatMap((r) => (r.post ? [r.post.image_url] : [])))];
    const signed = paths.length ? (await supabase.storage.from("community").createSignedUrls(paths, 3600)).data ?? [] : [];
    const urlByPath = new Map(signed.map((s) => [s.path, s.signedUrl]));
    const byKey = new Map<string, Target>();
    for (const r of rows) {
      const target: Omit<Target, "reports"> | null = r.post
        ? { key: `p:${r.post.id}`, kind: "post", id: r.post.id, authorId: r.post.user_id, author: r.post.author?.name ?? "maker", text: r.post.title, hidden: r.post.hidden, image: urlByPath.get(r.post.image_url) ?? undefined }
        : r.comment
          ? { key: `c:${r.comment.id}`, kind: "comment", id: r.comment.id, authorId: r.comment.user_id, author: r.comment.author?.name ?? "maker", text: r.comment.body }
          : null;
      if (!target) continue;
      const entry = byKey.get(target.key) ?? { ...target, reports: [] };
      entry.reports.push(r);
      byKey.set(target.key, entry);
    }
    setTargets([...byKey.values()]);
    setHidden((hiddenPosts.data ?? []) as unknown as HiddenPost[]);
    setBanned((bannedUsers.data ?? []) as { id: string; name: string }[]);
  }, []);

  useEffect(() => { if (allowed) void load(); }, [allowed, load]);

  const act = async (key: string, run: () => PromiseLike<{ error: unknown }>) => {
    setBusy(key);
    const { error: e } = await run();
    setBusy(null);
    toast(e ? a.error : a.done);
    void load();
  };
  const supabase = () => getSupabaseBrowserClient();
  const dismissAll = (tg: Target) => act(`${tg.key}:dismiss`, async () => {
    for (const r of tg.reports) {
      const res = await supabase().rpc("resolve_report", { p_report: r.id, p_status: "dismissed" });
      if (res.error) return res;
    }
    return { error: null };
  });

  if (!ready || allowed === null) return <p className="text-fg-muted">{a.loading}</p>;
  if (!allowed) {
    return (
      <div className="rounded-[28px] border border-line bg-ink-850 p-6 sm:p-8">
        <ShieldAlert className="h-6 w-6 text-fg-subtle" aria-hidden />
        <p className="mt-4 text-fg">{a.notAllowed}</p>
        {!userId && <button type="button" onClick={() => openAuth()} className="mt-4 inline-flex h-10 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover">{t.signIn}</button>}
      </div>
    );
  }

  const dateFmt = new Intl.DateTimeFormat(LOCALE_TAG[locale], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const btn = "inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors disabled:opacity-50";

  return (
    <div className="space-y-12">
      <section aria-labelledby="open-reports">
        <h2 id="open-reports" className="flex items-center gap-2 text-xl font-semibold text-fg"><Flag className="h-5 w-5 text-accent" aria-hidden />{a.open}
          {targets && <span className="font-mono text-sm text-fg-subtle">{targets.length}</span>}</h2>
        {error && <p className="mt-3 text-sm text-accent" role="alert">{a.loadError}</p>}
        {targets === null ? <p className="mt-4 text-fg-muted">{a.loading}</p> : targets.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-ink-700 p-6 text-sm text-fg-muted">{a.none}</p>
        ) : (
          <ul className="mt-5 space-y-4">
            {targets.map((tg) => (
              <li key={tg.key} className="rounded-2xl border border-line bg-ink-900 p-4 sm:p-5">
                <div className="flex gap-4">
                  {tg.kind === "post" && (tg.image
                    // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from a private bucket
                    ? <img src={tg.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                    : <span className="h-20 w-20 shrink-0 rounded-xl bg-ink-800" />)}
                  {tg.kind === "comment" && <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-fg-muted"><MessageCircle className="h-5 w-5" aria-hidden /></span>}
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{tg.kind === "post" ? a.post : a.comment} · {a.by(tg.author)}
                      {tg.hidden && <span className="ml-2 rounded-full border border-accent/40 px-1.5 text-accent">{a.hiddenBadge}</span>}</p>
                    <p className="mt-1 whitespace-pre-line break-words text-sm text-fg">{tg.text}</p>
                    <ul className="mt-2 space-y-1">
                      {tg.reports.map((r) => (
                        <li key={r.id} className="text-xs text-fg-muted">
                          <span className="font-mono text-fg-subtle">{dateFmt.format(new Date(r.created_at))}</span> {a.reportedBy(r.reporter?.name ?? "maker", t.reasons[r.reason])}
                          {r.note && <span className="block whitespace-pre-line break-words pl-4 text-fg-subtle">“{r.note}”</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tg.kind === "post" ? (
                    <button type="button" disabled={busy !== null} onClick={() => void act(`${tg.key}:hide`, () => supabase().rpc("moderate_post", { p_post: tg.id, p_hidden: !tg.hidden }))}
                      className={clsx(btn, "border-accent/50 bg-accent-soft text-accent hover:bg-accent hover:text-ink-950")}><EyeOff className="h-4 w-4" aria-hidden />{tg.hidden ? a.show : a.hide}</button>
                  ) : (
                    <button type="button" disabled={busy !== null} onClick={() => void act(`${tg.key}:delete`, () => supabase().from("post_comments").delete().eq("id", tg.id))}
                      className={clsx(btn, "border-accent/50 bg-accent-soft text-accent hover:bg-accent hover:text-ink-950")}>{a.deleteComment}</button>
                  )}
                  <button type="button" disabled={busy !== null || tg.authorId === userId} onClick={() => void act(`${tg.key}:ban`, () => supabase().rpc("set_banned", { p_user: tg.authorId, p_banned: true }))}
                    className={clsx(btn, "border-line text-fg-muted hover:text-fg")}><UserX className="h-4 w-4" aria-hidden />{a.ban}</button>
                  <button type="button" disabled={busy !== null} onClick={() => void dismissAll(tg)} className={clsx(btn, "border-line text-fg-muted hover:text-fg")}>{a.dismiss}</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-12 lg:grid-cols-2">
        <section aria-labelledby="hidden-posts">
          <h2 id="hidden-posts" className="text-lg font-semibold text-fg">{a.hiddenTitle}</h2>
          {hidden.length === 0 ? <p className="mt-3 text-sm text-fg-subtle">{a.hiddenNone}</p> : (
            <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-900">
              {hidden.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-fg">{p.title}</p>
                    <p className="font-mono text-[11px] text-fg-subtle">{a.by(p.users?.name ?? "maker")} · {dateFmt.format(new Date(p.created_at))}</p>
                  </div>
                  <button type="button" disabled={busy !== null} onClick={() => void act(`h:${p.id}`, () => supabase().rpc("moderate_post", { p_post: p.id, p_hidden: false }))}
                    className={clsx(btn, "border-line text-fg-muted hover:text-fg")}>{a.show}</button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section aria-labelledby="banned-makers">
          <h2 id="banned-makers" className="text-lg font-semibold text-fg">{a.bannedTitle}</h2>
          {banned.length === 0 ? <p className="mt-3 text-sm text-fg-subtle">{a.bannedNone}</p> : (
            <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-900">
              {banned.map((u) => (
                <li key={u.id} className="flex items-center gap-3 px-4 py-3">
                  <p className="min-w-0 flex-1 truncate text-sm text-fg">@{u.name}</p>
                  <button type="button" disabled={busy !== null} onClick={() => void act(`b:${u.id}`, () => supabase().rpc("set_banned", { p_user: u.id, p_banned: false }))}
                    className={clsx(btn, "border-line text-fg-muted hover:text-fg")}>{a.unban}</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <p className="border-t border-line pt-6 text-xs text-fg-subtle">{a.howTo}</p>
    </div>
  );
}
