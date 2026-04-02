

## Manter valores dos gráficos em uma única linha no mobile

### Problema
Os valores na ponta das barras (ex: "0.33 kg CO₂e", "23.0 MJ") estão quebrando em duas linhas no mobile por falta de espaço à direita.

### Solução

**Arquivo: `ComparisonChart.tsx`**

1. Aumentar `margin.right` de `65` para `80` para garantir espaço suficiente para o texto completo
2. Reduzir levemente `YAxis width` de `130` para `120` para compensar o espaço cedido à direita
3. Manter `fontSize: 9` no `LabelList` (já está adequado)

Essas mudanças garantem que valores como "0.33 kg CO₂e" e "23.0 MJ" caibam em uma única linha sem cortar.

