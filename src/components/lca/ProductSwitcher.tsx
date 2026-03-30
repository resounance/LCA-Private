import { motion } from "framer-motion";

const productTypes = [
  { id: "staple", label: "Staple Fibers" },
  { id: "pellets", label: "Pellets" },
  { id: "filaments", label: "Filaments" },
] as const;

export type ProductType = (typeof productTypes)[number]["id"];

interface ProductSwitcherProps {
  active: ProductType;
  onChange: (type: ProductType) => void;
}

export default function ProductSwitcher({ active, onChange }: ProductSwitcherProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted/60 border border-border/50 backdrop-blur-sm">
        {productTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 translate-y-[1px] ${
              active === type.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active === type.id && (
              <motion.div
                layoutId="product-switcher-bg"
                className="absolute inset-0 rounded-full bg-background border border-detail/30 shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
