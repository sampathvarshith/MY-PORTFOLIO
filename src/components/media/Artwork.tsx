import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { ResolvedImage } from "@/lib/assets";
import { VTMonogram } from "@/components/brand/VTMonogram";

type Props = {
  image: ResolvedImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Keep the true aspect ratio (default) or fill a parent box with letterboxing. */
  layout?: "intrinsic" | "fill";
  /** Short label shown on the placeholder, e.g. "Terachapa — Poster 01". */
  label?: string;
};

/**
 * Renders artwork without cropping. When the file hasn't been supplied yet, renders a clearly
 * labelled placeholder that names the exact file to add.
 */
export function Artwork({ image, sizes, priority, className = "", imgClassName = "", layout = "intrinsic", label }: Props) {
  const ratio = `${image.width} / ${image.height}`;
  const boxStyle = layout === "intrinsic" ? { aspectRatio: ratio } : undefined;
  const box = `relative overflow-hidden ${layout === "fill" ? "h-full w-full" : "w-full"} ${className}`;

  if (!image.available) {
    return (
      <div className={box} style={boxStyle} role="img" aria-label={`Placeholder: ${image.alt}`}>
        <ArtworkPlaceholder label={label ?? image.caption ?? "Artwork"} expected={image.expected} />
      </div>
    );
  }

  return (
    <div className={box} style={boxStyle}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-contain ${imgClassName}`}
      />
    </div>
  );
}

export function ArtworkPlaceholder({ label, expected }: { label: string; expected?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden bg-[radial-gradient(80%_60%_at_50%_30%,#2a1150_0%,#120a22_55%,#0a0614_100%)] p-5 text-center">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(135deg,rgba(168,85,247,0.12)_0_1px,transparent_1px_14px)]"
      />
      <VTMonogram className="relative h-14 w-14 opacity-70 drop-shadow-[0_0_18px_rgba(168,85,247,0.6)]" />
      <p className="relative font-display text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white/85">
        {label}
      </p>
      <p className="relative inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-ink/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-violet-soft">
        <ImageOff className="h-3 w-3" aria-hidden /> Placeholder
      </p>
      {expected ? (
        <p className="relative max-w-[90%] break-all font-mono text-[0.6rem] leading-snug text-lavender/80">
          Add: {expected}
        </p>
      ) : null}
    </div>
  );
}
