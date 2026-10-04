import { CONFIG } from '../config.js'
import { Enllac } from '../router.jsx'
import { usePrefs } from '../prefs.jsx'

export function SelectorVersio() {
  const { versio, setVersio } = usePrefs()
  return (
    <div className="versions" role="group" aria-label="Versió de la sessió">
      <span className="versions__titol">Versió</span>
      {CONFIG.versions.map((v) => (
        <button
          key={v.id}
          type="button"
          aria-pressed={versio === v.id}
          aria-label={`Versió ${v.id}, ${v.nom}`}
          title={v.nom}
          onClick={() => setVersio(v.id)}
        >
          {v.id}
        </button>
      ))}
      <span className="versions__nom">{CONFIG.versions.find((v) => v.id === versio)?.nom}</span>
    </div>
  )
}

export default function Capcalera() {
  const { idioma, setIdioma } = usePrefs()
  return (
    <header className="capcalera no-imprimir">
      <Enllac a="/" className="capcalera__nom">
        <strong>{CONFIG.assignatura}</strong>
        <span>{CONFIG.centre}</span>
      </Enllac>
      <div className="capcalera__eines">
        <label className="idioma" htmlFor="idioma-ajuda">
          <span>Ajuda d'idioma</span>
          <select id="idioma-ajuda" value={idioma} onChange={(e) => setIdioma(e.target.value)}>
            <option value="">Només català</option>
            {CONFIG.idiomes.map((i) => (
              <option key={i.codi} value={i.codi}>
                {i.nom}
              </option>
            ))}
          </select>
        </label>
        <SelectorVersio />
      </div>
    </header>
  )
}
