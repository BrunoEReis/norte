/* eslint-disable no-restricted-globals */
/**
 * Service worker da coleção.
 *
 * O caso de uso é apresentação em campo: o notebook fica no escritório e o
 * celular precisa abrir as seis demos numa sala de reunião com wifi ruim.
 *
 * Dois caches, de propósito:
 *  - `shell`  — HTML, JS e CSS. Versionado por build; some a cada deploy.
 *  - `media`  — fotos e fontes. NÃO versionado: os arquivos têm nome estável,
 *               então um deploy novo não joga fora os 13 MB já baixados.
 *
 * Os dois marcadores abaixo (versão e lista de precache) são preenchidos por
 * scripts/build-sw.mjs, que roda depois do `vite build`.
 */
const VERSION = '__VERSION__'
const PRECACHE = __PRECACHE__

const SHELL_CACHE = `norte-shell-${VERSION}`
const MEDIA_CACHE = 'norte-media'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k.startsWith('norte-shell-') && k !== SHELL_CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

/** Guarda a resposta e devolve — usado pelas estratégias abaixo. */
async function cachePut(cacheName, request, response) {
  if (response && (response.ok || response.type === 'opaque')) {
    const cache = await caches.open(cacheName)
    await cache.put(request, response.clone())
  }
  return response
}

/**
 * `ignoreVary` é obrigatório aqui, não é otimização.
 *
 * O Vite emite `<script crossorigin>` e `<link crossorigin>`, então o
 * navegador pede esses arquivos em modo CORS, com header `Origin`. As
 * respostas guardadas no install vieram de requisições sem esse header e
 * declaram `Vary: Origin` — sem `ignoreVary` o match falha, cai na rede e o
 * offline não funciona justamente para o JS e o CSS da aplicação.
 */
const MATCH = { ignoreVary: true }

async function cacheFirst(request, cacheName) {
  const hit = await caches.match(request, MATCH)
  if (hit) return hit
  try {
    const response = await fetch(request)
    return await cachePut(cacheName, request, response)
  } catch {
    return new Response('', { status: 504, statusText: 'Offline e sem cópia em cache' })
  }
}

/** Documento: rede primeiro, para um deploy novo aparecer sem limpar cache. */
async function networkFirstDocument(request) {
  try {
    const response = await fetch(request)
    await cachePut(SHELL_CACHE, '/index.html', response)
    return response
  } catch {
    return (await caches.match('/index.html', MATCH)) ?? Response.error()
  }
}

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com']

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstDocument(request))
    return
  }

  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(request, MEDIA_CACHE))
    return
  }

  if (url.origin !== self.location.origin) return

  // As fotos vão para o cache que sobrevive a deploys.
  if (url.pathname.startsWith('/photos/')) {
    event.respondWith(cacheFirst(request, MEDIA_CACHE))
    return
  }

  // Todo o resto da origem (assets com hash, ícones, manifesto) é imutável
  // dentro de um build: cache primeiro.
  event.respondWith(cacheFirst(request, SHELL_CACHE))
})
