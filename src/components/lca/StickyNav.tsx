import { useState, useEffect } from "react";

const navItems = [
  { id: "hero", label: "Overview" },
  { id: "co2", label: "CO₂" },
  { id: "energy", label: "Energy" },
  { id: "water", label: "Water" },
  { id: "waste", label: "Zero Waste" },
];

export default function StickyNav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="font-display font-bold text-sm tracking-wider text-foreground">
          TEX2TEX<span className="text-ep-coral">®</span>
        </span>
        <div className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                active === item.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
