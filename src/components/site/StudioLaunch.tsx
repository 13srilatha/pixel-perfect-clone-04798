import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { studio } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const STUDIO_VIDEO_URL = "/videos/studio-launch.mp4";

export function StudioLaunch() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const orbRef = useRef<HTMLAnchorElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      gsap.set(headlineRef.current, { y: 70, autoAlpha: 0, rotate: -2 });
      gsap.set(orbRef.current, { scale: 0.42, y: 90, borderRadius: "50%" });
      gsap.set(stripRef.current, { xPercent: -12 });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        end: "bottom 28%",
        onEnter: () => video.play().catch(() => {}),
        onEnterBack: () => video.play().catch(() => {}),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center center",
          scrub: 0.8,
        },
      });

      tl.to(headlineRef.current, { y: 0, autoAlpha: 1, rotate: 0, ease: "power2.out" }, 0);
      tl.to(orbRef.current, { scale: 1, y: 0, borderRadius: "18px", ease: "power2.out" }, 0.05);
      tl.to(stripRef.current, { xPercent: 0, ease: "none" }, 0);

      return () => trigger.kill();
    }, section);

    return () => {
      window.__lenis?.off("scroll", sync);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio-launch"
      aria-label="Terra Space Studio launch on Instagram"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#C4955A",
        padding: "7rem 1.5rem",
      }}
    >
      <div
        ref={stripRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "1.3rem",
          left: 0,
          width: "max-content",
          whiteSpace: "nowrap",
          fontFamily: "'DM Sans','Inter',sans-serif",
          fontSize: "clamp(4rem, 12vw, 12rem)",
          fontWeight: 900,
          lineHeight: 0.78,
          letterSpacing: 0,
          textTransform: "uppercase",
          color: "rgba(26,26,20,0.13)",
        }}
      >
        TERRA LAUNCH · STUDIO FILM · INSTAGRAM · TERRA LAUNCH · STUDIO FILM · INSTAGRAM ·
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1400, margin: "0 auto" }}>
        <div
          ref={headlineRef}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "1.4rem",
            marginBottom: "2.5rem",
            willChange: "opacity, transform",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#1A1A14",
            }}
          >
            Studio Launch
          </p>
          <h2
            style={{
              margin: 0,
              maxWidth: 980,
              fontFamily: "'Cormorant Garamond','Cormorant',serif",
              fontWeight: 300,
              fontSize: "clamp(3.2rem, 8vw, 8rem)",
              lineHeight: 0.9,
              color: "#1A1A14",
            }}
          >
            A glimpse clients will want to open.
          </h2>
        </div>

        <a
          ref={orbRef}
          href={studio.reelUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Watch Terra Space Studio launch reel on Instagram"
          style={{
            position: "relative",
            display: "block",
            width: "min(100%, 1120px)",
            aspectRatio: "16 / 9",
            margin: "0 auto",
            overflow: "hidden",
            background: "#1A1A14",
            boxShadow: "0 38px 90px rgba(26,26,20,0.34)",
            transformOrigin: "center center",
            willChange: "border-radius, transform",
          }}
        >
          <video
            ref={videoRef}
            src={STUDIO_VIDEO_URL}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at center, transparent 0 38%, rgba(26,26,20,0.34) 72%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                width: "clamp(92px, 14vw, 154px)",
                height: "clamp(92px, 14vw, 154px)",
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                border: "1px solid rgba(250,248,244,0.55)",
                background: "rgba(26,26,20,0.42)",
                color: "#FAF8F4",
                backdropFilter: "blur(10px)",
                fontFamily: "'DM Sans','Inter',sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Watch Reel
            </span>
          </div>
          <span
            style={{
              position: "absolute",
              left: "1rem",
              bottom: "1rem",
              padding: "0.7rem 0.85rem",
              background: "rgba(250,248,244,0.92)",
              color: "#1A1A14",
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.64rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            @{studio.instagram}
          </span>
        </a>
      </div>
    </section>
  );
}