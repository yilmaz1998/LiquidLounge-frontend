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
      fetch('http://localhost:3000/drink', {
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
    <div>
      <h1 className='text-3xl'>My Cocktails</h1>
      {isLoggedIn ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {drinks.map((drink, index) => (
              <li className='p-3' key={index}>
                <Link to={`/drink/${drink._id}`}>
                  <h2>{drink.name}</h2>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Please log in to view your cocktails.</p>
      )}
    </div>
  )
}

export default MyDrinks;
