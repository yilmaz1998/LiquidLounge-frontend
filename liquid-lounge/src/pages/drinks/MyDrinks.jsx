import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MyDrinks = () => {
  const [drinks, setDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
      fetch('http://localhost:4000/drink', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Failed to fetch')
          }
        })
        .then((data) => setDrinks(data))
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, []);

  return (
    <div className='text-center'>
      <h1 className='text-3xl mb-4 mt-4'>My Cocktails</h1>
      {isLoggedIn ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='flex flex-wrap -mx-4'>
            {drinks.map((drink, index) => (
              <div className='w-full md:w-1/3 px-4 mb-8' key={index}>
                <Link to={`/drink/${drink._id}`}>
                  <h2 className='text-xl font-bold mb-2'>{drink.name}</h2>
                  <img className='h-80 p-2 rounded-full' src={drink.img}></img>
                </Link>
              </div>
            ))}
          </div>
        )
      ) : (
        <p>Please log in to view your cocktails.</p>
      )}
    </div>
  )
}

export default MyDrinks;
