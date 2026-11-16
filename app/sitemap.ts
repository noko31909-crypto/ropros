import type { MetadataRoute } from "next";
import { allGuideSlugs } from "@/lib/guides";
import { INDEXED_PAGES, siteUrl } from "@/lib/site";

/** /sitemap.xml: the public pages and every guide. The language is a cookie, so each page has one URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    ...INDEXED_PAGES.map((path) => ({ url: new URL(path, base).toString(), changeFrequency: "weekly" as const, priority: path === "/" ? 1 : 0.6 })),
    ...allGuideSlugs().map((slug) => ({ url: new URL(`/projects/${slug}`, base).toString(), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
