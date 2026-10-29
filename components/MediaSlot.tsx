import Image from "next/image";
import AutoVideo from "./AutoVideo";
import { mediaExists, mediaUrl } from "@/lib/media";

type Props = {
  video?: string;
  image?: string; // poster for video, or the still itself
  alt: string;
  className?: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
};

export default function MediaSlot({
  video,
  image,
  alt,
  className = "",
  label,
  priority,
  sizes = "(min-width: 768px) 33vw, 100vw",
}: Props) {
  const hasVideo = video ? mediaExists(video) : false;
  const hasImage = image ? mediaExists(image) : false;

  if (hasVideo) {
    return (
      <AutoVideo
        src={mediaUrl(video!)}
        poster={hasImage ? mediaUrl(image!) : undefined}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }

  if (hasImage) {
    return (
      <Image
        src={mediaUrl(image!)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-plum-glow bg-ink flex items-center justify-center">
      <span className="font-body text-xs uppercase tracking-[0.2em] text-mist/70 px-4 text-center">
        {label ?? "Footage coming soon"}
      </span>
    </div>
  );
}
