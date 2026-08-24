import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Marquee } from '@/components/ui/Marquee'
import { MaskReveal, Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CTA } from '@/components/site/CTA'
import { FeatureGrid } from '@/components/site/FeatureGrid'
import { Footer } from '@/components/site/Footer'
import { Navbar } from '@/components/site/Navbar'
import { Stats } from '@/components/site/Stats'
import { TestimonialCarousel } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'
import { EASE_BRAND } from '@/lib/motion'

/* Estúdio, projetos, prêmios e depoimentos são fictícios. */

const NAV = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Estúdio', href: '#estudio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
]

const PROJETOS = [
  {
    nome: 'Cauim',
    setor: 'Bebidas',
    servico: 'Identidade e embalagem',
    ano: '2026',
    img: IMG.agencia.work[0],
    span: 'lg:col-span-7',
    ratio: 'aspect-[4/3]',
  },
  {
    nome: 'Selo Norte',
    setor: 'Editora',
    servico: 'Sistema editorial',
    ano: '2025',
    img: IMG.agencia.work[1],
    span: 'lg:col-span-5',
    ratio: 'aspect-[4/3]',
  },
  {
    nome: 'Marfim',
    setor: 'Arquitetura',
    servico: 'Marca e site',
    ano: '2025',
    img: IMG.agencia.work[2],
    span: 'lg:col-span-5',
    ratio: 'aspect-[3/4] lg:aspect-[4/5]',
  },
  {
    nome: 'Reserva Ipê',
    setor: 'Hospitalidade',
    servico: 'Marca e sinalização',
    ano: '2024',
    img: IMG.agencia.work[3],
    span: 'lg:col-span-7',
    ratio: 'aspect-[3/4] lg:aspect-[4/5]',
  },
  {
    nome: 'Cardume',
    setor: 'Serviços financeiros',
    servico: 'Rebranding completo',
    ano: '2024',
    img: IMG.agencia.work[4],
    span: 'lg:col-span-6',
    ratio: 'aspect-[4/3]',
  },
  {
    nome: 'Oficina Bruta',
    setor: 'Mobiliário',
    servico: 'Marca e catálogo',
    ano: '2023',
    img: IMG.agencia.work[5],
    span: 'lg:col-span-6',
    ratio: 'aspect-[4/3]',
  },
]

const SERVICOS = [
  {
    title: 'Estratégia de marca',
    text: 'Posicionamento, arquitetura de portfólio e a narrativa que sustenta o resto do trabalho.',
  },
  {
    title: 'Identidade visual',
    text: 'Sistema completo: símbolo, tipografia, cor, grid, fotografia e regras de aplicação.',
  },
  {
    title: 'Design de embalagem',
    text: 'Do conceito à gráfica, com acompanhamento de prova e ajuste de cor na máquina.',
  },
  {
    title: 'Direção de arte',
    text: 'Campanhas, ensaios e conteúdo contínuo com a mesma coerência da marca-mãe.',
  },
  {
    title: 'Sistemas digitais',
    text: 'Design de produto e sites que traduzem a marca sem virar catálogo genérico.',
  },
  {
    title: 'Editorial',
    text: 'Relatórios, livros e publicações onde a hierarquia tipográfica faz o trabalho pesado.',
  },
]

const PROCESSO = [
  {
    n: '01',
    t: 'Escuta',
    d: 'Duas semanas ouvindo time, clientes e concorrentes. Saímos com o problema escrito em uma frase.',
  },
  {
    n: '02',
    t: 'Território',
    d: 'Três caminhos possíveis, cada um com uma tese própria. Você escolhe um — não uma paleta.',
  },
  {
    n: '03',
    t: 'Construção',
    d: 'O território vira sistema: tipografia, cor, malha, imagem e voz, testados em peças reais.',
  },
  {
    n: '04',
    t: 'Entrega',
    d: 'Manual vivo, arquivos organizados e duas sessões de implantação com o seu time.',
  },
]

const PREMIOS = [
  { ano: '2026', premio: 'Prêmio Brasil Design', detalhe: 'Ouro · Identidade — Cauim' },
  { ano: '2025', premio: 'Type Directors Club', detalhe: 'Menção honrosa · Editorial' },
  { ano: '2024', premio: 'Bienal de Design Gráfico', detalhe: 'Seleção oficial · Cardume' },
  { ano: '2023', premio: 'Awwwards', detalhe: 'Site of the Day · Marfim' },
]

const NUMEROS = [
  { value: 14, label: 'anos de estúdio' },
  { value: 62, label: 'marcas construídas' },
  { value: 9, label: 'países atendidos' },
  { value: 6, label: 'pessoas no time' },
]

const DEPOIMENTOS = [
  {
    quote:
      'Chegamos pedindo um logo novo. Saímos com uma tese sobre o negócio que mudou até a forma como contratamos.',
    name: 'Helena Vasques',
    role: 'Fundadora · Cauim',
    face: IMG.faces.helena,
  },
  {
    quote:
      'É o único estúdio que nos entregou algo que o time comercial passou a usar sem precisar ser convencido.',
    name: 'Paulo Krieger',
    role: 'CEO · Cardume',
    face: IMG.faces.paulo,
  },
  {
    quote:
      'Três anos depois, a identidade continua se sustentando sozinha. Isso, para mim, é o teste que importa.',
    name: 'Renata Sanchez',
    role: 'Diretora de marca · Reserva Ipê',
    face: IMG.faces.renata,
  },
]

function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-display text-[1.4rem] leading-none tracking-tight text-ink">PAUTA</span>
      <sup className="ml-0.5 text-[0.6rem] text-accent">®</sup>
    </span>
  )
}

export default function Agencia() {
  return (
    <>
      <Navbar
        brand={<Logo />}
        links={NAV}
        cta={{ label: 'Vamos conversar', href: '#contato' }}
        variant="bar"
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative pt-32 sm:pt-40 lg:pt-48">
        <Container size="full">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <h1 className="t-display font-display">
              <MaskReveal>Marcas que não</MaskReveal>
              <MaskReveal delay={0.08}>precisam gritar</MaskReveal>
              <MaskReveal delay={0.16}>
                <span className="text-accent">para serem lembradas.</span>
              </MaskReveal>
            </h1>

            <Reveal delay={0.35} className="flex flex-col gap-6 lg:pb-4">
              <p className="t-lead max-w-md text-pretty text-ink-2">
                Estúdio de marca em São Paulo. Aceitamos poucos projetos por ano para construir identidades
                que aguentam a próxima década — não a próxima temporada.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 text-[0.85rem] text-ink-3">
                <span>Estratégia</span>
                <span>Identidade</span>
                <span>Embalagem</span>
                <span>Digital</span>
              </div>
            </Reveal>
          </div>
        </Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_BRAND }}
          className="mt-14 sm:mt-20"
        >
          <Img
            id={IMG.agencia.moodboard}
            alt="Parede de referências no estúdio, com recortes de imagem e provas impressas"
            w={2000}
            tone="none"
            priority
            className="aspect-[16/10] w-full sm:aspect-[21/9]"
            imgClassName="slow-zoom"
          />
        </motion.div>
      </header>

      {/* MARQUEE ---------------------------------------------------------- */}
      <div className="border-y border-line py-5">
        <Marquee duration={34} gap="2.5rem">
          {[
            'Estratégia de marca',
            'Identidade visual',
            'Embalagem',
            'Direção de arte',
            'Editorial',
            'Sistemas digitais',
          ].map((s) => (
            <span key={s} className="flex shrink-0 items-center gap-10 font-display text-[1.6rem] text-ink">
              {s}
              <span className="text-accent">✳</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* MANIFESTO -------------------------------------------------------- */}
      <Section id="estudio">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <p className="t-h1 text-balance font-display">
                Design não é decoração.
                <span className="text-ink-3">
                  {' '}
                  É a forma mais barata de a sua empresa parar de se explicar.
                </span>
              </p>
            </Reveal>
            <div className="flex flex-col gap-6 lg:pt-3">
              <Reveal delay={0.1}>
                <p className="text-pretty text-ink-2">
                  Trabalhamos com um número pequeno de clientes por ano porque marca não se resolve em sprint.
                  Cada projeto começa com duas semanas de escuta e termina com o seu time sabendo operar o
                  sistema sozinho — sem depender do estúdio para cada peça.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-pretty text-ink-2">
                  Não fazemos concorrência de layout, não vendemos pacote fechado e não entregamos manual que
                  ninguém abre. Entregamos um sistema que aguenta o mundo real: gráfica ruim, prazo curto e um
                  estagiário fazendo o story de sexta.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <Stats items={NUMEROS} variant="stack" className="mt-4" />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* PROJETOS --------------------------------------------------------- */}
      <Section id="projetos" className="border-t border-line">
        <Container size="full">
          <SectionHeading
            eyebrow="Projetos selecionados"
            title="Trabalho recente"
            actions={<span className="text-[0.85rem] text-ink-3">2023 — 2026</span>}
          />

          <div className="mt-14 grid gap-x-6 gap-y-14 lg:grid-cols-12">
            {PROJETOS.map((p, i) => (
              <Reveal key={p.nome} delay={(i % 2) * 0.08} className={p.span}>
                {/* O link vive dentro do h3 e se estica sobre o card: mantém o
                    título como heading de verdade e o card inteiro clicável. */}
                <article className="group relative">
                  <div className={`relative overflow-hidden ${p.ratio}`}>
                    <Img
                      id={p.img}
                      alt={`Projeto ${p.nome} — ${p.servico}`}
                      w={1400}
                      tone="none"
                      className="h-full w-full"
                      imgClassName="transition-transform duration-[900ms] ease-brand group-hover:scale-[1.045]"
                    />
                    <span className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10" />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
                    <div>
                      <h3 className="t-h3 font-display text-ink">
                        <a
                          href="#projetos"
                          className="after:absolute after:inset-0 after:content-[''] hover:text-accent"
                        >
                          {p.nome}
                        </a>
                      </h3>
                      <p className="mt-1 text-[0.88rem] text-ink-2">{p.servico}</p>
                    </div>
                    <div className="flex items-center gap-4 text-[0.8rem] text-ink-3">
                      <span className="hidden sm:inline">{p.setor}</span>
                      <span>{p.ano}</span>
                      <ArrowUpRight className="size-4 text-ink transition-transform duration-400 ease-brand group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SERVIÇOS --------------------------------------------------------- */}
      <Section id="servicos" className="border-t border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow="O que fazemos"
            title="Seis frentes, um sistema só"
            description="Raramente entregamos uma frente isolada — elas se sustentam umas nas outras."
          />
          <FeatureGrid items={SERVICOS} variant="list" className="mt-12" />
        </Container>
      </Section>

      {/* PROCESSO (invertido) --------------------------------------------- */}
      <Section id="processo" data-invert className="bg-bg text-ink">
        <Container size="xl">
          <SectionHeading
            eyebrow="Processo"
            title="Quatro etapas, doze a dezesseis semanas"
            description="Prazo real de um projeto de identidade completo, incluindo as rodadas de aprovação do seu lado."
          />
          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PROCESSO.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="group flex h-full flex-col gap-4 bg-bg p-7 transition-colors duration-500 hover:bg-surface">
                  <span className="font-mono text-[0.78rem] text-accent">{p.n}</span>
                  <h3 className="t-h3 font-display">{p.t}</h3>
                  <p className="text-[0.93rem] text-ink-2">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <Img
                id={IMG.agencia.desk}
                alt="Mesa de trabalho com amostras de papel, provas e materiais do projeto"
                w={1200}
                tone="none"
                className="aspect-[4/3] w-full"
              />
            </Reveal>
            <div>
              <h3 className="t-h2 font-display">Reconhecimento</h3>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {PREMIOS.map((p, i) => (
                  <Reveal key={p.premio} delay={i * 0.06}>
                    <li className="flex items-baseline justify-between gap-6 py-5">
                      <div>
                        <p className="font-display text-[1.15rem]">{p.premio}</p>
                        <p className="mt-1 text-[0.88rem] text-ink-3">{p.detalhe}</p>
                      </div>
                      <span className="font-mono text-[0.82rem] text-ink-3">{p.ano}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* DEPOIMENTOS ------------------------------------------------------ */}
      <Section className="border-t border-line">
        <Container size="lg">
          <TestimonialCarousel items={DEPOIMENTOS} />
        </Container>
      </Section>

      {/* CONTATO ---------------------------------------------------------- */}
      <div id="contato" className="border-t border-line">
        <CTA
          variant="editorial"
          eyebrow="Novos projetos · 2026"
          title={
            <>
              Conte o problema.
              <br />
              <span className="text-ink-3">A gente diz se é nosso.</span>
            </>
          }
          description="Respondemos toda mensagem em até dois dias úteis — inclusive as que recusamos, sempre com um encaminhamento."
          actions={
            <>
              <ButtonLink href="#contato" size="lg" arrow>
                estudio@pauta.design
              </ButtonLink>
              <ButtonLink href="#projetos" size="lg" variant="outline">
                Ver projetos
              </ButtonLink>
            </>
          }
          note="Rua Harmonia, 1201 · Vila Madalena · São Paulo"
        />
      </div>

      <Footer
        brand={<Logo />}
        tagline="Estúdio de marca. São Paulo, Brasil."
        wordmark="PAUTA®"
        note="© 2026 PAUTA Estúdio de Marca"
        columns={[
          { title: 'Estúdio', links: ['Sobre', 'Time', 'Prêmios', 'Carreiras'] },
          { title: 'Trabalho', links: ['Projetos', 'Serviços', 'Processo', 'Clientes'] },
          { title: 'Contato', links: ['E-mail', 'Instagram', 'LinkedIn', 'Behance'] },
        ]}
      />
    </>
  )
}
