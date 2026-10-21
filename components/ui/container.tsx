import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("mx-auto w-full max-w-[1320px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={clsx("py-20 sm:py-28", className)}>{children}</section>;
}

/** Page heading used by every top-level route so spacing and type stay consistent. */
export function PageHeader({ eyebrowIcon, title, description, children }: { eyebrowIcon?: ReactNode; title: string; description?: string; children?: ReactNode }) {
  return (
    <header className="border-b border-line bg-ink-900/40">
      <Container className="py-14 sm:py-20">
        {eyebrowIcon && <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-850 text-accent">{eyebrowIcon}</div>}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-fg-muted">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}
