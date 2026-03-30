import { useState } from "react";
import { motion } from "framer-motion";
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
          <HeroSection productType={productType} />
          <ProductSwitcher active={productType} onChange={setProductType} />
          <SectionDivider />
          {productType === "staple" ? (
            <>
              <CO2Section />
              <SectionDivider />
              <EnergySection />
              <SectionDivider />
              <WaterSection />
              <SectionDivider />
              <WasteSection />
              <SectionDivider />
              <SourcesSection />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-32 px-4"
            >
              <div className="deck-card-glass p-10 text-center max-w-md">
                <p className="text-2xl font-heading font-semibold text-foreground mb-3">
                  Data Forthcoming
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  LCA data for {productType === "pellets" ? "Pellets" : "Filaments"} is currently being compiled and will be available soon.
                </p>
              </div>
            </motion.div>
          )}
          <RequestLCAButton />
          <Footer />
        </div>
      </ContentProtection>
    </PasswordGate>
  );
};

export default Index;
