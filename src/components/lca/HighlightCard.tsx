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
      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      animate={isVisible ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="deck-card-glass-stat p-6 md:p-8"
    >
      <div className="flex flex-col gap-3">
        <span className="text-4xl md:text-5xl font-heading font-bold text-foreground translate-y-[2px]">
          {percentage}
        </span>
        <span className="text-sm text-muted-foreground font-medium translate-y-[2px]">{comparedTo}</span>
        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-detail/20">
          {equivalenceIcon}
          <span className="text-sm text-detail translate-y-[1px]">{equivalence}</span>
        </div>
      </div>
    </motion.div>
  );
}
