import { motion } from "framer-motion";
import { Cloud, Zap, Droplets, Recycle } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const indicators = [
  { icon: Cloud, value: 0.63, unit: "kg CO₂e", label: "Carbon Emissions", decimals: 2 },
  { icon: Zap, value: 3.25, unit: "MJ", label: "Non-Renewable Energy", decimals: 2 },
  { icon: Droplets, value: 0.19, unit: "L", label: "Water Consumption", decimals: 2 },
  { icon: Recycle, value: 0.0, unit: "kg", label: "Solid Waste", decimals: 1 },
];

function KpiCard({ icon: Icon, value, unit, label, decimals, index }: typeof indicators[0] & { index: number }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center gap-3 hover:scale-105 transition-transform duration-300"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
        <Icon className="w-6 h-6 text-foreground" />
      </div>
      <div>
        <span className="text-4xl font-display font-bold text-foreground tabular-nums">
          {count.toFixed(decimals)}
        </span>
        <span className="text-lg font-display font-medium text-muted-foreground ml-1">{unit}</span>
      </div>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Recycle className="w-4 h-4 text-foreground" />
            <span className="text-xs font-semibold text-foreground tracking-wider uppercase">
              Life Cycle Assessment
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tight leading-tight">
            TEX2TEX<span className="text-muted-foreground">®</span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-5xl font-medium">
              Impact Indicators
            </span>
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl mx-auto text-lg">
            Staple fiber measured impact data — the most sustainable RPET fiber production process available.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {indicators.map((item, i) => (
            <KpiCard key={item.label} {...item} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-xs text-muted-foreground mt-8 italic"
        >
          Based on 1 kg of Tex2Tex® RPET Fiber (Cradle-to-Gate) · LCA by EarthProtex
        </motion.p>
      </div>
    </section>
  );
}
