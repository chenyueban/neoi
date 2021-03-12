import React from 'react'
import ReactDOM from 'react-dom'

function Loading() {
  return <div>loading...</div>
}

export function render(app: JSX.Element, container: string) {
  function App() {
    return <main>{app}</main>
  }
  ReactDOM.render(
    <React.StrictMode>
      <React.Suspense fallback={Loading}>
        <App />
      </React.Suspense>
    </React.StrictMode>,
    document.querySelector(container)
  )
}
