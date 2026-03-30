import { useState } from "react";
import StickyNav from "@/components/lca/StickyNav";
import HeroSection from "@/components/lca/HeroSection";
import CO2Section from "@/components/lca/CO2Section";
import EnergySection from "@/components/lca/EnergySection";
import WaterSection from "@/components/lca/WaterSection";
import WasteSection from "@/components/lca/WasteSection";
import SourcesSection from "@/components/lca/SourcesSection";
import RequestLCAButton from "@/components/lca/RequestLCAButton";
import Footer from "@/components/lca/Footer";
import PasswordGate from "@/components/lca/PasswordGate";
import ContentProtection from "@/components/lca/ContentProtection";
import Watermark from "@/components/lca/Watermark";
import SectionDivider from "@/components/lca/SectionDivider";
import ProductSwitcher, { type ProductType } from "@/components/lca/ProductSwitcher";

const Index = () => {
  const [productType, setProductType] = useState<ProductType>("staple");

  return (
    <PasswordGate>
      <ContentProtection>
        <div className="min-h-screen bg-background">
          <Watermark />
          <StickyNav />
          <HeroSection />
          <ProductSwitcher active={productType} onChange={setProductType} />
          <SectionDivider />
          <CO2Section />
          <SectionDivider />
          <EnergySection />
          <SectionDivider />
          <WaterSection />
          <SectionDivider />
          <WasteSection />
          <SectionDivider />
          <SourcesSection />
          <RequestLCAButton />
          <Footer />
        </div>
      </ContentProtection>
    </PasswordGate>
  );
};

export default Index;
