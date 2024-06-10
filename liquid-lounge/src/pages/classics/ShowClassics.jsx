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

    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/classic/${id}`, {
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

    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/favorite/new`, {
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
    <div className='text-center'>
      <h1 className='text-3xl mt-4 font-bold mb-4'>Classic Cocktail Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : classicDrink ? (
        <div>
          <h2 className='mb-2 text-xl font-bold'>{classicDrink.name}</h2>
          <img className='w-80 rounded-full mb-4' src={classicDrink.img}></img>
          <p><span className='font-bold'>Ingredients:</span> {classicDrink.ingredients}</p>
          <p><span className='font-bold'>Method:</span> {classicDrink.method}</p>
          <div className='mt-2'>
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={`/classics`}>
            Go Back
          </Link>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={addToFavorite}>Add To Favorites</button>
          </div>
        </div>
      ) : (
        <p>No data found for this classic cocktail.</p>
      )} {error && <p className='mt-2 font-bold text-red-500'>{error}</p>}
    </div>
  );
};

export default ShowClassics;
