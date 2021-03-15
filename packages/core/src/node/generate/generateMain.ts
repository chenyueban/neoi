import { writeFileSync } from 'fs'
import { join } from 'path'
import { format } from '../format'

const generateTemplate = () => {
  return format(`import React from 'react'
  import { render } from 'neoi'
  import Router from './router'
  import { StoreContext, stores } from './store'

  function App() {
    return (
      <StoreContext.Provider value={stores}>
        <Router />
      </StoreContext.Provider>
    )
  }

  render(<App />, '#root')
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
