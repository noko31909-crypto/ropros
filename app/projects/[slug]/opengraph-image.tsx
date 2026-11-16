import { ImageResponse } from "next/og";
import { ShareCard, SHARE_SIZE, PLATFORM_COLOR } from "@/components/og/share-card";
import { getGuide } from "@/lib/guides";

export const alt = "ropros build guide";
export const size = SHARE_SIZE;
export const contentType = "image/png";

const DIFFICULTY = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" } as const;

/** Share picture for one guide, in English (link previews are fetched without the visitor's language cookie). */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) {
    return new ImageResponse(<ShareCard eyebrow="build guide" title="ropros" subtitle="Hardware build guides for Arduino, ESP32 and Raspberry Pi." chips={[]} />, SHARE_SIZE);
  }
  return new ImageResponse(
    <ShareCard eyebrow="build guide" title={guide.title.en} subtitle={guide.summary.en}
      chips={[
        { label: guide.board, color: PLATFORM_COLOR[guide.platform] },
        { label: DIFFICULTY[guide.difficulty] },
        { label: `${guide.hours} h` },
        { label: `${guide.parts.length} parts` },
      ]} />,
    SHARE_SIZE,
  );
}
