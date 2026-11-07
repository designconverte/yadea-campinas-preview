/* ==========================================================================
   YADEA CAMPINAS · configuração da unidade
   --------------------------------------------------------------------------
   ÚNICO lugar onde moram os dados desta loja. O HTML, o app.js e o build
   (tools/gerar-seo.js) leem daqui. Para criar outra unidade (Sorocaba,
   Itapetininga), este é o primeiro arquivo a trocar — ver README, "Nova
   unidade".

   Fonte: yadeacampinas.com e /concessionaria-yadea-campinas/, coletados em
   06/11/2026 (projeto/yadea-campinas-materiais.md), e o styleguide v1.0.
   ========================================================================== */

window.YADEA_CONFIG = {
  /* Identidade desta unidade. `id` entra no nome do repositório e no carimbo
     dos arquivos gerados; `cidade` aparece em títulos, textos e no JSON-LD. */
  unidade: {
    id: 'campinas',
    cidade: 'Campinas',
    uf: 'SP',
    regiao: 'Campinas e região',
  },

  /* Endereço público do site. Canonical, og:image, sitemap e JSON-LD saem
     daqui. A prévia (GitHub Pages) troca o host, mas mantém o canonical. */
  site: {
    url: 'https://yadeacampinas.com/',
    dominio: 'yadeacampinas.com',
    // Página institucional, no mesmo endereço do WordPress (gerada pelo build).
    paginaConcessionaria: 'concessionaria-yadea-campinas/',
  },

  marca: {
    nome: 'YADEA Campinas',
    nomeLoja: 'YADEA Campinas',
    razaoSocial: 'Lopes Comercio de Motos Eletricas LTDA',
    cnpj: '61.677.022/0001-85',
    /* Logos da assinatura local (styleguide: "nunca redesenhar nem recriar
       em texto"). Outra unidade precisa do SVG próprio dela. */
    logoNegativo: 'assets/img/brand/logo-campinas-negativo.svg',
    logoPositivo: 'assets/img/brand/logo-campinas-positivo.svg',
  },

  /* Vendas e assistência usam o mesmo número no site atual.
     `numero` é só para exibição; `e164` é o que entra no link wa.me. */
  whatsapp: {
    numero: '(19) 99846-8303',
    e164: '5519998468303',
  },
  assistencia: {
    numero: '(19) 99846-8303',
    e164: '5519998468303',
  },
  telefone: '+55 19 99846-8303',

  endereco: {
    logradouro: 'Av. José de Sousa Campos, 1679',
    complemento: '',
    bairro: 'Cambuí',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13025-320',
    get completo() {
      return `${this.logradouro} · ${this.bairro}, ${this.cidade} - ${this.uf} · ${this.cep}`;
    },
    // Usado no link "traçar rota" e no mapa.
    get busca() {
      return `YADEA Campinas, ${this.logradouro}, ${this.bairro}, ${this.cidade} - ${this.uf}, ${this.cep}`;
    },
  },

  /* Horários do site atual. Enquanto `confirmado` for false, o rodapé mostra
     "consulte pelo WhatsApp" em vez de um horário que pode estar errado.
     `json` alimenta o openingHoursSpecification do JSON-LD. */
  horarios: {
    confirmado: true,
    vendas: 'Dias úteis: 9h às 18h · Sáb. e feriados: 9h às 13h',
    assistencia: 'Dias úteis: 9h às 18h',
    json: [
      { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '09:00', fecha: '18:00' },
      { dias: ['Saturday'], abre: '09:00', fecha: '13:00' },
    ],
  },

  /* O site atual não tem link de rede social. Preenchido, o ícone aparece no
     header, no menu e no rodapé; vazio, some (nada de link para "#"). */
  redes: {
    instagram: '',
    instagramUsuario: '',
  },

  /* ── Comunicado de segurança ──────────────────────────────────────────
     Herdado do framework (Green Energy): aviso discreto de "único site
     oficial" + lista de domínios não reconhecidos. A YADEA Campinas não
     relatou domínio falso: fica DESLIGADO. O texto institucional sobre
     canais oficiais já está na página da concessionária. Para ligar, ver
     README, "Comunicado de segurança". */
  alertaSeguranca: {
    ativo: false,
    versao: '2026-11-06',
    siteOficial: 'yadeacampinas.com',
    dominiosNaoReconhecidos: [],
    atrasoMs: 2500,
    reexibirAposDias: 7,
  },

  /* Mensagens pré-preenchidas. Regra do styleguide: toda mensagem começa com
     "Olá! Vim pelo site…" — é como a equipe reconhece o lead que veio do
     site. `prefixoMensagem` garante isso até para mensagem nova escrita sem
     ele (render.js). `{modelo}`, `{cor}` e `{categoria}` são trocados no clique. */
  prefixoMensagem: 'Olá! Vim pelo site',
  mensagens: {
    geral: 'Olá! Vim pelo site e gostaria de saber mais sobre os modelos e condições especiais da YADEA Campinas.',
    modelo: 'Olá! Vim pelo site e gostaria de saber mais sobre o modelo {modelo}.',
    modeloCor: 'Olá! Vim pelo site e gostaria de saber mais sobre o modelo {modelo} na cor {cor}.',
    testRideGeral: 'Olá! Vim pelo site e gostaria de agendar um test ride na YADEA Campinas.',
    testRideModelo: 'Olá! Vim pelo site e gostaria de agendar um test ride do modelo {modelo}.',
    testRideModeloCor: 'Olá! Vim pelo site e gostaria de agendar um test ride do modelo {modelo} na cor {cor}.',
    assistencia: 'Olá! Vim pelo site e gostaria de falar com a assistência técnica da YADEA Campinas.',
    categoria: 'Olá! Vim pelo site e gostaria de ver as opções de {categoria} da YADEA Campinas.',
    orientacao: 'Olá! Vim pelo site e gostaria de uma orientação para escolher o modelo ideal para o meu trajeto.',
    confirmarOficial: 'Olá! Vim pelo site e quero confirmar se estou falando com o atendimento oficial da YADEA Campinas.',
    // Botão do hero da campanha (Black November, até a data do catalogo.js).
    black: 'Olá! Vim pelo site e quero aproveitar a Black November YADEA (Owin / DT3).',
  },
};
