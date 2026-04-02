import { Lightbulb } from "lucide-react";
import ComparisonChart from "./ComparisonChart";
import HighlightCard from "./HighlightCard";
import SectionHeader from "./SectionHeader";
import DeckSection from "./DeckSection";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

const data = [
  { name: "Tex2Tex® RPET", value: 3.25, isHighlight: true },
  { name: "Bottle Thermo-Mechanical", value: 13 },
  { name: "Bottle Thermo-Mechanical via Pellets", value: 23 },
  { name: "Bottle Chemical (BHET Method)", value: 39 },
  { name: "Bottle Chemical (DMT Method)", value: 51 },
  { name: "Virgin PET", value: 95 },
];

export default function EnergySection() {
  return (
    <DeckSection id="energy" bg="default" fullHeight>
      <SectionHeader
        badge="Energy Demand"
        title="Non-Renewable Energy"
        subtitle="Cumulative energy demand from non-renewable sources (MJ) per 1 kg of fiber."
        colorClass="text-foreground"
        bgClass="bg-muted"
        borderClass="border-border"
      />

      <StaggerContainer className="grid lg:grid-cols-3 gap-4 md:gap-8 items-start" staggerDelay={0.12}>
        <StaggerItem className="lg:col-span-2">
          <ComparisonChart
            data={data}
            unit="MJ"
            formatValue={(v) => v.toFixed(1)}
            yTicks={[0, 20, 40, 60, 80, 100]}
            yDomain={[0, 100]}
          />
        </StaggerItem>
        <StaggerItem className="flex flex-col gap-4">
          <HighlightCard
            percentage="97% less"
            comparedTo="than Virgin PET production"
            equivalence="Per kg of fiber, the energy saved could power a 60W light for 424 hours"
            equivalenceIcon={<Lightbulb className="w-5 h-5 text-detail shrink-0" />}
          />
          <div className="deck-card-glass p-4 md:p-5">
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Virgin PET consumes <strong className="text-foreground">29× more energy</strong> than
              Tex2Tex<span className="text-[0.6em] align-super">®</span>. Even the best alternative recycling process uses 4× as much non-renewable energy.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </DeckSection>
  );
}
