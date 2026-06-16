import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Review = {
  name: string;
  quote: string;
  type: string;
  location: string;
};

const REVIEWS: Review[] = [
  { name: "Sai Kiran Galla", quote: "Outstanding experience. Exceptional professionalism, creativity, and attention to detail.", type: "Residential", location: "Hyderabad" },
  { name: "Sharath Chandra", quote: "Innovative design approach and attention to detail. Highly professional and transparent.", type: "Interior Design", location: "Hyderabad" },
  { name: "Sharath Dhoni", quote: "Knowledgeable, professional and dedicated to delivering quality work. They understand client needs well.", type: "Commercial", location: "Hyderabad" },
  { name: "Naresh Chary M", quote: "Exceeded expectations. Creative concepts, practical advice, zero pushy sales tactics.", type: "Renovation", location: "Hyderabad" },
  { name: "Praneeth Sai", quote: "Combines creativity, technical expertise and modern design concepts.", type: "Residential", location: "Jubilee Hills" },
  { name: "Sai Charan Dandu", quote: "Excellent architecture firm.", type: "Architecture", location: "Hyderabad" },
  { name: "Aniket Anand", quote: "Good design is one thing, but good communication is equally important. This firm delivered on both.", type: "Commercial", location: "Hyderabad" },
  { name: "Nikhitha Sabbani", quote: "They cleared all my doubts and I had satisfied designs from Terra Space.", type: "Interior Design", location: "Hyderabad" },
  { name: "Srilatha Yadav", quote: "Designs feel fresh yet practical. The whole process was simple and stress-free.", type: "Residential", location: "Vijayawada" },
];

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Terra+Space+Studio+Hyderabad+reviews";

const CARD_STYLE = [
  { x: -44, y: -18, r: -7 },
  { x: -22, y: 26, r: 4 },
  { x: 8, y: -30, r: -2 },
  { x: 36, y: 20, r: 7 },
  { x: -12, y: 48, r: -5 },
  { x: 58, y: -8, r: 3 },
  { x: -54, y: 34, r: 6 },
  { x: 26, y: 52, r: -4 },
  { x: 0, y: 0, r: 2 },
];

export function StackedTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  const meterRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const repeatedReviews = useMemo(() => REVIEWS, []);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !cards.length) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      gsap.set(headlineRef.current, { y: 70, autoAlpha: 0 });
      gsap.set(cards, {
        xPercent: 145,
        y: (i) => CARD_STYLE[i]?.y ?? 0,
        rotate: (i) => (CARD_STYLE[i]?.r ?? 0) + 11,
        scale: 0.96,
        autoAlpha: 0,
        transformOrigin: "center bottom",
      });
      gsap.set(meterRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=430%",
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          onUpdate: (self) => gsap.set(meterRef.current, { scaleX: self.progress }),
        },
      });

      tl.to(headlineRef.current, { y: 0, autoAlpha: 1, duration: 0.12, ease: "power2.out" }, 0);

      cards.forEach((card, i) => {
        const style = CARD_STYLE[i] ?? { x: 0, y: 0, r: 0 };
        const enterAt = 0.08 + i * 0.07;
        tl.to(
          card,
          {
            xPercent: 0,
            x: style.x,
            y: style.y,
            rotate: style.r,
            scale: 1,
            autoAlpha: 1,
            duration: 0.18,
            ease: "back.out(1.15)",
          },
          enterAt,
        );
        tl.to(
          card,
          {
            x: style.x - 16 + (i % 3) * 14,
            y: style.y - 18,
            rotate: style.r - 1.5,
            duration: 0.16,
            ease: "none",
          },
          enterAt + 0.2,
        );
      });

      tl.to(cards, { xPercent: -120, rotate: (i) => (CARD_STYLE[i]?.r ?? 0) - 8, stagger: 0.025, duration: 0.2, ease: "power2.in" }, 0.82);
    }, section);

    return () => {
      window.__lenis?.off("scroll", sync);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Client reviews"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#1A1A14",
        color: "#FAF8F4",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(250,248,244,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(250,248,244,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.25,
        }}
      />
      <div
        ref={headlineRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "8vh",
          zIndex: 2,
          width: "min(1400px, calc(100vw - 3rem))",
          transform: "translateX(-50%)",
          willChange: "opacity, transform",
        }}
      >
        <p
          style={{
            margin: "0 0 1rem",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.68rem",
            color: "#C4955A",
            textTransform: "uppercase",
            letterSpacing: "0.32em",
          }}
        >
          Client Words
        </p>
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond','Cormorant',serif",
            fontWeight: 300,
            fontSize: "clamp(3rem, 8vw, 8rem)",
            lineHeight: 0.88,
            color: "#FAF8F4",
          }}
        >
          What they say.
        </h2>
      </div>

      <div
        ref={railRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "52%",
          zIndex: 3,
          width: "min(1380px, 96vw)",
          height: "min(58vh, 520px)",
          transform: "translate(-50%, -45%)",
          perspective: 1400,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-5%",
            right: "-5%",
            top: "47%",
            height: "34%",
            background: "#FAF8F4",
            transform: "rotate(-2deg)",
            opacity: 0.1,
          }}
        />
        {repeatedReviews.map((review, i) => (
          <ReviewCard
            key={review.name}
            review={review}
            index={i}
            refCallback={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: "1.5rem",
          right: "1.5rem",
          bottom: "1.4rem",
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) auto",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ height: 1, background: "rgba(196,149,90,0.25)", overflow: "hidden" }}>
          <div ref={meterRef} style={{ width: "100%", height: "100%", background: "#C4955A" }} />
        </div>
        <span
          style={{
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8a7355",
            whiteSpace: "nowrap",
          }}
        >
          09 Google reviews
        </span>
      </div>
    </section>
  );
}

function ReviewCard({ review, index, refCallback }: { review: Review; index: number; refCallback: (el: HTMLAnchorElement | null) => void }) {
  return (
    <a
      ref={refCallback}
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={`Read ${review.name}'s Google review`}
      style={{
        position: "absolute",
        left: `calc(${7 + index * 9.8}% - 80px)`,
        top: index % 2 === 0 ? "18%" : "9%",
        width: "clamp(190px, 18vw, 292px)",
        minHeight: "clamp(310px, 39vh, 430px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.3rem 1.1rem 1rem",
        borderRadius: 22,
        border: "4px solid #FAF8F4",
        background: index % 3 === 0 ? "#C4955A" : "#FAF8F4",
        color: index % 3 === 0 ? "#1A1A14" : "#1A1A14",
        textDecoration: "none",
        boxShadow: "0 34px 70px rgba(0,0,0,0.45)",
        willChange: "opacity, transform",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: index % 3 === 0 ? 0.09 : 0.05,
          background: "repeating-linear-gradient(-45deg, #1A1A14 0 1px, transparent 1px 11px)",
        }}
      />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <span
            style={{
              height: 38,
              width: 38,
              flex: "0 0 auto",
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              background: "#1A1A14",
              color: "#C4955A",
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.76rem",
              fontWeight: 700,
            }}
          >
            {review.name
              .split(" ")
              .slice(0, 2)
              .map((n) => n[0])
              .join("")}
          </span>
          <span style={{ color: "#1A1A14", fontSize: "0.92rem", letterSpacing: "0.02em" }}>★★★★★</span>
        </div>
        <p
          style={{
            margin: "1.4rem 0 0",
            fontFamily: "'Cormorant Garamond','Cormorant',serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(1.15rem, 1.7vw, 1.5rem)",
            lineHeight: 1.2,
          }}
        >
          “{review.quote}”
        </p>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ height: 1, background: "rgba(26,26,20,0.18)", marginBottom: "0.9rem" }} />
        <strong
          style={{
            display: "block",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.86rem",
            lineHeight: 1.15,
          }}
        >
          {review.name}
        </strong>
        <span
          style={{
            display: "block",
            marginTop: 5,
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.72,
          }}
        >
          {review.type} · {review.location}
        </span>
      </div>
    </a>
  );
}