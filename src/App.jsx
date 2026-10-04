import { CONFIG } from './config.js'
import { Encaminador, useRuta } from './router.jsx'
import { Prefs } from './prefs.jsx'
import { trobaSA } from './data/curs.js'
import Capcalera from './components/Capcalera.jsx'
import Eines from './components/Eines.jsx'
import Portada from './pages/Portada.jsx'
import PaginaSA from './pages/PaginaSA.jsx'
import PaginaSessio from './pages/PaginaSessio.jsx'
import Autoavaluacio from './pages/Autoavaluacio.jsx'
import Joc from './pages/Joc.jsx'
import ElCurs from './pages/ElCurs.jsx'
import NoTrobada from './pages/NoTrobada.jsx'

function Pagina() {
  const { ruta } = useRuta()
  if (ruta === '/') return <Portada />
  if (ruta === '/curs') return <ElCurs />

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
  return sessio ? <PaginaSessio sa={sa} sessio={sessio} /> : <NoTrobada sa={sa} />
}

export default function App() {
  return (
    <Prefs>
      <Encaminador>
        <div className="pagina">
          <Capcalera />
          {CONFIG.modeRevisio && (
            <p className="avis-revisio no-imprimir">
              <span className="cinta">PENDENT</span> Mode revisió. Els blocs grocs marquen el que falta; els alumnes no
              els veuran.
            </p>
          )}
          <main>
            <Pagina />
          </main>
          <footer className="peu no-imprimir">
            {CONFIG.assignatura}. {CONFIG.centre}, Lloret de Mar.
          </footer>
        </div>
        <Eines />
      </Encaminador>
    </Prefs>
  )
}
