import { useState } from "react";
import { projects, studio, type Project } from "@/data/projects";
import { Reveal } from "./Nav";

const categories = ["All", "Residential", "Interior", "Commercial", "Renovation"] as const;

export function Work() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-caramel" />
              Selected Work
            </p>
            <h2 className="display max-w-2xl text-[clamp(2.5rem,6vw,5rem)] text-espresso">
              Houses that hold <em className="italic text-caramel">memory</em>.
            </h2>
          </div>
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`label border px-3 py-2 transition-colors ${
                  filter === c
                    ? "border-espresso bg-espresso text-cream"
                    : "border-sand bg-transparent text-brown hover:border-caramel"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {filtered.map((p, i) => {
            const isFeature = i % 5 === 0;
            const isOffset = i % 5 === 3;
            const span = isFeature
              ? "md:col-span-12"
              : isOffset
                ? "md:col-span-7 md:col-start-6"
                : "md:col-span-6";
            return (
              <Reveal key={p.id} className={span} delay={(i % 3) * 80}>
                <ProjectCard project={p} feature={isFeature} />
              </Reveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-display text-2xl text-brown">
            No projects in this category yet.
          </p>
        )}

        <Studio />
      </div>
    </section>
  );
}

function ProjectCard({ project, feature }: { project: Project; feature: boolean }) {
  return (
    <article className="group cursor-pointer">
      <div className={`relative overflow-hidden bg-sand ${feature ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span
          className={`label absolute left-4 top-4 px-2 py-1 ${
            project.status === "in-progress"
              ? "bg-gold text-ink"
              : project.status === "concept"
                ? "bg-cream text-espresso"
                : "bg-cream/90 text-espresso"
          }`}
        >
          {project.status === "in-progress" ? "In Progress" : project.status === "concept" ? "Concept" : "Completed"}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <p className="label mb-1 text-caramel">{project.category} · {project.year}</p>
          <h3 className="font-display text-2xl font-light text-espresso md:text-3xl">{project.title}</h3>
          <p className="label mt-1 normal-case tracking-normal text-brown">{project.location}</p>
        </div>
        <span className="label whitespace-nowrap text-caramel transition-all group-hover:text-espresso">View →</span>
      </div>
      {feature && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-brown text-pretty">{project.description}</p>
      )}
    </article>
  );
}

function Studio() {
  return (
    <section id="studio" className="mt-32 grid gap-10 border-t border-sand pt-20 md:grid-cols-12">
      <Reveal className="md:col-span-5">
        <p className="label mb-4">The Studio</p>
        <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-espresso">
          Architecture, slowed
          <br />
          to the speed of <em className="italic text-caramel">life</em>.
        </h2>
      </Reveal>
      <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
        <div className="space-y-5 text-lg leading-relaxed text-brown">
          <p>
            {studio.name} is a residential architecture and interior practice rooted in {studio.city}. We design for stillness — homes you can sink into, not just look at.
          </p>
          <p>
            Our buildings are made from earth's vocabulary: stone, plaster, walnut, unglazed terracotta, raw cotton, brushed brass. We compose them around the way your light moves, the way your family gathers, the way a room should feel at six in the morning.
          </p>
          <p>Founded {studio.founded}. Currently working across India.</p>
        </div>
      </Reveal>
    </section>
  );
}
