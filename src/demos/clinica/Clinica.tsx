import { useState } from 'react'
import {
  Activity,
  Apple,
  Brain,
  CalendarCheck,
  CheckCircle2,
  Clock,
  HeartPulse,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Input, Select } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stars } from '@/components/ui/Stars'
import { FAQ } from '@/components/site/FAQ'
import { Footer } from '@/components/site/Footer'
import { Navbar } from '@/components/site/Navbar'
import { Pricing } from '@/components/site/Pricing'
import { Stats } from '@/components/site/Stats'
import { TestimonialGrid } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'

/* Clínica, corpo clínico, preços e depoimentos são fictícios. */

const NAV = [
  { label: 'A clínica', href: '#clinica' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Corpo clínico', href: '#equipe' },
  { label: 'Planos', href: '#planos' },
]

const ESPECIALIDADES = [
  {
    icon: Stethoscope,
    t: 'Medicina integrativa',
    d: 'A consulta de entrada: 90 minutos para olhar histórico, exames e rotina antes de qualquer prescrição.',
  },
  {
    icon: Activity,
    t: 'Cardiologia preventiva',
    d: 'Avaliação de risco cardiovascular com teste ergoespirométrico e acompanhamento trimestral.',
  },
  {
    icon: HeartPulse,
    t: 'Endocrinologia',
    d: 'Metabolismo, tireoide e hormônios lidos junto com sono, treino e alimentação.',
  },
  {
    icon: Apple,
    t: 'Nutrição clínica',
    d: 'Plano alimentar construído sobre o que você realmente come — e cozinha — durante a semana.',
  },
  {
    icon: Brain,
    t: 'Saúde mental',
    d: 'Psicologia e psiquiatria integradas ao plano, sem precisar recontar sua história do zero.',
  },
  {
    icon: Moon,
    t: 'Medicina do sono',
    d: 'Polissonografia domiciliar e ajuste de rotina para quem dorme mal há anos.',
  },
]

const ETAPAS = [
  {
    n: '01',
    t: 'Avaliação de 90 minutos',
    d: 'Você conversa com médico, nutricionista e educador físico no mesmo dia, na mesma sala.',
  },
  {
    n: '02',
    t: 'Plano escrito em 7 dias',
    d: 'Exames interpretados, metas definidas e o que muda na primeira semana — em uma página.',
  },
  {
    n: '03',
    t: 'Acompanhamento contínuo',
    d: 'Retornos a cada 90 dias, com ajustes no meio do caminho pelo aplicativo da clínica.',
  },
]

const EQUIPE = [
  {
    nome: 'Dra. Helena Marques',
    esp: 'Medicina integrativa',
    reg: 'CRM-SP 118.420',
    img: IMG.clinica.equipe[0],
  },
  { nome: 'Dra. Sofia Andrade', esp: 'Endocrinologia', reg: 'CRM-SP 132.907', img: IMG.clinica.equipe[1] },
  {
    nome: 'Dr. Vítor Rangel',
    esp: 'Cardiologia preventiva',
    reg: 'CRM-SP 141.335',
    img: IMG.clinica.equipe[2],
  },
  { nome: 'Dra. Clara Beltrão', esp: 'Nutrição clínica', reg: 'CRN-3 28.114', img: IMG.clinica.equipe[3] },
]

const NUMEROS = [
  { value: 4.9, decimals: 1, label: 'Nota média dos pacientes', note: '1.284 avaliações verificadas' },
  { value: 12, suffix: ' anos', label: 'De clínica em funcionamento' },
  { value: 92, suffix: '%', label: 'Seguem no acompanhamento após 12 meses' },
  { value: 3, suffix: ' dias', label: 'Espera média para a primeira avaliação' },
]

const DEPOIMENTOS = [
  {
    quote:
      'Eu tinha exames de três especialistas que nunca conversaram entre si. Na Aurora, saí da primeira consulta com um plano único e com todo mundo alinhado.',
    name: 'Beatriz Nunes',
    role: 'Paciente desde 2024',
    face: IMG.faces.beatriz,
    rating: 5,
  },
  {
    quote:
      'O que mudou foi o retorno. A cada 90 dias alguém olha os números comigo e ajusta. Nunca tinha tido isso.',
    name: 'Daniel Ferraz',
    role: 'Paciente desde 2023',
    face: IMG.faces.daniel,
    rating: 5,
  },
  {
    quote:
      'Dormia mal há seis anos e já tinha desistido. O plano de sono foi chato de seguir nas duas primeiras semanas e libertador depois.',
    name: 'Lívia Marchetti',
    role: 'Paciente desde 2025',
    face: IMG.faces.livia,
    rating: 5,
  },
]

const PLANOS = [
  {
    name: 'Avaliação inicial',
    description: 'A porta de entrada. Sem compromisso de continuidade.',
    price: [1290, 1290] as [number, number],
    unit: 'à vista',
    features: [
      'Consulta de 90 minutos com três especialistas',
      'Interpretação de exames que você já tem',
      'Plano escrito entregue em até 7 dias',
      'Uma teleconsulta de dúvidas incluída',
    ],
    cta: 'Agendar avaliação',
  },
  {
    name: 'Acompanhamento Aurora',
    description: 'Para quem quer o plano executado, não só entregue.',
    price: [890, 740] as [number, number],
    features: [
      'Avaliação inicial completa incluída',
      'Retornos trimestrais com todo o time',
      'Canal direto com a equipe pelo aplicativo',
      'Exames de rotina com preço negociado',
      'Ajustes de plano sempre que necessário',
    ],
    cta: 'Começar acompanhamento',
    highlight: true,
    badge: 'Mais escolhido',
  },
  {
    name: 'Programa Longevidade',
    description: 'Protocolo estendido, com metas de 12 e 24 meses.',
    price: [1690, 1420] as [number, number],
    features: [
      'Tudo do acompanhamento Aurora',
      'Avaliação funcional e teste cardiopulmonar',
      'Polissonografia domiciliar anual',
      'Educador físico presencial quinzenal',
    ],
    cta: 'Falar com a clínica',
  },
]

const PERGUNTAS = [
  {
    q: 'A clínica atende por convênio?',
    a: 'O atendimento é particular. Emitimos recibo e relatório com os códigos necessários para você solicitar reembolso ao seu plano — a maior parte dos pacientes recupera entre 40% e 70% do valor.',
  },
  {
    q: 'Preciso levar exames?',
    a: 'Leve os que tiver dos últimos 12 meses, mesmo que pareçam antigos ou incompletos. Se faltar algo essencial, solicitamos na própria avaliação e o resultado entra no plano.',
  },
  {
    q: 'Quanto tempo até ver resultado?',
    a: 'Sono e energia costumam responder nas primeiras quatro semanas. Marcadores metabólicos e composição corporal são reavaliados no retorno de 90 dias.',
  },
  {
    q: 'Posso cancelar o acompanhamento?',
    a: 'Sim, a qualquer momento e sem multa. O plano escrito e os seus exames continuam disponíveis para download no aplicativo.',
  },
  {
    q: 'Vocês atendem por telemedicina?',
    a: 'A avaliação inicial é sempre presencial, porque inclui exame físico e bioimpedância. Os retornos podem ser online, presenciais ou mistos — você escolhe a cada trimestre.',
  },
]

const CONVENIOS = [
  'Reembolso Bradesco',
  'Reembolso SulAmérica',
  'Reembolso Amil',
  'Reembolso Porto',
  'Reembolso Omint',
]

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 30 30" className="size-8" aria-hidden="true">
        <circle cx="15" cy="15" r="13" fill="none" stroke="var(--c-accent)" strokeWidth="1.4" />
        <path d="M15 6a9 9 0 0 1 0 18 9 9 0 0 0 0-18Z" fill="var(--c-accent)" />
      </svg>
      <span className="font-display text-[1.2rem] leading-none text-ink">
        Clínica <span className="text-accent">Aurora</span>
      </span>
    </span>
  )
}

function BookingForm({ onDone }: { onDone: () => void }) {
  const [sending, setSending] = useState(false)

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setSending(true)
    // Demonstração: nenhum dado é enviado a lugar nenhum.
    window.setTimeout(() => {
      setSending(false)
      onDone()
    }, 700)
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nome" name="nome" placeholder="Como podemos te chamar" required />
        <Input label="WhatsApp" name="tel" type="tel" placeholder="(11) 90000-0000" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Interesse" name="area" defaultValue="integrativa">
          <option value="integrativa">Avaliação integrativa</option>
          <option value="metabolismo">Metabolismo e hormônios</option>
          <option value="sono">Sono</option>
          <option value="cardio">Cardiologia preventiva</option>
        </Select>
        <Select label="Melhor horário" name="horario" defaultValue="manha">
          <option value="manha">Manhã (8h–12h)</option>
          <option value="tarde">Tarde (13h–18h)</option>
          <option value="noite">Início da noite (18h–20h)</option>
        </Select>
      </div>
      <Button type="submit" size="lg" full arrow disabled={sending}>
        {sending ? 'Enviando…' : 'Agendar avaliação'}
      </Button>
      <p className="t-small text-center text-ink-3">
        Retorno em até 2 horas úteis. Formulário demonstrativo — nada é enviado.
      </p>
    </form>
  )
}

export default function Clinica() {
  const [done, setDone] = useState(false)

  return (
    <>
      <Navbar
        brand={<Logo />}
        links={NAV}
        secondary={{ label: '(11) 4000-2200', href: '#contato' }}
        cta={{ label: 'Agendar', href: '#agendar' }}
        variant="bar"
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--c-accent-2) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <Container size="xl" className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-7">
              <Reveal y={12} duration={0.5}>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.8rem] text-ink-2 shadow-soft">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Novos horários para setembro
                </span>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="t-h1 text-balance font-display">
                  Cuidado que começa por entender o seu corpo <span className="text-accent">inteiro</span>.
                </h1>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="t-lead max-w-lg text-pretty text-ink-2">
                  Uma avaliação de 90 minutos com médico, nutricionista e educador físico no mesmo dia. Você
                  sai com um plano escrito — e com quem executa junto.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.88rem] text-ink-2">
                  <span className="inline-flex items-center gap-2">
                    <Stars value={5} /> 4,9 · 1.284 avaliações
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="size-4 text-accent" aria-hidden="true" /> Recibo para reembolso
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.26} className="mt-2">
                <div
                  id="agendar"
                  className="rounded-xl2 border border-line bg-surface p-6 shadow-soft sm:p-7"
                >
                  <p className="mb-5 flex items-center gap-2 font-display text-[1.1rem] text-ink">
                    <CalendarCheck className="size-5 text-accent" aria-hidden="true" />
                    Agende sua avaliação inicial
                  </p>
                  <BookingForm onDone={() => setDone(true)} />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.18} className="relative">
              <Img
                id={IMG.clinica.hero}
                alt="Sala de atendimento da clínica, com luz natural e mobiliário claro"
                w={1200}
                tone="mute"
                priority
                className="aspect-[4/5] w-full rounded-xl2"
              />
              <div className="absolute -bottom-6 left-4 right-4 rounded-card border border-line bg-surface p-5 shadow-lift sm:left-auto sm:right-6 sm:w-64">
                <p className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-3">Próxima agenda</p>
                <p className="mt-2 font-display text-[1.35rem] text-ink">Quinta, 21/08</p>
                <p className="mt-1 text-[0.88rem] text-ink-2">4 horários disponíveis</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* CONFIANÇA -------------------------------------------------------- */}
      <Section pad="md" className="mt-10">
        <Container size="xl">
          <Stats items={NUMEROS} variant="cards" />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line pt-8">
            <span className="t-small text-ink-3">Emitimos recibo para reembolso em:</span>
            {CONVENIOS.map((c) => (
              <span key={c} className="text-[0.88rem] text-ink-2">
                {c}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* ESPECIALIDADES --------------------------------------------------- */}
      <Section id="especialidades" className="bg-wash">
        <Container size="xl">
          <SectionHeading
            eyebrow="Especialidades"
            title="Seis frentes que conversam entre si"
            description="Toda especialidade lê o mesmo prontuário. Você não precisa recontar sua história a cada porta."
            align="center"
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ESPECIALIDADES.map((e, i) => {
              const Icon = e.icon
              return (
                <Reveal key={e.t} delay={i * 0.06}>
                  <div className="group flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-7 transition-all duration-400 ease-brand hover:-translate-y-1 hover:shadow-soft">
                    <span className="grid size-12 place-items-center rounded-full bg-accent-2/60 text-accent transition-colors duration-400 group-hover:bg-accent group-hover:text-on-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="t-h3 font-display text-ink">{e.t}</h3>
                    <p className="text-[0.94rem] text-ink-2">{e.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* COMO FUNCIONA ---------------------------------------------------- */}
      <Section id="clinica">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                <Img
                  id={IMG.clinica.room}
                  alt="Sala de terapia com luz suave e enxoval branco"
                  w={800}
                  className="aspect-[4/5] w-full rounded-card"
                />
                <div className="flex flex-col gap-4 pt-10">
                  <Img
                    id={IMG.clinica.therapy}
                    alt="Sessão de terapia manual em ambiente reservado"
                    w={800}
                    className="aspect-square w-full rounded-card"
                  />
                  <Img
                    id={IMG.clinica.detail}
                    alt="Detalhe do mobiliário e organização dos materiais clínicos"
                    w={800}
                    className="aspect-[7/6] w-full rounded-card"
                  />
                </div>
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="Como funciona"
                title="Três passos, sem labirinto"
                description="Do primeiro contato ao acompanhamento contínuo, com prazos claros em cada etapa."
              />
              <ol className="mt-10 flex flex-col">
                {ETAPAS.map((e, i) => (
                  <Reveal key={e.n} delay={i * 0.08}>
                    <li className="relative flex gap-5 pb-9 last:pb-0">
                      {i < ETAPAS.length - 1 && (
                        <span
                          className="absolute left-[1.35rem] top-12 h-[calc(100%-3rem)] w-px bg-line"
                          aria-hidden="true"
                        />
                      )}
                      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-accent/30 bg-surface font-mono text-[0.78rem] text-accent">
                        {e.n}
                      </span>
                      <div className="pt-1.5">
                        <h3 className="t-h3 font-display text-ink">{e.t}</h3>
                        <p className="mt-2 text-[0.95rem] text-ink-2">{e.d}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <ButtonLink href="#agendar" size="lg" arrow className="mt-4">
                Agendar avaliação inicial
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* EQUIPE ----------------------------------------------------------- */}
      <Section id="equipe" className="bg-wash">
        <Container size="xl">
          <SectionHeading
            eyebrow="Corpo clínico"
            title="Quem vai te atender"
            description="Registro profissional ativo, agenda própria e no mínimo dez anos de consultório."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EQUIPE.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.07}>
                <figure className="group">
                  <Img
                    id={p.img}
                    alt={`Retrato de ${p.nome}`}
                    w={700}
                    tone="mono"
                    className="aspect-[4/5] w-full rounded-card"
                    imgClassName="transition-all duration-700 ease-brand group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <figcaption className="mt-4">
                    <p className="font-display text-[1.1rem] text-ink">{p.nome}</p>
                    <p className="mt-0.5 text-[0.9rem] text-accent">{p.esp}</p>
                    <p className="mt-1 font-mono text-[0.74rem] text-ink-3">{p.reg}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* DEPOIMENTOS ------------------------------------------------------ */}
      <Section>
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Pacientes"
            title="O que muda depois de 90 dias"
            description="Depoimentos ilustrativos, escritos para esta demonstração."
          />
          <TestimonialGrid items={DEPOIMENTOS} className="mt-14" />
        </Container>
      </Section>

      {/* PLANOS ----------------------------------------------------------- */}
      <Section id="planos" className="bg-wash">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Valores"
            title="Transparência antes da primeira consulta"
            description="Sem taxa de adesão e sem fidelidade. Você pode pausar o acompanhamento quando quiser."
          />
          <Pricing
            plans={PLANOS}
            cycles={['Mensal', 'Anual · 2 meses grátis']}
            onSelect={() => setDone(true)}
            className="mt-14"
          />
        </Container>
      </Section>

      <FAQ
        title="Antes de agendar"
        description="As perguntas que mais chegam pelo WhatsApp da recepção."
        items={PERGUNTAS}
        aside={
          <div className="rounded-card border border-line bg-surface p-6 shadow-soft">
            <p className="flex items-center gap-2 font-display text-[1.05rem] text-ink">
              <Phone className="size-4 text-accent" aria-hidden="true" />
              Prefere falar com alguém?
            </p>
            <p className="mt-2 text-[0.92rem] text-ink-2">
              A recepção atende de segunda a sexta, das 7h às 20h, e no sábado até as 13h.
            </p>
            <p className="mt-4 font-display text-[1.4rem] text-ink">(11) 4000-2200</p>
          </div>
        }
      />

      {/* CTA -------------------------------------------------------------- */}
      <Section id="contato" data-invert className="bg-bg">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <Reveal className="flex flex-col gap-6">
              <h2 className="t-h1 text-balance font-display">
                Três dias é a espera média para a primeira avaliação.
              </h2>
              <p className="t-lead max-w-lg text-pretty text-ink-2">
                Agende agora e a recepção confirma o horário por WhatsApp em até duas horas úteis.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#agendar" size="lg" arrow>
                  Agendar avaliação
                </ButtonLink>
                <Button size="lg" variant="outline" onClick={() => setDone(true)}>
                  Falar no WhatsApp
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: MapPin, t: 'Endereço', d: 'Rua Bandeira Paulista, 780 · Itaim Bibi · São Paulo' },
                  { icon: Clock, t: 'Horários', d: 'Seg a sex, 7h–20h · Sáb, 8h–13h' },
                  { icon: CheckCircle2, t: 'Estacionamento', d: 'Convênio com o edifício, 3 horas cortesia' },
                  { icon: ShieldCheck, t: 'Reembolso', d: 'Recibo e relatório emitidos no mesmo dia' },
                ].map((b) => {
                  const Icon = b.icon
                  return (
                    <div key={b.t} className="rounded-card border border-line bg-surface p-5">
                      <Icon className="size-5 text-accent" aria-hidden="true" />
                      <p className="mt-3 text-[0.9rem] font-medium text-ink">{b.t}</p>
                      <p className="mt-1 text-[0.88rem] text-ink-2">{b.d}</p>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Footer
        brand={<Logo />}
        tagline="Medicina integrativa e longevidade. Itaim Bibi, São Paulo."
        note="© 2026 Clínica Aurora · Responsável técnica: Dra. Helena Marques (CRM-SP 118.420)"
        columns={[
          { title: 'Clínica', links: ['Sobre', 'Corpo clínico', 'Estrutura', 'Trabalhe conosco'] },
          { title: 'Atendimento', links: ['Agendar', 'Reembolso', 'Exames', 'Telemedicina'] },
          {
            title: 'Contato',
            links: ['(11) 4000-2200', 'WhatsApp', 'contato@clinicaaurora.com.br', 'Como chegar'],
          },
        ]}
      />

      <Modal open={done} onClose={() => setDone(false)} title="Solicitação registrada">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-2/60 text-accent">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h3 className="t-h3 font-display text-ink">Recebemos seu pedido de agendamento</h3>
          <p className="text-ink-2">
            A recepção confirma o horário pelo WhatsApp em até duas horas úteis. Esta é uma página
            demonstrativa: nenhum dado foi enviado ou armazenado.
          </p>
          <Button size="lg" full onClick={() => setDone(false)}>
            Entendi
          </Button>
        </div>
      </Modal>
    </>
  )
}
