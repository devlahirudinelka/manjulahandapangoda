"use client";

import { useEffect, useState } from "react";
import { Photo } from "./photo";
import type { PhotoKey } from "@/lib/images";

const slides: { key: PhotoKey; label: string }[] = [
  { key: "terrace", label: "Kandyan bride on the terrace" },
  { key: "bouquet", label: "Bride with a white bouquet" },
  { key: "couple", label: "Bride and groom in the garden" },
  { key: "goldDetail", label: "Gold bridal jewellery detail" },
];

const INTERVAL = 6500;

/**
 * Full-bleed crossfading hero background with a slow zoom and progress bars.
 * Renders only the current, previous and next slide to keep downloads light.
 * Place it first inside a `relative isolate` section.
 */
export function HeroSlider() {
  const [state, setState] = useState({ current: 0, previous: -1 });
  const [reduced, setReduced] = useState(false);
  const { current } = state;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(
      () =>
        setState((s) => ({
          current: (s.current + 1) % slides.length,
          previous: s.current,
        })),
      INTERVAL,
    );
    return () => window.clearTimeout(id);
  }, [current, reduced]);

  const goTo = (n: number) =>
    setState((s) => (s.current === n ? s : { current: n, previous: s.current }));

  const next = (current + 1) % slides.length;

  return (
    <>
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) => {
          if (![current, state.previous, next].includes(i)) return null;
          const active = i === current;
          return (
            <div
              key={slide.key}
              className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className={`absolute inset-0 ${active ? "hero-zoom" : ""}`}>
                <Photo
                  name={slide.key}
                  className="!absolute inset-0"
                  sizes="100vw"
                  preload={i === 0}
                  reveal={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        role="group"
        aria-label="Hero photos"
        className="absolute bottom-8 left-6 z-10 flex items-center gap-5 text-paper lg:left-10"
      >
        <span className="text-[0.7rem] tabular-nums tracking-[0.3em]">
          0{current + 1} / 0{slides.length}
        </span>
        <div className="flex">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              aria-label={`Show photo ${i + 1}: ${slide.label}`}
              aria-current={i === current}
              onClick={() => goTo(i)}
              className="flex h-8 w-11 items-center px-0.5"
            >
              <span className="relative block h-[2px] w-full overflow-hidden bg-paper/35">
                {i === current ? (
                  <span
                    className={`absolute inset-0 block origin-left bg-paper ${
                      reduced ? "" : "hero-progress"
                    }`}
                    style={{ animationDuration: `${INTERVAL}ms` }}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
