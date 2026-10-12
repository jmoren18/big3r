import { useEffect, useRef } from 'react'
import { CONFIG } from './config.js'
import { Encaminador, Enllac, useRuta } from './router.jsx'
import { Prefs } from './prefs.jsx'
import { trobaSA } from './data/curs.js'
import { titolDeRuta } from './sessions.js'
import Capcalera, { AvisIdioma } from './components/Capcalera.jsx'
import { EinesProvider, PindolaTemps } from './components/Eines.jsx'
import Icona from './components/Icona.jsx'
import Portada from './pages/Portada.jsx'
import PaginaSA from './pages/PaginaSA.jsx'
import PaginaSessio from './pages/PaginaSessio.jsx'
import Autoavaluacio from './pages/Autoavaluacio.jsx'
import Joc from './pages/Joc.jsx'
import ElCurs from './pages/ElCurs.jsx'
import Aula from './pages/Aula.jsx'
import NoTrobada from './pages/NoTrobada.jsx'

function Pagina() {
  const { ruta } = useRuta()
  if (ruta === '/') return <Portada />
  if (ruta === '/curs') return <ElCurs />
  if (ruta === '/aula') return <Aula />

  const m = ruta.match(/^\/(sa\d+)(?:\/(s\/(\d+)|autoavaluacio|joc\/([a-z0-9-]+)))?\/?$/)
  const sa = m && trobaSA(m[1])
  if (!sa || !sa.publicada) return <NoTrobada sa={sa} />
  if (!m[2]) return <PaginaSA sa={sa} />
  if (m[2] === 'autoavaluacio') return <Autoavaluacio sa={sa} />
  if (m[4]) {
    const joc = (sa.jocs || []).find((j) => j.id === m[4])
    return joc ? <Joc key={joc.id} sa={sa} joc={joc} /> : <NoTrobada sa={sa} />
  }

  const sessio = sa.sessions.find((s) => s.num === Number(m[3]))
  return sessio ? <PaginaSessio key={sessio.num} sa={sa} sessio={sessio} /> : <NoTrobada sa={sa} />
}

// En canviar de pàgina: títol de la pestanya i focus al títol de la pàgina nova,
// perquè el teclat i el lector de pantalla comencin per dalt.
function EnCanviarDePagina() {
  const { ruta } = useRuta()
  const primera = useRef(true)
  useEffect(() => {
    document.title = titolDeRuta(ruta)
    if (primera.current) {
      primera.current = false
      return
    }
    document.querySelector('main h1')?.focus({ preventScroll: true })
  }, [ruta])
  return null
}

export default function App() {
  return (
    <Prefs>
      <Encaminador>
        <EinesProvider>
          <EnCanviarDePagina />
          <div className="pagina">
            <Capcalera />
            <AvisIdioma />
            {CONFIG.modeRevisio && (
              <p className="avis-revisio no-imprimir">
                <span className="cinta">PENDENT</span> Mode revisió. Els blocs grocs marquen el que falta i els blaus
                (<span className="cinta cinta--proposta">PROPOSTA</span>), el que ha proposat Claude. Els alumnes no veuran cap
                etiqueta.
              </p>
            )}
            <main>
              <Pagina />
            </main>
            <footer className="peu no-imprimir">
              <span>
                {CONFIG.assignatura}. {CONFIG.centre}, Lloret de Mar.
              </span>
              <Enllac a="/aula" className="peu__eines">
                <Icona nom="temporitzador" />
                Eines d'aula
              </Enllac>
            </footer>
          </div>
          <PindolaTemps />
        </EinesProvider>
      </Encaminador>
    </Prefs>
  )
}
