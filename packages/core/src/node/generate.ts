import { statSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { format } from './format'
import { parseConfig } from './parse'
import type { IConfig, IRoute } from '../types'

/**
 * 创建 .neoi 文件夹
 * @param cwd
 */
function generateTemp(cwd?: string) {
  const tempPath = join(cwd ?? process.cwd(), 'src', '.neoi')
  try {
    const stats = statSync(tempPath)
    if (!stats.isDirectory()) {
      mkdirSync(tempPath)
    }
  } catch (_) {
    mkdirSync(tempPath)
  }
}

function getRouteElement(route: IRoute): string {
  const routeProps = {
    exact: route.exact,
    path: route.path,
  }
  if (route.routes) {
    const routes = route.routes.map((_route) => ({
      ..._route,
      path: route.path + _route.path,
    }))
    return `${
      route.redirect
        ? `<Redirect from="${route.path}" to="${route.redirect}" />`
        : ''
    }<Route
    {...${JSON.stringify(routeProps)}}
    render={(props) => {
      // @ts-ignore
      const Component = React.lazy(() => import('${route.component}'))
      return (
        <Component {...props}>
          <Switch>
            ${routes.map((_route) => getRouteElement(_route)).join('')}
          </Switch>
        </Component>
      )
    }}
  />`
  } else if (route.redirect) {
    return `<Redirect from="${route.path}" to="${route.redirect}" />`
  } else {
    return `<Route
    {...${JSON.stringify(routeProps)}}
    render={(props) => {
      // @ts-ignore
      const Component = React.lazy(() => import('${route.component}'))
      return <Component {...props} />
    }}
  />`
  }
}

interface IGenerateRouter {
  refresh: boolean
  config?: IConfig
  cwd?: string
}
/**
 * 根据 config.routes 配置生成 router.tsx
 * @param IGenerateRouter
 * @returns
 */
export async function generateRouter({
  refresh,
  config,
  cwd,
}: IGenerateRouter) {
  config = config || (await parseConfig(refresh)) || undefined

  if (config && Array.isArray(config.routes)) {
    const content = format(`import React from 'react'
    import { BrowserRouter, Switch, Route, Redirect } from 'neoi'

    export default function Router() {
      return (
        <BrowserRouter>
          <Switch>
            ${config.routes.map((route) => getRouteElement(route)).join('')}
          </Switch>
        </BrowserRouter>
      )
    }
    `)
    return writeFileSync(
      join(cwd ?? process.cwd(), 'src', '.neoi', 'router.tsx'),
      content,
      {
        encoding: 'utf-8',
      }
    )
  }
}

const hasRouter = (config: IConfig | null) => Array.isArray(config?.routes)
const hasStore = (config: IConfig | null) => !!config?.store

/**
 * 生成 store.ts
 * @param cwd
 * @returns
 */
async function generateStore(cwd?: string) {
  const config = await parseConfig()
  const content = format(`import { createContext, useContext } from 'react'
  import * as stores from '../stores'

  type Stores = typeof stores
  type ValueOf<T> = T[keyof T]

  export const StoreContext = createContext<Stores>(stores)

  export function useStore<T extends keyof Stores>(
    storeName: T
  ): ValueOf<Stores> {
    const store = useContext(StoreContext) as Stores

    if (storeName in store) {
      return store[storeName]
    }

    throw new Error(\`No store named \${storeName} found!\`)
  }

  export { stores }
  `)

  if (config?.store) {
    return writeFileSync(
      join(cwd ?? process.cwd(), 'src', '.neoi', 'store.ts'),
      content,
      {
        encoding: 'utf-8',
      }
    )
  }
}

/**
 * 生成 exports.ts
 * @param cwd
 * @returns
 */
async function generateExports(cwd?: string) {
  const config = await parseConfig()
  const content = format(`${hasStore(config) ? `export * from './store'` : ''}`)

  return writeFileSync(
    join(cwd ?? process.cwd(), 'src', '.neoi', 'exports.ts'),
    content,
    {
      encoding: 'utf-8',
    }
  )
}

/**
 * 生成 main.tsx
 * @param cwd
 * @returns
 */
async function generateMain(cwd?: string) {
  const config = await parseConfig()
  const content = format(`import React from 'react'
  import { render } from 'neoi'
  ${
    hasRouter(config)
      ? `import Router from './router'`
      : `import Home from '../pages'`
  }
  ${hasStore(config) ? `import { StoreContext, stores } from './store'` : ''}

  function App() {
    return (
      ${
        hasStore(config)
          ? `<StoreContext.Provider value={stores}>
      <Router />
    </StoreContext.Provider>`
          : hasRouter(config)
          ? '<Router />'
          : '<Home />'
      }
    )
  }

  render(<App />, '#root')
  `)

  return writeFileSync(
    join(cwd ?? process.cwd(), 'src', '.neoi', 'main.tsx'),
    content,
    {
      encoding: 'utf-8',
    }
  )
}

export function generate() {
  const cwd = process.cwd()
  generateTemp(cwd)
  generateRouter({ refresh: false, cwd })
  generateStore(cwd)
  generateExports(cwd)
  generateMain(cwd)
}
