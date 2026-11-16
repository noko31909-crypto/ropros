import type { Metadata } from "next";
import { z } from "zod";
import { getLocale } from "@/lib/i18n/server";
import { community } from "@/lib/i18n/messages/community";
import { CommunityShowcase } from "@/components/community/showcase";

export async function generateMetadata(): Promise<Metadata> {
  const t = community[await getLocale()];
  return { title: t.metaTitle, description: t.lead };
}

/** `?post=<uuid>` (from a notification) opens that post. Anything else is ignored. */
const PostParam = z.uuid();

export default async function CommunityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const parsed = PostParam.safeParse((await searchParams).post);
  return <CommunityShowcase initialPost={parsed.success ? parsed.data : undefined} />;
}
