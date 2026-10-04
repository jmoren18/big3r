import { useId, useMemo } from 'react'

// Camp del microscopi. Si la mostra està tenyida, dibuixa cèl·lules de la
// mucosa bucal amb blau de metilè; si no, el cercle queda buit.
const aleatori = (llavor) => () => {
  llavor |= 0
  llavor = (llavor + 0x6d2b79f5) | 0
  let t = Math.imul(llavor ^ (llavor >>> 15), 1 | llavor)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const CENTRES = [
  [34, 30], [66, 28], [22, 58], [52, 54], [80, 56], [38, 82], [68, 80]
]

function celula(rnd, cx, cy) {
  const n = 9
  const punts = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2 + rnd() * 0.3
    const r = 12 + rnd() * 7
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]
  })
  const mig = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`
  let d = `M ${f(mig(punts[n - 1], punts[0]))}`
  for (let i = 0; i < n; i++) d += ` Q ${f(punts[i])} ${f(mig(punts[i], punts[(i + 1) % n]))}`
  return { d: `${d} Z`, nucli: [cx + (rnd() - 0.5) * 6, cy + (rnd() - 0.5) * 6, 2.2 + rnd() * 1.2] }
}

export default function Mostra({ tenyida = false, llavor = 1, className = '' }) {
  const id = useId()
  const celules = useMemo(() => {
    if (!tenyida) return []
    const rnd = aleatori(llavor * 7919)
    return CENTRES.map(([x, y]) => celula(rnd, x + (rnd() - 0.5) * 6, y + (rnd() - 0.5) * 6))
  }, [tenyida, llavor])

  return (
    <svg className={`mostra ${tenyida ? 'mostra--tenyida' : ''} ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <circle cx="50" cy="50" r="46" />
        </clipPath>
      </defs>
      <circle className="mostra__camp" cx="50" cy="50" r="46" />
      <g clipPath={`url(#${id})`}>
        {celules.map((c, i) => (
          <g key={i}>
            <path className="mostra__celula" d={c.d} />
            <circle className="mostra__nucli" cx={c.nucli[0]} cy={c.nucli[1]} r={c.nucli[2]} />
          </g>
        ))}
      </g>
      <circle className="mostra__vora" cx="50" cy="50" r="46" />
    </svg>
  )
}
