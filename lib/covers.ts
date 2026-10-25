import covers from "@/content/covers.json";

/** Photo cover per guide slug (content/covers.json: AI-generated, owned by ropros, hosted as WebP). Falls back to the SVG art. */
const COVERS: Readonly<Record<string, string>> = covers;

export const coverImage = (slug: string): string | undefined => COVERS[slug];
