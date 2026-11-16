import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "../i18n";
import { IllustrationLabel } from "./IllustrationLabel";

const NODES = [
  { x: 120, y: 112 },
  { x: 360, y: 112 },
  { x: 600, y: 112 },
  { x: 840, y: 112 },
  { x: 840, y: 300 },
  { x: 600, y: 300 },
  { x: 360, y: 300 },
  { x: 120, y: 300 },
] as const;

const PATH = "M 120 112 L 840 112 C 916 112, 916 300, 840 300 L 120 300";

export function RecorridoPaciente() {
  const { m, lang } = useI18n();
  const reduce = useReducedMotion();
  const [activa, setActiva] = useState(0);
  const steps = m.journey.steps;
  const etapa = steps[activa] ?? steps[0];
  const ui = {
    es: {
      note: "No es una fotografía ni el plano de un hospital.",
      prev: "Paso anterior",
      next: "Paso siguiente",
      pick: "Elegir un paso del recorrido",
    },
    en: {
      note: "Not a photograph and not a hospital floor plan.",
      prev: "Previous step",
      next: "Next step",
      pick: "Choose a step",
    },
    fr: {
      note: "Ce n’est pas une photographie ni le plan d’un hôpital.",
      prev: "Étape précédente",
      next: "Étape suivante",
      pick: "Choisir une étape",
    },
  }[lang];

  if (!etapa) return null;

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-premium md:p-10">
      <IllustrationLabel note={ui.note} />
      <h2 className="mt-4 font-serif text-3xl leading-tight text-navy md:text-4xl">{m.journey.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{m.journey.deck}</p>

      <div className="mt-8 hidden md:block" aria-hidden="true">
        <svg viewBox="0 0 960 380" className="h-auto w-full">
          <path d={PATH} fill="none" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          <motion.path
            d={PATH}
            fill="none"
            stroke="#00788f"
            strokeWidth="3"
            strokeLinecap="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: "easeOut" }}
          />
          {steps.map((step, index) => {
            const pos = NODES[index];
            if (!pos) return null;
            const selected = activa === index;
            return (
              <g key={step.title} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle r="26" fill={selected ? "#00788f" : "#FFFFFF"} stroke="#00788f" strokeWidth="2" />
                <text y="5" textAnchor="middle" fill={selected ? "#FFFFFF" : "#00788f"} fontSize="14" fontWeight="700">
                  {String(index + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-6" role="group" aria-label={ui.pick}>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <button
                type="button"
                aria-pressed={activa === index}
                className={`min-h-12 w-full rounded-xl border px-3 py-2 text-left text-sm ${
                  activa === index ? "border-gold bg-gold text-white" : "border-line bg-white text-ink hover:border-gold"
                }`}
                onClick={() => setActiva(index)}
              >
                <span className="text-xs font-bold tracking-wide">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-1 block font-medium">{step.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div aria-live="polite" className="mt-4 rounded-xl border border-line bg-ivory p-5">
        <p className="text-xs font-bold tracking-[0.14em] text-navy uppercase">{String(activa + 1).padStart(2, "0")}</p>
        <p className="mt-1 font-serif text-xl text-ink">{etapa.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{etapa.body}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line bg-white px-4 text-sm font-semibold text-navy"
            onClick={() => setActiva((prev) => (prev === 0 ? steps.length - 1 : prev - 1))}
          >
            {ui.prev}
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-gold px-4 text-sm font-semibold text-white"
            onClick={() => setActiva((prev) => (prev === steps.length - 1 ? 0 : prev + 1))}
          >
            {ui.next}
          </button>
        </div>
      </div>
    </div>
  );
}
