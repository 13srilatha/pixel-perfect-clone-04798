import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { studio } from "@/data/projects";
import { Logo } from "./Logo";
import heroBg from "@/assets/projects/project-1.jpeg";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Note: Interiors is now inside Work (Interior filter), so no separate link.
  // Reel is now inside the rotating-house section, no separate link.
  const links = [
    { href: "#work", label: "Work" },
    { href: "#process", label: "Before & After" },
    { href: "#testimonials", label: "Client Words" },
    { href: "#architect", label: "Architect" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top scroll progress rail */}
      <ScrollProgress />

      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-cream/85 backdrop-blur-md border-b border-sand" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" aria-label={studio.name}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label hover:text-espresso transition-colors">
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

const STORY_BEATS = [
  { label: "Architecture · Interior · Planning", headline: "We build\nfor people\nwho stay.", sub: null },
  { label: "Residential", headline: "Every home\nis a slow\nconversation.", sub: "We listen before we draw." },
  { label: "Interior", headline: "Rooms that\nage with\nyou.", sub: "Stone, wood and light — chosen for life, not the listing photos." },
  { label: "Process", headline: "From first\nsketch to\nhandover.", sub: "One studio, end to end. No handoffs, no surprises." },
  { label: "Terra Space Studio", headline: "Spaces that\nremember\nyou.", sub: "Begin a conversation →" },
];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const beatCount = STORY_BEATS.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [subProgress, setSubProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const raw = v * beatCount;
      const idx = Math.min(beatCount - 1, Math.floor(raw));
      setActiveIdx(idx);
      setSubProgress(raw - idx);
    });
  }, [scrollYProgress, beatCount]);

  const imageOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 0.55, 0.55, 0.3]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);

  const beat = STORY_BEATS[activeIdx];
  const textOpacity = subProgress < 0.15 ? subProgress / 0.15 : subProgress > 0.85 ? Math.max(0, 1 - (subProgress - 0.85) / 0.15) : 1;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative"
      style={{ height: `${beatCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">
        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "linear-gradient(var(--espresso) 1px, transparent 1px), linear-gradient(90deg, var(--espresso) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Full-bleed background image */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: imageOpacity }}
        >
          <motion.img
            src={heroBg}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            style={{ scale: imageScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/20 to-cream/50" />
        </motion.div>

        {/* Story text */}
        <div
          className="relative flex h-full flex-col justify-center px-6 md:px-10 lg:px-20"
          style={{ opacity: textOpacity, transition: "opacity 80ms linear" }}
        >
          <p className="label mb-6 flex items-center gap-3 text-caramel" key={`label-${activeIdx}`}>
            <span className="h-px w-8 bg-caramel" />
            {beat.label}
          </p>

          <h1
            key={`head-${activeIdx}`}
            className="display whitespace-pre-line text-[clamp(3.5rem,10vw,10rem)] leading-[0.92] text-espresso"
          >
            {beat.headline}
          </h1>

          {beat.sub && (
            <p
              key={`sub-${activeIdx}`}
              className={`mt-8 max-w-md text-lg leading-relaxed text-brown ${beat.sub.includes("→") ? "cursor-pointer font-medium text-espresso hover:text-caramel transition-colors" : ""}`}
              onClick={beat.sub.includes("→") ? () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) : undefined}
            >
              {beat.sub}
            </p>
          )}
        </div>

        {/* Beat dots */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {STORY_BEATS.map((_, i) => (
            <span
              key={i}
              className="block h-[2px] w-6 transition-all duration-300"
              style={{ background: i === activeIdx ? "var(--espresso)" : "var(--sand)", width: i === activeIdx ? "32px" : "16px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
// export function Hero() {
//   return (
//     <section
//       id="top"
//       className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream pt-24"
//     >
//       <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
//         <div
//           className="h-full w-full"
//           style={{
//             backgroundImage:
//               "linear-gradient(var(--espresso) 1px, transparent 1px), linear-gradient(90deg, var(--espresso) 1px, transparent 1px)",
//             backgroundSize: "80px 80px",
//           }}
//         />
//       </div>

//       {/* Soft background image — partitioned right side, low focus, makes the
//           architecture practice obvious at a glance. */}
//       <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] md:block">
//         <img
//           src={heroBg}
//           alt=""
//           aria-hidden
//           className="h-full w-full object-cover opacity-[0.55]"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/55 to-transparent" />
//       </div>
//       {/* Mobile: same image as a soft band below the text */}
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] md:hidden">
//         <img src={heroBg} alt="" aria-hidden className="h-full w-full object-cover opacity-30" />
//         <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/70 to-transparent" />
//       </div>

//       <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 py-12 md:grid-cols-12 md:px-10 md:py-24">
//         <div className="md:col-span-8">
//           <p className="label mb-8 inline-flex flex-wrap items-center gap-3 text-base md:text-lg">
//             <span className="h-px w-10 bg-caramel" />
//             <span className="text-espresso">Architecture</span>
//             <span className="text-caramel">·</span>
//             <span className="text-espresso">Interior</span>
//             <span className="text-caramel">·</span>
//             <span className="text-espresso">Planning</span>
//           </p>

//           <h1 className="display text-[clamp(3rem,9vw,9.5rem)] text-espresso text-balance">
//             Spaces that
//             <br />
//             <em className="font-light italic text-caramel">remember</em> you.
//           </h1>

//           <p className="mt-10 max-w-xl text-lg leading-relaxed text-brown text-pretty">
//             We are <strong className="font-normal text-espresso">{studio.name}</strong> — a
//             residential architecture and interior design practice based in {studio.city}.
//           </p>
//         </div>
//       </div>

//       <ScrollHint />
//     </section>
//   );
// }

// function ScrollHint() {
//   return (
//     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
//       <span className="label">Scroll</span>
//       <span className="block h-12 w-px overflow-hidden bg-sand">
//         <span
//           className="block h-1/2 w-full bg-espresso"
//           style={{ animation: "scrollLine 2s ease-in-out infinite" }}
//         />
//       </span>
//       <style>{`
//         @keyframes scrollLine {
//           0%   { transform: translateY(-100%); }
//           100% { transform: translateY(200%); }
//         }
//       `}</style>
//     </div>
//   );
// }

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
