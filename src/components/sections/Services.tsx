import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { serviceCards } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title={
              <>
                What I can <span className="violet-text">create</span> for you
              </>
            }
            description="From a single poster to a complete visual campaign — pick a service to start a conversation."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-violet-soft hover:text-white lg:self-auto"
          >
            Full services breakdown <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {serviceCards.map(({ id, title, description, icon: Icon }, i) => (
            <li key={id}>
              <Reveal delay={(i % 5) * 0.06} className="h-full">
                <article className="edge-glow panel group flex h-full flex-col rounded-3xl p-6 transition-transform duration-500 ease-[var(--ease-cinema)] hover:-translate-y-1">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-violet/30 bg-gradient-to-br from-violet/25 to-transparent text-violet-soft shadow-[0_0_30px_-10px_rgba(168,85,247,0.9)] transition-colors group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-base font-bold leading-snug text-white">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-lavender">{description}</p>
                  <QuoteLink
                    service={id}
                    plain
                    className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-violet-soft hover:text-white"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden /> Discuss This Service
                    <span className="sr-only">: {title}</span>
                  </QuoteLink>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
