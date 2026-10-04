import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Encaminador mínim basat en el hash (#/sa1/s/5). Funciona a GitHub Pages
// sense cap configuració del servidor.
const llegeix = () => {
  try {
    const h = window.location.hash.replace(/^#/, '')
    return h.startsWith('/') ? h : '/'
  } catch {
    return '/'
  }
}

const RutaContext = createContext({ ruta: '/', navega: () => {} })

export function Encaminador({ children }) {
  const [ruta, setRuta] = useState(llegeix)

  useEffect(() => {
    const quanCanvia = () => setRuta(llegeix())
    window.addEventListener('hashchange', quanCanvia)
    return () => window.removeEventListener('hashchange', quanCanvia)
  }, [])

  const navega = useCallback((desti) => {
    setRuta(desti)
    try {
      window.location.hash = desti
    } catch {
      // Si el navegador no deixa canviar l'adreça, la pàgina canvia igualment.
    }
    try {
      window.scrollTo(0, 0)
    } catch {
      // res
    }
  }, [])

  return <RutaContext.Provider value={{ ruta, navega }}>{children}</RutaContext.Provider>
}

export const useRuta = () => useContext(RutaContext)

export function Enllac({ a, className, children, ...resta }) {
  const { navega } = useRuta()
  return (
    <a
      href={`#${a}`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navega(a)
      }}
      {...resta}
    >
      {children}
    </a>
  )
}
