import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Box, Sparkles, Terminal } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { getLocale } from "@/lib/i18n/server";
import { finder } from "@/lib/i18n/messages/finder";

export async function generateMetadata(): Promise<Metadata> {
  return { title: finder[await getLocale()].overview.metaTitle };
}

export default async function AiPage() {
  const t = finder[await getLocale()].overview;
  const tools = [
    { href: "/ai/finder", title: t.finderTitle, body: t.finderBody, icon: Sparkles, sample: ["Arduino Uno", "HC-SR04", "SG90 Servo"] },
    { href: "/ai/assistant", title: t.assistantTitle, body: t.assistantBody, icon: Terminal, sample: ["$ ropros assistant --help"] },
    { href: "/ai/build", title: t.generatorTitle, body: t.generatorBody, icon: Box, sample: ["CAD", "Wiring", "Code"] },
  ];
  return (
    <>
      <PageHeader eyebrowIcon={<Sparkles className="h-5 w-5 text-signal" aria-hidden />} title={t.title} description={t.description} />
      <Container className="grid gap-6 py-12 md:grid-cols-2 xl:grid-cols-3">
        {tools.map(({ href, title, body, icon: Icon, sample }) => (
          <Link key={href} href={href} className="group relative overflow-hidden rounded-[28px] border border-line bg-ink-850 p-8 transition-colors hover:border-signal/40">
            <div className="flex items-center justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-signal/30 bg-signal-soft text-signal"><Icon className="h-5 w-5" aria-hidden /></span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-signal"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal motion-reduce:animate-none" />{t.live}</span>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-fg">{title}</h2>
            <p className="mt-2 text-fg-muted">{body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {sample.map((s) => <span key={s} className="rounded-lg border border-line bg-ink-900 px-2.5 py-1 font-mono text-xs text-fg-muted">{s}</span>)}
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">{t.open}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></span>
          </Link>
        ))}
      </Container>
    </>
  );
}
