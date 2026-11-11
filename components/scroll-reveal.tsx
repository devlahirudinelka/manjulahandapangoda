"use client";

import { useEffect } from "react";

/**
 * Reveals any element marked `data-reveal` the first time it scrolls into view
 * by setting `data-in` on it (the animation itself lives in globals.css).
 * New elements added later (route changes, filters) are picked up automatically.
 */
export function ScrollReveal() {
  useEffect(() => {
    const selector = "[data-reveal]:not([data-in])";

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(selector)
        .forEach((el) => el.setAttribute("data-in", ""));
      return;
    }

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const scan = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
