/**
 * FrameCanvas.tsx — Terra Space Studio
 *
 * Fix: frame-001.jpg shown as <img> INSTANTLY on mount (no canvas delay).
 * Canvas fades in on top once loaded. Zero black screen.
 *
 * Opening: cream left panel + floor plan right.
 * Scroll: cream slides away, full canvas animation.
 * Beats: no gaps.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TOTAL  = 76;
const VH_PER = 9;

function frameUrl(n: number) {
  return `/frames/frame-${String(n).padStart(3, "0")}.jpg`;
}

type Beat = {
  start: number; end: number;
  phase: string; lines: string[]; sub: string | null;
  cta: boolean; ctaLabel?: string; ctaTarget?: string;
};

const BEATS: Beat[] = [
  {
    start: 0,  end: 22,
    phase: "TERRA SPACE STUDIO · HYDERABAD",
    lines: ["Every home starts", "with a single idea."],
    sub: "We catch it. Then we build it.",
    cta: false,
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

function Words({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={style}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22, filter: "blur(3px)" }}
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

export function FrameCanvas() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const imgsRef     = useRef<HTMLImageElement[]>([]);
  const rafRef      = useRef(0);
  const lastIdxRef  = useRef(-1);

  const [canvasReady, setCanvasReady] = useState(false);
  const [scrollPct,   setScrollPct]   = useState(0);
  const [ctaHover,    setCtaHover]    = useState(false);

  /* ── Load frames ── */
  useEffect(() => {
    let mounted = true;
    imgsRef.current = new Array(TOTAL);

    const first = new Image();
    first.onload = () => {
      imgsRef.current[0] = first;
      drawIdx(0);
      if (mounted) setCanvasReady(true);
    };
    first.src = frameUrl(1);

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

  /* ── Resize ── */
  useEffect(() => {
    const r = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      lastIdxRef.current = -1;
    };
    r();
    window.addEventListener("resize", r, { passive: true });
    return () => window.removeEventListener("resize", r);
  }, []);

  /* ── Draw ── */
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
    ctx.fillStyle = "#f5f0e8";
    ctx.fillRect(0, 0, cw, ch);
    const s  = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    ctx.drawImage(img, (cw - img.naturalWidth * s) * .5, (ch - img.naturalHeight * s) * .5, img.naturalWidth * s, img.naturalHeight * s);
  }, []);

  /* ── Scroll ── */
  useEffect(() => {
    const fn = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const tot  = el.offsetHeight - window.innerHeight;
        const sc   = Math.min(Math.max(-rect.top, 0), tot);
        const pct  = tot > 0 ? (sc / tot) * 100 : 0;
        setScrollPct(pct);
        drawIdx(Math.min(TOTAL - 1, Math.floor((pct / 100) * TOTAL)));
      });
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("scroll", fn); };
  }, [drawIdx]);

  const beat       = BEATS.find(b => scrollPct >= b.start && scrollPct <= b.end) ?? null;
  const coverPct   = scrollPct < 20 ? Math.max(0, 50 * (1 - scrollPct / 18)) : 0;
  const showCover  = coverPct > 0.5;
  const showHint   = scrollPct < 4;

  return (
    <>
      <Grain />
      <div id="top" ref={sectionRef} style={{ height: `${TOTAL * VH_PER}vh` }} aria-label="Terra Space Studio intro">
        <div className="sticky top-0 overflow-hidden" style={{ height: "100svh" }}>

          {/* ── INSTANT floor plan — visible from millisecond 0, no canvas needed ── */}
          <img
            src={frameUrl(1)}
            aria-hidden
            fetchPriority="high"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              // Fades out once canvas takes over, preventing double-image
              opacity: canvasReady ? 0 : 1,
              transition: "opacity 0.6s ease",
              zIndex: 0,
            }}
          />

          {/* ── Canvas (fades in once frame-001 is drawn) ── */}
          <canvas
            ref={canvasRef}
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              display: "block",
              opacity: canvasReady ? 1 : 0,
              transition: "opacity 0.6s ease",
              zIndex: 1,
            }}
          />

          {/* ── Vignette (fades in with canvas) ── */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 20%, rgba(10,10,10,0.40) 70%, rgba(10,10,10,0.80) 100%)",
            opacity: showCover ? Math.min(1, scrollPct / 18) : 1,
          }} />

          {/* ── Top gradient ── */}
          <div aria-hidden style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 110, zIndex: 3, pointerEvents: "none",
            background: showCover
              ? "linear-gradient(to bottom, rgba(245,240,232,0.4) 0%, transparent 100%)"
              : "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 100%)",
          }} />

          {/* ── CREAM INTRO PANEL — slides left on scroll ── */}
          {showCover && (
            <div aria-hidden style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${coverPct}%`,
              background: "#f5f0e8",
              zIndex: 12, pointerEvents: "none",
            }} />
          )}

          {/* ── Gold divider between cream and image ── */}
          {showCover && (
            <div aria-hidden style={{
              position: "absolute",
              left: `calc(${coverPct}% - 1px)`,
              top: "8%", bottom: "8%", width: "1px",
              background: "linear-gradient(to bottom, transparent, #B5934A 30%, #B5934A 70%, transparent)",
              opacity: Math.min(0.7, coverPct / 50 * 0.7),
              zIndex: 13, pointerEvents: "none",
            }} />
          )}

          {/* ── Story beats ── */}
          <AnimatePresence mode="wait">
            {beat && (
              <motion.div
                key={beat.phase}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  left: "clamp(1.8rem, 5vw, 4.5rem)",
                  bottom: "clamp(4.5rem, 9vh, 7rem)",
                  zIndex: 15, maxWidth: "min(820px, 88vw)",
                  pointerEvents: beat.cta ? "auto" : "none",
                }}
              >
                {/* Backdrop for dark frames */}
                {!showCover && (
                  <div style={{
                    position: "absolute",
                    inset: "-1.5rem -2rem -1.5rem -2rem",
                    background: "linear-gradient(135deg, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.3) 55%, transparent 100%)",
                    filter: "blur(18px)", zIndex: -1,
                  }} />
                )}

                {/* Phase label */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "clamp(0.6rem, 1.6vh, 1rem)" }}
                >
                  <span style={{ display: "block", width: 26, height: 1, background: "#B5934A" }} />
                  <span style={{
                    fontFamily: "'Tenor Sans',sans-serif",
                    fontSize: "clamp(0.48rem, 1.05vw, 0.6rem)",
                    letterSpacing: "0.38em", textTransform: "uppercase",
                    color: showCover ? "#8a7355" : "#B5934A",
                  }}>
                    {beat.phase}
                  </span>
                </motion.div>

                {/* Headline */}
                <div style={{ marginBottom: beat.sub || beat.cta ? "clamp(0.8rem,1.8vh,1.2rem)" : 0 }}>
                  {beat.lines.map((line, li) => (
                    <div key={li} style={{
                      fontFamily: "'Cormorant Garamond','Cormorant',serif",
                      fontSize: "clamp(2.2rem, 7vw, 6rem)",
                      fontWeight: 300, lineHeight: 1.0,
                      display: "block",
                      marginBottom: li < beat.lines.length - 1 ? "0.04em" : 0,
                      color: showCover ? "#2c1a0e" : "#f5f0e8",
                      textShadow: showCover ? "none" : "0 2px 8px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)",
                    }}>
                      <Words text={line} delay={li * 0.16} />
                    </div>
                  ))}
                </div>

                {/* Sub */}
                {beat.sub && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: beat.lines.length * 0.16 + 0.25 }}
                    style={{
                      fontFamily: "'Cormorant Garamond','Cormorant',serif",
                      fontStyle: "italic",
                      fontSize: "clamp(0.88rem, 1.8vw, 1.3rem)",
                      fontWeight: 300, lineHeight: 1.5,
                      color: showCover ? "rgba(44,26,14,0.68)" : "rgba(245,240,232,0.72)",
                      textShadow: showCover ? "none" : "0 1px 6px rgba(0,0,0,0.8)",
                      maxWidth: "min(540px,88vw)",
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
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.5 }}
                    onClick={e => { e.preventDefault(); document.querySelector(beat.ctaTarget ?? "#contact")?.scrollIntoView({ behavior: "smooth" }); }}
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
                      letterSpacing: "0.3em", textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "background 0.25s, color 0.25s",
                      cursor: "pointer", WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {beat.ctaLabel ?? "Explore Our Work"}
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Concept Plan label ── */}
          {showCover && (
            <div style={{
              position: "absolute", right: "clamp(1.5rem,3vw,2.5rem)",
              bottom: "clamp(1.5rem,4vh,2.5rem)", zIndex: 16, pointerEvents: "none",
            }}>
              <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.5rem", letterSpacing: "0.32em", color: "#B5934A", textTransform: "uppercase", textAlign: "right", marginBottom: "0.35rem" }}>
                Concept Plan
              </p>
              <div style={{ height: 1, background: "#B5934A", opacity: 0.35 }} />
            </div>
          )}

          {/* ── Scroll hint ── */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{
                  position: "absolute", bottom: "clamp(1.5rem,4vh,2.8rem)", left: "50%",
                  transform: "translateX(-50%)", zIndex: 20,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                  pointerEvents: "none",
                }}
              >
                <p style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.52rem", letterSpacing: "0.32em", color: showCover ? "#8a7355" : "#B5934A", textTransform: "uppercase" }}>
                  Scroll to explore
                </p>
                <Chevron dark={showCover} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Chapter ticks ── */}
          {!showCover && (
            <div aria-hidden className="hidden md:flex" style={{
              position: "absolute", right: "clamp(1.4rem,2.5vw,2.2rem)", top: "50%",
              transform: "translateY(-50%)", zIndex: 20,
              flexDirection: "column", gap: 12, alignItems: "flex-end",
            }}>
              {BEATS.map((b, i) => (
                <span key={i} style={{
                  display: "block", width: 1, borderRadius: 1,
                  height: (scrollPct >= b.start && scrollPct <= b.end) ? 28 : 12,
                  background: (scrollPct >= b.start && scrollPct <= b.end) ? "#B5934A" : "rgba(181,147,74,0.28)",
                  transition: "height 0.35s ease, background 0.35s ease",
                }} />
              ))}
            </div>
          )}

          {/* ── Frame counter ── */}
          {!showCover && (
            <p aria-hidden className="hidden md:block" style={{
              position: "absolute", bottom: "clamp(1.5rem,4vh,2.8rem)", right: "clamp(1.4rem,2.5vw,2.2rem)",
              zIndex: 20, fontFamily: "'Tenor Sans',sans-serif", fontSize: "0.5rem",
              letterSpacing: "0.2em", color: "rgba(181,147,74,0.35)", pointerEvents: "none",
            }}>
              {String(Math.min(TOTAL, Math.floor((scrollPct / 100) * TOTAL) + 1)).padStart(2, "0")}&nbsp;/&nbsp;{String(TOTAL).padStart(2, "0")}
            </p>
          )}

        </div>
      </div>
    </>
  );
}

function Chevron({ dark }: { dark?: boolean }) {
  const c = dark ? "#8a7355" : "#B5934A";
  return (
    <motion.svg width="13" height="8" viewBox="0 0 13 8" fill="none"
      animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M1 1L6.5 7L12 1" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

function Grain() {
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none", opacity: 0.028,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23g)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
    }} />
  );
}
