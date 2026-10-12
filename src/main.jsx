import React from 'react'
import { createRoot } from 'react-dom/client'
// Les fonts es publiquen amb el web: no cal connectar-se a Google per veure'l.
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/400-italic.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import '@fontsource/bricolage-grotesque/500.css'
import '@fontsource/bricolage-grotesque/700.css'
import '@fontsource/bricolage-grotesque/800.css'
import App from './App.jsx'
import './styles.css'

// En imprimir, s'obren els blocs plegats perquè surtin al paper.
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('details:not([open])').forEach((d) => {
    d.dataset.plegat = '1'
    d.open = true
  })
})
window.addEventListener('afterprint', () => {
  document.querySelectorAll('details[data-plegat]').forEach((d) => {
    d.open = false
    delete d.dataset.plegat
  })
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
