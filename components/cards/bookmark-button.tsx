"use client";

import { clsx } from "clsx";
import { Bookmark, BookmarkCheck } from "lucide-react";
import type { MouseEvent } from "react";
import { projects as projectsMsg } from "@/lib/i18n/messages/projects";
import { useMessages } from "@/components/i18n/locale-provider";
import { useSavedBuilds } from "@/lib/saved";

/** Bookmark toggle that sits inside a card link: it must not trigger navigation. */
export function BookmarkButton({ slug, title }: { slug: string; title: string }) {
  const t = useMessages(projectsMsg).card;
  const { isSaved, toggle } = useSavedBuilds();
  const saved = isSaved(slug);
  const onClick = (e: MouseEvent<HTMLButtonElement>) => { e.preventDefault(); e.stopPropagation(); toggle(slug); };
  return (
    <button type="button" onClick={onClick} aria-pressed={saved} aria-label={saved ? t.unsave(title) : t.saveLabel(title)}
      className={clsx(
        "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all focus-visible:translate-y-0 focus-visible:opacity-100",
        saved ? "bg-accent text-ink-950 opacity-100" : "translate-y-1 bg-ink-950/60 text-fg opacity-100 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0",
      )}>
      {saved ? <BookmarkCheck className="h-4 w-4" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}
    </button>
  );
}
