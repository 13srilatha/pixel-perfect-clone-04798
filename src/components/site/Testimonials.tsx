import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { studio } from "@/data/projects";
import { Reveal } from "./Nav";
import poster from "@/assets/projects/munny-3d.jpeg";

/**
 * "Happiness Speaks" — testimonials laid out as two horizontal marquee rows
 * that scroll in opposite directions (continuously, smoothly), inspired by
 * the Webflow "testimonials scrolling animation". The motion never stops,
 * pauses on hover, and the same content is duplicated to create a seamless
 * infinite loop.
 */

interface Testimonial {
  name: string;
  city: string;
  quote: string;
}

const ROW_A: Testimonial[] = [
  {
    name: "Charry",
    city: "Hyderabad",
    quote:
      "We were clear about the budget from day one and the team respected it. The drawings were detailed and we knew what to expect at every stage.",
  },
  {
    name: "Muthyam",
    city: "Hyderabad",
    quote:
      "They visited our site multiple times before finalising the plan. The orientation of the rooms turned out exactly as discussed.",
  },
  {
    name: "Lakshmi",
    city: "Hyderabad",
    quote:
      "The pooja room and kitchen layout came out well. Storage was planned thoughtfully — we didn't have to add anything later.",
  },
  {
    name: "Pranay & Divya",
    city: "Hyderabad",
    quote:
      "Good communication throughout the project. They listened to small things — like where we wanted plug points — and remembered them.",
  },
];

const ROW_B: Testimonial[] = [
  {
    name: "Ravi Tej",
    city: "Hyderabad",
    quote:
      "Timelines were realistic, not exaggerated. When small delays happened on site, they kept us informed instead of going quiet.",
  },
  {
    name: "Ananya",
    city: "Hyderabad",
    quote:
      "We renovated our 2BHK with them. The before-after difference is genuine, and the work was clean — no surprises in the final bill.",
  },
  {
    name: "Krishna",
    city: "Hyderabad",
    quote:
      "Liked that they explained material choices instead of just picking for us. We understood why each thing was used in our home.",
  },
  {
    name: "Sandeep",
    city: "Hyderabad",
    quote:
      "Site visits were on schedule and the team answered every doubt patiently. It felt like our home was their home too.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-espresso text-cream">
      <div className="mx-auto max-w-[1600px] px-6 pb-24 pt-24 md:px-10 md:pb-36 md:pt-36">
        <Reveal className="mb-16 max-w-3xl">
          <p className="label mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold">Happiness Speaks</span>
          </p>
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)] text-cream">
            What our clients <em className="italic text-gold-lt">say</em>.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-cream/75 md:text-lg">
            Honest feedback from the families and owners we have worked with.
          </p>
        </Reveal>
      </div>

      {/* Horizontal scrolling marquee rows — full-bleed */}
      <div className="space-y-6 pb-24 md:space-y-8 md:pb-36">
        <MarqueeRow items={ROW_A} duration={45} direction="left" />
        <MarqueeRow items={ROW_B} duration={55} direction="right" />
      </div>

      {/* Inline Launch Reel kept on this section */}
      <ReelInline />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function MarqueeRow({
  items,
  duration,
  direction,
}: {
  items: Testimonial[];
  duration: number;
  direction: "left" | "right";
}) {
  // Duplicate the list so the translation can loop seamlessly from 0 → -50%.
  const loop = [...items, ...items];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div
      className="group relative w-full overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max gap-6 px-6 group-hover:[animation-play-state:paused] md:gap-8"
        animate={{ x: [from, to] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {loop.map((t, i) => (
          <TestimonialCard key={`${direction}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="relative w-[82vw] shrink-0 overflow-hidden rounded-2xl border border-cream/15 bg-cream/[0.06] p-6 backdrop-blur-md sm:w-[420px] md:w-[460px] md:p-8">
      {/* Bubble-glass highlights */}
      <span className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
      <span className="pointer-events-none absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-cream/10 blur-3xl" />

      <p className="font-display text-base italic leading-relaxed text-cream md:text-lg">
        "{t.quote}"
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-cream/15 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/30 font-display text-base font-light text-cream">
          {t.name.charAt(0)}
        </span>
        <div>
          <p className="font-display text-base font-light text-cream">{t.name}</p>
          <p className="label text-cream/60">{t.city}</p>
        </div>
      </div>
    </article>
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
