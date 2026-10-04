// Informació general del curs, treta de la presentació del primer dia
// («3r ESO Biologia i Geologia», 2026-2027).
// No s'hi publiquen els codis de Classroom ni el correu: el web és públic.
export const CURS_INFO = {
  any: '2026-2027',
  material: [
    'Llibreta i estoig sempre preparat quan jo arribo.',
    "Quan fem activitats en paper s'han d'enganxar o grapar a la llibreta.",
    "Per activitats puntuals caldrà utilitzar el Chromebook, que haurà d'estar carregat."
  ],
  trimestres: [
    { nom: '1r trimestre', sas: ['sa1', 'sa2'] },
    { nom: '2n trimestre', sas: ['sa3', 'sa4'] },
    { nom: '3r trimestre', sas: ['sa5', 'sa6'] }
  ],
  competencies: [
    ['C1', 'Interpretar fenòmens de la naturalesa i argumentar-los a partir de models, lleis i teories.'],
    ['C2', 'Identificar, seleccionar i organitzar la informació.'],
    ['C3', 'Seguir el mètode científic.'],
    ['C4', "Resoldre problemes mitjançant l'anàlisi crítica."],
    ['C5', 'Generar hàbits saludables i sostenibles envers el medi ambient.'],
    ['C6', 'Analitzar els elements del paisatge i veure la seva evolució.']
  ],
  // Competències transversals, amb el text de la programació didàctica.
  // Només hi ha les que la programació vincula a alguna SA.
  transversals: [
    {
      grup: 'Competència ciutadana',
      items: [
        ['CC2', 'Conèixer i assumir els valors democràtics i les lleis.'],
        ['CC3', 'Analitzar problemes socials i tractar-los des del diàleg i el respecte.'],
        ['CC4', 'Conèixer els riscos per al planeta i actuar de manera sostenible.']
      ]
    },
    {
      grup: 'Competència emprenedora',
      items: [['CE3', 'Generar idees i solucions valuoses. Prendre decisions de manera raonada.']]
    },
    {
      grup: "Competència personal, social i d'aprendre a aprendre",
      items: [
        ['CPS1', 'Expressar les emocions i regular-les de manera positiva i autònoma.'],
        ['CPS2', 'Conèixer els riscos per a la salut i consolidar hàbits saludables.'],
        ['CPS3', 'Treballar en grup comprenent i respectant els altres.', 'A les SA de treball en grup'],
        ['CPS4', "Fer autoavaluacions sobre el propi procés d'aprenentatge."]
      ]
    },
    {
      grup: 'Competència digital',
      items: [['CD2', 'Utilitzar, crear i gestionar continguts digitals per aprendre millor.']]
    }
  ],
  avaluacio: {
    text: "L'avaluació serà per competències.",
    nivells: [
      ['NA', 'No assoliment'],
      ['AS', 'Assoliment satisfactori'],
      ['AN', 'Assoliment notable'],
      ['AE', 'Assoliment excel·lent']
    ],
    nota: 'Cada prova tindrà el seu pes.'
  },
  portada: {
    camps: ['Biologia i Geologia', 'Nom i cognoms', 'Curs'],
    text: 'Podeu decorar-la amb dibuixos o imatges dels temes que treballarem.'
  }
}

export const textCompetencia = (codi) => CURS_INFO.competencies.find(([c]) => c === codi)?.[1] || ''

export const textTransversal = (codi) =>
  CURS_INFO.transversals.flatMap((g) => g.items).find(([c]) => c === codi)?.[1] || ''
