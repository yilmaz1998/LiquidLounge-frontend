import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const MyFavorites = () => {
  const { id } = useParams()
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(null)
  const [deleted, setDeleted] = useState(false)


  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      setIsLoggedIn(true)
      fetch('http://localhost:3000/favorite', {
        headers: {
          'Content-Type': "application/json",
          "Authorization": userToken,
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch favorites')
        }
      })
      .then((data) => {
      console.log('Fetched favorites:', data)
      setFavorites(data)
      console.log('Favorites state:', favorites)
      })
      .catch((error) => {console.error('Error fetching data:', error)
      setError('Failed')})
      .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, []);


  const handleDelete = (id) => {
    fetch(`http://localhost:3000/favorite/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("userToken")
      },
    })
      .then((res) => {
        if (res.ok) {
          setDeleted(true)
        } else {
          throw new Error('Failed to delete favorite')
        }
      })
      .catch((error) => console.error('Error deleting favorite:', error))
  }
  if (deleted) {
    return (
      <div>
        <p>Drink has been removed successfully from your favorites.</p>
        <a href="/favorite">Go back</a>
      </div>
    )
  }

  return (
    <div>
    <h1 className='text-3xl'>My Favorites</h1>
    {isLoggedIn ? (
    isLoading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite._id}>
            <p>Name: {favorite.classic ? favorite.classic.name : favorite.drink.name}</p>
             <img src={favorite.drink ? favorite.drink.img : ''} />
             <img src={favorite.classic ? favorite.classic.img : ''} />
             <button onClick={() => handleDelete(favorite._id)}>Remove from favorites</button>
          </li>
        ))}
      </ul>
    ) 
    ) : (
      <p>Please log in to view your favorites.</p>
    )}
  </div>
  )
}

export default MyFavorites