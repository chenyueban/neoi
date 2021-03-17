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

  store: true,
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      exact: true,
    },
    {
      path: '/my',
      component: '@/pages/my',
      redirect: '/my/info',
      routes: [{ path: '/info', component: '@/pages/info' }],
    },
  ],
})
