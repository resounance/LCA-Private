import { GlassWater } from "lucide-react";
import ComparisonChart from "./ComparisonChart";
import HighlightCard from "./HighlightCard";
import SectionHeader from "./SectionHeader";

const data = [
  { name: "Tex2Tex®", value: 0.19, isHighlight: true },
  { name: "Bottle Thermo-Mech.", value: 2.31 },
  { name: "Virgin PET", value: 65.98 },
];

export default function WaterSection() {
  return (
    <section id="water" className="py-20 px-4 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Water Usage"
          title="Water Consumption"
          subtitle="Freshwater consumption in liters per 1 kg of fiber. Tex2Tex® recycles over 80% of process water."
          colorClass="text-foreground"
          bgClass="bg-muted"
          borderClass="border-border"
        />

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <ComparisonChart
              data={data}
              highlightColor="hsl(0 0% 15%)"
              baseColor="hsl(0 0% 75%)"
              unit="L"
            />
          </div>
          <div className="flex flex-col gap-4">
            <HighlightCard
              percentage="99.7% less"
              comparedTo="than Virgin PET production"
              equivalence="Saving 312 glasses of water (200 ml)"
              equivalenceIcon={<GlassWater className="w-5 h-5 text-foreground shrink-0" />}
              bgClass="bg-muted"
              textClass="text-foreground"
              borderClass="border-border"
            />
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Only <strong className="text-foreground">0.19 liters</strong> of fresh water per kg — with{" "}
                <strong className="text-foreground">80%+ recycled</strong> in a closed-loop system. Virgin PET
                uses nearly 66 liters for the same output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
