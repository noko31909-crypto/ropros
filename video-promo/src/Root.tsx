import { Composition } from "remotion";
import { DURATION, FPS, RoprosPromo } from "./RoprosPromo";
import { PO_DURATION, PO_FPS, PromoOverlay } from "./PromoOverlay";
import { WM_DURATION, WM_FPS, WiringMistakes } from "./WiringMistakes";

export function RemotionRoot() {
  return (
    <>
      <Composition id="RoprosPromo" component={RoprosPromo} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />
      <Composition id="WiringMistakes" component={WiringMistakes} durationInFrames={WM_DURATION} fps={WM_FPS} width={1080} height={1920} />
      <Composition id="PromoOverlay" component={PromoOverlay} durationInFrames={PO_DURATION} fps={PO_FPS} width={1080} height={1920} />
    </>
  );
}
