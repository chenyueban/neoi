import React from 'react'
import { observer, Link } from 'neoi'
import { useStore } from '~/store'

const Home = observer(() => {
  const store = useStore('countStore')

  return (
    <div>
      <Link to="/my">to my</Link>

      <div>value: {store.value}</div>
      <button onClick={store.increment}>increment</button>
      <button onClick={store.decrement}>decrement</button>
    </div>
  )
})

export default Home
