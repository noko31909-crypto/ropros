"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/toast";
import { useMessages } from "@/components/i18n/locale-provider";
import { profile as profileMsgs } from "@/lib/i18n/messages/profile";

/**
 * Deletes the signed-in maker's account. Photos go first through the Storage API (the bucket only lets you remove
 * your own folder), then delete_my_account() removes the sign-in and, through foreign keys, everything else (0004).
 * Typing the maker name confirms it.
 */
export function DeleteAccount({ userId, name }: { userId: string; name: string }) {
  const t = useMessages(profileMsgs).deleteAccount;
  const toast = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const run = async () => {
    if (typed.trim() !== name) return;
    setBusy(true); setError(false);
    const supabase = getSupabaseBrowserClient();
    try {
      // At most 50 rounds of 100 photos; stop early if a round removes nothing, so this can never spin.
      for (let round = 0; round < 50; round++) {
        const { data, error: listError } = await supabase.storage.from("community").list(userId, { limit: 100 });
        if (listError) throw listError;
        const files = (data ?? []).filter((f) => f.id).map((f) => `${userId}/${f.name}`);
        if (!files.length) break;
        const { data: removed, error: removeError } = await supabase.storage.from("community").remove(files);
        if (removeError) throw removeError;
        if (!removed?.length) break;
      }
      const { error: deleteError } = await supabase.rpc("delete_my_account");
      if (deleteError) throw deleteError;
      await supabase.auth.signOut({ scope: "local" });
      toast(t.done);
      router.replace("/");
      router.refresh();
    } catch {
      setBusy(false);
      setError(true);
    }
  };

  return (
    <section aria-labelledby="delete-account" className="rounded-[28px] border border-line p-5 sm:p-6">
      <h2 id="delete-account" className="flex items-center gap-2 text-base font-semibold text-fg"><TriangleAlert className="h-4 w-4 text-accent" aria-hidden />{t.title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-fg-muted">{t.body}</p>
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="mt-4 inline-flex h-10 items-center rounded-xl border border-accent/40 px-4 text-sm font-semibold text-accent hover:bg-accent-soft">{t.start}</button>
      ) : (
        <div className="mt-4 max-w-md space-y-3">
          <label htmlFor="delete-confirm" className="block text-sm text-fg">{t.confirmLabel(name)}</label>
          <input id="delete-confirm" value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" spellCheck={false} disabled={busy}
            className="h-11 w-full rounded-xl border border-line bg-ink-950/60 px-3.5 font-mono text-base text-fg focus:border-accent focus:outline-none sm:text-sm" />
          {error && <p className="text-sm text-accent" role="alert">{t.error}</p>}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => void run()} disabled={busy || typed.trim() !== name}
              className="inline-flex h-10 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover disabled:opacity-50">{busy ? t.deleting : t.confirm}</button>
            <button type="button" onClick={() => { setOpen(false); setTyped(""); setError(false); }} disabled={busy}
              className="inline-flex h-10 items-center rounded-xl border border-line px-4 text-sm text-fg-muted hover:text-fg">{t.cancel}</button>
          </div>
        </div>
      )}
    </section>
  );
}
