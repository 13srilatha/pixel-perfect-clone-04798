/**
 * Studio Launch — full-bleed cinematic video, autoplays muted on loop when
 * scrolled into view. The mp4 itself is dropped into `public/videos/` on
 * GitHub by the studio (see HOW-TO-UPDATE.md). If the file is absent, the
 * section gracefully shows a poster + caption instead of breaking.
 */
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Nav";

export function StudioLaunch() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
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
    <section
      ref={sectionRef}
      id="studio-launch"
      className="relative bg-ink py-20 md:py-28"
      aria-label="Studio launch film"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="label mb-3 text-gold">Studio film</p>
            <h2 className="display text-[clamp(2rem,5vw,4rem)] text-cream">
              The <em className="italic text-gold-lt">launch</em>.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = !v.muted;
              setMuted(v.muted);
            }}
            className="label hidden border border-cream/40 px-4 py-2 text-cream transition-colors hover:bg-cream hover:text-espresso md:inline-flex"
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </Reveal>

        <div className="relative aspect-video w-full overflow-hidden bg-espresso">
          {hasVideo && (
            <video
              ref={videoRef}
              src="/videos/studio-launch.mp4"
              poster="/videos/studio-launch-poster.jpg"
              muted={muted}
              loop
              playsInline
              preload="metadata"
              onError={() => setHasVideo(false)}
              className="h-full w-full object-cover"
            />
          )}
          {!hasVideo && (
            <div className="flex h-full w-full items-center justify-center text-cream/50">
              <p className="label">Upload studio-launch.mp4 to /public/videos/ on GitHub</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
