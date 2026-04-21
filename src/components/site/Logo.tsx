import logoUrl from "@/assets/terra-logo-trimmed.png";

/**
 * Terra Space Studio — official wordmark logo (client-supplied artwork).
 *
 * The mark is rendered as an image of the official logo (TERRA wordmark with
 * the architectural column motif and "SPACE STUDIO" beneath). This avoids
 * any custom SVG that doesn't match the brand. The image is trimmed of its
 * background so it sits naturally on the cream nav bar.
 */
export function Logo({ compact = false }: { compact?: boolean; invert?: boolean }) {
  const height = compact ? 28 : 40;
  return (
    <span
      className="flex items-center select-none"
      aria-label="Terra Space Studio"
    >
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
