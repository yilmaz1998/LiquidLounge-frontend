import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'


const ShowDrinks = () => {
  const { id } = useParams()
  const [Drink, setDrink] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3000/drink/${id}`, {
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
    fetch(`http://localhost:3000/drink/${id}`, {
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
      <div>
      <h1 className='text-3xl'> My Cocktails Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : Drink ? (
        <div>
          <h2>{Drink.name}</h2>
          <img src={Drink.img}></img>
          <p>{Drink.ingredients}</p>
          <p>{Drink.method}</p>
          <button onClick={handleDelete}>Delete</button>
          <Link className='ml-4' to={`/drink/${Drink._id}/edit`}>
            Edit Cocktail
          </Link>
          <Link className='ml-4' to={`/drink`}>
            Go Back
          </Link>
        </div>
      ) : (
        <p>No data found for this cocktail.</p>
      )}
    </div>
  )
}

export default ShowDrinks