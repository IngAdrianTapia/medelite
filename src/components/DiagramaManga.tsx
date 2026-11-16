import { useState } from "react";
import { useI18n } from "../i18n";
import { IllustrationLabel } from "./IllustrationLabel";

type Vista = "all" | "tube" | "removed";

export function DiagramaManga() {
  const { lang } = useI18n();
  const [vista, setVista] = useState<Vista>("all");
  const copy = {
    es: {
      note: "No es una foto, no es un quirófano Joya y no es una indicación.",
      title: "Manga gástrica, dibujo de antes y después",
      deck: "Esquema anatómico. No trae volúmenes, tiempos ni precios. El cirujano decide.",
      views: [
        ["all", "Vista completa"],
        ["tube", "Tubo"],
        ["removed", "Porción marcada"],
      ] as const,
      before: "Antes",
      beforeTitle: "Estómago en el dibujo",
      after: "Después",
      afterTitle: "Tubo en el dibujo",
      refs: [
        ["1", "Esófago", "El dibujo lo coloca arriba."],
        ["2", "Línea de grapado", "Trazo de una división vertical. No es el plan de un caso."],
        ["3", "Porción marcada", "La zona que el dibujo señala aparte."],
        ["4", "Tubo", "La forma que queda en el dibujo. Sin un volumen."],
        ["5", "Píloro y duodeno", "El dibujo los deja abajo. No describe a un paciente."],
      ] as const,
    },
    en: {
      note: "Not a photo, not a Joya operating room, and not a surgical plan.",
      title: "Gastric sleeve, a before-and-after drawing",
      deck: "An anatomical sketch. It has no volumes, times or prices. The surgeon decides.",
      views: [
        ["all", "Full view"],
        ["tube", "Tube"],
        ["removed", "Marked portion"],
      ] as const,
      before: "Before",
      beforeTitle: "Stomach in the drawing",
      after: "After",
      afterTitle: "Tube in the drawing",
      refs: [
        ["1", "Esophagus", "The drawing places it at the top."],
        ["2", "Staple line", "A vertical division mark. Not a plan for a case."],
        ["3", "Marked portion", "The area the drawing sets aside."],
        ["4", "Tube", "The shape left in the drawing. No volume."],
        ["5", "Pylorus and duodenum", "The drawing leaves them below. Not a patient."],
      ] as const,
    },
    fr: {
      note: "Ce n’est pas une photo, ni une salle Joya, ni une indication.",
      title: "Gastrectomie en manchon, dessin avant et après",
      deck: "Schéma anatomique. Pas de volumes, de durées ni de prix. Le chirurgien décide.",
      views: [
        ["all", "Vue complète"],
        ["tube", "Tube"],
        ["removed", "Partie marquée"],
      ] as const,
      before: "Avant",
      beforeTitle: "Estomac du dessin",
      after: "Après",
      afterTitle: "Tube du dessin",
      refs: [
        ["1", "Œsophage", "Le dessin le place en haut."],
        ["2", "Ligne d’agrafes", "Trait d’une division verticale. Pas le plan d’un cas."],
        ["3", "Partie marquée", "La zone que le dessin écarte."],
        ["4", "Tube", "La forme qui reste sur le dessin. Sans volume."],
        ["5", "Pylore et duodénum", "Le dessin les laisse en bas. Pas un patient."],
      ] as const,
    },
  }[lang];
  const showTube = vista === "all" || vista === "tube";
  const showRemoved = vista === "all" || vista === "removed";

  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 shadow-premium md:p-10">
      <IllustrationLabel note={copy.note} />
      <h2 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-4xl">{copy.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{copy.deck}</p>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={copy.title}>
        {copy.views.map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={vista === id}
            className={`min-h-11 rounded-full px-4 text-sm font-semibold ${vista === id ? "bg-navy text-white" : "border border-line bg-paper text-ink"}`}
            onClick={() => setVista(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div tabIndex={0} role="region" aria-label={copy.title} className="mt-6 overflow-x-auto rounded-[2rem] border border-line bg-paper p-4">
        <svg viewBox="0 0 860 440" role="img" aria-label={copy.title} className="h-auto min-w-[40rem] w-full">
          <rect x="16" y="16" width="396" height="408" rx="24" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="40" y="52" fill="#0A2540" fontSize="12" fontWeight="700">
            {copy.before}
          </text>
          <text x="40" y="76" fill="#0F172A" fontSize="16" fontWeight="600">
            {copy.beforeTitle}
          </text>
          <g transform="translate(70, 28)">
            <path
              d="M 162 76 L 162 126 C 142 110, 102 124, 96 176 C 90 232, 118 296, 174 316 C 194 323, 212 325, 224 334 L 222 368 L 244 368 L 246 322 C 246 304, 224 294, 206 286 C 186 276, 178 242, 182 198 C 185 166, 186 144, 186 126 L 186 76 Z"
              fill="#F8E8E4"
              stroke="#0A2540"
              strokeWidth="2"
            />
            <path d="M 158 128 C 154 176, 156 238, 186 296" fill="none" stroke="#0A2540" strokeWidth="2" strokeDasharray="6 5" />
          </g>
          <rect x="448" y="16" width="396" height="408" rx="24" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="472" y="52" fill="#0A2540" fontSize="12" fontWeight="700">
            {copy.after}
          </text>
          <text x="472" y="76" fill="#0F172A" fontSize="16" fontWeight="600">
            {copy.afterTitle}
          </text>
          <g transform="translate(500, 28)" opacity={showRemoved ? 1 : 0.28}>
            <path
              d="M 122 126 C 102 112, 64 128, 58 178 C 52 232, 80 292, 134 312 C 118 256, 116 184, 122 126 Z"
              fill="#F8FAFC"
              stroke="#475569"
              strokeWidth="1.75"
              strokeDasharray="5 4"
            />
          </g>
          <g transform="translate(500, 28)" opacity={showTube ? 1 : 0.28}>
            <path
              d="M 168 76 L 168 126 C 164 176, 166 238, 192 296 C 204 312, 218 322, 226 334 L 224 368 L 246 368 L 248 322 C 248 304, 226 294, 208 286 C 190 276, 184 242, 188 198 C 191 166, 192 144, 192 126 L 192 76 Z"
              fill="#E6EEF6"
              stroke="#0A2540"
              strokeWidth="2.2"
            />
          </g>
        </svg>
      </div>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {copy.refs.map(([numero, titulo, descripcion]) => (
          <li key={numero} className="rounded-2xl border border-line bg-paper p-4 text-sm leading-relaxed">
            <p className="font-semibold text-ink">
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{numero}</span>
              {titulo}
            </p>
            <p className="mt-2 text-muted">{descripcion}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
