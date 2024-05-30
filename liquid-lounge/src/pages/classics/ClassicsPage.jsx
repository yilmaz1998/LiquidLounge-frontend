import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ClassicsPage = () => {
  const [classicDrinks, setClassicDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/classic', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Failed to fetch')
        }
      })
      .then((data) => setClassicDrinks(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
  }, []);

  return (
    <div>
      <h1>Classic Cocktails</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {classicDrinks.map((drink, index) => (
            <li key={index}>
              <Link to={`/classics/${drink._id}`}>
                <h2>{drink.name}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassicsPage;

