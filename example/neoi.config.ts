import { defineConfig } from '@neoi/core'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    reactRefresh(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
    }),
  ],

  routes: [
    { path: '/', component: 'pages/index', exact: true },
    { path: '/my', component: 'pages/my', exact: false },
  ],
}))
