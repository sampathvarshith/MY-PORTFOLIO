"use client";

import { RotateCcw } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-[70dvh] items-center justify-center px-5 pt-28 text-center">
      <div>
        <p className="font-display text-sm tracking-[0.4em] text-violet-soft">SOMETHING BROKE</p>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">This scene failed to render</h1>
        <p className="mx-auto mt-4 max-w-md text-lavender">Please try again. If it keeps happening, reach out by email.</p>
        <button type="button" onClick={reset} className={buttonClass("primary", "mt-8")}>
          <RotateCcw className="h-4 w-4" aria-hidden /> Try again
        </button>
      </div>
    </section>
  );
}
