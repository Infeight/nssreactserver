import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from external hosts
    port: 3000, // Default port for development
    allowedHosts: ['.onrender.com'], // Allow all Render subdomains
  },
})
