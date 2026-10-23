import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/server";
import { profile } from "@/lib/i18n/messages/profile";
import { ProfileView } from "@/components/profile/profile-view";

export async function generateMetadata(): Promise<Metadata> {
  return { title: profile[await getLocale()].metaTitle };
}

export default function ProfilePage() {
  return <ProfileView />;
}
