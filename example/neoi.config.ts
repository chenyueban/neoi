import { defineConfig } from '@neoi/core'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  routes: [
    { path: '/', component: 'pages/index', exact: true },
    { path: '/my', component: 'pages/my', exact: false },
  ],
})
