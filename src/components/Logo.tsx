type Props = { className?: string };

export function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {/* Architectural mark: a horizon line with two stacked volumes */}
      <rect x="9" y="9" width="30" height="30" />
      <path d="M9 24 L24 9 L39 24" />
      <path d="M16 39 L16 28 L32 28 L32 39" />
      <circle cx="24" cy="34" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <Logo className="h-7 w-7 text-foreground" />
      <div className="leading-tight">
        <div className="font-serif text-[15px] tracking-[0.18em] uppercase text-foreground">
          Terra Space
        </div>
        <div className="text-[10px] tracking-[0.42em] uppercase text-muted-foreground -mt-0.5">
          Studio
        </div>
      </div>
    </div>
  );
}
