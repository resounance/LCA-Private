

## Plano — Cor na página principal + remover travessões + animações mais vivas

### 1. Adicionar cor `detail` (#947e9e) na página principal (HeroSection)

| Elemento | Atual | Depois |
|---|---|---|
| Badge "Life Cycle Assessment" | `bg-muted border-border`, ícone e texto `text-foreground` | `bg-detail/10 border-detail/20`, ícone e texto `text-detail` |
| Ícones dos KPI cards (Cloud, Zap, Droplets, Recycle) | `text-foreground` | `text-detail` |
| SectionDivider gradient | `via-primary/30` | `via-detail/40` |
| Footer border | `border-border` | `border-detail/20` |

**Arquivos**: `HeroSection.tsx`, `SectionDivider.tsx`, `Footer.tsx`

### 2. Remover todos os travessões (—)

Substituir `—` por `.` ou reestruturar a frase em 5 arquivos:

- **HeroSection.tsx** L80: `"data — the most"` → `"data. The most"`
- **WasteSection.tsx** L39: `"facility — creating"` → `"facility, creating"`
- **WasteSection.tsx** L52: `"entirely — something"` → `"entirely. Something"`
- **WaterSection.tsx** L42: `"per kg — with"` → `"per kg, with"`
- **Footer.tsx** L10: `"Fiber — Life"` → `"Fiber · Life"` (usar middle dot como separador)
- **PasswordGate.tsx** L68: `"confidencial — acesso"` → `"confidencial. Acesso"`

### 3. Animações mais vivas

**HeroSection.tsx** — KPI cards:
- Adicionar `whileHover={{ scale: 1.04, y: -4 }}` nos cards
- Ícones com `whileHover` rotação sutil (rotate: 8deg)
- Badge de entrada com um bounce sutil (spring transition)

**DeckSection.tsx**:
- Aumentar deslocamento inicial de `y: 24` para `y: 40`
- Adicionar `scale: 0.97` no initial state

**StaggerChildren.tsx**:
- Aumentar deslocamento de `y: 28` para `y: 36`
- Aumentar `delayChildren` de `0.15` para `0.2`

**SectionDivider.tsx**:
- Adicionar glow pulsante sutil com a cor detail após a animação de entrada

**HighlightCard.tsx**:
- Melhorar hover: `scale: 1.03`, sombra glow com detail

**SectionHeader.tsx**:
- Adicionar animação de entrada escalonada: badge primeiro, depois título, depois subtítulo (stagger de 0.1s entre eles)

**ComparisonChart.tsx**:
- Aumentar `animationDuration` de 1200 para 1500ms
- Adicionar hover visual nas barras com `cursor` mais visível

### Arquivos modificados (8)
`HeroSection.tsx`, `SectionDivider.tsx`, `Footer.tsx`, `WasteSection.tsx`, `WaterSection.tsx`, `PasswordGate.tsx`, `DeckSection.tsx`, `StaggerChildren.tsx`, `SectionHeader.tsx`, `HighlightCard.tsx`, `ComparisonChart.tsx`

