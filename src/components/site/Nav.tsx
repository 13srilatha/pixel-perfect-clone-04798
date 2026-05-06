import { useScroll, useTransform, motion } from "framer-motion";
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

const _STORY_BEATS_UNUSED = [
  {
    chapter: "I",
    label: "Architecture · Interior · Planning",
    headline: "We build\nfor people\nwho stay.",
    sub: "Terra Space Studio — a residential architecture and interior practice in Hyderabad.",
    image: heroImg1,
  },
  {
    chapter: "II",
    label: "Residential",
    headline: "Every home is\na slow\nconversation.",
    sub: "We listen before we draw. Stone, wood, light — chosen for life, not for the listing photos.",
    image: heroImg2,
  },
  {
    chapter: "III",
    label: "Interior",
    headline: "Rooms that\nage with\nyou.",
    sub: "Built-in joinery, layered lighting, partitions drawn room by room.",
    image: heroImg3,
  },
  {
    chapter: "IV",
    label: "Process",
    headline: "From first\nsketch to\nhandover.",
    sub: "One studio, end to end. No handoffs, no surprises.",
    image: heroImg4,
  },
  {
    chapter: "V",
    label: "Terra Space Studio",
    headline: "Spaces that\nremember\nyou.",
    sub: "Begin a conversation →",
    image: heroImg5,
  },
];

function _UnusedHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const beatCount = _STORY_BEATS_UNUSED.length;

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

  const beat = STORY_BEATS[activeIdx];
  const textOpacity =
    subProgress < 0.12
      ? subProgress / 0.12
      : subProgress > 0.88
        ? Math.max(0, 1 - (subProgress - 0.88) / 0.12)
        : 1;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative"
      style={{ height: `${beatCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--espresso) 1px, transparent 1px), linear-gradient(90deg, var(--espresso) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Per-chapter imagery — crossfade with subtle Ken Burns */}
        {STORY_BEATS.map((b, i) => {
          const local = activeIdx + subProgress - i;
          let opacity = 0;
          if (local >= 0 && local < 1) {
            opacity = 1 - Math.max(0, local - 0.7) / 0.3;
          } else if (local < 0 && local > -0.3) {
            opacity = 1 + local / 0.3;
          }
          opacity = Math.max(0, Math.min(1, opacity)) * 0.7;
          const z = Math.max(-0.3, Math.min(1, local));
          const scale = 1.04 + (z + 0.3) * 0.1;
          return (
            <div
              key={i}
              className="pointer-events-none absolute inset-0"
              style={{ opacity, willChange: "opacity" }}
              aria-hidden
            >
              <img
                src={b.image}
                alt=""
                className="h-full w-full object-cover"
                style={{ transform: `scale(${scale})`, willChange: "transform" }}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/70 to-cream/40 md:from-cream/95 md:via-cream/60 md:to-cream/20" />
            </div>
          );
        })}

        {/* Chapter numeral — large, faint, in the background */}
        <div
          key={`ch-${activeIdx}`}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-display text-[28vw] font-light leading-none text-espresso/[0.06] md:right-10 md:text-[20vw]"
          style={{ opacity: textOpacity }}
        >
          {beat.chapter}
        </div>

        {/* Story text */}
        <div
          className="relative flex h-full flex-col justify-center px-6 md:px-10 lg:px-20"
          style={{ opacity: textOpacity, transition: "opacity 80ms linear" }}
        >
          <p className="label mb-6 flex items-center gap-3 text-caramel" key={`label-${activeIdx}`}>
            <span className="h-px w-8 bg-caramel" />
            <span>Chapter {beat.chapter}</span>
            <span className="text-caramel/50">·</span>
            <span>{beat.label}</span>
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
              className="block h-[2px] transition-all duration-300"
              style={{
                background: i === activeIdx ? "var(--espresso)" : "var(--sand)",
                width: i === activeIdx ? "32px" : "16px",
              }}
            />
          ))}
        </div>

        {/* First-beat scroll hint */}
        {activeIdx === 0 && (
          <div className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="label text-brown">Scroll the story</span>
            <span className="block h-10 w-px bg-espresso/40" />
          </div>
        )}
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
