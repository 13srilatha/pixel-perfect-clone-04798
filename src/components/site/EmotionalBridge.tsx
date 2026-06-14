import { useEffect, useRef } from "react";
import bgImg from "@/assets/uploads/bridge-light.png";

const LINES = [
  "It's about the morning light that finds your kitchen.",
  "The room your children remember forever.",
  "The home that becomes the story of your family.",
];

export function EmotionalBridge() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx ?? 0);
            (e.target as HTMLElement).style.transitionDelay = `${i * 0.25}s`;
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="What home really means"
      style={{
        position: "relative",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "8rem 1.5rem",
        color: "#FAF8F4",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(26,26,20,0.78) 0%, rgba(26,26,20,0.65) 100%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 md:gap-20">
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            lineHeight: 1.05,
            margin: 0,
            color: "#FAF8F4",
          }}
        >
          This isn't just
          <br />
          about <em style={{ color: "#C4955A" }}>four walls.</em>
        </h2>

        <div className="flex flex-col gap-7 md:pt-4">
          {LINES.map((line, i) => (
            <p
              key={i}
              data-reveal
              data-idx={i}
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.9s ease, transform 0.9s ease",
                fontFamily: "'Cormorant Garamond',serif",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                lineHeight: 1.55,
                color: "rgba(250,248,244,0.92)",
                margin: 0,
                borderLeft: "1px solid rgba(196,149,90,0.5)",
                paddingLeft: "1.25rem",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-2xl text-center">
        <p
          style={{
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C4955A",
            marginBottom: "0.8rem",
          }}
        >
          Every space we design begins with one question
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)",
            fontStyle: "italic",
            color: "#FAF8F4",
            margin: 0,
          }}
        >
          How should this home make you feel?
        </p>
      </div>
    </section>
  );
}
