/** High-resolution wordmark as a PNG with a transparent background and a 3px white outline, so it stays readable on the navy bar and footer without a solid white chip. */
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
      width={657}
      height={173}
      alt={alt}
      decoding="sync"
      className={`block w-auto max-w-none ${className}`}
    />
  );
}
