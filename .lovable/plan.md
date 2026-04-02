

## Ajustes: Asterisco no Solid Waste + Cores mais vivas

### 1. Asterisco no "0.0 kg" Solid Waste (HeroSection.tsx)

Adicionar uma propriedade `asterisk` ao indicador de Solid Waste. No `KpiCard`, renderizar um `*` pequeno ao lado do valor quando `asterisk === true`, com uma nota de rodapé abaixo do grid de KPIs explicando o significado (ex: "* Zero polymer waste to landfill — non-polymer residue managed via government incineration").

### 2. Cores mais vivas — sair do monocromático (index.css)

Atualmente todas as cores de marca (`--ep-coral`, `--ep-purple`, `--ep-teal`, etc.) estão definidas como tons de cinza (`0 0% 15%`). Trocar para cores reais e vibrantes:

| Token | Atual (cinza) | Novo (vivo) |
|-------|--------------|-------------|
| `--detail` | `270 14% 56%` | `160 84% 39%` (verde Earth Protex) |
| `--ep-coral` | `0 0% 15%` | `4 90% 58%` (coral vibrante) |
| `--ep-purple` | `0 0% 25%` | `270 60% 55%` (roxo vivo) |
| `--ep-teal` | `0 0% 20%` | `174 72% 40%` (teal/verde-água) |
| `--ep-green` | `0 0% 15%` | `152 76% 36%` (verde sustentabilidade) |
| `--ep-slate` | `0 0% 40%` | `215 20% 50%` (azul-cinza) |
| `--muted-foreground` | `210 8% 35%` | `210 12% 40%` (levemente mais vivo) |

A cor `--detail` é usada nos ícones dos KPIs, badges e destaques — trocá-la para verde dará identidade visual ligada à sustentabilidade. As cores `--ep-*` são usadas nos gráficos de barras (`ComparisonChart`), que atualmente ficam todos cinza — com cores reais, cada barra terá destaque visual.

Também aplicar as mesmas mudanças na variante `.dark`.

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `HeroSection.tsx` | Prop `asterisk` no KPI de Waste + nota de rodapé |
| `index.css` | Tokens de cor vivos no `:root` e `.dark` |

