import { useEffect, useState } from 'react'

// Desa un estat a sessionStorage: aguanta un refresc, el botó Enrere o una pestanya
// que el Chromebook ha descartat, i s'esborra en tancar la pestanya. No surt de l'ordinador.
const llegeix = (clau) => {
  try {
    const t = sessionStorage.getItem(clau)
    return t == null ? undefined : JSON.parse(t)
  } catch {
    return undefined
  }
}

export const esborra = (prefix) => {
  try {
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => sessionStorage.removeItem(k))
  } catch {
    // Sense emmagatzematge: no hi ha res a esborrar.
  }
}

// `valid` comprova que el que hi havia desat encara encaixa amb les dades (per si han canviat).
export function useDesat(clau, inicial, valid = () => true) {
  const [valor, setValor] = useState(() => {
    const desat = llegeix(clau)
    if (desat !== undefined && valid(desat)) return desat
    return typeof inicial === 'function' ? inicial() : inicial
  })
  useEffect(() => {
    try {
      sessionStorage.setItem(clau, JSON.stringify(valor))
    } catch {
      // Sense emmagatzematge: l'estat dura fins que es tanca la pàgina.
    }
  }, [clau, valor])
  return [valor, setValor]
}
