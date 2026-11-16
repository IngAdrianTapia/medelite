import { useState } from "react";
import { FacilityPhoto } from "./FacilityPhoto";
import { Lightbox } from "./Lightbox";
import { GALLERY_ITEMS, type PhotoCategory } from "../data/photoCredits";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";

const ORDER: PhotoCategory[] = ["fachadas", "instalaciones", "quirofanos", "habitaciones", "urgencias"];

const COPY = {
  es: {
    fachadas: "Fachadas",
    instalaciones: "Instalaciones",
    quirofanos: "Quirófanos",
    habitaciones: "Habitaciones",
    urgencias: "Urgencias",
    all: "Todas",
    empty: "No hay fotos en esta categoría.",
  },
  en: {
    fachadas: "Exteriors",
    instalaciones: "Facilities",
    quirofanos: "Operating rooms",
    habitaciones: "Rooms",
    urgencias: "Emergency",
    all: "All",
    empty: "No photographs in this category.",
  },
  fr: {
    fachadas: "Façades",
    instalaciones: "Installations",
    quirofanos: "Salles d’opération",
    habitaciones: "Chambres",
    urgencias: "Urgences",
    all: "Toutes",
    empty: "Aucune photo dans cette catégorie.",
  },
} as const;

export function PhotoCatalog({ mode }: { mode: "tabs" | "sections" }) {
  const { lang } = useI18n();
  const t = COPY[lang];
  const [active, setActive] = useState<PhotoCategory | "all">("all");
  const [open, setOpen] = useState<{ ids: string[]; index: number } | null>(null);
  const enlarge = { es: "Ampliar foto", en: "Enlarge photo", fr: "Agrandir la photo" }[lang];
  const cats = mode === "tabs" ? (["all", ...ORDER] as const) : ORDER;

  const blocks = cats.map((category) => {
    const items = GALLERY_ITEMS.filter((item) => category === "all" || item.category === category);
    if (mode === "tabs" && category !== active) return null;
    return (
      <section key={category} id={category === "all" ? undefined : category} className="mt-10">
        {mode === "sections" ? <h2 className="font-serif text-2xl text-ink">{t[category]}</h2> : null}
        {items.length === 0 ? <p className="mt-4 text-sm text-muted">{t.empty}</p> : null}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={`${category}-${item.id}`}>
              <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-glass">
                <button
                  type="button"
                  className="group relative block h-56 w-full cursor-zoom-in bg-soft sm:h-64"
                  aria-label={`${enlarge}: ${PHOTO_OF[item.id]?.[lang] ?? ""}`}
                  onClick={() => setOpen({ ids: items.map((row) => row.id), index })}
                >
                  <FacilityPhoto
                    name={item.id}
                    fill
                    alt=""
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span aria-hidden="true" className="absolute right-3 bottom-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-navy shadow"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg></span>
                </button>
                <figcaption className="px-4 py-3 text-sm leading-relaxed text-ink">{PHOTO_OF[item.id]?.[lang]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    );
  });

  return (
    <div>
      {open ? <Lightbox ids={open.ids} index={open.index} onClose={() => setOpen(null)} onIndex={(next) => setOpen({ ...open, index: next })} /> : null}
      {mode === "tabs" ? (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.all}>
          {cats.map((category) => {
            const selected = category === active;
            const label = category === "all" ? t.all : t[category];
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-semibold ${selected ? "bg-navy text-white" : "border border-line bg-white text-navy"}`}
                onClick={() => setActive(category)}
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null}
      {blocks}
    </div>
  );
}
