import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { studio } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_URL = "/__l5e/assets-v1/0d750651-aed7-4dec-bfd0-9d3bd9f0ca3b/hero-walk-clean.mp4";

export function StudioLaunch() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      gsap.set(revealRef.current, { y: 150, scale: 0.74, clipPath: "inset(34% 30% round 999px)" });
      gsap.set(copyRef.current, { autoAlpha: 0, y: 34 });
      gsap.set(veilRef.current, { opacity: 0.62 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 42%",
          scrub: 1,
          onEnter: () => videoRef.current?.play().catch(() => {}),
          onEnterBack: () => videoRef.current?.play().catch(() => {}),
          onLeave: () => videoRef.current?.pause(),
          onLeaveBack: () => videoRef.current?.pause(),
        },
      });

      tl.to(revealRef.current, { y: 0, scale: 1, clipPath: "inset(0% 0% round 18px)", duration: 0.7, ease: "power3.out" }, 0);
      tl.to(veilRef.current, { opacity: 0.18, duration: 0.45, ease: "none" }, 0.12);
      tl.to(copyRef.current, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }, 0.24);
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
      aria-label="Studio launch reel"
      style={{ position: "relative", overflow: "hidden", background: "#FAF8F4", padding: "5rem 1.5rem 8rem" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", minHeight: "92svh", display: "grid", alignItems: "center" }}>
        <a
          ref={revealRef}
          href={studio.reelUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Watch Terra Space Studio reel on Instagram"
          style={{ position: "relative", display: "block", minHeight: "min(78vh, 760px)", overflow: "hidden", background: "#1A1A14", color: "#FAF8F4", textDecoration: "none", boxShadow: "0 52px 120px rgba(26,26,20,0.24)", willChange: "transform, clip-path" }}
        >
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div ref={veilRef} aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(26,26,20,0.86) 0%, rgba(26,26,20,0.34) 48%, rgba(26,26,20,0.72) 100%)" }} />
          <div ref={copyRef} style={{ position: "absolute", left: "clamp(1.4rem, 6vw, 5rem)", bottom: "clamp(1.4rem, 7vw, 5.5rem)", width: "min(41rem, calc(100% - 2.8rem))" }}>
            <p style={{ margin: "0 0 1rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.68rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C4955A" }}>
              Studio Launch
            </p>
            <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond','Cormorant',serif", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.88, color: "#FAF8F4" }}>
              Kept quiet. <br />
              <em style={{ color: "#C4955A", fontStyle: "italic" }}>Revealed slowly.</em>
            </h2>
            <p style={{ margin: "1.2rem 0 0", maxWidth: "31rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "rgba(250,248,244,0.74)" }}>
              A glimpse from our studio world — enough to stay curious, then one tap to watch the full update on Instagram.
            </p>
            <span style={{ display: "inline-flex", marginTop: "1.5rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C4955A", borderBottom: "1px solid rgba(196,149,90,0.5)", paddingBottom: "0.28rem" }}>
              Watch full reel →
            </span>
          </div>
          <span style={{ position: "absolute", right: "1.4rem", top: "1.2rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,248,244,0.66)" }}>
            {studio.instagram}
          </span>
        </a>
      </div>
    </section>
  );
}