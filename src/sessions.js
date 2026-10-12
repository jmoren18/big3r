import { CONFIG } from './config.js'
import { esPendent } from './pendent.js'
import { trobaSA } from './data/curs.js'

// Una sessió està definida quan ja té títol.
export const definida = (sessio) => !esPendent(sessio.titol)

// Sessió anterior (dir = -1) o següent (dir = 1). A la vista alumne se salten les que
// encara no estan definides; en mode revisió es va d'una en una.
export function veina(sa, sessio, dir) {
  const llista = dir > 0 ? sa.sessions.filter((s) => s.num > sessio.num) : sa.sessions.filter((s) => s.num < sessio.num).reverse()
  return llista.find((s) => CONFIG.modeRevisio || definida(s)) || null
}

// Objectius de la SA, si ja estan escrits (llista); si no, null.
export const objectiusSA = (sa) => (Array.isArray(sa.objectius) ? sa.objectius : null)

// Sessions que treballen un objectiu de la SA.
export const sessionsDeObjectiu = (sa, id) =>
  sa.sessions.filter((s) => {
    const o = s.objectius
    const llista = Array.isArray(o) ? o : o && typeof o === 'object' && !esPendent(o) ? Object.values(o).flat() : []
    return llista.includes(id)
  })

// Títol de la pestanya del navegador per a cada ruta.
export function titolDeRuta(ruta) {
  const base = CONFIG.curt
  if (ruta === '/') return `${CONFIG.filConductor} · ${base}`
  if (ruta === '/curs') return `Com funciona el curs · ${base}`
  if (ruta === '/aula') return `Eines d'aula · ${base}`
  const m = ruta.match(/^\/(sa\d+)(?:\/(s\/(\d+)|autoavaluacio|joc\/([a-z0-9-]+)))?\/?$/)
  const sa = m && trobaSA(m[1])
  if (!sa) return base
  if (!sa.publicada || !m[2]) return `SA${sa.num} · ${sa.titol} · ${base}`
  if (m[2] === 'autoavaluacio') return `Autoavaluació SA${sa.num} · ${base}`
  if (m[4]) {
    const joc = (sa.jocs || []).find((j) => j.id === m[4])
    return joc ? `Joc · ${joc.titol} · ${base}` : base
  }
  const s = sa.sessions.find((x) => x.num === Number(m[3]))
  if (!s) return base
  return `Sessió ${s.num} · ${definida(s) ? s.titol : 'Pròximament'} · ${base}`
}
