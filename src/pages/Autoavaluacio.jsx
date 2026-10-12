import { useEffect } from 'react'
import { CONFIG } from '../config.js'
import { esPendent } from '../pendent.js'
import { useDesat } from '../desa.js'
import { Enllac } from '../router.jsx'
import { objectiusSA, sessionsDeObjectiu, titolDeRuta } from '../sessions.js'
import { textCompetencia } from '../data/curs-info.js'
import Icona from '../components/Icona.jsx'
import Pendent from '../components/Pendent.jsx'
import Text from '../components/Text.jsx'

const NIVELLS = [
  { id: 'NA', nom: 'No assoliment', graons: 1 },
  { id: 'AS', nom: 'Assoliment satisfactori', graons: 2 },
  { id: 'AN', nom: 'Assoliment notable', graons: 3 },
  { id: 'AE', nom: 'Assoliment excel·lent', graons: 4 }
]

// Quatre graons que s'omplen: ajuden a veure l'ordre dels nivells sense haver de llegir les sigles.
const Graons = ({ n }) => (
  <span className="graons" aria-hidden="true">
    {[1, 2, 3, 4].map((g) => (
      <span key={g} className={g <= n ? 'graons__ple' : ''} style={{ height: `${g * 25}%` }} />
    ))}
  </span>
)

export default function Autoavaluacio({ sa }) {
  const llista = objectiusSA(sa)
  // Mentre falten els objectius, en mode revisió es veuen tres files de mostra.
  const objectius = llista || (CONFIG.modeRevisio ? [null, null, null] : [])
  const [dades, setDades] = useDesat(`big3r-${sa.id}-autoavaluacio`, { nom: '', grup: '', respostes: {} })
  const { nom, grup, respostes } = dades
  const descriptors = sa.autoavaluacio?.descriptors

  // El nom de l'alumne va al títol de la pàgina: així el PDF es desa amb el seu nom.
  useEffect(() => {
    const base = titolDeRuta(`/${sa.id}/autoavaluacio`)
    document.title = nom.trim() ? `${base.split(' · ')[0]} · ${nom.trim()}` : base
  }, [nom, sa.id])

  return (
    <div className="auto">
      <Enllac a={`/${sa.id}`} className="tornar no-imprimir">
        SA{sa.num}. {sa.titol}
      </Enllac>
      <p className="sobretitol">
        SA{sa.num}. <Text>{sa.titol}</Text>
      </p>
      <h1 tabIndex={-1}>
        <Text>Autoavaluació</Text>
      </h1>

      {objectius.length === 0 ? (
        <div className="estat-buit">
          <p>L'autoavaluació encara no està disponible.</p>
          <Enllac a={`/${sa.id}`} className="boto boto--suau">
            Torna a la SA{sa.num}
          </Enllac>
        </div>
      ) : (
        <>
          <p className="entrada">
            Per a cada objectiu, tria fins on has arribat. Després, desa el full en PDF o imprimeix-lo.
          </p>
          <div className="auto__dades">
            <label htmlFor="auto-nom">
              <span>Nom i cognoms</span>
              <input id="auto-nom" type="text" value={nom} onChange={(e) => setDades({ ...dades, nom: e.target.value })} autoComplete="off" />
            </label>
            <label htmlFor="auto-grup">
              <span>Grup</span>
              <input id="auto-grup" type="text" value={grup} onChange={(e) => setDades({ ...dades, grup: e.target.value })} autoComplete="off" />
            </label>
          </div>

          <ul className="llegenda">
            {NIVELLS.map((n) => (
              <li key={n.id}>
                <Graons n={n.graons} />
                <strong>{n.id}</strong> <Text>{n.nom}</Text>
              </li>
            ))}
          </ul>
          {esPendent(descriptors) ? <Pendent nota={descriptors.nota} /> : null}
          {!llista ? <Pendent nota="Els objectius surten de la llista d'objectius de la SA (src/data/sa1/index.js)" /> : null}

          <ol className="objectius">
            {objectius.map((o, i) => {
              const sessions = o ? sessionsDeObjectiu(sa, o.id) : []
              return (
                <li key={o?.id || i}>
                  <div className="objectius__text" id={`obj-text-${i}`}>
                    {o ? (
                      <>
                        <span className="objectius__codi">
                          {o.id}
                          {o.competencia ? <span title={textCompetencia(o.competencia)}> · {o.competencia}</span> : null}
                        </span>
                        <p>
                          <Text>{o.puc || o.text}</Text>
                        </p>
                        {sessions.length ? (
                          <p className="objectius__on no-imprimir">
                            On ho he treballat:{' '}
                            {sessions.map((s, k) => (
                              <span key={s.num}>
                                {k ? ', ' : ''}
                                <Enllac a={`/${sa.id}/s/${s.num}`}>sessió {s.num}</Enllac>
                              </span>
                            ))}
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <Pendent nota={`Objectiu ${i + 1}, amb una frase «Puc…»`} enLinia />
                    )}
                  </div>
                  <div className="nivells" role="radiogroup" aria-labelledby={`obj-text-${i}`}>
                    {NIVELLS.map((n) => (
                      <label key={n.id} className="nivell" htmlFor={`obj-${i}-${n.id}`}>
                        <input
                          id={`obj-${i}-${n.id}`}
                          type="radio"
                          name={`obj-${i}`}
                          aria-label={`${n.id}, ${n.nom}`}
                          checked={respostes[i] === n.id}
                          onChange={() => setDades({ ...dades, respostes: { ...respostes, [i]: n.id } })}
                        />
                        <span title={n.nom}>
                          <Graons n={n.graons} />
                          {n.id}
                        </span>
                      </label>
                    ))}
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="fila-botons no-imprimir">
            <button type="button" className="boto" onClick={() => window.print()}>
              <Icona nom="imprimeix" />
              Imprimeix o desa en PDF
            </button>
          </div>
          <p className="nota-eina no-imprimir">Les teves respostes no s'envien enlloc. Queden només en aquesta pestanya.</p>
        </>
      )}
    </div>
  )
}
