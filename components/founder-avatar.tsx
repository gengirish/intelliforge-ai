import Image from "next/image";
import { founder } from "@/lib/founder";

/**
 * Drop a real headshot into `public/` and set this to its path (e.g.
 * "/founder-girish.jpg") to swap the initials monogram for a photo.
 *
 * Previously this pointed at https://avatars.githubusercontent.com/u/gengirish,
 * which 302s to github.com's homepage — that account has no avatar uploaded, so
 * the image 404'd through the Next.js optimizer on every page that used it.
 */
const FOUNDER_PHOTO: string | null = null;

const initials = founder.name
  .split(/\s+/)
  .slice(0, 2)
  .map((part) => part[0])
  .join("")
  .toUpperCase();

interface FounderAvatarProps {
  size: number;
  className?: string;
}

export function FounderAvatar({ size, className = "" }: FounderAvatarProps) {
  if (FOUNDER_PHOTO) {
    return (
      <Image
        src={FOUNDER_PHOTO}
        alt={founder.name}
        width={size}
        height={size}
        className={`shrink-0 object-cover ring-1 ring-white/10 ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-indigo to-violet font-display font-bold text-white ring-1 ring-white/10 ${className}`}
    >
      {initials}
    </span>
  );
}
