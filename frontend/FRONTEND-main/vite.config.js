import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // Bind al 0.0.0.0 para que Railway pueda exponerlo
    host: '0.0.0.0',
    // Puerto que Railway te da en $PORT
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
    // Lista blanca de hosts que Vite acepta en el header Host
    allowedHosts: [
      'practical-gratitude-production.up.railway.app'
    ]
  }
})
