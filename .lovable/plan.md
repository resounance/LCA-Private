

## Fix: Valores dos gráficos quebrando linha no mobile

### Problema
Os valores na ponta das barras (ex: "0.33 kg CO₂e", "13.0 MJ", "0.19 L") estão quebrando em múltiplas linhas no mobile. "0.33 kg CO₂e" aparece como 3 linhas separadas.

### Causa raiz
O `LabelList` padrão do Recharts renderiza o texto de forma que pode quebrar. Precisamos de um componente customizado via prop `content` que force renderização em uma única linha SVG `<text>`.

### Solução

**Arquivo: `ComparisonChart.tsx`**

1. Criar um componente `CustomBarLabel` que recebe as props do Recharts e renderiza um `<text>` SVG simples, em uma única linha, posicionado à direita da barra
2. Substituir o `LabelList` atual pelo uso de `content={<CustomBarLabel />}` passando `formatValue` e `unit`
3. Usar `whiteSpace: pre` e `textAnchor="start"` para garantir que o texto nunca quebre

```tsx
function CustomBarLabel(props: any) {
  const { x, y, width, height, value, formatValue, unit } = props;
  return (
    <text
      x={x + width + 6}
      y={y + height / 2}
      dy={4}
      fill="hsl(210 8% 35%)"
      fontSize={9}
      fontFamily="Nexa, system-ui"
      textAnchor="start"
    >
      {formatValue(value)} {unit}
    </text>
  );
}
```

Substituir:
```tsx
<LabelList
  dataKey="value"
  position="right"
  formatter={(v: number) => `${formatValue(v)} ${unit}`}
  style={{ fontSize: 9, fill: "hsl(210 8% 35%)", fontFamily: "Nexa, system-ui" }}
/>
```

Por:
```tsx
<LabelList
  dataKey="value"
  content={<CustomBarLabel formatValue={formatValue} unit={unit} />}
/>
```

### Resultado esperado
Todos os valores ("0.33 kg CO₂e", "3.3 MJ", "0.19 L", etc.) renderizados em uma única linha fluida ao lado da barra.

