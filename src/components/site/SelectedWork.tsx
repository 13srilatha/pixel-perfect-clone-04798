import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Residential",
    line: "Homes planned around privacy, light, family routines, and long-term comfort.",
    image: "/images/terra-review-exterior.png",
  },
  {
    num: "02",
    title: "Interior Design",
    line: "Warm, refined rooms shaped through material palettes, joinery, lighting, and detail.",
    image: "/images/terra-review-interior.png",
  },
  {
    num: "03",
    title: "Commercial",
    line: "Practical workplaces and public interiors with calm authority and clear movement.",
    image: projects.find((p) => p.category === "Commercial")?.image,
  },
  {
    num: "04",
    title: "Renovations",
    line: "Old buildings are listened to first — then repaired, adapted, and made useful again.",
    image: projects.find((p) => p.category === "Renovation")?.image,
  },
];

const FEATURED = [
  {
    project: projects.find((p) => p.id === "munny-residence"),
    emotion: "A house is not only an elevation. It is morning light, movement, and memory.",
  },
  {
    project: projects.find((p) => p.id === "tree-of-life-villa"),
    emotion: "Context, climate, proportion, and craft — held together with restraint.",
  },
  {
    project: projects.find((p) => p.id === "office-reception"),
    emotion: "Commercial spaces can still feel grounded, human, and quietly memorable.",
  },
  {
    project: projects.find((p) => p.id === "heritage-bungalow"),
    emotion: "Renovation is not replacement. It is keeping what already has soul.",
  },
].filter((item): item is { project: NonNullable<(typeof item)["project"]>; emotion: string } => Boolean(item.project));

export function SelectedWork() {
  const servicesRef = useRef<HTMLElement>(null);
  const serviceCardsRef = useRef<HTMLDivElement[]>([]);
  const storyRef = useRef<HTMLElement>(null);
  const storyCardsRef = useRef<HTMLElement[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      gsap.set(serviceCardsRef.current, { autoAlpha: 0, y: 80, scale: 0.94 });
      gsap.to(serviceCardsRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        stagger: 0.14,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: servicesRef.current, start: "top 68%", end: "top 20%", scrub: 0.85 },
      });

      gsap.set(storyCardsRef.current, { autoAlpha: 0, yPercent: 26, rotate: (i) => [-3, 2, -1, 3][i] ?? 0 });
      gsap.to(storyCardsRef.current, {
        autoAlpha: 1,
        yPercent: 0,
        stagger: 0.22,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: storyRef.current, start: "top 72%", end: "center center", scrub: 1 },
      });
      gsap.to(stripRef.current, {
        xPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: storyRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    return () => {
      window.__lenis?.off("scroll", sync);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={servicesRef}
        id="work"
        aria-label="Terra Space Studio services"
        style={{ position: "relative", overflow: "hidden", background: "#FAF8F4", padding: "7rem 1.5rem" }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <header style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2rem", alignItems: "end", marginBottom: "3.5rem" }}>
            <div>
              <p style={eyebrowStyle}>What We Do</p>
              <h2 style={headlineStyle}>From concept to completion.</h2>
            </div>
            <p style={{ margin: 0, fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "#4A4A42" }}>
              Complete end-to-end design and build solutions — clarity, craftsmanship, and care from the first idea to the final walkthrough.
            </p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", minHeight: 560, borderTop: "1px solid #E8E2D9", borderLeft: "1px solid #E8E2D9" }}>
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) serviceCardsRef.current[index] = el;
                }}
                style={{ position: "relative", minHeight: 520, overflow: "hidden", borderRight: "1px solid #E8E2D9", borderBottom: "1px solid #E8E2D9", background: "#F3EEE6" }}
              >
                <img src={service.image} alt={`${service.title} by Terra Space Studio`} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.8)", transform: "scale(1.04)" }} />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,26,20,0.18) 0%, rgba(26,26,20,0.82) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.4rem" }}>
                  <span style={{ fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.7rem", letterSpacing: "0.28em", color: "#C4955A" }}>{service.num}</span>
                  <div>
                    <h3 style={{ margin: "0 0 0.8rem", fontFamily: "'Cormorant Garamond','Cormorant',serif", fontWeight: 300, fontSize: "clamp(2rem, 3vw, 3.1rem)", lineHeight: 1, color: "#FAF8F4" }}>{service.title}</h3>
                    <p style={{ margin: 0, maxWidth: "26ch", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(250,248,244,0.78)" }}>{service.line}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={storyRef} aria-label="Selected projects" style={{ position: "relative", overflow: "hidden", background: "#1A1A14", padding: "7rem 1.5rem 8rem" }}>
        <div ref={stripRef} aria-hidden="true" style={{ position: "absolute", left: 0, top: "8%", whiteSpace: "nowrap", fontFamily: "'Cormorant Garamond','Cormorant',serif", fontSize: "clamp(5rem, 16vw, 15rem)", lineHeight: 0.85, color: "rgba(196,149,90,0.09)", pointerEvents: "none" }}>
          EARTH · LIGHT · MATERIAL · EXPERIENCE · EARTH · LIGHT · MATERIAL · EXPERIENCE
        </div>
        <div style={{ position: "relative", maxWidth: 1400, margin: "0 auto" }}>
          <header style={{ marginBottom: "3.5rem", maxWidth: 680 }}>
            <p style={eyebrowStyle}>Selected Work</p>
            <h2 style={{ ...headlineStyle, color: "#FAF8F4" }}>Spaces that feel lived-in before they are lived in.</h2>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.2rem" }}>
            {FEATURED.map(({ project, emotion }, index) => (
              <article
                key={project.id}
                ref={(el) => {
                  if (el) storyCardsRef.current[index] = el;
                }}
                style={{ minHeight: 500, display: "flex", flexDirection: "column", background: "#FAF8F4", border: "1px solid rgba(196,149,90,0.28)", transformOrigin: "center bottom" }}
              >
                <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "#E8E2D9" }}>
                  <img src={project.image} alt={project.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.15rem" }}>
                  <p style={{ margin: "0 0 1rem", fontFamily: "'Cormorant Garamond','Cormorant',serif", fontSize: "1.35rem", lineHeight: 1.15, fontStyle: "italic", color: "#1A1A14" }}>“{emotion}”</p>
                  <p style={{ margin: 0, fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a7355" }}>
                    {project.title} · {project.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const eyebrowStyle: CSSProperties = {
  margin: "0 0 0.9rem",
  fontFamily: "'DM Sans','Inter',sans-serif",
  fontSize: "0.68rem",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "#C4955A",
};

const headlineStyle: CSSProperties = {
  margin: 0,
  fontFamily: "'Cormorant Garamond','Cormorant',serif",
  fontWeight: 300,
  fontSize: "clamp(2.7rem, 6vw, 6.8rem)",
  lineHeight: 0.94,
  color: "#1A1A14",
};