export const CONFIG = {
  assignatura: "Biologia i Geologia, 3r d'ESO",
  curt: 'BiG 3r',
  centre: 'Institut Sant Quirze',
  filConductor: 'Qui decideix per tu?',
  duradaSessio: 50,

  // true  → es veuen els blocs grocs [PENDENT] i les etiquetes blaves PROPOSTA (per revisar el web).
  // false → els alumnes no veuen res del que està pendent.
  modeRevisio: true,

  // Versions de cada sessió. La B és l'estàndard i la que es veu per defecte.
  // La A és per a alumnes amb pla individualitzat o de l'aula d'acollida; la professora els hi convida.
  // A la pantalla només surt la lletra, no el nom.
  versions: [
    { id: 'A', nom: 'adaptada' },
    { id: 'B', nom: 'estàndard' },
    { id: 'C', nom: 'enriquiment' }
  ],
  versioPerDefecte: 'B',

  // Idiomes de l'ajuda de traducció. `dir: 'rtl'` per als que s'escriuen de dreta a esquerra.
  // `ajuda` és la frase que surt a dalt de la pàgina quan l'alumne tria l'idioma.
  // Les frases d'ajuda les ha proposat Claude: cal validar-les amb parlants nadius.
  idiomes: [
    { codi: 'es', nom: 'Castellano', catala: 'castellà', dir: 'ltr', ajuda: 'Toca las palabras subrayadas para ver la traducción.' },
    { codi: 'uk', nom: 'Українська', catala: 'ucraïnès', dir: 'ltr', ajuda: 'Торкнися підкреслених слів, щоб побачити переклад.' },
    { codi: 'ru', nom: 'Русский', catala: 'rus', dir: 'ltr', ajuda: 'Нажми на подчёркнутые слова, чтобы увидеть перевод.' },
    { codi: 'ar', nom: 'العربية', catala: 'àrab', dir: 'rtl', ajuda: 'اضغط على الكلمات التي تحتها خط لترى الترجمة.' },
    { codi: 'ur', nom: 'اردو', catala: 'urdú', dir: 'rtl', ajuda: 'ترجمہ دیکھنے کے لیے خط کشیدہ الفاظ کو چھوئیں۔' },
    { codi: 'hi', nom: 'हिन्दी', catala: 'hindi', dir: 'ltr', ajuda: 'अनुवाद देखने के लिए रेखांकित शब्दों को छुएँ।' },
    { codi: 'pa', nom: 'ਪੰਜਾਬੀ', catala: 'panjabi', dir: 'ltr', ajuda: 'ਅਨੁਵਾਦ ਦੇਖਣ ਲਈ ਹੇਠਾਂ ਲਕੀਰ ਵਾਲੇ ਸ਼ਬਦਾਂ ਨੂੰ ਛੂਹੋ।' }
  ]
}
