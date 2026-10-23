"use client";

import Link from "next/link";
import { Bookmark, BookmarkCheck, MessagesSquare } from "lucide-react";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { useMessages } from "@/components/i18n/locale-provider";
import { useToast } from "@/components/ui/toast";
import { useSavedBuilds } from "@/lib/saved";

/** "Save guide" (device-local bookmark) + "Ask the assistant". */
export function GuideActions({ slug }: { slug: string }) {
  const t = useMessages(guideMessages);
  const toast = useToast();
  const { isSaved, toggle: toggleSaved } = useSavedBuilds();
  const saved = isSaved(slug);

  const toggle = () => {
    if (toggleSaved(slug)) toast(t.savedToast);
  };

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button type="button" onClick={toggle} aria-pressed={saved}
        className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-ink-950 shadow-glow hover:bg-accent-hover">
        {saved ? <BookmarkCheck className="h-4 w-4" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}{saved ? t.saved : t.save}
      </button>
      <Link href={`/ai/assistant?guide=${encodeURIComponent(slug)}`}
        className="inline-flex h-11 items-center gap-2 rounded-xl border border-signal/30 bg-signal-soft px-5 text-sm font-semibold text-signal hover:border-signal/60">
        <MessagesSquare className="h-4 w-4" aria-hidden />{t.ask}
      </Link>
    </div>
  );
}
