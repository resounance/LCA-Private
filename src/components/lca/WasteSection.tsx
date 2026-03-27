import { Leaf, RotateCcw, Factory } from "lucide-react";
import SectionHeader from "./SectionHeader";
import DeckSection from "./DeckSection";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

export default function WasteSection() {
  return (
    <DeckSection id="waste" bg="default" fullHeight>
      <SectionHeader
        badge="Circular Production"
        title="Zero Solid Waste"
        subtitle="Tex2Tex® achieves complete waste elimination through circular production design."
        colorClass="text-foreground"
        bgClass="bg-muted"
        borderClass="border-border"
      />

      <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
        <StaggerItem className="md:col-span-1">
          <div className="deck-card-glass-stat p-8 flex flex-col items-center text-center gap-4 h-full">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-foreground" />
            </div>
            <span className="text-5xl font-heading font-bold text-foreground">0.0 kg</span>
            <p className="text-sm text-muted-foreground font-medium">Solid waste per kg of fiber</p>
          </div>
        </StaggerItem>

        <StaggerItem className="md:col-span-2">
          <div className="flex flex-col gap-4">
            <div className="deck-card-glass p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Circular Production</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All process residuals are captured and recycled back into the production cycle. No textile
                  waste leaves the facility — creating a truly closed-loop manufacturing system.
                </p>
              </div>
            </div>

            <div className="deck-card-glass p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Zero Waste Handling</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Even off-spec fiber and production dust are reprocessed. The Tex2Tex® system eliminates
                  landfill contribution entirely — something no other RPET process achieves at scale.
                </p>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </DeckSection>
  );
}
