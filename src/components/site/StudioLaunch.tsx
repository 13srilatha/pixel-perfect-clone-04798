// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { studio } from "@/data/projects";

// gsap.registerPlugin(ScrollTrigger);

// const HERO_VIDEO_URL = "/__l5e/assets-v1/0d750651-aed7-4dec-bfd0-9d3bd9f0ca3b/hero-walk-clean.mp4";

// export function StudioLaunch() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const revealRef = useRef<HTMLAnchorElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const copyRef = useRef<HTMLDivElement>(null);
//   const veilRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const sync = () => ScrollTrigger.update();
//     window.__lenis?.on("scroll", sync);

//     const ctx = gsap.context(() => {
//       gsap.set(revealRef.current, { y: 150, scale: 0.74, clipPath: "inset(34% 30% round 999px)" });
//       gsap.set(copyRef.current, { autoAlpha: 0, y: 34 });
//       gsap.set(veilRef.current, { opacity: 0.62 });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top 78%",
//           end: "bottom 42%",
//           scrub: 1,
//           onEnter: () => videoRef.current?.play().catch(() => {}),
//           onEnterBack: () => videoRef.current?.play().catch(() => {}),
//           onLeave: () => videoRef.current?.pause(),
//           onLeaveBack: () => videoRef.current?.pause(),
//         },
//       });

//       tl.to(revealRef.current, { y: 0, scale: 1, clipPath: "inset(0% 0% round 18px)", duration: 0.7, ease: "power3.out" }, 0);
//       tl.to(veilRef.current, { opacity: 0.18, duration: 0.45, ease: "none" }, 0.12);
//       tl.to(copyRef.current, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }, 0.24);
//     }, section);

//     return () => {
//       window.__lenis?.off("scroll", sync);
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="studio-launch"
//       aria-label="Studio launch reel"
//       style={{ position: "relative", overflow: "hidden", background: "#FAF8F4", padding: "5rem 1.5rem 8rem" }}
//     >
//       <div style={{ maxWidth: 1400, margin: "0 auto", minHeight: "92svh", display: "grid", alignItems: "center" }}>
//         <a
//           ref={revealRef}
//           href={studio.reelUrl}
//           target="_blank"
//           rel="noreferrer"
//           aria-label="Watch Terra Space Studio reel on Instagram"
//           style={{ position: "relative", display: "block", minHeight: "min(78vh, 760px)", overflow: "hidden", background: "#1A1A14", color: "#FAF8F4", textDecoration: "none", boxShadow: "0 52px 120px rgba(26,26,20,0.24)", willChange: "transform, clip-path" }}
//         >
//           <video
//             ref={videoRef}
//             src={HERO_VIDEO_URL}
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//           />
//           <div ref={veilRef} aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(26,26,20,0.86) 0%, rgba(26,26,20,0.34) 48%, rgba(26,26,20,0.72) 100%)" }} />
//           <div ref={copyRef} style={{ position: "absolute", left: "clamp(1.4rem, 6vw, 5rem)", bottom: "clamp(1.4rem, 7vw, 5.5rem)", width: "min(41rem, calc(100% - 2.8rem))" }}>
//             <p style={{ margin: "0 0 1rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.68rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C4955A" }}>
//               Behind the studio door
//             </p>
//             <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond','Cormorant',serif", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.88, color: "#FAF8F4" }}>
//               You weren't <br />
//               <em style={{ color: "#C4955A", fontStyle: "italic" }}>supposed to see this.</em>
//             </h2>
//             <p style={{ margin: "1.2rem 0 0", maxWidth: "31rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "rgba(250,248,244,0.74)" }}>
//               A frame from a home we're finishing right now — most of it stays in the studio. The rest lives on Instagram, for the people who care to look.
//             </p>
//             <span style={{ display: "inline-flex", marginTop: "1.5rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C4955A", borderBottom: "1px solid rgba(196,149,90,0.5)", paddingBottom: "0.28rem" }}>
//               See it on Instagram →
//             </span>
//           </div>
//           <span style={{ position: "absolute", right: "1.4rem", top: "1.2rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,248,244,0.66)" }}>
//             {studio.instagram}
//           </span>
//         </a>
//       </div>
//     </section>
//   );
// }


/**
 * StudioLaunch — NOT a section. A moment.
 * Hidden completely until scroll reaches it. Video orb starts tiny (circle),
 * expands to full-width rectangle on scroll. Headline rises from below.
 * Gold background. No padding showing until reveal is complete.
 * Clicking anywhere opens the Instagram reel.
 *
 * The studio-launch.mp4 is already in public/videos/studio-launch.mp4 per your zip.
 */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { studio } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/videos/studio-launch.mp4";

export function StudioLaunch() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const orbRef      = useRef<HTMLAnchorElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stripRef    = useRef<HTMLDivElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    const sync = () => ScrollTrigger.update();
    window.__lenis?.on("scroll", sync);

    const ctx = gsap.context(() => {
      // Initial states — everything hidden
      gsap.set(wrapRef.current,     { autoAlpha: 0 });
      gsap.set(headlineRef.current, { y: 80, autoAlpha: 0, rotate: -1.5 });
      gsap.set(orbRef.current,      { scale: 0.08, borderRadius: "50%", autoAlpha: 1 });
      gsap.set(stripRef.current,    { xPercent: -15, autoAlpha: 0 });

      // Play/pause video with viewport
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter:     () => video.play().catch(() => {}),
        onEnterBack: () => video.play().catch(() => {}),
        onLeave:     () => video.pause(),
        onLeaveBack: () => video.pause(),
      });

      // Scrub reveal: section enters viewport → everything animates in
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",   // starts animating as soon as section enters from bottom
          end:   "center center", // fully revealed by the time centre is centred
          scrub: 0.9,
        },
      });

      tl.to(wrapRef.current,     { autoAlpha: 1, duration: 0.05 }, 0);
      tl.to(stripRef.current,    { xPercent: 0, autoAlpha: 1, duration: 0.6, ease: "none" }, 0);
      tl.to(headlineRef.current, { y: 0, autoAlpha: 1, rotate: 0, duration: 0.55, ease: "power2.out" }, 0.08);
      tl.to(orbRef.current,      { scale: 1, borderRadius: "18px", duration: 0.6, ease: "power2.out" }, 0.1);
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
      aria-label="Terra Space Studio launch reel"
      style={{ position: "relative", overflow: "hidden", background: "#C4955A", padding: "7rem 1.5rem" }}
    >
      {/* Scrolling text strip (decorative, hidden behind content) */}
      <div ref={stripRef} aria-hidden style={{
        position: "absolute", top: "1.2rem", left: 0,
        width: "max-content", whiteSpace: "nowrap",
        fontFamily: "'DM Sans','Inter',sans-serif",
        fontSize: "clamp(4rem, 12vw, 12rem)",
        fontWeight: 900, lineHeight: 0.78, letterSpacing: 0,
        textTransform: "uppercase",
        color: "rgba(26,26,20,0.1)",
        willChange: "transform, opacity",
      }}>
        STUDIO FILM · INSTAGRAM · TERRA LAUNCH · STUDIO FILM · INSTAGRAM · TERRA LAUNCH ·
      </div>

      <div ref={wrapRef} style={{ position: "relative", zIndex: 2, maxWidth: 1400, margin: "0 auto" }}>
        {/* Headline */}
        <div ref={headlineRef} style={{ marginBottom: "2.5rem", willChange: "opacity, transform" }}>
          <p style={{ margin: "0 0 0.8rem", fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.68rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#1A1A14" }}>
            Studio Launch
          </p>
          <h2 style={{ margin: 0, maxWidth: 900, fontFamily: "'Cormorant Garamond','Cormorant',serif", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.9, color: "#1A1A14" }}>
            A glimpse clients will want to open.
          </h2>
        </div>

        {/* Video orb → rectangle */}
        <a
          ref={orbRef}
          href={studio.reelUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Watch Terra Space Studio launch reel on Instagram"
          style={{
            position: "relative", display: "block",
            width: "min(100%, 1120px)", aspectRatio: "16 / 9",
            margin: "0 auto", overflow: "hidden",
            background: "#1A1A14",
            boxShadow: "0 40px 90px rgba(26,26,20,0.34)",
            transformOrigin: "center center",
            willChange: "border-radius, transform",
          }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted loop playsInline preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Radial vignette */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at center, transparent 0 36%, rgba(26,26,20,0.32) 72%)",
          }} />

          {/* Watch Reel circle */}
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
            <span style={{
              width: "clamp(88px, 13vw, 148px)", height: "clamp(88px, 13vw, 148px)",
              display: "grid", placeItems: "center",
              borderRadius: "50%", border: "1px solid rgba(250,248,244,0.5)",
              background: "rgba(26,26,20,0.44)",
              color: "#FAF8F4", backdropFilter: "blur(10px)",
              fontFamily: "'DM Sans','Inter',sans-serif",
              fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center",
            }}>
              Watch<br />Reel
            </span>
          </div>

          {/* Instagram handle badge */}
          <span style={{
            position: "absolute", left: "1rem", bottom: "1rem",
            padding: "0.65rem 0.85rem",
            background: "rgba(250,248,244,0.92)", color: "#1A1A14",
            fontFamily: "'DM Sans','Inter',sans-serif",
            fontSize: "0.63rem", letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            @{studio.instagram}
          </span>
        </a>
      </div>
    </section>
  );
}
