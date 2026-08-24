import { useState } from 'react'
import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Database,
  Layers,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Input, Select, Textarea } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CTA } from '@/components/site/CTA'
import { FAQ } from '@/components/site/FAQ'
import { FeatureGrid } from '@/components/site/FeatureGrid'
import { Footer } from '@/components/site/Footer'
import { LogoCloud } from '@/components/site/LogoCloud'
import { Navbar } from '@/components/site/Navbar'
import { Stats } from '@/components/site/Stats'
import { TestimonialCarousel } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'

/* Firma, cases, números e clientes são fictícios. */

const NAV = [
  { label: 'Atuação', href: '#atuacao' },
  { label: 'Método', href: '#metodo' },
  { label: 'Cases', href: '#cases' },
  { label: 'Sócios', href: '#socios' },
]

const CLIENTES = [
  'Grupo Aliança',
  'Vitória Alimentos',
  'Nordeste Energia',
  'Pallas Indústria',
  'Rede Farmais',
  'Constel',
]

const NUMEROS = [
  {
    value: 1.8,
    decimals: 1,
    prefix: 'R$ ',
    suffix: ' bi',
    label: 'em resultado gerado para clientes',
    note: 'Auditado por terceira parte',
  },
  { value: 214, label: 'projetos entregues desde 2015' },
  { value: 96, suffix: '%', label: 'dos clientes contratam um segundo projeto' },
  { value: 9, suffix: ' meses', label: 'prazo médio até o resultado contratado' },
]

const ATUACAO = [
  {
    icon: Target,
    title: 'Estratégia e portfólio',
    text: 'Onde competir, o que descontinuar e quanto capital alocar em cada frente nos próximos três anos.',
  },
  {
    icon: Workflow,
    title: 'Excelência operacional',
    text: 'Redesenho de processo com o time na fábrica, no CD e na loja — não em sala de reunião.',
  },
  {
    icon: TrendingUp,
    title: 'Transformação comercial',
    text: 'Política de preço, mix, cobertura e remuneração da força de vendas, tudo amarrado à margem.',
  },
  {
    icon: Layers,
    title: 'Custos e capital de giro',
    text: 'Base zero, renegociação de contratos e ciclo financeiro, com meta assinada por cada diretor.',
  },
  {
    icon: Database,
    title: 'Dados e tecnologia',
    text: 'A camada de informação que sustenta a decisão depois que a consultoria sai da empresa.',
  },
  {
    icon: Users,
    title: 'Gestão de mudança',
    text: 'Rituais, metas e cadência de gestão para que o ganho não evapore no trimestre seguinte.',
  },
]

const METODO = [
  {
    n: '01',
    t: 'Diagnóstico',
    p: '4 semanas',
    d: 'Levantamento de dados, entrevistas com a liderança e quantificação da oportunidade. Termina com o valor em risco na mesa.',
  },
  {
    n: '02',
    t: 'Desenho',
    p: '6 semanas',
    d: 'Iniciativas priorizadas por impacto e esforço, com dono, meta e prazo definidos junto com o seu time.',
  },
  {
    n: '03',
    t: 'Implantação',
    p: '12 a 24 semanas',
    d: 'Nossos consultores dentro da operação, acompanhando execução e destravando o que emperra.',
  },
  {
    n: '04',
    t: 'Sustentação',
    p: 'contínuo',
    d: 'Cadência de gestão, painéis e transferência de método para que o resultado siga sem nós.',
  },
]

const CASES = [
  {
    setor: 'Distribuição de alimentos',
    titulo: 'Custo de servir 18% menor em nove meses',
    metrica: '-18%',
    metricaLabel: 'no custo de servir',
    desafio:
      'Uma distribuidora com 42 mil pontos de venda atendia todos com a mesma frequência e o mesmo pedido mínimo, independentemente da rentabilidade.',
    acao: 'Segmentamos a carteira em quatro perfis, redesenhamos a malha de rotas e criamos política de pedido mínimo por perfil, com o time comercial envolvido desde a segunda semana.',
    resultado:
      'Custo de servir 18% menor, cobertura mantida e ganho de 3,1 p.p. de margem de contribuição nos clientes da cauda longa.',
  },
  {
    setor: 'Indústria de embalagens',
    titulo: 'Margem bruta 6,4 pontos acima em um ano',
    metrica: '+6,4 p.p.',
    metricaLabel: 'de margem bruta',
    desafio:
      'Três fábricas com produtividade muito diferente entre si e nenhuma padronização de setup, produzindo o mesmo portfólio.',
    acao: 'Padronizamos o setup pela melhor prática interna, implantamos gestão de perdas por turno e renegociamos 61% da base de fornecedores de resina.',
    resultado:
      'Margem bruta 6,4 pontos acima do ano anterior, com OEE médio saindo de 58% para 71% nas três plantas.',
  },
  {
    setor: 'Varejo farmacêutico',
    titulo: 'Venda por loja 23% maior sem abrir unidade',
    metrica: '+23%',
    metricaLabel: 'na venda por loja',
    desafio:
      'Rede com 180 lojas crescia apenas por expansão, com venda por metro quadrado estagnada há três anos.',
    acao: 'Revisão de sortimento por cluster de loja, novo layout de gôndola testado em 12 unidades e programa de metas semanais para gerentes.',
    resultado:
      'Venda por loja 23% maior em 11 meses, com ruptura caindo de 9,4% para 3,8% e giro de estoque 1,6 vez maior.',
  },
]

const SOCIOS = [
  {
    nome: 'Ricardo Menezes',
    cargo: 'Sócio-fundador · Estratégia',
    bio: '22 anos, ex-diretor de operações em indústria de bens de consumo.',
    img: IMG.consultoria.partners[0],
  },
  {
    nome: 'Ana Beatriz Rocha',
    cargo: 'Sócia · Excelência operacional',
    bio: '18 anos em manufatura e logística, com passagem por três turnarounds.',
    img: IMG.consultoria.partners[1],
  },
  {
    nome: 'Marcos Salvatore',
    cargo: 'Sócio · Transformação comercial',
    bio: '20 anos entre varejo e distribuição, especialista em política de preço.',
    img: IMG.consultoria.partners[2],
  },
  {
    nome: 'Juliana Prado',
    cargo: 'Sócia · Dados e tecnologia',
    bio: '15 anos construindo camadas de informação para decisão executiva.',
    img: IMG.consultoria.partners[3],
  },
]

const DEPOIMENTOS = [
  {
    quote:
      'A diferença é que eles ficam até o número aparecer no resultado. Não recebi apresentação bonita — recebi processo funcionando.',
    name: 'Felipe Aragão',
    role: 'CEO · Grupo Aliança',
    face: IMG.faces.felipe,
  },
  {
    quote:
      'Contratamos com meta assinada. No nono mês, o comitê já discutia o segundo projeto porque o primeiro tinha se pagado três vezes.',
    name: 'Carla Deloro',
    role: 'CFO · Pallas Indústria',
    face: IMG.faces.carla,
  },
  {
    quote:
      'O que ficou não foi o relatório: foi a cadência de gestão. Dois anos depois, a reunião de segunda continua igual.',
    name: 'Beatriz Nogueira',
    role: 'Diretora-geral · Rede Farmais',
    face: IMG.faces.beatriz,
  },
]

const INSIGHTS = [
  {
    tag: 'Custos',
    titulo: 'Orçamento base zero funciona no Brasil? Depende de quem assina a meta',
    tempo: '8 min',
  },
  {
    tag: 'Comercial',
    titulo: 'Por que sua política de desconto está financiando o concorrente',
    tempo: '6 min',
  },
  { tag: 'Gestão', titulo: 'A reunião de segunda-feira como ativo de governança', tempo: '5 min' },
]

const PERGUNTAS = [
  {
    q: 'Como vocês cobram?',
    a: 'Honorário fixo mensal durante o projeto, com uma parcela variável atrelada à meta contratada no diagnóstico. Se a meta não for atingida, a parcela variável não é cobrada.',
  },
  {
    q: 'Quantas pessoas ficam alocadas?',
    a: 'Um sócio responsável, um gerente de projeto e de dois a quatro consultores, sempre presencial na operação durante a implantação.',
  },
  {
    q: 'Vocês trabalham com empresas de que porte?',
    a: 'De R$ 150 milhões a R$ 4 bilhões de faturamento. Abaixo disso, indicamos parceiros — o nosso modelo de alocação não faz sentido econômico para o cliente.',
  },
  {
    q: 'Qual o prazo mínimo de projeto?',
    a: 'O diagnóstico isolado dura quatro semanas. Projetos completos, com implantação, ficam entre seis e doze meses.',
  },
  {
    q: 'Como garantem que o ganho se mantém?',
    a: 'A fase de sustentação transfere método, painéis e rituais para o seu time, e voltamos para uma revisão sem custo seis meses depois do encerramento.',
  },
]

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <path
          d="M4 22L14 5l10 17"
          fill="none"
          stroke="var(--c-accent)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M9.5 22h9" stroke="var(--c-accent-2)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[1.02rem] font-bold tracking-tight text-ink">VETOR</span>
        <span className="mt-0.5 text-[0.56rem] uppercase tracking-[0.3em] text-ink-3">Partners</span>
      </span>
    </span>
  )
}

export default function Consultoria() {
  const [caso, setCaso] = useState<(typeof CASES)[number] | null>(null)
  const [enviado, setEnviado] = useState(false)

  return (
    <>
      <Navbar
        brand={<Logo />}
        links={NAV}
        secondary={{ label: 'Insights', href: '#insights' }}
        cta={{ label: 'Agendar reunião', href: '#contato' }}
        variant="bar"
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <Container size="xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-7">
              <Reveal y={10} duration={0.5}>
                <span className="t-eyebrow text-accent">Consultoria de gestão · desde 2015</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="t-h1 text-balance font-display font-semibold">
                  Decisão implementada. Não relatório entregue.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="t-lead max-w-xl text-pretty text-ink-2">
                  Trabalhamos dentro da operação, ao lado do seu time, com meta contratada no diagnóstico e
                  medida trimestre a trimestre. Se o número não aparecer, a parcela variável não é cobrada.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#contato" size="lg" arrow>
                  Agendar reunião de 30 minutos
                </ButtonLink>
                <ButtonLink href="#cases" size="lg" variant="outline">
                  Ver cases
                </ButtonLink>
              </Reveal>
              <Reveal delay={0.26}>
                <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-7">
                  {[
                    ['R$ 1,8 bi', 'em resultado gerado'],
                    ['214', 'projetos entregues'],
                    ['96%', 'de recontratação'],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <p className="font-display text-[1.5rem] leading-none text-ink">{v}</p>
                      <p className="mt-1.5 text-[0.84rem] text-ink-3">{l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.14} className="relative">
              <Img
                id={IMG.consultoria.hero}
                alt="Reunião de trabalho entre duas executivas em escritório com luz natural"
                w={1200}
                tone="mute"
                priority
                className="aspect-[4/5] w-full rounded-card"
              />
              <div className="absolute -bottom-6 -left-4 w-56 rounded-card border border-line bg-surface p-5 shadow-lift sm:w-64">
                <p className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">Média dos projetos</p>
                <p className="mt-2 font-display text-[2rem] leading-none text-accent">4,1×</p>
                <p className="mt-1.5 text-[0.85rem] text-ink-2">retorno sobre o honorário no primeiro ano</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      <LogoCloud
        label="Empresas que já contrataram a Vetor"
        names={CLIENTES}
        variant="grid"
        className="pt-20"
      />

      {/* NÚMEROS (invertido) ---------------------------------------------- */}
      <Section data-invert className="bg-bg" pad="md">
        <Container size="xl">
          <SectionHeading
            eyebrow="Resultados"
            title="O que os projetos entregaram até aqui"
            description="Números consolidados de 2015 a 2026, auditados por firma independente. Dados ilustrativos desta demonstração."
          />
          <Stats items={NUMEROS} variant="cards" className="mt-12" />
        </Container>
      </Section>

      {/* ATUAÇÃO ---------------------------------------------------------- */}
      <Section id="atuacao">
        <Container size="xl">
          <SectionHeading
            eyebrow="Áreas de atuação"
            title="Seis frentes, sempre amarradas ao resultado"
            description="Nunca vendemos uma frente isolada quando o problema está em outra."
          />
          <FeatureGrid items={ATUACAO} variant="grid" className="mt-14" />
        </Container>
      </Section>

      {/* MÉTODO ----------------------------------------------------------- */}
      <Section id="metodo" className="border-y border-line bg-surface">
        <Container size="xl">
          <SectionHeading
            eyebrow="Método Vetor"
            title="Quatro fases, uma meta assinada"
            description="O prazo abaixo é o de um projeto completo. O diagnóstico pode ser contratado isoladamente."
          />
          <div className="mt-14 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {METODO.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.08}>
                <div className="group flex h-full flex-col gap-4 bg-surface p-7 transition-colors duration-500 hover:bg-raise">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.78rem] text-accent">{m.n}</span>
                    <span className="rounded-btn border border-line px-2.5 py-1 text-[0.72rem] text-ink-3">
                      {m.p}
                    </span>
                  </div>
                  <h3 className="t-h3 font-display text-ink">{m.t}</h3>
                  <p className="text-[0.93rem] text-ink-2">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CASES ------------------------------------------------------------ */}
      <Section id="cases">
        <Container size="xl">
          <SectionHeading
            eyebrow="Cases"
            title="Três projetos, três números"
            description="Clique para ver o desafio, o que foi feito e o resultado medido."
            actions={<span className="text-[0.84rem] text-ink-3">Casos fictícios, para demonstração</span>}
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {CASES.map((c, i) => (
              <Reveal key={c.titulo} delay={i * 0.08}>
                <div className="group relative flex h-full flex-col gap-5 rounded-card border border-line bg-surface p-7 transition-all duration-400 ease-brand focus-within:border-accent hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft">
                  <span className="t-eyebrow text-ink-3">{c.setor}</span>
                  <div>
                    <p className="font-display text-[clamp(2.2rem,4vw,2.8rem)] leading-none text-accent">
                      {c.metrica}
                    </p>
                    <p className="mt-2 text-[0.9rem] text-ink-3">{c.metricaLabel}</p>
                  </div>
                  <h3 className="t-h3 mt-auto font-display text-ink">{c.titulo}</h3>
                  <button
                    type="button"
                    onClick={() => setCaso(c)}
                    className="inline-flex w-fit items-center gap-2 text-[0.88rem] font-medium text-accent after:absolute after:inset-0 after:content-['']"
                  >
                    Ver o case
                    <span className="sr-only">— {c.titulo}</span>
                    <ArrowUpRight className="size-4 transition-transform duration-400 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SÓCIOS ----------------------------------------------------------- */}
      <Section id="socios" className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            eyebrow="Liderança"
            title="Sócio dentro do projeto, não só na proposta"
            description="Todo projeto tem um sócio responsável presente na operação — é uma regra da casa, não uma exceção comercial."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SOCIOS.map((s, i) => (
              <Reveal key={s.nome} delay={i * 0.07}>
                <figure className="group">
                  <Img
                    id={s.img}
                    alt={`Retrato de ${s.nome}`}
                    w={700}
                    tone="mono"
                    className="aspect-[4/5] w-full rounded-card"
                    imgClassName="transition-all duration-700 ease-brand group-hover:grayscale-0"
                  />
                  <figcaption className="mt-4">
                    <p className="font-display text-[1.1rem] text-ink">{s.nome}</p>
                    <p className="mt-0.5 text-[0.88rem] text-accent">{s.cargo}</p>
                    <p className="mt-2 text-[0.86rem] text-ink-2">{s.bio}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* DEPOIMENTOS ------------------------------------------------------ */}
      <Section>
        <Container size="lg">
          <TestimonialCarousel items={DEPOIMENTOS} />
        </Container>
      </Section>

      {/* INSIGHTS --------------------------------------------------------- */}
      <Section id="insights" className="border-t border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow="Insights"
            title="O que estamos escrevendo"
            actions={
              <ButtonLink href="#insights" variant="outline" arrow>
                Todos os artigos
              </ButtonLink>
            }
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {INSIGHTS.map((a, i) => (
              <Reveal key={a.titulo} delay={i * 0.07}>
                <article className="group relative flex h-full flex-col gap-4 rounded-card border border-line p-7 transition-colors duration-400 focus-within:border-accent hover:border-accent/40 hover:bg-surface">
                  <span className="w-fit rounded-btn bg-raise px-2.5 py-1 text-[0.74rem] text-ink-2">
                    {a.tag}
                  </span>
                  <h3 className="t-h3 font-display text-ink">
                    <a href="#insights" className="after:absolute after:inset-0 after:content-['']">
                      {a.titulo}
                    </a>
                  </h3>
                  <span className="mt-auto flex items-center justify-between text-[0.84rem] text-ink-3">
                    {a.tempo} de leitura
                    <ArrowUpRight className="size-4 text-accent transition-transform duration-400 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FAQ
        title="Como trabalhamos"
        description="As perguntas que aparecem na primeira reunião com o comitê."
        items={PERGUNTAS}
        className="border-t border-line bg-wash"
        aside={
          <div className="rounded-card border border-line bg-surface p-6">
            <p className="flex items-center gap-2 text-[0.95rem] font-medium text-ink">
              <CalendarClock className="size-4 text-accent" aria-hidden="true" />
              Reunião de 30 minutos
            </p>
            <p className="mt-2 text-[0.9rem] text-ink-2">
              Sem apresentação institucional: você traz o problema, saímos com uma hipótese de onde está o
              valor.
            </p>
          </div>
        }
      />

      {/* CONTATO ---------------------------------------------------------- */}
      <Section id="contato" data-invert className="bg-bg">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-7">
              <span className="t-eyebrow text-accent">Agende uma conversa</span>
              <h2 className="t-h1 text-balance font-display font-semibold">
                Trinta minutos para saber se faz sentido continuar.
              </h2>
              <p className="t-lead max-w-lg text-pretty text-ink-2">
                Um dos sócios participa da primeira reunião. Você sai com uma leitura preliminar de onde está
                a oportunidade — mesmo que não contrate nada.
              </p>
              <ul className="flex flex-col gap-3 border-t border-line pt-7 text-[0.94rem] text-ink-2">
                {[
                  'Retorno em até um dia útil',
                  'Reunião presencial em São Paulo ou por vídeo',
                  'Acordo de confidencialidade assinado antes de qualquer dado',
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={0.1}>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setEnviado(true)
                }}
                className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Nome" placeholder="Seu nome" required />
                  <Input label="Cargo" placeholder="Diretor, CFO, CEO…" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="E-mail corporativo" type="email" placeholder="voce@empresa.com.br" required />
                  <Select label="Faturamento anual" defaultValue="300">
                    <option value="150">R$ 150 mi a R$ 300 mi</option>
                    <option value="300">R$ 300 mi a R$ 1 bi</option>
                    <option value="1000">Acima de R$ 1 bi</option>
                  </Select>
                </div>
                <Textarea label="Qual o problema principal?" placeholder="Em duas ou três linhas" />
                <Button type="submit" size="lg" full arrow>
                  Solicitar reunião
                </Button>
                <p className="t-small text-center text-ink-3">
                  Formulário demonstrativo — nenhum dado é enviado ou armazenado.
                </p>
              </form>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTA
        variant="editorial"
        eyebrow="Vetor Partners"
        title="Consultoria se mede pelo que fica depois que a gente sai."
        description="Onze anos, 214 projetos e um método que o seu time continua operando sozinho."
        actions={
          <ButtonLink href="#contato" size="lg" arrow>
            Agendar reunião
          </ButtonLink>
        }
        className="border-t border-line"
      />

      <Footer
        brand={<Logo />}
        tagline="Consultoria de gestão e performance. São Paulo e Recife."
        note="© 2026 Vetor Partners Consultoria · CNPJ fictício 00.000.000/0001-00"
        columns={[
          { title: 'Atuação', links: ['Estratégia', 'Operações', 'Comercial', 'Custos'] },
          { title: 'Firma', links: ['Sobre', 'Sócios', 'Carreiras', 'Imprensa'] },
          {
            title: 'Contato',
            links: ['Agendar reunião', 'contato@vetorpartners.com.br', 'São Paulo', 'Recife'],
          },
        ]}
      />

      <Modal open={!!caso} onClose={() => setCaso(null)} title={caso?.titulo ?? 'Case'} className="max-w-2xl">
        {caso && (
          <div className="flex flex-col gap-5">
            <span className="t-eyebrow text-ink-3">{caso.setor}</span>
            <h3 className="t-h2 font-display text-ink">{caso.titulo}</h3>
            <div className="flex items-baseline gap-3 rounded-card bg-raise px-5 py-4">
              <span className="font-display text-[2.2rem] leading-none text-accent">{caso.metrica}</span>
              <span className="text-[0.9rem] text-ink-2">{caso.metricaLabel}</span>
            </div>
            {[
              ['Desafio', caso.desafio],
              ['O que fizemos', caso.acao],
              ['Resultado', caso.resultado],
            ].map(([t, d]) => (
              <div key={t}>
                <p className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-3">{t}</p>
                <p className="mt-2 text-pretty text-ink-2">{d}</p>
              </div>
            ))}
            <Button size="lg" full arrow onClick={() => setCaso(null)}>
              Fechar
            </Button>
          </div>
        )}
      </Modal>

      <Modal open={enviado} onClose={() => setEnviado(false)} title="Solicitação enviada">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/10 text-accent">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h3 className="t-h3 font-display text-ink">Recebemos sua solicitação</h3>
          <p className="text-ink-2">
            Um sócio responde em até um dia útil com duas opções de horário. Esta é uma página demonstrativa:
            nenhum dado foi enviado ou armazenado.
          </p>
          <Button size="lg" full onClick={() => setEnviado(false)}>
            Entendi
          </Button>
        </div>
      </Modal>
    </>
  )
}
