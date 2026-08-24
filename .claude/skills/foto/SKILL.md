---
name: foto
description: Trocar ou acrescentar uma foto nas demos — colher candidatas no Unsplash, ver antes de escolher, registrar em images.ts e baixar para o projeto. Use quando o usuário pedir para trocar uma imagem, achar uma foto melhor, ou reclamar que uma foto está ruim ou "cara de banco de imagem".
tools: Read, Glob, Grep, Bash, Edit
---

# Foto

**Regra que não se dobra: nunca escreva um ID em `src/lib/images.ts` sem ter olhado para a
foto.** Escolher por nome de busca produz página com imagem que não conversa com o texto — que
é exatamente o que separa isto de um template.

## Por que Unsplash e não Pexels

O Pexels bloqueia `curl` e `fetch` do Node (timeout de conexão, sem resposta) enquanto continua
servindo o navegador normalmente. Também devolve 522 no endpoint de recorte (`&h=&fit=crop`)
sob carga. O projeto migrou inteiro para o Unsplash, que responde aos dois. Não volte para o
Pexels sem testar `curl` antes.

## 1. Colher candidatas

As páginas de busca do Unsplash são renderizadas por JS — `curl` devolve 307. Use o navegador
(Playwright ou o painel), com uma aba já em `unsplash.com`, e busque por `fetch` na própria
origem:

```js
async () => {
  const qs = ['termo-um', 'termo-dois']
  const out = {}
  for (const q of qs) {
    const r = await fetch('/pt-br/s/fotografias/' + q, { headers: { Accept: 'text/html' } })
    const t = await r.text()
    const m = t.match(/images\.unsplash\.com\/photo-[a-z0-9]+-[a-z0-9]+/g) || []
    out[q] = [...new Set(m)].slice(0, 12).map((s) => s.replace('images.unsplash.com/', ''))
  }
  return out
}
```

Busque em inglês — o acervo é muito maior.

## 2. Ver antes de escolher

Monte uma folha de contato e **leia a imagem**. O `sharp` fica no diretório de scratchpad da
sessão; se não estiver, `npm i sharp` lá dentro.

```js
import sharp from 'sharp'
const U = (id) => `https://images.unsplash.com/${id}?w=520&h=360&fit=crop&q=70`
// baixa cada uma, redimensiona para 250x172, compõe numa grade de 6 colunas
// e escreve o índice embaixo de cada tile — o índice é como você as identifica depois
```

Grade de 6 colunas, ~30 por folha, com o número de cada uma escrito embaixo. Depois `Read` no
JPEG gerado e escolha pelos índices. **Cuidado ao mapear índice → ID**: conte a ordem do array
que você passou, não a ordem visual que você imagina.

O que procurar: coerência com a paleta do tema (uma foto quente numa página fria briga), rosto
visível se for retrato, e ausência de marca de terceiros legível — pacote com logotipo de outra
empresa não entra.

## 3. Registrar e baixar

Escreva o ID em `src/lib/images.ts`, com um comentário curto do que é a foto quando não for
óbvio pelo nome da chave. Depois:

```bash
npm run photos
```

Baixa só o que falta (é retomável), grava em `public/photos` como webp em duas larguras
(560 e 1600) e regenera `src/lib/photos-local.ts`. O que não estiver local cai no CDN sozinho —
o site não quebra no meio do caminho.

Se trocou uma foto, **apague os arquivos antigos** de `public/photos` antes de rodar, senão
ficam órfãos ocupando espaço. Já aconteceu de sobrarem 90 arquivos de 15 MB de uma fonte
abandonada.

## 4. Conferir

- `alt` em português descrevendo a cena, não o nome do arquivo. Decorativa recebe `alt=""`.
- **Nenhum rosto repetido na mesma página.** Entre páginas diferentes, tudo bem — ninguém vê as
  duas ao mesmo tempo. Há um script de checagem no histórico da sessão de 19/08 que compara
  `IMG.faces.*` por arquivo de demo.
- Rodar `/verificar` — a varredura acusa imagem quebrada.

## Tamanho

`lg` é 1600px a q=50 em webp; a foto mais pesada do acervo dá ~1 MB (cidade à noite, muito
detalhe), a maioria fica em 200–400 KB. Se uma foto nova passar de 1 MB, baixe a qualidade dela
em vez de aceitar o peso — `scripts/fetch-photos.mjs`, constante `SIZES`.
