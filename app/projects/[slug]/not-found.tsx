import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getLocale } from "@/lib/i18n/server";
import { guideMessages } from "@/lib/i18n/messages/guide";

export default async function GuideNotFound() {
  const t = guideMessages[await getLocale()].notFound;
  return (
    <Container className="py-24 text-center">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink-900 text-accent"><SearchX className="h-6 w-6" aria-hidden /></span>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-fg">{t.title}</h1>
      <p className="mt-3 text-fg-muted">{t.body}</p>
      <Link href="/projects" className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-ink-950 shadow-glow hover:bg-accent-hover">
        <ArrowLeft className="h-4 w-4" aria-hidden />{t.back}
      </Link>
    </Container>
  );
}
