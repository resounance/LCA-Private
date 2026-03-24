import { Car } from "lucide-react";
import ComparisonChart from "./ComparisonChart";
import HighlightCard from "./HighlightCard";
import SectionHeader from "./SectionHeader";

const data = [
  { name: "Tex2Tex®", value: 0.63, isHighlight: true },
  { name: "Bottle Thermo-Mech.", value: 0.96 },
  { name: "via Pellets", value: 1.88 },
  { name: "Chemical BHE", value: 2.59 },
  { name: "Chemical DMT", value: 3.08 },
  { name: "Virgin PET", value: 4.06 },
];

export default function CO2Section() {
  return (
    <section id="co2" className="py-20 px-4 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Carbon Footprint"
          title="CO₂ Emissions"
          subtitle="Global warming potential measured in kg CO₂ equivalents per 1 kg of fiber produced."
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
              unit="kg CO₂e"
            />
          </div>
          <div className="flex flex-col gap-4">
            <HighlightCard
              percentage="84% less"
              comparedTo="than Virgin PET production"
              equivalence="Equivalent to driving a car 28 km"
              equivalenceIcon={<Car className="w-5 h-5 text-foreground shrink-0" />}
              bgClass="bg-muted"
              textClass="text-foreground"
              borderClass="border-border"
            />
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tex2Tex® achieves the lowest carbon footprint of any RPET fiber process by using a{" "}
                <strong className="text-foreground">short-loop, direct fiber-to-fiber</strong> conversion
                that eliminates energy-intensive intermediate steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
