import type { Metadata } from "next";
import { Boxes } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { ComponentLibrary } from "@/components/finder/component-library";
import { getLocale } from "@/lib/i18n/server";
import { components } from "@/lib/i18n/messages/components";

export async function generateMetadata(): Promise<Metadata> {
  return { title: components[await getLocale()].metaTitle };
}

export default async function ComponentsPage() {
  const t = components[await getLocale()];
  return (
    <>
      <PageHeader eyebrowIcon={<Boxes className="h-5 w-5" aria-hidden />} title={t.title} description={t.description} />
      <Container className="py-12"><ComponentLibrary /></Container>
    </>
  );
}
