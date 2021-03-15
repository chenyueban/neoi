import React from 'react'
import { observer, Link } from 'neoi'

const Home = observer(() => {
  React.useEffect(() => {
    fetch('/api/get')
      .then((res) => res.json())
      .then(console.log)
  }, [])

  return (
    <div>
      <Link to="/my">to my</Link>
    </div>
  )
})

export default Home
