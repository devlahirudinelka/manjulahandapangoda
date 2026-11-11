import { FadeImage } from "./fade-image";
import { photos, photoSrc, type PhotoKey } from "@/lib/images";

type Props = {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  /** Marks an above-the-fold image: preloaded, and never hidden by effects. */
  preload?: boolean;
  zoom?: boolean;
  /** Wipe the photo in as it scrolls into view. Defaults to on, except for preloaded photos. */
  reveal?: boolean;
  /** Blur-up fade when the file finishes loading. Defaults to on, except for preloaded photos. */
  fade?: boolean;
  /** Stagger step (0-5) for the scroll reveal. */
  delay?: number;
};

/** A cropped photo that fills its container. Give the container a size or aspect ratio. */
export function Photo({
  name,
  className = "",
  sizes = "100vw",
  preload = false,
  zoom = false,
  reveal = !preload,
  fade = !preload,
  delay,
}: Props) {
  const photo = photos[name];
  return (
    <div
      data-reveal={reveal ? "image" : undefined}
      data-reveal-delay={reveal && delay ? delay : undefined}
      className={`relative overflow-hidden bg-sand ${fade ? "img-shimmer" : ""} ${
        zoom ? "zoom-img" : ""
      } ${className}`}
    >
      <FadeImage
        src={photoSrc(photo)}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        fade={fade}
        className="object-cover"
        style={
          "position" in photo && photo.position
            ? { objectPosition: photo.position }
            : undefined
        }
      />
    </div>
  );
}
