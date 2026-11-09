import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-violet-soft ${center ? "justify-center" : ""}`}
        >
          <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-violet" />
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </Tag>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-lavender sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
