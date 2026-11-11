"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * next/image with a soft blur-up fade once the photo has loaded.
 * Pass `fade={false}` for above-the-fold images so they are never hidden.
 */
export function FadeImage({
  fade = true,
  className = "",
  onLoad,
  alt,
  ...props
}: ImageProps & { fade?: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Photos that finish loading before hydration never fire onLoad.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  if (!fade) return <Image {...props} alt={alt} className={className} onLoad={onLoad} />;

  return (
    <Image
      {...props}
      alt={alt}
      ref={ref}
      className={`img-fade ${className}`}
      data-loaded={loaded ? "" : undefined}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
