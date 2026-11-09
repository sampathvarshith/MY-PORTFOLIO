import type { Metadata } from "next";
import { Check, ArrowUpRight } from "lucide-react";
import { serviceCategories } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Video editing, motion graphics, AI filmmaking, graphic design, branding, photo editing, and web design by Varshith Triparna.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="relative pb-24 pt-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute -top-20 right-0 -z-10 h-[30rem] w-[40rem] rounded-full bg-violet-deep/20 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title={
            <>
              Professional <span className="violet-text">services</span>
            </>
          }
          description="Each discipline, broken down. Request a quote on any category and the enquiry form opens with that service selected."
        />

        <nav aria-label="Service categories" className="mt-10 flex flex-wrap gap-2">
          {serviceCategories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="min-h-11 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-chrome/85 hover:border-violet/50 hover:text-white"
            >
              {c.title}
            </a>
          ))}
        </nav>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {serviceCategories.map(({ id, title, summary, items, icon: Icon, enquiryId }, i) => (
            <Reveal key={id} delay={(i % 2) * 0.08}>
              <article id={id} aria-labelledby={`${id}-title`} className="edge-glow panel relative h-full scroll-mt-28 overflow-hidden rounded-[2rem] p-7 sm:p-9">
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet/15 blur-3xl" />
                <span aria-hidden className="absolute right-7 top-7 font-display text-5xl font-extrabold text-white/[0.04] sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet/30 bg-gradient-to-br from-violet/30 to-violet-deep/10 text-white shadow-[0_0_40px_-10px_rgba(168,85,247,0.9)]">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 id={`${id}-title`} className="relative mt-6 font-display text-xl font-bold tracking-[0.08em] sm:text-2xl">
                  {title.toUpperCase()}
                </h2>
                <p className="relative mt-3 text-lavender">{summary}</p>
                <ul className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-chrome/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <QuoteLink service={enquiryId} variant="primary" className="relative mt-8">
                  Request a Quote <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only"> for {title}</span>
                </QuoteLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
