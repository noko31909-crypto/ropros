"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { ArrowRight, ImageUp, X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useMessages } from "@/components/i18n/locale-provider";
import { community } from "@/lib/i18n/messages/community";
import { readAndResize, type Resized, type ResizeError } from "./resize";
import type { BuildStatus } from "./status-badge";

type ProjectOption = { id: string; title: string };

/** Upload a photo to the private `community` bucket under `<uid>/` and insert a community_posts row. XP is awarded by DB triggers. */
export function ShareModal({ userId, onClose, onPublished }: { userId: string; onClose: () => void; onPublished: () => void }) {
  const t = useMessages(community);
  const supabase = getSupabaseBrowserClient();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<BuildStatus>("working");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [photo, setPhoto] = useState<Resized | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  useEffect(() => {
    void supabase.from("projects").select("id, title").order("title").limit(300)
      .then(({ data }) => setProjects((data ?? []) as ProjectOption[]));
  }, [supabase]);

  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo.previewUrl); }, [photo]);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    try { setPhoto(await readAndResize(file)); }
    catch (e) { setError(t.errors[(typeof e === "string" ? e : "read") as ResizeError] ?? t.errors.read); }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = title.trim();
    if (clean.length < 1 || clean.length > 80) { setError(t.errors.title); return; }
    if (!photo) { setError(t.errors.noPhoto); return; }
    setBusy(true); setError(null);
    // Random object key inside the author's folder; storage + table policies require `<auth.uid()>/...`.
    const path = `${userId}/${crypto.randomUUID()}.${photo.ext}`;
    const up = await supabase.storage.from("community").upload(path, photo.blob, { contentType: photo.type, upsert: false });
    if (up.error) { setBusy(false); setError(t.errors.upload); return; }
    const { error: err } = await supabase.from("community_posts")
      .insert({ user_id: userId, title: clean, status, image_url: path, project_id: projectId || null });
    if (err) {
      await supabase.storage.from("community").remove([path]); setBusy(false);
      setError(err.code === "54000" ? t.errors.limit : t.errors.publish);   // 54000: 10 posts per 24 h (check_new_post)
      return;
    }
    onPublished();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" onClick={onClose} aria-hidden />
      <form role="dialog" aria-modal="true" aria-labelledby="share-title" onSubmit={(e) => void submit(e)}
        className="relative max-h-[100dvh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-t-[28px] border border-line bg-ink-900 pb-[env(safe-area-inset-bottom,0px)] shadow-2xl sm:rounded-[28px]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative flex items-center justify-between border-b border-line px-6 py-4">
          <h2 id="share-title" className="text-lg font-semibold text-fg">{t.modal.title}</h2>
          <button type="button" onClick={onClose} aria-label={t.modal.close} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg"><X className="h-5 w-5" /></button>
        </div>
        <div className="relative space-y-5 p-6">
          <label onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); void pick(e.dataTransfer.files[0]); }}
            className={clsx("group relative flex aspect-[16/10] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-ink-950/60 text-center transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent hover:border-accent/60",
              dragging ? "border-accent" : "border-ink-700")}>
            {photo ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
                <img src={photo.previewUrl} alt={t.modal.preview} className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute bottom-3 rounded-full bg-ink-950/70 px-3 py-1 text-xs text-fg backdrop-blur-md">{t.modal.replace}</span>
              </>
            ) : (
              <>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink-850 text-accent transition-transform group-hover:-translate-y-0.5"><ImageUp className="h-5 w-5" /></span>
                <span className="mt-3 px-4 text-sm font-semibold text-fg">{t.modal.drop}</span>
                <span className="mt-1 text-xs text-fg-subtle">{t.modal.hint}</span>
              </>
            )}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => { void pick(e.target.files?.[0]); e.target.value = ""; }} />
          </label>
          <div>
            <label htmlFor="share-name" className="mb-1.5 block text-sm font-medium text-fg">{t.modal.name}</label>
            <input id="share-name" ref={nameRef} required maxLength={80} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t.modal.namePlaceholder}
              className="h-11 w-full rounded-xl border border-line bg-ink-950/60 px-3.5 text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none" />
          </div>
          <fieldset>
            <legend className="mb-1.5 text-sm font-medium text-fg">{t.modal.status}</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["working", "debugging"] as const).map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="radio" name="share-status" value={s} checked={status === s} onChange={() => setStatus(s)} className="peer sr-only" />
                  <span className={clsx("flex h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent",
                    status === s ? (s === "working" ? "border-signal/50 bg-signal-soft text-signal" : "border-accent/50 bg-accent-soft text-accent-hover") : "border-line text-fg-muted hover:text-fg")}>
                    {t.status[s]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          {projects.length > 0 && (
            <div>
              <label htmlFor="share-project" className="mb-1.5 block text-sm font-medium text-fg">{t.modal.project}</label>
              <select id="share-project" value={projectId} onChange={(e) => setProjectId(e.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-ink-950/60 px-3 text-fg focus:border-accent focus:outline-none">
                <option value="">{t.modal.noProject}</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
          )}
          {error && <p className="text-sm text-accent" role="alert">{error}</p>}
        </div>
        <div className="relative flex items-center justify-end gap-2 border-t border-line px-6 py-4">
          <button type="button" onClick={onClose} className="h-11 rounded-xl px-4 text-sm font-semibold text-fg-muted hover:text-fg">{t.modal.cancel}</button>
          <button type="submit" disabled={busy} className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-ink-950 shadow-glow transition-colors hover:bg-accent-hover disabled:opacity-60">
            <ArrowRight className="h-4 w-4" />{busy ? t.modal.publishing : t.modal.publish}
          </button>
        </div>
      </form>
    </div>
  );
}
