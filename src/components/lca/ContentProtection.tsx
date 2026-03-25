import { useEffect, type ReactNode } from "react";

interface ContentProtectionProps {
  children: ReactNode;
}

const ContentProtection = ({ children }: ContentProtectionProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+A, PrintScreen
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "p", "s", "a", "u"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
      if (e.key === "PrintScreen" || e.key === "F12") {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: Event) => e.preventDefault();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};

export default ContentProtection;
