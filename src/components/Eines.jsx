import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Enllac, useRuta } from '../router.jsx'
import Icona from './Icona.jsx'

// Estat del temporitzador, compartit per tot el web: si la professora canvia de pàgina
// mentre compta, el temps continua i l'avís sona igualment.
const EinesContext = createContext(null)

export const dosDigits = (n) => String(n).padStart(2, '0')
export const format = (s) => `${dosDigits(Math.floor(s / 60))}:${dosDigits(s % 60)}`

export function EinesProvider({ children }) {
  const [total, setTotal] = useState(5 * 60)
  const [queden, setQueden] = useState(5 * 60)
  const [enMarxa, setEnMarxa] = useState(false)
  const final = useRef(0)
  const audio = useRef(null)

  const avisa = () => {
    try {
      const ctx = audio.current
      if (!ctx) return
      ;[0, 0.35, 0.7].forEach((quan) => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.frequency.value = 880
        g.gain.setValueAtTime(0.25, ctx.currentTime + quan)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + quan + 0.25)
        o.connect(g).connect(ctx.destination)
        o.start(ctx.currentTime + quan)
        o.stop(ctx.currentTime + quan + 0.26)
      })
    } catch {
      // Sense so: el temps a zero ja es veu a la pantalla.
    }
  }

  useEffect(() => {
    if (!enMarxa) return
    const id = setInterval(() => {
      const resta = Math.max(0, Math.round((final.current - Date.now()) / 1000))
      setQueden(resta)
      if (resta === 0) {
        setEnMarxa(false)
        avisa()
      }
    }, 250)
    return () => clearInterval(id)
  }, [enMarxa])

  const tria = useCallback((minuts) => {
    setEnMarxa(false)
    setTotal(minuts * 60)
    setQueden(minuts * 60)
  }, [])

  const comenca = () => {
    if (queden === 0) return
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (Ctx && !audio.current) audio.current = new Ctx()
      audio.current?.resume?.()
    } catch {
      // res
    }
    final.current = Date.now() + queden * 1000
    setEnMarxa(true)
  }

  const atura = () => setEnMarxa(false)

  const afegeixMinut = () => {
    const nou = queden + 60
    setQueden(nou)
    setTotal((t) => Math.max(t, nou))
    if (enMarxa) final.current += 60000
  }

  return (
    <EinesContext.Provider value={{ total, queden, enMarxa, tria, comenca, atura, afegeixMinut }}>
      {children}
    </EinesContext.Provider>
  )
}

export const useTemporitzador = () => useContext(EinesContext)

// Quan el temporitzador compta i la professora és en una altra pàgina, en surt el temps
// en una píndola petita. Als ordinadors dels alumnes no surt mai, perquè no el posen en marxa.
export function PindolaTemps() {
  const { queden, enMarxa } = useTemporitzador()
  const { ruta } = useRuta()
  if (!enMarxa || ruta === '/aula') return null
  return (
    <Enllac a="/aula" className="pindola-temps no-imprimir" aria-label={`Temporitzador: queden ${format(queden)}`}>
      <Icona nom="temporitzador" />
      <span>{format(queden)}</span>
    </Enllac>
  )
}
