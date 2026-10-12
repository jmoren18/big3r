import { proposta } from '../../pendent.js'
import { aulaBuida } from './buides.js'

// `repte` l'ha proposat Claude (revisió del 12-10-2026): cal revisar-lo.
export default {
  ...aulaBuida(),
  num: 3,
  titol: 'Exercicis',
  estat: 'feta',
  activitat: "Practiquem els nivells d'organització amb els exercicis.",
  repte: proposta(
    "Escriu una frase falsa sobre els nivells d'organització, com les de l'exercici 5. Dona-la a un company perquè la corregeixi."
  ),
  recursos: [
    { nom: "Joc: els nivells d'organització", ruta: '/sa1/joc/nivells', nota: 'Els mateixos exercicis, amb correcció' },
    { nom: 'Repassa els nivells (sessió 2)', ruta: '/sa1/s/2' }
  ]
}
