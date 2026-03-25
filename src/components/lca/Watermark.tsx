import { useEffect, useState } from "react";

const Watermark = () => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString("pt-BR"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleString("pt-BR"));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Generate grid of watermark text
  const items = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 flex flex-wrap gap-24 p-8"
        style={{
          transform: "rotate(-30deg) scale(1.5)",
          transformOrigin: "center center",
          opacity: 0.06,
        }}
      >
        {items.map((i) => (
          <div
            key={i}
            className="text-foreground text-sm font-semibold whitespace-nowrap font-['Space_Grotesk'] tracking-wider"
          >
            CONFIDENTIAL • {timestamp}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watermark;
