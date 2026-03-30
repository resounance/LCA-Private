import { Car } from "lucide-react";
import ComparisonChart from "./ComparisonChart";
import HighlightCard from "./HighlightCard";
import SectionHeader from "./SectionHeader";
import DeckSection from "./DeckSection";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

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
    <DeckSection id="co2" bg="glass" fullHeight>
      <SectionHeader
        badge="Carbon Footprint"
        title="CO₂ Emissions"
        subtitle="Global warming potential measured in kg CO₂ equivalents per 1 kg of fiber produced."
        colorClass="text-foreground"
        bgClass="bg-muted"
        borderClass="border-border"
      />

      <StaggerContainer className="grid lg:grid-cols-3 gap-8 items-start" staggerDelay={0.12}>
        <StaggerItem className="lg:col-span-2">
          <ComparisonChart
            data={data}
            unit="kg CO₂e"
          />
        </StaggerItem>
        <StaggerItem className="flex flex-col gap-4">
          <HighlightCard
            percentage="84% less"
            comparedTo="than Virgin PET production"
            equivalence="Per kg of fiber, the CO₂ saved equals a car driving 28 km"
            equivalenceIcon={<Car className="w-5 h-5 text-detail shrink-0" />}
          />
          <div className="deck-card-glass p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tex2Tex® achieves the lowest carbon footprint of any RPET fiber process as all publicly available LCA data. This is achieved
              through our efficient <strong className="text-foreground">Thermo-Mechanical Reactor™</strong> and direct fiber-to-fiber
              conversion that eliminates energy-intensive intermediate steps.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </DeckSection>
  );
}
