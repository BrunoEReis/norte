/**
 * Injeta a lista de precache no service worker depois do `vite build`.
 *
 * Os nomes dos assets têm hash, então a lista só existe depois do build —
 * daí este passo em vez de uma lista escrita à mão (que ficaria desatualizada
 * silenciosamente e quebraria o offline sem ninguém perceber).
 */
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const assets = (await readdir(path.join(dist, 'assets'))).map((f) => `/assets/${f}`)

// Só o essencial para a casca abrir: HTML, ícones e manifesto. As fotos ficam
// no cache de runtime, para não baixar 13 MB no plano de dados de ninguém.
const precache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  ...assets,
]

const template = await readFile(path.join(dist, 'sw.js'), 'utf8')
const version = createHash('sha1').update(precache.join('|')).digest('hex').slice(0, 12)

const output = template
  .replaceAll('__VERSION__', version)
  .replaceAll('__PRECACHE__', JSON.stringify(precache, null, 2))

for (const marker of ['__VERSION__', '__PRECACHE__']) {
  if (output.includes(marker)) throw new Error(`marcador ${marker} não foi substituído`)
}

await writeFile(path.join(dist, 'sw.js'), output)

console.log(`service worker: versão ${version}, ${precache.length} arquivos no precache`)
