import { ArrowRight, Clapperboard } from "lucide-react";
import { contact, showreel } from "@/content/site";
import { VTMonogram } from "@/components/brand/VTMonogram";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { YouTubeIcon } from "@/components/ui/BrandIcons";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Showreel() {
  const hasReel = !!(showreel.src || showreel.youtubeId);
  return (
    <section id="showreel" aria-labelledby="showreel-title" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="showreel-title"
          eyebrow="Showreel"
          align="center"
          title={
            <>
              Visuals in <span className="violet-text">motion</span>
            </>
          }
          description={showreel.description}
        />

        <Reveal className="mx-auto mt-12 max-w-5xl">
          <div className="relative rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent p-px shadow-[0_40px_120px_-40px_rgba(168,85,247,0.6)]">
            {/* Letterbox bars give the player a cinematic frame */}
            <div className="overflow-hidden rounded-[2rem] bg-black">
              {showreel.youtubeId ? (
                <YouTubeEmbed id={showreel.youtubeId} title="Varshith Triparna showreel" />
              ) : showreel.src ? (
                <VideoPlayer src={showreel.src} poster={showreel.poster} title="Varshith Triparna showreel" />
              ) : (
                <div className="relative flex aspect-video flex-col items-center justify-center gap-4 bg-[radial-gradient(70%_60%_at_50%_45%,#24104a_0%,#0a0614_75%)] p-6 text-center">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-[9%] bg-black" />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-[9%] bg-black" />
                  <VTMonogram className="h-16 w-16 opacity-80 drop-shadow-[0_0_24px_rgba(168,85,247,0.7)] sm:h-20 sm:w-20" />
                  <p className="inline-flex items-center gap-2 rounded-full border border-violet/40 bg-ink/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-violet-soft">
                    <Clapperboard className="h-3.5 w-3.5" aria-hidden /> Showreel placeholder
                  </p>
                  <p className="max-w-md text-sm text-lavender">
                    The showreel is being cut. Meanwhile, watch videos on the YouTube channel.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/work" variant="outline">
            Browse individual projects <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
          {!hasReel ? (
            <ExternalButton href={contact.youtube} variant="outline">
              <YouTubeIcon className="h-4 w-4" /> YouTube channel
            </ExternalButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
