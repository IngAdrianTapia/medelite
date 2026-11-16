import { useEffect, useRef } from "react";
import { PHOTO_LARGEST } from "../data/photoCredits";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";

const UI = {
  es: { close: "Cerrar", prev: "Foto anterior", next: "Foto siguiente", of: "de", label: "Foto ampliada" },
  en: { close: "Close", prev: "Previous photo", next: "Next photo", of: "of", label: "Enlarged photo" },
  fr: { close: "Fermer", prev: "Photo précédente", next: "Photo suivante", of: "sur", label: "Photo agrandie" },
} as const;

export function Lightbox({ ids, index, onClose, onIndex }: { ids: readonly string[]; index: number; onClose: () => void; onIndex: (next: number) => void }) {
  const { lang } = useI18n();
  const t = UI[lang];
  const closeRef = useRef<HTMLButtonElement>(null);
  const id = ids[index] ?? ids[0] ?? "";
  const go = (step: number) => onIndex((index + step + ids.length) % ids.length);

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndex((index + 1) % ids.length);
      if (event.key === "ArrowLeft") onIndex((index - 1 + ids.length) % ids.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ids.length, index, onClose, onIndex]);

  const caption = PHOTO_OF[id]?.[lang] ?? "";
  return (
    <div role="dialog" aria-modal="true" aria-label={t.label} className="fixed inset-0 z-[60] flex flex-col bg-[#041018]/95 text-white" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-3 sm:px-6" onClick={(event) => event.stopPropagation()}>
        <p className="text-sm text-white/70">
          {index + 1} {t.of} {ids.length}
        </p>
        <button ref={closeRef} type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/30 px-4 text-sm font-semibold" onClick={onClose}>
          {t.close} ✕
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
        <img
          src={`/assets/photos/${PHOTO_LARGEST[id] ?? `${id}-640.webp`}`}
          alt={caption}
          className="max-h-full max-w-full rounded-2xl object-contain"
          onClick={(event) => event.stopPropagation()}
        />
        {ids.length > 1 ? (
          <>
            <button type="button" aria-label={t.prev} className="absolute top-1/2 left-2 inline-flex min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl backdrop-blur hover:bg-white/30 sm:left-4" onClick={(event) => { event.stopPropagation(); go(-1); }}>
              ‹
            </button>
            <button type="button" aria-label={t.next} className="absolute top-1/2 right-2 inline-flex min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl backdrop-blur hover:bg-white/30 sm:right-4" onClick={(event) => { event.stopPropagation(); go(1); }}>
              ›
            </button>
          </>
        ) : null}
      </div>
      <p className="mx-auto max-w-3xl px-6 py-4 text-center text-sm leading-relaxed text-white/85" onClick={(event) => event.stopPropagation()}>
        {caption}
      </p>
    </div>
  );
}
