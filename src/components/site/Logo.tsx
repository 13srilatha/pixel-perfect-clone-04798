import logoSrc from "@/assets/terra-logo.jpeg";

export function Logo({ compact = false, invert = false }: { compact?: boolean; invert?: boolean }) {
  return (
    <span className="flex items-center gap-3 select-none" aria-label="Terra Space Studio">
      <img
        src={logoSrc}
        alt="Terra Space Studio"
        className={`h-9 w-auto md:h-11 ${invert ? "invert brightness-200" : ""} ${compact ? "h-8 md:h-9" : ""}`}
        style={{ mixBlendMode: invert ? "screen" : "multiply" }}
      />
    </span>
  );
}
