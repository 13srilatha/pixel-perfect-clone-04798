import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { projects, images } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Terra Space Studio" },
      {
        name: "description",
        content: "A catalogue of completed and ongoing residences and interiors by Terra Space Studio.",
      },
      { property: "og:title", content: "Projects — Terra Space Studio" },
      {
        property: "og:description",
        content: "A small, careful catalogue of architecture and interior projects.",
      },
      { property: "og:image", content: images.exterior2 },
    ],
  }),
  component: ProjectsPage,
});

const filters = ["All", "Residential", "Interior", "Ongoing", "Completed"] as const;
type Filter = (typeof filters)[number];

function ProjectsPage() {
  const [f, setF] = useState<Filter>("All");
  const ref = useReveal<HTMLDivElement>();

  const list = projects.filter((p) => {
    if (f === "All") return true;
    if (f === "Ongoing" || f === "Completed") return p.status === f;
    return p.category === f;
  });

  return (
    <div ref={ref} className="bg-background">
      <header className="pt-40 pb-16 md:pt-52 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow reveal">— Projects</div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] reveal">
            A small, careful catalogue
            <br />
            <em className="text-terra">of homes we have known.</em>
          </h1>
          <div className="mt-12 flex flex-wrap gap-2 reveal">
            {filters.map((x) => (
              <button
                key={x}
                onClick={() => setF(x)}
                className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.22em] uppercase transition ${
                  f === x
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-foreground/70 hover:border-foreground/60"
                }`}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="pb-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
            {list.map((p, i) => (
              <Link
                key={p.id}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className={`group reveal ${i % 2 === 1 ? "md:mt-20" : ""}`}
              >
                <figure className="relative aspect-[4/5] overflow-hidden bg-stone-warm/30">
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-ivory/85 px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-ink">
                    {p.status}
                  </div>
                </figure>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
                      {p.category} · {p.location} · {p.year}
                    </div>
                    <h3 className="mt-2 font-serif text-2xl md:text-3xl">{p.title}</h3>
                    <p className="mt-2 max-w-md text-sm text-foreground/65">{p.shortDescription}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-foreground/40 transition group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
