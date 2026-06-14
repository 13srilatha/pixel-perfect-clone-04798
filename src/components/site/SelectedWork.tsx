import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";

const PICK_IDS = ["munny-residence", "tree-of-life-villa", "heritage-bungalow"];
const ONE_LINERS: Record<string, string> = {
  "munny-residence": "Three-storey contemporary home in stone, wood and glass.",
  "tree-of-life-villa": "A meditative façade carved with the Bodhi motif.",
  "heritage-bungalow": "A 1960s bungalow restored — memory kept, comfort added.",
};

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card] [data-img]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const picks = PICK_IDS.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);

  return (
    <section
      ref={ref}
      id="work"
      aria-label="Selected work"
      style={{ background: "#FAF8F4", padding: "7rem 1.5rem" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-14 max-w-2xl">
          <p
            style={{
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#C4955A",
              marginBottom: "0.9rem",
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#1A1A14",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Houses that hold <em style={{ color: "#C4955A" }}>memory.</em>
          </h2>
        </header>

        <div className="grid gap-10 md:grid-cols-3">
          {picks.map((p) => (
            <article
              key={p.id}
              data-card
              style={{
                background: "#fff",
                border: "1px solid #E8E2D9",
                overflow: "hidden",
                borderRadius: "4px",
              }}
            >
              <div style={{ overflow: "hidden", aspectRatio: "16/9", background: "#E8E2D9" }}>
                <img
                  data-img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translateY(40px)",
                    transition: "transform 1s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              </div>
              <div style={{ padding: "1.5rem 1.5rem 1.8rem" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.5rem",
                    color: "#1A1A14",
                    margin: 0,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: "0.3rem 0 0.8rem",
                    fontFamily: "'DM Sans','Inter',sans-serif",
                    fontSize: "0.65rem",
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
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    color: "#4A4A42",
                  }}
                >
                  {ONE_LINERS[p.id] ?? p.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#process"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#process")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#1A1A14",
              borderBottom: "1px solid #C4955A",
              paddingBottom: "0.3rem",
              textDecoration: "none",
            }}
          >
            View all projects →
          </a>
        </div>
      </div>
    </section>
  );
}
