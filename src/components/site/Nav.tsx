// import { useEffect, useRef, useState } from "react";
// import type { ReactNode } from "react";
// import { studio } from "@/data/projects";
// import { Logo } from "./Logo";
// import heroImg1 from "@/assets/walkthrough/02-facade.jpg";
// import heroImg2 from "@/assets/walkthrough/04-living.jpg";
// import heroImg3 from "@/assets/walkthrough/03-foyer.jpg";
// import heroImg4 from "@/assets/walkthrough/06-terrace.jpg";
// import heroImg5 from "@/assets/walkthrough/05-bedroom.jpg";

// export function Nav() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const links = [
//     { href: "#work", label: "Work" },
//     { href: "#process", label: "Before & After" },
//     { href: "#testimonials", label: "Client Words" },
//     { href: "#architect", label: "Architect" },
//     { href: "#contact", label: "Contact" },
//   ];

//   return (
//     <>
//       <ScrollProgress />
//       <nav
//         className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
//           scrolled ? "bg-cream/85 backdrop-blur-md border-b border-sand" : "bg-transparent"
//         }`}
//       >
//         <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
//           <a href="#top" aria-label={studio.name}>
//             <Logo />
//           </a>
//           <ul className="hidden items-center gap-8 md:flex">
//             {links.map((l) => (
//               <li key={l.href}>
//                 <a href={l.href} className={`label transition-colors ${scrolled ? "text-espresso hover:text-caramel" : "text-cream hover:text-gold"}`}>
//                   {l.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//           <a
//             href="#contact"
//             className={`label hidden border px-4 py-2 transition-colors md:inline-block ${
//               scrolled
//                 ? "border-espresso text-espresso hover:bg-espresso hover:text-cream"
//                 : "border-cream text-cream hover:bg-cream hover:text-espresso"
//             }`}
//           >
//             Begin a Project
//           </a>
//           <MobileMenu links={links} />
//         </div>
//       </nav>
//     </>
//   );
// }

// function ScrollProgress() {
//   const [p, setP] = useState(0);
//   useEffect(() => {
//     const onScroll = () => {
//       const h = document.documentElement;
//       const total = h.scrollHeight - h.clientHeight;
//       setP(total > 0 ? (h.scrollTop || window.scrollY) / total : 0);
//     };
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);
//   return (
//     <span
//       aria-hidden
//       className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
//       style={{ transform: `scaleX(${p})` }}
//     />
//   );
// }

// function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setOpen((v) => !v)}
//         className="md:hidden flex h-10 w-10 items-center justify-center"
//         aria-label="Menu"
//       >
//         <span className="relative block h-3 w-6">
//           <span className={`absolute left-0 top-0 h-px w-full bg-cream transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
//           <span className={`absolute left-0 top-[6px] h-px w-full bg-cream transition-transform duration-300 ${open ? "-rotate-45" : ""}`} />
//         </span>
//       </button>
//       <div
//         className={`fixed inset-x-0 top-[64px] z-40 origin-top bg-cream/95 backdrop-blur-md border-b border-sand transition-all duration-300 md:hidden ${
//           open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-0 opacity-0"
//         }`}
//       >
//         <ul className="flex flex-col gap-1 px-6 py-6">
//           {links.map((l) => (
//             <li key={l.href}>
//               <a
//                 href={l.href}
//                 onClick={() => setOpen(false)}
//                 className="block py-3 font-display text-2xl font-light text-espresso"
//               >
//                 {l.label}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────────────── */
// /* HERO — Accordion Slider (architecture storytelling)                     */
// /* ─────────────────────────────────────────────────────────────────────── */

// const HERO_PANELS = [
//   {
//     num: "01",
//     tag: "Residential",
//     title: "Homes built around\nhow you live.",
//     sub: "Architecture from first sketch to final handover — stone, wood and light, chosen for your family.",
//     chips: ["Concept", "Drawings", "Site"],
//     image: heroImg1,
//     target: "#work",
//   },
//   {
//     num: "02",
//     tag: "Interior",
//     title: "Joinery and light,\nroom by room.",
//     sub: "Built-in joinery, partitions, layered lighting and material palettes drawn for the way you actually live.",
//     chips: ["Joinery", "Lighting", "Palette"],
//     image: heroImg2,
//     target: "#work",
//   },
//   {
//     num: "03",
//     tag: "Commercial",
//     title: "Cafés and workplaces\nthat feel like home.",
//     sub: "The warmth of a private home, the performance of a professional space — for the people who spend the day there.",
//     chips: ["Cafés", "Workplaces", "Showrooms"],
//     image: heroImg3,
//     target: "#work",
//   },
//   {
//     num: "04",
//     tag: "Renovation",
//     title: "Old buildings,\nlistened to.",
//     sub: "Restored where possible, updated only where it serves the people inside today.",
//     chips: ["Restore", "Adapt", "Re-plan"],
//     image: heroImg4,
//     target: "#work",
//   },
//   {
//     num: "05",
//     tag: "Vastu & Planning",
//     title: "Site, orientation,\nflow.",
//     sub: "Designed before a single wall is drawn — so the home is right from the ground up.",
//     chips: ["Vastu", "Site study", "Massing"],
//     image: heroImg5,
//     target: "#contact",
//   },
// ];

// export function Hero() {
//   const [active, setActive] = useState(0);
//   const [paused, setPaused] = useState(false);

//   useEffect(() => {
//     if (paused) return;
//     const id = window.setInterval(() => {
//       setActive((v) => (v + 1) % HERO_PANELS.length);
//     }, 4500);
//     return () => window.clearInterval(id);
//   }, [paused]);

//   const onSelect = (i: number) => {
//     setActive(i);
//     setPaused(true);
//   };

//   return (
//     <section
//       id="top"
//       className="relative h-[100svh] w-full overflow-hidden bg-ink"
//       aria-label="Terra Space — services"
//       onMouseLeave={() => setPaused(false)}
//     >
//       <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-24 md:px-10 md:pt-28">
//         <p className="label flex items-center gap-3 text-cream/80">
//           <span className="h-px w-10 bg-gold" />
//           Terra Space Studio · Hyderabad
//         </p>
//         <p className="label hidden text-cream/60 md:block">
//           Hover or tap a panel
//         </p>
//       </div>

//       <div className="flex h-full w-full flex-col md:flex-row">
//         {HERO_PANELS.map((p, i) => {
//           const isActive = i === active;
//           return (
//             <button
//               key={p.num}
//               type="button"
//               onMouseEnter={() => onSelect(i)}
//               onFocus={() => onSelect(i)}
//               onClick={() => {
//                 onSelect(i);
//                 if (typeof document !== "undefined") {
//                   document.querySelector(p.target)?.scrollIntoView({ behavior: "smooth" });
//                 }
//               }}
//               className="group relative overflow-hidden border-cream/10 text-left outline-none transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:border-l first:md:border-l-0"
//               style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0 }}
//               aria-label={`${p.tag} — ${p.title.replace(/\n/g, " ")}`}
//             >
//               <img
//                 src={p.image}
//                 alt=""
//                 aria-hidden
//                 loading={i === 0 ? "eager" : "lazy"}
//                 className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out"
//                 style={{
//                   filter: isActive ? "saturate(1) brightness(0.85)" : "saturate(0.15) brightness(0.45)",
//                   transform: isActive ? "scale(1.04)" : "scale(1)",
//                 }}
//               />
//               <div
//                 className="absolute inset-0 transition-opacity duration-700"
//                 style={{
//                   background:
//                     "linear-gradient(to top, rgba(15,12,10,0.85) 0%, rgba(15,12,10,0.25) 45%, rgba(15,12,10,0.55) 100%)",
//                   opacity: isActive ? 1 : 0.85,
//                 }}
//               />

//               {/* Collapsed label */}
//               <div
//                 className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
//                 style={{ opacity: isActive ? 0 : 1 }}
//               >
//                 <div className="flex flex-col items-center gap-6">
//                   <span className="label text-gold">{p.num}</span>
//                   <span
//                     className="font-display text-base font-light uppercase tracking-[0.4em] text-cream md:text-lg"
//                     style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
//                   >
//                     {p.tag}
//                   </span>
//                 </div>
//               </div>

//               {/* Open content */}
//               <div
//                 className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-700 md:p-12"
//                 style={{
//                   opacity: isActive ? 1 : 0,
//                   transform: isActive ? "translateY(0)" : "translateY(24px)",
//                 }}
//               >
//                 <div className="mb-4 flex items-center gap-3">
//                   <span className="label text-gold">{p.num}</span>
//                   <span className="h-px w-8 bg-gold/60" />
//                   <span className="label text-cream/80">{p.tag}</span>
//                 </div>
//                 <h1 className="display whitespace-pre-line text-[clamp(2rem,4.6vw,4.5rem)] leading-[0.95] text-cream">
//                   {p.title}
//                 </h1>
//                 <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80 md:text-lg">
//                   {p.sub}
//                 </p>
//                 <div className="mt-6 flex flex-wrap gap-2">
//                   {p.chips.map((c) => (
//                     <span
//                       key={c}
//                       className="label border border-cream/30 px-3 py-1 normal-case tracking-wider text-cream/90"
//                     >
//                       {c}
//                     </span>
//                   ))}
//                 </div>
//                 <span className="mt-8 inline-flex items-center gap-2 text-cream group-hover:text-gold">
//                   <span className="label">Explore</span>
//                   <span className="transition-transform group-hover:translate-x-1">→</span>
//                 </span>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
//         {HERO_PANELS.map((_, i) => (
//           <span
//             key={i}
//             className="block h-[2px] transition-all duration-500"
//             style={{
//               background: i === active ? "var(--gold)" : "rgba(244,235,221,0.3)",
//               width: i === active ? "32px" : "14px",
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// export function Reveal({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: ReactNode;
//   className?: string;
//   delay?: number;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => el.classList.add("in"), delay);
//           obs.disconnect();
//         }
//       },
//       { threshold: 0.15 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [delay]);

//   return (
//     <div ref={ref} className={`reveal ${className}`}>
//       {children}
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { studio } from "@/data/projects";
import { Logo } from "./Logo";
import heroImg1 from "@/assets/walkthrough/02-facade.jpg";
import heroImg2 from "@/assets/walkthrough/04-living.jpg";
import heroImg3 from "@/assets/walkthrough/03-foyer.jpg";
import heroImg4 from "@/assets/walkthrough/06-terrace.jpg";
import heroImg5 from "@/assets/walkthrough/05-bedroom.jpg";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#work", label: "Work" },
    { href: "#process", label: "Before & After" },
    { href: "#testimonials", label: "Client Words" },
    { href: "#architect", label: "Architect" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <ScrollProgress />
      <nav
        className="fixed inset-x-0 top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" aria-label={studio.name}>
            <Logo />
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label text-espresso transition-colors hover:text-caramel">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="label hidden border border-espresso px-4 py-2 text-espresso transition-colors hover:bg-espresso hover:text-cream md:inline-block"
          >
            Begin a Project
          </a>
          <MobileMenu links={links} />
        </div>
      </nav>
    </>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop || window.scrollY) / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <span
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
      style={{ transform: `scaleX(${p})` }}
    />
  );
}

function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex h-10 w-10 items-center justify-center"
        aria-label="Menu"
      >
        <span className="relative block h-3 w-6">
          <span className={`absolute left-0 top-0 h-px w-full bg-espresso transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`absolute left-0 top-[6px] h-px w-full bg-espresso transition-transform duration-300 ${open ? "-rotate-45" : ""}`} />
        </span>
      </button>
      <div
        className={`fixed inset-x-0 top-[64px] z-40 origin-top bg-cream/95 backdrop-blur-md border-b border-sand transition-all duration-300 md:hidden ${
          open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-2xl font-light text-espresso"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* HERO — Accordion Slider (architecture storytelling)                     */
/* ─────────────────────────────────────────────────────────────────────── */

const HERO_PANELS = [
  {
    num: "01",
    tag: "Residential",
    title: "Homes built around\nhow you live.",
    sub: "Architecture from first sketch to final handover — stone, wood and light, chosen for your family.",
    chips: ["Concept", "Drawings", "Site"],
    image: heroImg1,
    target: "#work",
  },
  {
    num: "02",
    tag: "Interior",
    title: "Joinery and light,\nroom by room.",
    sub: "Built-in joinery, partitions, layered lighting and material palettes drawn for the way you actually live.",
    chips: ["Joinery", "Lighting", "Palette"],
    image: heroImg2,
    target: "#work",
  },
  {
    num: "03",
    tag: "Commercial",
    title: "Cafés and workplaces\nthat feel like home.",
    sub: "The warmth of a private home, the performance of a professional space — for the people who spend the day there.",
    chips: ["Cafés", "Workplaces", "Showrooms"],
    image: heroImg3,
    target: "#work",
  },
  {
    num: "04",
    tag: "Renovation",
    title: "Old buildings,\nlistened to.",
    sub: "Restored where possible, updated only where it serves the people inside today.",
    chips: ["Restore", "Adapt", "Re-plan"],
    image: heroImg4,
    target: "#work",
  },
  {
    num: "05",
    tag: "Vastu & Planning",
    title: "Site, orientation,\nflow.",
    sub: "Designed before a single wall is drawn — so the home is right from the ground up.",
    chips: ["Vastu", "Site study", "Massing"],
    image: heroImg5,
    target: "#contact",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % HERO_PANELS.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  const onSelect = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  // Mobile swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      setPaused(true);
      if (dx < 0) setActive((v) => (v + 1) % HERO_PANELS.length);
      else setActive((v) => (v - 1 + HERO_PANELS.length) % HERO_PANELS.length);
    }
  };

  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
      aria-label="Terra Space — services"
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden items-center justify-between px-10 pt-28 md:flex">
        <p className="label flex items-center gap-3 text-cream/80">
          <span className="h-px w-10 bg-gold" />
          Terra Space Studio · Hyderabad
        </p>
        <p className="label text-cream/60">
          Hover or tap a panel
        </p>
      </div>

      {/* ── MOBILE: full-screen stacked slides ── */}
      <div className="md:hidden absolute inset-0">
        {HERO_PANELS.map((p, i) => {
          const isActive = i === active;
          return (
            <div
              key={p.num}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
            >
              <img
                src={p.image}
                alt=""
                aria-hidden
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  filter: "saturate(1) brightness(0.75)",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                  transition: "transform 1.2s ease-out",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(15,12,10,0.92) 0%, rgba(15,12,10,0.2) 50%, rgba(15,12,10,0.5) 100%)",
                }}
              />
              {/* Content */}
              <div
                className="absolute inset-0 flex flex-col justify-end px-7 pb-28 transition-all duration-700"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(24px)",
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="label text-gold">{p.num}</span>
                  <span className="h-px w-8 bg-gold/60" />
                  <span className="label text-cream/80">{p.tag}</span>
                </div>
                <h1 className="font-display whitespace-pre-line text-[2.4rem] font-light leading-[0.95] text-cream">
                  {p.title}
                </h1>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-cream/80">
                  {p.sub}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <span key={c} className="label border border-cream/30 px-3 py-1 normal-case tracking-wider text-cream/90">
                      {c}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof document !== "undefined") {
                      document.querySelector(p.target)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="mt-7 inline-flex items-center gap-2 self-start border border-cream/40 px-5 py-2.5 text-cream active:bg-cream/10"
                >
                  <span className="label normal-case tracking-wider">Explore</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          );
        })}
        {/* Swipe hint */}
        <p className="pointer-events-none absolute bottom-[4.5rem] right-6 z-30 label text-cream/40">
          ← swipe →
        </p>
      </div>

      {/* ── DESKTOP: horizontal accordion ── */}
      <div className="hidden md:flex h-full w-full">
        {HERO_PANELS.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.num}
              type="button"
              onMouseEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              onClick={() => {
                onSelect(i);
                if (typeof document !== "undefined") {
                  document.querySelector(p.target)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group relative overflow-hidden border-cream/10 text-left outline-none transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] border-l first:border-l-0"
              style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0 }}
              aria-label={`${p.tag} — ${p.title.replace(/\n/g, " ")}`}
            >
              <img
                src={p.image}
                alt=""
                aria-hidden
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out"
                style={{
                  filter: isActive ? "saturate(1) brightness(0.85)" : "saturate(0.15) brightness(0.45)",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,12,10,0.85) 0%, rgba(15,12,10,0.25) 45%, rgba(15,12,10,0.55) 100%)",
                  opacity: isActive ? 1 : 0.85,
                }}
              />

              {/* Collapsed label */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: isActive ? 0 : 1 }}
              >
                <div className="flex flex-col items-center gap-6">
                  <span className="label text-gold">{p.num}</span>
                  <span
                    className="font-display text-base font-light uppercase tracking-[0.4em] text-cream md:text-lg"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {p.tag}
                  </span>
                </div>
              </div>

              {/* Open content */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-12 transition-all duration-700"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(24px)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="label text-gold">{p.num}</span>
                  <span className="h-px w-8 bg-gold/60" />
                  <span className="label text-cream/80">{p.tag}</span>
                </div>
                <h1 className="display whitespace-pre-line text-[clamp(2rem,4.6vw,4.5rem)] leading-[0.95] text-cream">
                  {p.title}
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80 md:text-lg">
                  {p.sub}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className="label border border-cream/30 px-3 py-1 normal-case tracking-wider text-cream/90"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-cream group-hover:text-gold">
                  <span className="label">Explore</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {HERO_PANELS.map((_, i) => (
          <span
            key={i}
            className="block h-[2px] transition-all duration-500"
            style={{
              background: i === active ? "var(--gold)" : "rgba(244,235,221,0.3)",
              width: i === active ? "32px" : "14px",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
