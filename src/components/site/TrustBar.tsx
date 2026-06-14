import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 40, suffix: "+", label: "Projects" },
  { value: 6, suffix: "+", label: "Years" },
  { value: 5.0, suffix: " ★", label: "Google · 12 Reviews", decimal: true },
  { value: 2, suffix: "", label: "Hyderabad & Vijayawada", static: "Hyderabad & Vijayawada" },
];

function useCountUp(target: number, decimal = false, duration = 1500, start = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return decimal ? v.toFixed(1) : Math.round(v).toString();
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Trust signals"
      className="border-y"
      style={{
        background: "#FAF8F4",
        borderColor: "#E8E2D9",
        padding: "2rem 1.5rem",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-around gap-y-6">
        {STATS.map((s, i) => (
          <Stat key={i} {...s} start={active} />
        ))}
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  decimal,
  static: staticText,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  decimal?: boolean;
  static?: string;
  start: boolean;
}) {
  const n = useCountUp(value, decimal, 1500, start);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <span
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          color: "#1A1A14",
          lineHeight: 1,
        }}
      >
        {staticText ? "" : n}
        {!staticText && suffix}
        {staticText && (
          <span style={{ fontSize: "1.1rem", letterSpacing: "0.15em" }}>{staticText}</span>
        )}
      </span>
      {!staticText && (
        <span
          style={{
            marginTop: "0.55rem",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#4A4A42",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
