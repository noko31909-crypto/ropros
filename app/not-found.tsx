import type { Metadata } from "next";
import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n/server";
import { common } from "@/lib/i18n/messages/common";

export async function generateMetadata(): Promise<Metadata> {
  return { title: common[await getLocale()].notFound.title, robots: { index: false } };
}

/** Site-wide 404, in the visitor's language and the site's own style. */
export default async function NotFound() {
  const t = common[await getLocale()].notFound;
  return (
    <Container className="py-20 text-center sm:py-28">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink-900 text-fg-muted"><Compass className="h-6 w-6" aria-hidden /></span>
      <p className="mt-6 font-mono text-sm text-fg-subtle">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{t.title}</h1>
      <p className="mx-auto mt-3 max-w-md text-fg-muted">{t.body}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/projects" className="justify-center">{t.hub}<ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
        <ButtonLink href="/" variant="secondary" className="justify-center">{t.home}</ButtonLink>
      </div>
    </Container>
  );
}
