import { CONFIG } from '../config.js'
import { PLANTILLES } from '../plantilles.js'
import { esPendent } from '../pendent.js'
import { usePrefs } from '../prefs.jsx'
import { Enllac } from '../router.jsx'
import Contingut, { Apunts, ExitTiquet, Recursos, teContingut, teRecursos } from '../components/Contingut.jsx'
import Pendent from '../components/Pendent.jsx'
import Text from '../components/Text.jsx'
import { EtiquetaTipus } from './PaginaSA.jsx'

function Fase({ fase, sessio }) {
  const { versio } = usePrefs()
  const valor = sessio[fase.clau]
  if (valor == null) return null

  if (!CONFIG.modeRevisio) {
    const visible =
      fase.especial === 'recursos'
        ? teRecursos(valor)
        : fase.especial === 'apunts'
          ? !esPendent(valor)
          : fase.especial === 'exit'
          ? teContingut(valor.preguntes, versio)
          : teContingut(valor, versio)
    if (!visible) return null
  }

  return (
    <section className="fase">
      <h2>
        <Text>{fase.titol}</Text>
      </h2>
      {fase.especial === 'recursos' ? (
        <Recursos valor={valor} />
      ) : fase.especial === 'apunts' ? (
        <Apunts valor={valor} />
      ) : fase.especial === 'exit' ? (
        <ExitTiquet valor={valor} />
      ) : (
        <Contingut valor={valor} llista={fase.llista} />
      )}
    </section>
  )
}

export default function PaginaSessio({ sa, sessio }) {
  const plantilla = sessio.tipus ? PLANTILLES[sessio.tipus] : null
  const anterior = sa.sessions.find((s) => s.num === sessio.num - 1)
  const seguent = sa.sessions.find((s) => s.num === sessio.num + 1)
  const titolPendent = esPendent(sessio.titol)

  return (
    <article className={`sessio sessio--${sessio.tipus || 'perdefinir'}`}>
      <Enllac a={`/${sa.id}`} className="tornar">
        SA{sa.num}. {sa.titol}
      </Enllac>

      <p className="sobretitol">
        <Text>{`Sessió ${sessio.num} de ${sa.sessions.length}`}</Text>
      </p>
      <h1>{titolPendent ? <Pendent nota={sessio.titol.nota} enLinia /> : <Text>{sessio.titol}</Text>}</h1>
      <p className="sessio__meta">
        <EtiquetaTipus sessio={sessio} />
        {sessio.tipus === 'laboratori' ? <span>{plantilla.grup}</span> : null}
        <span>{CONFIG.duradaSessio} minuts</span>
        {sessio.estat === 'feta' ? <span className="feta">Feta</span> : null}
      </p>

      {plantilla ? (
        <>
          <div className="fases">
            {plantilla.fases.map((f) => (
              <Fase key={f.clau} fase={f} sessio={sessio} />
            ))}
          </div>
          <div className="extres">
            {plantilla.extres.map((f) => (
              <Fase key={f.clau} fase={f} sessio={sessio} />
            ))}
          </div>
        </>
      ) : CONFIG.modeRevisio ? (
        <Pendent nota="Cal decidir si és una sessió d'aula o de laboratori. Segons el tipus, la pàgina fa servir una plantilla o l'altra." />
      ) : (
        <p className="cos">Aquesta sessió encara no està preparada.</p>
      )}

      <nav className="veines no-imprimir" aria-label="Altres sessions">
        {anterior ? (
          <Enllac a={`/${sa.id}/s/${anterior.num}`} className="boto boto--suau">
            Sessió {anterior.num}
          </Enllac>
        ) : (
          <span />
        )}
        {seguent ? (
          <Enllac a={`/${sa.id}/s/${seguent.num}`} className="boto boto--suau">
            Sessió {seguent.num}
          </Enllac>
        ) : null}
      </nav>
    </article>
  )
}
