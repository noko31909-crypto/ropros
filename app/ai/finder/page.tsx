import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { ProjectFinder } from "@/components/finder/project-finder";

export const metadata: Metadata = { title: "AI Project Finder" };

export default function FinderPage() {
  return (
    <>
      <PageHeader eyebrowIcon={<Sparkles className="h-5 w-5" aria-hidden />} title="AI Project Finder"
        description="Tell us what you own. We match it against 166 builds and show what you can make now, and what you’re one part away from." />
      <Container className="py-12"><div className="mx-auto max-w-4xl"><ProjectFinder /></div></Container>
    </>
  );
}
