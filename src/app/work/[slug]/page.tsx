import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { getProject, visibleProjects, type Category } from "@/content/projects";
import type { EnquiryServiceId } from "@/content/services";
import { resolveProject, type ResolvedImage } from "@/lib/assets";
import { Artwork } from "@/components/media/Artwork";
import { PosterGallery } from "@/components/media/PosterGallery";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { Reveal } from "@/components/ui/Reveal";

const serviceForCategory: Record<Category, EnquiryServiceId> = {
  "Movie Posters": "posters-graphic-design",
  "Cinematic Video Editing": "video-editing",
  "AI Filmmaking": "ai-filmmaking",
  "Graphic Design": "posters-graphic-design",
  "Logo Design & Branding": "logo-branding",
  "YouTube Thumbnails": "youtube",
  "Reels & Short-Form Videos": "reels",
  "Motion Graphics & Logo Animation": "motion-graphics",
  "Wedding & Event Editing": "wedding-event",
  "Photography & Photo Manipulation": "photography",
  "Website Design": "web-design",
};

export function generateStaticParams() {
  return visibleProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = project.subtitle && !project.placeholder ? `${project.title} — ${project.subtitle}` : project.title;
  const cover = resolveProject(project).cover;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    robots: project.placeholder ? { index: false } : undefined,
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      ...(cover.available ? { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] } : {}),
    },
  };
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.3em] text-violet-soft">
      <span aria-hidden className="h-px w-8 bg-violet" />
      {children}
    </h2>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const raw = getProject(slug);
  if (!raw) notFound();
  const project = resolveProject(raw);

  const all = visibleProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];

  const images = project.gallery.filter((m): m is ResolvedImage => m.type === "image");
  const videos = project.gallery.filter((m) => m.type === "youtube");
  const facts = [
    { label: "Project type", value: project.type },
    { label: "Date", value: project.date },
    { label: "Role", value: project.role },
    { label: "Tools", value: project.tools?.join(", ") },
    { label: "AI workflow", value: project.aiWorkflow },
    { label: "Deliverables", value: project.deliverables },
    { label: "Context", value: project.context },
  ].filter((f): f is { label: string; value: string } => !!f.value);

  return (
    <article className="relative pb-24 pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-deep/20 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-lavender">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/work" className="hover:text-white">Work</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-white">{project.title}</li>
          </ol>
        </nav>

        {project.placeholder ? (
          <p className="mt-6 flex items-start gap-2 rounded-2xl border border-violet/40 bg-violet/10 p-4 text-sm text-violet-soft">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            This is a template slot, not a published project. Replace it with real work in src/content/projects.ts.
          </p>
        ) : null}

        {/* 1. Cover */}
        <header className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <ul className="flex flex-wrap gap-2" aria-label="Categories">
              {project.categories.map((c) => (
                <li key={c} className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-violet-soft">
                  {c}
                </li>
              ))}
            </ul>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] sm:text-6xl">
              <span className="chrome-text">{project.title}</span>
              {project.subtitle ? <span className="mt-3 block text-xl font-semibold text-violet-soft sm:text-2xl">{project.subtitle}</span> : null}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-lavender">{project.summary}</p>
            {project.date ? <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/60">{project.date}</p> : null}
          </div>
          <Reveal>
            <div className="edge-glow relative mx-auto max-w-md overflow-hidden rounded-3xl bg-[#07040f] shadow-[0_40px_120px_-30px_rgba(168,85,247,0.55)] lg:max-w-none">
              <Artwork image={project.cover} sizes="(min-width: 1024px) 42vw, 90vw" priority label={`${project.title} — cover`} />
            </div>
          </Reveal>
        </header>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="space-y-14">
            {/* 2. Overview */}
            {project.overview?.length ? (
              <section aria-labelledby="overview">
                <SectionTitle id="overview">OVERVIEW</SectionTitle>
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-chrome/90">
                  {project.overview.map((p) => <p key={p}>{p}</p>)}
                </div>
              </section>
            ) : null}

            {/* 4. Creative direction */}
            {project.creativeDirection?.length ? (
              <section aria-labelledby="direction">
                <SectionTitle id="direction">CREATIVE DIRECTION</SectionTitle>
                <ul className="mt-5 grid gap-3">
                  {project.creativeDirection.map((d, i) => (
                    <li key={d} className="panel flex gap-4 rounded-2xl p-5 text-chrome/90">
                      <span className="font-display text-sm font-bold text-violet">{String(i + 1).padStart(2, "0")}</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {/* 3. Role & tools */}
          {facts.length ? (
            <aside aria-labelledby="facts" className="lg:sticky lg:top-28 lg:self-start">
              <div className="panel edge-glow rounded-3xl p-7">
                <SectionTitle id="facts">ROLE & TOOLS</SectionTitle>
                <dl className="mt-6 divide-y divide-white/5">
                  {facts.map((f) => (
                    <div key={f.label} className="grid gap-1 py-3.5 sm:grid-cols-[8rem_1fr] sm:gap-4">
                      <dt className="text-xs uppercase tracking-[0.18em] text-lavender/70">{f.label}</dt>
                      <dd className="text-sm text-white">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          ) : null}
        </div>

        {/* 5. Gallery */}
        {images.length || videos.length ? (
          <section aria-labelledby="gallery" className="mt-20">
            <SectionTitle id="gallery">GALLERY</SectionTitle>
            <p className="mt-3 text-sm text-lavender">Select any artwork to view it full size. Use arrow keys to move between images.</p>
            {videos.length ? (
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {videos.map((v) => (
                  <figure key={v.youtubeId}>
                    <YouTubeEmbed id={v.youtubeId} title={v.title} />
                    {v.caption ? <figcaption className="mt-3 text-sm text-lavender">{v.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : null}
            {images.length ? (
              <div className="mt-8">
                <PosterGallery images={images} title={project.title} />
              </div>
            ) : null}
          </section>
        ) : null}

        {/* 6. Process — only when supporting material exists */}
        {project.process.length ? (
          <section aria-labelledby="process" className="mt-20">
            <SectionTitle id="process">DESIGN PROCESS</SectionTitle>
            <ol className="mt-8 grid gap-6 md:grid-cols-2">
              {project.process.map((step, i) => (
                <li key={step.title} className="panel overflow-hidden rounded-3xl">
                  {step.media ? <Artwork image={step.media} sizes="(min-width: 768px) 45vw, 100vw" label={step.title} /> : null}
                  <div className="p-6">
                    <p className="font-display text-xs text-violet">STEP {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm text-lavender">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* 7. Credits */}
        {project.credits?.length || project.disclaimer ? (
          <section aria-labelledby="credits" className="mt-20 border-t border-white/5 pt-10">
            <SectionTitle id="credits">CREDITS</SectionTitle>
            {project.credits?.length ? (
              <dl className="mt-6 grid gap-6 sm:grid-cols-3">
                {project.credits.map((c) => (
                  <div key={c.label}>
                    <dt className="text-xs uppercase tracking-[0.18em] text-lavender/70">{c.label}</dt>
                    <dd className="mt-1 text-white">{c.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {project.disclaimer ? <p className="mt-6 max-w-3xl text-sm text-lavender/80">{project.disclaimer}</p> : null}
          </section>
        ) : null}

        <div className="panel edge-glow mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="font-display text-2xl font-bold">Have a project like this?</p>
            <p className="mt-2 text-lavender">Share your brief and get a tailored quote.</p>
          </div>
          <QuoteLink service={serviceForCategory[project.categories[0]]} variant="primary">
            Request a Quote <ArrowUpRight className="h-4 w-4" aria-hidden />
          </QuoteLink>
        </div>

        {all.length > 1 ? (
          <nav aria-label="More projects" className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link href={`/work/${prev.slug}`} className="panel group flex items-center gap-4 rounded-2xl p-5 hover:border-violet/50">
              <ArrowLeft className="h-5 w-5 text-violet-soft transition-transform group-hover:-translate-x-1" aria-hidden />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-lavender/70">Previous</span>
                <span className="block font-display font-bold">{prev.title}</span>
              </span>
            </Link>
            <Link href={`/work/${next.slug}`} className="panel group flex items-center justify-end gap-4 rounded-2xl p-5 text-right hover:border-violet/50">
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-lavender/70">Next</span>
                <span className="block font-display font-bold">{next.title}</span>
              </span>
              <ArrowRight className="h-5 w-5 text-violet-soft transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </nav>
        ) : null}
      </div>
    </article>
  );
}
