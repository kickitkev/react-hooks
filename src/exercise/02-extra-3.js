// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue = '') {
  // Pull the initial value from local storage
  const getInitalName = () => {
    return window.localStorage.getItem(key) || defaultValue
  }

  // Call getInitialName function into state when rendered for the first time
  const [state, setState] = React.useState(getInitalName)

  // Set key and value into local storage, only re-renders when dependencies change
  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = 'Hello'}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  // Set name to value of input
  function handleChange(event) {
    setName(event.target.value)
  }

  const [count, setCount] = React.useState(0)
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? (
        <strong>
          Hello {name}, you clicked {count} times!
        </strong>
      ) : (
        'Please type your name'
      )}
      <br />

      <button onClick={() => setCount(previousCount => previousCount + 1)}>
        {count}
      </button>
      <button onClick={() => setCount(0)}>Reset Count</button>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
