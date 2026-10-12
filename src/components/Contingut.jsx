import { CONFIG } from '../config.js'
import { REGULACIO } from '../plantilles.js'
import { esPendent, esPerVersio, esPropostaTriada, tria } from '../pendent.js'
import { usePrefs } from '../prefs.jsx'
import { Enllac } from '../router.jsx'
import { MarcaProposta } from './Ajudes.jsx'
import Icona from './Icona.jsx'
import Pendent from './Pendent.jsx'
import Text from './Text.jsx'

// Diu si un camp té alguna cosa per ensenyar als alumnes en la versió triada.
export const teContingut = (valor, versio) => {
  const v = tria(valor, versio)
  if (v == null || esPendent(v)) return false
  if (Array.isArray(v)) return v.some((x) => !esPendent(x))
  return true
}

// Pinta qualsevol camp d'una sessió: text, llista, valor per versió o pendent.
export default function Contingut({ valor, llista }) {
  const { versio } = usePrefs()
  const v = tria(valor, versio)
  const varia = esPerVersio(valor)

  let cos
  if (v == null) cos = null
  else if (esPendent(v)) cos = <Pendent nota={v.nota} />
  else if (Array.isArray(v)) {
    const Llista = llista === 'passos' ? 'ol' : 'ul'
    cos = (
      <Llista className={llista === 'passos' ? 'passos' : 'punts'}>
        {v
          .filter((item) => CONFIG.modeRevisio || !esPendent(item))
          .map((item, i) => (
            <li key={i}>{esPendent(item) ? <Pendent nota={item.nota} enLinia /> : <Text>{item}</Text>}</li>
          ))}
      </Llista>
    )
  } else {
    cos = (
      <p>
        <Text>{v}</Text>
      </p>
    )
  }

  return (
    <>
      {varia && v != null ? <p className="marca-versio">Versió {versio}</p> : null}
      {cos}
      {v != null && !esPendent(v) && esPropostaTriada(valor, versio) ? <MarcaProposta /> : null}
    </>
  )
}

// «Per començar»: una pregunta, o el format «Un company diu…».
export function Pregunta({ valor }) {
  const { versio } = usePrefs()
  const v = tria(valor, versio)
  if (v && typeof v === 'object' && !esPendent(v) && !Array.isArray(v) && 'company' in v) {
    return (
      <div className="company">
        <blockquote>
          <strong>Un company diu:</strong> «<Text>{v.company}</Text>»
        </blockquote>
        {v.pregunta ? (
          <p className="company__pregunta">
            <Text>{v.pregunta}</Text>
          </p>
        ) : null}
        {esPropostaTriada(valor, versio) ? <MarcaProposta /> : null}
      </div>
    )
  }
  return <Contingut valor={valor} />
}

// Materials. Els enllaços interns (jocs, altres sessions) surten primer i destacats;
// els externs porten la marca ↗ perquè s'obren en una altra pestanya.
export function Recursos({ valor }) {
  if (esPendent(valor)) return <Pendent nota={valor.nota} />
  const visibles = CONFIG.modeRevisio ? valor : valor.filter((r) => r.ruta || !esPendent(r.url))
  const interns = visibles.filter((r) => r.ruta)
  const externs = visibles.filter((r) => !r.ruta)
  return (
    <>
      {interns.length ? (
        <ul className="recursos-interns">
          {interns.map((r) => (
            <li key={r.ruta + r.nom}>
              <Enllac a={r.ruta} className={`recurs-intern ${r.ruta.includes('/joc/') ? 'recurs-intern--joc' : ''}`}>
                <Icona nom={r.ruta.includes('/joc/') ? 'joc' : 'apunts'} />
                <span className="recurs-intern__text">
                  <strong>
                    <Text enLinia>{r.nom}</Text>
                  </strong>
                  {r.nota ? <span className="recursos__nota">{r.nota}</span> : null}
                </span>
              </Enllac>
            </li>
          ))}
        </ul>
      ) : null}
      {externs.length ? (
        <ul className="recursos">
          {externs.map((r, i) => (
            <li key={i}>
              {esPendent(r.url) ? (
                <>
                  <span lang={r.lang}>
                    <Text>{r.nom}</Text>
                  </span>
                  <Pendent nota={r.url.nota} enLinia />
                </>
              ) : (
                <a href={r.url} target="_blank" rel="noreferrer" className="enllac-extern">
                  <span lang={r.lang}>{r.lang ? r.nom : <Text enLinia>{r.nom}</Text>}</span>
                  <Icona nom="extern" />
                  <span className="amagat"> (s'obre en una pestanya nova)</span>
                </a>
              )}
              {r.nota ? <span className="recursos__nota">{r.nota}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}

export function ExitTiquet({ valor }) {
  const { versio } = usePrefs()
  const preguntes = tria(valor.preguntes, versio)
  const hiHaPreguntes = !esPendent(preguntes)
  return (
    <>
      {hiHaPreguntes ? (
        <ol className="passos">
          {preguntes.map((p, i) => (
            <li key={i}>
              <Text>{p}</Text>
            </li>
          ))}
        </ol>
      ) : (
        <Pendent nota={preguntes.nota} />
      )}
      {hiHaPreguntes || CONFIG.modeRevisio ? (
        <div className="regulacio">
          <p>
            <Text>{tria(REGULACIO, versio)}</Text>
          </p>
          <MarcaProposta />
        </div>
      ) : null}
      {valor.formulari ? (
        <a className="boto" href={valor.formulari} target="_blank" rel="noreferrer">
          Respon al formulari
        </a>
      ) : hiHaPreguntes ? (
        <p className="nota-eina">Respon en paper.</p>
      ) : null}
    </>
  )
}

// Un recurs compta com a visible si almenys un enllaç ja existeix.
export const teRecursos = (valor) =>
  Array.isArray(valor) && (CONFIG.modeRevisio || valor.some((r) => r.ruta || !esPendent(r.url)))

// Apunts numerats: títol en negreta, explicació i, si cal, una marca.
export function Apunts({ valor }) {
  if (esPendent(valor)) return <Pendent nota={valor.nota} />
  return (
    <ol className="apunts">
      {valor.map((a) => (
        <li key={a.titol}>
          <strong>
            <Text>{a.titol}</Text>.
          </strong>{' '}
          <Text>{a.text}</Text>
          {a.marca ? (
            <span className="apunts__marca">
              <Text>{a.marca}</Text>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
