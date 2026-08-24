---
name: publicar
description: Sobe a coleção para o Cloudflare Pages e confere o que está no ar. Use quando o usuário pedir deploy, publicar, atualizar o site, colocar no ar, ou perguntar qual link mandar para o irmão.
tools: Read, Glob, Grep, Bash
---

# Publicar

Deploy estático no Cloudflare Pages. Estado atual e link no ar: [HANDOFF.md](../../../HANDOFF.md).

## Antes

Rode `/verificar`. Um deploy com build quebrado é pior que nenhum deploy — o Cloudflare aceita
o upload e o site fica no ar errado.

## O comando

```bash
npm run build
npx wrangler pages deploy dist --project-name=norte
```

O `--project-name` é **`norte`**. O domínio saiu `norte-dde.pages.dev` porque `norte` já estava
tomado como subdomínio — os dois nomes não batem e isso é normal.

Na primeira vez numa máquina o Wrangler abre o navegador para login OAuth na Cloudflare.

## Qual link mandar

O Wrangler imprime algo como `https://b020ba62.norte-dde.pages.dev`. **Aquilo é o deploy
específico e muda a cada subida.** O link estável, que sempre aponta para a versão atual, é o
mesmo sem o hash:

**https://norte-dde.pages.dev**

Mandar o link com hash para alguém significa que ele vai ficar vendo uma versão congelada.

## Conferir o que subiu

```bash
for u in "/" "/demo/imobiliaria" "/sw.js" "/manifest.webmanifest" "/robots.txt"; do
  printf "%-28s " "$u"
  curl -s -o /dev/null -w "%{http_code}\n" --max-time 25 "https://norte-dde.pages.dev$u"
done
```

Tudo 200. O `/demo/imobiliaria` retornando 200 é o teste do `_redirects` — se voltar 404, o
arquivo `public/_redirects` não subiu e todo link direto para uma demo está quebrado.

Depois vale abrir no navegador e checar que o service worker ficou `activated`.

## Depois de publicar

A versão nova aparece sozinha nos celulares: o documento é buscado com rede primeiro, então não
é preciso limpar cache no aparelho. As fotos já baixadas continuam valendo — o cache de mídia
não é versionado de propósito.

**Antes de uma apresentação:** abrir as dez demos no wifi e rolar até o fim de cada uma. O
offline só cobre o que já foi visto, e são ~22 MB.

## O que não fazer

- **Não publicar `dist` sem rodar o build antes.** O `dist` pode estar de uma versão anterior.
- **Não trocar o host sem ajustar o redirect.** O `_redirects` é formato Cloudflare/Netlify. Na
  Vercel seria um `vercel.json` com `rewrites` — e o plano gratuito da Vercel proíbe uso
  comercial, que é exatamente o uso daqui.
