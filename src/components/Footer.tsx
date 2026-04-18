import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Logo";
import { Instagram, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative bg-ink text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-ivory">
              <Wordmark className="[&_*]:text-ivory" />
            </div>
            <p className="mt-8 max-w-md font-serif text-2xl leading-snug text-ivory/90">
              Architecture and interiors built with patience, stone, and light.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 border-b border-ivory/40 pb-1 text-[12px] tracking-[0.24em] uppercase text-ivory hover:border-ivory transition"
            >
              Begin a conversation →
            </Link>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-ivory/55">Navigate</div>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["Projects", "/projects"],
                ["Interiors", "/interiors"],
                ["Studio", "/studio"],
                ["Journal", "/journal"],
                ["Contact", "/contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link to={h} className="text-ivory/75 hover:text-ivory transition">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow text-ivory/55">Studio</div>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              <li>Hyderabad · Bengaluru · Visakhapatnam</li>
              <li>hello@terraspacestudio.in</li>
              <li>+91 00000 00000</li>
            </ul>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ivory/25 px-4 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-ivory hover:text-ink transition"
            >
              <Instagram size={14} /> Follow
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-xs text-ivory/55 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Terra Space Studio. All rights reserved.</div>
          <div>
            Designed, managed this website by Srilatha, contact{" "}
            <a className="underline hover:text-ivory" href="mailto:imsrilathaa@gmail.com">
              imsrilathaa@gmail.com
            </a>
          </div>
        </div>
      </div>

      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-ivory text-ink shadow-lg transition hover:bg-gold hover:scale-105"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </footer>
  );
}
