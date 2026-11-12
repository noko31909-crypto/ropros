import Link from "next/link";
import { clsx } from "clsx";
import { Clock } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { common } from "@/lib/i18n/messages/common";
import { projects as projectsMsg } from "@/lib/i18n/messages/projects";
import { BOARD_LABEL, projectHref, type Board, type Difficulty, type Project } from "@/lib/projects";
import { coverImage } from "@/lib/covers";
import { Cover } from "./covers";
import { BookmarkButton } from "./bookmark-button";

const LEVEL: Record<Difficulty, number> = { beginner: 1, intermediate: 2, advanced: 3 };

/** Difficulty as a neutral 1–3 bar meter: colour on a card means the platform, nothing else. */
export function DifficultyMeter({ level, label }: { level: Difficulty; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-flex items-end gap-[2px]" aria-hidden>
        {[1, 2, 3].map((i) => <span key={i} className={clsx("w-[3px] rounded-sm", i <= LEVEL[level] ? "bg-fg-muted" : "bg-ink-700")} style={{ height: 4 + i * 3 }} />)}
      </span>
      {label}
    </span>
  );
}
/** Neon platform pills: Arduino teal, ESP32 orange, Raspberry Pi pink. */
export const platformTone: Record<Board, string> = {
  arduino: "border-signal/40 bg-signal/10 text-signal shadow-[0_0_14px_rgba(46,230,201,.35)]",
  esp32: "border-accent/45 bg-accent/10 text-accent-hover shadow-[0_0_14px_rgba(255,122,26,.35)]",
  pi: "border-[#ff4fa3]/45 bg-[#ff4fa3]/10 text-[#ff7dbb] shadow-[0_0_14px_rgba(255,79,163,.35)]",
};

/** `label` names the exact chip when it differs from the family (an ESP8266 build in the ESP32 colours). */
export function PlatformPill({ board, label, className }: { board: Board; label?: string; className?: string }) {
  return (
    <span className={clsx("inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[11px] font-medium sm:px-2.5 sm:py-1", platformTone[board], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />{label ?? BOARD_LABEL[board]}
    </span>
  );
}

/** Pinterest-style card. `masonry` uses the project's own aspect; otherwise a uniform 4:3 crop. Works in server and client trees. */
export function ProjectCard({ project, locale, masonry = false }: { project: Project; locale: Locale; masonry?: boolean }) {
  const c = common[locale];
  const t = projectsMsg[locale].card;
  return (
    <Link href={projectHref(project)}
      className={clsx("group flex break-inside-avoid flex-col overflow-hidden rounded-[28px] border border-line bg-ink-850 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_rgba(255,122,26,.45)] motion-reduce:hover:translate-y-0", masonry && "mb-3 sm:mb-6")}>
      <div className={clsx("relative overflow-hidden", masonry ? project.aspect : "aspect-[4/3]")}>
        <Cover id={project.cover} image={coverImage(project.slug)} title={t.coverAlt(project.title[locale])}
          className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:group-hover:scale-100" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-850 to-transparent" />
        <BookmarkButton slug={project.slug} title={project.title[locale]} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5">
        <PlatformPill board={project.board} label={project.boardLabel} />
        <h3 className="text-[15px] font-semibold leading-snug text-fg transition-colors group-hover:text-accent sm:text-lg">{project.title[locale]}</h3>
        <p className="hidden text-sm text-fg-muted sm:line-clamp-3">{project.summary[locale]}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-fg-muted sm:gap-4">
          <DifficultyMeter level={project.difficulty} label={c.difficulty[project.difficulty]} />
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden />{c.hours(project.hours)}</span>
        </div>
      </div>
    </Link>
  );
}
