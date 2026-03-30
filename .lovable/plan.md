

## Ajustes solicitados

### 1. Alterar subtítulo do Hero (HeroSection.tsx)
**Linha 89** — substituir o texto atual por:
> "Tex2Tex® RPET Life Cycle Assessment data overview. Powered by Tex2Tex® RPET Thermo-Mechanical Reactor™. Compiled data is a combination of 3rd party assessments and internal reporting of Tex2Tex® manufacturing processes with publicly reported industry data benchmarks for illustrated comparisons."

### 2. Alterar crédito LCA (HeroSection.tsx)
**Linha 105** — substituir `LCA by EarthProtex` por lógica condicional baseada no `productType`:
- Staple Fibers → `LCA by Intertek (for Staple Fibers)`
- Pellets / Filaments → `Earth Protex internally published LCA (for Pellets & Filaments)`

Isso requer passar `productType` como prop para `HeroSection`.

### 3. "Data Forthcoming" para Pellets e Filaments (Index.tsx)
Quando `productType` não for `"staple"`, exibir uma mensagem "Data Forthcoming" no lugar das seções de dados (CO2, Energy, Water, Waste). As seções só aparecem para Staple Fibers.

### 4. Corrigir gráficos — linhas e números do eixo Y ausentes (ComparisonChart.tsx)
O gráfico está sem as linhas horizontais e os números do eixo. Revisar o `CartesianGrid` e `YAxis` para garantir que as gridlines horizontais e os tick labels apareçam corretamente. Tornar o `ticks` e `domain` configuráveis via props, pois cada seção tem escalas diferentes.

### Arquivos modificados
- `HeroSection.tsx` — novo subtítulo + crédito LCA dinâmico + receber prop `productType`
- `Index.tsx` — passar `productType` ao HeroSection + condicional "Data Forthcoming"
- `ComparisonChart.tsx` — aceitar props `ticks` e `domain` opcionais, garantir visibilidade do grid/eixo

