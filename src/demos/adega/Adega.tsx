import { useState } from 'react'
import { motion } from 'framer-motion'
import { Beer, Clock, Flame, MapPin, Martini, Package, Snowflake, Wine } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Marquee } from '@/components/ui/Marquee'
import { Modal } from '@/components/ui/Modal'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnnouncementBar } from '@/components/site/AnnouncementBar'
import { CTA } from '@/components/site/CTA'
import { FAQ } from '@/components/site/FAQ'
import { Footer } from '@/components/site/Footer'
import { Navbar } from '@/components/site/Navbar'
import { Stats } from '@/components/site/Stats'
import { TestimonialGrid } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'
import { EASE_BRAND } from '@/lib/motion'
import { brl } from '@/lib/utils'

/* Adega, bairros, preços e avaliações são fictícios. */

const NAV = [
  { label: 'O que tem', href: '#catalogo' },
  { label: 'Combos', href: '#combos' },
  { label: 'Entrega', href: '#entrega' },
  { label: 'Dúvidas', href: '#faq' },
]

const CATEGORIAS = [
  { icon: Beer, nome: 'Cerveja', desc: 'Long neck, lata, litrão e artesanal', a: 4.5 },
  { icon: Martini, nome: 'Destilados', desc: 'Vodca, gin, whisky, cachaça', a: 34 },
  { icon: Wine, nome: 'Vinhos', desc: 'Tinto, branco e espumante', a: 39 },
  { icon: Snowflake, nome: 'Gelo', desc: 'Cubo, escama e gelo de coco', a: 8 },
  { icon: Flame, nome: 'Carvão e acendedor', desc: '3 kg, 5 kg e álcool em gel', a: 12 },
  { icon: Package, nome: 'Petiscos', desc: 'Amendoim, azeitona, salgadinho', a: 6 },
]

const COMBOS = [
  {
    nome: 'Kit Churrasco',
    de: 189,
    por: 159,
    itens: ['12 long necks geladas', '5 kg de carvão', '2 sacos de gelo', 'Sal grosso e acendedor'],
    tag: 'Mais pedido no fim de semana',
  },
  {
    nome: 'Combo Gelado',
    de: 99,
    por: 84,
    itens: ['24 latas de 350 ml', '1 saco de gelo de 5 kg', 'Copo descartável', 'Entrega em caixa térmica'],
    destaque: true,
    tag: 'O carro-chefe',
  },
  {
    nome: 'Kit Drink',
    de: 168,
    por: 142,
    itens: ['1 gin de 750 ml', '4 tônicas', 'Gelo de coco', 'Limão siciliano e especiarias'],
    tag: 'Para quatro pessoas',
  },
]

const BAIRROS = [
  { nome: 'Centro', tempo: '15–25 min', taxa: 0 },
  { nome: 'Jardim América', tempo: '20–30 min', taxa: 0 },
  { nome: 'Vila Nova', tempo: '20–30 min', taxa: 5 },
  { nome: 'Bela Vista', tempo: '25–35 min', taxa: 5 },
  { nome: 'Santa Luzia', tempo: '25–40 min', taxa: 8 },
  { nome: 'Parque das Águas', tempo: '30–45 min', taxa: 8 },
  { nome: 'Alto do Cruzeiro', tempo: '30–45 min', taxa: 10 },
  { nome: 'Industrial', tempo: '35–50 min', taxa: 12 },
]

const NUMEROS = [
  { value: 25, suffix: ' min', label: 'Tempo médio de entrega no último mês' },
  { value: 8, label: 'Bairros atendidos', note: 'Consulte a lista completa abaixo' },
  { value: 2, prefix: 'até ', suffix: 'h', label: 'Aberto de quinta a domingo' },
  { value: 4.8, decimals: 1, label: 'Nota dos clientes', note: '1.902 pedidos avaliados' },
]

const DEPOIMENTOS = [
  {
    quote:
      'Pedi 23h de uma sexta achando que não ia chegar. Veio em 19 minutos, tudo gelado, e ainda mandaram copo. Virou padrão aqui em casa.',
    name: 'Tiago Bittencourt',
    role: 'Jardim América',
    face: IMG.faces.tiago,
    rating: 5,
  },
  {
    quote:
      'O kit churrasco resolve o sábado inteiro. Carvão, gelo e cerveja numa entrega só — parei de fazer três paradas antes de chegar em casa.',
    name: 'Carla Deloro',
    role: 'Centro',
    face: IMG.faces.carla,
    rating: 5,
  },
  {
    quote:
      'Uso o WhatsApp mesmo, sem baixar app nenhum. Mando o print do que quero e eles montam o pedido. É mais rápido que o aplicativo.',
    name: 'Lucas Ferrari',
    role: 'Bela Vista',
    face: IMG.faces.lucas,
    rating: 5,
  },
]

const PERGUNTAS = [
  {
    q: 'Qual o horário de funcionamento?',
    a: 'Segunda a quarta das 10h às 23h. De quinta a domingo a loja fica aberta até as 2h da manhã, e o delivery aceita pedidos até 1h30.',
  },
  {
    q: 'Tem pedido mínimo?',
    a: 'Sim, R$ 30 para entrega. Abaixo disso você ainda pode retirar no balcão sem valor mínimo.',
  },
  {
    q: 'Como pago?',
    a: 'Pix (com 5% de desconto), cartão na maquininha do entregador ou dinheiro — nesse caso avise o troco pelo WhatsApp.',
  },
  {
    q: 'A bebida chega realmente gelada?',
    a: 'O estoque de venda fica em câmara fria a 2 °C e o transporte é em caixa térmica. Se chegar quente, trocamos na hora sem custo.',
  },
  {
    q: 'Vocês entregam fora dos bairros listados?',
    a: 'Fora da lista avaliamos caso a caso pelo WhatsApp. Acima de R$ 150 costumamos atender bairros vizinhos com taxa combinada.',
  },
]

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <circle cx="14" cy="14" r="12" fill="none" stroke="var(--c-accent)" strokeWidth="1.6" />
        <path d="M14 5v9l6 4" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] uppercase tracking-[0.04em] text-ink">Meia-Noite</span>
        <span className="mt-0.5 text-[0.56rem] uppercase tracking-[0.28em] text-accent">
          Adega & Conveniência
        </span>
      </span>
    </span>
  )
}

/** Etiqueta de preço no estilo de placa de adega. */
function Preco({ valor, prefixo = 'a partir de' }: { valor: number; prefixo?: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-3">{prefixo}</span>
      <span className="font-display text-[1.35rem] leading-none text-accent-2">{brl(valor)}</span>
    </span>
  )
}

export default function Adega() {
  const [pedido, setPedido] = useState(false)

  return (
    <>
      <AnnouncementBar icon={Clock} resto={`· pedido mínimo ${brl(30)}`}>
        Hoje entregamos até 1h30
      </AnnouncementBar>

      <Navbar
        brand={<Logo />}
        links={NAV}
        secondary={{ label: '(11) 4002-8922', href: '#contato' }}
        cta={{ label: 'Pedir no WhatsApp', href: '#contato' }}
        variant="bar"
        offsetTop={36}
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-32 sm:pt-36">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-[26rem] w-[44rem] max-w-[120vw] opacity-25 blur-[100px]"
          style={{ background: 'radial-gradient(circle, var(--c-accent) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <Container size="xl" className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="flex flex-col gap-6">
              <Reveal y={10} duration={0.5}>
                <span className="inline-flex items-center gap-2 rounded-btn border border-line bg-surface px-3.5 py-1.5 text-[0.78rem] text-ink-2">
                  <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
                  Aberto agora · fecha 2h
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="font-display text-[clamp(2.6rem,6.4vw,5rem)] uppercase leading-[0.92] text-ink">
                  Gelada na sua porta em <span className="text-accent">25 minutos</span>.
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="t-lead max-w-lg text-pretty text-ink-2">
                  Cerveja, destilado, gelo e petisco na mesma entrega. Pedido direto pelo WhatsApp — sem
                  baixar aplicativo e sem taxa de serviço em cima do preço.
                </p>
              </Reveal>

              <Reveal delay={0.18} className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" arrow onClick={() => setPedido(true)}>
                  Fazer meu pedido
                </Button>
                <ButtonLink href="#catalogo" size="lg" variant="outline">
                  Ver o que tem hoje
                </ButtonLink>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6 text-[0.85rem] text-ink-2">
                  <span className="inline-flex items-center gap-2">
                    <Snowflake className="size-4 text-accent" aria-hidden="true" /> Câmara fria a 2 °C
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-accent" aria-hidden="true" /> 8 bairros
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="size-4 text-accent" aria-hidden="true" /> Até 2h da manhã
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="relative">
              <Img
                id={IMG.adega.hero}
                alt="Gargalos de garrafas geladas cobertos de gotas, em luz baixa"
                w={1200}
                tone="none"
                priority
                className="aspect-[4/5] w-full rounded-xl2"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: EASE_BRAND }}
                className="absolute -bottom-5 -left-4 rounded-card border border-line bg-surface/95 px-5 py-4 shadow-lift backdrop-blur sm:left-6"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-3">Entrega média hoje</p>
                <p className="mt-1.5 font-display text-[2rem] leading-none text-accent">23 min</p>
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* FAIXA ------------------------------------------------------------ */}
      <div className="mt-20 border-y border-line bg-wash py-4">
        <Marquee duration={38} gap="3rem">
          {[
            'Cerveja gelada',
            'Gelo em escama',
            'Carvão',
            'Destilados',
            'Vinhos',
            'Energéticos',
            'Petiscos',
            'Copo e descartável',
          ].map((s) => (
            <span
              key={s}
              className="flex shrink-0 items-center gap-6 font-display text-[1.4rem] uppercase text-ink-2"
            >
              {s}
              <span className="text-accent">•</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* CATÁLOGO --------------------------------------------------------- */}
      <Section id="catalogo">
        <Container size="xl">
          <SectionHeading
            eyebrow="O que tem na adega"
            title="Tudo que a noite pede, num pedido só"
            description="Estoque atualizado toda tarde. Se não achar o que procura, pergunte no WhatsApp — quase sempre temos."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIAS.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.nome} delay={i * 0.05}>
                  <div className="group relative flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-6 transition-all duration-400 ease-brand focus-within:border-accent hover:-translate-y-1 hover:border-accent/45">
                    <span className="grid size-11 place-items-center rounded-btn border border-line bg-raise text-accent transition-colors duration-400 group-hover:border-accent/50">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.35rem] uppercase leading-none text-ink">
                        <button
                          type="button"
                          onClick={() => setPedido(true)}
                          className="text-left after:absolute after:inset-0 after:content-['']"
                        >
                          {c.nome}
                        </button>
                      </h3>
                      <p className="mt-2 text-[0.92rem] text-ink-2">{c.desc}</p>
                    </div>
                    <Preco valor={c.a} />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* COMBOS ----------------------------------------------------------- */}
      <Section id="combos" className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Combos"
            title="Sai mais barato do que montar item por item"
            description="Os três que mais saem. Dá para trocar qualquer item por outro de valor equivalente."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {COMBOS.map((c, i) => (
              <Reveal key={c.nome} delay={i * 0.08} className="h-full">
                <div
                  className={`flex h-full flex-col gap-5 rounded-card border p-7 transition-all duration-400 ease-brand ${
                    c.destaque
                      ? 'border-accent bg-surface shadow-lift lg:-translate-y-3'
                      : 'border-line bg-surface hover:border-line-2'
                  }`}
                >
                  <span className="t-eyebrow text-ink-3">{c.tag}</span>
                  <h3 className="font-display text-[1.7rem] uppercase leading-none text-ink">{c.nome}</h3>
                  <div className="flex items-end gap-2.5 border-y border-line py-5">
                    <span className="font-display text-[2.3rem] leading-none text-accent">{brl(c.por)}</span>
                    <span className="pb-1 text-[0.9rem] text-ink-3 line-through">{brl(c.de)}</span>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {c.itens.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[0.92rem] text-ink-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={c.destaque ? 'solid' : 'outline'}
                    size="lg"
                    full
                    arrow
                    className="mt-auto"
                    onClick={() => setPedido(true)}
                  >
                    Pedir esse combo
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ENTREGA ---------------------------------------------------------- */}
      <Section id="entrega">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            <Reveal>
              <Img
                id={IMG.adega.rua}
                alt="Rua do bairro à noite, iluminada por letreiros"
                w={1200}
                tone="none"
                className="aspect-[4/5] w-full rounded-xl2 sm:aspect-[3/2] lg:aspect-[4/5]"
              />
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Zona de entrega"
                title="Onde a gente chega, e em quanto tempo"
                description="Prazos medidos nos últimos 30 dias, não estimados. Frete grátis acima de R$ 120 em qualquer bairro."
              />
              <ul className="mt-9 divide-y divide-line border-y border-line">
                {BAIRROS.map((b, i) => (
                  <Reveal key={b.nome} delay={i * 0.04}>
                    <li className="flex items-center justify-between gap-4 py-3.5">
                      <span className="text-[0.97rem] text-ink">{b.nome}</span>
                      <span className="flex items-center gap-4 text-[0.85rem]">
                        <span className="font-mono text-ink-2">{b.tempo}</span>
                        <span className={`w-16 text-right ${b.taxa === 0 ? 'text-accent' : 'text-ink-3'}`}>
                          {b.taxa === 0 ? 'grátis' : brl(b.taxa)}
                        </span>
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-6 text-[0.86rem] text-ink-3">
                Não achou seu bairro? Chame no WhatsApp — atendemos vizinhos caso a caso.
              </p>
            </div>
          </div>

          <Stats items={NUMEROS} variant="row" className="mt-16" />
        </Container>
      </Section>

      {/* PROVA ------------------------------------------------------------ */}
      <Section className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Quem já pediu"
            title="A conta é simples: chegou gelada e chegou rápido"
            description="Avaliações ilustrativas, escritas para esta demonstração."
          />
          <TestimonialGrid items={DEPOIMENTOS} className="mt-12" />
        </Container>
      </Section>

      <FAQ
        title="Antes de mandar o pedido"
        description="O que mais perguntam no WhatsApp antes da primeira compra."
        items={PERGUNTAS}
        aside={
          <div className="rounded-card border border-line bg-surface p-6">
            <p className="font-display text-[1.2rem] uppercase text-ink">Retirada no balcão</p>
            <p className="mt-2 text-[0.92rem] text-ink-2">
              Sem pedido mínimo e sem espera: monte pelo WhatsApp e retire pronto em 10 minutos.
            </p>
            <p className="mt-4 text-[0.86rem] text-ink-3">Rua das Palmeiras, 412 · Centro</p>
          </div>
        }
      />

      <CTA
        id="contato"
        eyebrow="Está com sede?"
        title="Manda a lista no WhatsApp que a gente monta"
        description="Atendimento humano, sem robô e sem app. Responde em menos de 2 minutos no horário de funcionamento."
        actions={
          <>
            <Button size="lg" arrow onClick={() => setPedido(true)}>
              Chamar no WhatsApp
            </Button>
            <ButtonLink href="#combos" size="lg" variant="outline">
              Ver combos
            </ButtonLink>
          </>
        }
        note="Venda de bebida alcoólica proibida para menores de 18 anos."
      />

      <Footer
        brand={<Logo />}
        tagline="Adega e conveniência. Entrega própria, sem intermediário, até as 2h."
        note="© 2026 Adega Meia-Noite · CNPJ fictício 00.000.000/0001-00"
        columns={[
          { title: 'Adega', links: ['Cervejas', 'Destilados', 'Vinhos', 'Gelo e carvão'] },
          { title: 'Entrega', links: ['Bairros atendidos', 'Prazos', 'Frete grátis', 'Retirada'] },
          {
            title: 'Contato',
            links: ['WhatsApp', '(11) 4002-8922', 'Rua das Palmeiras, 412', 'Como chegar'],
          },
        ]}
      />

      <Modal open={pedido} onClose={() => setPedido(false)} title="Pedido pelo WhatsApp">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/12 text-accent">
            <Beer className="size-7" aria-hidden="true" />
          </span>
          <h3 className="font-display text-[1.5rem] uppercase text-ink">É só mandar a lista</h3>
          <p className="text-ink-2">
            Numa página real, este botão abriria a conversa no WhatsApp com o pedido já montado. Esta é uma
            página demonstrativa — nada é enviado.
          </p>
          <Button size="lg" full onClick={() => setPedido(false)}>
            Entendi
          </Button>
        </div>
      </Modal>
    </>
  )
}
