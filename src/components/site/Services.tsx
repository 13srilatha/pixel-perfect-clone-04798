import { useEffect, useRef } from "react";

const SERVICES = [
  { title: "Architecture", body: "Context-driven design from concept to construction drawings." },
  { title: "Interior Design", body: "Materials, lighting, joinery — built from the inside out." },
  { title: "Planning", body: "Movement, usability, efficient spatial design." },
  { title: "Execution", body: "On-site coordination, supervision, and delivery." },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx ?? 0);
            (e.target as HTMLElement).style.transitionDelay = `${i * 0.15}s`;
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="services"
      aria-label="What we do"
      style={{ background: "#1A1A14", color: "#FAF8F4", padding: "7rem 1.5rem" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-14 max-w-2xl">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#FAF8F4",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            One studio. <em style={{ color: "#C4955A" }}>The full arc.</em>
          </h2>
          <p
            style={{
              marginTop: "1.2rem",
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "rgba(250,248,244,0.7)",
              maxWidth: 540,
            }}
          >
            From the first sketch to the final walkthrough — we stay with you.
          </p>
        </header>

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(196,149,90,0.25)" }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              data-card
              data-idx={i}
              style={{
                background: "#1A1A14",
                padding: "2rem 1.6rem 2.4rem",
                opacity: 0,
                transform: "translateY(28px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans','Inter',sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  color: "#C4955A",
                }}
              >
                0{i + 1}
              </span>
              <h3
                style={{
                  marginTop: "0.8rem",
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.6rem",
                  color: "#FAF8F4",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  marginTop: "0.6rem",
                  fontFamily: "'DM Sans','Inter',sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.55,
                  color: "rgba(250,248,244,0.65)",
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
