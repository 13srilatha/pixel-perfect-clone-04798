import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const PICK_IDS = ["munny-residence", "tree-of-life-villa", "curved-residence", "vertical-fin-house", "heritage-bungalow"];

const ONE_LINERS: Record<string, string> = {
  "munny-residence": "A contemporary home shaped around stone, glass and daily family rituals.",
  "tree-of-life-villa": "A meditative façade where the Bodhi motif turns memory into architecture.",
  "curved-residence": "A softened modern house designed for grandparents, children and easy movement.",
  "vertical-fin-house": "Privacy without shutting out light — fins tune the street, breeze and view.",
  "heritage-bungalow": "A restoration that keeps the old soul and quietly adds modern comfort.",
};

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const picks = PICK_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      const amount = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.13);
      gsap.set(track.querySelectorAll("[data-work-card]"), { y: 80, autoAlpha: 0, rotate: 2 });
      gsap.set(meterRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${amount() + window.innerHeight * 1.2}`,
          pin: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => gsap.set(meterRef.current, { scaleX: self.progress }),
        },
      });

      tl.to(track.querySelectorAll("[data-work-card]"), { y: 0, autoAlpha: 1, rotate: 0, stagger: 0.055, duration: 0.18, ease: "power2.out" }, 0);
      tl.to(track, { x: () => -amount(), ease: "none", duration: 0.72 }, 0.12);
      tl.to(titleRef.current, { x: () => -window.innerWidth * 0.28, ease: "none", duration: 0.72 }, 0.12);
    }, section);

    return () => {
      window.__lenis?.off("scroll", sync);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected Terra Space Studio projects"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#FAF8F4",
        padding: "6.5rem 0 2rem",
      }}
    >
      <div style={{ padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p
            style={{
              margin: "0 0 0.85rem",
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#C4955A",
            }}
          >
            Featured Work
          </p>
          <h2
            ref={titleRef}
            style={{
              margin: 0,
              width: "max-content",
              fontFamily: "'Cormorant Garamond','Cormorant',serif",
              fontWeight: 300,
              fontSize: "clamp(4.2rem, 14vw, 13rem)",
              lineHeight: 0.82,
              color: "#1A1A14",
              whiteSpace: "nowrap",
              willChange: "transform",
            }}
          >
            Land → Design → Home
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "stretch",
          gap: "clamp(1rem, 2.5vw, 2.5rem)",
          width: "max-content",
          padding: "4.5rem 8vw 3rem",
          willChange: "transform",
        }}
      >
        {picks.map((project, index) => {
          if (!project) return null;
          return (
            <article
              key={project.id}
              data-work-card
              style={{
                width: "min(78vw, 520px)",
                minHeight: "min(64vh, 620px)",
                display: "grid",
                gridTemplateRows: "1fr auto",
                overflow: "hidden",
                border: "1px solid #E8E2D9",
                background: index % 2 === 0 ? "#1A1A14" : "#C4955A",
                color: index % 2 === 0 ? "#FAF8F4" : "#1A1A14",
                boxShadow: "0 30px 70px rgba(26,26,20,0.14)",
                willChange: "opacity, transform",
              }}
            >
              <div style={{ position: "relative", overflow: "hidden", minHeight: 320 }}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: index % 2 === 0 ? "saturate(0.9) contrast(1.03)" : "saturate(0.82)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "1rem",
                    padding: "0.6rem 0.75rem",
                    background: "rgba(250,248,244,0.88)",
                    color: "#1A1A14",
                    fontFamily: "'DM Sans','Inter',sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {String(index + 1).padStart(2, "0")} / {String(picks.length).padStart(2, "0")}
                </div>
              </div>
              <div style={{ padding: "1.35rem 1.35rem 1.55rem" }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Cormorant Garamond','Cormorant',serif",
                    fontWeight: 300,
                    fontSize: "clamp(2rem, 4vw, 3.4rem)",
                    lineHeight: 0.95,
                    color: "inherit",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    margin: "0.7rem 0 1rem",
                    fontFamily: "'DM Sans','Inter',sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    opacity: 0.72,
                  }}
                >
                  {project.location} · {project.category} · {project.year}
                </p>
                <p
                  style={{
                    margin: 0,
                    maxWidth: 420,
                    fontFamily: "'DM Sans','Inter',sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.55,
                    opacity: 0.88,
                  }}
                >
                  {ONE_LINERS[project.id] ?? project.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: "1.5rem",
          right: "1.5rem",
          bottom: "1.35rem",
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) auto",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ height: 1, background: "#E8E2D9", overflow: "hidden" }}>
          <div ref={meterRef} style={{ width: "100%", height: "100%", background: "#C4955A" }} />
        </div>
        <span
          style={{
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.64rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#8a7355",
            whiteSpace: "nowrap",
          }}
        >
          Scroll projects
        </span>
      </div>
    </section>
  );
}