import { headers } from "next/headers";
import type { LocalizedGuide } from "@/lib/guides";

/** "PT1H30M" for 1.5 hours. */
function isoDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}` || "PT0M";
}

/**
 * Structured data for a guide page: HowTo (steps, parts, time, cost) and the breadcrumb trail. Built only from our own
 * guide content; `<` is escaped so the JSON can never close the script tag. Carries the request's CSP nonce.
 */
export async function GuideJsonLd({ guide, url, image, crumbs }: {
  guide: LocalizedGuide; url: string; image?: string; crumbs: { name: string; url: string }[];
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: guide.title,
      description: guide.summary,
      url,
      ...(image ? { image } : {}),
      totalTime: isoDuration(guide.hours),
      estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: guide.costUsd },
      supply: guide.parts.filter((p) => !p.optional).map((p) => ({ "@type": "HowToSupply", name: p.name, requiredQuantity: p.qty })),
      step: guide.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
    },
  ];
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  // eslint-disable-next-line react/no-danger -- our own guide content, serialized and escaped above
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: json }} />;
}
