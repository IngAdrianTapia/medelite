import { useState } from "react";
import { useI18n } from "../i18n";

const UI = {
  es: { play: "Reproducir el video", privacy: "Al reproducirlo se carga YouTube (Google), que puede usar cookies. Antes de hacer clic no se envía nada.", lang: "Video en español", source: "Canal oficial de Hospital Joya Marina en YouTube" },
  en: { play: "Play the video", privacy: "Playing it loads YouTube (Google), which may set cookies. Nothing is sent before you click.", lang: "Video in Spanish", source: "Hospital Joya Marina’s official YouTube channel" },
  fr: { play: "Lire la vidéo", privacy: "La lecture charge YouTube (Google), qui peut déposer des témoins. Rien n’est transmis avant le clic.", lang: "Vidéo en espagnol", source: "Chaîne YouTube officielle de l’Hospital Joya Marina" },
} as const;

/** Official video, click-to-load (no third-party request before consent, PIPEDA / Loi 25). */
export function VideoEmbed({ id, title, poster }: { id: string; title: string; poster: string }) {
  const { lang } = useI18n();
  const t = UI[lang];
  const [on, setOn] = useState(false);
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-navy shadow-premium" data-nozoom>
        {on ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button type="button" className="group absolute inset-0 h-full w-full" aria-label={`${t.play}: ${title}`} onClick={() => setOn(true)}>
            <img src={`${poster}-1280.webp`} srcSet={`${poster}-640.webp 640w, ${poster}-1280.webp 1280w`} sizes="(min-width: 1024px) 760px, 100vw" width={1280} height={720} loading="lazy" decoding="async" alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" />
            <span className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" aria-hidden="true" />
            <span className="absolute top-1/2 left-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-navy shadow-premium transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
            </span>
            <span className="absolute right-5 bottom-5 left-5 text-left text-white">
              <span className="block font-serif text-2xl leading-tight md:text-3xl">{title}</span>
              <span className="mt-1 block text-xs text-white/80">{lang === "es" ? "YouTube" : `${t.lang} · YouTube`}</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">
        {t.privacy}{" "}
        <a className="underline" href="https://www.youtube.com/@hospitaljoyamarina7899" target="_blank" rel="noopener noreferrer">{t.source}</a>
      </figcaption>
    </figure>
  );
}
