import { CONFIG } from '../config.js'
import { GLOSSARI } from '../data/glossari.js'
import { usePrefs } from '../prefs.jsx'

const escapa = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const FORMES = GLOSSARI.flatMap((entrada) => entrada.formes.map((f) => [f.toLowerCase(), entrada])).sort(
  (a, b) => b[0].length - a[0].length
)
const PER_FORMA = new Map(FORMES)
// Paraula sencera: abans i després no hi pot haver cap lletra ni punt volat.
const PATRO = new RegExp(`(^|[^\\p{L}·])(${FORMES.map(([f]) => escapa(f)).join('|')})(?![\\p{L}·])`, 'giu')

// Pinta un text i, si l'alumne ha triat idioma, subratlla les paraules del glossari.
export default function Text({ children }) {
  const { idioma } = usePrefs()
  const text = Array.isArray(children) ? children.join('') : String(children ?? '')
  if (!idioma) return text

  const info = CONFIG.idiomes.find((i) => i.codi === idioma)
  const trossos = []
  let darrer = 0
  for (const m of text.matchAll(PATRO)) {
    const inici = m.index + m[1].length
    const traduccio = PER_FORMA.get(m[2].toLowerCase())?.[idioma]
    if (!traduccio) continue
    if (inici > darrer) trossos.push(text.slice(darrer, inici))
    trossos.push(
      <span className="terme" tabIndex={0} key={inici}>
        {m[2]}
        <span className="terme__tr" lang={idioma} dir={info?.dir || 'ltr'}>
          {traduccio}
        </span>
      </span>
    )
    darrer = inici + m[2].length
  }
  if (darrer < text.length) trossos.push(text.slice(darrer))
  return trossos
}
