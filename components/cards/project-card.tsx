import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { Bookmark, Clock, Gauge } from "lucide-react";
import type { Board, Project } from "@/lib/projects";

const diffTone: Record<Project["difficulty"], string> = {
  Beginner: "text-emerald-300 bg-emerald-400/10",
  Intermediate: "text-amber-300 bg-amber-400/10",
  Advanced: "text-rose-300 bg-rose-400/10",
};
/** Neon platform pills */
export const platformTone: Record<Board, string> = {
  Arduino: "border-signal/40 bg-signal/10 text-signal shadow-[0_0_14px_rgba(46,230,201,.35)]",
  ESP32: "border-accent/45 bg-accent/10 text-accent-hover shadow-[0_0_14px_rgba(255,122,26,.35)]",
  "Raspberry Pi": "border-[#ff4fa3]/45 bg-[#ff4fa3]/10 text-[#ff7dbb] shadow-[0_0_14px_rgba(255,79,163,.35)]",
};
const aspectClass: Record<Project["aspect"], string> = { portrait: "aspect-[4/5]", tall: "aspect-[2/3]", square: "aspect-square" };

/** Pinterest-style card. `masonry` uses the project's own aspect ratio; otherwise a uniform 4:3 crop for grids. */
export function ProjectCard({ project, masonry = false }: { project: Project; masonry?: boolean }) {
  return (
    <Link href={`/projects/${encodeURIComponent(project.slug)}`}
      className="group mb-6 flex break-inside-avoid flex-col overflow-hidden rounded-[28px] border border-line bg-ink-850 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_rgba(255,122,26,.45)] motion-reduce:hover:translate-y-0">
      <div className={clsx("relative overflow-hidden", masonry ? aspectClass[project.aspect] : "aspect-[4/3]")}>
        <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width:1280px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:group-hover:scale-100" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-850 to-transparent" />
        {project.fullGuide && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/60 px-2.5 py-1 font-mono text-[11px] text-fg backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />Full guide
          </span>
        )}
        <span className="absolute right-3 top-3 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-ink-950/60 text-fg opacity-0 backdrop-blur-md transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <Bookmark className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <span className={clsx("inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium", platformTone[project.board])}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />{project.board}
        </span>
        <h3 className="text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent">{project.title}</h3>
        <p className="line-clamp-2 text-sm text-fg-muted">{project.summary}</p>
        <div className="flex items-center gap-4 pt-1 text-xs text-fg-muted">
          <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium", diffTone[project.difficulty])}><Gauge className="h-3.5 w-3.5" aria-hidden />{project.difficulty}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden />{project.hours} h</span>
        </div>
      </div>
    </Link>
  );
}
