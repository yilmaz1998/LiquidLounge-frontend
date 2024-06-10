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
      fetch('https://liquid-lounge-acdcda81ea65.herokuapp.com/favorite', {
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


  // const handleDelete = (id) => {
  //   fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/favorite/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Authorization": localStorage.getItem("userToken")
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         setDeleted(true)
  //       } else {
  //         throw new Error('Failed to delete favorite')
  //       }
  //     })
  //     .catch((error) => console.error('Error deleting favorite:', error))
  // }
  // if (deleted) {
  //   return (
  //     <div className='text-center mt-8'>
  //       <p className='text-xl font-bold'>Drink has been removed successfully from your favorites.</p>
  //       <div className='mt-4'>
  //       <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/favorite">Go back</a>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className='text-center'>
    <h1 className='text-3xl font-bold mt-4 mb-4'>My Favorites</h1>
    {isLoggedIn ? (
    isLoading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <div className='flex flex-wrap -mx-4'>
        {favorites.map((favorite) => (
          <div className='w-full md:w-1/3 px-4 mb-8' key={favorite._id}>
            <Link to={`/favorite/${favorite._id}`}>
            <h2 className='text-xl font-bold mb-2'>{favorite.classic ? favorite.classic.name : favorite.drink.name}</h2>
            <div className='image'>
            <img className='h-80 p-2 rounded-full' src={favorite.drink ? favorite.drink.img : favorite.classic ? favorite.classic.img : ''} />
           </div></Link>
          </div>
        ))}
      </div>
    ) 
    ) : (
      <p>Please log in to view your favorites.</p>
    )}
  </div>
  )
}

export default MyFavorites