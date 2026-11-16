import type { Metadata } from "next";
import { Usb } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { SerialMonitor } from "@/components/serial/serial-monitor";
import { getLocale } from "@/lib/i18n/server";
import { serialMessages } from "@/lib/i18n/messages/serial";
import { parseBaud } from "@/lib/serial";

export async function generateMetadata(): Promise<Metadata> {
  const t = serialMessages[await getLocale()];
  return { title: t.title, description: t.lead };
}

/** `?baud=9600` (from a guide) preselects the sketch's rate; anything that isn't a standard rate falls back to 115200. */
export default async function SerialPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const t = serialMessages[await getLocale()];
  const baud = parseBaud((await searchParams).baud);
  return (
    <>
      <PageHeader eyebrowIcon={<Usb className="h-5 w-5 text-accent" aria-hidden />} title={t.title} description={t.lead} />
      <Container className="py-10 sm:py-12"><SerialMonitor key={baud} initialBaud={baud} /></Container>
    </>
  );
}
