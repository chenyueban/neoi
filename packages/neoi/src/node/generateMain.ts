import { writeFileSync } from 'fs'
import { join } from 'path'

const generateTemplate = () => {
  return `import React from 'react'
import { render } from '@neoi/runtime'
import Router from './router'

render(<Router />, '#root')
`
}

export function generateMain(srcPath: string) {
  const content = generateTemplate()

  return writeFileSync(join(srcPath, '.neoi', 'main.tsx'), content, {
    encoding: 'utf-8',
  })
}
