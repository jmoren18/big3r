import { CURS_INFO } from '../data/curs-info.js'
import { sasDeCompetencia, trobaSA } from '../data/curs.js'
import { Enllac } from '../router.jsx'
import Icona from '../components/Icona.jsx'
import Text from '../components/Text.jsx'

// Primer el que els alumnes han de fer (material, llibreta, avaluació);
// les competències, plegades al final.
export default function ElCurs() {
  const c = CURS_INFO
  return (
    <article className="curs">
      <Enllac a="/" className="tornar">
        Totes les preguntes del curs
      </Enllac>
      <p className="sobretitol">Curs {c.any}</p>
      <h1 tabIndex={-1}>Com funciona el curs</h1>

      <section className="bloc">
        <h2>
          <Icona nom="material" />
          <Text>Material</Text>
        </h2>
        <ul className="punts">
          {c.material.map((m) => (
            <li key={m}>
              <Text>{m}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="bloc">
        <h2>
          <Icona nom="apunts" />
          <Text>Portada de la llibreta</Text>
        </h2>
        <p>A la portada hi ha d'haver:</p>
        <ul className="punts">
          {c.portada.camps.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p>
          <Text>{c.portada.text}</Text>
        </p>
      </section>

      <section className="bloc">
        <h2>
          <Icona nom="objectius" />
          <Text>Avaluació</Text>
        </h2>
        <p>
          <Text>{c.avaluacio.text}</Text>
        </p>
        <ul className="competencies">
          {c.avaluacio.nivells.map(([codi, nom]) => (
            <li key={codi}>
              <strong>{codi}</strong>
              <span>
                <Text>{nom}</Text>
              </span>
            </li>
          ))}
        </ul>
        <p>
          <strong>{c.avaluacio.nota}</strong>
        </p>
      </section>

      <section className="bloc">
        <h2>
          <Icona nom="siHasFaltat" />
          Com s'organitza el curs?
        </h2>
        <div className="trimestres">
          {c.trimestres.map((t) => (
            <div key={t.nom}>
              <h3>
                <Text>{t.nom}</Text>
              </h3>
              <ul>
                {t.sas.map((id) => {
                  const sa = trobaSA(id)
                  return <li key={id}>{sa.publicada ? <Enllac a={`/${sa.id}`}>{sa.titol}</Enllac> : sa.titol}</li>
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <details className="plegat plegat--competencies">
        <summary>Aprendrem a… (competències de la matèria)</summary>
        <ul className="competencies">
          {c.competencies.map(([codi, text]) => (
            <li key={codi}>
              <strong>{codi}</strong>
              <span>
                <Text>{text}</Text>
                <span className="on-es-treballa">
                  {sasDeCompetencia(codi).map((sa) => (
                    <span key={sa.id} className="xip-sa" title={sa.titol}>
                      SA{sa.num}
                    </span>
                  ))}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="nota-eina">Sota cada competència hi ha les situacions d'aprenentatge on la treballarem.</p>
      </details>

      <details className="plegat plegat--competencies">
        <summary>També aprendrem a… (competències transversals)</summary>
        <p>Són competències transversals: es treballen a totes les matèries.</p>
        {c.transversals.map((g) => (
          <div key={g.grup} className="grup-trans">
            <h3 className="subtitol">{g.grup}</h3>
            <ul className="competencies competencies--trans">
              {g.items.map(([codi, text, on]) => (
                <li key={codi}>
                  <strong>{codi}</strong>
                  <span>
                    <Text>{text}</Text>
                    <span className="on-es-treballa">
                      {on ? (
                        <span className="xip-sa">{on}</span>
                      ) : (
                        sasDeCompetencia(codi).map((sa) => (
                          <span key={sa.id} className="xip-sa" title={sa.titol}>
                            SA{sa.num}
                          </span>
                        ))
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </details>
    </article>
  )
}
