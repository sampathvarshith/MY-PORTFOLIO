"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { VTMonogram } from "@/components/brand/VTMonogram";

const HeroLogo3D = dynamic(() => import("./HeroLogo3D"), { ssr: false });

let webglSupport: boolean | null = null;
/** Hardware-accelerated WebGL only; software renderers get the static SVG instead. */
function detectWebGL() {
  if (webglSupport !== null) return webglSupport;
  try {
    const c = document.createElement("canvas");
    const opts = { failIfMajorPerformanceCaveat: true };
    const gl = (c.getContext("webgl2", opts) || c.getContext("webgl", opts)) as WebGLRenderingContext | null;
    if (!gl) {
      webglSupport = false;
    } else {
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
      webglSupport = !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

const noopSubscribe = () => () => {};

/**
 * Hero monogram. Always renders the SVG mark (instant paint, and the fallback when WebGL is
 * unavailable); the 3D scene loads lazily on top and pauses when offscreen or the tab is hidden.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const lite = useMedia("(max-width: 767px), (pointer: coarse)");
  const tabVisible = useSyncExternalStore(
    (cb) => {
      document.addEventListener("visibilitychange", cb);
      return () => document.removeEventListener("visibilitychange", cb);
    },
    () => document.visibilityState === "visible",
    () => true,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-square w-full">
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-violet-deep/35 blur-[80px]" />
      <div aria-hidden className="absolute inset-[30%] rounded-full bg-violet/30 blur-[60px]" />

      <div
        className={`absolute inset-[18%] transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <VTMonogram
          title="VT monogram"
          className="h-full w-full drop-shadow-[0_0_40px_rgba(168,85,247,0.55)]"
        />
      </div>

      {webgl ? (
        <div
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <HeroLogo3D
            active={visible && tabVisible}
            animate={!reduce}
            lite={lite}
            onReady={() => setReady(true)}
          />
        </div>
      ) : null}
    </div>
  );
}
