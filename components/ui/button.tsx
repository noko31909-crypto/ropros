import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
const styles: Record<Variant, string> = {
  primary: "bg-accent text-ink-950 hover:bg-accent-hover shadow-glow",
  secondary: "border border-ink-700 bg-ink-850 text-fg hover:border-fg-subtle hover:bg-ink-800",
  ghost: "text-fg-muted hover:text-fg hover:bg-ink-800",
};

export function ButtonLink({ href, children, variant = "primary", className }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <Link href={href} className={clsx("inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors", styles[variant], className)}>
      {children}
    </Link>
  );
}
