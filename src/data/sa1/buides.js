import { pendent } from '../../pendent.js'

// Exit tiquet: per defecte es respon en paper. Si un dia cal fer-lo amb
// formulari, es posa l'enllaç a `formulari` i surt el botó «Respon al formulari».
const perVersio = (que) => ({
  A: pendent(`${que} (versió A)`),
  B: pendent(`${que} (versió B)`),
  C: pendent(`${que} (versió C)`)
})

// Sessió d'aula amb tots els camps pendents. Cada sessió en sobreescriu el que ja se sap.
export const aulaBuida = () => ({
  tipus: 'aula',
  pregunta: pendent('Pregunta o repte per obrir la sessió'),
  objectius: perVersio('Objectius d’aprenentatge'),
  activitat: pendent('Què fan els alumnes i com s’organitzen'),
  posadaEnComu: pendent('Com es tanca l’activitat'),
  recursos: pendent('Fitxes, presentacions i enllaços'),
  exitTiquet: { preguntes: pendent('Preguntes de l’exit tiquet'), formulari: null },
  feinaACasa: pendent('Feina a casa, si n’hi ha'),
  siHasFaltat: pendent('Què ha de fer qui ha faltat')
})

// Sessió de laboratori amb tots els camps pendents.
export const laboratoriBuida = () => ({
  tipus: 'laboratori',
  objectiu: pendent('Objectiu de la pràctica'),
  material: pendent('Llista de material'),
  normes: pendent('Normes de seguretat i de treball al laboratori'),
  procediment: pendent('Passos de la pràctica'),
  observa: pendent('Què han d’observar i dibuixar'),
  evidencia: pendent('Què es lliura'),
  recollim: pendent('Com es recull el material'),
  recursos: pendent('Fitxa de laboratori i enllaços'),
  exitTiquet: { preguntes: pendent('Preguntes de l’exit tiquet'), formulari: null },
  siHasFaltat: pendent('Què ha de fer qui ha faltat')
})

// Sessió de la qual encara no se sap res.
export const sessioPerDefinir = (num) => ({
  num,
  titol: pendent(`Títol de la sessió ${num}`),
  tipus: null,
  estat: 'pendent'
})
