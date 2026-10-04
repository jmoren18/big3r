import { aulaBuida } from './buides.js'

export default {
  ...aulaBuida(),
  num: 3,
  titol: 'Exercicis',
  tipusPerConfirmar: true,
  estat: 'feta',
  activitat: "Practiquem els nivells d'organització amb els exercicis.",
  recursos: [
    { nom: "Joc: els nivells d'organització", ruta: '/sa1/joc/nivells', nota: 'Els mateixos exercicis, amb correcció' },
    { nom: 'Repassa els nivells (sessió 2)', ruta: '/sa1/s/2' }
  ]
}
