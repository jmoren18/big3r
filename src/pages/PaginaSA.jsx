import { CONFIG } from '../config.js'
import { PLANTILLES } from '../plantilles.js'
import { esPendent } from '../pendent.js'
import { textCompetencia, textTransversal } from '../data/curs-info.js'
import { Enllac } from '../router.jsx'
import { definida, objectiusSA } from '../sessions.js'
import Icona from '../components/Icona.jsx'
import Mostra from '../components/Mostra.jsx'
import Pendent from '../components/Pendent.jsx'
import Text from '../components/Text.jsx'

// Només s'etiqueten les sessions de laboratori; la resta no porta etiqueta.
export function EtiquetaTipus({ sessio }) {
  if (sessio.tipus !== 'laboratori') return null
  return <span className="tipus tipus--laboratori">{PLANTILLES.laboratori.nom}</span>
}

function FilaSessio({ sa, sessio }) {
  const def = definida(sessio)
  const avui = sa.avui === sessio.num
  const cos = (
    <>
      <span className="fila__num">{sessio.num}</span>
      <span className="fila__titol">{def ? <Text enLinia>{sessio.titol}</Text> : <Pendent nota={sessio.titol.nota} enLinia />}</span>
      <span className="fila__meta">
        {avui ? <span className="avui">Avui</span> : null}
        <EtiquetaTipus sessio={sessio} />
        {sessio.estat === 'feta' ? <span className="feta">Feta</span> : null}
      </span>
    </>
  )
  return (
    <li>
      <Enllac a={`/${sa.id}/s/${sessio.num}`} className={`fila ${avui ? 'fila--avui' : ''}`} aria-current={avui ? 'date' : undefined}>
        {cos}
      </Enllac>
    </li>
  )
}

// A la vista alumne, les sessions seguides que encara no estan definides surten en una sola fila.
function grups(sessions) {
  const sortida = []
  for (const s of sessions) {
    const darrer = sortida[sortida.length - 1]
    if (!CONFIG.modeRevisio && !definida(s)) {
      if (darrer?.buides) darrer.buides.push(s)
      else sortida.push({ buides: [s] })
    } else sortida.push({ sessio: s })
  }
  return sortida
}

function FilaBuida({ sessions }) {
  const primera = sessions[0].num
  const darrera = sessions[sessions.length - 1].num
  return (
    <li>
      <div className="fila fila--sola fila--buida">
        <span className="fila__titol">{primera === darrera ? `Sessió ${primera}: pròximament` : `Sessions ${primera} a ${darrera}: pròximament`}</span>
      </div>
    </li>
  )
}

function Competencies({ sa }) {
  if (!sa.competencies?.length) return null
  return (
    <details className="plegat plegat--competencies">
      <summary>Competències que treballarem</summary>
      <h3 className="subtitol">Específiques de la matèria</h3>
      <ul className="competencies">
        {sa.competencies.map((codi) => (
          <li key={codi}>
            <strong>{codi}</strong>
            <span>
              <Text>{textCompetencia(codi)}</Text>
            </span>
          </li>
        ))}
      </ul>
      {sa.transversals?.length ? (
        <>
          <h3 className="subtitol">Transversals</h3>
          <ul className="competencies competencies--trans">
            {sa.transversals.map((codi) => (
              <li key={codi}>
                <strong>{codi}</strong>
                <span>
                  <Text>{textTransversal(codi)}</Text>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </details>
  )
}

export default function PaginaSA({ sa }) {
  const autoPreparada = !!objectiusSA(sa)
  return (
    <div className="sa">
      <Enllac a="/" className="tornar">
        Totes les preguntes del curs
      </Enllac>
      <div className="sa__cap">
        <div>
          <p className="sobretitol">Situació d'aprenentatge {sa.num}</p>
          <h1 tabIndex={-1}>
            <Text>{sa.titol}</Text>
          </h1>
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

      <h2>
        <Text>Sessions</Text>
      </h2>
      <ol className="sessions">
        {grups(sa.sessions).map((g) =>
          g.sessio ? <FilaSessio key={g.sessio.num} sa={sa} sessio={g.sessio} /> : <FilaBuida key={`b${g.buides[0].num}`} sessions={g.buides} />
        )}
      </ol>

      {sa.jocs?.length ? (
        <>
          <h2>Per practicar</h2>
          <ul className="sessions">
            {sa.jocs.map((j) => (
              <li key={j.id}>
                <Enllac a={`/${sa.id}/joc/${j.id}`} className="fila fila--sola fila--joc">
                  <span className="fila__titol">
                    <Icona nom="joc" />
                    <Text enLinia>{j.titol}</Text>
                  </span>
                  <span className="fila__meta">{j.exercicis.length} exercicis amb correcció</span>
                </Enllac>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>Quan acabem</h2>
      {autoPreparada || CONFIG.modeRevisio ? (
        <Enllac a={`/${sa.id}/autoavaluacio`} className="fila fila--sola">
          <span className="fila__titol">
            <Text enLinia>{`Autoavaluació de la SA${sa.num}`}</Text>
          </span>
          <span className="fila__meta">Què he après i fins on he arribat</span>
        </Enllac>
      ) : (
        <div className="fila fila--sola fila--buida">
          <span className="fila__titol">
            <Text>{`Autoavaluació de la SA${sa.num}`}</Text>
          </span>
          <span className="fila__meta">Pròximament</span>
        </div>
      )}

      <Competencies sa={sa} />
    </div>
  )
}
