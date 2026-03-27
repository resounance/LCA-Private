import { motion, useScroll, useTransform } from "framer-motion";
import { Cloud, Zap, Droplets, Recycle } from "lucide-react";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";

const indicators = [
  { icon: Cloud, value: 0.63, unit: "kg CO₂e", label: "Carbon Emissions", decimals: 2 },
  { icon: Zap, value: 3.25, unit: "MJ", label: "Non-Renewable Energy", decimals: 2 },
  { icon: Droplets, value: 0.19, unit: "L", label: "Water Consumption", decimals: 2 },
  { icon: Recycle, value: 0.0, unit: "kg", label: "Solid Waste", decimals: 1 },
];

function KpiCard({ icon: Icon, value, unit, label, decimals, index }: typeof indicators[0] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="deck-card-glass-stat p-6 flex flex-col items-center text-center gap-3"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted/50">
        <Icon className="w-6 h-6 text-foreground" />
      </div>
      <div>
        <AnimatedCounter
          value={value}
          decimals={decimals}
          className="text-4xl font-heading font-bold text-foreground tabular-nums"
        />
        <span className="text-lg font-heading font-medium text-muted-foreground ml-1">{unit}</span>
      </div>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-8%"]);

  return (
    <section ref={sectionRef} id="hero" className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-4 relative">
      <motion.div
        className="max-w-6xl mx-auto w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Recycle className="w-4 h-4 text-foreground" />
            <span className="text-xs font-semibold text-foreground tracking-wider uppercase">
              Life Cycle Assessment
            </span>
          </div>
          <h1 className="font-heading font-black text-foreground tracking-tight leading-[0.95]" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            TEX2TEX<span className="text-muted-foreground">®</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground mt-4 text-2xl md:text-3xl font-heading font-medium"
          >
            Impact Indicators
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-muted-foreground mt-6 max-w-xl mx-auto text-base font-light tracking-wide"
          >
            Staple fiber measured impact data — the most sustainable RPET fiber production process available.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {indicators.map((item, i) => (
            <KpiCard key={item.label} {...item} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center text-xs text-muted-foreground mt-8 italic font-light"
        >
          Based on 1 kg of Tex2Tex® RPET Fiber (Cradle-to-Gate) · LCA by EarthProtex
        </motion.p>
      </motion.div>
    </section>
  );
}
