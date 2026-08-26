---
name: demo-nova
description: Acrescentar uma sétima landing page à coleção, com identidade visual própria. Use quando o usuário pedir uma demo nova, uma página para outro nicho, ou quiser mostrar um segmento que ainda não está na coleção.
tools: Read, Glob, Grep, Bash, Edit, Write
---

# Demo nova

Uma demo é **um tema + uma composição**, nunca componentes novos. Se você está criando variante
de componente para "ficar diferente", pare: provavelmente devia estar mexendo em token.

## A ordem que funciona

### 1. Decidir a identidade antes de escrever código

Escolha o par tipográfico, a paleta e o raio. **As dez existentes já cobrem** dark tech
(`saas-ai`), editorial em papel (`agencia`), clean claro (`clinica`), luxo escuro
(`imobiliaria`), warm claro (`ecommerce`), corporativo (`consultoria`), noturno de vinho
(`adega`), oficina masculina (`barbearia`), apetite quente (`hamburgueria`) e afetivo claro
(`petshop`). **Uma décima primeira que repete uma dessas não vende nada** — o valor da coleção
é a variedade.

Fonte nova precisa entrar no `<link>` do Google Fonts em `index.html`. Confira que a URL volta
200 com a família nova antes de seguir; eixo errado numa fonte variável derruba o pedido inteiro
em silêncio.

### 2. Bloco de tema em `src/index.css`

Copie o bloco de um tema próximo e troque os valores. Todos os tokens `--c-*` precisam estar
presentes — herdar do `:root` por esquecimento é como se ganha uma paleta misturada.

> **O seletor tem que ser idêntico ao slug da rota.** `DemoFrame` aplica `data-theme={slug}`.
> A demo de SaaS já ficou com a paleta errada por ser `/demo/saas-ai` contra
> `[data-theme="saas"]` — renderiza inteira, sem erro nenhum, só com a identidade do showcase.

Se a página tiver seção de contraste invertido, escreva também o bloco
`[data-theme="x"] [data-invert]`.

### 3. Registro em `src/lib/demos.ts`

Entrada com `slug`, `brand`, `category`, `description`, `style`, `swatch` (as três cores do card)
e `typeface`. O `index` é a numeração exibida — renumere se inserir no meio.

### 4. Rota em `src/App.tsx`

`lazy(() => import(...))` mais o `<Route>` envolvido em `<DemoFrame slug="...">`. O slug aqui,
no CSS e no registro são a mesma string.

### 5. Miniatura no showcase

`src/pages/Showcase.tsx` tem uma função `Preview*` por demo e o mapa `PREVIEWS`. A miniatura usa
`style` inline com as cores do registro — é o único lugar do projeto onde cor literal é
legítima, porque ela pinta a paleta de **outro** tema fora do tema ativo.

Boa miniatura mostra a composição real da página (uma foto de verdade dela, o título, um
elemento característico), não um retângulo genérico.

### 6. Conteúdo

Sem Lorem Ipsum. Headline com benefício concreto, números plausíveis, depoimentos com nome e
cargo. Preços em reais via `brl()`.

**Onde o leitor poderia se enganar, diga que é demonstração**: rodapé, formulários, blocos de
números. Essa é a regra 1 do [CLAUDE.md](../../../CLAUDE.md), não um detalhe.

Nada de reaproveitar rosto que já aparece em outra seção da mesma página.

### 7. Seções

Componha com o que existe em `src/components/site/`: `Navbar`, `LogoCloud`, `FeatureGrid`,
`Stats`, `Testimonials`, `Pricing`, `FAQ`, `CTA`, `Footer` — todos com variantes. Some a isso
**dois ou três blocos sob medida**, que é o que dá cara própria (o dashboard em CSS do Órion, a
planta em SVG da Vertente, o comparativo da Alta Colheita).

Se precisar de um bloco só dessa demo, ele vai em `src/demos/<slug>/ui.tsx`, não em
`components/`.

## Antes de dizer que acabou

- `/verificar` com a rota nova incluída na varredura (hoje são 11 rotas: 10 demos + o showcase).
- Conferir em 390px.
- `npm run photos` se entraram fotos novas.
- Atualizar a contagem em [README.md](../../../README.md), no [CLAUDE.md](../../../CLAUDE.md) e
  no texto do showcase — a quantidade está escrita **em prosa** no título do hero
  (`Showcase.tsx`: "Coleção 2026 · dez demos", "Dez páginas.", "Dez mundos diferentes."), na
  `description` do manifesto, no README e na linha de abertura do CLAUDE.md. Nenhum desses
  números é calculado a partir de `demos.ts`: todos apodrecem sozinhos.
