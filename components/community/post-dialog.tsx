"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BookOpen, Heart, X } from "lucide-react";
import { Avatar } from "@/components/auth/avatar";
import { useMessages } from "@/components/i18n/locale-provider";
import { community } from "@/lib/i18n/messages/community";
import { Comments } from "./comments";
import { StatusBadge } from "./status-badge";
import type { FeedPost } from "./post-card";

/**
 * One build log: the photo, who built it, the guide it follows, and its comments. Escape or the backdrop closes it.
 * `guideTitle` (the linked guide's title in the page language) comes from the caller, so this stays free of the guide index.
 */
export function PostDialog({ post, guideTitle, onClose, onCountChange }: { post: FeedPost; guideTitle?: string; onClose: () => void; onCountChange?: (delta: number) => void }) {
  const t = useMessages(community);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); opener?.focus(); };
  }, [onClose]);

  const guide = post.guide && guideTitle ? { slug: post.guide, title: guideTitle } : null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" aria-labelledby={`post-title-${post.id}`}
        className="relative flex max-h-[100dvh] w-full max-w-5xl animate-fade-up flex-col overflow-hidden rounded-t-[28px] border border-line bg-ink-900 pb-[env(safe-area-inset-bottom,0px)] shadow-2xl motion-reduce:animate-none sm:max-h-[90vh] sm:rounded-[28px] md:flex-row">
        <div className="relative flex shrink-0 items-center justify-center bg-ink-950 md:w-[55%]">
          {post.signedUrl
            // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from a private bucket
            ? <img src={post.signedUrl} alt={post.title} className="max-h-[34vh] w-full object-contain md:max-h-[90vh]" />
            : <div className="aspect-[4/5] max-h-[34vh] w-full bg-ink-800 bg-grid md:max-h-none" />}
          <div className="absolute left-3 top-3"><StatusBadge status={post.status} label={t.status[post.status]} /></div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Avatar name={post.author} size="sm" level={post.authorLevel} />
            <div className="min-w-0 flex-1">
              <h2 id={`post-title-${post.id}`} className="text-lg font-semibold leading-snug text-fg">{post.title}</h2>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-fg-muted">
                <span>@{post.author}</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs"><Heart className="h-3.5 w-3.5" aria-hidden />{t.dialog.likes(post.likes_count)}</span>
              </p>
              {guide && (
                <p className="mt-2 text-sm">
                  <BookOpen className="mr-1.5 inline h-4 w-4 align-[-3px] text-accent" aria-hidden />
                  <span className="text-fg-subtle">{t.dialog.builtFrom}:</span>{" "}
                  <Link href={`/projects/${encodeURIComponent(guide.slug)}`} className="font-medium text-accent hover:text-accent-hover">{guide.title}</Link>
                </p>
              )}
            </div>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t.dialog.close}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg"><X className="h-5 w-5" aria-hidden /></button>
          </div>
          <div className="mt-5 flex min-h-[220px] flex-1 flex-col border-t border-line pt-5">
            <Comments postId={post.id} postAuthorId={post.user_id} onCountChange={onCountChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
