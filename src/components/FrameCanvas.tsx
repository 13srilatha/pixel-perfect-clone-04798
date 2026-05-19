/**
 * FrameCanvas.tsx — Terra Space Studio
 *
 * Opening: Floor plan visible on RIGHT. Cream panel on LEFT (matches Nav).
 * As user scrolls the cream panel slides away left, canvas fills the screen.
 * Beats run without any gaps — no empty frames.
 * No black loading screen.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Config ────────────────────────────────────────────────────── */
const TOTAL  = 76;
const VH_PER = 9;  // 76 × 9 = 684vh total

function frameUrl(n: number) {
  return `/frames/frame-${String(n).padStart(3, "0")}.jpg`;
}

/* ─── Story beats — NO GAPS between them ───────────────────────── */
// Beat windows are contiguous so text always shows, no empty frames.
type Beat = {
  start: number; end: number;
  phase: string;
  lines: string[];
  sub: string | null;
  cta: boolean;
  ctaLabel?: string;
  ctaTarget?: string;
  lightText?: boolean; // true = dark espresso text (used during cream intro)
};

const BEATS: Beat[] = [
  {
    start: 0,  end: 22,
    phase: "TERRA SPACE STUDIO · HYDERABAD",
    lines: ["Every home starts", "with a single idea."],
    sub: "We catch it. Then we build it.",
    cta: false, lightText: true,
  },
  {
    start: 22, end: 44,
    phase: "THE DRAWINGS",
    lines: ["Every wall,", "every window,", "chosen."],
    sub: "Nothing is placed without reason. Not one line.",
    cta: false,
  },
  {
    start: 44, end: 64,
    phase: "THE BUILD",
    lines: ["Light, material,", "proportion."],
    sub: "The three things that make a room feel like it was always meant to exist.",
    cta: false,
  },
  {
    start: 64, end: 95,
    phase: "YOUR SPACE",
    lines: ["This is what", "we build for you."],
    sub: null, cta: true,
    ctaLabel: "Start Your Space",
    ctaTarget: "#contact",
  },
];

/* ─── Word-reveal animation ─────────────────────────────────────── */
function WordReveal({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={style}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.26em" }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
export function FrameCanvas() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const imgsRef     = useRef<HTMLImageElement[]>([]);
  const rafRef      = useRef(0);
  const lastIdxRef  = useRef(-1);

  const [canvasReady, setCanvasReady] = useState(false); // frame-001 drawn
  const [scrollPct,   setScrollPct]   = useState(0);
  const [ctaHover,    setCtaHover]    = useState(false);

  /* ── Priority-load frame 1 first, rest async ─────────────────── */
  useEffect(() => {
    let mounted = true;
    imgsRef.current = new Array(TOTAL);

    // Frame 1 — highest priority
    const first = new Image();
    first.onload = () => {
      imgsRef.current[0] = first;
      drawIdx(0);
      if (mounted) setCanvasReady(true);
    };
    first.src = frameUrl(1);

    // Remaining frames
    for (let i = 2; i <= TOTAL; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { if (mounted) imgsRef.current[i - 1] = img; };
      img.src = frameUrl(i);
      imgsRef.current[i - 1] = img;
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
  const drawIdx = useCallback((idx: number) => {
    if (idx === lastIdxRef.current) return;
    lastIdxRef.current = idx;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: false });
    if (!ctx) return;
    const img = imgsRef.current[idx];
    if (!img?.complete || !img.naturalWidth) return;

    const { width: cw, height: ch } = c;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, cw, ch);

    const s  = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth  * s;
    const dh = img.naturalHeight * s;
    ctx.drawImage(img, (cw - dw) * .5, (ch - dh) * .5, dw, dh);
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
        drawIdx(Math.min(TOTAL - 1, Math.floor((pct / 100) * TOTAL)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("scroll", onScroll); };
  }, [drawIdx]);

  /* ── Derived ─────────────────────────────────────────────────── */
  const beat = BEATS.find(b => scrollPct >= b.start && scrollPct <= b.end) ?? null;

  // Cream intro panel: covers left 50% initially, shrinks to 0 by scrollPct 20
  const coverWidth = scrollPct < 20 ? Math.max(0, 50 * (1 - scrollPct / 18)) : 0;
  const showCover  = coverWidth > 0.5;

  // Gold divider line between cream and plan
  const showDivider = showCover && canvasReady;

  // Scroll hint
  const showHint = scrollPct < 4 && canvasReady;

  // Frame counter
  const frameNum = Math.min(TOTAL, Math.floor((scrollPct / 100) * TOTAL) + 1);

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

          {/* ── Canvas — always full screen from the start ── */}
          <canvas
            ref={canvasRef}
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              background: "#f5f0e8", // cream bg while first frame loads
              display: "block",
              opacity: canvasReady ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />

          {/* ── While canvas loads — show cream placeholder ── */}
          {!canvasReady && (
            <div style={{
              position: "absolute", inset: 0, background: "#f5f0e8", zIndex: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", color: "#B5934A", textTransform: "uppercase" }}>
                Loading…
              </p>
            </div>
          )}

          {/* ── Vignette ── */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 20%, rgba(10,10,10,0.40) 70%, rgba(10,10,10,0.80) 100%)",
            opacity: showCover ? Math.min(1, scrollPct / 18) : 1,
            transition: "opacity 0.1s",
          }} />

          {/* ── Top gradient (nav readability) ── */}
          <div aria-hidden style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 110, zIndex: 3, pointerEvents: "none",
            background: showCover
              ? "linear-gradient(to bottom, rgba(245,240,232,0.5) 0%, transparent 100%)"
              : "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 100%)",
          }} />

          {/* ── CREAM INTRO PANEL — slides away as user scrolls ── */}
          {showCover && (
            <div
              aria-hidden
              style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                width: `${coverWidth}%`,
                background: "#f5f0e8",
                zIndex: 12,
                pointerEvents: "none",
                transition: "none",
                overflow: "hidden",
              }}
            />
          )}

          {/* ── Gold divider line (between cream & canvas) ── */}
          {showDivider && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: `${coverWidth}%`,
                top: "10%", bottom: "10%",
                width: "1px",
                background: "#B5934A",
                opacity: Math.min(0.6, coverWidth / 50 * 0.6),
                zIndex: 13,
                pointerEvents: "none",
              }}
            />
          )}

          {/* ── Story beat overlay ── */}
          <AnimatePresence mode="wait">
            {beat && canvasReady && (
              <motion.div
                key={beat.phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  left: "clamp(1.8rem, 5vw, 4.5rem)",
                  bottom: "clamp(4.5rem, 9vh, 7rem)",
                  zIndex: 15,
                  maxWidth: "min(820px, 88vw)",
                  pointerEvents: beat.cta ? "auto" : "none",
                }}
              >
                {/* Text stage backdrop (only when no cream panel) */}
                {!showCover && (
                  <div style={{
                    position: "absolute",
                    inset: "-1.5rem -2rem -1.5rem -2rem",
                    background: "linear-gradient(135deg, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.35) 55%, transparent 100%)",
                    filter: "blur(20px)",
                    zIndex: -1,
                  }} />
                )}

                {/* Phase label */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(0.6rem, 1.6vh, 1rem)" }}
                >
                  <span style={{ display: "block", width: 26, height: 1, background: "#B5934A" }} />
                  <span style={{
                    fontFamily: "'Tenor Sans',sans-serif",
                    fontSize: "clamp(0.5rem,1.1vw,0.62rem)",
                    letterSpacing: "0.38em",
                    color: showCover ? "#8a7355" : "#B5934A",
                    textTransform: "uppercase",
                  }}>
                    {beat.phase}
                  </span>
                </motion.div>

                {/* Headline — word by word */}
                <div style={{ marginBottom: beat.sub || beat.cta ? "clamp(0.8rem, 1.8vh, 1.2rem)" : 0 }}>
                  {beat.lines.map((line, li) => (
                    <div
                      key={li}
                      style={{
                        fontFamily: "'Cormorant Garamond','Cormorant',serif",
                        fontSize: "clamp(2.2rem, 7vw, 6rem)",
                        fontWeight: 300,
                        lineHeight: 1.0,
                        letterSpacing: "0.01em",
                        display: "block",
                        marginBottom: li < beat.lines.length - 1 ? "0.04em" : 0,
                        color: showCover ? "#2c1a0e" : "#f5f0e8",
                        textShadow: showCover ? "none" : "0 2px 8px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)",
                      }}
                    >
                      <WordReveal text={line} delay={li * 0.16} />
                    </div>
                  ))}
                </div>

                {/* Sub line */}
                {beat.sub && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: beat.lines.length * 0.16 + 0.25 }}
                    style={{
                      fontFamily: "'Cormorant Garamond','Cormorant',serif",
                      fontStyle: "italic",
                      fontSize: "clamp(0.88rem, 1.8vw, 1.3rem)",
                      fontWeight: 300,
                      lineHeight: 1.5,
                      letterSpacing: "0.015em",
                      color: showCover ? "rgba(44,26,14,0.7)" : "rgba(245,240,232,0.72)",
                      textShadow: showCover ? "none" : "0 1px 6px rgba(0,0,0,0.8)",
                      maxWidth: "min(540px, 88vw)",
                      marginBottom: beat.cta ? "clamp(1rem,2.5vh,1.8rem)" : 0,
                    }}
                  >
                    {beat.sub}
                  </motion.p>
                )}

                {/* CTA */}
                {beat.cta && (
                  <motion.a
                    href={beat.ctaTarget ?? "#contact"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.5 }}
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(beat.ctaTarget ?? "#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onMouseEnter={() => setCtaHover(true)}
                    onMouseLeave={() => setCtaHover(false)}
                    style={{
                      display: "inline-block",
                      border: "1px solid #B5934A",
                      background: ctaHover ? "#B5934A" : "transparent",
                      color: ctaHover ? "#0a0a0a" : "#f5f0e8",
                      padding: "clamp(10px,1.5vh,14px) clamp(26px,3.5vw,40px)",
                      fontFamily: "'Tenor Sans',sans-serif",
                      fontSize: "clamp(0.55rem,1.1vw,0.64rem)",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "background 0.25s, color 0.25s",
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {beat.ctaLabel ?? "Explore Our Work"}
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── "FLOOR PLAN" label on the right during intro ── */}
          {showCover && canvasReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: "absolute",
                right: "clamp(1.5rem,3vw,2.5rem)",
                bottom: "clamp(1.5rem,4vh,2.5rem)",
                zIndex: 16,
                pointerEvents: "none",
              }}
            >
              <p style={{
                fontFamily: "'Tenor Sans',sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.32em",
                color: "#B5934A",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
                textAlign: "right",
              }}>
                Concept Plan
              </p>
              <div style={{ height: 1, background: "#B5934A", opacity: 0.4 }} />
            </motion.div>
          )}

          {/* ── Scroll hint ── */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: "clamp(1.5rem,4vh,2.8rem)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 20,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                  pointerEvents: "none",
                }}
              >
                <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.55rem", letterSpacing: "0.32em", color: showCover ? "#8a7355" : "#B5934A", textTransform: "uppercase" }}>
                  Scroll to explore
                </p>
                <BouncingChevron dark={showCover} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Chapter progress (desktop right) ── */}
          {canvasReady && !showCover && (
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
                      <span style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.48rem", letterSpacing: "0.2em", color: "rgba(181,147,74,0.7)", textTransform: "uppercase" }}>
                        {b.phase.split(" ")[0]}
                      </span>
                    )}
                    <span style={{
                      display: "block", width: 1, borderRadius: 1,
                      height: active ? 28 : 12,
                      background: active ? "#B5934A" : "rgba(181,147,74,0.28)",
                      transition: "height 0.35s ease, background 0.35s ease",
                    }} />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Frame counter ── */}
          {canvasReady && !showCover && (
            <p aria-hidden className="hidden md:block" style={{
              position: "absolute", bottom: "clamp(1.5rem,4vh,2.8rem)", right: "clamp(1.4rem,2.5vw,2.2rem)",
              zIndex: 20, fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.52rem",
              letterSpacing: "0.2em", color: "rgba(181,147,74,0.38)", pointerEvents: "none",
            }}>
              {String(frameNum).padStart(2, "0")}&nbsp;/&nbsp;{String(TOTAL).padStart(2, "0")}
            </p>
          )}

        </div>
      </div>
    </>
  );
}

function BouncingChevron({ dark = false }: { dark?: boolean }) {
  const color = dark ? "#8a7355" : "#B5934A";
  return (
    <motion.svg width="13" height="8" viewBox="0 0 13 8" fill="none"
      animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M1 1L6.5 7L12 1" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

function GrainOverlay() {
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none", opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23g)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
    }} />
  );
}
