import { useEffect, useRef, useState } from 'react'

// Mesura el soroll de l'aula amb el micròfon de l'ordinador. No grava ni envia res.
// Es demana el so sense els filtres de videotrucada (cancel·lació d'eco, supressió de
// soroll i control automàtic de guany), que rebaixarien precisament el soroll de l'aula.
const SENSE_FILTRES = { echoCancellation: false, noiseSuppression: false, autoGainControl: false }

const MISSATGES = {
  NotAllowedError:
    "El navegador té el micròfon bloquejat. Fes clic a la icona de la barra d'adreces, tria Micròfon → Permet i torna a carregar la pàgina. Si l'ordinador és del centre, potser l'ha bloquejat l'administrador.",
  SecurityError: "El navegador no deixa fer servir el micròfon en aquesta pàgina.",
  NotFoundError: 'No es troba cap micròfon en aquest ordinador.',
  NotReadableError: 'Una altra aplicació fa servir el micròfon. Tanca-la i torna-ho a provar.'
}

export default function Sonometre() {
  const [estat, setEstat] = useState('apagat') // apagat · esperant · actiu
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
    setEstat('apagat')
    setNivell(0)
  }

  useEffect(() => atura, [])

  const demana = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({ audio: SENSE_FILTRES })
    } catch (e) {
      // Alguns navegadors no accepten les opcions: es torna a provar sense.
      if (e?.name === 'OverconstrainedError' || e?.name === 'TypeError') return navigator.mediaDevices.getUserMedia({ audio: true })
      throw e
    }
  }

  const activa = async () => {
    setError('')
    setEstat('esperant')
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw Object.assign(new Error(), { name: 'SecurityError' })
      const pista = await demana()
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
      setEstat('actiu')
      mesura()
    } catch (e) {
      setEstat('apagat')
      setError(MISSATGES[e?.name] || "No s'ha pogut activar el micròfon. Torna-ho a provar.")
    }
  }

  const actiu = estat === 'actiu'
  const massa = actiu && nivell > limit
  return (
    <div className="sonometre">
      <div className={`barra-so ${massa ? 'barra-so--massa' : ''}`} aria-hidden="true">
        <span className="barra-so__nivell" style={{ width: `${nivell}%` }} />
        <span className="barra-so__limit" style={{ left: `${limit}%` }} />
      </div>
      <p className={`estat-eina estat-eina--gran ${massa ? 'estat-eina--alerta' : actiu ? '' : 'estat-eina--apagat'}`} aria-live="polite">
        {estat === 'esperant'
          ? 'Esperant el permís del micròfon…'
          : !actiu
            ? 'El micròfon està apagat.'
            : massa
              ? 'Massa soroll. Baixem la veu.'
              : 'Bon nivell de veu.'}
      </p>
      <label className="lliscador" htmlFor="limit-soroll">
        <span>Límit de soroll</span>
        <input id="limit-soroll" type="range" min="20" max="95" value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
      </label>
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="fila-botons">
        {actiu ? (
          <button type="button" className="boto" onClick={atura}>
            Apaga el micròfon
          </button>
        ) : (
          <button type="button" className="boto" onClick={activa} disabled={estat === 'esperant'}>
            Activa el micròfon
          </button>
        )}
      </div>
      <p className="nota-eina">El so només es mesura en aquest ordinador. No es grava ni s'envia enlloc.</p>
    </div>
  )
}
