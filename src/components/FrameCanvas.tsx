/**
 * FrameCanvas.tsx — Terra Space Studio
 * Scroll-scrubbed cinematic hero.
 * Frames go in /public/frames/frame-001.jpg … frame-076.jpg
 *
 * CHANGES IN THIS VERSION:
 *  - Word-by-word animated headline entrance
 *  - Dark "text stage" backdrop so words are readable on ANY frame
 *  - Two-phase scroll: Plan→Sketch (frames 1-38) + Sketch→Render (frames 39-76)
 *  - Final beat: "Start Your Space" → #contact
 *  - Text is left-aligned bottom-left for cinematic feel (not centered)
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Config ───────────────────────────────────────────────────── */
const TOTAL  = 76;
const VH_PER = 9;   // 9 × 76 = 684vh total scroll

function frameUrl(n: number) {
  return `/frames/frame-${String(n).padStart(3, "0")}.jpg`;
}

/* ─── Story beats ──────────────────────────────────────────────── */
// Frames 001–025 = floor plan (birds-eye)
// Frames 026–050 = architectural sketch/drawing
// Frames 051–076 = 3D render / photo-real
type Beat = {
  start: number; end: number;
  phase: string;
  headline: string[];   // split into lines for animation
  sub: string | null;
  cta: boolean;
  ctaLabel?: string;
  ctaTarget?: string;
};

const BEATS: Beat[] = [
  {
    start: 0, end: 22,
    phase: "THE IDEA",
    headline: ["Every home starts", "with a single idea."],
    sub: "We catch it. Then we build it.",
    cta: false,
  },
  {
    start: 27, end: 46,
    phase: "THE DRAWINGS",
    headline: ["Every wall,", "every window,", "chosen."],
    sub: "Nothing is placed without reason. Not one line.",
    cta: false,
  },
  {
    start: 51, end: 69,
    phase: "THE BUILD",
    headline: ["Light, material,", "proportion."],
    sub: "The three things that make a room feel like it was always meant to exist.",
    cta: false,
  },
  {
    start: 74, end: 94,
    phase: "YOUR SPACE",
    headline: ["This is what", "we build for you."],
    sub: null,
    cta: true,
    ctaLabel: "Start Your Space",
    ctaTarget: "#contact",
  },
];

/* ─── Word split helper ────────────────────────────────────────── */
function WordReveal({
  text,
  delayBase = 0,
  style,
}: {
  text: string;
  delayBase?: number;
  style?: React.CSSProperties;
}) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline", ...style }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: delayBase + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Main component ───────────────────────────────────────────── */
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

  /* ── Preload ─────────────────────────────────────────────────── */
  useEffect(() => {
    let mounted = true;
    let done = 0;
    imagesRef.current = new Array(TOTAL);

    for (let i = 1; i <= TOTAL; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        if (!mounted) return;
        done++;
        setLoadPct(Math.round((done / TOTAL) * 100));
        if (done === TOTAL) setReady(true);
        if (i === 1 && img.complete) drawToCanvas(0);
      };
      img.src = frameUrl(i);
      imagesRef.current[i - 1] = img;
    }
    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Canvas resize ───────────────────────────────────────────── */
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      lastIdxRef.current = -1;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── Draw ────────────────────────────────────────────────────── */
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

    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - dw) * 0.5, (ch - dh) * 0.5, dw, dh);
  }, []);

  /* ── Scroll → frame ──────────────────────────────────────────── */
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
        drawToCanvas(Math.min(TOTAL - 1, Math.floor((pct / 100) * TOTAL)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("scroll", onScroll); };
  }, [drawToCanvas]);

  const activeBeat   = BEATS.find(b => scrollPct >= b.start && scrollPct <= b.end) ?? null;
  const showHint     = scrollPct < 4;
  const currentFrame = Math.min(TOTAL, Math.floor((scrollPct / 100) * TOTAL) + 1);

  return (
    <>
      <GrainOverlay />

      <div
        id="top"
        ref={sectionRef}
        style={{ height: `${TOTAL * VH_PER}vh` }}
        aria-label="Terra Space Studio — cinematic walkthrough"
      >
        <div className="sticky top-0 overflow-hidden" style={{ height: "100svh" }}>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            aria-hidden
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#0a0a0a", display: "block" }}
          />

          {/* Vignette */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 15%, rgba(10,10,10,0.45) 65%, rgba(10,10,10,0.82) 100%)",
          }} />

          {/* Nav readability gradient (top) */}
          <div aria-hidden style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 120, zIndex: 3, pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 100%)",
          }} />

          {/* Bottom gradient */}
          <div aria-hidden style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 180, zIndex: 3, pointerEvents: "none",
            background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 100%)",
          }} />

          {/* ── Loading ── */}
          <AnimatePresence>
            {!ready && (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 1.1 }}
                style={{
                  position: "absolute", inset: 0, zIndex: 50, background: "#0a0a0a",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}
              >
                <p style={{ fontFamily: "'Cormorant Garamond','Cormorant',serif", fontSize: "clamp(1rem,2.4vw,1.2rem)", fontWeight: 300, color: "#f5f0e8", letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: "2.6rem" }}>
                  Terra Space Studio
                </p>
                <div style={{ width: "min(220px,52vw)", height: "1px", background: "rgba(181,147,74,0.18)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#B5934A", width: `${loadPct}%`, transition: "width 0.12s ease-out" }} />
                </div>
                <p style={{ marginTop: "1rem", fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.56rem", letterSpacing: "0.32em", color: "#B5934A", textTransform: "uppercase" }}>
                  Preparing your experience…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Story beat overlay ── */}
          <AnimatePresence mode="wait">
            {activeBeat && (
              <motion.div
                key={activeBeat.phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  /* Left-bottom placement — cinematic, not centered */
                  left: "clamp(1.8rem, 6vw, 5rem)",
                  bottom: "clamp(4.5rem, 10vh, 7rem)",
                  zIndex: 10,
                  maxWidth: "min(780px, 90vw)",
                  pointerEvents: activeBeat.cta ? "auto" : "none",
                }}
              >
                {/* ── DARK STAGE: makes text readable on ANY image ── */}
                <div style={{
                  position: "absolute",
                  inset: "-2rem -2.5rem -2rem -2.5rem",
                  background: "linear-gradient(135deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)",
                  filter: "blur(24px)",
                  zIndex: -1,
                  borderRadius: "4px",
                }} />

                {/* Phase label */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(0.7rem,1.8vh,1.1rem)" }}
                >
                  <span style={{ display: "block", width: 28, height: 1, background: "#B5934A" }} />
                  <span style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "clamp(0.52rem,1.1vw,0.63rem)", letterSpacing: "0.38em", color: "#B5934A", textTransform: "uppercase" }}>
                    {activeBeat.phase}
                  </span>
                </motion.div>

                {/* Headline — word-by-word reveal, each line separate */}
                <div style={{ marginBottom: activeBeat.sub || activeBeat.cta ? "clamp(0.9rem,2vh,1.4rem)" : 0 }}>
                  {activeBeat.headline.map((line, li) => (
                    <div key={li} style={{
                      fontFamily: "'Cormorant Garamond','Cormorant',serif",
                      fontSize: "clamp(2.4rem,7.5vw,6.2rem)",
                      fontWeight: 300,
                      lineHeight: 1.0,
                      color: "#f5f0e8",
                      letterSpacing: "0.01em",
                      /* Heavy shadow ensures white text on any light/dark image */
                      textShadow: "0 2px 6px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.85)",
                      display: "block",
                      marginBottom: li < activeBeat.headline.length - 1 ? "0.05em" : 0,
                    }}>
                      <WordReveal text={line} delayBase={li * 0.18} />
                    </div>
                  ))}
                </div>

                {/* Sub-line */}
                {activeBeat.sub && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: activeBeat.headline.length * 0.18 + 0.3 }}
                    style={{
                      fontFamily: "'Cormorant Garamond','Cormorant',serif",
                      fontStyle: "italic",
                      fontSize: "clamp(0.9rem,1.9vw,1.3rem)",
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.75)",
                      letterSpacing: "0.02em",
                      lineHeight: 1.5,
                      textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                      marginBottom: activeBeat.cta ? "clamp(1.2rem,2.5vh,2rem)" : 0,
                    }}
                  >
                    {activeBeat.sub}
                  </motion.p>
                )}

                {/* CTA */}
                {activeBeat.cta && (
                  <motion.a
                    href={activeBeat.ctaTarget ?? "#contact"}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(activeBeat.ctaTarget ?? "#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onMouseEnter={() => setCtaHover(true)}
                    onMouseLeave={() => setCtaHover(false)}
                    style={{
                      display: "inline-block",
                      border: "1px solid #B5934A",
                      background: ctaHover ? "#B5934A" : "transparent",
                      color: ctaHover ? "#0a0a0a" : "#f5f0e8",
                      padding: "clamp(11px,1.6vh,15px) clamp(28px,4vw,44px)",
                      fontFamily: "'Tenor Sans',sans-serif",
                      fontSize: "clamp(0.56rem,1.15vw,0.65rem)",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "background 0.26s ease, color 0.26s ease",
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {activeBeat.ctaLabel ?? "Explore Our Work"}
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Scroll hint ── */}
          <AnimatePresence>
            {showHint && ready && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                style={{
                  position: "absolute", bottom: "clamp(1.5rem,4vh,2.8rem)", left: "50%",
                  transform: "translateX(-50%)", zIndex: 20,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                  pointerEvents: "none",
                }}
              >
                <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.56rem", letterSpacing: "0.32em", color: "#B5934A", textTransform: "uppercase" }}>
                  Scroll to explore
                </p>
                <BouncingChevron />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Phase progress indicator (right side) ── */}
          {ready && (
            <div
              aria-hidden
              className="hidden md:flex"
              style={{
                position: "absolute", right: "clamp(1.4rem,2.5vw,2.2rem)", top: "50%",
                transform: "translateY(-50%)", zIndex: 20,
                flexDirection: "column", gap: 12, alignItems: "flex-end",
              }}
            >
              {BEATS.map((b, i) => {
                const active = scrollPct >= b.start && scrollPct <= b.end;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {active && (
                      <span style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "#B5934A", textTransform: "uppercase" }}>
                        {b.phase}
                      </span>
                    )}
                    <span style={{
                      display: "block", width: 1,
                      height: active ? 30 : 12,
                      background: active ? "#B5934A" : "rgba(181,147,74,0.28)",
                      transition: "height 0.35s ease, background 0.35s ease",
                    }} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Frame counter */}
          {ready && (
            <p aria-hidden className="hidden md:block" style={{
              position: "absolute", bottom: "clamp(1.5rem,4vh,2.8rem)", right: "clamp(1.4rem,2.5vw,2.2rem)",
              zIndex: 20, fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.55rem",
              letterSpacing: "0.22em", color: "rgba(181,147,74,0.4)", pointerEvents: "none",
            }}>
              {String(currentFrame).padStart(2, "0")}&nbsp;/&nbsp;{String(TOTAL).padStart(2, "0")}
            </p>
          )}

        </div>
      </div>
    </>
  );
}

function BouncingChevron() {
  return (
    <motion.svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M1 1L6.5 7L12 1" stroke="#B5934A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

function GrainOverlay() {
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none", opacity: 0.034,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23g)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
    }} />
  );
}
