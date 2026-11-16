import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useI18n } from "../i18n";
import { Lightbox } from "./Lightbox";
import type { LightboxItem } from "../data/lightboxItems";

const ENLARGE = { es: "Ampliar foto", en: "Enlarge photo", fr: "Agrandir la photo" } as const;

/** Largest candidate of an <img> (its own srcset or a sibling <source> in a <picture>). */
function largest(img: HTMLImageElement): string {
  const sets: string[] = [];
  if (img.srcset) sets.push(img.srcset);
  const picture = img.parentElement?.tagName === "PICTURE" ? img.parentElement : null;
  picture?.querySelectorAll("source").forEach((source) => {
    if (source.type === "image/webp" && source.srcset) sets.push(source.srcset);
  });
  let best = { w: 0, url: img.currentSrc || img.src };
  for (const set of sets) {
    for (const part of set.split(",")) {
      const [url, size] = part.trim().split(/\s+/);
      const w = Number.parseInt(size ?? "0", 10);
      if (url && w > best.w && !url.endsWith(".avif")) best = { w, url };
    }
  }
  return best.url;
}

function eligible(img: HTMLImageElement): boolean {
  if (img.closest("a, button, header, footer, [role=dialog], [data-nozoom]")) return false;
  if (img.getAttribute("aria-hidden") === "true") return false;
  const rect = img.getBoundingClientRect();
  return rect.width >= 96 || img.width >= 96;
}

/** Every content photo that is not already a link or a button opens in the lightbox: click, Enter or Space. */
export function ZoomLayer() {
  const { lang } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState<{ items: LightboxItem[]; index: number } | null>(null);

  useEffect(() => {
    const tag = () => {
      document.querySelectorAll<HTMLImageElement>("main img").forEach((img) => {
        if (img.dataset.zoomable !== undefined || !eligible(img)) return;
        img.dataset.zoomable = "";
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", `${ENLARGE[lang]}: ${img.alt || ""}`.trim());
      });
    };
    tag();
    const observer = new MutationObserver(() => tag());
    const main = document.querySelector("main") ?? document.body;
    observer.observe(document.body, { childList: true, subtree: true });
    const openFrom = (img: HTMLImageElement) => {
      const scope = img.closest("[data-gallery]") ?? img.closest("main") ?? main;
      const all = [...scope.querySelectorAll<HTMLImageElement>("img[data-zoomable]")];
      const items: LightboxItem[] = [];
      const seen = new Map<string, number>();
      let index = 0;
      for (const node of all) {
        const src = largest(node);
        if (!seen.has(src)) {
          seen.set(src, items.length);
          items.push({ src, alt: node.alt });
        }
        if (node === img) index = seen.get(src) ?? 0;
      }
      setOpen({ items, index });
    };
    const onClick = (event: MouseEvent) => {
      const img = (event.target as HTMLElement).closest?.("img[data-zoomable]");
      if (img instanceof HTMLImageElement) openFrom(img);
    };
    const onKey = (event: KeyboardEvent) => {
      const img = event.target;
      if (img instanceof HTMLImageElement && img.dataset.zoomable !== undefined && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openFrom(img);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [lang, location.pathname]);

  return open ? <Lightbox items={open.items} index={open.index} onClose={() => setOpen(null)} onIndex={(index) => setOpen({ ...open, index })} /> : null;
}

/** Fade-and-rise for elements with the `reveal` class, once, when they enter the viewport. */
export function RevealObserver() {
  const location = useLocation();
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const scan = () => document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [location.pathname]);
  return null;
}
