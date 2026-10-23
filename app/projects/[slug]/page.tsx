import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Cpu, Gauge, Sparkles, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AssistantDrawer } from "@/components/assistant/assistant-drawer";
import { GuideBanner } from "@/components/guide/guide-banner";
import { GuideTabs } from "@/components/guide/guide-tabs";
import { GuideActions } from "@/components/guide/guide-actions";
import { ProgressActions } from "@/components/guide/progress-actions";
import { GuideDiagram } from "@/components/guide/diagrams";
import { allGuideSlugs, getGuide, localizeGuide } from "@/lib/guides";
import { getLocale } from "@/lib/i18n/server";
import { common } from "@/lib/i18n/messages/common";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [guide, locale] = [getGuide((await params).slug), await getLocale()];
  if (!guide) return { title: guideMessages[locale].notFound.title };
  return { title: guide.title[locale], description: guide.summary[locale] };
}

/** DB id of the published project for this slug; null if Supabase is unreachable or the row is missing. */
async function projectIdFor(slug: string): Promise<string | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("projects").select("id").eq("slug", slug).eq("is_published", true).maybeSingle<{ id: string }>();
    return data?.id ?? null;
  } catch {
    return null;
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const source = getGuide(slug);
  if (!source) notFound();

  const locale = await getLocale();
  const t = guideMessages[locale];
  const c = common[locale];
  const guide = localizeGuide(source, locale);
  const projectId = await projectIdFor(guide.slug);

  const meta = [
    { icon: Cpu, label: guide.board },
    { icon: Gauge, label: c.difficulty[guide.difficulty] },
    { icon: Clock, label: t.buildHours(guide.hours) },
    { icon: Wallet, label: `≈ $${guide.costUsd}` },
  ];
  const category = guide.platform === "esp32"
    ? { href: "/projects?board=esp32", label: t.iot }
    : { href: "/projects?category=robotics", label: t.robotics };

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="animate-fade-up motion-reduce:animate-none">
            <nav aria-label={t.breadcrumb} className="flex items-center gap-1.5 text-sm text-fg-subtle">
              <Link href="/projects" className="hover:text-fg">{t.hub}</Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <Link href={category.href} className="hover:text-fg">{category.label}</Link>
            </nav>
            <h1 className="mt-5 max-w-3xl text-[2.1rem] font-semibold leading-tight tracking-[-0.03em] text-fg sm:text-5xl">{guide.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-fg-muted">{guide.summary}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {meta.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900 px-3 py-1.5 text-sm text-fg-muted">
                  <Icon className="h-4 w-4 text-accent" aria-hidden />{label}
                </li>
              ))}
              <li className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 font-mono text-sm font-semibold text-accent">
                <Sparkles className="h-4 w-4" aria-hidden />{t.xpReward(guide.xpReward)}
              </li>
            </ul>
            <GuideActions slug={guide.slug} />
          </div>
          <GuideBanner guide={guide} welcome={t.welcome} steps={t.stepsCount(guide.steps.length)} parts={t.partsCount(guide.parts.length)} />
        </Container>
      </header>
      <Container>
        <GuideTabs
          guide={guide}
          diagram={<GuideDiagram slug={guide.slug} label={t.diagram.aria(guide.title)} captions={t.diagram.captions} />}
          progress={<ProgressActions projectId={projectId} simulation={guide.simulation} />}
        />
      </Container>
      <AssistantDrawer context={{ guideSlug: guide.slug, guideTitle: guide.title }} />
    </>
  );
}
