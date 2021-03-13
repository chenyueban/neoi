import React from 'react'
import { Link, useLocation } from 'neoi'

const My: React.FC = () => {
  const location = useLocation()
  console.log(location)

  return (
    <div>
      <Link to="/">to home</Link>
    </div>
  )
}

export default My
