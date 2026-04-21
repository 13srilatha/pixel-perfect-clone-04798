/**
 * Terra Space Studio — inline SVG mark + wordmark.
 *
 * The mark is a quiet architectural sign:
 *   • a circle (the sun / "space" / horizon of an idea)
 *   • a flat ground line (the terra — the site, the earth)
 *   • a single pitched volume rising from the ground (the built form)
 *   • a vertical plumb mark (the architect's drawing axis)
 *
 * It reads as a tiny architectural elevation — quiet, drawn, scalable.
 * Uses currentColor so it inherits the parent text color.
 */
export function Logo({ compact = false }: { compact?: boolean; invert?: boolean }) {
  const size = compact ? 32 : 40;
  return (
    <span className="flex items-center gap-3 select-none text-espresso" aria-label="Terra Space Studio">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* outer circle — the "space" */}
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.55"
        />

        {/* sun / horizon — soft caramel disc inside the circle */}
        <circle cx="24" cy="20" r="6" fill="var(--gold-lt)" opacity="0.55" />

        {/* terra — ground line */}
        <line
          x1="6"
          y1="32"
          x2="42"
          y2="32"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* built volume — a small pitched house with a flat wing
            (reads as architecture, not a generic mountain) */}
        <path
          d="M14 32 L14 24 L24 17 L34 24 L34 32"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        {/* doorway */}
        <path
          d="M22 32 L22 27 L26 27 L26 32"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
          fill="none"
        />

        {/* plumb mark — drawing axis */}
        <line
          x1="24"
          y1="6"
          x2="24"
          y2="14"
          stroke="var(--caramel)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="24" cy="6" r="1.1" fill="var(--caramel)" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className="font-display font-light tracking-[0.22em] text-espresso"
          style={{ fontSize: compact ? "0.95rem" : "1.1rem" }}
        >
          TERRA SPACE
        </span>
        <span
          className="label mt-1.5 text-caramel"
          style={{ fontSize: "0.55rem", letterSpacing: "0.42em" }}
        >
          STUDIO · ARCHITECTS
        </span>
      </span>
    </span>
  );
}
