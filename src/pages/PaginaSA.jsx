import { CONFIG } from '../config.js'
import { PLANTILLES } from '../plantilles.js'
import { esPendent } from '../pendent.js'
import { Enllac } from '../router.jsx'
import Mostra from '../components/Mostra.jsx'
import Pendent from '../components/Pendent.jsx'
import Text from '../components/Text.jsx'

export function EtiquetaTipus({ sessio }) {
  if (!sessio.tipus) return <Pendent nota="Aula o laboratori" enLinia />
  return (
    <span className={`tipus tipus--${sessio.tipus}`}>
      {PLANTILLES[sessio.tipus].nom}
      {sessio.tipusPerConfirmar && CONFIG.modeRevisio ? ' (per confirmar)' : ''}
    </span>
  )
}

function FilaSessio({ sa, sessio }) {
  const definida = !esPendent(sessio.titol)
  const visible = definida || CONFIG.modeRevisio
  const cos = (
    <>
      <span className="fila__num">{sessio.num}</span>
      <span className="fila__titol">
        {definida ? <Text>{sessio.titol}</Text> : CONFIG.modeRevisio ? <Pendent nota={sessio.titol.nota} enLinia /> : 'Pròximament'}
      </span>
      <span className="fila__meta">
        {definida || CONFIG.modeRevisio ? <EtiquetaTipus sessio={sessio} /> : null}
        {sessio.estat === 'feta' ? <span className="feta">Feta</span> : null}
      </span>
    </>
  )
  return (
    <li>
      {visible ? (
        <Enllac a={`/${sa.id}/s/${sessio.num}`} className="fila">
          {cos}
        </Enllac>
      ) : (
        <div className="fila fila--buida">{cos}</div>
      )}
    </li>
  )
}

export default function PaginaSA({ sa }) {
  return (
    <div className="sa">
      <Enllac a="/" className="tornar">
        Totes les preguntes del curs
      </Enllac>
      <div className="sa__cap">
        <div>
          <p className="sobretitol">Situació d'aprenentatge {sa.num}</p>
          <h1>{sa.titol}</h1>
          <p className="entrada">
            <Text>{`${sa.sessions.length} sessions de ${CONFIG.duradaSessio} minuts, a l'aula i al laboratori.`}</Text>
          </p>
        </div>
        <Mostra tenyida llavor={sa.num} className="sa__mostra" />
      </div>

      {esPendent(sa.presentacio) ? <Pendent nota={sa.presentacio.nota} /> : <p className="cos"><Text>{sa.presentacio}</Text></p>}
      {esPendent(sa.producteFinal) ? (
        <Pendent nota={sa.producteFinal.nota} />
      ) : (
        <p className="cos">
          <strong>Producte final. </strong>
          <Text>{sa.producteFinal}</Text>
        </p>
      )}

      <h2>Sessions</h2>
      <ol className="sessions">
        {sa.sessions.map((s) => (
          <FilaSessio key={s.num} sa={sa} sessio={s} />
        ))}
      </ol>

      {sa.jocs?.length ? (
        <>
          <h2>Per practicar</h2>
          <ul className="sessions">
            {sa.jocs.map((j) => (
              <li key={j.id}>
                <Enllac a={`/${sa.id}/joc/${j.id}`} className="fila fila--sola">
                  <span className="fila__titol">
                    <Text>{j.titol}</Text>
                  </span>
                  <span className="fila__meta">{j.exercicis.length} exercicis amb correcció</span>
                </Enllac>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>Quan acabem</h2>
      <Enllac a={`/${sa.id}/autoavaluacio`} className="fila fila--sola">
        <span className="fila__titol">
          <Text>Autoavaluació de la SA{String(sa.num)}</Text>
        </span>
        <span className="fila__meta">Què he après i fins on he arribat</span>
      </Enllac>
    </div>
  )
}
