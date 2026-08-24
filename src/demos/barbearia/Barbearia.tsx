import { useState } from 'react'
import { CalendarCheck, CheckCircle2, Clock, MapPin, Scissors } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Select } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stars } from '@/components/ui/Stars'
import { CTA } from '@/components/site/CTA'
import { FAQ } from '@/components/site/FAQ'
import { Footer } from '@/components/site/Footer'
import { HeroBackdrop } from '@/components/site/HeroBackdrop'
import { Navbar } from '@/components/site/Navbar'
import { Pricing } from '@/components/site/Pricing'
import { Stats } from '@/components/site/Stats'
import { TestimonialGrid } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'
import { brl } from '@/lib/utils'

/* Barbearia, barbeiros, preços e avaliações são fictícios. */

const NAV = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Barbeiros', href: '#barbeiros' },
  { label: 'Clube', href: '#clube' },
  { label: 'A casa', href: '#casa' },
]

const SERVICOS = [
  { nome: 'Corte social', desc: 'Máquina e tesoura, acabamento na navalha', min: 40, preco: 55 },
  { nome: 'Corte + barba', desc: 'O combo da casa, com toalha quente', min: 70, preco: 89, destaque: true },
  { nome: 'Barba completa', desc: 'Toalha quente, navalha e balm', min: 35, preco: 45 },
  { nome: 'Degradê navalhado', desc: 'Fade fechado com acabamento na lâmina', min: 50, preco: 70 },
  { nome: 'Pezinho', desc: 'Retoque de contorno entre um corte e outro', min: 15, preco: 25 },
  { nome: 'Corte infantil', desc: 'Até 10 anos, com paciência inclusa', min: 40, preco: 45 },
]

const BARBEIROS = [
  { nome: 'Dico', esp: 'Degradê e navalhado', tempo: 'Hoje, 15h30', img: IMG.barbearia.equipe[0] },
  { nome: 'Tarcísio', esp: 'Barba e toalha quente', tempo: 'Hoje, 17h00', img: IMG.barbearia.equipe[1] },
  { nome: 'Serginho', esp: 'Clássico e social', tempo: 'Amanhã, 09h00', img: IMG.barbearia.equipe[2] },
  { nome: 'Marlon', esp: 'Afro e texturizado', tempo: 'Hoje, 18h30', img: IMG.barbearia.equipe[3] },
]

const NUMEROS = [
  { value: 4.9, decimals: 1, label: 'Nota no Google', note: '873 avaliações' },
  { value: 12, suffix: ' anos', label: 'De porta aberta no mesmo ponto' },
  { value: 640, label: 'Cortes por mês' },
  { value: 30, suffix: 's', label: 'Para agendar pelo celular' },
]

const PLANOS = [
  {
    name: 'Só o corte',
    description: 'Um corte por mês, com hora marcada e o barbeiro que você escolher.',
    price: [49, 44] as [number, number],
    features: [
      '1 corte social por mês',
      'Agendamento prioritário',
      'Pezinho de cortesia em 15 dias',
      'Cancele quando quiser',
    ],
    cta: 'Assinar',
  },
  {
    name: 'Corte e barba',
    description: 'O plano da casa: dois cortes e duas barbas por mês.',
    price: [129, 116] as [number, number],
    features: [
      '2 cortes e 2 barbas por mês',
      'Toalha quente em toda barba',
      'Agendamento prioritário',
      '15% de desconto na linha de produtos',
      'Bebida por conta da casa',
    ],
    cta: 'Assinar o clube',
    highlight: true,
    badge: 'Mais assinado',
  },
  {
    name: 'Sem contar',
    description: 'Quantos cortes quiser no mês. Para quem não deixa passar de duas semanas.',
    price: [199, 179] as [number, number],
    features: [
      'Cortes ilimitados',
      'Barba ilimitada',
      'Horário reservado fixo na semana',
      'Leva um convidado uma vez por mês',
    ],
    cta: 'Assinar',
  },
]

const DEPOIMENTOS = [
  {
    quote:
      'Antes eu chegava e esperava quarenta minutos. Agora marco pelo celular na quinta e sento na cadeira no horário. Só por isso já valeu.',
    name: 'Ricardo Menezes',
    role: 'Cliente desde 2023',
    face: IMG.faces.ricardo,
    rating: 5,
  },
  {
    quote:
      'Assinei o clube achando que não ia usar. Uso todo mês, e a barba com toalha quente virou o meu programa de sexta.',
    name: 'Paulo Krieger',
    role: 'Assinante há 8 meses',
    face: IMG.faces.paulo,
    rating: 5,
  },
  {
    quote:
      'Levo meu filho junto. O Marlon tem paciência de santo com criança e o corte sai igual ao da foto que a gente mostra.',
    name: 'Felipe Aragão',
    role: 'Cliente desde 2021',
    face: IMG.faces.felipe,
    rating: 5,
  },
]

const PERGUNTAS = [
  {
    q: 'Preciso agendar ou posso chegar e esperar?',
    a: 'Atendemos por ordem de chegada quando há cadeira livre, mas a agenda enche cedo. Quem marca não espera — e o horário fica reservado por 10 minutos de tolerância.',
  },
  {
    q: 'Dá para escolher o barbeiro?',
    a: 'Sim, no próprio agendamento. Cada barbeiro tem a agenda separada, e você vê o próximo horário livre de cada um antes de confirmar.',
  },
  {
    q: 'Como funciona o clube de assinatura?',
    a: 'É uma mensalidade que já inclui os atendimentos do plano. Cobra no cartão todo dia 5, você agenda normalmente pelo site e não paga nada no balcão. Pode pausar ou cancelar sem multa.',
  },
  {
    q: 'E se eu não gostar do corte?',
    a: 'Volta em até 7 dias e ajustamos sem cobrar. Acontece pouco, mas acontece — e é assim que resolvemos.',
  },
  { q: 'Aceitam cartão e Pix?', a: 'Cartão, Pix e dinheiro. No Pix a casa dá 5% de desconto no avulso.' },
]

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <path d="M5 5l18 18M23 5L5 23" stroke="var(--c-accent)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="14" cy="14" r="3.6" fill="none" stroke="var(--c-ink)" strokeWidth="1.6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.25rem] uppercase tracking-[0.12em] text-ink">Navalha</span>
        <span className="mt-0.5 text-[0.54rem] uppercase tracking-[0.3em] text-accent">Barbearia</span>
      </span>
    </span>
  )
}

/** Mini-agendamento do hero: três escolhas e um botão, como manda o setor. */
function Agendador({ onDone }: { onDone: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onDone()
      }}
      className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 shadow-lift"
    >
      <p className="flex items-center gap-2 font-display text-[1.2rem] uppercase text-ink">
        <CalendarCheck className="size-5 text-accent" aria-hidden="true" />
        Agende em 30 segundos
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Serviço" defaultValue="combo">
          <option value="corte">Corte social · 40 min</option>
          <option value="combo">Corte + barba · 70 min</option>
          <option value="barba">Barba completa · 35 min</option>
          <option value="fade">Degradê navalhado · 50 min</option>
        </Select>
        <Select label="Barbeiro" defaultValue="qualquer">
          <option value="qualquer">Qualquer um disponível</option>
          <option value="dico">Dico</option>
          <option value="tarcisio">Tarcísio</option>
          <option value="serginho">Serginho</option>
          <option value="marlon">Marlon</option>
        </Select>
      </div>
      <Select label="Quando" defaultValue="hoje">
        <option value="hoje">Hoje · 6 horários livres</option>
        <option value="amanha">Amanhã · 11 horários livres</option>
        <option value="semana">Escolher outro dia</option>
      </Select>
      <Button type="submit" size="lg" full arrow>
        Ver horários
      </Button>
      <p className="t-small text-center text-ink-3">
        Sem cadastro. Confirmação por WhatsApp — formulário demonstrativo.
      </p>
    </form>
  )
}

export default function Barbearia() {
  const [agendado, setAgendado] = useState(false)

  return (
    <>
      <Navbar
        brand={<Logo />}
        links={NAV}
        secondary={{ label: 'Ter a sáb · 9h às 20h', href: '#casa' }}
        cta={{ label: 'Agendar', href: '#agendar' }}
        variant="bar"
        overlay
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden">
        <HeroBackdrop
          id={IMG.barbearia.hero}
          alt="Salão da barbearia em luz baixa, com barbeiros atendendo"
          vertical={[82, 35, 94]}
          lateral={[70, 10]}
        />

        <Container size="xl" className="relative pb-14 pt-32 sm:pb-20">
          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <Reveal y={10} duration={0.5}>
                <span className="t-eyebrow text-accent">Desde 2014 · Rua Aurora, 88</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-5 font-display text-[clamp(2.7rem,6.6vw,5.2rem)] uppercase leading-[0.92] text-ink">
                  Cadeira reservada.
                  <br />
                  <span className="text-accent">Hora marcada.</span> Sem espera.
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="t-lead mt-6 max-w-lg text-pretty text-ink-2">
                  Quatro barbeiros, seis dias por semana. Você marca pelo celular em trinta segundos e senta
                  na cadeira no horário — ou assina o clube e para de pensar nisso.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9rem] text-ink-2">
                  <span className="inline-flex items-center gap-2">
                    <Stars value={5} /> 4,9 no Google · 873 avaliações
                  </span>
                </div>
              </Reveal>
            </div>

            <div id="agendar" className="scroll-mt-28">
              <Reveal delay={0.18}>
                <Agendador onDone={() => setAgendado(true)} />
              </Reveal>
            </div>
          </div>
        </Container>
      </header>

      {/* NÚMEROS ---------------------------------------------------------- */}
      <Section pad="md">
        <Container size="xl">
          <Stats items={NUMEROS} variant="row" />
        </Container>
      </Section>

      {/* SERVIÇOS --------------------------------------------------------- */}
      <Section id="servicos" className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            eyebrow="Serviços"
            title="Preço na parede, sem surpresa no caixa"
            description="Duração real de cada atendimento — é o que reservamos na agenda."
            actions={
              <span className="text-[0.84rem] text-ink-3">
                Valores avulsos · assinantes não pagam no balcão
              </span>
            }
          />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {SERVICOS.map((s, i) => (
              <Reveal key={s.nome} delay={i * 0.04}>
                <div className="group relative grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[1.1fr_1.4fr_auto_auto] sm:items-center">
                  <h3
                    className={`font-display text-[1.35rem] uppercase leading-none transition-colors duration-300 group-hover:text-accent ${
                      s.destaque ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setAgendado(true)}
                      className="text-left after:absolute after:inset-0 after:content-['']"
                    >
                      {s.nome}
                      <span className="sr-only">
                        — agendar, {s.min} minutos, {brl(s.preco)}
                      </span>
                    </button>
                  </h3>
                  <p className="col-span-2 text-[0.92rem] text-ink-2 sm:col-span-1">{s.desc}</p>
                  <span className="hidden font-mono text-[0.82rem] text-ink-3 sm:block">{s.min} min</span>
                  <span className="justify-self-end font-display text-[1.5rem] leading-none text-ink">
                    {brl(s.preco)}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* BARBEIROS -------------------------------------------------------- */}
      <Section id="barbeiros">
        <Container size="xl">
          <SectionHeading
            eyebrow="Quem corta"
            title="Escolha o seu e veja o próximo horário"
            description="Cada um com agenda própria. Quem já tem barbeiro de confiança marca direto com ele."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BARBEIROS.map((b, i) => (
              <Reveal key={b.nome} delay={i * 0.07}>
                <button
                  type="button"
                  onClick={() => setAgendado(true)}
                  className="group block w-full text-left"
                >
                  <Img
                    id={b.img}
                    alt={`Retrato do barbeiro ${b.nome}`}
                    w={700}
                    tone="mono"
                    className="aspect-[4/5] w-full rounded-card"
                    imgClassName="transition-all duration-700 ease-brand group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <div className="mt-4">
                    <p className="font-display text-[1.3rem] uppercase leading-none text-ink">{b.nome}</p>
                    <p className="mt-1.5 text-[0.9rem] text-ink-2">{b.esp}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[0.85rem] text-accent">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {b.tempo}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* A CASA ----------------------------------------------------------- */}
      <Section id="casa" className="border-y border-line bg-wash">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
            <div className="grid grid-cols-2 gap-4">
              <Reveal>
                <Img
                  id={IMG.barbearia.barba}
                  alt="Barba sendo feita com navalha, em luz baixa"
                  w={800}
                  tone="none"
                  className="aspect-[4/5] w-full rounded-card"
                />
              </Reveal>
              <div className="flex flex-col gap-4 pt-10">
                <Reveal delay={0.08}>
                  <Img
                    id={IMG.barbearia.navalha}
                    alt="Navalha sendo preparada na mão do barbeiro"
                    w={800}
                    tone="none"
                    className="aspect-square w-full rounded-card"
                  />
                </Reveal>
                <Reveal delay={0.14}>
                  <Img
                    id={IMG.barbearia.salao}
                    alt="Interior clássico da barbearia, com quadros e espelhos"
                    w={800}
                    tone="none"
                    className="aspect-[7/6] w-full rounded-card"
                  />
                </Reveal>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="A casa"
                title="Doze anos no mesmo ponto, e isso diz alguma coisa"
                description="Abrimos em 2014 com duas cadeiras. Hoje são cinco, e boa parte dos clientes do primeiro ano ainda senta aqui."
              />
              <ul className="mt-9 flex flex-col gap-4">
                {[
                  {
                    icon: Scissors,
                    t: 'Toalha quente em toda barba',
                    d: 'Não é extra: está no preço da barba desde sempre.',
                  },
                  {
                    icon: Clock,
                    t: 'Terça a sábado, 9h às 20h',
                    d: 'Sexta e sábado a agenda fecha com dois dias de antecedência.',
                  },
                  {
                    icon: MapPin,
                    t: 'Rua Aurora, 88 · Centro',
                    d: 'Estacionamento conveniado na esquina, duas horas de cortesia.',
                  },
                ].map((b, i) => {
                  const Icon = b.icon
                  return (
                    <Reveal key={b.t} delay={i * 0.07}>
                      <li className="flex gap-4 rounded-card border border-line bg-surface p-5">
                        <span className="grid size-10 shrink-0 place-items-center rounded-btn bg-raise text-accent">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-medium text-ink">{b.t}</p>
                          <p className="mt-1 text-[0.9rem] text-ink-2">{b.d}</p>
                        </div>
                      </li>
                    </Reveal>
                  )
                })}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* CLUBE ------------------------------------------------------------ */}
      <Section id="clube">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Clube Navalha"
            title="Quem corta todo mês paga menos"
            description="Mensalidade no cartão, agendamento prioritário e nada a pagar no balcão. Pausa ou cancela quando quiser."
          />
          <Pricing
            plans={PLANOS}
            cycles={['Mensal', 'Anual · 1 mês grátis']}
            onSelect={() => setAgendado(true)}
            className="mt-12"
          />
        </Container>
      </Section>

      {/* DEPOIMENTOS ------------------------------------------------------ */}
      <Section className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading align="center" eyebrow="Clientes" title="O que dizem depois de sentar na cadeira" />
          <TestimonialGrid items={DEPOIMENTOS} className="mt-12" />
        </Container>
      </Section>

      <FAQ
        title="Perguntas de quem nunca veio"
        description="Se faltar alguma, o WhatsApp da recepção responde na hora."
        items={PERGUNTAS}
        aside={
          <div className="rounded-card border border-line bg-surface p-6">
            <p className="font-display text-[1.2rem] uppercase text-ink">Primeira vez?</p>
            <p className="mt-2 text-[0.92rem] text-ink-2">
              Chegue 5 minutos antes. A gente conversa sobre o que você quer antes de ligar a máquina — leva
              dois minutos e evita arrependimento.
            </p>
          </div>
        }
      />

      <CTA
        eyebrow="Agenda de hoje"
        title="Ainda tem horário para hoje à tarde"
        description="Trinta segundos para marcar, sem cadastro e sem baixar nada."
        actions={
          <>
            <ButtonLink href="#agendar" size="lg" arrow>
              Escolher meu horário
            </ButtonLink>
            <ButtonLink href="#clube" size="lg" variant="outline">
              Conhecer o clube
            </ButtonLink>
          </>
        }
        note="Rua Aurora, 88 · Centro · Terça a sábado, 9h às 20h"
      />

      <Footer
        brand={<Logo />}
        tagline="Barbearia desde 2014. Rua Aurora, 88 · Centro."
        wordmark="NAVALHA"
        note="© 2026 Navalha Barbearia · CNPJ fictício 00.000.000/0001-00"
        columns={[
          { title: 'Serviços', links: ['Corte', 'Barba', 'Degradê', 'Infantil'] },
          { title: 'Clube', links: ['Planos', 'Como funciona', 'Pausar', 'Cancelar'] },
          { title: 'Contato', links: ['Agendar', 'WhatsApp', 'Rua Aurora, 88', 'Instagram'] },
        ]}
      />

      <Modal open={agendado} onClose={() => setAgendado(false)} title="Horário reservado">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/15 text-accent">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h3 className="font-display text-[1.5rem] uppercase text-ink">Seu horário está guardado</h3>
          <p className="text-ink-2">
            Numa página real, aqui apareceriam os horários livres do barbeiro escolhido e a confirmação iria
            por WhatsApp. Esta é uma página demonstrativa — nenhum dado é enviado.
          </p>
          <Button size="lg" full onClick={() => setAgendado(false)}>
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  )
}
