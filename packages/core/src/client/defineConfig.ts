import reactRefresh from '@vitejs/plugin-react-refresh'
import { viteMockServe } from 'vite-plugin-mock'
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
    },
    config
  )

  if (result.mock) {
    result.plugins.push(viteMockServe({ supportTs: true }))
  }

  return result
}
