import { useId } from "react";
import { T_BAR, T_STEM, V_SHAPE, toPath } from "./monogram-paths";

type Props = {
  className?: string;
  /** chrome: metallic gradient + purple edge. mono: single colour (currentColor). */
  variant?: "chrome" | "mono";
  title?: string;
};

const V = toPath(V_SHAPE);
const BAR = toPath(T_BAR);
const STEM = toPath(T_STEM);

/** Interlocked VT monogram. Gaps are real transparent cut-outs, so it works over any background. */
export function VTMonogram({ className, variant = "chrome", title }: Props) {
  const id = useId().replace(/:/g, "");
  const fill = variant === "chrome" ? `url(#${id}-chrome)` : "currentColor";
  const edge = variant === "chrome" ? "#a855f7" : "none";

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.42" stopColor="#d1d5db" />
          <stop offset="0.52" stopColor="#6b6f80" />
          <stop offset="0.62" stopColor="#c9ccd6" />
          <stop offset="1" stopColor="#f5f3ff" />
        </linearGradient>
        <mask id={`${id}-under-v`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <path d={V} fill="#000" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
        </mask>
        <mask id={`${id}-under-bar`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <path d={BAR} fill="#000" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
        </mask>
      </defs>
      <path d={STEM} fill={fill} stroke={edge} strokeWidth="0.8" mask={`url(#${id}-under-v)`} />
      <path d={V} fill={fill} stroke={edge} strokeWidth="0.8" strokeLinejoin="round" mask={`url(#${id}-under-bar)`} />
      <path d={BAR} fill={fill} stroke={edge} strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  );
}

/** Horizontal lockup: monogram + full name. */
export function VTLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <VTMonogram className="h-9 w-9 drop-shadow-[0_0_10px_rgba(168,85,247,0.55)]" />
      {compact ? null : (
        <span className="font-display text-[0.8rem] font-semibold leading-tight tracking-[0.22em] text-white">
          VARSHITH
          <span className="block text-violet-soft">TRIPARNA</span>
        </span>
      )}
    </span>
  );
}
