import { CURS_INFO } from '../data/curs-info.js'
import { sasDeCompetencia, trobaSA } from '../data/curs.js'
import { Enllac } from '../router.jsx'
import Text from '../components/Text.jsx'

export default function ElCurs() {
  const c = CURS_INFO
  return (
    <article className="sessio">
      <Enllac a="/" className="tornar">
        Totes les preguntes del curs
      </Enllac>
      <p className="sobretitol">Curs {c.any}</p>
      <h1>Com funciona el curs</h1>

      <div className="fases">
        <section className="fase">
          <h2>
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

        <section className="fase">
          <h2>Com s'organitza el curs?</h2>
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

        <section className="fase">
          <h2>Aprendrem a…</h2>
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
          <p className="nota-eina">Al costat de cada competència hi ha les situacions d'aprenentatge on la treballarem.</p>
        </section>

        <section className="fase">
          <h2>
            <Text>Avaluació</Text>
          </h2>
          <p>
            <Text>{c.avaluacio.text}</Text>
          </p>
          <ul className="competencies">
            {c.avaluacio.nivells.map(([codi, nom]) => (
              <li key={codi}>
                <strong>{codi}</strong>
                <span>{nom}</span>
              </li>
            ))}
          </ul>
          <p>
            <strong>{c.avaluacio.nota}</strong>
          </p>
        </section>

        <section className="fase">
          <h2>
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
      </div>
    </article>
  )
}
