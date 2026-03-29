import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Shirt, Pipette, Waves } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import AnimatedCounter from "./AnimatedCounter";

const quantities = [
  { label: "1 kg", value: 1 },
  { label: "100 kg", value: 100 },
  { label: "500 kg", value: 500 },
  { label: "1 ton", value: 1000 },
];

// Water saved per kg: 65.98 - 0.19 = 65.79 L
const WATER_SAVED_PER_KG = 65.79;

function getAnalogies(kg: number) {
  const totalL = WATER_SAVED_PER_KG * kg;

  // Dyeing 1 kg of fabric uses ~100 L of water
  const dyeingKg = Math.round(totalL / 100);
  // Washing 1 kg of fabric in industrial laundry: ~12 L
  const washingKg = Math.round(totalL / 12);
  // A single cotton t-shirt uses ~2,700 L of water (full lifecycle) — but we'll use industrial process water: ~70 L per t-shirt finishing
  const tshirtFinishing = Math.round(totalL / 70);
  // Industrial fabric rinsing after dyeing: ~50 L per cycle per kg
  const rinsingCycles = Math.round(totalL / 50);

  return [
    {
      icon: <Pipette className="w-5 h-5 text-foreground shrink-0" />,
      value: dyeingKg,
      unit: "kg of fabric",
      label: "worth of industrial dyeing water",
      decimals: 0,
    },
    {
      icon: <Shirt className="w-5 h-5 text-foreground shrink-0" />,
      value: tshirtFinishing,
      unit: tshirtFinishing === 1 ? "t-shirt" : "t-shirts",
      label: "worth of finishing process water",
      decimals: 0,
    },
    {
      icon: <Waves className="w-5 h-5 text-foreground shrink-0" />,
      value: washingKg,
      unit: "kg of fabric",
      label: "worth of industrial washing water",
      decimals: 0,
    },
    {
      icon: <Droplets className="w-5 h-5 text-foreground shrink-0" />,
      value: rinsingCycles,
      unit: rinsingCycles === 1 ? "cycle" : "cycles",
      label: "of post-dye rinsing (1 kg/cycle)",
      decimals: 0,
    },
  ];
}

export default function WaterEquivalenceCard() {
  const [selectedQty, setSelectedQty] = useState(500);
  const { ref, isVisible } = useScrollFadeIn();
  const analogies = getAnalogies(selectedQty);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      animate={isVisible ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="deck-card-glass-stat p-6 md:p-8"
    >
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            99.7% less
          </span>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            than Virgin PET production
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
            Fiber quantity
          </p>
          <div className="flex gap-2">
            {quantities.map((q) => (
              <button
                key={q.value}
                onClick={() => setSelectedQty(q.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedQty === q.value
                    ? "bg-foreground text-background shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Analogies */}
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
            Water saved equals
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedQty}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              {analogies.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  {a.icon}
                  <span className="text-sm text-foreground">
                    <AnimatedCounter
                      value={a.value}
                      decimals={a.decimals}
                      className="font-bold font-heading tabular-nums"
                    />{" "}
                    <span className="font-bold">{a.unit}</span>{" "}
                    <span className="text-muted-foreground">{a.label}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
