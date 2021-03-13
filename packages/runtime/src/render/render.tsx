import React from 'react'
import ReactDOM from 'react-dom'

function Loading() {
  return <div>loading...</div>
}

export function render(element: React.ReactElement, container: string) {
  ReactDOM.render(
    <React.StrictMode>
      <React.Suspense fallback={<Loading />}>{element}</React.Suspense>
    </React.StrictMode>,
    document.querySelector(container)
  )
}
