import { ListChecks, Package } from "lucide-react";
import { clsx } from "clsx";
import { Cover } from "@/components/cards/covers";
import { coverImage } from "@/lib/covers";
import type { LocalizedGuide, Platform } from "@/lib/guides";

export const PLATFORM_TONE: Record<Platform, string> = {
  arduino: "border-signal/40 bg-signal/10 text-signal shadow-[0_0_14px_rgba(46,230,201,.35)]",
  esp32: "border-accent/45 bg-accent/10 text-accent-hover shadow-[0_0_14px_rgba(255,122,26,.35)]",
  raspberry_pi: "border-[#ff4fa3]/45 bg-[#ff4fa3]/10 text-[#ff7dbb] shadow-[0_0_14px_rgba(255,79,163,.35)]",
};

/** Welcome banner: cover art, gradient fading into the page, blurred lower band carrying the title. Server component. */
export function GuideBanner({ guide, welcome, steps, parts }: { guide: LocalizedGuide; welcome: string; steps: string; parts: string }) {
  return (
    <div className="relative isolate min-h-[300px] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,.9)] sm:min-h-[380px] sm:rounded-[32px] lg:min-h-[460px]">
      <div className="absolute inset-0 -z-20 scale-105"><Cover id={guide.cover} image={coverImage(guide.slug)} priority /></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-950/30 to-ink-950" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[58%] backdrop-blur-xl [mask-image:linear-gradient(to_bottom,transparent,black_45%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,26,.18),transparent_60%)]" />
      <span className={clsx("absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium backdrop-blur-md", PLATFORM_TONE[guide.platform])}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />{guide.board}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
        <p className="text-sm font-medium text-fg-muted">{welcome}</p>
        <p className="mt-2 font-display text-[2.2rem] leading-[1.05] text-brand-gradient sm:text-5xl">{guide.title}</p>
        <div className="mt-5 flex items-center gap-3 text-sm text-fg-muted">
          <span className="inline-flex items-center gap-1.5"><ListChecks className="h-4 w-4 text-accent" aria-hidden />{steps}</span>
          <span className="h-1 w-1 rounded-full bg-fg-subtle" aria-hidden />
          <span className="inline-flex items-center gap-1.5"><Package className="h-4 w-4 text-accent" aria-hidden />{parts}</span>
        </div>
      </div>
    </div>
  );
}
