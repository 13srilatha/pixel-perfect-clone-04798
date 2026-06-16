import { useEffect, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

type Review = {
  name: string;
  quote: string;
  type: string;
  location: string;
};

const REVIEWS: Review[] = [
  { name: "Sai Kiran Galla",   quote: "Outstanding experience. Exceptional professionalism, creativity, and attention to detail.", type: "Residential",      location: "Hyderabad" },
  { name: "Sharath Chandra",   quote: "Innovative design approach and attention to detail. Highly professional and transparent.",   type: "Interior Design",  location: "Hyderabad" },
  { name: "Sharath Dhoni",     quote: "Knowledgeable, professional and dedicated to delivering quality work. They understand client needs well.", type: "Commercial", location: "Hyderabad" },
  { name: "Naresh Chary M",    quote: "Exceeded expectations. Creative concepts, practical advice, zero pushy sales tactics.",      type: "Renovation",       location: "Hyderabad" },
  { name: "Praneeth Sai",      quote: "Combines creativity, technical expertise and modern design concepts.",                       type: "Residential",      location: "Jubilee Hills" },
  { name: "Sai Charan Dandu",  quote: "Excellent architecture firm.",                                                                type: "Architecture",     location: "Hyderabad" },
  { name: "Aniket Anand",      quote: "Good design is one thing, but good communication is equally important. This firm delivered on both.", type: "Commercial", location: "Hyderabad" },
  { name: "Nikhitha Sabbani",  quote: "They cleared all my doubts and I had satisfied designs from Terra Space.",                    type: "Interior Design",  location: "Hyderabad" },
  { name: "Srilatha Yadav",    quote: "Designs feel fresh yet practical. The whole process was simple and stress-free.",            type: "Residential",      location: "Vijayawada" },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Terra+Space+Studio+Hyderabad+reviews";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// Subtle, varied rotations so the stack feels "thrown down" not algorithmic
const TILTS = [-7, 5, -3, 8, -5, 4, -8, 6, -4];

export function StackedTestimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setIdx((i) => (i + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(t);
  }, [paused]);

  const goNext = () => {
    setDirection(1);
    setIdx((i) => (i + 1) % REVIEWS.length);
  };
  const goPrev = () => {
    setDirection(-1);
    setIdx((i) => mod(i - 1, REVIEWS.length));
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 || info.velocity.x < -400) goNext();
    else if (info.offset.x > 80 || info.velocity.x > 400) goPrev();
  };

  // Show active + 3 behind it
  const stack = [0, 1, 2, 3].map((o) => ({
    review: REVIEWS[mod(idx + o, REVIEWS.length)],
    layer: o,
    key: mod(idx + o, REVIEWS.length),
  }));

  return (
    <section
      id="testimonials"
      style={{
        background: "#1A1A14",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gold glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(196,149,90,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              color: "#C4955A",
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              marginBottom: "1.25rem",
            }}
          >
            Client Words
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "#FAF8F4",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            What they say.
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "#8a7355",
              letterSpacing: "0.04em",
            }}
          >
            Drag the card · or use the arrows
          </p>
        </div>

        {/* Card stack */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: "relative",
            height: 460,
            maxWidth: 560,
            margin: "0 auto",
            perspective: 1200,
          }}
        >
          {stack
            .slice()
            .reverse() /* render back-to-front */
            .map(({ review, layer, key }) => {
              const isActive = layer === 0;
              const tilt = TILTS[key % TILTS.length];

              const backStyle = {
                scale: 1 - layer * 0.05,
                y: layer * 18,
                rotate: tilt * (1 - layer * 0.3),
                opacity: layer === 0 ? 1 : 0.55 - layer * 0.12,
              };

              return (
                <motion.div
                  key={key}
                  initial={
                    isActive
                      ? { x: direction * 320, rotate: direction * 15, opacity: 0, scale: 0.9 }
                      : backStyle
                  }
                  animate={backStyle}
                  exit={{ x: -direction * 320, rotate: -direction * 15, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={isActive ? handleDragEnd : undefined}
                  whileDrag={isActive ? { cursor: "grabbing", scale: 1.02 } : undefined}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 10 - layer,
                    cursor: isActive ? "grab" : "default",
                    transformOrigin: "center bottom",
                  }}
                >
                  <Polaroid review={review} />
                </motion.div>
              );
            })}
        </div>

        {/* Nav */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <ArrowBtn dir="prev" onClick={goPrev} />
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "#8a7355",
              letterSpacing: "0.15em",
              minWidth: 70,
              textAlign: "center",
            }}
          >
            {String(idx + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
          </div>
          <ArrowBtn dir="next" onClick={goNext} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Polaroid card ---------- */

function Polaroid({ review }: { review: Review }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FAF8F4",
        border: "1px solid #E8E2D9",
        borderRadius: 6,
        padding: "2.5rem 2.25rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0 30px 60px -20px rgba(0,0,0,0.55), 0 10px 25px -10px rgba(0,0,0,0.4)",
      }}
    >
      {/* Tape strip */}
      <div
        style={{
          position: "absolute",
          top: -12,
          left: "50%",
          transform: "translateX(-50%) rotate(-2deg)",
          width: 90,
          height: 22,
          background: "rgba(196,149,90,0.35)",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(196,149,90,0.4)",
        }}
      />

      {/* Stars */}
      <div style={{ display: "flex", gap: 4, color: "#C4955A", fontSize: "1.1rem" }}>
        {"★★★★★".split("").map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
          lineHeight: 1.45,
          color: "#1A1A14",
          margin: "1.5rem 0",
          flex: 1,
        }}
      >
        &ldquo;{review.quote}&rdquo;
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: "#E8E2D9", marginBottom: "1.25rem" }} />

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#1A1A14",
              letterSpacing: "0.01em",
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              marginTop: 4,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              color: "#8a7355",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            {review.type} · {review.location}
          </div>
        </div>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noreferrer"
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            color: "#C4955A",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            textDecoration: "none",
            whiteSpace: "nowrap",
            borderBottom: "1px solid #C4955A",
            paddingBottom: 2,
          }}
        >
          View on Google →
        </a>
      </div>
    </div>
  );
}

/* ---------- Arrow button ---------- */

function ArrowBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid #C4955A",
        background: "transparent",
        color: "#C4955A",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        transition: "background 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(196,149,90,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {dir === "prev" ? (
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

// AnimatePresence reserved for future exit transitions
export const _ap = AnimatePresence;
