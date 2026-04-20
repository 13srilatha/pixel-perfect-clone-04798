import { useEffect, useRef, useState } from "react";
import { walkthrough } from "@/data/walkthrough";

export function Walkthrough() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const stepFloat = p * walkthrough.length;
      const idx = Math.min(walkthrough.length - 1, Math.floor(stepFloat));
      setActiveIdx(idx);
      setProgress(stepFloat - idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    walkthrough.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  return (
    <section
      id="walkthrough"
      ref={sectionRef}
      className="relative bg-ink text-cream"
      style={{ height: `${walkthrough.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {walkthrough.map((step, i) => {
          // Continuous crossfade — each frame fades in over its segment, no gaps
          const local = activeIdx + progress - i;
          let opacity = 0;
          if (local >= 0 && local < 1) {
            // current frame: full at start, eases out as next takes over
            opacity = 1 - Math.max(0, local - 0.7) / 0.3;
          } else if (local < 0 && local > -0.3) {
            // upcoming frame: fades in during last 30% of previous
            opacity = 1 + local / 0.3;
          } else if (local >= 1) {
            opacity = 0;
          }
          opacity = Math.max(0, Math.min(1, opacity));

          // Continuous Ken Burns: gentle zoom across the full segment for video-like motion
          const zoomProgress = Math.max(0, Math.min(1, local));
          const zoom = 1.0 + zoomProgress * 0.12;
          const translateY = (zoomProgress - 0.5) * 2; // subtle drift
          return (
            <div
              key={step.image}
              className="absolute inset-0"
              style={{ opacity, willChange: "opacity" }}
              aria-hidden={opacity < 0.5}
            >
              <img
                src={step.image}
                alt={step.title}
                className="h-full w-full object-cover"
                style={{
                  transform: `scale(${zoom}) translate3d(0, ${translateY}%, 0)`,
                  willChange: "transform",
                }}
                loading={i < 2 ? "eager" : "lazy"}
              />
              <div
                className={`absolute inset-0 ${
                  step.side === "exterior"
                    ? "bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40"
                    : "bg-gradient-to-t from-ink/85 via-ink/20 to-ink/30"
                }`}
              />
            </div>
          );
        })}

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-10 md:px-10 md:py-16">
          <div className="flex items-center justify-between">
            <p className="label text-gold-lt">
              {walkthrough[activeIdx].side === "exterior" ? "Outside · The Approach" : "Inside · The Stillness"}
            </p>
            <p className="label text-cream/70">
              {String(activeIdx + 1).padStart(2, "0")} / {String(walkthrough.length).padStart(2, "0")}
            </p>
          </div>

          <CaptionBlock idx={activeIdx} progress={progress} />

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              {walkthrough.map((_, i) => (
                <span key={i} className="h-[2px] flex-1 overflow-hidden bg-cream/15">
                  <span
                    className="block h-full bg-gold transition-all duration-200"
                    style={{
                      width:
                        i < activeIdx ? "100%" : i === activeIdx ? `${progress * 100}%` : "0%",
                    }}
                  />
                </span>
              ))}
            </div>
            <p className="label text-cream/60">Continue scrolling to walk in</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaptionBlock({ idx, progress }: { idx: number; progress: number }) {
  const step = walkthrough[idx];
  const opacity =
    progress < 0.15
      ? progress / 0.15
      : progress > 0.85
        ? Math.max(0, 1 - (progress - 0.85) / 0.15)
        : 1;

  return (
    <div className="max-w-2xl transition-opacity duration-100" style={{ opacity }} key={step.image}>
      <p className="label mb-4 text-gold">{step.label}</p>
      <h3 className="display text-[clamp(2.25rem,5.5vw,4.5rem)] text-cream">{step.title}</h3>
      <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/85 md:text-lg">{step.body}</p>
    </div>
  );
}
