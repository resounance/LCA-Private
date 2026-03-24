import { motion } from "framer-motion";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

interface HighlightCardProps {
  percentage: string;
  comparedTo: string;
  equivalence: string;
  equivalenceIcon: React.ReactNode;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export default function HighlightCard({
  percentage,
  comparedTo,
  equivalence,
  equivalenceIcon,
  bgClass,
  textClass,
  borderClass,
}: HighlightCardProps) {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border ${borderClass} ${bgClass} p-6 md:p-8`}
    >
      <div className="flex flex-col gap-3">
        <span className={`text-4xl md:text-5xl font-display font-bold ${textClass}`}>
          {percentage}
        </span>
        <span className="text-sm text-muted-foreground font-medium">{comparedTo}</span>
        <div className={`flex items-center gap-2 mt-2 pt-3 border-t ${borderClass}`}>
          {equivalenceIcon}
          <span className="text-sm text-muted-foreground">{equivalence}</span>
        </div>
      </div>
    </motion.div>
  );
}
