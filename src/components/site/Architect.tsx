import portrait from "@/assets/architect-portrait.jpeg";
import { Reveal } from "./Nav";

const architect = {
  name: "K. Vaasanthi",
  role: "Founder · Architect & Interior Designer",
  intro:
    "Every project begins with understanding how people live, feel, and experience a space. At Terra Space Studio, we approach design as a balance between functionality, warmth, and timeless simplicity — creating spaces that feel personal, refined, and deeply connected to everyday life.",
  education: "B.Arch · Council of Architecture, India",
  experience: "6+ years · 40+ projects across India",
  certifications: ["COA Registered Architect", "Interior Designer · Residential & Commercial"],
  vision:
    "From concept to execution, our focus remains on thoughtful detailing, honest materials, and meaningful spatial experiences. Every project. Every detail. Designed with intention.",
};

export function Architect() {
  return (
    <section id="architect" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <div className="relative">
              {/* Decorative offset frame */}
              <div className="absolute -left-3 -top-3 hidden h-full w-full border border-caramel/40 md:block" />
              <div className="absolute -right-3 -bottom-3 hidden h-1/2 w-1/2 border border-gold/30 md:block" />

              <img
                src={portrait}
                alt={architect.name}
                width={1024}
                height={1280}
                loading="lazy"
                className="relative aspect-[4/5] w-full object-cover"
              />
              <p className="label mt-4 text-caramel">{architect.role}</p>
              <h3 className="font-display text-3xl font-light text-espresso md:text-4xl">{architect.name}</h3>
            </div>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
            <p className="label mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-caramel" />
              The Architect
            </p>
            <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-espresso">
              Behind every <em className="italic text-caramel">drawing</em>,
              <br />a person.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-brown text-pretty">{architect.intro}</p>

            <dl className="mt-10 grid gap-6 border-t border-sand pt-10 md:grid-cols-2">
              <div>
                <dt className="label mb-2 text-caramel">Education</dt>
                <dd className="font-display text-lg font-light text-espresso">{architect.education}</dd>
              </div>
              <div>
                <dt className="label mb-2 text-caramel">Experience</dt>
                <dd className="font-display text-lg font-light text-espresso">{architect.experience}</dd>
              </div>
              {architect.certifications.map((c) => (
                <div key={c} className="md:col-span-2">
                  <dd className="flex items-center gap-3 text-sm text-espresso">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    {c}
                  </dd>
                </div>
              ))}
            </dl>

            <blockquote className="mt-10 border-l-2 border-caramel pl-6">
              <p className="font-display text-xl font-light italic leading-relaxed text-caramel md:text-2xl">
                "{architect.vision}"
              </p>
              <footer className="mt-4">
                <cite className="label not-italic text-brown">— K. Vaasanthi, Founder</cite>
              </footer>
            </blockquote>

            {/* Services quick-list from brochure */}
            <div className="mt-10 border-t border-sand pt-8">
              <p className="label mb-5 text-caramel">What we offer</p>
              <ul className="grid grid-cols-2 gap-3 text-sm text-espresso md:grid-cols-1 md:gap-2">
                {[
                  "Architecture",
                  "Interior Design",
                  "Planning",
                  "Landscape Design",
                  "Estimation & Costing",
                  "Execution",
                  "Site Supervision",
                ].map((s) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-caramel" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
