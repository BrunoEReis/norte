import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle2, Compass, Ruler, Sparkles } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Input, Select } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { MaskReveal, Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Tabs } from '@/components/ui/Tabs'
import { Footer } from '@/components/site/Footer'
import { HeroBackdrop } from '@/components/site/HeroBackdrop'
import { Navbar } from '@/components/site/Navbar'
import { Stats } from '@/components/site/Stats'
import { IMG } from '@/lib/images'
import { EASE_BRAND } from '@/lib/motion'
import { FloorPlan, Gallery } from './ui'
import type { Room } from './ui'

/* Empreendimento, metragens, valores e incorporadora são fictícios. */

const NAV = [
  { label: 'O projeto', href: '#projeto' },
  { label: 'Plantas', href: '#plantas' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Localização', href: '#localizacao' },
]

const NUMEROS = [
  { value: 48, label: 'residências exclusivas' },
  { value: 340, suffix: ' m²', label: 'na maior cobertura' },
  { value: 18, label: 'andares, dois por pavimento' },
  { value: 62, suffix: '%', label: 'das unidades já reservadas', note: 'Entrega prevista para dez/2027' },
]

const PLANTA_118: Room[] = [
  { x: 20, y: 20, w: 150, h: 110, label: 'Living' },
  { x: 175, y: 20, w: 95, h: 110, label: 'Varanda' },
  { x: 275, y: 20, w: 105, h: 70, label: 'Cozinha' },
  { x: 275, y: 95, w: 105, h: 35, label: 'Serviço' },
  { x: 20, y: 135, w: 120, h: 90, label: 'Suíte máster' },
  { x: 145, y: 135, w: 105, h: 90, label: 'Suíte 2' },
  { x: 255, y: 135, w: 125, h: 45, label: 'Home office' },
  { x: 255, y: 185, w: 125, h: 40, label: 'Lavabo' },
  { x: 20, y: 230, w: 360, h: 48, label: 'Hall privativo' },
]

const PLANTA_186: Room[] = [
  { x: 20, y: 20, w: 190, h: 125, label: 'Living integrado' },
  { x: 215, y: 20, w: 80, h: 125, label: 'Varanda gourmet' },
  { x: 300, y: 20, w: 80, h: 80, label: 'Cozinha' },
  { x: 300, y: 105, w: 80, h: 40, label: 'Despensa' },
  { x: 20, y: 150, w: 130, h: 100, label: 'Suíte máster' },
  { x: 155, y: 150, w: 100, h: 100, label: 'Closet' },
  { x: 260, y: 150, w: 120, h: 50, label: 'Suíte 2' },
  { x: 260, y: 205, w: 120, h: 45, label: 'Suíte 3' },
  { x: 20, y: 255, w: 360, h: 25, label: 'Circulação' },
]

const PLANTA_340: Room[] = [
  { x: 20, y: 20, w: 210, h: 100, label: 'Living panorâmico' },
  { x: 235, y: 20, w: 145, h: 100, label: 'Terraço com piscina' },
  { x: 20, y: 125, w: 110, h: 70, label: 'Sala íntima' },
  { x: 135, y: 125, w: 95, h: 70, label: 'Cozinha' },
  { x: 235, y: 125, w: 145, h: 70, label: 'Master suíte' },
  { x: 20, y: 200, w: 110, h: 55, label: 'Suíte 2' },
  { x: 135, y: 200, w: 95, h: 55, label: 'Suíte 3' },
  { x: 235, y: 200, w: 145, h: 55, label: 'Adega e bar' },
  { x: 20, y: 260, w: 360, h: 20, label: 'Elevador privativo' },
]

const PLANTAS = [
  {
    id: '118',
    label: '118 m²',
    rooms: PLANTA_118,
    specs: ['2 suítes', '1 vaga com carregador', 'Varanda de 14 m²', 'Home office integrado'],
    preco: 'A partir de R$ 3,4 milhões',
    resumo:
      'A planta de entrada, pensada para casais que trabalham em casa. O home office pode virar terceiro dormitório sem obra estrutural.',
  },
  {
    id: '186',
    label: '186 m²',
    rooms: PLANTA_186,
    specs: ['3 suítes', '2 vagas com carregador', 'Varanda gourmet de 22 m²', 'Closet na suíte máster'],
    preco: 'A partir de R$ 5,2 milhões',
    resumo:
      'A opção mais procurada. Living e varanda somam quase nove metros de vão livre, com esquadria de piso a teto voltada para o parque.',
  },
  {
    id: '340',
    label: '340 m² · cobertura',
    rooms: PLANTA_340,
    specs: ['4 suítes', '4 vagas e elevador privativo', 'Terraço com piscina aquecida', 'Adega climatizada'],
    preco: 'Sob consulta · 4 unidades',
    resumo:
      'Quatro coberturas duplex com terraço voltado para o poente. Entrega com automação, climatização e marcenaria de série.',
  },
]

const DESTAQUES = [
  {
    t: 'Fachada',
    d: 'Concreto aparente, brise de alumínio anodizado e nenhuma sacada igual à de baixo.',
    img: IMG.imobiliaria.facade,
  },
  {
    t: 'Living',
    d: 'Pé-direito de 2,90 m e caixilho de piso a teto em todas as unidades.',
    img: IMG.imobiliaria.living,
  },
  {
    t: 'Suíte máster',
    d: 'Isolamento acústico de fachada certificado e persiana embutida na laje.',
    img: IMG.imobiliaria.suite,
  },
  {
    t: 'Acabamentos',
    d: 'Pedra natural, marcenaria sob medida e metais em latão escovado.',
    img: IMG.imobiliaria.marble,
  },
  {
    t: 'Rooftop',
    d: 'Piscina aquecida com raia de 25 m, deck em ipê e vista aberta para a serra.',
    img: IMG.imobiliaria.hero,
  },
]

const GALERIA = [
  {
    id: IMG.imobiliaria.living,
    caption: 'Living · unidade 186 m²',
    alt: 'Sala de estar com marcenaria escura e iluminação embutida',
  },
  {
    id: IMG.imobiliaria.suite,
    caption: 'Suíte máster',
    alt: 'Suíte com revestimento em pedra e cortina de piso a teto',
  },
  {
    id: IMG.imobiliaria.marble,
    caption: 'Detalhe de acabamento',
    alt: 'Painel de pedra natural com veios dourados',
  },
  {
    id: IMG.imobiliaria.view,
    caption: 'Vista do 14º andar',
    alt: 'Sala ampla com janelas voltadas para a cidade',
  },
  {
    id: IMG.imobiliaria.aerial,
    caption: 'Rooftop e piscina',
    alt: 'Vista aérea da piscina no topo do edifício',
  },
]

const ENTORNO = [
  { d: '350 m', p: 'Parque Villa-Lobos' },
  { d: '600 m', p: 'Estação Villa-Lobos–Jaguaré' },
  { d: '900 m', p: 'Colégio Santa Cruz' },
  { d: '1,2 km', p: 'Shopping Villa-Lobos' },
  { d: '2,4 km', p: 'Hospital São Camilo' },
  { d: '4,8 km', p: 'Marginal Pinheiros · acesso norte' },
]

function Logo() {
  return (
    <span className="flex flex-col leading-none">
      <span className="font-display text-[1.5rem] tracking-[0.16em] text-ink">VERTENTE</span>
      <span className="mt-0.5 text-[0.58rem] uppercase tracking-[0.34em] text-accent">Residências</span>
    </span>
  )
}

function VisitaForm({ onDone }: { onDone: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onDone()
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nome" placeholder="Seu nome completo" required />
        <Input label="Telefone" type="tel" placeholder="(11) 90000-0000" required />
      </div>
      <Input label="E-mail" type="email" placeholder="voce@email.com" required />
      <Select label="Metragem de interesse" defaultValue="186">
        <option value="118">118 m² · 2 suítes</option>
        <option value="186">186 m² · 3 suítes</option>
        <option value="340">340 m² · cobertura</option>
      </Select>
      <Button type="submit" size="lg" full arrow>
        Agendar visita ao decorado
      </Button>
      <p className="t-small text-center text-ink-3">
        Formulário demonstrativo — nenhum dado é enviado ou armazenado.
      </p>
    </form>
  )
}

export default function Imobiliaria() {
  const [ativo, setAtivo] = useState(0)
  const [enviado, setEnviado] = useState(false)

  return (
    <>
      <Navbar
        brand={<Logo />}
        links={NAV}
        cta={{ label: 'Agendar visita', href: '#visita' }}
        variant="bar"
        overlay
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative flex min-h-[94svh] flex-col justify-end overflow-hidden">
        <HeroBackdrop
          id={IMG.imobiliaria.hero}
          alt="Fachada iluminada do edifício ao anoitecer, com a cidade ao fundo"
          vertical={[70, 20, 90]}
          lateral={[65, 15]}
        />

        <Container size="full" className="relative pb-16 sm:pb-20">
          <div className="max-w-4xl">
            <Reveal y={10} duration={0.6}>
              <span className="t-eyebrow text-accent">Alto de Pinheiros · São Paulo</span>
            </Reveal>
            <h1 className="t-display mt-6 font-display">
              <MaskReveal delay={0.1}>Onde a cidade</MaskReveal>
              <MaskReveal delay={0.2}>fica do lado de fora.</MaskReveal>
            </h1>
            <Reveal delay={0.5}>
              <p className="t-lead mt-7 max-w-xl text-pretty text-ink-2">
                48 residências de 118 a 340 m², duas por andar, com vista permanente para o Parque
                Villa-Lobos. Lançamento com 62% das unidades já reservadas.
              </p>
            </Reveal>
            <Reveal delay={0.6} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#visita" size="lg" arrow>
                Agendar visita ao decorado
              </ButtonLink>
              <ButtonLink href="#plantas" size="lg" variant="outline">
                Ver plantas
              </ButtonLink>
            </Reveal>
          </div>
        </Container>

        <motion.a
          href="#projeto"
          aria-label="Rolar para o projeto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 right-6 hidden size-12 place-items-center rounded-full border border-ink-2/30 text-ink-2 transition-colors hover:border-accent hover:text-accent lg:grid"
        >
          <ArrowDown className="size-4 animate-bounce" />
        </motion.a>
      </header>

      {/* MANIFESTO -------------------------------------------------------- */}
      <Section id="projeto">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <span className="t-eyebrow text-ink-3">O projeto</span>
            </Reveal>
            <div className="flex flex-col gap-8">
              <Reveal>
                <p className="t-h2 text-balance font-display">
                  Um edifício de 18 andares que se comporta como uma casa de dois.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-2xl text-pretty text-ink-2">
                  A Vertente nasceu de uma restrição: duas unidades por pavimento, sempre. Isso significa
                  elevador que abre em hall privativo, ventilação cruzada em todas as plantas e nenhuma parede
                  compartilhada entre dormitórios de vizinhos diferentes. O projeto é assinado pelo escritório
                  Duarte Feres, com paisagismo de Marina Lobo.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8 text-[0.9rem]">
                  {[
                    ['Arquitetura', 'Duarte Feres'],
                    ['Paisagismo', 'Marina Lobo'],
                    ['Interiores', 'Estúdio Cardo'],
                    ['Incorporação', 'Vertente Desenvolvimento'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-ink-3">{k}</p>
                      <p className="mt-1 font-display text-[1.1rem] text-ink">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <Stats items={NUMEROS} variant="row" className="mt-16" />
        </Container>
      </Section>

      {/* DESTAQUES -------------------------------------------------------- */}
      <Section className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading eyebrow="Detalhes" title="O que se percebe ao entrar" />
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <ul className="flex flex-col">
              {DESTAQUES.map((d, i) => (
                <li key={d.t}>
                  <button
                    type="button"
                    onMouseEnter={() => setAtivo(i)}
                    onFocus={() => setAtivo(i)}
                    onClick={() => setAtivo(i)}
                    className={`group w-full border-b border-line py-6 text-left transition-colors duration-400 ${
                      ativo === i ? 'text-ink' : 'text-ink-3 hover:text-ink-2'
                    }`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.75rem] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight">
                        {d.t}
                      </span>
                    </span>
                    <span
                      className={`mt-2 block max-w-md pl-9 text-[0.92rem] transition-all duration-400 ${
                        ativo === i
                          ? 'max-h-24 opacity-100'
                          : 'max-h-0 overflow-hidden opacity-0 lg:opacity-0'
                      }`}
                    >
                      {d.d}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
              {DESTAQUES.map((d, i) => (
                <motion.div
                  key={d.t}
                  initial={false}
                  animate={{ opacity: ativo === i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE_BRAND }}
                  className="absolute inset-0"
                  aria-hidden={ativo !== i}
                >
                  <Img id={d.img} alt={d.t} w={1200} tone="mute" className="h-full w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* PLANTAS ---------------------------------------------------------- */}
      <Section id="plantas">
        <Container size="xl">
          <SectionHeading
            eyebrow="Plantas"
            title="Três metragens, nenhuma repetida"
            description="Plantas ilustrativas. Medidas e disposição sujeitas a alteração no memorial descritivo."
          />
          <Tabs
            variant="underline"
            className="mt-12"
            items={PLANTAS.map((p) => ({
              id: p.id,
              label: p.label,
              content: (
                <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                  <div className="border border-line bg-surface p-6 sm:p-10">
                    <FloorPlan rooms={p.rooms} />
                  </div>
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="t-eyebrow text-accent">{p.label}</p>
                      <p className="mt-4 max-w-md text-pretty text-ink-2">{p.resumo}</p>
                    </div>
                    <ul className="flex flex-col divide-y divide-line border-y border-line">
                      {p.specs.map((s) => (
                        <li key={s} className="flex items-center gap-3 py-3.5 text-[0.94rem] text-ink-2">
                          <Ruler className="size-4 shrink-0 text-accent" aria-hidden="true" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <p className="font-display text-[1.6rem] text-ink">{p.preco}</p>
                    <ButtonLink href="#visita" size="lg" arrow className="self-start">
                      Consultar disponibilidade
                    </ButtonLink>
                  </div>
                </div>
              ),
            }))}
          />
        </Container>
      </Section>

      {/* GALERIA ---------------------------------------------------------- */}
      <Section id="galeria" className="border-y border-line bg-wash">
        <Container size="full">
          <SectionHeading
            eyebrow="Galeria"
            title="Imagens do decorado"
            actions={<span className="text-[0.8rem] text-ink-3">Arraste para o lado</span>}
          />
          <div className="mt-12">
            <Gallery shots={GALERIA} />
          </div>
        </Container>
      </Section>

      {/* LOCALIZAÇÃO ------------------------------------------------------ */}
      <Section id="localizacao">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <Img
                id={IMG.imobiliaria.city}
                alt="Vista aérea noturna do bairro, com avenidas iluminadas"
                w={1400}
                tone="mute"
                className="aspect-[4/5] w-full"
              />
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Localização"
                title="Rua Ministro Godói, 1420"
                description="Uma quadra interna, sem tráfego de passagem, a 350 metros do maior parque da zona oeste."
              />
              <ul className="mt-10 divide-y divide-line border-y border-line">
                {ENTORNO.map((e, i) => (
                  <Reveal key={e.p} delay={i * 0.05}>
                    <li className="flex items-baseline justify-between gap-6 py-4">
                      <span className="text-[0.98rem] text-ink">{e.p}</span>
                      <span className="font-mono text-[0.82rem] text-accent">{e.d}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-3 text-[0.88rem] text-ink-3">
                <Compass className="size-4 text-accent" aria-hidden="true" />
                Implantação com face principal voltada para o poente
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* VISITA ----------------------------------------------------------- */}
      <Section id="visita" className="border-t border-line bg-wash">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-7">
              <span className="t-eyebrow text-accent">Visita ao decorado</span>
              <h2 className="t-h1 text-balance font-display">
                O decorado de 186 m² está aberto para visita agendada.
              </h2>
              <p className="t-lead max-w-lg text-pretty text-ink-2">
                Atendimento individual, de terça a domingo, com um consultor por família. A visita dura cerca
                de 50 minutos e inclui a apresentação do memorial descritivo.
              </p>
              <ul className="flex flex-col gap-3 text-[0.94rem] text-ink-2">
                {[
                  'Terça a domingo, das 10h às 19h',
                  'Rua Ministro Godói, 1420 · Alto de Pinheiros',
                  'Estacionamento com manobrista no local',
                ].map((l) => (
                  <li key={l} className="flex items-center gap-3">
                    <Sparkles className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={0.1}>
              <div className="border border-line bg-surface p-6 sm:p-8">
                <VisitaForm onDone={() => setEnviado(true)} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Footer
        brand={<Logo />}
        tagline="Vertente Desenvolvimento Imobiliário · CRECI-SP 00.000-J (fictício)"
        wordmark="VERTENTE"
        note="© 2026 Vertente Desenvolvimento — imagens ilustrativas"
        columns={[
          { title: 'Empreendimento', links: ['O projeto', 'Plantas', 'Galeria', 'Memorial descritivo'] },
          { title: 'Incorporadora', links: ['Sobre', 'Entregas', 'Investidores', 'Trabalhe conosco'] },
          {
            title: 'Contato',
            links: ['Agendar visita', 'WhatsApp', 'vendas@vertente.com.br', 'Como chegar'],
          },
        ]}
      />

      <Modal open={enviado} onClose={() => setEnviado(false)} title="Visita solicitada">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full border border-accent/40 text-accent">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h3 className="t-h3 font-display text-ink">Solicitação registrada</h3>
          <p className="text-ink-2">
            Um consultor entra em contato em até quatro horas para confirmar o melhor horário. Página
            demonstrativa: nenhum dado foi enviado.
          </p>
          <Button size="lg" full onClick={() => setEnviado(false)}>
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  )
}
