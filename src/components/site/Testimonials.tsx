import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/testimonials-hero.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const testimonials = [
  {
    quote:
      "They listened more than they spoke. Our home feels like the version of us we couldn't put into words.",
    name: "Charry Reddy",
    title: "Homeowner · Jubilee Hills",
  },
  {
    quote:
      "Every drawing came back with care. The site team treated our half-built house like their own.",
    name: "Muthyam Rao",
    title: "Client · Kompally Residence",
  },
  {
    quote:
      "We changed our mind a hundred times. Vaasanthi never lost patience — and the result is honestly perfect.",
    name: "Aparna Iyer",
    title: "Client · Kondapur Villa",
  },
];

/**
 * Three-phase scroll storytelling:
 *   Phase 1 — One full-bleed image fills the screen.
 *   Phase 2 — Image splits into three vertical cards that move apart.
 *   Phase 3 — Each card flips along Y-axis to reveal client testimonial text.
 *
 * On mobile (<768px), the cards stack vertically after the split + flip.
 */
export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<(HTMLDivElement | null)[]>([]);

  useIso(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const inners = innerRef.current.filter(Boolean) as HTMLDivElement[];

      // Reset
      gsap.set(cards, { x: 0, y: 0 });
      gsap.set(inners, { rotationY: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (isMobile) {
        // Phase 2 — stack vertically
        tl.to(cards[0], { y: "-105%", duration: 1 }, 0)
          .to(cards[2], { y: "105%", duration: 1 }, 0)
          // Phase 3 — flip each card
          .to(inners, { rotationY: 180, duration: 1, stagger: 0.15 }, 1.1);
      } else {
        // Phase 2 — fan apart horizontally
        tl.to(cards[0], { x: "-105%", duration: 1 }, 0)
          .to(cards[2], { x: "105%", duration: 1 }, 0)
          // Phase 3 — flip each card to reveal text
          .to(inners, { rotationY: 180, duration: 1, stagger: 0.15 }, 1.1);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-cream"
      aria-label="Client testimonials"
    >
      <div className="relative h-screen w-full overflow-hidden">
        {/* Heading */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-8 md:px-10 md:pt-12">
          <p className="label mb-3 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-caramel" />
            Client Words
          </p>
          <h2 className="display max-w-3xl text-[clamp(2rem,5vw,4rem)] text-espresso">
            What our clients <em className="italic text-caramel">remember</em>.
          </h2>
        </div>

        {/* Three-card stage */}
        <div className="relative flex h-full w-full items-center justify-center px-4 pt-32 pb-10 md:px-8 md:pt-40 md:pb-16">
          <div className="relative flex h-full w-full max-w-[1500px] flex-col gap-1 md:flex-row md:gap-2">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative h-1/3 w-full md:h-full md:w-1/3"
                style={{ perspective: "1600px" }}
              >
                <div
                  ref={(el) => { innerRef.current[i] = el; }}
                  className="relative h-full w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT — image slice (one image positioned via background) */}
                  <div
                    className="absolute inset-0 overflow-hidden bg-sand shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(${heroImg})`,
                        // Each card shows a vertical slice of the same image
                        backgroundSize: "300% 100%",
                        backgroundPosition: `${i * 50}% center`,
                      }}
                      aria-hidden
                    />
                  </div>

                  {/* BACK — testimonial text */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between border border-sand bg-cream p-6 shadow-2xl md:p-10"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="label text-caramel">
                      0{i + 1} · Client Words
                    </p>
                    <p className="font-display text-xl italic leading-snug text-espresso md:text-2xl lg:text-[28px]">
                      “{t.quote}”
                    </p>
                    <div className="border-t border-sand pt-4">
                      <p className="font-sans text-sm font-bold uppercase tracking-wide text-espresso">
                        {t.name}
                      </p>
                      <p className="label mt-1 normal-case tracking-normal text-brown">
                        {t.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
