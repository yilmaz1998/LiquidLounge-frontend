import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const ShowClassics = () => {
  const { id } = useParams()
  const [classicDrink, setClassicDrink] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {

    const userToken = localStorage.getItem("userToken")
    setIsLoggedIn(!!userToken)

    fetch(`http://localhost:3000/classic/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then((data) => setClassicDrink(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
  }, [id])


  const addToFavorite = (e) => {
    e.preventDefault()
    if (!isLoggedIn) {
      setError('Please log in');
      return;
    }

    fetch(`http://localhost:3000/favorite/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("userToken")
      },
      body: JSON.stringify({ classicDrinkId: id })
    })
    .then((res) => {
      if(!res.ok) {
        setError('Drink is already in favorites')
        throw new Error("Failed to add to favorites")
      }else {
        res.json()
        setError('Added to favorites')
      }
    })
    .catch((error) => console.error('Error adding to favorites:', error))
  }

  return (
    <div>
      <h1 className='text-3xl'>Classic Cocktail Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : classicDrink ? (
        <div>
          <h2>Name: {classicDrink.name}</h2>
          <img src={classicDrink.img}></img>
          <p>Ingredients: {classicDrink.ingredients}</p>
          <p>Method: {classicDrink.method}</p>
          <Link to={`/classics`}>
            Go Back
          </Link>
          <button className='ml-2' onClick={addToFavorite}>Add To Favorites</button>
        </div>
      ) : (
        <p>No data found for this classic cocktail.</p>
      )} {error && <p>{error}</p>}
    </div>
  );
};

export default ShowClassics;
