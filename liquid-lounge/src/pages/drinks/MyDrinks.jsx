import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'

const MyDrinks = () => {
  const [Drinks, setDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/drink', {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("userToken")
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Failed to fetch')
        }
      })
      .then((data) => setDrinks(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
  }, []);

  return (
    <div>
    <h1>My Cocktails</h1>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {Drinks.map((drink, index) => (
          <li key={index}>
            <Link to={`/drink/${drink._id}`}>
              <h2>{drink.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default MyDrinks