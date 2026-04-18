import { useEffect, useRef, useState } from "react";
import { rotationFrames, rotationMeta } from "@/data/rotation";
import { Reveal } from "./Nav";

export function RotatingHouse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [frameIdx, setFrameIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    let count = 0;
    rotationFrames.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        count += 1;
        if (count === rotationFrames.length && mounted) setLoaded(true);
      };
      img.src = src;
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(rotationFrames.length - 1, Math.floor(progress * rotationFrames.length));
      setFrameIdx(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="rotate"
      ref={sectionRef}
      className="relative bg-espresso text-cream"
      style={{ height: `${rotationFrames.length * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {rotationFrames.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden={i !== frameIdx}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
              style={{ opacity: i === frameIdx ? 1 : 0 }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/60" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] w-full flex-col justify-between px-6 py-10 md:px-10 md:py-16">
          <Reveal>
            <div>
              <p className="label text-gold">Our Best Project · 360°</p>
              <h2 className="display mt-4 max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] text-cream">
                Walk around the
                <br />
                <em className="italic text-gold-lt">{rotationMeta.projectName}.</em>
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col items-center gap-6 self-center">
            {!loaded && <p className="label text-cream/60">Loading frames…</p>}
            <div className="flex items-center gap-2">
              {rotationFrames.map((_, i) => (
                <span
                  key={i}
                  className={`h-px transition-all duration-300 ${i === frameIdx ? "w-10 bg-gold" : "w-5 bg-cream/30"}`}
                />
              ))}
            </div>
            <p className="label text-cream/70">
              {String(frameIdx + 1).padStart(2, "0")} / {String(rotationFrames.length).padStart(2, "0")}
            </p>
          </div>

          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <p className="max-w-md font-display text-lg italic text-cream/80">{rotationMeta.caption}</p>
              <p className="label text-gold/80 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" />
                Continue scrolling to rotate
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
