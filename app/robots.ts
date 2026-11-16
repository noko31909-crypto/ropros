import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** /robots.txt: everything public is open; API routes, dev fixtures and personal pages are not for search engines. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/dev/", "/admin", "/profile", "/shopping"] }],
    sitemap: new URL("/sitemap.xml", siteUrl()).toString(),
  };
}
