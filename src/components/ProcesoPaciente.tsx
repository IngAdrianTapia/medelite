import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useI18n } from "../i18n";
import { PHOTO_OF } from "../i18n/labels";
import { FacilityPhoto } from "./FacilityPhoto";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Line icons drawn for this site (24 px grid). */
const ICONS: ReactNode[] = [
  <g {...stroke}><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></g>,
  <g {...stroke}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></g>,
  <g {...stroke}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" /></g>,
  <g {...stroke}><path d="M3 15l18-7-3 9-6-2-3 4v-5" /><path d="M12 15l6-7" /></g>,
  <g {...stroke}><path d="M12 3v4M5 7h14l-1.5 5h-11z" /><path d="M7 12v8M17 12v8M9 20h6" /></g>,
  <g {...stroke}><path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></g>,
  <g {...stroke}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></g>,
  <g {...stroke}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></g>,
];

/** Real Hospital Joya photos where the step happens in a facility; the other steps use the icon panel. */
const PHOTO: (string | null)[] = [null, null, "cancun-lobby", "marina-street", "operating-room", "cancun-room", null, null];

const UI = {
  es: { step: "Paso", of: "de", prev: "Anterior", next: "Siguiente", pick: "Pasos del recorrido", photo: "Foto de una sede Joya", plain: "Este paso no se ilustra con una foto de hospital." },
  en: { step: "Step", of: "of", prev: "Previous", next: "Next", pick: "Journey steps", photo: "Photo of a Joya hospital", plain: "This step is not illustrated with a hospital photo." },
  fr: { step: "Étape", of: "sur", prev: "Précédente", next: "Suivante", pick: "Étapes du parcours", photo: "Photo d’un établissement Joya", plain: "Cette étape n’est pas illustrée par une photo d’hôpital." },
} as const;

function Visual({ index, title }: { index: number; title: string }) {
  const { lang } = useI18n();
  const photo = PHOTO[index];
  if (photo) {
    return (
      <figure className="relative h-full min-h-[15rem] overflow-hidden rounded-2xl bg-soft" data-gallery="proceso">
        <FacilityPhoto name={photo} fill alt={PHOTO_OF[photo]?.[lang] ?? title} sizes="(min-width: 1024px) 560px, 100vw" />
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy backdrop-blur">{UI[lang].photo}</figcaption>
      </figure>
    );
  }
  return (
    <div className="relative flex h-full min-h-[15rem] items-end overflow-hidden rounded-2xl p-7 text-white" style={{ background: "radial-gradient(120% 120% at 85% 10%, #0b5c73 0%, #002b49 55%, #001b2e 100%)" }} role="img" aria-label={`${title}. ${UI[lang].plain}`}>
      <span className="pointer-events-none absolute -top-6 right-4 font-serif text-[11rem] leading-none text-white/[0.07] tabular-nums select-none" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.08]" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <path d="M-20 250 C 80 180, 160 290, 260 200 S 400 120, 440 160" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M-20 270 C 90 200, 170 310, 270 220 S 410 140, 440 180" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="relative grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur">
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">{ICONS[index]}</svg>
      </span>
    </div>
  );
}

export function ProcesoPaciente() {
  const { m, lang } = useI18n();
  const t = UI[lang];
  const steps = m.journey.steps;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[active] ?? steps[0];
  if (!step) return null;
  const n = (i: number) => String(i + 1).padStart(2, "0");

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    const jump = event.key === "Home" ? 0 : event.key === "End" ? steps.length - 1 : null;
    if (!delta && jump === null) return;
    event.preventDefault();
    const next = jump ?? (active + delta + steps.length) % steps.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      {/* Desktop: horizontal stepper with a progress line, then the step in detail. */}
      <div className="hidden lg:block">
        <div className="relative">
          <div className="absolute top-7 right-[6.25%] left-[6.25%] h-px bg-line" aria-hidden="true" />
          <div className="absolute top-7 left-[6.25%] h-px bg-teal transition-[width] duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{ width: `${(active / (steps.length - 1)) * 87.5}%` }} aria-hidden="true" />
          <div role="tablist" aria-label={t.pick} className="relative grid grid-cols-8">
            {steps.map((item, index) => {
              const selected = index === active;
              const done = index < active;
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
                  className="group flex flex-col items-center gap-3 px-1 text-center"
                >
                  <span className={`grid h-14 w-14 place-items-center rounded-full border transition-all duration-500 ${selected ? "scale-110 border-teal bg-teal text-white shadow-premium" : done ? "border-teal bg-white text-teal" : "border-line bg-white text-muted group-hover:border-teal group-hover:text-teal"}`}>
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">{ICONS[index]}</svg>
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-muted tabular-nums">{n(index)}</span>
                  <span className={`text-sm leading-snug ${selected ? "font-semibold text-navy" : "text-ink/80"}`}>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div id="paso-panel" role="tabpanel" aria-labelledby={`paso-tab-${active}`} className="mt-12 grid min-h-[22rem] grid-cols-[1.05fr_1fr] gap-12 rounded-3xl border border-line bg-white p-6 shadow-premium">
          <div key={active} className="animate-[fadeUp_.6s_cubic-bezier(.16,1,.3,1)]">
            <Visual index={active} title={step.title} />
          </div>
          <div className="flex flex-col justify-center py-6 pr-6">
            <p className="eyebrow tabular-nums">
              {t.step} {n(active)} {t.of} {n(steps.length - 1)}
            </p>
            <h3 key={step.title} className="mt-4 font-serif text-4xl leading-tight text-navy">{step.title}</h3>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">{step.body}</p>
            <div className="mt-8 flex items-center gap-3">
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

      {/* Phone and tablet: vertical timeline; each step opens in place. */}
      <ol className="relative lg:hidden" aria-label={t.pick}>
        <span className="absolute top-2 bottom-2 left-[1.6rem] w-px bg-line" aria-hidden="true" />
        {steps.map((item, index) => {
          const open = index === active;
          return (
            <li key={item.title} className="relative pb-3">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`paso-m-${index}`}
                  onClick={() => setActive(open ? -1 : index)}
                  className="flex min-h-16 w-full items-center gap-4 rounded-2xl py-2 pr-3 text-left"
                >
                  <span className={`relative z-10 grid h-[3.2rem] w-[3.2rem] shrink-0 place-items-center rounded-full border transition-colors ${open ? "border-teal bg-teal text-white" : "border-line bg-white text-teal"}`}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">{ICONS[index]}</svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold tracking-[0.16em] text-muted tabular-nums">{n(index)}</span>
                    <span className="block font-serif text-xl leading-tight text-navy">{item.title}</span>
                  </span>
                  <span aria-hidden="true" className={`text-xl text-teal transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
                </button>
              </h3>
              <div id={`paso-m-${index}`} hidden={!open} className="ml-[4.2rem] pb-4">
                <p className="text-[15px] leading-relaxed text-muted">{item.body}</p>
                {PHOTO[index] ? (
                  <div className="mt-4 aspect-[16/10]">
                    <Visual index={index} title={item.title} />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
