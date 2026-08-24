import { useEffect } from 'react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container, Section } from '@/components/ui/Container'
import { SkipLink } from '@/components/ui/SkipLink'
import { Marquee } from '@/components/ui/Marquee'
import { MaskReveal, Reveal } from '@/components/ui/Reveal'
import { Precos } from '@/components/site/Precos'
import { DEMOS } from '@/lib/demos'
import type { DemoMeta } from '@/lib/demos'
import { IMG } from '@/lib/images'
import { EASE_BRAND } from '@/lib/motion'
import { cn, photo } from '@/lib/utils'
import { useScrolled } from '@/lib/hooks'

/* --------------------------------------------------------------------------
   Miniaturas: cada demo ganha uma composição própria, com a paleta e a
   fotografia reais da página — não um screenshot genérico.
-------------------------------------------------------------------------- */

function PreviewSaas({ d }: { d: DemoMeta }) {
  const [bg, accent, accent2] = d.swatch
  return (
    <div className="h-full w-full p-5" style={{ background: bg }}>
      <div
        className="h-full w-full rounded-lg border p-3"
        style={{ borderColor: '#1c2331', background: '#0c0e13' }}
      >
        <div className="mb-3 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full" style={{ background: '#2b3444' }} />
          ))}
        </div>
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {['18,4%', '1,9%', '27 d'].map((v, i) => (
            <div key={v} className="rounded border px-2 py-1.5" style={{ borderColor: '#1c2331' }}>
              <span className="block h-1 w-5 rounded" style={{ background: '#2b3444' }} />
              <span
                className="mt-1.5 block text-[0.62rem] font-semibold"
                style={{ color: i === 0 ? accent2 : '#dbe2ee' }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
        <div className="flex h-[42%] items-end gap-1">
          {[35, 52, 44, 63, 55, 74, 66, 88, 78, 96].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-[2px]"
              style={{ height: `${h}%`, background: i > 6 ? accent : '#232c3b' }}
            />
          ))}
        </div>
        <div
          className="mt-3 rounded px-2 py-1.5"
          style={{ background: `${accent}1f`, border: `1px solid ${accent}55` }}
        >
          <span className="block text-[0.55rem]" style={{ color: accent }}>
            ÓRION DETECTOU
          </span>
          <span className="mt-0.5 block h-1 w-3/4 rounded" style={{ background: '#2b3444' }} />
        </div>
      </div>
    </div>
  )
}

function PreviewAgencia({ d }: { d: DemoMeta }) {
  const [bg, ink, accent] = d.swatch
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: bg }}>
      <div className="flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <span style={{ color: ink, fontFamily: '"Instrument Serif", serif', fontSize: '1.05rem' }}>
            PAUTA®
          </span>
          <span className="text-[0.55rem] uppercase tracking-[0.2em]" style={{ color: accent }}>
            Estúdio de marca
          </span>
        </div>
        <p
          className="max-w-[85%] leading-[0.92]"
          style={{
            color: ink,
            fontFamily: '"Instrument Serif", serif',
            fontSize: 'clamp(1.5rem, 4.2vw, 2.4rem)',
          }}
        >
          Marcas que não precisam <span style={{ color: accent }}>gritar.</span>
        </p>
        <div className="flex gap-2">
          <span className="h-12 flex-1 overflow-hidden">
            <img src={photo(IMG.agencia.work[0], 300)} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="h-12 flex-1 overflow-hidden">
            <img src={photo(IMG.agencia.work[1], 300)} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="h-12 flex-1" style={{ background: accent }} />
        </div>
      </div>
    </div>
  )
}

function PreviewClinica({ d }: { d: DemoMeta }) {
  const [bg, accent, soft] = d.swatch
  return (
    <div className="h-full w-full p-5" style={{ background: bg }}>
      <div className="flex h-full gap-3">
        <div className="flex flex-1 flex-col justify-center gap-2">
          <span className="text-[0.55rem] uppercase tracking-[0.16em]" style={{ color: accent }}>
            Clínica Aurora
          </span>
          <p
            style={{
              color: '#12211c',
              fontFamily: '"Fraunces", serif',
              fontSize: '1.05rem',
              lineHeight: 1.15,
            }}
          >
            Cuidado que entende o corpo inteiro.
          </p>
          <div
            className="mt-1 space-y-1.5 rounded-xl border p-2.5"
            style={{ borderColor: '#e5e9e2', background: '#fff' }}
          >
            <span className="block h-1.5 w-full rounded" style={{ background: soft }} />
            <span className="block h-1.5 w-2/3 rounded" style={{ background: soft }} />
            <span className="mt-1 block h-4 w-full rounded-full" style={{ background: accent }} />
          </div>
        </div>
        <div className="w-[38%] overflow-hidden rounded-xl">
          <img src={photo(IMG.clinica.hero, 320)} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}

function PreviewImobiliaria({ d }: { d: DemoMeta }) {
  const [, accent, ink] = d.swatch
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={photo(IMG.imobiliaria.hero, 760)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(11,10,8,.55), rgba(11,10,8,.92))' }}
      />
      <div className="relative flex h-full flex-col justify-end p-5">
        <span className="text-[0.5rem] uppercase tracking-[0.3em]" style={{ color: accent }}>
          Alto de Pinheiros
        </span>
        <p
          className="mt-2 leading-none"
          style={{
            color: ink,
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.9rem',
            letterSpacing: '0.14em',
          }}
        >
          VERTENTE
        </p>
        <span className="mt-2 h-px w-16" style={{ background: accent }} />
        <p className="mt-2 text-[0.6rem]" style={{ color: '#a79e90' }}>
          48 residências · 118 a 340 m²
        </p>
      </div>
    </div>
  )
}

function PreviewEcommerce({ d }: { d: DemoMeta }) {
  const [bg, accent, dark] = d.swatch
  return (
    <div className="h-full w-full p-5" style={{ background: bg }}>
      <div className="flex h-full items-center gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-[0.55rem] uppercase tracking-[0.14em]" style={{ color: accent }}>
            Safra 2026
          </span>
          <p
            style={{
              color: dark,
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontWeight: 700,
              fontSize: '1.15rem',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Café torrado <span style={{ color: accent }}>depois</span> que você compra.
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span style={{ color: dark, fontWeight: 700, fontSize: '0.95rem' }}>R$ 68</span>
            <span
              className="rounded-full px-2 py-0.5 text-[0.55rem]"
              style={{ background: accent, color: '#fff7ee' }}
            >
              -19%
            </span>
          </div>
          <span className="mt-1 h-5 w-24 rounded-full" style={{ background: dark }} />
        </div>
        <div className="h-full w-[42%] overflow-hidden rounded-xl">
          <img src={photo(IMG.ecommerce.hero, 340)} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}

function PreviewConsultoria({ d }: { d: DemoMeta }) {
  const [bg, ink, accent] = d.swatch
  return (
    <div className="h-full w-full p-5" style={{ background: bg }}>
      <div className="flex h-full gap-3">
        <div className="flex flex-1 flex-col justify-center gap-2">
          <span className="text-[0.52rem] uppercase tracking-[0.24em]" style={{ color: accent }}>
            Vetor Partners
          </span>
          <p
            style={{
              color: ink,
              fontFamily: '"Source Serif 4", serif',
              fontSize: '1.05rem',
              lineHeight: 1.15,
            }}
          >
            Decisão implementada. Não relatório entregue.
          </p>
          <div
            className="mt-1 rounded-md border p-2.5"
            style={{ borderColor: '#e2e8f0', background: '#f5f7fa' }}
          >
            <span style={{ color: accent, fontWeight: 700, fontSize: '1.1rem' }}>R$ 1,8 bi</span>
            <span className="mt-1 block text-[0.55rem]" style={{ color: '#4d6178' }}>
              em resultado gerado
            </span>
          </div>
        </div>
        <div className="w-[36%] overflow-hidden rounded-md">
          <img
            src={photo(IMG.consultoria.hero, 320)}
            alt=""
            className="h-full w-full object-cover grayscale"
          />
        </div>
      </div>
    </div>
  )
}

function PreviewAdega({ d }: { d: DemoMeta }) {
  const [bg, accent, amber] = d.swatch
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: bg }}>
      <img
        src={photo(IMG.adega.hero, 760)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <span
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg,#06090fef,#06090f66)' }}
      />
      <div className="relative flex h-full flex-col justify-center gap-2 p-5">
        <span className="text-[0.52rem] uppercase tracking-[0.2em]" style={{ color: accent }}>
          Aberto até 2h
        </span>
        <p
          style={{
            color: '#eef4f8',
            fontFamily: 'Anton, sans-serif',
            fontSize: '1.5rem',
            lineHeight: 0.94,
            textTransform: 'uppercase',
          }}
        >
          Gelada em <span style={{ color: accent }}>25 min</span>
        </p>
        <span
          className="mt-1 w-fit rounded-md px-2.5 py-1 text-[0.6rem] font-semibold"
          style={{ background: amber, color: '#04191c' }}
        >
          Pedir no WhatsApp
        </span>
      </div>
    </div>
  )
}

function PreviewBarbearia({ d }: { d: DemoMeta }) {
  const [bg, accent, cream] = d.swatch
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: bg }}>
      <img
        src={photo(IMG.barbearia.hero, 760)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <span
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,#100d0bcc,#100d0bf5)' }}
      />
      <div className="relative flex h-full flex-col justify-end gap-1.5 p-5">
        <span className="text-[0.5rem] uppercase tracking-[0.3em]" style={{ color: accent }}>
          Navalha · desde 2014
        </span>
        <p
          style={{
            color: cream,
            fontFamily: 'Oswald, sans-serif',
            fontSize: '1.5rem',
            lineHeight: 0.98,
            textTransform: 'uppercase',
          }}
        >
          Cadeira reservada.
          <br />
          <span style={{ color: accent }}>Sem espera.</span>
        </p>
        <span className="mt-1 h-px w-14" style={{ background: accent }} />
      </div>
    </div>
  )
}

function PreviewHamburgueria({ d }: { d: DemoMeta }) {
  const [bg, accent, mostarda] = d.swatch
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: bg }}>
      <img
        src={photo(IMG.hamburgueria.hero, 760)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,#14110ea6,#14110ef2)' }}
      />
      <div className="relative flex h-full flex-col justify-end gap-1.5 p-5">
        <span className="text-[0.52rem] uppercase tracking-[0.16em]" style={{ color: mostarda }}>
          Hamburgueria artesanal
        </span>
        <p
          style={{
            color: '#f7f0e6',
            fontFamily: 'Fraunces, Georgia, serif',
            fontWeight: 600,
            fontSize: '1.3rem',
            lineHeight: 1,
            letterSpacing: '-0.025em',
          }}
        >
          O ponto da carne não é <span style={{ color: mostarda }}>negociável</span>.
        </p>
        <span
          className="mt-1 w-fit rounded-full px-3 py-1 text-[0.58rem] font-semibold"
          style={{ background: accent, color: '#fff4ec' }}
        >
          Retirada em 15 min
        </span>
      </div>
    </div>
  )
}

function PreviewPetshop({ d }: { d: DemoMeta }) {
  const [bg, accent, teal] = d.swatch
  return (
    <div className="h-full w-full p-5" style={{ background: bg }}>
      <div className="flex h-full items-center gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-[0.52rem] uppercase tracking-[0.18em]" style={{ color: teal }}>
            Amigo · Pet & Vet
          </span>
          <p
            style={{
              color: '#2a1d18',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: '1.15rem',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Ele volta feliz. E você fica sabendo de <span style={{ color: accent }}>tudo</span>.
          </p>
          <div
            className="mt-1 rounded-2xl border p-2.5"
            style={{ borderColor: '#f2e2d8', background: '#fff' }}
          >
            <span className="block h-1.5 w-3/4 rounded" style={{ background: '#f2e2d8' }} />
            <span className="mt-1.5 block h-1.5 w-1/2 rounded" style={{ background: '#f2e2d8' }} />
            <span className="mt-2 block h-4 w-full rounded-full" style={{ background: accent }} />
          </div>
        </div>
        <div className="h-full w-[40%] overflow-hidden rounded-2xl">
          <img src={photo(IMG.petshop.hero, 340)} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}

const PREVIEWS: Record<string, (p: { d: DemoMeta }) => ReactElement> = {
  'saas-ai': PreviewSaas,
  agencia: PreviewAgencia,
  clinica: PreviewClinica,
  imobiliaria: PreviewImobiliaria,
  ecommerce: PreviewEcommerce,
  consultoria: PreviewConsultoria,
  adega: PreviewAdega,
  barbearia: PreviewBarbearia,
  hamburgueria: PreviewHamburgueria,
  petshop: PreviewPetshop,
}

/* ------------------------------------------------------------------------ */

function DemoCard({ demo, i }: { demo: DemoMeta; i: number }) {
  const Preview = PREVIEWS[demo.slug]
  return (
    <Reveal delay={(i % 2) * 0.08} className="h-full">
      {/* O card é um `article`, não um link: o título precisa continuar sendo um
          heading de verdade. Quem leva o clique do card inteiro é o "Ver demo",
          esticado por `after:absolute after:inset-0`. */}
      <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:border-line-2 hover:shadow-lift focus-within:border-accent">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-brand group-hover:scale-[1.03]">
            <Preview d={demo} />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[0.68rem] text-white/90 backdrop-blur">
            {demo.index}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="t-eyebrow text-ink-3">{demo.category}</p>
              <h3 className="t-h3 mt-2.5 font-display text-ink">{demo.title}</h3>
            </div>
            <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-all duration-400 ease-brand group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </div>

          <p className="text-pretty text-[0.94rem] text-ink-2">{demo.description}</p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {demo.style.map((s) => (
              <span key={s} className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] text-ink-3">
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-line pt-4 text-[0.78rem] text-ink-3">
            <span className="font-mono">{demo.typeface}</span>
            <span className="flex items-center gap-1.5">
              {demo.swatch.map((c) => (
                <span
                  key={c}
                  className="size-3 rounded-full ring-1 ring-inset ring-white/15"
                  style={{ background: c }}
                  aria-hidden="true"
                />
              ))}
            </span>
          </div>

          <Link
            to={`/demo/${demo.slug}`}
            className="inline-flex w-fit items-center gap-2 text-[0.9rem] font-medium text-ink transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
          >
            Ver demo
            <span className="sr-only">— {demo.title}</span>
            <ArrowRight className="size-4 transition-transform duration-400 ease-brand group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    </Reveal>
  )
}

export default function Showcase() {
  const scrolled = useScrolled(24)

  useEffect(() => {
    document.title = 'Norte — Coleção de Landing Pages'
  }, [])

  return (
    <div id="top" className="min-h-dvh bg-bg text-ink">
      <SkipLink />

      {/* HEADER ----------------------------------------------------------- */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-brand',
          scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <Container size="full">
          <div className="flex items-center justify-between py-5">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Norte">
              <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
                <path
                  d="M6 22V6l16 16V6"
                  fill="none"
                  stroke="var(--c-accent)"
                  strokeWidth="2.4"
                  strokeLinecap="square"
                />
              </svg>
              <span className="text-[1.05rem] font-semibold tracking-tight">Norte</span>
            </a>
            <span className="hidden font-mono text-[0.75rem] text-ink-3 sm:block">
              Coleção 2026 · dez demos
            </span>
            <a
              href="#planos"
              className="rounded-btn border border-line px-4 py-2 text-[0.85rem] text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
            >
              Preços
            </a>
          </div>
        </Container>
      </header>

      {/* HERO ------------------------------------------------------------- */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-44">
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-[28rem] w-[46rem] max-w-[120vw] opacity-30 blur-[100px]"
          style={{ background: 'radial-gradient(circle, var(--c-accent) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <Container size="full" className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <h1 className="t-display font-display">
              <MaskReveal>Dez páginas.</MaskReveal>
              <MaskReveal delay={0.08}>
                <span className="text-ink-3">Dez mundos diferentes.</span>
              </MaskReveal>
            </h1>
            <Reveal delay={0.3} className="flex flex-col gap-6 lg:pb-4">
              <p className="t-lead max-w-md text-pretty text-ink-2">
                Uma coleção de landing pages demonstrativas: cada uma com identidade própria, conteúdo escrito
                para o negócio e os padrões de conversão que funcionam naquele mercado.
              </p>
              <div className="flex flex-col gap-y-2 border-t border-line pt-6 font-mono text-[0.78rem] text-ink-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                <span>A partir de R$ 1.900</span>
                <span>No ar em 7 dias</span>
                <span>O código é seu</span>
              </div>
            </Reveal>
          </div>
        </Container>

        <div className="mt-16 border-y border-line py-4 sm:mt-20">
          <Marquee duration={40} gap="3rem">
            {DEMOS.map((d) => (
              <span
                key={d.slug}
                className="flex shrink-0 items-center gap-6 font-display text-[1.5rem] text-ink-2"
              >
                {d.brand}
                <span className="text-accent">/</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* GRID ------------------------------------------------------------- */}
      <Section id="conteudo" pad="md">
        <Container size="full">
          {/* O grid pulava de h1 para h3; este h2 fecha a hierarquia sem
              acrescentar ruído visual. */}
          <h2 className="sr-only">As demos da coleção</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {DEMOS.map((d, i) => (
              <DemoCard key={d.slug} demo={d} i={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* PREÇOS ----------------------------------------------------------- */}
      <Precos />
      {/* CTA -------------------------------------------------------------- */}
      <Section className="border-t border-line">
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_BRAND }}
            className="flex flex-col items-start gap-7"
          >
            <span className="t-eyebrow text-ink-3">Próximo passo</span>
            <h2 className="t-h1 max-w-3xl text-balance font-display">
              Escolha a que mais se parece com a sua empresa. A gente adapta o resto.
            </h2>
            <p className="t-lead max-w-xl text-pretty text-ink-2">
              Qualquer uma delas vira uma página real com a sua marca e o seu conteúdo por R$ 1.900 a R$
              3.400, no ar em 7 a 12 dias úteis.
            </p>
            <a
              href="#planos"
              className="group inline-flex items-center gap-2.5 rounded-btn bg-accent px-7 py-4 font-medium text-on-accent transition-[filter] duration-300 hover:brightness-110"
            >
              Ver os pacotes e preços
              <ArrowRight className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
            </a>
          </motion.div>
        </Container>
      </Section>

      <footer className="border-t border-line py-10">
        <Container size="full">
          <div className="flex flex-col gap-3 text-[0.82rem] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Norte — coleção de landing pages demonstrativas, 2026.</p>
            <p>Marcas, textos, números e depoimentos são fictícios. Fotografia: Unsplash.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
