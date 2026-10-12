import { format, useTemporitzador } from './Eines.jsx'

const MINUTS = [1, 2, 5, 10, 15]

export default function Temporitzador() {
  const { total, queden, enMarxa, tria, comenca, atura, afegeixMinut } = useTemporitzador()
  const acabat = queden === 0
  return (
    <div className="temporitzador">
      <p className={`rellotge ${acabat ? 'rellotge--acabat' : ''}`} role="timer" aria-live="off">
        {format(queden)}
      </p>
      <p className="estat-eina estat-eina--gran" aria-live="polite">
        {acabat ? "S'ha acabat el temps." : ''}
      </p>
      <div className="fila-botons" role="group" aria-label="Minuts">
        {MINUTS.map((m) => (
          <button key={m} type="button" className="boto boto--suau" aria-pressed={total === m * 60} onClick={() => tria(m)}>
            {m} min
          </button>
        ))}
        <button type="button" className="boto boto--suau" onClick={afegeixMinut}>
          Afegeix 1 min
        </button>
      </div>
      <div className="fila-botons">
        {enMarxa ? (
          <button type="button" className="boto" onClick={atura}>
            Atura
          </button>
        ) : (
          <button type="button" className="boto" onClick={comenca} disabled={acabat}>
            Comença
          </button>
        )}
        <button type="button" className="boto boto--suau" onClick={() => tria(total / 60)}>
          Torna a començar
        </button>
      </div>
    </div>
  )
}
