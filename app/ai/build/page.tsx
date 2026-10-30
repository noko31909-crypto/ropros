import type { Metadata } from "next";
import { Box } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { ProjectBuilder } from "@/components/build/project-builder";
import { getLocale } from "@/lib/i18n/server";
import { build } from "@/lib/i18n/messages/build";

export async function generateMetadata(): Promise<Metadata> {
  return { title: build[await getLocale()].metaTitle };
}

export default async function BuildPage() {
  const t = build[await getLocale()];
  return (
    <>
      <PageHeader eyebrowIcon={<Box className="h-5 w-5 text-signal" aria-hidden />} title={t.title} description={t.description} />
      <Container className="py-12"><ProjectBuilder /></Container>
    </>
  );
}
