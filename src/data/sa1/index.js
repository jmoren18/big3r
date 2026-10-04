import { pendent } from '../../pendent.js'
import { sessioPerDefinir } from './buides.js'
import s01 from './s01.js'
import s02 from './s02.js'
import s03 from './s03.js'
import s04 from './s04.js'
import s05 from './s05.js'

export const sa1 = {
  id: 'sa1',
  num: 1,
  titol: 'Qui viu dins teu?',
  publicada: true,
  presentacio: pendent('Dues o tres frases per presentar la SA als alumnes'),
  producteFinal: pendent('Producte final de la SA'),
  // 12 sessions. Les cinc primeres ja s'han fet; de la 6 a la 12 falta definir-les.
  sessions: [s01, s02, s03, s04, s05, ...[6, 7, 8, 9, 10, 11, 12].map(sessioPerDefinir)],
  autoavaluacio: {
    objectius: pendent("Objectius d'aprenentatge de la SA1 que l'alumne s'autoavalua")
  }
}
