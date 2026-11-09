import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { visibleProjects } from "@/content/projects";
import { portrait, resolveProject } from "@/lib/assets";
import { IntroSequence } from "@/components/layout/IntroSequence";
import { Hero } from "@/components/sections/Hero";
import { MyWorks } from "@/components/sections/MyWorks";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Showreel } from "@/components/sections/Showreel";
import { Contact } from "@/components/sections/Contact";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  const projects = visibleProjects().map(resolveProject);
  const featured = projects.find((p) => p.featured);
  // Collage prefers real artwork; falls back to whatever covers exist (placeholders included).
  const artwork = projects.flatMap((p) => [p.cover, ...p.gallery.filter((m) => m.type === "image")]);
  const unique = [...new Map(artwork.map((a) => [a.src, a])).values()];
  const collage = [...unique.filter((a) => a.available), ...unique.filter((a) => !a.available)].slice(0, 3);

  return (
    <>
      <IntroSequence />
      <Hero featured={featured} />

      <section id="work" aria-labelledby="work-title" className="section-pad relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              id="work-title"
              eyebrow="Selected work"
              title={
                <>
                  Featured <span className="violet-text">projects</span>
                </>
              }
              description="Posters, edits, motion, and AI-driven visuals. Filter by discipline and open any project for the full case study."
            />
            <Link href="/work" className="inline-flex items-center gap-2 self-start text-sm font-semibold text-violet-soft hover:text-white lg:self-auto">
              All projects <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12">
            <ProjectGallery projects={projects} />
          </div>
        </div>
      </section>

      <MyWorks collage={collage} />
      <Services />
      <Showreel />
      <About portrait={portrait()} />
      <Contact />
    </>
  );
}
