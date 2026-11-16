import { useRef, useState, type KeyboardEvent } from "react";
import { useI18n } from "../i18n";
import { PHOTO_OF } from "../i18n/labels";
import { FacilityPhoto } from "./FacilityPhoto";

/** Real Hospital Joya photos. Captions state plainly when the step does not happen in that room. */
const SCENE: readonly { photo: string; cap: "destino" | "contexto" | "sede" | "despues" }[] = [
  { photo: "marina", cap: "destino" },
  { photo: "cancun-lobby", cap: "contexto" },
  { photo: "riviera", cap: "sede" },
  { photo: "marina-street", cap: "sede" },
  { photo: "operating-room", cap: "sede" },
  { photo: "patient-room", cap: "sede" },
  { photo: "bariatric-room", cap: "sede" },
  { photo: "chapala", cap: "despues" },
];

const UI = {
  es: {
    step: "Paso",
    of: "de",
    prev: "Anterior",
    next: "Siguiente",
    pick: "Pasos del recorrido",
    sede: "Foto de una sede Joya.",
    destino: "Sede Joya de destino. Este paso se hace antes del viaje.",
    contexto: "Recepción de una sede Joya. La videollamada es a distancia.",
    despues: "El seguimiento es en casa. La foto es de una sede Joya.",
  },
  en: {
    step: "Step",
    of: "of",
    prev: "Previous",
    next: "Next",
    pick: "Journey steps",
    sede: "Photo of a Joya hospital.",
    destino: "A Joya destination hospital. This step happens before travel.",
    contexto: "A Joya hospital lobby. The video call is remote.",
    despues: "Follow-up is at home. The photo is of a Joya hospital.",
  },
  fr: {
    step: "Étape",
    of: "sur",
    prev: "Précédente",
    next: "Suivante",
    pick: "Étapes du parcours",
    sede: "Photo d’un établissement Joya.",
    destino: "Établissement Joya de destination. Cette étape a lieu avant le voyage.",
    contexto: "Hall d’un établissement Joya. La vidéoconsultation se fait à distance.",
    despues: "Le suivi se fait à domicile. La photo est celle d’un établissement Joya.",
  },
} as const;

export function ProcesoPaciente() {
  const { m, lang } = useI18n();
  const t = UI[lang];
  const steps = m.journey.steps;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[active] ?? steps[0];
  if (!step) return null;
  const scene = SCENE[active] ?? SCENE[0];
  const n = (i: number) => String(i + 1).padStart(2, "0");

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
    const jump = event.key === "Home" ? 0 : event.key === "End" ? steps.length - 1 : null;
    if (!delta && jump === null) return;
    event.preventDefault();
    const next = jump ?? (active + delta + steps.length) % steps.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
        <div>
          <div role="tablist" aria-label={t.pick} className="border-t border-line">
            {steps.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.title}
                  ref={(el) => {
                    tabs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`paso-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="paso-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={onKey}
                  className={`flex min-h-14 w-full items-baseline gap-4 border-b border-line py-3 text-left transition-colors duration-300 ${selected ? "text-navy" : "text-muted hover:text-navy"}`}
                >
                  <span className={`w-8 shrink-0 font-semibold tabular-nums tracking-[0.12em] ${selected ? "text-teal" : ""}`}>{n(index)}</span>
                  <span className={`min-w-0 flex-1 text-[15px] leading-snug sm:text-base ${selected ? "font-serif text-xl text-navy" : ""}`}>{item.title}</span>
                  {selected ? <span className="hidden h-px w-8 shrink-0 self-center bg-teal sm:block" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div id="paso-panel" role="tabpanel" aria-labelledby={`paso-tab-${active}`}>
          {scene ? (
            <figure key={scene.photo} className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-soft shadow-premium animate-[fadeUp_.6s_cubic-bezier(.16,1,.3,1)]" data-gallery="proceso">
              <FacilityPhoto name={scene.photo} fill alt={PHOTO_OF[scene.photo]?.[lang] ?? step.title} sizes="(min-width: 1024px) 720px, 100vw" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-5 pt-16 pb-4 text-sm text-white">
                {t[scene.cap]}
              </figcaption>
            </figure>
          ) : null}

          <div className="mt-8 max-w-2xl">
            <p className="eyebrow tabular-nums">
              {t.step} {n(active)} {t.of} {n(steps.length - 1)}
            </p>
            <h3 key={step.title} className="mt-3 font-serif text-4xl leading-tight text-navy">{step.title}</h3>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">{step.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn-ghost" disabled={active === 0} onClick={() => setActive(active - 1)}>
                <span aria-hidden="true">←</span> {t.prev}
              </button>
              <button type="button" className="btn btn-primary" disabled={active === steps.length - 1} onClick={() => setActive(active + 1)}>
                {t.next} <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
