import { useEffect, useRef, useState } from 'react'

// Mesura el soroll de l'aula amb el micròfon de l'ordinador. No grava ni envia res.
export default function Sonometre() {
  const [actiu, setActiu] = useState(false)
  const [error, setError] = useState('')
  const [nivell, setNivell] = useState(0)
  const [limit, setLimit] = useState(60)
  const recursos = useRef({})

  const atura = () => {
    const r = recursos.current
    if (r.raf) cancelAnimationFrame(r.raf)
    r.pista?.getTracks().forEach((t) => t.stop())
    try {
      r.ctx?.close()
    } catch {
      // res
    }
    recursos.current = {}
    setActiu(false)
    setNivell(0)
  }

  useEffect(() => atura, [])

  const activa = async () => {
    setError('')
    try {
      const pista = await navigator.mediaDevices.getUserMedia({ audio: true })
      const Ctx = window.AudioContext || window.webkitAudioContext
      const ctx = new Ctx()
      const analitzador = ctx.createAnalyser()
      analitzador.fftSize = 1024
      ctx.createMediaStreamSource(pista).connect(analitzador)
      const dades = new Float32Array(analitzador.fftSize)
      let suau = 0
      const mesura = () => {
        analitzador.getFloatTimeDomainData(dades)
        let suma = 0
        for (let i = 0; i < dades.length; i++) suma += dades[i] * dades[i]
        const rms = Math.sqrt(suma / dades.length)
        // De −60 dB (silenci) a 0 dB (màxim), passat a una escala de 0 a 100.
        const db = 20 * Math.log10(rms || 1e-6)
        const valor = Math.max(0, Math.min(100, ((db + 60) / 60) * 100))
        suau = suau * 0.85 + valor * 0.15
        setNivell(Math.round(suau))
        recursos.current.raf = requestAnimationFrame(mesura)
      }
      recursos.current = { pista, ctx }
      setActiu(true)
      mesura()
    } catch {
      setError("No s'ha pogut activar el micròfon. Dona permís al navegador i torna-ho a provar.")
    }
  }

  const massa = actiu && nivell > limit
  return (
    <div className="sonometre">
      <div className={`barra-so ${massa ? 'barra-so--massa' : ''}`} aria-hidden="true">
        <span className="barra-so__nivell" style={{ width: `${nivell}%` }} />
        <span className="barra-so__limit" style={{ left: `${limit}%` }} />
      </div>
      <p className={`estat-eina ${massa ? 'estat-eina--alerta' : ''}`} aria-live="polite">
        {!actiu ? 'El micròfon està apagat.' : massa ? 'Massa soroll. Baixem la veu.' : 'Bon nivell de veu.'}
      </p>
      <label className="lliscador" htmlFor="limit-soroll">
        <span>Límit de soroll</span>
        <input id="limit-soroll" type="range" min="20" max="95" value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <div className="fila-botons">
        {actiu ? (
          <button type="button" className="boto" onClick={atura}>
            Apaga el micròfon
          </button>
        ) : (
          <button type="button" className="boto" onClick={activa}>
            Activa el micròfon
          </button>
        )}
      </div>
      <p className="nota-eina">El so només es mesura en aquest ordinador. No es grava ni s'envia enlloc.</p>
    </div>
  )
}
