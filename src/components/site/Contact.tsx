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
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">We take on a small number of residential commissions each year so every home gets the attention it deserves.</p>
            <ContactForm />
          </Reveal>

          <Reveal className="md:col-span-5" delay={150}>
            <div className="flex h-full flex-col">
              <dl className="space-y-8">
                <div><dt className="label mb-2 text-gold">Email</dt><dd><a href={`mailto:${studio.email}`} className="font-display text-2xl font-light text-cream hover:text-gold-lt">{studio.email}</a></dd></div>
                <div><dt className="label mb-2 text-gold">Phone</dt><dd><a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="font-display text-2xl font-light text-cream hover:text-gold-lt">{studio.phone}</a></dd></div>
                <div><dt className="label mb-2 text-gold">Studio</dt><dd className="font-display text-2xl font-light text-cream">{studio.city}</dd></div>
              </dl>

              <div className="mt-12 border-t border-cream/15 pt-8">
                <p className="label mb-3 text-gold">Follow the studio</p>
                <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border border-cream/20 px-5 py-4 transition-colors hover:border-gold hover:bg-cream/5">
                  <span><span className="font-display text-xl font-light text-cream block">@{studio.instagram}</span><span className="label text-cream/60">See our updates · Know our work</span></span><span className="flex h-10 w-10 shrink-0 items-center justify-center border border-cream/30 text-cream">→</span>
                </a>
              </div>

              <div className="mt-8 border-t border-cream/15 pt-8">
                <p className="label mb-3 text-gold">Find the studio</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=Terra+Space+Studio,+Hyderabad" target="_blank" rel="noopener noreferrer" className="group block overflow-hidden border border-cream/20">
                  <iframe title="Terra Space Studio location" src="https://www.google.com/maps?q=Terra+Space+Studio,+Hyderabad&output=embed" width="100%" height="220" style={{ border: 0, filter: "grayscale(0.35) contrast(1.06)" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                  <div className="flex items-center justify-between border-t border-cream/20 px-4 py-3"><span className="label text-gold-lt group-hover:text-gold">Get directions to our studio</span><span className="text-gold-lt">↗</span></div>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("Residential");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/mnqewlln", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, project, message }),
    });
    if (response.ok) {
      setSent(true);
      setName(""); setEmail(""); setProject("Residential"); setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 grid gap-5 border border-cream/15 bg-cream/[0.03] p-6 md:grid-cols-2 md:p-8">
      <Field label="Your name" required><input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border-b border-cream/30 bg-transparent py-2 text-cream" /></Field>
      <Field label="Email" required><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-cream/30 bg-transparent py-2 text-cream" /></Field>
      <Field label="Project type" className="md:col-span-2"><select value={project} onChange={(e) => setProject(e.target.value)} className="w-full border-b border-cream/30 bg-espresso py-2 text-cream"><option>Residential</option><option>Interior</option><option>Commercial</option><option>Renovation</option></select></Field>
      <Field label="Tell us about your project" className="md:col-span-2"><textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full resize-none border-b border-cream/30 bg-transparent py-2 text-cream" /></Field>
      <div className="md:col-span-2"><button type="submit" className="label inline-flex items-center gap-3 bg-gold px-6 py-4 text-espresso">Send Enquiry →</button>{sent && <p className="label mt-3 text-gold-lt">Thank you — your message was sent successfully.</p>}</div>
    </form>
  );
}

function Field({ label, required, className = "", children }: { label: string; required?: boolean; className?: string; children: ReactNode }) {
  return <label className={`block ${className}`}><span className="label mb-1 block text-gold">{label}{required && <span className="text-cream/40"> *</span>}</span>{children}</label>;
}
