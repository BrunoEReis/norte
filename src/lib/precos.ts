/**
 * Tabela comercial da coleção — o único lugar para mexer em preço.
 *
 * Diferente do resto do projeto, **este conteúdo não é fictício**: é a oferta
 * que o comercial apresenta. Os números são de escopo fechado e servem de
 * referência; o orçamento final sai da conversa. Se um valor mudar, muda aqui
 * e em nenhum outro arquivo.
 */
import { Accessibility, Gauge, KeyRound, Smartphone } from 'lucide-react'
import type { Plan } from '@/components/site/Pricing'

/** Os três níveis de desenvolvimento. Preço fechado, pago uma vez. */
export const PACOTES: Plan[] = [
  {
    name: 'Essencial',
    description: 'Uma página que já vende. Para quem precisa estar no ar rápido.',
    price: 1900,
    unit: 'projeto',
    cta: 'Pedir orçamento',
    features: [
      'Um dos dez modelos adaptado à sua marca',
      'Até 6 seções, com o texto ajustado ao seu negócio',
      'Formulário que cai no seu e-mail e botão de WhatsApp',
      'Domínio, hospedagem e publicação configurados',
      '1 rodada de ajustes',
      'No ar em 7 dias úteis',
    ],
  },
  {
    name: 'Completo',
    description: 'Identidade própria e texto escrito do zero. O ponto de equilíbrio.',
    price: 3400,
    unit: 'projeto',
    cta: 'Pedir orçamento',
    highlight: true,
    // "Mais escolhido" estava aqui e foi trocado em 25/08/2026: e uma afirmacao
    // sobre historico de vendas, e ainda nao houve venda nenhuma. O arquivo diz
    // no topo que este conteudo NAO e ficticio -- entao ele nao pode inventar.
    // "Recomendado" cumpre a mesma funcao de guiar a escolha e e verdade.
    badge: 'Recomendado',
    features: [
      'Tudo do Essencial',
      'Cor, tipografia e fotografia escolhidas para a sua marca',
      'Até 12 seções, com texto escrito a partir de uma conversa de 45 min',
      'Planos, perguntas frequentes, depoimentos e prova social',
      'Google Analytics e Pixel instalados e conferidos',
      '2 rodadas de ajustes',
      'No ar em 12 dias úteis',
    ],
  },
  {
    name: 'Sob medida',
    description: 'Projeto desenhado do zero, com as integrações que a operação pedir.',
    price: 6900,
    unit: 'projeto',
    from: true,
    cta: 'Conversar sobre o projeto',
    features: [
      'Layout criado do zero, sem partir de modelo',
      'Quantas páginas e seções o projeto pedir',
      'Animações e interações exclusivas',
      'Integração com agenda, CRM, pagamento ou estoque',
      '3 rodadas · prazo e escopo definidos juntos',
      '30 dias de acompanhamento depois do lançamento',
    ],
  },
]

export type Extra = {
  nome: string
  detalhe: string
  /** `null` quando o escopo varia demais para ter tabela. */
  preco: number | null
  /** Aparece ao lado do valor: "por página", "até 40 itens". */
  medida?: string
}

/** Funcionalidades cobradas por fora, somadas a qualquer pacote. */
export const EXTRAS: { grupo: string; itens: Extra[] }[] = [
  {
    grupo: 'Conteúdo e alcance',
    itens: [
      {
        nome: 'Página adicional',
        detalhe: 'Sobre, obrigado, política de privacidade, unidade.',
        preco: 450,
        medida: 'por página',
      },
      {
        nome: 'Texto de vendas para seção extra',
        detalhe: 'Escrito com o mesmo cuidado das seções do pacote.',
        preco: 180,
        medida: 'por seção',
      },
      {
        nome: 'Segundo idioma',
        detalhe: 'Tradução e alternador, com endereço próprio para o Google.',
        preco: 800,
      },
      {
        nome: 'Sessão de fotos',
        detalhe: 'Direção, produção e tratamento no lugar do banco de imagem.',
        preco: 1200,
        medida: 'meio período',
      },
      {
        nome: 'Vídeo curto no topo',
        detalhe: 'Edição, corte e compressão do seu material bruto.',
        preco: 500,
      },
      {
        nome: 'SEO técnico',
        detalhe: 'Dados estruturados, sitemap e ficha de negócio no Google.',
        preco: 600,
      },
    ],
  },
  {
    grupo: 'Funcionalidades',
    itens: [
      {
        nome: 'Catálogo ou cardápio com filtro',
        detalhe: 'Busca, categorias e página de item.',
        preco: 900,
        medida: 'até 40 itens',
      },
      {
        nome: 'Agendamento online',
        detalhe: 'O cliente marca sozinho e o horário cai na sua agenda.',
        preco: 600,
      },
      {
        nome: 'Carrinho e pagamento',
        detalhe: 'Pix, cartão e boleto, com aviso de pedido no WhatsApp.',
        preco: 1400,
      },
      {
        nome: 'Integração com CRM',
        detalhe: 'RD Station, HubSpot ou Pipedrive recebendo cada lead.',
        preco: 700,
      },
      {
        nome: 'Painel de edição',
        detalhe: 'Trocar texto, foto e preço sem depender de programador.',
        preco: 1800,
      },
      {
        nome: 'Teste A/B de título e botão',
        detalhe: 'Duas versões no ar por 30 dias e relatório de qual venceu.',
        preco: 900,
      },
      {
        nome: 'Área de membros com login',
        detalhe: 'Escopo varia demais para ter tabela — orçamos junto.',
        preco: null,
      },
    ],
  },
]

/** Recorrência opcional. Nenhum pacote obriga a contratar. */
export const CUIDADO = [
  {
    nome: 'Hospedagem e monitoramento',
    preco: 90,
    descricao:
      'Servidor, certificado de segurança, backup e aviso automático se a página sair do ar. Sem fidelidade.',
  },
  {
    nome: 'Cuidado contínuo',
    preco: 390,
    descricao:
      'Tudo da hospedagem mais 2 h por mês de alterações, relatório de visitas e conversão, e retorno em 1 dia útil.',
    destaque: true,
  },
]

/** O que entra em qualquer pacote — dito em benefício, não em tecnologia. */
export const INCLUSO = [
  {
    icon: Smartphone,
    titulo: 'Feito para o celular primeiro',
    texto:
      'Ordem das seções, tamanho dos botões e formulário pensados para a tela pequena. Não é a versão de computador encolhida — é de lá que vem a maioria das visitas.',
  },
  {
    icon: Gauge,
    titulo: 'Abre rápido no 4G',
    texto:
      'Imagem em formato moderno e nenhuma biblioteca pesada. Página que demora três segundos perde boa parte de quem clicou no anúncio.',
  },
  {
    icon: Accessibility,
    titulo: 'Legível para todo mundo',
    texto:
      'Contraste conferido por régua, navegação por teclado e textos que o leitor de tela entende. É acessibilidade — e é também o que o Google usa para ranquear.',
  },
  {
    icon: KeyRound,
    titulo: 'A página é sua',
    texto:
      'Código entregue, domínio e hospedagem no seu nome. Sem aluguel de plataforma: se um dia quiser trocar de fornecedor, leva a página junto.',
  },
]

/** Regras do negócio que o comercial precisa saber de cor. */
export const CONDICOES = [
  '50% para começar, 50% na entrega — cartão em até 3× sem juros',
  'O prazo começa a contar quando o conteúdo chega (textos, fotos, logo)',
  'Valores de referência para escopo fechado; o orçamento sai de uma conversa de 20 min',
]
