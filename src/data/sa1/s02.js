import { aulaBuida } from './buides.js'
import { NIVELLS_ORGANITZACIO } from './nivells.js'

// Contingut tret de la presentació «Organització de la matèria».
export default {
  ...aulaBuida(),
  num: 2,
  titol: "Els nivells d'organització",
  estat: 'feta',
  activitat: [
    'Visualitza aquests vídeos i anota el que veus. Exemple: Escriptori > Bolígraf > Punta metàl·lica…',
    "Escriu un exemple dels vídeos per cada nivell d'organització."
  ],
  apunts: NIVELLS_ORGANITZACIO,
  recursos: [
    { nom: 'Vídeo 1: The Super Zoom', url: 'https://www.youtube.com/watch?v=JlRPVobf9To', nota: 'YouTube, en anglès' },
    { nom: 'Vídeo 2: Travel Deep Inside a Leaf', url: 'https://www.youtube.com/watch?v=Bf-RFPaZeAM', nota: 'YouTube, en anglès' },
    { nom: 'Vídeo 3: Cosmic Eye', url: 'https://www.youtube.com/watch?v=8Are9dDbW24', nota: 'YouTube' },
    { nom: 'Cell Size and Scale', url: 'https://learn.genetics.utah.edu/content/cells/scale/', nota: 'Universitat de Utah, en anglès' },
    { nom: "Practica amb el joc dels nivells d'organització", ruta: '/sa1/joc/nivells' }
  ]
}
