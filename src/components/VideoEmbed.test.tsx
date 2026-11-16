import { fireEvent, render, screen } from "@testing-library/react";
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

function renderVideo(lang: "es" | "en" | "fr") {
  return render(
    <I18nProvider initialLang={lang}>
      <VideoEmbed src="/assets/video/joya-institucional" title="Hospital Joya. Video institucional" poster="/assets/video/joya-institucional" />
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
      unmount();
    }
    expect(es).toBeTruthy();
    expect(en).toBeTruthy();
    expect(fr).toBeTruthy();
  });
});
