import Text from '../components/Text.jsx'

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
    <span className={ok ? 'marca marca--ok' : 'marca marca--ko'} aria-label={ok ? 'Correcte' : 'Incorrecte'}>
      {ok ? '✓' : '✗'}
    </span>
  )

// Cada tipus d'exercici defineix: el valor inicial, quan està complet, com es
// corregeix (una llista de cert/fals) i com es veu.
export const TIPUS = {
  // ── Tocar els elements per ordre ───────────────────────
  ordena: {
    buit: () => [],
    completa: (p, v) => v.length === p.items.length,
    corregeix: (p, v) => p.items.map((item, i) => v.indexOf(i) === p.ordre.indexOf(item)),
    Vista({ part, valor, onCanvi, marques, solucio }) {
      const toca = (i) => onCanvi(valor.includes(i) ? valor.filter((x) => x !== i) : [...valor, i])
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
                    <Text>{item}</Text>
                  </span>
                  {marques ? <Marca ok={marques[i]} /> : null}
                </button>
              )
            })}
          </div>
          {solucio ? (
            <ol className="solucio passos">
              {part.ordre.map((o) => (
                <li key={o}>{o}</li>
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
    Vista({ part, valor, onCanvi, marques, solucio, id }) {
      return (
        <ul className="joc-files">
          {part.files.map((f, i) => (
            <li key={f.text} className={marques ? (marques[i] ? 'fila-joc fila-joc--ok' : 'fila-joc fila-joc--ko') : 'fila-joc'}>
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
              {solucio && marques && !marques[i] ? <span className="solucio">{f.resposta}</span> : null}
            </li>
          ))}
        </ul>
      )
    }
  },

  // ── Escriure la paraula que falta ──────────────────────
  buits: {
    buit: (p) => p.frases.map(() => ''),
    completa: (p, v) => v.every((x) => x.trim() !== ''),
    corregeix: (p, v) => p.frases.map((f, i) => encerta(v[i], f.respostes)),
    Vista({ part, valor, onCanvi, marques, solucio, id }) {
      return (
        <ol className="joc-files joc-files--num">
          {part.frases.map((f, i) => (
            <li key={i} className={marques ? (marques[i] ? 'fila-joc fila-joc--ok' : 'fila-joc fila-joc--ko') : 'fila-joc'}>
              <p className="frase-buit">
                <Text>{f.abans}</Text>
                <input
                  id={`${id}-${i}`}
                  type="text"
                  aria-label={`Paraula que falta a la frase ${i + 1}`}
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
    Vista({ part, valor, onCanvi, marques, solucio }) {
      return (
        <ul className="joc-files">
          {part.items.map((it, i) => (
            <li key={it.text} className={marques ? (marques[i] ? 'fila-joc fila-joc--ok' : 'fila-joc fila-joc--ko') : 'fila-joc'}>
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
                    {g.nom}
                  </button>
                ))}
                {marques ? <Marca ok={marques[i]} /> : null}
              </span>
              {solucio && marques && !marques[i] ? (
                <span className="solucio">{part.grups.find((g) => g.id === it.grup).nom}</span>
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
    Vista({ part, valor, onCanvi, marques, solucio }) {
      return (
        <ol className="joc-files joc-files--num">
          {part.frases.map((f, i) => (
            <li key={f.text} className={marques ? (marques[i] ? 'fila-joc fila-joc--ok' : 'fila-joc fila-joc--ko') : 'fila-joc'}>
              <span className="fila-joc__text">
                <Text>{f.text}</Text>
              </span>
              <span className="fila-joc__resposta" role="group" aria-label={`Frase ${i + 1}`}>
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
              {marques && f.correccio && (marques[i] || solucio) ? <span className="solucio">{f.correccio}</span> : null}
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
              <li key={n}>{n}</li>
            ))}
          </ol>
          <p className="cadena__nom cadena__nom--tu">Ara tu: completa a partir d'una cèl·lula nerviosa</p>
          <ol className="cadena">
            {part.cadena.map((c, i) => {
              if (c.fix) return <li key={i}>{c.fix}</li>
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
    Vista({ part, valor, onCanvi, marques, id }) {
      const usada = (paraula) => norm(valor).includes(norm(paraula).slice(0, -1))
      return (
        <div className="oberta">
          <blockquote>
            <strong>Un company diu:</strong> «{part.cita}»
          </blockquote>
          <label htmlFor={`${id}-text`} className="oberta__pregunta">
            <Text>{part.pregunta}</Text>
          </label>
          <textarea id={`${id}-text`} rows={5} value={valor} disabled={!!marques} onChange={(e) => onCanvi(e.target.value)} />
          {marques ? (
            <>
              <ul className="paraules">
                {part.paraules.map((p) => (
                  <li key={p}>
                    <Marca ok={usada(p)} /> {p}
                  </li>
                ))}
              </ul>
              <p className="solucio solucio--model">
                <strong>Compara-la amb aquesta resposta. </strong>
                {part.model}
              </p>
            </>
          ) : null}
        </div>
      )
    }
  }
}
