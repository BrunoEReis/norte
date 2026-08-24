export type DemoMeta = {
  slug: string
  /** Marca fictícia usada na demo. */
  brand: string
  /** Nome da demo no showcase. */
  title: string
  category: string
  description: string
  /** Rótulos da direção visual. */
  style: string[]
  /** Amostra de cores usada no card do showcase. */
  swatch: [string, string, string]
  /** Fonte de display, exibida no card. */
  typeface: string
  index: string
}

export const DEMOS: DemoMeta[] = [
  {
    slug: 'saas-ai',
    brand: 'Órion',
    title: 'Órion',
    category: 'SaaS / Inteligência Artificial',
    description:
      'Plataforma de IA operacional para empresas. Interface de produto no hero, bento grid de recursos e prova social densa.',
    style: ['Dark premium', 'Bento grid', 'Produto no hero', 'Mono details'],
    swatch: ['#07080b', '#5b7cfa', '#3ddca0'],
    typeface: 'Inter',
    index: '01',
  },
  {
    slug: 'agencia',
    brand: 'PAUTA®',
    title: 'PAUTA®',
    category: 'Agência de branding',
    description:
      'Estúdio de marca com direção editorial: tipografia gigante, grid assimétrico e portfólio que respira.',
    style: ['Editorial', 'Whitespace', 'Serifa display', 'Azul elétrico'],
    swatch: ['#f1eee8', '#121110', '#1b33f0'],
    typeface: 'Instrument Serif',
    index: '02',
  },
  {
    slug: 'clinica',
    brand: 'Clínica Aurora',
    title: 'Clínica Aurora',
    category: 'Saúde / Longevidade',
    description:
      'Clínica de medicina integrativa. Agendamento em primeiro plano, prova de confiança e formulário curto de 4 campos.',
    style: ['Clean', 'Verde profundo', 'Cantos suaves', 'Conversão'],
    swatch: ['#fbfaf7', '#2f6b54', '#c9dcce'],
    typeface: 'Fraunces',
    index: '03',
  },
  {
    slug: 'imobiliaria',
    brand: 'Vertente',
    title: 'Vertente Residências',
    category: 'Imobiliário de alto padrão',
    description:
      'Lançamento de alto padrão com fotografia em tela cheia, plantas navegáveis e narrativa de bairro.',
    style: ['Luxo', 'Fotografia', 'Serifa clássica', 'Dourado'],
    swatch: ['#0b0a08', '#c6a664', '#f3eee5'],
    typeface: 'Cormorant Garamond',
    index: '04',
  },
  {
    slug: 'ecommerce',
    brand: 'Alta Colheita',
    title: 'Alta Colheita',
    category: 'E-commerce / DTC',
    description:
      'Café de origem por assinatura. Produto grande, comparativo direto, avaliações com foto e barra de compra fixa no mobile.',
    style: ['Warm', 'Produto grande', 'Comparativo', 'Assinatura'],
    swatch: ['#f8f3ea', '#a8401c', '#1b120d'],
    typeface: 'Bricolage Grotesque',
    index: '05',
  },
  {
    slug: 'consultoria',
    brand: 'Vetor Partners',
    title: 'Vetor Partners',
    category: 'Consultoria B2B',
    description:
      'Consultoria de gestão orientada a resultado: números auditados, cases com métricas e agenda de reunião em dois cliques.',
    style: ['Corporativo', 'Autoridade', 'Dados', 'Navy + ouro'],
    swatch: ['#ffffff', '#0a1a2b', '#0f4c8a'],
    typeface: 'Source Serif 4',
    index: '06',
  },
  {
    slug: 'adega',
    brand: 'Adega Meia-Noite',
    title: 'Adega Meia-Noite',
    category: 'Adega e conveniência',
    description:
      'Delivery próprio de bebida gelada. Catálogo por categoria, combos, zona de entrega com prazo e pedido pelo WhatsApp.',
    style: ['Noturno', 'Neon', 'Delivery', 'WhatsApp'],
    swatch: ['#06090f', '#2fd8e6', '#ffb545'],
    typeface: 'Anton',
    index: '07',
  },
  {
    slug: 'barbearia',
    brand: 'Navalha',
    title: 'Navalha Barbearia',
    category: 'Barbearia',
    description:
      'Agendamento em trinta segundos, tabela de serviços com duração e um clube por assinatura para o cliente que volta todo mês.',
    style: ['Couro e latão', 'Condensada', 'Agendamento', 'Clube'],
    swatch: ['#100d0b', '#c08a3e', '#f2ebe1'],
    typeface: 'Oswald',
    index: '08',
  },
  {
    slug: 'hamburgueria',
    brand: 'Chapa 9',
    title: 'Chapa 9',
    category: 'Hamburgueria',
    description:
      'Cardápio navegável por categoria, retirada contra entrega e fotografia de comida ocupando a tela inteira.',
    style: ['Brasa', 'Apetite', 'Cardápio', 'Delivery'],
    swatch: ['#14110e', '#d93a1e', '#e8b03a'],
    typeface: 'Fraunces',
    index: '09',
  },
  {
    slug: 'petshop',
    brand: 'Amigo',
    title: 'Amigo Pet & Vet',
    category: 'Pet shop e veterinária',
    description:
      'Banho, tosa e clínica no mesmo endereço. Agendamento curto, planos mensais e relatório com foto no WhatsApp.',
    style: ['Claro e quente', 'Coral + verde-água', 'Redondo', 'Afetivo'],
    swatch: ['#fffaf5', '#ef5f3c', '#1e7a78'],
    typeface: 'Nunito',
    index: '10',
  },
]
