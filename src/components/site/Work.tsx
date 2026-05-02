import { useEffect, useMemo, useRef, useState } from "react";
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
  const inProgress = useMemo(() => ALL_PROJECTS.find((p) => p.status === "in-progress"), []);
  const [openCategory, setOpenCategory] = useState<ProjectCategory | null>(null);

  return (
    <>
      <section id="work" className="relative bg-cream">
        {/* Header + featured in-progress card */}
        <div className="mx-auto max-w-[1600px] px-6 pt-24 pb-16 md:px-10 md:pt-36">
          <Reveal className="mb-12">
            <p className="label mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-caramel" />
              Work
            </p>
            <h2 className="display max-w-2xl text-[clamp(2.5rem,6vw,5rem)] text-espresso">
              Houses that hold <em className="italic text-caramel">memory</em>.
            </h2>
          </Reveal>

          {inProgress && <FeaturedInProgress project={inProgress} />}
        </div>

        {/* Horizontal sticky-scroll category panels */}
        <HorizontalCategories onOpen={setOpenCategory} />
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

function FeaturedInProgress({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <Reveal>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-8 overflow-hidden border border-sand bg-cream/40 p-6 md:grid-cols-12 md:p-10"
      >
        <div className="relative md:col-span-7">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              style={{ y: imgY, scale: imgScale }}
              className="h-full w-full object-cover will-change-transform"
            />
            <motion.span
              style={{ y: chipY }}
              className="label absolute left-4 top-4 z-10 bg-gold px-2 py-1 text-ink"
            >
              In Progress
            </motion.span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between md:col-span-5"
        >
          <div>
            <p className="label text-caramel">{project.category}</p>
            <h3 className="mt-3 font-display text-3xl font-light text-espresso md:text-5xl">{project.title}</h3>
            <p className="label mt-2 normal-case tracking-normal text-brown">{project.location}</p>
            <p className="mt-6 text-base leading-relaxed text-brown text-pretty">{project.description}</p>
          </div>

          {project.materials && project.materials.length > 0 && (
            <dl className="mt-6 border-t border-sand pt-5">
              <dt className="label mb-3 text-caramel">In the making with</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-2 font-display text-base font-light text-espresso">
                {project.materials.map((m, i) => (
                  <motion.span
                    key={m}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                    className="border border-sand px-3 py-1"
                  >
                    {m}
                  </motion.span>
                ))}
              </dd>
            </dl>
          )}
        </motion.div>
      </motion.article>
    </Reveal>
  );
}

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
          <span className="label text-caramel">Services</span>
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
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observe each image — the one most centered drives the heading
  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    itemRefs.current[i] = el;
  };

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

  // IntersectionObserver wired in effect via callback ref pattern
  useScrollObserver(itemRefs, setActiveIdx);

  const active = items[activeIdx] ?? items[0];

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
          {/* Sticky left heading */}
          <div className="md:col-span-5">
            <div className="sticky top-32">
              <p className="label mb-4 text-caramel">
                Project {String(activeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="display text-[clamp(2.25rem,5vw,4.25rem)] text-espresso">
                    {active?.title}
                  </h3>
                  <p className="label mt-3 normal-case tracking-normal text-brown">
                    {active?.location}{active?.year && active.year !== "—" ? ` · ${active.year}` : ""}
                  </p>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-brown text-pretty">
                    {active?.description}
                  </p>
                  {active?.materials && active.materials.length > 0 && (
                    <dl className="mt-6 border-t border-sand pt-5">
                      <dt className="label mb-2 text-caramel">Materials</dt>
                      <dd className="flex flex-wrap gap-2">
                        {active.materials.map((m) => (
                          <span key={m} className="label border border-sand px-3 py-1 normal-case tracking-wider text-espresso">
                            {m}
                          </span>
                        ))}
                      </dd>
                    </dl>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right scrolling images, each a flip card */}
          <div className="space-y-12 md:col-span-7">
            {items.length === 0 && (
              <p className="font-display text-2xl text-brown">No projects yet in this category.</p>
            )}
            {items.map((p, i) => (
              <div key={p.id} ref={setRef(i)} data-idx={i}>
                <FlipCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* IntersectionObserver hook for the sticky-content-switch */
function useScrollObserver(
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  onActive: (i: number) => void,
) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose intersection ratio is highest and closest to centre
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) {
          const idx = Number((best.target as HTMLElement).dataset.idx);
          if (!Number.isNaN(idx)) onActive(idx);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-20% 0px -30% 0px" },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [refs, onActive]);
}

/* ─────────────────────────────────────────────────────────────────────── */

function FlipCard({ project }: { project: Project }) {
  return (
    <article className="relative w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6">
          <p className="label text-gold-lt">{project.category}</p>
          <h4 className="font-display text-2xl font-light text-cream md:text-3xl">{project.title}</h4>
        </div>
      </div>
    </article>
  );
}
