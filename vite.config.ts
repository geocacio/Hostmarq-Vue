import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '^/api': {
        // target: "http://127.0.0.1:8000/api",
        target: "http://192.168.0.106:8000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // pathRewrite: { '^/api': '/api' },
      },
    },
  },
})
