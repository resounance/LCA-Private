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
    <div ref={ref} className="mb-8 md:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-detail/10 border border-detail/20 mb-3 md:mb-4"
      >
        <span className="text-xs font-semibold text-detail tracking-wider uppercase translate-y-[2px]">{badge}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl md:text-4xl font-heading font-bold text-foreground translate-y-[1px]"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-muted-foreground mt-2 md:mt-3 max-w-2xl text-sm md:text-base font-light translate-y-[1px]"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
