import portrait from "@/assets/architect-portrait.jpeg";
import { Reveal } from "./Nav";

const architect = {
  name: "Srilatha",
  role: "Founder · Lead Architect",
  intro:
    "I'm the one who designs every home that leaves this studio. Architecture, for me, is not about buildings — it's about the small, quiet moments people will live inside them years from now.",
  education: "B.Arch · School of Planning & Architecture",
  experience: "6+ years · 40+ residences across India",
  certifications: ["COA Registered Architect", "Council certified · Sustainable Design"],
  vision:
    "I don't build houses. I build the place a family will keep their first photograph, the corner a child will read in, the window someone will grow old beside.",
};

export function Architect() {
  return (
    <section id="architect" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <div className="relative">
              <div className="absolute -left-3 -top-3 hidden h-full w-full border border-caramel/40 md:block" />
              <img
                src={portrait}
                alt={architect.name}
                width={1024}
                height={1024}
                loading="lazy"
                className="relative aspect-[4/5] w-full object-cover grayscale-[15%]"
              />
              <p className="label mt-4 text-caramel">{architect.role}</p>
              <h3 className="font-display text-3xl font-light text-espresso md:text-4xl">
                {architect.name}
              </h3>
            </div>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
            <p className="label mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-caramel" />
              The Architect
            </p>
            <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-espresso">
              Behind every <em className="italic text-caramel">drawing</em>,<br />a person.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-brown text-pretty">
              {architect.intro}
            </p>

            <dl className="mt-10 grid gap-6 border-t border-sand pt-10 md:grid-cols-2">
              <div>
                <dt className="label mb-2 text-caramel">Education</dt>
                <dd className="font-display text-lg font-light text-espresso">
                  {architect.education}
                </dd>
              </div>
              <div>
                <dt className="label mb-2 text-caramel">Experience</dt>
                <dd className="font-display text-lg font-light text-espresso">
                  {architect.experience}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="label mb-2 text-caramel">Certifications</dt>
                <dd className="font-display text-lg font-light text-espresso">
                  {architect.certifications.join(" · ")}
                </dd>
              </div>
            </dl>

            <blockquote className="mt-10 border-l-2 border-caramel pl-6 font-display text-xl italic leading-relaxed text-espresso md:text-2xl">
              "{architect.vision}"
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
