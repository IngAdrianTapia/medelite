/** Official MedElite logo: SVG (text traced from the official 2000 px file, emblem from the same file) with a PNG fallback. */
export function BrandMark({
  className = "h-14 md:h-16",
  alt = "MedElite International Health",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <picture>
      <source srcSet="/assets/brand/medelite-logo-horizontal.svg" type="image/svg+xml" />
      <img
        src="/assets/brand/medelite-logo-horizontal.png"
        width={645}
        height={162}
        alt={alt}
        decoding="sync"
        className={`block w-auto max-w-none ${className}`}
      />
    </picture>
  );
}
