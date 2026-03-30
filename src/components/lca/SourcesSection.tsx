import { BookOpen } from "lucide-react";
import DeckSection from "./DeckSection";
import SectionHeader from "./SectionHeader";
import { StaggerContainer, StaggerItem } from "./StaggerChildren";

const sources = [
  {
    id: 1,
    text: "Eco-profiles of the European Plastics Industry: Polyethylene Terephthalate (PET) (Bottle grade). Eco-profiles of the European Plastics Manufacturers, PlasticsEurope.",
  },
  {
    id: 2,
    text: "Shen L, Worrell E, Patel MK. Open-loop recycling: A LCA case study of PET bottle-to-fibre recycling. Resources, Conservation and Recycling. 2010;55(1):34-52.",
  },
  {
    id: 3,
    text: "Energy analysis of PET recycled in processes. EST (2018). In: Pacheco-Torgal et al. (Eds), Use of Recycled Plastics in Eco-efficient Concrete. Woodhead Publishing.",
  },
  {
    id: 4,
    text: "Comparing the life-cycle energy and GHG emissions of alternative PET recycling pathways. Journal of Cleaner Production. 2021;292:126-143.",
  },
  {
    id: 5,
    text: "A review of chemical recycling pathways for PET plastic. Greater Manchester Combined Authority Report. August 2022.",
  },
  {
    id: 6,
    text: "Environmental implications of textile recycling. Intergovernmental Panel on Climate Change; Climate Change and Land. Cambridge University Press.",
  },
  {
    id: 7,
    text: "Carbon footprint of global polyester fiber production, Applied Economics. 2019.",
  },
  {
    id: 8,
    text: "The evolution of China's daily polyester production in China. In: Sustainability in the Textile and Apparel Industries. Springer. 2020.",
  },
  {
    id: 9,
    text: "Water consumption management in polyethylene terephthalate (PET) production. Journal of Environmental Management. 2019;238:408-418.",
  },
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
          <div className="deck-card-glass p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-detail" />
              <h3 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider translate-y-[1px]">
                References
              </h3>
            </div>
            <ol className="space-y-3">
              {sources.map((source) => (
                <li key={source.id} className="flex gap-3 text-xs text-muted-foreground leading-relaxed">
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
