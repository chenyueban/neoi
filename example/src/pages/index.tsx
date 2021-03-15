import React from 'react'
import { Link } from 'neoi'

const Home: React.FC = () => {
  React.useEffect(() => {
    fetch('/api/get?foo=bar')
      .then((res) => res.json())
      .then(console.log)
  }, [])

  return (
    <div>
      <Link to="/my">to my</Link>
    </div>
  )
}

export default Home
