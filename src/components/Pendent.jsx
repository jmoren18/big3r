import { CONFIG } from '../config.js'

// Bloc groc per al contingut que falta. Només es veu en mode revisió.
export default function Pendent({ nota, enLinia = false }) {
  if (!CONFIG.modeRevisio) return null
  const Etiqueta = enLinia ? 'span' : 'p'
  return (
    <Etiqueta className={enLinia ? 'pendent pendent--linia' : 'pendent'}>
      <span className="cinta">PENDENT</span>
      {nota ? <span className="pendent__nota">{nota}</span> : null}
    </Etiqueta>
  )
}
