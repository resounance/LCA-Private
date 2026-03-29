import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Truck, Flame, Weight } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import AnimatedCounter from "./AnimatedCounter";

const quantities = [
  { label: "1 kg", value: 1 },
  { label: "100 kg", value: 100 },
  { label: "500 kg", value: 500 },
  { label: "1 ton", value: 1000 },
];

// Energy saved per kg: 95 - 3.25 = 91.75 MJ
const MJ_SAVED_PER_KG = 91.75;

function getAnalogies(kg: number) {
  const totalMJ = MJ_SAVED_PER_KG * kg;
  const truckKm = Math.round(totalMJ / 36); // diesel ~36 MJ/L, ~1L/km for heavy truck
  const textileDays = parseFloat((totalMJ / (15000)).toFixed(1)); // ~15,000 MJ/day for a textile line
  const aluminumKg = Math.round(totalMJ / 50); // ~50 MJ/kg to melt aluminum
  const furnaceHours = parseFloat((totalMJ / (3750)).toFixed(1)); // ~3,750 MJ/h industrial furnace

  return [
    {
      icon: <Factory className="w-5 h-5 text-foreground shrink-0" />,
      value: textileDays,
      unit: textileDays === 1 ? "day" : "days",
      label: "operating a textile production line",
      decimals: 1,
    },
    {
      icon: <Truck className="w-5 h-5 text-foreground shrink-0" />,
      value: truckKm,
      unit: "km",
      label: "of heavy truck fuel",
      decimals: 0,
    },
    {
      icon: <Weight className="w-5 h-5 text-foreground shrink-0" />,
      value: aluminumKg,
      unit: "kg",
      label: "of aluminum melted",
      decimals: 0,
    },
    {
      icon: <Flame className="w-5 h-5 text-foreground shrink-0" />,
      value: furnaceHours,
      unit: furnaceHours === 1 ? "hour" : "hours",
      label: "of industrial furnace operation",
      decimals: 1,
    },
  ];
}

export default function EnergyEquivalenceCard() {
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
            97% less
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
            Energy saved equals
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
