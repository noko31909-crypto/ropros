import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPONENT_IDS, isComponentId } from "@/lib/hardware/ids";
import { ModelPreview } from "./preview";

export const metadata: Metadata = { title: "3D model preview", robots: { index: false } };

/** Dev-only visual check of the built-in 3D part models: /dev/models?id=<component> (or the first one). */
export default async function ModelsPreviewPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!(process.env.NODE_ENV !== "production" || process.env.ENABLE_DEV_PAGES === "1")) notFound();
  const raw = (await searchParams).id;
  const id = typeof raw === "string" && isComponentId(raw) ? raw : COMPONENT_IDS[0];
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-6">
      <h1 className="font-mono text-sm">{id}</h1>
      <ModelPreview id={id} />
    </main>
  );
}
