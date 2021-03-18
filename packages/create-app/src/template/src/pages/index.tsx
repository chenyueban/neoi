import React from 'react'

const Home: React.FC = () => {
  const [value, setValue] = React.useState(0)
  return (
    <div>
      <div>{value}</div>
      <button onClick={() => setValue((prevValue) => prevValue + 1)}>
        increment
      </button>
      <button onClick={() => setValue((prevValue) => prevValue - 1)}>
        decrement
      </button>
    </div>
  )
}

export default Home
