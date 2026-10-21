import Image from "next/image";
import { ListChecks, Package } from "lucide-react";
import type { Guide } from "@/lib/guides";

/** Welcome banner: cover photo, gradient fading into dark, blurred lower band carrying the title. */
export function GuideBanner({ guide }: { guide: Guide }) {
  return (
    <div className="relative isolate min-h-[380px] overflow-hidden rounded-[32px] border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,.9)] sm:min-h-[460px]">
      <Image src={guide.image} alt="" fill priority sizes="(min-width:1024px) 45vw, 100vw" className="-z-20 scale-105 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-950/30 to-ink-950" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[58%] backdrop-blur-xl [mask-image:linear-gradient(to_bottom,transparent,black_45%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,26,.18),transparent_60%)]" />
      <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-1 font-mono text-[11px] font-medium text-signal shadow-[0_0_14px_rgba(46,230,201,.35)] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />{guide.board}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
        <p className="text-sm font-medium text-fg-muted">Welcome to the build</p>
        <p className="mt-2 font-display text-4xl leading-[1.05] text-brand-gradient sm:text-5xl">{guide.title}</p>
        <div className="mt-5 flex items-center gap-4 text-sm text-fg-muted">
          <span className="inline-flex items-center gap-1.5"><ListChecks className="h-4 w-4 text-accent" aria-hidden />{guide.steps.length} steps</span>
          <span className="inline-flex items-center gap-1.5"><Package className="h-4 w-4 text-accent" aria-hidden />{guide.parts.length} parts</span>
        </div>
      </div>
    </div>
  );
}
