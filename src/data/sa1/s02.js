import { pendent, proposta } from '../../pendent.js'
import { aulaBuida } from './buides.js'
import { NIVELLS_ORGANITZACIO } from './nivells.js'

// Contingut tret de la presentació «Organització de la matèria».
// `modelFrase` i `repte` els ha proposat Claude (revisió del 12-10-2026): cal revisar-los.
export default {
  ...aulaBuida(),
  num: 2,
  titol: "Els nivells d'organització",
  estat: 'feta',
  activitat: [
    'Visualitza aquests vídeos i anota el que veus. Exemple: Escriptori > Bolígraf > Punta metàl·lica…',
    "Escriu un exemple dels vídeos per cada nivell d'organització."
  ],
  modelFrase: proposta(['Al vídeo … he vist …', '… és un exemple del nivell …']),
  repte: proposta(
    "Una ampolla de plàstic i una poma: quins nivells d'organització té cadascuna? Explica per què són diferents."
  ),
  apunts: NIVELLS_ORGANITZACIO,
  imatges: {
    apunts: pendent("Imatge de l'escala dels nivells (diapositiva 6 de «Organització de la matèria»), amb text alternatiu")
  },
  recursos: [
    { nom: "Practica amb el joc dels nivells d'organització", ruta: '/sa1/joc/nivells' },
    { nom: 'Vídeo 1: The Super Zoom', lang: 'en', url: 'https://www.youtube.com/watch?v=JlRPVobf9To', nota: 'YouTube, en anglès' },
    { nom: 'Vídeo 2: Travel Deep Inside a Leaf', lang: 'en', url: 'https://www.youtube.com/watch?v=Bf-RFPaZeAM', nota: 'YouTube, en anglès' },
    { nom: 'Vídeo 3: Cosmic Eye', lang: 'en', url: 'https://www.youtube.com/watch?v=8Are9dDbW24', nota: 'YouTube' },
    { nom: 'Cell Size and Scale', lang: 'en', url: 'https://learn.genetics.utah.edu/content/cells/scale/', nota: 'Universitat de Utah, en anglès' }
  ]
}
