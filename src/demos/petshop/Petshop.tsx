import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bath, CheckCircle2, Heart, MessageCircle, Scissors, Stethoscope, Syringe, Truck } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Input, Select } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stars } from '@/components/ui/Stars'
import { CTA } from '@/components/site/CTA'
import { FAQ } from '@/components/site/FAQ'
import { Footer } from '@/components/site/Footer'
import { Navbar } from '@/components/site/Navbar'
import { Pricing } from '@/components/site/Pricing'
import { Stats } from '@/components/site/Stats'
import { TestimonialGrid } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'
import { EASE_BRAND } from '@/lib/motion'
import { brl } from '@/lib/utils'

/* Pet shop, equipe, preços e depoimentos são fictícios. */

const NAV = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Planos', href: '#planos' },
  { label: 'A clínica', href: '#clinica' },
]

const SERVICOS = [
  { icon: Bath, t: 'Banho', d: 'Produtos hipoalergênicos, secagem sem gaiola e escovação inclusa.', p: 65 },
  { icon: Scissors, t: 'Tosa', d: 'Higiênica, na tesoura ou na máquina — do jeito que o pelo pede.', p: 95 },
  {
    icon: Stethoscope,
    t: 'Consulta veterinária',
    d: 'Clínica geral no mesmo endereço, com retorno em 15 dias incluso.',
    p: 180,
  },
  {
    icon: Syringe,
    t: 'Vacinas e vermífugo',
    d: 'Carteirinha digital com aviso de reforço no WhatsApp.',
    p: 90,
  },
  {
    icon: Heart,
    t: 'Odonto e higiene',
    d: 'Limpeza dental sob sedação leve, com avaliação prévia obrigatória.',
    p: 320,
  },
  { icon: Truck, t: 'Táxi pet', d: 'Buscamos e devolvemos em casa, em transporte climatizado.', p: 35 },
]

const PASSOS = [
  {
    n: '01',
    t: 'Agende em um minuto',
    d: 'Escolha o serviço, o dia e o horário. Não precisa criar conta nem ligar para a loja.',
  },
  {
    n: '02',
    t: 'Deixe seu pet com a gente',
    d: 'Ele fica em box individual e climatizado. Nada de espera em gaiola coletiva.',
  },
  {
    n: '03',
    t: 'Receba o relatório com foto',
    d: 'No fim do atendimento chega no seu WhatsApp: como ele se comportou, o que observamos na pele e nos dentes, e uma foto do resultado.',
  },
]

const EQUIPE = [
  {
    nome: 'Dra. Marina Sales',
    esp: 'Clínica geral e dermatologia',
    reg: 'CRMV-SP 24.118',
    img: IMG.petshop.equipe[0],
  },
  {
    nome: 'Dr. Otávio Lins',
    esp: 'Cirurgia e odontologia',
    reg: 'CRMV-SP 31.402',
    img: IMG.petshop.equipe[1],
  },
]

const NUMEROS = [
  { value: 4.9, decimals: 1, label: 'Nota dos tutores', note: '2.410 atendimentos avaliados' },
  { value: 11, suffix: ' anos', label: 'De clínica no mesmo bairro' },
  { value: 100, suffix: '%', label: 'Dos banhos com relatório e foto' },
  { value: 0, label: 'Gaiolas de espera coletiva', note: 'Box individual para cada pet' },
]

const PLANOS = [
  {
    name: 'Banho no mês',
    description: 'Para quem dá banho uma vez por mês e resolve.',
    price: [119, 107] as [number, number],
    features: [
      '2 banhos por mês',
      'Escovação e corte de unha',
      'Relatório com foto',
      'Desconto de 10% na tosa',
    ],
    cta: 'Assinar',
  },
  {
    name: 'Cuidado completo',
    description: 'Banho, tosa e a consulta anual — o plano da maioria.',
    price: [219, 197] as [number, number],
    features: [
      '4 banhos por mês',
      '1 tosa higiênica por mês',
      '1 consulta veterinária por ano',
      'Táxi pet incluso em 2 idas',
      'Prioridade na agenda de sábado',
    ],
    cta: 'Assinar o plano',
    highlight: true,
    badge: 'Mais assinado',
  },
  {
    name: 'Vida leve',
    description: 'Para pet idoso ou com pele sensível, que precisa de olho mais de perto.',
    price: [329, 296] as [number, number],
    features: [
      'Tudo do Cuidado completo',
      'Consultas trimestrais',
      'Banho medicamentoso quando indicado',
      'Canal direto com a veterinária',
    ],
    cta: 'Falar com a clínica',
  },
]

const DEPOIMENTOS = [
  {
    quote:
      'O relatório com foto acabou com a minha ansiedade. Antes eu ficava o dia inteiro imaginando se ele tinha chorado; hoje eu vejo a carinha dele limpo e sei que foi tranquilo.',
    name: 'Lívia Marchetti',
    role: 'Tutora do Tobias',
    face: IMG.faces.livia,
    rating: 5,
  },
  {
    quote:
      'Foi a veterinária daqui que percebeu a alteração na pele dele no banho e me chamou. Resolvemos cedo o que virou nada — em outro lugar teria passado batido.',
    name: 'Clara Beltrão',
    role: 'Tutora da Nina',
    face: IMG.faces.clara,
    rating: 5,
  },
  {
    quote:
      'Meu gato odeia sair de casa. O táxi pet com caixa climatizada foi a única coisa que funcionou — ele chega e volta sem estresse.',
    name: 'Renata Sanchez',
    role: 'Tutora do Miguel',
    face: IMG.faces.renata,
    rating: 5,
  },
]

const PERGUNTAS = [
  {
    q: 'Meu pet fica em gaiola esperando?',
    a: 'Não. Cada pet fica em box individual e climatizado, e a secagem é feita sem gaiola de ar quente — é a parte que mais assusta cachorro e a que mais causa acidente.',
  },
  {
    q: 'Atendem gato?',
    a: 'Sim, e em horário separado. Reservamos as manhãs de terça e quinta só para gatos, para eles não cruzarem com cachorro na recepção.',
  },
  {
    q: 'Preciso levar a carteira de vacinação?',
    a: 'Na primeira visita sim. Depois disso a carteirinha fica digital no nosso sistema e você recebe aviso de reforço no WhatsApp.',
  },
  {
    q: 'E se meu pet for agressivo ou muito assustado?',
    a: 'Avise no agendamento. Reservamos um horário mais vazio e um profissional só para ele. Se ainda assim não for seguro, conversamos sobre sedação leve com a veterinária — nunca na marra.',
  },
  {
    q: 'O plano tem fidelidade?',
    a: 'Não. Cobra no cartão todo dia 10 e você pode pausar ou cancelar pelo WhatsApp, sem multa e sem precisar justificar.',
  },
]

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-8" aria-hidden="true">
        <circle cx="9" cy="9" r="3" fill="var(--c-accent)" />
        <circle cx="19" cy="9" r="3" fill="var(--c-accent)" />
        <circle cx="6" cy="16" r="2.4" fill="var(--c-accent-2)" />
        <circle cx="22" cy="16" r="2.4" fill="var(--c-accent-2)" />
        <ellipse cx="14" cy="19" rx="6" ry="5" fill="var(--c-accent)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.25rem] font-extrabold tracking-tight text-ink">Amigo</span>
        <span className="mt-0.5 text-[0.56rem] uppercase tracking-[0.24em] text-accent-2">Pet & Vet</span>
      </span>
    </span>
  )
}

/** Agendamento curto do hero — quatro campos, como manda a régua de conversão. */
function AgendaForm({ onDone }: { onDone: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onDone()
      }}
      className="flex flex-col gap-4 rounded-xl2 border border-line bg-surface p-6 shadow-soft sm:p-7"
    >
      <p className="font-display text-[1.15rem] font-bold text-ink">Agende em um minuto</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Seu nome" placeholder="Como te chamamos" required />
        <Input label="Nome do pet" placeholder="Tobias, Nina…" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Serviço" defaultValue="banho">
          <option value="banho">Banho</option>
          <option value="tosa">Banho e tosa</option>
          <option value="consulta">Consulta veterinária</option>
          <option value="vacina">Vacina</option>
        </Select>
        <Select label="Quando" defaultValue="semana">
          <option value="hoje">Ainda esta semana</option>
          <option value="semana">Semana que vem</option>
          <option value="sabado">Só aos sábados</option>
        </Select>
      </div>
      <Button type="submit" size="lg" full arrow>
        Ver horários livres
      </Button>
      <p className="t-small text-center text-ink-3">
        Retorno por WhatsApp em até 1 hora. Formulário demonstrativo — nada é enviado.
      </p>
    </form>
  )
}

export default function Petshop() {
  const [agendado, setAgendado] = useState(false)

  return (
    <>
      <Navbar
        brand={<Logo />}
        links={NAV}
        secondary={{ label: '(11) 3030-1180', href: '#clinica' }}
        cta={{ label: 'Agendar', href: '#agendar' }}
        variant="bar"
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-28 sm:pt-32">
        <div
          className="pointer-events-none absolute -right-24 -top-16 size-[30rem] rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--c-raise) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <Container size="xl" className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="order-2 flex flex-col gap-6 lg:order-1">
              <Reveal y={10} duration={0.5}>
                <span className="inline-flex items-center gap-2 rounded-btn bg-raise px-3.5 py-1.5 text-[0.8rem] font-semibold text-accent">
                  <Heart className="size-3.5" aria-hidden="true" />
                  Pet shop e clínica no mesmo endereço
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="font-display text-[clamp(2.3rem,4.8vw,3.9rem)] font-extrabold leading-[1.02] text-ink">
                  Ele volta feliz. E você fica sabendo de <span className="text-accent">tudo</span>.
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="t-lead max-w-lg text-pretty text-ink-2">
                  Banho e tosa com hora marcada, veterinária na mesma porta e um relatório com foto no seu
                  WhatsApp ao fim de cada visita — inclusive o que a gente observou na pele e nos dentes.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9rem] text-ink-2">
                  <span className="inline-flex items-center gap-2">
                    <Stars value={5} /> 4,9 · 2.410 atendimentos
                  </span>
                  <span className="inline-flex items-center gap-2 font-semibold text-accent-2">
                    <CheckCircle2 className="size-4" aria-hidden="true" /> Sem gaiola de espera
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.24} className="mt-1">
                <div id="agendar" className="scroll-mt-28">
                  <AgendaForm onDone={() => setAgendado(true)} />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div className="relative">
                <Img
                  id={IMG.petshop.hero}
                  alt="Cachorro golden retriever sorrindo, fotografado em luz clara"
                  w={1200}
                  tone="none"
                  priority
                  className="aspect-[4/5] w-full rounded-xl2"
                />
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: EASE_BRAND }}
                  className="absolute -bottom-5 left-4 right-4 rounded-card border border-line bg-surface p-5 shadow-lift sm:left-auto sm:right-6 sm:w-72"
                >
                  <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-accent-2">
                    <MessageCircle className="size-3.5" aria-hidden="true" />
                    Relatório de hoje
                  </p>
                  <p className="mt-2 text-[0.92rem] text-ink">
                    “O Tobias ficou tranquilo no banho. Pele boa, unhas cortadas. Tártaro leve no canino —
                    vale avaliar no retorno.”
                  </p>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* NÚMEROS ---------------------------------------------------------- */}
      <Section pad="md" className="mt-10">
        <Container size="xl">
          <Stats items={NUMEROS} variant="cards" />
        </Container>
      </Section>

      {/* SERVIÇOS --------------------------------------------------------- */}
      <Section id="servicos" className="bg-wash">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Serviços"
            title="Tudo que ele precisa, sem trocar de endereço"
            description="Preços a partir de. O orçamento final depende do porte e do tipo de pelo — e é combinado antes, nunca depois."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICOS.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.t} delay={i * 0.05}>
                  <div className="group relative flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-6 transition-all duration-400 ease-brand focus-within:border-accent hover:-translate-y-1 hover:shadow-soft">
                    <span className="grid size-12 place-items-center rounded-full bg-raise text-accent transition-colors duration-400 group-hover:bg-accent group-hover:text-on-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[1.2rem] font-bold text-ink">
                      <button
                        type="button"
                        onClick={() => setAgendado(true)}
                        className="text-left after:absolute after:inset-0 after:content-['']"
                      >
                        {s.t}
                        <span className="sr-only">— agendar</span>
                      </button>
                    </h3>
                    <p className="text-[0.93rem] text-ink-2">{s.d}</p>
                    <span className="mt-auto pt-2 text-[0.85rem] text-ink-3">
                      a partir de{' '}
                      <strong className="font-display text-[1.15rem] text-accent">{brl(s.p)}</strong>
                    </span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* COMO FUNCIONA ---------------------------------------------------- */}
      <Section id="como-funciona">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Como funciona"
                title="Três passos, e você acompanha o dia inteiro"
                description="A parte que mais muda a experiência é a terceira — e é a que quase nenhum pet shop faz."
              />
              <ol className="mt-10 flex flex-col">
                {PASSOS.map((p, i) => (
                  <Reveal key={p.n} delay={i * 0.08}>
                    <li className="relative flex gap-5 pb-9 last:pb-0">
                      {i < PASSOS.length - 1 && (
                        <span
                          className="absolute left-[1.4rem] top-12 h-[calc(100%-3rem)] w-px bg-line"
                          aria-hidden="true"
                        />
                      )}
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent font-display text-[0.85rem] font-bold text-on-accent">
                        {p.n}
                      </span>
                      <div className="pt-1.5">
                        <h3 className="font-display text-[1.2rem] font-bold text-ink">{p.t}</h3>
                        <p className="mt-2 text-[0.95rem] text-ink-2">{p.d}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Reveal>
                <Img
                  id={IMG.petshop.consulta}
                  alt="Cachorro pequeno sobre a mesa de atendimento da clínica"
                  w={800}
                  tone="none"
                  className="aspect-[4/5] w-full rounded-card"
                />
              </Reveal>
              <div className="flex flex-col gap-4 pt-10">
                <Reveal delay={0.08}>
                  <Img
                    id={IMG.petshop.gato}
                    alt="Gato laranja e branco olhando para a câmera"
                    w={800}
                    tone="none"
                    className="aspect-square w-full rounded-card"
                  />
                </Reveal>
                <Reveal delay={0.14}>
                  <Img
                    id={IMG.petshop.colo}
                    alt="Filhote no colo, recebendo carinho"
                    w={800}
                    tone="none"
                    className="aspect-[7/6] w-full rounded-card"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CLÍNICA (invertido) ---------------------------------------------- */}
      <Section id="clinica" data-invert className="bg-bg">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <Reveal>
              <Img
                id={IMG.petshop.vet}
                alt="Veterinária segurando um filhote durante o atendimento"
                w={1200}
                tone="none"
                className="aspect-[4/3] w-full rounded-xl2"
              />
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="A clínica"
                title="Veterinária de plantão enquanto seu pet toma banho"
                description="É o motivo de banho e clínica ficarem na mesma porta: quem dá o banho enxerga a pele, e quem entende de pele está do outro lado do corredor."
              />
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {EQUIPE.map((p, i) => (
                  <Reveal key={p.nome} delay={i * 0.08}>
                    <div className="rounded-card border border-line bg-surface p-5">
                      <p className="font-display text-[1.05rem] font-bold text-ink">{p.nome}</p>
                      <p className="mt-1 text-[0.88rem] text-accent">{p.esp}</p>
                      <p className="mt-1.5 font-mono text-[0.74rem] text-ink-3">{p.reg}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <ButtonLink href="#agendar" size="lg" arrow className="mt-8">
                Marcar uma consulta
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* PLANOS ----------------------------------------------------------- */}
      <Section id="planos" className="bg-wash">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Planos mensais"
            title="Sai mais barato que pagar avulso"
            description="Sem fidelidade e sem multa. Pausa quando viajar e volta quando quiser."
          />
          <Pricing
            plans={PLANOS}
            cycles={['Mensal', 'Anual · 10% off']}
            onSelect={() => setAgendado(true)}
            className="mt-12"
          />
        </Container>
      </Section>

      {/* DEPOIMENTOS ------------------------------------------------------ */}
      <Section>
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Tutores"
            title="O que eles contam depois da primeira visita"
            description="Depoimentos ilustrativos, escritos para esta demonstração."
          />
          <TestimonialGrid items={DEPOIMENTOS} className="mt-12" />
        </Container>
      </Section>

      <FAQ
        title="O que os tutores perguntam"
        description="As dúvidas que aparecem antes de deixar o pet pela primeira vez."
        items={PERGUNTAS}
        className="border-t border-line"
        aside={
          <div className="rounded-card border border-line bg-surface p-6 shadow-soft">
            <p className="font-display text-[1.1rem] font-bold text-ink">Primeira visita</p>
            <p className="mt-2 text-[0.92rem] text-ink-2">
              Traga a carteira de vacinação e, se puder, venha junto no primeiro banho. Você conhece o espaço
              e ele te vê saindo tranquilo — faz diferença.
            </p>
          </div>
        }
      />

      <CTA
        eyebrow="Agenda da semana"
        title="Ainda temos horário para sábado de manhã"
        description="Um minuto para agendar, sem criar conta. A recepção confirma pelo WhatsApp."
        actions={
          <>
            <ButtonLink href="#agendar" size="lg" arrow>
              Agendar agora
            </ButtonLink>
            <ButtonLink href="#planos" size="lg" variant="outline">
              Ver planos mensais
            </ButtonLink>
          </>
        }
        note="Rua dos Ipês, 240 · Seg a sáb, 8h às 19h"
      />

      <Footer
        brand={<Logo />}
        tagline="Pet shop e clínica veterinária no mesmo endereço, desde 2015."
        note="© 2026 Amigo Pet & Vet · Responsável técnica: Dra. Marina Sales (CRMV-SP 24.118)"
        columns={[
          { title: 'Serviços', links: ['Banho', 'Tosa', 'Consulta', 'Vacinas'] },
          { title: 'Planos', links: ['Banho no mês', 'Cuidado completo', 'Vida leve', 'Táxi pet'] },
          { title: 'Contato', links: ['(11) 3030-1180', 'WhatsApp', 'Rua dos Ipês, 240', 'Como chegar'] },
        ]}
      />

      <Modal open={agendado} onClose={() => setAgendado(false)} title="Agendamento solicitado">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-raise text-accent">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h3 className="font-display text-[1.3rem] font-bold text-ink">Recebemos seu pedido</h3>
          <p className="text-ink-2">
            A recepção confirma o horário pelo WhatsApp em até uma hora. Esta é uma página demonstrativa —
            nenhum dado foi enviado ou armazenado.
          </p>
          <Button size="lg" full onClick={() => setAgendado(false)}>
            Entendi
          </Button>
        </div>
      </Modal>
    </>
  )
}
