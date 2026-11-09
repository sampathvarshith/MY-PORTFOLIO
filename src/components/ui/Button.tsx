import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold tracking-wide transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[var(--ease-cinema)] focus-visible:outline-offset-4 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet-deep to-violet text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_10px_40px_-10px_rgba(168,85,247,0.8)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25)_inset,0_14px_50px_-8px_rgba(168,85,247,0.95)] hover:-translate-y-0.5",
  outline:
    "border border-white/15 bg-white/[0.03] text-white hover:border-violet/60 hover:bg-violet/10 hover:-translate-y-0.5",
  ghost: "text-chrome hover:text-white",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

function Sheen({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-sheen"
    />
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", className, children, ...props }: LinkProps) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      <Sheen show={variant === "primary"} />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}

type AnchorProps = Omit<ComponentProps<"a">, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/** External link button. Opens in a new tab safely. */
export function ExternalButton({ variant = "primary", className, children, ...props }: AnchorProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)} {...props}>
      <Sheen show={variant === "primary"} />
      <span className="relative inline-flex items-center gap-2">{children}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
