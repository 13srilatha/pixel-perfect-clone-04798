import { useState } from "react";
import type { ReactNode } from "react";
import { studio } from "@/data/projects";
import { Reveal } from "./Nav";

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
            <dl className="space-y-8">
              <div>
                <dt className="label mb-2 text-gold">Email</dt>
                <dd>
                  <a href={`mailto:${studio.email}`} className="font-display text-2xl font-light text-cream hover:text-gold-lt">
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
                </dd>
              </div>
              <div>
                <dt className="label mb-2 text-gold">Studio</dt>
                <dd className="font-display text-2xl font-light text-cream">{studio.city}</dd>
              </div>
            </dl>

            <div className="mt-12 border-t border-cream/15 pt-8">
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
          </Reveal>
        </div>

        <footer className="mt-24 border-t border-cream/10 pt-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="label text-cream/50">© {new Date().getFullYear()} {studio.name}. All rights reserved.</p>
            <p className="label text-cream/50">Crafted with restraint.</p>
          </div>
        </footer>
      </div>

      {/* Designer credit marquee */}
      <div className="mt-16 overflow-hidden border-t border-cream/10 py-6">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 38s linear infinite" }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-display text-base font-light italic text-cream/60 md:text-lg">
              This portfolio is designed and managed by Srilatha
              <span className="text-gold">·</span>
              <a href="mailto:imsrilathaa@gmail.com" className="not-italic underline-offset-4 hover:text-gold-lt hover:underline">imsrilathaa@gmail.com</a>
              <span className="text-gold">·</span>
              for queries or suggestions regarding the portfolio
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>
    </section>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("Residential");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry — ${name || "Website visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${project}\n\n${message}`);
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`;
  };

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
      <div className="md:col-span-2">
        <button
          type="submit"
          className="label group inline-flex items-center gap-3 bg-gold px-6 py-4 text-espresso transition-colors hover:bg-gold-lt"
        >
          Send Enquiry
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <p className="label mt-3 text-cream/40">Opens your email app · we reply within 48 hours</p>
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
