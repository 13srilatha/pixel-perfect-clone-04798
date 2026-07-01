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
    <section id="architect" className="relative bg-cream py-12 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">

          {/* ── Portrait ── */}
          <Reveal className="md:col-span-5">
            <div className="relative">
              <div className="absolute -left-2 -top-2 hidden h-full w-full border border-caramel/40 md:block" />
              <img
                src={portrait}
                alt={founder.name}
                width={1024} height={1280}
                loading="lazy"
                className="relative aspect-[4/5] w-full object-cover"
              />
              <p className="label mt-3 text-caramel text-xs">{founder.role}</p>
              <h3 className="font-display text-2xl font-light text-espresso md:text-3xl">{founder.name}</h3>
              <p className="mt-1 text-xs text-brown/80">{founder.credential}</p>
            </div>
          </Reveal>

          {/* ── Story ── */}
          <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
            <p className="label mb-3 inline-flex items-center gap-3 text-xs">
              <span className="h-px w-8 bg-caramel" />
              The Founder
            </p>

            <h2 className="font-display font-light text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-espresso">
              Behind every <em className="italic text-caramel">drawing</em>,
              <br />a person we listened to.
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-brown">
              {founder.paras.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Closing line — direct quote */}
            <blockquote className="mt-8 border-l-2 border-caramel pl-5">
              <p className="font-display text-lg font-light italic leading-relaxed text-caramel md:text-xl">
                "{founder.quote}"
              </p>
              <footer className="mt-3">
                <cite className="label not-italic text-brown text-[10px]">— K. Vaasanthi, Founder · Terra Space Studio</cite>
              </footer>
            </blockquote>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
