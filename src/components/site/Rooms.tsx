/**
 * Rooms.tsx — Beat 4 of the scroll journey.
 *
 * The camera moves through six "rooms" — one per Terra service:
 * Architecture, Planning, Interior Design, Landscape, Estimation & Costing,
 * Execution. Each room's image slides in on a different depth plane (CSS 3D,
 * no WebGL); the title and one-line description stay locked and readable.
 *
 * A mini floor-plan progress indicator tracks the active room; clicking a
 * room name smooth-scrolls straight to it.
 *
 * Mobile / reduced motion: the same six rooms render as a native-feeling
 * stacked list — no pinning, native touch scroll.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import archImg from "@/assets/rotation/frame-01.jpg";
import planningImg from "@/assets/walkthrough/01-approach.jpg";
import interiorImg from "@/assets/interiors/interior-1.jpeg";
import landscapeImg from "@/assets/journey/landscape.jpg";
import estimationImg from "@/assets/journey/estimation.jpg";
import executionImg from "@/assets/process/after-structure.jpeg";

gsap.registerPlugin(ScrollTrigger);

interface Room {
  title: string;
  line: string;
  image: string;
  alt: string;
}

const ROOMS: Room[] = [
  { title: "Architecture", line: "Context-driven design from concept to construction drawings.", image: archImg, alt: "Architectural sketch of a residence" },
  { title: "Planning", line: "Movement, usability, efficient spatial design.", image: planningImg, alt: "Approach view of a planned home" },
  { title: "Interior Design", line: "Materials, lighting, joinery — built from the inside out.", image: interiorImg, alt: "Warm interior living space" },
  { title: "Landscape", line: "Courts, gardens and light — the outside drawn in.", image: landscapeImg, alt: "Landscaped courtyard garden of a home" },
  { title: "Estimation & Costing", line: "Clear, itemised budgets before a single brick is laid.", image: estimationImg, alt: "Drawings, scale ruler and material samples on a desk" },
  { title: "Execution", line: "On-site coordination, supervision, and delivery.", image: executionImg, alt: "Structure on site during execution" },
];

export function Rooms() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reduced) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;
    if (!isDesktop) return; // mobile uses the stacked list below

    const lenisHandler = () => ScrollTrigger.update();
    if (window.__lenis) window.__lenis.on("scroll", lenisHandler);

    const ctx = gsap.context(() => {
      const n = ROOMS.length;
      ROOMS.forEach((_, i) => {
        const fig = imgRefs.current[i];
        const title = titleRefs.current[i];
        if (fig) gsap.set(fig, { autoAlpha: 0, z: -800, rotationX: 4 });
        if (title) gsap.set(title, { autoAlpha: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=430%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
      tlRef.current = tl;

      const seg = 1 / n;
      ROOMS.forEach((_, i) => {
        const t = i * seg;
        const isLast = i === n - 1;
        const fig = imgRefs.current[i];
        const title = titleRefs.current[i];

        // image flies in from depth
        if (fig) {
          tl.fromTo(
            fig,
            { autoAlpha: 0, z: -800, rotationX: 4 },
            { autoAlpha: 1, z: 0, rotationX: 0, ease: "power1.out", duration: seg * 0.55 },
            t,
          );
          if (!isLast) {
            tl.to(fig, { autoAlpha: 0, z: 380, ease: "power1.in", duration: seg * 0.3 }, t + seg * 0.72);
          }
        }

        // locked text crossfades
        if (title) {
          tl.to(title, { autoAlpha: 1, ease: "none", duration: seg * 0.2 }, t);
          if (!isLast) tl.to(title, { autoAlpha: 0, ease: "none", duration: seg * 0.15 }, t + seg * 0.8);
        }

        // floor-plan indicator
        const btn = btnRefs.current[i];
        if (btn) {
          tl.call(() => setActive(i), undefined, t);
        }
      });
    }, section);

    function setActive(i: number) {
      btnRefs.current.forEach((b, j) => {
        if (!b) return;
        b.setAttribute("aria-current", j === i ? "true" : "false");
        b.style.color = j === i ? "#B5934A" : "rgba(245,240,232,0.55)";
        b.style.borderColor = j === i ? "#B5934A" : "rgba(245,240,232,0.25)";
      });
    }

    return () => {
      if (window.__lenis) window.__lenis.off("scroll", lenisHandler);
      ctx.revert();
      tlRef.current = null;
    };
  }, [reduced]);

  const jumpToRoom = (i: number) => {
    const tl = tlRef.current;
    const st = tl?.scrollTrigger;
    const lenis = window.__lenis;
    if (st) {
      const target = st.start + ((i + 0.45) / ROOMS.length) * (st.end - st.start);
      if (lenis) lenis.scrollTo(target);
      else window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      btnRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section ref={sectionRef} id="rooms" aria-label="What we do — the six rooms of Terra Space Studio">
      {/* ── Desktop: pinned camera-through-rooms ── */}
      <div
        id="rooms-pin"
        style={{
          position: "relative", height: "100svh", overflow: "hidden",
          background: "#1A1A14", color: "#FAF8F4",
        }}
      >
        {/* depth stage */}
        <div aria-hidden style={{ position: "absolute", right: 0, top: 0, width: "58%", height: "100%", perspective: 1000 }}>
          {ROOMS.map((r, i) => (
            <div
              key={r.title}
              ref={(el) => { imgRefs.current[i] = el; }}
              style={{ position: "absolute", inset: "10% 6%", willChange: "transform, opacity" }}
            >
              <img
                src={r.image}
                alt=""
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}
              />
            </div>
          ))}
        </div>

        {/* locked text */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: "42%", height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "clamp(2.5rem, 5vw, 5rem)", zIndex: 10,
        }}>
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.38em",
            color: "#C4955A", textTransform: "uppercase", display: "block", marginBottom: "1.6rem",
          }}>
            What We Do · One Studio, Six Rooms
          </span>
          <div style={{ position: "relative", minHeight: "11rem" }}>
            {ROOMS.map((r, i) => (
              <div key={r.title} ref={(el) => { titleRefs.current[i] = el; }} style={{ position: "absolute", inset: 0 }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: "clamp(2rem, 3.6vw, 3.4rem)", lineHeight: 1.05, color: "#FAF8F4", margin: 0,
                }}>
                  {r.title}
                </h2>
                <p style={{
                  marginTop: "0.9rem", fontFamily: "'DM Sans','Inter',sans-serif",
                  fontSize: "clamp(0.9rem, 1.1vw, 1rem)", lineHeight: 1.6,
                  color: "rgba(250,248,244,0.7)", maxWidth: 380,
                }}>
                  {r.line}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* floor-plan progress indicator */}
        <nav aria-label="Service rooms progress" style={{
          position: "absolute", right: "clamp(1rem, 2.4vw, 2.2rem)", top: "50%",
          transform: "translateY(-50%)", zIndex: 12, display: "flex", flexDirection: "column", gap: "0.55rem",
        }}>
          {ROOMS.map((r, i) => (
            <button
              key={r.title}
              ref={(el) => { btnRefs.current[i] = el; }}
              type="button"
              onClick={() => jumpToRoom(i)}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "flex-end",
                background: "none", border: "1px solid rgba(245,240,232,0.25)", cursor: "pointer",
                padding: "0.3rem 0.6rem", color: "rgba(245,240,232,0.55)",
                fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.16em",
                textTransform: "uppercase", transition: "color .3s, border-color .3s",
              }}
            >
              {r.title}
              <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
            </button>
          ))}
        </nav>
      </div>

      {/* ── Mobile / reduced-motion: stacked rooms, native scroll ── */}
      <div id="rooms-stack" style={{ background: "#1A1A14", color: "#FAF8F4", padding: "5rem 1.4rem" }}>
        <span style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.38em",
          color: "#C4955A", textTransform: "uppercase", display: "block", marginBottom: "1rem",
        }}>
          What We Do
        </span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          fontSize: "clamp(2rem, 8vw, 2.6rem)", lineHeight: 1.1, margin: 0, marginBottom: "2rem",
        }}>
          One studio. <em style={{ color: "#C4955A" }}>Six rooms.</em>
        </h2>
        {ROOMS.map((r, i) => (
          <figure key={r.title} style={{ margin: 0, marginBottom: "2.4rem" }}>
            <img
              src={r.image}
              alt={r.alt}
              loading="lazy"
              width={1280}
              height={960}
              style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }}
            />
            <figcaption style={{ paddingTop: "0.9rem" }}>
              <span style={{
                fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.6rem",
                letterSpacing: "0.3em", color: "#C4955A",
              }}>
                0{i + 1}
              </span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.5rem",
                margin: "0.3rem 0 0.3rem",
              }}>
                {r.title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.9rem",
                lineHeight: 1.55, color: "rgba(250,248,244,0.65)", margin: 0,
              }}>
                {r.line}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <style>{`
        #rooms-stack { display: block; }
        @media (min-width: 769px) {
          #rooms-stack { display: none; }
          #rooms-pin { display: block; }
        }
        @media (max-width: 768px) {
          #rooms-pin { display: none; }
        }
      `}</style>
    </section>
  );
}
