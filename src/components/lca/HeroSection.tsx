import { motion } from "framer-motion";
import { Cloud, Zap, Droplets, Recycle } from "lucide-react";
import type { ProductType } from "./ProductSwitcher";
import AnimatedCounter from "./AnimatedCounter";
import tex2texLogo from "@/assets/tex2tex-earthprotex-logo.svg";

const indicators = [
  {
    icon: Cloud, value: 0.63, unit: "kg CO₂e", label: "Carbon Emissions", decimals: 2,
    description: "Total CO₂ emissions for transportation and industrial processes (scope 1 & 2). Measured in kilograms (Kg) per Kg output produced."
  },
  {
    icon: Zap, value: 3.25, unit: "MJ", label: "Non-Renewable Energy", decimals: 2,
    description: "All measured non-renewable energy from transportation and manufacturing processes. Measured in Joules (J) per Kg output produced."
  },
  {
    icon: Droplets, value: 0.19, unit: "L", label: "Water Consumption", decimals: 2,
    description: "Water consumption from industrial processes, based on total water discharged in liters (L) per Kg output produced."
  },
  {
    icon: Recycle, value: 0.0, unit: "kg", label: "Solid Waste Disposal", decimals: 1,
    description: "Solid waste disposal from industrial manufacturing processes. Based on total solid waste disposed in kilograms (Kg) per Kg output produced.",
    asterisk: true,
  },
];

function KpiCard({ icon: Icon, value, unit, label, decimals, description, index }: typeof indicators[0] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.8 + index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.25 } }}
      className="deck-card-glass-stat p-4 md:p-6 flex flex-col items-center text-center gap-2 md:gap-3 group"
    >
      <motion.div
        className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-detail/10"
        whileHover={{ rotate: 8, transition: { duration: 0.3 } }}
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-detail" />
      </motion.div>
      <div>
        <AnimatedCounter
          value={value}
          decimals={decimals}
          className="text-3xl md:text-4xl font-heading font-bold text-foreground tabular-nums translate-y-[1px]"
        />
        <span className="text-base md:text-lg font-heading font-medium text-muted-foreground ml-1 translate-y-[1px]">{unit}</span>
      </div>
      <p className="text-xs md:text-sm text-muted-foreground font-medium translate-y-[1px]">{label}</p>
      <p className="hidden md:block text-[10px] text-muted-foreground/70 leading-snug mt-1">{description}</p>
    </motion.div>
  );
}

export default function HeroSection({ productType = "staple" }: { productType?: ProductType }) {
  return (
    <section id="hero" className="flex flex-col justify-center pt-20 pb-10 md:pt-28 md:pb-16 px-4 relative">
      <motion.div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-detail/10 border border-detail/20 mb-4 md:mb-6"
          >
            <Recycle className="w-3.5 h-3.5 md:w-4 md:h-4 text-detail" />
            <span className="text-[10px] md:text-xs font-semibold text-detail tracking-wider uppercase translate-y-[2px]">
              Life Cycle Assessment
            </span>
          </motion.div>
          <img src={tex2texLogo} alt="Tex2Tex® by Earth Protex™" className="h-20 md:h-40 w-auto mx-auto" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground mt-3 md:mt-4 text-xl md:text-3xl font-heading font-medium translate-y-[1px]"
          >
            Impact Indicators
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-muted-foreground mt-4 md:mt-6 max-w-2xl mx-auto text-xs md:text-sm font-light tracking-wide leading-relaxed"
          >
            Tex2Tex® RPET Life Cycle Assessment data overview. Powered by Tex2Tex® RPET Thermo-Mechanical Reactor™. Compiled data is a combination of 3rd party assessments and internal reporting of Tex2Tex® manufacturing processes with publicly reported industry data benchmarks for illustrated comparisons.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {indicators.map((item, i) => (
            <KpiCard key={item.label} {...item} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center text-[10px] md:text-xs text-muted-foreground mt-6 md:mt-8 italic font-light translate-y-[1px]"
        >
          Based on 1 kg of Tex2Tex® RPET Fiber (Cradle-to-Gate) ·{" "}
          {productType === "staple"
            ? "LCA by Intertek (for Staple Fibers)"
            : "Earth Protex internally published LCA (for Pellets & Filaments)"}
        </motion.p>
      </motion.div>
    </section>
  );
}
