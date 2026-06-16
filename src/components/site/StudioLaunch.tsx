/**
 * StudioLaunch — Instagram reel teaser.
 * Shows a video (or poster fallback) that links to the real Instagram reel.
 * The whole section slides up from below on scroll into view.
 * If /public/videos/studio-launch.mp4 is absent, shows a blurred poster + caption.
 */
import { useEffect, useRef, useState } from "react";

const INSTAGRAM_REEL =
  "https://www.instagram.com/reel/DXHC-RsgerM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
const INSTAGRAM_PROFILE = "https://www.instagram.com/terra_spacestudio/";

export function StudioLaunch() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [revealed, setRevealed] = useState(false);

  // Autoplay muted video when in view
  useEffect(() => {
    const v = videoRef.current;
    const s = sectionRef.current;
    if (!v || !s) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(s);
    return () => obs.disconnect();
  }, []);

  // Scroll reveal — section slides up from 60px below
  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(s);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(s);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio-launch"
      aria-label="Studio film"
      style={{
        background: "#1A1A14",
        padding: "6rem 1.5rem",
        transform: revealed ? "translateY(0)" : "translateY(60px)",
        opacity: revealed ? 1 : 0,
        transition: "transform 1s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p
              style={{
                fontFamily: "'DM Sans','Inter',sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#C4955A",
                marginBottom: "0.75rem",
              }}
            >
              Studio Film
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 5vw, 3.8rem)",
                color: "#FAF8F4",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              The <em style={{ color: "#C4955A", fontStyle: "italic" }}>launch.</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.88rem",
                color: "rgba(250,248,244,0.5)",
                marginTop: "0.75rem",
              }}
            >
              Watch on Instagram to see what we're building next.
            </p>
          </div>
          {/* Instagram follow nudge */}
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C4955A",
              textDecoration: "none",
              border: "1px solid rgba(196,149,90,0.35)",
              padding: "0.6rem 1.2rem",
              borderRadius: "2px",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C4955A";
              e.currentTarget.style.color = "#1A1A14";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C4955A";
            }}
          >
            <InstagramIcon />
            @terra_spacestudio
          </a>
        </div>

        {/* Video / reel link */}
        <a
          href={INSTAGRAM_REEL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#111", borderRadius: "4px", cursor: "pointer" }}
          aria-label="Watch studio launch reel on Instagram"
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src="/videos/studio-launch.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setHasVideo(false)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
            />
          ) : (
            /* Fallback when no video file */
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #1A1A14 0%, #2A2418 50%, #1A1A14 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <InstagramIcon size={40} color="#C4955A" />
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", color: "#FAF8F4", fontStyle: "italic" }}>
                Watch on Instagram
              </span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#8a7355", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                @terra_spacestudio
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(26,26,20,0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(26,26,20,0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(26,26,20,0)"; }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FAF8F4",
                background: "rgba(26,26,20,0.8)",
                border: "1px solid rgba(196,149,90,0.5)",
                padding: "0.75rem 1.5rem",
                borderRadius: "2px",
                opacity: 0,
                transform: "translateY(8px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <InstagramIcon size={14} />
              Watch full reel
            </span>
          </div>

          {/* Persistent Instagram badge */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(26,26,20,0.8)",
              backdropFilter: "blur(4px)",
              padding: "0.4rem 0.75rem",
              borderRadius: "2px",
            }}
          >
            <InstagramIcon size={12} color="#C4955A" />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4955A" }}>
              Watch reel
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

function InstagramIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
