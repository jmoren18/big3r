import { useState } from 'react'
import { Enllac } from '../router.jsx'
import Text from '../components/Text.jsx'
import { TIPUS } from '../joc/tipus.jsx'

function Exercici({ ex, num, onResultat }) {
  const inicial = () => ex.parts.map((p) => TIPUS[p.tipus].buit(p))
  const [valors, setValors] = useState(inicial)
  const [marques, setMarques] = useState(null)
  const [solucio, setSolucio] = useState(false)

  const complet = ex.parts.every((p, i) => TIPUS[p.tipus].completa(p, valors[i]))
  const totes = marques ? marques.flat() : []
  const encerts = totes.filter(Boolean).length
  const puntua = totes.length > 0

  const comprova = () => {
    const m = ex.parts.map((p, i) => TIPUS[p.tipus].corregeix(p, valors[i]))
    setMarques(m)
    const t = m.flat()
    onResultat({ encerts: t.filter(Boolean).length, total: t.length })
  }
  const reinicia = () => {
    setValors(inicial())
    setMarques(null)
    setSolucio(false)
    onResultat(null)
  }

  return (
    <section className="exercici" aria-labelledby={`ex-${num}`}>
      <h2 id={`ex-${num}`}>
        <span className="exercici__num">{num}</span>
        <Text>{ex.titol}</Text>
      </h2>
      <p className="exercici__instruccio">
        <Text>{ex.instruccio}</Text>
      </p>
      {ex.parts.map((p, i) => {
        const { Vista } = TIPUS[p.tipus]
        return (
          <div key={i} className="exercici__part">
            {p.subtitol ? <h3>{p.subtitol}</h3> : null}
            <Vista
              part={p}
              id={`ex${num}-p${i}`}
              valor={valors[i]}
              onCanvi={(v) => setValors(valors.map((x, j) => (j === i ? v : x)))}
              marques={marques ? marques[i] : null}
              solucio={solucio}
            />
          </div>
        )
      })}

      {marques && puntua ? (
        <p className={`resultat ${encerts === totes.length ? 'resultat--tot' : ''}`} role="status">
          {encerts === totes.length ? 'Tot correcte.' : `${encerts} de ${totes.length} correctes.`}
        </p>
      ) : null}
      <div className="fila-botons">
        {!marques ? (
          <button type="button" className="boto" disabled={!complet} onClick={comprova}>
            Comprova
          </button>
        ) : (
          <>
            <button type="button" className="boto" onClick={reinicia}>
              Torna-ho a provar
            </button>
            {puntua && encerts < totes.length && !solucio ? (
              <button type="button" className="boto boto--suau" onClick={() => setSolucio(true)}>
                Mostra la solució
              </button>
            ) : null}
          </>
        )}
      </div>
      {!marques && !complet ? <p className="nota-eina">Respon-ho tot per poder comprovar.</p> : null}
    </section>
  )
}

export default function Joc({ sa, joc }) {
  const [actiu, setActiu] = useState(0)
  const [resultats, setResultats] = useState({})
  const [obert, setObert] = useState(false)
  const n = joc.exercicis.length

  const fets = Object.values(resultats).filter(Boolean)
  const encerts = fets.reduce((s, r) => s + r.encerts, 0)
  const total = fets.reduce((s, r) => s + r.total, 0)
  const acabat = fets.length === n

  const estat = (i) => {
    const r = resultats[i]
    if (!r) return ''
    return r.encerts === r.total ? 'pas--tot' : 'pas--fet'
  }

  return (
    <div className="joc">
      <Enllac a={`/${sa.id}`} className="tornar">
        SA{sa.num}. {sa.titol}
      </Enllac>
      <p className="sobretitol">Per practicar</p>
      <h1>
        <Text>{joc.titol}</Text>
      </h1>
      <p className="entrada">{joc.entrada}</p>

      {joc.recorda ? (
        <div className="recorda">
          <button type="button" className="boto boto--suau" aria-expanded={obert} onClick={() => setObert(!obert)}>
            {obert ? "Amaga l'escala dels nivells" : joc.recorda.titol}
          </button>
          {obert ? (
            <div className="recorda__cos">
              <p>{joc.recorda.text}</p>
              <div className="recorda__grups">
                {joc.recorda.grups.map((g, gi) => (
                  <div key={g.nom}>
                    <h3>{g.nom}</h3>
                    <ol start={gi === 0 ? 1 : joc.recorda.grups[0].nivells.length + 1}>
                      {g.nivells.map(([nom, exemple]) => (
                        <li key={nom}>
                          <strong>
                            <Text>{nom}</Text>
                          </strong>{' '}
                          <span>{exemple}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
              <p className="recorda__nota">{joc.recorda.nota}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <nav className="passos-joc" aria-label="Exercicis">
        {joc.exercicis.map((ex, i) => (
          <button
            key={i}
            type="button"
            className={`pas ${estat(i)}`}
            aria-current={actiu === i ? 'step' : undefined}
            aria-label={`Exercici ${i + 1}: ${ex.titol}`}
            onClick={() => setActiu(i)}
          >
            {i + 1}
          </button>
        ))}
        <span className="passos-joc__punts" role="status">
          {total > 0 ? `${encerts} de ${total} encerts` : 'Encara no has comprovat cap exercici'}
        </span>
      </nav>

      {joc.exercicis.map((ex, i) => (
        <div key={i} hidden={actiu !== i}>
          <Exercici ex={ex} num={i + 1} onResultat={(r) => setResultats((abans) => ({ ...abans, [i]: r }))} />
        </div>
      ))}

      <div className="veines">
        {actiu > 0 ? (
          <button type="button" className="boto boto--suau" onClick={() => setActiu(actiu - 1)}>
            Exercici {actiu}
          </button>
        ) : (
          <span />
        )}
        {actiu < n - 1 ? (
          <button type="button" className="boto boto--suau" onClick={() => setActiu(actiu + 1)}>
            Exercici {actiu + 2}
          </button>
        ) : null}
      </div>

      {acabat ? (
        <p className="final-joc" role="status">
          Has comprovat els {n} exercicis: <strong>{encerts} de {total} encerts</strong>.{' '}
          {encerts === total ? 'Tot correcte.' : 'Repeteix els exercicis on has fallat.'}
        </p>
      ) : null}
    </div>
  )
}
