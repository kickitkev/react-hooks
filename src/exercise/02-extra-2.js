// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [count, setCount] = React.useState(0)

  // console.log('greeting render')

  const getInitalName = () => {
    return window.localStorage.getItem('name') || initialName
  }

  const [name, setName] = React.useState(getInitalName)

  React.useEffect(() => {
    // console.log('use state render')
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}

      <button onClick={() => setCount(previousCount => previousCount + 1)}>
        {count}
      </button>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
