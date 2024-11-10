import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/plugin.js'),
      name: 'PenpotEaglePlugin',
      fileName: 'plugin',
      formats: ['es']
    },
    rollupOptions: {
      external: ['@penpot/plugin-types'],
      output: {
        format: 'es'
      }
    }
  }
}) 