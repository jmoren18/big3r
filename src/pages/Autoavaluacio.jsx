import { useState } from 'react'
import { CONFIG } from '../config.js'
import { esPendent } from '../pendent.js'
import { Enllac } from '../router.jsx'
import Pendent from '../components/Pendent.jsx'
import Text from '../components/Text.jsx'

const NIVELLS = [
  { id: 'NA', nom: 'No assoliment' },
  { id: 'AS', nom: 'Assoliment satisfactori' },
  { id: 'AN', nom: 'Assoliment notable' },
  { id: 'AE', nom: 'Assoliment excel·lent' }
]

export default function Autoavaluacio({ sa }) {
  const dada = sa.autoavaluacio.objectius
  const falta = esPendent(dada)
  // Mentre falten els objectius, en mode revisió es veuen tres files de mostra.
  const objectius = falta ? (CONFIG.modeRevisio ? [null, null, null] : []) : dada
  const [respostes, setRespostes] = useState({})
  const [nom, setNom] = useState('')
  const [grup, setGrup] = useState('')

  return (
    <div className="auto">
      <Enllac a={`/${sa.id}`} className="tornar no-imprimir">
        SA{sa.num}. {sa.titol}
      </Enllac>
      <p className="sobretitol">
        <Text>Autoavaluació</Text>
      </p>
      <h1>{sa.titol}</h1>

      {objectius.length === 0 ? (
        <p className="cos">L'autoavaluació encara no està disponible.</p>
      ) : (
        <>
          <p className="entrada">Marca fins on creus que has arribat en cada objectiu. Després, desa el full en PDF o imprimeix-lo.</p>
          <div className="auto__dades">
            <label htmlFor="auto-nom">
              <span>Nom i cognoms</span>
              <input id="auto-nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} autoComplete="off" />
            </label>
            <label htmlFor="auto-grup">
              <span>Grup</span>
              <input id="auto-grup" type="text" value={grup} onChange={(e) => setGrup(e.target.value)} autoComplete="off" />
            </label>
          </div>

          <ul className="llegenda">
            {NIVELLS.map((n) => (
              <li key={n.id}>
                <strong>{n.id}</strong> {n.nom}
              </li>
            ))}
          </ul>
          {falta ? <Pendent nota="Descriptors de cada nivell segons el PEC i les NOFC del centre" /> : null}

          <ol className="objectius">
            {objectius.map((o, i) => (
              <li key={i}>
                <p className="objectius__text">{o ? <Text>{o}</Text> : <Pendent nota={`Objectiu d'aprenentatge ${i + 1}`} enLinia />}</p>
                <div className="nivells" role="radiogroup" aria-label={`Objectiu ${i + 1}`}>
                  {NIVELLS.map((n) => (
                    <label key={n.id} className="nivell" htmlFor={`obj-${i}-${n.id}`}>
                      <input
                        id={`obj-${i}-${n.id}`}
                        type="radio"
                        name={`obj-${i}`}
                        checked={respostes[i] === n.id}
                        onChange={() => setRespostes({ ...respostes, [i]: n.id })}
                      />
                      <span title={n.nom}>{n.id}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="fila-botons no-imprimir">
            <button type="button" className="boto" onClick={() => window.print()}>
              Imprimeix o desa en PDF
            </button>
          </div>
          <p className="nota-eina no-imprimir">Les teves respostes no s'envien enlloc. Queden només en aquesta pantalla.</p>
        </>
      )}
    </div>
  )
}
