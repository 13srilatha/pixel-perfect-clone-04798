/**
 * Materials.tsx — Beat 5 of the scroll journey.
 *
 * Material close-ups: six swatches (walnut, cane, stone, plaster, charcoal
 * metal, glass) float forward one by one on scroll, with a slight 3D tilt
 * that follows the cursor on desktop. Hover / tap reveals the material name
 * and where it is used in a Terra home.
 *
 * Mobile: same grid, tap instead of hover, no cursor tilt.
 */

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import walnutImg from "@/assets/materials/walnut.jpg";
import caneImg from "@/assets/materials/cane.jpg";
import stoneImg from "@/assets/materials/stone.jpg";
import plasterImg from "@/assets/materials/plaster.jpg";
import charcoalImg from "@/assets/materials/charcoal.jpg";
import glassImg from "@/assets/materials/glass.jpg";

const MATERIALS = [
  { name: "Walnut", where: "Main bedroom joinery and wardrobes.", image: walnutImg },
  { name: "Cane", where: "Living room chairs and door screens.", image: caneImg },
  { name: "Stone", where: "Façade cladding and courtyard paving.", image: stoneImg },
  { name: "Plaster", where: "Walls and ceilings, hand-finished.", image: plasterImg },
  { name: "Charcoal Metal", where: "Railings, gates and window frames.", image: charcoalImg },
  { name: "Glass", where: "Large windows and balcony doors.", image: glassImg },
];

function Swatch({
  m,
  idx,
  reduced,
}: {
  m: (typeof MATERIALS)[number];
  idx: number;
  reduced: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(reduced);
  const [open, setOpen] = useState(false);

  // float forward one by one on scroll
  useEffect(() => {
    if (reduced) return;
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.style.transitionDelay = `${idx * 0.09}s`;
            t.style.opacity = "1";
            t.style.transform = "translateY(0) scale(1) rotateX(0deg)";
            obs.unobserve(t);
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [idx, reduced]);

  // cursor tilt (desktop, motion allowed)
  const onMove = (e: React.MouseEvent) => {
    if (reduced || window.matchMedia("(max-width: 768px)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateY(0) scale(1) rotateY(${nx * 8}deg) rotateX(${ny * -8}deg)`;
  };
  const onLeave = () => {
    setOpen(false);
    const el = cardRef.current;
    if (!el || reduced) return;
    el.style.transform = "translateY(0) scale(1) rotateX(0deg)";
  };

  const reveal = open;

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${m.name} — ${m.where}`}
      onMouseMove={onMove}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={onLeave}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        cursor: "pointer",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0) scale(1)" : "translateY(44px) scale(0.92) rotateX(8deg)",
        transformStyle: "preserve-3d",
        transition: "opacity 0.7s ease, transform 0.5s ease, box-shadow 0.4s ease",
        boxShadow: reveal ? "0 24px 60px rgba(44,26,14,0.28)" : "0 10px 30px rgba(44,26,14,0.12)",
        outline: "none",
      }}
    >
      <img src={m.image} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div
        aria-hidden={!reveal}
        style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "1.1rem",
          background: "linear-gradient(to top, rgba(26,26,20,0.82) 0%, rgba(26,26,20,0.1) 55%, transparent 100%)",
          opacity: reveal ? 1 : 0, transition: "opacity 0.35s ease",
        }}
      >
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", color: "#FAF8F4",
          fontStyle: "italic",
        }}>
          {m.name}
        </span>
        <span style={{
          fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.78rem", lineHeight: 1.45,
          color: "rgba(250,248,244,0.85)", marginTop: "0.25rem",
        }}>
          {m.where}
        </span>
      </div>
    </div>
  );
}

export function Materials() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="materials"
      aria-label="Material close-ups"
      style={{ background: "#FAF8F4", color: "#1A1A14", padding: "6.5rem 1.5rem" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-12 max-w-2xl">
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.38em",
            color: "#C4955A", textTransform: "uppercase", display: "block", marginBottom: "1rem",
          }}>
            Material Close-Ups
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05, margin: 0,
          }}>
            The textures of <em style={{ color: "#C4955A" }}>a Terra home.</em>
          </h2>
          <p style={{
            marginTop: "1.1rem", fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.95rem", lineHeight: 1.65, color: "#4A4A42", maxWidth: 520,
          }}>
            We choose materials you can feel — touch a swatch to see where it lives.
          </p>
        </header>

        <div style={{ perspective: 900 }}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {MATERIALS.map((m, i) => (
              <Swatch key={m.name} m={m} idx={i} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
