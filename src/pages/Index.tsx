import StickyNav from "@/components/lca/StickyNav";
import HeroSection from "@/components/lca/HeroSection";
import CO2Section from "@/components/lca/CO2Section";
import EnergySection from "@/components/lca/EnergySection";
import WaterSection from "@/components/lca/WaterSection";
import WasteSection from "@/components/lca/WasteSection";
import Footer from "@/components/lca/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyNav />
      <HeroSection />
      <CO2Section />
      <EnergySection />
      <WaterSection />
      <WasteSection />
      <Footer />
    </div>
  );
};

export default Index;
