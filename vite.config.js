import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  assetsInclude: ['**/*.gltf'],
  server: {
    host: true,
    port: 5137
  },
})