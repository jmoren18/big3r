import { pendent } from '../../pendent.js'
import { aulaBuida } from './buides.js'

// La presentació del curs és a la pàgina «Com funciona el curs» (src/data/curs-info.js).
export default {
  ...aulaBuida(),
  num: 1,
  titol: 'Presentació i votació dissonant',
  estat: 'feta',
  activitat: [
    'Presentació del curs: material, com s’organitza el curs, què aprendrem i avaluació.',
    'Portada de la llibreta: Biologia i Geologia, nom i cognoms i curs. Podeu decorar-la amb dibuixos o imatges dels temes que treballarem.',
    pendent('Com va ser la votació dissonant')
  ],
  recursos: [{ nom: 'Com funciona el curs', ruta: '/curs' }]
}
