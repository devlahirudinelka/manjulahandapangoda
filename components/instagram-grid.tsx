import Image from "next/image";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/images";
import { getInstagramPosts } from "@/lib/instagram";
import { site } from "@/lib/site";

/** Shown until the Instagram account is connected (or if Instagram is down). */
const fallback: PhotoKey[] = [
  "kandyanIvory",
  "westernVeil",
  "indianRed",
  "goldGaze",
  "laceVeil",
  "sareeGarden",
  "kandyanWhite",
  "softGlam",
  "goldGlow",
  "kandyanProfile",
  "indianPurple",
  "westernFull",
];

function altFrom(caption: string) {
  const first = caption.split("\n")[0].replace(/#\S+/g, "").trim();
  if (!first) return `Instagram post by ${site.brand}`;
  return first.length > 120 ? `${first.slice(0, 117)}…` : first;
}

const tile =
  "zoom-img group relative block aspect-square overflow-hidden bg-sand";

function Overlay({ video }: { video?: boolean }) {
  return (
    <>
      <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
      <InstagramIcon className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {video ? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute top-3 right-3 size-5 fill-paper drop-shadow"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : null}
    </>
  );
}

export async function InstagramGrid({ limit = 6 }: { limit?: number }) {
  const posts = await getInstagramPosts(Math.max(limit, 12));
  const cols =
    limit <= 6
      ? "grid-cols-3 lg:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <ul className={`grid gap-1.5 sm:gap-2 ${cols}`}>
      {posts
        ? posts.slice(0, limit).map((p, i) => (
            <li key={p.id} data-reveal data-reveal-delay={i % 6}>
              <a
                href={p.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className={tile}
                aria-label={`View on Instagram: ${altFrom(p.caption)}`}
              >
                <Image
                  src={p.image}
                  alt={altFrom(p.caption)}
                  fill
                  sizes="(min-width: 1024px) 17vw, 33vw"
                  className="object-cover"
                />
                <Overlay video={p.isVideo} />
              </a>
            </li>
          ))
        : fallback.slice(0, limit).map((key, i) => (
            <li key={key} data-reveal data-reveal-delay={i % 6}>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={tile}
                aria-label="See more on Instagram"
              >
                <Photo name={key} className="!absolute inset-0" sizes="(min-width: 1024px) 17vw, 33vw" reveal={false} />
                <Overlay />
              </a>
            </li>
          ))}
    </ul>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Same-size placeholder while the feed loads. */
export function InstagramGridSkeleton({ limit = 6 }: { limit?: number }) {
  const cols =
    limit <= 6
      ? "grid-cols-3 lg:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
  return (
    <ul className={`grid gap-1.5 sm:gap-2 ${cols}`} aria-hidden>
      {Array.from({ length: limit }, (_, i) => (
        <li key={i} className="img-shimmer aspect-square bg-sand" />
      ))}
    </ul>
  );
}
