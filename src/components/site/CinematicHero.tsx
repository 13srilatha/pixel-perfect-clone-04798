/**
 * CinematicHero.tsx — Terra Space Studio
 *
 * GSAP ScrollTrigger pinned hero.
 *
 * PHASE 1 — initial state (no scroll):
 *   Left 40%  : headline "We build where love lives" + CTA
 *   Right 60% : photorealistic facade render (02-facade.jpg)
 *
 * PHASE 2 — as user scrolls (scrub: true, reverses on scroll up):
 *   1. Render slides from RIGHT 60% → LEFT 44%
 *   2. Photo fades OUT, sketch fades IN  (autoAlpha)
 *   3. Headline fades out upward
 *   4. Right side reveals: "Modernity meets Heritage in Hyderabad"
 *
 * USAGE in index.tsx:
 *   import { CinematicHero } from "@/components/site/CinematicHero";
 *   // Replace <Hero /> with <CinematicHero />
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Photo render  →  full-colour photorealistic house
import photoRender from "@/assets/walkthrough/02-facade.jpg";
// Sketch render →  architectural sketch / early-stage drawing
import sketchRender from "@/assets/rotation/frame-01.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ─── Scroll indicator line ─────────────────────────────────────── */
function ScrollLine() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        zIndex: 30,
      }}
    >
      <p
        style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "0.52rem",
          letterSpacing: "0.3em",
          color: "#8a7355",
          textTransform: "uppercase",
        }}
      >
        Scroll
      </p>
      <div
        style={{
          width: "1px",
          height: "40px",
          background: "linear-gradient(to bottom, #B5934A, transparent)",
          animation: "scrollPulse 1.8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
          50%       { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export function CinematicHero() {
  const sectionRef       = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const photoRef         = useRef<HTMLImageElement>(null);
  const sketchRef        = useRef<HTMLImageElement>(null);
  const leftTextRef      = useRef<HTMLDivElement>(null);
  const rightRevealRef   = useRef<HTMLDivElement>(null);
  const scrollLineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── sync Lenis with ScrollTrigger ──────────────────────────────
    const lenisHandler = () => ScrollTrigger.update();
    if (window.__lenis) window.__lenis.on("scroll", lenisHandler);

    // ── main scroll timeline ───────────────────────────────────────
    const ctx = gsap.context(() => {
      // Ensure sketch is invisible at start
      gsap.set(sketchRef.current,    { autoAlpha: 0 });
      gsap.set(rightRevealRef.current, { autoAlpha: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end:   "+=140%",   // 1.4× viewport height of scroll travel
          pin:   true,
          scrub: 1.6,        // smooth lag — feels cinematic, reverses on scroll up
          anticipatePin: 1,
        },
      });

      // 1. Image container: slide from right 60% → left 44%
      tl.to(
        imageContainerRef.current,
        { left: "0%", width: "44%", ease: "none" },
        0,
      );

      // 2. Photo → Sketch swap
      tl.to(photoRef.current,  { autoAlpha: 0, ease: "none" }, 0.05);
      tl.to(sketchRef.current, { autoAlpha: 1, ease: "none" }, 0.18);

      // 3. Fade out left headline
      tl.to(
        leftTextRef.current,
        { autoAlpha: 0, y: -28, ease: "none" },
        0,
      );

      // 4. Fade out scroll line quickly
      tl.to(scrollLineRef.current, { autoAlpha: 0, ease: "none" }, 0);

      // 5. Reveal right content (slight delay so it appears after image settles)
      tl.to(
        rightRevealRef.current,
        { autoAlpha: 1, y: 0, ease: "none" },
        0.45,
      );
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
      aria-label="Terra Space Studio — cinematic hero"
      style={{
        position: "relative",
        height: "100svh",
        width: "100%",
        overflow: "hidden",
        background: "#f5f0e8",
      }}
    >
      {/* ── LEFT TEXT — initial headline ───────────────────────── */}
      <div
        ref={leftTextRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "44%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(2.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(4rem, 8vh, 7rem)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        {/* Studio label */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(1rem, 2.5vh, 1.6rem)" }}>
          <span style={{ display: "block", width: 28, height: "1px", background: "#B5934A" }} />
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "clamp(0.5rem, 1vw, 0.6rem)",
            letterSpacing: "0.38em",
            color: "#B5934A",
            textTransform: "uppercase",
          }}>
            Terra Space Studio
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
          fontWeight: 300,
          lineHeight: 1.02,
          color: "#2c1a0e",
          marginBottom: "clamp(1.2rem, 2.5vh, 2rem)",
        }}>
          We build where<br />
          <em style={{ color: "#B5934A", fontStyle: "italic" }}>love lives.</em>
        </h1>

        {/* Services */}
        <p style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
          letterSpacing: "0.2em",
          color: "#8a7355",
          textTransform: "uppercase",
          marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
        }}>
          Architecture · Interiors · Planning
        </p>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            display: "inline-block",
            alignSelf: "flex-start",
            border: "1px solid #B5934A",
            padding: "clamp(10px, 1.4vh, 14px) clamp(22px, 3vw, 38px)",
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "clamp(0.52rem, 0.9vw, 0.62rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#2c1a0e",
            textDecoration: "none",
            pointerEvents: "auto",
            transition: "background 0.25s, color 0.25s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#B5934A";
            (e.currentTarget as HTMLAnchorElement).style.color = "#f5f0e8";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#2c1a0e";
          }}
        >
          Begin Your Space →
        </a>
      </div>

      {/* ── IMAGE CONTAINER — starts right, moves to left on scroll ── */}
      <div
        ref={imageContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: "40%",      // starts at 40% — image occupies right 60%
          width: "60%",
          height: "100%",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Photo render — full colour, initial state */}
        <img
          ref={photoRef}
          src={photoRender}
          alt="Terra Space Studio — photorealistic architecture render"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Sketch version — fades in on scroll */}
        <img
          ref={sketchRef}
          src={sketchRender}
          alt="Terra Space Studio — architectural sketch"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            // GSAP autoAlpha controls visibility and opacity together
            opacity: 0,
            visibility: "hidden",
          }}
        />

        {/* Subtle bottom gradient on image */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(to top, rgba(245,240,232,0.35) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Left edge fade — blends image into cream background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "80px",
            height: "100%",
            background: "linear-gradient(to right, #f5f0e8 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>

      {/* ── RIGHT REVEAL — appears after image moves left ──────── */}
      <div
        ref={rightRevealRef}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "56%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(2.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(4rem, 8vh, 7rem)",
          zIndex: 20,
          // starts invisible — GSAP controls it
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(1rem, 2.5vh, 1.6rem)" }}>
          <span style={{ display: "block", width: 28, height: "1px", background: "#B5934A" }} />
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "clamp(0.5rem, 1vw, 0.6rem)",
            letterSpacing: "0.38em",
            color: "#B5934A",
            textTransform: "uppercase",
          }}>
            Architecture
          </span>
        </div>

        {/* Reveal headline */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontSize: "clamp(2.2rem, 4.5vw, 4.8rem)",
          fontWeight: 300,
          lineHeight: 1.05,
          color: "#2c1a0e",
          marginBottom: "clamp(1.2rem, 2.5vh, 2rem)",
        }}>
          Modernity meets<br />
          <em style={{ color: "#B5934A", fontStyle: "italic" }}>Heritage</em>
          {" "}in Hyderabad.
        </h2>

        {/* Supporting text from brochure */}
        <p style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontStyle: "italic",
          fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
          fontWeight: 300,
          lineHeight: 1.55,
          color: "#8a7355",
          maxWidth: "480px",
          marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
        }}>
          Context-driven architectural design that balances aesthetics, functionality, and spatial clarity — from first sketch to final handover.
        </p>

        {/* Explore CTA */}
        <a
          href="#work"
          onClick={e => {
            e.preventDefault();
            document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            alignSelf: "flex-start",
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "clamp(0.52rem, 0.9vw, 0.62rem)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#B5934A",
            textDecoration: "none",
            pointerEvents: "auto",
            borderBottom: "1px solid rgba(181,147,74,0.4)",
            paddingBottom: "2px",
            transition: "border-color 0.2s",
          }}
        >
          Explore Our Work
          <span style={{ transition: "transform 0.2s" }}>→</span>
        </a>
      </div>

      {/* ── MOBILE FALLBACK — simple static layout ──────────────── */}
      {/* The GSAP animation runs on desktop. Mobile gets a clean static view. */}
      <style>{`
        @media (max-width: 768px) {
          #hero [data-desktop-only] { display: none !important; }
        }
      `}</style>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div ref={scrollLineRef}>
        <ScrollLine />
      </div>
    </section>
  );
}
