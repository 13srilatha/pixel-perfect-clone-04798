import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Nav";
import featured from "@/assets/projects/munny-3d.jpeg";

/**
 * "Exploded view" assembly — pinned section.
 *
 * As the user scrolls down: the central project image is composed of layers
 * (plan, SketchUp wireframe, AutoCAD lines, materials, final render). They
 * "explode" outward into different directions, then on continued scroll fly
 * back together into the final completed work image.
 *
 * On scroll-up the same animation plays in reverse (driven entirely by
 * scrollYProgress, no JS state).
 *
 * Layers are drawn as inline SVG so we don't need extra image assets.
 */
export function ExplodedView() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 0   → assembled (final image only)
  // 0.2 → start exploding
  // 0.55→ fully exploded
  // 0.8 → reassembling
  // 1   → locked into final layout
  const explode = useTransform(scrollYProgress, [0.0, 0.2, 0.55, 0.8, 1.0], [0, 0, 1, 0.15, 0]);

  // Final image opacity: 1 at start, 0 while exploded, 1 again at end
  const finalOpacity = useTransform(explode, [0, 0.5, 1], [1, 0.25, 0]);
  const finalScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.96, 1.02]);

  return (
    <section
      ref={ref}
      className="relative bg-cream"
      style={{ height: "260vh" }}
      aria-label="Exploded view of a project"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 pt-12 md:px-10 md:pt-16">
          <Reveal className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label mb-3 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-caramel" />
                Behind the Drawing
              </p>
              <h2 className="display text-[clamp(2rem,5vw,4.5rem)] text-espresso">
                One render, <em className="italic text-caramel">five drawings</em>.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-brown text-pretty">
              Scroll to take the project apart — plan, SketchUp model, AutoCAD lines, materials. Keep scrolling and it locks back into the final house.
            </p>
          </Reveal>

          {/* Stage */}
          <div className="relative flex flex-1 items-center justify-center">
            <div className="relative aspect-[16/10] w-full max-w-[1100px]">
              {/* Final image (always rendered, opacity controlled) */}
              <motion.img
                src={featured}
                alt="Final completed render"
                className="absolute inset-0 h-full w-full object-cover shadow-2xl"
                style={{ opacity: finalOpacity, scale: finalScale }}
                loading="lazy"
              />

              {/* Layer 1 — Floor plan (top-left) */}
              <Layer
                explode={explode}
                offsetX="-55%"
                offsetY="-45%"
                rotate={-6}
                label="Floor Plan"
                tag="01"
              >
                <PlanSvg />
              </Layer>

              {/* Layer 2 — SketchUp wireframe (top-right) */}
              <Layer
                explode={explode}
                offsetX="55%"
                offsetY="-40%"
                rotate={5}
                label="SketchUp Massing"
                tag="02"
              >
                <SketchUpSvg />
              </Layer>

              {/* Layer 3 — AutoCAD lines + dimensions (bottom-left) */}
              <Layer
                explode={explode}
                offsetX="-55%"
                offsetY="48%"
                rotate={-4}
                label="AutoCAD · Dimensions"
                tag="03"
              >
                <CadSvg />
              </Layer>

              {/* Layer 4 — Material palette (bottom-right) */}
              <Layer
                explode={explode}
                offsetX="55%"
                offsetY="44%"
                rotate={6}
                label="Material Palette"
                tag="04"
              >
                <PaletteSvg />
              </Layer>

              {/* Layer 5 — Lighting study (centre, slight offset) */}
              <Layer
                explode={explode}
                offsetX="0%"
                offsetY="-65%"
                rotate={0}
                label="Light Study"
                tag="05"
              >
                <LightSvg />
              </Layer>
            </div>
          </div>

          {/* Bottom rail */}
          <div className="mt-8 flex items-center gap-4 pb-10 md:gap-8 md:pb-16">
            <span className="label text-caramel">Assembled</span>
            <div className="relative h-px flex-1 bg-sand">
              <motion.span
                className="absolute left-0 top-0 block h-full bg-espresso"
                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
            <span className="label text-caramel">Locked</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Layer({
  explode,
  offsetX,
  offsetY,
  rotate,
  label,
  tag,
  children,
}: {
  explode: ReturnType<typeof useTransform<number, number>>;
  offsetX: string;
  offsetY: string;
  rotate: number;
  label: string;
  tag: string;
  children: React.ReactNode;
}) {
  // Map [0,1] explode value to offsets and rotation
  const x = useTransform(explode, [0, 1], ["0%", offsetX]);
  const y = useTransform(explode, [0, 1], ["0%", offsetY]);
  const rot = useTransform(explode, [0, 1], [0, rotate]);
  const opacity = useTransform(explode, [0, 0.15, 1], [0, 1, 1]);
  const scale = useTransform(explode, [0, 1], [0.85, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ x, y, rotate: rot, opacity, scale }}
    >
      <div className="relative w-[58%] max-w-[460px] border border-espresso/15 bg-cream/95 p-3 shadow-xl backdrop-blur-sm md:w-[42%]">
        <div className="aspect-[4/3] w-full overflow-hidden bg-cream">{children}</div>
        <div className="mt-2 flex items-center justify-between">
          <p className="label text-caramel">{tag}</p>
          <p className="label text-espresso">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Inline SVG drawings (no extra image assets needed) ─────────────── */

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
      {/* doors */}
      <path d="M40 55 a8 8 0 0 1 8 -8" />
      <path d="M110 55 a8 8 0 0 0 -8 -8" />
      {/* furniture hints */}
      <rect x="20" y="20" width="20" height="10" />
      <circle cx="115" cy="80" r="6" />
      <text x="20" y="115" fontSize="4" fill="var(--caramel)" stroke="none">GROUND FLOOR · 1:100</text>
    </svg>
  );
}

function SketchUpSvg() {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" stroke="currentColor" fill="none" strokeWidth="0.7" style={{ color: "var(--espresso)" }}>
      {/* iso wireframe house */}
      <polygon points="40,80 100,80 120,68 60,68" fill="var(--sand)" fillOpacity="0.3" />
      <polygon points="40,80 40,40 60,28 60,68" fill="var(--sand)" fillOpacity="0.45" />
      <polygon points="100,80 100,40 120,28 120,68" fill="var(--sand)" fillOpacity="0.35" />
      <line x1="40" y1="40" x2="100" y2="40" />
      <line x1="60" y1="28" x2="120" y2="28" />
      {/* roof */}
      <polygon points="40,40 100,40 120,28 60,28" fill="var(--caramel)" fillOpacity="0.35" />
      {/* windows */}
      <rect x="48" y="50" width="10" height="14" />
      <rect x="78" y="50" width="10" height="14" />
      <rect x="108" y="46" width="6" height="12" />
      <text x="20" y="105" fontSize="4" fill="var(--caramel)" stroke="none">SKETCHUP MASSING · ISO</text>
    </svg>
  );
}

function CadSvg() {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" stroke="currentColor" fill="none" strokeWidth="0.4" style={{ color: "var(--espresso)" }}>
      <rect x="20" y="20" width="120" height="80" strokeWidth="0.7" />
      {/* dimension lines */}
      <line x1="20" y1="14" x2="140" y2="14" />
      <line x1="20" y1="12" x2="20" y2="16" />
      <line x1="140" y1="12" x2="140" y2="16" />
      <text x="76" y="11" fontSize="4" fill="var(--caramel)" stroke="none">12 000</text>
      <line x1="14" y1="20" x2="14" y2="100" />
      <line x1="12" y1="20" x2="16" y2="20" />
      <line x1="12" y1="100" x2="16" y2="100" />
      <text x="2" y="62" fontSize="4" fill="var(--caramel)" stroke="none" transform="rotate(-90 6 62)">8 000</text>
      {/* internal partitions */}
      <line x1="60" y1="20" x2="60" y2="100" strokeDasharray="2 1.5" />
      <line x1="100" y1="20" x2="100" y2="100" strokeDasharray="2 1.5" />
      <line x1="20" y1="60" x2="140" y2="60" strokeDasharray="2 1.5" />
      {/* hatch */}
      <pattern id="hatch" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="2" stroke="var(--caramel)" strokeWidth="0.3" />
      </pattern>
      <rect x="20" y="20" width="40" height="40" fill="url(#hatch)" stroke="none" />
      <text x="22" y="115" fontSize="4" fill="var(--caramel)" stroke="none">AUTOCAD · DIMENSIONED PLAN</text>
    </svg>
  );
}

function PaletteSvg() {
  const swatches = [
    { c: "var(--cream)", l: "Cream Lime" },
    { c: "var(--sand)", l: "Dholpur Sand" },
    { c: "var(--caramel)", l: "Walnut" },
    { c: "var(--brown)", l: "Burnt Teak" },
    { c: "var(--espresso)", l: "Espresso" },
    { c: "var(--gold)", l: "Brass" },
  ];
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" style={{ color: "var(--espresso)" }}>
      {swatches.map((s, i) => (
        <g key={s.l}>
          <rect
            x={10 + (i % 3) * 48}
            y={12 + Math.floor(i / 3) * 50}
            width={42}
            height={36}
            fill={s.c}
            stroke="var(--espresso)"
            strokeWidth="0.3"
          />
          <text
            x={10 + (i % 3) * 48}
            y={14 + Math.floor(i / 3) * 50 + 44}
            fontSize="3.4"
            fill="var(--espresso)"
          >
            {s.l}
          </text>
        </g>
      ))}
      <text x="10" y="115" fontSize="4" fill="var(--caramel)">MATERIAL PALETTE · TERRA</text>
    </svg>
  );
}

function LightSvg() {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" style={{ color: "var(--espresso)" }}>
      <defs>
        <radialGradient id="sun" cx="50%" cy="40%" r="40%">
          <stop offset="0%" stopColor="var(--gold-lt)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="160" height="120" fill="var(--cream)" />
      <circle cx="80" cy="50" r="40" fill="url(#sun)" />
      <line x1="80" y1="50" x2="20" y2="100" stroke="var(--gold)" strokeWidth="0.4" />
      <line x1="80" y1="50" x2="60" y2="110" stroke="var(--gold)" strokeWidth="0.4" />
      <line x1="80" y1="50" x2="100" y2="110" stroke="var(--gold)" strokeWidth="0.4" />
      <line x1="80" y1="50" x2="140" y2="100" stroke="var(--gold)" strokeWidth="0.4" />
      <rect x="30" y="80" width="100" height="30" fill="none" stroke="var(--espresso)" strokeWidth="0.5" />
      <text x="32" y="115" fontSize="4" fill="var(--caramel)">9 AM · 12 PM · 4 PM SUN STUDY</text>
    </svg>
  );
}
