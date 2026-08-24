/**
 * Baixa para public/photos as fotos usadas pelas demos.
 *
 * Servimos as imagens do próprio projeto de propósito: uma apresentação para
 * cliente não pode depender de CDN externo. O script é retomável (pula o que
 * já está em disco) e, ao final, regenera src/lib/photos-local.ts — o que não
 * tiver sido baixado continua sendo servido pela origem.
 *
 * Uso: npm run photos
 */
import { mkdir, writeFile, access, readdir } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'photos')

// Fonte da verdade: os IDs declarados em src/lib/images.ts.
const source = readFileSync(path.join(root, 'src', 'lib', 'images.ts'), 'utf8')
const ids = [...new Set(source.match(/photo-[a-z0-9]+-[a-z0-9]+/g) ?? [])]

const SIZES = [
  { suffix: 'sm', w: 560, q: 60 },
  { suffix: 'lg', w: 1600, q: 50 },
]

// webp com qualidade calibrada: cerca de metade do peso do JPEG equivalente,
// sem diferença visível nas larguras em que as fotos são exibidas.
const url = (id, w, q) => `https://images.unsplash.com/${id}?fm=webp&fit=crop&q=${q}&w=${w}`

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  )

async function download(id, { suffix, w, q }) {
  const file = path.join(outDir, `${id}-${suffix}.webp`)
  if (await exists(file)) return 'cache'
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url(id, w, q), { signal: AbortSignal.timeout(25_000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 2000) throw new Error('resposta muito pequena')
      await writeFile(file, buf)
      return 'ok'
    } catch (err) {
      if (attempt === 4) return `falhou (${err.message})`
      await sleep(attempt * 1500)
    }
  }
}

await mkdir(outDir, { recursive: true })
console.log(`${ids.length} fotos x ${SIZES.length} tamanhos`)

let ok = 0
let cache = 0
const fails = []
for (const id of ids) {
  for (const size of SIZES) {
    const result = await download(id, size)
    if (result === 'ok') ok++
    else if (result === 'cache') cache++
    else fails.push(`${id}-${size.suffix}: ${result}`)
  }
}

const local = (await readdir(outDir))
  .filter((f) => f.endsWith('.webp'))
  .map((f) => f.replace(/\.webp$/, ''))
  .sort()

await writeFile(
  path.join(root, 'src', 'lib', 'photos-local.ts'),
  `/**
 * Gerado por \`npm run photos\`. Não edite à mão.
 *
 * Lista as fotos já baixadas para \`public/photos\`. O que estiver aqui é
 * servido pelo próprio projeto; o resto cai no CDN de origem.
 */
export const LOCAL_PHOTOS = new Set<string>([
${local.map((k) => `  '${k}',`).join('\n')}
])
`,
)

console.log(`novas: ${ok} · em cache: ${cache} · falhas: ${fails.length} · locais: ${local.length}`)
if (fails.length) {
  console.error(fails.slice(0, 10).join('\n'))
  console.error('As que faltam continuam vindo do CDN de origem.')
}
