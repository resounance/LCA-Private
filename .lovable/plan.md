

## Plano Revisado — Proteção de Conteúdo Tex2Tex®

### Problema com Tokens Expiráveis
Concordo — o QR code é fixo na apresentação e o cliente pode escanear dias depois. Token com expiração é impraticável nesse cenário.

### Alternativa: Senha Simples + Painel de Controle

Em vez de links temporários, o acesso será controlado por uma **senha única** que você pode trocar quando quiser:

- O QR code aponta sempre para a mesma URL (`/`)
- Ao acessar, o visitante vê uma tela de senha limpa e minimalista
- Você define/altera a senha a qualquer momento via `/admin` (protegido por senha master)
- Após digitar a senha correta, ela fica em `sessionStorage` — ao fechar o navegador, precisa digitar novamente
- Se quiser "revogar" o acesso após um evento, basta trocar a senha

Isso é simples, prático, e resolve o problema: se um competidor pegar o QR code, sem a senha não entra. E você pode trocar a senha entre eventos.

### Resumo do Plano Final

**Camada 1 — Gate de Senha**
- `PasswordGate.tsx`: tela de senha antes do conteúdo (rota `/`)
- `AdminPanel.tsx`: rota `/admin` para definir a senha ativa (protegido por senha master separada)
- Senha armazenada em `localStorage` (persiste para o admin) e validação via `sessionStorage` (visitante)

**Camada 2 — Proteções Anti-Cópia** (aprovado)
- `ContentProtection.tsx`: wrapper com `user-select: none`, bloqueio de clique direito, Ctrl+C/P/S, PrintScreen
- CSS `@media print` escondendo o conteúdo

**Camada 3 — Marca d'Água Dinâmica** (aprovado)
- `Watermark.tsx`: overlay fixo com "CONFIDENTIAL" + data/hora, rotacionado -45deg, opacidade ~6-8%, atualiza a cada minuto

### Arquivos

| Arquivo | Ação |
|---|---|
| `src/components/lca/PasswordGate.tsx` | Criar — tela de senha |
| `src/pages/AdminPanel.tsx` | Criar — painel para trocar senha |
| `src/components/lca/ContentProtection.tsx` | Criar — wrapper anti-cópia |
| `src/components/lca/Watermark.tsx` | Criar — marca d'água dinâmica |
| `src/pages/Index.tsx` | Modificar — envolver conteúdo com PasswordGate + ContentProtection + Watermark |
| `src/App.tsx` | Modificar — adicionar rota `/admin` |

### Nota sobre segurança
Como tudo roda client-side, a senha pode ser encontrada por alguém técnico inspecionando o código. Para a maioria dos cenários de apresentação comercial isso é suficiente. Se no futuro precisar de algo mais robusto, podemos migrar para Supabase com autenticação real.

