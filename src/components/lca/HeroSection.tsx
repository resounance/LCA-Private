import { motion } from "framer-motion";
import { Cloud, Zap, Droplets, Recycle } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const indicators = [
  { icon: Cloud, value: 0.63, unit: "kg CO₂e", label: "Carbon Emissions", color: "ep-coral", decimals: 2 },
  { icon: Zap, value: 3.25, unit: "MJ", label: "Non-Renewable Energy", color: "ep-purple", decimals: 2 },
  { icon: Droplets, value: 0.19, unit: "L", label: "Water Consumption", color: "ep-teal", decimals: 2 },
  { icon: Recycle, value: 0.0, unit: "kg", label: "Solid Waste", color: "ep-slate", decimals: 1 },
];

function KpiCard({ icon: Icon, value, unit, label, color, decimals, index }: typeof indicators[0] & { index: number }) {
  const { count, ref } = useCountUp(value, 2000);

  const colorMap: Record<string, { bg: string; text: string; icon: string; border: string }> = {
    "ep-coral": { bg: "bg-ep-coral-light", text: "text-ep-coral", icon: "text-ep-coral", border: "border-ep-coral/20" },
    "ep-purple": { bg: "bg-ep-purple-light", text: "text-ep-purple", icon: "text-ep-purple", border: "border-ep-purple/20" },
    "ep-teal": { bg: "bg-ep-teal-light", text: "text-ep-teal", icon: "text-ep-teal", border: "border-ep-teal/20" },
    "ep-slate": { bg: "bg-ep-slate-light", text: "text-ep-slate", icon: "text-ep-slate", border: "border-ep-slate/20" },
  };

  const c = colorMap[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative rounded-2xl border ${c.border} ${c.bg} p-6 flex flex-col items-center text-center gap-3 hover:scale-105 transition-transform duration-300`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.bg}`}>
        <Icon className={`w-6 h-6 ${c.icon}`} />
      </div>
      <div>
        <span className={`text-4xl font-display font-bold ${c.text} tabular-nums`}>
          {count.toFixed(decimals)}
        </span>
        <span className={`text-lg font-display font-medium ${c.text} ml-1`}>{unit}</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ep-coral-light border border-ep-coral/20 mb-6">
            <Recycle className="w-4 h-4 text-ep-coral" />
            <span className="text-xs font-semibold text-ep-coral tracking-wider uppercase">
              Life Cycle Assessment
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tight leading-tight">
            TEX2TEX<span className="text-ep-coral">®</span>
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
