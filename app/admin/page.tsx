import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { AdminPanel } from "@/components/moderation/admin-panel";
import { getLocale } from "@/lib/i18n/server";
import { moderationMessages } from "@/lib/i18n/messages/moderation";

export async function generateMetadata(): Promise<Metadata> {
  return { title: moderationMessages[await getLocale()].admin.metaTitle, robots: { index: false, follow: false } };
}

/** Moderation. The page itself is public; what it shows and does is limited to moderators by the database (0004). */
export default async function AdminPage() {
  const t = moderationMessages[await getLocale()].admin;
  return (
    <>
      <PageHeader eyebrowIcon={<ShieldAlert className="h-5 w-5 text-accent" aria-hidden />} title={t.title} description={t.lead} />
      <Container className="py-10 sm:py-12"><AdminPanel /></Container>
    </>
  );
}
