import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { studio } from "@/data/projects";
import { Reveal } from "./Nav";
import poster from "@/assets/projects/munny-3d.jpeg";

/**
 * "Happiness Speaks" — testimonials section with a 3-column parallax-tilt
 * grid. Each column moves at a different scroll speed, and each card tilts
 * forward as it enters and back as it exits the viewport. Cards have a
 * frosted-glass background.
 *
 * Followed by the inline Launch Reel (kept from the previous Best Project
 * section) so the reel still has a home on the page.
 */

interface Testimonial {
  name: string;
  city: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[][] = [
  // Column 1
  [
    {
      name: "Charry",
      city: "Hyderabad",
      quote:
        "Vaasanthi garu didn't design a house — she designed where my mother makes filter coffee on Sunday mornings. That's the only review I can give.",
    },
    {
      name: "Pranay & Divya",
      city: "Hyderabad",
      quote:
        "We told her we wanted 'a quiet house'. She gave us a home where even the doorbell sounds gentle.",
    },
  ],
  // Column 2 (centre)
  [
    {
      name: "Muthyam",
      city: "Chandigarh",
      quote:
        "She walked our plot for two hours before drawing a single line. That patience is now in every wall of our home.",
    },
    {
      name: "Lakshmi Aunty",
      city: "Mohali",
      quote:
        "I asked for a pooja room. She gave me a corner of light. My grandchildren now sit there to study.",
    },
    {
      name: "Ravi Tej",
      city: "Hyderabad",
      quote:
        "Every contractor I had worked with rushed me. Terra Space Studio waited with me. The house feels the difference.",
    },
  ],
  // Column 3
  [
    {
      name: "Ananya",
      city: "Punjab",
      quote:
        "I cried the first morning I had chai in my new kitchen. The light fell exactly where she said it would.",
    },
    {
      name: "Krishna & Family",
      city: "Hyderabad",
      quote:
        "She didn't build us a 'modern home'. She built us our amma's old verandah, with new bones. Bless her.",
    },
  ],
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
            What our families <em className="italic text-gold-lt">whisper</em> back.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/75">
            The homes we build are kind enough to send their love back to us. Here is some of it.
          </p>
        </Reveal>

        <ParallaxTiltGrid />
      </div>

      {/* Inline Launch Reel kept on this section */}
      <ReelInline />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function ParallaxTiltGrid() {
  const speeds = [1.2, 1.0, 1.4]; // left, centre, right column scroll speeds

  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-8">
      {TESTIMONIALS.map((col, ci) => (
        <ParallaxColumn key={ci} speed={speeds[ci]}>
          {col.map((t, i) => (
            <TestimonialCard key={`${ci}-${i}`} t={t} />
          ))}
        </ParallaxColumn>
      ))}
    </div>
  );
}

function ParallaxColumn({
  children,
  speed,
}: {
  children: React.ReactNode;
  speed: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Different vertical offset based on speed
  const range = (speed - 1) * 80; // px range
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div ref={ref} style={{ y }} className="flex flex-col gap-6 md:gap-8">
      {children}
    </motion.div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Tilt forward when entering (bottom), back when exiting (top)
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, opacity, transformPerspective: 1000 }}
      className="relative overflow-hidden rounded-2xl border border-cream/15 bg-cream/[0.06] p-6 backdrop-blur-md md:p-8"
    >
      {/* Bubble-glass highlight */}
      <span className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
      <span className="pointer-events-none absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-cream/10 blur-3xl" />

      <p className="font-display text-lg italic leading-relaxed text-cream md:text-xl">
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
    </motion.div>
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
