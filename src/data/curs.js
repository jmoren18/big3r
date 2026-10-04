import { sa1 } from './sa1/index.js'

// Les sis situacions d'aprenentatge del curs. Només la SA1 està publicada;
// la resta surt a la portada com a «Pròximament».
//
// `competencies`: competències específiques que es treballen a cada SA, segons la
// programació didàctica de BiG 3r 2026-2027 (columna «Situacions d'aprenentatge»
// de cada CE). C1…C6 són les CE1…CE6 amb el text per a l'alumnat (curs-info.js).
export const SAS = [
  sa1,
  { id: 'sa2', num: 2, titol: 'Qui decideix què menges?', publicada: false, competencies: ['C1', 'C3', 'C4', 'C5'] },
  { id: 'sa3', num: 3, titol: 'Qui decideix què vols?', publicada: false, competencies: ['C2', 'C3', 'C4', 'C5'] },
  { id: 'sa4', num: 4, titol: 'Qui decideix qui ets?', publicada: false, competencies: ['C1', 'C2', 'C5'] },
  { id: 'sa5', num: 5, titol: 'Qui et defensa?', publicada: false, competencies: ['C2', 'C3', 'C4'] },
  {
    id: 'sa6',
    num: 6,
    titol: 'Qui decideix el teu paisatge?',
    publicada: false,
    competencies: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']
  }
]

export const sasDeCompetencia = (codi) => SAS.filter((sa) => (sa.competencies || []).includes(codi))

export const trobaSA = (id) => SAS.find((sa) => sa.id === id)
