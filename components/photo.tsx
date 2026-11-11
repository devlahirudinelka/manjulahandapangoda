import Image from "next/image";
import { photos, photoSrc, type PhotoKey } from "@/lib/images";

type Props = {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  preload?: boolean;
  zoom?: boolean;
};

/** A cropped photo that fills its container. Give the container a size or aspect ratio. */
export function Photo({
  name,
  className = "",
  sizes = "100vw",
  preload = false,
  zoom = false,
}: Props) {
  const photo = photos[name];
  return (
    <div
      className={`relative overflow-hidden bg-sand ${zoom ? "zoom-img" : ""} ${className}`}
    >
      <Image
        src={photoSrc(photo)}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
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
