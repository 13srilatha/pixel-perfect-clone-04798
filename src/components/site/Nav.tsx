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

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream pt-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--espresso) 1px, transparent 1px), linear-gradient(90deg, var(--espresso) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Marquee strip with studio words */}
      <div className="pointer-events-none absolute inset-x-0 top-20 overflow-hidden border-y border-sand/60 py-3 opacity-70">
        <div className="flex whitespace-nowrap" style={{ animation: "tsmarquee 50s linear infinite" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-display text-sm italic text-caramel md:text-base">
              Stone · Walnut · Lime · Brass · Linen · Terracotta · Earth · Light · Craft
              <span className="text-caramel/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 py-12 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-8">
          <p className="label mb-8 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-caramel" />
            Architecture · Interiors · Since {studio.founded}
          </p>

          <h1 className="display text-[clamp(3rem,9vw,9.5rem)] text-espresso text-balance">
            Spaces that
            <br />
            <em className="font-light italic text-caramel">remember</em> you.
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-brown text-pretty">
            We are <strong className="font-normal text-espresso">{studio.name}</strong> — a
            residential architecture and interior design practice based in {studio.city}.
            We build slowly, with stone, wood, and the kind of light you forget to photograph.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#walkthrough"
              className="label group inline-flex items-center gap-3 bg-espresso px-6 py-4 text-cream"
            >
              Walk Through a Home
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#work" className="label inline-flex items-center gap-3 text-espresso underline-offset-4 hover:underline">
              See the Work
            </a>
          </div>
        </div>

        <div className="hidden md:col-span-4 md:flex md:flex-col md:items-end md:justify-end">
          <div className="text-right">
            <p className="label mb-4">Selected Numbers</p>
            <dl className="space-y-3">
              {studio.stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-end gap-3">
                  <dd className="font-display text-3xl font-light text-espresso">{s.value}</dd>
                  <dt className="label">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <ScrollHint />

      <style>{`
        @keyframes tsmarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
      <span className="label">Scroll</span>
      <span className="block h-12 w-px overflow-hidden bg-sand">
        <span
          className="block h-1/2 w-full bg-espresso"
          style={{ animation: "scrollLine 2s ease-in-out infinite" }}
        />
      </span>
      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
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
