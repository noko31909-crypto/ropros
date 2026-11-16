import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { getLocale } from "@/lib/i18n/server";
import { privacyMessages } from "@/lib/i18n/messages/legal";

export async function generateMetadata(): Promise<Metadata> {
  const t = privacyMessages[await getLocale()];
  return { title: t.title, description: t.lead };
}

export default async function PrivacyPage() {
  const t = privacyMessages[await getLocale()];
  return <LegalPage kind="privacy" title={t.title} lead={t.lead} sections={t.sections} />;
}
