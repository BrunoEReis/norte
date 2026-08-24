import { useState } from 'react'
import { Bike, CheckCircle2, Clock, Flame, ShoppingBag, Store } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { Modal } from '@/components/ui/Modal'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stars } from '@/components/ui/Stars'
import { Tabs } from '@/components/ui/Tabs'
import { AnnouncementBar } from '@/components/site/AnnouncementBar'
import { CTA } from '@/components/site/CTA'
import { FAQ } from '@/components/site/FAQ'
import { Footer } from '@/components/site/Footer'
import { HeroBackdrop } from '@/components/site/HeroBackdrop'
import { Navbar } from '@/components/site/Navbar'
import { Stats } from '@/components/site/Stats'
import { TestimonialGrid } from '@/components/site/Testimonials'
import { IMG } from '@/lib/images'
import { brl } from '@/lib/utils'

/* Hamburgueria, cardápio, preços e avaliações são fictícios. */

const NAV = [
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Como pedir', href: '#pedir' },
  { label: 'A chapa', href: '#chapa' },
  { label: 'Avaliações', href: '#avaliacoes' },
]

type Item = { nome: string; desc: string; preco: number; tag?: string }

const BURGERS: Item[] = [
  {
    nome: 'Chapa 9',
    desc: 'Blend 180 g, cheddar maturado, cebola caramelizada e maionese da casa',
    preco: 38,
    tag: 'O clássico',
  },
  {
    nome: 'Duplo Fogo',
    desc: 'Dois blends de 130 g, queijo prato, bacon e geleia de pimenta',
    preco: 46,
    tag: 'Mais pedido',
  },
  { nome: 'Costela 12h', desc: 'Costela desfiada, queijo coalho grelhado e farofa de bacon', preco: 44 },
  {
    nome: 'Verde que te quero',
    desc: 'Burger de grão-de-bico, muçarela de búfala, rúcula e tomate assado',
    preco: 36,
  },
  {
    nome: 'Cheddar na Régua',
    desc: 'Blend 180 g e cheddar cremoso em duas camadas, sem mais nada',
    preco: 39,
  },
]

const ACOMPANHA: Item[] = [
  { nome: 'Fritas rústicas', desc: 'Com casca, alecrim e sal grosso', preco: 18 },
  { nome: 'Fritas com cheddar e bacon', desc: 'Porção grande, para dividir', preco: 29, tag: 'Serve 2' },
  { nome: 'Onion rings', desc: 'Empanados na hora, com molho da casa', preco: 22 },
  { nome: 'Farofa de bacon', desc: 'Porção pequena', preco: 12 },
]

const BEBIDAS: Item[] = [
  { nome: 'Chopp artesanal', desc: 'Pilsen ou IPA, 300 ml', preco: 16 },
  { nome: 'Refrigerante', desc: 'Lata 350 ml', preco: 8 },
  { nome: 'Limonada suíça', desc: 'Feita na hora, 400 ml', preco: 14 },
  { nome: 'Milkshake', desc: 'Ovomaltine, morango ou doce de leite', preco: 19 },
]

const NUMEROS = [
  { value: 180, suffix: ' g', label: 'De blend moído no dia, em todo burger' },
  { value: 15, suffix: ' min', label: 'Para retirar no balcão' },
  { value: 4.8, decimals: 1, label: 'Nota no delivery', note: '3.140 pedidos avaliados' },
  { value: 250, suffix: ' °C', label: 'Temperatura da chapa, sempre' },
]

const AVALIACOES = [
  {
    quote:
      'O ponto da carne vem malpassado de verdade, não aquele cinza triste. É a única casa da cidade onde eu não preciso pedir "por favor não passe do ponto".',
    name: 'Daniel Ferraz',
    role: 'Pediu 14 vezes',
    face: IMG.faces.daniel,
    rating: 5,
  },
  {
    quote:
      'Peço retirada e fico 15 minutos. Chega em casa ainda quente e a fritas não murcha no caminho — coisa que nenhum aplicativo entrega.',
    name: 'Beatriz Nunes',
    role: 'Cliente desde a inauguração',
    face: IMG.faces.beatriz,
    rating: 5,
  },
  {
    quote:
      'Levei minha filha vegetariana achando que ia comer só fritas. O burger de grão-de-bico dela sumiu antes do meu.',
    name: 'Marcos Salvatore',
    role: 'Pediu 8 vezes',
    face: IMG.faces.marcos,
    rating: 4,
  },
]

const PERGUNTAS = [
  {
    q: 'Vocês entregam ou só retirada?',
    a: 'Os dois. Retirada fica pronta em 15 minutos e sai pelo preço de balcão. A entrega própria leva de 35 a 50 minutos e custa R$ 7 em qualquer bairro do centro expandido.',
  },
  {
    q: 'Dá para pedir a carne no ponto que eu quiser?',
    a: 'Sim: malpassado, ao ponto ou bem passado, escrito no pedido. O padrão da casa é ao ponto — é onde o blend de 180 g fica mais suculento.',
  },
  {
    q: 'Tem opção vegetariana?',
    a: 'O Verde que te quero é feito com burger de grão-de-bico grelhado em chapa separada. Não é a mesma chapa da carne, então serve para quem não come carne de jeito nenhum.',
  },
  {
    q: 'Aceitam reserva de mesa?',
    a: 'Não trabalhamos com reserva. Na sexta e no sábado a espera passa de 30 minutos depois das 20h — nesses dias vale pedir retirada.',
  },
  {
    q: 'Qual o horário?',
    a: 'Terça a domingo, das 18h às 23h30. Segunda é o dia de folga da equipe e da chapa.',
  },
]

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <rect x="3" y="11" width="22" height="3.4" rx="1.7" fill="var(--c-accent)" />
        <path d="M4 10c1.5-4 5-6 10-6s8.5 2 10 6" fill="none" stroke="var(--c-accent-2)" strokeWidth="2" />
        <path d="M4 16c1 4 5 6 10 6s9-2 10-6" fill="none" stroke="var(--c-accent-2)" strokeWidth="2" />
      </svg>
      <span className="font-display text-[1.3rem] font-bold leading-none text-ink">Chapa 9</span>
    </span>
  )
}

/** Linha do cardápio — mesma forma nas três abas. */
function Cardapio({ itens, onPedir }: { itens: Item[]; onPedir: () => void }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {itens.map((it, i) => (
        <Reveal key={it.nome} delay={i * 0.04}>
          <div className="group relative grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 py-5">
            <span className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-[1.3rem] font-semibold leading-none text-ink transition-colors duration-300 group-hover:text-accent">
                <button
                  type="button"
                  onClick={onPedir}
                  className="text-left after:absolute after:inset-0 after:content-['']"
                >
                  {it.nome}
                  <span className="sr-only">— pedir, {brl(it.preco)}</span>
                </button>
              </h3>
              {it.tag && (
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-accent">
                  {it.tag}
                </span>
              )}
            </span>
            <span className="justify-self-end font-display text-[1.4rem] font-semibold leading-none text-ink">
              {brl(it.preco)}
            </span>
            <p className="col-span-2 max-w-xl text-[0.92rem] text-ink-2">{it.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function Hamburgueria() {
  const [pedido, setPedido] = useState(false)
  const pedir = () => setPedido(true)

  return (
    <>
      <AnnouncementBar icon={Flame}>Chapa ligada · terça a domingo, 18h às 23h30</AnnouncementBar>

      <Navbar
        brand={<Logo />}
        links={NAV}
        secondary={{ label: 'Rua do Fogo, 91', href: '#pedir' }}
        cta={{ label: 'Pedir agora', href: '#pedir' }}
        variant="bar"
        offsetTop={36}
        overlay
      />

      {/* HERO ------------------------------------------------------------- */}
      <header className="relative flex min-h-[94svh] flex-col justify-end overflow-hidden">
        <HeroBackdrop
          id={IMG.hamburgueria.hero}
          alt="Hambúrguer artesanal montado, fotografado sobre fundo escuro"
          vertical={[80, 25, 95]}
          lateral={[72, 10]}
        />

        <Container size="xl" className="relative pb-16 pt-32 sm:pb-24">
          <div className="max-w-3xl">
            <Reveal y={10} duration={0.5}>
              <span className="t-eyebrow text-accent-2">Hamburgueria artesanal · desde 2019</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 font-display text-[clamp(2.6rem,6.6vw,5.4rem)] font-semibold leading-[0.95] text-ink">
                O ponto da carne não é <span className="text-accent-2">negociável</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="t-lead mt-6 max-w-xl text-pretty text-ink-2">
                Blend de 180 g moído no dia, pão brioche assado aqui atrás e chapa a 250 graus. Retirada em 15
                minutos ou entrega própria em até 50.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" arrow onClick={pedir}>
                Pedir agora
              </Button>
              <ButtonLink href="#cardapio" size="lg" variant="outline">
                Ver o cardápio
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem] text-ink-2">
                <span className="inline-flex items-center gap-2">
                  <Stars value={5} /> 4,8 · 3.140 pedidos
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-accent-2" aria-hidden="true" /> Retirada em 15 min
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* NÚMEROS ---------------------------------------------------------- */}
      <Section pad="md">
        <Container size="xl">
          <Stats items={NUMEROS} variant="row" />
        </Container>
      </Section>

      {/* CARDÁPIO --------------------------------------------------------- */}
      <Section id="cardapio" className="border-y border-line bg-wash">
        <Container size="lg">
          <SectionHeading
            eyebrow="Cardápio"
            title="Cinco burgers. Nenhum de enfeite."
            description="Cardápio curto de propósito: tudo que está na lista sai bem todo dia."
          />
          <Tabs
            variant="underline"
            className="mt-10"
            items={[
              { id: 'burgers', label: 'Burgers', content: <Cardapio itens={BURGERS} onPedir={pedir} /> },
              {
                id: 'acompanha',
                label: 'Para acompanhar',
                content: <Cardapio itens={ACOMPANHA} onPedir={pedir} />,
              },
              { id: 'bebidas', label: 'Bebidas', content: <Cardapio itens={BEBIDAS} onPedir={pedir} /> },
            ]}
          />
        </Container>
      </Section>

      {/* COMO PEDIR ------------------------------------------------------- */}
      <Section id="pedir">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Como pedir"
            title="Dois caminhos, nenhum aplicativo no meio"
            description="Pedido direto com a casa. O que você paga vai para a cozinha, não para a comissão."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Store,
                t: 'Retirada no balcão',
                tempo: '15 minutos',
                preco: 'Preço de balcão',
                d: 'Você pede pelo WhatsApp, a gente avisa quando estiver na chapa e você busca. É o jeito de comer o burger no ponto exato que ele saiu.',
                destaque: true,
              },
              {
                icon: Bike,
                t: 'Entrega própria',
                tempo: '35 a 50 minutos',
                preco: `${brl(7)} de taxa fixa`,
                d: 'Motoboy nosso, bag térmica e a fritas embalada separada do burger para não murchar. Centro expandido, sem valor mínimo.',
              },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.t} delay={i * 0.08} className="h-full">
                  <div
                    className={`flex h-full flex-col gap-5 rounded-card border p-7 sm:p-8 ${
                      c.destaque ? 'border-accent bg-surface shadow-lift' : 'border-line bg-surface'
                    }`}
                  >
                    <span className="grid size-12 place-items-center rounded-btn bg-raise text-accent">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[1.6rem] font-semibold leading-none text-ink">{c.t}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 border-y border-line py-4">
                      <span className="font-display text-[1.35rem] text-accent-2">{c.tempo}</span>
                      <span className="self-center text-[0.9rem] text-ink-3">{c.preco}</span>
                    </div>
                    <p className="text-[0.95rem] text-ink-2">{c.d}</p>
                    <Button
                      variant={c.destaque ? 'solid' : 'outline'}
                      size="lg"
                      full
                      arrow
                      className="mt-auto"
                      onClick={pedir}
                    >
                      {c.destaque ? 'Pedir para retirar' : 'Pedir entrega'}
                    </Button>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* A CHAPA ---------------------------------------------------------- */}
      <Section id="chapa" className="border-y border-line bg-wash">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Na cozinha"
                title="Três coisas que a gente não terceiriza"
                description="É onde o dinheiro do burger vai — e o que dá para sentir na primeira mordida."
              />
              <ul className="mt-9 flex flex-col divide-y divide-line border-y border-line">
                {[
                  ['O blend', 'Acém e peito moídos toda manhã, 180 g por burger, prensa só uma vez.'],
                  ['O pão', 'Brioche assado no fundo da loja, tostado na manteiga antes de montar.'],
                  [
                    'A chapa',
                    '250 graus constantes. Selamos dos dois lados e não voltamos a carne para a chapa.',
                  ],
                ].map(([t, d], i) => (
                  <Reveal key={t} delay={i * 0.07}>
                    <li className="flex gap-5 py-6">
                      <span className="font-display text-[1.6rem] leading-none text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-display text-[1.25rem] font-semibold text-ink">{t}</p>
                        <p className="mt-1.5 text-[0.94rem] text-ink-2">{d}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Reveal>
                <Img
                  id={IMG.hamburgueria.close}
                  alt="Close de um hambúrguer suculento recém-montado"
                  w={800}
                  tone="none"
                  className="aspect-[4/5] w-full rounded-card"
                />
              </Reveal>
              <div className="flex flex-col gap-4 pt-10">
                <Reveal delay={0.08}>
                  <Img
                    id={IMG.hamburgueria.fritas}
                    alt="Porção de batatas fritas em cesta de metal"
                    w={800}
                    tone="none"
                    className="aspect-square w-full rounded-card"
                  />
                </Reveal>
                <Reveal delay={0.14}>
                  <Img
                    id={IMG.hamburgueria.neon}
                    alt="Letreiro de neon vermelho no salão da hamburgueria"
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

      {/* AVALIAÇÕES ------------------------------------------------------- */}
      <Section id="avaliacoes">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Avaliações"
            title="4,8 de 5 em 3.140 pedidos"
            description="Avaliações ilustrativas, escritas para esta demonstração."
          />
          <TestimonialGrid items={AVALIACOES} className="mt-12" />
        </Container>
      </Section>

      <FAQ
        title="Antes de pedir"
        description="As dúvidas que mais chegam no WhatsApp da loja."
        items={PERGUNTAS}
        className="border-t border-line bg-wash"
        aside={
          <div className="rounded-card border border-line bg-surface p-6">
            <p className="font-display text-[1.2rem] font-semibold text-ink">Sexta e sábado</p>
            <p className="mt-2 text-[0.92rem] text-ink-2">
              Depois das 20h a espera no salão passa de 30 minutos. Nesses dias, retirada é o caminho — sai em
              15.
            </p>
          </div>
        }
      />

      <CTA
        eyebrow="A chapa está quente"
        title="Seu burger sai em 15 minutos"
        description="Pedido direto com a casa, sem app e sem comissão no meio."
        actions={
          <>
            <Button size="lg" arrow onClick={pedir}>
              Fazer meu pedido
            </Button>
            <ButtonLink href="#cardapio" size="lg" variant="outline">
              Ver cardápio
            </ButtonLink>
          </>
        }
        note="Rua do Fogo, 91 · Terça a domingo, 18h às 23h30"
      />

      <Footer
        brand={<Logo />}
        tagline="Hamburgueria artesanal. Blend moído no dia, pão assado na casa."
        note="© 2026 Chapa 9 Hamburgueria · CNPJ fictício 00.000.000/0001-00"
        columns={[
          { title: 'Cardápio', links: ['Burgers', 'Acompanhamentos', 'Bebidas', 'Sobremesas'] },
          { title: 'Pedidos', links: ['Retirada', 'Entrega', 'Área atendida', 'Formas de pagamento'] },
          { title: 'A casa', links: ['Rua do Fogo, 91', 'WhatsApp', 'Instagram', 'Trabalhe conosco'] },
        ]}
      />

      <Modal open={pedido} onClose={() => setPedido(false)} title="Pedido">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/15 text-accent">
            <ShoppingBag className="size-7" aria-hidden="true" />
          </span>
          <h3 className="font-display text-[1.5rem] font-semibold text-ink">Pedido anotado</h3>
          <p className="text-ink-2">
            Numa página real, aqui abriria o carrinho com o item escolhido e a conversa no WhatsApp da loja.
            Esta é uma página demonstrativa — nada é processado.
          </p>
          <Button size="lg" full onClick={() => setPedido(false)}>
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Entendi
          </Button>
        </div>
      </Modal>
    </>
  )
}
