export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <span className="font-display font-bold text-sm tracking-wider text-foreground">
            EARTHPROTEX
          </span>
          <p className="text-xs text-muted-foreground mt-1">
            Tex2Tex® RPET Fiber — Life Cycle Assessment Data
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} EarthProtex. All data based on independent LCA analysis.
        </p>
      </div>
    </footer>
  );
}
