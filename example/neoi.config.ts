import { defineConfig } from '@neoi/core'

// https://vitejs.dev/config/
export default defineConfig({
  routes: [
    { path: '/', component: 'pages/index', exact: true },
    { path: '/my', component: 'pages/my', exact: false },
  ],
})
