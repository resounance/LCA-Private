

## Otimização Mobile-First dos Gráficos

### Problema

No viewport de 390px, os gráficos de barras do Recharts ficam comprimidos: labels rotacionados ilegíveis, barras finas, tooltip depende de hover (inexistente no touch), e o chart ocupa apenas 300px de altura com 7 labels empilhados.

### Solução: Layout Horizontal + Valores Inline no Mobile

No mobile, substituir o `BarChart` vertical por um `BarChart` com layout **horizontal** (barras deitadas). Isso resolve todos os problemas de uma vez:

- Labels ficam legíveis à esquerda (sem rotação)
- Barras usam toda a largura disponível
- Valores aparecem na ponta de cada barra (sem precisar de tooltip/hover)
- Altura se adapta ao número de itens

```text
Desktop (mantém como está):
  │
  │  ██
  │  ██  ██
  │  ██  ██  ██
  └──────────────

Mobile (horizontal):
  Tex2Tex® Pellet    ██ 0.33
  Tex2Tex® Ecru      ████ 0.63
  Bottle Thermo-Mech ██████ 0.96
  Bottle via Pellets ████████████ 1.88
  Bottle BHET        ████████████████ 2.59
  Bottle DMT         ██████████████████ 3.08
  Virgin PET         ████████████████████████ 4.06
```

### Detalhes Técnicos

**Arquivo: `ComparisonChart.tsx`**

1. No mobile (`isMobile`), renderizar `<BarChart layout="vertical">` com `XAxis type="number"` e `YAxis type="category" dataKey="name"`
2. Adicionar `<LabelList>` com `position="right"` mostrando o valor formatado na ponta de cada barra — elimina necessidade de tooltip no touch
3. Aumentar altura para `h-[420px]` no mobile (mais espaço vertical para as barras horizontais)
4. Desabilitar `<Tooltip>` no mobile (sem hover, não serve)
5. Ajustar `YAxis width` para ~120px para caber os labels sem truncar
6. Manter o desktop exatamente como está

**Arquivo: Seções (CO2, Energy, Water)**

7. No mobile, o grid `lg:grid-cols-3` já colapsa para coluna única — sem mudanças necessárias no layout das seções

### Resultado esperado

- Labels 100% legíveis sem rotação
- Valores visíveis sem interação (LabelList inline)
- Barras destacadas (Tex2Tex) claramente diferenciadas
- Experiência consistente touch-first

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `ComparisonChart.tsx` | Layout horizontal condicional, LabelList, tooltip condicional, altura ajustada |

