import { GlassWater } from "lucide-react";
import ComparisonChart from "./ComparisonChart";
import HighlightCard from "./HighlightCard";
import SectionHeader from "./SectionHeader";
import DeckSection from "./DeckSection";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

const data = [
  { name: "Tex2Tex® RPET", value: 0.19, isHighlight: true },
  { name: "Bottle Thermo-Mechanical", value: 2.31 },
  { name: "Virgin PET", value: 65.98 },
];

export default function WaterSection() {
  return (
    <DeckSection id="water" bg="glass" fullHeight>
      <SectionHeader
        badge="Water Usage"
        title="Water Consumption"
        subtitle="Freshwater consumption in liters per 1 kg of fiber — Tex2Tex® recycles over 80% of process water."
        colorClass="text-foreground"
        bgClass="bg-muted"
        borderClass="border-border"
      />

      <StaggerContainer className="grid lg:grid-cols-3 gap-4 md:gap-8 items-start" staggerDelay={0.12}>
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
          <div className="deck-card-glass p-4 md:p-5">
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Tex2Tex<span className="text-[0.6em] align-super">®</span> discharges extremely low volumes of water (<strong className="text-foreground">0.19 l/kg</strong>). Over <strong className="text-foreground">80% rate of water recycling</strong>. Very low COD and is treated on-site. Water is only used in the Tex2Tex<span className="text-[0.6em] align-super">®</span> process for heat setting, drafting and the application of spinning oils. In comparison, bottle flake RPET requires significant washing water.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </DeckSection>
  );
}
