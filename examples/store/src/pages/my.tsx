import React from 'react'
import { Link } from 'neoi'

const My: React.FC = ({ children }) => {
  React.useEffect(() => {
    fetch('/api/get')
      .then((res) => res.json())
      .then(console.log)
  }, [])

  return (
    <div>
      <Link to="/">to home</Link>
      <Link to="/my/info">to info</Link>

      {children}
    </div>
  )
}

export default My
