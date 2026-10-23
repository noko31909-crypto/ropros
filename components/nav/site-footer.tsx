import Link from "next/link";
import { buildFooter } from "@/lib/nav";
import { common } from "@/lib/i18n/messages/common";
import { getLocale } from "@/lib/i18n/server";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

export async function SiteFooter() {
  const t = common[await getLocale()];
  return (
    <footer className="border-t border-line bg-ink-900/50 pb-20 lg:pb-0">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">{t.footer.tagline}</p>
        </div>
        {buildFooter(t).map((col) => (
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
        <span>© {new Date().getFullYear()} {t.footer.rights}</span>
        <span>{t.footer.safety}</span>
      </Container>
    </footer>
  );
}
