/** High-resolution wordmark already in the repo (643×160). Shown on a solid white chip so the cyan word and navy subtitle stay readable on photos and on the dark bar. */
export function BrandMark({
  className = "h-14 md:h-16",
  alt = "MedElite International Health",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <span className="inline-flex items-center rounded-2xl bg-white px-2.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.28)] ring-1 ring-black/10">
      <img
        src="/assets/brand/medelite-logo-horizontal.png"
        width={643}
        height={160}
        alt={alt}
        decoding="sync"
        className={`block w-auto max-w-none ${className}`}
      />
    </span>
  );
}
