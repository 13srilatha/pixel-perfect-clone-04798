/**
 * StackedTestimonials — GSAP pinned scroll. Cards fly in from centre,
 * fan out, then sweep left. Headline stays fixed. "09 Google reviews" link
 * at the bottom is permanent and clickable.
 *
 * FIXES vs current version:
 * - Cards start at xPercent: 0 (centre) not 145 (right edge)
 * - Grey diagonal overlay removed
 * - Cards exit left cleanly, then section unpins naturally so next section follows
 * - Headline + "See all on Google" always visible
 * - Architecture context added via dark background + subtle grid texture
 */
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Review = {
  name: string;
  quote: string;
  type: string;
  location: string;
  initials: string;
};

const REVIEWS: Review[] = [
  { name: "Sai Kiran Galla",   quote: "Outstanding experience. Exceptional professionalism, creativity, and attention to detail.",         type: "Residential",    location: "Hyderabad",    initials: "SK" },
  { name: "Sharath Chandra",   quote: "Innovative design approach and attention to detail. Highly professional and transparent.",          type: "Interior Design", location: "Hyderabad",    initials: "SC" },
  { name: "Sharath Dhoni",     quote: "Knowledgeable, professional and dedicated. They understand client needs well.",                     type: "Commercial",     location: "Hyderabad",    initials: "SD" },
  { name: "Naresh Chary M",    quote: "Exceeded expectations. Creative concepts, practical advice, zero pushy sales tactics.",             type: "Renovation",     location: "Hyderabad",    initials: "NC" },
  { name: "Praneeth Sai",      quote: "Combines creativity, technical expertise and modern design concepts.",                              type: "Residential",    location: "Jubilee Hills", initials: "PS" },
  { name: "Aniket Anand",      quote: "Good design is one thing, but good communication is equally important. This firm delivered on both.", type: "Commercial",   location: "Hyderabad",    initials: "AA" },
  { name: "Nikhitha Sabbani",  quote: "They cleared all my doubts and I had satisfied designs from Terra Space.",                          type: "Interior Design", location: "Hyderabad",    initials: "NS" },
  { name: "Srilatha Yadav",    quote: "Designs feel fresh yet practical. The whole process was simple and stress-free.",                   type: "Residential",    location: "Vijayawada",   initials: "SY" },
  { name: "Sai Charan Dandu",  quote: "Excellent architecture firm.",                                                                     type: "Architecture",   location: "Hyderabad",    initials: "SC" },
];

const GOOGLE_URL = "https://www.google.com/search?q=Terra+Space+Studio+Hyderabad+reviews";

// Fan positions: each card fans out from centre to these offsets
const FAN: { x: number; y: number; r: number }[] = [
  { x: -580, y:  20, r: -14 },
  { x: -390, y: -10, r:  -7 },
  { x: -200, y:  30, r:  -2 },
  { x:  -40, y: -20, r:   3 },
  { x:  120, y:  25, r:  -5 },
  { x:  290, y:  -8, r:   8 },
  { x:  450, y:  18, r:  -3 },
  { x:  610, y: -15, r:   6 },
  { x:  760, y:  10, r:  -9 },
];

export function StackedTestimonials() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardsRef    = useRef<HTMLAnchorElement[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const meterRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards   = cardsRef.current.filter(Boolean);
    if (!section || !cards.length) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      // Initial state: all cards stacked at dead centre, invisible
      gsap.set(cards, {
        x: 0, y: 0, xPercent: -50, yPercent: -50,
        left: "50%", top: "54%",
        rotate: 0, scale: 0.88, autoAlpha: 0,
        transformOrigin: "center bottom",
      });
      gsap.set(headlineRef.current, { y: 50, autoAlpha: 0 });
      gsap.set(meterRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=350%",          // Enough scroll for all 9 cards, then clean exit
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate: (s) => gsap.set(meterRef.current, { scaleX: s.progress }),
        },
      });

      // Headline in
      tl.to(headlineRef.current, { y: 0, autoAlpha: 1, duration: 0.1, ease: "power2.out" }, 0);

      // Cards fan out from centre — staggered by 0.055 each
      cards.forEach((card, i) => {
        const fan = FAN[i] ?? { x: 0, y: 0, r: 0 };
        const at  = 0.08 + i * 0.055;
        tl.to(card, {
          x: fan.x, y: fan.y, rotate: fan.r,
          scale: 1, autoAlpha: 1,
          duration: 0.22,
          ease: "back.out(1.1)",
        }, at);
      });

      // Settle micro-drift: makes the fan feel alive
      tl.to(cards, {
        y: (i) => (FAN[i]?.y ?? 0) - 12,
        duration: 0.14,
        stagger: 0.012,
        ease: "sine.inOut",
      }, 0.7);

      // Sweep ALL cards to the left cleanly — section then unpins
      tl.to(cards, {
        x: (i) => (FAN[i]?.x ?? 0) - 1400,
        autoAlpha: 0,
        stagger: 0.018,
        duration: 0.18,
        ease: "power2.in",
      }, 0.84);
    }, section);

    return () => {
      window.__lenis?.off("scroll", sync);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="client-words"
      aria-label="Client reviews"
      style={{
        position: "relative",
        height: "100svh",
        overflow: "hidden",
        background: "#1A1A14",
      }}
    >
      {/* Subtle grid texture — architecture context */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage:
          "linear-gradient(rgba(250,248,244,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,244,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Headline — always visible */}
      <div ref={headlineRef} style={{
        position: "absolute", left: "6vw", top: "9vh", zIndex: 10,
        willChange: "opacity, transform",
      }}>
        <p style={{ margin: "0 0 0.6rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.68rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C4955A" }}>
          Client Words
        </p>
        <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond','Cormorant',serif", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.88, color: "#FAF8F4" }}>
          What they say.
        </h2>
      </div>

      {/* Cards */}
      {REVIEWS.map((r, i) => (
        <a
          key={r.name}
          ref={(el) => { if (el) cardsRef.current[i] = el; }}
          href={GOOGLE_URL}
          target="_blank"
          rel="noreferrer"
          aria-label={`${r.name}'s Google review`}
          style={{
            position: "absolute",
            left: "50%", top: "54%",
            width: "clamp(200px, 19vw, 300px)",
            minHeight: "clamp(300px, 38vh, 420px)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "1.3rem 1.15rem 1.1rem",
            borderRadius: 20,
            border: "3px solid #FAF8F4",
            background: i % 3 === 0 ? "#C4955A" : "#FAF8F4",
            color: "#1A1A14",
            textDecoration: "none",
            boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
            zIndex: 5 + i,
            willChange: "opacity, transform",
            cursor: "pointer",
          }}
        >
          {/* Top row: initials + stars */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{
                width: 36, height: 36, display: "grid", placeItems: "center",
                borderRadius: "50%", background: "#1A1A14", color: "#C4955A",
                fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              }}>
                {r.initials}
              </span>
              <span style={{ fontSize: "0.88rem", letterSpacing: "0.06em", color: "#1A1A14" }}>★★★★★</span>
            </div>
            <p style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond','Cormorant',serif",
              fontStyle: "italic", fontWeight: 500,
              fontSize: "clamp(1.1rem, 1.6vw, 1.42rem)",
              lineHeight: 1.22,
              color: "#1A1A14",
            }}>
              "{r.quote}"
            </p>
          </div>

          {/* Bottom: name + type */}
          <div>
            <div style={{ height: 1, background: "rgba(26,26,20,0.18)", margin: "1rem 0 0.8rem" }} />
            <strong style={{ display: "block", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.84rem" }}>
              {r.name}
            </strong>
            <span style={{ display: "block", marginTop: 4, fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.65 }}>
              {r.type} · {r.location}
            </span>
          </div>
        </a>
      ))}

      {/* Bottom bar: scroll meter + Google link */}
      <div style={{
        position: "absolute", left: "6vw", right: "6vw", bottom: "1.4rem",
        zIndex: 20, display: "grid",
        gridTemplateColumns: "minmax(0,1fr) auto",
        alignItems: "center", gap: "1.2rem",
      }}>
        <div style={{ height: 1, background: "rgba(196,149,90,0.22)", overflow: "hidden" }}>
          <div ref={meterRef} style={{ width: "100%", height: "100%", background: "#C4955A", willChange: "transform" }} />
        </div>
        <a
          href={GOOGLE_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C4955A", textDecoration: "none", whiteSpace: "nowrap",
            borderBottom: "1px solid rgba(196,149,90,0.4)",
            paddingBottom: "0.1rem",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          See all 09 Google reviews →
        </a>
      </div>
    </section>
  );
}
