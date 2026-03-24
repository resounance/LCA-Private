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
    <section id="water" className="py-20 px-4 bg-ep-teal-light/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Water Usage"
          title="Water Consumption"
          subtitle="Freshwater consumption in liters per 1 kg of fiber. Tex2Tex® recycles over 80% of process water."
          colorClass="text-ep-teal"
          bgClass="bg-ep-teal-light"
          borderClass="border-ep-teal/20"
        />

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <ComparisonChart
              data={data}
              highlightColor="hsl(175 60% 40%)"
              baseColor="hsl(175 60% 78%)"
              unit="L"
            />
          </div>
          <div className="flex flex-col gap-4">
            <HighlightCard
              percentage="99.7% less"
              comparedTo="than Virgin PET production"
              equivalence="Saving 312 glasses of water (200 ml)"
              equivalenceIcon={<GlassWater className="w-5 h-5 text-ep-teal shrink-0" />}
              bgClass="bg-ep-teal-light"
              textClass="text-ep-teal"
              borderClass="border-ep-teal/20"
            />
            <div className="rounded-2xl border border-ep-teal/20 bg-background p-5">
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
