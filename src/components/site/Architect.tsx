import portrait from "@/assets/architect-portrait.jpeg";
import { Reveal } from "./Nav";

/**
 * Founder & Architect section.
 * Copy adapted from the Terra Space Studio 2026 brochure — kept honest,
 * understated, and trust-pouring. No over-claims.
 */
const founder = {
  name: "K. Vaasanthi",
  role: "Founder · Architect & Interior Designer",
  credential: "B.Arch · COA Registered · Hyderabad | Vijayawada",
  paras: [
    "Every project begins with understanding how people live, feel, and experience a space — not measurements, not materials. People.",
    "At Terra Space Studio, design is a balance between functionality, warmth, and timeless simplicity. We create spaces that feel personal, refined, and deeply connected to everyday life.",
    "From concept to execution, our focus remains on thoughtful detailing, honest materials, and meaningful spatial experiences.",
  ],
  quote: "Every project. Every detail. Designed with intention.",
  pillars: [
    { label: "Context",  text: "Site, climate and culture shape the first line on paper." },
    { label: "Simplicity", text: "Forms and plans simplified until only the essential remains." },
    { label: "Materiality", text: "Honest materials, natural textures, considered palettes." },
    { label: "Detail", text: "Proportion and craft, decided early — held to until handover." },
  ],
};

export function Architect() {
  return (
    <section id="architect" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">

          {/* ── Portrait ── */}
          <Reveal className="md:col-span-5">
            <div className="relative">
              <div className="absolute -left-3 -top-3 hidden h-full w-full border border-caramel/40 md:block" />
              <div className="absolute -right-3 -bottom-3 hidden h-1/2 w-1/2 border border-gold/30 md:block" />
              <img
                src={portrait}
                alt={founder.name}
                width={1024} height={1280}
                loading="lazy"
                className="relative aspect-[4/5] w-full object-cover"
              />
              <p className="label mt-4 text-caramel">{founder.role}</p>
              <h3 className="font-display text-3xl font-light text-espresso md:text-4xl">{founder.name}</h3>
              <p className="mt-2 text-sm text-brown/80">{founder.credential}</p>
            </div>
          </Reveal>

          {/* ── Story ── */}
          <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
            <p className="label mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-caramel" />
              The Founder
            </p>

            <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-espresso">
              Behind every <em className="italic text-caramel">drawing</em>,
              <br />a person we listened to.
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-brown">
              {founder.paras.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Four pillars from the brochure */}
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {founder.pillars.map((p) => (
                <li key={p.label} className="border-l border-caramel/40 pl-4">
                  <p className="label text-caramel">{p.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-brown">{p.text}</p>
                </li>
              ))}
            </ul>

            {/* Closing line — direct quote */}
            <blockquote className="mt-10 border-l-2 border-caramel pl-6">
              <p className="font-display text-xl font-light italic leading-relaxed text-caramel md:text-2xl">
                "{founder.quote}"
              </p>
              <footer className="mt-4">
                <cite className="label not-italic text-brown">— K. Vaasanthi, Founder · Terra Space Studio</cite>
              </footer>
            </blockquote>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
