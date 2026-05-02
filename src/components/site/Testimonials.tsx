import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { studio } from "@/data/projects";
import { Reveal } from "./Nav";
import poster from "@/assets/projects/munny-3d.jpeg";
import founder from "@/assets/architect-portrait.jpeg";

/**
 * "Client Words" — scroll-driven spread.
 * As the user scrolls into the section, four testimonial cards (two on each
 * side) start stacked behind a center founder portrait and gently spread
 * outward, fading in. Inspired by the reference video.
 */

interface Testimonial {
  name: string;
  city: string;
  quote: string;
}

const CARDS: Testimonial[] = [
  {
    name: "Charry",
    city: "Hyderabad",
    quote:
      "Clear about the budget from day one. Drawings were detailed; we always knew what to expect.",
  },
  {
    name: "Muthyam",
    city: "Hyderabad",
    quote:
      "They visited the site many times before finalising the plan. Room orientation came out exactly as discussed.",
  },
  {
    name: "Lakshmi",
    city: "Hyderabad",
    quote:
      "The pooja room and kitchen layout came out well. Storage was thought through — nothing felt missing later.",
  },
  {
    name: "Ravi Tej",
    city: "Hyderabad",
    quote:
      "Realistic timelines. When small delays happened on site, they kept us informed instead of going quiet.",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Drive spread between scroll progress 0.15 → 0.55
  const spread = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-espresso text-cream"
    >
      <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-24 md:px-10 md:pb-24 md:pt-36">
        <Reveal className="mb-16 max-w-3xl text-center md:mx-auto md:text-center">
          <p className="label mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold">Client Words</span>
            <span className="h-px w-10 bg-gold/60" />
          </p>
          <h2 className="display text-[clamp(2.25rem,6vw,5rem)] text-cream">
            What people <em className="italic text-gold-lt">say</em>.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-cream/75 md:text-lg">
            Scroll down — honest words from the families and owners we have built for.
          </p>
        </Reveal>

        {/* Spread layout — works on mobile and desktop with tuned offsets */}
        <div className="relative flex min-h-[440px] items-center justify-center md:min-h-[520px]">
          {/* Center founder card */}
          <div className="relative z-10 h-[300px] w-[200px] overflow-hidden rounded-2xl border border-cream/15 shadow-2xl md:h-[420px] md:w-[300px]">
            <img
              src={founder}
              alt="Founder, Terra Space Studio"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-3 md:p-5">
              <p className="font-display text-sm font-light text-cream md:text-lg">The studio</p>
              <p className="label text-[10px] text-gold-lt md:text-xs">Hyderabad · since 2019</p>
            </div>
          </div>

          {/* 4 spreading cards — 2 left, 2 right */}
          <SpreadCard t={CARDS[0]} side="left" depth={1} progress={spread} />
          <SpreadCard t={CARDS[1]} side="left" depth={2} progress={spread} />
          <SpreadCard t={CARDS[2]} side="right" depth={1} progress={spread} />
          <SpreadCard t={CARDS[3]} side="right" depth={2} progress={spread} />
        </div>
      </div>

      <ReelInline />
    </section>
  );
}

function SpreadCard({
  t,
  side,
  depth,
  progress,
}: {
  t: Testimonial;
  side: "left" | "right";
  depth: 1 | 2;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  // Detect mobile to use tighter offsets so cards stay on-screen on phones
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const dir = side === "left" ? -1 : 1;
  // Mobile: 110 / 200, Desktop: 220 / 460
  const near = isMobile ? 110 : 220;
  const far = isMobile ? 205 : 460;
  const target = (depth === 1 ? near : far) * dir;
  const x = useTransform(progress, [0, 1], [0, target]);
  const opacity = useTransform(progress, [0, 0.3, 1], [0, 0.6, 1]);
  const rotate = useTransform(progress, [0, 1], [0, dir * (depth === 1 ? -3 : -6)]);
  const scale = useTransform(progress, [0, 1], [0.85, 1]);

  return (
    <motion.article
      style={{ x, opacity, rotate, scale }}
      className="absolute z-0 w-[160px] overflow-hidden rounded-2xl border border-cream/15 bg-cream/[0.07] p-3 backdrop-blur-md md:w-[280px] md:p-6"
    >
      <span className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gold/15 blur-2xl" />
      <p className="font-display text-[11px] italic leading-relaxed text-cream md:text-base">
        "{t.quote}"
      </p>
      <div className="mt-3 flex items-center gap-2 border-t border-cream/15 pt-2 md:mt-4 md:gap-3 md:pt-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/30 font-display text-xs font-light text-cream md:h-8 md:w-8 md:text-sm">
          {t.name.charAt(0)}
        </span>
        <div>
          <p className="font-display text-xs font-light text-cream md:text-sm">{t.name}</p>
          <p className="label text-[9px] text-cream/60 md:text-[10px]">{t.city}</p>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function ReelInline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        const visible = e.isIntersecting && e.intersectionRatio > 0.35;
        setInView(visible);
        const v = videoRef.current;
        if (!v) return;
        if (visible) v.play().catch(() => { /* autoplay may be blocked */ });
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
        </Reveal>

        <Reveal>
          <a
            href={studio.reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto block aspect-[16/9] w-full overflow-hidden bg-ink"
          >
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
            <motion.img
              style={{ y, scale }}
              src={poster}
              alt="Terra Space Studio launch reel poster"
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hasVideo ? "opacity-0" : "opacity-100"} ${inView ? "brightness-90" : "brightness-75"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

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
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
