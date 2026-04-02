

## Seletor de Idioma com Botões — PasswordGate

Substituir as traduções expostas simultaneamente por um sistema de idioma selecionável via botões. O inglês é o padrão; ao clicar em "中文" ou "हिन्दी", todo o conteúdo da tela muda para aquele idioma.

### Implementação

**Arquivo: `PasswordGate.tsx`**

1. Criar um objeto `translations` com chaves `en`, `zh`, `hi`, contendo todos os textos: título, parágrafo do disclaimer, checkbox label, botão, placeholder, erro, subtítulo da tela de senha, etc.

2. Adicionar estado `lang` (`"en" | "zh" | "hi"`) com default `"en"`.

3. Renderizar 3 botões de idioma (EN / 中文 / हिन्दी) no topo de ambas as telas (senha e disclaimer). O botão ativo fica com estilo `default`, os inativos com `ghost` ou `outline`. Usar tamanho `sm`.

4. Remover todo texto multilíngue inline (os `·` separando idiomas). Cada texto vem do objeto `translations[lang]`.

5. Remover o grid de traduções chinês/hindi do disclaimer — o conteúdo principal muda conforme o idioma selecionado.

### Estrutura do seletor

```text
┌─────────────────────┐
│  [EN] [中文] [हिन्दी]  │  ← botões no topo
│                     │
│  (conteúdo no       │
│   idioma ativo)     │
└─────────────────────┘
```

### Arquivo modificado

| Arquivo | Mudança |
|---------|---------|
| `PasswordGate.tsx` | Objeto `translations`, estado `lang`, botões seletores, remoção de texto inline multilíngue |

