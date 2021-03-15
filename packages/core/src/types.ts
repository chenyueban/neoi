import type { UserConfig } from 'vite'

/**
 * { path: '/', component: '@/pages/index.tsx', exact: true }
 */
export interface IRoute {
  path: string
  component: string
  exact?: boolean
}
export type IRoutes = IRoute[]

export interface IConfig extends UserConfig {
  routes?: IRoutes
  /**
   * @default false
   */
  store?: boolean
  /**
   * @default true
   */
  mock?: boolean
}
