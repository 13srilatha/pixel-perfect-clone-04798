import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_URL = "/__l5e/assets-v1/0d750651-aed7-4dec-bfd0-9d3bd9f0ca3b/hero-walk-clean.mp4";
const HERO_POSTER_URL = "/__l5e/assets-v1/7b454854-cb0a-4e0f-ba2e-d21b598025ec/terra-hero-poster.jpg";

const NOTES = [
  "Every project begins with the site, the light, and the way a family wants to live.",
  "The outside slowly gives way to proportion, material, and movement.",
  "Inside, the work becomes quieter — texture, warmth, and daily comfort.",
];

export function HeroWalk() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const noteRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const duration = () => (Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 8);
    const scrubVideo = (progress: number) => {
      const next = Math.min(duration() - 0.04, Math.max(0.01, progress * duration()));
      if (Math.abs(video.currentTime - next) > 0.025) video.currentTime = next;
    };

    const ctx = gsap.context(() => {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(noteRefs.current, { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrubVideo(self.progress);
            gsap.set(progressRef.current, { scaleX: self.progress });
          },
        },
      });

      tl.to(frameRef.current, { scale: 1.08, ease: "none", duration: 1 }, 0);
      tl.to(introRef.current, { y: -42, autoAlpha: 0.36, scale: 0.985, ease: "none", duration: 0.52 }, 0.08);
      noteRefs.current.forEach((note, index) => {
        const at = 0.22 + index * 0.2;
        tl.to(note, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, at);
        tl.to(note, { autoAlpha: 0, y: -16, duration: 0.12, ease: "power2.inOut" }, at + 0.14);
      });
    }, section);

    const onLoaded = () => {
      video.pause();
      scrubVideo(0.01);
      ScrollTrigger.refresh();
    };
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
      id="top"
      aria-label="Scroll through a Terra Space home walkthrough"
      style={{ position: "relative", height: "220svh", background: "#1A1A14" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
        <div ref={frameRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
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
              "linear-gradient(180deg, rgba(26,26,20,0.7) 0%, rgba(26,26,20,0.18) 46%, rgba(26,26,20,0.76) 100%)",
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

        <div
          style={{
            position: "absolute",
            left: "max(1.5rem, 7vw)",
            bottom: "18vh",
            zIndex: 4,
            width: "min(24rem, calc(100vw - 3rem))",
            pointerEvents: "none",
          }}
        >
          {NOTES.map((note, index) => (
            <p
              key={note}
              ref={(el) => {
                if (el) noteRefs.current[index] = el;
              }}
              style={{
                position: "absolute",
                inset: 0,
                margin: 0,
                fontFamily: "'DM Sans','Inter',sans-serif",
                fontSize: "clamp(0.95rem, 1.3vw, 1.18rem)",
                lineHeight: 1.7,
                color: "rgba(250,248,244,0.82)",
              }}
            >
              {note}
            </p>
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
            Scroll the home
          </span>
        </div>
      </div>
    </section>
  );
}