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
            <p className="max-w-md text-base leading-relaxed text-brown text-pretty">
              Scroll horizontally through every category. Tap a panel to open the gallery — hover any image to read the materials and the why.
            </p>
          </Reveal>

          {inProgress && <FeaturedInProgress project={inProgress} />}
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

function FeaturedInProgress({ project }: { project: Project }) {
  // Pinned scroll-driven "behind the render" reveal — happens directly on the
  // Munny in-progress image. As the user scrolls through this section, the
  // final render fades and four drawing layers (plan, SketchUp, AutoCAD,
  // palette) drift in around the centre. Continue scrolling and they
  // re-assemble back into the final render.
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 0 → final render only
  // 0.25 → drawings start drifting out
  // 0.55 → fully exploded
  // 0.8  → reassembling
  // 1    → locked back to final
  const explode = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    [0, 0, 1, 0.15, 0],
  );
  const finalOpacity = useTransform(explode, [0, 0.5, 1], [1, 0.18, 0]);
  const finalScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.96, 1.02]);

  // Stage label switches with progress
  const stageLabel = useTransform(scrollYProgress, (v) => {
    if (v < 0.2) return "Final render";
    if (v < 0.45) return "Floor plan";
    if (v < 0.65) return "SketchUp · AutoCAD";
    if (v < 0.85) return "Material palette";
    return "Locked — built";
  });
  const [label, setLabel] = useState("Final render");
  useEffect(() => stageLabel.on("change", setLabel), [stageLabel]);

  return (
    <Reveal>
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: "320vh" }}
        aria-label="In progress — scroll to see the drawings behind the render"
      >
        <div className="sticky top-0 flex h-screen w-full items-center">
          <article className="relative grid h-full w-full gap-8 overflow-hidden border border-sand bg-cream/40 p-6 md:grid-cols-12 md:p-10">
            {/* LEFT — interactive image with scroll-driven layers */}
            <div className="relative md:col-span-7">
              <div className="relative h-full min-h-[60vh] w-full overflow-hidden bg-sand">
                {/* Final render — fades while drawings are out */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ opacity: finalOpacity, scale: finalScale }}
                />

                {/* Cream wash so SVG drawings read clearly when render fades */}
                <motion.div
                  className="absolute inset-0 bg-cream"
                  style={{ opacity: useTransform(explode, [0, 1], [0, 0.85]) }}
                />

                {/* Drawing layers (drift out from centre) */}
                <DrawingLayer explode={explode} dx="-32%" dy="-28%" rot={-5} tag="01" label="Plan">
                  <PlanSvg />
                </DrawingLayer>
                <DrawingLayer explode={explode} dx="32%" dy="-26%" rot={5} tag="02" label="SketchUp">
                  <SketchUpSvg />
                </DrawingLayer>
                <DrawingLayer explode={explode} dx="-30%" dy="28%" rot={-4} tag="03" label="AutoCAD">
                  <CadSvg />
                </DrawingLayer>
                <DrawingLayer explode={explode} dx="32%" dy="28%" rot={6} tag="04" label="Palette">
                  <PaletteSvg />
                </DrawingLayer>

                {/* In-progress chip + active stage chip */}
                <span className="label absolute left-4 top-4 z-10 bg-gold px-2 py-1 text-ink">
                  In Progress
                </span>
                <span className="label absolute right-4 top-4 z-10 border border-espresso/30 bg-cream/90 px-3 py-1 text-espresso backdrop-blur-sm">
                  {label}
                </span>

                {/* Scroll cue */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-5 md:p-6">
                  <div>
                    <p className="label text-gold-lt">Behind the render</p>
                    <p className="mt-1 font-display text-base font-light text-cream md:text-lg">
                      Scroll to see plan, SketchUp, AutoCAD & palette
                    </p>
                  </div>
                  <span className="label inline-flex items-center gap-2 border border-cream/60 bg-ink/40 px-3 py-2 text-cream backdrop-blur-sm">
                    Scroll <span aria-hidden>↓</span>
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — project copy + progress rail */}
            <div className="flex flex-col justify-between md:col-span-5">
              <div>
                <p className="label text-caramel">{project.category} · {project.year}</p>
                <h3 className="mt-3 font-display text-3xl font-light text-espresso md:text-5xl">{project.title}</h3>
                <p className="label mt-2 normal-case tracking-normal text-brown">{project.location}</p>
                <p className="mt-6 text-base leading-relaxed text-brown text-pretty">{project.description}</p>
              </div>

              {project.materials && project.materials.length > 0 && (
                <dl className="mt-6 border-t border-sand pt-5">
                  <dt className="label mb-3 text-caramel">In the making with</dt>
                  <dd className="flex flex-wrap gap-x-3 gap-y-2 font-display text-base font-light text-espresso">
                    {project.materials.map((m) => (
                      <span key={m} className="border border-sand px-3 py-1">{m}</span>
                    ))}
                  </dd>
                </dl>
              )}

              {/* Stage progress rail */}
              <div className="mt-8 flex items-center gap-4">
                <span className="label text-caramel">Render</span>
                <div className="relative h-px flex-1 bg-sand">
                  <motion.span
                    className="absolute left-0 top-0 block h-full bg-espresso"
                    style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                  />
                </div>
                <span className="label text-caramel">Built</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </Reveal>
  );
}

function DrawingLayer({
  explode,
  dx,
  dy,
  rot,
  tag,
  label,
  children,
}: {
  explode: ReturnType<typeof useTransform<number, number>>;
  dx: string;
  dy: string;
  rot: number;
  tag: string;
  label: string;
  children: React.ReactNode;
}) {
  const x = useTransform(explode, [0, 1], ["0%", dx]);
  const y = useTransform(explode, [0, 1], ["0%", dy]);
  const rotate = useTransform(explode, [0, 1], [0, rot]);
  const opacity = useTransform(explode, [0, 0.15, 1], [0, 1, 1]);
  const scale = useTransform(explode, [0, 1], [0.82, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ x, y, rotate, opacity, scale }}
    >
      <div className="relative w-[42%] max-w-[320px] border border-espresso/20 bg-cream/95 p-2 shadow-xl">
        <div className="aspect-[4/3] w-full overflow-hidden bg-cream">{children}</div>
        <div className="mt-1.5 flex items-center justify-between px-1">
          <p className="label text-[9px] text-caramel">{tag}</p>
          <p className="label text-[9px] text-espresso">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Inline SVG drawings ────────────────────────────────────────────── */

function PlanSvg() {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" stroke="currentColor" fill="none" strokeWidth="0.6" style={{ color: "var(--espresso)" }}>
      <rect x="10" y="10" width="140" height="100" />
      <line x1="10" y1="55" x2="150" y2="55" />
      <line x1="80" y1="10" x2="80" y2="110" />
      <rect x="14" y="14" width="62" height="37" fill="var(--sand)" fillOpacity="0.4" />
      <rect x="84" y="14" width="62" height="37" fill="var(--sand)" fillOpacity="0.25" />
      <rect x="14" y="59" width="62" height="47" fill="var(--sand)" fillOpacity="0.2" />
      <rect x="84" y="59" width="62" height="47" fill="var(--sand)" fillOpacity="0.35" />
      <path d="M40 55 a8 8 0 0 1 8 -8" />
      <path d="M110 55 a8 8 0 0 0 -8 -8" />
      <rect x="20" y="20" width="20" height="10" />
      <circle cx="115" cy="80" r="6" />
    </svg>
  );
}

function SketchUpSvg() {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" stroke="currentColor" fill="none" strokeWidth="0.7" style={{ color: "var(--espresso)" }}>
      <polygon points="40,80 100,80 120,68 60,68" fill="var(--sand)" fillOpacity="0.3" />
      <polygon points="40,80 40,40 60,28 60,68" fill="var(--sand)" fillOpacity="0.45" />
      <polygon points="100,80 100,40 120,28 120,68" fill="var(--sand)" fillOpacity="0.35" />
      <line x1="40" y1="40" x2="100" y2="40" />
      <line x1="60" y1="28" x2="120" y2="28" />
      <polygon points="40,40 100,40 120,28 60,28" fill="var(--caramel)" fillOpacity="0.35" />
      <rect x="48" y="50" width="10" height="14" />
      <rect x="78" y="50" width="10" height="14" />
    </svg>
  );
}

function CadSvg() {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" stroke="currentColor" fill="none" strokeWidth="0.4" style={{ color: "var(--espresso)" }}>
      <rect x="20" y="20" width="120" height="80" strokeWidth="0.7" />
      <line x1="20" y1="14" x2="140" y2="14" />
      <line x1="20" y1="12" x2="20" y2="16" />
      <line x1="140" y1="12" x2="140" y2="16" />
      <line x1="60" y1="20" x2="60" y2="100" strokeDasharray="2 1.5" />
      <line x1="100" y1="20" x2="100" y2="100" strokeDasharray="2 1.5" />
      <line x1="20" y1="60" x2="140" y2="60" strokeDasharray="2 1.5" />
      <pattern id="hatchInline" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="2" stroke="var(--caramel)" strokeWidth="0.3" />
      </pattern>
      <rect x="20" y="20" width="40" height="40" fill="url(#hatchInline)" stroke="none" />
    </svg>
  );
}

function PaletteSvg() {
  const swatches = [
    { c: "var(--cream)" },
    { c: "var(--sand)" },
    { c: "var(--caramel)" },
    { c: "var(--brown)" },
    { c: "var(--espresso)" },
    { c: "var(--gold)" },
  ];
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full">
      {swatches.map((s, i) => (
        <rect
          key={i}
          x={10 + (i % 3) * 48}
          y={12 + Math.floor(i / 3) * 50}
          width={42}
          height={40}
          fill={s.c}
          stroke="var(--espresso)"
          strokeWidth="0.3"
        />
      ))}
    </svg>
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
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observe each image — the one most centered drives the heading
  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    itemRefs.current[i] = el;
  };

  // Lock the page behind the modal so the background doesn't scroll while
  // the user is reading the gallery — the modal itself remains scrollable.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
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
      className="fixed inset-0 z-[60] overflow-y-auto bg-cream"
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
                  {active?.intent && (
                    <p className="mt-6 border-l-2 border-caramel pl-4 font-display text-lg italic text-espresso">
                      "{active.intent}"
                    </p>
                  )}
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
