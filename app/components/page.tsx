import type { Metadata } from "next";
import { Boxes } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";

export const metadata: Metadata = { title: "Component Library" };
const CATEGORIES = ["Boards", "Sensors", "Actuators", "Drivers", "Displays", "Communication", "Power", "Mechanical"];

export default function ComponentsPage() {
  return (
    <>
      <PageHeader eyebrowIcon={<Boxes className="h-5 w-5" aria-hidden />} title="Component Library"
        description="Pinouts, voltages and the gotchas behind most failed builds. Add parts to your inventory and the Project Finder uses them." />
      <Container className="grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <div key={c} className="rounded-[var(--radius-card)] border border-line bg-ink-850 p-6">
            <p className="text-lg font-semibold text-fg">{c}</p>
            <p className="mt-1 font-mono text-xs text-fg-subtle">category slot</p>
          </div>
        ))}
      </Container>
    </>
  );
}
