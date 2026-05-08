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

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "They listened more than they spoke. Our home feels like the version of us we couldn't put into words.",
    name: "Charry Reddy",
    title: "Homeowner · Jubilee Hills",
    num: "01",
  },
  {
    quote: "Every drawing came back with care. The site team treated our half-built house like their own.",
    name: "Muthyam Rao",
    title: "Client · Kompally Residence",
    num: "02",
  },
  {
    quote: "We changed our mind a hundred times. Vaasanthi never lost patience — and the result is perfect.",
    name: "Aparna Iyer",
    title: "Client · Kondapur Villa",
    num: "03",
  },
  {
    quote: "Honest, warm, and exact. They drew exactly what we needed — nothing more, nothing less.",
    name: "Naveen K.",
    title: "Client · Gachibowli Home",
    num: "04",
  },
  {
    quote: "Our café finally feels like a place people want to linger. That was the brief — and they nailed it.",
    name: "Priya & Rahul",
    title: "Owners · Brew House",
    num: "05",
  },
];

// Final resting positions + rotations for each card (desktop)
const DESKTOP_FINAL: { x: string; y: string; rot: number }[] = [
  { x: "0%",    y: "0%",   rot: -3 },
  { x: "0%",    y: "0%",   rot:  2 },
  { x: "0%",    y: "0%",   rot: -1.5 },
  { x: "0%",    y: "0%",   rot:  2.5 },
  { x: "0%",    y: "0%",   rot: -2 },
];

/**
 * Card-deal testimonials.
 * Cards start stacked (like a deck at bottom-right) and fly into a grid
 * one by one when the section enters the viewport.
 */
export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dealt, setDealt] = useState(false);
  const [dealIndex, setDealIndex] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !dealt) {
          setDealt(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [dealt]);

  // Stagger each card deal
  useEffect(() => {
    if (!dealt) return;
    let i = 0;
    const id = setInterval(() => {
      setDealIndex(i);
      i++;
      if (i >= testimonials.length) clearInterval(id);
    }, 160);
    return () => clearInterval(id);
  }, [dealt]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-cream py-20 md:py-32 overflow-hidden"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Heading */}
        <div className="mb-14">
          <p className="label mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-caramel" />
            Client Words
          </p>
          <h2 className="display text-[clamp(2rem,5vw,4rem)] text-espresso">
            What our clients <em className="italic text-caramel">remember</em>.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brown">
            Five families, five stories — all handled with the same care, honesty and craft.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const isDealt = i <= dealIndex;
            const rot = DESKTOP_FINAL[i].rot;
            return (
              <div
                key={t.name}
                className="relative"
                style={{
                  // Last card spans 2 cols on lg to balance a 5-card grid
                  gridColumn: i === 4 ? "span 1 / span 1" : undefined,
                }}
              >
                <div
                  style={{
                    // Start: stacked at bottom-right corner of section, rotated like a deck
                    transform: isDealt
                      ? `rotate(${rot}deg) translateY(0px)`
                      : `rotate(${-8 + i * 2}deg) translateY(120px)`,
                    opacity: isDealt ? 1 : 0,
                    transition: isDealt
                      ? `transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0}ms, opacity 0.4s ease`
                      : "none",
                  }}
                  className="relative flex h-full flex-col justify-between border border-sand bg-cream p-7 shadow-sm md:p-8"
                >
                  {/* Quote mark */}
                  <span
                    className="pointer-events-none absolute right-5 top-4 select-none font-display text-6xl font-light leading-none text-sand"
                    aria-hidden
                  >
                    "
                  </span>

                  <div>
                    <p className="label mb-5 text-gold">{t.num}</p>
                    <p className="font-display text-xl italic leading-snug text-espresso md:text-2xl">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-8 border-t border-sand pt-5">
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-espresso">
                      {t.name}
                    </p>
                    <p className="label mt-1 normal-case tracking-normal text-brown text-[10px]">
                      {t.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
