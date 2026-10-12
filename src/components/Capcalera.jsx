import { CONFIG } from '../config.js'
import { Enllac } from '../router.jsx'
import { usePrefs } from '../prefs.jsx'
import Icona from './Icona.jsx'

export default function Capcalera() {
  const { idioma, setIdioma } = usePrefs()
  return (
    <header className="capcalera no-imprimir">
      <Enllac a="/" className="capcalera__nom">
        <strong>{CONFIG.assignatura}</strong>
        <span>{CONFIG.centre}</span>
      </Enllac>
      <label className="idioma" htmlFor="idioma-ajuda">
        <Icona nom="idioma" className="idioma__icona" />
        <span>Ajuda d'idioma</span>
        <select id="idioma-ajuda" value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option value="">Només català</option>
          {CONFIG.idiomes.map((i) => (
            <option key={i.codi} value={i.codi} lang={i.codi}>
              {i.nom}
            </option>
          ))}
        </select>
      </label>
    </header>
  )
}

// Quan l'alumne tria un idioma, una línia curta en aquell idioma explica com funciona l'ajuda.
export function AvisIdioma() {
  const { idioma } = usePrefs()
  const info = CONFIG.idiomes.find((i) => i.codi === idioma)
  if (!info) return null
  return (
    <p className="avis-idioma no-imprimir">
      <Icona nom="idioma" />
      <span lang={info.codi} dir={info.dir}>
        {info.ajuda}
      </span>
      {CONFIG.modeRevisio ? (
        <span className="proposta">
          <span className="cinta cinta--proposta">PROPOSTA</span>
          <span className="proposta__nota">Traducció de Claude: cal validar-la</span>
        </span>
      ) : null}
    </p>
  )
}
