import { CONFIG } from '../config.js'
import { SAS } from '../data/curs.js'
import { Enllac } from '../router.jsx'
import Mostra from '../components/Mostra.jsx'
import Text from '../components/Text.jsx'

// Cada SA és un portaobjectes: etiqueta a l'esquerra, mostra a la dreta.
function Portaobjectes({ sa }) {
  const cos = (
    <>
      <span className="porta__etiqueta">SA{sa.num}</span>
      <span className="porta__text">
        <strong className="porta__titol">{sa.titol}</strong>
        <span className="porta__estat">
          {sa.publicada ? <Text>{`${sa.sessions.length} sessions. Entra-hi.`}</Text> : 'Pròximament'}
        </span>
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

export default function Portada() {
  const [activa, ...resta] = [...SAS.filter((s) => s.publicada), ...SAS.filter((s) => !s.publicada)]
  return (
    <div className="portada">
      <h1 className="pregunta-curs">{CONFIG.filConductor}</h1>
      <p className="entrada">Aquest curs ens farem sis preguntes. Comencem per la primera.</p>
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
