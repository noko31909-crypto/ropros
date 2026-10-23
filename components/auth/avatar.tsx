import { clsx } from "clsx";

/** Initials avatar with a stable gradient per name (no uploaded avatars yet). */
export function Avatar({ name, size = "md", level }: { name: string; size?: "sm" | "md" | "lg"; level?: number }) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const hue = h % 360;
  return (
    <span className={clsx("relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-ink-950 ring-2 ring-ink-950",
      size === "sm" ? "h-8 w-8 text-[11px]" : size === "lg" ? "h-20 w-20 text-2xl" : "h-10 w-10 text-sm")}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 72%), hsl(${(hue + 50) % 360} 55% 58%))` }} aria-hidden>
      {name.slice(0, 2).toUpperCase()}
      {level !== undefined && <span className="absolute -bottom-1 -right-1 rounded-full bg-ink-950 px-1 font-mono text-[9px] text-accent">{level}</span>}
    </span>
  );
}
