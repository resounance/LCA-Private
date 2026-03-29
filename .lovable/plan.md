

## Plano — Ajustar alinhamento vertical da fonte Nexa (1px → 2px)

A fonte Nexa tem uma baseline ligeiramente elevada, causando desalinhamento visual em caixas e elementos inline. Atualmente alguns elementos já usam `translate-y-[1px]`, mas precisa ser `translate-y-[2px]` para corrigir completamente. Além disso, vários textos Nexa ainda não têm nenhum ajuste.

### Arquivos e alterações

**1. Correção global via CSS (`src/index.css`)**
- Adicionar `translate-y-[2px]` como regra base para todos os textos que usam `font-family: Nexa` dentro de elementos inline (spans, labels) — ou aplicar individualmente nos componentes abaixo.

**2. `SectionHeader.tsx`**
- Badge span: `translate-y-[1px]` → `translate-y-[2px]`
- Título h2: adicionar `translate-y-[1px]`
- Subtítulo p: adicionar `translate-y-[1px]`

**3. `HighlightCard.tsx`**
- Percentual span: `translate-y-[1px]` → `translate-y-[2px]`
- ComparedTo span: `translate-y-[1px]` → `translate-y-[2px]`
- Equivalência texto: adicionar `translate-y-[1px]`

**4. `StickyNav.tsx`**
- Logo span: `translate-y-[1px]` → `translate-y-[2px]`
- Nav labels: `translate-y-[1px]` → `translate-y-[2px]`

**5. `HeroSection.tsx`**
- Badge "Life Cycle Assessment": adicionar `translate-y-[2px]`
- "Impact Indicators" (subtitle): adicionar `translate-y-[1px]`
- AnimatedCounter values: adicionar `translate-y-[1px]`
- KPI labels e units: adicionar `translate-y-[1px]`
- Footer disclaimer: adicionar `translate-y-[1px]`

**6. `WasteSection.tsx`**
- "0.0 kg" valor: adicionar `translate-y-[2px]`
- Card titles (h3): adicionar `translate-y-[1px]`

**7. `ComparisonChart.tsx`**
- Recharts ticks usam Nexa via font-family — ajustar `dy` nos ticks do XAxis/YAxis se necessário

**8. `Footer.tsx`**
- Textos do footer: adicionar `translate-y-[1px]`

### Abordagem
- Textos grandes (headings, stats): `translate-y-[2px]`
- Textos pequenos (labels, body): `translate-y-[1px]`
- Isso garante alinhamento visual proporcional ao tamanho da fonte

