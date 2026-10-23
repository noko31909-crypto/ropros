import type { ReactNode } from "react";
import type { DiagramCaptions } from "./primitives";
import { ObstacleAvoidingRobotDiagram } from "./obstacle-avoiding-robot";
import { LineFollowerDiagram } from "./line-follower";
import { IotPlantCareDiagram } from "./iot-plant-care";

/** Static SVG diagram for a guide slug, or null when none exists yet. */
export function GuideDiagram({ slug, label, captions }: { slug: string; label: string; captions: DiagramCaptions }): ReactNode {
  switch (slug) {
    case "obstacle-avoiding-robot": return <ObstacleAvoidingRobotDiagram label={label} c={captions} />;
    case "line-follower": return <LineFollowerDiagram label={label} c={captions} />;
    case "iot-plant-care": return <IotPlantCareDiagram label={label} c={captions} />;
    default: return null;
  }
}
