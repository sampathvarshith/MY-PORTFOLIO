import { about, tools } from "@/content/site";
import type { ResolvedImage } from "@/lib/assets";
import { Artwork } from "@/components/media/Artwork";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteLink } from "@/components/ui/QuoteLink";

export function About({ portrait }: { portrait: ResolvedImage }) {
  const confirmedTools = tools.filter((t) => t.confirmed);
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          {/* Dark studio frame with purple rim light */}
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet/40 via-transparent to-violet-deep/40 blur-2xl" />
          <div className="edge-glow relative overflow-hidden rounded-[2rem] bg-[#07040f] shadow-[inset_-30px_0_60px_-30px_rgba(168,85,247,0.7),inset_30px_0_60px_-40px_rgba(124,58,237,0.6)]">
            <Artwork
              image={portrait}
              sizes="(min-width: 1024px) 40vw, 90vw"
              label="Portrait — Varshith Triparna"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(168,85,247,0.25),transparent_25%,transparent_75%,rgba(124,58,237,0.3))] mix-blend-screen" />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title={
              <>
                The creative behind <span className="violet-text">the visuals</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-chrome/90">{about}</p>
          </Reveal>

          {confirmedTools.length ? (
            <Reveal delay={0.15}>
              <h3 className="mt-10 font-display text-xs font-semibold tracking-[0.25em] text-white/60">TOOLS I WORK WITH</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {confirmedTools.map((t) => (
                  <li
                    key={t.name}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-chrome"
                  >
                    {t.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          <Reveal delay={0.2}>
            <QuoteLink variant="primary" className="mt-10">
              Work with me
            </QuoteLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
