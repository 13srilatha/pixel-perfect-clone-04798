// import { useEffect, useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import heroImg from "@/assets/testimonials-hero.jpg";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// const testimonials = [
//   {
//     quote: "They listened more than they spoke. Our home feels like the version of us we couldn't put into words.",
//     name: "Charry Reddy",
//     title: "Homeowner · Jubilee Hills",
//   },
//   {
//     quote: "Every drawing came back with care. The site team treated our half-built house like their own.",
//     name: "Muthyam Rao",
//     title: "Client · Kompally Residence",
//   },
//   {
//     quote: "We changed our mind a hundred times. Vaasanthi never lost patience — and the result is perfect.",
//     name: "Aparna Iyer",
//     title: "Client · Kondapur Villa",
//   },
//   {
//     quote: "Honest, warm, and exact. They drew exactly what we needed — nothing more, nothing less.",
//     name: "Naveen K.",
//     title: "Client · Gachibowli Home",
//   },
//   {
//     quote: "Our café finally feels like a place people want to linger. That was the brief — and they nailed it.",
//     name: "Priya & Rahul",
//     title: "Owners · Brew House",
//   },
// ];

// const PANELS = testimonials.length; // 5

// /**
//  * One single image fills the screen as 5 perfectly seamless vertical slices.
//  * On scroll, each slice flips IN PLACE on its Y-axis (staggered) to reveal
//  * a client testimonial. No translation, no gaps — they sit flush throughout.
//  */
// export function Testimonials() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const innerRef = useRef<(HTMLDivElement | null)[]>([]);

//   useIso(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const ctx = gsap.context(() => {
//       const inners = innerRef.current.filter(Boolean) as HTMLDivElement[];
//       gsap.set(inners, { rotationY: 0 });

//       gsap.to(inners, {
//         rotationY: 180,
//         ease: "power2.inOut",
//         stagger: 0.18,
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: "+=250%",
//           scrub: 1.1,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       id="testimonials"
//       ref={sectionRef}
//       className="relative bg-cream"
//       aria-label="Client testimonials"
//     >
//       <div className="relative h-screen w-full overflow-hidden">
//         {/* Heading */}
//         <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-8 md:px-10 md:pt-12">
//           <p className="label mb-3 inline-flex items-center gap-3">
//             <span className="h-px w-10 bg-caramel" />
//             Client Words
//           </p>
//           <h2 className="display max-w-3xl text-[clamp(2rem,5vw,4rem)] text-espresso">
//             What our clients <em className="italic text-caramel">remember</em>.
//           </h2>
//         </div>

//         {/* 5 flush panels — desktop horizontal, mobile vertical */}
//         <div className="absolute inset-0 flex flex-col md:flex-row">
//           {testimonials.map((t, i) => (
//             <div
//               key={t.name}
//               className="relative h-1/5 w-full md:h-full md:w-1/5"
//               style={{ perspective: "2400px" }}
//             >
//               <div
//                 ref={(el) => { innerRef.current[i] = el; }}
//                 className="relative h-full w-full"
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 {/* FRONT — slice of single image */}
//                 <div
//                   className="absolute inset-0 overflow-hidden bg-sand"
//                   style={{
//                     backfaceVisibility: "hidden",
//                     WebkitBackfaceVisibility: "hidden",
//                   }}
//                 >
//                   {/* Desktop: vertical slices. Mobile: horizontal slices. */}
//                   <div
//                     className="absolute inset-0 hidden bg-no-repeat md:block"
//                     style={{
//                       backgroundImage: `url(${heroImg})`,
//                       backgroundSize: `${PANELS * 100}% 100%`,
//                       backgroundPosition: `${(i / (PANELS - 1)) * 100}% center`,
//                     }}
//                     aria-hidden
//                   />
//                   <div
//                     className="absolute inset-0 bg-no-repeat md:hidden"
//                     style={{
//                       backgroundImage: `url(${heroImg})`,
//                       backgroundSize: `100% ${PANELS * 100}%`,
//                       backgroundPosition: `center ${(i / (PANELS - 1)) * 100}%`,
//                     }}
//                     aria-hidden
//                   />
//                 </div>

//                 {/* BACK — testimonial */}
//                 <div
//                   className="absolute inset-0 flex flex-col justify-between bg-cream p-5 md:p-8"
//                   style={{
//                     backfaceVisibility: "hidden",
//                     WebkitBackfaceVisibility: "hidden",
//                     transform: "rotateY(180deg)",
//                     borderLeft: i === 0 ? undefined : "1px solid var(--sand)",
//                   }}
//                 >
//                   <p className="label text-caramel">0{i + 1}</p>
//                   <p className="font-display text-base italic leading-snug text-espresso md:text-lg lg:text-xl">
//                     “{t.quote}”
//                   </p>
//                   <div className="border-t border-sand pt-3">
//                     <p className="font-sans text-xs font-bold uppercase tracking-wide text-espresso">
//                       {t.name}
//                     </p>
//                     <p className="label mt-1 normal-case tracking-normal text-brown text-[10px]">
//                       {t.title}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/**
 * Testimonials.tsx — Terra Space Studio
 * NEW design: scroll-driven fullscreen quote spotlight.
 * Each testimonial pins to viewport while you scroll past it,
 * then fades to the next. Clean, editorial, no cards, no flip, no side-scroll.
 *
 * USAGE: Drop-in replacement. Keep the same import in index.tsx.
 *   import { Testimonials } from "@/components/site/Testimonials";
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    num: "01",
    quote: "They listened more than they spoke.",
    detail: "Our home feels like the version of us we couldn't put into words.",
    name: "Charry Reddy",
    title: "Homeowner · Jubilee Hills",
    tag: "Residential",
  },
  {
    num: "02",
    quote: "Every drawing came back with care.",
    detail: "The site team treated our half-built house like their own.",
    name: "Muthyam Rao",
    title: "Client · Kompally Residence",
    tag: "Architecture",
  },
  {
    num: "03",
    quote: "We changed our mind a hundred times.",
    detail: "Vaasanthi never lost patience — and the result is perfect.",
    name: "Aparna Iyer",
    title: "Client · Kondapur Villa",
    tag: "Interior Design",
  },
  {
    num: "04",
    quote: "Honest, warm, and exact.",
    detail: "They drew exactly what we needed — nothing more, nothing less.",
    name: "Naveen K.",
    title: "Client · Gachibowli Home",
    tag: "Renovation",
  },
  {
    num: "05",
    quote: "Our café finally feels like a place people want to linger.",
    detail: "That was the brief — and they nailed it.",
    name: "Priya & Rahul",
    title: "Owners · Brew House",
    tag: "Commercial",
  },
] as const;

const VH_PER = 120;  // 120vh per testimonial = smooth pace

/* ─── Component ─────────────────────────────────────────────────── */
export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const pct = total > 0 ? (scrolled / total) * 100 : 0;
        setScrollPct(pct);
        const idx = Math.min(
          TESTIMONIALS.length - 1,
          Math.floor((pct / 100) * TESTIMONIALS.length),
        );
        setActiveIdx(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("scroll", onScroll); };
  }, []);

  const t = TESTIMONIALS[activeIdx];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{ height: `${TESTIMONIALS.length * VH_PER}vh` }}
      aria-label="Client testimonials"
    >
      {/* Sticky container */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100svh", background: "#0f0d0a" }}
      >
        {/* Subtle texture — vertical rule lines */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.04,
          backgroundImage: "repeating-linear-gradient(90deg, rgba(181,147,74,1) 0px, rgba(181,147,74,1) 1px, transparent 1px, transparent 120px)",
        }} />

        {/* Section label — top */}
        <div style={{
          position: "absolute", top: "clamp(1.8rem,4vh,3rem)", left: "clamp(1.8rem,5vw,4rem)",
          zIndex: 20,
          display: "flex", alignItems: "center", gap: "0.75rem",
        }}>
          <span style={{ display: "block", width: 28, height: 1, background: "#B5934A" }} />
          <span style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.38em", color: "#B5934A", textTransform: "uppercase" }}>
            Client Words
          </span>
        </div>

        {/* Main testimonial content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", inset: 0, zIndex: 10,
              display: "flex", flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(1.8rem,6vw,5rem)",
              paddingTop: "clamp(5rem,10vh,8rem)",
            }}
          >
            {/* Giant quote mark */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              aria-hidden
              style={{
                display: "block",
                fontFamily: "'Cormorant Garamond','Cormorant',serif",
                fontSize: "clamp(6rem,14vw,12rem)",
                lineHeight: 0.7,
                color: "#B5934A",
                opacity: 0.18,
                marginBottom: "-0.2em",
                userSelect: "none",
              }}
            >
              "
            </motion.span>

            {/* Primary quote — word by word */}
            <div style={{ maxWidth: "min(900px, 92vw)" }}>
              <QuoteReveal
                text={t.quote}
                style={{
                  fontFamily: "'Cormorant Garamond','Cormorant',serif",
                  fontSize: "clamp(2rem,5.5vw,5rem)",
                  fontWeight: 300,
                  color: "#f5f0e8",
                  lineHeight: 1.1,
                  letterSpacing: "0.01em",
                  display: "block",
                  marginBottom: "clamp(0.8rem,2vh,1.4rem)",
                }}
              />

              {/* Detail line */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                style={{
                  fontFamily: "'Cormorant Garamond','Cormorant',serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem,2vw,1.5rem)",
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.6)",
                  lineHeight: 1.5,
                  maxWidth: "min(600px,88vw)",
                }}
              >
                {t.detail}
              </motion.p>
            </div>

            {/* Client name + rule */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{ marginTop: "clamp(2rem,4vh,3.5rem)", display: "flex", alignItems: "center", gap: "1.2rem" }}
            >
              <span style={{ display: "block", width: 40, height: 1, background: "#B5934A", opacity: 0.6 }} />
              <div>
                <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#f5f0e8", marginBottom: "0.25rem" }}>
                  {t.name}
                </p>
                <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(181,147,74,0.8)" }}>
                  {t.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Progress — bottom right ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "clamp(1.8rem,4vw,3.5rem)",
            bottom: "clamp(1.8rem,4vh,3rem)",
            zIndex: 20,
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.2rem",
          }}
        >
          {TESTIMONIALS.map((_, i) => {
            const active = i === activeIdx;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {active && (
                  <span style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(245,240,232,0.5)", textTransform: "uppercase" }}>
                    {TESTIMONIALS[i].tag}
                  </span>
                )}
                <span style={{
                  display: "block", width: 1,
                  height: active ? 30 : 12,
                  background: active ? "#B5934A" : "rgba(181,147,74,0.25)",
                  transition: "height 0.4s ease, background 0.4s ease",
                }} />
              </div>
            );
          })}
        </div>

        {/* ── Counter ── */}
        <p
          aria-hidden
          className="hidden md:block"
          style={{
            position: "absolute",
            left: "clamp(1.8rem,5vw,4rem)",
            bottom: "clamp(1.8rem,4vh,3rem)",
            zIndex: 20,
            fontFamily: "'Tenor Sans',sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.22em",
            color: "rgba(181,147,74,0.35)",
            pointerEvents: "none",
          }}
        >
          {String(activeIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(TESTIMONIALS.length).padStart(2, "0")}
        </p>

        {/* ── Mobile swipe hint (only shown at start of section) ── */}
        {scrollPct < 8 && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="md:hidden"
            style={{
              position: "absolute",
              bottom: "clamp(1.8rem,4vh,3rem)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              fontFamily: "'Tenor Sans',sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.28em",
              color: "rgba(181,147,74,0.5)",
              textTransform: "uppercase",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            Scroll through voices
          </motion.p>
        )}

      </div>
    </section>
  );
}

/* ─── Word reveal for the quote ────────────────────────────────── */
function QuoteReveal({ text, style }: { text: string; style: React.CSSProperties }) {
  const words = text.split(" ");
  return (
    <span style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}
  );
}
