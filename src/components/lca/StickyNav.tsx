import { useState } from "react";
import { useScroll, useSpring, motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
          className="h-8 md:h-9 brightness-0 invert"
        />
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
              className="text-xs font-medium transition-colors text-white/60 hover:text-white"
            >
              <span className="translate-y-[2px] inline-block">{item.label}</span>
            </a>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-3 gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="text-sm font-medium text-white/70 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="translate-y-[1px] inline-block">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
