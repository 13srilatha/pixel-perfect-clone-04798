import { useEffect, useState } from "react";

/**
 * Floating WhatsApp button with a small quick-questions panel.
 * - Click the WA icon → panel opens with 4 preset questions + a "Type your own" option.
 * - Picking a preset opens wa.me with the message pre-filled.
 * - Below the WA icon: a back-to-top arrow (appears once scrolled past hero).
 */

const WA_NUMBER = "916305707859";

const QUESTIONS = [
  { id: "visit", label: "Book a studio visit", msg: "Hi Terra Space Studio, I'd like to book a studio visit." },
  { id: "quote", label: "Get a quote for my project", msg: "Hi Terra Space Studio, I'd like to get a quote. My plot details: " },
  { id: "process", label: "How does your process work?", msg: "Hi Terra Space Studio, could you walk me through your design process and timeline?" },
  { id: "project", label: "Ask about a project I saw", msg: "Hi Terra Space Studio, I saw one of your projects and wanted to ask about it." },
];

function waLink(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Quick-questions panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-24 right-5 z-[81] w-[min(92vw,340px)] overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#FAF8F4] shadow-2xl"
          style={{ animation: "fade-in 0.25s ease-out" }}
        >
          <div className="flex items-center justify-between bg-[#1A1A14] px-4 py-3 text-[#FAF8F4]">
            <div>
              <p className="font-display text-base font-light">Chat with the studio</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4955A]">via WhatsApp · replies in 1–2 hrs</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-[#FAF8F4]/70 hover:text-[#C4955A]"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 p-3">
            {QUESTIONS.map((q) => (
              <a
                key={q.id}
                href={waLink(q.msg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-lg border border-[#E8E2D9] bg-white px-4 py-3 text-[14px] text-[#1A1A14] transition-colors hover:border-[#C4955A] hover:bg-[#C4955A]/10"
              >
                {q.label} <span className="text-[#C4955A]">→</span>
              </a>
            ))}
            <a
              href={waLink("Hi Terra Space Studio,")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-lg bg-[#25D366] px-4 py-3 text-center text-[14px] font-medium text-white hover:bg-[#1da851]"
            >
              Type your own message →
            </a>
            <p className="pt-2 text-center text-[11px] text-[#8a7355]">
              Opens WhatsApp · +91 63057 07859
            </p>
          </div>
        </div>
      )}

      {/* Stacked buttons: WhatsApp + back-to-top */}
      <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close WhatsApp panel" : "Chat on WhatsApp"}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] transition-transform hover:scale-[1.08]"
          style={{ background: "#25D366" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87a11.8 11.8 0 0 0 1.6 5.94L0 24l6.34-1.66a11.86 11.86 0 0 0 5.7 1.45h.01c6.55 0 11.87-5.32 11.87-11.87a11.8 11.8 0 0 0-3.4-8.44ZM12.05 21.5h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.76.98 1-3.67-.23-.38a9.63 9.63 0 0 1-1.47-5.11c0-5.31 4.33-9.64 9.66-9.64a9.6 9.6 0 0 1 6.83 2.83 9.6 9.6 0 0 1 2.82 6.82c0 5.32-4.33 9.64-9.65 9.64Zm5.29-7.21c-.29-.14-1.72-.85-1.99-.95-.27-.1-.46-.14-.66.14-.19.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.14-1.23-.45-2.34-1.44a8.84 8.84 0 0 1-1.63-2.02c-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51l-.56-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.03 2.77 1.18 2.96c.14.19 2.03 3.1 4.92 4.35.69.3 1.22.47 1.64.6.69.22 1.31.19 1.81.12.55-.08 1.72-.7 1.96-1.38.24-.67.24-1.25.17-1.38-.07-.13-.26-.19-.55-.34Z" />
          </svg>
        </button>

        {scrolled && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C4955A]/50 bg-[#1A1A14] text-[#C4955A] shadow-lg transition-colors hover:bg-[#C4955A] hover:text-[#1A1A14]"
            style={{ animation: "fade-in 0.3s ease-out" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}
