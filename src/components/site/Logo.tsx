export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3 select-none">
      <span
        aria-hidden
        className="relative flex h-10 w-10 items-center justify-center border border-espresso text-espresso md:h-11 md:w-11"
      >
        <span className="font-display text-[15px] font-light tracking-[0.15em] leading-none">TS</span>
        <span className="absolute -right-px -bottom-px h-1.5 w-1.5 bg-caramel" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-[15px] font-light tracking-[0.32em] text-espresso uppercase">Terra</span>
          <span className="label text-[10px] tracking-[0.4em] text-caramel">Space Studio</span>
        </span>
      )}
    </span>
  );
}
