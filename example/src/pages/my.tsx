import React from 'react'
import { Link, useLocation } from 'neoi'

const My: React.FC = () => {
  const location = useLocation()
  React.useEffect(() => {
    fetch('/api/get')
      .then((res) => res.json())
      .then(console.log)

    console.log(location)
  }, [])

  return (
    <div>
      <Link to="/">to home</Link>
    </div>
  )
}

export default My
