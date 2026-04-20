/**
 * Inline SVG mark + wordmark — sits naturally in the nav, no image artefacts.
 * Uses currentColor so it inherits the text color from the parent.
 */
export function Logo({ compact = false }: { compact?: boolean; invert?: boolean }) {
  const size = compact ? 28 : 34;
  return (
    <span className="flex items-center gap-3 select-none text-espresso" aria-label="Terra Space Studio">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* horizon line */}
        <path d="M2 28 L38 28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        {/* sun / arch */}
        <path
          d="M8 28 A12 12 0 0 1 32 28"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* terra mark — small triangle (mountain / roof) */}
        <path d="M14 28 L20 18 L26 28 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        {/* anchor dot */}
        <circle cx="20" cy="28" r="1.4" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-light tracking-[0.18em] text-espresso"
          style={{ fontSize: compact ? "0.95rem" : "1.05rem" }}
        >
          TERRA SPACE
        </span>
        <span
          className="label mt-1 text-caramel"
          style={{ fontSize: "0.55rem", letterSpacing: "0.4em" }}
        >
          STUDIO
        </span>
      </span>
    </span>
  );
}
