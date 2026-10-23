import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { layoutCircuit } from "@/lib/hardware/layout";
import { AutoDiagram, DiagramLegend } from "@/components/guide/diagrams/auto-diagram";
import { getComponent } from "@/lib/hardware/components";
import { isComponentId } from "@/lib/hardware/ids";
import { REGISTRY_CIRCUITS } from "./fixtures";

const lookup = (id: string) => {
  if (!isComponentId(id)) throw new Error(`Unknown component "${id}"`);
  return getComponent(id);
};

export const metadata: Metadata = { title: "Diagram preview", robots: { index: false } };

/** Dev-only visual check of the automatic wiring-diagram renderer. */
export default function DiagramsPreviewPage() {
  if (!(process.env.NODE_ENV !== "production" || process.env.ENABLE_DEV_PAGES === "1")) notFound();
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <h1 className="text-2xl font-semibold">Auto diagrams (dev)</h1>
      {REGISTRY_CIRCUITS.map((f) => {
        const layout = layoutCircuit(f.circuit, lookup);
        return (
          <section key={f.slug} id={f.slug} className="space-y-4">
            <h2 className="text-lg font-semibold">{f.title}</h2>
            <div className="overflow-hidden rounded-[28px] border border-line">
              <AutoDiagram layout={layout} title={f.title} />
            </div>
            <DiagramLegend layout={layout} title="Wire legend" />
          </section>
        );
      })}
    </main>
  );
}
