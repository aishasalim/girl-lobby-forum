import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSvgPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactSvgPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'https://your-supabase-url.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})