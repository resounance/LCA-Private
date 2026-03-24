import { motion } from "framer-motion";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export default function SectionHeader({ badge, title, subtitle, colorClass, bgClass, borderClass }: SectionHeaderProps) {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bgClass} border ${borderClass} mb-4`}>
        <span className={`text-xs font-semibold ${colorClass} tracking-wider uppercase`}>{badge}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground mt-3 max-w-2xl text-base">{subtitle}</p>
    </motion.div>
  );
}
