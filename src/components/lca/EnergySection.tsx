import { Lightbulb } from "lucide-react";
import ComparisonChart from "./ComparisonChart";
import HighlightCard from "./HighlightCard";
import SectionHeader from "./SectionHeader";

const data = [
  { name: "Tex2Tex®", value: 3.25, isHighlight: true },
  { name: "Bottle Thermo-Mech.", value: 13 },
  { name: "via Pellets", value: 23 },
  { name: "Chemical BHE", value: 39 },
  { name: "Chemical DMT", value: 51 },
  { name: "Virgin PET", value: 95 },
];

export default function EnergySection() {
  return (
    <section id="energy" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Energy Demand"
          title="Non-Renewable Energy"
          subtitle="Cumulative energy demand from non-renewable sources (MJ) per 1 kg of fiber."
          colorClass="text-ep-purple"
          bgClass="bg-ep-purple-light"
          borderClass="border-ep-purple/20"
        />

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <ComparisonChart
              data={data}
              highlightColor="hsl(270 50% 45%)"
              baseColor="hsl(270 50% 82%)"
              unit="MJ"
              formatValue={(v) => v.toFixed(1)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <HighlightCard
              percentage="97% less"
              comparedTo="than Virgin PET production"
              equivalence="Powering a 60W light for 424 hours"
              equivalenceIcon={<Lightbulb className="w-5 h-5 text-ep-purple shrink-0" />}
              bgClass="bg-ep-purple-light"
              textClass="text-ep-purple"
              borderClass="border-ep-purple/20"
            />
            <div className="rounded-2xl border border-ep-purple/20 bg-background p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Virgin PET consumes <strong className="text-foreground">29× more energy</strong> than
                Tex2Tex®. Even the best alternative recycling process uses 4× as much non-renewable energy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
