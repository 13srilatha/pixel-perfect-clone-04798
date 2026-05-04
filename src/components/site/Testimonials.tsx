// import { useEffect, useRef, useState } from "react";
// import portrait from "@/assets/architect-portrait.jpeg";

// interface Testimonial {
//   quote: string;
//   name: string;
//   title: string;
// }

// const testimonials: Testimonial[] = [
//   {
//     quote:
//       "They listened more than they spoke. Our home feels like the version of us we couldn't put into words.",
//     name: "Charry Reddy",
//     title: "Homeowner · Jubilee Hills",
//   },
//   {
//     quote:
//       "Every drawing came back with care. The site team treated our half-built house like their own.",
//     name: "Muthyam Rao",
//     title: "Client · Kompally Residence",
//   },
//   {
//     quote:
//       "We changed our mind a hundred times. Vaasanthi never lost patience — and the result is honestly perfect.",
//     name: "Aparna Iyer",
//     title: "Client · Kondapur Villa",
//   },
//   {
//     quote:
//       "A studio that builds slowly, in the best way. Stone, wood, light — exactly the home we asked for.",
//     name: "Rohan Kapoor",
//     title: "Client · Banjara Hills",
//   },
// ];

// /**
//  * Client Words — sticky center portrait with cards that "fan out" from
//  * behind it as the user scrolls. Works on mobile, tablet and desktop:
//  * card distances are computed in vw so they scale with the viewport.
//  */
// export function Testimonials() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let raf = 0;
//     const onScroll = () => {
//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(() => {
//         const el = sectionRef.current;
//         if (!el) return;
//         const rect = el.getBoundingClientRect();
//         const vh = window.innerHeight;
//         const total = el.offsetHeight - vh;
//         const scrolled = Math.min(Math.max(-rect.top, 0), total);
//         const p = total > 0 ? scrolled / total : 0;
//         setProgress(p);
//       });
//     };
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, []);

//   // 0 → stacked behind portrait; 1 → fully fanned out
//   const fan = Math.min(1, Math.max(0, (progress - 0.15) / 0.55));

//   // Outer cards travel further than inner cards
//   const offsets = [-1, -0.5, 0.5, 1]; // multipliers
//   const rotations = [-9, -4, 4, 9];

//   return (
//     <section
//       id="testimonials"
//       ref={sectionRef}
//       className="relative bg-cream"
//       style={{ height: "260vh" }}
//       aria-label="Client testimonials"
//     >
//       <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-10 md:px-10">
//         <h2 className="display mb-6 text-center text-[clamp(2rem,5vw,4rem)] font-bold text-espresso md:mb-10">
//           Client <em className="italic text-caramel">Words</em>
//         </h2>

//         <div className="relative flex h-[68vh] w-full max-w-[1400px] items-center justify-center">
//           {/* Center portrait (4:5) — pinned */}
//           <div className="relative z-10 h-full w-[clamp(180px,28vw,360px)] overflow-hidden bg-sand shadow-xl">
//             <img
//               src={portrait}
//               alt="Founder"
//               className="h-full w-full object-cover"
//               style={{ aspectRatio: "4 / 5" }}
//             />
//           </div>

//           {/* Fanned-out cards */}
//           {testimonials.map((t, i) => {
//             const dir = offsets[i];
//             // Distance scales with viewport. Outer card travels 36vw, inner 18vw.
//             const distVw = dir * fan * 38;
//             const rotate = fan * rotations[i];
//             const opacity = Math.min(1, fan * 1.4);
//             const z = i === 0 || i === 3 ? 5 : 6;
//             return (
//               <article
//                 key={t.name}
//                 className="absolute left-1/2 top-1/2 w-[78vw] max-w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-sand bg-cream p-5 shadow-lg md:w-[260px] md:p-6"
//                 style={{
//                   transform: `translate(-50%, -50%) translateX(${distVw}vw) rotate(${rotate}deg)`,
//                   opacity,
//                   zIndex: z,
//                   transition: "opacity 200ms ease",
//                 }}
//               >
//                 <p className="font-display text-base italic leading-snug text-espresso md:text-lg">
//                   "{t.quote}"
//                 </p>
//                 <div className="mt-4 border-t border-sand pt-3">
//                   <p className="font-sans text-sm font-bold uppercase tracking-wide text-espresso">
//                     {t.name}
//                   </p>
//                   <p className="label mt-1 normal-case tracking-normal text-brown">{t.title}</p>
//                 </div>
//               </article>
//             );
//           })}
//         </div>

      
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/architect-portrait.jpeg";

const testimonials = [
  {
    quote: "They listened more than they spoke. Our home feels like the version of us we couldn't put into words.",
    name: "Charry Reddy",
    title: "Homeowner · Jubilee Hills",
  },
  {
    quote: "Every drawing came back with care. The site team treated our half-built house like their own.",
    name: "Muthyam Rao",
    title: "Client · Kompally Residence",
  },
  {
    quote: "We changed our mind a hundred times. Vaasanthi never lost patience — and the result is honestly perfect.",
    name: "Aparna Iyer",
    title: "Client · Kondapur Villa",
  },
  {
    quote: "A studio that builds slowly, in the best way. Stone, wood, light — exactly the home we asked for.",
    name: "Rohan Kapoor",
    title: "Client · Banjara Hills",
  },
];

// Ease out cubic — cards feel like they're being pulled apart, not pushed
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Cards start stacked, fan out from 20% scroll progress to 80%
  const rawFan = Math.min(1, Math.max(0, (progress - 0.15) / 0.6));
  const fan = easeOut(rawFan);

  // Mobile: smaller spread so cards don't bleed off screen
  const spreadVw = typeof window !== "undefined" && window.innerWidth < 768 ? 28 : 38;

  const config = [
    { dir: -1.0, rot: -10 },
    { dir: -0.48, rot: -4.5 },
    { dir:  0.48, rot:  4.5 },
    { dir:  1.0,  rot:  10 },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-cream"
      style={{ height: "280vh" }}
      aria-label="Client testimonials"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-10">
        <h2 className="display mb-6 text-center text-[clamp(2rem,5vw,4rem)] text-espresso md:mb-10">
          Client <em className="italic text-caramel">Words</em>
        </h2>

        <div className="relative flex h-[65vh] w-full max-w-[1400px] items-center justify-center">
          {/* Portrait — always on top */}
          <div className="relative z-20 h-full w-[clamp(160px,24vw,320px)] overflow-hidden bg-sand shadow-2xl">
            <img src={portrait} alt="Founder — Vaasanthi" className="h-full w-full object-cover" style={{ aspectRatio: "4/5" }} />
          </div>

          {/* Cards fan out */}
          {testimonials.map((t, i) => {
            const { dir, rot } = config[i];
            const x = dir * fan * spreadVw;
            const rotate = fan * rot;
            const opacity = Math.min(1, fan * 2);
            const scale = 0.88 + fan * 0.12;

            return (
              <article
                key={t.name}
                className="absolute left-1/2 top-1/2 w-[min(75vw,268px)] -translate-x-1/2 -translate-y-1/2 border border-sand bg-cream p-5 shadow-lg md:p-6"
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}vw) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex: i === 0 || i === 3 ? 5 : 6,
                  transition: "opacity 120ms linear",
                  willChange: "transform, opacity",
                }}
              >
                <p className="font-display text-base italic leading-snug text-espresso md:text-lg">
                  "{t.quote}"
                </p>
                <div className="mt-4 border-t border-sand pt-3">
                  <p className="font-sans text-sm font-bold uppercase tracking-wide text-espresso">{t.name}</p>
                  <p className="label mt-1 normal-case tracking-normal text-brown">{t.title}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
