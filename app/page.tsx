import Link from "next/link";
import { ArrowRight, Bot, Boxes, Cpu, MessagesSquare, Radio, Sparkles, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { IntroVideo } from "@/components/home/intro-video";
import { ProjectCard } from "@/components/cards/project-card";
import { getLocale } from "@/lib/i18n/server";
import { home } from "@/lib/i18n/messages/home";
import { CATALOG_COUNTS, FEATURED } from "@/lib/projects";

function SectionHeading({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-fg sm:text-4xl">{title}</h2>
      <Link href={href} className="-my-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover">
        {cta}<ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

function ToolCard({ href, icon: Icon, title, body, cta }: { href: string; icon: LucideIcon; title: string; body: string; cta: string }) {
  return (
    <Link href={href} className="group relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-ink-850 p-6 transition-colors hover:border-signal/40 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-signal/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-100" />
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-signal/30 bg-signal-soft text-signal"><Icon className="h-5 w-5" aria-hidden /></span>
      <h3 className="mt-6 text-2xl font-semibold text-fg">{title}</h3>
      <p className="mt-3 max-w-md text-fg-muted">{body}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-signal">
        {cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" aria-hidden />
      </span>
    </Link>
  );
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = home[locale];
  // Icons carry the platform colours of the card pills (Arduino teal, ESP32 orange, Raspberry Pi pink).
  const platforms: [string, string, string, LucideIcon, string][] = [
    ["Arduino", "/projects?board=arduino", t.platforms.arduino, Cpu, "text-signal"],
    ["ESP32", "/projects?board=esp32", t.platforms.esp32, Radio, "text-accent"],
    ["Raspberry Pi", "/projects?board=pi", t.platforms.pi, Boxes, "text-[#ff7dbb]"],
    [t.platforms.robotics, "/projects?category=robotics", t.platforms.roboticsNote, Bot, "text-fg-muted"],
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <Container>
          <div className="relative grid items-center gap-10 py-10 sm:gap-14 sm:py-32 lg:grid-cols-[1.15fr_1fr]">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900 px-3 py-1 font-mono text-xs text-fg-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />{t.eyebrow(CATALOG_COUNTS.builds, CATALOG_COUNTS.robotics)}
              </p>
              <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] text-fg sm:text-7xl">
                {t.titleA}<br /><span className="font-headline font-normal tracking-normal text-brand-gradient">{t.titleB}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:mt-6 sm:text-lg">{t.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/projects?category=robotics" className="justify-center">{t.ctaRobotics}<ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
                <ButtonLink href="/ai/finder" variant="secondary" className="justify-center"><Sparkles className="h-4 w-4 text-signal" aria-hidden />{t.ctaFinder}</ButtonLink>
              </div>
            </div>
            <IntroVideo labels={t.video} />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-28">
        <Container>
          <SectionHeading title={t.boardsTitle} href="/projects" cta={t.boardsCta} />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
            {platforms.map(([label, href, note, Icon, tone]) => (
              <Link key={href} href={href} className="group rounded-[28px] border border-line bg-ink-850 p-5 transition-colors hover:border-accent/40 sm:p-6">
                <Icon className={`h-6 w-6 ${tone}`} aria-hidden />
                <p className="mt-5 text-base font-semibold text-fg sm:mt-6 sm:text-lg">{label}</p>
                <p className="mt-1 text-sm text-fg-muted">{note}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-ink-900 py-14 sm:py-28">
        <Container>
          <SectionHeading title={t.featuredTitle} href="/projects?category=robotics" cta={t.featuredCta} />
          {/* A fixed grid (one aspect ratio) so the six cards end level, unlike the hub's masonry. */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3">
            {FEATURED.slice(0, 6).map((p) => <ProjectCard key={p.slug} project={p} locale={locale} />)}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-28">
        <Container>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <ToolCard href="/ai/finder" icon={Sparkles} title="Project Finder" body={t.finderBody} cta={t.open("Project Finder")} />
            <ToolCard href="/ai/assistant" icon={MessagesSquare} title="Build Assistant" body={t.assistantBody} cta={t.open("Build Assistant")} />
          </div>
        </Container>
      </section>

      <section className="pb-14 sm:pb-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-line bg-gradient-to-br from-ink-850 to-ink-900 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <Users className="h-6 w-6 text-fg-muted" aria-hidden />
              <h2 className="mt-4 text-2xl font-semibold text-fg">{t.communityTitle}</h2>
              <p className="mt-2 max-w-lg text-fg-muted">{t.communityBody}</p>
            </div>
            <ButtonLink href="/community">{t.communityCta}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
