import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ShowComments from '../comments/ShowComments'

const ShowUsersDrinks = () => {
  const { id } = useParams()
  const [OthersDrink, setOthersDrink] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
      .then((data) => setOthersDrink(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <div className='flex'>
    <div className='w-1/2 p-4'>
    <h1 className='text-3xl'> Other Users Cocktails Details</h1>
    {isLoading ? (
      <p>Loading...</p>
    ) : OthersDrink ? (
      <div>
        <h1 className='text-2xl'>{OthersDrink.name}</h1>
        <img src={OthersDrink.img}></img>
        <p>{OthersDrink.ingredients}</p>
        <p>{OthersDrink.method}</p>
        <Link to={`/otherusers/${OthersDrink._id}/comment`}>
          Make A Comment
        </Link>
        <Link className='ml-4' to={`/otherusers`}>
          Go Back
        </Link>
      </div>
    ) : (
      <p>No data found for this cocktail.</p>
    )}
  </div>
  <div className='w-1/2 p-4'>
    < ShowComments />
  </div>
  </div>
  )
}

export default ShowUsersDrinks