

## Corrigir tamanho do ® em todo o site

O símbolo `®` está sendo renderizado no tamanho normal do texto, quando deveria ser pequeno e elevado (superscript), como em tipografia profissional.

### Abordagem

Substituir todas as ocorrências de `®` em texto JSX por `<span className="text-[0.6em] align-super">®</span>` para que fique pequeno e acima da linha base, independente do tamanho da fonte do contexto.

O `ComparisonChart.tsx` já trata o `®` nos labels SVG com `<tspan>` — esse continua como está.

### Arquivos modificados

| Arquivo | Ocorrências |
|---------|-------------|
| `HeroSection.tsx` | ~4 ocorrências no alt, parágrafo e nota de rodapé |
| `CO2Section.tsx` | ~4 ocorrências nos dados e texto |
| `EnergySection.tsx` | ~3 ocorrências nos dados e texto |
| `WaterSection.tsx` | ~4 ocorrências nos dados e texto |
| `WasteSection.tsx` | Ocorrências no texto |
| `PasswordGate.tsx` | ~6 ocorrências nas traduções EN/ZH/HI |
| `RequestLCAButton.tsx` | ~2 ocorrências no subject/body do email |
| `SourcesSection.tsx` | Ocorrências no texto |
| `Footer.tsx` | ~1 ocorrência no subtítulo |

Para strings em atributos (`alt`, `mailto`), manter `®` normal pois não é renderizado visualmente como HTML.

Para strings usadas como `name` nos dados de gráficos (arrays `data`), manter `®` pois o `ComparisonChart` já cuida do rendering via `CustomXTick`.

Apenas textos visíveis em JSX receberão o `<span>` estilizado.

