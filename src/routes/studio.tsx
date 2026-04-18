import { createFileRoute } from "@tanstack/react-router";
import { images, stats } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Terra Space Studio" },
      {
        name: "description",
        content: "About Terra Space Studio — practice, process, and the architect behind the work.",
      },
      { property: "og:title", content: "Studio — Terra Space Studio" },
      { property: "og:description", content: "About Terra Space Studio — practice and process." },
      { property: "og:image", content: images.exterior3 },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="bg-background">
      <header className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7 reveal">
            <div className="eyebrow">— The Studio</div>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02]">
              A small practice,
              <br />
              <em className="text-terra">slow on purpose.</em>
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-foreground/80 leading-relaxed">
              Terra Space Studio is an architecture and interior design practice based in India.
              We take on a small number of projects each year so that we can know each home by
              its first name — and design it as such.
            </p>
          </div>
          <figure className="md:col-span-5 reveal">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={images.exterior3} alt="Terra Space Studio — facade" className="h-full w-full object-cover" />
            </div>
          </figure>
        </div>
      </header>

      <section className="border-y border-border bg-stone-warm/30 py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:px-10">
          {stats.map((s) => (
            <div key={s.label} className="reveal text-center md:text-left">
              <div className="font-serif text-5xl md:text-6xl">{s.value}</div>
              <div className="mt-2 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 md:py-40">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-12 md:px-10">
          <figure className="md:col-span-5 reveal">
            <div className="aspect-[4/5] overflow-hidden bg-stone-warm">
              <img src={images.interior1} alt="Founding architect" className="h-full w-full object-cover" />
            </div>
          </figure>
          <div className="md:col-span-7 reveal">
            <div className="eyebrow">— The Architect</div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight">
              “Architecture is a long, careful sentence — it should not be hurried.”
            </h2>
            <div className="mt-10 grid gap-y-3 text-sm">
              <Meta label="Founder & Principal" value="Aarav Reddy" />
              <Meta label="Education" value="M.Arch · School of Planning & Architecture" />
              <Meta label="Practice" value="9 years · 60+ realised projects" />
              <Meta label="Memberships" value="Council of Architecture (COA), India" />
            </div>
            <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
              Aarav started Terra Space Studio after a decade of working on residences across
              South India. The studio works closely with masons, joiners, and stone yards, and
              insists on weekly site visits through every build.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-28 md:py-32 text-ivory">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 text-center reveal">
          <div className="eyebrow text-ivory/55">— How we work</div>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl text-ivory">
            Listen. Sketch. Visit. Build. Stay.
          </h2>
          <div className="mt-14 grid gap-px bg-ivory/15 md:grid-cols-5 text-left">
            {["Listen", "Sketch", "Visit", "Build", "Stay"].map((s, i) => (
              <div key={s} className="bg-ink p-7 reveal">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold">0{i + 1}</div>
                <div className="mt-4 font-serif text-2xl text-ivory">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-baseline gap-4 border-b border-border pb-3">
      <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">{label}</div>
      <div className="font-serif text-lg">{value}</div>
    </div>
  );
}
