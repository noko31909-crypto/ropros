import { ImageResponse } from "next/og";
import { ShareCard, SHARE_SIZE, PLATFORM_COLOR } from "@/components/og/share-card";
import { CATALOG_COUNTS } from "@/lib/projects";

export const alt = "ropros: hardware build guides for Arduino, ESP32 and Raspberry Pi";
export const size = SHARE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <ShareCard eyebrow="hardware builds for engineers" title="Build real hardware. Ship real robots."
      subtitle={`${CATALOG_COUNTS.builds} build guides with wiring diagrams, flash-ready code and parts lists, plus a finder that matches the parts you own.`}
      chips={[{ label: "Arduino", color: PLATFORM_COLOR.arduino }, { label: "ESP32", color: PLATFORM_COLOR.esp32 }, { label: "Raspberry Pi", color: PLATFORM_COLOR.raspberry_pi }]} />,
    SHARE_SIZE,
  );
}
