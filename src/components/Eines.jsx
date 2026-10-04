import { useState } from 'react'
import Temporitzador from './Temporitzador.jsx'
import Sonometre from './Sonometre.jsx'

const EINES = [
  { id: 'temps', nom: 'Temporitzador', Component: Temporitzador },
  { id: 'so', nom: 'Sonòmetre', Component: Sonometre }
]

// Eines per projectar a l'aula. Queden fixes a baix de la pantalla.
export default function Eines() {
  const [oberta, setOberta] = useState(null)
  const eina = EINES.find((e) => e.id === oberta)

  return (
    <div className="eines no-imprimir">
      {eina ? (
        <section className="eines__panell" aria-label={eina.nom}>
          <div className="eines__cap">
            <h2>{eina.nom}</h2>
            <button type="button" className="boto boto--suau" onClick={() => setOberta(null)}>
              Tanca
            </button>
          </div>
          <eina.Component />
        </section>
      ) : null}
      <div className="eines__barra" role="group" aria-label="Eines d'aula">
        {EINES.map((e) => (
          <button
            key={e.id}
            type="button"
            className="boto boto--eina"
            aria-pressed={oberta === e.id}
            onClick={() => setOberta(oberta === e.id ? null : e.id)}
          >
            {e.nom}
          </button>
        ))}
      </div>
    </div>
  )
}
