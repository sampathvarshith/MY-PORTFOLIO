"use client";

import { useEffect, useRef } from "react";
import { T_BAR, T_STEM, V_SHAPE, toPath } from "@/components/brand/monogram-paths";
import { VTMonogram } from "@/components/brand/VTMonogram";

const INTRO_KEY = "vt-intro-seen";
// Runs during HTML parsing so returning visitors never see the intro flash.
const SKIP_SCRIPT = `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.dataset.intro="skip"}catch(e){}`;

/**
 * Opening sequence. The animation and auto-dismiss are pure CSS (see globals.css), so it never
 * blocks the page, even without JS. JS adds skip (click / Esc) and remembers the visit.
 */
export function IntroSequence() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    const el = ref.current;
    if (!el) return;
    const done = () => {
      el.dataset.done = "true";
      document.documentElement.dataset.intro = "skip";
    };
    const onEnd = (e: AnimationEvent) => e.animationName === "intro-out" && done();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && done();
    el.addEventListener("animationend", onEnd);
    el.addEventListener("click", done);
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("animationend", onEnd);
      el.removeEventListener("click", done);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }}
      />
      <div ref={ref} className="intro" aria-hidden="true">
        <div className="intro__sweep" />
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative h-28 w-28 sm:h-36 sm:w-36">
            <svg viewBox="0 0 100 100" className="intro__mark absolute inset-0 h-full w-full">
              {[T_STEM, V_SHAPE, T_BAR].map((pts, i) => (
                <path key={i} d={toPath(pts)} fill="none" stroke="#a855f7" strokeWidth="1.2" strokeLinejoin="round" />
              ))}
            </svg>
            <div className="intro__fill absolute inset-0 drop-shadow-[0_0_24px_rgba(168,85,247,0.7)]">
              <VTMonogram className="h-full w-full" />
            </div>
          </div>
          <p className="intro__name font-display text-xs text-chrome sm:text-sm">VARSHITH TRIPARNA</p>
        </div>
        <span className="absolute bottom-8 right-8 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-chrome/80">
          Tap or Esc to skip
        </span>
      </div>
    </>
  );
}
