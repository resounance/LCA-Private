import { BookOpen } from "lucide-react";
import DeckSection from "./DeckSection";
import SectionHeader from "./SectionHeader";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

const sources = [
  { id: 1, text: "Eco-profiles of the European Plastics Industry Polyethylene Terephthalate (PET) (Bottle grade), Eco-profiles of the European Plastics Industry 2005, I Boustead." },
  { id: 2, text: "Open-loop recycling: A LCA case study of PET bottle-to-fibre recycling, Resources, Conservation and Recycling 55 (2010) 34–52, Li Shen et al." },
  { id: 3, text: "Energy analysis of 108 industrial processes, 207–209. U.S. Department of Energy; 1985, Brown et Al, (as extracted from ref 2)." },
  { id: 4, text: "PET bottles recycling in China: An LCA coupled with LCC case study of blanket production made of waste PET bottles, Journal of Environmental Management 260 (2020) 110062, Ruirui Zhang et al." },
  { id: 5, text: "Amut Friction Washer Cleans Contaminated PET Flakes, Recycling Today, August, 2012." },
  { id: 6, text: 'Bottle Flake Washing "Super Clean Process" (SCP) Description, Bo-Re-Tech Brochure.' },
  { id: 7, text: "Water consumption management in polyethylene terephthalate (PET) bottles washing process via wastewater pretreatment and reuse, Journal of Environmental Management 224 (2018) 215–224, Jablonska." },
  { id: 8, text: "Comparing life cycle energy and GHG emissions of biobased PET, recycled PET, PLA, and man-made cellulosics, Biofuels, Bioprod. Bioref. 6:625–639 (2012), Li Shen et al." },
  { id: 9, text: "State of Analysis of Water Footprint Assessments in Polyester, Cotton & Viscose, Water Footprint Network Stockholm WWW, August 30 2017, Matthews et al." },
  { id: 10, text: "Identifying Low Carbon Sources of Cotton and Polyester Fibers, United Nations Framework Convention on Climate Change 2020 p 78." },
  { id: 11, text: "Life cycle analysis of greenhouse gas emissions of China's power generation, Energy Sci Eng. 2022;10:1083–1095, Zhu et al." },
  { id: 12, text: "Carbon footprint of global natural gas supplies to China, NATURE COMMUNICATIONS (2020) 11:824, Gan et al." },
  { id: 13, text: "The evolution of heavy-duty vehicles in China: A retrospective evaluation of CO2 and pollutant emissions from 2012 to 2021, International Council on Cleaner Transportation Working Paper 2022." },
];

export default function SourcesSection() {
  return (
    <DeckSection id="sources" bg="default">
      <SectionHeader
        badge="Sources"
        title="Benchmark Data Citation"
        subtitle=""
        colorClass="text-foreground"
        bgClass="bg-muted"
        borderClass="border-border"
      />

      <StaggerContainer className="max-w-4xl" staggerDelay={0.05}>
        <StaggerItem>
          <div className="deck-card-glass p-4 md:p-8">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-detail" />
              <h3 className="font-heading font-semibold text-foreground text-xs md:text-sm uppercase tracking-wider translate-y-[1px]">
                References
              </h3>
            </div>
            <ol className="space-y-2 md:space-y-3">
              {sources.map((source) => (
                <li key={source.id} className="flex gap-2 md:gap-3 text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                  <span className="text-detail font-semibold shrink-0 translate-y-[1px]">{source.id}.</span>
                  <span className="translate-y-[1px]">{source.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </DeckSection>
  );
}
