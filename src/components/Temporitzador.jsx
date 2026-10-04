import { useEffect, useRef, useState } from 'react'

const MINUTS = [1, 2, 5, 10]
const dosDigits = (n) => String(n).padStart(2, '0')

export default function Temporitzador() {
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

  const tria = (minuts) => {
    setEnMarxa(false)
    setTotal(minuts * 60)
    setQueden(minuts * 60)
  }

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

  const acabat = queden === 0
  return (
    <div className="temporitzador">
      <p className={`rellotge ${acabat ? 'rellotge--acabat' : ''}`} role="timer" aria-live="off">
        {dosDigits(Math.floor(queden / 60))}:{dosDigits(queden % 60)}
      </p>
      {acabat ? <p className="estat-eina">S'ha acabat el temps.</p> : null}
      <div className="fila-botons" role="group" aria-label="Minuts">
        {MINUTS.map((m) => (
          <button key={m} type="button" className="boto boto--suau" aria-pressed={total === m * 60} onClick={() => tria(m)}>
            {m} min
          </button>
        ))}
        <button
          type="button"
          className="boto boto--suau"
          onClick={() => {
            const nou = queden + 60
            setQueden(nou)
            setTotal((t) => Math.max(t, nou))
            if (enMarxa) final.current += 60000
          }}
        >
          Afegeix 1 min
        </button>
      </div>
      <div className="fila-botons">
        {enMarxa ? (
          <button type="button" className="boto" onClick={() => setEnMarxa(false)}>
            Atura
          </button>
        ) : (
          <button type="button" className="boto" onClick={comenca} disabled={acabat}>
            Comença
          </button>
        )}
        <button type="button" className="boto boto--suau" onClick={() => tria(total / 60)}>
          Torna a començar
        </button>
      </div>
    </div>
  )
}
