import { useEffect, useRef, useState } from "react";
import { studio } from "@/data/projects";
import { Reveal } from "./Nav";
import poster from "@/assets/projects/munny-3d.jpeg";

export function Reel() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.4),
      { threshold: [0, 0.4, 0.8] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="reel" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="mb-14 max-w-3xl">
          <p className="label mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-caramel" />
            Studio · Launch Reel
          </p>
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)] text-espresso">
            The day we opened <em className="italic text-caramel">our doors</em>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brown">
            A short film from the Terra Space Studio launch. Tap to watch the full reel on Instagram.
          </p>
        </Reveal>

        <Reveal>
          <a
            href={studio.reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
            className="group relative mx-auto block aspect-[9/16] w-full max-w-[420px] overflow-hidden bg-espresso md:aspect-[16/9] md:max-w-none"
          >
            <img
              src={poster}
              alt="Terra Space Studio launch reel"
              loading="lazy"
              className={`h-full w-full object-cover transition-all duration-[1500ms] ${inView ? "scale-105 brightness-90" : "scale-100 brightness-75"} group-hover:scale-110`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />

            {/* Animated film grain bars */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,_var(--cream)_0_4px,_transparent_4px_10px)] opacity-40" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-[repeating-linear-gradient(90deg,_var(--cream)_0_4px,_transparent_4px_10px)] opacity-40" />

            {/* Pulsing play button */}
            <div className="absolute inset-0 flex items-center justify-center">
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
