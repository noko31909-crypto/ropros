import type { ReactNode } from "react";
import { ObstacleAvoidingRobotDiagram } from "./obstacle-avoiding-robot";
import { LineFollowerDiagram } from "./line-follower";
import { IotPlantCareDiagram } from "./iot-plant-care";

/** Static SVG diagram for a guide slug, or null when none exists yet. */
export function GuideDiagram({ slug, label }: { slug: string; label: string }): ReactNode {
  switch (slug) {
    case "obstacle-avoiding-robot": return <ObstacleAvoidingRobotDiagram label={label} />;
    case "line-follower": return <LineFollowerDiagram label={label} />;
    case "iot-plant-care": return <IotPlantCareDiagram label={label} />;
    default: return null;
  }
}
