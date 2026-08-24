/**
 * Confere o contraste dos tokens de cor de cada tema contra a régua WCAG AA.
 *
 * Roda sobre `src/index.css` — não precisa de navegador. Existe porque a
 * primeira auditoria encontrou `--c-ink-3` reprovando em **todos** os dez temas:
 * é o tipo de defeito que passa despercebido no olho e aparece na hora errada,
 * na frente do cliente.
 *
 * Uso: npm run contraste
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(path.join(root, 'src', 'index.css'), 'utf8')

const hex = (h) => {
  const s = h.replace('#', '')
  const f =
    s.length === 3
      ? s
          .split('')
          .map((c) => c + c)
          .join('')
      : s
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16))
}

const lum = ([r, g, b]) => {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

const razao = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)]
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

/** Extrai os blocos de tema e seus tokens `--c-*: #hex`. */
function blocos() {
  const out = []
  const re = /(:root|\[data-theme='[^']+'\](?:\s*\[data-invert\])?)\s*\{([^}]*)\}/g
  let m
  while ((m = re.exec(css))) {
    const nome = m[1].replace(/\[data-theme='|'\]/g, '').trim() || ':root'
    const tokens = {}
    for (const t of m[2].matchAll(/--c-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) tokens[t[1]] = t[2]
    if (Object.keys(tokens).length) out.push({ nome, tokens })
  }
  return out
}

// Texto pequeno pede 4.5:1. `ink` e `ink-2` carregam corpo de texto;
// `ink-3` carrega legenda e olho de seção — pequeno, então também precisa de 4.5.
const PARES = [
  ['ink', ['bg', 'surface', 'raise', 'wash']],
  ['ink-2', ['bg', 'surface', 'raise', 'wash']],
  ['ink-3', ['bg', 'surface', 'raise', 'wash']],
  ['on-accent', ['accent']],
]

let falhas = 0
let checados = 0

for (const { nome, tokens } of blocos()) {
  const linhas = []
  for (const [frente, fundos] of PARES) {
    if (!tokens[frente]) continue
    for (const fundo of fundos) {
      if (!tokens[fundo]) continue
      checados++
      const r = razao(hex(tokens[frente]), hex(tokens[fundo]))
      if (r < 4.5) {
        falhas++
        linhas.push(
          `    ${frente.padEnd(9)} sobre ${fundo.padEnd(8)} ${r.toFixed(2)}:1  ` +
            `(${tokens[frente]} / ${tokens[fundo]})`,
        )
      }
    }
  }
  if (linhas.length) {
    console.log(`\n  ${nome}`)
    console.log(linhas.join('\n'))
  }
}

console.log(
  `\n${checados} combinações checadas · ${falhas} abaixo de 4.5:1` + (falhas ? '' : ' — tudo passando'),
)
if (falhas) process.exitCode = 1
