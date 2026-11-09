import fs from "node:fs";
import path from "node:path";
import type { ImageMedia, Media, Project } from "@/content/projects";

/**
 * Build-time asset resolution. Each referenced image is looked up in /public; if the exact
 * file is missing, the same basename with another common extension is accepted. Real pixel
 * dimensions are read from the file so artwork renders at its true aspect ratio.
 */

export type ResolvedImage = ImageMedia & { available: boolean; expected: string };
export type ResolvedMedia = ResolvedImage | Extract<Media, { type: "youtube" }>;
export type ResolvedProject = Omit<Project, "cover" | "gallery" | "process"> & {
  cover: ResolvedImage;
  gallery: ResolvedMedia[];
  process: { title: string; body: string; media?: ResolvedImage }[];
};

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

function findFile(publicPath: string): string | null {
  const ext = path.extname(publicPath);
  const base = publicPath.slice(0, publicPath.length - ext.length);
  for (const candidate of [publicPath, ...EXTENSIONS.map((e) => base + e)]) {
    const abs = path.join(PUBLIC_DIR, candidate);
    if (abs.startsWith(PUBLIC_DIR) && fs.existsSync(abs) && fs.statSync(abs).isFile()) {
      return candidate;
    }
  }
  return null;
}

function readDimensions(abs: string): { width: number; height: number } | null {
  let buf: Buffer;
  try {
    const fd = fs.openSync(abs, "r");
    buf = Buffer.alloc(256 * 1024);
    const bytes = fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    buf = buf.subarray(0, bytes);
  } catch {
    return null;
  }
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // WebP
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    }
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  // JPEG: walk segments to the first SOFn marker
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      const isSOF = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isSOF) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }
  return null;
}

export function resolveImage(image: ImageMedia): ResolvedImage {
  const found = findFile(image.src);
  if (!found) return { ...image, available: false, expected: `public${image.src}` };
  const dims = readDimensions(path.join(PUBLIC_DIR, found));
  return {
    ...image,
    ...(dims && dims.width > 0 && dims.height > 0 ? dims : {}),
    src: found,
    available: true,
    expected: `public${image.src}`,
  };
}

export function resolveProject(project: Project): ResolvedProject {
  return {
    ...project,
    cover: resolveImage(project.cover),
    gallery: project.gallery.map((m) => (m.type === "image" ? resolveImage(m) : m)),
    process: (project.process ?? []).map((step) => ({
      ...step,
      media: step.media ? resolveImage(step.media) : undefined,
    })),
  };
}

/** Portrait used in the About section. */
export const portrait = () =>
  resolveImage({
    type: "image",
    src: "/images/profile/varshith-portrait.webp",
    alt: "Portrait of Varshith Triparna in a dark studio with purple rim lighting",
    width: 1080,
    height: 1350,
  });
