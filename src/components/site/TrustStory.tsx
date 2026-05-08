import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   TrustStory — trust-building storytelling section
   Inspired by The Design Loft's "From first idea to final handover" approach.
   Sits between the Hero and the Walkthrough chapter.
   ───────────────────────────────────────────────────────────────────────── */

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 1s cubic-bezier(0.25,0.1,0.25,1), transform 1s cubic-bezier(0.25,0.1,0.25,1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

const STATS = [
  { value: "8+", label: "Years of practice" },
  { value: "120+", label: "Homes completed" },
  { value: "45", label: "Day delivery promise" },
  { value: "10yr", label: "Warranty coverage" },
];

const PILLARS = [
  {
    icon: "✦",
    title: "Precision-led execution",
    body: "Every detail is carefully planned and executed so the final outcome matches the design with absolute accuracy.",
  },
  {
    icon: "◷",
    title: "45-day delivery promise",
    body: "Structured workflows and disciplined planning ensure timely delivery without compromising craftsmanship.",
  },
  {
    icon: "◈",
    title: "Single point of responsibility",
    body: "One studio. One contact. Complete ownership from planning and design to sourcing, execution and finishing.",
  },
  {
    icon: "◉",
    title: "10-year warranty",
    body: "Long-term warranty coverage ensures peace of mind and confidence long after project completion.",
  },
];

export function TrustStory() {
  return (
    <>
      <ManageItAll />
      <Pillars />
    </>
  );
}

/* ── "We manage it all" narrative section ── */
function ManageItAll() {
  const headRef = useReveal(0.1);
  const bodyRef = useReveal(0.1);
  const statsRef = useReveal(0.1);

  return (
    <section className="bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left column — headline + body */}
          <div className="md:col-span-6">
            <div ref={headRef}>
              <p className="label mb-5 inline-flex items-center gap-3 text-caramel">
                <span className="h-px w-10 bg-caramel" />
                The Studio Promise
              </p>
              <h2 className="display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] text-espresso">
                From first conversation{" "}
                <em className="italic text-caramel">to completed home</em>,
                we manage every step.
              </h2>
            </div>

            <div ref={bodyRef} className="mt-8 space-y-5 text-base leading-relaxed text-brown md:text-lg">
              <p>
                Designing a home should feel exciting and reassuring, not
                overwhelming. We take complete ownership of your interior
                journey — from planning and design to sourcing, execution and
                finishing — so you can enjoy the process with confidence and
                clarity.
              </p>
              <p>
                From your very first conversation with us to the moment you
                step into your finished home, our team remains closely
                involved at every stage. You always know what's happening,
                what comes next, and that your home is in safe hands.
              </p>

              <ul className="mt-6 space-y-3 border-t border-sand pt-6">
                {["End-to-end execution", "Single point of responsibility", "Clear timelines & quality checks"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-espresso">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#work"
                className="mt-8 inline-flex items-center gap-3 border border-espresso px-6 py-3 text-espresso transition-colors hover:bg-espresso hover:text-cream"
              >
                <span className="label normal-case tracking-wider">Explore our work</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right column — stats + badge */}
          <div className="md:col-span-6">
            <div ref={statsRef} className="grid grid-cols-2 gap-px border border-sand bg-sand">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-start gap-2 bg-cream p-8 md:p-10">
                  <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-none text-espresso">
                    {s.value}
                  </span>
                  <span className="label normal-case tracking-wide text-brown">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 border border-sand bg-beige p-6 md:p-8">
              <p className="font-display text-xl font-light italic text-caramel md:text-2xl">
                "Honest, warm, and exact. They drew exactly what we needed — nothing more, nothing less."
              </p>
              <p className="mt-4 label normal-case tracking-wide text-brown">
                Naveen K. · Gachibowli Home, Hyderabad
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4-pillar trust cards ── */
function Pillars() {
  const headRef = useReveal(0.1);

  return (
    <section className="border-t border-sand bg-beige py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div ref={headRef} className="mb-14 max-w-2xl">
          <p className="label mb-4 inline-flex items-center gap-3 text-caramel">
            <span className="h-px w-10 bg-caramel" />
            Built on quality
          </p>
          <h2 className="display text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-espresso">
            The commitments we bring{" "}
            <em className="italic text-caramel">to every project</em>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brown md:text-lg">
            Thoughtfully designed, expertly executed — every space reflects
            our commitment to refined living.
          </p>
        </div>

        <div className="grid gap-px border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} pillar={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  delay,
}: {
  pillar: { icon: string; title: string; body: string };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition =
              "opacity 0.9s cubic-bezier(0.25,0.1,0.25,1), transform 0.9s cubic-bezier(0.25,0.1,0.25,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="flex flex-col gap-5 bg-cream p-8 md:p-10">
      <span className="flex h-12 w-12 items-center justify-center border border-sand bg-espresso font-display text-xl text-gold">
        {pillar.icon}
      </span>
      <h3 className="font-display text-xl font-light text-espresso md:text-2xl">
        {pillar.title}
      </h3>
      <p className="text-sm leading-relaxed text-brown">{pillar.body}</p>
    </div>
  );
}
