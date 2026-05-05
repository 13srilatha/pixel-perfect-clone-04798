import { useEffect, useRef, useState } from "react";

/**
 * Editorial chapter divider — large numeral, small kicker, italic title and a
 * one-line subtitle. Animates in on scroll. Used between major sections to
 * give the homepage the rhythm of a magazine spread.
 */
export function ChapterIntro({
  number,
  kicker,
  title,
  italic,
  subtitle,
  align = "left",
  tone = "cream",
}: {
  number: string;
  kicker: string;
  title: string;
  italic?: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "cream" | "ink";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isInk = tone === "ink";

  return (
    <section
      className={`relative overflow-hidden ${isInk ? "bg-ink text-cream" : "bg-cream text-espresso"} py-24 md:py-36`}
      aria-label={`${kicker} — ${title}`}
    >
      <div
        ref={ref}
        className={`relative mx-auto flex max-w-[1600px] flex-col gap-6 px-6 md:px-10 ${align === "center" ? "items-center text-center" : ""}`}
      >
        {/* Giant chapter numeral */}
        <span
          className={`pointer-events-none select-none font-display font-light leading-none transition-all duration-1000 ${
            isInk ? "text-cream/10" : "text-espresso/[0.08]"
          } ${seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ fontSize: "clamp(8rem, 22vw, 22rem)" }}
        >
          {number}
        </span>

        <div
          className={`-mt-[8vw] flex max-w-3xl flex-col gap-5 transition-all duration-700 ${align === "center" ? "items-center" : ""} ${
            seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <p className={`label inline-flex items-center gap-3 ${isInk ? "text-gold" : "text-caramel"}`}>
            <span className={`h-px w-10 ${isInk ? "bg-gold" : "bg-caramel"}`} />
            {kicker}
          </p>

          <h2
            className={`display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.95] ${isInk ? "text-cream" : "text-espresso"}`}
          >
            {title}{" "}
            {italic && (
              <em className={`italic ${isInk ? "text-gold" : "text-caramel"}`}>{italic}</em>
            )}
          </h2>

          {subtitle && (
            <p
              className={`max-w-xl text-lg leading-relaxed text-pretty ${isInk ? "text-cream/75" : "text-brown"}`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
