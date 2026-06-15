import { useEffect, useState } from "react";

type Review = {
  name: string;
  quote: string;
  type: string;
  location: string;
  url?: string;
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

export function StackedTestimonials() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exiting">("idle");
  const [paused, setPaused] = useState(false);

  /* Auto-advance every 5 s */
  useEffect(() => {
    if (paused || phase !== "idle") return;
    const t = setInterval(() => {
      setPhase("exiting");
      setTimeout(() => {
        setIdx((i) => (i + 1) % REVIEWS.length);
        setPhase("idle");
      }, 500);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, phase]);

  const goNext = () => {
    if (phase !== "idle") return;
    setIdx((i) => (i + 1) % REVIEWS.length);
  };
  const goPrev = () => {
    if (phase !== "idle") return;
    setIdx((i) => mod(i - 1, REVIEWS.length));
  };

  const visibleIndices = [0, 1, 2, 3, 4].map((o) => mod(idx + o, REVIEWS.length));

  return (
    <section
      id="testimonials"
      aria-label="Client words"
      style={{ background: "#1A1A14", padding: "7rem 1.5rem" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            style={{
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#C4955A",
              marginBottom: "0.9rem",
            }}
          >
            CLIENT WORDS
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#FAF8F4",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            What they <em style={{ color: "#C4955A", fontStyle: "italic" }}>say.</em>
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.9rem",
              color: "#8a7355",
            }}
          >
            Real Google reviews — click any name to verify.
          </p>
        </header>

        {/* Stacked cards */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: "relative",
            margin: "0 auto",
            maxWidth: 520,
            width: "100%",
            minHeight: 340,
          }}
        >
          {visibleIndices.map((reviewIndex, position) => {
            const review = REVIEWS[reviewIndex];
            const isExiting = phase === "exiting" && position === 0;
            const isEntering = position === 4 && phase === "idle";

            let transform = "";
            let opacity = 1;
            let zIndex = 4;

            if (isExiting) {
              transform = "translateX(-120%)";
              opacity = 0;
              zIndex = 10;
            } else if (isEntering) {
              transform = "translate(calc(24px + 40px), 24px)";
              opacity = 0;
              zIndex = 0;
            } else {
              const layer = phase === "exiting" ? position - 1 : position;
              const offsets = [
                { x: 0, y: 0, o: 1, z: 4 },
                { x: 8, y: 8, o: 0.7, z: 3 },
                { x: 16, y: 16, o: 0.45, z: 2 },
                { x: 24, y: 24, o: 0.2, z: 1 },
              ];
              const off = offsets[layer] ?? offsets[3];
              transform = `translate(${off.x}px, ${off.y}px)`;
              opacity = off.o;
              zIndex = off.z;
            }

            return (
              <article
                key={review.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  background: "#FAF8F4",
                  borderRadius: 16,
                  padding: "2.5rem",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
                  border: "1px solid #E8E2D9",
                  transform,
                  opacity,
                  zIndex,
                  transition:
                    "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s cubic-bezier(0.22,1,0.36,1)",
                  willChange: "transform, opacity",
                  pointerEvents: position === 0 || (phase === "exiting" && position === 1) ? "auto" : "none",
                }}
              >
                {/* Stars */}
                <div
                  style={{
                    color: "#C4955A",
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                    lineHeight: 1,
                  }}
                >
                  ★★★★★
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontStyle: "italic",
                    fontSize: "1.35rem",
                    lineHeight: 1.6,
                    color: "#1A1A14",
                    margin: "1rem 0",
                  }}
                >
                  “{review.quote}”
                </p>

                {/* Divider */}
                <div
                  style={{
                    borderTop: "1px solid #E8E2D9",
                    margin: "1.2rem 0",
                  }}
                />

                {/* Bottom row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: "1rem",
                  }}
                >
                  {/* Left: name + type/location */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#1A1A14",
                      }}
                    >
                      {review.name}
                    </div>
                    <div
                      style={{
                        marginTop: "0.25rem",
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#8a7355",
                      }}
                    >
                      {review.type} · {review.location}
                    </div>
                  </div>

                  {/* Right side: Google link + TERRA */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      flexShrink: 0,
                    }}
                  >
                    <a
                      href={review.url ?? GOOGLE_REVIEWS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.75rem",
                        color: "#C4955A",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      View on Google →
                    </a>
                    <span
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        color: "#C4955A",
                        textTransform: "uppercase",
                      }}
                    >
                      TERRA
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Navigation */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
          }}
        >
          <ArrowBtn direction="left" onClick={goPrev} />
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.8rem",
              color: "#8a7355",
              minWidth: 60,
              textAlign: "center",
            }}
          >
            {String(idx + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
          </span>
          <ArrowBtn direction="right" onClick={goNext} />
        </div>
      </div>
    </section>
  );
}

function ArrowBtn({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Previous review" : "Next review"}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid #C4955A",
        background: "transparent",
        color: "#C4955A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
        padding: 0,
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget;
        btn.style.background = "#C4955A";
        btn.style.color = "#1A1A14";
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget;
        btn.style.background = "transparent";
        btn.style.color = "#C4955A";
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: direction === "left" ? "rotate(180deg)" : undefined,
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}
