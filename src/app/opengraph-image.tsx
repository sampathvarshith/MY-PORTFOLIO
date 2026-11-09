import { ImageResponse } from "next/og";
import { T_BAR, T_STEM, V_SHAPE, toPath } from "@/components/brand/monogram-paths";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 96px",
          background: "radial-gradient(circle at 25% 40%, #2a1150 0%, #0a0614 60%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="300" height="300" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="c" x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.45" stopColor="#d1d5db" />
              <stop offset="0.55" stopColor="#6b6f80" />
              <stop offset="1" stopColor="#f5f3ff" />
            </linearGradient>
          </defs>
          <path d={toPath(T_STEM)} fill="url(#c)" stroke="#a855f7" strokeWidth="1" />
          <path d={toPath(V_SHAPE)} fill="url(#c)" stroke="#0a0614" strokeWidth="4" paintOrder="stroke" />
          <path d={toPath(V_SHAPE)} fill="url(#c)" stroke="#a855f7" strokeWidth="1" />
          <path d={toPath(T_BAR)} fill="url(#c)" stroke="#0a0614" strokeWidth="4" paintOrder="stroke" />
          <path d={toPath(T_BAR)} fill="url(#c)" stroke="#a855f7" strokeWidth="1" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: 6, lineHeight: 1 }}>VARSHITH</div>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: 6, lineHeight: 1.1, color: "#a855f7" }}>
            TRIPARNA
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#d1d5db" }}>{site.tagline}</div>
          <div style={{ marginTop: 14, fontSize: 22, color: "#b9b1cc" }}>
            Visual Artist · Creative Editor · AI Filmmaker · Graphic Designer
          </div>
        </div>
      </div>
    ),
    size,
  );
}
