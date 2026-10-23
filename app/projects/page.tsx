import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CircuitBoard } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { ProjectCard } from "@/components/cards/project-card";
import { HubFilters, HubSearch } from "@/components/cards/hub-controls";
import { getLocale } from "@/lib/i18n/server";
import { projects as msgs } from "@/lib/i18n/messages/projects";
import { PROJECTS, filterProjects, isBoard, isDifficulty } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  return { title: msgs[await getLocale()].metaTitle };
}

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const locale = await getLocale();
  const t = msgs[locale];
  const board = one(sp.board);
  const difficulty = one(sp.difficulty);
  const q = (one(sp.q) ?? "").slice(0, 100);
  const list = filterProjects(PROJECTS, {
    q,
    board: isBoard(board) ? board : undefined,
    difficulty: isDifficulty(difficulty) ? difficulty : undefined,
    robotics: one(sp.category) === "robotics",
  }, locale);

  return (
    <>
      <PageHeader eyebrowIcon={<CircuitBoard className="h-5 w-5" aria-hidden />} title={t.title} description={t.description}>
        <Suspense fallback={null}><HubSearch /></Suspense>
      </PageHeader>
      <Container>
        <div className="grid gap-6 py-6 sm:py-12 lg:grid-cols-[260px_1fr] lg:gap-10">
          <Suspense fallback={null}><HubFilters /></Suspense>
          <div>
            <p className="mb-6 text-sm text-fg-muted"><span className="font-semibold text-fg">{t.results(list.length)}</span></p>
            {list.length ? (
              <div className="columns-2 gap-3 sm:gap-6 xl:columns-3">
                {list.map((p) => <ProjectCard key={p.slug} project={p} locale={locale} masonry />)}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-ink-700 p-10 text-center text-fg-muted">
                <p>{t.empty}</p>
                <Link href="/projects" className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-hover">{t.reset}</Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
