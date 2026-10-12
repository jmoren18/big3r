import { laboratoriBuida } from './buides.js'

export default {
  ...laboratoriBuida(),
  num: 5,
  titol: 'Pràctica: la mucosa bucal',
  estat: 'feta',
  evidencia: 'La fitxa de laboratori, amb el dibuix i les preguntes curtes.',
  // Pràctica ja feta: no es fan servir les fases noves de la plantilla.
  objectius: null,
  abansDeMirar: null,
  criterisDibuix: null,
  conclusio: null
}
