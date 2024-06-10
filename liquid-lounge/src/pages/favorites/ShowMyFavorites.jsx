import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const ShowMyFavorites = () => {
    const { id } = useParams()
    const [favorite, setFavorite] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [deleted, setDeleted] = useState(false)


    useEffect(() => {
        fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/favorite/${id}`, {
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
          .then((data) => {setFavorite(data), console.log(data)})
          .catch((error) => console.error('Error fetching data:', error))
          .finally(() => setIsLoading(false))
    }, [id])


    const handleDelete = () => {
        fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/favorite/${id}`, {
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
          <div className='text-center mt-8'>
            <p className='text-xl font-bold'>Drink has been removed successfully from your favorites.</p>
            <div className='mt-4'>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={'/favorite'}>Go back</Link>
            </div>
          </div>
        )
      }


return (
    <div>
       <div className='text-center'>
      <h1 className='text-3xl mt-4 mb-4'> My Favorite Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : favorite ? (
        <div>
          <h2 className='mb-2 text-xl font-bold'>{favorite.classic ? favorite.classic.name : favorite.drink.name}</h2>
          <img className='w-80 rounded-full mb-4' src={favorite.drink ? favorite.drink.img : favorite.classic ? favorite.classic.img : ''}></img>
          <p><span className='font-bold'>Ingredients:</span> {favorite.drink ? favorite.drink.ingredients : favorite.classic ? favorite.classic.ingredients : '' }</p>
          <p><span className='font-bold'>Method:</span> {favorite.drink ? favorite.drink.method : favorite.classic ? favorite.classic.method : '' }</p>
          <div className="flex flex-col items-center justify-center">
          <button className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-1" onClick={handleDelete}>Remove from Favorites</button>
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-1" to={'/favorite'}>Go Back</Link>
          </div>
        </div>
      ) : (
        <p>No data found for this cocktail.</p>
      )}
    </div>
    </div>
)


}

export default ShowMyFavorites