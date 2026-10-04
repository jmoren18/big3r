export const CONFIG = {
  assignatura: "Biologia i Geologia, 3r d'ESO",
  centre: 'Institut Sant Quirze',
  filConductor: 'Qui decideix per tu?',
  duradaSessio: 50,

  // true  → es veuen els blocs grocs [PENDENT] (per revisar el web).
  // false → els alumnes no veuen res del que està pendent.
  modeRevisio: true,

  // Versions de cada sessió. La B és l'estàndard i la que es veu per defecte.
  versions: [
    { id: 'A', nom: 'adaptada' },
    { id: 'B', nom: 'estàndard' },
    { id: 'C', nom: 'enriquiment' }
  ],
  versioPerDefecte: 'B',

  // Idiomes de l'ajuda de traducció. `dir: 'rtl'` per als que s'escriuen de dreta a esquerra.
  idiomes: [
    { codi: 'es', nom: 'Castellano', dir: 'ltr' },
    { codi: 'uk', nom: 'Українська', dir: 'ltr' },
    { codi: 'ru', nom: 'Русский', dir: 'ltr' },
    { codi: 'ar', nom: 'العربية', dir: 'rtl' },
    { codi: 'ur', nom: 'اردو', dir: 'rtl' },
    { codi: 'hi', nom: 'हिन्दी', dir: 'ltr' },
    { codi: 'pa', nom: 'ਪੰਜਾਬੀ', dir: 'ltr' }
  ]
}
