import { useState } from "react";

/**
 * Lightweight, no-API guided chatbot. Visitors choose from a set of preset
 * questions or pick "Ask something else" to type freely — anything they type
 * is offered as a one-click message to the studio (mailto). No AI, no calls.
 */
type Step = {
  id: string;
  question: string;
  answer: string;
};

const FAQ: Step[] = [
  {
    id: "services",
    question: "What services do you offer?",
    answer:
      "Residential architecture, interior design, commercial spaces and renovations. We handle a project end-to-end — from first sketch to handover.",
  },
  {
    id: "where",
    question: "Where are you based?",
    answer: "Hyderabad, Telangana, India. We take projects across India.",
  },
  {
    id: "cost",
    question: "How much does a project cost?",
    answer:
      "Every home is different. Once we understand your plot, brief and finishes, we share a clear, written estimate within a week.",
  },
  {
    id: "time",
    question: "How long does a project take?",
    answer:
      "Design typically takes 2–4 months. Construction depends on size — most of our homes complete in 12–18 months.",
  },
  {
    id: "start",
    question: "How do I start?",
    answer:
      "Scroll to the Contact section and fill the short form, or call/WhatsApp +91 6305707859. We reply within 48 hours.",
  },
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Step | null>(null);
  const [custom, setCustom] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [sent, setSent] = useState(false);

  const goContact = () => {
    setOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Floating launcher — sits just above the back-to-top arrow */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-cream shadow-lg transition-transform hover:scale-105 md:bottom-32 md:right-10 md:h-16 md:w-16"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Studio chat"
          className="fixed bottom-44 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-sand bg-cream shadow-2xl md:bottom-52 md:right-10"
          style={{ maxHeight: "70vh" }}
        >
          <div className="flex items-center justify-between border-b border-sand bg-espresso px-4 py-3 text-cream">
            <div>
              <p className="font-display text-base font-light">Terra Space — Studio Chat</p>
              <p className="label text-cream/70">We usually reply within 48 hours</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            <div className="rounded-md bg-sand/50 p-3 text-espresso">
              Hi! 👋 Pick a question below — or tap "Ask something else" to write your own.
            </div>

            {active && (
              <div className="rounded-md border border-sand bg-cream p-3">
                <p className="label mb-1 text-caramel">{active.question}</p>
                <p className="text-espresso">{active.answer}</p>
              </div>
            )}

            {showCustom && (
              <div className="space-y-2 rounded-md border border-sand p-3">
                <label className="label block text-caramel">Your question</label>
                <textarea
                  rows={3}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Type your question…"
                  className="w-full resize-none border-b border-sand bg-transparent py-1 text-espresso focus:border-espresso focus:outline-none"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const r = await fetch("https://formspree.io/f/mnqewlln", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Accept: "application/json" },
                      body: JSON.stringify({ source: "chatbot", message: custom }),
                    });
                    if (r.ok) { setCustom(""); setSent(true); }
                  }}
                  className="label inline-flex items-center gap-2 bg-espresso px-3 py-2 text-cream"
                >
                  Send to studio →
                </button>
                {sent && <p className="label text-green-700">Message sent.</p>}
              </div>
            )}
          </div>

          <div className="space-y-2 border-t border-sand p-3">
            <div className="flex flex-wrap gap-2">
              {FAQ.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setActive(f);
                    setShowCustom(false);
                  }}
                  className="label rounded-full border border-espresso/40 px-3 py-1.5 text-espresso transition-colors hover:bg-espresso hover:text-cream"
                >
                  {f.question}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setShowCustom(true);
                  setActive(null);
                }}
                className="label rounded-full border border-caramel bg-caramel/10 px-3 py-1.5 text-espresso"
              >
                Ask something else
              </button>
              <button
                type="button"
                onClick={goContact}
                className="label rounded-full bg-gold px-3 py-1.5 text-espresso"
              >
                Open contact form
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
