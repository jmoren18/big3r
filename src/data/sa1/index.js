import { pendent } from '../../pendent.js'
import { sessioPerDefinir } from './buides.js'
import s01 from './s01.js'
import s02 from './s02.js'
import s03 from './s03.js'
import s04 from './s04.js'
import s05 from './s05.js'
import { jocNivells } from './joc-nivells.js'

export const sa1 = {
  id: 'sa1',
  num: 1,
  titol: 'Qui viu dins teu?',
  publicada: true,
  competencies: ['C1', 'C3', 'C5'],
  transversals: ['CPS4'],
  presentacio: pendent('Dues o tres frases per presentar la SA als alumnes'),
  producteFinal: pendent('Producte final de la SA'),

  // Sessió que toca avui. La canvia la professora cada dia de classe (un número, o null).
  // Surt marcada a la pàgina de la SA i com a botó a la portada.
  avui: 5,

  // Objectius d'aprenentatge de la SA. Cada sessió diu quins treballa (camp `objectius`)
  // i l'autoavaluació es fa amb aquesta mateixa llista. Format:
  // [{ id: 'O1', text: 'Objectiu…', competencia: 'C1', puc: 'Puc…' }, …]
  objectius: pendent(
    "Objectius d'aprenentatge de la SA1 (O1, O2…), cadascun amb la seva competència (C1, C3 o C5) i una frase «Puc…» per a l'autoavaluació"
  ),

  // 12 sessions. Les cinc primeres ja s'han fet; de la 6 a la 12 falta definir-les.
  sessions: [s01, s02, s03, s04, s05, ...[6, 7, 8, 9, 10, 11, 12].map(sessioPerDefinir)],
  jocs: [jocNivells],
  autoavaluacio: {
    descriptors: pendent('Descriptors de cada nivell (NA, AS, AN, AE) segons el PEC i les NOFC del centre')
  }
}
