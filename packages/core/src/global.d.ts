import type { IConfig } from './types'

declare global {
  namespace NodeJS {
    interface Global {
      cacheConfig: IConfig | null
    }
  }
}
