import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { studio } from "@/data/projects";
import { Logo } from "./Logo";
import heroFeature from "@/assets/hero-feature.jpg";

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
    { href: "#process", label: "Before to After" },
    { href: "#testimonials", label: "Happiness Speaks" },
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

const HERO_QUESTIONS = [
  { q: "Are you looking for a space to transform?", tag: "Spaces · Environments" },
  { q: "Are you designing interiors that go beyond the ordinary?", tag: "Interiors · Concepts" },
  { q: "Are you building something new from the ground up?", tag: "Ideas · Development" },
  { q: "Are you shaping a vision into reality?", tag: "Creative · Execution" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Phase 1 (0 → 0.5): three side-words slide together onto one line in the centre.
  // Phase 2 (0.5 → 1): image shifts right + blurs, questions fade in on the left.
  const phase1 = Math.min(1, p / 0.5);          // 0 → 1 over first half
  const phase2 = Math.max(0, (p - 0.5) / 0.5);  // 0 → 1 over second half

  // Word positions: ARCHITECTURE starts vertical-left, ends horizontal centre-left.
  // PLANNING starts vertical-right, ends horizontal centre-right.
  // INTERIOR stays in centre but moves down to the line.
  const archRotate = -90 + phase1 * 90;  // -90 → 0
  const planRotate = 90 - phase1 * 90;   // 90 → 0
  // Translate from sides to centre (computed in % of viewport via CSS calc)
  const archX = phase1 * 38;             // 0 → 38vw shift right
  const planX = -phase1 * 38;            // 0 → -38vw shift left
  const interiorY = phase1 * 40;         // moves down to align (vh)

  // Questions cycle based on phase2
  const questionIdx = Math.min(
    HERO_QUESTIONS.length - 1,
    Math.floor(phase2 * HERO_QUESTIONS.length),
  );
  const currentQ = HERO_QUESTIONS[questionIdx];

  // Image shift right + blur in phase 2
  const imgX = phase2 * 25;       // shifts right up to 25vw
  const imgBlur = phase2 * 6;     // 0 → 6px blur
  const imgScale = 1 - phase2 * 0.05;

  return (
    <section
      id="top"
      ref={ref}
      className="relative bg-cream"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Subtle architectural grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(var(--espresso) 1px, transparent 1px), linear-gradient(90deg, var(--espresso) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Feature image — centered, shifts right + blurs in phase 2 */}
        <div
          className="relative overflow-hidden shadow-2xl"
          style={{
            width: "min(70vw, 900px)",
            height: "min(60vh, 560px)",
            transform: `translateX(${imgX}vw) scale(${imgScale})`,
            filter: `blur(${imgBlur}px)`,
            transition: "transform 120ms linear, filter 120ms linear",
            borderRadius: "4px",
          }}
        >
          <img
            src={heroFeature}
            alt="Terra Space Studio — a residence at golden hour"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Three side words — converge to the same horizontal line on scroll */}
        <span
          className="pointer-events-none absolute left-4 top-1/2 origin-center font-display text-base font-light tracking-[0.45em] text-espresso md:left-8 md:text-2xl lg:text-3xl"
          style={{
            transform: `translate(${archX}vw, -50%) rotate(${archRotate}deg)`,
            opacity: 1 - phase2 * 0.85,
            transition: "transform 120ms linear, opacity 120ms linear",
          }}
        >
          ARCHITECTURE
        </span>
        <span
          className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 font-display text-base font-light tracking-[0.45em] text-espresso md:top-24 md:text-2xl lg:text-3xl"
          style={{
            transform: `translate(-50%, ${interiorY}vh)`,
            opacity: 1 - phase2 * 0.85,
            transition: "transform 120ms linear, opacity 120ms linear",
          }}
        >
          INTERIOR
        </span>
        <span
          className="pointer-events-none absolute right-4 top-1/2 origin-center font-display text-base font-light tracking-[0.45em] text-espresso md:right-8 md:text-2xl lg:text-3xl"
          style={{
            transform: `translate(${planX}vw, -50%) rotate(${planRotate}deg)`,
            opacity: 1 - phase2 * 0.85,
            transition: "transform 120ms linear, opacity 120ms linear",
          }}
        >
          PLANNING
        </span>

        {/* Rotating questions — fade in on the LEFT as image moves right (phase 2) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-full max-w-[640px] flex-col justify-center px-6 md:px-12"
          style={{ opacity: phase2 }}
        >
          <p className="label mb-4 inline-flex items-center gap-3 text-caramel">
            <span className="h-px w-10 bg-caramel/70" />
            {currentQ.tag}
          </p>
          <h1 className="display text-[clamp(1.75rem,4.5vw,3.75rem)] text-espresso text-balance">
            {currentQ.q}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-brown md:text-base">
            We are <strong className="font-normal text-espresso">{studio.name}</strong> — a
            residential architecture and interior design practice based in {studio.city}.
          </p>
          {/* progress dots */}
          <div className="mt-6 flex items-center gap-2">
            {HERO_QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={`h-[3px] w-8 transition-colors ${i <= questionIdx ? "bg-espresso" : "bg-sand"}`}
              />
            ))}
          </div>
        </div>
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
