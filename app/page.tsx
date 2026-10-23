import Link from "next/link";
import { ArrowRight, Bot, Boxes, Cpu, MessagesSquare, Radio, Sparkles, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { RobotMark } from "@/components/brand/logo";
import { ProjectCard } from "@/components/cards/project-card";
import { getLocale } from "@/lib/i18n/server";
import { home } from "@/lib/i18n/messages/home";
import { FEATURED } from "@/lib/projects";

function SectionHeading({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
      <Link href={href} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover">
        {cta}<ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

function ToolCard({ href, icon: Icon, title, body, cta }: { href: string; icon: LucideIcon; title: string; body: string; cta: string }) {
  return (
    <Link href={href} className="group relative overflow-hidden rounded-3xl border border-line bg-ink-850 p-8 transition-colors hover:border-signal/40">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-signal/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-100" />
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-signal/30 bg-signal-soft text-signal"><Icon className="h-5 w-5" aria-hidden /></span>
      <h3 className="mt-6 text-2xl font-semibold text-fg">{title}</h3>
      <p className="mt-3 max-w-md text-fg-muted">{body}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
        {cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" aria-hidden />
      </span>
    </Link>
  );
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = home[locale];
  const platforms: [string, string, string, LucideIcon][] = [
    ["Arduino", "/projects?board=arduino", t.platforms.arduino, Cpu],
    ["ESP32", "/projects?board=esp32", t.platforms.esp32, Radio],
    ["Raspberry Pi", "/projects?board=pi", t.platforms.pi, Boxes],
    [t.platforms.robotics, "/projects?category=robotics", t.platforms.roboticsNote, Bot],
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <Container>
          <div className="relative grid items-center gap-10 py-14 sm:gap-14 sm:py-32 lg:grid-cols-[1.15fr_1fr]">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900 px-3 py-1 font-mono text-xs text-fg-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />{t.eyebrow}
              </p>
              <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-7xl">
                {t.titleA}<br /><span className={locale === "en" ? "font-display font-normal tracking-normal text-brand-gradient" : "font-sans font-semibold italic tracking-tight text-brand-gradient"}>{t.titleB}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{t.subtitle}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/projects?category=robotics">{t.ctaRobotics}<ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
                <ButtonLink href="/ai/finder" variant="secondary"><Sparkles className="h-4 w-4 text-signal" aria-hidden />{t.ctaFinder}</ButtonLink>
              </div>
            </div>
            <div className="relative aspect-square max-h-[460px] rounded-3xl border border-line bg-ink-900/80 p-8 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-grid opacity-60" />
              <div className="relative flex h-full flex-col items-center justify-center gap-6">
                <RobotMark className="h-40 w-40 drop-shadow-[0_20px_60px_rgba(255,122,26,0.25)]" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <dl className="grid grid-cols-1 divide-y divide-line border-x border-b border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {t.stats.map(([v, l]) => (
            <div key={l} className="px-8 py-8">
              <dt className="text-sm text-fg-muted">{l}</dt>
              <dd className="mt-1 text-4xl font-semibold tracking-tight text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading title={t.boardsTitle} href="/projects" cta={t.boardsCta} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map(([label, href, note, Icon]) => (
              <Link key={href} href={href} className="group rounded-2xl border border-line bg-ink-850 p-6 transition-colors hover:border-accent/40">
                <Icon className="h-6 w-6 text-accent" aria-hidden />
                <p className="mt-6 text-lg font-semibold text-fg">{label}</p>
                <p className="mt-1 text-sm text-fg-muted">{note}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ink-900/40 py-20 sm:py-28">
        <Container>
          <SectionHeading title={t.featuredTitle} href="/projects?category=robotics" cta={t.featuredCta} />
          <div className="mt-8 columns-2 gap-3 sm:mt-10 sm:gap-6 lg:columns-3">
            {FEATURED.slice(0, 6).map((p) => <ProjectCard key={p.slug} project={p} locale={locale} masonry />)}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <ToolCard href="/ai/finder" icon={Sparkles} title="Project Finder" body={t.finderBody} cta={t.open("Project Finder")} />
            <ToolCard href="/ai/assistant" icon={MessagesSquare} title="Build Assistant" body={t.assistantBody} cta={t.open("Build Assistant")} />
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-gradient-to-br from-ink-850 to-ink-900 p-10 sm:flex-row sm:items-center">
            <div>
              <Users className="h-6 w-6 text-accent" aria-hidden />
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
