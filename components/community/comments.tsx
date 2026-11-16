"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Send, Trash2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { Avatar } from "@/components/auth/avatar";
import { useToast } from "@/components/ui/toast";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { LOCALE_TAG } from "@/lib/i18n/config";
import { community } from "@/lib/i18n/messages/community";

/** Same limit as the post_comments.body check in supabase/migrations/0003_workbench_comments.sql. */
export const MAX_COMMENT = 500;

type Comment = { id: string; user_id: string; body: string; created_at: string; author: string; authorLevel?: number };
type Row = { id: string; user_id: string; body: string; created_at: string; users: { name: string; level: number } | null };

/** Trimmed, at most two blank lines in a row, without the control characters the database refuses. */
export function cleanComment(text: string): string {
  return text.replace(/[\u0001-\u0008\u000b-\u001f\u007f]/g, "").replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * Comments under one post. Anyone can read them; signed-in makers write as themselves (RLS), and the comment's
 * author or the post's author can delete one. Length and the daily limit are enforced by the database (0003).
 * Bodies render as text, never as HTML.
 */
export function Comments({ postId, postAuthorId, onCountChange }: { postId: string; postAuthorId: string; onCountChange?: (delta: number) => void }) {
  const t = useMessages(community).comments;
  const { locale } = useLocale();
  const { userId, profile, openAuth } = useAuth();
  const toast = useToast();
  const [list, setList] = useState<Comment[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await getSupabaseBrowserClient().from("post_comments")
      .select("id, user_id, body, created_at, users!post_comments_user_id_fkey(name, level)")
      .eq("post_id", postId).order("created_at", { ascending: true }).limit(200);
    if (error) { setLoadError(true); setList([]); return; }
    setLoadError(false);
    setList(((data ?? []) as unknown as Row[]).map(({ users, ...c }) => ({ ...c, author: users?.name ?? "maker", authorLevel: users?.level })));
  }, [postId]);

  useEffect(() => { void load(); }, [load]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) { openAuth(t.signIn); return; }
    const clean = cleanComment(body);
    if (!clean) return;
    if (clean.length > MAX_COMMENT) { setFormError(t.tooLong); return; }
    setBusy(true); setFormError(null);
    const { data, error } = await getSupabaseBrowserClient().from("post_comments")
      .insert({ post_id: postId, user_id: userId, body: clean })
      .select("id, user_id, body, created_at").single<Omit<Comment, "author" | "authorLevel">>();
    setBusy(false);
    if (error || !data) { setFormError(error?.code === "54000" ? t.limit : t.error); return; }   // 54000: 50 comments a day
    setList((l) => [...(l ?? []), { ...data, author: profile?.name ?? "maker", authorLevel: profile?.level }]);
    setBody("");
    onCountChange?.(1);
  };

  const remove = async (c: Comment) => {
    const { error, count } = await getSupabaseBrowserClient().from("post_comments").delete({ count: "exact" }).eq("id", c.id);
    if (error || count === 0) { toast(t.delError); return; }
    setList((l) => l?.filter((x) => x.id !== c.id) ?? null);
    onCountChange?.(-1);
    toast(t.deleted);
  };

  const dateFmt = new Intl.DateTimeFormat(LOCALE_TAG[locale], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const left = MAX_COMMENT - body.length;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h3 className="text-sm font-semibold text-fg">{t.title}{list && list.length > 0 && <span className="ml-2 font-mono text-xs text-fg-subtle">{list.length}</span>}</h3>
      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
        {list === null ? (
          <div className="h-16 animate-pulse rounded-xl bg-ink-850 motion-reduce:animate-none" aria-hidden />
        ) : loadError ? (
          <p className="text-sm text-accent" role="alert">{t.loadError}</p>
        ) : list.length === 0 ? (
          <p className="text-sm text-fg-subtle">{t.empty}</p>
        ) : (
          <ul className="space-y-4">
            {list.map((c) => (
              <li key={c.id} className="flex gap-3">
                <span className="shrink-0"><Avatar name={c.author} size="sm" level={c.authorLevel} /></span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-xs">
                    <span className="font-semibold text-fg">@{c.author}</span>
                    {c.user_id === postAuthorId && <span className="rounded-full border border-line px-1.5 font-mono text-[10px] text-fg-subtle">{t.authorBadge}</span>}
                    <span className="font-mono text-[11px] text-fg-subtle">{dateFmt.format(new Date(c.created_at))}</span>
                  </p>
                  <p className="mt-1 whitespace-pre-line break-words text-sm leading-relaxed text-fg-muted">{c.body}</p>
                </div>
                {userId && (c.user_id === userId || postAuthorId === userId) && (
                  <button type="button" onClick={() => void remove(c)} aria-label={t.del(c.author)} title={t.del(c.author)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-accent">
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {userId ? (
        <form onSubmit={(e) => void submit(e)} className="mt-4 border-t border-line pt-4">
          <label htmlFor={`comment-${postId}`} className="sr-only">{t.label}</label>
          <textarea id={`comment-${postId}`} value={body} onChange={(e) => setBody(e.target.value)} rows={2} maxLength={MAX_COMMENT}
            placeholder={t.placeholder}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); void submit(e); } }}
            className="block w-full resize-y rounded-xl border border-line bg-ink-950/60 px-3.5 py-2.5 text-base text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none sm:text-sm" />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className={left < 50 ? "font-mono text-[11px] text-accent" : "font-mono text-[11px] text-fg-subtle"}>{left}</span>
            <button type="submit" disabled={busy || !cleanComment(body)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover disabled:opacity-50">
              <Send className="h-4 w-4" aria-hidden />{busy ? t.sending : t.send}
            </button>
          </div>
          {formError && <p className="mt-2 text-sm text-accent" role="alert">{formError}</p>}
        </form>
      ) : (
        <button type="button" onClick={() => openAuth(t.signIn)}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-fg hover:border-fg-subtle">{t.signIn}</button>
      )}
    </div>
  );
}
