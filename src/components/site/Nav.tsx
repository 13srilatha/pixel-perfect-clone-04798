import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { studio } from "@/data/projects";
import { Logo } from "./Logo";
import heroFeature from "@/assets/projects/project-5.jpeg";

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
  "Are you designing interiors that go beyond the ordinary?",
  "Do you want a home that tells your story?",
  "Looking for architecture that breathes with its surroundings?",
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

  const phase = Math.min(1, p);
  const imgX = phase * 14;
  const imgScale = 1 - phase * 0.04;
  const imgFilter = `contrast(${1 + phase * 0.15}) grayscale(${phase * 0.5})`;

  return (
    <>
      <section id="top" ref={ref} className="relative bg-cream" style={{ height: "210vh" }}>
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
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

        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-8 px-6 md:grid-cols-12 md:px-10">
          <div className="relative z-10 md:col-span-5">
            <div className="mask-y-fade h-[230px] overflow-hidden md:h-[300px]">
              <div className="hero-question-marquee">
                {[...HERO_QUESTIONS, ...HERO_QUESTIONS].map((q, idx) => (
                  <p key={`${q}-${idx}`} className="mb-6 font-display text-3xl leading-tight text-espresso md:text-5xl">
                    {q}
                  </p>
                ))}
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-brown md:text-base">
              We are <strong className="font-normal text-espresso">{studio.name}</strong> — a
              residential architecture and interior design practice based in {studio.city}.
            </p>
          </div>

          <div className="relative md:col-span-7">
            <div
              className="relative ml-auto aspect-[4/3] w-full max-w-[760px] overflow-hidden shadow-2xl"
              style={{
                transform: `translateX(${imgX}vw) scale(${imgScale})`,
                filter: imgFilter,
                transition: "transform 120ms linear, filter 120ms linear",
              }}
            >
              <img
                src={heroFeature}
                alt="Terra Space Studio hero render"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        </div>
      </section>
      <section className="bg-cream pb-16 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="space-y-4 font-display text-3xl font-light tracking-[0.2em] text-espresso md:text-5xl">
            {["ARCHITECTURE", "INTERIOR", "PLANNING"].map((word, i) => (
              <span
                key={word}
                className="block animate-[fadeSlideIn_700ms_ease_forwards] opacity-0"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
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
