import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { Reveal } from "./Nav";

const CATEGORY_ORDER: ProjectCategory[] = ["Residential", "Interior", "Commercial", "Renovation"];

const CATEGORY_BLURB: Record<ProjectCategory, string> = {
  Residential: "Homes designed to age slowly with the families inside them.",
  Interior: "Joinery, partitions, lighting and built-ins — drawn for each home, crafted on site.",
  Commercial: "Workplaces, cafés and showrooms with the warmth of a private home.",
  Renovation: "Old buildings, listened to. Restored where possible, updated only where needed.",
};

import { interiors } from "@/data/interiors";

/**
 * Convert interiors data into Project shape so they live inside the
 * "Interior" filter of the Work section (no separate Interior section).
 */
const interiorAsProjects: Project[] = interiors.map((it) => ({
  id: `int-${it.id}`,
  title: it.title,
  location: it.location,
  year: "—",
  category: "Interior" as const,
  status: "completed" as const,
  image: it.image,
  description: it.description,
  materials: [],
  intent: it.description,
  approach: it.room,
}));

const ALL_PROJECTS: Project[] = [...projects, ...interiorAsProjects];

export function Work() {
  const [openCategory, setOpenCategory] = useState<ProjectCategory | null>(null);

  return (
    <>
      <section id="work" className="relative bg-cream">
        {/* Header */}
        <div className="mx-auto max-w-[1600px] px-6 pt-24 pb-16 md:px-10 md:pt-36">
          <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label mb-4 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-caramel" />
                Selected Work
              </p>
              <h2 className="display max-w-2xl text-[clamp(2.5rem,6vw,5rem)] text-espresso">
                Houses that hold <em className="italic text-caramel">memory</em>.
              </h2>
            </div>
          </Reveal>
        </div>

        {/* Horizontal sticky-scroll category panels */}
        <HorizontalCategories onOpen={setOpenCategory} />

        <Studio />
      </section>

      <AnimatePresence>
        {openCategory && (
          <CategoryGallery
            category={openCategory}
            onClose={() => setOpenCategory(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────── */

function HorizontalCategories({ onOpen }: { onOpen: (c: ProjectCategory) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // 4 panels of 100vw, so we move the inner track from 0 to -75% (i.e. 3 panels worth).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      ref={trackRef}
      className="relative bg-cream"
      style={{ height: "400vh" }} // 100vh per panel
      aria-label="Work categories — horizontal scroll"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="flex h-full items-center px-0">
          <motion.div style={{ x }} className="flex h-full will-change-transform">
            {CATEGORY_ORDER.map((cat, i) => (
              <CategoryPanel
                key={cat}
                category={cat}
                index={i}
                onOpen={() => onOpen(cat)}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        {/* progress rail */}
        <div className="pointer-events-none absolute inset-x-10 bottom-6 z-20 flex items-center gap-4">
          <span className="label text-caramel">Categories</span>
          <span className="relative h-px flex-1 bg-sand">
            <motion.span
              className="absolute left-0 top-0 block h-full bg-espresso"
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </span>
          <span className="label text-caramel">{CATEGORY_ORDER.length} of {CATEGORY_ORDER.length}</span>
        </div>
      </div>
    </section>
  );
}

function CategoryPanel({
  category,
  index,
  onOpen,
  progress,
}: {
  category: ProjectCategory;
  index: number;
  onOpen: () => void;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const items = ALL_PROJECTS.filter((p) => p.category === category);
  // Each panel is centered when progress = index / (n - 1)
  const center = index / Math.max(1, CATEGORY_ORDER.length - 1);
  const dist = useTransform(progress, (v) => Math.abs(v - center));
  const scale = useTransform(dist, [0, 0.4], [1, 0.92]);
  const opacity = useTransform(dist, [0, 0.4], [1, 0.55]);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      style={{ scale, opacity }}
      className="group relative flex h-full w-screen shrink-0 items-stretch p-6 text-left md:p-12"
    >
      <div className="relative flex h-full w-full overflow-hidden bg-espresso">
        {/* Image collage backdrop */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 opacity-90">
          {items.slice(0, 4).map((p, i) => (
            <div key={p.id} className="relative overflow-hidden bg-ink">
              <img
                src={p.image}
                alt=""
                aria-hidden
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            </div>
          ))}
          {items.length === 0 && <div className="col-span-2 row-span-2 bg-espresso" />}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/30" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 text-cream md:p-14">
          <div className="flex items-center justify-between">
            <p className="label text-gold-lt">0{index + 1} · {items.length} project{items.length === 1 ? "" : "s"}</p>
            <span className="label text-cream/70">Tap to open gallery →</span>
          </div>

          <div>
            <h3 className="display text-[clamp(3rem,9vw,8rem)] text-cream">
              {category}.
            </h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/80">
              {CATEGORY_BLURB[category]}
            </p>

            <span className="mt-8 inline-flex items-center gap-3 border border-cream/40 px-5 py-3 transition-colors group-hover:border-gold group-hover:bg-gold/10">
              <span className="label text-cream">Open the {category.toLowerCase()} gallery</span>
              <span className="text-cream transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

/**
 * Sticky-content-switch gallery: the heading on the left stays pinned,
 * images scroll past on the right; heading text updates per active image
 * via IntersectionObserver.
 */
function CategoryGallery({
  category,
  onClose,
}: {
  category: ProjectCategory;
  onClose: () => void;
}) {
  const items = ALL_PROJECTS.filter((p) => p.category === category);

  // Freeze the page exactly where it is, then let only the gallery overlay
  // handle vertical scrolling. On close we restore the previous page position.
  useEffect(() => {
    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;

    const previousBody = {
      overflow: bodyStyle.overflow,
      position: bodyStyle.position,
      top: bodyStyle.top,
      width: bodyStyle.width,
    };
    const previousHtmlOverflow = htmlStyle.overflow;

    htmlStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";

    return () => {
      htmlStyle.overflow = previousHtmlOverflow;
      bodyStyle.overflow = previousBody.overflow;
      bodyStyle.position = previousBody.position;
      bodyStyle.top = previousBody.top;
      bodyStyle.width = previousBody.width;
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-y-contain bg-cream"
    >
      {/* Sticky header bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-sand bg-cream/95 px-6 py-4 backdrop-blur md:px-10">
        <p className="label text-caramel">
          <span className="text-espresso">{category}</span> · {items.length} project{items.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="label group inline-flex items-center gap-2 border border-espresso px-4 py-2 text-espresso transition-colors hover:bg-espresso hover:text-cream"
        >
          Close
          <span className="transition-transform group-hover:rotate-90">✕</span>
        </button>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Sticky left intro — stays the same while images scroll on the right */}
          <div className="md:col-span-5">
            <div className="sticky top-32">
              <p className="label mb-4 inline-flex items-center gap-3 text-caramel">
                <span className="h-px w-8 bg-caramel" />
                {category}
              </p>
              <h3 className="display text-[clamp(2.25rem,5vw,4.25rem)] text-espresso">
                {category}.
              </h3>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-brown text-pretty">
                {CATEGORY_BLURB[category]}
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-brown text-pretty">
                Every project below is built around the materials we love — stone, walnut, lime,
                brass and unglazed terracotta — and the way light moves through a room. Hover any
                image to flip it and read the intent, materials and the why behind it.
              </p>

              <div className="mt-10 flex items-center gap-3">
                <span className="label text-caramel">Scroll to see my work</span>
                <span className="block h-px w-12 bg-caramel" />
                <span className="label text-caramel" aria-hidden>↓</span>
              </div>
            </div>
          </div>

          {/* Right scrolling images, each a flip card */}
          <div className="space-y-12 md:col-span-7">
            {items.length === 0 && (
              <p className="font-display text-2xl text-brown">No projects yet in this category.</p>
            )}
            {items.map((p) => (
              <div key={p.id}>
                <FlipCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function FlipCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      style={{ perspective: "1600px" }}
    >
      <motion.div
        className="relative aspect-[4/3] w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: hovered ? 180 : 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden bg-sand"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6">
            <p className="label text-gold-lt">{project.category} · {project.year}</p>
            <h4 className="font-display text-2xl font-light text-cream md:text-3xl">{project.title}</h4>
            <p className="label mt-2 text-cream/70">Hover to read the why →</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-between bg-espresso p-8 text-cream md:p-10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <p className="label text-gold">Design Intent</p>
            <p className="mt-3 font-display text-xl italic leading-snug text-cream md:text-2xl">
              "{project.intent ?? project.description}"
            </p>
          </div>

          {project.materials && project.materials.length > 0 && (
            <div>
              <p className="label mt-6 text-gold">Materials Used</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.materials.map((m) => (
                  <li key={m} className="label border border-cream/30 px-3 py-1 normal-case tracking-wider text-cream">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.approach && (
            <div className="mt-6 border-t border-cream/15 pt-4">
              <p className="label text-gold">Working Style</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/80">{project.approach}</p>
            </div>
          )}
        </div>
      </motion.div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

import { studio } from "@/data/projects";

function Studio() {
  return (
    <section id="studio" className="mx-auto mt-24 grid max-w-[1600px] gap-10 border-t border-sand px-6 pb-24 pt-20 md:grid-cols-12 md:px-10">
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
