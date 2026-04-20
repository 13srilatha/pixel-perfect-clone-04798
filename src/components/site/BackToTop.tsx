import { useEffect, useState } from "react";

/**
 * Back-to-top arrow. Below it, a tiny "hide and seek" credit line that only
 * fades in when the user hovers the very corner — observers only.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 transition-all duration-500 md:bottom-10 md:right-10 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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

      {/* Hidden credit — only shows on hover of this corner */}
      <div
        className={`pointer-events-none max-w-[260px] text-right transition-all duration-500 ${
          hovered ? "translate-y-0 opacity-90" : "translate-y-1 opacity-0"
        }`}
        aria-hidden={!hovered}
      >
        <p className="font-display text-[10px] italic leading-relaxed text-espresso/70 md:text-xs">
          This portfolio is designed and managed by{" "}
          <span className="not-italic text-caramel">Srilatha</span>
          {" · "}
          <a
            href="mailto:imsrilathaa@gmail.com"
            className="pointer-events-auto not-italic underline-offset-2 hover:underline"
          >
            imsrilathaa@gmail.com
          </a>
          {" · "}
          for queries or suggestions regarding the portfolio.
        </p>
      </div>
    </div>
  );
}
