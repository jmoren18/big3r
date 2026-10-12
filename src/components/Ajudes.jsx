import { useMemo } from 'react'
import { CONFIG } from '../config.js'
import { esPendent, esPropostaTriada, tria } from '../pendent.js'
import { usePrefs } from '../prefs.jsx'
import Icona from './Icona.jsx'
import Pendent from './Pendent.jsx'
import Text, { termesDelText } from './Text.jsx'

// Etiqueta blava per al contingut que ha proposat Claude. Només es veu en mode revisió.
export function MarcaProposta({ nota = 'Ho ha proposat Claude. Revisa-ho.' }) {
  if (!CONFIG.modeRevisio) return null
  return (
    <span className="proposta">
      <span className="cinta cinta--proposta">PROPOSTA</span>
      <span className="proposta__nota">{nota}</span>
    </span>
  )
}

// Selector de versió. Només surt a les pàgines on la versió canvia alguna cosa.
// Mostra només la lletra: la professora convida cada alumne a la seva versió.
export function SelectorVersio() {
  const { versio, setVersio } = usePrefs()
  return (
    <div className="versions no-imprimir" role="group" aria-label="Versió">
      <span className="versions__titol">Versió</span>
      {CONFIG.versions.map((v) => (
        <button key={v.id} type="button" aria-pressed={versio === v.id} aria-label={`Versió ${v.id}`} onClick={() => setVersio(v.id)}>
          {v.id}
        </button>
      ))}
    </div>
  )
}

// Inicis de frase per escriure. A la versió A surten oberts; a la B i la C, plegats.
export function ModelFrase({ valor }) {
  const { versio } = usePrefs()
  const v = tria(valor, versio)
  if (v == null) return null
  if (esPendent(v)) return <Pendent nota={v.nota} />
  const frases = Array.isArray(v) ? v : [v]
  const cos = (
    <>
      <ul className="model-frase">
        {frases.map((f) => (
          <li key={f}>
            <Text>{f}</Text>
          </li>
        ))}
      </ul>
      {esPropostaTriada(valor, versio) ? <MarcaProposta /> : null}
    </>
  )
  if (versio === 'A') {
    return (
      <div className="ajuda-frase">
        <p className="ajuda-frase__titol">Per escriure, pots començar així:</p>
        {cos}
      </div>
    )
  }
  return (
    <details className="ajuda-frase">
      <summary>Necessites ajuda per començar a escriure?</summary>
      {cos}
    </details>
  )
}

// Imatge d'una fase o d'un exercici: { src, alt, peu, credit }.
export function Imatge({ valor }) {
  if (valor == null) return null
  if (esPendent(valor)) return <Pendent nota={valor.nota} />
  return (
    <figure className="imatge">
      <img src={valor.src} alt={valor.alt || ''} loading="lazy" />
      {valor.peu || valor.credit ? (
        <figcaption>
          {valor.peu ? <Text>{valor.peu}</Text> : null}
          {valor.credit ? <span className="imatge__credit">{valor.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}

// Camps que no es veuen a la pàgina (o que donarien la resposta) i que el banc de paraules no ha de llegir.
const NO_ES_LLEGEIX = new Set([
  'url', 'ruta', 'src', 'id', 'tipus', 'estat', 'num', 'lang', 'formulari', 'credit', 'imatges',
  'respostes', 'resposta', 'ordre', 'model', 'correccio', 'grup', 'pista', 'frase', 'modelFrase'
])

function recull(valor, versio, sortida) {
  const v = tria(valor, versio)
  if (v == null || esPendent(v) || typeof v === 'function') return
  if (typeof v === 'string') {
    for (const t of termesDelText(v)) if (!sortida.includes(t)) sortida.push(t)
  } else if (Array.isArray(v)) {
    v.forEach((x) => recull(x, versio, sortida))
  } else if (typeof v === 'object') {
    for (const [clau, x] of Object.entries(v)) {
      // El repte només el veu la versió C.
      if (NO_ES_LLEGEIX.has(clau) || (clau === 'repte' && versio !== 'C')) continue
      recull(x, versio, sortida)
    }
  }
}

// Banc de paraules: les paraules del glossari que surten a la pàgina, en català i traduïdes.
// Surt quan l'alumne ha triat un idioma, i sempre a la versió A (obert).
export function Paraules({ font }) {
  const { idioma, versio } = usePrefs()
  const termes = useMemo(() => {
    const sortida = []
    recull(font, versio, sortida)
    return sortida
  }, [font, versio])
  if (!termes.length || (!idioma && versio !== 'A')) return null
  const info = CONFIG.idiomes.find((i) => i.codi === idioma)
  return (
    <details className="paraules-pagina" open={versio === 'A'}>
      <summary>
        <Icona nom="paraules" />
        Paraules d'aquesta pàgina
      </summary>
      <table>
        <thead>
          <tr>
            <th scope="col">Català</th>
            {info ? (
              <th scope="col" lang={info.codi} dir={info.dir}>
                {info.nom}
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {termes.map((t) => (
            <tr key={t.formes[0]}>
              <td>{t.formes[0]}</td>
              {info ? (
                <td lang={info.codi} dir={info.dir}>
                  {t[info.codi]}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  )
}
