

## Corrigir Labels dos Gráficos Mobile

### Problemas
1. Labels longos como "Bottle Thermo-Mechanical" são renderizados numa única `<text>` SVG e cortam no mobile
2. Valores com unidade (`0.33 kg CO₂e`) quebram linha por falta de espaço à direita
3. Nomes abreviados ("Thermo-Mech.") nos dados devem ser escritos por extenso

### Solução

**1. Dados — Nomes completos (CO2Section.tsx, EnergySection.tsx)**
- `"Bottle Thermo-Mech. via Pellets"` → `"Bottle Thermo-Mechanical via Pellets"`

**2. MobileYTick multi-linha (ComparisonChart.tsx)**

Refatorar o `MobileYTick` para quebrar nomes longos em múltiplas linhas SVG usando `<tspan>`. Lógica: agrupar palavras em linhas de ~18 caracteres max, renderizar cada linha como `<tspan>` com `dy` de 12px. Centralizar verticalmente baseado no número de linhas.

**3. Ajustes de layout mobile (ComparisonChart.tsx)**
- `mobileHeight`: de `data.length * 52` para `data.length * 62` (mais espaço por barra para labels multi-linha)
- `YAxis width`: de `120` para `130` (mais espaço para texto)
- `margin.right`: de `50` para `65` (evitar corte dos valores)
- `LabelList fontSize`: de `10` para `9` (valores cabem numa linha)

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `CO2Section.tsx` | Nome completo "Bottle Thermo-Mechanical via Pellets" |
| `EnergySection.tsx` | Nome completo "Bottle Thermo-Mechanical via Pellets" |
| `ComparisonChart.tsx` | MobileYTick com quebra multi-linha, ajustes de height/width/margin/fontSize |

