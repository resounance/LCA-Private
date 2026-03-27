import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "left" | "right";
}

const directionMap = {
  up: { y: 20, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
};

const container = (delay: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
});

const item = (dir: "up" | "left" | "right") => ({
  hidden: { opacity: 0, ...directionMap[dir], filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
});

export function StaggerContainer({ children, className = "", staggerDelay = 0.08 }: StaggerChildrenProps) {
  return (
    <motion.div
      variants={container(staggerDelay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  return (
    <motion.div variants={item(direction)} className={className}>
      {children}
    </motion.div>
  );
}
