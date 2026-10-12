import { CONFIG } from '../config.js'
import { SAS } from '../data/curs.js'
import { textCompetencia, textTransversal } from '../data/curs-info.js'
import { usePrefs } from '../prefs.jsx'
import { Enllac } from '../router.jsx'
import { definida } from '../sessions.js'
import Icona from '../components/Icona.jsx'
import Mostra from '../components/Mostra.jsx'
import Text from '../components/Text.jsx'

// Cada SA és un portaobjectes: etiqueta a l'esquerra, mostra a la dreta.
// Els codis de competències només surten a la SA publicada.
function Portaobjectes({ sa }) {
  const cos = (
    <>
      <span className="porta__etiqueta">SA{sa.num}</span>
      <span className="porta__text">
        <strong className="porta__titol">{sa.publicada ? <Text enLinia>{sa.titol}</Text> : sa.titol}</strong>
        <span className="porta__estat">
          {sa.publicada ? <Text enLinia>{`${sa.sessions.length} sessions. Entra-hi.`}</Text> : 'Pròximament'}
        </span>
        {sa.publicada && sa.competencies?.length ? (
          <span className="porta__comp" aria-label={`Competències: ${[...sa.competencies, ...(sa.transversals || [])].join(', ')}`}>
            {sa.competencies.map((c) => (
              <span key={c} className="xip-sa" title={textCompetencia(c)}>
                {c}
              </span>
            ))}
            {(sa.transversals || []).map((c) => (
              <span key={c} className="xip-sa xip-sa--trans" title={textTransversal(c)}>
                {c}
              </span>
            ))}
          </span>
        ) : null}
      </span>
      <Mostra tenyida={sa.publicada} llavor={sa.num} />
    </>
  )
  return sa.publicada ? (
    <Enllac a={`/${sa.id}`} className="porta porta--activa">
      {cos}
    </Enllac>
  ) : (
    <div className="porta porta--buida">{cos}</div>
  )
}

// Botons d'idioma: cada llengua escrita en la seva llengua, perquè qui no llegeix català la reconegui.
function TriaIdioma() {
  const { idioma, setIdioma } = usePrefs()
  return (
    <section className="tria-idioma" aria-labelledby="tria-idioma-titol">
      <h2 id="tria-idioma-titol">
        <Icona nom="idioma" />
        Ajuda d'idioma
      </h2>
      <div className="tria-idioma__botons">
        {CONFIG.idiomes.map((i) => (
          <button
            key={i.codi}
            type="button"
            className="boto-idioma"
            aria-pressed={idioma === i.codi}
            onClick={() => setIdioma(idioma === i.codi ? '' : i.codi)}
          >
            <span lang={i.codi} dir={i.dir} className="boto-idioma__nom">
              {i.nom}
            </span>
            <span className="boto-idioma__ca">{i.catala}</span>
          </button>
        ))}
        {idioma ? (
          <button type="button" className="boto-idioma boto-idioma--treu" onClick={() => setIdioma('')}>
            <span className="boto-idioma__nom">Només català</span>
          </button>
        ) : null}
      </div>
    </section>
  )
}

function SessioAvui() {
  const sa = SAS.find((s) => s.publicada && s.avui)
  const sessio = sa?.sessions.find((s) => s.num === sa.avui)
  if (!sessio || !definida(sessio)) return null
  return (
    <Enllac a={`/${sa.id}/s/${sessio.num}`} className="avui-boto">
      <span className="avui">Avui</span>
      <span className="avui-boto__text">
        <span className="avui-boto__sessio">
          SA{sa.num} · Sessió {sessio.num}
        </span>
        <strong>
          <Text enLinia>{sessio.titol}</Text>
        </strong>
      </span>
      <Icona nom="seguent" />
    </Enllac>
  )
}

export default function Portada() {
  const [activa, ...resta] = [...SAS.filter((s) => s.publicada), ...SAS.filter((s) => !s.publicada)]
  return (
    <div className="portada">
      <h1 className="pregunta-curs" tabIndex={-1}>
        {CONFIG.filConductor}
      </h1>
      <p className="entrada">Aquest curs ens farem sis preguntes. Comencem per la primera.</p>
      <SessioAvui />
      <TriaIdioma />
      <Enllac a="/curs" className="boto boto--suau">
        Com funciona el curs
      </Enllac>
      <ul className="safata">
        <li className="safata__principal">
          <Portaobjectes sa={activa} />
        </li>
        {resta.map((sa) => (
          <li key={sa.id}>
            <Portaobjectes sa={sa} />
          </li>
        ))}
      </ul>
    </div>
  )
}
