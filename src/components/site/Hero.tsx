/**
 * Hero.tsx — Terra Space Studio
 *
 * THREE-STAGE SCROLL ANIMATION (Gemini/Blueprint hybrid):
 *
 * Stage 1 — Load:
 *   Left: "We build where love lives." headline + CTA
 *   Right: Photorealistic house render (frame-076.jpg)
 *   Background: cream #F4EBDD
 *
 * Stage 2 — Scroll 0→100% of pinned section:
 *   Building moves: right→left (translateX)
 *   Render fades out, Sketch fades in (cross-dissolve via opacity)
 *   Headline fades out as building moves
 *   "From Vision to Blueprint." text fades in on right
 *
 * Stage 3 — End state:
 *   Building (now sketch) sits left
 *   Right column shows: headline + services + CTA
 *   User continues scrolling into FrameCanvas
 *
 * Uses: GSAP ScrollTrigger with scrub:true — tied 1:1 to scroll speed
 * No new packages — gsap 3.15 and @gsap/react 2.1 already installed
 *
 * DROP IN: Replace the export function Hero() in Nav.tsx with this file,
 * OR import and use <ScrollHero /> from here in index.tsx
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Assets already in the project ──
import sketchImg from "@/assets/inprogress/sketchup.png";

// Register plugin once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollHero() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const buildingRef   = useRef<HTMLDivElement>(null);
  const renderRef     = useRef<HTMLImageElement>(null);
  const sketchRef     = useRef<HTMLImageElement>(null);
  const headline1Ref  = useRef<HTMLDivElement>(null);
  const headline2Ref  = useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const building = buildingRef.current;
    const render   = renderRef.current;
    const sketch   = sketchRef.current;
    const h1       = headline1Ref.current;
    const h2       = headline2Ref.current;
    const grid     = gridRef.current;
    if (!section || !building || !render || !sketch || !h1 || !h2 || !grid) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,          // scrub=true means 1:1 scroll; 1.2 adds buttery lag
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // ── Stage 1→2: Building moves right→left ──
      tl.to(building, {
        xPercent: -105,        // move from right column to left
        ease: "none",
        duration: 1,
      }, 0);

      // ── Render fades out ──
      tl.to(render, {
        opacity: 0,
        ease: "none",
        duration: 0.5,
      }, 0);

      // ── Sketch fades in ──
      tl.to(sketch, {
        opacity: 1,
        ease: "none",
        duration: 0.5,
      }, 0.1);

      // ── Blueprint grid overlay fades in ──
      tl.to(grid, {
        opacity: 0.18,
        ease: "none",
        duration: 0.5,
      }, 0.05);

      // ── Headline 1 fades out early ──
      tl.to(h1, {
        opacity: 0,
        y: -20,
        ease: "none",
        duration: 0.35,
      }, 0);

      // ── Headline 2 fades in mid-way ──
      tl.to(h2, {
        opacity: 1,
        y: 0,
        ease: "none",
        duration: 0.45,
      }, 0.45);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Terra Space Studio — hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        background: "#F4EBDD",
        overflow: "hidden",
      }}
    >
      {/* ── Blueprint grid overlay (fades in during scroll) ── */}
      <div
        ref={gridRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0,
          backgroundImage: `
            linear-gradient(rgba(44,26,14,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(44,26,14,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* ── Building container — starts on right, moves to left ── */}
      <div
        ref={buildingRef}
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "clamp(320px, 50vw, 820px)",
          height: "100%",
          zIndex: 1,
          willChange: "transform",
        }}
      >
        {/* Render image */}
        <img
          ref={renderRef}
          src="/frames/frame-076.jpg"
          alt="Terra Space Studio — completed house"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Sketch image — starts invisible, cross-dissolves in */}
        <img
          ref={sketchRef}
          src={sketchImg}
          alt="Terra Space Studio — architectural sketch"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0,
          }}
        />

        {/* Right-edge fade on building to blend into page */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, #F4EBDD 0%, transparent 15%, transparent 85%, #F4EBDD 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Left content (Stage 1) — fades out on scroll ── */}
      <div
        ref={headline1Ref}
        style={{
          position: "absolute",
          left: "clamp(1.5rem, 5vw, 5rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          maxWidth: "min(520px, 48vw)",
        }}
      >
        {/* Kicker */}
        <p style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#B5934A",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "clamp(1rem, 2.5vh, 1.8rem)",
        }}>
          <span style={{ display: "block", width: 28, height: 1, background: "#B5934A" }} />
          Terra Space Studio · Hyderabad
        </p>

        {/* Main headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontSize: "clamp(3rem, 7vw, 6.5rem)",
          fontWeight: 300,
          lineHeight: 0.95,
          color: "#2C1A0E",
          marginBottom: "clamp(1.2rem, 3vh, 2rem)",
        }}>
          We build where<br />
          <em style={{ fontStyle: "italic", color: "#B5934A" }}>love lives.</em>
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
          fontWeight: 300,
          lineHeight: 1.6,
          color: "#5C4033",
          marginBottom: "clamp(1.5rem, 3.5vh, 2.5rem)",
          maxWidth: 380,
        }}>
          Architecture · Interiors · Planning<br />
          Hyderabad &amp; Vijayawada
        </p>

        {/* CTA */}
        <CTAButton href="#contact" label="Begin Your Space →" />
      </div>

      {/* ── Right content (Stage 3) — fades in as building settles left ── */}
      <div
        ref={headline2Ref}
        style={{
          position: "absolute",
          right: "clamp(1.5rem, 5vw, 5rem)",
          top: "50%",
          transform: "translateY(-50%) translateY(20px)",
          zIndex: 10,
          maxWidth: "min(480px, 45vw)",
          opacity: 0,
        }}
      >
        {/* Kicker */}
        <p style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#B5934A",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "clamp(1rem, 2.5vh, 1.8rem)",
          justifyContent: "flex-end",
        }}>
          Our Approach
          <span style={{ display: "block", width: 28, height: 1, background: "#B5934A" }} />
        </p>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
          fontWeight: 300,
          lineHeight: 0.95,
          color: "#2C1A0E",
          textAlign: "right",
          marginBottom: "clamp(1.2rem, 3vh, 2rem)",
        }}>
          From Vision<br />
          to <em style={{ fontStyle: "italic", color: "#B5934A" }}>Blueprint.</em>
        </h2>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
          fontWeight: 300,
          lineHeight: 1.65,
          color: "#5C4033",
          textAlign: "right",
          marginBottom: "clamp(1.5rem, 3vh, 2.2rem)",
        }}>
          Every project begins with understanding how people
          live, feel, and experience a space — not measurements,
          not materials. People.
        </p>

        {/* Service tags */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {["Architecture", "Interiors", "Planning"].map((s) => (
            <span key={s} style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              border: "1px solid #C8BCA8",
              color: "#5C4033",
              padding: "6px 14px",
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Mobile version — stacked, no scroll animation ── */}
      <MobileHero />

      {/* ── Scroll hint ── */}
      <ScrollHint />
    </section>
  );
}

/* ── CTA Button ── */
function CTAButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }}
      style={{
        display: "inline-block",
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: "0.55rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        border: "1px solid #2C1A0E",
        color: "#2C1A0E",
        padding: "13px 32px",
        textDecoration: "none",
        transition: "background 0.25s, color 0.25s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#2C1A0E";
        (e.currentTarget as HTMLElement).style.color = "#F4EBDD";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "#2C1A0E";
      }}
    >
      {label}
    </a>
  );
}

/* ── Mobile hero — shows on < 768px, hidden on desktop ── */
function MobileHero() {
  return (
    <div
      className="md:hidden"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 20,
      }}
    >
      {/* Image top half */}
      <div style={{ flex: "0 0 55%", position: "relative", overflow: "hidden" }}>
        <img
          src="/frames/frame-076.jpg"
          alt="Terra Space Studio"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 50%, #F4EBDD 100%)",
        }} />
      </div>

      {/* Text bottom half */}
      <div style={{
        flex: 1,
        background: "#F4EBDD",
        padding: "1.5rem 1.8rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.8rem",
      }}>
        <p style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "0.5rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#B5934A",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <span style={{ display: "block", width: 20, height: 1, background: "#B5934A" }} />
          Terra Space Studio
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.4rem, 9vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 0.95,
          color: "#2C1A0E",
        }}>
          We build where<br />
          <em style={{ fontStyle: "italic", color: "#B5934A" }}>love lives.</em>
        </h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.95rem",
          fontWeight: 300,
          lineHeight: 1.55,
          color: "#5C4033",
        }}>
          Architecture · Interiors · Planning
        </p>
        <CTAButton href="#contact" label="Begin Your Space →" />
      </div>
    </div>
  );
}

/* ── Scroll hint ── */
function ScrollHint() {
  return (
    <div
      className="hidden md:flex"
      aria-hidden
      style={{
        position: "absolute",
        bottom: "clamp(1.5rem, 3vh, 2.5rem)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        flexDirection: "column",
        alignItems: "center",
        gap: "0.4rem",
        pointerEvents: "none",
        opacity: 0.6,
      }}
    >
      <p style={{
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: "0.45rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "#2C1A0E",
      }}>
        Scroll
      </p>
      <svg
        width="12" height="20" viewBox="0 0 12 20" fill="none"
        style={{ animation: "scrollBounce 1.8s ease-in-out infinite" }}
      >
        <rect x="4.5" y="1" width="3" height="10" rx="1.5" fill="#2C1A0E" opacity="0.4" />
        <rect x="4.5" y="1" width="3" height="4" rx="1.5" fill="#2C1A0E"
          style={{ animation: "scrollThumb 1.8s ease-in-out infinite" }}
        />
        <style>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(4px); }
          }
          @keyframes scrollThumb {
            0% { transform: translateY(0px); opacity: 1; }
            100% { transform: translateY(6px); opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}
