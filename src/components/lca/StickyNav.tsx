import { useScroll, useSpring, motion } from "framer-motion";
import earthprotexLogo from "@/assets/earthprotex-logo.svg";

const navItems = [
  { id: "hero", label: "Overview" },
  { id: "co2", label: "CO₂" },
  { id: "energy", label: "Energy" },
  { id: "water", label: "Water" },
  { id: "waste", label: "Zero Waste" },
];

export default function StickyNav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-detail origin-left z-10"
        style={{ scaleX }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
        <img
          src={earthprotexLogo}
          alt="Earth Protex"
          className="h-6 brightness-0 invert"
        />
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-medium transition-colors text-white/60 hover:text-white"
            >
              <span className="translate-y-[2px] inline-block">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
