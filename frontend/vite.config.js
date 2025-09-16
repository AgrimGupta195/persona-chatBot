import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, 
    port: Number(process.env.PORT) || 5173,
  },
  preview: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: Number(process.env.PORT) || 4173,
    allowedHosts: ['persona-chatbot-2.onrender.com'], // Add your Render URL here
  },
})
