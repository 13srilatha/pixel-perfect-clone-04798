import { useEffect } from "react";
import Lenis from "lenis";

// Expose lenis globally so any component can stop/start it.
// Use a custom key to avoid colliding with the lenis package's own
// Window.lenis ambient declaration.
declare global {
  interface Window { __lenis?: Lenis; }
}

/**
 * Mounts a single Lenis instance. Stored on window.__lenis so
 * gallery modals can call window.lenis?.stop() / .start()
 * to prevent background scroll bleed.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    window.lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return null;
}
