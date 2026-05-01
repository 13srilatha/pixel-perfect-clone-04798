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
      // Lower threshold so the credit shows on small screens too — on mobile
      // the contact section is tall and never reaches a high ratio.
      { threshold: 0.05 },
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
          className="flex h-12 w-12 items-center justify-center border border-espresso bg-cream text-espresso shadow-lg transition-colors hover:bg-espresso hover:text-cream md:h-16 md:w-16"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Credit — appears in the contact (final) section. On mobile it sits
          above the back-to-top button as a full-width slim bar so it never
          gets clipped or hidden by anything. On larger screens it goes back
          to a small pill in the bottom-left corner. */}
      <div
        className={`fixed z-50 transition-opacity duration-500 ${
          showCredit ? "opacity-100" : "pointer-events-none opacity-0"
        } inset-x-2 bottom-20 sm:inset-x-auto sm:bottom-3 sm:left-3 sm:max-w-[300px] md:bottom-4 md:left-5 md:max-w-[360px]`}
      >
        <p className="rounded-md bg-ink/70 px-3 py-2 text-center font-display text-[11px] italic leading-snug text-cream/95 backdrop-blur-sm sm:text-left sm:text-[11px] md:text-xs">
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
