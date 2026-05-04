import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Lightweight, no-API guided chatbot. Visitors choose a preset question or
 * pick "Ask something else" to type freely. Custom messages submit DIRECTLY
 * to the studio inbox (stored in Lovable Cloud) — no mailto, no popup.
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
  const [showCustom, setShowCustom] = useState(false);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCustom = async () => {
    setError(null);
    if (!email.trim() || !custom.trim()) {
      setError("Please add your email and a short message.");
      return;
    }
    setSending(true);
    const { error: insertError } = await supabase.from("contact_submissions").insert({
      source: "chatbot",
      email: email.trim(),
      message: custom.trim(),
      recipient: "terraspacestudios07@gmail.com",
    });
    setSending(false);
    if (insertError) {
      setError("Could not send right now. Please try again or use the contact form.");
      return;
    }
    setSent(true);
    setCustom("");
    setEmail("");
  };

  const goContact = () => {
    setOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-espresso text-cream shadow-lg transition-transform hover:scale-105 md:bottom-24 md:right-6 md:h-14 md:w-14"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Studio chat"
          className="fixed bottom-36 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-sand bg-cream shadow-2xl md:bottom-44 md:right-6"
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
              Hi! 👋 Pick a question — or tap "Ask something else" to send a message directly to the studio.
            </div>

            {active && (
              <div className="rounded-md border border-sand bg-cream p-3">
                <p className="label mb-1 text-caramel">{active.question}</p>
                <p className="text-espresso">{active.answer}</p>
              </div>
            )}

            {showCustom && !sent && (
              <div className="space-y-3 rounded-md border border-sand p-3">
                <label className="label block text-caramel">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full border-b border-sand bg-transparent py-1 text-espresso focus:border-espresso focus:outline-none"
                />
                <label className="label block text-caramel">Your message</label>
                <textarea
                  rows={3}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Type your question…"
                  className="w-full resize-none border-b border-sand bg-transparent py-1 text-espresso focus:border-espresso focus:outline-none"
                />
                {error && <p className="text-xs text-red-700">{error}</p>}
                <button
                  type="button"
                  disabled={sending}
                  onClick={sendCustom}
                  className="label inline-flex items-center gap-2 bg-espresso px-3 py-2 text-cream disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send to studio →"}
                </button>
              </div>
            )}

            {sent && (
              <div className="rounded-md border border-gold bg-gold/15 p-3 text-espresso">
                Thank you — your message reached the studio. We'll write back within 48 hours.
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
                  setSent(false);
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
