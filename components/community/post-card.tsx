"use client";

import { clsx } from "clsx";
import { Heart } from "lucide-react";
import { Avatar } from "@/components/auth/avatar";
import { useMessages } from "@/components/i18n/locale-provider";
import { community } from "@/lib/i18n/messages/community";
import { StatusBadge, type BuildStatus } from "./status-badge";

export type FeedPost = {
  id: string; user_id: string; title: string; status: BuildStatus; image_url: string; likes_count: number; created_at: string;
  author: string; authorLevel?: number; signedUrl?: string;
};

export function PostCard({ post, liked, mine, onLike }: { post: FeedPost; liked: boolean; mine: boolean; onLike: () => void }) {
  const t = useMessages(community);
  return (
    <article className="group mb-3 break-inside-avoid overflow-hidden rounded-[20px] border border-line bg-ink-850 transition-all duration-300 hover:border-ink-700 sm:mb-6 sm:rounded-[28px]">
      <div className="relative overflow-hidden">
        {post.signedUrl
          // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from a private bucket
          ? <img src={post.signedUrl} alt={post.title} loading="lazy" className="block h-auto min-h-40 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100" />
          : <div className="aspect-[4/5] w-full bg-ink-800 bg-grid" />}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
        <div className="absolute left-2 top-2 origin-top-left scale-[.82] sm:left-3 sm:top-3 sm:scale-100">
          <StatusBadge status={post.status} label={t.status[post.status]} />
        </div>
        <h3 className="absolute inset-x-3 bottom-2.5 text-[13px] font-semibold leading-snug text-fg drop-shadow sm:inset-x-4 sm:bottom-3 sm:text-[17px]">{post.title}</h3>
      </div>
      <div className="flex items-center gap-2 p-2.5 sm:gap-3 sm:p-4">
        <span className="hidden sm:inline-flex"><Avatar name={post.author} size="sm" level={post.authorLevel} /></span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold text-fg sm:text-sm">@{post.author}</p>
          {mine && <span className="mt-1 hidden items-center rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 text-[10.5px] font-semibold text-accent sm:inline-flex">{t.you}</span>}
        </div>
        <button type="button" aria-pressed={liked} aria-label={`${liked ? t.unlike : t.like}: ${post.title}`} onClick={onLike}
          className={clsx("inline-flex h-9 shrink-0 items-center gap-1 rounded-xl border px-2 text-[13px] font-semibold tabular-nums transition-all active:scale-95 sm:h-10 sm:gap-1.5 sm:px-3 sm:text-sm",
            liked ? "border-accent/50 bg-accent-soft text-accent" : "border-line bg-ink-900 text-fg-muted hover:border-accent/40 hover:text-accent")}>
          <Heart className={clsx("h-[18px] w-[18px]", liked && "fill-current")} aria-hidden />
          <span>{post.likes_count}</span>
        </button>
      </div>
    </article>
  );
}
