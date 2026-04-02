import { useState, type ReactNode } from "react";
import { isAuthenticated, authenticate } from "@/lib/passwordUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, ShieldCheck } from "lucide-react";

const DISCLAIMER_KEY = "tex2tex_disclaimer_accepted";

interface PasswordGateProps {
  children: ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(isAuthenticated());
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(
    () => sessionStorage.getItem(DISCLAIMER_KEY) === "true"
  );
  const [agreed, setAgreed] = useState(false);
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

  const handleAcceptDisclaimer = () => {
    sessionStorage.setItem(DISCLAIMER_KEY, "true");
    setDisclaimerAccepted(true);
  };

  if (unlocked && disclaimerAccepted) return <>{children}</>;

  if (unlocked && !disclaimerAccepted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground font-['Space_Grotesk']">
              Termo de Confidencialidade
            </h1>
          </div>

          <div className="text-left text-sm text-muted-foreground leading-relaxed space-y-4 bg-secondary/50 rounded-lg p-6 border border-border">
            <p>
              Todo o conteúdo disponível nesta plataforma é de propriedade exclusiva da{" "}
              <span className="font-semibold text-foreground">Tex2Tex® / Earth Protex</span> e possui caráter
              estritamente <span className="font-semibold text-foreground">confidencial</span>.
            </p>
            <p>
              As informações aqui apresentadas — incluindo dados, análises, gráficos e relatórios — são
              destinadas exclusivamente a pessoas autorizadas e não devem ser compartilhadas, copiadas,
              reproduzidas ou distribuídas a terceiros sem autorização prévia e expressa.
            </p>
            <p>
              O uso indevido destas informações poderá acarretar em medidas legais cabíveis.
            </p>
          </div>

          <div className="flex items-start gap-3 text-left">
            <Checkbox
              id="disclaimer-agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="disclaimer-agree" className="text-sm text-foreground cursor-pointer leading-snug">
              Declaro que estou ciente e me comprometo a não compartilhar este conteúdo com pessoas não autorizadas.
            </label>
          </div>

          <Button
            onClick={handleAcceptDisclaimer}
            className="w-full"
            disabled={!agreed}
          >
            Concordo e desejo prosseguir
          </Button>
        </div>
      </div>
    );
  }

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
          Conteúdo confidencial. Acesso autorizado apenas
        </p>
      </div>
    </div>
  );
};

export default PasswordGate;
