import type { ReactNode } from "react";
import type { guideMessages } from "@/lib/i18n/messages/guide";
import { guideCircuit, type Guide } from "@/lib/guides";
import { layoutCircuit } from "@/lib/hardware/layout";
import { getComponent } from "@/lib/hardware/components";
import { isComponentId } from "@/lib/hardware/ids";
import { AutoDiagram } from "./auto-diagram";

/** Localised human-language captions (part and pin names stay untranslated). */
export type DiagramCaptions = (typeof guideMessages)["en"]["diagram"]["captions"];

const lookup = (id: string) => {
  if (!isComponentId(id)) throw new Error(`Unknown component "${id}"`);
  return getComponent(id);
};

/**
 * Wiring diagram for a guide, drawn automatically from its checked `instances` + `connections`,
 * so the picture always matches the legend, the steps and the circuit checker.
 */
export function GuideDiagram({ guide, label, captions }: { guide: Guide; label: string; captions: DiagramCaptions }): ReactNode {
  return <AutoDiagram layout={layoutCircuit(guideCircuit(guide), lookup)} title={label} captions={captions}
    className="block h-auto max-h-[620px] w-full min-w-[720px]" />;
}
