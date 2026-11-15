/** Wordmark PNG with a transparent background and a 1px white outline, drawn on the navy bar and footer without a solid white chip. */
export function BrandMark({
  className = "h-14 md:h-16",
  alt = "MedElite International Health",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/assets/brand/medelite-logo-horizontal.png"
      width={645}
      height={162}
      alt={alt}
      decoding="sync"
      className={`block w-auto max-w-none ${className}`}
    />
  );
}
