"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { useMessages } from "@/components/i18n/locale-provider";
import { community } from "@/lib/i18n/messages/community";

/**
 * Owner-only delete with an inline confirm step. RLS restricts the delete to the post's owner;
 * XP already earned is kept by design (xp_events are not reverted).
 */
export function DeletePost({ id, title, imagePath, onDeleted }: { id: string; title: string; imagePath: string; onDeleted: (id: string) => void }) {
  const t = useMessages(community).del;
  const toast = useToast();
  const { refreshProfile } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    const supabase = getSupabaseBrowserClient();
    const { error, count } = await supabase.from("community_posts").delete({ count: "exact" }).eq("id", id);
    if (error || count === 0) { setBusy(false); toast(t.error); return; }
    // Row is gone; a failed photo cleanup must not resurrect it in the UI.
    await supabase.storage.from("community").remove([imagePath]);
    onDeleted(id);
    toast(t.done);
    void refreshProfile();
  };

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} aria-label={t.action(title)} title={t.action(title)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-900 text-fg-muted transition-colors hover:border-accent/40 hover:text-accent sm:h-10 sm:w-10">
        <Trash2 className="h-4 w-4" aria-hidden />
      </button>
    );
  }
  return (
    <div role="group" aria-label={t.action(title)} className="flex w-full flex-wrap items-center gap-2 rounded-xl border border-accent/40 bg-accent-soft p-2 text-[12px] sm:text-sm">
      <span className="min-w-0 flex-1 text-fg">{t.confirm}</span>
      <button type="button" disabled={busy} onClick={() => void run()} autoFocus
        className="h-8 rounded-lg bg-accent px-3 font-semibold text-ink-950 hover:bg-accent-hover disabled:opacity-60">{t.yes}</button>
      <button type="button" disabled={busy} onClick={() => setConfirming(false)}
        className="h-8 rounded-lg border border-line px-3 text-fg-muted hover:text-fg">{t.cancel}</button>
    </div>
  );
}
