import { useEffect, useState } from "react";
import earthprotexLogo from "@/assets/earthprotex-logo.svg";

const Watermark = () => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString("pt-BR"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleString("pt-BR"));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const items = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-32 gap-y-28 p-8"
        style={{
          transform: "rotate(-30deg) scale(1.5)",
          transformOrigin: "center center",
          opacity: 0.045,
        }}
      >
        {items.map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <img
              src={earthprotexLogo}
              alt=""
              className="w-32 h-auto"
              draggable={false}
            />
            <span className="text-foreground text-[10px] font-medium whitespace-nowrap font-['Space_Grotesk'] tracking-wider">
              {timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watermark;
