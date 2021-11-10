// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

function FavouriteFood({food, onFoodChange}) {
  return (
    <div>
      <label htmlFor="food">Favourite Food</label>
      <input id="food" value={food} onChange={onFoodChange}></input>
    </div>
  )
}

function Display({food, onFoodChange}) {
  return (
    <>
      <FavouriteFood food={food} onFoodChange={onFoodChange} />
    </>
  )
}

function Footer({name, animal, food}) {
  return (
    <>
      <br />
      <br />
      <div className="footer">
        <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
        <div>{`You also think ${food} is the best thing to eat`}</div>
      </div>
    </>
  )
}

function App() {
  const [animal, onAnimalChange] = React.useState('')
  const [name, setName] = React.useState('')
  const [food, onFoodChange] = React.useState('')

  return (
    <>
      <form>
        <Name name={name} onNameChange={event => setName(event.target.value)} />
        <FavoriteAnimal
          animal={animal}
          onAnimalChange={event => onAnimalChange(event.target.value)}
        />
        <Display onFoodChange={event => onFoodChange(event.target.value)} />
        <Footer food={food} name={name} animal={animal} />
      </form>
    </>
  )
}

export default App
