import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { studio } from "@/data/projects";
import { Logo } from "./Logo";

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
    { href: "#process", label: "Before · After" },
    { href: "#rotate", label: "Best Project" },
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

import heroFeature from "@/assets/hero-feature.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 → 1 across the hero section
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Image expands from a small centered frame to full bleed as you scroll.
  const expand = Math.min(1, p * 1.4);
  const frameWidth = 38 + expand * 62; // 38vw → 100vw
  const frameHeight = 50 + expand * 50; // 50vh → 100vh
  const radius = (1 - expand) * 6; // px
  const overlayOpacity = expand * 0.55;

  return (
    <section
      id="top"
      ref={ref}
      className="relative bg-cream"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Subtle architectural grid in the background */}
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

        {/* The expanding feature image */}
        <div
          className="relative overflow-hidden shadow-2xl transition-[width,height,border-radius] duration-200 ease-out"
          style={{
            width: `${frameWidth}vw`,
            height: `${frameHeight}vh`,
            borderRadius: `${radius}px`,
          }}
        >
          <img
            src={heroFeature}
            alt="Terra Space Studio — a residence at golden hour"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/70"
            style={{ opacity: overlayOpacity }}
          />
        </div>

        {/* Three-sided word labels — Architecture · Interior · Planning */}
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-display text-xl font-light tracking-[0.5em] text-espresso md:left-8 md:text-3xl"
          style={{ opacity: 1 - expand * 0.7 }}
        >
          ARCHITECTURE
        </span>
        <span
          className="pointer-events-none absolute left-1/2 top-28 -translate-x-1/2 font-display text-xl font-light tracking-[0.5em] text-espresso md:top-32 md:text-3xl"
          style={{ opacity: 1 - expand * 0.7 }}
        >
          INTERIOR
        </span>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center font-display text-xl font-light tracking-[0.5em] text-espresso md:right-8 md:text-3xl"
          style={{ opacity: 1 - expand * 0.7 }}
        >
          PLANNING
        </span>

        {/* Headline + intro overlay (fades in as image expands) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1600px] px-6 pb-16 md:px-10 md:pb-24"
          style={{ opacity: expand }}
        >
          <p className="label mb-4 inline-flex items-center gap-3 text-gold-lt">
            <span className="h-px w-10 bg-gold/70" />
            Architecture · Interiors · Planning
          </p>
          <h1 className="display text-[clamp(2.5rem,7vw,7rem)] text-cream text-balance">
            Spaces that
            <br />
            <em className="font-light italic text-gold-lt">remember</em> you.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
            We are <strong className="font-normal text-cream">{studio.name}</strong> — a
            residential architecture and interior design practice based in {studio.city}.
          </p>
        </div>
      </div>
    </section>
  );
}

function _ScrollHintUnused() {
  return (

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
