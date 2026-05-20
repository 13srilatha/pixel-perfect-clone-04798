import portrait from "@/assets/architect-portrait.jpeg";
import { Reveal } from "./Nav";

const founder = {
  name: "K. Vaasanthi",
  role: "Founder · Architect & Interior Designer",
  credential: "B.Arch · COA Registered · 6+ years · 40+ projects",
  para1:
    "Every project begins with understanding how people live, feel, and experience a space. Not measurements. Not materials. People.",
  para2:
    "At Terra Space Studio, we approach design as a balance between functionality, warmth, and timeless simplicity — creating spaces that feel personal, refined, and deeply connected to everyday life.",
  quote:
    "From concept to execution, our focus remains on thoughtful detailing, honest materials, and meaningful spatial experiences. Every project. Every detail. Designed with intention.",
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
            </div>
          </Reveal>

          {/* ── Story ── */}
          <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
            <p className="label mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-caramel" />
              The Architect
            </p>

            <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-espresso">
              Behind every <em className="italic text-caramel">drawing</em>,
              <br />a person.
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-brown">
              <p>{founder.para1}</p>
              <p>{founder.para2}</p>
            </div>

            {/* Credentials — minimal */}
            <p className="mt-8 text-sm text-caramel tracking-wide">{founder.credential}</p>

            {/* The quote — this IS the story */}
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
