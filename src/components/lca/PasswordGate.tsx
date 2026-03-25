import { useState, type ReactNode } from "react";
import { isAuthenticated, authenticate } from "@/lib/passwordUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface PasswordGateProps {
  children: ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(isAuthenticated());
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (authenticate(password)) {
        setUnlocked(true);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
      setLoading(false);
    }, 300);
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <Lock className="w-7 h-7 text-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground font-['Space_Grotesk']">
              Acesso Restrito
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Digite a senha para acessar o conteúdo
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Senha de acesso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "border-destructive" : ""}
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive">Senha incorreta</p>
          )}
          <Button type="submit" className="w-full" disabled={loading || !password}>
            {loading ? "Verificando..." : "Acessar"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Conteúdo confidencial — acesso autorizado apenas
        </p>
      </div>
    </div>
  );
};

export default PasswordGate;
