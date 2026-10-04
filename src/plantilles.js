// Les dues plantilles de sessió. Cada fase llegeix un camp de la sessió.
// `llista: 'passos'` pinta una llista numerada; `especial` fa servir un component propi.
// Una fase que la sessió no té (per exemple `apunts`) no es pinta.
export const PLANTILLES = {
  aula: {
    nom: 'Aula',
    grup: 'Grup sencer',
    fases: [
      { clau: 'pregunta', titol: 'Per començar' },
      { clau: 'objectius', titol: 'Què aprendràs avui' },
      { clau: 'activitat', titol: 'Què farem' },
      { clau: 'apunts', titol: 'Per recordar', especial: 'apunts' },
      { clau: 'posadaEnComu', titol: 'Ho posem en comú' },
      { clau: 'recursos', titol: 'Materials', especial: 'recursos' },
      { clau: 'exitTiquet', titol: 'Exit tiquet', especial: 'exit' }
    ],
    extres: [
      { clau: 'feinaACasa', titol: 'Feina a casa' },
      { clau: 'siHasFaltat', titol: 'Si has faltat' }
    ]
  },
  laboratori: {
    nom: 'Laboratori',
    grup: 'Mig grup',
    fases: [
      { clau: 'objectiu', titol: 'Què farem avui al laboratori' },
      { clau: 'material', titol: 'Material' },
      { clau: 'normes', titol: 'Normes del laboratori' },
      { clau: 'procediment', titol: 'Pas a pas', llista: 'passos' },
      { clau: 'observa', titol: 'Observa i dibuixa' },
      { clau: 'evidencia', titol: 'Què has de lliurar' },
      { clau: 'recollim', titol: 'Recollim' },
      { clau: 'recursos', titol: 'Materials', especial: 'recursos' },
      { clau: 'exitTiquet', titol: 'Exit tiquet', especial: 'exit' }
    ],
    extres: [{ clau: 'siHasFaltat', titol: 'Si has faltat' }]
  }
}
