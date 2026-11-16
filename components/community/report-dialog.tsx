"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { Flag, X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { useMessages } from "@/components/i18n/locale-provider";
import { moderationMessages } from "@/lib/i18n/messages/moderation";

export const REPORT_REASONS = ["spam", "abuse", "fake", "personal", "other"] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];
export type ReportTarget = { kind: "post" | "comment"; id: string };
const MAX_NOTE = 300;

/** Flag button that opens the report form (sign-in first). Hidden for your own content by the caller. */
export function ReportButton({ target, label, className }: { target: ReportTarget; label: string; className?: string }) {
  const t = useMessages(moderationMessages);
  const { userId, openAuth } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => (userId ? setOpen(true) : openAuth(t.signIn))} aria-label={label} title={label}
        className={clsx("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg", className)}>
        <Flag className="h-4 w-4" aria-hidden />
      </button>
      {open && userId && <ReportDialog target={target} userId={userId} onClose={() => setOpen(false)} />}
    </>
  );
}

/**
 * Report form. The database checks everything (one report per target, not your own, 20 a day, bans);
 * this only translates its answers. Portalled to <body> so it is never trapped inside another dialog.
 */
function ReportDialog({ target, userId, onClose }: { target: ReportTarget; userId: string; onClose: () => void }) {
  const t = useMessages(moderationMessages);
  const toast = useToast();
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    setBusy(true); setError(null);
    const clean = note.replace(/[\u0001-\u0008\u000b-\u001f\u007f]/g, "").trim().slice(0, MAX_NOTE);
    const { error: err } = await getSupabaseBrowserClient().from("content_reports").insert({
      reporter_id: userId, reason, note: clean || null,
      ...(target.kind === "post" ? { post_id: target.id } : { comment_id: target.id }),
    });
    setBusy(false);
    if (!err) { toast(t.thanks); onClose(); return; }
    setError(err.code === "23505" ? t.already : err.code === "22023" ? t.own : err.code === "54000" ? t.limit : t.failed);
  };

  return createPortal(
    <div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <form role="dialog" aria-modal="true" aria-labelledby="report-title" onSubmit={(e) => void submit(e)}
        className="relative w-full max-w-md rounded-t-[28px] border border-line bg-ink-900 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl sm:rounded-[28px] sm:pb-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id="report-title" className="flex items-center gap-2 text-lg font-semibold text-fg"><Flag className="h-5 w-5 text-accent" aria-hidden />{t.dialogTitle}</h2>
          <button type="button" onClick={onClose} aria-label={t.close} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg"><X className="h-5 w-5" aria-hidden /></button>
        </div>
        <p className="mt-1 text-sm text-fg-muted">{t.dialogLead}</p>
        <fieldset className="mt-5 space-y-2">
          <legend className="sr-only">{t.dialogTitle}</legend>
          {REPORT_REASONS.map((r, i) => (
            <label key={r} className={clsx("flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-colors",
              reason === r ? "border-accent/60 bg-accent-soft text-fg" : "border-line text-fg-muted hover:text-fg")}>
              <input ref={i === 0 ? first : undefined} type="radio" name="report-reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="h-4 w-4 accent-accent" />
              {t.reasons[r]}
            </label>
          ))}
        </fieldset>
        <label htmlFor="report-note" className="mt-4 block text-sm font-medium text-fg">{t.note}</label>
        <textarea id="report-note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={MAX_NOTE} rows={2} placeholder={t.notePlaceholder}
          className="mt-1.5 block w-full resize-y rounded-xl border border-line bg-ink-950/60 px-3.5 py-2.5 text-base text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none sm:text-sm" />
        {error && <p className="mt-3 text-sm text-accent" role="alert">{error}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 rounded-xl px-4 text-sm font-semibold text-fg-muted hover:text-fg">{t.cancel}</button>
          <button type="submit" disabled={!reason || busy} className="h-10 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover disabled:opacity-50">
            {busy ? t.sending : t.send}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
