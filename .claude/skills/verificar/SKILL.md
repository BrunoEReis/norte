---
name: verificar
description: Confere se a coleção está sã — tipos, build, as 11 rotas no navegador, mobile e offline — e evita as armadilhas de revisão que fazem uma página parecer quebrada sem estar. Use antes de dizer "pronto", antes de publicar, ou quando algo parecer errado visualmente.
tools: Read, Glob, Grep, Bash
---

# Verificar

O que rodar para saber que está tudo de pé — e, principalmente, **como não se enganar durante a
revisão visual**. As duas armadilhas da última seção já custaram tempo aqui: em ambas a página
estava certa e a verificação é que estava errada.

## O ciclo padrão

```bash
npm run typecheck && npm run build && npm run contraste && npm run format:check
```

**Esperado:** typecheck sem saída, contraste com `0 abaixo de 4.5:1`, build em ~1 s terminando com a linha do service worker
(`service worker: versão <hash>, N arquivos no precache`), e o Prettier dizendo que está tudo
formatado.

Se o build passou mas a linha do service worker não apareceu, o `scripts/build-sw.mjs` não
rodou — o offline vai quebrar em produção sem avisar.

**Ignore o diagnóstico do editor.** Ele atrasa segundos e já apontou erro em arquivo que o
`tsc` aceitava sem reclamar. A verdade é o `npm run typecheck`.

## Revisão visual

O painel de prévia embutido **não tira screenshot** neste ambiente (erro "the Browser pane is
not displayed"). Use o Playwright.

```bash
npm run dev    # porta 5273
```

Depois, no Playwright: `browser_resize` 1440x900 → `browser_navigate` → **rolar a página
inteira** → `browser_take_screenshot`.

### Varredura das 11 rotas

Roda tudo de uma vez e devolve o que interessa. Cole em `browser_evaluate`:

```js
async () => {
  const rotas = [
    '/',
    '/demo/saas-ai',
    '/demo/agencia',
    '/demo/clinica',
    '/demo/imobiliaria',
    '/demo/ecommerce',
    '/demo/consultoria',
    '/demo/adega',
    '/demo/barbearia',
    '/demo/hamburgueria',
    '/demo/petshop',
  ]
  const out = []
  for (const r of rotas) {
    history.pushState({}, '', r)
    window.dispatchEvent(new PopStateEvent('popstate'))
    await new Promise((res) => setTimeout(res, 500))
    for (let y = 0; y < document.body.scrollHeight; y += 900) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((res) => setTimeout(res, 120))
    }
    const imgs = Array.from(document.images)
    out.push({
      rota: r,
      titulo: document.title,
      quebradas: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      invisiveis: Array.from(document.querySelectorAll('section,div')).filter(
        (el) => getComputedStyle(el).opacity === '0',
      ).length,
    })
  }
  return out
}
```

**Esperado:** título certo em cada rota, `quebradas: 0`, `overflowX: false`. `invisiveis` deve
ser 0 em todas, com uma exceção conhecida: a imobiliária tem 4 (as camadas de imagem inativas
da lista "O que se percebe ao entrar" — é assim mesmo).

Depois, `browser_console_messages` com `level: "error"`: tem que voltar zero.

### Semântica e acessibilidade

A varredura acima também vale para o que não se vê. Cole em `browser_evaluate` e espere zero em
tudo (menos `skipLink`, que precisa ser `true`):

```js
async () => ({
  headingEmBotao: document.querySelectorAll('button h1,button h2,button h3,a h1,a h2,a h3').length,
  ancoraQuebrada: [...document.querySelectorAll('a[href^="#"]')].filter((a) => {
    const alvo = a.getAttribute('href').slice(1)
    return alvo && alvo !== 'top' && !document.getElementById(alvo)
  }).length,
  imgSemAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
  interativoAninhado: document.querySelectorAll('button button, a a, button a, a button').length,
  skipLink: !!document.querySelector('a[href="#conteudo"]'),
})
```

`headingEmBotao` é o que mais volta: a tentação de transformar o card inteiro num `<button>`
coloca o `<h3>` dentro dele. O padrão certo está no [CLAUDE.md](../../../CLAUDE.md) — heading
por fora, interativo esticado com `after:absolute after:inset-0`.

## Mobile

`browser_resize` 390x844 e repetir. Não é opcional — bugs que só aparecem no mobile já
apareceram três vezes aqui (CTA da navbar vazando, barra de aviso quebrando em duas linhas,
barra de compra flutuando alto demais).

Confira também o menu: clicar em `button[aria-label="Abrir menu"]` deve abrir a sobreposição
em tela cheia.

## Offline

Só faz sentido contra o build, não contra o dev (o service worker é desligado em
desenvolvimento de propósito).

```bash
npm run build && npx vite preview --port 4173
```

Abrir, navegar pelas dez demos para encher o cache, **derrubar o servidor** e recarregar. As
páginas têm que abrir com foto e fonte, sem erro. Para conferir o cache:

```js
async () => {
  const d = {}
  for (const k of await caches.keys()) d[k] = (await (await caches.open(k)).keys()).length
  return d
}
```

Esperado: `norte-shell-<hash>` com 41 e `norte-media` com ~90 depois de percorrer tudo.

## As duas armadilhas

**1. Seção "sumida" que só não entrou ainda.** Quase todo bloco anima na entrada por scroll
(`whileInView`). Screenshot tirado logo depois do `navigate` mostra metade da página preta —
e não há bug nenhum. **Role a página inteira e espere antes de fotografar.** Screenshot de
página completa (`fullPage: true`) tem o mesmo problema: as seções de baixo são capturadas
durante a animação.

**2. `scrollTo` que não vai aonde você mandou.** O `html` tem `scroll-behavior: smooth`, então
`window.scrollTo(0, y)` anima e o screenshot sai no meio do caminho. **Use sempre
`window.scrollTo({ top: y, behavior: 'instant' })`.**
