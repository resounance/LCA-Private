import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navItems = [
  { id: "hero", label: "Overview" },
  { id: "co2", label: "CO₂" },
  { id: "energy", label: "Energy" },
  { id: "water", label: "Water" },
  { id: "waste", label: "Zero Waste" },
];

export default function StickyNav() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;
      const pastThreshold = currentY > 100;

      setVisible(pastThreshold && scrollingUp);
      lastScrollY.current = currentY;

      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="sticky-nav"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="absolute inset-0 glass-filter" />
          <div className="absolute inset-0 glass-overlay" />
          <div className="absolute inset-0 glass-specular" />

          {/* Progress bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-detail origin-left z-10"
            style={{ scaleX }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
            <span className="font-heading font-bold text-sm text-foreground translate-y-[1px]">
              TEX2TEX<span className="text-muted-foreground text-[8px] align-super">®</span>
            </span>
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`text-xs font-medium transition-colors relative pb-1 ${
                    active === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="translate-y-[1px] inline-block">{item.label}</span>
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-detail rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
