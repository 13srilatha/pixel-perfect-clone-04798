/**
 * FrameCanvas.tsx — Terra Space Studio
 * Scroll-scrubbed cinematic hero. Same technique as Apple iPhone / Sonos Ace pages.
 * Scroll down = frames play forward. Scroll up = frames reverse.
 *
 * ─── ONE-TIME SETUP ──────────────────────────────────────────────────────────
 *  1. Rename + place frames in  /public/frames/frame-001.jpg … frame-076.jpg
 *     From your extracted GIF folder, run:
 *       for i in $(seq -w 1 76); do cp "ezgif-frame-${i}.jpg" "/your-project/public/frames/frame-${i}.jpg"; done
 *
 *  2. In routes/index.tsx add  <FrameCanvas />  ABOVE  <Hero />
 *     import { FrameCanvas } from "@/components/FrameCanvas";
 *     The Nav is already fixed/floating — it sits on top automatically.
 *
 *  3. The Cormorant font is already loaded in __root.tsx — nothing else needed.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * WANT SMOOTHER / MORE FRAMES LATER?
 *  Generate a 4-6 sec video of your project with Kling 3.0 or Runway ML,
 *  extract 150-200 frames as JPG, update TOTAL below. The technique is identical.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Config — adjust these two numbers to your frame set ─────────────────── */
const TOTAL   = 76;   // total number of frames
const VH_PER  = 9;    // scroll-height per frame in viewport-heights (9 × 76 = 684vh)

function frameUrl(n: number) {
  return `/frames/frame-${String(n).padStart(3, "0")}.jpg`;
}

/* ─── Story beats ─────────────────────────────────────────────────────────── */
// Tune start/end % values so text aligns with what's visible in each frame window.
type Beat = {
  start: number;
  end: number;
  eyebrow: string;
  headline: string;
  body: string | null;
  cta: boolean;
};

const BEATS: Beat[] = [
  {
    start: 0,  end: 20,
    eyebrow: "TERRA SPACE STUDIO · HYDERABAD",
    headline: "Every home starts\nwith a single idea.",
    body: "We catch it. Then we build it.",
    cta: false,
  },
  {
    start: 25, end: 44,
    eyebrow: "ARCHITECTURE",
    headline: "Every wall,\nevery window, chosen.",
    body: "Nothing is placed without reason. Not one line.",
    cta: false,
  },
  {
    start: 49, end: 67,
    eyebrow: "INTERIOR DESIGN",
    headline: "Light, material,\nproportion.",
    body: "The three things that make a room feel like it was always meant to exist.",
    cta: false,
  },
  {
    start: 72, end: 93,
    eyebrow: "BEGIN A PROJECT",
    headline: "This is what\nwe build for you.",
    body: null,
    cta: true,
  },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
export function FrameCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imagesRef  = useRef<HTMLImageElement[]>([]);
  const rafRef     = useRef(0);
  const lastIdxRef = useRef(-1);

  const [loadPct,   setLoadPct]   = useState(0);
  const [ready,     setReady]     = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [ctaHover,  setCtaHover]  = useState(false);

  /* ── 1. Preload all frames ────────────────────────────────────────────────── */
  useEffect(() => {
    let mounted = true;
    let done    = 0;
    imagesRef.current = new Array(TOTAL);

    for (let i = 1; i <= TOTAL; i++) {
      const img  = new Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        if (!mounted) return;
        done++;
        setLoadPct(Math.round((done / TOTAL) * 100));
        if (done === TOTAL) setReady(true);
        // draw frame 0 the instant it's available — user sees content immediately
        if (i === 1 && img.complete) drawToCanvas(0);
      };
      img.src = frameUrl(i);
      imagesRef.current[i - 1] = img;
    }
    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── 2. Resize canvas ────────────────────────────────────────────────────── */
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      lastIdxRef.current = -1; // force redraw
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── 3. Draw a frame index onto canvas ───────────────────────────────────── */
  const drawToCanvas = useCallback((idx: number) => {
    if (idx === lastIdxRef.current) return;
    lastIdxRef.current = idx;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: false });
    if (!ctx) return;
    const img = imagesRef.current[idx];
    if (!img?.complete || !img.naturalWidth) return;

    const { width: cw, height: ch } = c;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, cw, ch);

    // background-size: cover  (maintain aspect, fill canvas)
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth  * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - dw) * 0.5, (ch - dh) * 0.5, dw, dh);
  }, []);

  /* ── 4. Scroll listener → frame index ───────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect     = el.getBoundingClientRect();
        const total    = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const pct      = total > 0 ? (scrolled / total) * 100 : 0;
        setScrollPct(pct);
        const idx = Math.min(TOTAL - 1, Math.floor((pct / 100) * TOTAL));
        drawToCanvas(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("scroll", onScroll); };
  }, [drawToCanvas]);

  /* ── Derived state ────────────────────────────────────────────────────────── */
  const activeBeat  = BEATS.find(b => scrollPct >= b.start && scrollPct <= b.end) ?? null;
  const showHint    = scrollPct < 4;
  const currentFrame = Math.min(TOTAL, Math.floor((scrollPct / 100) * TOTAL) + 1);

  return (
    <>
      {/* ── Film grain overlay (inline SVG base64 pattern, z above canvas) ── */}
      <GrainOverlay />

      {/* ── Scroll container: its height IS the animation duration ── */}
      <div
        id="top"
        ref={sectionRef}
        style={{ height: `${TOTAL * VH_PER}vh` }}
        aria-label="Terra Space Studio — cinematic walkthrough"
      >
        {/* Sticky viewport — stays pinned while user scrolls through the container */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: "100svh" }}
        >
          {/* ── Canvas ── */}
          <canvas
            ref={canvasRef}
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              background: "#0a0a0a", display: "block",
            }}
          />

          {/* ── Vignette: dark edges → transparent centre ── */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
              background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 20%, rgba(10,10,10,0.50) 72%, rgba(10,10,10,0.85) 100%)",
            }}
          />

          {/* ── Top gradient: keeps nav links readable ── */}
          <div
            aria-hidden
            style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 110, zIndex: 3,
              pointerEvents: "none",
              background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 100%)",
            }}
          />

          {/* ── Bottom gradient ── */}
          <div
            aria-hidden
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 160, zIndex: 3,
              pointerEvents: "none",
              background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 100%)",
            }}
          />

          {/* ── Loading screen ── */}
          <AnimatePresence>
            {!ready && (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: 0, zIndex: 50,
                  background: "#0a0a0a",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}
              >
                <p style={STYLE.studioLabel}>Terra Space Studio</p>

                {/* Gold progress bar */}
                <div style={STYLE.barTrack}>
                  <div style={{ ...STYLE.barFill, width: `${loadPct}%` }} />
                </div>

                <p style={STYLE.loadingText}>Preparing your experience…</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Story beats — fade between chapters ── */}
          <AnimatePresence mode="wait">
            {activeBeat && (
              <motion.div
                key={activeBeat.eyebrow}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", inset: 0, zIndex: 10,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  padding: "0 clamp(1.2rem, 5vw, 2.5rem)",
                  textAlign: "center",
                  pointerEvents: activeBeat.cta ? "auto" : "none",
                }}
              >
                {/* Eyebrow */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "clamp(0.9rem, 2.2vh, 1.4rem)" }}>
                  <span style={STYLE.ruleGold} />
                  <span style={STYLE.eyebrow}>{activeBeat.eyebrow}</span>
                  <span style={STYLE.ruleGold} />
                </div>

                {/* Headline — the big cinematic text */}
                <h2 style={{
                  ...STYLE.headline,
                  marginBottom: (activeBeat.body || activeBeat.cta)
                    ? "clamp(1rem, 2.4vh, 1.8rem)"
                    : 0,
                }}>
                  {activeBeat.headline}
                </h2>

                {/* Italic body */}
                {activeBeat.body && (
                  <p style={{
                    ...STYLE.body,
                    marginBottom: activeBeat.cta ? "clamp(1.4rem, 3vh, 2.2rem)" : 0,
                  }}>
                    {activeBeat.body}
                  </p>
                )}

                {/* CTA */}
                {activeBeat.cta && (
                  <a
                    href="#work"
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onMouseEnter={() => setCtaHover(true)}
                    onMouseLeave={() => setCtaHover(false)}
                    style={{
                      ...STYLE.cta,
                      background: ctaHover ? "#B5934A" : "transparent",
                      color:      ctaHover ? "#0a0a0a" : "#f5f0e8",
                    }}
                  >
                    Explore Our Work
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Scroll hint — vanishes after first 4% ── */}
          <AnimatePresence>
            {showHint && ready && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                style={{
                  position: "absolute",
                  bottom: "clamp(1.5rem, 4vh, 2.8rem)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 20,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "0.5rem",
                  pointerEvents: "none",
                }}
              >
                <p style={STYLE.hintText}>Scroll to explore</p>
                <BouncingChevron />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Chapter progress dots (desktop) ── */}
          {ready && (
            <div
              aria-hidden
              className="hidden md:flex"
              style={{
                position: "absolute",
                right: "clamp(1.4rem, 2.5vw, 2.2rem)",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                flexDirection: "column", gap: 10, alignItems: "center",
              }}
            >
              {BEATS.map((b, i) => {
                const isActive = scrollPct >= b.start && scrollPct <= b.end;
                return (
                  <span key={i} style={{
                    display: "block", width: 1,
                    height: isActive ? 28 : 12,
                    background: isActive ? "#B5934A" : "rgba(181,147,74,0.3)",
                    borderRadius: 1,
                    transition: "height 0.35s ease, background 0.35s ease",
                  }} />
                );
              })}
            </div>
          )}

          {/* ── Frame counter (desktop bottom-right) ── */}
          {ready && (
            <p
              aria-hidden
              className="hidden md:block"
              style={{
                position: "absolute",
                bottom: "clamp(1.5rem, 4vh, 2.8rem)",
                right: "clamp(1.4rem, 2.5vw, 2.2rem)",
                zIndex: 20,
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.22em",
                color: "rgba(181,147,74,0.45)",
                pointerEvents: "none",
              }}
            >
              {String(currentFrame).padStart(2, "0")}&nbsp;/&nbsp;{String(TOTAL).padStart(2, "0")}
            </p>
          )}

        </div>{/* /sticky */}
      </div>{/* /scroll container */}
    </>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function BouncingChevron() {
  return (
    <motion.svg
      width="13" height="8" viewBox="0 0 13 8"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M1 1L6.5 7L12 1" stroke="#B5934A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none",
        opacity: 0.034,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

/* ─── Shared inline style objects ─────────────────────────────────────────── */
const STYLE = {
  studioLabel: {
    fontFamily: "'Cormorant Garamond','Cormorant',serif",
    fontSize:   "clamp(0.9rem, 2.4vw, 1.15rem)",
    fontWeight: 300,
    color:      "#f5f0e8",
    letterSpacing: "0.45em",
    textTransform: "uppercase" as const,
    marginBottom: "2.6rem",
  },
  barTrack: {
    width: "min(220px, 52vw)", height: "1px",
    background: "rgba(181,147,74,0.18)",
    position: "relative" as const, overflow: "hidden",
  },
  barFill: {
    position: "absolute" as const,
    top: 0, left: 0, height: "100%",
    background: "#B5934A",
    transition: "width 0.12s ease-out",
  },
  loadingText: {
    marginTop: "1rem",
    fontFamily: "'Tenor Sans',sans-serif",
    fontSize: "0.56rem",
    letterSpacing: "0.32em",
    color: "#B5934A",
    textTransform: "uppercase" as const,
  },
  ruleGold: {
    display: "block", width: 22, height: 1,
    background: "#B5934A", opacity: 0.7,
  } as React.CSSProperties,
  eyebrow: {
    fontFamily: "'Tenor Sans','Didact Gothic',sans-serif",
    fontSize:   "clamp(0.52rem, 1.15vw, 0.65rem)",
    letterSpacing: "0.4em",
    color: "#B5934A",
    textTransform: "uppercase" as const,
  },
  headline: {
    fontFamily: "'Cormorant Garamond','Cormorant',serif",
    fontSize:   "clamp(2.5rem, 8.5vw, 6.8rem)",
    fontWeight: 300,
    color:      "#f5f0e8",
    lineHeight: 1.02,
    letterSpacing: "0.015em",
    whiteSpace:  "pre-line" as const,
    maxWidth:    "min(880px, 94vw)",
    textShadow:  "0 4px 55px rgba(10,10,10,0.45)",
  },
  body: {
    fontFamily: "'Cormorant Garamond','Cormorant',serif",
    fontStyle:  "italic" as const,
    fontSize:   "clamp(0.95rem, 2.1vw, 1.4rem)",
    fontWeight: 300,
    color:      "rgba(245,240,232,0.70)",
    letterSpacing: "0.02em",
    maxWidth:    "min(500px, 90vw)",
    lineHeight:  1.5,
  },
  cta: {
    display: "inline-block",
    marginTop: "clamp(1rem, 2.5vh, 1.8rem)",
    border: "1px solid #B5934A",
    padding: "clamp(10px, 1.5vh, 14px) clamp(26px, 4vw, 40px)",
    fontFamily: "'Tenor Sans',sans-serif",
    fontSize: "clamp(0.56rem, 1.2vw, 0.66rem)",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    transition: "background 0.26s ease, color 0.26s ease",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
  hintText: {
    fontFamily: "'Tenor Sans',sans-serif",
    fontSize: "0.56rem",
    letterSpacing: "0.32em",
    color: "#B5934A",
    textTransform: "uppercase" as const,
  },
} satisfies Record<string, React.CSSProperties>;
