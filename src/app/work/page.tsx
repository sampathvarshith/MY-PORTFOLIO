import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { visibleProjects } from "@/content/projects";
import { resolveProject } from "@/lib/assets";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalButton } from "@/components/ui/Button";
import { QuoteLink } from "@/components/ui/QuoteLink";

export const metadata: Metadata = {
  title: "Work",
  description: "Movie posters, cinematic edits, AI filmmaking, branding, and motion work by Varshith Triparna.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const projects = visibleProjects().map(resolveProject);
  return (
    <section className="relative pb-24 pt-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-violet-deep/20 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Portfolio"
          title={
            <>
              The complete <span className="violet-text">work</span>
            </>
          }
          description="Every project, organised by discipline. Open a project for the full case study and larger artwork."
        />
        <div className="mt-12">
          <ProjectGallery projects={projects} />
        </div>
        <div className="panel mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold">Want to see more?</p>
            <p className="mt-1 text-sm text-lavender">The full collection lives in my Google Drive folder.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ExternalButton href={site.driveUrl} variant="outline">
              View all my works <ExternalLink className="h-4 w-4" aria-hidden />
            </ExternalButton>
            <QuoteLink variant="primary">Request a Quote</QuoteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
