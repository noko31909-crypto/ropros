"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

type Labels = { title: string; unmute: string; mute: string; play: string; pause: string };

/**
 * 30 s vertical intro in the home hero. Starts muted (browsers only autoplay silent video),
 * loops, and stays paused on the poster for people who prefer reduced motion.
 */
export function IntroVideo({ labels }: { labels: Labels }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().then(() => setPlaying(true)).catch(() => {});
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) void v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const btn = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink-950/70 text-fg backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent";
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[28px] border border-line bg-ink-900 shadow-2xl shadow-black/60">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src="/intro/ropros-intro.mp4"
        poster="/intro/ropros-intro-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={labels.title}
      />
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button type="button" onClick={togglePlay} className={btn} aria-label={playing ? labels.pause : labels.play}>
          {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
        </button>
        <button type="button" onClick={toggleMute} className={btn} aria-label={muted ? labels.unmute : labels.mute}>
          {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
        </button>
      </div>
    </div>
  );
}
