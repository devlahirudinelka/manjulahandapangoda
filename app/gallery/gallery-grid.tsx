"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useScrollLock } from "@/components/smooth-scroll";
import { galleryOrder, photos, photoSrc, type Photo, type Style } from "@/lib/images";

const filters: { id: "all" | Style; label: string }[] = [
  { id: "all", label: "All" },
  { id: "kandyan", label: "Kandyan" },
  { id: "western", label: "Western" },
  { id: "indian", label: "Indian" },
];

export function GalleryGrid() {
  const [filter, setFilter] = useState<"all" | Style>("all");
  const [index, setIndex] = useState<number | null>(null);

  const items = galleryOrder
    .map((key): Photo => photos[key])
    .filter((p) => filter === "all" || p.style === filter);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, step]);

  useScrollLock(index !== null);

  const current = index === null ? null : items[index];

  return (
    <>
      <div role="group" aria-label="Filter by style" className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.24em] transition-colors ${
              filter === f.id
                ? "bg-ink text-paper"
                : "text-stone hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-14 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {items.map((p, i) => (
          <li key={p.file} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="zoom-img group relative block w-full overflow-hidden bg-sand"
              aria-label={`Open photo: ${p.alt}`}
            >
              <Image
                src={photoSrc(p)}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full"
                preload={i < 4}
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
          onClick={close}
        >
          <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photoSrc(current)}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5 px-3 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-paper/80 hover:text-paper"
          >
            Close
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="display absolute left-2 top-1/2 -translate-y-1/2 p-4 text-4xl text-paper/70 hover:text-paper sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="display absolute right-2 top-1/2 -translate-y-1/2 p-4 text-4xl text-paper/70 hover:text-paper sm:right-6"
          >
            ›
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-paper/60">
            {(index ?? 0) + 1} / {items.length}
          </p>
        </div>
      ) : null}
    </>
  );
}
