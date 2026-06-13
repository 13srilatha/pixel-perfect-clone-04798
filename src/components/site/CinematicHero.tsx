/**
 * CinematicHero.tsx — Terra Space Studio
 *
 * Three-frame scroll story: Empty Plot → Architectural Sketch → Finished Home.
 * The customer's dream, told in one pinned section.
 *
 * Left 44% : headline, sub-headline, two CTAs, chapter label that swaps per frame.
 * Right 56%: cross-fading image stack (plot.jpg → sketch.jpg → built.jpg).
 *
 * Driven by GSAP ScrollTrigger (pin + scrub, reverses on scroll-up).
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import plotImg   from "@/assets/hero-plot.jpg";
import sketchImg from "@/assets/rotation/frame-01.jpg";
import builtImg  from "@/assets/walkthrough/02-facade.jpg";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: 0, label: "Your Land",        caption: "An empty plot.\nA family's quiet dream." },
  { id: 1, label: "Our Drawing",      caption: "First lines.\nLight, flow, the way you live." },
  { id: 2, label: "Your Home",        caption: "Built where\nlove will live." },
];

function ScrollHint() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.45rem",
        zIndex: 30,
      }}
    >
      <span style={{
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: "0.52rem",
        letterSpacing: "0.3em",
        color: "#8a7355",
        textTransform: "uppercase",
      }}>
        Scroll the story
      </span>
      <div style={{
        width: 1,
        height: 36,
        background: "linear-gradient(to bottom, #B5934A, transparent)",
        animation: "scrollPulse 1.8s ease-in-out infinite",
      }} />
      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity: 0.3; transform: scaleY(0.6); }
          50%     { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs    = useRef<(HTMLImageElement | null)[]>([]);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // sync Lenis with ScrollTrigger
    const lenisHandler = () => ScrollTrigger.update();
    if (window.__lenis) window.__lenis.on("scroll", lenisHandler);

    const ctx = gsap.context(() => {
      // initial state: only frame 0 visible
      gsap.set(imgRefs.current[1], { autoAlpha: 0 });
      gsap.set(imgRefs.current[2], { autoAlpha: 0 });
      gsap.set(chapterRefs.current[1], { autoAlpha: 0, y: 24 });
      gsap.set(chapterRefs.current[2], { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end:   "+=220%",
          pin:   true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      // Phase 1 → 2 (plot to sketch)
      tl.to(imgRefs.current[0], { autoAlpha: 0, ease: "none" }, 0.15);
      tl.to(imgRefs.current[1], { autoAlpha: 1, ease: "none" }, 0.18);
      tl.to(chapterRefs.current[0], { autoAlpha: 0, y: -24, ease: "none" }, 0.15);
      tl.to(chapterRefs.current[1], { autoAlpha: 1, y: 0,  ease: "none" }, 0.22);

      // Phase 2 → 3 (sketch to built)
      tl.to(imgRefs.current[1], { autoAlpha: 0, ease: "none" }, 0.55);
      tl.to(imgRefs.current[2], { autoAlpha: 1, ease: "none" }, 0.58);
      tl.to(chapterRefs.current[1], { autoAlpha: 0, y: -24, ease: "none" }, 0.55);
      tl.to(chapterRefs.current[2], { autoAlpha: 1, y: 0,  ease: "none" }, 0.62);

      // Scroll hint disappears after first scroll
      tl.to(scrollHintRef.current, { autoAlpha: 0, ease: "none" }, 0.05);
    }, section);

    return () => {
      if (window.__lenis) window.__lenis.off("scroll", lenisHandler);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Terra Space Studio — from your plot to your home"
      style={{
        position: "relative",
        height: "100svh",
        width: "100%",
        overflow: "hidden",
        background: "#f5f0e8",
      }}
    >
      {/* ─── LEFT TEXT COLUMN ───────────────────────────────────── */}
      <div style={{
        position: "absolute",
        left: 0, top: 0,
        width: "44%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(2.5rem, 5vw, 5rem)",
        zIndex: 20,
      }}>
        {/* Studio label */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(1.2rem, 2.8vh, 2rem)" }}>
          <span style={{ display: "block", width: 28, height: 1, background: "#B5934A" }} />
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "clamp(0.5rem, 1vw, 0.6rem)",
            letterSpacing: "0.38em",
            color: "#B5934A",
            textTransform: "uppercase",
          }}>
            Terra Space Studio · Hyderabad
          </span>
        </div>

        {/* Main headline — single, clear, customer-first */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontSize: "clamp(2.4rem, 4.8vw, 4.6rem)",
          fontWeight: 300,
          lineHeight: 1.06,
          color: "#2c1a0e",
          margin: 0,
          marginBottom: "clamp(1rem, 2.2vh, 1.6rem)",
        }}>
          Designing homes<br />
          that <em style={{ color: "#B5934A", fontStyle: "italic" }}>feel right</em> for life.
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "clamp(0.85rem, 1.15vw, 1rem)",
          lineHeight: 1.6,
          color: "#5a4838",
          fontWeight: 400,
          maxWidth: 440,
          margin: 0,
          marginBottom: "clamp(1.6rem, 3vh, 2.4rem)",
        }}>
          Architecture, interiors and end-to-end execution for families
          building their forever home in Hyderabad.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: "#2c1a0e",
              color: "#f5f0e8",
              padding: "13px 28px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid #2c1a0e",
              transition: "background 0.25s, color 0.25s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#B5934A"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#B5934A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#2c1a0e"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2c1a0e"; }}
          >
            Start your project
          </a>
          <a
            href="#work"
            onClick={e => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: "transparent",
              color: "#2c1a0e",
              padding: "13px 28px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid #2c1a0e",
            }}
          >
            View our work
          </a>
        </div>

        {/* Chapter captions — swap as user scrolls */}
        <div style={{ position: "relative", minHeight: "5rem" }}>
          {CHAPTERS.map((c, i) => (
            <div
              key={c.id}
              ref={el => { chapterRefs.current[i] = el; }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.4em",
                color: "#B5934A",
                textTransform: "uppercase",
              }}>
                {String(i + 1).padStart(2, "0")} · {c.label}
              </span>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                lineHeight: 1.4,
                color: "#8a7355",
                margin: 0,
                whiteSpace: "pre-line",
              }}>
                {c.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── RIGHT IMAGE STACK ──────────────────────────────────── */}
      <div style={{
        position: "absolute",
        right: 0, top: 0,
        width: "56%",
        height: "100%",
        overflow: "hidden",
        zIndex: 10,
      }}>
        {[plotImg, sketchImg, builtImg].map((src, i) => (
          <img
            key={i}
            ref={el => { imgRefs.current[i] = el; }}
            src={src}
            alt={["Empty plot ready for a new home", "Architectural sketch — early design stage", "Finished home built by Terra Space Studio"][i]}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: i === 0 ? 1 : 0,
              visibility: i === 0 ? "visible" : "hidden",
            }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Soft left edge fade into cream column */}
        <div aria-hidden style={{
          position: "absolute",
          top: 0, left: 0,
          width: 100,
          height: "100%",
          background: "linear-gradient(to right, #f5f0e8 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }} />
      </div>

      {/* Frame counter (top-right) */}
      <div aria-hidden style={{
        position: "absolute",
        top: "clamp(5rem, 8vh, 6.5rem)",
        right: "clamp(1.5rem, 3vw, 2.5rem)",
        zIndex: 25,
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: "0.55rem",
        letterSpacing: "0.4em",
        color: "#f5f0e8",
        textTransform: "uppercase",
        mixBlendMode: "difference",
      }}>
        Plot · Sketch · Home
      </div>

      <div ref={scrollHintRef}>
        <ScrollHint />
      </div>

      {/* Mobile fallback — stack text over image, no pin */}
      <style>{`
        @media (max-width: 768px) {
          #hero > div:nth-of-type(1) { width: 100% !important; padding: 5rem 1.5rem 2rem !important; background: linear-gradient(to bottom, rgba(245,240,232,0.95), rgba(245,240,232,0.7)); }
          #hero > div:nth-of-type(2) { width: 100% !important; left: 0 !important; z-index: 1 !important; }
        }
      `}</style>
    </section>
  );
}
