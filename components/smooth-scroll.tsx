"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Jump back to the top when the route changes, without a smooth glide. */
function ScrollToTopOnNavigate() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}

/**
 * Site-wide smooth scrolling with Lenis.
 * Falls back to native scrolling for visitors who prefer reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: !reduced,
        anchors: true,
      }}
    >
      <ScrollToTopOnNavigate />
      {children}
    </ReactLenis>
  );
}

/** Freezes page scrolling (e.g. behind a menu or lightbox) while `locked` is true. */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [lenis, locked]);
}
