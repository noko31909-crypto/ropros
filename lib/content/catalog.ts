import type { GuideContent } from "./schema.ts";

/** One guide as the hub, home page, profile and parts finder see it (generated into content/guides/catalog.ts). */
export type GuideCard = Pick<GuideContent, "slug" | "platform" | "board" | "category" | "robotics" | "difficulty" | "hours" | "title" | "summary"> & {
  /** Registry names, so the parts finder can match without loading the whole hardware registry. */
  boardName: string;
  parts: { component: GuideContent["parts"][number]["component"]; name: string; qty: number; optional?: true }[];
};

/** One guide as the parts finder sees it (generated into content/guides/finder.ts): no summaries, no specs. */
export type FinderGuide = Pick<GuideContent, "slug" | "title" | "board"> & {
  boardName: string;
  parts: { component: GuideContent["parts"][number]["component"]; name: string; optional?: true }[];
};
