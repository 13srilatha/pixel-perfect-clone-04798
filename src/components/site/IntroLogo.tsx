import { useEffect, useState } from "react";
import logoUrl from "@/assets/terra-logo-transparent.png";

/**
 * Netflix-style intro: the logo zooms toward the viewer once per browser
 * session, then unmounts. Subsequent visits in the same tab skip the intro.
 */
export function IntroLogo() {
  const [shown, setShown] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("ts_intro_played");
  });
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (!shown) return;
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("out"), 1700);
    const t2 = setTimeout(() => {
      sessionStorage.setItem("ts_intro_played", "1");
      setShown(false);
      document.body.style.overflow = "";
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [shown]);

  if (!shown) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
      style={{ opacity: phase === "out" ? 0 : 1, transition: "opacity 700ms ease" }}
    >
      <img
        src={logoUrl}
        alt=""
        className="block w-[55vw] max-w-[640px] object-contain"
        style={{
          animation: "tsIntroZoom 1.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          transformOrigin: "center center",
        }}
      />
      <style>{`
        @keyframes tsIntroZoom {
          0%   { transform: scale(0.35); opacity: 0; filter: blur(8px); }
          35%  { opacity: 1; filter: blur(0); }
          100% { transform: scale(2.4); opacity: 1; filter: blur(0); }
        }
      `}</style>
    </div>
  );
}
