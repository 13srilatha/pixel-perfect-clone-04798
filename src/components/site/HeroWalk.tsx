/**
 * HeroWalk — scroll-driven exterior → interior reveal.
 * Pinned section. Scroll = camera walks from the street into the living room.
 */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import exteriorImg from "@/assets/uploads/hero-exterior.png";
import interiorImg from "@/assets/uploads/hero-interior.png";

gsap.registerPlugin(ScrollTrigger);

export function HeroWalk() {
  const sectionRef = useRef<HTMLElement>(null);
  const extRef = useRef<HTMLDivElement>(null);
  const intRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sync = () => ScrollTrigger.update();
    if (window.__lenis) window.__lenis.on("scroll", sync);

    const ctx = gsap.context(() => {
      gsap.set(intRef.current, { autoAlpha: 0, scale: 1.15 });
      gsap.set(extRef.current, { scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // camera moves forward through exterior
      tl.to(extRef.current, { scale: 1.4, ease: "none" }, 0);
      tl.to(overlayRef.current, { opacity: 0.55, ease: "none" }, 0.25);
      tl.to(hintRef.current, { autoAlpha: 0, ease: "none" }, 0.05);

      // dissolve into interior
      tl.to(extRef.current, { autoAlpha: 0, ease: "none" }, 0.45);
      tl.to(intRef.current, { autoAlpha: 1, scale: 1, ease: "none" }, 0.45);
      tl.to(overlayRef.current, { opacity: 0.25, ease: "none" }, 0.6);
    }, section);

    return () => {
      if (window.__lenis) window.__lenis.off("scroll", sync);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Walk through a Terra Space home"
      style={{
        position: "relative",
        height: "100svh",
        width: "100%",
        overflow: "hidden",
        background: "#1A1A14",
      }}
    >
      {/* Exterior frame */}
      <div
        ref={extRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${exteriorImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform, opacity",
        }}
      />
      {/* Interior frame */}
      <div
        ref={intRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${interiorImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform, opacity",
        }}
      />
      {/* Dark vignette overlay for legibility */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(26,26,20,0.35) 0%, rgba(26,26,20,0.25) 40%, rgba(26,26,20,0.7) 100%)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Copy */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#E8DAB9",
            marginBottom: "1.8rem",
          }}
        >
          Terra Space Studio · Hyderabad
        </span>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond','Cormorant',serif",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            lineHeight: 1.05,
            color: "#FAF8F4",
            margin: 0,
            maxWidth: 900,
          }}
        >
          We build where
          <br />
          <em style={{ fontStyle: "italic", color: "#C4955A" }}>love&nbsp;lives.</em>
        </h1>

        <p
          style={{
            marginTop: "1.4rem",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(250,248,244,0.78)",
          }}
        >
          Architecture · Interiors · Planning
        </p>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            marginTop: "2.4rem",
            background: "#C4955A",
            color: "#1A1A14",
            padding: "16px 30px",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.78rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.25s, transform 0.25s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#d6a86c";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#C4955A";
          }}
        >
          Begin Your Space →
        </a>
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 6,
          fontFamily: "'DM Sans','Inter',sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(250,248,244,0.7)",
        }}
      >
        ↓ Scroll to walk through a home
      </div>
    </section>
  );
}
