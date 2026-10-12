import { laboratoriBuida } from './buides.js'

export default {
  ...laboratoriBuida(),
  num: 5,
  titol: 'Pràctica: la mucosa bucal',
  estat: 'feta',
  evidencia: 'La fitxa de laboratori, amb el dibuix i les preguntes curtes.',
  // Fotos de la pràctica que va enviar la professora. Serveixen per fer el dibuix si has faltat.
  // El peu i el text alternatiu els ha proposat Claude (12-10-2026): cal revisar-los.
  imatges: {
    observa: [
      {
        src: 'imatges/mucosa-bucal-1.jpg',
        alt: 'Cèl·lules de la mucosa bucal tenyides de blau, vistes al microscopi. Al centre hi ha una cèl·lula aplanada amb el nucli blau fosc al mig.',
        peu: 'Una cèl·lula de la mucosa bucal. El punt blau fosc del mig és el nucli.',
        revisar: true
      },
      {
        src: 'imatges/mucosa-bucal-2.jpg',
        alt: 'Moltes cèl·lules de la mucosa bucal tenyides de blau, vistes amb menys augments. Cada cèl·lula té un nucli petit i fosc.',
        peu: 'Moltes cèl·lules, vistes amb menys augments.',
        revisar: true
      }
    ]
  },
  // Pràctica ja feta: no es fan servir les fases noves de la plantilla.
  objectius: null,
  abansDeMirar: null,
  criterisDibuix: null,
  conclusio: null
}
