import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' gør, at siden virker på både Netlify og GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: './',
})