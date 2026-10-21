import Link from "next/link";
import { clsx } from "clsx";

/** The robot-head "o" from the ropros wordmark, drawn as an SVG so it scales and recolours cleanly. */
export function RobotMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="ropros-mark" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-brand-from)" />
          <stop offset="1" stopColor="var(--color-brand-to)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="8" r="6" fill="url(#ropros-mark)" />
      <rect x="29.5" y="10" width="5" height="12" rx="1" fill="url(#ropros-mark)" />
      <ellipse cx="32" cy="40" rx="27" ry="19" fill="url(#ropros-mark)" />
      <ellipse cx="22" cy="37" rx="7.5" ry="6.5" fill="var(--color-ink-950)" />
      <ellipse cx="42" cy="37" rx="7.5" ry="6.5" fill="var(--color-ink-950)" />
      <path d="M19 38a3 3 0 0 1 6 0M39 38a3 3 0 0 1 6 0" stroke="url(#ropros-mark)" strokeWidth="1.8" fill="none" />
      <path d="M20 47q12 7 24 0" stroke="var(--color-ink-950)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Wordmark: r + robot "o" + pros, lowercase, in the display serif with the brand gradient. */
export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} aria-label="ropros home" className={clsx("group inline-flex items-end gap-[0.04em] leading-none", className)}>
      <span className="font-display text-[1.65rem] text-brand-gradient">r</span>
      <RobotMark className="mb-[0.08em] h-[1.35rem] w-[1.35rem] transition-transform duration-300 group-hover:-rotate-6" />
      <span className="font-display text-[1.65rem] text-brand-gradient">pros</span>
    </Link>
  );
}
