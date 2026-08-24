# Norte — Coleção de Landing Pages

> ⚠️ **Reconstrução parcial.** O README original (8.798 bytes) foi sobrescrito por engano em
> 24/08/2026 ao criar a versão em inglês, e o projeto ainda não estava em git. O que segue foi
> reconstruído a partir do conteúdo lido na mesma sessão — **cobre até a seção "Arquitetura"**.
> O que vinha depois se perdeu. O [README.md](README.md) em inglês cobre a mesma operação e mais
> um pouco; este arquivo existe para quem prefere a versão em português.

Dez landing pages demonstrativas, cada uma com identidade visual própria, conteúdo escrito para o
negócio e os padrões de conversão que funcionam naquele mercado. A página inicial (`/`) é um
showcase para apresentar tudo a um cliente.

**Todas as marcas, textos, números, preços e depoimentos são fictícios.**

## Rodando

```bash
npm install
npm run photos   # baixa as fotos para public/photos (opcional, ~22 MB em webp)
npm run dev
```

Abre em `http://localhost:5273`.

| Script              | O que faz                                                  |
| ------------------- | ---------------------------------------------------------- |
| `npm run dev`       | servidor de desenvolvimento                                |
| `npm run build`     | checagem de tipos + build de produção                      |
| `npm run preview`   | serve o build em `http://localhost:4173`                   |
| `npm run typecheck` | só a checagem de tipos                                     |
| `npm run contraste` | mede todos os pares de token contra a régua WCAG AA        |
| `npm run photos`    | baixa as fotos usadas e regenera `src/lib/photos-local.ts` |

As fotos são servidas do próprio projeto quando existem em `public/photos` (webp, duas larguras:
560px e 1600px); o que faltar cai automaticamente no CDN de origem (Unsplash). Ou seja, o projeto
funciona sem rodar `npm run photos` — só fica dependente de rede.

**As fotos não vão para o git** (~22 MB). Rode `npm run photos` depois de clonar.

## Publicando (para abrir no celular)

O build é estático — dá para hospedar em qualquer CDN. A recomendação é **Cloudflare Pages**: o
plano gratuito permite uso comercial (o Hobby da Vercel não), tem banda ilimitada e POP em São
Paulo.

```bash
npm run build
npx wrangler pages deploy dist --project-name=norte
```

Na primeira vez o Wrangler abre o navegador para você entrar na conta Cloudflare. No fim ele
imprime a URL.

> O projeto no Cloudflare chama `norte`, mas o domínio saiu **`norte-dde`** porque `norte` já
> estava tomado. Não confunda os dois ao rodar o `wrangler`: o `--project-name` é `norte`.
> E o Wrangler imprime também uma URL com hash na frente — aquela é daquele deploy específico e
> muda a cada subida. **O link para compartilhar é o sem hash.**

O `public/_redirects` já está configurado para as rotas do lado do cliente — sem ele, abrir
`/demo/imobiliaria` direto no celular daria 404. O mesmo arquivo serve para o Netlify. Na Vercel,
o equivalente seria um `vercel.json` com `rewrites`.

`public/robots.txt` bloqueia indexação de propósito: as páginas têm marcas, CNPJs e registros
profissionais fictícios, e ninguém deve encontrar a "Clínica Aurora" no Google achando que ela
existe.

### No celular

A coleção é instalável. Abrindo a URL e usando **Adicionar à tela de início** (menu do Chrome no
Android, botão de compartilhar no Safari do iPhone), ela ganha ícone próprio e abre em tela cheia,
sem barra de navegador — o que faz diferença ao apresentar para um cliente.

### Offline

Um service worker (`public/sw.js`, ativo só em produção) guarda a aplicação e o que já foi visto.
Depois de abrir as dez demos uma vez com internet, elas funcionam sem conexão nenhuma — testado
com o servidor derrubado: as páginas abrem, com fotos e fontes, sem erro de console.

Dois caches separados de propósito:

- `norte-shell-<versão>` — HTML, JS e CSS. Trocado a cada deploy.
- `norte-media` — fotos e fontes. **Não** versionado, para um deploy novo não jogar fora os
  megabytes já baixados no celular.

O documento é buscado com rede primeiro, então um deploy novo aparece sozinho — não é preciso
limpar cache no aparelho.

> As fotos entram no cache conforme são exibidas, não de uma vez. **Antes de sair para uma
> reunião, vale abrir as dez demos no wifi e rolar até o fim de cada uma.** São ~22 MB no total;
> fazer isso no plano de dados do cliente seria feio.

O `scripts/build-sw.mjs` roda depois do `vite build` e injeta no service worker a lista de
arquivos com hash. Sem esse passo a lista ficaria desatualizada em silêncio e o offline quebraria
sem aviso.

## Rotas

| Rota                 | Demo                                               | Direção visual                                            |
| -------------------- | -------------------------------------------------- | --------------------------------------------------------- |
| `/`                  | Showcase                                           | Dark editorial, âmbar                                     |
| `/demo/saas-ai`      | **Órion** — plataforma de IA operacional           | Dark premium, bento grid, UI de produto em CSS            |
| `/demo/agencia`      | **PAUTA®** — estúdio de marca                      | Editorial em papel, serifa display, azul elétrico         |
| `/demo/clinica`      | **Clínica Aurora** — medicina integrativa          | Clean, verde profundo, formulário acima da dobra          |
| `/demo/imobiliaria`  | **Vertente** — residências de alto padrão          | Luxo escuro, dourado, fotografia em tela cheia            |
| `/demo/ecommerce`    | **Alta Colheita** — café por assinatura            | Warm, produto grande, comparativo                         |
| `/demo/consultoria`  | **Vetor Partners** — consultoria de gestão         | Corporativo, navy + ouro, números auditados               |
| `/demo/adega`        | **Adega Meia-Noite** — bebida com delivery próprio | Noturno, neon ciano, catálogo e zona de entrega           |
| `/demo/barbearia`    | **Navalha** — barbearia e clube                    | Couro e latão, condensada, agendamento e assinatura       |
| `/demo/hamburgueria` | **Chapa 9** — hamburgueria artesanal               | Brasa, apetite, cardápio em abas                          |
| `/demo/petshop`      | **Amigo Pet & Vet** — pet shop e clínica           | Claro e quente, coral + verde-água, relatório no WhatsApp |

Uma barra discreta no rodapé de cada demo volta para o showcase e navega entre as páginas.

## Arquitetura

```
src/
  index.css              sistema de design: tokens por tema (@theme inline)
  lib/
    demos.ts             registro das demos (metadados do showcase)
    images.ts            curadoria de fotos por demo
    photos-local.ts      gerado por `npm run photos`
    motion.ts            variantes e easing compartilhados
  components/site/       Navbar, LogoCloud, Features, Pricing, Tabs, Section, …
  demos/<slug>/          composição e texto de cada demo
  pages/Showcase.tsx     índice com as miniaturas por demo
scripts/
  check-contrast.mjs     trava de contraste WCAG AA
  build-sw.mjs           injeta a lista de arquivos com hash no service worker
```

---

> **A partir daqui o original se perdeu.** As regras do projeto continuam íntegras em
> [CLAUDE.md](CLAUDE.md) e o estado em [HANDOFF.md](HANDOFF.md) — nenhum dos dois foi tocado.
> Se lembrar do que vinha depois, acrescente aqui.
