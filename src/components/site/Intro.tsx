import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoUrl from "@/assets/terra-logo-transparent.png";

/**
 * Netflix-style logo opener — plays ONCE per session.
 * Logo zooms toward the camera (scale + slight blur clear) over ~1.2s,
 * then fades the panel out to reveal the site.
 */
const SESSION_KEY = "terra:intro:v1";

export function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — just play */
    }
    setShow(true);
    // Lock scroll while the intro plays
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = prev;
    }, 1700);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          aria-hidden
          onClick={() => setShow(false)}
        >
          {/* subtle vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.18)_100%)]" />
          <motion.img
            src={logoUrl}
            alt=""
            initial={{ scale: 0.35, opacity: 0, filter: "blur(8px)" }}
            animate={{
              scale: [0.35, 1.0, 6.5],
              opacity: [0, 1, 0],
              filter: ["blur(8px)", "blur(0px)", "blur(2px)"],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.55, 1],
              ease: [0.7, 0, 0.84, 0],
            }}
            className="h-auto w-[min(60vw,420px)] select-none"
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
