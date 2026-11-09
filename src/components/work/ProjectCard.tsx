import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ResolvedProject } from "@/lib/assets";
import { Artwork } from "@/components/media/Artwork";
import { TiltCard } from "@/components/ui/TiltCard";

export function ProjectCard({ project, priority = false }: { project: ResolvedProject; priority?: boolean }) {
  return (
    <TiltCard className="h-full rounded-3xl">
      <Link
        href={`/work/${project.slug}`}
        className="edge-glow panel group flex h-full flex-col overflow-hidden rounded-3xl"
        aria-label={`${project.title}${project.subtitle ? ` — ${project.subtitle}` : ""}: view project`}
      >
        <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#08050f] p-3 [transform:translateZ(30px)]">
          <Artwork
            image={project.cover}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            priority={priority}
            layout="fill"
            label={project.title}
            imgClassName="transition-transform duration-700 ease-[var(--ease-cinema)] group-hover:scale-[1.04]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0719] to-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Categories">
            {project.categories.map((c) => (
              <li
                key={c}
                className="rounded-full border border-violet/30 bg-violet/10 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-violet-soft"
              >
                {c}
              </li>
            ))}
          </ul>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">{project.title}</h3>
              {project.subtitle ? <p className="mt-1 text-sm text-lavender">{project.subtitle}</p> : null}
            </div>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 group-hover:border-violet group-hover:bg-violet">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-lavender/90">{project.summary}</p>
          {project.date ? <p className="mt-auto pt-2 text-xs uppercase tracking-[0.2em] text-white/50">{project.date}</p> : null}
        </div>
      </Link>
    </TiltCard>
  );
}
