import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { interiors } from "@/data/interiors";
import { Reveal } from "./Nav";

const CATEGORY_ORDER: ProjectCategory[] = ["Residential", "Interior", "Commercial", "Renovation"];

const CATEGORY_BLURB: Record<ProjectCategory, string> = {
  Residential: "Homes designed to age slowly with the families inside them.",
  Interior: "Joinery, partitions, lighting and built-ins — drawn for each home, crafted on site.",
  Commercial: "Workplaces, cafés and showrooms with the warmth of a private home.",
  Renovation: "Old buildings, listened to. Restored where possible, updated only where needed.",
};

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

export function SelectedWork() {
  const inProgress = useMemo(() => ALL_PROJECTS.find((p) => p.status === "in-progress"), []);
  const [openCategory, setOpenCategory] = useState<ProjectCategory | null>(null);

  return (
    <>
      {/* ───────────── What We Do ───────────── */}
      <section id="work" className="relative bg-cream pt-24 md:pt-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="label mb-4 inline-flex items-center gap-3 text-caramel">
              <span className="h-px w-10 bg-caramel" />
              What We Do
            </p>
            <h2 className="display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-espresso">
              From concept to <em className="italic text-caramel">completion.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brown">
              Complete end-to-end design and build solutions — clarity, craftsmanship, and care from the first idea to the final walkthrough.
            </p>
          </Reveal>
        </div>

        {/* Horizontal sticky-scroll category panels */}
        <HorizontalCategories onOpen={(c) => setOpenCategory(c)} />
      </section>

      {/* ───────────── Selected Work ───────────── */}
      <section id="selected-work" className="relative bg-cream pb-12 pt-24 md:pt-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="label mb-4 inline-flex items-center gap-3 text-caramel">
              <span className="h-px w-10 bg-caramel" />
              Selected Work
            </p>
            <h2 className="display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-espresso">
              Spaces that feel <em className="italic text-caramel">lived-in</em>
              <br />before they are lived in.
            </h2>
          </Reveal>
        </div>

        {inProgress && <FeaturedInProgress project={inProgress} />}
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

  const renderScale = useTransform(scrollYProgress, [0, 0.4, 0.75], [1.08, 1, 0.78]);
  const renderRotateX = useTransform(scrollYProgress, [0.35, 0.85], [0, -18]);
  const renderRotateZ = useTransform(scrollYProgress, [0.35, 0.85], [0, -4]);
  const renderTranslateY = useTransform(scrollYProgress, [0.35, 0.85], ["0%", "-18%"]);
  const renderOpacity = useTransform(scrollYProgress, [0.85, 0.98], [1, 0.4]);

  const planTranslateY = useTransform(scrollYProgress, [0.35, 0.75], ["80%", "0%"]);
  const planOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const planRotateX = useTransform(scrollYProgress, [0.35, 0.85], [22, 8]);

  const paletteX = useTransform(scrollYProgress, [0.55, 0.85], ["110%", "0%"]);
  const paletteOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  const stageLabelIdx = useTransform(scrollYProgress, (v) =>
    v < 0.45 ? 0 : v < 0.75 ? 1 : 2,
  );
  const [stageIdx, setStageIdx] = useState(0);
  useEffect(() => stageLabelIdx.on("change", (v) => setStageIdx(v as number)), [stageLabelIdx]);
  const STAGE_LABELS = ["Final Render", "Behind the Render", "Plans & Materials"];

  const palette = [
    { name: "Dholpur sandstone", hex: "#c9a07a" },
    { name: "Walnut veneer", hex: "#5a3a25" },
    { name: "Low-iron glass", hex: "#cfd9d6" },
    { name: "Patinated brass", hex: "#9a7b3f" },
  ];

  return (
    <div ref={ref} className="mx-auto mt-16 max-w-[1600px] px-6 md:px-10">
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-7" style={{ perspective: 1400 }}>
          <div
            className="relative aspect-[4/3] w-full overflow-hidden bg-sand/40"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Final render */}
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                scale: renderScale,
                rotateX: renderRotateX,
                rotateZ: renderRotateZ,
                y: renderTranslateY,
                opacity: renderOpacity,
                transformOrigin: "50% 100%",
              }}
            />

            {/* Sketch plan rises from below */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-cream"
              style={{
                y: planTranslateY,
                opacity: planOpacity,
                rotateX: planRotateX,
                transformOrigin: "50% 100%",
              }}
            >
              <SketchPlan />
            </motion.div>

            {/* Palette slides in from right */}
            <motion.div
              className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-md bg-espresso/85 p-3 backdrop-blur-sm md:bottom-6 md:right-6"
              style={{ x: paletteX, opacity: paletteOpacity }}
            >
              <p className="label text-gold">Palette</p>
              <div className="flex gap-2">
                {palette.map((p) => (
                  <div key={p.name} className="flex flex-col items-center gap-1">
                    <span
                      className="block h-8 w-8 rounded-sm border border-cream/30"
                      style={{ background: p.hex }}
                      title={p.name}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-espresso px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-gold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              In Progress
            </span>
            <span className="absolute right-4 top-4 bg-cream/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-espresso">
              Scroll · {STAGE_LABELS[stageIdx]}
            </span>
          </div>
        </div>

        <div className="md:col-span-5">
          <p className="label text-caramel">{project.category}</p>
          <h3 className="display mt-2 text-[clamp(2rem,3.5vw,3.5rem)] leading-tight text-espresso">{project.title}</h3>
          <p className="mt-2 text-sm text-brown/80">{project.location}</p>
          <p className="mt-6 text-base leading-relaxed text-brown">{project.description}</p>

          {project.materials && project.materials.length > 0 && (
            <div className="mt-8">
              <p className="label mb-3 text-caramel">In the making with</p>
              <ul className="flex flex-wrap gap-2">
                {project.materials.map((m) => (
                  <li key={m} className="border border-sand bg-cream px-3 py-1 text-xs text-espresso">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function HorizontalCategories({ onOpen }: { onOpen: (c: ProjectCategory) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // 4 panels, 100vw each → move from 0 to -75%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={trackRef} className="relative mt-16" style={{ height: `${CATEGORY_ORDER.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full" style={{ x, width: `${CATEGORY_ORDER.length * 100}vw` }}>
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

        {/* progress rail */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 bg-cream/90 px-4 py-2 backdrop-blur-sm">
          <span className="label text-caramel">Services</span>
          <motion.span
            className="block h-[2px] w-32 origin-left bg-caramel"
            style={{ scaleX: scrollYProgress }}
          />
          <span className="text-[10px] uppercase tracking-[0.22em] text-brown">
            {CATEGORY_ORDER.length} of {CATEGORY_ORDER.length}
          </span>
        </div>
      </div>
    </div>
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
  progress: MotionValue<number>;
}) {
  const items = ALL_PROJECTS.filter((p) => p.category === category);
  const center = index / Math.max(1, CATEGORY_ORDER.length - 1);
  const dist = useTransform(progress, (v) => Math.abs(v - center));
  const scale = useTransform(dist, [0, 0.4], [1, 0.92]);
  const opacity = useTransform(dist, [0, 0.4], [1, 0.55]);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      style={{ scale, opacity, width: "100vw" }}
      className="relative h-full flex-shrink-0 overflow-hidden text-left"
    >
      {/* Single hero cover image per category */}
      <div className="absolute inset-0">
        {items[0] ? (
          <img
            src={items[0].image}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.75) brightness(0.55)" }}
          />
        ) : (
          <div className="h-full w-full bg-espresso" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/30 to-espresso/60" />

      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-16">
        <div className="flex items-center justify-between">
          <p className="label text-gold">
            0{index + 1} · {items.length} project{items.length === 1 ? "" : "s"}
          </p>
          <span className="label text-cream/70">Tap to open gallery →</span>
        </div>

        <div className="max-w-3xl">
          <h3 className="display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-cream">
            {category}.
          </h3>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
            {CATEGORY_BLURB[category]}
          </p>
          <span className="mt-8 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-gold">
            <span className="label">Open the {category.toLowerCase()} gallery</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Gallery overlay — sticky-content-switch, NO flip                       */

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

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    itemRefs.current[i] = el;
  };

  // Freeze underlying page scroll
  useEffect(() => {
    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const prev = {
      bOverflow: bodyStyle.overflow,
      bPos: bodyStyle.position,
      bTop: bodyStyle.top,
      bWidth: bodyStyle.width,
      hOverflow: htmlStyle.overflow,
    };
    htmlStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    return () => {
      htmlStyle.overflow = prev.hOverflow;
      bodyStyle.overflow = prev.bOverflow;
      bodyStyle.position = prev.bPos;
      bodyStyle.top = prev.bTop;
      bodyStyle.width = prev.bWidth;
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };
  }, []);

  useScrollObserver(itemRefs, setActiveIdx);

  const active = items[activeIdx] ?? items[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] bg-cream"
    >
      <div className="flex h-14 items-center justify-between border-b border-sand bg-cream/95 px-6 backdrop-blur-md md:px-10">
        <p className="label text-caramel">
          {category} · {items.length} project{items.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="label flex items-center gap-2 text-espresso hover:text-caramel"
        >
          Close <span>✕</span>
        </button>
      </div>

      <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-6 py-10 md:grid-cols-12 md:gap-14 md:px-10">
          {/* Sticky left heading */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <p className="label text-caramel">
                Project {String(activeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="display mt-3 text-[clamp(2rem,4vw,3.5rem)] leading-tight text-espresso">
                    {active?.title}
                  </h3>
                  <p className="mt-2 text-sm text-brown/80">
                    {active?.location}
                    {active?.year && active.year !== "—" ? ` · ${active.year}` : ""}
                  </p>
                  <p className="mt-6 text-base leading-relaxed text-brown">
                    {active?.description}
                  </p>
                  {active?.materials && active.materials.length > 0 && (
                    <div className="mt-6">
                      <p className="label mb-2 text-caramel">Materials</p>
                      <ul className="flex flex-wrap gap-2">
                        {active.materials.map((m) => (
                          <li key={m} className="border border-sand bg-cream px-3 py-1 text-xs text-espresso">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right scrolling images — no flip */}
          <div className="space-y-8 md:col-span-7">
            {items.length === 0 && (
              <p className="text-brown">No projects yet in this category.</p>
            )}
            {items.map((p, i) => (
              <div
                key={p.id}
                ref={setRef(i)}
                data-idx={i}
                className="group relative aspect-[4/3] w-full overflow-hidden bg-sand"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 to-transparent p-5">
                  <p className="label text-gold">{p.category}</p>
                  <p className="font-display text-2xl font-light text-cream">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function useScrollObserver(
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  onActive: (i: number) => void,
) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
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

/* Tiny SVG schematic floor plan — used behind the InProgress render */
function SketchPlan() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full p-6 text-espresso/70" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="20" y="20" width="360" height="260" />
      {/* rooms */}
      <line x1="180" y1="20" x2="180" y2="160" />
      <line x1="20" y1="160" x2="380" y2="160" />
      <line x1="260" y1="160" x2="260" y2="280" />
      <line x1="120" y1="160" x2="120" y2="280" />
      {/* door swings */}
      <path d="M180 60 a20 20 0 0 1 20 20" />
      <path d="M120 200 a20 20 0 0 1 20 20" />
      {/* furniture hints */}
      <rect x="40" y="40" width="100" height="40" />
      <rect x="40" y="180" width="60" height="60" />
      <rect x="200" y="40" width="120" height="60" />
      <rect x="280" y="180" width="80" height="60" />
      <circle cx="220" cy="220" r="14" />
      {/* labels */}
      <text x="60" y="110" fontSize="9" stroke="none" fill="currentColor" letterSpacing="2">LIVING</text>
      <text x="220" y="130" fontSize="9" stroke="none" fill="currentColor" letterSpacing="2">DINING</text>
      <text x="40" y="260" fontSize="9" stroke="none" fill="currentColor" letterSpacing="2">KITCHEN</text>
      <text x="150" y="260" fontSize="9" stroke="none" fill="currentColor" letterSpacing="2">BED 1</text>
      <text x="290" y="260" fontSize="9" stroke="none" fill="currentColor" letterSpacing="2">BED 2</text>
    </svg>
  );
}
