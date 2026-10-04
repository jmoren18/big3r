import { CONFIG } from '../config.js'
import { esPendent, esPerVersio, tria } from '../pendent.js'
import { usePrefs } from '../prefs.jsx'
import { Enllac } from '../router.jsx'
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
      {varia ? (
        <p className="marca-versio">
          Versió {versio}, {CONFIG.versions.find((x) => x.id === versio)?.nom}
        </p>
      ) : null}
      {cos}
    </>
  )
}

export function Recursos({ valor }) {
  if (esPendent(valor)) return <Pendent nota={valor.nota} />
  const visibles = CONFIG.modeRevisio ? valor : valor.filter((r) => r.ruta || !esPendent(r.url))
  return (
    <ul className="recursos">
      {visibles.map((r, i) => (
        <li key={i}>
          {r.ruta ? (
            <Enllac a={r.ruta}>
              <Text>{r.nom}</Text>
            </Enllac>
          ) : esPendent(r.url) ? (
            <>
              <span>
                <Text>{r.nom}</Text>
              </span>
              <Pendent nota={r.url.nota} enLinia />
            </>
          ) : (
            <a href={r.url} target="_blank" rel="noreferrer">
              <Text>{r.nom}</Text>
            </a>
          )}
          {r.nota ? <span className="recursos__nota">{r.nota}</span> : null}
        </li>
      ))}
    </ul>
  )
}

export function ExitTiquet({ valor }) {
  const { versio } = usePrefs()
  const preguntes = tria(valor.preguntes, versio)
  return (
    <>
      {esPendent(preguntes) ? (
        <Pendent nota={preguntes.nota} />
      ) : (
        <ol className="passos">
          {preguntes.map((p, i) => (
            <li key={i}>
              <Text>{p}</Text>
            </li>
          ))}
        </ol>
      )}
      {valor.formulari ? (
        <a className="boto" href={valor.formulari} target="_blank" rel="noreferrer">
          Respon al formulari
        </a>
      ) : esPendent(preguntes) ? null : (
        <p className="nota-eina">Respon en paper.</p>
      )}
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
          {a.marca ? <span className="apunts__marca">{a.marca}</span> : null}
        </li>
      ))}
    </ol>
  )
}
