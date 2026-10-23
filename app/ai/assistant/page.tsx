import type { Metadata } from "next";
import { Terminal } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { AssistantTerminal } from "@/components/assistant/assistant-terminal";
import { getLocale } from "@/lib/i18n/server";
import { assistant } from "@/lib/i18n/messages/assistant";

export async function generateMetadata(): Promise<Metadata> {
  return { title: assistant[await getLocale()].metaTitle };
}

export default async function AssistantPage() {
  const t = assistant[await getLocale()];
  return (
    <>
      <PageHeader eyebrowIcon={<Terminal className="h-5 w-5 text-signal" aria-hidden />} title={t.pageTitle} description={t.pageDescription} />
      <Container className="py-12">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-line shadow-[0_30px_80px_-30px_rgba(46,230,201,.25)]">
          <AssistantTerminal className="h-[min(720px,75vh)]" />
        </div>
      </Container>
    </>
  );
}
