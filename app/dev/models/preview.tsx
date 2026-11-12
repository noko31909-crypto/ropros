"use client";

import { useEffect, useRef } from "react";
import type { ComponentId } from "@/lib/hardware/ids";

/** One part model in the same scene the generator uses, so what you see here is what a project shows. */
export function ModelPreview({ id }: { id: ComponentId }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let dispose: (() => void) | undefined;
    void import("@/components/build/three-scene").then(({ createView }) => {
      if (!canvas.current) return;
      const view = createView(canvas.current, { parts: [{ name: id, color: "#888888", printed: false, component: id, at: [0, 0, 0] }] }, "orbit", { reducedMotion: true });
      dispose = view.dispose;
      canvas.current.dataset.ready = "1";
    });
    return () => dispose?.();
  }, [id]);
  return <canvas ref={canvas} className="aspect-[4/3] w-full rounded-2xl bg-[#0b1017]" aria-label={id} />;
}
