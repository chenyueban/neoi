import { statSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { format } from './format'
import { parseConfig } from './parse'
import type { IConfig } from '../types'

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

interface IGenerateRouter {
  refresh: boolean
  config?: IConfig
  cwd?: string
}
export async function generateRouter({
  refresh,
  config,
  cwd,
}: IGenerateRouter) {
  config = config || (await parseConfig(refresh)) || undefined

  if (config && Array.isArray(config.routes)) {
    const content = format(`import React from 'react'
    import { BrowserRouter, Switch, Route } from 'neoi'

    ${config.routes
      .map(
        (route, index) =>
          `const Component${index} = React.lazy(() => import('../${route.component}'))`
      )
      .join('\n')}

    export default function Router() {
      return (
        <BrowserRouter>
          <Switch>
            ${config.routes
              .map(
                (route, index) => `<Route path="${route.path}" ${
                  route.exact ? 'exact' : 'exact={false}'
                }>
              <Component${index} />
            </Route>
            `
              )
              .join('')
              .trim()}
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

async function generateMain(cwd?: string) {
  const config = await parseConfig()
  const content = format(`import React from 'react'
  import { render } from 'neoi'
  ${hasRouter(config) ? `import Router from './router'` : ''}
  ${hasStore(config) ? `import { StoreContext, stores } from './store'` : ''}

  function App() {
    return (
      ${
        hasStore(config)
          ? `<StoreContext.Provider value={stores}>
      <Router />
    </StoreContext.Provider>`
          : '<Router />'
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
  generateMain(cwd)
}
