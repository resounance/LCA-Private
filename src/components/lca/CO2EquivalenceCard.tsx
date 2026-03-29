import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Shirt, Factory, Flame } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import AnimatedCounter from "./AnimatedCounter";

const quantities = [
  { label: "1 kg", value: 1 },
  { label: "100 kg", value: 100 },
  { label: "500 kg", value: 500 },
  { label: "1 ton", value: 1000 },
];

// CO₂ saved per kg of fiber: 4.06 - 0.63 = 3.43 kg CO₂e
const CO2_SAVED_PER_KG = 3.43;

function getAnalogies(kg: number) {
  const totalCO2 = CO2_SAVED_PER_KG * kg;

  // Dyeing 1 kg of fabric emits ~2.5 kg CO₂
  const dyeingKg = Math.round(totalCO2 / 2.5);
  // Producing 1 cotton t-shirt emits ~7 kg CO₂ (full lifecycle)
  const tshirts = Math.round(totalCO2 / 7);
  // A textile factory boiler emits ~250 kg CO₂/h
  const boilerHours = parseFloat((totalCO2 / 250).toFixed(1));
  // Freight transport of textiles: ~0.06 kg CO₂ per ton-km → 1 ton over X km
  const freightKm = Math.round(totalCO2 / 0.06);

  return [
    {
      icon: <Shirt className="w-5 h-5 text-foreground shrink-0" />,
      value: tshirts,
      unit: tshirts === 1 ? "t-shirt" : "t-shirts",
      label: "worth of full lifecycle emissions",
      decimals: 0,
    },
    {
      icon: <Factory className="w-5 h-5 text-foreground shrink-0" />,
      value: dyeingKg,
      unit: "kg of fabric",
      label: "worth of dyeing emissions",
      decimals: 0,
    },
    {
      icon: <Flame className="w-5 h-5 text-foreground shrink-0" />,
      value: boilerHours,
      unit: boilerHours === 1 ? "hour" : "hours",
      label: "of textile factory boiler operation",
      decimals: 1,
    },
    {
      icon: <Truck className="w-5 h-5 text-foreground shrink-0" />,
      value: freightKm,
      unit: "km",
      label: "of textile freight transport (1 ton)",
      decimals: 0,
    },
  ];
}

export default function CO2EquivalenceCard() {
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
            84% less
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
            CO₂ saved equals
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
