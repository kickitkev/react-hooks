// useEffect: HTTP requests
// http://localhost:3000/isolated/final/06.extra-1.js

import * as React from 'react'

import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

class ErrorBoundary extends React.Component {
  state = {error: null}
  // if error, React looks for the closet component with this static method
  static getDerivedStateFromError(error) {
    // error then gets passed to set as state and trigger re-render of ErrorBoundary
    return {error}
  }
  render() {
    // when error exists in state return is
    const {error} = this.state
    if (error) {
      return <this.props.FallBackComponent error={error} />
    }
    // ErrorBoundary renders all the children (just a wrapper)
    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state
  // console.log(state)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({pokemon, status: 'resolved'})
      },
      error => {
        setState({error, status: 'rejected'})
      },
    )
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    // This will be handled by the ErrorBoundary
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
  // throw (new Error() = 'This should never happen man!')
}

function ErrorFallBack({error}) {
  return (
    <div role="alert">
      There was an error tits:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* key added to reset component instance */}
        <ErrorBoundary key={pokemonName} FallBackComponent={ErrorFallBack}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
