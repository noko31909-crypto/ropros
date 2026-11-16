import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/container";
import { getLocale } from "@/lib/i18n/server";
import { LOCALE_TAG } from "@/lib/i18n/config";
import { legalMessages, type LegalSection } from "@/lib/i18n/messages/legal";
import { ISSUES_URL, LEGAL_UPDATED, contactEmail } from "@/lib/legal";

/** Privacy policy / terms layout: date, contents, sections, contact, and a link to the other page. */
export async function LegalPage({ kind, title, lead, sections }: { kind: "privacy" | "terms"; title: string; lead: string; sections: readonly LegalSection[] }) {
  const locale = await getLocale();
  const t = legalMessages[locale];
  const email = contactEmail();
  const date = new Intl.DateTimeFormat(LOCALE_TAG[locale], { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${LEGAL_UPDATED}T00:00:00Z`));
  const other = kind === "privacy" ? { href: "/terms", label: t.terms } : { href: "/privacy", label: t.privacy };

  return (
    <>
      <PageHeader title={title} description={lead}>
        <p className="font-mono text-xs text-fg-subtle">{t.updated(date)}</p>
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label={t.contents} className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{t.contents}</p>
              <ol className="mt-3 space-y-1 border-l border-line">
                {[...sections, { id: "contact", title: t.contactTitle }].map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-fg-muted hover:border-accent hover:text-fg">{s.title}</a></li>
                ))}
              </ol>
            </div>
          </nav>
          <article className="max-w-3xl">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-semibold text-fg">{s.title}</h2>
                {s.body.map((block, i) => typeof block === "string"
                  ? <p key={i} className="mt-3 leading-relaxed text-fg-muted">{block}</p>
                  : (
                    <ul key={i} className="mt-3 space-y-2">
                      {block.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed text-fg-muted"><span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />{item}</li>
                      ))}
                    </ul>
                  ))}
              </section>
            ))}
            <section id="contact" className="scroll-mt-24 border-t border-line py-8">
              <h2 className="text-xl font-semibold text-fg">{t.contactTitle}</h2>
              {email ? (
                <p className="mt-3 leading-relaxed text-fg-muted">{t.contactEmail}{" "}
                  <a href={`mailto:${email}`} className="font-semibold text-accent hover:text-accent-hover">{email}</a>
                </p>
              ) : (
                <>
                  <p className="mt-3 leading-relaxed text-fg-muted">{t.contactIssues}</p>
                  <p className="mt-2"><a href={ISSUES_URL} rel="noopener noreferrer" target="_blank" className="break-all font-mono text-sm text-accent hover:text-accent-hover">{ISSUES_URL.replace(/^https:\/\//, "")}</a></p>
                </>
              )}
            </section>
            <p className="border-t border-line pt-8 text-sm text-fg-subtle">
              <Link href={other.href} className="font-semibold text-accent hover:text-accent-hover">{other.label}</Link>
            </p>
          </article>
        </div>
      </Container>
    </>
  );
}
