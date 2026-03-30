

## Plano de Ajustes Baseado no PPT Original

Analisei as 5 imagens do PPT e comparei com o estado atual do código. Segue o que precisa mudar:

---

### 1. Header fixo preto com logo (StickyNav.tsx)
- Remover lógica de show/hide (`visible`, `lastScrollY`, `AnimatePresence`)
- Header sempre visível, `fixed top-0`, fundo `bg-black`
- Substituir texto "TEX2TEX®" pelo logo SVG (`earthprotex-logo.svg`) com filtro brightness/invert para ficar branco
- Barra de progresso mantida

### 2. Logo maior no Hero (HeroSection.tsx)
- Aumentar de `h-20 md:h-28` para `h-28 md:h-40`
- Adicionar `pt-16` ao hero para compensar o header fixo

### 3. CO2 Section — dados do PPT (CO2Section.tsx)
O PPT mostra **Tex2Tex® Ecru Fiber** (0.63) e **Tex2Tex® Pellet** (0.33) como barras separadas. Além disso mostra labels como "1.5x more than Tex2Tex®", "3.0x", "4.1x", "4.9x", "6.4x".
- Adicionar entrada `Tex2Tex® Pellet` com valor 0.33 aos dados
- Renomear `Tex2Tex®` para `Tex2Tex® Ecru Fiber`
- Renomear `Bottle Thermo-Mech.` para `Bottle Thermo-Mechanical`
- Renomear `via Pellets` para `Bottle Thermo-Mech. via Pellets`
- Renomear `Chemical BHE` para `Bottle Chemical (BHET Method)`
- Renomear `Chemical DMT` para `Bottle Chemical (DMT Method)`
- Adicionar nota no card de texto: "Assessment data based on 2022 calendar year; in July we transitioned to biomass boiler from natural gas boiler."
- Equivalência: "driving a car 28 km" (já está correto)

### 4. Energy Section — dados do PPT (EnergySection.tsx)
- Renomear labels igual ao CO2 (nomes completos)
- Renomear `Tex2Tex®` para `Tex2Tex® RPET`
- Valores confirmados: 3.25, 13, 23, 39, 51, 95
- Equivalência no PPT: "60 watt light for 424hrs" — atualizar de "18 days" para "424 hours"

### 5. Water Section — dados do PPT (WaterSection.tsx)
- Renomear `Bottle Thermo-Mech.` para `Bottle Thermo-Mechanical`
- Renomear `Tex2Tex®` para `Tex2Tex® RPET`
- Adicionar card de texto com info do PPT: "Tex2Tex® discharges extremely low volumes of water (0.19 l/kg). Over 80% rate of water recycling. Very low COD and is treated on-site. Water is only used in the Tex2Tex® process for heat setting, drafting and the application of spinning oils. In comparison, bottle flake RPET requires significant washing water."
- Subtitle em 1 linha: unir com " — " em vez de ponto

### 6. Waste Section — conteúdo completo do PPT (WasteSection.tsx)
O PPT mostra 3 blocos de conteúdo:
- **Circular Production**: "100% of Tex2Tex® solid production wastage polymers from fiber, yarn and fabric production are recycled back into Tex2Tex® Fibers."
- **Zero Solid Waste Handling**: "Regulatory Alignment — Due to regulatory changes, 0.0163kg (0.0kg) of non-polymer production waste is now managed through government-incineration, replacing previous factory down-cycling practices."
- **Benchmarking**: "Most other recycling systems have high wastage. Further benchmarking data still needs to be collected."
- Atualizar os textos dos cards com esse conteúdo exato
- Adicionar card de Benchmarking (3 cards ao invés de 2)
- Subtitle: "Staple Fiber Benchmarking data TBD" conforme PPT

### 7. Chart labels — ® menor (ComparisonChart.tsx)
- Criar custom tick component para XAxis que renderize o "®" com `fontSize` menor (~7px) via `<tspan>`
- Isso afeta todos os gráficos automaticamente

### 8. Impact Indicators no Hero — descrições do PPT (HeroSection.tsx)
A imagem 11 mostra descrições sob cada KPI:
- CO2 Reduction: "Total CO2 emissions for transportation and industrial processes (scope 1 & 2). Measured in kilograms (Kg) per Kg output produced."
- Non-Renewable Energy: "All measured non-renewable energy from transportation and manufacturing processes. Measured in Joules (J) per Kg output produced."
- Water Consumption: "Water consumption from industrial processes, based on total water discharged in liters (L) per Kg output produced."
- Solid Waste Disposal: "Solid waste disposal from industrial manufacturing processes. Based on total solid waste disposed in kilograms (Kg) per Kg output produced."
- Adicionar essas descrições como texto pequeno abaixo de cada KPI card

---

### Arquivos modificados

| Arquivo | Mudanças |
|---------|----------|
| `StickyNav.tsx` | Header fixo, fundo preto, logo SVG |
| `HeroSection.tsx` | Logo maior, padding top, descrições nos KPIs |
| `CO2Section.tsx` | Dados atualizados com Pellet, nomes completos, nota |
| `EnergySection.tsx` | Nomes completos, equivalência 424hrs |
| `WaterSection.tsx` | Nomes completos, texto expandido do PPT |
| `WasteSection.tsx` | 3 cards com conteúdo exato do PPT |
| `ComparisonChart.tsx` | Custom XAxis tick com ® menor |

