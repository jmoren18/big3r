import { pendent } from './pendent.js'

export const CONFIG = {
  assignatura: "Biologia i Geologia, 3r d'ESO",
  centre: 'Institut Sant Quirze',
  filConductor: 'Qui decideix per tu?',
  duradaSessio: 50,

  // true  → es veuen els blocs grocs [PENDENT] (per revisar el web).
  // false → els alumnes no veuen res del que està pendent.
  modeRevisio: true,

  // Versions de cada sessió. El significat de cada versió l'ha de confirmar la professora.
  versions: [
    { id: 'A', descripcio: pendent('Què vol dir la versió A') },
    { id: 'B', descripcio: pendent('Què vol dir la versió B') },
    { id: 'C', descripcio: pendent('Què vol dir la versió C') }
  ],
  versioPerDefecte: 'B',

  // Idiomes de l'ajuda de traducció. Només hi ha el castellà com a mostra:
  // la llista real d'idiomes està pendent de confirmar.
  idiomes: [{ codi: 'es', nom: 'Castellano', dir: 'ltr' }]
}
