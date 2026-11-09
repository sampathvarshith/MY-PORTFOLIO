/**
 * Central site configuration. Edit values here rather than in components.
 */
export const site = {
  name: "Varshith Triparna",
  shortName: "VT",
  positioning: "Visual Artist | Creative Editor | AI Filmmaker | Graphic Designer",
  roles: ["Visual Artist", "Creative Editor", "AI Filmmaker", "Graphic Designer"],
  tagline: "Turning Ideas Into Visual Experiences.",
  altTagline: "Your Vision. My Visuals.",
  intro:
    "Crafting cinematic visuals, compelling designs, and AI-powered film experiences for brands, creators, and storytellers.",
  description:
    "Portfolio of Varshith Triparna — creative editor, visual designer, and AI filmmaker crafting cinematic edits, movie posters, branding, and AI-powered film experiences.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  driveUrl: "https://drive.google.com/drive/folders/1SlLl-roMrXEbhNA9dLpQaHO08u7164IH",
} as const;

export const contact = {
  email: "Varshithtriparna12@gmail.com",
  instagram: "https://www.instagram.com/varshith.triparna/",
  instagramHandle: "@varshith.triparna",
  youtube: "https://www.youtube.com/@Best1Creations",
  youtubeHandle: "@Best1Creations",
  whatsappDisplay: "+91 6300543772",
  whatsapp: "https://wa.me/916300543772",
  /** Owner approved publishing the WhatsApp number. */
  showWhatsApp: true,
} as const;

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${contact.email}${query ? `?${query}` : ""}`;
};

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "/#top" },
  { label: "Work", href: "/#work" },
  { label: "My Works", href: "/#my-works" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/** About copy, as supplied by the owner. */
export const about =
  "I’m Varshith Triparna, a visual creative focused on cinematic editing, graphic design, AI filmmaking, and digital experiences. I combine creative concepts with editing and design tools to transform ideas into compelling visual work. My goal is to create distinctive visuals that help filmmakers, brands, and content creators communicate their stories.";

/**
 * Tools shown in the About section. Only entries with `confirmed: true` are displayed —
 * flip a flag once the owner confirms they use that tool. No proficiency ratings by design.
 */
export const tools: { name: string; confirmed: boolean }[] = [
  { name: "Adobe Photoshop", confirmed: true },
  { name: "Canva", confirmed: true },
  { name: "AI creative tools", confirmed: true },
  { name: "Adobe Premiere Pro", confirmed: true },
  { name: "DaVinci Resolve", confirmed: true },
  { name: "CapCut", confirmed: true },
  { name: "Kdenlive", confirmed: true },
  { name: "Figma", confirmed: true },
];

/**
 * Showreel. Set `src` to a compressed MP4 in /public/videos (e.g. "/videos/showreel.mp4")
 * or `youtubeId` to a YouTube video ID. Leave both null to show the labelled placeholder.
 */
export const showreel: {
  src: string | null;
  poster: string | null;
  youtubeId: string | null;
  description: string;
} = {
  src: null,
  poster: null,
  youtubeId: null,
  description:
    "A curated cut of cinematic edits, poster design, motion graphics, and AI-driven visuals.",
};
