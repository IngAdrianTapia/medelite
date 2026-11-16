/** Responsive facility photos hosted in this repo. Sources are public files from
 * hospitaljoya.com and drjoyaofficial.com, copied with the owner’s authorization.
 * srcset widths are the real pixel widths after resize (no upscaling).
 */

const VARIANTS: Record<string, readonly [number, number][]> = {
  marina: [[640, 640], [960, 960], [1280, 1280]],
  riviera: [[640, 640], [837, 837]],
  guadalajara: [[640, 640], [960, 960], [1280, 1280]],
  sma: [[640, 640], [960, 960], [1280, 1280]],
  queretaro: [[640, 640], [922, 922]],
  cancun: [[640, 640], [960, 960]],
  playa: [[640, 640], [960, 960], [1280, 1280]],
  chapala: [[640, 640], [742, 742]],
  penita: [[640, 640], [960, 960], [1280, 1280]],
  "operating-room": [[640, 640], [960, 960], [1280, 1280]],
  "patient-room": [[640, 640], [960, 960], [1280, 1280]],
  "bariatric-or": [[640, 640], [960, 960], [1024, 1024]],
  "bariatric-room": [[640, 640], [800, 800]],
  "cancun-ct": [[640, 640], [960, 960], [1280, 1280]],
  "cancun-lobby": [[640, 640], [779, 779]],
  "marina-diagnostics": [[480, 480]],
};

/** Largest real pixel size in this repo. Ratios match the files; nothing is upscaled in the markup. */
const INTRINSIC: Record<string, [number, number]> = {
  marina: [1280, 719],
  riviera: [837, 853],
  guadalajara: [1280, 1485],
  sma: [1280, 1380],
  queretaro: [922, 962],
  cancun: [960, 1215],
  playa: [1280, 777],
  chapala: [742, 530],
  penita: [1280, 960],
  "operating-room": [1280, 857],
  "patient-room": [1280, 897],
  "bariatric-or": [1024, 683],
  "bariatric-room": [800, 536],
  "cancun-ct": [1280, 898],
  "cancun-lobby": [779, 520],
  "marina-diagnostics": [480, 320],
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
  fill = false,
  className = "",
  sizes = "(min-width: 1024px) 36rem, 100vw",
  fetchPriority,
  /** Full-bleed frames cap their CSS width at half the bitmap so a 2x screen does not upscale. */
  protect = false,
}: {
  name: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
  protect?: boolean;
}) {
  const box = INTRINSIC[name] ?? [4, 3];
  const rows = VARIANTS[name] ?? [];
  const fallbackSlot = rows[rows.length - 1]?.[0] ?? 640;
  const crispCss = Math.max(1, Math.floor(box[0] / 2));
  const capped = protect && box[0] < 3840;
  return (
    <picture className={fill ? "absolute inset-0 flex items-center justify-center" : "block"}>
      <source type="image/avif" srcSet={srcSet(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, "webp")} sizes={sizes} />
      <img
        src={`/assets/photos/${name}-${fallbackSlot}.webp`}
        alt={alt}
        width={box[0]}
        height={box[1]}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
        style={capped ? { maxWidth: `min(100%, ${crispCss}px)`, maxHeight: "100%" } : undefined}
        className={
          fill
            ? capped
              ? `h-auto max-h-full w-auto max-w-full object-contain ${className}`
              : `h-full w-full object-cover ${className}`
            : className
        }
      />
    </picture>
  );
}
