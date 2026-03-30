import { GlassWater } from "lucide-react";
import ComparisonChart from "./ComparisonChart";
import HighlightCard from "./HighlightCard";
import SectionHeader from "./SectionHeader";
import DeckSection from "./DeckSection";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

const data = [
  { name: "Tex2Tex®", value: 0.19, isHighlight: true },
  { name: "Bottle Thermo-Mech.", value: 2.31 },
  { name: "Virgin PET", value: 65.98 },
];

export default function WaterSection() {
  return (
    <DeckSection id="water" bg="glass" fullHeight>
      <SectionHeader
        badge="Water Usage"
        title="Water Consumption"
        subtitle="Freshwater consumption in liters per 1 kg of fiber. Tex2Tex® recycles over 80% of process water."
        colorClass="text-foreground"
        bgClass="bg-muted"
        borderClass="border-border"
      />

      <StaggerContainer className="grid lg:grid-cols-3 gap-8 items-start" staggerDelay={0.12}>
        <StaggerItem className="lg:col-span-2">
          <ComparisonChart
            data={data}
            unit="L"
            yTicks={[0, 10, 20, 30, 40, 50, 60, 70]}
            yDomain={[0, 70]}
          />
        </StaggerItem>
        <StaggerItem className="flex flex-col gap-4">
          <HighlightCard
            percentage="99.7% less"
            comparedTo="than Virgin PET production"
            equivalence="Saving 312 glasses of water (200 ml)"
            equivalenceIcon={<GlassWater className="w-5 h-5 text-detail shrink-0" />}
          />
          <div className="deck-card-glass p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Only <strong className="text-foreground">0.19 liters</strong> of fresh water per kg, with{" "}
              <strong className="text-foreground">80%+ recycled</strong> in a closed-loop system. Virgin PET
              uses nearly 66 liters for the same output.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </DeckSection>
  );
}
