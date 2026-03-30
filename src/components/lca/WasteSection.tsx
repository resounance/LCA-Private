import { Leaf, RotateCcw, Factory, BarChart3 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import DeckSection from "./DeckSection";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

export default function WasteSection() {
  return (
    <DeckSection id="waste" bg="default" fullHeight>
      <SectionHeader
        badge="Circular Production"
        title="Zero Solid Waste"
        subtitle="Staple Fiber Benchmarking data TBD"
        colorClass="text-foreground"
        bgClass="bg-muted"
        borderClass="border-border"
      />

      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.1}>
        <StaggerItem className="md:col-span-1">
          <div className="deck-card-glass-stat p-6 md:p-8 flex flex-col items-center text-center gap-3 md:gap-4 h-full">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-muted/50 flex items-center justify-center">
              <Leaf className="w-7 h-7 md:w-10 md:h-10 text-detail" />
            </div>
            <span className="text-4xl md:text-5xl font-heading font-bold text-foreground translate-y-[2px]">0.0 kg</span>
            <p className="text-xs md:text-sm text-muted-foreground font-medium translate-y-[1px]">Solid waste per kg of fiber</p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="deck-card-glass p-4 md:p-6 flex items-start gap-3 md:gap-4 h-full">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-detail" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1 text-sm md:text-base translate-y-[1px]">Circular Production</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                100% of Tex2Tex® solid production wastage polymers from fiber, yarn and fabric production are recycled back into Tex2Tex® Fibers.
              </p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="deck-card-glass p-4 md:p-6 flex items-start gap-3 md:gap-4 h-full">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
              <Factory className="w-4 h-4 md:w-5 md:h-5 text-detail" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1 text-sm md:text-base translate-y-[1px]">Zero Solid Waste Handling</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Regulatory Alignment — Due to regulatory changes, 0.0163 kg (0.0 kg) of non-polymer production waste is now managed through government-incineration, replacing previous factory down-cycling practices.
              </p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="deck-card-glass p-4 md:p-6 flex items-start gap-3 md:gap-4 h-full">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-detail" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1 text-sm md:text-base translate-y-[1px]">Benchmarking</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Most other recycling systems have high wastage. Further benchmarking data still needs to be collected.
              </p>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </DeckSection>
  );
}
