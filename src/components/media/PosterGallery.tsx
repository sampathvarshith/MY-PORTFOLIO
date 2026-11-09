"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { ResolvedImage } from "@/lib/assets";
import { Artwork } from "./Artwork";

/**
 * Poster gallery with a native <dialog> lightbox (built-in focus trap and Esc to close).
 * Arrow keys move between images; artwork is always shown uncropped.
 */
export function PosterGallery({ images, title }: { images: ResolvedImage[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const lastIndex = useRef(0);

  const open = (i: number) => {
    lastIndex.current = i;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      const opener = triggerRefs.current[lastIndex.current];
      setIndex(null);
      requestAnimationFrame(() => opener?.focus());
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              className="edge-glow group relative block w-full overflow-hidden rounded-2xl bg-ink-2 text-left"
              aria-label={`Enlarge ${img.caption ?? `image ${i + 1}`} of ${title}`}
            >
              <Artwork
                image={img}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                label={`${title} — ${img.caption ?? `Image ${i + 1}`}`}
                imgClassName="transition-transform duration-700 ease-[var(--ease-cinema)] group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-3 right-3 z-[2] inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-medium text-white opacity-90 backdrop-blur group-hover:opacity-100">
                <ZoomIn className="h-3.5 w-3.5" aria-hidden /> View
              </span>
            </button>
            {img.caption ? <p className="mt-3 text-sm text-lavender">{img.caption}</p> : null}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? `${title} — ${current.caption ?? "image"}` : title}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-white backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-sm text-lavender" aria-live="polite">
                {title} — {current.caption ?? "Image"} ({(index ?? 0) + 1} / {images.length})
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
                aria-label="Close"
                autoFocus
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-16">
              <div className="relative h-full w-full">
                <Artwork image={current} sizes="100vw" layout="fill" label={`${title} — ${current.caption ?? ""}`} />
              </div>
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/70 hover:bg-violet/30 sm:left-4"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/70 hover:bg-violet/30 sm:right-4"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
