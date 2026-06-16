import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_URL = "/__l5e/assets-v1/0d750651-aed7-4dec-bfd0-9d3bd9f0ca3b/hero-walk-clean.mp4";
const HERO_POSTER_URL = "/__l5e/assets-v1/7b454854-cb0a-4e0f-ba2e-d21b598025ec/terra-hero-poster.jpg";

const CHAPTERS = ["Land", "Plan", "Design", "Home"];

export function HeroWalk() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<HTMLDivElement[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const safeDuration = () => (Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 8);
    const setVideoTime = (progress: number) => {
      const nextTime = Math.min(safeDuration() - 0.05, Math.max(0.01, progress * safeDuration()));
      if (Math.abs(video.currentTime - nextTime) > 0.03) video.currentTime = nextTime;
    };

    const ctx = gsap.context(() => {
      gsap.set(chapterRefs.current, { autoAlpha: 0, y: 42, scale: 0.96 });
      gsap.set(frameRef.current, { clipPath: "inset(7% 8% round 6px)", scale: 0.94 });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=360%",
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          onUpdate: (self) => {
            setVideoTime(self.progress);
            gsap.set(progressRef.current, { scaleX: self.progress });
          },
        },
      });

      tl.to(frameRef.current, { clipPath: "inset(0% 0% round 0px)", scale: 1, ease: "none" }, 0);
      tl.to(introRef.current, { autoAlpha: 0, y: -48, scale: 0.96, ease: "power1.out" }, 0.1);
      chapterRefs.current.forEach((chapter, i) => {
        const at = 0.18 + i * 0.18;
        tl.to(chapter, { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out" }, at);
        tl.to(chapter, { autoAlpha: 0, y: -36, scale: 1.04, ease: "power2.in" }, at + 0.12);
      });
    }, section);

    const onLoaded = () => setVideoTime(0.01);
    video.addEventListener("loadedmetadata", onLoaded);

    return () => {
      window.__lenis?.off("scroll", sync);
      video.removeEventListener("loadedmetadata", onLoaded);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Scroll through a Terra Space home walkthrough"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#1A1A14",
      }}
    >
      <div ref={frameRef} style={{ position: "absolute", inset: 0, willChange: "clip-path, transform" }}>
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          poster={HERO_POSTER_URL}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{ height: "100%", width: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(26,26,20,0.62) 0%, rgba(26,26,20,0.18) 45%, rgba(26,26,20,0.72) 100%), radial-gradient(circle at 50% 50%, transparent 0%, rgba(26,26,20,0.5) 82%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={introRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1.5rem",
          textAlign: "center",
          willChange: "opacity, transform",
        }}
      >
        <p
          style={{
            margin: "0 0 1.6rem",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "#C4955A",
          }}
        >
          Terra Space Studio · Hyderabad
        </p>
        <h1
          style={{
            margin: 0,
            maxWidth: 980,
            fontFamily: "'Cormorant Garamond','Cormorant',serif",
            fontWeight: 300,
            fontSize: "clamp(3.4rem, 9vw, 8.5rem)",
            lineHeight: 0.92,
            color: "#FAF8F4",
          }}
        >
          We build where
          <br />
          <em style={{ color: "#C4955A", fontStyle: "italic" }}>love lives.</em>
        </h1>
        <p
          style={{
            margin: "1.5rem 0 0",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.86rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(250,248,244,0.8)",
          }}
        >
          Architecture · Interiors · Planning
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            marginTop: "2rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "#C4955A",
            color: "#1A1A14",
            padding: "1rem 1.7rem",
            textDecoration: "none",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.76rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Begin Your Space →
        </a>
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}>
        {CHAPTERS.map((chapter, i) => (
          <div
            key={chapter}
            ref={(el) => {
              if (el) chapterRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: i % 2 === 0 ? "7vw" : "auto",
              right: i % 2 === 0 ? "auto" : "7vw",
              top: i < 2 ? "22vh" : "58vh",
              maxWidth: 520,
              willChange: "opacity, transform",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans','Inter',sans-serif",
                fontSize: "0.66rem",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: "#C4955A",
                marginBottom: "0.6rem",
              }}
            >
              {String(i + 1).padStart(2, "0")} / 04
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond','Cormorant',serif",
                fontSize: "clamp(3rem, 7vw, 7rem)",
                lineHeight: 0.9,
                color: "#FAF8F4",
              }}
            >
              {chapter}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: "1.5rem",
          right: "1.5rem",
          bottom: "1.5rem",
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) auto",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ height: 1, background: "rgba(250,248,244,0.22)", overflow: "hidden" }}>
          <div ref={progressRef} style={{ height: "100%", width: "100%", background: "#C4955A" }} />
        </div>
        <span
          style={{
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(250,248,244,0.72)",
            whiteSpace: "nowrap",
          }}
        >
          Scroll the walkthrough
        </span>
      </div>
    </section>
  );
}