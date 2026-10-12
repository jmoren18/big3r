import { ModelFrase } from '../components/Ajudes.jsx'
import Text from '../components/Text.jsx'
import { usePrefs } from '../prefs.jsx'

// Compara respostes escrites sense tenir en compte majúscules, accents,
// articles ni com s'ha escrit la ela geminada.
export const norm = (s) =>
  String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/l[·.\-•]l/g, 'll')
    .replace(/[.,;:!?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(un|una|el|la|els|les) /, '')
    .replace(/^l['’]/, '')

const encerta = (escrit, respostes) => respostes.some((r) => norm(r) === norm(escrit))
const benEscrit = (escrit, respostes) => respostes.some((r) => r.toLowerCase() === String(escrit).trim().toLowerCase())

const Marca = ({ ok }) =>
  ok == null ? null : (
    <span className={ok ? 'marca marca--ok' : 'marca marca--ko'} role="img" aria-label={ok ? 'Correcte' : 'Incorrecte'}>
      {ok ? '✓' : '✗'}
    </span>
  )

const Pista = ({ text }) =>
  text ? (
    <span className="pista">
      <strong>Pista. </strong>
      <Text>{text}</Text>
    </span>
  ) : null

const classeFila = (marques, i) => (marques ? (marques[i] ? 'fila-joc fila-joc--ok' : 'fila-joc fila-joc--ko') : 'fila-joc')

// Conserva les respostes encertades i buida les altres (per a «Torna-ho a provar»).
const netejaFiles = (buit) => (p, v, m) => v.map((x, i) => (m[i] ? x : buit))

// Cada tipus d'exercici defineix: el valor inicial, quan està complet, com es
// corregeix (una llista de cert/fals), què es conserva en tornar-ho a provar i com es veu.
export const TIPUS = {
  // ── Tocar els elements per ordre ───────────────────────
  // Es corregeix per parelles: una fitxa és bona si la que ve just després és la correcta.
  // Així, un sol element fora de lloc no fa perdre tots els punts.
  ordena: {
    buit: () => [],
    completa: (p, v) => v.length === p.items.length,
    corregeix: (p, v) =>
      p.items.map((item, i) => {
        const seguent = v[v.indexOf(i) + 1]
        const seguentBo = p.ordre[p.ordre.indexOf(item) + 1]
        return seguent === undefined ? seguentBo === undefined : p.items[seguent] === seguentBo
      }),
    neteja: (p, v) => {
      const k = v.findIndex((idx, j) => p.items[idx] !== p.ordre[j])
      return k === -1 ? v : v.slice(0, k)
    },
    Vista({ part, valor, onCanvi, marques, solucio }) {
      const toca = (i) => onCanvi(valor.includes(i) ? valor.filter((x) => x !== i) : [...valor, i])
      const pistes = marques
        ? part.items
            .map((item, i) => (marques[i] ? null : item))
            .filter(Boolean)
            .map((item) => {
              const seguentBo = part.ordre[part.ordre.indexOf(item) + 1]
              return seguentBo ? `${item} va just abans de ${seguentBo}.` : `${item} va al final.`
            })
        : []
      return (
        <>
          <div className="joc-graella">
            {part.items.map((item, i) => {
              const pos = valor.indexOf(i)
              return (
                <button
                  key={item}
                  type="button"
                  className={`fitxa ${marques ? (marques[i] ? 'fitxa--ok' : 'fitxa--ko') : ''}`}
                  aria-pressed={pos >= 0}
                  disabled={!!marques}
                  onClick={() => toca(i)}
                >
                  <span className="fitxa__num">{pos >= 0 ? pos + 1 : ''}</span>
                  <span>
                    <Text enLinia>{item}</Text>
                  </span>
                  {marques ? <Marca ok={marques[i]} /> : null}
                </button>
              )
            })}
          </div>
          {marques && pistes.length && !solucio ? (
            <ul className="pistes">
              {pistes.map((p) => (
                <li key={p}>
                  <Pista text={p} />
                </li>
              ))}
            </ul>
          ) : null}
          {solucio ? (
            <ol className="solucio passos">
              {part.ordre.map((o) => (
                <li key={o}>
                  <Text>{o}</Text>
                </li>
              ))}
            </ol>
          ) : null}
        </>
      )
    }
  },

  // ── Triar una opció per a cada fila ────────────────────
  relaciona: {
    buit: (p) => p.files.map(() => ''),
    completa: (p, v) => v.every((x) => x !== ''),
    corregeix: (p, v) => p.files.map((f, i) => v[i] === f.resposta),
    neteja: netejaFiles(''),
    Vista({ part, valor, onCanvi, marques, solucio, id }) {
      const { idioma } = usePrefs()
      return (
        <>
          {idioma ? (
            <p className="opcions-tr">
              <span className="opcions-tr__titol">Opcions:</span>
              {part.opcions.map((o) => (
                <span key={o} className="xip-opcio">
                  <Text enLinia>{o}</Text>
                </span>
              ))}
            </p>
          ) : null}
          <ul className="joc-files">
            {part.files.map((f, i) => (
              <li key={f.text} className={classeFila(marques, i)}>
                <label htmlFor={`${id}-${i}`}>
                  <Text>{f.text}</Text>
                </label>
                <span className="fila-joc__resposta">
                  <select
                    id={`${id}-${i}`}
                    value={valor[i]}
                    disabled={!!marques}
                    onChange={(e) => onCanvi(valor.map((x, j) => (j === i ? e.target.value : x)))}
                  >
                    <option value="">Tria un nivell</option>
                    {part.opcions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {marques ? <Marca ok={marques[i]} /> : null}
                </span>
                {marques && !marques[i] && !solucio && part.pista ? <Pista text={part.pista(valor[i])} /> : null}
                {solucio && marques && !marques[i] ? (
                  <span className="solucio">
                    <Text>{f.resposta}</Text>
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      )
    }
  },

  // ── Escriure la paraula que falta ──────────────────────
  buits: {
    buit: (p) => p.frases.map(() => ''),
    completa: (p, v) => v.every((x) => x.trim() !== ''),
    corregeix: (p, v) => p.frases.map((f, i) => encerta(v[i], f.respostes)),
    neteja: netejaFiles(''),
    Vista({ part, valor, onCanvi, marques, solucio, id }) {
      return (
        <ol className="joc-files joc-files--num">
          {part.frases.map((f, i) => (
            <li key={i} className={classeFila(marques, i)}>
              <p className="frase-buit">
                <Text>{f.abans}</Text>
                <input
                  id={`${id}-${i}`}
                  type="text"
                  aria-label={`Frase ${i + 1}: ${f.abans.trim()} … ${f.despres}`}
                  value={valor[i]}
                  disabled={!!marques}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  onChange={(e) => onCanvi(valor.map((x, j) => (j === i ? e.target.value : x)))}
                />
                {f.despres}
                {marques ? <Marca ok={marques[i]} /> : null}
              </p>
              {marques && marques[i] && !benEscrit(valor[i], f.respostes) ? (
                <span className="solucio">S'escriu: {f.respostes[0]}</span>
              ) : null}
              {solucio && marques && !marques[i] ? <span className="solucio">{f.respostes[0]}</span> : null}
            </li>
          ))}
        </ol>
      )
    }
  },

  // ── Posar cada element en un grup ──────────────────────
  classifica: {
    buit: (p) => p.items.map(() => ''),
    completa: (p, v) => v.every((x) => x !== ''),
    corregeix: (p, v) => p.items.map((it, i) => v[i] === it.grup),
    neteja: netejaFiles(''),
    Vista({ part, valor, onCanvi, marques, solucio }) {
      return (
        <ul className="joc-files">
          {part.items.map((it, i) => (
            <li key={it.text} className={classeFila(marques, i)}>
              <span className="fila-joc__text">
                <Text>{it.text}</Text>
              </span>
              <span className="fila-joc__resposta" role="group" aria-label={it.text}>
                {part.grups.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className="opcio"
                    aria-pressed={valor[i] === g.id}
                    disabled={!!marques}
                    onClick={() => onCanvi(valor.map((x, j) => (j === i ? g.id : x)))}
                  >
                    <Text enLinia>{g.nom}</Text>
                  </button>
                ))}
                {marques ? <Marca ok={marques[i]} /> : null}
              </span>
              {marques && !marques[i] && !solucio && part.pista ? <Pista text={part.pista(it.text)} /> : null}
              {solucio && marques && !marques[i] ? (
                <span className="solucio">
                  <Text>{part.grups.find((g) => g.id === it.grup).nom}</Text>
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )
    }
  },

  // ── Verdader o fals ────────────────────────────────────
  vf: {
    buit: (p) => p.frases.map(() => null),
    completa: (p, v) => v.every((x) => x !== null),
    corregeix: (p, v) => p.frases.map((f, i) => v[i] === f.resposta),
    neteja: netejaFiles(null),
    Vista({ part, valor, onCanvi, marques, solucio, id }) {
      return (
        <ol className="joc-files joc-files--num">
          {part.frases.map((f, i) => (
            <li key={f.text} className={classeFila(marques, i)}>
              <span className="fila-joc__text" id={`${id}-${i}`}>
                <Text>{f.text}</Text>
              </span>
              <span className="fila-joc__resposta" role="group" aria-labelledby={`${id}-${i}`}>
                {[
                  [true, 'V', 'Verdader'],
                  [false, 'F', 'Fals']
                ].map(([v, lletra, nom]) => (
                  <button
                    key={lletra}
                    type="button"
                    className="opcio opcio--rodona"
                    aria-label={nom}
                    aria-pressed={valor[i] === v}
                    disabled={!!marques}
                    onClick={() => onCanvi(valor.map((x, j) => (j === i ? v : x)))}
                  >
                    {lletra}
                  </button>
                ))}
                {marques ? <Marca ok={marques[i]} /> : null}
              </span>
              {marques && f.correccio && (marques[i] || solucio) ? (
                <span className="solucio">
                  <Text>{f.correccio}</Text>
                </span>
              ) : null}
              {solucio && marques && !marques[i] && !f.correccio ? <span className="solucio">És verdader.</span> : null}
            </li>
          ))}
        </ol>
      )
    }
  },

  // ── Completar una cadena de nivells ────────────────────
  cadena: {
    buit: (p) => p.cadena.map(() => ''),
    completa: (p, v) => p.cadena.every((c, i) => c.fix || v[i].trim() !== ''),
    corregeix: (p, v) => p.cadena.flatMap((c, i) => (c.fix ? [] : [encerta(v[i], c.respostes)])),
    neteja: (p, v, m) => {
      let k = -1
      return p.cadena.map((c, i) => {
        if (c.fix) return v[i]
        k += 1
        return m[k] ? v[i] : ''
      })
    },
    Vista({ part, valor, onCanvi, marques, solucio, id }) {
      let buit = -1
      return (
        <div className="cadenes">
          <p className="cadena__nom">Nivells</p>
          <ol className="cadena">
            {part.nivells.map((n) => (
              <li key={n}>
                <Text>{n}</Text>
              </li>
            ))}
          </ol>
          <p className="cadena__nom">Exemple resolt</p>
          <ol className="cadena cadena--exemple">
            {part.exemple.map((n) => (
              <li key={n}>
                <Text>{n}</Text>
              </li>
            ))}
          </ol>
          <p className="cadena__nom cadena__nom--tu">
            <Text>Ara tu: completa a partir d'una cèl·lula nerviosa</Text>
          </p>
          <ol className="cadena">
            {part.cadena.map((c, i) => {
              if (c.fix)
                return (
                  <li key={i}>
                    <Text>{c.fix}</Text>
                  </li>
                )
              buit += 1
              const ok = marques ? marques[buit] : null
              return (
                <li key={i} className={ok == null ? 'cadena__buit' : ok ? 'cadena__buit fila-joc--ok' : 'cadena__buit fila-joc--ko'}>
                  <input
                    id={`${id}-${i}`}
                    type="text"
                    aria-label={part.nivells[i]}
                    placeholder={part.nivells[i]}
                    value={valor[i]}
                    disabled={!!marques}
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    onChange={(e) => onCanvi(valor.map((x, j) => (j === i ? e.target.value : x)))}
                  />
                  {marques ? <Marca ok={ok} /> : null}
                  {solucio && ok === false ? <span className="solucio">{c.respostes[0]}</span> : null}
                </li>
              )
            })}
          </ol>
        </div>
      )
    }
  },

  // ── Resposta oberta: no es puntua ──────────────────────
  oberta: {
    buit: () => '',
    completa: (p, v) => v.trim() !== '',
    corregeix: () => [],
    neteja: (p, v) => v,
    Vista({ part, valor, onCanvi, marques, id }) {
      const usada = (paraula) => norm(valor).includes(norm(paraula).slice(0, -1))
      return (
        <div className="oberta">
          <blockquote>
            <strong>Un company diu:</strong> «<Text>{part.cita}</Text>»
          </blockquote>
          <label htmlFor={`${id}-text`} className="oberta__pregunta">
            <Text>{part.pregunta}</Text>
          </label>
          {part.frase && !marques ? <ModelFrase valor={part.frase} /> : null}
          <textarea id={`${id}-text`} rows={5} value={valor} disabled={!!marques} onChange={(e) => onCanvi(e.target.value)} />
          {marques ? (
            <>
              <ul className="paraules">
                {part.paraules.map((p) => (
                  <li key={p}>
                    <Marca ok={usada(p)} /> <Text>{p}</Text>
                  </li>
                ))}
              </ul>
              <p className="solucio solucio--model">
                <strong>Compara-la amb aquesta resposta. </strong>
                <Text>{part.model}</Text>
              </p>
            </>
          ) : null}
        </div>
      )
    }
  }
}
