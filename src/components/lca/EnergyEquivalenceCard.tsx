import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, Scissors, Pipette, Waves } from "lucide-react";
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

  // ~25 MJ to produce one cotton t-shirt (spinning, weaving, cutting, sewing, finishing)
  const tshirts = Math.round(totalMJ / 25);
  // ~60 MJ to produce one pair of jeans (full manufacturing process)
  const jeans = Math.round(totalMJ / 60);
  // Industrial dyeing batch: ~500 MJ per batch (~200 kg of fabric)
  const dyeBatches = parseFloat((totalMJ / 500).toFixed(1));
  // Industrial spinning frame: ~15 kW ≈ 54 MJ/h
  const spinningHours = parseFloat((totalMJ / 54).toFixed(1));

  return [
    {
      icon: <Shirt className="w-5 h-5 text-foreground shrink-0" />,
      value: tshirts,
      unit: tshirts === 1 ? "t-shirt" : "t-shirts",
      label: "worth of production energy",
      decimals: 0,
    },
    {
      icon: <Scissors className="w-5 h-5 text-foreground shrink-0" />,
      value: jeans,
      unit: jeans === 1 ? "pair of jeans" : "jeans",
      label: "worth of full manufacturing energy",
      decimals: 0,
    },
    {
      icon: <Pipette className="w-5 h-5 text-foreground shrink-0" />,
      value: dyeBatches,
      unit: dyeBatches === 1 ? "batch" : "batches",
      label: "of industrial fabric dyeing",
      decimals: 1,
    },
    {
      icon: <Waves className="w-5 h-5 text-foreground shrink-0" />,
      value: spinningHours,
      unit: spinningHours === 1 ? "hour" : "hours",
      label: "of spinning frame operation",
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
