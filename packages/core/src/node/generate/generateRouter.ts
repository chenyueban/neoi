import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { format } from '../format'
import { parseRoutes, parseConfig } from '../parse'
import type { IRoutes } from '../../types'

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

export async function generateRouter(refresh?: boolean) {
  const pagePath = join(process.cwd(), 'src', 'pages')
  const config = await parseConfig(refresh)

  if (config && Array.isArray(config.routes)) {
    const content = generateTemplate(config.routes)
    return writeFileSync(
      join(process.cwd(), 'src', '.neoi', 'router.tsx'),
      content,
      {
        encoding: 'utf-8',
      }
    )
  } else {
    const pages = readdirSync(pagePath)
    const routes = parseRoutes(pages)
    const content = generateTemplate(routes)
    return writeFileSync(
      join(process.cwd(), 'src', '.neoi', 'router.tsx'),
      content,
      {
        encoding: 'utf-8',
      }
    )
  }
}
