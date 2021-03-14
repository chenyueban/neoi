import { writeFileSync } from 'fs'
import { join } from 'path'
import { format } from '../format'

const generateTemplate = () => {
  return format(`import React from 'react'
  import { render } from 'neoi'
  import Router from './router'

  render(<Router />, '#root')
  `)
}

export function generateMain() {
  const content = generateTemplate()

  return writeFileSync(
    join(process.cwd(), 'src', '.neoi', 'main.tsx'),
    content,
    {
      encoding: 'utf-8',
    }
  )
}
