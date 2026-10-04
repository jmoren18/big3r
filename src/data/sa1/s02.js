import { pendent } from '../../pendent.js'
import { aulaBuida } from './buides.js'

export default {
  ...aulaBuida(),
  num: 2,
  titol: "Els nivells d'organització",
  tipusPerConfirmar: true,
  estat: 'feta',
  recursos: [
    { nom: 'Vídeo zoom in', url: pendent('Enllaç del vídeo') },
    { nom: 'Vídeo zoom out', url: pendent('Enllaç del vídeo') }
  ]
}
