"use client";

import { BadgeCheck } from "lucide-react";
import { useMessages } from "@/components/i18n/locale-provider";
import { community } from "@/lib/i18n/messages/community";
import { useBuildCounts } from "./use-build-counts";

/** "Works for 3 makers" in a guide's header: distinct makers who shared it as 100% working. Nothing until there is one. */
export function WorkingBadge({ projectId }: { projectId: string }) {
  const t = useMessages(community).builds;
  const { counts } = useBuildCounts(projectId);
  if (!counts || counts.working < 1) return null;
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal-soft px-3 py-1.5 text-sm text-signal" title={t.badgeTitle}>
      <BadgeCheck className="h-4 w-4" aria-hidden />
      <a href="#build-logs" className="hover:underline">{t.badge(counts.working)}</a>
    </li>
  );
}
