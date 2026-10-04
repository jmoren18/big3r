import { Enllac } from '../router.jsx'

export default function NoTrobada({ sa }) {
  return (
    <div className="sa">
      <h1>{sa && !sa.publicada ? sa.titol : 'Aquesta pàgina no existeix'}</h1>
      <p className="entrada">{sa && !sa.publicada ? 'Pròximament.' : "Pot ser que l'adreça estigui mal escrita."}</p>
      <Enllac a="/" className="boto">
        Torna a la portada
      </Enllac>
    </div>
  )
}
