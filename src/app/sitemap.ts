import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { visibleProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, changeFrequency: "yearly", priority: 0.7 },
    ...visibleProjects()
      .filter((p) => !p.placeholder)
      .map((p) => ({
        url: `${base}/work/${p.slug}`,
        lastModified: p.isoDate,
        changeFrequency: "yearly" as const,
        priority: 0.8,
      })),
  ];
}
