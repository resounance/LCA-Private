import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

export default function RequestLCAButton() {
  const { ref, isVisible } = useScrollFadeIn();

  const handleClick = () => {
    const subject = encodeURIComponent("Request Full LCA Report - Tex2Tex®");
    const body = encodeURIComponent(
      "Hello,\n\nI would like to request the full Life Cycle Assessment report for Tex2Tex® RPET Fiber.\n\nThank you."
    );
    window.location.href = `mailto:info@earthprotex.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center py-8 md:py-10 px-4"
    >
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.04, boxShadow: "0 8px 30px -10px hsl(270 14% 56% / 0.4)" }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-detail text-white font-heading font-semibold text-sm md:text-base shadow-lg transition-colors hover:bg-detail/90"
      >
        <Mail className="w-5 h-5" />
        <span className="translate-y-[1px]">Request Full LCA</span>
      </motion.button>
    </motion.div>
  );
}
