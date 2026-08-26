# CLAUDE.md — Guia de trabalho do projeto Norte

> Carregado no início de cada sessão. Define **como trabalhar** e **o que o código precisa
> garantir**. Regras concretas e verificáveis — quase toda regra abaixo existe porque algo
> quebrou de verdade neste projeto, e a causa está anotada junto.
> Mantenha enxuto: um arquivo inchado dilui a atenção do modelo.

Projeto: **coleção de dez landing pages demonstrativas** para apresentar a clientes.
Site estático, sem backend, sem autenticação, sem banco. Marcas, textos, preços e depoimentos
são **fictícios** de propósito.

Stack: React + TypeScript · Vite · Tailwind CSS v4 · React Router · Framer Motion · Lucide.
Nada além disso — o valor aqui é acabamento visual, não infraestrutura.

### Onde procurar o quê

| Quando você quer...                          | Vá em                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| rodar, publicar, entender a estrutura        | **[README.md](README.md)**                                                       |
| saber **onde estamos** e o que está pendente | **[HANDOFF.md](HANDOFF.md)** — leia ao começar, atualize ao fechar               |
| **fazer** uma tarefa recorrente              | as skills em `.claude/skills/`: `/verificar`, `/publicar`, `/foto`, `/demo-nova` |

Não há arquivo de decisões (ADR) nem de padrões separado: o projeto tem ~6 mil linhas e uma
única superfície. Se um dia precisar, separe — não antes.

### Prioridade das regras (em caso de conflito)

1. **Honestidade do conteúdo** — a página não pode se passar por uma empresa real. Inegociável.
2. **Pedido do usuário** sobre o comportamento desejado — sobrepõe preferência e convenção.
3. **Este arquivo** → 4. **convenção local do arquivo** (para consistência; nunca para propagar
   um padrão ruim).

---

## Parte 1 — Como trabalhar

> Regra de ouro: **cautela acima de velocidade**. Bom senso em tarefas triviais.

1. **Pense antes de codar.** Liste só as suposições que mudam o que será produzido. Se o pedido
   for ambíguo, apresente as leituras possíveis e escolha uma justificando.
2. **Pare e explique** se encontrar requisito inconsistente ou risco real. Não produza código
   sobre hipótese silenciosa.
3. **Simplicidade.** Implemente o que foi pedido. Sem abstração prematura — abstraia na terceira
   repetição. A ressalva é **acessibilidade e honestidade do conteúdo**: não são "features",
   são obrigatórias mesmo quando o pedido não menciona.
4. **Mudanças cirúrgicas.** Leia o arquivo inteiro antes de editar, siga o padrão que já está
   lá, não reformate o que não faz parte da mudança.
5. **Critério de sucesso é verificável.** Rode `/verificar` e mostre a saída. Se falhou, diga
   que falhou.

**Não confie no diagnóstico do editor neste projeto.** Ele atrasa vários segundos e já apontou
erro em arquivo que o `tsc` aceitava. A verdade é `npm run typecheck`.

---

## Parte 2 — Regras do projeto

### Sistema de design 🎨

- **Nunca escreva cor, fonte, raio ou sombra literal num componente.** Tudo sai dos tokens
  (`bg-bg`, `text-ink-2`, `border-line`, `rounded-card`, `font-display`, `shadow-lift`).
  A única exceção legítima são as miniaturas do showcase, que pintam a paleta de cada demo
  fora do tema ativo — e por isso usam `style` inline com as cores do registro.
- **Identidade nova = bloco `[data-theme]` novo em `src/index.css`**, não componente novo.
  Se você está criando uma variante de componente para "ficar diferente", provavelmente devia
  estar mexendo em token.
- **O seletor `[data-theme="x"]` tem que ser idêntico ao slug da rota.** `DemoFrame` aplica
  `data-theme={slug}`. Já perdemos tempo com `/demo/saas-ai` apontando para `[data-theme="saas"]`:
  a página renderizou inteira com a paleta errada e sem erro nenhum.
- Seções que invertem o contraste usam `data-invert` no `<Section>` — o bloco correspondente
  precisa existir no tema.

### A armadilha do Tailwind (leia antes de "só passar uma classe") ⚠️

Classe passada por prop **não vence** com segurança uma classe da base do componente quando as
duas mexem na mesma propriedade. Quem decide é a ordem no CSS gerado, não a ordem no atributo.
Dois bugs reais aqui:

- `<Button className="hidden sm:inline-flex">` — o `inline-flex` da base ganhou e o botão
  apareceu no mobile. **Solução: envolver num `<span className="hidden sm:block">`.**
- `<Section className="pt-4">` contra o `py-32` da base — o `py-32` ganhou. **Solução: prop
  `pad` no componente.**

Regra: para mudar comportamento de um componente compartilhado, **crie uma prop** (`variant`,
`pad`, `cols`) ou use um wrapper. Sobrescrever por `className` só vale para propriedades que a
base não define.

### z-index negativo dentro de botão ⚠️

`position: relative` com `z-index: auto` **não cria contexto de empilhamento**. Um filho com
`-z-10` não fica atrás do irmão — escapa e vai para trás do fundo do ancestral.

Foi assim que a pílula do alternador de ciclo dos planos sumiu por baixo do `bg-surface` do
tablist: o rótulo ativo (`text-on-accent`, branco) ficava branco no branco e virava ilegível.
Estava lá desde a primeira versão, nos cinco demos com planos, e no `Tabs` variante `pill`.

**Padrão certo:** a pílula fica em fluxo normal (`absolute inset-0`, sem z-index) e o rótulo
sobe com `<span className="relative z-10">`. Nunca `-z-*` num filho de botão.

### Movimento

- Toda animação respeita `prefers-reduced-motion` — pelo CSS global e por `useReducedMotion()`
  onde há deslocamento.
- **O gatilho de `whileInView` tem que ficar num elemento que realmente intersecta.** O
  `MaskReveal` nasceu quebrado porque o observer estava no conteúdo deslocado para fora da
  máscara: o recorte do ancestral zera a interseção e a animação nunca dispara. O título ficava
  invisível, sem erro no console.
- Ao revisar com screenshot, lembre que quase tudo entra por scroll: **role a página antes de
  fotografar**, senão você "conserta" uma seção que só não tinha aparecido ainda.

### Imagens 📷

- **Nunca adicione uma foto sem ter olhado para ela.** O caminho é a skill `/foto`: colher IDs,
  montar folha de contato, ver, e só então escrever em `src/lib/images.ts`.
- IDs ficam só em `src/lib/images.ts`. Componente usa `<Img id={...} />`, nunca URL literal.
- Depois de mexer nos IDs, rode `npm run photos` — ele baixa o que falta e regenera
  `src/lib/photos-local.ts`. O que não estiver local cai no CDN de origem sozinho.
- `Img` já é `position: relative` (precisa disso para o overlay). **Não passe `absolute` no
  `className`** — as duas classes brigam e o hero cresce para 2000px. Use um wrapper posicionado.
- Nenhum rosto repetido na mesma página. Entre páginas diferentes, tudo bem.
- `alt` em português descrevendo a cena. Foto decorativa recebe `alt=""`.

### Conteúdo ✍️

- Sem Lorem Ipsum. Texto plausível, escrito para aquele negócio, com foco em benefício.
- **Onde um leitor poderia se enganar, a página diz que é demonstração**: rodapé de toda demo,
  formulários ("nenhum dado é enviado"), blocos de números e cases. Isso não é opcional — é a
  regra 1 da prioridade.
- Valores em reais, sempre via `brl()` (`src/lib/utils.ts`).
- **`src/lib/precos.ts` é a exceção à regra do conteúdo fictício**: ali está a oferta comercial
  de verdade, apresentada na seção `#planos` do showcase. Preço muda ali e em lugar nenhum mais.
- Contadores animados são para número, não para ano: `Counter` formata em pt-BR e transformaria
  2027 em "2.027".

### Acessibilidade

- **`npm run contraste` precisa passar.** Ele confere `ink`, `ink-2`, `ink-3` e `on-accent`
  contra os quatro fundos de cada tema, na régua de 4.5:1. A auditoria de 19/08 encontrou
  `ink-3` reprovando nos **dez** temas ao mesmo tempo: é o tipo de defeito invisível no olho
  que aparece na frente do cliente. Se um ajuste de paleta reprovar, mexa na luminosidade e
  preserve o matiz.
- **Título nunca vai dentro de link ou botão.** `<a><h3>` é modelo de conteúdo inválido e faz
  o leitor de tela anunciar o card inteiro como um nome só. Inverta: `<h3><a>` ou `<h3><button>`,
  e estique o interativo sobre o card com `after:absolute after:inset-0`. Foi assim que os 45
  casos da auditoria foram resolvidos sem perder o clique no card inteiro.
- Contraste legível em todos os temas — inclusive texto sobre foto, que precisa de gradiente
  por baixo.
- `:focus-visible` já é global; não remova o outline.
- Componente interativo carrega o papel e o estado: `aria-expanded` no acordeão, `role="tab"` +
  `aria-selected` nas abas, `role="dialog"` + Escape + trava de scroll no modal.
- Alvo de toque no mobile com pelo menos 44px de altura.

### Offline e publicação

- O service worker (`public/sw.js`) é escrito à mão, mas a **lista de precache é gerada** por
  `scripts/build-sw.mjs` depois do build. Não edite a lista na mão.
- **`ignoreVary: true` no `caches.match` é obrigatório, não otimização.** O Vite emite
  `<script crossorigin>`, o navegador pede em modo CORS mandando `Origin`, e a resposta guardada
  declara `Vary: Origin` — sem isso o match falha justamente para o JS e o CSS, e a página abre
  em branco offline. Está comentado no arquivo; não remova.
- Cache de mídia (`norte-media`) **não** é versionado de propósito: um deploy novo não deve
  fazer o celular rebaixar 13 MB.

---

## Definition of Done

> Vale o que for relevante à alteração — um ajuste de texto não envolve service worker.

- [ ] `npm run typecheck`, `npm run build` e `npm run contraste` limpos (mostrar a saída).
- [ ] Sem cor/fonte/raio literal fora dos tokens.
- [ ] Se mexeu em componente compartilhado: mudança por prop, não por `className` competindo.
- [ ] Animação nova respeita `prefers-reduced-motion` e o gatilho intersecta de verdade.
- [ ] Foto nova foi vista antes de entrar; `npm run photos` rodado; `alt` escrito.
- [ ] As 11 rotas abrem sem erro de console, sem imagem quebrada e sem overflow horizontal
      (`/verificar` faz isso).
- [ ] Testado em 390px, não só no desktop.
- [ ] Conteúdo novo deixa claro que é demonstração onde caberia confusão.
