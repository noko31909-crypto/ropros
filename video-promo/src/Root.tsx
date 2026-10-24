import { Composition } from "remotion";
import { DURATION, FPS, RoprosPromo } from "./RoprosPromo";

export function RemotionRoot() {
  return <Composition id="RoprosPromo" component={RoprosPromo} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />;
}
