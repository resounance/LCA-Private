

## Plano — Alinhar identidade visual do LCA com o India Pelletization Project

### Diferenças identificadas

| Aspecto | LCA (atual) | India Pelletization |
|---|---|---|
| Fonte | Space Grotesk + Inter | Nexa (custom) |
| Animacoes | Basicas (fade-in, scroll) | Stagger children, blur reveal, parallax glass, spring counters |
| Nav | Simples com pill ativo | Glass morphism + barra de progresso + indicador animado |
| Cards | Border + bg simples | Liquid glass (backdrop-blur, specular highlights) |
| Divisores | Nenhum | Linha gradiente animada |
| Secoes | Sem wrapper padronizado | DeckSection com reveal direcional |

### O que sera feito

**1. Importar fonte Nexa**
- Copiar os arquivos .otf da pasta `public/fonts/` do India project
- Adicionar os `@font-face` no `index.css`
- Atualizar `tailwind.config.ts` para usar `font-heading: Nexa` e `font-body: Nexa`

**2. Adicionar efeitos Liquid Glass ao CSS**
- Copiar as classes `.liquid-glass`, `.liquid-glass-strong`, `.deck-card-glass`, `.deck-card-glass-stat` e `.glass-*` do India project para o `index.css`
- Adicionar utilitarios `.deck-container`, `.deck-section`, `.deck-card`

**3. Criar componentes de animacao reutilizaveis**
- `StaggerChildren.tsx` — container + item com stagger delay e blur reveal
- `DeckSection.tsx` — wrapper de secao com reveal direcional (up/left/right)
- `SectionDivider.tsx` — linha gradiente animada entre secoes
- Atualizar `AnimatedCounter` / `useCountUp` para usar framer-motion springs (mais fluido)

**4. Atualizar StickyNav**
- Adicionar barra de progresso de scroll (linha colorida no topo)
- Efeito glass morphism no background (glass-filter + glass-overlay + glass-specular)
- Indicador ativo com `layoutId` animado (underline que desliza)
- Animacao de entrada/saida com show-on-scroll-up

**5. Atualizar HeroSection**
- Animacoes com blur reveal (`filter: blur(10px)` → `blur(0px)`)
- Parallax no scroll (opacity e translateY baseados em scrollYProgress)
- Tipografia bold/black com tracking negativo (estilo cinematico)

**6. Atualizar secoes de conteudo (CO2, Energy, Water, Waste)**
- Envolver com `DeckSection` para reveal animado
- Cards com classe `deck-card-glass` em vez de border simples
- `StaggerContainer` + `StaggerItem` nos grids de cards
- Adicionar `SectionDivider` entre secoes

**7. Atualizar HighlightCard e ComparisonChart**
- Aplicar estilo glass nos cards de destaque
- Hover com `translateY(-2px)` e shadow expandido

### Arquivos a criar/modificar

| Arquivo | Acao |
|---|---|
| `public/fonts/*.otf` | Copiar fontes Nexa do India project |
| `src/index.css` | Adicionar @font-face Nexa + classes liquid-glass + utilitarios deck |
| `tailwind.config.ts` | Atualizar fontFamily para Nexa |
| `src/components/lca/StaggerChildren.tsx` | Criar — animacao stagger com blur |
| `src/components/lca/DeckSection.tsx` | Criar — wrapper de secao animado |
| `src/components/lca/SectionDivider.tsx` | Criar — divisor animado |
| `src/components/lca/StickyNav.tsx` | Reescrever — glass + progress bar + layoutId |
| `src/components/lca/HeroSection.tsx` | Atualizar — blur reveal + parallax scroll |
| `src/components/lca/CO2Section.tsx` | Atualizar — DeckSection + glass cards + stagger |
| `src/components/lca/EnergySection.tsx` | Atualizar — idem |
| `src/components/lca/WaterSection.tsx` | Atualizar — idem |
| `src/components/lca/WasteSection.tsx` | Atualizar — idem |
| `src/components/lca/HighlightCard.tsx` | Atualizar — glass style + hover |
| `src/components/lca/SectionHeader.tsx` | Atualizar — usar stagger |
| `src/hooks/useCountUp.ts` | Atualizar — usar framer-motion spring |
| `src/pages/Index.tsx` | Adicionar SectionDivider entre secoes |

### Resultado esperado
A landing page LCA tera a mesma linguagem visual premium do India Pelletization: fontes Nexa, animacoes com blur e stagger, cards com efeito glass, nav com progresso de scroll, e transicoes cinematicas entre secoes.

