import { useState } from 'react'
import Text from './Text.jsx'

// «Recordes?»: tres preguntes a l'atzar dels jocs de sessions anteriors (pràctica espaiada).
// Fa servir els enunciats i les solucions que ja hi ha als jocs: no s'hi afegeix res.
export function preguntesRecordes(sa, sessio) {
  const jocs = (sa.jocs || []).filter((j) => j.sessio && j.sessio < sessio.num)
  return jocs.flatMap((j) =>
    j.exercicis.flatMap((ex) =>
      ex.parts.flatMap((p) => {
        if (p.tipus === 'vf')
          return p.frases.map((f) => ({
            pregunta: `Verdader o fals? ${f.text}`,
            resposta: f.resposta ? 'Verdader.' : `Fals. ${f.correccio || ''}`.trim()
          }))
        if (p.tipus === 'buits')
          return p.frases.map((f) => ({ pregunta: `${f.abans}…${f.despres}`, resposta: f.respostes[0] }))
        if (p.tipus === 'relaciona')
          return p.files.map((f) => ({ pregunta: `${f.text.replace(/\.$/, '')}: quin nivell és?`, resposta: f.resposta }))
        return []
      })
    )
  )
}

const barreja = (llista) => {
  const c = [...llista]
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[c[i], c[j]] = [c[j], c[i]]
  }
  return c
}

export default function Recordes({ sa, sessio }) {
  const [triades] = useState(() => barreja(preguntesRecordes(sa, sessio)).slice(0, 3))
  return (
    <>
      <p className="nota-eina">Respon de memòria, sense mirar. Després comprova-ho.</p>
      <ol className="recordes">
        {triades.map((p) => (
          <li key={p.pregunta}>
            <p>
              <Text>{p.pregunta}</Text>
            </p>
            <details>
              <summary>Mostra la resposta</summary>
              <p className="recordes__resposta">
                <Text>{p.resposta}</Text>
              </p>
            </details>
          </li>
        ))}
      </ol>
    </>
  )
}
