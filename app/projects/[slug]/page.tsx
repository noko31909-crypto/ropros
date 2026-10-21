import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bookmark, ChevronRight, Clock, Cpu, Gauge, MessagesSquare, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GuideTabs } from "@/components/guide/guide-tabs";
import { AssistantDrawer } from "@/components/assistant/assistant-drawer";
import { GuideBanner } from "@/components/guide/guide-banner";
import { allGuideSlugs, getGuide } from "@/lib/guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  return guide ? { title: guide.title, description: guide.summary } : { title: "Guide not found" };
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const meta = [
    { icon: Cpu, label: guide.board },
    { icon: Gauge, label: guide.difficulty },
    { icon: Clock, label: `${guide.hours} h build` },
    { icon: Wallet, label: `≈ $${guide.costUsd}` },
  ];

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-fg-subtle">
            <Link href="/projects" className="hover:text-fg">Project Hub</Link><ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href="/projects?category=robotics" className="hover:text-fg">Robotics</Link>
          </nav>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">{guide.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-fg-muted">{guide.summary}</p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {meta.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900 px-3 py-1.5 text-sm text-fg-muted">
                <Icon className="h-4 w-4 text-accent" aria-hidden />{label}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-ink-950 shadow-glow hover:bg-accent-hover">
              <Bookmark className="h-4 w-4" aria-hidden />Save guide
            </button>
            <Link href={`/ai/assistant?guide=${encodeURIComponent(guide.slug)}`} className="inline-flex h-11 items-center gap-2 rounded-xl border border-signal/30 bg-signal-soft px-5 text-sm font-semibold text-signal hover:border-signal/60">
              <MessagesSquare className="h-4 w-4" aria-hidden />Ask the assistant
            </Link>
          </div>
          </div>
          <GuideBanner guide={guide} />
        </Container>
      </header>
      <Container>
        <GuideTabs guide={guide} />
      </Container>
      <AssistantDrawer context={{ guideSlug: guide.slug, guideTitle: guide.title }} />
    </>
  );
}
