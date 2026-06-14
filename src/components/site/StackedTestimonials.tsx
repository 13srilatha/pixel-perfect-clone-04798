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

export function StackedTestimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const visible = [0, 1, 2, 3].map((o) => REVIEWS[(idx + o) % REVIEWS.length]);

  return (
    <section
      id="testimonials"
      aria-label="Client words"
      style={{ background: "#FAF8F4", padding: "7rem 1.5rem" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-14 max-w-2xl">
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
            Client Words
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#1A1A14",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            What they <em style={{ color: "#C4955A" }}>say.</em>
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.92rem",
              color: "#4A4A42",
            }}
          >
            Real Google reviews. Click below to verify on Google.
          </p>
        </header>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: "relative",
            margin: "0 auto",
            width: "min(480px, 92vw)",
            minHeight: 320,
          }}
        >
          {visible.map((r, layer) => (
            <Card key={`${idx}-${layer}`} review={r} layer={layer} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <NavBtn label="←" onClick={() => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#4A4A42" }}>
            {String(idx + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
          </span>
          <NavBtn label="→" onClick={() => setIdx((i) => (i + 1) % REVIEWS.length)} />
        </div>

        <div className="mt-8 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C4955A",
              borderBottom: "1px solid #C4955A",
              paddingBottom: "0.2rem",
              textDecoration: "none",
            }}
          >
            See all Google reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

function Card({ review, layer }: { review: Review; layer: number }) {
  const offset = layer * 8;
  const scale = 1 - layer * 0.03;
  const opacity = layer === 0 ? 1 : layer === 1 ? 0.55 : layer === 2 ? 0.35 : 0.18;
  const z = 10 - layer;

  return (
    <article
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${offset}px, ${offset}px) scale(${scale})`,
        opacity,
        zIndex: z,
        background: "#FAF8F4",
        border: "1px solid #E8E2D9",
        borderRadius: 16,
        boxShadow: "0 18px 40px -22px rgba(26,26,20,0.25)",
        padding: "2rem 1.8rem 1.6rem",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
        pointerEvents: layer === 0 ? "auto" : "none",
      }}
    >
      <div style={{ color: "#C4955A", letterSpacing: "0.2em", fontSize: "1rem" }}>
        ★★★★★
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: "1.2rem",
          lineHeight: 1.55,
          color: "#1A1A14",
          margin: 0,
          flex: 1,
        }}
      >
        "{review.quote}"
      </p>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#1A1A14",
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              marginTop: "0.25rem",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#8a7355",
            }}
          >
            {review.type} · {review.location}
          </div>
          <a
            href={review.url ?? GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: "0.6rem",
              display: "inline-block",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.7rem",
              color: "#C4955A",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            View on Google →
          </a>
        </div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "#8a7355",
            textTransform: "uppercase",
          }}
        >
          Terra
        </span>
      </div>
    </article>
  );
}

function NavBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label === "←" ? "Previous review" : "Next review"}
      style={{
        width: 42,
        height: 42,
        border: "1px solid #C4955A",
        background: "transparent",
        color: "#1A1A14",
        fontFamily: "'DM Sans',sans-serif",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "#C4955A";
        (e.currentTarget as HTMLButtonElement).style.color = "#FAF8F4";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "#1A1A14";
      }}
    >
      {label}
    </button>
  );
}
