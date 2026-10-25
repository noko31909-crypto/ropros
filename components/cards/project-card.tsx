import Link from "next/link";
import { clsx } from "clsx";
import { Clock, Gauge } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { common } from "@/lib/i18n/messages/common";
import { projects as projectsMsg } from "@/lib/i18n/messages/projects";
import { BOARD_LABEL, projectHref, type Board, type Difficulty, type Project } from "@/lib/projects";
import { coverImage } from "@/lib/covers";
import { Cover } from "./covers";
import { BookmarkButton } from "./bookmark-button";

export const diffTone: Record<Difficulty, string> = {
  beginner: "text-emerald-300 bg-emerald-400/10",
  intermediate: "text-amber-300 bg-amber-400/10",
  advanced: "text-rose-300 bg-rose-400/10",
};
/** Neon platform pills: Arduino teal, ESP32 orange, Raspberry Pi pink. */
export const platformTone: Record<Board, string> = {
  arduino: "border-signal/40 bg-signal/10 text-signal shadow-[0_0_14px_rgba(46,230,201,.35)]",
  esp32: "border-accent/45 bg-accent/10 text-accent-hover shadow-[0_0_14px_rgba(255,122,26,.35)]",
  pi: "border-[#ff4fa3]/45 bg-[#ff4fa3]/10 text-[#ff7dbb] shadow-[0_0_14px_rgba(255,79,163,.35)]",
};

export function PlatformPill({ board, className }: { board: Board; className?: string }) {
  return (
    <span className={clsx("inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-[11px]", platformTone[board], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />{BOARD_LABEL[board]}
    </span>
  );
}

/** Pinterest-style card. `masonry` uses the project's own aspect; otherwise a uniform 4:3 crop. Works in server and client trees. */
export function ProjectCard({ project, locale, masonry = false }: { project: Project; locale: Locale; masonry?: boolean }) {
  const c = common[locale];
  const t = projectsMsg[locale].card;
  return (
    <Link href={projectHref(project)}
      className="group mb-3 flex break-inside-avoid flex-col overflow-hidden rounded-[20px] border border-line bg-ink-850 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_rgba(255,122,26,.45)] motion-reduce:hover:translate-y-0 sm:mb-6 sm:rounded-[28px]">
      <div className={clsx("relative overflow-hidden", masonry ? project.aspect : "aspect-[4/3]")}>
        <Cover id={project.cover} image={coverImage(project.slug)} title={t.coverAlt(project.title)}
          className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:group-hover:scale-100" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-850 to-transparent" />
        {project.fullGuide && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/60 px-2 py-0.5 font-mono text-[10px] text-fg backdrop-blur-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />{t.fullGuide}
          </span>
        )}
        <BookmarkButton slug={project.slug} title={project.title} />
      </div>
      <div className="flex flex-col gap-2 p-3 sm:gap-3 sm:p-5">
        <PlatformPill board={project.board} />
        <h3 className="text-[15px] font-semibold leading-snug text-fg transition-colors group-hover:text-accent sm:text-lg">{project.title}</h3>
        <p className="hidden text-sm text-fg-muted sm:line-clamp-2">{project.summary[locale]}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-fg-muted sm:gap-4 sm:text-xs">
          <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium", diffTone[project.difficulty])}>
            <Gauge className="h-3.5 w-3.5" aria-hidden />{c.difficulty[project.difficulty]}
          </span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden />{c.hours(project.hours)}</span>
        </div>
      </div>
    </Link>
  );
}
