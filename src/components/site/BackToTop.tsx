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

      {showCredit && (
        <div className="fixed bottom-3 left-3 z-50 max-w-[260px] md:bottom-4 md:left-5 md:max-w-[320px]">
          <p className="font-display text-[10px] italic leading-snug text-cream/65 md:text-[11px]">
            Portfolio designed & managed by{" "}
            <span className="not-italic text-gold-lt">Srilatha</span>
            {" — "}
            <a
              href="mailto:imsrilathaa@gmail.com"
              className="underline-offset-2 hover:underline"
            >
              imsrilathaa@gmail.com
            </a>
          </p>
        </div>
      )}
    </>
  );
}
