import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DeckSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  bg?: "default" | "muted" | "glass";
  revealDirection?: "up" | "left" | "right";
}

const bgMap = {
  default: "bg-background",
  muted: "bg-muted/50",
  glass: "glass-section-bg",
};

const getInitial = (dir: "up" | "left" | "right") => {
  if (dir === "left") return { opacity: 0, x: -30, filter: "blur(4px)" };
  if (dir === "right") return { opacity: 0, x: 30, filter: "blur(4px)" };
  return { opacity: 0, y: 24, filter: "blur(4px)" };
};

const getAnimate = (dir: "up" | "left" | "right") => {
  if (dir === "left" || dir === "right") return { opacity: 1, x: 0, filter: "blur(0px)" };
  return { opacity: 1, y: 0, filter: "blur(0px)" };
};

export default function DeckSection({ children, className = "", id, fullHeight = false, bg = "default", revealDirection = "up" }: DeckSectionProps) {
  return (
    <motion.section
      id={id}
      initial={getInitial(revealDirection)}
      whileInView={getAnimate(revealDirection)}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`${fullHeight ? "deck-section" : "deck-section-short"} ${bgMap[bg]} ${className}`}
    >
      <div className="deck-container w-full">{children}</div>
    </motion.section>
  );
}
