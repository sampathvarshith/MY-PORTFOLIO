"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";

/** Showreel player with custom controls. Video data loads only when the visitor presses play. */
export function VideoPlayer({ src, poster, title }: { src: string; poster?: string | null; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser capability, unknown during SSR
    setCanFullscreen(!!document.fullscreenEnabled);
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <div ref={wrapRef} className="group relative aspect-video w-full overflow-hidden rounded-3xl bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        src={src}
        poster={poster ?? undefined}
        preload="none"
        playsInline
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        aria-label={title}
      />
      {!playing ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-violet text-white shadow-[0_0_60px_rgba(168,85,247,0.8)] transition-transform hover:scale-110"
          aria-label="Play showreel"
        >
          <Play className="ml-1 h-8 w-8" aria-hidden />
        </button>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-4">
        <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="ctrl">
          {playing ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
        </button>
        <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted} className="ctrl">
          {muted ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
        </button>
        {canFullscreen ? (
          <button type="button" onClick={() => void wrapRef.current?.requestFullscreen()} aria-label="Full screen" className="ctrl ml-auto">
            <Maximize className="h-5 w-5" aria-hidden />
          </button>
        ) : null}
      </div>
    </div>
  );
}
