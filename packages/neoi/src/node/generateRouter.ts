import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { parseRoutes } from './parseRoutes'
import type { IRoutes } from '../type'

const generateTemplate = (routes: IRoutes) => {
  return `import React from 'react'
import { BrowserRouter, Switch, Route } from '@neoi/runtime'

${routes
  .map(
    (route) =>
      `const ${route.name} = React.lazy(() => import('${route.component}'))`
  )
  .join('\n')}

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        ${routes
          .map(
            (route) => `<Route path="${route.path}">
          <${route.name} />
        </Route>
        `
          )
          .join('')
          .trim()}
      </Switch>
    </BrowserRouter>
  )
}
`
}

export function generateRouter(srcPath: string) {
  const pagePath = join(srcPath, 'pages')
  const pages = readdirSync(pagePath)
  const routes = parseRoutes(pages)
  const content = generateTemplate(routes)

  return writeFileSync(join(srcPath, '.neoi', 'router.tsx'), content, {
    encoding: 'utf-8',
  })
}
