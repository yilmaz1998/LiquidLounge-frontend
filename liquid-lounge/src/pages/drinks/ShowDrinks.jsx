import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ShowMyDrinkComments from '../comments/ShowMyDrinkComments'


const ShowDrinks = () => {
  const { id } = useParams()
  const [Drink, setDrink] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:4000/drink/${id}`, {
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
      .then((data) => setDrink(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
  }, [id])

  const handleDelete = () => {
    fetch(`http://localhost:4000/drink/${id}`, {
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
          throw new Error('Failed to delete')
        }
      })
      .catch((error) => console.error('Error deleting drink:', error))
  }

  if (deleted) {
    return (
      <div>
        <p>Drink has been deleted successfully.</p>
        <a href="/drink">Go back</a>
      </div>
    )
  }

  return (
    <div className='flex'>
      <div className='text-center w-1/2'>
      <h1 className='text-3xl mt-4 mb-4'> My Cocktails Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : Drink ? (
        <div>
          <h2 className='mb-2 text-xl font-bold'>{Drink.name}</h2>
          <img className='w-80 rounded-full mb-4' src={Drink.img}></img>
          <p><span className='font-bold'>Ingredients:</span> {Drink.ingredients}</p>
          <p><span className='font-bold'>Method:</span> {Drink.method}</p>
          <div className="flex flex-col items-center justify-center">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-1" onClick={handleDelete}>Delete</button>
          <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-1" to={`/drink/${Drink._id}/edit`}>
            Edit Cocktail
          </Link>
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-1" to={`/drink`}>
            Go Back
          </Link>
          </div>
        </div>
      ) : (
        <p>No data found for this cocktail.</p>
      )}
    </div>
    <div className='w-1/2 p-4 text-center'>
      <ShowMyDrinkComments />
    </div>
    </div>
  )
}

export default ShowDrinks