import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CheckCircle2, Flame, Minus, QrCode, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Modal } from '@/components/ui/Modal'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stars } from '@/components/ui/Stars'
import { FAQ } from '@/components/site/FAQ'
import { Footer } from '@/components/site/Footer'
import { AnnouncementBar } from '@/components/site/AnnouncementBar'
import { Navbar } from '@/components/site/Navbar'
import { Pricing } from '@/components/site/Pricing'
import { TestimonialGrid } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'
import { EASE_BRAND } from '@/lib/motion'
import { brl } from '@/lib/utils'

/* Marca, produtor, preços e avaliações são fictícios. */

const PRECO = 68
const PRECO_DE = 84

const NAV = [
  { label: 'O café', href: '#produto' },
  { label: 'Origem', href: '#origem' },
  { label: 'Comparar', href: '#comparar' },
  { label: 'Assinatura', href: '#assinatura' },
]

const BENEFICIOS = [
  {
    t: 'Torra sob demanda',
    d: 'Torramos na segunda e postamos na terça. A data de torra vem impressa no pacote — não um prazo de validade de nove meses.',
    img: IMG.ecommerce.roast,
    alt: 'Grãos girando no tambor da torrefadora',
  },
  {
    t: 'Um lote, um produtor',
    d: 'Cada safra vem de uma fazenda identificada, com nota de xícara acima de 86 pontos e preço pago acima do mercado.',
    img: IMG.ecommerce.cherries,
    alt: 'Frutos de café maduros ainda no pé',
  },
  {
    t: 'Moagem calibrada',
    d: 'Você escolhe o método no carrinho e a moagem sai ajustada para ele. Ou receba em grãos, se preferir moer em casa.',
    img: IMG.ecommerce.ritual,
    alt: 'Cafeteira italiana vista de cima com café moído',
  },
]

const RITUAL = [
  {
    n: '01',
    t: 'Chega em até 3 dias',
    d: 'Postagem na terça, entrega em capitais até quinta.',
    img: IMG.ecommerce.shelf,
    alt: 'Pacotes de café em prateleira de madeira',
  },
  {
    n: '02',
    t: 'Abra e sinta a data',
    d: 'Torra impressa no pacote, válvula unidirecional e fecho reutilizável.',
    img: IMG.ecommerce.pour,
    alt: 'Espresso caindo em xícara de vidro',
  },
  {
    n: '03',
    t: 'Prepare do seu jeito',
    d: 'Ficha de preparo para coado, prensa, italiana e espresso dentro da caixa.',
    img: IMG.ecommerce.lifestyle,
    alt: 'Preparo de café em ambiente com parede verde',
  },
]

const COMPARATIVO = {
  colunas: ['Alta Colheita', 'Café de supermercado', 'Cafeteria (por xícara)'],
  linhas: [
    { criterio: 'Data de torra', valores: ['Impressa · até 5 dias', 'Não informada', 'Varia por casa'] },
    {
      criterio: 'Origem do grão',
      valores: ['Fazenda e lote identificados', 'Blend sem origem', 'Nem sempre informada'],
    },
    { criterio: 'Moagem', valores: ['No dia do envio, sob medida', 'Pré-moído há meses', 'Na hora'] },
    { criterio: 'Nota de xícara', valores: ['86 a 89 pontos', 'Abaixo de 80', '84 a 88 pontos'] },
    { criterio: 'Custo por xícara', valores: ['R$ 2,40', 'R$ 1,10', 'R$ 9,50'] },
  ],
  destaque: 0,
}

const AVALIACOES = [
  {
    quote:
      'Já tinha assinado outros dois clubes. É o primeiro em que o café chega com data de torra da semana — e dá para sentir a diferença no primeiro gole.',
    name: 'Tiago Bittencourt',
    role: 'Assinante há 8 meses',
    face: IMG.faces.tiago,
    rating: 5,
  },
  {
    quote:
      'Pedi moagem para prensa francesa e veio exatamente no ponto. Parei de brigar com o café de manhã.',
    name: 'Carla Deloro',
    role: 'Assinante há 1 ano',
    face: IMG.faces.carla,
    rating: 5,
  },
  {
    quote:
      'O plano de 1 kg sai mais barato que o café ruim que eu comprava antes no mercado. Não faz sentido voltar.',
    name: 'Lucas Ferrari',
    role: 'Assinante há 5 meses',
    face: IMG.faces.lucas,
    rating: 4,
  },
]

const PLANOS = [
  {
    name: 'Descoberta',
    description: 'Um pacote de 250 g por mês. Bom para quem toma uma xícara por dia.',
    price: [64, 56] as [number, number],
    unit: '/entrega',
    features: [
      '250 g de café especial',
      'Troca de lote a cada safra',
      'Frete grátis para todo o Brasil',
      'Pause ou cancele quando quiser',
    ],
    cta: 'Assinar Descoberta',
  },
  {
    name: 'Ritual',
    description: 'Dois pacotes de 250 g por mês, com lotes diferentes.',
    price: [118, 104] as [number, number],
    unit: '/entrega',
    features: [
      '2 × 250 g, sempre de lotes distintos',
      'Ficha de preparo impressa em cada envio',
      'Acesso antecipado a microlotes',
      'Frete grátis e troca de moagem sem custo',
    ],
    cta: 'Assinar Ritual',
    highlight: true,
    badge: 'Mais assinado',
  },
  {
    name: 'Casa cheia',
    description: 'Um quilo por mês, para casa com muita gente — ou escritório pequeno.',
    price: [208, 183] as [number, number],
    unit: '/entrega',
    features: [
      '1 kg dividido em 4 pacotes',
      'Escolha de 2 métodos de moagem',
      'Brinde de safra a cada trimestre',
      'Atendimento por WhatsApp direto',
    ],
    cta: 'Assinar Casa cheia',
  },
]

const PERGUNTAS = [
  {
    q: 'Quando o café é torrado?',
    a: 'Toda segunda-feira, depois do fechamento dos pedidos da semana. Postamos na terça, então o café chega entre 2 e 5 dias após a torra na maioria das capitais.',
  },
  {
    q: 'Posso escolher a moagem?',
    a: 'Sim: grãos inteiros, coado, prensa francesa, italiana ou espresso. Dá para trocar a moagem de uma entrega para outra sem custo, direto na sua conta.',
  },
  {
    q: 'Como funciona o frete?',
    a: 'Grátis para todo o Brasil em compras acima de R$ 149 e em todos os planos de assinatura. Abaixo disso, o frete é calculado no carrinho.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Devolvemos o valor integral em até 30 dias, mesmo com o pacote aberto. Só pedimos um retorno rápido sobre o que não funcionou — é assim que ajustamos os lotes.',
  },
  {
    q: 'Consigo pausar a assinatura?',
    a: 'Sim, pelo próprio painel, sem falar com ninguém. Você pode pular uma entrega, adiar por 30 dias ou cancelar de vez.',
  },
]

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <path d="M14 3c5 3.5 7 7 7 11a7 7 0 1 1-14 0c0-4 2-7.5 7-11Z" fill="var(--c-accent)" />
        <path d="M14 10v11" stroke="var(--c-bg)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[1.15rem] font-semibold leading-none tracking-tight text-ink">
        Alta Colheita
      </span>
    </span>
  )
}

export default function Ecommerce() {
  const [cart, setCart] = useState(0)
  const [aberto, setAberto] = useState(false)
  const [metodo, setMetodo] = useState('Coado')
  const [barraCompra, setBarraCompra] = useState(false)

  useEffect(() => {
    const onScroll = () => setBarraCompra(window.scrollY > 720)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const comprar = () => {
    setCart((c) => c + 1)
    setAberto(true)
  }

  return (
    <>
      <AnnouncementBar tone="ink" resto={`· Torra sob demanda toda segunda-feira`}>
        {`Frete grátis acima de ${brl(149)}`}
      </AnnouncementBar>

      <Navbar
        brand={<Logo />}
        links={NAV}
        secondary={{ label: `Carrinho (${cart})`, href: '#assinatura' }}
        cta={{ label: 'Comprar agora', href: '#produto' }}
        variant="bar"
        offsetTop={36}
      />

      {/* HERO ------------------------------------------------------------- */}
      <header id="produto" className="relative overflow-hidden pt-32 sm:pt-36">
        <Container size="xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 flex flex-col gap-6 lg:order-1">
              <Reveal y={10} duration={0.5}>
                <span className="t-eyebrow text-accent">Safra 2026 · Serra do Caparaó</span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="t-h1 text-balance font-display font-bold">
                  Café torrado <span className="text-accent">depois</span> que você compra.
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="t-lead max-w-lg text-pretty text-ink-2">
                  Um lote por safra, de uma fazenda só, torrado na segunda e enviado na terça. Chega em casa
                  com a data de torra impressa no pacote — geralmente com menos de cinco dias.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="flex flex-wrap items-center gap-4">
                  <Stars value={5} size="md" />
                  <span className="text-[0.9rem] text-ink-2">4,9 · 2.147 avaliações</span>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="flex flex-col gap-5 rounded-card border border-line bg-surface p-6 shadow-soft">
                  <div className="flex items-end gap-3">
                    <span className="font-display text-[2.4rem] leading-none text-ink">{brl(PRECO)}</span>
                    <span className="pb-1 text-[0.9rem] text-ink-3 line-through">{brl(PRECO_DE)}</span>
                    <span className="mb-1 rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-medium text-on-accent">
                      -19%
                    </span>
                  </div>
                  <p className="text-[0.86rem] text-ink-3">
                    Pacote de 250 g · {brl(2.4)} por xícara · 6× sem juros
                  </p>

                  <div>
                    <p className="mb-2.5 text-[0.78rem] uppercase tracking-[0.12em] text-ink-3">Moagem</p>
                    <div className="flex flex-wrap gap-2">
                      {['Em grãos', 'Coado', 'Prensa', 'Italiana', 'Espresso'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMetodo(m)}
                          className={`rounded-btn border px-3.5 py-2 text-[0.85rem] transition-all duration-300 ${
                            metodo === m
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-line text-ink-2 hover:border-ink-3'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button size="lg" full arrow onClick={comprar}>
                    Comprar · {brl(PRECO)}
                  </Button>
                  <p className="text-center text-[0.8rem] text-ink-3">
                    Frete grátis acima de {brl(149)} · 30 dias para devolver
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div className="relative">
                <Img
                  id={IMG.ecommerce.hero}
                  alt="Pacote de café especial em papel kraft segurado contra uma parede clara"
                  w={1300}
                  tone="none"
                  priority
                  className="aspect-[5/6] w-full rounded-xl2"
                />
                <div className="absolute bottom-5 left-5 rounded-card border border-line bg-surface/95 px-5 py-4 shadow-lift backdrop-blur">
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">Lote atual</p>
                  <p className="mt-1.5 font-display text-[1.2rem] text-ink">Sítio Santa Rita · 87 pts</p>
                  <p className="mt-0.5 text-[0.84rem] text-ink-2">Notas de caramelo, cacau e laranja</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* CONFIANÇA -------------------------------------------------------- */}
      <div className="mt-16 border-y border-line bg-wash py-6 sm:mt-20">
        <Container size="xl">
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {[
              { icon: Flame, t: 'Torra da semana', d: 'Data impressa no pacote' },
              { icon: Truck, t: 'Frete grátis', d: `Acima de ${brl(149)}` },
              { icon: ShieldCheck, t: '30 dias de garantia', d: 'Devolução integral' },
              { icon: QrCode, t: 'Pix com 5% off', d: 'Ou 6× sem juros' },
            ].map((b) => {
              const Icon = b.icon
              return (
                <li key={b.t} className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
                  <div className="leading-tight">
                    <p className="text-[0.9rem] font-medium text-ink">{b.t}</p>
                    <p className="text-[0.8rem] text-ink-3">{b.d}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </div>

      {/* BENEFÍCIOS ------------------------------------------------------- */}
      <Section>
        <Container size="xl">
          <SectionHeading
            eyebrow="Por que é diferente"
            title="Três decisões que mudam a xícara"
            description="Nada aqui é sobre embalagem bonita. É sobre o que acontece entre a fazenda e a sua cozinha."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
                  <Img
                    id={b.img}
                    alt={b.alt}
                    w={900}
                    tone="none"
                    className="aspect-[7/5] w-full"
                    imgClassName="transition-transform duration-[900ms] ease-brand group-hover:scale-[1.05]"
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="t-h3 font-display text-ink">{b.t}</h3>
                    <p className="text-[0.94rem] text-ink-2">{b.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ORIGEM (invertido) ----------------------------------------------- */}
      <Section id="origem" data-invert className="bg-bg">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            <div className="flex flex-col gap-6">
              <span className="t-eyebrow text-accent">A origem</span>
              <h2 className="t-h1 text-balance font-display font-bold">
                Uma fazenda, uma família, 1.180 metros de altitude.
              </h2>
              <p className="t-lead max-w-lg text-pretty text-ink-2">
                O Sítio Santa Rita fica na Serra do Caparaó, entre Minas e o Espírito Santo. A família Andrade
                colhe seletivamente, seca em terreiro suspenso e nos vende o lote inteiro — não uma parte do
                que sobrou da cooperativa.
              </p>
              <ul className="mt-2 flex flex-col divide-y divide-line border-y border-line">
                {[
                  ['Altitude', '1.180 m'],
                  ['Variedade', 'Catuaí amarelo'],
                  ['Processo', 'Natural, terreiro suspenso'],
                  ['Nota de xícara', '87 pontos (SCA)'],
                  ['Preço pago ao produtor', '38% acima da bolsa'],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between gap-4 py-3.5">
                    <span className="text-[0.9rem] text-ink-3">{k}</span>
                    <span className="text-[0.95rem] text-ink">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Img
                id={IMG.ecommerce.farmer}
                alt="Produtor colhendo café com cesto na lavoura"
                w={800}
                tone="none"
                className="aspect-[4/5] w-full rounded-card"
              />
              <div className="flex flex-col gap-4 pt-10">
                <Img
                  id={IMG.ecommerce.fazenda}
                  alt="Lavoura de café em encosta, com o cafezal em fileiras"
                  w={800}
                  tone="none"
                  className="aspect-square w-full rounded-card"
                />
                <Img
                  id={IMG.ecommerce.cupping}
                  alt="Mesa de prova de café com xícaras alinhadas"
                  w={800}
                  tone="none"
                  className="aspect-[7/6] w-full rounded-card"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* RITUAL ----------------------------------------------------------- */}
      <Section>
        <Container size="xl">
          <SectionHeading eyebrow="Da torrefação até você" title="Como chega em casa" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {RITUAL.map((r, i) => (
              <Reveal key={r.n} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-5">
                  <Img
                    id={r.img}
                    alt={r.alt}
                    w={900}
                    tone="none"
                    className="aspect-[7/5] w-full rounded-card"
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.78rem] text-accent">{r.n}</span>
                    <h3 className="t-h3 font-display text-ink">{r.t}</h3>
                  </div>
                  <p className="text-[0.94rem] text-ink-2">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* COMPARATIVO ------------------------------------------------------ */}
      <Section id="comparar" className="border-y border-line bg-wash">
        <Container size="lg">
          <SectionHeading
            align="center"
            eyebrow="Comparativo"
            title="O que muda em relação ao que você já compra"
            description="Custo por xícara calculado sobre 15 g de café por preparo."
          />
          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[28%] pb-4 pr-4 text-[0.78rem] uppercase tracking-[0.12em] text-ink-3">
                    Critério
                  </th>
                  {COMPARATIVO.colunas.map((c, i) => (
                    <th
                      key={c}
                      className={`pb-4 pr-4 text-[0.95rem] font-medium ${
                        i === COMPARATIVO.destaque
                          ? 'rounded-t-card bg-accent/10 px-4 text-accent'
                          : 'text-ink-2'
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.linhas.map((l) => (
                  <tr key={l.criterio} className="border-t border-line">
                    <th scope="row" className="py-4 pr-4 text-[0.92rem] font-normal text-ink-3">
                      {l.criterio}
                    </th>
                    {l.valores.map((v, i) => (
                      <td
                        key={i}
                        className={`py-4 pr-4 text-[0.95rem] ${
                          i === COMPARATIVO.destaque ? 'bg-accent/10 px-4 font-medium text-ink' : 'text-ink-2'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {i === COMPARATIVO.destaque ? (
                            <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />
                          ) : (
                            <Minus className="size-4 shrink-0 text-ink-3/60" aria-hidden="true" />
                          )}
                          {v}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </Section>

      {/* AVALIAÇÕES ------------------------------------------------------- */}
      <Section>
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Avaliações"
                title="4,9 de 5"
                description="2.147 avaliações verificadas de compra."
              />
              <div className="mt-6 flex flex-col gap-2">
                {[
                  [5, 88],
                  [4, 9],
                  [3, 2],
                  [2, 1],
                  [1, 0],
                ].map(([estrelas, pct]) => (
                  <div key={estrelas} className="flex items-center gap-3 text-[0.82rem] text-ink-3">
                    <span className="w-4 tabular-nums">{estrelas}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: EASE_BRAND }}
                        className="block h-full rounded-full bg-accent"
                      />
                    </span>
                    <span className="w-8 tabular-nums text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <TestimonialGrid items={AVALIACOES} cols={2} />
          </div>
        </Container>
      </Section>

      {/* ASSINATURA ------------------------------------------------------- */}
      <Section id="assinatura" className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Assinatura"
            title="Café bom que não acaba na quarta-feira"
            description="Todos os planos têm frete grátis, troca de moagem sem custo e cancelamento pelo painel."
          />
          <Pricing
            plans={PLANOS}
            cycles={['Entrega mensal', 'Trimestral · 12% off']}
            onSelect={comprar}
            className="mt-14"
          />
        </Container>
      </Section>

      <FAQ
        title="Antes de assinar"
        description="Se ficar alguma dúvida, o WhatsApp responde em minutos no horário comercial."
        items={PERGUNTAS}
        aside={
          <div className="rounded-card border border-line bg-surface p-6 shadow-soft">
            <p className="font-display text-[1.05rem] text-ink">Garantia de 30 dias</p>
            <p className="mt-2 text-[0.92rem] text-ink-2">
              Se o café não for o melhor que você tomou este mês, devolvemos o valor integral — mesmo com o
              pacote aberto.
            </p>
          </div>
        }
      />

      <Footer
        brand={<Logo />}
        tagline="Café de origem, torrado sob demanda. Enviamos para todo o Brasil."
        note="© 2026 Alta Colheita Torrefação · CNPJ fictício 00.000.000/0001-00"
        columns={[
          { title: 'Loja', links: ['Café do mês', 'Assinaturas', 'Presentes', 'Acessórios'] },
          { title: 'Sobre', links: ['Nossa origem', 'Produtores', 'Torrefação', 'Sustentabilidade'] },
          {
            title: 'Ajuda',
            links: ['Entregas', 'Trocas e devoluções', 'Formas de pagamento', 'Fale conosco'],
          },
        ]}
      />

      {/* BARRA DE COMPRA (mobile) — aparece depois que o bloco de preço sai
          da tela, para não repetir o CTA que já está visível no hero. */}
      <AnimatePresence>
        {barraCompra && (
          <motion.div
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 110, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_BRAND }}
            className="fixed inset-x-3 bottom-[4.75rem] z-70 lg:hidden"
          >
            <div className="flex items-center gap-3 rounded-card border border-line bg-surface/95 p-3 shadow-lift backdrop-blur-xl">
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[0.85rem] font-medium text-ink">Sítio Santa Rita · 250 g</p>
                <p className="text-[0.78rem] text-ink-3">
                  {brl(PRECO)} · {metodo}
                </p>
              </div>
              <Button size="sm" onClick={comprar}>
                <ShoppingBag className="size-4" aria-hidden="true" />
                Comprar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={aberto} onClose={() => setAberto(false)} title="Adicionado à sacola">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/12 text-accent">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h3 className="t-h3 font-display text-ink">Café adicionado à sacola</h3>
          <p className="text-ink-2">
            Sítio Santa Rita · 250 g · moagem {metodo.toLowerCase()}. Sacola com {cart}{' '}
            {cart === 1 ? 'item' : 'itens'}. Página demonstrativa — nenhuma compra é processada.
          </p>
          <div className="mt-1 flex flex-col gap-2 sm:flex-row">
            <ButtonLink href="#assinatura" size="lg" full onClick={() => setAberto(false)}>
              Ver assinatura
            </ButtonLink>
            <Button size="lg" variant="outline" full onClick={() => setAberto(false)}>
              Continuar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
