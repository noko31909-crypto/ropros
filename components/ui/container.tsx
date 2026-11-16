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
      {/* Compact on phones, so the page's own content (an input, a list) starts on the first screen. */}
      <Container className="py-8 sm:py-20">
        {eyebrowIcon && <div className="mb-5 hidden h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-850 text-fg-muted sm:inline-flex">{eyebrowIcon}</div>}
        <h1 className="max-w-3xl text-[2rem] font-semibold leading-tight tracking-tight text-fg sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base text-fg-muted sm:mt-4 sm:text-lg">{description}</p>}
        {children && <div className="mt-6 sm:mt-8">{children}</div>}
      </Container>
    </header>
  );
}
