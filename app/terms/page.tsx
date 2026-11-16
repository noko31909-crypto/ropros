import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { getLocale } from "@/lib/i18n/server";
import { termsMessages } from "@/lib/i18n/messages/legal";

export async function generateMetadata(): Promise<Metadata> {
  const t = termsMessages[await getLocale()];
  return { title: t.title, description: t.lead };
}

export default async function TermsPage() {
  const t = termsMessages[await getLocale()];
  return <LegalPage kind="terms" title={t.title} lead={t.lead} sections={t.sections} />;
}
