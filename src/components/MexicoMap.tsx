import { Link } from "react-router";
import { HOSPITALS } from "../data/hospitals";
import { PHOTO_OF } from "../i18n/labels";
import { useI18n } from "../i18n";
import { FacilityPhoto } from "./FacilityPhoto";

/** Show the actual nine hospital façades instead of an abstract, geographically misleading outline. */
export function MexicoMap({ label }: { label: string }) {
  const { lang } = useI18n();
  return (
    <div role="group" aria-label={label} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {HOSPITALS.map((hospital) => (
        <Link key={hospital.id} to={`/red/${hospital.id}`} className="group min-w-0 overflow-hidden rounded-2xl bg-white shadow-premium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-soft">
              <FacilityPhoto name={hospital.id} fill alt={PHOTO_OF[hospital.id]?.[lang] ?? hospital.name} sizes="(min-width: 1024px) 12rem, (min-width: 640px) 30vw, 45vw" className="transition-transform duration-300 group-hover:scale-105" />
            </div>
            <figcaption className="p-3">
              <span className="block text-sm font-semibold leading-tight text-navy">{hospital.name.replace("Hospital Joya ", "")}</span>
              <span className="mt-1 block text-xs leading-snug text-muted">{hospital.city}</span>
            </figcaption>
          </figure>
        </Link>
      ))}
    </div>
  );
}
