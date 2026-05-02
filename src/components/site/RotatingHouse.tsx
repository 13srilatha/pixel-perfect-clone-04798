import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { rotationFrames, rotationMeta } from "@/data/rotation";
import { studio } from "@/data/projects";
import { Reveal } from "./Nav";

/**
 * Best Project: 360° rotation pinned, then a Reel sub-section that scrolls in
 * naturally below — no separate "Reel" section in the page anymore.
 *
 * Reel: tries /reel.mp4 first (drop your file in /public). Falls back to a
 * poster + play overlay → opens Instagram in a new tab on click.
 */
export function RotatingHouse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [frameIdx, setFrameIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload all rotation frames
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

  // Drive the frame index from scroll across the rotation block
  const rotationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = rotationRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = el.offsetHeight - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = total > 0 ? scrolled / total : 0;
        const idx = Math.min(rotationFrames.length - 1, Math.floor(progress * rotationFrames.length));
        setFrameIdx(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="rotate" ref={sectionRef} className="relative bg-espresso text-cream">
      {/* ── 360° Rotation block ─────────────────────────────────────────── */}
      <div
        ref={rotationRef}
        className="relative"
        style={{ height: `${rotationFrames.length * 60}vh` }}
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
                  Continue scrolling to rotate · then watch the reel
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Inline Launch Reel ─────────────────────────────────────────── */}
      <ReelInline />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

import poster from "@/assets/projects/munny-3d.jpeg";

function ReelInline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [inView, setInView] = useState(false);

  // Parallax effect on the poster
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  // Autoplay video when it scrolls into view, pause when out
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        const visible = e.isIntersecting && e.intersectionRatio > 0.35;
        setInView(visible);
        const v = videoRef.current;
        if (!v) return;
        if (visible) v.play().catch(() => { /* autoplay may be blocked, that's fine */ });
        else v.pause();
      },
      { threshold: [0, 0.35, 0.7] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reel"
      className="relative border-t border-cream/10 bg-espresso py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="mb-14 max-w-3xl">
          <p className="label mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold">Studio · Launch Reel</span>
          </p>
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)] text-cream">
            The day we opened <em className="italic text-gold-lt">our doors</em>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/75">
            A short film from the Terra Space Studio launch. Tap to watch the full reel on Instagram.
          </p>
        </Reveal>

        <Reveal>
          <a
            href={studio.reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto block aspect-[16/9] w-full overflow-hidden bg-ink"
          >
            {/* Try video first; if it fails (no /reel.mp4 yet) we hide it and show poster */}
            {hasVideo && (
              <motion.video
                ref={videoRef}
                style={{ y, scale }}
                src="/reel.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setHasVideo(false)}
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden
              />
            )}

            {/* Poster fallback / overlay underneath */}
            <motion.img
              style={{ y, scale }}
              src={poster}
              alt="Terra Space Studio launch reel poster"
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hasVideo ? "opacity-0" : "opacity-100"} ${inView ? "brightness-90" : "brightness-75"}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

            {/* Film bars */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,_var(--cream)_0_4px,_transparent_4px_10px)] opacity-40" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-[repeating-linear-gradient(90deg,_var(--cream)_0_4px,_transparent_4px_10px)] opacity-40" />

            {/* Pulsing play button */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-24 w-24 items-center justify-center md:h-32 md:w-32">
                <span className={`absolute inset-0 rounded-full border border-cream/60 ${inView ? "animate-ping" : ""}`} />
                <span className="absolute inset-0 rounded-full border border-cream/40" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-cream/95 text-espresso transition-transform duration-500 group-hover:scale-110 md:h-24 md:w-24">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-0.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
              <div>
                <p className="label text-gold-lt">@{studio.instagram}</p>
                <p className="font-display text-2xl font-light text-cream md:text-4xl">Watch the launch on Instagram</p>
              </div>
              <span className="label hidden items-center gap-2 text-cream/80 md:inline-flex">
                Open Reel <span aria-hidden>↗</span>
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
