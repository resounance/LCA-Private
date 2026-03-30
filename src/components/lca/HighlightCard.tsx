import { motion } from "framer-motion";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

interface HighlightCardProps {
  percentage: string;
  comparedTo: string;
  equivalence: string;
  equivalenceIcon: React.ReactNode;
  bgClass?: string;
  textClass?: string;
  borderClass?: string;
}

export default function HighlightCard({
  percentage,
  comparedTo,
  equivalence,
  equivalenceIcon,
}: HighlightCardProps) {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.93, y: 12, filter: "blur(6px)" }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 30px -10px hsl(270 14% 56% / 0.3)", transition: { duration: 0.25 } }}
      className="deck-card-glass-stat p-5 md:p-8"
    >
      <div className="flex flex-col gap-2 md:gap-3">
        <span className="text-3xl md:text-5xl font-heading font-bold text-foreground translate-y-[2px]">
          {percentage}
        </span>
        <span className="text-xs md:text-sm text-muted-foreground font-medium translate-y-[2px]">{comparedTo}</span>
        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-detail/20">
          {equivalenceIcon}
          <span className="text-xs md:text-sm text-detail translate-y-[1px]">{equivalence}</span>
        </div>
      </div>
    </motion.div>
  );
}
