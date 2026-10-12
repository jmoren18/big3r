import { CONFIG } from '../config.js'
import { PLANTILLES } from '../plantilles.js'
import { esPendent, tria } from '../pendent.js'
import { usePrefs } from '../prefs.jsx'
import { Enllac } from '../router.jsx'
import { definida, objectiusSA, veina } from '../sessions.js'
import { textCompetencia } from '../data/curs-info.js'
import { Imatge, ModelFrase, Paraules, SelectorVersio, teImatge } from '../components/Ajudes.jsx'
import Contingut, { Apunts, ExitTiquet, Pregunta, Recursos, teContingut, teRecursos } from '../components/Contingut.jsx'
import Icona from '../components/Icona.jsx'
import Pendent from '../components/Pendent.jsx'
import Recordes, { preguntesRecordes } from '../components/Recordes.jsx'
import Text from '../components/Text.jsx'
import { EtiquetaTipus } from './PaginaSA.jsx'

// Diu si una fase es veu. En mode revisió es veuen també les pendents.
function esVisible(fase, sa, sessio, versio) {
  const valor = sessio[fase.clau]
  switch (fase.especial) {
    case 'recordes':
      return definida(sessio) && preguntesRecordes(sa, sessio).length > 0
    case 'tornem':
      return teContingut(sessio.pregunta, versio)
    case 'repte':
      return versio === 'C' && (CONFIG.modeRevisio ? valor != null : teContingut(valor, versio))
    default:
      break
  }
  if (valor == null) return false
  if (CONFIG.modeRevisio) return true
  // Una imatge ja és contingut: la fase es veu encara que el text estigui pendent.
  if (teImatge(sessio.imatges?.[fase.clau])) return true
  if (fase.especial === 'recursos') return teRecursos(valor)
  if (fase.especial === 'apunts') return !esPendent(valor)
  if (fase.especial === 'exit') return teContingut(valor.preguntes, versio)
  return teContingut(valor, versio)
}

// Objectius de la sessió: llista d'identificadors (O1, O2…) dels objectius de la SA.
function Objectius({ valor, sa }) {
  const { versio } = usePrefs()
  const v = tria(valor, versio)
  if (!Array.isArray(v) || !v.every((x) => typeof x === 'string' && /^O\d+$/.test(x))) return <Contingut valor={valor} />
  const llista = objectiusSA(sa)
  return (
    <ul className="objectius-sessio">
      {v.map((id) => {
        const o = llista?.find((x) => x.id === id)
        return (
          <li key={id}>
            <span className="objectius-sessio__codi">
              {id}
              {o?.competencia ? <span title={textCompetencia(o.competencia)}> · {o.competencia}</span> : null}
            </span>
            {o ? <Text>{o.text}</Text> : <Pendent nota={`Text de l'objectiu ${id} a la SA`} enLinia />}
          </li>
        )
      })}
    </ul>
  )
}

function CosFase({ fase, sa, sessio }) {
  const { versio } = usePrefs()
  const valor = sessio[fase.clau]
  switch (fase.especial) {
    case 'pregunta':
      return <Pregunta valor={valor} />
    case 'recordes':
      return <Recordes sa={sa} sessio={sessio} />
    case 'objectius':
      return <Objectius valor={valor} sa={sa} />
    case 'activitat':
      return (
        <>
          <Contingut valor={valor} />
          {sessio.modelFrase ? <ModelFrase valor={sessio.modelFrase} /> : null}
        </>
      )
    case 'recursos':
      return <Recursos valor={valor} />
    case 'apunts':
      return versio === 'A' || esPendent(valor) ? (
        <Apunts valor={valor} />
      ) : (
        <details className="plegat">
          <summary>Obre-ho quan hagis acabat l'activitat</summary>
          <Apunts valor={valor} />
        </details>
      )
    case 'tornem':
      return (
        <>
          <p className="nota-eina">Ara que has acabat, torna a pensar en la pregunta de l'inici. Ha canviat la teva resposta?</p>
          <Pregunta valor={sessio.pregunta} />
        </>
      )
    case 'exit':
      return <ExitTiquet valor={valor} />
    default:
      return <Contingut valor={valor} llista={fase.llista} />
  }
}

function Fase({ fase, sa, sessio }) {
  return (
    <section className={`fase fase--${fase.clau}`}>
      <h2>
        <Icona nom={fase.icona} />
        <Text>{fase.titol}</Text>
      </h2>
      <CosFase fase={fase} sa={sa} sessio={sessio} />
      {sessio.imatges?.[fase.clau] ? <Imatge valor={sessio.imatges[fase.clau]} /> : null}
    </section>
  )
}

// Franja «On som»: pregunta de la SA i les 12 sessions com a punts.
export function OnSom({ sa, actual }) {
  return (
    <nav className="on-som no-imprimir" aria-label={`Sessions de la SA${sa.num}`}>
      <Enllac a={`/${sa.id}`} className="on-som__sa">
        <span className="on-som__codi">SA{sa.num}</span>
        <Text enLinia>{sa.titol}</Text>
      </Enllac>
      <ol className="punts-sessions">
        {sa.sessions.map((s) => {
          const def = definida(s)
          const classes = [
            'punt',
            s.estat === 'feta' ? 'punt--feta' : '',
            s.tipus === 'laboratori' ? 'punt--lab' : '',
            s.num === actual ? 'punt--actual' : '',
            def ? '' : 'punt--buit'
          ].join(' ')
          const etiqueta = `Sessió ${s.num}${def ? `: ${s.titol}` : ', pròximament'}${s.estat === 'feta' ? ', feta' : ''}${
            s.num === sa.avui ? ', avui' : ''
          }`
          return (
            <li key={s.num}>
              {def || CONFIG.modeRevisio ? (
                <Enllac
                  a={`/${sa.id}/s/${s.num}`}
                  className={classes}
                  aria-label={etiqueta}
                  aria-current={s.num === actual ? 'page' : undefined}
                  title={etiqueta}
                >
                  {s.num}
                </Enllac>
              ) : (
                <span className={classes} title={etiqueta}>
                  <span className="amagat">{etiqueta}</span>
                  <span aria-hidden="true">{s.num}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function BotoVeina({ sa, sessio, dir }) {
  const s = veina(sa, sessio, dir)
  if (!s) {
    if (dir < 0) return <span />
    return (
      <Enllac a={`/${sa.id}`} className="boto boto--suau veina veina--seg">
        <span>Torna a la SA{sa.num}</span>
        <Icona nom="seguent" />
      </Enllac>
    )
  }
  const titol = definida(s) ? s.titol : 'Pròximament'
  return (
    <Enllac a={`/${sa.id}/s/${s.num}`} className={`boto boto--suau veina ${dir < 0 ? 'veina--ant' : 'veina--seg'}`}>
      {dir < 0 ? <Icona nom="anterior" /> : null}
      <span>
        <span className="veina__num">{s.num}</span> · <Text enLinia>{titol}</Text>
      </span>
      {dir > 0 ? <Icona nom="seguent" /> : null}
    </Enllac>
  )
}

export default function PaginaSessio({ sa, sessio }) {
  const { versio } = usePrefs()
  const plantilla = sessio.tipus ? PLANTILLES[sessio.tipus] : null
  const def = definida(sessio)
  const fases = plantilla ? plantilla.fases.filter((f) => esVisible(f, sa, sessio, versio)) : []
  const extres = plantilla ? plantilla.extres.filter((f) => esVisible(f, sa, sessio, versio)) : []
  const buida = !CONFIG.modeRevisio && (!def || fases.length + extres.length === 0)

  return (
    <article className={`sessio sessio--${sessio.tipus || 'perdefinir'}`}>
      <OnSom sa={sa} actual={sessio.num} />

      <div className="sessio__cap">
        <p className="sobretitol">
          <Text>{`Sessió ${sessio.num} de ${sa.sessions.length}`}</Text>
        </p>
        <h1 tabIndex={-1}>{def ? <Text>{sessio.titol}</Text> : CONFIG.modeRevisio ? <Pendent nota={sessio.titol.nota} enLinia /> : 'Pròximament'}</h1>
        <p className="sessio__meta">
          <EtiquetaTipus sessio={sessio} />
          {sessio.tipus === 'laboratori' ? <span>{plantilla.grup}</span> : null}
          <span>{CONFIG.duradaSessio} minuts</span>
          {sessio.estat === 'feta' ? <span className="feta">Feta</span> : null}
          {sa.avui === sessio.num ? <span className="avui">Avui</span> : null}
        </p>
        {!buida ? <SelectorVersio /> : null}
      </div>

      {buida ? (
        <div className="estat-buit">
          <p>Aquesta sessió encara no està preparada.</p>
        </div>
      ) : plantilla ? (
        <>
          <div className="fases">
            {fases.map((f) => (
              <Fase key={f.clau} fase={f} sa={sa} sessio={sessio} />
            ))}
          </div>
          {extres.length ? (
            <div className="extres">
              {extres.map((f) => (
                <Fase key={f.clau} fase={f} sa={sa} sessio={sessio} />
              ))}
            </div>
          ) : null}
          <Paraules font={sessio} />
        </>
      ) : (
        <Pendent nota="Cal decidir si és una sessió d'aula o de laboratori. Segons el tipus, la pàgina fa servir una plantilla o l'altra." />
      )}

      <nav className="veines no-imprimir" aria-label="Altres sessions">
        <BotoVeina sa={sa} sessio={sessio} dir={-1} />
        <BotoVeina sa={sa} sessio={sessio} dir={1} />
      </nav>
    </article>
  )
}
