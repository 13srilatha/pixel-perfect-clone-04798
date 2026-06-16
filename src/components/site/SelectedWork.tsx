/**
 * SelectedWork — two-part work section.
 * Part A: 4 cards with emotional lines, scroll-reveal images
 * Part B: Horizontal scroll category panels (Residential / Interior / Commercial / Renovation)
 */
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";

// ─── Emotional card data ───────────────────────────────────────────────────
const CARDS = [
  {
    id: "munny-residence",
    emotion: "It's about the morning light that finds your kitchen.",
    oneliner: "Three-storey contemporary home in stone, wood and glass.",
  },
  {
    id: "tree-of-life-villa",
    emotion: "The room your children remember forever.",
    oneliner: "A meditative façade carved with the Bodhi motif.",
  },
  {
    id: "heritage-bungalow",
    emotion: "The home that becomes the story of your family.",
    oneliner: "A 1960s bungalow restored — memory kept, comfort added.",
  },
  {
    id: "curved-residence",
    emotion: "The space where work becomes purpose.",
    oneliner: "A studio designed for focus, light, and belonging.",
  },
];

// ─── Category panels ───────────────────────────────────────────────────────
const CATEGORIES = [
  {
    num: "01",
    title: "Residential",
    desc: "Your home is built once. We design it to last a lifetime.",
  },
  {
    num: "02",
    title: "Interior Design",
    desc: "Built-in joinery, material palettes drawn room by room.",
  },
  {
    num: "03",
    title: "Commercial",
    desc: "Workplaces where people actually want to spend time.",
  },
  {
    num: "04",
    title: "Renovation",
    desc: "Old buildings carry history. We listen before we change.",
  },
];

// ─── Reusable reveal hook ──────────────────────────────────────────────────
function useScrollReveal<T extends HTMLElement>(
  selector: string,
  fromStyle: Partial<CSSStyleDeclaration>,
  toStyle: Partial<CSSStyleDeclaration>,
  threshold = 0.2,
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(selector);
    targets.forEach((t) => {
      Object.assign(t.style, fromStyle);
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            Object.assign((e.target as HTMLElement).style, toStyle);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Component ────────────────────────────────────────────────────────────
export function SelectedWork() {
  // Scroll reveal for card images (translateY up)
  const cardsRef = useScrollReveal<HTMLElement>(
    "[data-reveal-img]",
    { transform: "translateY(50px)", opacity: "0", transition: "transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease" },
    { transform: "translateY(0)", opacity: "1" },
    0.15,
  );

  // Scroll reveal for emotion text lines
  const textRef = useScrollReveal<HTMLElement>(
    "[data-reveal-text]",
    { transform: "translateY(24px)", opacity: "0", transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1) var(--delay,0s), opacity 0.7s ease var(--delay,0s)" },
    { transform: "translateY(0)", opacity: "1" },
    0.2,
  );

  const picks = CARDS.map(({ id }) => projects.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      {/* ── PART A: Emotional 4-card grid ── */}
      <section
        ref={cardsRef}
        id="work"
        aria-label="Selected work"
        style={{ background: "#FAF8F4", padding: "7rem 1.5rem" }}
      >
        <div ref={textRef} style={{ maxWidth: 1400, margin: "0 auto" }}>
          {/* Section header */}
          <header style={{ marginBottom: "3.5rem", maxWidth: "36rem" }}>
            <p
              data-reveal-text
              style={{
                fontFamily: "'DM Sans','Inter',sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#C4955A",
                marginBottom: "0.9rem",
                "--delay": "0s",
              } as React.CSSProperties}
            >
              Selected Work
            </p>
            <h2
              data-reveal-text
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: "#1A1A14",
                margin: 0,
                lineHeight: 1.05,
                "--delay": "0.1s",
              } as React.CSSProperties}
            >
              Houses that hold <em style={{ color: "#C4955A" }}>memory.</em>
            </h2>
          </header>

          {/* 4-card grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {picks.map((p, i) => {
              if (!p) return null;
              const cardData = CARDS[i];
              return (
                <article
                  key={p.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #E8E2D9",
                    overflow: "hidden",
                    borderRadius: "4px",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector<HTMLElement>("[data-reveal-img]");
                    if (img) img.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector<HTMLElement>("[data-reveal-img]");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  {/* Image container */}
                  <div style={{ overflow: "hidden", aspectRatio: "4/3", background: "#E8E2D9" }}>
                    <img
                      data-reveal-img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease",
                      }}
                    />
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "1.4rem 1.5rem 1.8rem" }}>
                    {/* Emotional line */}
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontStyle: "italic",
                        fontSize: "1.05rem",
                        color: "#C4955A",
                        margin: "0 0 0.8rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {cardData?.emotion}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "1.4rem",
                        fontWeight: 300,
                        color: "#1A1A14",
                        margin: "0 0 0.3rem",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        margin: "0 0 0.7rem",
                        fontFamily: "'DM Sans','Inter',sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                        color: "#8a7355",
                      }}
                    >
                      {p.location} · {p.category}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "'DM Sans','Inter',sans-serif",
                        fontSize: "0.88rem",
                        lineHeight: 1.55,
                        color: "#4A4A42",
                      }}
                    >
                      {cardData?.oneliner}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PART B: Horizontal category scroll ── */}
      <section
        aria-label="Work by practice"
        style={{ background: "#1A1A14", padding: "5rem 0" }}
      >
        {/* Header */}
        <div style={{ padding: "0 1.5rem", maxWidth: 1400, margin: "0 auto 3rem" }}>
          <p
            style={{
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#C4955A",
              marginBottom: "0.75rem",
            }}
          >
            Explore by Practice
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#FAF8F4",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            One studio. <em style={{ color: "#C4955A" }}>Four practices.</em>
          </h2>
        </div>

        {/* Scrollable panels */}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            gap: "0",
            paddingLeft: "1.5rem",
            paddingBottom: "1.5rem",
            cursor: "grab",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={(e) => {
            const el = e.currentTarget;
            let isDown = true;
            const startX = e.pageX - el.offsetLeft;
            const scrollLeft = el.scrollLeft;
            el.style.cursor = "grabbing";
            const onMove = (ev: MouseEvent) => {
              if (!isDown) return;
              const x = ev.pageX - el.offsetLeft;
              el.scrollLeft = scrollLeft - (x - startX) * 1.5;
            };
            const onUp = () => {
              isDown = false;
              el.style.cursor = "grab";
              document.removeEventListener("mousemove", onMove);
              document.removeEventListener("mouseup", onUp);
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.num}
              style={{
                minWidth: "clamp(280px, 36vw, 400px)",
                flexShrink: 0,
                scrollSnapAlign: "start",
                padding: "2.5rem 2.5rem 2.5rem",
                borderRight: i < CATEGORIES.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "#C4955A",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {cat.num}
              </span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  color: "#FAF8F4",
                  margin: "0 0 0.75rem",
                }}
              >
                {cat.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(250,248,244,0.55)",
                  lineHeight: 1.7,
                  margin: "0 0 2rem",
                  maxWidth: "28ch",
                }}
              >
                {cat.desc}
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C4955A",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(196,149,90,0.4)",
                  paddingBottom: "0.2rem",
                  display: "inline-block",
                }}
              >
                Enquire →
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
