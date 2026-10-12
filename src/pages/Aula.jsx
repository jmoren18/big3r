import { useEffect, useRef, useState } from 'react'
import { Enllac } from '../router.jsx'
import Icona from '../components/Icona.jsx'
import Sonometre from '../components/Sonometre.jsx'
import Temporitzador from '../components/Temporitzador.jsx'

// Eines per projectar a l'aula: el temporitzador i el sonòmetre, l'un al costat de l'altre.
// No surten a les pàgines dels alumnes; s'hi arriba des de l'enllaç del peu.
export default function Aula() {
  const caixa = useRef(null)
  const [completa, setCompleta] = useState(false)

  useEffect(() => {
    const canvi = () => setCompleta(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', canvi)
    return () => document.removeEventListener('fullscreenchange', canvi)
  }, [])

  const commuta = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await caixa.current?.requestFullscreen()
    } catch {
      // Si el navegador no ho permet, la pàgina es pot ampliar amb el zoom.
    }
  }

  return (
    <div className="aula" ref={caixa}>
      <div className="aula__cap">
        <div>
          <Enllac a="/" className="tornar no-pantalla-completa">
            Portada
          </Enllac>
          <h1 tabIndex={-1}>Eines d'aula</h1>
        </div>
        {document.fullscreenEnabled !== false ? (
          <button type="button" className="boto boto--suau" onClick={commuta}>
            <Icona nom="pantalla" />
            {completa ? 'Surt de la pantalla completa' : 'Pantalla completa'}
          </button>
        ) : null}
      </div>
      <div className="aula__eines">
        <section className="eina" aria-labelledby="eina-temps">
          <h2 id="eina-temps">
            <Icona nom="temporitzador" />
            Temporitzador
          </h2>
          <Temporitzador />
        </section>
        <section className="eina" aria-labelledby="eina-so">
          <h2 id="eina-so">
            <Icona nom="sonometre" />
            Sonòmetre
          </h2>
          <Sonometre />
        </section>
      </div>
      <p className="nota-eina no-pantalla-completa">
        Per projectar a l'aula. Si canvies de pàgina, el temporitzador continua comptant i el temps queda a baix a la dreta.
      </p>
    </div>
  )
}
