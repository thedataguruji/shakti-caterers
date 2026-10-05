import clsx from "clsx";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Puffy chef's hat top: three overlapping lobes */}
      <path d="M62 95 a28 28 0 1 1 10-54 a34 34 0 0 1 56 0 a28 28 0 1 1 10 54" />
      {/* Decorative inner swirl accent */}
      <path d="M104 44 q20 -2 22 24" />
      {/* Pleated band */}
      <path d="M62 95 l5 48 M83 95 l1 50 M104 95 l1 50 M125 95 l5 48" />
      {/* Band base curve */}
      <path d="M58 142 q46 14 92 0" />
    </svg>
  );
}

export function Logo({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <LogoMark className="h-9 w-9 text-brand-700" />
      <div className="leading-tight">
        <span className="block font-script text-2xl leading-none text-brand-700">
          Shakti Caterers
        </span>
        {showTagline && (
          <span className="hidden text-[11px] tracking-wide text-stone-500 sm:block">
            Experience bliss in every bite
          </span>
        )}
      </div>
    </div>
  );
}
