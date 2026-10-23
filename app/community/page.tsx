import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/server";
import { community } from "@/lib/i18n/messages/community";
import { CommunityShowcase } from "@/components/community/showcase";

export async function generateMetadata(): Promise<Metadata> {
  const t = community[await getLocale()];
  return { title: t.metaTitle, description: t.lead };
}

export default function CommunityPage() {
  return <CommunityShowcase />;
}
