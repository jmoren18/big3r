import { CONFIG } from '../config.js'
import { GLOSSARI } from '../data/glossari.js'
import { usePrefs } from '../prefs.jsx'

const escapa = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const FORMES = GLOSSARI.flatMap((entrada) => entrada.formes.map((f) => [f.toLowerCase(), entrada])).sort(
  (a, b) => b[0].length - a[0].length
)
const PER_FORMA = new Map(FORMES)
// Paraula sencera: abans i després no hi pot haver cap lletra ni punt volat.
const patro = () => new RegExp(`(^|[^\\p{L}·])(${FORMES.map(([f]) => escapa(f)).join('|')})(?![\\p{L}·])`, 'giu')
const PATRO = patro()

// Entrades del glossari que surten en un text, en l'ordre en què apareixen.
export function termesDelText(text) {
  const vistes = []
  for (const m of String(text ?? '').matchAll(patro())) {
    const entrada = PER_FORMA.get(m[2].toLowerCase())
    if (entrada && !vistes.includes(entrada)) vistes.push(entrada)
  }
  return vistes
}

// Pinta un text i, si l'alumne ha triat idioma, marca les paraules del glossari.
// - Normal: la paraula queda subratllada i, en tocar-la o passar-hi el ratolí, surt la traducció.
// - `enLinia` (dins de botons i enllaços): la traducció surt escrita a sota, en petit,
//   perquè tocar la paraula no faci l'acció del botó.
export default function Text({ children, enLinia = false }) {
  const { idioma } = usePrefs()
  const text = Array.isArray(children) ? children.join('') : String(children ?? '')
  if (!idioma) return text

  const info = CONFIG.idiomes.find((i) => i.codi === idioma)
  const dir = info?.dir || 'ltr'
  const trossos = []
  let darrer = 0
  for (const m of text.matchAll(PATRO)) {
    const inici = m.index + m[1].length
    const traduccio = PER_FORMA.get(m[2].toLowerCase())?.[idioma]
    if (!traduccio) continue
    if (inici > darrer) trossos.push(text.slice(darrer, inici))
    trossos.push(
      enLinia ? (
        <ruby className="terme-linia" key={inici}>
          {m[2]}
          <rt lang={idioma} dir={dir}>
            {traduccio}
          </rt>
        </ruby>
      ) : (
        <span
          className="terme"
          tabIndex={0}
          key={inici}
          onKeyDown={(e) => {
            if (e.key === 'Escape') e.currentTarget.blur()
          }}
        >
          {m[2]}
          <span className="terme__tr" lang={idioma} dir={dir}>
            {traduccio}
          </span>
        </span>
      )
    )
    darrer = inici + m[2].length
  }
  if (darrer < text.length) trossos.push(text.slice(darrer))
  return trossos
}
