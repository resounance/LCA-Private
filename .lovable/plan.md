

## Plano — Aplicar cor de destaque #947e9e nos detalhes do LCA

### Onde a cor será aplicada

A cor `#947e9e` (roxo acinzentado) será usada como cor de destaque em 4 áreas:

| Elemento | Atual | Depois |
|---|---|---|
| Badges das seções ("Carbon Footprint", "Energy Demand", etc.) | `text-foreground` + `bg-muted` | Texto `#947e9e`, borda `#947e9e/20`, fundo `#947e9e/10` |
| Textos de equivalência nos HighlightCards | `text-muted-foreground` | `text-[#947e9e]` |
| Ícones de equivalência (Car, Lightbulb, etc.) | `text-foreground` | `text-[#947e9e]` |
| Barra de progresso da sticky nav | `bg-foreground` (preto) | `bg-[#947e9e]` |

### Arquivos a modificar

1. **`src/components/lca/SectionHeader.tsx`** — Alterar as classes do badge para usar `text-[#947e9e]`, `bg-[#947e9e]/10`, `border-[#947e9e]/20` (removendo as props `colorClass`/`bgClass`/`borderClass` ou mantendo como fallback)

2. **`src/components/lca/CO2Section.tsx`** — Alterar o ícone `<Car>` para `text-[#947e9e]`; atualizar props do SectionHeader

3. **`src/components/lca/EnergySection.tsx`** — Idem para `<Lightbulb>`

4. **`src/components/lca/WaterSection.tsx`** — Idem para `<GlassWater>`

5. **`src/components/lca/HighlightCard.tsx`** — Alterar a linha de equivalência: ícone e texto com `text-[#947e9e]`, borda separadora com `border-[#947e9e]/20`

6. **`src/components/lca/StickyNav.tsx`** — Alterar a barra de progresso de `bg-foreground` para `bg-[#947e9e]`

### Resultado
Os elementos de detalhe terão um toque de cor roxa que quebra a monotonia do monocromático sem competir com o conteúdo principal, igual ao estilo do India Pelletization Hub.

