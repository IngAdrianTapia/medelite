import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "../i18n";

import type { LightboxItem } from "../data/lightboxItems";

const UI = {
  es: { close: "Cerrar", prev: "Foto anterior", next: "Foto siguiente", of: "de", label: "Foto ampliada", zoomIn: "Acercar", zoomOut: "Alejar", hint: "Doble toque o rueda para acercar · Esc para cerrar" },
  en: { close: "Close", prev: "Previous photo", next: "Next photo", of: "of", label: "Enlarged photo", zoomIn: "Zoom in", zoomOut: "Zoom out", hint: "Double-tap or scroll to zoom · Esc to close" },
  fr: { close: "Fermer", prev: "Photo précédente", next: "Photo suivante", of: "sur", label: "Photo agrandie", zoomIn: "Agrandir", zoomOut: "Réduire", hint: "Toucher deux fois ou molette pour agrandir · Échap pour fermer" },
} as const;

const MAX = 3;

export function Lightbox({ items, index, onClose, onIndex }: { items: readonly LightboxItem[]; index: number; onClose: () => void; onIndex: (next: number) => void }) {
  const { lang } = useI18n();
  const t = UI[lang];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ startX: number; startY: number; panX: number; panY: number; dist: number; scale: number; moved: boolean } | null>(null);
  const lastTap = useRef(0);
  const item = items[index] ?? items[0];
  const count = items.length;

  const reset = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const go = useCallback(
    (step: number) => {
      if (count < 2) return;
      reset();
      setLoaded(false);
      onIndex((index + step + count) % count);
    },
    [count, index, onIndex, reset],
  );

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "+" || event.key === "=") setScale((s) => Math.min(MAX, s + 0.5));
      else if (event.key === "-") setScale((s) => (s - 0.5 <= 1 ? (setPan({ x: 0, y: 0 }), 1) : s - 0.5));
      else if (event.key === "Tab" && dialogRef.current) {
        const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Preload neighbours so next/previous feel instant.
  useEffect(() => {
    if (count < 2) return;
    for (const step of [1, -1]) {
      const next = items[(index + step + count) % count];
      if (next) new Image().src = next.src;
    }
  }, [count, index, items]);

  if (!item) return null;

  const zoomAt = (target: number) => {
    const next = Math.max(1, Math.min(MAX, target));
    setScale(next);
    if (next === 1) setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (event: RPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const pts = [...pointers.current.values()];
    const dist = pts.length === 2 && pts[0] && pts[1] ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0;
    gesture.current = { startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y, dist, scale, moved: false };
    setDragging(true);
  };

  const onPointerMove = (event: RPointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || !pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const pts = [...pointers.current.values()];
    if (pts.length === 2 && pts[0] && pts[1] && g.dist > 0) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      zoomAt(g.scale * (dist / g.dist));
      g.moved = true;
      return;
    }
    const dx = event.clientX - g.startX;
    const dy = event.clientY - g.startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) g.moved = true;
    if (scale > 1) setPan({ x: g.panX + dx, y: g.panY + dy });
    else setPan({ x: dx, y: 0 });
  };

  const onPointerUp = (event: RPointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    pointers.current.delete(event.pointerId);
    if (!g || pointers.current.size > 0) return;
    gesture.current = null;
    setDragging(false);
    const dx = event.clientX - g.startX;
    if (scale === 1) {
      setPan({ x: 0, y: 0 });
      if (g.moved && Math.abs(dx) > 60) {
        go(dx < 0 ? 1 : -1);
        return;
      }
    }
    if (!g.moved) {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        zoomAt(scale > 1 ? 1 : 2);
        lastTap.current = 0;
      } else {
        lastTap.current = now;
        // A single tap on the dark area (not the photo) closes.
        const target = event.target as HTMLElement;
        if (target.tagName !== "IMG" && scale === 1) {
          window.setTimeout(() => {
            if (lastTap.current === now) onClose();
          }, 310);
        }
      }
    }
  };

  const node = (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t.label} className="fixed inset-0 z-[80] flex flex-col bg-[#06141f]/96 text-white" translate="no">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p className="text-sm tabular-nums text-white/70" aria-live="polite">
          {index + 1} {t.of} {count}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" aria-label={t.zoomOut} disabled={scale <= 1} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg hover:bg-white/10 disabled:opacity-40" onClick={() => zoomAt(scale - 0.5)}>
            −
          </button>
          <button type="button" aria-label={t.zoomIn} disabled={scale >= MAX} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg hover:bg-white/10 disabled:opacity-40" onClick={() => zoomAt(scale + 0.5)}>
            +
          </button>
          <button ref={closeRef} type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-4 text-sm font-semibold hover:bg-white/10" onClick={onClose}>
            {t.close} <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>
      <div
        className="relative flex min-h-0 flex-1 touch-none items-center justify-center overflow-hidden px-2 select-none sm:px-20"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={(event) => zoomAt(scale + (event.deltaY < 0 ? 0.25 : -0.25))}
      >
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          draggable={false}
          onLoad={() => setLoaded(true)}
          className={`max-h-full max-w-full rounded-lg object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${scale > 1 ? "cursor-grab" : "cursor-zoom-in"}`}
          style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`, transition: dragging ? "opacity .5s" : "transform .35s cubic-bezier(.16,1,.3,1), opacity .5s" }}
        />
        {count > 1 ? (
          <>
            <button type="button" aria-label={t.prev} className="absolute top-1/2 left-2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white/25 sm:left-5 sm:inline-flex" onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} onClick={() => go(-1)}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" aria-label={t.next} className="absolute top-1/2 right-2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white/25 sm:right-5 sm:inline-flex" onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} onClick={() => go(1)}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        ) : null}
      </div>
      <div className="px-4 pt-3 pb-5 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-white/85">{item.alt}</p>
        <p className="mt-1 text-center text-xs text-white/45">{t.hint}</p>
        {count > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
            <button type="button" aria-label={t.prev} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25" onClick={() => go(-1)}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" aria-label={t.next} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25" onClick={() => go(1)}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
  return createPortal(node, document.body);
}
