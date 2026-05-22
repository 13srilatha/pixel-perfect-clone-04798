/**
 * FrameCanvas.tsx — Terra Space Studio
 * 
 * Apple-scroll cinematic storytelling.
 * 76 frames: floor plan → sketch → white model → photorealistic render
 * Story arc pulled directly from the Terra brochure.
 * 
 * ── HOW TO USE ──
 * 1. Put your 76 frames in /public/frames/ as frame-001.jpg … frame-076.jpg
 * 2. Import and drop <FrameCanvas /> as the FIRST element inside <main>
 * 3. The Nav sits above it naturally (fixed/sticky).
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Config ─── */
const TOTAL   = 76;   // update this if you add more frames
const VH_PER  = 10;   // viewport-heights per frame — controls scroll speed

function frameUrl(n: number) {
  return `/frames/frame-${String(n).padStart(3, "0")}.jpg`;
}

/* ─── Story beats — from Terra brochure ─── */
type Beat = {
  start: number; end: number;
  phase: string;
  lines: string[];
  sub: string | null;
  position: "bottom-left" | "center" | "bottom-right";
  cta: boolean;
  ctaLabel?: string;
  ctaTarget?: string;
};

const BEATS: Beat[] = [
  {
    start: 0,  end: 24,
    phase: "CONCEPT & PLANNING",
    lines: ["Every great space", "starts with a plan."],
    sub: "Context. Function. Intent. We read the site before we draw a single line.",
    position: "center",
    cta: false,
  },
  {
    start: 26, end: 50,
    phase: "ARCHITECTURAL DRAWINGS",
    lines: ["Every wall,", "every window,", "chosen."],
    sub: "Nothing is placed without reason. Simplicity, proportion, detail — from concept to construction.",
    position: "bottom-left",
    cta: false,
  },
  {
    start: 52, end: 74,
    phase: "3D MODELLING",
    lines: ["Form takes", "shape."],
    sub: "Honest materials. Natural light. The three things that make a space feel like it was always meant to exist.",
    position: "bottom-right",
    cta: false,
  },
  {
    start: 76, end: 97,
    phase: "TERRA SPACE STUDIO · HYDERABAD",
    lines: ["Grounded by Earth.", "Designed for Experience."],
    sub: null,
    position: "center",
    cta: true,
    ctaLabel: "Begin Your Project",
    ctaTarget: "#contact",
  },
];

/* ─── Word-by-word animated headline ─── */
function Words({
  text,
  delay = 0,
  dark = false,
  large = false,
}: {
  text: string;
  delay?: number;
  dark?: boolean;
  large?: boolean;
}) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "inline-block",
            marginRight: large ? "0.22em" : "0.25em",
            color: dark ? "#2c1a0e" : "#f5f0e8",
            textShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.95), 0 0 50px rgba(0,0,0,0.8)",
          }}
        >
          {w}
        </motion.span>
      ))}
    </>
  );
}

/* ─── Main component ─── */
export function FrameCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imgsRef    = useRef<(HTMLImageElement | null)[]>([]);
  const rafRef     = useRef(0);
  const lastIdxRef = useRef(-1);

  const [canvasReady, setCanvasReady] = useState(false);
  const [loadPct,     setLoadPct]     = useState(0);
  const [scrollPct,   setScrollPct]   = useState(0);
  const [ctaHover,    setCtaHover]    = useState(false);

  /* ── Preload all frames with progress ── */
  useEffect(() => {
    let loaded = 0;
    let mounted = true;
    imgsRef.current = new Array(TOTAL).fill(null);

    const onLoad = (idx: number, img: HTMLImageElement) => {
      if (!mounted) return;
      imgsRef.current[idx] = img;
      loaded++;
      setLoadPct(Math.round((loaded / TOTAL) * 100));
      if (idx === 0) { drawIdx(0); setCanvasReady(true); }
    };

    for (let i = 0; i < TOTAL; i++) {
      const img = new Image();
      img.decoding = "async";
      const idx = i;
      img.onload = () => onLoad(idx, img);
      img.src = frameUrl(i + 1);
    }

    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Canvas resize ── */
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = window.devicePixelRatio || 1;
      c.width  = window.innerWidth  * dpr;
      c.height = window.innerHeight * dpr;
      c.style.width  = window.innerWidth  + "px";
      c.style.height = window.innerHeight + "px";
      lastIdxRef.current = -1;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── Draw frame ── */
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
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const x = (cw - img.naturalWidth  * s) * 0.5;
    const y = (ch - img.naturalHeight * s) * 0.5;
    ctx.drawImage(img, x, y, img.naturalWidth * s, img.naturalHeight * s);
  }, []);

  /* ── Scroll → frame index ── */
  useEffect(() => {
    const fn = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const pct = total > 0 ? (scrolled / total) * 100 : 0;
        setScrollPct(pct);
        const idx = Math.min(TOTAL - 1, Math.floor((pct / 100) * TOTAL));
        drawIdx(idx);
      });
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", fn);
    };
  }, [drawIdx]);

  /* ── Derived state ── */
  const beat     = BEATS.find(b => scrollPct >= b.start && scrollPct <= b.end) ?? null;
  const showHint = scrollPct < 5;
  const allLoaded = loadPct === 100;

  /* ── Position helper ── */
  function beatStyle(pos: Beat["position"]): React.CSSProperties {
    const base: React.CSSProperties = {
      position: "absolute",
      zIndex: 15,
      pointerEvents: beat?.cta ? "auto" : "none",
      maxWidth: "min(780px, 90vw)",
    };
    if (pos === "center") return {
      ...base,
      left: "50%", bottom: "clamp(5rem, 12vh, 9rem)",
      transform: "translateX(-50%)",
      textAlign: "center",
      alignItems: "center",
    };
    if (pos === "bottom-left") return {
      ...base,
      left: "clamp(1.8rem, 5vw, 5rem)",
      bottom: "clamp(4.5rem, 9vh, 7rem)",
    };
    return {
      ...base,
      right: "clamp(1.8rem, 5vw, 5rem)",
      bottom: "clamp(4.5rem, 9vh, 7rem)",
      textAlign: "right",
      alignItems: "flex-end",
    };
  }

  return (
    <>
      <Grain />

      {/* ── Loading overlay ── */}
      <AnimatePresence>
        {!allLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "#0a0a0a",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            <p style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.45em",
              color: "#B5934A", textTransform: "uppercase",
            }}>
              Terra Space Studio
            </p>
            <div style={{ width: 200, height: 1, background: "#1a1a1a", borderRadius: 1, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${loadPct}%`,
                background: "#B5934A", borderRadius: 1,
                transition: "width 0.2s ease",
              }} />
            </div>
            <p style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.55rem", letterSpacing: "0.2em",
              color: "rgba(181,147,74,0.4)",
            }}>
              {loadPct}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main scroll container ── */}
      <div
        id="top"
        ref={sectionRef}
        style={{ height: `${TOTAL * VH_PER}vh` }}
        aria-label="Terra Space Studio — From concept to completion"
      >
        <div className="sticky top-0 overflow-hidden" style={{ height: "100svh" }}>

          {/* Instant first frame — no flash */}
          <img
            src={frameUrl(1)}
            aria-hidden
            fetchPriority="high"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: canvasReady ? 0 : 1,
              transition: "opacity 0.5s ease",
              zIndex: 0,
            }}
          />

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              display: "block",
              opacity: canvasReady ? 1 : 0,
              transition: "opacity 0.5s ease",
              zIndex: 1,
            }}
          />

          {/* Vignette */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, rgba(5,5,5,0.38) 65%, rgba(5,5,5,0.75) 100%)",
          }} />

          {/* Top gradient for nav legibility */}
          <div aria-hidden style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: 100, zIndex: 3, pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(5,5,5,0.45) 0%, transparent 100%)",
          }} />

          {/* Bottom gradient */}
          <div aria-hidden style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 180, zIndex: 3, pointerEvents: "none",
            background: "linear-gradient(to top, rgba(5,5,5,0.55) 0%, transparent 100%)",
          }} />

          {/* ── Story beats ── */}
          <AnimatePresence mode="wait">
            {beat && (
              <motion.div
                key={beat.phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                style={{
                  ...beatStyle(beat.position),
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                {/* Phase label */}
                <motion.div
                  initial={{ opacity: 0, x: beat.position === "bottom-right" ? 8 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    marginBottom: "clamp(0.6rem, 1.5vh, 1rem)",
                    justifyContent: beat.position === "center" ? "center" : beat.position === "bottom-right" ? "flex-end" : "flex-start",
                  }}
                >
                  {beat.position !== "bottom-right" && (
                    <span style={{ display: "block", width: 22, height: 1, background: "#B5934A", flexShrink: 0 }} />
                  )}
                  <span style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: "clamp(0.45rem, 0.9vw, 0.55rem)",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "#B5934A",
                  }}>
                    {beat.phase}
                  </span>
                  {beat.position === "bottom-right" && (
                    <span style={{ display: "block", width: 22, height: 1, background: "#B5934A", flexShrink: 0 }} />
                  )}
                </motion.div>

                {/* Headline */}
                <div style={{ marginBottom: beat.sub || beat.cta ? "clamp(0.8rem, 2vh, 1.4rem)" : 0 }}>
                  {beat.lines.map((line, li) => (
                    <div
                      key={li}
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
                        fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)",
                        fontWeight: 300,
                        lineHeight: 1.0,
                        display: "block",
                        marginBottom: li < beat.lines.length - 1 ? "0.02em" : 0,
                      }}
                    >
                      <Words text={line} delay={li * 0.14} large />
                    </div>
                  ))}
                </div>

                {/* Subtext */}
                {beat.sub && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: beat.lines.length * 0.14 + 0.28 }}
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
                      fontStyle: "italic",
                      fontSize: "clamp(0.9rem, 1.7vw, 1.25rem)",
                      fontWeight: 300,
                      lineHeight: 1.55,
                      color: "rgba(245,240,232,0.72)",
                      textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                      maxWidth: "min(520px, 90vw)",
                      marginBottom: beat.cta ? "clamp(1.2rem, 2.8vh, 2rem)" : 0,
                    }}
                  >
                    {beat.sub}
                  </motion.p>
                )}

                {/* CTA */}
                {beat.cta && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    style={{ display: "flex", justifyContent: beat.position === "center" ? "center" : "flex-start" }}
                  >
                    <a
                      href={beat.ctaTarget ?? "#contact"}
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
                        padding: "clamp(10px, 1.5vh, 14px) clamp(28px, 3.5vw, 44px)",
                        fontFamily: "'Tenor Sans', sans-serif",
                        fontSize: "clamp(0.52rem, 0.95vw, 0.6rem)",
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        transition: "background 0.28s, color 0.28s",
                        cursor: "pointer",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {beat.ctaLabel ?? "Begin Your Project"}
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Scroll hint ── */}
          <AnimatePresence>
            {showHint && allLoaded && (
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
                <p style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.32em",
                  color: "#B5934A",
                  textTransform: "uppercase",
                }}>
                  Scroll to explore
                </p>
                <Chevron />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Chapter tick marks (desktop) ── */}
          <div
            aria-hidden
            className="hidden md:flex"
            style={{
              position: "absolute", right: "clamp(1.4rem, 2.5vw, 2.2rem)",
              top: "50%", transform: "translateY(-50%)",
              zIndex: 20, flexDirection: "column", gap: 14, alignItems: "flex-end",
            }}
          >
            {BEATS.map((b, i) => (
              <span
                key={i}
                style={{
                  display: "block", width: 1, borderRadius: 1,
                  height: (scrollPct >= b.start && scrollPct <= b.end) ? 32 : 10,
                  background: (scrollPct >= b.start && scrollPct <= b.end)
                    ? "#B5934A"
                    : "rgba(181,147,74,0.22)",
                  transition: "height 0.4s ease, background 0.4s ease",
                }}
              />
            ))}
          </div>

          {/* ── Frame counter (desktop) ── */}
          <p
            aria-hidden
            className="hidden md:block"
            style={{
              position: "absolute",
              bottom: "clamp(1.5rem, 4vh, 2.8rem)",
              right: "clamp(1.4rem, 2.5vw, 2.2rem)",
              zIndex: 20,
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.48rem",
              letterSpacing: "0.2em",
              color: "rgba(181,147,74,0.3)",
              pointerEvents: "none",
            }}
          >
            {String(Math.min(TOTAL, Math.floor((scrollPct / 100) * TOTAL) + 1)).padStart(2, "0")}
            &nbsp;/&nbsp;
            {String(TOTAL).padStart(2, "0")}
          </p>

          {/* ── Scroll progress bar ── */}
          <div
            aria-hidden
            style={{
              position: "absolute", bottom: 0, left: 0,
              height: 1, zIndex: 20, pointerEvents: "none",
              width: `${scrollPct}%`,
              background: "#B5934A",
              opacity: 0.5,
              transition: "width 0.05s linear",
            }}
          />

        </div>
      </div>
    </>
  );
}

/* ─── Animated chevron ─── */
function Chevron() {
  return (
    <motion.svg
      width="14" height="9" viewBox="0 0 14 9" fill="none"
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M1 1L7 7.5L13 1" stroke="#B5934A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

/* ─── Film grain ─── */
function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
