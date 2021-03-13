import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { format } from './format'
import { parseRoutes } from './parseRoutes'
import type { IRoutes } from '../type'

const generateTemplate = (routes: IRoutes) => {
  return format(`import React from 'react'
  import { BrowserRouter, Switch, Route } from 'neoi'

  ${routes
    .map(
      (route, index) =>
        `const Component${index} = React.lazy(() => import('../${route.component}'))`
    )
    .join('\n')}

  export default function Router() {
    return (
      <BrowserRouter>
        <Switch>
          ${routes
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
}

export function generateRouter(srcPath: string) {
  const pagePath = join(srcPath, 'pages')
  const pages = readdirSync(pagePath)
  const routes = parseRoutes(pages)
  const content = generateTemplate(routes)

  writeFileSync(
    join(srcPath, '.neoi', 'config', 'routes.ts'),
    format(`export default ${JSON.stringify(routes)}`),
    {
      encoding: 'utf-8',
    }
  )
  writeFileSync(join(srcPath, '.neoi', 'router.tsx'), content, {
    encoding: 'utf-8',
  })
}
