/** Responsive facility photos hosted in this repo. Sources are public files from
 * hospitaljoya.com and drjoyaofficial.com, copied with the owner’s authorization.
 * srcset widths are the real pixel widths after resize (no upscaling).
 */

const VARIANTS: Record<string, readonly [number, number][]> = {
  marina: [[640, 640], [960, 960], [1280, 1280]],
  riviera: [[640, 640], [960, 800]],
  guadalajara: [[640, 640], [960, 800]],
  sma: [[640, 480]],
  queretaro: [[640, 640], [960, 800]],
  cancun: [[640, 640], [960, 960]],
  playa: [[640, 640], [960, 960]],
  chapala: [[640, 640], [960, 742]],
  penita: [[640, 640], [960, 960], [1280, 1280]],
  "operating-room": [[640, 640], [960, 960], [1280, 1280]],
  "patient-room": [[640, 640], [960, 960], [1280, 1278]],
  "bariatric-or": [[640, 640], [960, 960], [1280, 1280]],
  "bariatric-room": [[640, 640], [960, 800]],
};

const INTRINSIC: Record<string, [number, number]> = {
  marina: [2560, 1438],
  riviera: [800, 600],
  guadalajara: [800, 600],
  sma: [480, 320],
  queretaro: [800, 600],
  cancun: [960, 750],
  playa: [960, 750],
  chapala: [742, 530],
  penita: [2560, 1920],
  "operating-room": [1600, 1800],
  "patient-room": [1278, 723],
  "bariatric-or": [1613, 1080],
  "bariatric-room": [800, 536],
};

function srcSet(name: string, ext: "avif" | "webp"): string {
  const rows = VARIANTS[name] ?? [];
  const seen = new Set<number>();
  return rows
    .filter(([, width]) => {
      if (seen.has(width)) return false;
      seen.add(width);
      return true;
    })
    .map(([slot, width]) => `/assets/photos/${name}-${slot}.${ext} ${width}w`)
    .join(", ");
}

export function FacilityPhoto({
  name,
  alt,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 36rem, 100vw",
}: {
  name: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const box = INTRINSIC[name] ?? [4, 3];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, "webp")} sizes={sizes} />
      <img
        src={`/assets/photos/${name}-960.webp`}
        alt={alt}
        width={box[0]}
        height={box[1]}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}
