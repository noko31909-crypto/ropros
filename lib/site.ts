import "server-only";
import { z } from "zod";

const Origin = z.url({ protocol: /^https?$/ });

/**
 * Absolute origin of the site, for the sitemap, canonical links and share images. SITE_URL wins (set it when a custom
 * domain is live); on Vercel the production domain comes from VERCEL_PROJECT_PRODUCTION_URL; locally it is localhost.
 */
export function siteUrl(): URL {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  for (const candidate of [process.env.SITE_URL, vercel ? `https://${vercel}` : undefined]) {
    const parsed = Origin.safeParse(candidate?.trim());
    if (parsed.success) return new URL(new URL(parsed.data).origin);
  }
  return new URL("http://localhost:3000");
}

/** Public pages worth indexing (guides are added from the guide list). */
export const INDEXED_PAGES = ["/", "/projects", "/components", "/finder", "/community", "/serial", "/privacy", "/terms"] as const;
