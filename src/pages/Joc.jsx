import { useEffect, useRef, useState } from 'react'
import { useDesat, esborra } from '../desa.js'
import { usePrefs } from '../prefs.jsx'
import { Enllac } from '../router.jsx'
import { Paraules, SelectorVersio } from '../components/Ajudes.jsx'
import Icona from '../components/Icona.jsx'
import Text from '../components/Text.jsx'
import { TIPUS } from '../joc/tipus.jsx'

// L'estat de cada exercici es desa a la pestanya (sessionStorage): no es perd en refrescar
// ni en tornar enrere, i s'esborra en tancar la pestanya.
function Exercici({ ex, num, clau, onResultat, titolRef }) {
  const inicial = () => ({ valors: ex.parts.map((p) => TIPUS[p.tipus].buit(p)), marques: null, intents: 0, solucio: false })
  const [estat, setEstat] = useDesat(clau, inicial, (d) => Array.isArray(d?.valors) && d.valors.length === ex.parts.length)
  const { valors, marques, intents, solucio } = estat
  const resultat = useRef(null)

  const complet = ex.parts.every((p, i) => TIPUS[p.tipus].completa(p, valors[i]))
  const totes = marques ? marques.flat() : []
  const encerts = totes.filter(Boolean).length
  const puntua = totes.length > 0

  const comprova = () => {
    const m = ex.parts.map((p, i) => TIPUS[p.tipus].corregeix(p, valors[i]))
    setEstat({ ...estat, marques: m, intents: intents + 1 })
    const t = m.flat()
    onResultat({ encerts: t.filter(Boolean).length, total: t.length })
    // El focus va al resultat: així un segon Enter no esborra res.
    setTimeout(() => resultat.current?.focus(), 0)
  }
  const tornaHi = () => {
    setEstat({ ...estat, valors: ex.parts.map((p, i) => TIPUS[p.tipus].neteja(p, valors[i], marques[i])), marques: null, solucio: false })
    onResultat(null)
  }

  return (
    <section className="exercici" aria-labelledby={`ex-${num}`}>
      <h2 id={`ex-${num}`} ref={titolRef} tabIndex={-1}>
        <span className="exercici__num">{num}</span>
        <span>
          <Text>{ex.titol}</Text>
        </span>
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
              onCanvi={(v) => setEstat({ ...estat, valors: valors.map((x, j) => (j === i ? v : x)) })}
              marques={marques ? marques[i] : null}
              solucio={solucio}
            />
          </div>
        )
      })}

      <p className={`resultat ${puntua && encerts === totes.length ? 'resultat--tot' : ''}`} role="status" ref={resultat} tabIndex={-1}>
        {marques && puntua ? (encerts === totes.length ? 'Tot correcte.' : `${encerts} de ${totes.length} correctes.`) : ''}
      </p>
      <div className="fila-botons">
        {!marques ? (
          <button type="button" className="boto" disabled={!complet} onClick={comprova}>
            <Icona nom="comprova" />
            Comprova
          </button>
        ) : (
          <>
            {!puntua || encerts < totes.length ? (
              <button type="button" className="boto" onClick={tornaHi}>
                <Icona nom="reintenta" />
                Torna-ho a provar
              </button>
            ) : null}
            {puntua && encerts < totes.length && !solucio && intents >= 2 ? (
              <button type="button" className="boto boto--suau" onClick={() => setEstat({ ...estat, solucio: true })}>
                <Icona nom="solucio" />
                Mostra la solució
              </button>
            ) : null}
          </>
        )}
      </div>
      {!marques && !complet ? <p className="nota-eina">Respon-ho tot per poder comprovar.</p> : null}
      {marques && puntua && encerts < totes.length && intents < 2 ? (
        <p className="nota-eina">Les respostes bones es queden. Corregeix les altres i torna a comprovar.</p>
      ) : null}
    </section>
  )
}

export default function Joc({ sa, joc }) {
  const { versio } = usePrefs()
  const prefix = `big3r-${sa.id}-joc-${joc.id}-`
  const n = joc.exercicis.length
  const [estat, setEstat] = useDesat(`${prefix}estat`, { actiu: 0, resultats: {} }, (d) => Number.isInteger(d?.actiu) && d.actiu < n)
  const { actiu, resultats } = estat
  const [obert, setObert] = useState(versio === 'A')
  const [ronda, setRonda] = useState(0)
  const titols = useRef([])
  const canviat = useRef(false)

  useEffect(() => {
    if (versio === 'A') setObert(true)
  }, [versio])

  useEffect(() => {
    if (!canviat.current) return
    canviat.current = false
    const h = titols.current[actiu]
    h?.scrollIntoView({ block: 'start' })
    h?.focus({ preventScroll: true })
  }, [actiu])

  const ves = (i) => {
    canviat.current = true
    setEstat((e) => ({ ...e, actiu: i }))
  }

  const comencaDeNou = () => {
    esborra(prefix)
    setEstat({ actiu: 0, resultats: {} })
    setRonda((r) => r + 1)
  }

  const fets = Object.values(resultats).filter(Boolean)
  const encerts = fets.reduce((s, r) => s + r.encerts, 0)
  const total = fets.reduce((s, r) => s + r.total, 0)
  const acabat = fets.length === n

  const estatPas = (i) => {
    const r = resultats[i]
    if (!r) return { classe: '', simbol: '', text: '' }
    return r.encerts === r.total
      ? { classe: 'pas--tot', simbol: '✓', text: ', tot correcte' }
      : { classe: 'pas--fet', simbol: '•', text: `, ${r.encerts} de ${r.total}` }
  }

  return (
    <div className="joc">
      <Enllac a={`/${sa.id}`} className="tornar no-imprimir">
        SA{sa.num}. {sa.titol}
      </Enllac>
      <p className="sobretitol">Per practicar</p>
      <h1 tabIndex={-1}>
        <Text>{joc.titol}</Text>
      </h1>
      <p className="entrada">
        <Text>{joc.entrada}</Text>
      </p>
      <SelectorVersio />

      {joc.recorda ? (
        <div className="recorda">
          <div className="recorda__cap">
            <button type="button" className="boto boto--suau" aria-expanded={obert} onClick={() => setObert(!obert)}>
              <Icona nom="apunts" />
              {obert ? "Amaga l'escala dels nivells" : <Text enLinia>{joc.recorda.titol}</Text>}
            </button>
            {!obert && versio !== 'A' ? <span className="nota-eina">Prova-ho primer sense mirar.</span> : null}
          </div>
          {obert ? (
            <div className="recorda__cos">
              <p>
                <Text>{joc.recorda.text}</Text>
              </p>
              <div className="recorda__grups">
                {joc.recorda.grups.map((g, gi) => (
                  <div key={g.nom}>
                    <h3>
                      <Text>{g.nom}</Text>
                    </h3>
                    <ol start={gi === 0 ? 1 : joc.recorda.grups[0].nivells.length + 1}>
                      {g.nivells.map(([nom, exemple]) => (
                        <li key={nom}>
                          <strong>
                            <Text>{nom}</Text>
                          </strong>{' '}
                          <span>
                            <Text>{exemple}</Text>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
              <p className="recorda__nota">
                <Text>{joc.recorda.nota}</Text>
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      <nav className="passos-joc" aria-label="Exercicis">
        {joc.exercicis.map((ex, i) => {
          const e = estatPas(i)
          return (
            <button
              key={i}
              type="button"
              className={`pas ${e.classe}`}
              aria-current={actiu === i ? 'step' : undefined}
              aria-label={`Exercici ${i + 1}: ${ex.titol}${e.text}`}
              onClick={() => ves(i)}
            >
              {i + 1}
              {e.simbol ? (
                <span className="pas__simbol" aria-hidden="true">
                  {e.simbol}
                </span>
              ) : null}
            </button>
          )
        })}
        <span className="passos-joc__punts" role="status">
          {total > 0 ? `${encerts} de ${total} encerts` : 'Encara no has comprovat cap exercici'}
        </span>
      </nav>

      {joc.exercicis.map((ex, i) => (
        <div key={`${ronda}-${i}`} hidden={actiu !== i}>
          <Exercici
            ex={ex}
            num={i + 1}
            clau={`${prefix}ex${i + 1}`}
            titolRef={(el) => (titols.current[i] = el)}
            onResultat={(r) => setEstat((abans) => ({ ...abans, resultats: { ...abans.resultats, [i]: r } }))}
          />
        </div>
      ))}

      <div className="veines">
        {actiu > 0 ? (
          <button type="button" className="boto boto--suau veina veina--ant" onClick={() => ves(actiu - 1)}>
            <Icona nom="anterior" />
            Exercici {actiu}
          </button>
        ) : (
          <span />
        )}
        {actiu < n - 1 ? (
          <button type="button" className="boto boto--suau veina veina--seg" onClick={() => ves(actiu + 1)}>
            Exercici {actiu + 2}
            <Icona nom="seguent" />
          </button>
        ) : null}
      </div>

      {acabat ? (
        <p className="final-joc" role="status">
          Has comprovat els {n} exercicis: <strong>{encerts} de {total} encerts</strong>.{' '}
          {encerts === total ? 'Tot correcte.' : 'Repeteix els exercicis on has fallat.'}
        </p>
      ) : null}

      {fets.length ? (
        <button type="button" className="boto boto--suau boto--petit no-imprimir" onClick={comencaDeNou}>
          <Icona nom="reintenta" />
          Comença el joc de nou
        </button>
      ) : null}

      <Paraules font={joc} />
    </div>
  )
}
