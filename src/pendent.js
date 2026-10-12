// Marca un contingut que encara no existeix.
// Regla del projecte: no s'inventa res. Si falta informació, es posa
// pendent('què falta') i es veu en groc mentre CONFIG.modeRevisio és true.
export const pendent = (nota = '') => ({ __pendent: true, nota })
export const esPendent = (v) => !!(v && typeof v === 'object' && v.__pendent)

// Marca un contingut que ha proposat Claude a petició de la professora i que ella
// encara ha de revisar. Els alumnes el veuen normal; en mode revisió porta
// l'etiqueta blava «PROPOSTA». Quan la professora l'aprova, n'hi ha prou de
// treure el `proposta(...)` i deixar-hi només el valor.
export const proposta = (valor) => ({ __proposta: true, valor })
export const esProposta = (v) => !!(v && typeof v === 'object' && v.__proposta)
const desfes = (v) => (esProposta(v) ? v.valor : v)

// Un valor pot ser igual per a tothom o diferent per versió: { A, B, C }.
export const esPerVersio = (v) => {
  const x = desfes(v)
  return !!(x && typeof x === 'object' && !Array.isArray(x) && !x.__pendent && ('A' in x || 'B' in x || 'C' in x))
}

const triaVersio = (x, versio) => (esPerVersio(x) ? (versio in x ? x[versio] : x.B ?? x.A ?? x.C) : x)

export const tria = (valor, versio) => desfes(triaVersio(desfes(valor), versio))

// Diu si el valor que veu l'alumne en aquesta versió és una proposta per revisar.
export const esPropostaTriada = (valor, versio) => esProposta(valor) || esProposta(triaVersio(desfes(valor), versio))
