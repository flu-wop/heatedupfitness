import fs from "node:fs";
import path from "node:path";

// Drop optimized files into /public/media using these exact names.
// Anything missing renders a branded placeholder, so the site never breaks.
export const MEDIA = {
  hero: { video: "hero.mp4", poster: "hero.jpg" },
  portrait: "mikia-portrait.jpg",
  band: "band.jpg",
  reels: [
    { video: "reel-1.mp4", poster: "reel-1.jpg", label: "Strength" },
    { video: "reel-2.mp4", poster: "reel-2.jpg", label: "Conditioning" },
    { video: "reel-3.mp4", poster: "reel-3.jpg", label: "Client wins" },
    { video: "reel-4.mp4", poster: "reel-4.jpg", label: "Form check" },
  ],
  gallery: [
    "gallery-1.jpg",
    "gallery-2.jpg",
    "gallery-3.jpg",
    "gallery-4.jpg",
    "gallery-5.jpg",
    "gallery-6.jpg",
    "gallery-7.jpg",
    "gallery-8.jpg",
  ],
} as const;

export function mediaExists(file: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "media", file));
  } catch {
    return false;
  }
}

export const mediaUrl = (file: string) => `/media/${file}`;
