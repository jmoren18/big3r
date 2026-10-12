import { proposta } from './pendent.js'

// Les dues plantilles de sessió. Cada fase llegeix un camp de la sessió.
// `llista: 'passos'` pinta una llista numerada; `especial` fa servir un component propi.
// `icona` és el pictograma que surt al costat del títol (src/components/Icona.jsx).
// Una fase que la sessió no té (camp absent o `null`) no es pinta.
//
// Fases automàtiques (no cal omplir-les):
// - `recordes`: 3 preguntes a l'atzar dels jocs de sessions anteriors.
// - `tornem`: torna a mostrar la pregunta de «Per començar» al final.
export const PLANTILLES = {
  aula: {
    nom: 'Aula',
    grup: 'Grup sencer',
    fases: [
      { clau: 'pregunta', titol: 'Per començar', icona: 'pregunta', especial: 'pregunta' },
      { clau: 'recordes', titol: 'Recordes?', icona: 'recordes', especial: 'recordes' },
      { clau: 'objectius', titol: 'Què aprendràs avui', icona: 'objectius', especial: 'objectius' },
      { clau: 'activitat', titol: 'Què farem', icona: 'activitat', especial: 'activitat' },
      { clau: 'recursos', titol: 'Materials', icona: 'recursos', especial: 'recursos' },
      { clau: 'repte', titol: 'Repte', icona: 'repte', especial: 'repte' },
      { clau: 'apunts', titol: 'Per recordar', icona: 'apunts', especial: 'apunts' },
      { clau: 'posadaEnComu', titol: 'Ho posem en comú', icona: 'posadaEnComu' },
      { clau: 'tornem', titol: 'Tornem a la pregunta', icona: 'tornem', especial: 'tornem' },
      { clau: 'exitTiquet', titol: 'Exit tiquet', icona: 'exitTiquet', especial: 'exit' }
    ],
    extres: [
      { clau: 'feinaACasa', titol: 'Feina a casa', icona: 'feinaACasa' },
      { clau: 'siHasFaltat', titol: 'Si has faltat', icona: 'siHasFaltat' }
    ]
  },
  laboratori: {
    nom: 'Laboratori',
    grup: 'Mig grup',
    fases: [
      { clau: 'objectiu', titol: 'Què farem avui al laboratori', icona: 'laboratori' },
      { clau: 'objectius', titol: 'Què aprendràs avui', icona: 'objectius', especial: 'objectius' },
      { clau: 'material', titol: 'Material', icona: 'material' },
      { clau: 'normes', titol: 'Normes del laboratori', icona: 'normes' },
      { clau: 'abansDeMirar', titol: 'Abans de mirar', icona: 'pregunta', especial: 'pregunta' },
      { clau: 'procediment', titol: 'Pas a pas', icona: 'passos', llista: 'passos' },
      { clau: 'recursos', titol: 'Fitxa i materials', icona: 'recursos', especial: 'recursos' },
      { clau: 'observa', titol: 'Observa i dibuixa', icona: 'observa' },
      { clau: 'criterisDibuix', titol: 'Com ha de ser el dibuix', icona: 'dibuix', llista: 'punts' },
      { clau: 'evidencia', titol: 'Què has de lliurar', icona: 'evidencia' },
      { clau: 'conclusio', titol: 'Què en traiem', icona: 'conclusio' },
      { clau: 'recollim', titol: 'Recollim', icona: 'recollim' },
      { clau: 'exitTiquet', titol: 'Exit tiquet', icona: 'exitTiquet', especial: 'exit' }
    ],
    extres: [{ clau: 'siHasFaltat', titol: 'Si has faltat', icona: 'siHasFaltat' }]
  }
}

// Línia de regulació que surt al final de cada exit tiquet.
// La va demanar la professora (revisió del 12-10-2026) i la va redactar Claude: cal revisar-la.
export const REGULACIO = proposta('Al final del paper, completa també: «Avui he après…» i «Encara no entenc bé…».')
