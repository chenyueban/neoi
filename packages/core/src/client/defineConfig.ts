import reactRefresh from '@vitejs/plugin-react-refresh'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import type { IConfig } from '../types'

const defaultConfig: IConfig = {
  store: false,
  mock: true,
}

export function defineConfig(config: IConfig) {
  const result = Object.assign(
    defaultConfig,
    {
      plugins: [reactRefresh()],
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
          '~': resolve(__dirname, 'src/.neoi'),
        },
      },
    },
    config
  )

  if (result.mock) {
    result.plugins.push(viteMockServe({ supportTs: true }))
  }

  return result
}
