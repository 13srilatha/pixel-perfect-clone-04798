import { useState } from "react";
import type { ReactNode } from "react";
import { studio } from "@/data/projects";
import { Reveal } from "./Nav";
import { supabase } from "@/integrations/supabase/client";

const STUDIO_MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Terra+Space+Studio,+Hyderabad";
const STUDIO_MAPS_EMBED =
  "https://www.google.com/maps?q=Terra+Space+Studio,+Hyderabad&output=embed";

export function Contact() {
  return (
    <section id="contact" className="relative bg-espresso py-24 text-cream md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="label mb-4 text-gold">Begin a Conversation</p>
            <h2 className="display text-[clamp(2.5rem,7vw,6rem)] text-cream">
              Let's design
              <br />
              your <em className="italic text-gold-lt">terra</em>.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">
              We take on a small number of residential commissions each year so every home gets the attention it deserves. Tell us about your site, your family, your dreams — we'll write back within 48 hours.
            </p>

            <ContactForm />
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9" delay={150}>
            {/* WhatsApp is the most important CTA — your 4th-standard client will click this, not the form. */}
            <a
              href="https://wa.me/916305707859?text=Hi%20Terra%20Space%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 flex items-center justify-between gap-4 bg-[#25D366] px-6 py-5 text-white transition-transform hover:scale-[1.02]"
            >
              <span className="flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87a11.8 11.8 0 0 0 1.6 5.94L0 24l6.34-1.66a11.86 11.86 0 0 0 5.7 1.45h.01c6.55 0 11.87-5.32 11.87-11.87a11.8 11.8 0 0 0-3.4-8.44ZM12.05 21.5a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.76.98 1-3.67-.23-.38a9.63 9.63 0 0 1-1.47-5.11c0-5.31 4.33-9.64 9.66-9.64a9.6 9.6 0 0 1 9.65 9.65c0 5.32-4.33 9.64-9.6 9.72Z" />
                </svg>
                <span>
                  <span className="block font-display text-xl font-light">Chat on WhatsApp</span>
                  <span className="label text-white/80">Fastest way to reach us</span>
                </span>
              </span>
              <span>→</span>
            </a>

            <dl className="space-y-8">
              <div>
                <dt className="label mb-2 text-gold">Email</dt>
                <dd>
                  <a href={`mailto:${studio.email}`} className="font-display text-2xl font-light text-cream hover:text-gold-lt break-all">
                    {studio.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label mb-2 text-gold">Phone</dt>
                <dd>
                  <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="font-display text-2xl font-light text-cream hover:text-gold-lt">
                    {studio.phone}
                  </a>
                  <p className="label mt-2 text-cream/50">Available 10am–7pm · Mon–Sat</p>
                </dd>
              </div>
              <div>
                <dt className="label mb-2 text-gold">Studio</dt>
                <dd className="font-display text-2xl font-light text-cream">{studio.city}</dd>
              </div>
            </dl>

            <div className="mt-10 border-t border-cream/15 pt-8">
              <p className="label mb-3 text-gold">Follow the studio</p>
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border border-cream/20 px-5 py-4 transition-colors hover:border-gold hover:bg-cream/5"
              >
                <span>
                  <span className="font-display text-xl font-light text-cream block">@{studio.instagram}</span>
                  <span className="label text-cream/60">See our updates · Know our work</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-cream/30 text-cream transition-all group-hover:border-gold group-hover:text-gold">
                  →
                </span>
              </a>
            </div>

            {/* Map sits directly under Instagram. Click the map OR the link
                opens Google Maps directions to the studio. */}
            <div className="mt-6">
              <a
                href={STUDIO_MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Terra Space Studio"
                className="group block overflow-hidden border border-cream/20 transition-colors hover:border-gold"
              >
                <div className="relative pointer-events-none">
                  <iframe
                    title="Terra Space Studio location"
                    src={STUDIO_MAPS_EMBED}
                    width="100%"
                    height="200"
                    style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <span className="absolute inset-0" aria-hidden />
                </div>
                <span className="flex items-center justify-between gap-4 px-5 py-3">
                  <span className="label text-cream group-hover:text-gold">Get directions to our studio</span>
                  <span className="text-cream group-hover:text-gold">→</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        <footer className="mt-24 border-t border-cream/10 pt-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="label text-cream/50">© {new Date().getFullYear()} {studio.name}. All rights reserved.</p>
            <p className="label text-cream/50">Crafted with restraint.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("Residential");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    const { error: insertError } = await supabase.from("contact_submissions").insert({
      source: "contact_form",
      name: name.trim() || null,
      email: email.trim(),
      project_type: project,
      message: message.trim() || "(no message)",
      recipient: "terraspacestudios07@gmail.com",
    });
    setSending(false);
    if (insertError) {
      setError("Could not send right now. Please try again or email us directly.");
      return;
    }
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  if (sent) {
    return (
      <div className="mt-12 border border-gold bg-gold/10 p-6 text-cream">
        <p className="font-display text-2xl text-gold-lt">Thank you.</p>
        <p className="mt-2 text-cream/80">Your enquiry reached the studio. We'll write back within 48 hours.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="label mt-4 inline-flex items-center gap-2 border border-cream/40 px-4 py-2 text-cream hover:border-gold hover:text-gold"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 grid gap-5 border border-cream/15 bg-cream/[0.03] p-6 md:grid-cols-2 md:p-8"
    >
      <Field label="Your name" required>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-0 border-b border-cream/30 bg-transparent py-2 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
          placeholder="Jane Doe"
        />
      </Field>
      <Field label="Email" required>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-0 border-b border-cream/30 bg-transparent py-2 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
          placeholder="you@email.com"
        />
      </Field>
      <Field label="Project type" className="md:col-span-2">
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full border-0 border-b border-cream/30 bg-espresso py-2 text-cream focus:border-gold focus:outline-none"
        >
          <option>Residential</option>
          <option>Interior</option>
          <option>Commercial</option>
          <option>Renovation</option>
          <option>Just saying hi</option>
        </select>
      </Field>
      <Field label="Tell us about your project" className="md:col-span-2">
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none border-0 border-b border-cream/30 bg-transparent py-2 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
          placeholder="Plot size, location, what you dream of…"
        />
      </Field>
      {error && (
        <p className="text-sm text-red-300 md:col-span-2">{error}</p>
      )}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="label group inline-flex items-center gap-3 bg-gold px-6 py-4 text-espresso transition-colors hover:bg-gold-lt disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send Enquiry"}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <p className="label mt-3 text-cream/40">We reply within 48 hours</p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="label mb-1 block text-gold">
        {label}
        {required && <span className="text-cream/40"> *</span>}
      </span>
      {children}
    </label>
  );
}
