import { motion } from "framer-motion";
import { Leaf, RotateCcw, Factory } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import SectionHeader from "./SectionHeader";

export default function WasteSection() {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section id="waste" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Circular Production"
          title="Zero Solid Waste"
          subtitle="Tex2Tex® achieves complete waste elimination through circular production design."
          colorClass="text-foreground"
          bgClass="bg-muted"
          borderClass="border-border"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="rounded-2xl border border-border bg-muted p-8 flex flex-col items-center text-center gap-4 md:col-span-1">
            <div className="w-20 h-20 rounded-2xl bg-foreground/5 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-foreground" />
            </div>
            <span className="text-5xl font-display font-bold text-foreground">0.0 kg</span>
            <p className="text-sm text-muted-foreground font-medium">Solid waste per kg of fiber</p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">Circular Production</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All process residuals are captured and recycled back into the production cycle. No textile
                  waste leaves the facility — creating a truly closed-loop manufacturing system.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">Zero Waste Handling</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Even off-spec fiber and production dust are reprocessed. The Tex2Tex® system eliminates
                  landfill contribution entirely — something no other RPET process achieves at scale.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
