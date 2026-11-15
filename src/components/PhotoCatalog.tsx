import { useState } from "react";
import { FacilityPhoto } from "./FacilityPhoto";
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
  const cats = mode === "tabs" ? (["all", ...ORDER] as const) : ORDER;

  const blocks = cats.map((category) => {
    const items = GALLERY_ITEMS.filter((item) => category === "all" || item.category === category);
    if (mode === "tabs" && category !== active) return null;
    return (
      <section key={category} id={category === "all" ? undefined : category} className="mt-10">
        {mode === "sections" ? <h2 className="font-serif text-4xl text-ink">{t[category]}</h2> : null}
        {items.length === 0 ? <p className="mt-4 text-sm text-muted">{t.empty}</p> : null}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={`${category}-${item.id}`}>
              <figure className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-glass">
                <div className="relative h-56 bg-navy sm:h-64">
                  <FacilityPhoto
                    name={item.id}
                    fill
                    alt={PHOTO_OF[item.id]?.[lang] ?? ""}
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
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
                className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ${selected ? "bg-navy text-white" : "border border-line bg-white text-navy"}`}
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
