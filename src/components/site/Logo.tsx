import logoUrl from "@/assets/terra-logo-transparent.png";

/**
 * Terra Space Studio — official wordmark logo.
 * Larger by default; pass compact for the scrolled nav state.
 */
export function Logo({ compact = false }: { compact?: boolean; invert?: boolean }) {
  const height = compact ? 36 : 56;
  return (
    <span className="flex items-center select-none" aria-label="Terra Space Studio">
      <img
        src={logoUrl}
        alt="Terra Space Studio"
        height={height}
        style={{ height, width: "auto" }}
        className="block object-contain"
        draggable={false}
      />
    </span>
  );
}
