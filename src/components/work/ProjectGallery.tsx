"use client";

import { useMemo, useState } from "react";
import { categories, type Category } from "@/content/projects";
import type { ResolvedProject } from "@/lib/assets";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | Category;

/** Category-filterable project grid. Filters are a toggle-button group (keyboard accessible). */
export function ProjectGallery({ projects }: { projects: ResolvedProject[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(() => {
    const map = new Map<Category, number>();
    for (const p of projects) for (const c of p.categories) map.set(c, (map.get(c) ?? 0) + 1);
    return map;
  }, [projects]);

  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  const options: Filter[] = ["All", ...categories];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {options.map((opt) => {
            const count = opt === "All" ? projects.length : (counts.get(opt) ?? 0);
            const active = filter === opt;
            return (
              <li key={opt}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(opt)}
                  className={`min-h-11 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
                    active
                      ? "border-violet bg-violet/20 text-white shadow-[0_0_24px_-6px_rgba(168,85,247,0.8)]"
                      : "border-white/10 bg-white/[0.03] text-chrome/80 hover:border-violet/50 hover:text-white"
                  }`}
                >
                  {opt}
                  <span className="ml-2 text-xs text-lavender/70">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}
      </p>

      {shown.length ? (
        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} priority={i === 0} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="panel mt-10 rounded-3xl p-10 text-center">
          <p className="font-display text-lg text-white">New work coming soon</p>
          <p className="mt-2 text-sm text-lavender">
            Projects for <span className="text-violet-soft">{filter}</span> are being prepared. Browse another category or the
            full Drive collection.
          </p>
        </div>
      )}
    </div>
  );
}
