import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
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

const BG_IMAGES = ["/images/terra-review-exterior.png", "/images/terra-review-interior.png", "/images/terra-review-light.png"];
const CARD_POSITIONS = [
  { x: -430, y: -128, r: -8 },
  { x: -220, y: 88, r: 5 },
  { x: -28, y: -82, r: -3 },
  { x: 176, y: 122, r: 7 },
  { x: 382, y: -58, r: -5 },
  { x: -330, y: 206, r: 4 },
  { x: -92, y: 212, r: -6 },
  { x: 142, y: -188, r: 3 },
  { x: 352, y: 198, r: 6 },
];

export function StackedTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  const mediaRef = useRef<HTMLVideoElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !cards.length) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      gsap.set(copyRef.current, { autoAlpha: 0, y: 34 });
      gsap.set(cards, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 0.82,
        autoAlpha: 0,
        transformOrigin: "center center",
      });
      gsap.set(meterRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 55%",
          scrub: 0.9,
          onEnter: () => mediaRef.current?.play().catch(() => {}),
          onEnterBack: () => mediaRef.current?.play().catch(() => {}),
          onLeave: () => mediaRef.current?.pause(),
          onLeaveBack: () => mediaRef.current?.pause(),
          onUpdate: (self) => gsap.set(meterRef.current, { scaleX: self.progress }),
        },
      });

      tl.to(copyRef.current, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" }, 0);
      cards.forEach((card, index) => {
        const pos = CARD_POSITIONS[index] ?? { x: 0, y: 0, r: 0 };
        tl.to(
          card,
          { autoAlpha: 1, x: pos.x, y: pos.y, rotate: pos.r, scale: 1, duration: 0.34, ease: "power3.out" },
          0.08 + index * 0.045,
        );
      });
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
      style={{ position: "relative", minHeight: "145svh", overflow: "hidden", background: "#1A1A14", color: "#FAF8F4" }}
    >
      <div style={{ position: "sticky", top: 0, minHeight: "100svh", overflow: "hidden" }}>
        <video
          ref={mediaRef}
          src="/videos/client-words.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{ position: "absolute", right: "min(5vw, 5rem)", top: "50%", width: "min(27vw, 320px)", height: "min(58vh, 620px)", objectFit: "cover", transform: "translateY(-50%)", opacity: 0.42, filter: "saturate(0.75)", border: "1px solid rgba(196,149,90,0.3)" }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #1A1A14 0%, rgba(26,26,20,0.9) 45%, rgba(26,26,20,0.72) 100%)" }} />

        <div ref={copyRef} style={{ position: "absolute", zIndex: 3, left: "max(1.5rem, 7vw)", top: "12vh", width: "min(39rem, calc(100vw - 3rem))" }}>
          <p style={eyebrowStyle}>Client Words</p>
          <h2 style={headlineStyle}>Proof, without performance.</h2>
          <p style={{ margin: "1.1rem 0 0", maxWidth: "34rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(250,248,244,0.72)" }}>
            These are a few real client notes. More will keep coming, so the cards stay curated — and the full Google review page stays one click away.
          </p>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginTop: "1.4rem", color: "#C4955A", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid rgba(196,149,90,0.42)", paddingBottom: "0.28rem" }}>
            Read all Google reviews →
          </a>
        </div>

        <div style={{ position: "absolute", left: "50%", top: "58%", zIndex: 4, width: 1, height: 1, perspective: 1200 }}>
          {REVIEWS.map((review, index) => (
            <ReviewCard
              key={review.name}
              review={review}
              index={index}
              refCallback={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>

        <div style={{ position: "absolute", left: "1.5rem", right: "1.5rem", bottom: "1.4rem", zIndex: 5, display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", alignItems: "center", gap: "1rem" }}>
          <div style={{ height: 1, background: "rgba(196,149,90,0.25)", overflow: "hidden" }}>
            <div ref={meterRef} style={{ width: "100%", height: "100%", background: "#C4955A" }} />
          </div>
          <span style={{ fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8a7355", whiteSpace: "nowrap" }}>
            09 Google reviews
          </span>
        </div>
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
        left: "50%",
        top: "50%",
        width: "clamp(190px, 18vw, 275px)",
        minHeight: "clamp(285px, 36vh, 390px)",
        marginLeft: "clamp(-137px, -9vw, -95px)",
        marginTop: "clamp(-195px, -18vh, -142px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0.72rem 0.72rem 1rem",
        background: index % 4 === 0 ? "#C4955A" : "#FAF8F4",
        color: "#1A1A14",
        textDecoration: "none",
        border: "1px solid rgba(232,226,217,0.8)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.38)",
        willChange: "opacity, transform",
      }}
    >
      <div style={{ aspectRatio: "16/10", overflow: "hidden", marginBottom: "0.9rem", background: "#E8E2D9" }}>
        <img src={BG_IMAGES[index % BG_IMAGES.length]} alt="Architecture and interior work by Terra Space Studio" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.88)" }} />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.8rem", alignItems: "center", marginBottom: "0.8rem" }}>
          <span style={{ fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: index % 4 === 0 ? "#1A1A14" : "#8a7355" }}>{review.type}</span>
          <span style={{ color: "#C4955A", fontSize: "0.78rem", letterSpacing: "0.02em" }}>★★★★★</span>
        </div>
        <p style={{ margin: 0, fontFamily: "'Cormorant Garamond','Cormorant',serif", fontStyle: "italic", fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)", lineHeight: 1.18 }}>
          “{review.quote}”
        </p>
      </div>
      <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(26,26,20,0.16)", paddingTop: "0.8rem" }}>
        <strong style={{ display: "block", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.82rem", lineHeight: 1.15 }}>{review.name}</strong>
        <span style={{ display: "block", marginTop: 5, fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.66 }}>
          {review.location} · View on Google
        </span>
      </div>
    </a>
  );
}

const eyebrowStyle: CSSProperties = {
  margin: "0 0 1rem",
  fontFamily: "'DM Sans','Inter',sans-serif",
  fontSize: "0.68rem",
  color: "#C4955A",
  textTransform: "uppercase",
  letterSpacing: "0.32em",
};

const headlineStyle: CSSProperties = {
  margin: 0,
  fontFamily: "'Cormorant Garamond','Cormorant',serif",
  fontWeight: 300,
  fontSize: "clamp(3rem, 8vw, 8rem)",
  lineHeight: 0.88,
  color: "#FAF8F4",
};