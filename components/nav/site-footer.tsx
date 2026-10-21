import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/nav";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-900/50">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
            A repository of hardware builds for engineers and makers: wiring, code and guides for Arduino, ESP32 and Raspberry Pi.
          </p>
        </div>
        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}><Link href={l.href} className="text-sm text-fg-muted transition-colors hover:text-accent">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-subtle sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} ropros</span>
        <span>Verify every circuit against its datasheets before powering.</span>
      </Container>
    </footer>
  );
}
