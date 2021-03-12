/**
 * { path: '/index', component: '@/pages/index.tsx' }
 */
export interface IRoute {
  path: string
  name: string
  component: string
}
export type IRoutes = IRoute[]
