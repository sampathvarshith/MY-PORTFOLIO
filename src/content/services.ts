import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  Film,
  Globe,
  Heart,
  Image as ImageIcon,
  Palette,
  PenTool,
  Smartphone,
  Sparkles,
  Wand2,
  MonitorPlay,
} from "lucide-react";

/**
 * Options offered in the enquiry form. Ids are used in `?service=` links,
 * so keep them stable once published.
 */
export const enquiryServices = [
  { id: "video-editing", label: "Cinematic Video Editing" },
  { id: "ai-filmmaking", label: "AI Filmmaking" },
  { id: "posters-graphic-design", label: "Movie Posters & Graphic Design" },
  { id: "logo-branding", label: "Logo Design & Branding" },
  { id: "youtube", label: "YouTube Editing & Thumbnails" },
  { id: "reels", label: "Reels & Short-Form Videos" },
  { id: "motion-graphics", label: "Motion Graphics & Logo Animation" },
  { id: "wedding-event", label: "Wedding & Event Editing" },
  { id: "web-design", label: "Website Design" },
  { id: "photography", label: "Photography & Photo Manipulation" },
  { id: "other", label: "Something else" },
] as const;

export type EnquiryServiceId = (typeof enquiryServices)[number]["id"];

export const isEnquiryServiceId = (value: string): value is EnquiryServiceId =>
  enquiryServices.some((s) => s.id === value);

export type ServiceCard = {
  id: EnquiryServiceId;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Homepage service cards. Remove any entry you don't offer. */
export const serviceCards: ServiceCard[] = [
  {
    id: "video-editing",
    title: "Cinematic Video Editing",
    description: "Film-style editing, pacing, color grading, transitions, and storytelling.",
    icon: Film,
  },
  {
    id: "ai-filmmaking",
    title: "AI Filmmaking",
    description: "AI-assisted visual concepts, cinematic sequences, and creative production workflows.",
    icon: Sparkles,
  },
  {
    id: "posters-graphic-design",
    title: "Movie Posters & Graphic Design",
    description: "Film posters, promotional artwork, campaign graphics, and digital designs.",
    icon: Clapperboard,
  },
  {
    id: "logo-branding",
    title: "Logo Design & Branding",
    description: "Brand marks, visual identities, logo presentations, and branding assets.",
    icon: PenTool,
  },
  {
    id: "youtube",
    title: "YouTube Editing & Thumbnails",
    description: "Creator-focused videos, engaging thumbnails, and channel graphics.",
    icon: MonitorPlay,
  },
  {
    id: "reels",
    title: "Reels & Short-Form Videos",
    description: "Social media edits, promotional reels, and short-form content.",
    icon: Smartphone,
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics & Logo Animation",
    description: "Animated titles, logo reveals, and motion-based visual elements.",
    icon: Wand2,
  },
  {
    id: "wedding-event",
    title: "Wedding & Event Editing",
    description: "Event highlights, cinematic wedding films, and memorable edits.",
    icon: Heart,
  },
  {
    id: "web-design",
    title: "Website Design",
    description: "Modern responsive websites and visual web experiences.",
    icon: Globe,
  },
  {
    id: "photography",
    title: "Photography & Photo Manipulation",
    description: "Image enhancement, compositing, retouching, and creative photo edits.",
    icon: ImageIcon,
  },
];

export type ServiceCategory = {
  id: string;
  title: string;
  summary: string;
  /** Service preselected in the enquiry form by this category's "Request a Quote" button. */
  enquiryId: EnquiryServiceId;
  icon: LucideIcon;
  items: string[];
};

/**
 * Complete services breakdown shown on /services.
 * Delete any line item (or whole category) you don't genuinely offer.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "video-editing",
    title: "Video Editing",
    summary: "Story-first edits with cinematic pacing, sound-aware cuts, and a finished, graded look.",
    enquiryId: "video-editing",
    icon: Film,
    items: [
      "Cinematic video editing",
      "Film and teaser editing",
      "Trailer and promotional editing",
      "YouTube video editing",
      "Instagram Reels and short-form editing",
      "Wedding and event video editing",
      "Music video editing",
      "Color grading and visual finishing",
    ],
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics & Animation",
    summary: "Titles, reveals, and motion systems that give a brand or film its rhythm.",
    enquiryId: "motion-graphics",
    icon: Wand2,
    items: [
      "2D motion graphics",
      "3D-style motion graphics",
      "Logo animation and logo reveals",
      "Animated titles and typography",
      "Cinematic title sequences",
      "Intro and outro animations",
      "Promotional motion graphics",
      "Visual transitions and compositing",
    ],
  },
  {
    id: "ai-filmmaking",
    title: "AI Filmmaking",
    summary: "AI-assisted concepting and cinematic scene creation, directed with a filmmaker’s eye.",
    enquiryId: "ai-filmmaking",
    icon: Sparkles,
    items: [
      "AI-assisted visual concepts",
      "Cinematic AI scene creation",
      "AI-generated visual sequences",
      "Storyboard and visual development",
      "AI-assisted promotional content",
      "Cinematic visual experimentation",
    ],
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    summary: "Posters and promotional artwork built around strong composition and typography.",
    enquiryId: "posters-graphic-design",
    icon: Palette,
    items: [
      "Movie posters",
      "Film promotional posters",
      "YouTube thumbnails",
      "Social media creatives",
      "Promotional banners",
      "Digital advertising artwork",
      "Photo manipulation",
      "Creative composites",
    ],
  },
  {
    id: "logo-branding",
    title: "Logo Design & Branding",
    summary: "Distinctive marks and identity assets that hold up from favicon to billboard.",
    enquiryId: "logo-branding",
    icon: PenTool,
    items: [
      "Logo design",
      "Brand identity visuals",
      "Logo presentation mockups",
      "3D logo concepts",
      "Branding graphics",
      "Animated brand reveals",
    ],
  },
  {
    id: "photography",
    title: "Photography & Image Editing",
    summary: "Retouching, compositing, and creative treatments that make an image land.",
    enquiryId: "photography",
    icon: ImageIcon,
    items: [
      "Photo editing",
      "Photo retouching",
      "Background replacement",
      "Image compositing",
      "Creative photo manipulation",
      "Promotional photo treatments",
    ],
  },
  {
    id: "web-design",
    title: "Web Design",
    summary: "Responsive, visually led websites and interfaces for creatives and brands.",
    enquiryId: "web-design",
    icon: Globe,
    items: [
      "Portfolio website design",
      "Landing page design",
      "Responsive website interfaces",
      "Creative website layouts",
      "UI design",
    ],
  },
];
