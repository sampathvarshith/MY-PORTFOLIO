"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

/** Click-to-load YouTube embed: only a thumbnail is fetched until the visitor presses play. */
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="edge-glow relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play video: ${title}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-violet text-white shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-transform group-hover:scale-110">
            <Play className="ml-1 h-7 w-7" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
