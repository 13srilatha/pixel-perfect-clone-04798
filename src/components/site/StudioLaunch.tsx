// /**
//  * Studio Launch — full-bleed cinematic video, autoplays muted on loop when
//  * scrolled into view. The mp4 itself is dropped into `public/videos/` on
//  * GitHub by the studio (see HOW-TO-UPDATE.md). If the file is absent, the
//  * section gracefully shows a poster + caption instead of breaking.
//  */
// import { useEffect, useRef, useState } from "react";
// import { Reveal } from "./Nav";

// export function StudioLaunch() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [muted, setMuted] = useState(true);
//   const [hasVideo, setHasVideo] = useState(true);

//   useEffect(() => {
//     const v = videoRef.current;
//     const s = sectionRef.current;
//     if (!v || !s) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) v.play().catch(() => {});
//         else v.pause();
//       },
//       { threshold: 0.35 },
//     );
//     obs.observe(s);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="studio-launch"
//       className="relative bg-ink py-20 md:py-28"
//       aria-label="Studio launch film"
//     >
//       <div className="mx-auto max-w-[1600px] px-6 md:px-10">
//         <Reveal className="mb-8 flex items-end justify-between gap-6">
//           <div>
//             <p className="label mb-3 text-gold">Studio film</p>
//             <h2 className="display text-[clamp(2rem,5vw,4rem)] text-cream">
//               The <em className="italic text-gold-lt">launch</em>.
//             </h2>
//           </div>
//           <button
//             type="button"
//             onClick={() => {
//               const v = videoRef.current;
//               if (!v) return;
//               v.muted = !v.muted;
//               setMuted(v.muted);
//             }}
//             className="label hidden border border-cream/40 px-4 py-2 text-cream transition-colors hover:bg-cream hover:text-espresso md:inline-flex"
//           >
//             {muted ? "Unmute" : "Mute"}
//           </button>
//         </Reveal>

//         <div className="relative aspect-video w-full overflow-hidden bg-espresso">
//           {hasVideo && (
//             <video
//               ref={videoRef}
//               src="/videos/studio-launch.mp4"
//               poster="/videos/studio-launch-poster.jpg"
//               muted={muted}
//               loop
//               playsInline
//               preload="metadata"
//               onError={() => setHasVideo(false)}
//               className="h-full w-full object-cover"
//             />
//           )}
//           {!hasVideo && (
//             <div className="flex h-full w-full items-center justify-center text-cream/50">
//               <p className="label">Upload studio-launch.mp4 to /public/videos/ on GitHub</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Nav";

const INSTAGRAM_REEL = "https://www.instagram.com/reel/DXHC-RsgerM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";

export function StudioLaunch() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    const s = sectionRef.current;
    if (!v || !s) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    obs.observe(s);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="studio-launch" className="relative bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="mb-8">
          <p className="label mb-3 text-gold">Studio film</p>
          <h2 className="display text-[clamp(2rem,5vw,4rem)] text-cream">
            The <em className="italic text-gold-lt">launch</em>.
          </h2>
        </Reveal>

        
          href={INSTAGRAM_REEL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-video w-full overflow-hidden bg-espresso"
          aria-label="Watch the studio launch reel on Instagram"
        >
          {hasVideo && (
            <video
              ref={videoRef}
              src="/videos/studio-launch.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setHasVideo(false)}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          )}
          {!hasVideo && (
            <div className="flex h-full w-full items-center justify-center text-cream/50">
              <p className="label">Upload studio-launch.mp4 to /public/videos/ on GitHub</p>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/50">
            <span className="label flex items-center gap-3 border border-cream/0 bg-cream/0 px-6 py-3 text-cream opacity-0 transition-all duration-300 group-hover:border-cream/60 group-hover:bg-espresso/80 group-hover:opacity-100">
              Watch on Instagram
            </span>
          </div>

          <span className="label absolute bottom-4 right-4 flex items-center gap-2 bg-espresso/80 px-3 py-1.5 text-cream backdrop-blur-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Watch reel
          </span>
        </a>
      </div>
    </section>
  );
}
