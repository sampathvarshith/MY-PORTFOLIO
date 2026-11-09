import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { site } from "@/content/site";
import type { ResolvedProject } from "@/lib/assets";
import { HeroVisual } from "@/components/three/HeroVisual";
import { ButtonLink } from "@/components/ui/Button";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { Artwork } from "@/components/media/Artwork";

export function Hero({ featured }: { featured?: ResolvedProject }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      {/* Atmosphere: fog gradients and a faint perspective grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[36rem] w-[36rem] animate-drift rounded-full bg-violet-deep/25 blur-[120px]" />
        <div className="absolute -right-32 top-40 h-[30rem] w-[30rem] animate-drift rounded-full bg-violet/15 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] opacity-[0.18] [background-image:linear-gradient(rgba(168,85,247,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.5)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_top,black,transparent)] [transform:perspective(600px)_rotateX(60deg)] origin-bottom" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative z-10 order-2 lg:order-1">
          <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-violet/30 bg-violet/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-violet-soft">
            {site.roles.map((r, i) => (
              <span key={r} className="inline-flex items-center gap-3">
                {i > 0 ? <span aria-hidden className="h-1 w-1 rounded-full bg-violet" /> : null}
                {r}
              </span>
            ))}
          </p>
          <h1 id="hero-title" className="mt-7 font-display font-extrabold leading-[0.95]">
            <span className="chrome-text block text-[clamp(2.6rem,8vw,6.2rem)]">VARSHITH</span>
            <span className="violet-text block text-[clamp(2.6rem,8vw,6.2rem)]">TRIPARNA</span>
          </h1>
          <p className="mt-6 font-display text-lg font-semibold tracking-[0.06em] text-white sm:text-2xl">{site.tagline}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-lavender sm:text-lg">{site.intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#work">
              Explore My Work <ArrowDown className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <QuoteLink variant="outline">
              Start a Project <ArrowUpRight className="h-4 w-4" aria-hidden />
            </QuoteLink>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[22rem] sm:max-w-md lg:order-2 lg:max-w-none">
          <HeroVisual />
        </div>
      </div>

      {/* Featured preview strip */}
      <div className="mx-auto mt-10 max-w-7xl px-5 pb-16 sm:px-8 lg:mt-4">
        <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
          {featured ? (
            <Link
              href={`/work/${featured.slug}`}
              className="edge-glow panel group flex items-center gap-5 overflow-hidden rounded-3xl p-4 sm:p-5"
            >
              <div className="w-20 shrink-0 overflow-hidden rounded-xl sm:w-24">
                <Artwork image={featured.cover} sizes="96px" label={featured.title} />
              </div>
              <div className="min-w-0">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-violet-soft">Featured case study</p>
                <p className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">
                  {featured.title} <span className="text-lavender">— {featured.subtitle}</span>
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-lavender">{featured.summary}</p>
              </div>
              <ArrowUpRight className="ml-auto hidden h-5 w-5 shrink-0 text-violet-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" aria-hidden />
            </Link>
          ) : null}
          <Link href="/#showreel" className="edge-glow panel group flex items-center gap-5 rounded-3xl p-4 sm:p-5">
            <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-deep to-violet shadow-[0_0_30px_-4px_rgba(168,85,247,0.8)]">
              <Play className="ml-0.5 h-6 w-6 text-white" aria-hidden />
            </span>
            <span>
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-violet-soft">Showreel</span>
              <span className="mt-1.5 block font-display text-lg font-bold text-white">Watch the reel</span>
              <span className="mt-1 block text-sm text-lavender">Edits, motion, and AI visuals in motion.</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
