import { motion } from 'framer-motion'
import { Blocks, Database, GitBranch, Radar, ShieldCheck, Sparkles, Timer, Workflow } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Marquee } from '@/components/ui/Marquee'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Tabs } from '@/components/ui/Tabs'
import { CTA } from '@/components/site/CTA'
import { FAQ } from '@/components/site/FAQ'
import { FeatureGrid } from '@/components/site/FeatureGrid'
import { Footer } from '@/components/site/Footer'
import { LogoCloud } from '@/components/site/LogoCloud'
import { Navbar } from '@/components/site/Navbar'
import { Pricing } from '@/components/site/Pricing'
import { Stats } from '@/components/site/Stats'
import { TestimonialGrid } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'
import { EASE_BRAND } from '@/lib/motion'
import { AppWindow, ChecklistPanel, Dashboard, InsightCard, Metric, Spark } from './ui'

/* Conteúdo 100% fictício — demonstração de direção de arte e copy. */

const NAV = [
  { label: 'Produto', href: '#produto' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Planos', href: '#planos' },
]

const CLIENTES = ['PORTO NOVA', 'Amaru', 'Cedro Capital', 'Nuvem Nove', 'Bandeirante Log', 'Faro Retail']

const INTEGRACOES = [
  'SAP',
  'Oracle NetSuite',
  'TOTVS Protheus',
  'Salesforce',
  'BigQuery',
  'Snowflake',
  'Databricks',
  'Power BI',
  'Slack',
  'Microsoft Teams',
  'PostgreSQL',
  'S3',
]

/** Fileira de etiquetas usada para dar corpo aos cards largos do bento. */
function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span
          key={i}
          className="rounded-btn border border-line bg-bg px-3 py-1.5 font-mono text-[0.72rem] text-ink-2"
        >
          {i}
        </span>
      ))}
    </div>
  )
}

const FEATURES = [
  {
    icon: Database,
    title: 'Conecta o que já existe',
    text: 'ERP, CRM, data warehouse e planilhas em um só modelo semântico. Sem migração, sem projeto de seis meses.',
    wide: true,
    visual: <Chips items={['SAP', 'Protheus', 'NetSuite', 'Salesforce', 'BigQuery', 'Snowflake', 'Excel']} />,
  },
  {
    icon: Radar,
    title: 'Detecta o desvio antes do fechamento',
    text: 'Monitoramento contínuo de margem, ruptura e custo por praça, com alerta na primeira anomalia.',
  },
  {
    icon: Sparkles,
    title: 'Explica em português',
    text: 'Toda recomendação vem com causa, impacto estimado em reais e o caminho até o dado original.',
  },
  {
    icon: Workflow,
    title: 'Executa a decisão',
    text: 'Aprovou? O Órion abre o chamado, ajusta a regra de preço e avisa o time responsável.',
  },
  {
    icon: GitBranch,
    title: 'Versiona cada regra',
    text: 'Histórico completo de quem mudou o quê, quando e com qual resultado — auditoria sem planilha paralela.',
  },
  {
    icon: ShieldCheck,
    title: 'Pronto para o jurídico',
    text: 'SOC 2 Tipo II, dados residentes no Brasil, LGPD e controle de acesso por função.',
    wide: true,
    visual: <Chips items={['SOC 2 Tipo II', 'LGPD', 'ISO 27001', 'SSO / SCIM', 'Trilha de auditoria']} />,
  },
  {
    icon: Timer,
    title: 'Responde em segundos',
    text: 'Consultas sobre bilhões de linhas voltam em menos de dois segundos, direto no navegador.',
  },
]

const STATS = [
  { value: 9, suffix: ' dias', label: 'Da assinatura ao primeiro insight em produção' },
  { value: 214, prefix: 'R$ ', suffix: ' mi', label: 'Recuperados por clientes em margem no último ano' },
  { value: 3.1, decimals: 1, suffix: '%', label: 'Erro médio da previsão de demanda em 8 semanas' },
  { value: 87, suffix: '%', label: 'Das recomendações aprovadas pelos times de operação' },
]

const DEPOIMENTOS = [
  {
    quote:
      'Trocamos a reunião de segunda por um alerta de sexta. Quando o comitê senta, a decisão já está tomada e documentada.',
    name: 'Ana Beatriz Rocha',
    role: 'COO · PORTO NOVA',
    face: IMG.faces.ana,
    metric: '-41% no tempo de fechamento',
  },
  {
    quote:
      'O que me convenceu foi poder clicar no número e chegar na linha do ERP. Sem isso, nenhum diretor assina embaixo.',
    name: 'Ricardo Menezes',
    role: 'CFO · Cedro Capital',
    face: IMG.faces.ricardo,
    metric: '100% dos números rastreáveis',
  },
  {
    quote:
      'Implantamos em nove dias com o time interno. O primeiro ajuste de preço sugerido pagou o ano de contrato.',
    name: 'Juliana Prado',
    role: 'Diretora de Operações · Faro Retail',
    face: IMG.faces.juliana,
    metric: 'ROI em 5 semanas',
  },
]

const PLANOS = [
  {
    name: 'Essencial',
    description: 'Para um time de operação que precisa parar de discutir número.',
    price: [4900, 3990] as [number, number],
    features: [
      'Até 5 fontes de dados conectadas',
      '10 usuários com acesso completo',
      'Alertas de margem e ruptura',
      'Suporte por e-mail em até 8h',
    ],
    cta: 'Começar teste de 14 dias',
  },
  {
    name: 'Escala',
    description: 'Para operações multiunidade que decidem todo dia.',
    price: [12900, 10750] as [number, number],
    features: [
      'Fontes de dados ilimitadas',
      'Usuários ilimitados e times por função',
      'Execução automática de decisões aprovadas',
      'Previsão de demanda e simulação de cenários',
      'Gerente de sucesso dedicado',
    ],
    cta: 'Falar com especialista',
    highlight: true,
    badge: 'Mais adotado',
  },
  {
    name: 'Corporativo',
    description: 'Para grupos com governança, auditoria e nuvem própria.',
    price: 'sob-consulta' as const,
    features: [
      'Instalação em nuvem privada ou on-premise',
      'SSO, SCIM e trilha de auditoria completa',
      'Modelos treinados no seu histórico',
      'SLA de 99,95% em contrato',
    ],
    cta: 'Falar com vendas',
  },
]

const PERGUNTAS = [
  {
    q: 'Precisamos trocar nosso ERP?',
    a: 'Não. O Órion lê o que já existe — Protheus, SAP, NetSuite, planilhas no SharePoint — e constrói o modelo semântico por cima. Nenhum dado sai do lugar.',
  },
  {
    q: 'Quanto tempo até o primeiro resultado?',
    a: 'A média entre clientes é de nove dias úteis: três para conectar as fontes, quatro para validar as regras com o seu time e dois de acompanhamento assistido.',
  },
  {
    q: 'Como vocês evitam que a IA invente número?',
    a: 'Toda resposta é ancorada em consulta ao dado, não em geração livre de texto. Cada valor exibido tem um link para a linha de origem, e o modelo é impedido de responder quando a fonte está incompleta.',
  },
  {
    q: 'Os dados saem do Brasil?',
    a: 'Não nos planos Essencial e Escala: o processamento acontece em região brasileira. No Corporativo, você escolhe a região ou instala na sua própria nuvem.',
  },
  {
    q: 'Quem opera o Órion no dia a dia?',
    a: 'O time de operação, sem depender de TI. A configuração inicial é feita junto com o nosso time de implantação e fica documentada em linguagem de negócio.',
  },
]

const TABS = [
  {
    id: 'conectar',
    label: '01 · Conectar',
    content: (
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div className="flex flex-col gap-5">
          <h3 className="t-h3 font-display text-ink">Três dias para ver tudo em um lugar só</h3>
          <p className="text-ink-2">
            Conectores prontos para os sistemas que a sua empresa já usa. O Órion mapeia as tabelas, sugere o
            dicionário de dados e espera a sua validação antes de assumir qualquer definição.
          </p>
          <ChecklistPanel
            items={[
              'Protheus · 148 tabelas mapeadas',
              'Salesforce · funil e histórico de desconto',
              'BigQuery · base de logística consolidada',
              'Planilhas de praça · leitura semanal',
            ]}
          />
        </div>
        <AppWindow title="orion.app/fontes">
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-3">
              <Metric label="Fontes ativas" value="12" delta="+4 este mês" />
              <Metric label="Cobertura" value="96%" delta="+11 p.p." />
            </div>
            <div className="mt-4 rounded-btn border border-line bg-bg p-4">
              <p className="text-[0.82rem] font-medium text-ink">Qualidade do dado</p>
              <Spark className="mt-3" />
              <p className="mt-2 font-mono text-[0.68rem] text-ink-3">
                3 inconsistências resolvidas automaticamente
              </p>
            </div>
          </div>
        </AppWindow>
      </div>
    ),
  },
  {
    id: 'detectar',
    label: '02 · Detectar',
    content: (
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div className="flex flex-col gap-5">
          <h3 className="t-h3 font-display text-ink">O desvio chega antes do fechamento</h3>
          <p className="text-ink-2">
            Em vez de descobrir a perda no relatório do mês seguinte, o time recebe o alerta na primeira
            anomalia — com a causa provável e o impacto já convertido em reais.
          </p>
          <InsightCard
            title="Alerta · praça sul"
            body="Remarcação manual às quintas derruba 3,2 p.p. de margem. Padrão repetido em 7 das últimas 8 semanas."
            actions={['Abrir investigação', 'Notificar responsável']}
          />
        </div>
        <AppWindow title="orion.app/sinais">
          <Dashboard compact />
        </AppWindow>
      </div>
    ),
  },
  {
    id: 'executar',
    label: '03 · Executar',
    content: (
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div className="flex flex-col gap-5">
          <h3 className="t-h3 font-display text-ink">Aprovou, está feito</h3>
          <p className="text-ink-2">
            A recomendação vira ação no sistema de origem: regra de preço ajustada, chamado aberto,
            responsável avisado. Tudo versionado, com um clique para reverter.
          </p>
          <ChecklistPanel
            items={[
              'Regra de preço atualizada no Protheus',
              'Chamado #4821 aberto para logística',
              'Comitê de margem notificado no Teams',
              'Versão anterior guardada para reversão',
            ]}
          />
        </div>
        <AppWindow title="orion.app/decisoes">
          <div className="p-4 sm:p-5">
            <InsightCard
              title="Decisão aplicada"
              body="Regra de remarcação da praça Sul travada fora da janela de aprovação. Impacto projetado: R$ 214 mil/mês."
              actions={['Ver histórico', 'Reverter']}
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Metric label="Decisões no mês" value="38" delta="+12" />
              <Metric label="Tempo médio" value="4 min" delta="-2h 40" up={false} />
            </div>
          </div>
        </AppWindow>
      </div>
    ),
  },
]

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <circle cx="7" cy="20" r="2.6" fill="var(--c-accent)" />
        <circle cx="14" cy="14" r="2.6" fill="var(--c-ink)" />
        <circle cx="21" cy="8" r="2.6" fill="var(--c-accent-2)" />
        <path d="M7 20L21 8" stroke="var(--c-line-2)" strokeWidth="1.2" />
      </svg>
      <span className="text-[1.05rem] font-semibold tracking-tight text-ink">Órion</span>
    </span>
  )
}

export default function SaasAI() {
  return (
    <>
      <Navbar
        brand={<Logo />}
        links={NAV}
        secondary={{ label: 'Entrar', href: '#planos' }}
        cta={{ label: 'Teste grátis', href: '#planos' }}
        variant="floating"
        overlay
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-32 sm:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[34rem] w-[52rem] max-w-[130vw] opacity-45 blur-[110px]"
          style={{
            background:
              'radial-gradient(45% 50% at 50% 50%, var(--c-accent) 0%, transparent 70%), radial-gradient(40% 40% at 75% 30%, var(--c-accent-2) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(var(--c-line) 1px, transparent 1px), linear-gradient(90deg, var(--c-line) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(70% 55% at 50% 0%, #000 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(70% 55% at 50% 0%, #000 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <Container size="xl" className="relative">
          <div className="flex flex-col items-center text-center">
            <Reveal y={12} duration={0.6}>
              <a
                href="#produto"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1.5 pl-1.5 pr-4 text-[0.8rem] text-ink-2 backdrop-blur transition-colors hover:border-line-2 hover:text-ink"
              >
                <span className="rounded-full bg-accent px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-wider text-on-accent">
                  Novo
                </span>
                Copiloto de margem em tempo real
              </a>
            </Reveal>

            <h1 className="mt-7 max-w-5xl text-balance font-display text-[clamp(2.4rem,5.4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              <Reveal y={26} delay={0.05}>
                Sua operação responde
              </Reveal>
              <Reveal y={26} delay={0.13}>
                <span className="text-ink-3">em segundos, não em relatórios.</span>
              </Reveal>
            </h1>

            <Reveal delay={0.22} className="mt-7 max-w-2xl">
              <p className="t-lead text-pretty text-ink-2">
                O Órion conecta ERP, CRM e planilhas, encontra onde a margem escapa e recomenda a correção —
                com o caminho até o dado de origem em um clique.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="#planos" size="lg" arrow className="w-full sm:w-auto">
                Começar teste de 14 dias
              </ButtonLink>
              <ButtonLink href="#como-funciona" size="lg" variant="outline" className="w-full sm:w-auto">
                Ver o produto por dentro
              </ButtonLink>
            </Reveal>

            <Reveal delay={0.38} className="mt-6">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                Sem cartão · Implantação em 9 dias · SOC 2 Tipo II
              </p>
            </Reveal>
          </div>

          {/* Mockup do produto */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE_BRAND }}
            style={{ perspective: 1400 }}
            className="relative mt-16 sm:mt-20"
          >
            <AppWindow title="orion.app/operacao" className="mx-auto max-w-5xl">
              <Dashboard />
            </AppWindow>
            <div
              className="pointer-events-none absolute inset-x-8 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
              aria-hidden="true"
            />
          </motion.div>
        </Container>
      </header>

      <LogoCloud
        label="Operações que decidem com o Órion todo dia"
        names={CLIENTES}
        variant="grid"
        className="pt-4"
      />

      {/* PROBLEMA --------------------------------------------------------- */}
      <Section id="produto">
        <Container size="xl">
          <SectionHeading
            eyebrow="O problema"
            title={
              <>
                O dado existe.
                <br />
                <span className="text-ink-3">A decisão é que não chega.</span>
              </>
            }
            description="Empresas de médio e grande porte já pagam por dashboards suficientes. O que falta é alguém que olhe para eles todo dia, entenda o desvio e proponha o que fazer."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                n: '01',
                t: 'O relatório chega tarde',
                d: 'Quando o fechamento aponta a perda de margem, o trimestre já absorveu o custo.',
              },
              {
                n: '02',
                t: 'Ninguém confia no número',
                d: 'Cada área traz a própria planilha, e a reunião vira uma auditoria improvisada.',
              },
              {
                n: '03',
                t: 'A decisão não vira ação',
                d: 'O que se decide na quarta só entra no sistema semanas depois — quando entra.',
              },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-7">
                  <span className="font-mono text-[0.75rem] text-accent">{item.n}</span>
                  <h3 className="t-h3 font-display text-ink">{item.t}</h3>
                  <p className="text-[0.95rem] text-ink-2">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FEATURES --------------------------------------------------------- */}
      <Section className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            eyebrow="Plataforma"
            title="Um copiloto que fecha o ciclo inteiro"
            description="Conectar, detectar, explicar e executar. Sem trocar de ferramenta no meio do caminho."
          />
          <FeatureGrid items={FEATURES} variant="bento" className="mt-14" />
        </Container>
      </Section>

      {/* COMO FUNCIONA ---------------------------------------------------- */}
      <Section id="como-funciona">
        <Container size="xl">
          <SectionHeading
            eyebrow="Por dentro"
            title="Do sistema legado à decisão aplicada"
            description="Três movimentos, um produto só."
          />
          <Tabs items={TABS} variant="underline" className="mt-12" />
        </Container>
      </Section>

      {/* RESULTADOS ------------------------------------------------------- */}
      <Section id="resultados" className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            eyebrow="Resultados"
            title="Números de quem já opera assim"
            description="Média entre clientes ativos nos últimos 12 meses. Dados ilustrativos desta demonstração."
          />
          <Stats items={STATS} variant="row" className="mt-14" />

          <div className="mt-16">
            <p className="t-small mb-6 text-center text-ink-3">Conecta com o que você já usa</p>
            <Marquee duration={46} gap="2.5rem">
              {INTEGRACOES.map((n) => (
                <span
                  key={n}
                  className="shrink-0 whitespace-nowrap rounded-btn border border-line bg-surface px-5 py-2.5 font-mono text-[0.78rem] text-ink-2"
                >
                  {n}
                </span>
              ))}
            </Marquee>
          </div>
        </Container>
      </Section>

      {/* DEPOIMENTOS ------------------------------------------------------ */}
      <Section>
        <Container size="xl">
          <SectionHeading
            eyebrow="Quem usa"
            title="Diretores que trocaram a reunião pelo alerta"
            actions={
              <ButtonLink href="#planos" variant="outline" arrow>
                Ver planos
              </ButtonLink>
            }
          />
          <TestimonialGrid items={DEPOIMENTOS} className="mt-14" />
        </Container>
      </Section>

      {/* PLANOS ----------------------------------------------------------- */}
      <Section id="planos" className="border-y border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Planos"
            title="Preço fechado, sem surpresa no aditivo"
            description="Todos os planos incluem implantação assistida, treinamento do time e suporte em português."
          />
          <Pricing plans={PLANOS} className="mt-14" />
          <p className="mt-8 text-center text-[0.85rem] text-ink-3">
            Valores em reais, por empresa. Contratos anuais com dois meses de bonificação.
          </p>
        </Container>
      </Section>

      <FAQ
        title="Perguntas que todo comitê faz"
        description="Se a sua não estiver aqui, o time responde em até um dia útil."
        items={PERGUNTAS}
        aside={
          <div className="rounded-card border border-line bg-surface p-6">
            <p className="flex items-center gap-2 text-[0.9rem] font-medium text-ink">
              <Blocks className="size-4 text-accent" aria-hidden="true" />
              Avaliação técnica gratuita
            </p>
            <p className="mt-2 text-[0.9rem] text-ink-2">
              Mapeamos suas fontes de dados e devolvemos um diagnóstico de viabilidade em cinco dias.
            </p>
            <Button variant="outline" size="sm" arrow className="mt-4">
              Solicitar avaliação
            </Button>
          </div>
        }
      />

      <CTA
        eyebrow="Comece hoje"
        title="Descubra onde a sua margem escapa nesta semana"
        description="Teste por 14 dias com os seus próprios dados. Se não encontrarmos oportunidade, não cobramos a implantação."
        actions={
          <>
            <ButtonLink href="#planos" size="lg" arrow>
              Começar teste de 14 dias
            </ButtonLink>
            <ButtonLink href="#produto" size="lg" variant="outline">
              Agendar demonstração
            </ButtonLink>
          </>
        }
        note="Sem cartão de crédito · Cancelamento em um clique"
      />

      <Footer
        brand={<Logo />}
        tagline="Inteligência operacional para empresas que precisam decidir todo dia, não todo trimestre."
        note="© 2026 Órion Tecnologia — CNPJ fictício 00.000.000/0001-00"
        columns={[
          { title: 'Produto', links: ['Plataforma', 'Integrações', 'Segurança', 'Novidades'] },
          { title: 'Empresa', links: ['Sobre', 'Carreiras', 'Imprensa', 'Contato'] },
          { title: 'Recursos', links: ['Documentação', 'Central de ajuda', 'Status', 'Blog'] },
        ]}
      />
    </>
  )
}
