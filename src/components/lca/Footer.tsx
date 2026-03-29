import tex2texLogo from "@/assets/tex2tex-earthprotex-logo.svg";

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-detail/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={tex2texLogo} alt="Tex2Tex® by Earth Protex™" className="h-8 w-auto" />
          <p className="text-xs text-muted-foreground translate-y-[1px]">
            Tex2Tex® RPET Fiber · Life Cycle Assessment Data
          </p>
        </div>
        <p className="text-xs text-muted-foreground translate-y-[1px]">
          © {new Date().getFullYear()} EarthProtex. All data based on independent LCA analysis.
        </p>
      </div>
    </footer>
  );
}
