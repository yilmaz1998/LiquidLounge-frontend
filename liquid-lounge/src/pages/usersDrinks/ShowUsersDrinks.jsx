import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ShowComments from '../comments/ShowComments'

const ShowUsersDrinks = () => {
  const { id } = useParams()
  const [OthersDrink, setOthersDrink] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/drink/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("userToken")
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch')
        }
      })
      .then((data) => setOthersDrink(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
  }, [id])

  const addToFavorite = (e) => {
    e.preventDefault()

    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/favorite/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("userToken")
      },
      body: JSON.stringify({ usersDrinkId: id })
    })
    .then((res) => {
      if(!res.ok) {
        setError("Drink is already in favorites")
        throw new Error("Failed to add to favorites")
      }else {
        res.json()
        setError('Added to favorites')
      }
    })
    .catch((error) => console.error('Error adding to favorites:', error))
  }


  return (
    <div className='flex'>
    <div className='w-1/2 p-4 text-center'>
    <h1 className='text-3xl font-bold'> Other Users Cocktails Details</h1>
    {isLoading ? (
      <p>Loading...</p>
    ) : OthersDrink ? (
      <div>
        <h1 className='text-2xl font-bold mt-4 mb-4'>{OthersDrink.name}</h1>
        <img src={OthersDrink.img}></img>
        <p><span className='font-bold'>Ingredients:</span> {OthersDrink.ingredients}</p>
        <p><span className='font-bold'>Method:</span> {OthersDrink.method}</p>
        <p><span className='font-bold'>Created by:</span> {OthersDrink.user.username}</p>
        <div className="flex flex-col items-center justify-center">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-1"  onClick={addToFavorite}>Add To Favorites</button>
        <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-1" to={`/otherusers/${OthersDrink._id}/comment`}>
          Make A Review
        </Link>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-1" to={`/otherusers`}>
         Go Back
        </Link>
      </div>
      </div>
    ) : (
      <p>No data found for this cocktail.</p>
    )} {error && <p>{error}</p>}
  </div>
  <div className='w-1/2 p-4 text-center'>
    < ShowComments />
  </div>
  </div>
  )
}

export default ShowUsersDrinks