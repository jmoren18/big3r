import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' perquè el web funcioni a qualsevol adreça de GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react()]
})
