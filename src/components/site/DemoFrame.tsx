import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { SkipLink } from '@/components/ui/SkipLink'
import { DEMOS } from '@/lib/demos'
import { EASE_BRAND } from '@/lib/motion'

/**
 * Casca de apresentação: aplica o tema da demo e mantém uma barra discreta de
 * navegação entre as páginas do portfólio. A barra tem paleta própria (fixa)
 * para nunca se confundir com a interface da landing page.
 *
 * ─── `?cliente` — o link que se manda para um lead ───────────────────────────
 *
 * Com `?cliente` na URL a barra não é renderizada, e com ela some o **único**
 * caminho daqui para o showcase (conferido: nenhum demo linka para a raiz).
 *
 * Por que isso importa: o showcase traz a tabela de preços real, de R$ 1.900 a
 * R$ 6.900. Mandar a demo crua para um lead é mostrar "uma página como a sua";
 * mandar com a barra é entregar, a um clique, o preço antes do argumento — e o
 * número chega sem o contexto que só a conversa dá.
 *
 * ⚠️ **Isto tira o caminho, não a possibilidade.** Quem digitar o domínio na
 * mão chega no showcase do mesmo jeito. Serve para ninguém cair lá sem querer,
 * não para esconder preço de quem procurar.
 */
export function DemoFrame({ slug, children }: { slug: string; children: ReactNode }) {
  const [visible, setVisible] = useState(true)
  const [params] = useSearchParams()
  const paraCliente = params.has('cliente')
  const index = DEMOS.findIndex((d) => d.slug === slug)
  const demo = DEMOS[index]
  const prev = DEMOS[(index - 1 + DEMOS.length) % DEMOS.length]
  const next = DEMOS[(index + 1) % DEMOS.length]

  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]')
    const descAnterior = meta?.getAttribute('content') ?? ''
    if (demo) meta?.setAttribute('content', demo.description)
    if (demo) document.title = `${demo.brand} — demo Norte`
    return () => {
      document.title = 'Norte — Coleção de Landing Pages'
      meta?.setAttribute('content', descAnterior)
    }
  }, [demo])

  // A barra só aparece depois que a página começa a rolar (para não competir
  // com o hero) e se esconde ao descer, voltando ao subir ou no fim da página.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const bottom = document.body.scrollHeight - window.innerHeight - 160
      setVisible(y > 160 && (y < last || y >= bottom))
      last = y
    }
    setVisible(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div data-theme={slug} id="top" className="min-h-dvh bg-bg text-ink">
      <SkipLink />
      <div id="conteudo">{children}</div>

      {!paraCliente && (
        <motion.div
          initial={false}
          animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.45, ease: EASE_BRAND }}
          className="pointer-events-none fixed inset-x-0 bottom-4 z-90 flex justify-center px-4 print:hidden"
        >
          <div
            className="pointer-events-auto flex items-center gap-1 rounded-full border p-1 shadow-2xl backdrop-blur-xl"
            style={{ background: 'rgba(12,12,14,0.86)', borderColor: 'rgba(255,255,255,0.12)' }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.78rem] font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              <LayoutGrid className="size-3.5" />
              <span className="hidden sm:inline">Todas as demos</span>
              <span className="sm:hidden">Demos</span>
            </Link>
            <span className="h-5 w-px" style={{ background: 'rgba(255,255,255,0.14)' }} aria-hidden="true" />
            <Link
              to={`/demo/${prev.slug}`}
              aria-label={`Demo anterior: ${prev.brand}`}
              className="grid size-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-3.5" />
            </Link>
            <span className="px-1 text-[0.72rem] tabular-nums text-white/45">
              {demo?.index} / {String(DEMOS.length).padStart(2, '0')}
            </span>
            <Link
              to={`/demo/${next.slug}`}
              aria-label={`Próxima demo: ${next.brand}`}
              className="grid size-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
