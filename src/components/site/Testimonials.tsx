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
/**
 * Testimonials.tsx — Terra Space Studio
 * Scroll-driven spotlight quotes. One quote fills the screen at a time.
 * No flip cards. No side scroll. Each quote reveals word by word.
 */
/**
 * Testimonials.tsx — Terra Space Studio
 * Squish Scroll animation — exact mechanism from the Framer community file.
 *
 * HOW IT WORKS (from the source code):
 *   Each testimonial card has an outer wrapper div with a FIXED height (the "scroll territory").
 *   Inside it, a div that SHRINKS from fullHeight → 0 as you scroll past it.
 *   The inner div uses position:sticky so it stays visible while squishing.
 *   As one card squishes away, the next card underneath is revealed.
 *   Scroll back up → cards expand back. Full reversibility.
 *
 * RESULT: Cards appear to "squish" off the top as you scroll,
 *         revealing the next testimonial stacked underneath.
 */

import { useEffect, useRef, useCallback, ReactNode } from "react";

/* ─── Data ──────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    num: "01",
    tag: "Residential · Jubilee Hills",
    quote: "They listened more\nthan they spoke.",
    detail: "Our home feels like the version of us we couldn't put into words. Every room, every material — chosen.",
    name: "Charry Reddy",
    title: "Homeowner",
    bg: "#f5f0e8",   // cream
    text: "#2c1a0e", // espresso
    accent: "#B5934A",
  },
  {
    num: "02",
    tag: "Architecture · Kompally",
    quote: "Every drawing came\nback with care.",
    detail: "The site team treated our half-built house like their own. That kind of ownership is rare.",
    name: "Muthyam Rao",
    title: "Client",
    bg: "#0f0d0a",   // dark
    text: "#f5f0e8", // cream
    accent: "#B5934A",
  },
  {
    num: "03",
    tag: "Interior Design · Kondapur",
    quote: "We changed our mind\na hundred times.",
    detail: "Vaasanthi never lost patience — and the result is exactly what we always wanted but couldn't describe.",
    name: "Aparna Iyer",
    title: "Client",
    bg: "#1a1410",   // warm dark
    text: "#f5f0e8",
    accent: "#B5934A",
  },
  {
    num: "04",
    tag: "Renovation · Gachibowli",
    quote: "Honest, warm,\nand exact.",
    detail: "They drew exactly what we needed — nothing more, nothing less. That clarity is everything.",
    name: "Naveen K.",
    title: "Client",
    bg: "#f0ebe2",   // warm cream
    text: "#2c1a0e",
    accent: "#B5934A",
  },
  {
    num: "05",
    tag: "Commercial · Vijayawada",
    quote: "Our café finally feels like\na place people linger.",
    detail: "That was the brief. They understood it before we finished the sentence.",
    name: "Priya & Rahul",
    title: "Business Owners",
    bg: "#0a0a0a",
    text: "#f5f0e8",
    accent: "#B5934A",
  },
] as const;

/* ─── Squish section — EXACT mechanism from the Framer source ────── */
interface SquishSectionProps {
  children: ReactNode;
  fullHeight: number;
  index: number;
  isLast?: boolean;
}

function SquishSection({ children, fullHeight, index, isLast }: SquishSectionProps) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const lastProg  = useRef(0);

  const update = useCallback(() => {
    if (!outerRef.current || !innerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();

    // Progress: 0 when section top hits viewport top, 1 when fully squished
    let progress = 0;
    if (rect.top <= 0) {
      progress = Math.min(Math.abs(rect.top) / fullHeight, 1);
    }

    // Skip tiny changes (perf)
    if (Math.abs(progress - lastProg.current) < 0.0008) return;
    lastProg.current = progress;

    const currentH = Math.max(fullHeight * (1 - progress), 0);
    innerRef.current.style.height = `${currentH}px`;

    if (progress > 0 && progress < 1) {
      innerRef.current.style.position = "sticky";
      innerRef.current.style.top = "0px";
      innerRef.current.style.zIndex = String(10 + index);
    } else {
      innerRef.current.style.position = "static";
    }
  }, [fullHeight, index]);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    update(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    // Lenis fires native scroll events, so window listener covers it
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll, update]);

  return (
    <div
      ref={outerRef}
      style={{
        width: "100%",
        height: isLast ? "100vh" : `${fullHeight}px`, // last card doesn't squish
        flexShrink: 0,
        display: "block",
        // Overlap cards by 1px to avoid sub-pixel gaps
        marginTop: index > 0 ? "-1px" : 0,
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: "100%",
          height: `${fullHeight}px`,
          overflow: "hidden",
          display: "block",
          willChange: "height",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Individual testimonial card ───────────────────────────────── */
function TestimonialCard({
  t,
  cardHeight,
}: {
  t: (typeof TESTIMONIALS)[number];
  cardHeight: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: `${cardHeight}px`,
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(2.5rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── TOP ROW ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ display: "block", width: 22, height: 1, background: t.accent }} />
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "clamp(0.48rem, 0.9vw, 0.58rem)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: t.accent,
          }}>
            {t.tag}
          </span>
        </div>
        {/* Counter */}
        <span style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          color: `${t.text}40`,
        }}>
          {t.num} / 0{TESTIMONIALS.length}
        </span>
      </div>

      {/* ── CENTER QUOTE ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(1.5rem, 3vh, 3rem) 0" }}>
        {/* Big faint quotation mark */}
        <div
          aria-hidden
          style={{
            fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
            fontSize: "clamp(8rem, 18vw, 16rem)",
            lineHeight: 0.6,
            color: t.accent,
            opacity: 0.1,
            marginBottom: "-0.15em",
            userSelect: "none",
          }}
        >
          "
        </div>

        {/* Quote */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontSize: "clamp(2.4rem, 6vw, 6.5rem)",
          fontWeight: 300,
          lineHeight: 1.0,
          color: t.text,
          letterSpacing: "0.01em",
          whiteSpace: "pre-line",
          maxWidth: "min(900px, 88vw)",
          marginBottom: "clamp(1.2rem, 2.5vh, 2rem)",
        }}>
          {t.quote}
        </h2>

        {/* Supporting detail */}
        <p style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontStyle: "italic",
          fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
          fontWeight: 300,
          color: `${t.text}BB`,
          lineHeight: 1.55,
          maxWidth: "min(580px, 88vw)",
        }}>
          {t.detail}
        </p>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        {/* Client info */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ display: "block", width: 32, height: 1, background: t.accent, opacity: 0.6 }} />
          <div>
            <p style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: t.text,
              marginBottom: "0.2rem",
            }}>
              {t.name}
            </p>
            <p style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "clamp(0.5rem, 0.85vw, 0.6rem)",
              letterSpacing: "0.15em",
              color: t.accent,
            }}>
              {t.title}
            </p>
          </div>
        </div>

        {/* Terra branding mark */}
        <span style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontSize: "clamp(0.55rem, 1vw, 0.68rem)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: `${t.text}40`,
        }}>
          Terra
        </span>
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────────── */
export function Testimonials() {
  // 100vh card height — each card = full viewport
  const CARD_H = typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <section id="testimonials" aria-label="Client words">
      {/* Section heading — visible above the cards */}
      <div style={{
        background: "#f5f0e8",
        padding: "clamp(3rem, 6vh, 5rem) clamp(1.8rem, 5vw, 4rem) clamp(1.5rem, 3vh, 2.5rem)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}>
        <span style={{ display: "block", width: 28, height: 1, background: "#B5934A" }} />
        <span style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.38em",
          color: "#B5934A",
          textTransform: "uppercase",
        }}>
          Client Words
        </span>
        <span style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
          fontWeight: 300,
          color: "#2c1a0e",
          marginLeft: "1.5rem",
          letterSpacing: "0.01em",
        }}>
          What they say.
        </span>
      </div>

      {/* Squish stack */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {TESTIMONIALS.map((t, i) => (
          <SquishSection
            key={t.num}
            fullHeight={CARD_H}
            index={i}
            isLast={i === TESTIMONIALS.length - 1}
          >
            <TestimonialCard t={t} cardHeight={CARD_H} />
          </SquishSection>
        ))}
      </div>
    </section>
  );
}
