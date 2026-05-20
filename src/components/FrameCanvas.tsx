export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="work-intro"
      style={{
        background: "#f5f0e8",
        padding: "clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem)",
        borderTop: "1px solid #e0d8cc",
      }}
    >
      <div ref={ref} style={{ maxWidth: 1440, margin: "0 auto" }}>
        <p style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "0.55rem", letterSpacing: "0.38em",
          textTransform: "uppercase", color: "#B5934A",
          display: "flex", alignItems: "center", gap: "0.6rem",
          marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
        }}>
          <span style={{ display: "block", width: 24, height: 1, background: "#B5934A" }} />
          Architecture · Interiors · Planning
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
          fontSize: "clamp(2.8rem, 8vw, 7.5rem)",
          fontWeight: 300, lineHeight: 0.95,
          color: "#2c1a0e",
          maxWidth: "14ch",
        }}>
          Designing spaces grounded in{" "}
          <em style={{ color: "#B5934A", fontStyle: "italic" }}>earth and experience.</em>
        </h1>
        <div style={{
          marginTop: "clamp(2rem, 4vh, 3.5rem)",
          display: "flex", gap: "clamp(1rem, 3vw, 3rem)",
          flexWrap: "wrap", alignItems: "center",
        }}>
          <a
            href="#work"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.55rem", letterSpacing: "0.3em",
              textTransform: "uppercase",
              border: "1px solid #2c1a0e",
              color: "#2c1a0e",
              padding: "12px 32px",
              textDecoration: "none",
              transition: "background 0.25s, color 0.25s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = "#2c1a0e"; (e.target as HTMLElement).style.color = "#f5f0e8"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "#2c1a0e"; }}
          >
            View Our Work
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.55rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#B5934A",
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}
          >
            Begin a Project →
          </a>
        </div>
      </div>
    </section>
  );
}
