import { createContext, useContext, useState } from 'react'
import { CONFIG } from './config.js'

// Preferències de l'alumne (versió i idioma d'ajuda). Es guarden només al seu navegador.
const desa = (clau, valor) => {
  try {
    if (valor) localStorage.setItem(clau, valor)
    else localStorage.removeItem(clau)
  } catch {
    // Sense emmagatzematge: la tria dura fins que es tanca la pàgina.
  }
}
const recupera = (clau) => {
  try {
    return localStorage.getItem(clau)
  } catch {
    return null
  }
}

const PrefsContext = createContext(null)

export function Prefs({ children }) {
  const ids = CONFIG.versions.map((v) => v.id)
  const [versio, setVersioEstat] = useState(() => {
    const v = recupera('big3r-versio')
    return ids.includes(v) ? v : CONFIG.versioPerDefecte
  })
  const [idioma, setIdiomaEstat] = useState(() => {
    const i = recupera('big3r-idioma')
    return CONFIG.idiomes.some((x) => x.codi === i) ? i : ''
  })

  const setVersio = (v) => {
    if (!ids.includes(v)) return
    setVersioEstat(v)
    desa('big3r-versio', v)
  }
  const setIdioma = (i) => {
    setIdiomaEstat(i)
    desa('big3r-idioma', i)
  }

  return <PrefsContext.Provider value={{ versio, setVersio, idioma, setIdioma }}>{children}</PrefsContext.Provider>
}

export const usePrefs = () => useContext(PrefsContext)
