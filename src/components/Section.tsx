import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Section({
  id,
  children,
  tone = "plain",
}: {
  id?: string;
  children: ReactNode;
  tone?: "plain" | "white";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={`scroll-mt-24 py-16 md:py-24 ${tone === "white" ? "bg-white" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5">{children}</div>
    </motion.section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{children}</p>;
}

export function Title({ children }: { children: ReactNode }) {
  return <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">{children}</h2>;
}

export function Deck({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{children}</p>;
}
