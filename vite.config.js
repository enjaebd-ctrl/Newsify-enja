import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vi fortæller Vite, at vi bruger React
export default defineConfig({
  plugins: [react()],
})