import { ArrowUpRight, ExternalLink, FolderOpen } from "lucide-react";
import { site } from "@/content/site";
import type { ResolvedImage } from "@/lib/assets";
import { VTMonogram } from "@/components/brand/VTMonogram";
import { Artwork } from "@/components/media/Artwork";
import { ExternalButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

/** "My Works" — opens the owner's Google Drive collection. It's only a link; nothing is synced. */
export function MyWorks({ collage }: { collage: ResolvedImage[] }) {
  const tiles = collage.slice(0, 3);
  return (
    <section id="my-works" aria-labelledby="my-works-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/15 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <TiltCard max={4} className="rounded-[2rem]">
            <div className="edge-glow panel grid items-center gap-10 overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:p-14">
              <div className="relative z-[2]">
                <div className="flex items-center gap-4">
                  <VTMonogram className="h-14 w-14 drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]" />
                  <span className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-violet-soft">
                    <FolderOpen className="h-3.5 w-3.5" aria-hidden /> Google Drive collection
                  </span>
                </div>
                <h2 id="my-works-title" className="mt-8 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  MY WORKS
                  <span className="mt-2 block text-lg font-semibold tracking-[0.12em] text-violet-soft sm:text-xl">
                    EXPLORE MY CREATIVE COLLECTION
                  </span>
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-lavender sm:text-lg">
                  Explore my creative work, design experiments, cinematic edits, motion graphics, and visual projects in one place.
                </p>
                <p className="mt-3 max-w-lg text-sm text-lavender/75">
                  The button opens my full portfolio folder on Google Drive in a new tab.
                </p>
                <ExternalButton href={site.driveUrl} className="mt-8 !min-h-14 !px-8 font-display tracking-[0.14em]">
                  VIEW ALL MY WORKS <ExternalLink className="h-4 w-4" aria-hidden />
                </ExternalButton>
              </div>

              <div aria-hidden className="relative mx-auto grid h-[22rem] w-full max-w-md sm:h-[26rem]">
                {tiles.map((img, i) => (
                  <div
                    key={`${img.src}-${i}`}
                    className={`absolute w-[52%] overflow-hidden rounded-2xl border border-white/10 bg-ink-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(168,85,247,0.5)] ${
                      [
                        "left-[24%] top-0 z-[3]",
                        "left-0 top-[18%] z-[2] -rotate-[8deg] opacity-90",
                        "right-0 top-[22%] z-[1] rotate-[8deg] opacity-80",
                      ][i]
                    }`}
                  >
                    <Artwork image={img} sizes="240px" label="Portfolio artwork" />
                  </div>
                ))}
                <ArrowUpRight className="absolute bottom-2 right-2 h-8 w-8 text-violet/60" />
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
