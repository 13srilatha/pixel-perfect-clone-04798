import { createFileRoute } from "@tanstack/react-router";
import { images, projects } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/interiors")({
  head: () => ({
    meta: [
      { title: "Interiors — Terra Space Studio" },
      {
        name: "description",
        content: "Bespoke interiors — joinery, lighting, marble, walnut. A curated gallery from Terra Space Studio.",
      },
      { property: "og:title", content: "Interiors — Terra Space Studio" },
      { property: "og:description", content: "Rooms composed like still lifes." },
      { property: "og:image", content: images.interior1 },
    ],
  }),
  component: InteriorsPage,
});

function InteriorsPage() {
  const ref = useReveal<HTMLDivElement>();
  const interiorProjects = projects.filter((p) => p.category === "Interior");
  const gallery = [
    images.interior1,
    images.interior4,
    images.interior3,
    images.interior2,
    images.interior5,
    images.interior1,
  ];

  return (
    <div ref={ref} className="bg-background">
      <header className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow reveal">— Interiors</div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] max-w-4xl reveal">
            Walnut, ivory, light —
            <br />
            <em className="text-terra">composed by hand.</em>
          </h1>
          <p className="mt-8 max-w-xl text-foreground/75 reveal">
            We design interiors as patient compositions. Joinery is drawn full-scale; stone is
            chosen at the yard; light is studied at every hour of the day.
          </p>
        </div>
      </header>

      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {gallery.map((src, i) => (
            <figure
              key={i}
              className={`reveal overflow-hidden ${
                i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
              } ${i === 3 ? "md:mt-12" : ""}`}
            >
              <img src={src} alt={`Interior frame ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-stone-warm/30 py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow reveal">— Featured Interiors</div>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {interiorProjects.map((p) => (
              <article key={p.id} className="reveal">
                <figure className="aspect-[4/3] overflow-hidden">
                  <img src={p.featuredImage} alt={p.title} className="h-full w-full object-cover" />
                </figure>
                <h3 className="mt-5 font-serif text-2xl md:text-3xl">{p.title}</h3>
                <div className="mt-1 text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
                  {p.location} · {p.year}
                </div>
                <p className="mt-3 text-foreground/70">{p.shortDescription}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
