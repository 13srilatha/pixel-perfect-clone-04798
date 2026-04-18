import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { images, projects, services, stats, journey, journalPosts } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowRight, ArrowUpRight, Instagram } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terra Space Studio — Architecture & Interior Design" },
      {
        name: "description",
        content:
          "A scroll-led journey through warm, cinematic homes. Terra Space Studio designs architecture and interiors with patience and stone.",
      },
      { property: "og:title", content: "Terra Space Studio" },
      {
        property: "og:description",
        content: "Architecture and interiors built with patience, stone, and light.",
      },
      { property: "og:image", content: images.exterior1 },
      { name: "twitter:image", content: images.exterior1 },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero />
      <Marquee />
      <Overview />
      <Stats />
      <Journey />
      <BestProject />
      <ProjectsPreview />
      <InteriorsStrip />
      <BeforeAfter />
      <Architect />
      <Instagrams />
      <JournalPreview />
      <ContactCTA />
    </div>
  );
}

/* ------------------------------- HERO ------------------------------- */

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `scale(${1 + Math.min(y, 600) * 0.0004}) translateY(${y * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-ivory">
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <img
          src={images.exterior1}
          alt="Terra Space Studio — featured residence facade"
          className={`h-full w-full object-cover transition-[opacity,filter] duration-[1800ms] ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/85" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pb-10 pt-32 md:px-10 md:pb-16">
        <div className="flex items-center gap-3 text-ivory/80">
          <div className="h-px w-10 bg-ivory/50" />
          <span className="text-[10px] tracking-[0.42em] uppercase">Est. 2017 · India</span>
        </div>

        <div className="max-w-4xl">
          <h1 className="font-serif text-[clamp(2.6rem,7vw,7rem)] leading-[0.95] text-ivory">
            <span className="block opacity-90">Homes shaped by</span>
            <span className="block italic text-gold">light, stone &amp; patience.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg">
            Terra Space Studio is an architecture and interior design practice. We design
            buildings the way one writes a long letter — slowly, deliberately, by hand.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-3.5 text-[12px] tracking-[0.22em] uppercase text-ink transition hover:bg-gold"
            >
              View projects
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-ivory/35 px-7 py-3.5 text-[12px] tracking-[0.22em] uppercase text-ivory transition hover:bg-ivory hover:text-ink"
            >
              Start your project
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="hidden md:block max-w-xs text-[11px] tracking-[0.18em] uppercase text-ivory/60">
            Featured · The Lattice House — Hyderabad
          </div>
          <div className="flex items-center gap-3 text-[10px] tracking-[0.42em] uppercase text-ivory/60">
            <span>Scroll</span>
            <div className="h-10 w-px bg-ivory/40 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- MARQUEE ------------------------------- */

function Marquee() {
  const items = [
    "Architecture",
    "Interior Design",
    "Construction Management",
    "3D Visualisation",
    "Urban Residences",
    "Bespoke Joinery",
  ];
  return (
    <section className="border-y border-border/60 bg-ivory py-6 overflow-hidden">
      <div className="marquee">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mx-10 font-serif text-2xl italic text-foreground/60">
            {t} <span className="not-italic mx-6 text-gold">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- OVERVIEW / SERVICES ------------------------------- */

function Overview() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 reveal">
            <div className="eyebrow">— The Studio</div>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.05]">
              We build homes that <em className="text-terra">remember</em> the people inside them.
            </h2>
          </div>

          <div className="md:col-span-7 reveal">
            <p className="text-lg leading-relaxed text-foreground/80">
              From the first sketch to the last lamp installed, every Terra Space project is
              composed by hand — by people who visit the site on Tuesdays, who choose the stone
              themselves, and who believe a room should feel like a long exhale.
            </p>

            <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="group bg-background p-7 md:p-9 transition hover:bg-stone-warm/40"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      0{i + 1}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-foreground/40 transition group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- STATS ------------------------------- */

function Stats() {
  return (
    <section className="border-y border-border bg-stone-warm/30 py-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:px-10">
        {stats.map((s) => (
          <div key={s.label} className="reveal text-center md:text-left">
            <div className="font-serif text-5xl md:text-6xl text-foreground">{s.value}</div>
            <div className="mt-2 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- JOURNEY ------------------------------- */

function Journey() {
  return (
    <section className="bg-ink py-28 md:py-40 text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="reveal max-w-2xl">
          <div className="eyebrow text-ivory/55">— Experience</div>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.05] text-ivory">
            Walk through a home, while you scroll.
          </h2>
          <p className="mt-6 text-ivory/70">
            Six frames, in order. From the first glance at the street to the long quiet of the
            living room. Every image is a real Terra Space project.
          </p>
        </div>

        <div className="mt-16 space-y-24 md:space-y-40">
          {journey.map((j, i) => (
            <JourneyFrame key={j.title} index={i} {...j} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyFrame({
  img,
  title,
  caption,
  index,
}: {
  img: string;
  title: string;
  caption: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - r.top / vh));
      ref.current.style.setProperty("--p", String(progress));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reverse = index % 2 === 1;
  return (
    <div
      ref={ref}
      className={`reveal grid items-center gap-8 md:gap-16 md:grid-cols-12 ${
        reverse ? "md:[&>figure]:order-2" : ""
      }`}
    >
      <figure className="md:col-span-8 relative aspect-[16/10] overflow-hidden rounded-sm bg-ink/40">
        <img
          src={img}
          alt={`${title} — ${caption}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700"
          style={{ transform: "scale(calc(1 + var(--p, 0) * 0.06))" }}
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-ivory/10" />
      </figure>
      <div className="md:col-span-4">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold">
          0{index + 1} / 0{journey.length}
        </div>
        <h3 className="mt-4 font-serif text-3xl md:text-4xl text-ivory">{title}</h3>
        <p className="mt-4 text-ivory/65 leading-relaxed">{caption}</p>
      </div>
    </div>
  );
}

/* ------------------------------- BEST PROJECT ------------------------------- */

function BestProject() {
  const best = projects.find((p) => p.bestProject)!;
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-6 reveal">
          <div>
            <div className="eyebrow">— Our Best Project</div>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl">{best.title}</h2>
          </div>
          <Link
            to="/projects/$slug"
            params={{ slug: best.slug }}
            className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-foreground/70 hover:text-foreground"
          >
            Open case study <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <figure className="md:col-span-8 reveal">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={best.featuredImage} alt={best.title} className="h-full w-full object-cover" />
            </div>
          </figure>
          <div className="md:col-span-4 reveal flex flex-col">
            <div className="grid grid-cols-2 gap-y-5 border-t border-border pt-6 text-sm">
              <Meta label="Location" value={best.location} />
              <Meta label="Year" value={String(best.year)} />
              <Meta label="Status" value={best.status} />
              <Meta label="Type" value={best.category} />
            </div>
            <p className="mt-8 text-foreground/75 leading-relaxed">{best.shortDescription}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {best.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-foreground/70"
                >
                  {s}
                </span>
              ))}
            </div>
            <Link
              to="/projects/$slug"
              params={{ slug: best.slug }}
              className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-foreground px-6 py-3 text-[11px] tracking-[0.22em] uppercase text-background hover:bg-terra transition"
            >
              View project <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {best.galleryImages.slice(1, 4).map((g, i) => (
            <figure key={i} className="reveal aspect-[4/3] overflow-hidden">
              <img src={g} alt={`${best.title} detail ${i + 1}`} className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-lg">{value}</div>
    </div>
  );
}

/* ------------------------------- PROJECTS PREVIEW ------------------------------- */

function ProjectsPreview() {
  const list = projects.slice(0, 4);
  return (
    <section className="bg-stone-warm/25 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between reveal">
          <div>
            <div className="eyebrow">— Selected Work</div>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl">A small, careful catalogue.</h2>
          </div>
          <Link
            to="/projects"
            className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-foreground/70 hover:text-foreground"
          >
            All projects <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-16 md:grid-cols-2">
          {list.map((p, i) => (
            <Link
              key={p.id}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className={`group reveal ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <figure className="relative aspect-[4/5] overflow-hidden bg-ink/10">
                <img
                  src={p.featuredImage}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                />
              </figure>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
                    {p.category} · {p.location}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl md:text-3xl">{p.title}</h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-foreground/40 transition group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- INTERIORS ------------------------------- */

function InteriorsStrip() {
  const interiors = [images.interior1, images.interior4, images.interior3, images.interior2];
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 items-end reveal">
          <div className="md:col-span-5">
            <div className="eyebrow">— Interiors</div>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.05]">
              Rooms composed like still lifes.
            </h2>
          </div>
          <p className="md:col-span-5 md:col-start-7 text-foreground/75 leading-relaxed">
            We design the inside of a home with the same care we give the outside — joinery,
            lighting, marble, every drawer pull. Materials chosen in person.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {interiors.map((src, i) => (
            <figure
              key={i}
              className={`reveal overflow-hidden ${
                i === 0 || i === 3 ? "aspect-[3/4]" : "aspect-[4/5] md:mt-12"
              }`}
            >
              <img src={src} alt={`Interior detail ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>

        <div className="mt-12 reveal">
          <Link
            to="/interiors"
            className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-6 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition"
          >
            See interior portfolio <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- BEFORE / AFTER ------------------------------- */

function BeforeAfter() {
  return (
    <section className="bg-stone-warm/30 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="reveal max-w-2xl">
          <div className="eyebrow">— The Journey</div>
          <h2 className="mt-5 font-serif text-4xl md:text-6xl">From scaffold to silence.</h2>
          <p className="mt-6 text-foreground/75">
            Every project we publish is one we have stood inside, on a Tuesday, in dust.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <figure className="reveal relative aspect-[4/3] overflow-hidden">
            <img
              src={images.construction1}
              alt="Construction phase — scaffolding and structure"
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-ivory">
              During
            </figcaption>
          </figure>
          <figure className="reveal relative aspect-[4/3] overflow-hidden">
            <img
              src={images.exterior2}
              alt="Completed home"
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute left-4 top-4 rounded-full bg-ivory/85 px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-ink">
              After
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- ARCHITECT ------------------------------- */

function Architect() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-12 md:px-10">
        <figure className="md:col-span-5 reveal">
          <div className="aspect-[4/5] overflow-hidden bg-stone-warm">
            <img
              src={images.interior1}
              alt="Founding architect — Terra Space Studio"
              className="h-full w-full object-cover"
            />
          </div>
        </figure>
        <div className="md:col-span-7 reveal flex flex-col justify-center">
          <div className="eyebrow">— The Architect</div>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight">
            “A house should feel like the long, quiet exhale of the day.”
          </h2>
          <div className="mt-8 grid gap-y-3 text-sm">
            <Meta label="Founder & Principal Architect" value="Aarav Reddy" />
            <Meta label="Education" value="M.Arch · School of Planning & Architecture" />
            <Meta label="Practice" value="9 years · 60+ realised projects" />
          </div>
          <p className="mt-8 max-w-xl text-foreground/75 leading-relaxed">
            Terra Space Studio was started with a single intention — to design fewer homes, more
            slowly, and to know each one by its first name. The studio works closely with masons,
            joiners, and stone yards across India.
          </p>
          <Link
            to="/studio"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-foreground/20 px-6 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition"
          >
            About the studio <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- INSTAGRAM ------------------------------- */

function Instagrams() {
  const grid = [images.exterior1, images.interior4, images.exterior3, images.interior1, images.exterior2, images.interior3];
  return (
    <section className="bg-ink py-28 md:py-32 text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="reveal">
            <div className="eyebrow text-ivory/55">— Follow Along</div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-ivory">
              The studio, week to week.
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-ivory hover:text-ink transition"
          >
            <Instagram size={14} /> @terraspacestudio
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
          {grid.map((src, i) => (
            <figure key={i} className="reveal aspect-square overflow-hidden">
              <img src={src} alt={`Instagram update ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- JOURNAL ------------------------------- */

function JournalPreview() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between reveal">
          <div>
            <div className="eyebrow">— Journal</div>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl">Notes from the studio.</h2>
          </div>
          <Link
            to="/journal"
            className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-foreground/70 hover:text-foreground"
          >
            Read journal <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {journalPosts.map((p) => (
            <article key={p.title} className="reveal bg-background p-8 md:p-10 group">
              <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                {p.date} · {p.readTime}
              </div>
              <h3 className="mt-5 font-serif text-2xl md:text-3xl">{p.title}</h3>
              <p className="mt-4 text-foreground/70 leading-relaxed">{p.excerpt}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-foreground/60 group-hover:text-foreground transition">
                Read essay <ArrowUpRight size={14} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CONTACT CTA ------------------------------- */

function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-terra py-28 md:py-40 text-ivory">
      <div className="absolute inset-0 opacity-30">
        <img src={images.exterior4} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-terra/70" />
      </div>
      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10 text-center reveal">
        <div className="eyebrow text-ivory/70">— Begin</div>
        <h2 className="mt-6 font-serif text-4xl md:text-7xl leading-[1.02] text-ivory">
          Tell us about the home you have been imagining.
        </h2>
        <p className="mt-8 mx-auto max-w-xl text-ivory/85">
          We take on a small number of projects each year. The earlier you write, the more
          carefully we can listen.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="rounded-full bg-ivory px-8 py-4 text-[12px] tracking-[0.22em] uppercase text-ink hover:bg-gold transition"
          >
            Start your project
          </Link>
          <a
            href="mailto:hello@terraspacestudio.in"
            className="rounded-full border border-ivory/45 px-8 py-4 text-[12px] tracking-[0.22em] uppercase text-ivory hover:bg-ivory hover:text-ink transition"
          >
            hello@terraspacestudio.in
          </a>
        </div>
      </div>
    </section>
  );
}
