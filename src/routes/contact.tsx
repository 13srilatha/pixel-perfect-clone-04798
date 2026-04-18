import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { images } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Terra Space Studio" },
      {
        name: "description",
        content: "Begin a conversation with Terra Space Studio. We take on a small number of projects each year.",
      },
      { property: "og:title", content: "Contact — Terra Space Studio" },
      { property: "og:description", content: "Begin a conversation with the studio." },
      { property: "og:image", content: images.exterior4 },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const ref = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div ref={ref} className="bg-background">
      <header className="pt-40 pb-16 md:pt-52 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow reveal">— Contact</div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] max-w-3xl reveal">
            Tell us about the home
            <br />
            <em className="text-terra">you have been imagining.</em>
          </h1>
        </div>
      </header>

      <section className="pb-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-12 md:px-10">
          <aside className="md:col-span-5 reveal space-y-10">
            <div>
              <div className="eyebrow">— Direct</div>
              <ul className="mt-6 space-y-5 text-foreground/85">
                <li className="flex items-start gap-4">
                  <Mail size={16} className="mt-1 text-terra" />
                  <a href="mailto:hello@terraspacestudio.in" className="font-serif text-xl hover:text-terra">
                    hello@terraspacestudio.in
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={16} className="mt-1 text-terra" />
                  <span className="font-serif text-xl">+91 00000 00000</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="mt-1 text-terra" />
                  <span className="font-serif text-xl">Hyderabad · Bengaluru · Visakhapatnam</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="eyebrow">— Studio Hours</div>
              <p className="mt-4 text-foreground/75">Monday to Saturday · 10am — 7pm IST</p>
            </div>

            <div className="aspect-[4/3] overflow-hidden">
              <img src={images.exterior4} alt="Terra Space Studio" className="h-full w-full object-cover" />
            </div>
          </aside>

          <div className="md:col-span-7 reveal">
            {submitted ? (
              <div className="rounded-sm border border-border bg-stone-warm/30 p-10 text-center">
                <div className="eyebrow">— Thank you</div>
                <h2 className="mt-4 font-serif text-3xl">We'll write back within two days.</h2>
                <p className="mt-3 text-foreground/70">
                  Your note has reached the studio. In the meantime, feel free to wander through
                  the projects.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-7">
                <div className="grid gap-7 md:grid-cols-2">
                  <Field label="Your name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid gap-7 md:grid-cols-2">
                  <Field label="Phone (optional)" name="phone" />
                  <Field label="Project location" name="location" />
                </div>
                <Field label="Project type" name="type" placeholder="e.g. New residence, interior renovation" />
                <Field label="Plot size / scope" name="scope" placeholder="e.g. 2400 sqft G+2" />
                <div>
                  <label className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                    Tell us a little
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    placeholder="The home you have in mind — even in a few words."
                    className="mt-3 w-full border-b border-border bg-transparent py-3 font-serif text-lg outline-none transition focus:border-foreground placeholder:text-muted-foreground/60"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-[12px] tracking-[0.22em] uppercase text-background transition hover:bg-terra"
                >
                  Send to studio
                  <Send size={14} className="transition group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-3 w-full border-b border-border bg-transparent py-3 font-serif text-lg outline-none transition focus:border-foreground placeholder:text-muted-foreground/60"
      />
    </div>
  );
}
