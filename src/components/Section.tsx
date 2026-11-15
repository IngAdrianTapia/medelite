import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Section({
  id,
  children,
  tone = "plain",
}: {
  id?: string;
  children: ReactNode;
  tone?: "plain" | "white" | "navy";
}) {
  const reduce = useReducedMotion();
  const toneClass = tone === "white" ? "bg-ivory" : tone === "navy" ? "bg-navy text-white" : "";
  return (
    <motion.section
      id={id}
      className={`scroll-mt-24 py-20 md:py-28 ${toneClass}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-6xl px-5">{children}</div>
    </motion.section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">
      <span className="mr-3 inline-block h-px w-8 translate-y-[-0.3em] bg-gold-line align-middle" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Title({ children }: { children: ReactNode }) {
  return <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">{children}</h2>;
}

export function Deck({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{children}</p>;
}
