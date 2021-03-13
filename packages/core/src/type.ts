/**
 * { path: '/index', component: '@/pages/index.tsx' }
 */
export interface IRoute {
  path: string
  component: string
  exact?: boolean
}
export type IRoutes = IRoute[]
