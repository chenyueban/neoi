import { resolve } from 'path'
import { defineConfig } from '@neoi/core'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, 'src/.neoi'),
    },
  },
})
