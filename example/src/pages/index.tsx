import React from 'react'
import { Link, useLocation } from 'neoi'

const Home: React.FC = () => {
  const location = useLocation()
  console.log(location)

  return (
    <div>
      <Link to="/my">to my</Link>
    </div>
  )
}

export default Home
