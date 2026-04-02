

## Disclaimer de Confidencialidade — Pós-Login

Após o usuário digitar a senha correta no `PasswordGate`, em vez de mostrar o conteúdo diretamente, exibir uma tela intermediária de disclaimer com:

### Conteúdo do Disclaimer
- Título: "Termo de Confidencialidade"
- Texto explicando que todo o conteúdo é proprietário e confidencial da Tex2Tex / Earth Protex
- Declaração de que o usuário se compromete a não compartilhar, copiar, reproduzir ou distribuir as informações com terceiros não autorizados
- Checkbox obrigatório: "Declaro que estou ciente e me comprometo a não compartilhar este conteúdo com pessoas não autorizadas"
- Botão "Concordo e desejo prosseguir" (habilitado somente com checkbox marcado)

### Implementação
Adicionar um estado `disclaimerAccepted` no `PasswordGate.tsx`. Após autenticação bem-sucedida (`unlocked === true`), verificar se o disclaimer foi aceito. Se não, mostrar a tela do disclaimer. Ao aceitar, salvar em `sessionStorage` para não pedir novamente na mesma sessão (mas pedir a cada nova sessão).

### Arquivo modificado

| Arquivo | Mudança |
|---------|---------|
| `PasswordGate.tsx` | Tela intermediária de disclaimer com checkbox + sessionStorage |

