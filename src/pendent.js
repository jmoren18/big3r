// Marca un contingut que encara no existeix.
// Regla del projecte: no s'inventa res. Si falta informació, es posa
// pendent('què falta') i es veu en groc mentre CONFIG.modeRevisio és true.
export const pendent = (nota = '') => ({ __pendent: true, nota })
export const esPendent = (v) => !!(v && typeof v === 'object' && v.__pendent)

// Un valor pot ser igual per a tothom o diferent per versió: { A, B, C }.
export const esPerVersio = (v) =>
  !!(v && typeof v === 'object' && !Array.isArray(v) && !v.__pendent && ('A' in v || 'B' in v || 'C' in v))

export const tria = (valor, versio) => (esPerVersio(valor) ? valor[versio] ?? valor.B ?? valor.A ?? valor.C : valor)
