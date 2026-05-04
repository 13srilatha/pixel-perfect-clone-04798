import { useEffect, useState } from "react";

/**
 * Back-to-top arrow + portfolio credit. Both ONLY appear when the visitor
 * has scrolled into the contact section (the last page). Compact size, all
 * viewports.
 */
export function BackToTop() {
  const [showOnLast, setShowOnLast] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowOnLast(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!showOnLast) return null;

  return (
    <>
      {/* Compact back-to-top arrow (bottom-right) */}
      <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex h-10 w-10 items-center justify-center border border-cream/40 bg-espresso text-cream shadow-lg transition-colors hover:bg-cream hover:text-espresso"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Designer credit — bottom-left, small, only on last page */}
      <div className="fixed bottom-2 left-2 z-50 max-w-[70vw] md:bottom-3 md:left-4 md:max-w-[340px]">
        <p className="font-display text-[10px] italic leading-snug text-cream/75 md:text-[11px]">
          Designed & managed by{" "}
          <span className="not-italic text-gold-lt">Srilatha</span>
          {" — "}
          <a
            href="mailto:imsrilathaa@gmail.com"
            className="underline underline-offset-2 hover:text-gold"
          >
            imsrilathaa@gmail.com
          </a>
        </p>
      </div>
    </>
  );
}
