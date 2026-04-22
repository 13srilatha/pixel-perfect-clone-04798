import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import munny3d from "@/assets/projects/munny-3d.jpeg";

/**
 * "Behind the Render" — a scroll-driven storytelling card for the
 * featured in-progress project (Munny Residence).
 *
 * As the user scrolls past the section, four schematic layers cross-fade
 * over a card on the left while the project description sits on the right:
 *   01 PLAN  →  02 SKETCHUP (3D massing)  →  03 AUTOCAD (linework)  →  04 PALETTE
 *
 * No external assets — every layer is drawn with inline SVG so it loads
 * instantly and looks like real working drawings.
 */
export function MunnyInProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // 4 stages → opacity windows
  const stage = (i: number) => {
    const w = 1 / 4;
    const start = i * w;
    const end = start + w;
    return useTransform(
      scrollYProgress,
      [Math.max(0, start - 0.05), start + 0.02, end - 0.02, Math.min(1, end + 0.05)],
      [0, 1, 1, 0]
    );
  };

  const o1 = stage(0);
  const o2 = stage(1);
  const o3 = stage(2);
  const o4 = stage(3);

  const stageIndex = useTransform(scrollYProgress, (v) =>
    Math.min(3, Math.max(0, Math.floor(v * 4)))
  );
  const labelOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={trackRef}
      id="featured"
      className="relative bg-cream"
      style={{ height: "320vh" }}
      aria-label="Behind the render — Munny Residence"
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-6 md:grid-cols-12 md:gap-16 md:px-10">
          {/* Left: layered card */}
          <div className="relative md:col-span-7">
            <p className="label mb-4 text-caramel">— In Progress · Featured</p>

            <div className="relative aspect-[4/3] w-full overflow-hidden border border-sand bg-cream shadow-[0_30px_60px_-30px_rgba(60,40,20,0.25)]">
              {/* Subtle paper grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--espresso) 1px, transparent 1px), linear-gradient(90deg, var(--espresso) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* 01 PLAN */}
              <motion.div style={{ opacity: o1 }} className="absolute inset-0 flex items-center justify-center p-8">
                <PlanLayer />
                <CornerTag index={1} label="PLAN" />
              </motion.div>

              {/* 02 SKETCHUP */}
              <motion.div style={{ opacity: o2 }} className="absolute inset-0 flex items-center justify-center p-8">
                <SketchupLayer />
                <CornerTag index={2} label="SKETCHUP" />
              </motion.div>

              {/* 03 AUTOCAD */}
              <motion.div style={{ opacity: o3 }} className="absolute inset-0 flex items-center justify-center p-8">
                <AutocadLayer />
                <CornerTag index={3} label="AUTOCAD" />
              </motion.div>

              {/* 04 PALETTE */}
              <motion.div style={{ opacity: o4 }} className="absolute inset-0 flex items-center justify-center p-8">
                <PaletteLayer />
                <CornerTag index={4} label="PALETTE" />
              </motion.div>

              {/* Bottom caption strip */}
              <motion.div
                style={{ opacity: labelOpacity }}
                className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-cream via-cream/90 to-transparent p-6"
              >
                <div>
                  <p className="label text-caramel">Behind the Render</p>
                  <p className="font-display text-base italic text-espresso">
                    Scroll to see plan, SketchUp, AutoCAD &amp; palette
                  </p>
                </div>
                <StageDots active={stageIndex} />
              </motion.div>
            </div>
          </div>

          {/* Right: project meta */}
          <div className="md:col-span-5 md:pt-12">
            <p className="label mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-caramel" />
              Currently on the boards
            </p>
            <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-espresso">
              Munny <em className="italic text-caramel">Residence</em>
            </h2>
            <p className="mt-2 font-display text-lg italic text-brown">Chandigarh, India</p>

            <p className="mt-6 max-w-md text-base leading-relaxed text-brown">
              A three-storey contemporary home composed in stone, wood and glass.
              Cantilevered volumes wrap around a private courtyard and a stepped roof terrace.
            </p>

            <div className="mt-8 border-t border-sand pt-6">
              <p className="label mb-3 text-caramel">In the making with</p>
              <ul className="flex flex-wrap gap-2">
                {["Dholpur sandstone", "Walnut veneer", "Low-iron glass", "Patinated brass"].map((m) => (
                  <li
                    key={m}
                    className="label border border-sand px-3 py-1 normal-case tracking-wider text-espresso"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 hidden items-center gap-4 md:flex">
              <span className="label text-caramel">Render</span>
              <span className="h-px flex-1 bg-sand" />
              <span className="label text-caramel">Build</span>
            </div>

            {/* Final reveal: the real render */}
            <motion.div style={{ opacity: o4 }} className="mt-6 hidden md:block">
              <img
                src={munny3d}
                alt="Munny Residence — final render"
                className="h-32 w-full border border-sand object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── stage chrome ────────────────────────── */

function CornerTag({ index, label }: { index: number; label: string }) {
  return (
    <>
      <span className="label absolute left-4 top-4 text-caramel">0{index}</span>
      <span className="label absolute right-4 top-4 text-caramel">{label}</span>
    </>
  );
}

function StageDots({ active }: { active: ReturnType<typeof useTransform<number, number>> }) {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-6 bg-sand"
          style={{
            backgroundColor: useTransform(active, (v) => (v === i ? "var(--espresso)" : "var(--sand)")),
          }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────── stage layers ────────────────────────── */

function PlanLayer() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" stroke="var(--espresso)" fill="none" strokeWidth={1.4}>
      {/* outer wall */}
      <rect x="40" y="40" width="320" height="220" />
      {/* inner partitions (a 4-room plan around a courtyard) */}
      <line x1="200" y1="40" x2="200" y2="140" />
      <line x1="200" y1="180" x2="200" y2="260" />
      <line x1="40" y1="150" x2="170" y2="150" />
      <line x1="230" y1="150" x2="360" y2="150" />
      {/* courtyard */}
      <rect x="170" y="130" width="60" height="50" strokeDasharray="3 3" />
      {/* door swings */}
      <path d="M 80 150 a 20 20 0 0 1 20 -20" />
      <path d="M 320 150 a 20 20 0 0 0 -20 -20" />
      {/* dimensions */}
      <line x1="40" y1="280" x2="360" y2="280" strokeDasharray="2 4" />
      <text x="200" y="295" textAnchor="middle" fontSize="9" fill="var(--caramel)" stroke="none" letterSpacing="2">
        18.4 M
      </text>
    </svg>
  );
}

function SketchupLayer() {
  // Axonometric massing of three stacked volumes
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" stroke="var(--espresso)" strokeWidth={1.4} fill="none">
      {/* ground floor */}
      <polygon points="80,210 240,210 290,180 130,180" fill="rgba(180,140,90,0.18)" />
      <polygon points="240,210 240,150 290,120 290,180" fill="rgba(120,80,50,0.22)" />
      <polygon points="80,210 80,150 240,150 240,210" fill="rgba(220,200,170,0.25)" />

      {/* first floor (offset) */}
      <polygon points="100,150 260,150 310,120 150,120" fill="rgba(180,140,90,0.18)" />
      <polygon points="260,150 260,90 310,60 310,120" fill="rgba(120,80,50,0.22)" />
      <polygon points="100,150 100,90 260,90 260,150" fill="rgba(220,200,170,0.25)" />

      {/* roof terrace */}
      <polygon points="140,90 240,90 290,60 190,60" fill="rgba(180,140,90,0.18)" />
      <polygon points="140,90 140,70 240,70 240,90" fill="rgba(220,200,170,0.25)" />

      {/* windows */}
      <line x1="120" y1="170" x2="120" y2="195" />
      <line x1="160" y1="170" x2="160" y2="195" />
      <line x1="200" y1="170" x2="200" y2="195" />
      <line x1="140" y1="110" x2="140" y2="135" />
      <line x1="180" y1="110" x2="180" y2="135" />
      <line x1="220" y1="110" x2="220" y2="135" />
    </svg>
  );
}

function AutocadLayer() {
  // Technical elevation linework
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" stroke="var(--espresso)" strokeWidth={1} fill="none">
      {/* ground line */}
      <line x1="20" y1="240" x2="380" y2="240" strokeWidth={1.6} />
      {/* building outline */}
      <rect x="60" y="100" width="280" height="140" />
      {/* floor lines */}
      <line x1="60" y1="146" x2="340" y2="146" strokeDasharray="4 3" />
      <line x1="60" y1="192" x2="340" y2="192" strokeDasharray="4 3" />
      {/* window grid */}
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={`w1-${i}`} x={80 + i * 52} y={110} width={36} height={26} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={`w2-${i}`} x={80 + i * 52} y={156} width={36} height={26} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={`w3-${i}`} x={80 + i * 52} y={202} width={36} height={26} />
      ))}
      {/* dim lines */}
      <line x1="60" y1="80" x2="340" y2="80" />
      <line x1="60" y1="76" x2="60" y2="84" />
      <line x1="340" y1="76" x2="340" y2="84" />
      <text x="200" y="74" textAnchor="middle" fontSize="9" fill="var(--caramel)" stroke="none" letterSpacing="2">
        22.0 M
      </text>
      {/* level tags */}
      <text x="350" y="150" fontSize="8" fill="var(--caramel)" stroke="none">+3.6</text>
      <text x="350" y="196" fontSize="8" fill="var(--caramel)" stroke="none">+7.2</text>
      <text x="350" y="106" fontSize="8" fill="var(--caramel)" stroke="none">+10.8</text>
    </svg>
  );
}

function PaletteLayer() {
  const swatches: { c: string; name: string }[] = [
    { c: "#F1E9DA", name: "Lime wash" },
    { c: "#D9C4A1", name: "Sandstone" },
    { c: "#A47148", name: "Walnut" },
    { c: "#6B3F22", name: "Teak" },
    { c: "#3B2316", name: "Espresso" },
    { c: "#C99B5E", name: "Brass" },
  ];
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-3 p-2">
      {swatches.map((s) => (
        <div key={s.name} className="relative flex flex-col">
          <div className="flex-1 border border-sand" style={{ backgroundColor: s.c }} />
          <p className="label mt-2 text-espresso">{s.name}</p>
        </div>
      ))}
    </div>
  );
}
