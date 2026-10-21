import type { Metadata } from "next";
import { Users } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <>
      <PageHeader eyebrowIcon={<Users className="h-5 w-5" aria-hidden />} title="Community" description="Build logs, questions and modifications from real makers.">
        <ButtonLink href="/community/new">Post a build log</ButtonLink>
      </PageHeader>
      <Container className="py-16">
        <div className="rounded-3xl border border-dashed border-ink-700 p-16 text-center text-fg-muted">
          Feed slot: posts load from your database. Empty until people post: no seeded fake activity.
        </div>
      </Container>
    </>
  );
}
