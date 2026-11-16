import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { I18nProvider } from "../i18n";
import { en } from "../i18n/en";
import { es } from "../i18n/es";
import { fr } from "../i18n/fr";
import { VideoEmbed } from "./VideoEmbed";

const play = vi.fn().mockResolvedValue(undefined);
const pause = vi.fn();

beforeEach(() => {
  play.mockClear();
  pause.mockClear();
  Object.defineProperty(HTMLMediaElement.prototype, "play", { configurable: true, value: play });
  Object.defineProperty(HTMLMediaElement.prototype, "pause", { configurable: true, value: pause });
});

const INSTITUCIONAL_CAPTION = {
  es: "Video institucional de Hospital Joya Marina Vallarta.",
  en: "Institutional video from Hospital Joya Marina Vallarta. The video is in Spanish.",
  fr: "Vidéo institutionnelle de l’Hospital Joya Marina Vallarta. La vidéo est en espagnol.",
} as const;

const HEMODINAMIA_CAPTION = {
  es: "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta.",
  en: "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta. The video is in Spanish.",
  fr: "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta. La vidéo est en espagnol.",
} as const;

function renderVideo(
  lang: "es" | "en" | "fr",
  props: Partial<{ src: string; title: string; poster: string; caption: { es: string; en: string; fr: string } }> = {},
) {
  return render(
    <I18nProvider initialLang={lang}>
      <VideoEmbed
        src={props.src ?? "/assets/video/joya-institucional"}
        title={props.title ?? "Hospital Joya. Video institucional"}
        poster={props.poster ?? "/assets/video/joya-institucional"}
        caption={props.caption ?? INSTITUCIONAL_CAPTION}
      />
    </I18nProvider>,
  );
}

describe("VideoEmbed", () => {
  it("renders a first-party player with a poster and no third-party frame", () => {
    renderVideo("es");
    expect(screen.getByRole("button", { name: "Reproducir el video: Hospital Joya. Video institucional" })).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
    expect(document.body.textContent).not.toMatch(/youtube/i);
    const video = document.querySelector("video");
    expect(video).toBeTruthy();
    expect(video).toHaveAttribute("preload", "none");
    expect(video).toHaveAttribute("playsinline");
    expect(video?.querySelector("source")?.getAttribute("src")).toBe("/assets/video/joya-institucional.mp4");
    expect(video?.querySelector("source")?.getAttribute("type")).toBe("video/mp4");
    expect(screen.getByRole("link", { name: "hospitaljoya.com" })).toHaveAttribute("href", "https://hospitaljoya.com/hospitales/hospital-joya-marina-vallarta/");
  });

  it.each([
    ["es", "Reproducir el video"],
    ["en", "Play the video"],
    ["fr", "Lire la vidéo"],
  ] as const)("starts the local file when play is pressed in %s", (lang, playLabel) => {
    renderVideo(lang);
    fireEvent.click(screen.getByRole("button", { name: `${playLabel}: Hospital Joya. Video institucional` }));
    expect(play).toHaveBeenCalled();
    expect(document.querySelector("iframe")).toBeNull();
    expect(document.body.textContent).not.toMatch(/youtube/i);
  });

  it("keeps ES, EN and FR captions free of third-party player copy", () => {
    for (const lang of ["es", "en", "fr"] as const) {
      const { unmount } = renderVideo(lang);
      expect(document.body.textContent).not.toMatch(/youtube/i);
      expect(document.body.textContent).toContain(INSTITUCIONAL_CAPTION[lang]);
      unmount();
    }
    expect(es).toBeTruthy();
    expect(en).toBeTruthy();
    expect(fr).toBeTruthy();
  });

  it("uses the official hemodynamics title as the caption in ES, EN and FR", () => {
    const official = "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta.";
    for (const lang of ["es", "en", "fr"] as const) {
      const { unmount } = renderVideo(lang, {
        src: "/assets/video/joya-hemodinamia",
        title: "La importancia de la Sala de Hemodinamia. Hospital Joya Marina Vallarta",
        poster: "/assets/video/joya-hemodinamia",
        caption: HEMODINAMIA_CAPTION,
      });
      expect(document.body.textContent).toContain(official);
      expect(document.body.textContent).toContain(HEMODINAMIA_CAPTION[lang]);
      expect(document.body.textContent).not.toContain("Video institucional de Hospital Joya Marina Vallarta.");
      expect(document.body.textContent).not.toMatch(/youtube/i);
      unmount();
    }
  });

  it("shows first-party controls after play starts", async () => {
    renderVideo("es");
    fireEvent.click(screen.getByRole("button", { name: "Reproducir el video: Hospital Joya. Video institucional" }));
    const video = document.querySelector("video");
    expect(video).toBeTruthy();
    if (video) fireEvent.play(video);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Pausar" })).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "Silenciar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pantalla completa" })).toBeInTheDocument();
    expect(document.querySelector("input.me-video-seek")).toBeTruthy();
  });
});
