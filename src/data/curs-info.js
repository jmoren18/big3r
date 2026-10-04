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
