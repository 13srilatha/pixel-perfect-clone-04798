import { useEffect, useState } from "react";

/**
 * Back-to-top arrow + a small but always-visible portfolio credit pinned
 * to the bottom-left corner. The credit stays subtle (cream/brown, tiny
 * italic) so it does not distract — but is readable, not hidden.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [showCredit, setShowCredit] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowCredit(entry.isIntersecting),
      { threshold: 0.45 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Back-to-top arrow (bottom-right) */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 md:bottom-10 md:right-10 ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex h-14 w-14 items-center justify-center border border-espresso bg-cream text-espresso shadow-lg transition-colors hover:bg-espresso hover:text-cream md:h-16 md:w-16"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Credit — appears when contact section is in view, readable on every device.
          Sits at bottom-left of the viewport, well clear of the back-to-top button. */}
      <div
        className={`fixed bottom-2 left-2 z-50 max-w-[calc(100vw-90px)] transition-opacity duration-500 sm:bottom-3 sm:left-3 sm:max-w-[280px] md:bottom-4 md:left-5 md:max-w-[340px] ${
          showCredit ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="rounded-md bg-ink/55 px-2.5 py-1.5 font-display text-[10px] italic leading-snug text-cream/90 backdrop-blur-sm sm:text-[11px] md:text-xs">
          Designed &amp; managed by{" "}
          <span className="not-italic text-gold-lt">Srilatha</span>
          {" — "}
          <a
            href="mailto:imsrilathaa@gmail.com"
            className="break-all underline-offset-2 hover:underline"
          >
            imsrilathaa@gmail.com
          </a>
        </p>
      </div>
    </>
  );
}
