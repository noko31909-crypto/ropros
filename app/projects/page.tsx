import type { Metadata } from "next";
import { CircuitBoard, Search, SlidersHorizontal } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { ProjectCard } from "@/components/cards/project-card";
import { FEATURED } from "@/lib/projects";

export const metadata: Metadata = { title: "Project Hub" };

const FILTERS = [
  { title: "Category", options: ["Robotics", "Smart home & IoT", "AI & vision", "Wearables", "Automation"] },
  { title: "Board", options: ["Arduino", "ESP32", "Raspberry Pi"] },
  { title: "Difficulty", options: ["Beginner", "Intermediate", "Advanced"] },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrowIcon={<CircuitBoard className="h-5 w-5" aria-hidden />} title="Project Hub"
        description="166 builds across Arduino, ESP32 and Raspberry Pi. Filter by board, category and difficulty.">
        <label className="relative block max-w-xl">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle" aria-hidden />
          <input type="search" placeholder="Search builds, boards, sensors…"
            className="h-12 w-full rounded-xl border border-line bg-ink-900 pl-12 pr-4 text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none" />
        </label>
      </PageHeader>
      <Container className="grid gap-10 py-12 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Filters" className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <p className="flex items-center gap-2 text-sm font-semibold text-fg"><SlidersHorizontal className="h-4 w-4 text-accent" aria-hidden />Filters</p>
          {FILTERS.map((f) => (
            <fieldset key={f.title}>
              <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{f.title}</legend>
              <div className="space-y-2">
                {f.options.map((o) => (
                  <label key={o} className="flex cursor-pointer items-center gap-3 text-sm text-fg-muted hover:text-fg">
                    <input type="checkbox" className="h-4 w-4 rounded border-ink-700 bg-ink-850 accent-[var(--color-accent)]" />{o}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </aside>
        <div>
          <p className="mb-6 text-sm text-fg-muted"><span className="font-semibold text-fg">{FEATURED.length}</span> results shown (placeholder data)</p>
          <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
            {FEATURED.map((p) => <ProjectCard key={p.slug} project={p} masonry />)}
          </div>
        </div>
      </Container>
    </>
  );
}
