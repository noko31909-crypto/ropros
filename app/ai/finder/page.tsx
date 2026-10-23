import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { z } from "zod";
import { Container, PageHeader } from "@/components/ui/container";
import { ProjectFinder } from "@/components/finder/project-finder";
import { getLocale } from "@/lib/i18n/server";
import { finder } from "@/lib/i18n/messages/finder";
import { PART_BY_ID } from "@/lib/parts-catalog";

export async function generateMetadata(): Promise<Metadata> {
  return { title: finder[await getLocale()].metaTitle };
}

/** `?parts=uno,hcsr04` (or repeated `?parts=`) preselects catalog ids. Unknown ids are dropped. */
const PartsParam = z.union([z.string(), z.array(z.string())]).optional()
  .transform((v) => (Array.isArray(v) ? v : v ? [v] : []).flatMap((s) => s.split(",")).map((s) => s.trim().toLowerCase()))
  .transform((ids) => [...new Set(ids.filter((id) => id.length <= 32 && PART_BY_ID.has(id)))].slice(0, 60));

export default async function FinderPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const t = finder[await getLocale()];
  const parsed = PartsParam.safeParse((await searchParams).parts);
  const initialParts = parsed.success ? parsed.data : [];
  return (
    <>
      <PageHeader eyebrowIcon={<Sparkles className="h-5 w-5 text-signal" aria-hidden />} title={t.title} description={t.description} />
      <Container className="py-12">
        <div className="mx-auto max-w-4xl"><ProjectFinder key={initialParts.join(",")} initialParts={initialParts} /></div>
      </Container>
    </>
  );
}
