import { sa1 } from './sa1/index.js'

// Les sis situacions d'aprenentatge del curs. Només la SA1 està publicada;
// la resta surt a la portada com a «Pròximament».
export const SAS = [
  sa1,
  { id: 'sa2', num: 2, titol: 'Qui decideix què menges?', publicada: false },
  { id: 'sa3', num: 3, titol: 'Qui decideix què vols?', publicada: false },
  { id: 'sa4', num: 4, titol: 'Qui decideix qui ets?', publicada: false },
  { id: 'sa5', num: 5, titol: 'Qui et defensa?', publicada: false },
  { id: 'sa6', num: 6, titol: 'Qui decideix el teu paisatge?', publicada: false }
]

export const trobaSA = (id) => SAS.find((sa) => sa.id === id)
