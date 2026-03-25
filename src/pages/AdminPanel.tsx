import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { verifyAdminPassword, getStoredPassword, setStoredPassword } from "@/lib/passwordUtils";
import { Shield, Key, Check } from "lucide-react";

const AdminPanel = () => {
  const [adminAuth, setAdminAuth] = useState(false);
  const [masterPass, setMasterPass] = useState("");
  const [masterError, setMasterError] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await verifyAdminPassword(masterPass);
    if (valid) {
      setAdminAuth(true);
      setCurrentPassword(getStoredPassword());
    } else {
      setMasterError(true);
      setTimeout(() => setMasterError(false), 2000);
    }
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      setStoredPassword(newPassword.trim());
      setCurrentPassword(newPassword.trim());
      setNewPassword("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (!adminAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <CardTitle className="font-['Space_Grotesk']">Painel Admin</CardTitle>
            <CardDescription>Digite a senha master</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha master"
                value={masterPass}
                onChange={(e) => setMasterPass(e.target.value)}
                className={masterError ? "border-destructive" : ""}
                autoFocus
              />
              {masterError && <p className="text-sm text-destructive">Senha incorreta</p>}
              <Button type="submit" className="w-full" disabled={!masterPass}>
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-foreground" />
            <CardTitle className="font-['Space_Grotesk']">Gerenciar Senha de Acesso</CardTitle>
          </div>
          <CardDescription>
            Altere a senha que os visitantes usam para acessar o conteúdo LCA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-3 rounded-md bg-secondary">
            <p className="text-xs text-muted-foreground mb-1">Senha atual</p>
            <p className="text-sm font-mono text-foreground font-medium">{currentPassword}</p>
          </div>

          <form onSubmit={handleSavePassword} className="space-y-4">
            <Input
              type="text"
              placeholder="Nova senha de acesso"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button type="submit" className="w-full" disabled={!newPassword.trim()}>
              {saved ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Salvo!
                </span>
              ) : (
                "Salvar nova senha"
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            Ao trocar a senha, visitantes que já acessaram precisarão digitar a nova senha ao reabrir o navegador.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
