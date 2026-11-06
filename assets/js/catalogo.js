/* ==========================================================================
   YADEA · catálogo de modelos, FAQ, guia local e depoimentos
   --------------------------------------------------------------------------
   OS 6 MODELOS DO SITE ATUAL (yadeacampinas.com, coletado em 06/11/2026), na
   ordem do styleguide (seção 07). Os três números do card (velocidade,
   potência, autonomia) e as tags são os do site atual.

   REGRA HERDADA DO FRAMEWORK: nenhum número entra sem fonte. Fontes aqui:
     1. a ficha OFICIAL do fabricante no Brasil (yadea.com.br, página de cada
        modelo em `fonte`, coletada em 06/11/2026). Ela confere com o site
        atual nos 3 números de 5 modelos; na Keeness, não (ver o modelo);
     2. o card do site atual (velocidade, potência, autonomia, tags);
     3. o FAQ do site atual (garantia 2/2/1 anos, carregador bivolt) — vale
        para todos; o fabricante não publica esses dois.
   Peso e carga máxima: nenhuma fonte publica, então não aparecem.
   Campo sem fonte não aparece. Divergência vai comentada e no README.

   PREÇO fica fora (styleguide: "preço fica fora até a loja aprovar"): o card
   e o modal levam ao WhatsApp. Para ligar, ver README, "Preço".

   TEXTOS COM A LOJA E A CIDADE vêm do config.js (LOJA, CIDADE): o mesmo
   catálogo serve às outras unidades sem reescrever o FAQ.
   ========================================================================== */

const CFG_LOJA = window.YADEA_CONFIG;
const LOJA = CFG_LOJA.marca.nome;
const CIDADE = CFG_LOJA.unidade.cidade;
const ENDERECO_TEXTO = `${CFG_LOJA.endereco.logradouro}, ${CFG_LOJA.endereco.bairro}, em ${CFG_LOJA.endereco.cidade}/${CFG_LOJA.endereco.uf}`;

/* Ordem canônica da ficha, igual para todo modelo. Campo ausente não aparece. */
window.YADEA_FICHA_ORDEM = [
  ['classificacao', 'Classificação'],
  ['velocidade', 'Velocidade máxima'],
  ['potencia', 'Potência'],
  ['autonomia', 'Autonomia'],
  ['bateria', 'Bateria'],
  ['recarga', 'Tempo de recarga'],
  ['carregador', 'Carregador'],
  ['freios', 'Freios'],
  ['suspensao', 'Suspensão'],
  ['rodas', 'Rodas e pneus'],
  ['assento', 'Assento'],
  ['bagageiro', 'Bagageiro'],
  ['dimensoes', 'Dimensões (C × L × A)'],
  ['torque', 'Torque máximo'],
  ['rampa', 'Subida'],
  ['protecao', 'Proteção'],
  ['conectividade', 'Conectividade'],
  ['cores', 'Cores'], // preenchida pelo render.js quando alguma cor não tem foto
  ['garantia', 'Garantia'],
];

/* Filtro do site atual: Todos · E-Motos · Autopropelido (styleguide, seção
   06). Categoria sem modelo some sozinha. A nota aparece sob o filtro. */
window.YADEA_CATEGORIAS = [
  {
    id: 'todos',
    nome: 'Todos',
    nota: 'Todos os modelos. Se o modelo exige ou não CNH e placa, está no próprio card.',
  },
  {
    id: 'emoto',
    nome: 'E-Motos',
    plural: 'E-motos',
    nota: 'Motos elétricas de alto desempenho, homologadas: exigem CNH e emplacamento.',
  },
  {
    id: 'autopropelido',
    nome: 'Autopropelido',
    plural: 'Autopropelidos',
    nota: 'Autopropelidos: até 1000 W e 32 km/h. Sem CNH, sem emplacamento e sem IPVA (Resolução CONTRAN nº 996/23).',
  },
];

/* Selo legal (styleguide, "Badges legais"). Laranja claro = liberdade;
   grafite com ponto âmbar = obrigação. Nunca o contrário. Substitui os SVGs
   cnh_0/1 e emplacamento_0/1 do site atual. */
window.YADEA_CLASSIFICACOES = {
  autopropelido: {
    extenso: 'Autopropelido · CONTRAN 996/23',
    ficha: 'Autopropelido (CONTRAN 996/23) · sem CNH, sem emplacamento e sem IPVA',
    selos: [{ t: 'Sem CNH', tom: 'livre' }, { t: 'Sem placa', tom: 'livre' }],
  },
  /* A Keeness passa dos limites do autopropelido e do ciclomotor (100 km/h,
     7000 W): é motocicleta elétrica. FAQ do site atual: "passam por
     homologação completa no Inmetro e Denatran. O cliente recebe o documento
     necessário para realizar o primeiro emplacamento". */
  motocicleta: {
    extenso: 'Motocicleta elétrica · exige CNH e emplacamento',
    ficha: 'Motocicleta elétrica homologada · exige CNH categoria A e emplacamento',
    selos: [{ t: 'Requer CNH', tom: 'exige' }, { t: 'Emplacamento', tom: 'exige' }],
  },
};

/* ── Fotos ────────────────────────────────────────────────────────────────
   galerias.js (gerado pelo tools/build-media.js) traz, por modelo, as fotos
   na ordem da lista MODELOS do build: primeiro as cores, depois os detalhes.
   Aqui elas são chamadas pelo número (1 = primeira). */

const G = window.YADEA_GALERIAS || {};

function fotos(id, ...numeros) {
  const lista = G[id] || [];
  return numeros.map((n) => lista[n - 1]).filter(Boolean);
}
const detalhes = (id, ...numeros) => fotos(id, ...numeros).map((f) => ({ ...f, detalhe: true }));
const faixa = (de, ate) => Array.from({ length: ate - de + 1 }, (_, i) => de + i);

/* Garantia e carregador: FAQ do site atual, valem para todos os modelos. */
const GARANTIA = '2 anos na bateria, 2 anos no motor e 1 ano nos componentes elétricos';
const CARREGADOR = 'Bivolt automático, 110 V e 220 V';

/* Ordem da vitrine (styleguide, seção 07). */
window.YADEA_ORDEM = ['owin', 'dt3', 'm6-h', 'gfx6', 'keeness', 'gb60'];

/* Nomes das cores: nem o site atual nem o fabricante dão nome às cores (o
   yadea.com.br só publica a amostra em hex). Keeness e GFX6 têm amostras
   nomeadas no material da loja; as demais são DESCRITIVAS, do que a foto
   mostra — confirmar com a loja (README). Hex = amostra oficial do
   yadea.com.br quando existe. `palco` = tom do card/modal para aquela cor,
   tirado da carroceria (styleguide: saturação baixa, nunca inventado). */
const MODELOS = [
  {
    id: 'owin',
    nome: 'Owin',
    fabricante: 'YADEA',
    descritivo: 'Scooter elétrica',
    fonte: 'https://yadea.com.br/electric-scooter/Owin',
    palco: '#8FA4B5',
    tags: ['Estilo', 'Design', 'Clássica'],
    categorias: ['autopropelido'],
    classificacao: 'autopropelido',
    foto: 'assets/img/models/owin-card.webp',
    alt: 'Scooter elétrica YADEA Owin azul-acinzentada com banco vinho',
    preco: null,
    specs: {
      velocidade: { valor: 32, unidade: 'km/h' },
      potencia: { valor: 1000, unidade: 'W', nota: 'Motor no cubo da roda, 90% de eficiência.' },
      autonomia: { valor: 71, unidade: 'km' },
      torque: '117 N·m',
      bateria: 'LFP (lítio-ferro-fosfato) removível, 60 V 30 Ah',
      recarga: '5 horas',
      carregador: CARREGADOR,
      freios: 'Disco na frente, tambor atrás',
      suspensao: 'Hidráulica, dianteira e traseira',
      rodas: 'Aro 12, pneus 90/80-12',
      assento: '640 mm de comprimento, a 780 mm do chão',
      bagageiro: 'Baú de 15 litros sob o banco',
      dimensoes: '1770 × 665 × 1135 mm · 1290 mm entre eixos',
      rampa: 'Até 14°',
      conectividade: 'App YADEA por Bluetooth: conta familiar, buzina localizadora e atualização remota (OTA)',
      garantia: GARANTIA,
    },
    equipamentos: ['Bateria removível: carrega em casa ou no trabalho', 'Controle de cruzeiro, ré com um toque e modos ECO e SPORT', 'Farol de 28.000 cd, com 70 m de alcance', 'Assoalho com 320 mm de extensão para os pés', 'Baú de 15 litros sob o banco'],
    cores: [
      { nome: 'Azul-acinzentada', hex: '#8FA4B5', palco: '#8FA4B5', galeria: fotos('owin', 1) },
      { nome: 'Verde-menta', hex: '#B5CBC2', palco: '#A9C7BA', galeria: fotos('owin', 2) },
      { nome: 'Verde-petróleo', hex: '#55696B', palco: '#7E9896', galeria: fotos('owin', 3) },
      { nome: 'Vermelha', hex: '#BC010E', palco: '#B98A86', galeria: fotos('owin', 4) },
    ],
    galeria: detalhes('owin', ...faixa(5, 10)),
  },
  {
    id: 'dt3',
    nome: 'DT3',
    fabricante: 'YADEA',
    descritivo: 'Scooter elétrica',
    fonte: 'https://yadea.com.br/electric-bicycle/DT3',
    palco: '#C5CAD3',
    tags: ['Design', 'Clássica', 'Urban'],
    categorias: ['autopropelido'],
    classificacao: 'autopropelido',
    foto: 'assets/img/models/dt3-card.webp',
    alt: 'Scooter elétrica YADEA DT3 branca com baú traseiro',
    preco: null,
    specs: {
      velocidade: { valor: 32, unidade: 'km/h' },
      potencia: { valor: 1000, unidade: 'W', nota: 'Motor no cubo da roda.' },
      autonomia: { valor: 55, unidade: 'km' },
      bateria: 'Lítio removível, 48 V 24 Ah',
      carregador: CARREGADOR,
      freios: 'Disco na frente, tambor atrás',
      suspensao: 'Hidráulica, dianteira e traseira',
      rodas: 'Aro 10, pneus 3.00-10',
      bagageiro: 'Baú traseiro',
      // A versão em inglês do mesmo site diz 1245 mm entre eixos; vale a em português.
      dimensoes: '1736 × 667 × 1035 mm · 1265 mm entre eixos',
      rampa: 'Até 12°',
      garantia: GARANTIA,
    },
    equipamentos: ['Bateria de lítio removível', 'Baú traseiro na cor da scooter', 'Farol LED com o símbolo YADEA', 'Painel digital de alta definição'],
    cores: [
      { nome: 'Branca', hex: '#F8F8FC', palco: '#C5CAD3', galeria: fotos('dt3', 1, 2) },
      { nome: 'Cinza', hex: '#81878D', palco: '#B4B8BD', galeria: fotos('dt3', 3) },
      { nome: 'Vermelha', hex: '#E60016', palco: '#C29A98', galeria: fotos('dt3', 4) },
      { nome: 'Preta', hex: '#1F2121', palco: '#8C8F94', galeria: fotos('dt3', 5) },
    ],
    galeria: detalhes('dt3', 6, 7),
  },
  {
    id: 'm6-h',
    nome: 'M6-H',
    fabricante: 'YADEA',
    descritivo: 'Scooter elétrica',
    fonte: 'https://yadea.com.br/electric-scooter/M6-H',
    palco: '#C8B49C',
    tags: ['Estilo', 'Design', 'Clássica'],
    categorias: ['autopropelido'],
    classificacao: 'autopropelido',
    foto: 'assets/img/models/m6-h-card.webp',
    alt: 'Scooter elétrica YADEA M6-H creme com banco marrom',
    preco: null,
    specs: {
      velocidade: { valor: 32, unidade: 'km/h', nota: 'Dois modos: 25 e 32 km/h.' },
      potencia: { valor: 1000, unidade: 'W', nota: 'Motor no cubo da roda.' },
      autonomia: { valor: 71, unidade: 'km' },
      torque: '117 N·m',
      bateria: 'Lítio-ferro-fosfato (LFP) removível, 60 V 30 Ah, 1.500 ciclos de recarga',
      recarga: '5 horas',
      carregador: CARREGADOR,
      freios: 'Disco na frente, tambor atrás',
      suspensao: 'Hidráulica, dianteira e traseira',
      rodas: 'Aro 10, pneus 3.00-10',
      assento: '602 mm de comprimento, a 737 mm do chão',
      bagageiro: 'Baú traseiro de 29 litros (opcional) e porta-objetos frontal com gancho',
      dimensoes: '1815 × 692 × 1080 mm · 1295 mm entre eixos',
      rampa: 'Até 13°',
      protecao: 'IP67',
      conectividade: 'App YADEA por Bluetooth: conta familiar, buzina localizadora, alerta de movimento e atualização remota (OTA)',
      garantia: GARANTIA,
    },
    equipamentos: ['Bateria removível de lítio-ferro-fosfato', 'Suspensão hidráulica na frente e atrás', 'USB de carga rápida de 15 W', 'Descanso lateral de design estável', 'Baú traseiro de 29 litros opcional'],
    cores: [
      { nome: 'Creme', hex: '#DCD0BA', palco: '#C8B49C', galeria: fotos('m6-h', 1, 4) },
      { nome: 'Cinza', hex: '#938A81', palco: '#B3ADA5', galeria: fotos('m6-h', 2) },
      { nome: 'Lilás', hex: '#7D7D8E', palco: '#A3A6BF', galeria: fotos('m6-h', 3) },
    ],
    galeria: detalhes('m6-h', ...faixa(5, 10)),
  },
  {
    id: 'gfx6',
    nome: 'GFX6',
    fabricante: 'YADEA',
    descritivo: 'Scooter elétrica',
    fonte: 'https://yadea.com.br/electric-bicycle/GFX6',
    palco: '#F08A55',
    tags: ['Estilo', 'Design', 'Urban'],
    categorias: ['autopropelido'],
    classificacao: 'autopropelido',
    foto: 'assets/img/models/gfx6-card.webp',
    alt: 'Scooter elétrica YADEA GFX6 laranja e branca',
    preco: null,
    specs: {
      // A versão em inglês do mesmo site diz 30 km/h; vale a em português (e o site atual).
      velocidade: { valor: 32, unidade: 'km/h' },
      potencia: { valor: 1000, unidade: 'W', nota: 'Motor no cubo da roda, pico de 2.600 W.' },
      autonomia: { valor: 68, unidade: 'km' },
      bateria: 'Lítio-ferro-fosfato (LFP) removível, 60 V 30 Ah',
      recarga: '5 horas',
      carregador: CARREGADOR,
      freios: 'Disco nas duas rodas: 170 mm na frente, 180 mm atrás',
      suspensao: 'Hidráulica: 70 mm de curso na frente, 50 mm atrás',
      rodas: 'Aro 12, pneus 80/90-12',
      assento: '540 mm de comprimento, a 740 mm do chão',
      bagageiro: 'Caixa central de 13 litros (opcional)',
      dimensoes: '1731 × 693 × 1093 mm · 1245 mm entre eixos',
      rampa: 'Até 15°',
      protecao: 'IP67',
      conectividade: 'App por Bluetooth, cartão NFC ou chave: conta familiar (até 5 pessoas), alerta de movimento e atualização remota (OTA)',
      garantia: GARANTIA,
    },
    equipamentos: ['Controle de descida (HDC) e de tração (TCS)', 'Controle de cruzeiro e ré com um toque', 'Painel LED de tela cheia', 'Farol LED de 4 lentes', 'Freios a disco nas duas rodas'],
    cores: [
      { nome: 'Laranja e branca', bicolor: ['#FD9D07', '#F1F1F1'], palco: '#F08A55', galeria: fotos('gfx6', 1, 5) },
      { nome: 'Cinza-escura', hex: '#414141', palco: '#8E8E8E', galeria: fotos('gfx6', 2) },
      { nome: 'Verde', hex: '#828873', palco: '#A3AB8E', galeria: fotos('gfx6', 3) },
      { nome: 'Branca', hex: '#F1F1F1', palco: '#C9CCD0', galeria: fotos('gfx6', 4) },
    ],
    galeria: detalhes('gfx6', ...faixa(6, 11)),
  },
  {
    id: 'keeness',
    nome: 'Keeness',
    fabricante: 'YADEA',
    descritivo: 'Moto elétrica',
    fonte: 'https://yadea.com.br/electric-motorcycle/keeness',
    palco: '#5F7B78',
    tags: ['Potência', 'Design', 'Agilidade'],
    categorias: ['emoto'],
    classificacao: 'motocicleta',
    foto: 'assets/img/models/keeness-card.webp',
    alt: 'Moto elétrica YADEA Keeness cinza com detalhes verde-petróleo',
    preco: null,
    /* POTÊNCIA: o site atual dizia 7000 W; o fabricante (yadea.com.br,
       06/11/2026) diz 5500 W nominal e 11000 W de pico. Vale o fabricante:
       anunciar potência acima da oficial é risco ao consumidor. A loja
       confirma (README, pendências). */
    specs: {
      velocidade: { valor: 100, unidade: 'km/h', nota: 'De 0 a 50 km/h em 3 segundos.' },
      potencia: { valor: 5500, unidade: 'W', nota: 'Motor central, pico de 11.000 W.' },
      autonomia: { valor: 129, unidade: 'km', nota: 'Alcance máximo no ciclo EEC.' },
      torque: '300 N·m',
      bateria: 'Duas baterias de íon-lítio removíveis, 72 V 32 Ah cada, com BMS de mais de 40 proteções',
      carregador: CARREGADOR,
      freios: 'Sistema combinado (CBS), dianteiro e traseiro',
      suspensao: 'Dianteira invertida e monoamortecedor traseiro',
      rodas: 'Alumínio aro 17, pneus 100/80-17 e 130/70-17',
      assento: '600 mm de comprimento, a 770 mm do chão',
      bagageiro: 'Porta-objetos de 16 litros',
      dimensoes: '1990 × 775 × 1090 mm',
      rampa: 'Até 20°',
      protecao: 'IPX7 na bateria',
      conectividade: 'App YADEA por Bluetooth: conta familiar, buzina localizadora, alerta de movimento e aviso de bateria',
      garantia: GARANTIA,
    },
    equipamentos: ['Vencedora do prêmio Red Dot', 'Motor central com pico de 11.000 W e 300 N·m', 'Duas baterias removíveis de 72 V', 'Recuperação de energia na frenagem', 'Painel LED de 5" e entrada USB'],
    cores: [
      { nome: 'Cinza', hex: '#454545', palco: '#5F7B78', galeria: fotos('keeness', 1) },
      { nome: 'Branca', hex: '#FFFFFF', palco: '#AEB4B8', galeria: fotos('keeness', 2, 4) },
      { nome: 'Preta', hex: '#000000', palco: '#6E7276', galeria: fotos('keeness', 3) },
    ],
    galeria: detalhes('keeness', ...faixa(5, 13)),
  },
  {
    id: 'gb60',
    nome: 'GB60',
    fabricante: 'YADEA',
    descritivo: 'Scooter elétrica',
    fonte: 'https://yadea.com.br/electric-bicycle/GB60',
    palco: '#8A8580',
    tags: ['Estilo', 'Mobilidade', 'Urban'],
    categorias: ['autopropelido'],
    classificacao: 'autopropelido',
    foto: 'assets/img/models/gb60-card.webp',
    alt: 'Scooter elétrica YADEA GB60 preta com quadro dourado e cesta dianteira',
    preco: null,
    specs: {
      velocidade: { valor: 32, unidade: 'km/h' },
      potencia: { valor: 800, unidade: 'W', nota: 'Motor no cubo da roda.' },
      autonomia: { valor: 50, unidade: 'km' },
      torque: '80 N·m',
      bateria: 'Lítio removível, 48 V 24 Ah',
      carregador: CARREGADOR,
      freios: 'Disco na frente, tambor atrás',
      suspensao: 'Hidráulica, dianteira e traseira',
      rodas: 'Aro 10, pneus 2.75-10',
      assento: 'A 720 mm do chão',
      dimensoes: '1565 × 685 × 1060 mm · 1105 mm entre eixos',
      rampa: 'Até 12°',
      garantia: GARANTIA,
    },
    equipamentos: ['Bateria removível com alça', 'Controle de descida em ladeira e de tração', 'Painel LED com a porcentagem de bateria', 'Plataforma de apoio estendida', 'Banco traseiro com encosto'],
    cores: [
      { nome: 'Preta', hex: '#454646', palco: '#8A8580', galeria: fotos('gb60', 1) },
      { nome: 'Champanhe', hex: '#B5A996', palco: '#BDB39E', galeria: fotos('gb60', 2) },
      { nome: 'Prata', hex: '#B0B0B1', palco: '#AFB2B5', galeria: fotos('gb60', 3) },
    ],
    galeria: detalhes('gb60', ...faixa(4, 10)),
  },
];

window.YADEA_MODELOS = MODELOS.filter((m) => !m.oculto);

/* ── FAQ: "Dúvidas mais comuns" (site atual, texto da loja) ─────────────
   As 8 primeiras aparecem; as outras abrem em "Ver todas as dúvidas". Todas
   ficam no HTML (SEO e IAs) e no FAQPage do JSON-LD. */
window.YADEA_FAQ_VISIVEIS = 8;
window.YADEA_FAQ = [
  {
    q: 'Quais modelos da Yadea não precisam de CNH e emplacamento?',
    a: 'Os veículos autopropelidos da Yadea são classificados como equipamentos de mobilidade elétrica de baixa velocidade. Por isso, não exigem CNH, emplacamento ou pagamento de IPVA, oferecendo uma alternativa prática e acessível para quem busca mobilidade urbana sem burocracia. Todos os modelos autopropelidos disponíveis em nossa loja se enquadram nessa regra — basta subir, acelerar e aproveitar com total tranquilidade.',
  },
  {
    q: 'É possível testar a scooter antes de comprar?',
    a: `Sim! A ${LOJA} oferece test ride agendado para que você experimente o modelo ideal antes da compra.`,
  },
  {
    q: 'Como funciona a garantia da Yadea?',
    a: 'A Yadea oferece uma garantia completa para a sua tranquilidade: são 2 anos de garantia para a bateria, 2 anos de garantia para o motor e 1 ano de garantia para os componentes elétricos.',
  },
  {
    q: 'Quanto gasto de energia para carregar minha scooter?',
    a: 'O custo médio de uma recarga completa fica entre R$ 0,80 e R$ 2,00, dependendo do modelo e da tarifa de energia da sua região. É muito mais econômico do que gasolina.',
  },
  {
    q: 'Qual é o tempo de recarga completa das scooters?',
    a: 'Depende do modelo, mas em média: autopropelidos, de 5 a 6 horas; scooters de maior potência, de 6 a 8 horas.',
  },
  {
    q: 'Posso carregar minha scooter Yadea em qualquer tomada 110V ou 220V?',
    a: 'Sim. Os carregadores da Yadea são bivolt automáticos, compatíveis com 110V e 220V.',
  },
  {
    q: `Quais são as formas de pagamento na ${LOJA}?`,
    a: 'Oferecemos Pix, cartão de crédito (parcelamento sem juros em algumas opções), financiamento, carteira digital e consórcio (para modelos que exigem documentação).',
  },
  {
    q: 'Vocês oferecem assistência técnica?',
    a: `Sim! A ${LOJA} conta com assistência técnica autorizada na própria loja, com equipe especializada e treinada pela marca para realizar manutenção e suporte em scooters elétricas Yadea, garantindo segurança, qualidade e tranquilidade no pós-venda.`,
  },
  {
    q: 'A Yadea possui modelos homologados no Brasil?',
    a: 'Sim. Os modelos que ultrapassam os limites de autopropelidos passam por homologação completa no Inmetro e Denatran, atendendo às normas nacionais de segurança. O cliente recebe o documento necessário para realizar o primeiro emplacamento.',
  },
  {
    q: 'Vocês vendem peças e acessórios originais Yadea?',
    a: `Sim. A ${LOJA} possui peças originais, manutenção especializada e acessórios compatíveis, garantindo a durabilidade e o desempenho da sua scooter.`,
  },
  {
    q: 'É obrigatório o uso de capacete nas scooters Yadea?',
    a: `Não. A resolução do CONTRAN 996/23 não cita equipamentos de segurança, porém nós, da ${LOJA}, sempre aconselhamos!`,
  },
  {
    q: 'Quem fabrica as scooters de vocês?',
    a: 'Todos os produtos são fabricados pela Yadea, líder mundial em veículos elétricos de duas rodas, presente em mais de 100 países e com mais de 100 milhões de unidades vendidas.',
  },
  {
    q: 'As baterias são de lítio?',
    a: 'Sim. A Yadea utiliza baterias LFP ou íon-lítio, dependendo do modelo. Ambas são seguras, duráveis e possuem sistemas inteligentes de proteção (BMS).',
  },
  {
    q: 'Como faço a limpeza da minha scooter?',
    a: 'Você pode usar água corrente moderada, pano úmido e sabão neutro. Evite jatos de alta pressão diretamente no motor, no painel e na bateria.',
  },
  {
    q: 'As scooters Yadea são resistentes à chuva?',
    a: 'Sim. Os modelos possuem proteção IP (varia por modelo), permitindo uso em chuva leve. Recomenda-se evitar alagamentos ou chuva extrema.',
  },
  {
    q: 'As scooters aceitam garupa?',
    a: 'Sim. Modelos maiores (como a Keeness) aceitam garupa. Modelos autopropelidos geralmente são monoposto (somente 1 pessoa).',
  },
  {
    q: 'A scooter pode pegar subida?',
    a: 'Sim, os motores da Yadea são preparados para inclinações urbanas. A capacidade de subida depende do modelo — alguns chegam a 15º de inclinação facilmente.',
  },
  {
    q: 'As scooters têm conectividade com app?',
    a: 'Os modelos mais novos possuem recursos como desbloqueio pelo app, rastreamento básico, atualização de software (OTA) e histórico de uso.',
  },
  {
    q: 'Por que escolher uma scooter elétrica Yadea?',
    a: 'Zero emissão de poluentes, baixíssimo custo por km rodado, conforto e silêncio, manutenção simples, tecnologia e conectividade, e uma marca líder mundial.',
  },
];

/* ── Guia local: "Mobilidade elétrica em <cidade>" (site atual, seção de
   SEO local). Mesmo acordeão, abaixo do FAQ. */
window.YADEA_GUIA_INTRO = 'Entenda a diferença entre scooter elétrica, moto elétrica, autopropelido e ciclomotor, veja quando precisa de CNH ou emplacamento e descubra qual modelo combina melhor com sua rotina.';
window.YADEA_GUIA = [
  {
    q: `Qual é a melhor scooter elétrica para usar em ${CIDADE} no dia a dia?`,
    a: 'A melhor escolha depende do seu trajeto, da distância diária, do tipo de via e da necessidade de desempenho. Para deslocamentos urbanos — bairro, trabalho, faculdade, mercado e pequenos trajetos —, modelos como GB60, M6-H, Owin, DT3 e GFX6 podem atender muito bem quem busca economia, praticidade e baixa burocracia. Para quem precisa de mais velocidade, potência e autonomia, modelos como a Keeness entram em uma categoria superior e exigem análise de documentação, habilitação e emplacamento.',
  },
  {
    q: `Scooter elétrica precisa de CNH em ${CIDADE}?`,
    a: 'Depende da classificação do veículo. Modelos enquadrados como equipamentos de mobilidade individual autopropelidos, dentro dos limites de potência, velocidade, largura e distância entre eixos definidos pela legislação, não exigem CNH, ACC, registro ou emplacamento. Já modelos classificados como ciclomotores, motonetas ou motocicletas elétricas exigem documentação, placa e habilitação adequada, como ACC ou CNH A.',
  },
  {
    q: 'Qual a diferença entre scooter elétrica autopropelida e ciclomotor elétrico?',
    a: 'O autopropelido é voltado para mobilidade urbana de baixa velocidade e menor burocracia, seguindo limites como potência de até 1000 W e velocidade máxima de fabricação de até 32 km/h. O ciclomotor elétrico já é um veículo de categoria superior, podendo ter mais potência e desempenho, mas exige registro, emplacamento e condutor habilitado. Por isso, antes de comprar, é importante verificar a classificação exata do modelo.',
  },
  {
    q: `Quais modelos da ${LOJA} não precisam de CNH e emplacamento?`,
    a: `Em geral, os modelos enquadrados como autopropelidos, com velocidade máxima de fabricação de até 32 km/h e potência dentro do limite permitido, não precisam de CNH, ACC, emplacamento ou IPVA. Na ${LOJA}, a equipe orienta o cliente modelo por modelo para confirmar a classificação correta antes da compra.`,
  },
  {
    q: 'Scooter elétrica pode andar na rua, ciclovia ou calçada?',
    a: 'A circulação depende do tipo de veículo e das regras locais da via. Bicicletas elétricas e autopropelidos costumam seguir regras semelhantes às das bicicletas, respeitando ciclovias, ciclofaixas e limites de velocidade. Em áreas de pedestres, a circulação só deve ocorrer quando permitida pelo órgão responsável e em baixa velocidade. Ciclomotores, por outro lado, não devem circular em calçadas ou ciclovias.',
  },
  {
    q: 'Quanto custa carregar uma scooter elétrica Yadea?',
    a: 'O custo de recarga é muito baixo quando comparado ao abastecimento com gasolina. O valor exato depende da capacidade da bateria, do modelo escolhido e da tarifa de energia da sua região. Para a maioria dos usos urbanos, a scooter elétrica tende a oferecer um custo por quilômetro muito menor do que um veículo a combustão.',
  },
  {
    q: 'Posso carregar a scooter elétrica em tomada comum?',
    a: 'Sim. Os modelos Yadea utilizam carregadores próprios e podem ser carregados em tomada comum compatível, seguindo as orientações do manual do produto. Em muitos casos, o carregador é bivolt, permitindo uso em tomadas 110V ou 220V. O ideal é utilizar uma tomada em boas condições, evitar extensões inadequadas e seguir as recomendações da assistência autorizada.',
  },
  {
    q: 'Quanto tempo demora para carregar uma scooter elétrica?',
    a: 'O tempo de recarga varia conforme o modelo, a capacidade da bateria e o nível de carga restante. Em média, modelos urbanos podem levar algumas horas para uma carga completa. Para quem usa todos os dias, uma rotina simples é carregar à noite ou nos períodos em que a scooter fica parada.',
  },
  {
    q: 'Qual autonomia uma scooter elétrica tem na prática?',
    a: `A autonomia depende do modelo, do peso transportado, do relevo, da calibragem dos pneus, do modo de condução e da velocidade média. No site da ${LOJA}, há modelos urbanos com autonomias indicadas entre aproximadamente 50 km e 71 km, além de modelos de maior desempenho com autonomia superior. Antes da compra, vale comparar sua rota diária com a autonomia estimada do modelo escolhido.`,
  },
  {
    q: `Scooter elétrica aguenta subida em ${CIDADE}?`,
    a: 'Sim, mas o desempenho em subida depende da potência do motor, do peso do condutor, da inclinação da via e da carga da bateria. Para regiões com ladeiras ou trajetos mais exigentes, é recomendável escolher um modelo com mais torque e testar a scooter em um test ride antes de fechar a compra.',
  },
  {
    q: 'As scooters elétricas Yadea podem pegar chuva?',
    a: 'Os modelos Yadea possuem proteção adequada para uso urbano e podem lidar com chuva leve ou piso molhado, respeitando as especificações de cada produto. Mesmo assim, não é recomendado enfrentar alagamentos, jatos de alta pressão diretamente em componentes elétricos ou situações extremas que possam comprometer motor, painel, bateria e conectores.',
  },
  {
    q: 'A bateria de lítio da scooter elétrica é removível?',
    a: `Alguns modelos contam com bateria removível, o que facilita a recarga em casa, no apartamento ou no trabalho. Isso é especialmente útil para quem não tem tomada na garagem. Antes de escolher o modelo, confirme com a ${LOJA} se a versão desejada possui bateria removível e qual é o procedimento correto de retirada, transporte e carregamento.`,
  },
  {
    q: 'Scooter elétrica aceita garupa?',
    a: 'Depende do modelo e da classificação do veículo. Alguns modelos maiores são projetados para transportar duas pessoas, enquanto modelos autopropelidos geralmente são voltados para uso individual. Para segurança, sempre verifique a capacidade de carga, o tipo de banco, a documentação e a recomendação do fabricante.',
  },
  {
    q: 'Vale a pena comprar uma scooter elétrica em vez de moto a gasolina?',
    a: 'Para uso urbano, a scooter elétrica pode valer muito a pena. Ela reduz o gasto com combustível, tem manutenção mais simples, não emite fumaça, é silenciosa e facilita trajetos curtos e médios. A decisão ideal depende da sua distância diária, da necessidade de velocidade, do local de recarga e de você buscar um modelo sem burocracia ou um veículo de maior desempenho.',
  },
  {
    q: `Onde comprar scooter elétrica Yadea em ${CIDADE}?`,
    a: `A ${LOJA} atende na ${ENDERECO_TEXTO}. Na unidade, você pode conhecer os modelos, tirar dúvidas sobre legislação, autonomia e manutenção, além de agendar um test ride para experimentar a scooter antes de comprar.`,
  },
  {
    q: `A ${LOJA} oferece assistência técnica?`,
    a: `Sim. A ${LOJA} oferece suporte e assistência técnica para os modelos da marca, com orientação sobre manutenção, peças, bateria, carregamento, revisão e cuidados de uso. Esse é um diferencial importante para quem quer comprar uma scooter elétrica com suporte local em ${CFG_LOJA.unidade.regiao}.`,
  },
  {
    q: 'Posso fazer test ride antes de comprar uma scooter elétrica?',
    a: 'Sim. O test ride é uma das melhores formas de escolher o modelo certo, principalmente para quem nunca usou uma scooter elétrica. Durante o teste, você consegue avaliar conforto, altura do banco, aceleração, estabilidade, frenagem, peso, ergonomia e sensação de segurança no uso real.',
  },
  {
    q: 'Como escolher entre GB60, M6-H, Owin, DT3, GFX6 e Keeness?',
    a: 'Se sua prioridade é praticidade urbana, economia e deslocamento diário, modelos como GB60, M6-H, Owin, DT3 e GFX6 podem ser boas opções dentro da proposta de mobilidade elétrica urbana. Se você busca mais performance, maior velocidade e uma experiência mais próxima de uma moto elétrica robusta, a Keeness pode fazer mais sentido. A melhor escolha é comparar autonomia, potência, conforto, necessidade de documentação e tipo de trajeto.',
  },
];

/* ── Depoimentos (site atual, texto do cliente sem retoque) ────────────── */
window.YADEA_DEPOIMENTOS = [
  {
    nome: 'Patrícia Fernandes',
    estrelas: 5,
    texto: 'Fui conhecer a Owin na Yadea Campinas porque uma amiga indicou. O atendimento foi tão tranquilo que me senti à vontade pra testar, perguntar e experimentar. Eles não ficaram empurrando nada, só explicaram de verdade. Isso fez toda diferença pra eu fechar.',
  },
  {
    nome: 'Gláucia Tavares',
    estrelas: 5,
    /* O original tem dois emojis ("linda 🤩", "atendimento. 🥰") e ".." no
       meio. Saíram (styleguide: "nunca emoji na interface"); as palavras são
       as dela. */
    texto: 'Comprei a minha GFX6 que é linda, mas o que mais me chamou atenção foi em relação ao atendimento da Yadea Campinas. Me explicaram como funciona a bateria, quanto eu ia gastar por mês e até como cuidar pra durar mais. Foi o que me ganhou na compra, o carinho do time de atendimento.',
  },
  {
    nome: 'Graziele Bueno',
    estrelas: 5,
    texto: 'O que mais me fez comprar na Yadea Campinas foi o atendimento. Eu não entendo nada de moto e mesmo assim consegui escolher tranquila, sem ficar perdida. Eles explicam tudo no detalhe e deixam a gente experimentar a scooter antes. Isso fez toda diferença pra mim.',
  },
  {
    nome: 'Thiago Perez',
    estrelas: 5,
    texto: 'Comprei minha scooter mais por necessidade do que por vontade, confesso. Mas acabou virando meu meio de transporte favorito. É leve, não me assusta no trânsito e eu praticamente não gasto nada pra usar. Hoje em dia só pego o carro quando realmente preciso.',
  },
  {
    nome: 'Júlia Nunes Dias',
    estrelas: 5,
    texto: 'Eu tinha muito medo de moto, mas essas elétricas são outra vibe. Não tem tranco, não tem barulho, não tem aquele cheiro de gasolina. Virou uma mão na roda pra ir trabalhar e ainda acho bonita demais.',
  },
  {
    nome: 'Emílio Fraga',
    estrelas: 5,
    texto: 'Uso pra resolver minhas coisas no bairro e levar minha filha na escola. Acho prática e não me dá dor de cabeça. Já até acostumei a colocar a bateria pra carregar enquanto faço jantar. Ficou fácil de encaixar na rotina.',
  },
];
