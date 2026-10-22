/**
 * JourneyHero.tsx — Beats 1–3 of the scroll journey.
 *
 * Beat 1  A hand-drawn sketch of the house draws itself on load; headline
 *         "Grounded by Earth. Designed for Experience." with soft mouse
 *         parallax on desktop.
 * Beat 2  On scroll the sketch dissolves into the finished render —
 *         "From concept to reality."
 * Beat 3  The camera dollies toward the façade; depth layers separate and
 *         we pass through the entrance (a CSS-3D layered move — no WebGL).
 *
 * Reduced motion: static hero — finished sketch, full headline, no pin.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import facadeImg from "@/assets/walkthrough/02-facade.jpg";

gsap.registerPlugin(ScrollTrigger);

/* Hand-drawn house elevation (decorative — the headline carries the meaning). */
const SKETCH_PATHS = [
  "M60 470 C 250 467, 640 473, 846 470",
  "M150 470 L149 252 L362 250 L361 470",
  "M120 252 L412 247",
  "M240 250 L241 152 L560 150 L559 250",
  "M218 152 L584 147",
  "M270 182 L332 180 M270 182 L269 228 M332 180 L331 228 M270 228 L331 227",
  "M380 180 L444 178 M380 180 L379 226 M444 178 L443 226 M380 226 L443 225",
  "M262 250 L262 234 M300 250 L300 234 M340 250 L340 234 M380 250 L380 234 M420 250 L420 234 M470 250 L470 234",
  "M470 470 L469 332 L522 330 L521 470",
  "M494 396 L496 396",
  "M600 470 L599 322 L702 320 L701 470",
  "M650 470 L649 321",
  "M522 330 L560 330 M560 330 L560 300 M560 300 L620 298",
  "M440 470 L424 492 M522 470 L538 492 M424 492 L538 492",
  "M760 470 C 757 434, 763 404, 758 372",
  "M758 372 C 736 366, 728 344, 742 332 C 738 314, 758 300, 772 310 C 788 298, 810 312, 804 330 C 820 342, 812 364, 794 368 C 788 380, 766 382, 758 372",
  "M704 470 L712 470 M740 470 L748 470 M780 470 L788 470",
  "M160 300 L188 272 M160 330 L196 294 M160 360 L204 316 M160 390 L212 342",
  "M560 250 L620 250 M620 250 L620 210",
  "M120 252 L120 470",
];

const CHAPTERS = [
  { label: "01 · The Sketch", caption: "Every home starts as lines on paper." },
  { label: "02 · From Concept to Reality", caption: "The drawing becomes a building." },
  { label: "03 · Through the Entrance", caption: "Now, walk in with us." },
];

function Sketch({ svgRef, ariaHidden = true }: { svgRef?: React.Ref<SVGSVGElement>; ariaHidden?: boolean }) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 900 560"
      aria-hidden={ariaHidden}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {SKETCH_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          fill="none"
          stroke="#3a2a18"
          strokeWidth={i % 4 === 0 ? 2.4 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.88}
        />
      ))}
    </svg>
  );
}

export function JourneyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const sketchRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const slatsRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLAnchorElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: finished sketch, everything visible, no pin, no parallax.
    if (reduced) {
      const paths = svgRef.current?.querySelectorAll("path");
      if (paths) gsap.set(paths, { strokeDasharray: "none" });
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const lenisHandler = () => ScrollTrigger.update();
    if (window.__lenis) window.__lenis.on("scroll", lenisHandler);

    const ctx = gsap.context(() => {
      /* ── Beat 1: the sketch draws itself (load animation, ~2s) ── */
      const paths = svgRef.current?.querySelectorAll("path");
      if (paths) {
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.5,
          stagger: 0.045,
          ease: "power1.inOut",
          delay: 0.25,
        });
      }
      gsap.from("[data-hero-text] > *", {
        autoAlpha: 0,
        y: 26,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.5,
        ease: "power2.out",
      });

      /* ── Beats 2–3: scroll timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=190%" : "+=300%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // chapter 1 → 2
      tl.to(textRef.current, { autoAlpha: 0, y: -40, ease: "none", duration: 0.1 }, 0.02);
      tl.to(sketchRef.current, { autoAlpha: 0, scale: 1.05, ease: "none", duration: 0.12 }, 0.02);
      tl.fromTo(
        renderRef.current,
        { autoAlpha: 0, scale: 1.14 },
        { autoAlpha: 1, scale: 1, ease: "none", duration: 0.13 },
        0.03,
      );
      tl.to(chapterRefs.current[0], { autoAlpha: 0, y: -16, ease: "none", duration: 0.06 }, 0.03);
      tl.fromTo(
        chapterRefs.current[1],
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, ease: "none", duration: 0.07 },
        0.09,
      );
      tl.to(hintRef.current, { autoAlpha: 0, ease: "none", duration: 0.05 }, 0.02);

      // Beat 2 dolly: camera approaches the façade
      tl.to(renderRef.current, { scale: 1.38, ease: "none", duration: 0.32 }, 0.16);

      // chapter 2 → 3
      tl.to(chapterRefs.current[1], { autoAlpha: 0, y: -16, ease: "none", duration: 0.06 }, 0.5);
      tl.fromTo(
        chapterRefs.current[2],
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, ease: "none", duration: 0.07 },
        0.56,
      );

      // Beat 3: layered depth — the screen wall and doorframe separate and fly past
      tl.to(stageRef.current, { autoAlpha: 1, ease: "none", duration: 0.04 }, 0.48);
      tl.to(renderRef.current, { autoAlpha: 0, ease: "none", duration: 0.04 }, 0.5);
      tl.fromTo(
        baseRef.current,
        { scale: 1.38 },
        { scale: 1.58, ease: "none", duration: 0.4 },
        0.5,
      );
      tl.fromTo(
        slatsRef.current,
        { autoAlpha: 0, z: 100 },
        { autoAlpha: 0.85, z: 420, ease: "none", duration: 0.16 },
        0.52,
      );
      tl.to(slatsRef.current, { autoAlpha: 0, z: 620, ease: "none", duration: 0.12 }, 0.68);

      // pass through the entrance
      tl.fromTo(
        doorRef.current,
        { autoAlpha: 0, scaleY: 0.35 },
        { autoAlpha: 1, scaleY: 1, ease: "power1.in", duration: 0.2 },
        0.74,
      );
      tl.to(stageRef.current, { autoAlpha: 0, ease: "none", duration: 0.08 }, 0.92);
      tl.to(skipRef.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, 0.45);
    }, section);

    /* soft mouse parallax (desktop only) */
    let parallaxHandlers: Array<() => void> = [];
    if (!isMobile) {
      const onMove = (e: MouseEvent) => {
        const r = section.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(sketchRef.current, { x: nx * -14, y: ny * -10, duration: 0.6, ease: "power2.out" });
        gsap.to(textRef.current, { x: nx * 8, y: ny * 6, duration: 0.6, ease: "power2.out" });
      };
      section.addEventListener("mousemove", onMove);
      parallaxHandlers.push(() => section.removeEventListener("mousemove", onMove));
    }

    return () => {
      if (window.__lenis) window.__lenis.off("scroll", lenisHandler);
      parallaxHandlers.forEach((fn) => fn());
      ctx.revert();
    };
  }, [reduced]);

  const skipToIntro = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo("#rooms");
    else document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero-journey"
      aria-label="Terra Space Studio — from sketch to finished home"
      style={{ position: "relative", height: "100svh", overflow: "hidden", background: "#f5f0e8" }}
    >
      {/* ── Visual stage (right on desktop, full-bleed top on mobile) ── */}
      <div
        id="journey-visual"
        style={{ position: "absolute", right: 0, top: 0, width: "56%", height: "100%", overflow: "hidden" }}
      >
        <div ref={sketchRef} style={{ position: "absolute", inset: "6% 8%", zIndex: 3 }}>
          <Sketch svgRef={svgRef} />
        </div>

        <img
          ref={renderRef}
          src={facadeImg}
          alt="Finished façade of a Terra Space Studio home"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0, visibility: "hidden", zIndex: 2, willChange: "transform",
          }}
        />

        {/* Beat 3 layered stage */}
        <div
          ref={stageRef}
          aria-hidden
          style={{
            position: "absolute", inset: 0, zIndex: 4, opacity: 0, visibility: "hidden",
            perspective: 900, willChange: "opacity",
          }}
        >
          <div
            ref={baseRef}
            style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <img src={facadeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div
            ref={slatsRef}
            style={{
              position: "absolute", top: "8%", bottom: "8%", left: "52%", width: "30%",
              background:
                "repeating-linear-gradient(90deg, rgba(44,26,14,0.92) 0 14px, rgba(196,149,90,0.55) 14px 22px)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              willChange: "transform, opacity",
            }}
          />
          <div
            ref={doorRef}
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 46% 62% at 50% 55%, #2c1a0e 0%, #241509 55%, rgba(245,240,232,0) 100%)",
              willChange: "transform, opacity",
            }}
          />
        </div>

        {/* soft left edge fade into the cream column */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: 0, left: 0, width: 90, height: "100%", zIndex: 5,
            background: "linear-gradient(to right, #f5f0e8 0%, transparent 100%)", pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Text column ── */}
      <div
        ref={textRef}
        id="journey-text"
        style={{
          position: "absolute", left: 0, top: 0, width: "44%", height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "clamp(2.5rem, 5vw, 5rem)", zIndex: 20,
        }}
      >
        <div data-hero-text style={{ display: "contents" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(1.2rem, 2.8vh, 2rem)" }}>
            <span style={{ display: "block", width: 28, height: 1, background: "#B5934A" }} />
            <span style={{
              fontFamily: "'Tenor Sans', sans-serif", fontSize: "clamp(0.5rem, 1vw, 0.6rem)",
              letterSpacing: "0.38em", color: "#B5934A", textTransform: "uppercase",
            }}>
              Terra Space Studio · Hyderabad
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4.8vw, 4.6rem)",
            fontWeight: 300, lineHeight: 1.08, color: "#2c1a0e", margin: 0,
            marginBottom: "clamp(1rem, 2.2vh, 1.6rem)",
          }}>
            Grounded by Earth.<br />
            Designed for <em style={{ color: "#B5934A", fontStyle: "italic" }}>Experience.</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif", fontSize: "clamp(0.85rem, 1.15vw, 1rem)",
            lineHeight: 1.6, color: "#5a4838", maxWidth: 420, margin: 0,
          }}>
            Architecture · Interiors · Planning
          </p>
        </div>
      </div>

      {/* ── Chapter captions ── */}
      <div aria-live="polite" style={{
        position: "absolute", left: "clamp(2.5rem, 5vw, 5rem)", bottom: "clamp(1.5rem, 4vh, 2.8rem)",
        zIndex: 20, minHeight: "4.2rem", maxWidth: 340,
      }}>
        {CHAPTERS.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => { chapterRefs.current[i] = el; }}
            style={{
              position: "absolute", inset: 0, opacity: i === 0 ? 1 : 0,
              visibility: i === 0 ? "visible" : "hidden",
            }}
          >
            <span style={{
              fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.58rem", letterSpacing: "0.4em",
              color: "#B5934A", textTransform: "uppercase", display: "block",
            }}>
              {c.label}
            </span>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.4, color: "#8a7355", margin: 0,
            }}>
              {c.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Skip intro — always reachable while the hero is pinned */}
      <a
        ref={skipRef}
        href="#rooms"
        onClick={skipToIntro}
        style={{
          position: "absolute", top: "5.2rem", right: "clamp(1.5rem, 3vw, 2.5rem)", zIndex: 30,
          fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em",
          textTransform: "uppercase", color: "#5a4838", textDecoration: "underline",
          textUnderlineOffset: "4px", background: "rgba(245,240,232,0.75)", padding: "6px 10px",
        }}
      >
        Skip intro ↓
      </a>

      {/* Scroll hint */}
      <div ref={hintRef} aria-hidden style={{
        position: "absolute", bottom: "1.5rem", left: "56%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", zIndex: 20,
      }}>
        <div style={{
          width: 1, height: 36,
          background: "linear-gradient(to bottom, #B5934A, transparent)",
          animation: "scrollPulse 1.8s ease-in-out infinite",
        }} />
      </div>

      {/* Mobile layout + shared keyframes */}
      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity: 0.3; transform: scaleY(0.6); }
          50%     { opacity: 1;   transform: scaleY(1); }
        }
        @media (max-width: 768px) {
          #journey-visual { width: 100% !important; height: 62% !important; }
          #journey-text {
            width: 100% !important; top: auto !important; bottom: 0 !important;
            height: 42% !important; justify-content: flex-start !important;
            padding: 1.2rem 1.4rem !important;
            background: linear-gradient(to bottom, rgba(245,240,232,0), #f5f0e8 34%) !important;
          }
          #hero-journey > div[aria-live] { left: 1.4rem !important; bottom: 0.8rem !important; max-width: 60% !important; }
          #hero-journey a[href="#rooms"] { top: 4.4rem !important; background: rgba(245,240,232,0.9) !important; }
        }
      `}</style>
    </section>
  );
}
