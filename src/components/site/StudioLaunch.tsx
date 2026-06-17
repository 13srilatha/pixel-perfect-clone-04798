import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { studio } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function StudioLaunch() {
  const sectionRef = useRef<HTMLElement>(null);
  const capsuleRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      gsap.set(capsuleRef.current, { y: 130, scale: 0.62, rotate: -6, borderRadius: "42%" });
      gsap.set(copyRef.current, { autoAlpha: 0, y: 34 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.9,
          onEnter: () => videoRef.current?.play().catch(() => {}),
          onEnterBack: () => videoRef.current?.play().catch(() => {}),
          onLeave: () => videoRef.current?.pause(),
          onLeaveBack: () => videoRef.current?.pause(),
        },
      });

      tl.to(capsuleRef.current, { y: 0, scale: 1, rotate: 0, borderRadius: "1.4rem", duration: 0.62, ease: "power3.out" }, 0);
      tl.to(copyRef.current, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }, 0.22);
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
      style={{ position: "relative", overflow: "hidden", background: "#FAF8F4", padding: "4rem 1.5rem 8rem" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", minHeight: "92svh", display: "grid", gridTemplateColumns: "minmax(260px, 0.65fr) minmax(300px, 1fr)", gap: "clamp(2rem, 6vw, 7rem)", alignItems: "center" }}>
        <div ref={copyRef} style={{ position: "relative", zIndex: 2 }}>
          <p style={{ margin: "0 0 1rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.68rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C4955A" }}>
            Studio Launch
          </p>
          <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond','Cormorant',serif", fontWeight: 300, fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.9, color: "#1A1A14" }}>
            Kept quiet. <br />
            <em style={{ color: "#C4955A", fontStyle: "italic" }}>Revealed slowly.</em>
          </h2>
          <p style={{ margin: "1.2rem 0 0", maxWidth: "31rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "#4A4A42" }}>
            We keep the reel as a hidden moment on the page — enough to make people curious, then send them to Instagram to watch the full update.
          </p>
          <a href={studio.instagramUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginTop: "1.5rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#1A1A14", textDecoration: "none", borderBottom: "1px solid #C4955A", paddingBottom: "0.28rem" }}>
            Follow {studio.instagram} →
          </a>
        </div>

        <a
          ref={capsuleRef}
          href={studio.reelUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Watch Terra Space Studio launch reel on Instagram"
          style={{ position: "relative", zIndex: 1, display: "block", width: "min(100%, 760px)", aspectRatio: "16/10", overflow: "hidden", background: "#1A1A14", boxShadow: "0 50px 110px rgba(26,26,20,0.24)", willChange: "transform, border-radius" }}
        >
          <video
            ref={videoRef}
            src="/__l5e/assets-v1/d54fb526-aea1-4340-8dc2-324e44c5394c/studio-launch.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,26,20,0.02) 0%, rgba(26,26,20,0.52) 100%)" }} />
          <span style={{ position: "absolute", left: "1.2rem", bottom: "1.1rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#FAF8F4" }}>
            Watch full reel →
          </span>
        </a>
      </div>
    </section>
  );
}