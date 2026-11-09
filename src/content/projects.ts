/**
 * Portfolio project data. This is the single source of truth for the gallery and case studies.
 *
 * Images: put files in /public and reference them by public path (e.g. "/images/posters/x.jpg").
 * A file that doesn't exist yet renders as a clearly labelled placeholder, so you can add
 * entries first and drop the artwork in later.
 *
 * Only publish verified projects. Entries with `placeholder: true` are template slots and are
 * hidden everywhere when `showPlaceholderProjects` is false.
 */

export const showPlaceholderProjects = true;

export const categories = [
  "Movie Posters",
  "Cinematic Video Editing",
  "AI Filmmaking",
  "Graphic Design",
  "Logo Design & Branding",
  "YouTube Thumbnails",
  "Reels & Short-Form Videos",
  "Motion Graphics & Logo Animation",
  "Wedding & Event Editing",
  "Photography & Photo Manipulation",
  "Website Design",
] as const;

export type Category = (typeof categories)[number];

export type Orientation = "portrait" | "landscape" | "square";

export type ImageMedia = {
  type: "image";
  src: string;
  alt: string;
  /** Intrinsic size; used for layout so artwork is never cropped. */
  width: number;
  height: number;
  caption?: string;
};

export type VideoMedia = {
  type: "youtube";
  /** YouTube video ID, e.g. "dQw4w9WgXcQ". */
  youtubeId: string;
  title: string;
  caption?: string;
};

export type Media = ImageMedia | VideoMedia;

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  categories: Category[];
  featured?: boolean;
  placeholder?: boolean;
  /** Human-readable date as supplied by the owner. */
  date?: string;
  /** ISO date for sorting and metadata. */
  isoDate?: string;
  type?: string;
  context?: string;
  role?: string;
  tools?: string[];
  aiWorkflow?: string;
  deliverables?: string;
  summary: string;
  overview?: string[];
  creativeDirection?: string[];
  cover: ImageMedia;
  gallery: Media[];
  /** Process images/notes. The section is hidden when empty. */
  process?: { title: string; body: string; media?: ImageMedia }[];
  credits?: { label: string; value: string }[];
  /** Note shown on the case study, e.g. to clarify the scope of the work. */
  disclaimer?: string;
};

const terachapaPoster = (n: number): ImageMedia => ({
  type: "image",
  src: `/images/posters/terachapa-poster-0${n}.jpg`,
  alt: `Terachapa Telugu film poster ${n} — cinematic character composition with layered imagery and title typography`,
  width: 1080,
  height: 1350,
  caption: `Poster ${String(n).padStart(2, "0")}`,
});

const placeholderCover = (slug: string, alt: string, orientation: Orientation): ImageMedia => ({
  type: "image",
  src: `/images/projects/${slug}/cover.jpg`,
  alt,
  width: orientation === "portrait" ? 1080 : orientation === "square" ? 1080 : 1920,
  height: orientation === "portrait" ? 1350 : orientation === "square" ? 1080 : 1080,
});

const placeholderSummary =
  "Template slot — replace with a real project. Add the artwork to /public and update this entry in src/content/projects.ts.";

export const projects: Project[] = [
  {
    slug: "terachapa",
    title: "Terachapa",
    subtitle: "Cinematic Movie Posters",
    categories: ["Movie Posters", "Graphic Design"],
    featured: true,
    date: "23 March 2026",
    isoDate: "2026-03-23",
    type: "Telugu film poster design",
    context: "Official film production, as provided by the portfolio owner.",
    role: "Entire poster design project handled independently.",
    tools: ["Adobe Photoshop", "Canva", "AI tools"],
    aiWorkflow: "AI used for concepts and visual references only.",
    deliverables: "Two to three poster designs.",
    summary:
      "Poster designs for the Telugu film Terachapa — dramatic character compositions, layered imagery, and bold release typography.",
    overview: [
      "A set of promotional posters designed for the Telugu film Terachapa, built around the film’s characters with a clear hierarchy for the title and release information.",
      "The full poster design process — concept, composition, typography, and finishing — was handled independently.",
    ],
    creativeDirection: [
      "Dramatic character compositions that put faces and expressions at the centre of the frame.",
      "Layered imagery that builds depth and atmosphere across the frame.",
      "Bold release-date typography integrated into the composition.",
      "A coastal ensemble design that brings the cast together against the film’s setting.",
    ],
    cover: terachapaPoster(1),
    gallery: [terachapaPoster(1), terachapaPoster(2), terachapaPoster(3)],
    process: [],
    credits: [
      { label: "Poster design", value: "Varshith Triparna" },
      { label: "Film", value: "Terachapa (Telugu)" },
      { label: "Date", value: "23 March 2026" },
    ],
    disclaimer:
      "Poster design only. The film, its production, and all associated rights belong to their respective owners. Original production credits and logos are preserved.",
  },
  {
    slug: "ai-cinematic-sequence",
    title: "AI Cinematic Sequence",
    subtitle: "Placeholder",
    categories: ["AI Filmmaking"],
    placeholder: true,
    summary: placeholderSummary,
    cover: placeholderCover("ai-cinematic-sequence", "Placeholder for an AI cinematic sequence still", "landscape"),
    gallery: [],
  },
  {
    slug: "video-editing-showreel",
    title: "Video Editing Showreel",
    subtitle: "Placeholder",
    categories: ["Cinematic Video Editing", "Wedding & Event Editing"],
    placeholder: true,
    summary: placeholderSummary,
    cover: placeholderCover("video-editing-showreel", "Placeholder for a video editing still", "landscape"),
    gallery: [],
  },
  {
    slug: "movie-promotional-graphics",
    title: "Movie Promotional Graphics",
    subtitle: "Placeholder",
    categories: ["Graphic Design", "YouTube Thumbnails"],
    placeholder: true,
    summary: placeholderSummary,
    cover: placeholderCover("movie-promotional-graphics", "Placeholder for promotional artwork", "square"),
    gallery: [],
  },
  {
    slug: "brand-identity",
    title: "Logo & Brand Identity",
    subtitle: "Placeholder",
    categories: ["Logo Design & Branding"],
    placeholder: true,
    summary: placeholderSummary,
    cover: placeholderCover("brand-identity", "Placeholder for a logo presentation", "square"),
    gallery: [],
  },
  {
    slug: "motion-graphics-reel",
    title: "Motion Graphics & Logo Reveal",
    subtitle: "Placeholder",
    categories: ["Motion Graphics & Logo Animation", "Reels & Short-Form Videos"],
    placeholder: true,
    summary: placeholderSummary,
    cover: placeholderCover("motion-graphics-reel", "Placeholder for a motion graphics frame", "portrait"),
    gallery: [],
  },
  {
    slug: "photo-manipulation",
    title: "Photo Manipulation",
    subtitle: "Placeholder",
    categories: ["Photography & Photo Manipulation"],
    placeholder: true,
    summary: placeholderSummary,
    cover: placeholderCover("photo-manipulation", "Placeholder for a photo composite", "portrait"),
    gallery: [],
  },
  {
    slug: "website-design",
    title: "Website Design",
    subtitle: "Placeholder",
    categories: ["Website Design"],
    placeholder: true,
    summary: placeholderSummary,
    cover: placeholderCover("website-design", "Placeholder for a website design screenshot", "landscape"),
    gallery: [],
  },
];

export const visibleProjects = () =>
  projects.filter((p) => showPlaceholderProjects || !p.placeholder);

export const getProject = (slug: string) => visibleProjects().find((p) => p.slug === slug);
