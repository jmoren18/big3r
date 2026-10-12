import { pendent } from '../../pendent.js'

// Camps que es poden afegir a qualsevol sessió (tots opcionals):
// - `pregunta`: text, o { company: 'Frase que diu un company', pregunta: 'Té raó? Per què?' }.
// - `objectius`: llista dels objectius de la SA que es treballen, per exemple ['O1', 'O3'].
//   Els objectius s'escriuen a `objectius` de la SA (index.js). Si una versió en necessita
//   uns altres (pla individualitzat), es pot posar { A: [...], B: [...], C: [...] }.
// - `modelFrase`: llista d'inicis de frase per escriure. A la versió A surten oberts;
//   a la B i la C, plegats.
// - `repte`: només el veu la versió C. Ha de demanar justificar, transferir o connectar,
//   no fer més exercicis.
// - `imatges`: una imatge per fase, per exemple { apunts: { src: 'imatges/escala.png',
//   alt: 'Què es veu a la imatge', peu: 'Text curt sota la imatge', credit: 'Autor, llicència' } }.
//   Les imatges van a la carpeta `public/imatges/`.

// Exit tiquet: per defecte es respon en paper. Si un dia cal fer-lo amb
// formulari, es posa l'enllaç a `formulari` i surt el botó «Respon al formulari».

// Sessió d'aula amb tots els camps pendents. Cada sessió en sobreescriu el que ja se sap.
export const aulaBuida = () => ({
  tipus: 'aula',
  pregunta: pendent('Pregunta o repte per obrir la sessió. Es pot fer amb el format «Un company diu…»'),
  objectius: pendent('Quins objectius de la SA es treballen (O1, O2…)'),
  activitat: pendent('Què fan els alumnes i com s’organitzen'),
  recursos: pendent('Fitxes, presentacions i enllaços'),
  repte: pendent('Repte de la versió C: justificar, transferir o connectar amb la pregunta de la SA'),
  posadaEnComu: pendent('Com es tanca l’activitat'),
  exitTiquet: { preguntes: pendent('Preguntes de l’exit tiquet'), formulari: null },
  feinaACasa: pendent('Feina a casa, si n’hi ha'),
  siHasFaltat: pendent('Què ha de fer qui ha faltat')
})

// Sessió de laboratori amb tots els camps pendents.
export const laboratoriBuida = () => ({
  tipus: 'laboratori',
  objectiu: pendent('Objectiu de la pràctica'),
  objectius: pendent('Quins objectius de la SA es treballen (O1, O2…)'),
  material: pendent('Llista de material'),
  normes: pendent('Normes de seguretat i de treball al laboratori'),
  abansDeMirar: pendent('Predicció: què creus que veuràs? Es pot fer amb el format «Un company diu…»'),
  procediment: pendent('Passos de la pràctica'),
  recursos: pendent('Fitxa de laboratori i enllaços'),
  observa: pendent('Què han d’observar i dibuixar'),
  criterisDibuix: pendent('Com ha de ser el dibuix científic (llista de criteris)'),
  evidencia: pendent('Què es lliura'),
  conclusio: pendent('Preguntes de conclusió i connexió amb la pregunta de la SA'),
  recollim: pendent('Com es recull el material'),
  exitTiquet: { preguntes: pendent('Preguntes de l’exit tiquet'), formulari: null },
  siHasFaltat: pendent('Què ha de fer qui ha faltat')
})

// Sessió de la qual encara no se sap res. Si no es diu el contrari, és d'aula.
export const sessioPerDefinir = (num) => ({
  ...aulaBuida(),
  num,
  titol: pendent(`Títol de la sessió ${num}`),
  estat: 'pendent'
})
