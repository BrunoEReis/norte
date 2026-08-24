/**
 * Curadoria de imagens por demo.
 *
 * IDs do Unsplash, verificados um a um em folha de contato antes de entrarem
 * aqui — cada foto foi escolhida pela direção de arte da página, não para
 * preencher espaço. Rode `npm run photos` para baixar tudo para public/photos.
 */
export const IMG = {
  agencia: {
    /** Peças do portfólio: alternam arte gráfica e impressos, na ordem do grid. */
    work: [
      'photo-1586032788085-d75f745f26e0', // formas gráficas em vermelho e turquesa
      'photo-1552250575-e508473b090f', // composição geométrica laranja e verde
      'photo-1778567148288-233997494476', // cartão branco sobre tecido
      'photo-1655892802496-9b1d61b8910f', // papelaria com anel e folhagem seca
      'photo-1604871000636-074fa5117945', // pintura líquida azul e rosa
      'photo-1696319873093-c1b6bb4c8c85', // impressos aplicados na parede
    ],
    moodboard: 'photo-1613463639651-4aca3f3dd83e',
    desk: 'photo-1613463251864-2a2bc3952817',
    team: 'photo-1559032806-99a331d600b4',
  },
  clinica: {
    hero: 'photo-1659989693409-5adc97274bed',
    room: 'photo-1630226040750-d934f017f0e4',
    therapy: 'photo-1668422550557-f096364b72b4',
    detail: 'photo-1773895314453-5da2901061f6',
    consulta: 'photo-1739285452644-3a2c009112fe',
    equipe: [
      'photo-1706565029539-d09af5896340',
      'photo-1607746882042-944635dfe10e',
      'photo-1749793716288-a5ab5ed3b0e1',
      'photo-1532171875345-9712d9d4f65a',
    ],
  },
  imobiliaria: {
    hero: 'photo-1719941080098-467fdb0aba69', // piscina no rooftop à noite
    living: 'photo-1663811397207-418a92396ad5',
    suite: 'photo-1586105251261-72a756497a11',
    marble: 'photo-1690049098415-29f96fca22c0',
    aerial: 'photo-1771218829768-16501433f7d1', // rooftop no fim da tarde
    view: 'photo-1757924461488-ef9ad0670978',
    facade: 'photo-1488972685288-c3fd157d7c7a',
    city: 'photo-1519010470956-6d877008eaa4',
  },
  ecommerce: {
    hero: 'photo-1651761483492-7d2e26dd3455', // pacote kraft sem marca
    ritual: 'photo-1581447355317-916971180cfa',
    pour: 'photo-1616388761741-a5936c6f61f6',
    roast: 'photo-1561986810-4f3ba2f46ceb',
    cherries: 'photo-1515694590185-73647ba02c10',
    farmer: 'photo-1597816760638-406d7271105c',
    fazenda: 'photo-1567726843492-df0484bb0b05',
    lifestyle: 'photo-1742466851711-24e957c6f2a8',
    cupping: 'photo-1572286258217-40142c1c6a70',
    shelf: 'photo-1622919526861-1b6c75517f29',
  },
  consultoria: {
    hero: 'photo-1517048676732-d65bc937f952',
    board: 'photo-1573167507387-6b4b98cb7c13',
    city: 'photo-1525367922492-f15fe7b709cb',
    aerial: 'photo-1519010470956-6d877008eaa4',
    partners: [
      'photo-1749793716288-a5ab5ed3b0e1',
      'photo-1532170579297-281918c8ae72',
      'photo-1640531005390-38bd92755d6a',
      'photo-1758600587730-a11917c13b85',
    ],
  },
  adega: {
    hero: 'photo-1681422668808-9a9e8b156545', // gargalos gelados, sem marca visível
    gelada: 'photo-1681422709041-4303ba01721c',
    neon: 'photo-1598190284985-6b767a0d7c83', // letreiro "let's drink all night"
    destilados: 'photo-1582819509237-d5b75f20ff7a',
    parede: 'photo-1508253730651-e5ace80a7025',
    tampinhas: 'photo-1546339166-72eaf6a67c3c',
    rua: 'photo-1597313893052-ceb17933084a',
    garrafa: 'photo-1644085159285-5fd924740cb3',
    balcao: 'photo-1706828675754-6a2c46a56099',
    moto: 'photo-1607130232670-52123ba5be5c',
  },
  barbearia: {
    hero: 'photo-1781455793310-8427c96454c7', // salão amplo em luz baixa, sem marca na parede
    salao: 'photo-1592647420148-bfcc177e2117',
    barba: 'photo-1503951914875-452162b0f3f1',
    corte: 'photo-1605497788044-5a32c7078486',
    navalha: 'photo-1533245270348-821d4d5c7514',
    toalha: 'photo-1533808232502-bee53575c3af',
    cadeira: 'photo-1775494165568-42c0fbb4c782',
    equipe: [
      'photo-1553521041-d168abd31de3',
      'photo-1582893561942-d61adcb2e534',
      'photo-1635273051937-a0ddef9573b6',
      'photo-1567894340315-735d7c361db0',
    ],
  },
  hamburgueria: {
    hero: 'photo-1499028344343-cd173ffc68a9', // burger com faca, fundo preto
    burger2: 'photo-1611077854917-291673c6ae06',
    burger3: 'photo-1547584370-2cc98b8b8dc8',
    close: 'photo-1596956470007-2bf6095e7e16',
    fritas: 'photo-1630384060421-cb20d0e0649d',
    neon: 'photo-1564019709518-6182bdabe251',
    salao: 'photo-1602867629398-e6280bc18910',
    entrega: 'photo-1617347454431-f49d7ff5c3b1',
  },
  petshop: {
    hero: 'photo-1598875706250-21faaf804361', // golden sorrindo, luz clara
    amarelo: 'photo-1658337921250-10578c1372fa',
    vet: 'photo-1700665537604-412e89a285c3',
    consulta: 'photo-1630438994394-3deff7a591bf',
    colo: 'photo-1588950538967-ca7f8599c669',
    gato: 'photo-1536589961747-e239b2abbec2',
    exame: 'photo-1770836037816-4445dbd449fd',
    equipe: ['photo-1700665537604-412e89a285c3', 'photo-1644675443401-ea4c14bad0e6'],
  },
  /** Retratos usados em depoimentos, compartilhados entre as demos. */
  faces: {
    ana: 'photo-1781888681811-332968760c2a',
    ricardo: 'photo-1560250097-0b93528c311a',
    juliana: 'photo-1758599543125-0a927f1d7a3b',
    marcos: 'photo-1629425733761-caae3b5f2e50',
    felipe: 'photo-1500648767791-00dcc994a43e',
    carla: 'photo-1607990283143-e81e7a2c9349',
    beatriz: 'photo-1506863530036-1efeddceb993',
    daniel: 'photo-1705645930353-0e335311ef20',
    renata: 'photo-1532170579297-281918c8ae72',
    tiago: 'photo-1617244147299-5ef406921c35',
    paulo: 'photo-1718209881007-c0ecdfc00f9d',
    livia: 'photo-1532074205216-d0e1f4b87368',
    helena: 'photo-1532171875345-9712d9d4f65a',
    sofia: 'photo-1758600587730-a11917c13b85',
    clara: 'photo-1607746882042-944635dfe10e',
    lucas: 'photo-1640531005390-38bd92755d6a',
  },
} as const
