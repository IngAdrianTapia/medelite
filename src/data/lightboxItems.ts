import { PHOTO_LARGEST } from "./photoCredits";
import { PHOTO_OF } from "../i18n/labels";

export interface LightboxItem {
  src: string;
  alt: string;
}

/** Map catalogue photo ids (FacilityPhoto names) to lightbox items. */
export function itemsFromIds(ids: readonly string[], lang: "es" | "en" | "fr"): LightboxItem[] {
  return ids.map((id) => ({ src: `/assets/photos/${PHOTO_LARGEST[id] ?? `${id}-640.webp`}`, alt: PHOTO_OF[id]?.[lang] ?? "" }));
}

