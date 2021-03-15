import { resolve } from 'path'
import { defineConfig } from '@neoi/core'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), viteMockServe({ supportTs: true })],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src/.neoi'),
    },
  },

  routes: [
    { path: '/', component: 'pages/index', exact: true },
    { path: '/my', component: 'pages/my', exact: false },
  ],
})
