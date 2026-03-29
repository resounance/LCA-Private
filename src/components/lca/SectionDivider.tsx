import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <motion.div
        className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-detail/40 to-transparent relative"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-detail/20 to-transparent blur-sm"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
