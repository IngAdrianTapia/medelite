import { Link } from "react-router";
import type { HospitalId } from "../data/hospitals";
import { HOSPITALS } from "../data/hospitals";

/** Schematic positions, not a survey. Same reading as the existing sede diagram. */
const PIN: Record<HospitalId, { x: number; y: number }> = {
  penita: { x: 18, y: 58 },
  riviera: { x: 22, y: 62 },
  marina: { x: 26, y: 68 },
  guadalajara: { x: 34, y: 64 },
  chapala: { x: 38, y: 70 },
  sma: { x: 46, y: 58 },
  queretaro: { x: 50, y: 62 },
  cancun: { x: 86, y: 48 },
  playa: { x: 82, y: 56 },
};

export function MexicoMap({ label }: { label: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#06141f] text-white" role="group" aria-label={label}>
      <svg viewBox="0 0 100 100" className="h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="gulf" x1="0" x2="1">
            <stop offset="0" stopColor="#0c3a44" />
            <stop offset="1" stopColor="#12324a" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#gulf)" />
        <path
          d="M14 28 C22 22, 30 24, 36 20 C44 16, 52 22, 58 18 C70 12, 82 20, 88 28 C92 36, 90 46, 86 52 C80 62, 74 58, 70 66 C64 76, 58 82, 50 80 C40 78, 36 70, 30 72 C22 74, 16 66, 14 56 C12 46, 10 36, 14 28 Z"
          fill="#10283a"
          stroke="#c4a574"
          strokeWidth="0.4"
        />
        {HOSPITALS.map((hospital) => {
          const pin = PIN[hospital.id];
          return <circle key={hospital.id} cx={pin.x} cy={pin.y} r="1.3" fill="#c4a574" />;
        })}
      </svg>
      <ul className="absolute inset-0">
        {HOSPITALS.map((hospital) => {
          const pin = PIN[hospital.id];
          return (
            <li key={hospital.id} className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
              <Link
                to={`/red/${hospital.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-2 text-[10px] font-semibold tracking-wide text-gold-line hover:text-white"
              >
                <span className="sr-only">{hospital.name}</span>
                <span aria-hidden="true" className="block h-3 w-3 rounded-full bg-gold-line shadow-[0_0_0_6px_rgba(196,165,116,0.25)]" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
