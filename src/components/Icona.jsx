// Pictogrames de línia, tots del mateix estil (24×24, traç de 2 px, color del text).
// Ajuden a reconèixer cada part de la pàgina sense haver de llegir el títol.
const ICONES = {
  pregunta: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.6" />
      <path d="M12 17h.01" />
    </>
  ),
  recordes: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4.5h4.5" />
      <path d="M12 8v4l2.5 2" />
    </>
  ),
  objectius: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  activitat: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
  recursos: <path d="M20 11.5l-7.8 7.8a5 5 0 0 1-7-7L13 4.5a3.3 3.3 0 0 1 4.7 4.7l-7.6 7.6a1.7 1.7 0 0 1-2.4-2.4l7-7" />,
  repte: <path d="M12 3l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.8z" />,
  apunts: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  posadaEnComu: (
    <>
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M3 20a5.5 5.5 0 0 1 11 0" />
      <path d="M14.5 15.2A4.5 4.5 0 0 1 21 19" />
    </>
  ),
  tornem: (
    <>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10a6 6 0 0 1 0 12h-2" />
    </>
  ),
  exitTiquet: (
    <>
      <path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4v0a2 2 0 0 0 0-4V6H3z" />
      <path d="M14 6v12" strokeDasharray="2 2" />
    </>
  ),
  feinaACasa: (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  siHasFaltat: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <path d="M4 10h16M8 3v4M16 3v4" />
      <path d="M10 13.5l4 4M14 13.5l-4 4" />
    </>
  ),
  laboratori: (
    <>
      <path d="M9.5 3h5M10 3v6l-5.5 9.2A1.8 1.8 0 0 0 6 21h12a1.8 1.8 0 0 0 1.5-2.8L14 9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  material: (
    <>
      <path d="M6 4h12M7 4v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4" />
      <path d="M7 11h5M7 15h3" />
    </>
  ),
  normes: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </>
  ),
  passos: (
    <>
      <path d="M10 6h10M10 12h10M10 18h10" />
      <path d="M4 5l1.5-1v4M4 11.5a1.5 1.5 0 1 1 2.5 1.1L4 15h3M4 18.2a1.4 1.4 0 1 1 1.4 1.8H5" />
    </>
  ),
  observa: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  dibuix: (
    <>
      <path d="M3 21l3.5-1L18 8.5 15.5 6 4 17.5z" />
      <path d="M13 21h8" />
    </>
  ),
  evidencia: (
    <>
      <path d="M4 13h4.5l1.5 2.5h4l1.5-2.5H20" />
      <path d="M5.5 6.5L4 13v6h16v-6l-1.5-6.5z" />
      <path d="M12 3v7M9.5 7.5L12 10l2.5-2.5" />
    </>
  ),
  conclusio: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </>
  ),
  recollim: (
    <>
      <path d="M14.5 3.5l-4 8" />
      <path d="M7 11.5h7.5l2 9.5H5z" />
      <path d="M8.5 15.5l-.5 5.5M12 15.5v5.5" />
    </>
  ),
  comprova: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  reintenta: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4.5h4.5" />
    </>
  ),
  solucio: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  imprimeix: (
    <>
      <path d="M7 9V3h10v6" />
      <rect x="3" y="9" width="18" height="8" rx="1.5" />
      <path d="M7 14h10v7H7z" />
    </>
  ),
  idioma: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  temporitzador: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5M9.5 2.5h5" />
    </>
  ),
  sonometre: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
    </>
  ),
  anterior: <path d="M15 5l-7 7 7 7" />,
  seguent: <path d="M9 5l7 7-7 7" />,
  extern: (
    <>
      <path d="M8 16L18 6M10 6h8v8" />
    </>
  ),
  pantalla: (
    <>
      <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
    </>
  ),
  paraules: (
    <>
      <path d="M4 5h9a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H4z" />
      <path d="M20 5h-1M16 8a3 3 0 0 1 3-3h1v12.5h-3" />
    </>
  ),
  joc: (
    <>
      <rect x="3" y="7" width="18" height="11" rx="3" />
      <path d="M7.5 11v3M6 12.5h3" />
      <circle cx="15.5" cy="11.5" r=".9" />
      <circle cx="17.5" cy="14" r=".9" />
    </>
  )
}

export default function Icona({ nom, className = '' }) {
  const dibuix = ICONES[nom]
  if (!dibuix) return null
  return (
    <svg
      className={`icona ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {dibuix}
    </svg>
  )
}
