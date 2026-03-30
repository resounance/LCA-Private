

## Otimização Mobile-First

Analisei todos os componentes no viewport mobile (390px). Seguem os problemas identificados e as soluções:

---

### 1. Header mobile com menu hamburger (StickyNav.tsx)
Os nav links estão `hidden md:flex` — no mobile não há navegação. Adicionar um botão hamburger que abre um menu drawer/overlay com os links de navegação. O menu fecha ao clicar em um link ou fora dele.

### 2. Hero Section — tipografia e spacing mobile (HeroSection.tsx)
- Reduzir o padding top/bottom no mobile (`pt-20 pb-10` em vez de `pt-28 pb-16`)
- Logo: `h-20` no mobile, `md:h-40` no desktop (atualmente `h-28 md:h-40`, muito grande no mobile)
- "Impact Indicators" — reduzir de `text-2xl md:text-3xl` para `text-xl md:text-3xl`
- Texto descritivo — reduzir de `text-sm` para `text-xs` no mobile
- KPI cards grid: manter `grid-cols-2` mas reduzir gap para `gap-3` no mobile
- KPI cards: reduzir padding (`p-4` mobile vs `p-6` desktop), valor de `text-4xl` para `text-3xl`, descrições de `text-[10px]` para ainda menores ou esconder no mobile

### 3. Product Switcher — mobile touch-friendly (ProductSwitcher.tsx)
- Reduzir padding dos botões: `px-3 py-1.5` no mobile vs `px-5 py-2` no desktop
- Texto `text-xs` no mobile para caber os 3 botões

### 4. Charts — otimização crítica para mobile (ComparisonChart.tsx)
Este é o componente mais problemático no mobile:
- Labels do eixo X muito longos ("Bottle Thermo-Mechanical", "Bottle Chemical (BHET Method)") ficam cortados ou sobrepostos
- Reduzir `fontSize` do CustomXTick de 11 para 9 no mobile
- Aumentar o `bottom margin` do chart para dar mais espaço aos labels
- Reduzir `maxBarSize` de 60 para 40 no mobile
- Usar `useIsMobile()` hook para aplicar configs responsivas

### 5. Seções CO2/Energy/Water — layout empilhado (CO2Section, EnergySection, WaterSection)
Atualmente `grid lg:grid-cols-3` — no mobile tudo empilha mas o chart fica espremido:
- Chart: mudar altura de `h-[350px]` para `h-[300px]` no mobile (menos padding desperdiçado)
- HighlightCard: reduzir `text-4xl md:text-5xl` para `text-3xl md:text-5xl` no percentage
- Cards de texto: padding `p-4` no mobile vs `p-5` desktop

### 6. Waste Section — cards empilhados no mobile (WasteSection.tsx)
Grid `md:grid-cols-2 lg:grid-cols-4` já empilha no mobile, mas:
- O card central com "0.0 kg" e ícone grande é muito alto no mobile — reduzir ícone para `w-14 h-14` e valor para `text-4xl`
- Reduzir padding dos cards de `p-8` para `p-6` no mobile

### 7. Sources Section — mais compacta (SourcesSection.tsx)
- Reduzir padding do card de `p-6` para `p-4` no mobile
- Font size dos references de `text-xs` para `text-[11px]` com line-height mais tight

### 8. SectionHeader — mobile sizing (SectionHeader.tsx)
- Título: `text-2xl md:text-4xl` (atualmente `text-3xl md:text-4xl`)
- Subtitle: `text-sm md:text-base` (atualmente `text-base`)
- Margin bottom: `mb-8 md:mb-12` (atualmente `mb-12`)

### 9. Deck utilities — mobile padding (index.css)
- `.deck-section`: reduzir de `py-16` para `py-10` no mobile
- `.deck-container`: padding já é `px-4` no mobile, ok

### 10. Footer — mobile compact (Footer.tsx)
- Já centralizado no mobile, ok. Apenas reduzir padding de `py-12` para `py-8` no mobile

### 11. RequestLCAButton — full width no mobile (RequestLCAButton.tsx)
- Botão: `w-full sm:w-auto` para ocupar toda a largura no mobile
- Reduzir padding de `px-8 py-4` para `px-6 py-3` no mobile

---

### Arquivos modificados

| Arquivo | Mudanças |
|---------|----------|
| `StickyNav.tsx` | Menu hamburger mobile |
| `HeroSection.tsx` | Tipografia e spacing responsivos |
| `ProductSwitcher.tsx` | Touch targets e sizing mobile |
| `ComparisonChart.tsx` | Font sizes, margins, bar sizes responsivos via `useIsMobile` |
| `CO2Section.tsx` | Gap/padding mobile |
| `EnergySection.tsx` | Gap/padding mobile |
| `WaterSection.tsx` | Gap/padding mobile |
| `WasteSection.tsx` | Card sizing mobile |
| `HighlightCard.tsx` | Typography mobile |
| `SectionHeader.tsx` | Typography mobile |
| `SourcesSection.tsx` | Padding mobile |
| `RequestLCAButton.tsx` | Full width mobile |
| `Footer.tsx` | Padding mobile |
| `index.css` | Deck section utilities mobile |

