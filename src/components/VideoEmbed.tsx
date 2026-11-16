import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useI18n } from "../i18n";

const UI = {
  es: {
    play: "Reproducir el video",
    pause: "Pausar",
    replay: "Volver a reproducir",
    mute: "Silenciar",
    unmute: "Activar el sonido",
    fullscreen: "Pantalla completa",
    exitFullscreen: "Salir de pantalla completa",
    source: "Video institucional de Hospital Joya Marina Vallarta.",
  },
  en: {
    play: "Play the video",
    pause: "Pause",
    replay: "Play again",
    mute: "Mute",
    unmute: "Unmute",
    fullscreen: "Full screen",
    exitFullscreen: "Exit full screen",
    source: "Institutional video from Hospital Joya Marina Vallarta. The video is in Spanish.",
  },
  fr: {
    play: "Lire la vidéo",
    pause: "Mettre en pause",
    replay: "Relire la vidéo",
    mute: "Couper le son",
    unmute: "Remettre le son",
    fullscreen: "Plein écran",
    exitFullscreen: "Quitter le plein écran",
    source: "Vidéo institutionnelle de l’Hospital Joya Marina Vallarta. La vidéo est en espagnol.",
  },
} as const;

type VideoNode = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Official Hospital Joya video, played from this site with a first-party HTML5 player. */
export function VideoEmbed({ src, title, poster }: { src: string; title: string; poster: string }) {
  const { lang } = useI18n();
  const t = UI[lang];
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<VideoNode>(null);
  const hideTimer = useRef<number>(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [chrome, setChrome] = useState(true);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement) && document.fullscreenElement === box.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  function showChrome() {
    setChrome(true);
    window.clearTimeout(hideTimer.current);
    if (video.current && !video.current.paused && !video.current.ended) {
      hideTimer.current = window.setTimeout(() => setChrome(false), 2600);
    }
  }

  async function start() {
    const el = video.current;
    if (!el) return;
    setStarted(true);
    setEnded(false);
    setChrome(true);
    try {
      await el.play();
    } catch {
      /* autoplay can be declined; the poster button already recorded the gesture */
    }
  }

  function togglePlay() {
    const el = video.current;
    if (!el) return;
    if (!started) {
      void start();
      return;
    }
    if (el.ended) {
      el.currentTime = 0;
      void el.play();
      return;
    }
    if (el.paused) void el.play();
    else el.pause();
  }

  function toggleMute() {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  async function toggleFullscreen() {
    const wrap = box.current;
    const el = video.current;
    if (!wrap || !el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    if (wrap.requestFullscreen) {
      await wrap.requestFullscreen();
      return;
    }
    el.webkitEnterFullscreen?.();
  }

  function seek(value: number) {
    const el = video.current;
    if (!el || !Number.isFinite(el.duration)) return;
    el.currentTime = Math.min(Math.max(0, value), el.duration);
    setTime(el.currentTime);
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    const el = video.current;
    if (!el) return;
    const key = event.key;
    if (key === " " || key === "k" || key === "K") {
      event.preventDefault();
      togglePlay();
    } else if (key === "m" || key === "M") {
      event.preventDefault();
      toggleMute();
    } else if (key === "f" || key === "F") {
      event.preventDefault();
      void toggleFullscreen();
    } else if (key === "ArrowRight") {
      event.preventDefault();
      seek((el.currentTime || 0) + 5);
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      seek((el.currentTime || 0) - 5);
    }
  }

  const showBar = started && (chrome || !playing || ended);

  return (
    <figure>
      <div
        ref={box}
        className="relative aspect-video overflow-hidden rounded-3xl bg-navy shadow-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        data-nozoom
        tabIndex={0}
        onKeyDown={onKey}
        onMouseMove={started ? showChrome : undefined}
        onMouseLeave={() => playing && setChrome(false)}
        onTouchStart={started ? showChrome : undefined}
      >
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          preload="none"
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          title={title}
          onPlay={() => {
            setPlaying(true);
            setEnded(false);
            showChrome();
          }}
          onPause={() => {
            setPlaying(false);
            setChrome(true);
          }}
          onEnded={() => {
            setPlaying(false);
            setEnded(true);
            setChrome(true);
          }}
          onLoadedMetadata={() => setDuration(video.current?.duration ?? 0)}
          onTimeUpdate={() => setTime(video.current?.currentTime ?? 0)}
          onClick={() => {
            togglePlay();
            showChrome();
          }}
        >
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>

        {!started ? (
          <button type="button" className="group absolute inset-0 h-full w-full" aria-label={`${t.play}: ${title}`} onClick={() => void start()}>
            <img
              src={`${poster}-1280.webp`}
              srcSet={`${poster}-640.webp 640w, ${poster}-1280.webp 1280w`}
              sizes="(min-width: 1024px) 760px, 100vw"
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" aria-hidden="true" />
            <span className="absolute top-[42%] left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-navy shadow-premium transition-transform duration-500 group-hover:scale-110 md:h-20 md:w-20" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
            </span>
            <span className="absolute right-4 bottom-4 left-4 text-left text-white md:right-5 md:bottom-5 md:left-5">
              <span className="block font-serif text-[1.05rem] leading-snug line-clamp-2 sm:text-xl md:text-3xl md:leading-tight">{title}</span>
            </span>
          </button>
        ) : null}

        {started && ended ? (
          <button type="button" className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-navy/35 text-white" aria-label={`${t.replay}: ${title}`} onClick={() => void start()}>
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-navy shadow-premium" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
            </span>
            <span className="mt-4 font-serif text-xl">{t.replay}</span>
          </button>
        ) : null}

        {showBar ? (
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent px-3 pt-10 pb-3 md:px-4">
            <label className="block">
              <span className="sr-only">{title}</span>
              <input
                type="range"
                className="me-video-seek"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Number.isFinite(time) ? time : 0}
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-valuenow={time}
                aria-valuetext={`${formatTime(time)} / ${formatTime(duration)}`}
                onChange={(event) => seek(Number(event.target.value))}
              />
            </label>
            <div className="mt-1.5 flex items-center gap-1.5 text-white md:gap-2">
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10" aria-label={playing && !ended ? t.pause : ended ? t.replay : t.play} onClick={togglePlay}>
                {playing && !ended ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
                )}
              </button>
              <span className="min-w-[4.8rem] font-mono text-[11px] tabular-nums tracking-wide text-white/90">{formatTime(time)} / {formatTime(duration)}</span>
              <span className="flex-1" />
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10" aria-label={muted ? t.unmute : t.mute} onClick={toggleMute}>
                {muted ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M5 9v6h3.2L14 20V4L8.2 9H5zm12.1 1.1 1.4-1.4 1.4 1.4 1.4-1.4-1.4-1.4 1.4-1.4-1.4-1.4-1.4 1.4-1.4-1.4-1.4 1.4 1.4 1.4-1.4 1.4 1.4 1.4z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M5 9v6h3.2L14 20V4L8.2 9H5zm11.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4z" /></svg>
                )}
              </button>
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10" aria-label={full ? t.exitFullscreen : t.fullscreen} onClick={() => void toggleFullscreen()}>
                {full ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 9H5V5M15 9h4V5M9 15H5v4M15 15h4v4" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 9V5h4M15 5h4v4M5 15v4h4M19 15v4h-4" /></svg>
                )}
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">
        {t.source}{" "}
        <a className="underline" href="https://hospitaljoya.com/hospitales/hospital-joya-marina-vallarta/" rel="noopener noreferrer">hospitaljoya.com</a>
      </figcaption>
    </figure>
  );
}
