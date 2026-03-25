import StickyNav from "@/components/lca/StickyNav";
import HeroSection from "@/components/lca/HeroSection";
import CO2Section from "@/components/lca/CO2Section";
import EnergySection from "@/components/lca/EnergySection";
import WaterSection from "@/components/lca/WaterSection";
import WasteSection from "@/components/lca/WasteSection";
import Footer from "@/components/lca/Footer";
import PasswordGate from "@/components/lca/PasswordGate";
import ContentProtection from "@/components/lca/ContentProtection";
import Watermark from "@/components/lca/Watermark";

const Index = () => {
  return (
    <PasswordGate>
      <ContentProtection>
        <div className="min-h-screen bg-background">
          <Watermark />
          <StickyNav />
          <HeroSection />
          <CO2Section />
          <EnergySection />
          <WaterSection />
          <WasteSection />
          <Footer />
        </div>
      </ContentProtection>
    </PasswordGate>
  );
};

export default Index;

export default Index;
